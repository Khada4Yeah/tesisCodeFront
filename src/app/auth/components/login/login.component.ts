import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginModel } from 'src/app/models/modelo-login/login';

import { LoginService } from 'src/app/services/LoginServices/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public usuarioForm!: FormGroup;
  public usuarioLogin: LoginModel;
  public status: string;
  public token: any;
  public identity: any;
  public error: any;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.usuarioLogin = new LoginModel('', '');
  }

  ngOnInit(): void {}

  redireccionarRegistro(e: MouseEvent) {
    e.preventDefault();
    this._router.navigate(['registroUsuario']);
  }

  onSubmit(form: any) {
    this._loginService.loginUTM(this.usuarioLogin).subscribe(
      (response) => {
        if (response.error != true) {
          this.token = response;
          localStorage.setItem('token', this.token);
          this.identity = this._loginService.getIdentity();
          console.log(this.identity);

          if (this.identity.rol_sistema[0] == 'ESTUDIANTE') {
            this._router.navigate(['cambioCarrera']);
          } else if (this.identity.rol_sistema[0] == 'ESTUDIANTE FORANEO') {
            this._router.navigate(['cambioUniversidad']);
          } else if (this.identity.rol_sistema[0] == 'ADMIN') {
            this._router.navigate(['configuracionAdmin']);
          } else if (this.identity.rol_sistema[0] == 'VICEDECANO') {
            this._router.navigate(['homologacionVicedecano']);
          } else if (
            this.identity.rol_sistema[0] == 'RESPONSABLE DE LA COMISIÓN'
          ) {
            this._router.navigate(['homologacionReComision']);
          } else if (
            this.identity.rol_sistema[0] == 'COORDINADOR DE MATERIAS'
          ) {
            this._router.navigate(['homologacionCoMaterias']);
          } else if (this.identity.rol_sistema[0] === 'DOCENTE ANÁLISIS') {
            this._router.navigate(['homologacionDoAnalisis']);
          }

          //console.log(this.identity.rol_sistema);
        } else {
          this.error = response.error_text;
          console.log(this.error);
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      },
      () => {}
    );
  }
}
