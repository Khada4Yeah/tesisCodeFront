import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { RegisterService } from 'src/app/services/LoginServices/register.service';
import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';

@Component({
  selector: 'app-editarDatosEstudiante',
  templateUrl: './editarDatosEstudiante.component.html',
  styleUrls: ['./editarDatosEstudiante.component.css'],
})
export class EditarDatosEstudianteComponent implements OnInit {
  // TOKEN Y DATOS ESTUDIANTE
  public token: string;
  public identity: any;
  public datos_estudiante: any;

  // FORMULARIO Y NG-ZORRO
  public formulario: FormGroup;
  public niveles: string[];

  // VERIFICADORES OBSERVABLE
  public pagina_cargada: boolean;
  public btn_guardar_loading: boolean;
  public btn_guardar_disabled: boolean;
  public flag_editar_datos_disabled: boolean;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _registerService: RegisterService,
    private _fb: FormBuilder,
    private _mensaje: NzMessageService,
    private _solicitudService: SolicitudService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;
    this.btn_guardar_disabled = false;
    this.btn_guardar_loading = false;
    this.flag_editar_datos_disabled = false;

    this.niveles = [
      'PRIMER',
      'SEGUNDO',
      'TERCER',
      'CUARTO',
      'QUINTO',
      'SEXTO',
      'SEPTIMO',
      'OCTAVO',
      'NOVENO',
      'DECIMO',
      'DECIMO PRIMER',
      'DECIMO SEGUNDO',
      'DECIMO TERCER',
      'DECIMO CUARTO',
      'DECIMO QUINTO',
      'DECIMO SEXTO',
      'DECIMO SEPTIMO',
      'DECIMO OCTAVO',
      'DECIMO NOVENO',
    ];
  }

  ngOnInit() {
    this.getDatosEstudiante();
    this.validateFormulario();
    this.getUltimaSolicitud();
  }

  validateFormulario() {
    this.formulario = this._fb.group({
      facultad_origen: [null, [Validators.required]],
      carrera_origen: [null, [Validators.required]],
      nivel_origen: [null, [Validators.required]],
      id: [null],
    });
  }

  cargarDatosFormulario() {
    this.formulario.setValue({
      facultad_origen: this.datos_estudiante.facultad_origen,
      carrera_origen: this.datos_estudiante.carrera_origen,
      nivel_origen: this.datos_estudiante.nivel_origen,
      id: null,
    });
  }

  getDatosEstudiante() {
    this._registerService
      .getDatosEstudiante(this.token, this.identity.sub)
      .subscribe(
        (response) => {
          console.log(response);

          if (response.status === 'success') {
            this.datos_estudiante = response.usuario;
          }
        },
        (error) => console.log(error),
        () => this.cargarDatosFormulario()
      );
  }

  getUltimaSolicitud() {
    this._solicitudService
      .getUltimaSolicitud(this.token, this.identity.sub, 2)
      .subscribe(
        (response) => {
          console.log(response);

          if (response.status === 'empty') {
            this.flag_editar_datos_disabled = false;
          } else if (response.status === 'success') {
            if (response.u_solicitud.estado !== 'GENERADA') {
              this.flag_editar_datos_disabled = true;
            } else {
              this.flag_editar_datos_disabled = false;
            }
          }
        },
        (error) => console.log(error),
        () => {
          this.pagina_cargada = true;
          console.log(this.flag_editar_datos_disabled);
        }
      );
  }

  saveDatosEstudiante() {
    if (this.formulario.valid) {
      this.btn_guardar_disabled = true;
      this.btn_guardar_loading = true;

      this.formulario.value.id = this.identity.sub;

      this._registerService
        .setDatosEstudiante(this.token, this.formulario.value)
        .subscribe(
          (response) => {
            this.btn_guardar_loading = false;
            this.btn_guardar_disabled = false;
            console.log(response);

            if (response.status === 'success') {
              this._mensaje.success(
                'Datos actualizados correctamente. Redireccionando a inicio',
                { nzDuration: 2000 }
              );

              setTimeout(() => {
                this._router.navigate(['cambioUniversidad']);
              }, 2000);
            } else {
              this._mensaje.error(response.message, { nzDuration: 2000 });
            }
          },
          (error) => {
            this.btn_guardar_loading = false;
            this.btn_guardar_disabled = false;

            this._mensaje.error('Error al enviar los datos', {
              nzDuration: 2000,
            });

            console.log('error', error);
          }
        );
    } else {
      this._mensaje.warning('Rellene todos los campos', { nzDuration: 2000 });
      Object.values(this.formulario.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
