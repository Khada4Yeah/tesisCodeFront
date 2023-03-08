import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario_homo';

import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { LoginService } from 'src/app/services/LoginServices/login.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editarUsuario',
  templateUrl: './editarUsuario.component.html',
  styleUrls: ['./editarUsuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  // TOKEN Y DATOS ADMINISTRADOR
  public token: string;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;
  public flag_form_send: boolean;

  // FORMULARIO Y NGZORRO
  public status: string;

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public id_usuario: any;
  public usuario: any;
  public cargos: any;
  public departamentos: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();

    this.flag_pagina_cargada = false;
    this.flag_form_send = false;

    this.usuario = new Usuario(0, 0, 0, null, '');
  }

  ngOnInit() {
    this.decryptId();
    this.getCargos();
    this.getUsuario();
    this.getDepartamentos();
  }

  decryptId() {
    const idEncrypted = this._route.snapshot.paramMap.get('id');

    if (idEncrypted) {
      const idDecrypted = CryptoJS.AES.decrypt(
        idEncrypted,
        'ecrPad21_2>2'
      ).toString(CryptoJS.enc.Utf8);
      this.id_usuario = idDecrypted;
    }
  }

  getUsuario() {
    this._usuarioService.getUsuario(this.token, this.id_usuario).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.usuario = response.usuario[0];
        } else {
          console.log('Response-error: ', response);
        }
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {}
    );
  }

  getCargos() {
    this._usuarioService.getCargos(this.token).subscribe(
      (response) => {
        console.log(response);
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

  onSubmit(form: any) {
    this.flag_form_send = true;
    console.log(this.usuario);

    this._usuarioService
      .updateUsuario(this.token, this.usuario, this.usuario.id)
      .subscribe(
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
            console.log('Error-Response:', response);
          }
        },
        (error) => {
          this.status = 'error';
          setTimeout(() => {
            this._router.navigate(['/configuracionAdmin/usuarios']);
          }, 1500);
          console.log('Error:', error);
        }
      );
  }
}
