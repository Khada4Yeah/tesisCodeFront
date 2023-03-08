import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import * as CryptoJS from 'crypto-js';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tablaUsuarios',
  templateUrl: './tablaUsuarios.component.html',
  styleUrls: ['./tablaUsuarios.component.css'],
})
export class TablaUsuariosComponent implements OnInit {
  // TOKEN Y DATOS ADMINISTRADOR
  public identity: any;
  public token: string;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;

  // DATOS PARA RELLENAR TABLA
  public usuarios: any;

  // FORMULARIO Y NGZORRO
  confirmModal?: NzModalRef;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private modal: NzModalService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();

    this.flag_pagina_cargada = false;
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this._usuarioService.getUsuarios(this.token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.usuarios = response.usuarios;
        } else {
          console.log(response);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.flag_pagina_cargada = true;
      }
    );
  }

  editUsuario(idUsuario: number) {
    const encriptarId = of(idUsuario.toString()).pipe(
      map((id) =>
        CryptoJS.AES.encrypt(id.toString(), 'ecrPad21_2>2').toString()
      )
    );

    encriptarId.subscribe(
      (id) => {
        this._router.navigate(['configuracionAdmin', 'editarUsuario', id]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteUsuario(id: any) {
    this._usuarioService.deleteUsuario(this.token, id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.getUsuarios();
        } else {
          console.log(response.error);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.flag_pagina_cargada = true;
      }
    );
  }

  showConfirm(id: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '¿Deseas eliminar este usuario?',
      nzOnOk: (any) => {
        this.flag_pagina_cargada = false;
        this.deleteUsuario(id);
      },
    });
  }
}
