import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';

@Component({
  selector: 'app-mostrarusuarios-configuracionAdmin',
  templateUrl: './mostrarusuarios-configuracionAdmin.component.html',
  styleUrls: ['./mostrarusuarios-configuracionAdmin.component.css'],
})
export class MostrarusuariosConfiguracionAdminComponent implements OnInit {
  public cargos: any;
  public identity: any;
  public token: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit() {}
}
