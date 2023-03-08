import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Solicitud } from 'src/app/models/solicitud/solicitud';
import { MateriasHomologar } from 'src/app/models/solicitud/materia_homologar';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';

import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RegisterService } from 'src/app/services/LoginServices/register.service';

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
  public datos_estudiante: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public flag_habilta_ver_materias: boolean;
  public flag_habilita_materias: boolean;
  public flag_habilita_agg_materias: boolean;
  public flag_bloquea_seleccionar_materias: boolean;
  public flag_deshabilita_enviar_form: boolean;
  public flag_datos_estudiante: boolean;
  public flag_permite_crear_solicitud: boolean;

  // FORMULARIO Y NGZORRO
  public list: TransferItem[];

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public solicitud: Solicitud;
  public universidades: any;
  public escuelas: any;
  public materias: any;
  public materias_homologar: MateriasHomologar[];

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _solicitudService: SolicitudService,
    private _mensaje: NzMessageService,
    private _registerService: RegisterService
  ) {
    this.token = this._loginService.getToken();
    this.estudiante = this._loginService.getIdentity();
    console.log(this.estudiante);

    this.pagina_cargada = false;
    this.flag_habilita_materias = false;
    this.flag_habilita_agg_materias = false;
    this.flag_habilta_ver_materias = false;
    this.flag_deshabilita_enviar_form = false;
    this.flag_datos_estudiante = true;
    this.flag_permite_crear_solicitud = false;

    this.solicitud = new Solicitud(
      0,
      null,
      0,
      0,
      0,
      null,
      null,
      0,
      'CAMBIO UNIVERSIDAD',
      '',
      '',
      ''
    );

    this.materias_homologar = [];

    this.list = [];
  }

  ngOnInit() {
    this.getUniversidades();
    this.getDatosEstudiante();
    this.getUltimaSolicitud();
    this.getEscuelasDestino();
  }

  getDatosEstudiante() {
    this._registerService
      .getDatosEstudiante(this.token, this.estudiante.sub)
      .subscribe(
        (response) => {
          console.log(response);

          if (response.status === 'success') {
            this.datos_estudiante = response.usuario;
          }
        },
        (error) => console.log(error),

        () => {
          console.log('datos es', this.datos_estudiante);

          if (this.datos_estudiante.nivel_origen === null) {
            this.flag_datos_estudiante = false;
          }
        }
      );
  }

  // VERIFICAR SI EL ESTUIDANTE NO TIENE MAS DE UNA SOLICITUD QUE
  // NO ESTE RECHAZADA O ANULADA
  getUltimaSolicitud() {
    this._solicitudService
      .getUltimaSolicitud(this.token, this.estudiante.sub, 2)
      .subscribe((response) => {
        if (response.status === 'success') {
          this.flag_permite_crear_solicitud = false;
        } else if (response.status === 'empty') {
          this.flag_permite_crear_solicitud = true;
        }
      });
  }

  getUniversidades() {
    this._solicitudService.getUniversidades(this.token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.universidades = response.universidades;
        }
      },
      (error) => {}
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
        this.pagina_cargada = true;
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
    this._mensaje.create('success', 'Materias Agregadas', { nzDuration: 2000 });
  }

  // UNIR OBJETOS DE SOLICITUD Y MATERIAS
  unirObjetos() {
    this.solicitud.usuarios_foraneos_id = +this.estudiante.sub;

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
  onSubmit() {
    console.log(this.unirObjetos());
    if (
      this.solicitud.universidades_id != 0 &&
      this.solicitud.modalidad1_id != 0 &&
      this.solicitud.escuelas_destino_id != 0 &&
      this.materias_homologar != undefined &&
      this.materias_homologar != null
    ) {
      this._solicitudService
        .createSolicitud(this.token, this.unirObjetos())
        .subscribe(
          (response) => {
            console.log('Respuesta', response);
            if (response.status == 'success') {
              this._mensaje.success('Solicitud creada con éxito!');
              setTimeout(() => {
                this._router.navigate(['cambioUniversidad/mostrarSolicitudes']);
              }, 2000);
            } else {
              this._mensaje.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            this.flag_deshabilita_enviar_form = false;
          }
        );
    } else {
      this.mensajeSubmit();
    }
  }
}
