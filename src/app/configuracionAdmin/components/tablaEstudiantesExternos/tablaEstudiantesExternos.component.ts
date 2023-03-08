import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

interface EstudiantesExternos {
  id: number;
  cedula: string;
  apellidos: string;
  nombres: string;
  correo_personal: string;
  estado: string;
}

@Component({
  selector: 'app-tablaEstudiantesExternos',
  templateUrl: './tablaEstudiantesExternos.component.html',
  styleUrls: ['./tablaEstudiantesExternos.component.css'],
})
export class TablaEstudiantesExternosComponent implements OnInit {
  // TOKEN Y DATOS ADMINISTRADOR
  public identity: any;
  public token: string;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public btn_eliminar_disabled: boolean;
  public btn_eliminar_loading: boolean;

  // DATOS PARA RELLENAR TABLA
  public estudiantes_externos: EstudiantesExternos[];

  // NG-ZORRO
  public cedula_buscar: string;
  public flag_visible: boolean;
  public resultado_busqueda: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private modal: NzModalService,
    private _router: Router,
    private _mensaje: NzMessageService
  ) {
    this.token = this._loginService.getToken();

    this.pagina_cargada = false;
    this.btn_eliminar_disabled = false;
    this.btn_eliminar_loading = false;

    this.cedula_buscar = '';
    this.flag_visible = false;
  }

  ngOnInit() {
    this.getEstudiantesExternos();
  }

  getEstudiantesExternos() {
    this._usuarioService.getEstudiantesExternos(this.token).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.estudiantes_externos = response.estudiantes;
        }
      },
      (error) => {},
      () => {
        this.resultado_busqueda = [...this.estudiantes_externos];
        this.pagina_cargada = true;
      }
    );
  }

  reiniciarBusqueda() {
    this.cedula_buscar = '';
    this.buscarCedula();
  }

  buscarCedula() {
    this.flag_visible = false;
    this.resultado_busqueda = this.estudiantes_externos.filter(
      (item: any) => item.cedula.indexOf(this.cedula_buscar) !== -1
    );
    console.log(this.resultado_busqueda);
  }

  deleteEstudianteExterno(idPersona: number) {
    this.btn_eliminar_disabled = true;
    this.btn_eliminar_loading = true;
    this._usuarioService
      .deleteEstudianteExterno(this.token, idPersona)
      .subscribe(
        (response) => {
          this.btn_eliminar_disabled = false;
          this.btn_eliminar_loading = false;
          if (response.status === 'success') {
            this._mensaje.success('Estudiante eliminado correctamente');

            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            this._mensaje.error(response.message);
          }
        },
        (error) => {
          console.log(error);

          this.btn_eliminar_disabled = false;
          this.btn_eliminar_loading = false;
        }
      );
  }
}
