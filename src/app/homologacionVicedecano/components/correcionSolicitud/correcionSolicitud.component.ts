import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudVicedecanoService } from 'src/app/services/SolicitudVicedecanoServices/solicitudVicedecano.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import * as CryptoJS from 'crypto-js';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-correcionSolicitud',
  templateUrl: './correcionSolicitud.component.html',
  styleUrls: ['./correcionSolicitud.component.css'],
})
export class CorrecionSolicitudComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS VICEDECANO
  public identity: any;
  public token: string;
  public id_solicitud: number;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public btn_pdf_disabled: boolean;
  public bt_enviar_loading: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;

  // FORMULARIO Y NG-ZORRO
  public set_filas_seleccionadas = new Set<number>();
  public observaciones_formulario: string;

  constructor(
    private _loginService: LoginService,
    private _solicitudesVicedecanoService: SolicitudVicedecanoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _archivosService: ArchivosService,
    private _mensaje: NzMessageService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;
    this.btn_pdf_disabled = false;
    this.bt_enviar_loading = false;

    this.observaciones_formulario = '';
  }

  ngOnInit() {
    this.getIdSolicitud();
    this.decryptId();
  }

  getIdSolicitud() {
    return this._route.snapshot.paramMap.get('id') ?? '';
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
    this._solicitudesVicedecanoService
      .getSolicitud(this.token, this.identity.sub, this.id_solicitud, 1)
      .subscribe(
        (response) => {
          if (response.status == 'success') {
            this.solicitud_detallada = response.detalleSolicitud;
            this.materias_solicitud = response.materiasSolicitud;
            console.log(this.materias_solicitud);
            console.log(this.solicitud_detallada);
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
          this._mensaje.error('Archivo no encontrado...', { nzDuration: 2000 });
          this.btn_pdf_disabled = false;
        }
      },
      (error) => {
        this._mensaje.remove();
        this._mensaje.error('Archivo no encontrado...', { nzDuration: 2000 });
        this.btn_pdf_disabled = false;
      },
      () => {}
    );
  }

  updateSetSeleccionada(id: number, seleccionada: boolean) {
    if (seleccionada) {
      this.set_filas_seleccionadas.add(id);
    } else {
      this.set_filas_seleccionadas.delete(id);
    }
  }

  onFilaSeleccionada(id: number, seleccionada: boolean) {
    this.updateSetSeleccionada(id, seleccionada);
    console.log(this.set_filas_seleccionadas);
  }

  sendParaCorreccion() {
    if (this.observaciones_formulario !== '') {
      this.bt_enviar_loading = true;
      let arrayMaterias: any[] = [];

      this.set_filas_seleccionadas.forEach((element: any) => {
        arrayMaterias.push({
          materia_id: element,
        });
      });

      const datos = {
        solicitudes_id: this.id_solicitud,
        materias: arrayMaterias,
        observaciones: this.observaciones_formulario,
      };

      this._solicitudesVicedecanoService
        .sendParaCorreccion(this.token, datos)
        .subscribe(
          (response) => {
            this.bt_enviar_loading = false;
            if (response.status === 'success') {
              this._mensaje.success(
                'Solicitud devuelta exitosamente. Redireccionando a Solicitudes',
                {
                  nzDuration: 2000,
                }
              );
              setTimeout(() => {
                this._router.navigateByUrl(
                  'homologacionVicedecano/solicitudesCambioCarrera'
                );
              }, 2000);
            } else {
              this._mensaje.error(response.message, { nzDuration: 2000 });
            }
          },
          (error) => {
            this.bt_enviar_loading = false;
            this._mensaje.error(error.message, { nzDuration: 2000 });
          }
        );
    } else {
      this._mensaje.warning('Debe detallar los errores a corregir', {
        nzDuration: 2000,
      });
    }
  }
}
