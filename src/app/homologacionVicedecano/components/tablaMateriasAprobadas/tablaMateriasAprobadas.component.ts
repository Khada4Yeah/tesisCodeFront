import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudVicedecanoService } from 'src/app/services/SolicitudVicedecanoServices/solicitudVicedecano.service';

@Component({
  selector: 'app-tablaMateriasAprobadas',
  templateUrl: './tablaMateriasAprobadas.component.html',
  styleUrls: ['./tablaMateriasAprobadas.component.css'],
})
export class TablaMateriasAprobadasComponent implements OnInit {
  public materias_aprobadas: any;
  public token: string;
  public pagina_cargada: boolean;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _solicitudesVicedecanoService: SolicitudVicedecanoService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.getToken();
    this.pagina_cargada = false;
  }

  ngOnInit() {
    this.getMateriasAprobadas();
  }

  getMateriasAprobadas() {
    this._solicitudesVicedecanoService
      .getMateriasAprobadas(
        this.token,
        this._activeRoute.snapshot.params.idPersonal,
        this._activeRoute.snapshot.params.idEscuela,
        this._activeRoute.snapshot.params.idMalla
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.materias_aprobadas = response.historialEstudiante;
          } else {
            console.log('Error-response', response);
          }
        },
        (error) => {
          console.log('Error', error);
        },
        () => {
          this.pagina_cargada = true;
        }
      );
  }
}
