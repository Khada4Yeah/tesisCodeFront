import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudCoMateriasService } from 'src/app/services/SolicitudCoMateriasServices/solicitudCoMaterias.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-tablaSolicitudesCambioUniversidad',
  templateUrl: './tablaSolicitudesCambioUniversidad.component.html',
  styleUrls: ['./tablaSolicitudesCambioUniversidad.component.css'],
})
export class TablaSolicitudesCambioUniversidadComponent implements OnInit {
  // TOKEN Y DATOS COORDINADOR MATERIAS
  public token: string;
  public identity: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitudes: any;
  public solicitudes_separadas: any;

  constructor(
    private _solicitudesCoMaterias: SolicitudCoMateriasService,
    private _loginService: LoginService,
    private _urlService: UrlService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;

    this.solicitudes_separadas = {
      pendientes: [],
      en_revision: [],
      revisadas_docente: [],
      completados: [],
    };
  }

  ngOnInit() {
    this.getSolicitudesPorCoMaterias();
  }

  // OBTENER TODAS LAS SOLICITUDES DE UN COORDINADOR DE MATERIAS EN ESPECIFICO
  getSolicitudesPorCoMaterias() {
    this._solicitudesCoMaterias
      .getSolicitudesExternosPorCoMaterias(this.token, this.identity.sub)
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

  separarSolicitudes() {
    this.solicitudes.forEach((element: any) => {
      if (element.estado_solicitud == 'EN REVISIÓN CM') {
        this.solicitudes_separadas.pendientes.push(element);
      } else if (element.estado_solicitud === 'EN REVISIÓN D') {
        this.solicitudes_separadas.en_revision.push(element);
      } else if (element.estado_solicitud === 'DEV DOC A CM') {
        this.solicitudes_separadas.revisadas_docente.push(element);
      } else if (element.estado_solicitud === 'DEV CM A RC') {
        this.solicitudes_separadas.completados.push(element);
      }
    });
  }

  detailSolicitudes(idSolicitud: number) {
    this._urlService
      .encriptarParametro(idSolicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionCoMaterias',
          'detalleSolicitud',
          'cambioUniversidad',
          id,
        ]);
      });
  }

  detailSolicitudEnd(idSolicitud: number) {
    this._urlService
      .encriptarParametro(idSolicitud.toString())
      .subscribe((id) =>
        this._router.navigate([
          'homologacionCoMaterias',
          'detalleSolicitudInforme',
          'cambioUniversidad',
          id,
        ])
      );
  }
}
