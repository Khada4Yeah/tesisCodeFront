import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudReComisionService } from 'src/app/services/SolicitudReComisionServices/solicitudReComision.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-tablaSolicitudesCambioUniversidad',
  templateUrl: './tablaSolicitudesCambioUniversidad.component.html',
  styleUrls: ['./tablaSolicitudesCambioUniversidad.component.css'],
})
export class TablaSolicitudesCambioUniversidadComponent implements OnInit {
  // TOKEN Y DATOS RESPONSABLE COMISION
  public token: string;
  public identity: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public status: string;

  // DATOS PARA RELLENAR TABLAS
  public solicitudes: any;
  public solicitudes_separadas: any;

  constructor(
    private _solicitudesReComision: SolicitudReComisionService,
    private _loginService: LoginService,
    private _router: Router,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;

    this.solicitudes_separadas = {
      pendientes: [],
      en_revision: [],
      informes_compleados: [],
    };
  }

  ngOnInit() {
    this.getSolicitudesPorReComision();
  }

  // OBTENER TODAS LAS SOLICITUDES DE UN RESPONSABLE COMISION EN ESPECIFICO
  getSolicitudesPorReComision() {
    this._solicitudesReComision
      .getSolicitudesExternosPorReComision(this.token, this.identity.sub)
      .subscribe(
        (response) => {
          if (response.status == 'success') {
            this.solicitudes = response.solicitudes;
          } else {
            console.log('Error-response:', response);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.separarSolicitudes();
          console.log(this.solicitudes_separadas.en_revision);
          this.pagina_cargada = true;
        }
      );
  }

  separarSolicitudes() {
    this.solicitudes.forEach((element: any) => {
      if (element.estado_solicitud == 'EN REVISIÓN RC') {
        this.solicitudes_separadas.pendientes.push(element);
      } else if (
        element.estado_solicitud === 'EN REVISIÓN CM' ||
        element.estado_solicitud === 'EN REVISIÓN D' ||
        element.estado_solicitud === 'DEV DOC A CM'
      ) {
        this.solicitudes_separadas.en_revision.push(element);
      } else if (element.estado_solicitud === 'DEV CM A RC') {
        this.solicitudes_separadas.informes_compleados.push(element);
      }
    });
  }

  detailSolicitudes(idSolicitud: number) {
    this._urlService
      .encriptarParametro(idSolicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionReComision',
          'detalleSolicitud',
          'cambioUniversidad',
          id,
        ]);
      });
  }

  detailSolicitudInformesCompletados(idSolicitud: number) {
    this._urlService
      .encriptarParametro(idSolicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionReComision',
          'detalleSolicitudInformesTerminados',
          'cambioUniversidad',
          id,
        ]);
      });
  }
}
