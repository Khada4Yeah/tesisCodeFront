import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from 'src/app/models/usuario/usuario_homo';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-ingresarUsuario',
  templateUrl: './ingresarUsuario.component.html',
  styleUrls: ['./ingresarUsuario.component.css'],
})
export class IngresarUsuarioComponent implements OnInit {
  // TOKEN Y DATOS ADMINISTRADOR
  public token: string;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;
  public flag_form_send: boolean;

  // FORMULARIO Y NGZORRO
  public status: string;

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public cargos: any;
  public usuario: Usuario;
  public departamentos: any;
  public persona: any;
  public cedula: string;

  constructor(
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _message: NzMessageService
  ) {
    this.token = this._loginService.getToken();

    this.flag_pagina_cargada = false;
    this.flag_form_send = false;

    this.usuario = new Usuario(0, 0, 0, 0, '');
    this.persona = { idpersonal: 0, nombres: '' };
    this.cedula = '';
  }

  ngOnInit() {
    this.getCargos();
    this.getDepartamentos();
  }

  getCargos() {
    this._usuarioService.getCargos(this.token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.cargos = response.cargos;
        }
      },
      (error) => {},
      () => {
        this.flag_pagina_cargada = true;
      }
    );
  }

  getDepartamentos() {
    console.log('idcargo', this.usuario.cargos_id);
    if (this.usuario.cargos_id === 2) {
      this._usuarioService.getDepartamentos(this.token).subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.departamentos = response.departamentos;
          }
        },
        (error) => {},
        () => {}
      );
    }
  }

  getPersonalCedula(e: MouseEvent) {
    e.preventDefault();

    if (this.cedula != '') {
      this._usuarioService.getPersonalCedula(this.token, this.cedula).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.persona = response.persona[0];
            this.usuario.personal_id = this.persona.idpersonal;
            console.log(this.persona);
          } else {
            this._message.info(response.error_text);
          }
        },
        (error) => {},
        () => {}
      );
    } else {
      this._message.warning('El campo no puede estar vacío!');
    }
  }

  onSubmit(form: any) {
    this.flag_form_send = true;
    this._usuarioService.createUsuario(this.token, this.usuario).subscribe(
      (response) => {
        console.log(response);
        if (response.status == 'success') {
          this.status = 'success';
          setTimeout(() => {
            this._router.navigate(['/configuracionAdmin/usuarios']);
          }, 1500);
        } else {
          this.status = 'error';
          setTimeout(() => {
            this._router.navigate(['/configuracionAdmin/usuarios']);
          }, 1500);
        }
      },
      (error) => {
        this.status = 'error';
        setTimeout(() => {
          this._router.navigate(['/configuracionAdmin/usuarios']);
        }, 1500);
      }
    );
  }
}
