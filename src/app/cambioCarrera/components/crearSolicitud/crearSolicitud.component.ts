import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';

import { Solicitud } from 'src/app/models/solicitud/solicitud';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';
import { MateriasHomologar } from 'src/app/models/solicitud/materia_homologar';

import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-crearSolicitud',
  templateUrl: './crearSolicitud.component.html',
  styleUrls: ['./crearSolicitud.component.css'],
})
export class CrearSolicitudComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS ESTUDIANTE
  private token: string;
  public estudiante: any;
  public escuela_estudiante: any;
  public malla_estudiante: any;

  // VERIFICADORES OBSERVABLES
  public flag_malla_estudiante: boolean;
  public flag_pagina_cargada: boolean;
  public flag_habilta_ver_materias: boolean;
  public flag_habilita_materias: boolean;
  public flag_habilita_agg_materias: boolean;
  public flag_deshabilita_enviar_form: boolean;
  public flag_bloquea_seleccionar_materias: boolean;
  public flag_permite_crear_solicitud: boolean;
  public btn_crear_solicitud_loading: boolean;

  // FORMULARIO Y NGZORRO
  public list: TransferItem[];

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public solicitud: Solicitud;
  public escuelas: any;
  public materias: any;
  public materias_homologar: MateriasHomologar[];

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _solicitudService: SolicitudService,
    private _mensaje: NzMessageService
  ) {
    this.token = this._loginService.getToken();
    this.estudiante = this._loginService.getIdentity();

    this.flag_malla_estudiante = false;
    this.flag_pagina_cargada = false;
    this.flag_habilita_materias = false;
    this.flag_habilita_agg_materias = false;
    this.flag_habilta_ver_materias = false;
    this.flag_deshabilita_enviar_form = false;
    this.flag_bloquea_seleccionar_materias = false;
    this.flag_permite_crear_solicitud = false;
    this.btn_crear_solicitud_loading = false;

    this.solicitud = new Solicitud(
      0,
      null,
      0,
      null,
      null,
      null,
      null,
      0,
      'CAMBIO CARRERA',
      null,
      '',
      ''
    );

    this.list = [];
  }

  ngOnInit(): void {
    this.getUltimaSolicitud();
    this.getEscuelaEstudiante();
    this.getEscuelasDestino();
  }

  // VERIFICAR SI EL ESTUIDANTE NO TIENE MAS DE UNA SOLICITUD QUE
  // NO ESTE RECHAZADA O ANULADA
  getUltimaSolicitud() {
    this._solicitudService
      .getUltimaSolicitud(this.token, this.estudiante.sub, 1)
      .subscribe((response) => {
        if (response.status === 'success') {
          this.flag_permite_crear_solicitud = false;
        } else if (response.status === 'empty') {
          this.flag_permite_crear_solicitud = true;
        }
      });
  }

  // OBTENER ESCUELAS DEL ESTUDIANTE
  getEscuelaEstudiante() {
    this._solicitudService
      .getEscuelaEstudiante(this.token, this.estudiante.sub)
      .subscribe((response) => {
        if (response.status == 'success') {
          this.escuela_estudiante = response.escuelas;
        }
      });
  }

  // OBTENER MALLAS SEGUN ESCUELA DEL ESTUDIANTE
  getMallaEstudiante(id: any) {
    this._solicitudService
      .getMallaEstudiante(
        this.token,
        this.estudiante.sub,
        this.solicitud.escuelas_origen_id
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.malla_estudiante = response.mallas;
          } else {
            console.log('response-error', response);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }

  getEscuelasDestino() {
    this._solicitudService.getEscuelas(this.token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.escuelas = response.escuelas;
        }
      },
      (errror) => {},
      () => {
        this.flag_pagina_cargada = true;
      }
    );
  }

  habilitaBtnVerMaterias(e: any) {
    this.flag_habilta_ver_materias = true;
  }

  getMaterias(ex: MouseEvent) {
    ex.preventDefault();
    this._solicitudService
      .getMallaMateriasEscuela(this.token, this.solicitud.escuelas_destino_id)
      .subscribe(
        (response) => {
          console.log(response);
          if ((response.status = 'success')) {
            this.materias = response.materias;
            console.log(this.materias);
          }
        },
        (error) => {},
        () => {
          this.flag_habilita_materias = true;
          this.flag_habilta_ver_materias = false;
          this.getMateriasTransfer();
        }
      );
  }

  // TRANSFER COMPONENT
  getMateriasTransfer(): void {
    const ret: TransferItem[] = [];
    this.materias.forEach((value: any, index: any) => {
      ret.push({
        key: index.toString(),
        title: `${value.materia}`,
        direction: 'left',
        malla: value.malla_id,
        escuela: value.escuela_id,
        materia: value.materia_id,
      });
    });
    this.list = ret;
  }

  change(ret: TransferChange): void {
    this.xd(this.list);
    for (const element of this.list) {
      if (element.direction == 'right') {
        this.flag_habilita_agg_materias = true;
        break;
      }
      this.flag_habilita_agg_materias = false;
    }
  }

  xd(r: TransferItem[]) {
    r.forEach((element: any) => {
      if (element.direction == 'right') {
        console.log('materiadentro', element);
      }
    });
  }

  onClickMateriaButton(e: MouseEvent): void {
    e.preventDefault();
    this.materias_homologar = [
      new MateriasHomologar(0, 0, 0, 0, '', 0, 0, 0, 0, '', 0, ''),
    ];
    this.list.forEach((element: any) => {
      if (element.direction == 'right') {
        this.materias_homologar.push(
          new MateriasHomologar(
            0,
            element.malla,
            element.escuela,
            element.materia,
            '',
            0,
            0,
            0,
            0,
            '',
            0,
            ''
          )
        );
      }
    });
    this.mensajeMateriasAgg();
    this.flag_habilita_agg_materias = false;
    this.flag_bloquea_seleccionar_materias = true;
  }

  mensajeMateriasAgg() {
    this._mensaje.success('Materias Agregadas', { nzDuration: 2000 });
  }

  // UNIR OBJETOS DE SOLICITUD Y MATERIAS
  unirObjetos() {
    this.materias_homologar.splice(0, 1);
    this.solicitud.personal_id = +this.estudiante.sub;
    let json = {
      solicitud: this.solicitud,
      materias_homologar: this.materias_homologar,
    };
    console.log(JSON.stringify(json));
    return json;
  }

  mensajeSubmit() {
    this._mensaje.create('warning', 'Rellene todos los campos', {
      nzDuration: 2000,
    });
  }

  // ENVIAR FORMULARIO AL SERVIDOR
  onSubmit(form: Form) {
    if (
      this.solicitud.escuelas_origen_id != 0 &&
      this.solicitud.malla_origen_id != 0 &&
      this.solicitud.modalidad1_id != 0 &&
      this.solicitud.escuelas_destino_id != 0 &&
      this.materias_homologar != undefined &&
      this.materias_homologar != null
    ) {
      this.btn_crear_solicitud_loading = true;
      this._solicitudService
        .createSolicitud(this.token, this.unirObjetos())
        .subscribe(
          (response) => {
            console.log('Respuesta', response);
            if (response.status == 'success') {
              this._mensaje.success('Solicitud creada con éxito!', {
                nzDuration: 2000,
              });
              setTimeout(() => {
                this._router.navigate(['cambioCarrera', 'mostrarSolicitudes']);
              }, 2000);
            } else {
              this._mensaje.error('Error al crear la solicitud...', {
                nzDuration: 2000,
              });
              console.log('Error-response: ', response);
            }
            this.btn_crear_solicitud_loading = false;
          },
          (error) => {
            this._mensaje.error('Error al crear la solicitud...', {
              nzDuration: 2000,
            });
            console.log(error);
            this.btn_crear_solicitud_loading = false;
          },
          () => {
            this.flag_deshabilita_enviar_form = true;
          }
        );
    } else {
      this.mensajeSubmit();
    }
  }
}
