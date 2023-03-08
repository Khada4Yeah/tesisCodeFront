import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';

@Component({
  selector: 'app-enviarSolicitud',
  templateUrl: './enviarSolicitud.component.html',
  styleUrls: ['./enviarSolicitud.component.css'],
})
export class EnviarSolicitudComponent implements OnInit {
  // TOKEN Y DATOS ESTUDIANTE
  private token: string;
  public estudiante: any;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;
  public flag_solicitud_generada: boolean;
  public btn_enviar_form_loading: boolean;
  public btn_enviar_form_disabled: boolean;

  // DATOS PARA LLENAR TABLAS
  public materias_solicitud: any;

  // FORMULARIO Y NGZORRO
  public formulario: FormData;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _solicitudService: SolicitudService,
    private _mensaje: NzMessageService
  ) {
    this.token = this._loginService.getToken();
    this.estudiante = this._loginService.getIdentity();

    this.flag_pagina_cargada = false;
    this.flag_solicitud_generada = false;

    this.btn_enviar_form_loading = false;
    this.btn_enviar_form_disabled = false;

    this.formulario = new FormData();
  }

  ngOnInit() {
    this.getMateriasSolicitud();
  }

  getMateriasSolicitud() {
    this._solicitudService
      .getMateriasSolicitud(this.token, this.estudiante.sub, 2)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.flag_solicitud_generada = true;
            this.materias_solicitud = response.materias;
            console.log(this.materias_solicitud);
          } else if (response.status === 'empty') {
            this.flag_solicitud_generada = false;
          } else {
            this._mensaje.error(response.message, { nzDuration: 2000 });
          }
        },
        (error) => {
          this._mensaje.error('Error al consultar los datos', {
            nzDuration: 2000,
          });
          console.log('error', error);
        },
        () => {
          this.flag_pagina_cargada = true;
        }
      );
  }

  pdfComprobante(event: any) {
    let pdf_completo = event.target.files[0];
    if (pdf_completo.size > 4 * 1024 * 1024) {
      this._mensaje.warning(
        'El tamaño máximo aceptado para el archivo es de 4 MB',
        { nzDuration: 2000 }
      );

      event.target.value = null;
    } else if (pdf_completo.type != 'application/pdf') {
      this._mensaje.warning('Sólo se permiten archivos PDF', {
        nzDuration: 2000,
      });
    } else {
      if (this.formulario.has('pdf_completo')) {
        this.formulario.delete('pdf_completo');
      }
      this.formulario.append('pdf_completo', pdf_completo, pdf_completo.name);
    }
  }

  archivosSeleccionado(event: any, materiaId: number) {
    if (event.target.files[0].size > 2 * 1024 * 1024) {
      this._mensaje.warning(
        'El tamaño máximo aceptado para el archivo es de 2 MB',
        { nzDuration: 2000 }
      );

      event.target.value = null;
    } else if (event.target.files[0].type != 'application/pdf') {
      this._mensaje.warning('Sólo se permiten archivos PDF', {
        nzDuration: 2000,
      });
    } else {
      const lista_archivos = event.target.files;
      if (lista_archivos.length > 0) {
        const file = lista_archivos[0];
        const fileName = `${materiaId}`;

        if (this.formulario.has(fileName)) {
          this.formulario.delete(fileName);
        }
        this.formulario.append(fileName, file, file.name);
      }

      let datos: any = {};
      this.formulario.forEach(function (valor, clave) {
        datos[clave] = valor;
      });
      console.log('datos', datos);
    }
  }

  verificarTotalidadArchivos() {
    const cantidad_archivos = Array.from(this.formulario as any).length;
    return cantidad_archivos;
  }

  onSubmit() {
    const cantidad_materias = this.materias_solicitud.length;
    if (this.verificarTotalidadArchivos() != cantidad_materias + 1) {
      this._mensaje.warning('Debe cargar todos los PDFs necesarios', {
        nzDuration: 2000,
      });
    } else {
      this.btn_enviar_form_loading = true;
      this.btn_enviar_form_disabled = true;

      this.formulario.append(
        'solicitudes_id',
        this.materias_solicitud[0].id_solicitud
      );

      this._solicitudService
        .sendPdfMateriasHomologar(this.token, this.formulario)
        .subscribe(
          (response) => {
            this.btn_enviar_form_loading = false;
            if (response.status === 'success') {
              console.log('respuesta', response);
              this._mensaje.success(
                'Solicitud enviada con éxito! Redireccionando a solicitudes enviadas',
                {
                  nzDuration: 2000,
                }
              );
              setTimeout(() => {
                this._router.navigateByUrl(
                  'cambioUniversidad/mostrarSolicitudesEnviadas'
                );
              }, 2000);
            } else {
              this.btn_enviar_form_disabled = false;
              this._mensaje.error(response.message, { nzDuration: 2000 });
              console.log(response);
            }
          },
          (error) => {
            this.btn_enviar_form_disabled = false;
            this.btn_enviar_form_loading = false;
            this._mensaje.error('Error al enviar la solicitud', {
              nzDuration: 2000,
            });
            console.log(error);
          }
        ),
        () => {};
    }
  }
}
