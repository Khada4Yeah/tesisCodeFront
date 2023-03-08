import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioExterno } from 'src/app/models/usuario/usuario_externo';
import { RegisterService } from 'src/app/services/LoginServices/register.service';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-registroUsuario',
  templateUrl: './registroUsuario.component.html',
  styleUrls: ['./registroUsuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
  // FORMULARIO Y NGZORRO
  public passwordVisible = false;
  public confirmModal?: NzModalRef;
  public validar_formulario: FormGroup;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public status: string;

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public usuario: UsuarioExterno;

  constructor(
    private _router: Router,
    private _registerService: RegisterService,
    private modal: NzModalService,
    private _fb: FormBuilder,
    private _mensaje: NzMessageService
  ) {
    this.pagina_cargada = false;
    this.passwordVisible = false;
  }

  ngOnInit() {
    this.validateFormulario();
  }

  validateFormulario() {
    this.validar_formulario = this._fb.group({
      cedula: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      apellido_p: [null, [Validators.required]],
      apellido_m: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      celular: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      telefono_convencional: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)],
      ],
      direccion: [null, [Validators.required]],
      correo_personal: [null, [Validators.required, Validators.email]],
      clave: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
          ),
        ],
      ],
      fecha_nacimiento: [null, [Validators.required]],
    });
    this.pagina_cargada = true;
  }

  onSubmit() {
    if (this.validar_formulario.valid) {
      this._registerService
        .registrarUsuario(this.validar_formulario.value)
        .subscribe(
          (response) => {
            if (response.status == 'success') {
              this._mensaje.success(
                'Usuario creado correctamente!. Redireccionando al Login',
                { nzDuration: 2000 }
              );
              setTimeout(() => {
                this._router.navigate(['auth']);
              }, 2000);
            } else {
              console.log('Response-error: ', response);
              this.status = 'error';
              this.mostrarError(response.error_text);
            }
          },
          (error) => {
            this.status = 'error';
            console.log('Error:', error);
            console.log(error.error_text);
          }
        );
    } else {
      this._mensaje.warning('Rellene todos los campos', { nzDuration: 2000 });
      Object.values(this.validar_formulario.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  regresarLogin(e: MouseEvent) {
    e.preventDefault();
    this._router.navigate(['auth']);
  }

  mostrarError(texto: string) {
    const modal: NzModalRef = this.modal.warning({
      nzTitle: 'Advertencia',
      nzContent: texto,
    });
  }
}
