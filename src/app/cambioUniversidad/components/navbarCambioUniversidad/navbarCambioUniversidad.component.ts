import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginServices/login.service';

@Component({
  selector: 'app-navbarCambioUniversidad',
  templateUrl: './navbarCambioUniversidad.component.html',
  styleUrls: ['./navbarCambioUniversidad.component.css'],
})
export class NavbarCambioUniversidadComponent implements OnInit {
  public identity: any;

  public isCollapsed = false;
  public mostrarModal: boolean;

  public perfil_seleccionado: string;
  public nombreUsuario: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.identity = this._loginService.getIdentity();

    this.nombreUsuario = this.identity.name;
    this.perfil_seleccionado = 'ESTUDIANTE FORANEO';

    this.mostrarModal = false;
  }

  ngOnInit() {
    this.logout();
    this.getPerfilesUsuario();
  }

  getPerfilesUsuario() {
    return this.identity.rol_sistema;
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('token');

        //REDIRECCION A AUTENTICACIÓN
        this._router.navigate(['/auth']);
      }
    });
  }

  handleOk(): void {
    if (this.perfil_seleccionado === 'ESTUDIANTE FORANEO') {
      this._router.navigate(['cambioUniversidad']);
    }
    this.mostrarModal = false;
  }

  handleCancel(): void {
    this.perfil_seleccionado = 'ESTUDIANTE';
    this.mostrarModal = false;
  }

  showModal(): void {
    this.mostrarModal = true;
  }
}
