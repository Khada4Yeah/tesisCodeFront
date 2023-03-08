import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginServices/login.service';

@Component({
  selector: 'app-navbarHomologacionVicedecano',
  templateUrl: './navbarHomologacionVicedecano.component.html',
  styleUrls: ['./navbarHomologacionVicedecano.component.css'],
})
export class NavbarHomologacionVicedecanoComponent implements OnInit {
  public perfil_seleccionado: string;
  private indentity: any;
  public isCollapsed: boolean;
  public mostrarModal: boolean;
  public nombreUsuario: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.indentity = this._loginService.getIdentity();
    this.perfil_seleccionado = 'VICEDECANO';
    this.nombreUsuario = this.indentity.name;

    this.mostrarModal = false;
    this.isCollapsed = false;
  }

  ngOnInit() {
    this.logout();
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        //REDIRECCION A AUTENTICACIÓN
        this._router.navigate(['/auth']);
      }
    });
  }

  getPerfilesUsuario() {
    return this.indentity.rol_sistema;
  }

  handleOk(): void {
    if (this.perfil_seleccionado === 'RESPONSABLE DE LA COMISIÓN') {
      this._router.navigate(['homologacionReComision']);
    } else if (this.perfil_seleccionado === 'VICEDECANO') {
      this._router.navigate(['homologacionVicedecano']);
    } else if (this.perfil_seleccionado === 'DOCENTE ANÁLISIS') {
      this._router.navigate(['homologacionDoAnalisis']);
    } else if (this.perfil_seleccionado === 'COORDINADOR DE MATERIAS') {
      this._router.navigate(['homologacionCoMaterias']);
    }

    this.mostrarModal = false;
  }

  handleCancel(): void {
    this.perfil_seleccionado = 'VICEDECANO';
    this.mostrarModal = false;
  }

  showModal(): void {
    this.mostrarModal = true;
  }
}
