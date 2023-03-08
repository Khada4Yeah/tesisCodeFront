import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';
import { LoginService } from 'src/app/services/LoginServices/login.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { UrlService } from 'src/app/services/UrlServices/url.service';

interface Solicitud {
  id_solicitud: number;
  personal_id: number | null;
  modalidad1_id: number;
  usuarios_foraneos_id: number | null;
  universidades_id: number | null;
  escuelas_origen_id: number | null;
  malla_origen_id: number;
  escuelas_destino_id: number;
  tipo: string;
}

interface MateriasHomologar {
  malla_id: number;
  escuela_id: number;
  materia_id: number;
}

@Component({
  selector: 'app-editarSolicitud',
  templateUrl: './editarSolicitud.component.html',
  styleUrls: ['./editarSolicitud.component.css'],
})
export class EditarSolicitudComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS ESTUDIANTE
  public estudiante: any;
  public token: string;
  public id_solicitud: string;
  public escuela_estudiante: any;
  public malla_estudiante: any;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;
  public flag_materias_agregadas: boolean;
  public transfer_materias_disabled: boolean;
  public btn_form_loading: boolean;
  public btn_ver_materias_disabled: boolean;
  public btn_agregar_materias_disabled: boolean;
  public btn_crear_solicitud_loading: boolean;

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public escuelas: any;
  public materias: any;
  public materias_homologar: MateriasHomologar[];
  private solicitud: Solicitud;

  // NG-ZORRO
  public validacionFormulario!: FormGroup;
  public listaMateriasTransfer: TransferItem[];

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private mensaje: NzMessageService,
    private _solicitudService: SolicitudService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.estudiante = this._loginService.getIdentity();

    this.materias_homologar = [];

    this.flag_pagina_cargada = false;
    this.flag_materias_agregadas = false;

    this.btn_form_loading = false;
    this.btn_ver_materias_disabled = true;
    this.transfer_materias_disabled = true;
    this.btn_agregar_materias_disabled = true;
    this.btn_crear_solicitud_loading = false;

    this.listaMateriasTransfer = [];
  }

  ngOnInit() {
    this.getIdSolicitud();
    this.inicializarValidacionFormulario();
    this.getEscuelaEstudiante();
    this.getEscuelasDestino();
  }

  // OBTENER EL ID DE LA SOLICITUD
  getIdSolicitud() {
    this.id_solicitud = this._route.snapshot.paramMap.get('id') ?? '';
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
  getMallaEstudiante(e: any) {
    if (this.validacionFormulario.value.escuelasOrigen !== null) {
      this._solicitudService
        .getMallaEstudiante(
          this.token,
          this.estudiante.sub,
          this.validacionFormulario.value.escuelasOrigen
        )
        .subscribe(
          (response) => {
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

  habilitaBtnVerMaterias() {
    if (this.validacionFormulario.value.escuelaDestino !== null) {
      this.btn_ver_materias_disabled = false;
    }
  }

  getMaterias(e: MouseEvent) {
    e.preventDefault();
    this.btn_ver_materias_disabled = true;

    this._solicitudService
      .getMallaMateriasEscuela(
        this.token,
        this.validacionFormulario.value.escuelaDestino
      )
      .subscribe(
        (response) => {
          console.log(response);
          if ((response.status = 'success')) {
            this.materias = response.materias;
          }
        },
        (error) => {},
        () => {
          this.setMateriasTransfer();
          this.transfer_materias_disabled = false;
        }
      );
  }

  setMateriasTransfer() {
    const listaFinal: TransferItem[] = [];
    this.materias.forEach((value: any, index: any) => {
      listaFinal.push({
        key: index.toString(),
        title: `${value.materia}`,
        direction: 'left',
        malla: value.malla_id,
        escuela: value.escuela_id,
        materia: value.materia_id,
      });
    });
    this.listaMateriasTransfer = listaFinal;
  }

  cambioTransfer(ret: TransferChange): void {
    for (const element of this.listaMateriasTransfer) {
      if (element.direction == 'right') {
        this.btn_agregar_materias_disabled = false;
        break;
      }
      this.btn_agregar_materias_disabled = true;
    }
  }

  addMateriasHomologar(e: MouseEvent) {
    e.preventDefault();

    this.materias_homologar = [];

    this.listaMateriasTransfer.forEach((element: any) => {
      if (element.direction === 'right') {
        this.materias_homologar.push({
          malla_id: element.malla,
          escuela_id: element.escuela,
          materia_id: element.materia,
        });
      }
    });

    this.mensaje.success('Materias Agregadas', { nzDuration: 2000 });
    this.btn_agregar_materias_disabled = true;
    this.transfer_materias_disabled = true;
    this.flag_materias_agregadas = true;
  }

  inicializarValidacionFormulario() {
    this.validacionFormulario = this.fb.group({
      escuelasOrigen: [null, [Validators.required]],
      mallasOrigen: [null, [Validators.required]],
      modalidad: [null, [Validators.required]],
      escuelaDestino: [null, [Validators.required]],
    });
  }

  decryptParametro() {
    this._urlService
      .desencriptarParametro(this.id_solicitud.toString())
      .subscribe(
        (id) => {
          this.id_solicitud = id;
        },
        (error) => this._router.navigate([error])
      );
  }

  guardarDatos() {
    console.log(this.id_solicitud);
    if (this.validacionFormulario.valid && this.flag_materias_agregadas) {
      this.btn_form_loading = true;
      this.decryptParametro();
      this.solicitud = {
        id_solicitud: +this.id_solicitud,
        personal_id: this.estudiante.sub,
        usuarios_foraneos_id: null,
        universidades_id: null,
        escuelas_origen_id: this.validacionFormulario.value.escuelasOrigen,
        malla_origen_id: this.validacionFormulario.value.mallasOrigen,
        modalidad1_id: +this.validacionFormulario.value.modalidad,
        escuelas_destino_id: this.validacionFormulario.value.escuelaDestino,
        tipo: 'CAMBIO CARRERA',
      };

      const json = {
        solicitud: this.solicitud,
        materias_homologar: this.materias_homologar,
      };

      this._solicitudService.updateSolicitud(this.token, json).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.mensaje.success('Solicitud actualizada correctamente', {
              nzDuration: 2000,
            });

            setTimeout(() => {
              this._router.navigateByUrl('cambioCarrera/mostrarSolicitudes');
            }, 2000);
          } else {
            this.mensaje.error('', { nzDuration: 2000 });
          }
        },
        (error) => {
          this.mensaje.error(error.message, { nzDuration: 2000 });
          this.btn_form_loading = false;
        },
        () => {
          this.btn_form_loading = false;
        }
      );
    } else {
      this.mensaje.warning('Rellene todos los campos', { nzDuration: 2000 });
      Object.values(this.validacionFormulario.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
