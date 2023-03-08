import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudVicedecanoService } from 'src/app/services/SolicitudVicedecanoServices/solicitudVicedecano.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-detalleSolicitud',
  templateUrl: './detalleSolicitud.component.html',
  styleUrls: ['./detalleSolicitud.component.css'],
})
export class DetalleSolicitudComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS VICEDECANO
  public identity: any;
  public token: string;
  public id_solicitud: number;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public flag_habilita_botones: boolean[];

  // ESTADO BOTONES
  public btn_pdf_disabled: boolean;

  public btn_enviar_recomision_loading: boolean;
  public btn_enviar_recomision_disabled: boolean;

  public btn_rechazar_loading: boolean;
  public btn_rechazar_disabled: boolean;

  public btn_asingar_departamento_loading: boolean;
  public btn_asingar_departamento_disabled: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;
  public departamentos: any;
  public observaciones: string;
  public id_departamento: number;

  // NGZORRO
  public mostrarModal: boolean;
  public confirmModal: NzModalRef;
  public modal_ref_set_departamento: NzModalRef;

  constructor(
    private _loginService: LoginService,
    private _solicitudesVicedecanoService: SolicitudVicedecanoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modal: NzModalService,
    private _mensaje: NzMessageService,
    private _archivosService: ArchivosService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;
    this.flag_habilita_botones = [false, false, false, false];
    this.btn_enviar_recomision_loading = false;
    this.btn_rechazar_loading = false;

    this.observaciones = '';
    this.id_departamento = 0;

    this.mostrarModal = false;
  }

  ngOnInit() {
    this.getDepartamentos();
    this.getIdSolicitud();
    this.decryptId();
  }

  getIdSolicitud() {
    return this._route.snapshot.paramMap.get('id') ?? '';
  }

  getTipo() {
    if (this._route.snapshot.paramMap.get('tipo') === 'cambioCarrera') {
      return 1;
    } else if (
      this._route.snapshot.paramMap.get('tipo') === 'cambioUniversidad'
    ) {
      return 2;
    }
    return 0;
  }

  decryptId() {
    this._urlService.desencriptarParametro(this.getIdSolicitud()).subscribe(
      (id) => {
        if (id !== '') {
          this.id_solicitud = Number(id);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {
        this.getDetalleSolicitud();
      }
    );
  }

  getDepartamentos() {
    this._solicitudesVicedecanoService
      .getDepartamentos(this.token)
      .subscribe((response) => {
        console.log(response);

        if (response.status === 'success') {
          this.departamentos = response.departamentos;
        }
      });
  }

  getDetalleSolicitud() {
    this._solicitudesVicedecanoService
      .getSolicitud(
        this.token,
        this.identity.sub,
        Number(this.id_solicitud),
        this.getTipo()
      )
      .subscribe(
        (response) => {
          if (response.status == 'success') {
            this.solicitud_detallada = response.detalleSolicitud;
            this.materias_solicitud = response.materiasSolicitud;
            console.log(this.solicitud_detallada);

            if (this.solicitud_detallada[0].estado_solicitud !== 'PENDIENTE') {
              this.flag_habilita_botones = [true, true, true, true];
            }
          } else {
            console.log('Error: ', response);
          }
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          this.pagina_cargada = true;
        }
      );
  }

  setDepartamentoSolicitud() {
    if (this.id_departamento != 0) {
      this.btn_asingar_departamento_loading = true;
      this.btn_asingar_departamento_disabled = true;

      this._solicitudesVicedecanoService
        .setDepartamentoSolicitud(
          this.token,
          this.id_solicitud,
          this.id_departamento
        )
        .subscribe(
          (response) => {
            if (response.status === 'success') {
              this.btn_asingar_departamento_loading = false;
              this.btn_asingar_departamento_disabled = false;

              this._mensaje.success('Departamento asigando correctamente!');
              setTimeout(() => window.location.reload(), 1500);
            } else {
              this._mensaje.error(response.message);
            }
          },
          (error) => {
            this.btn_asingar_departamento_loading = false;
            this.btn_asingar_departamento_disabled = false;
            console.log('error', error);
          }
        );
    } else {
      this._mensaje.warning('Debe escoger un departamento...');
    }
  }

  createModalSeleccionarDepartamento(contenidoModal: TemplateRef<{}>) {
    this.modal_ref_set_departamento = this._modal.create({
      nzTitle: 'Asignación de Departamento',
      nzContent: contenidoModal,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => this.setDepartamentoSolicitud(),
      nzOkLoading: this.btn_asingar_departamento_loading,
      nzOkDisabled: this.btn_asingar_departamento_disabled,
      nzOnCancel: () => this.modal_ref_set_departamento.destroy(),
    });
  }

  confirmarEnviarRC(): void {
    if (this.solicitud_detallada[0].departamento !== null) {
      this.confirmModal = this._modal.confirm({
        nzTitle: '¿Desea enviar la solicitud al Responsable de la Comisión?',
        nzOnOk: () => this.enviarResponsableComision(),
      });
    } else {
      this._mensaje.warning('Primero debe asignar el departamento...');
    }
  }

  enviarResponsableComision() {
    this.btn_enviar_recomision_loading = true;

    this._solicitudesVicedecanoService
      .sendToReComision(this.token, this.id_solicitud)
      .subscribe(
        (response) => {
          this.btn_enviar_recomision_loading = false;
          console.log(response);
          if (response.status == 'success') {
            this._mensaje.success(
              'Solicitud enviada al Responsable de la Comisión con éxito',
              { nzDuration: 2000 }
            );
            setTimeout(() => {
              this._router.navigate(['homologacionVicedecano']);
            }, 2000);
          } else {
            this._mensaje.success(response.message);
            console.log('Error-response', response);
          }
        },
        (error) => {
          this.btn_enviar_recomision_loading = false;
          console.log(error);
        }
      );
  }

  showModal(): void {
    this.mostrarModal = true;
  }

  handleOk(): void {
    if (this.observaciones !== '') {
      this.rejectSolicitud();
    } else {
      this._mensaje.warning('Debe detallar el motivo del rechazo...', {
        nzDuration: 2000,
      });
    }
  }

  handleCancel(): void {
    this.mostrarModal = false;
  }

  rejectSolicitud() {
    this.btn_rechazar_loading = true;
    let obs = { observaciones: this.observaciones };
    this._solicitudesVicedecanoService
      .rejectSolicitud(
        obs,
        this.token,
        this.solicitud_detallada[0].id_solicitud
      )
      .subscribe(
        (response) => {
          this.btn_rechazar_loading = false;
          if (response.status == 'success') {
            this._mensaje.success('Solicitud rechazada correctamente!', {
              nzDuration: 0,
            });
            setTimeout(() => {
              this._mensaje.remove();
              this._router.navigate([
                'homologacionVicedecano/solicitudesCambioCarrera',
              ]);
            }, 2000);
          } else {
            this._mensaje.remove();
            console.log('Error-response', response);
          }
        },
        (error) => {
          this.btn_rechazar_loading = false;

          console.log(error);
        }
      ),
      () => {
        this.mostrarModal = false;
      };
  }

  correctSolictud() {
    this._urlService.encriptarParametro(this.id_solicitud.toString()).subscribe(
      (id) => {
        this._router.navigate([
          'homologacionVicedecano',
          'marcarCorreciones',
          id,
        ]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPdf(nombrePdf: string) {
    this.btn_pdf_disabled = true;
    this._mensaje.loading('Obteniendo archivo...', { nzDuration: 0 });

    this._archivosService.getPDF(this.token, nombrePdf).subscribe(
      (response) => {
        this.btn_pdf_disabled = false;
        this._mensaje.remove();
        if (response.type === 'application/pdf') {
          const url = URL.createObjectURL(response);
          window.open(url);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this.btn_pdf_disabled = false;
        this._mensaje.remove();
        this._router.navigate(['error']);
      },
      () => {}
    );
  }
}
