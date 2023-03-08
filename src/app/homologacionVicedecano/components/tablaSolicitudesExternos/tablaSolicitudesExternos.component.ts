import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudVicedecanoService } from 'src/app/services/SolicitudVicedecanoServices/solicitudVicedecano.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-tablaSolicitudesExternos',
  templateUrl: './tablaSolicitudesExternos.component.html',
  styleUrls: ['./tablaSolicitudesExternos.component.css'],
})
export class TablaSolicitudesExternosComponent implements OnInit {
  // TOKEN Y DATOS VICEDECANO
  public token: string;
  public identity: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitudes: any;
  public solicitudes_separadas: any;

  constructor(
    private _solicitudesVicedecanoService: SolicitudVicedecanoService,
    private _loginService: LoginService,
    private _router: Router,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;

    this.solicitudes_separadas = {
      aprobadas: [],
      aprobadas_parcialmente: [],
      rechazadas: [],
      en_revision: [],
      correciones: [],
      pendientes: [],
    };
  }

  ngOnInit() {
    this.getSolicitudesPorVicedecano();
  }

  // OBTENER TODAS LAS SOLICITUDES DE UN VICEDECANO EN ESPECIFICO
  getSolicitudesPorVicedecano() {
    this._solicitudesVicedecanoService
      .getSolicitudesExternosPorVicedecano(this.token, this.identity.sub)
      .subscribe(
        (response) => {
          console.log(response);

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
          this.pagina_cargada = true;
        }
      );
  }

  // SEPARAR SOLICITUDES POR ESTADO
  separarSolicitudes() {
    this.solicitudes.forEach((element: any) => {
      if (element.estado_solicitud === 'APROBADA') {
        this.solicitudes_separadas.aprobadas.push(element);
      } else if (element.estado_solicitud === 'APROBADA PARCIALMENTE') {
        this.solicitudes_separadas.aprobadas_p.push(element);
      } else if (
        element.estado_solicitud === 'EN REVISIÓN RC' ||
        element.estado_solicitud === 'EN REVISIÓN CM' ||
        element.estado_solicitud === 'EN REVISIÓN D' ||
        element.estado_solicitud === 'DEV DOC A CM' ||
        element.estado_solicitud === 'DEV CM A RC'
      ) {
        this.solicitudes_separadas.en_revision.push(element);
      } else if (element.estado_solicitud === 'CORRECIONES') {
        this.solicitudes_separadas.correciones.push(element);
      } else if (element.estado_solicitud === 'RECHAZADA') {
        this.solicitudes_separadas.rechazadas.push(element);
      } else if (element.estado_solicitud === 'PENDIENTE') {
        this.solicitudes_separadas.pendientes.push(element);
      }
    });
  }

  detailSolicitud(idSolicitud: number) {
    this._urlService.encriptarParametro(idSolicitud.toString()).subscribe(
      (id) => {
        this._router.navigate([
          'homologacionVicedecano',
          'detalleSolicitud',
          'cambioUniversidad',
          id,
        ]);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
