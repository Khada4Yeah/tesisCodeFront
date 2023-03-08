import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Cargo } from 'src/app/models/cargo/cargo';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-editarCargo',
  templateUrl: './editarCargo.component.html',
  styleUrls: ['./editarCargo.component.css'],
})
export class EditarCargoComponent implements OnInit {
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
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();

    this.flag_pagina_cargada = false;
    this.flag_form_send = false;

    this.cargo2 = new Cargo(1, '', '');
  }

  ngOnInit() {
    this.getCargo();
  }

  getCargo() {
    // SACAR EL ID DEL CARGO DE LA URL
    this._route.params.subscribe((params) => {
      let id = +params['id'];

      // PETICION AJAX PARA SACAR LOS DATOS DEL CARGO
      this._usuarioService.getCargo(this.token, id).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.cargo2 = response.cargo;
          } else {
            console.log('Response-error: ', response);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.flag_pagina_cargada = true;
        }
      );
    });
  }

  onSubmit(form: Form) {
    this.flag_form_send = true;
    this._usuarioService
      .updateCargo(this.token, this.cargo2, this.cargo2.id)
      .subscribe(
        (response) => {
          console.log(response);
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
            console.log('Response-error: ', response);
          }
        },
        (error) => {
          this.status = 'error';
          setTimeout(() => {
            this._router.navigate(['/configuracionAdmin/cargos']);
          }, 1500);
          console.log(error);
        }
      );
  }
}
