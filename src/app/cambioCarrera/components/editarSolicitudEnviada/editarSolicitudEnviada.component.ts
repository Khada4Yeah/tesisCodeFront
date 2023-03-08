import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';

import { NzMessageService } from 'ng-zorro-antd/message';

import * as CryptoJS from 'crypto-js';
import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';

@Component({
  selector: 'app-editarSolicitudEnviada',
  templateUrl: './editarSolicitudEnviada.component.html',
  styleUrls: ['./editarSolicitudEnviada.component.css'],
})
export class EditarSolicitudEnviadaComponent implements OnInit {
  // TOKEN Y DATOS ESTUDIANTE
  public estudiante: any;
  public token: string;

  // DATOS PARA LLENAR TABLAS
  public materias_solicitud: any;
  public solicitud: any;
  public id_solicitud: any;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;
  public btn_pdf_disabled: boolean;
  public flag_solicitud_generada: boolean;
  public btn_enviar_form_loading: boolean;
  public btn_enviar_form_disabled: boolean;

  // FORMULARIO Y NGZORRO
  public formulario: FormData;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _archivosService: ArchivosService,
    private _mensaje: NzMessageService,
    private _solicitudService: SolicitudService
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
    this.decryptId();
    this.getSolicitudMateriasCorrecion();
  }

  decryptId() {
    const idEncrypted = this._route.snapshot.paramMap.get('id');

    if (idEncrypted) {
      const idDecrypted = CryptoJS.AES.decrypt(
        idEncrypted,
        'ecrPad21_2>2'
      ).toString(CryptoJS.enc.Utf8);
      this.id_solicitud = idDecrypted;
      console.log('id a editar', this.id_solicitud);
    }
  }

  getSolicitudMateriasCorrecion() {
    this._solicitudService
      .getSolicitudMateriasCorrecion(this.token, this.estudiante.sub, 1)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.solicitud = response.solicitud;
            this.materias_solicitud = response.materias;
            console.log(this.solicitud);
            console.log(this.materias_solicitud);
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
    if (
      this.verificarTotalidadArchivos() !=
      cantidad_materias + (this.solicitud.pdf_completo === null ? 1 : 0)
    ) {
      this._mensaje.warning('Debe cargar todos los PDFs necesarios', {
        nzDuration: 2000,
      });
    } else {
      this.btn_enviar_form_loading = true;
      this.btn_enviar_form_disabled = true;

      this.formulario.append('solicitudes_id', this.id_solicitud);

      this._solicitudService
        .updateSolicitudMaterias(this.token, this.formulario)
        .subscribe(
          (response) => {
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
                  'cambioCarrera/mostrarSolicitudesEnviadas'
                );
              }, 2000);
            } else {
              this._mensaje.error(response.message, { nzDuration: 2000 });
              console.log(response);
            }
          },
          (error) => {
            this.btn_enviar_form_loading = false;
            this._mensaje.error('Error al enviar la solicitud', {
              nzDuration: 2000,
            });
            console.log(error);
          }
        ),
        () => {
          this.btn_enviar_form_loading = false;
        };
    }
  }
}
