import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { PdfMateriaSolicitudService } from 'src/app/services/PdfMateriasSolicitudServices/pdfMateriaSolicitud.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-detalleSolicitudesCambioCarrera',
  templateUrl: './detalleSolicitudesCambioCarrera.component.html',
  styleUrls: ['./detalleSolicitudesCambioCarrera.component.css'],
})
export class DetalleSolicitudesCambioCarreraComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;
  // TOKEN Y DATOS DOCENTE ANALISIS
  public identity: any;
  public token: string;
  public id_solicitud: number;
  public materias_id: number[];

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public btn_generar_pdf_analisis_loading: boolean;
  public btn_subir_analisis_disabled: boolean;
  public btn_enviar_loading: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;

  public formData: FormData;

  constructor(
    private _loginService: LoginService,
    private _pdfMateriaSolicitud: PdfMateriaSolicitudService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensaje: NzMessageService,
    private modal: NzModalService,
    private _archivosService: ArchivosService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.formData = new FormData();

    this.pagina_cargada = false;
    this.btn_generar_pdf_analisis_loading = false;
    this.btn_subir_analisis_disabled = false;
    this.btn_enviar_loading = false;
  }

  ngOnInit() {
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
    this._pdfMateriaSolicitud
      .getSolicitud(
        this.token,
        this.identity.sub,
        this.id_solicitud,
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
          this.verifyAnalisisMaterias();
          this.pagina_cargada = true;
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
          this._mensaje;
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {}
    );
  }

  realizarAnalisisDocente(idMateria: number) {
    let idS = '';
    let idM = '';
    let tipo = this._route.snapshot.paramMap.get('tipo');
    if (tipo !== 'cambioCarrera' && tipo !== 'cambioUniversidad') {
      this._router.navigate(['error']);
    }

    this._urlService.encriptarParametro(idMateria.toString()).subscribe(
      (id) => {
        idM = id;
      },
      (error) => this._router.navigate(['error'])
    );

    this._urlService.encriptarParametro(this.id_solicitud.toString()).subscribe(
      (id) => {
        idS = id;
      },
      (error) => this._router.navigate(['error'])
    );

    this._router.navigate([
      'homologacionDoAnalisis',
      'crearAnalisis',
      tipo,
      idM,
      idS,
    ]);
  }

  crearPdfAnalisis() {
    this.btn_generar_pdf_analisis_loading = true;
    let arrayIdsMaterias: any[] = [];

    this.materias_solicitud.forEach((element: { materia_id: any }) => {
      arrayIdsMaterias.push(element.materia_id);
    });

    this._pdfMateriaSolicitud
      .createPdfAnalisis(
        this.token,
        arrayIdsMaterias,
        this.id_solicitud,
        this.identity.sub,
        this.getTipo()
      )
      .subscribe(
        (response) => {
          if (response.type === 'application/pdf') {
            const url = URL.createObjectURL(response);
            window.open(url);
          } else {
            this._mensaje.create('error', 'Error al generar el PDF', {
              nzDuration: 2000,
            });
          }
        },
        (error) => {
          console.log(error);
          this.btn_generar_pdf_analisis_loading = false;
        },
        () => {
          this.btn_generar_pdf_analisis_loading = false;
        }
      );
  }

  crearModalUploadPdf(tplContent: TemplateRef<{}>) {
    const modal = this.modal.create({
      nzTitle: 'Subir PDF Ánalisis Firmado',
      nzContent: tplContent,
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Enviar',
          type: 'primary',
          loading: this.btn_enviar_loading,
          onClick: () => {
            this.btn_enviar_loading;
            this.uploadPdfAnalisis();
          },
        },
        {
          label: 'Cancelar',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  pdfComprobante(event: any) {
    let pdf_firmado = event.target.files[0];
    if (pdf_firmado.size > 1 * 1024 * 1024) {
      this._mensaje.warning(
        'El tamaño máximo aceptado para el archivo es de 1 MB',
        { nzDuration: 2000 }
      );

      event.target.value = null;
    } else if (pdf_firmado.type != 'application/pdf') {
      this._mensaje.warning('Sólo se permiten archivos PDF', {
        nzDuration: 2000,
      });
      event.target.value = null;
    } else {
      if (this.formData.has('file0')) {
        this.formData.delete('file0');
      }
      this.formData.append('file0', pdf_firmado, pdf_firmado.name);
    }
  }

  verifyAnalisisMaterias() {
    for (const element of this.materias_solicitud) {
      if (element.estado !== 'DATOS ESTABLECIDOS') {
        this.btn_subir_analisis_disabled = true;
        break;
      } else {
        this.btn_subir_analisis_disabled = false;
      }
    }
  }

  uploadPdfAnalisis() {
    if (this.formData.has('file0')) {
      this.btn_enviar_loading = true;
      this.materias_id = [];
      for (const element of this.materias_solicitud) {
        this.materias_id.push(element.materia_id);
      }

      this.formData.append('solicitudes_id', this.id_solicitud.toString());
      this.formData.append('materias_id', JSON.stringify(this.materias_id));

      let datos: any = {};
      this.formData.forEach(function (valor, clave) {
        datos[clave] = valor;
      });
      console.log('datos', datos);

      this._pdfMateriaSolicitud
        .uploadPdfAnalisis(this.token, this.formData)
        .subscribe(
          (response) => {
            this.btn_enviar_loading = false;
            console.log(response);
            if (response.status === 'success') {
              this._mensaje.success('Archivo cargado correctamente', {
                nzDuration: 2000,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              this._mensaje.error(response.error, { nzDuration: 2000 });
              console.log(response);
            }
          },
          (error) => {
            this.btn_enviar_loading = false;
            console.log(error);
          }
        );
    } else {
      this._mensaje.warning('No ha seleccionado ningún archivo PDF', {
        nzDuration: 2000,
      });
    }
  }

  paginaAnterior() {
    const tipo =
      this._route.snapshot.paramMap.get('tipo') === 'cambioCarrera'
        ? 'solicitudesCambioCarrera'
        : 'solicitudesCambioUniversidad';

    this._router.navigate(['homologacionDoAnalisis', tipo]);
  }
}
