import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

import { Cargo } from 'src/app/models/cargo/cargo';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-ingresarCargo',
  templateUrl: './ingresarCargo.component.html',
  styleUrls: ['./ingresarCargo.component.css'],
})
export class IngresarCargoComponent implements OnInit {
  // TOKEN Y DATOS ADMINISTRADOR
  private token: string;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;
  public flag_form_send: boolean;

  // FORMULARIO Y NGZORRO
  public status: string;

  // DATOS PARA RELLENAR OPCIONES FORMULARIO
  public cargo2: Cargo;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();

    this.flag_pagina_cargada = false;
    this.flag_form_send = false;

    this.cargo2 = new Cargo(0, '', '');
  }

  ngOnInit() {
    this.flag_pagina_cargada = true;
  }

  onSubmit(form: Form) {
    this.flag_form_send = true;
    this._usuarioService.createCargo(this.token, this.cargo2).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';

          setTimeout(() => {
            this._router.navigate(['/configuracionAdmin/cargos']);
          }, 1500);
        } else {
          this.status = 'error';
          setTimeout(() => {
            this._router.navigate(['/configuracionAdmin/cargos']);
          }, 1500);
        }
      },
      (error) => {
        this.status = 'error';
        setTimeout(() => {
          this._router.navigate(['/configuracionAdmin/cargos']);
        }, 1500);
      }
    );
  }
}
