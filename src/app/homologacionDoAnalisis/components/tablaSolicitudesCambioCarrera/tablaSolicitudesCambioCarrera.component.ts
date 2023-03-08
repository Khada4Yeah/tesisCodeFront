import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { PdfMateriaSolicitudService } from 'src/app/services/PdfMateriasSolicitudServices/pdfMateriaSolicitud.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-tablaSolicitudesCambioCarrera',
  templateUrl: './tablaSolicitudesCambioCarrera.component.html',
  styleUrls: ['./tablaSolicitudesCambioCarrera.component.css'],
})
export class TablaSolicitudesCambioCarreraComponent implements OnInit {
  // TOKEN Y DATOS DOCENTE ANALISIS
  public token: string;
  public identity: any;

  // DATOS PARA RELLENAR TABLAS
  public solicitudes: any;
  public solicitudes_separadas: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;

  constructor(
    private _pdfMateriasSolicitudService: PdfMateriaSolicitudService,
    private _loginService: LoginService,
    private _urlService: UrlService,
    private _router: Router
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;

    this.solicitudes_separadas = {
      pendientes: [],
      completados: [],
    };
  }

  ngOnInit() {
    this.getSolicitudesPorDoAnalisis();
  }

  // OBTENER TODAS LAS SOLICITUDES DE UN COORDINADOR DE MATERIAS EN ESPECIFICO
  getSolicitudesPorDoAnalisis() {
    this._pdfMateriasSolicitudService
      .getSolicitudesPorDoAnalisis(this.token, this.identity.sub)
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
      if (
        element.estado_solicitud == 'EN REVISIÓN D' ||
        element.estado_solicitud === 'EN REVISIÓN CM'
      ) {
        this.solicitudes_separadas.pendientes.push(element);
      } else if (
        element.estado_solicitud === 'DEV DOC A CM' ||
        element.estado_solicitud === 'DEV CM A RC'
      ) {
        this.solicitudes_separadas.completados.push(element);
      }
    });
  }

  detailSolicitudes(idSolicitud: number) {
    this._urlService
      .encriptarParametro(idSolicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionDoAnalisis',
          'detalleSolicitud',
          'cambioCarrera',
          id,
        ]);
      });
  }
}
