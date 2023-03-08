import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-tablaCargos',
  templateUrl: './tablaCargos.component.html',
  styleUrls: ['./tablaCargos.component.css'],
})
export class TablaCargosComponent implements OnInit {
  // TOKEN Y DATOS ADMINISTRADOR
  public token: any;
  public identity: any;

  // VERIFICADORES OBSERVABLES
  public flag_pagina_cargada: boolean;

  // DATOS PARA RELLENAR TABLA
  public cargos: any;

  // FORMULARIO Y NGZORRO
  confirmModal?: NzModalRef;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private modal: NzModalService
  ) {
    this.token = this._loginService.getToken();

    this.flag_pagina_cargada = false;
  }

  ngOnInit() {
    this.getCargos();
  }

  getCargos() {
    this._usuarioService.getCargos(this.token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.cargos = response.cargos;
          console.log(this.cargos);
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

  deleteCargo(id: any) {
    this._usuarioService.deleteCargo(this.token, id).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.getCargos();
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

  showConfirm(id: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '¿Deseas eliminar este cargo?',
      nzOnOk: (any) => {
        this.flag_pagina_cargada = false;
        this.deleteCargo(id);
      },
    });
  }
}
