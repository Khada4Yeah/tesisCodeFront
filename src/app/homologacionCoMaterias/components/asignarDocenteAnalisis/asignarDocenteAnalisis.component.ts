import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { PdfMateriaSolicitudService } from 'src/app/services/PdfMateriasSolicitudServices/pdfMateriaSolicitud.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { SolicitudCoMateriasService } from 'src/app/services/SolicitudCoMateriasServices/solicitudCoMaterias.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-asignarDocenteAnalisis',
  templateUrl: './asignarDocenteAnalisis.component.html',
  styleUrls: ['./asignarDocenteAnalisis.component.css'],
})
export class AsignarDocenteAnalisisComponent implements OnInit {
  // TOKEN Y DATOS RESPONSABLE COMISION
  public token: string;
  public identity: any;

  // DATOS PARA RELLENAR TABLAS
  public id_solicitud: number;
  public solicitud_detallada: any;
  public materias_solicitud: any;
  public docentes_departamento: any;

  // DATOS PARA ENVIAR
  public id_docente: number;
  public id_materia: number;
  public id_departamento_comaterias: number;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public flag_asignaciones_finalizadas: boolean;
  public flag_pdf_obtenido: boolean;
  public btn_finalizar_asignaciones_loading: boolean;

  constructor(
    private _loginService: LoginService,
    private _solicitudesCoMaterias: SolicitudCoMateriasService,
    private _pdfMateriaSolicitud: PdfMateriaSolicitudService,
    private _route: ActivatedRoute,
    private _router: Router,
    private alerta: NzMessageService,
    private modal: NzModalService,
    private _archivosService: ArchivosService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.id_docente = 0;

    this.pagina_cargada = false;
    this.flag_pdf_obtenido = false;
  }

  ngOnInit() {
    this.getDepartamentoCoMaterias();
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
    this._solicitudesCoMaterias
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
            console.log(this.materias_solicitud);
          } else {
            console.log('Error: ', response);
          }
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          this.materias_solicitud = this.filterMateriasDepartamento();
          this.verifyAsignacionesFinalizadas();
          this.pagina_cargada = true;
          console.log(this.materias_solicitud);
        }
      );
  }

  getDepartamentoCoMaterias() {
    this._solicitudesCoMaterias
      .getDepartamentoCoMaterias(this.token, this.identity.sub)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.id_departamento_comaterias = response.id_departamento;
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
    this.flag_pdf_obtenido = true;

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
        this.flag_pdf_obtenido = false;
      },
      () => {
        this.flag_pdf_obtenido = false;
      }
    );
  }

  getDocentesDepartamento(idDepartamento: number) {
    this._pdfMateriaSolicitud
      .getDocentesDepartamento(this.token, idDepartamento)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status === 'success') {
            this.docentes_departamento = response.docentes;
          } else {
            console.log('Response-error', response);
            this.alerta.create(
              'error',
              'No se pudo cargar la lista de docentes.',
              {
                nzDuration: 2000,
              }
            );
          }
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }

  filterMateriasDepartamento() {
    if (
      this.materias_solicitud !== null &&
      this.materias_solicitud !== undefined
    ) {
      return this.materias_solicitud.filter(
        (element: any) =>
          element.iddepartamento === this.id_departamento_comaterias
      );
    }
  }

  verifyAsignacionesFinalizadas() {
    for (const element of this.materias_solicitud) {
      if (
        element.estado_materia === null ||
        element.estado_materia === 'DOCENTE ASIGNADO'
      ) {
        this.flag_asignaciones_finalizadas = false;
        break;
      } else {
        this.flag_asignaciones_finalizadas = true;
      }
    }
  }

  crearModalCambioDocente(tplContent: TemplateRef<{}>, idDepartamento: number) {
    this.getDocentesDepartamento(idDepartamento);
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Cambio de Docente del Análisis',
      nzContent: tplContent,
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => {
            this.id_docente = 0;
            modal.destroy();
          },
        },
      ],
    });
  }

  cambiarDocenteAnalisis(materiaId: number) {
    let parametros = {
      personal_id: this.id_docente,
      solicitudes_id: +this.id_solicitud,
      materia_id: materiaId,
    };

    this._pdfMateriaSolicitud
      .actualizarDocenteAnalisis(this.token, parametros)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.alerta.create('success', 'Docente cambiado con éxito.', {
              nzDuration: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            this.alerta.create('error', response.error, {
              nzDuration: 2000,
            });
          }
        },
        (error) => {
          this.alerta.create('error', 'Error al enviar los datos.', {
            nzDuration: 2000,
          });
          console.log('error', error);
        },
        () => {}
      );
  }

  cerrarAsignacionDocente() {
    let flag_completado = true;
    for (const element of this.materias_solicitud) {
      if (element.n_docente === null) {
        flag_completado = false;
        break;
      }
    }

    if (flag_completado) {
      this.btn_finalizar_asignaciones_loading = true;

      let datos = {
        solicitudes_id: this.id_solicitud,
        personal_id: this.identity.sub,
      };
      this._pdfMateriaSolicitud
        .closeAsignacionDocentes(this.token, datos)
        .subscribe(
          (response) => {
            if (response.status === 'success') {
              this.alerta.create(
                'success',
                'Asignaciones finalizadas correctamente.',
                {
                  nzDuration: 2000,
                }
              );

              setTimeout(() => {
                this._router.navigateByUrl('homologacionCoMaterias');
              }, 2000);
            } else {
              this.alerta.create('error', response.message, {
                nzDuration: 2000,
              });
            }
          },
          (error) => {
            this.btn_finalizar_asignaciones_loading = false;
            this.alerta.create('error', 'Asignaciones no finalizadas.', {
              nzDuration: 2000,
            });
          },
          () => {
            this.btn_finalizar_asignaciones_loading = false;
          }
        );
    } else {
      this.alerta.create('warning', 'Faltan asiganar docentes', {
        nzDuration: 2000,
      });
    }
  }

  paginaAnterior() {
    this._urlService.encriptarParametro(this.id_solicitud.toString()).subscribe(
      (id) => {
        const tipo = this._route.snapshot.paramMap.get('tipo') ?? '';
        this._router.navigate([
          'homologacionCoMaterias',
          'detalleSolicitud',
          tipo,
          id,
        ]);
      },
      (error) => {
        this._router.navigate(['error']);
      }
    );
  }
}
