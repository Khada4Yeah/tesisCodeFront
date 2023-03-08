import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudReComisionService } from 'src/app/services/SolicitudReComisionServices/solicitudReComision.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-detalleSolicitudesCambioCarrera',
  templateUrl: './detalleSolicitudesCambioCarrera.component.html',
  styleUrls: ['./detalleSolicitudesCambioCarrera.component.css'],
})
export class DetalleSolicitudesCambioCarreraComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS RESPONSABLE COMISION
  public identity: any;
  public token: string;
  public id_solicitud: number;
  public id_departamento_recomision: number;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public status: string;
  public btn_enviar_comaterias_disabled: boolean;
  public btn_asiganar_docentes_disabled: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;

  // NGZORRO
  public send_comaterias_modal: NzModalRef;

  constructor(
    private _loginService: LoginService,
    private _solicitudesReComision: SolicitudReComisionService,
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
    this.btn_enviar_comaterias_disabled = false;
    this.btn_asiganar_docentes_disabled = true;

    this.id_departamento_recomision = 0;
  }

  ngOnInit() {
    this.getDepartamentoReComision();
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

  getDetalleSolicitud() {
    this._solicitudesReComision
      .getSolicitud(
        this.token,
        this.identity.sub,
        Number(this.id_solicitud),
        this.getTipo()
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.solicitud_detallada = response.detalleSolicitud;
            this.materias_solicitud = response.materiasSolicitud;
          } else {
            console.log('Error: ', response);
          }
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          this.pagina_cargada = true;
          console.log(this.materias_solicitud);

          this.verifyDocentesDep15();
          this.verifyMateriasDep15();
        }
      );
  }

  getDepartamentoReComision() {
    this._solicitudesReComision
      .getDepartamentoReComision(this.token, this.identity.sub)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.id_departamento_recomision = response.id_departamento;
          } else {
            console.log('Error-response', response);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getPdf(nombrePdf: string) {
    this._archivosService.getPDF(this.token, nombrePdf).subscribe(
      (response) => {
        if (response.type === 'application/pdf') {
          const url = URL.createObjectURL(response);
          window.open(url);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {}
    );
  }

  asignarMateriasProfesores() {
    let tipo_solicitud = '';
    if (this.solicitud_detallada[0].tipo === 'CAMBIO CARRERA') {
      tipo_solicitud = 'cambioCarrera';
    } else if (this.solicitud_detallada[0].tipo === 'CAMBIO UNIVERSIDAD') {
      tipo_solicitud = 'cambioUniversidad';
    }

    this._urlService
      .encriptarParametro(this.id_solicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionReComision',
          'asignarDocenteAnalisis',
          tipo_solicitud,
          id,
        ]);
      });
  }

  verifyDocentesDep15() {
    if (this.id_departamento_recomision === 15) {
      for (const element of this.materias_solicitud) {
        if (element.iddepartamento === 15) {
          if (
            element.estado === null ||
            element.estado === 'DOCENTE ASIGNADO'
          ) {
            this.btn_enviar_comaterias_disabled = true;

            break;
          } else {
            this.btn_enviar_comaterias_disabled = false;
          }
        }
      }
    }
  }

  verifyMateriasDep15() {
    for (const element of this.materias_solicitud) {
      if (element.iddepartamento === 15) {
        this.btn_asiganar_docentes_disabled = false;
        break;
      }
    }
  }

  sendCoDepartamental() {
    this.send_comaterias_modal = this._modal.confirm({
      nzTitle:
        '¿Desea enviar la solicitud a el/los Coordinador/a(es) Departamental(es)?',
      nzOnOk: () => {
        this._solicitudesReComision
          .sendToCoMaterias(this.token, this.id_solicitud)
          .subscribe(
            (response) => {
              if (response.status === 'success') {
                this._mensaje.success('Solicitud enviada exitosamente!', {
                  nzDuration: 2000,
                });
                setTimeout(() => {
                  this._router.navigate(['homologacionReComision']);
                }, 2000);
              } else {
                this._mensaje.error(response.message, { nzDuration: 2000 });
                console.log(response);
              }
            },
            (error) => {
              this._mensaje.error('Error al enviar la solicitud...', {
                nzDuration: 2000,
              });
              console.log(error);
            }
          );
      },
      nzOkDisabled:
        this.solicitud_detallada[0].estado_solicitud != 'EN REVISIÓN RC'
          ? true
          : false,
    });
  }
}
