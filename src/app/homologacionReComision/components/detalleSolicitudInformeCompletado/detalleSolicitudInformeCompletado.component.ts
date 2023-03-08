import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudReComisionService } from 'src/app/services/SolicitudReComisionServices/solicitudReComision.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-detalleSolicitudInformeCompletado',
  templateUrl: './detalleSolicitudInformeCompletado.component.html',
  styleUrls: ['./detalleSolicitudInformeCompletado.component.css'],
})
export class DetalleSolicitudInformeCompletadoComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS RESPONSABLE COMISION
  public identity: any;
  public token: string;
  public id_solicitud: number;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public btn_pdf_loading: boolean;
  public btn_pdf_disabled: boolean;
  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _solicitudesReComision: SolicitudReComisionService,
    private _mensaje: NzMessageService,
    private _archivosService: ArchivosService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;
    this.btn_pdf_disabled = false;
    this.btn_pdf_loading = false;
  }

  ngOnInit() {
    this.decryptId();
  }

  getIdSolicitud() {
    return this._route.snapshot.paramMap.get('id') ?? '';
  }

  getTipo() {
    if (this._route.snapshot.paramMap.get('tipo') === 'cambioCarrera') {
      return 1;
    } else if (
      this._route.snapshot.paramMap.get('tipo') === 'cambioUniversidad'
    ) {
      return 2;
    }
    return 0;
  }

  decryptId() {
    this._urlService.desencriptarParametro(this.getIdSolicitud()).subscribe(
      (id) => {
        if (id !== '') {
          this.id_solicitud = Number(id);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {
        this.getDetalleSolicitud();
      }
    );
  }

  getDetalleSolicitud() {
    this._solicitudesReComision
      .getSolicitud(
        this.token,
        this.identity.sub,
        this.id_solicitud,
        this.getTipo()
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.solicitud_detallada = response.detalleSolicitud;
            this.materias_solicitud = response.materiasSolicitud;
          } else {
            console.log('Error: ', response);
          }
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          this.pagina_cargada = true;
        }
      );
  }

  getPdf(nombrePdf: string) {
    this.btn_pdf_disabled = true;
    this._mensaje.loading('Obteniendo el archivo...', { nzDuration: 0 });

    this._archivosService.getPDF(this.token, nombrePdf).subscribe(
      (response) => {
        if (response.type === 'application/pdf') {
          this._mensaje.remove();
          this.btn_pdf_disabled = false;

          const url = URL.createObjectURL(response);
          window.open(url);
        } else {
          this.btn_pdf_disabled = false;

          this._mensaje.remove();
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this.btn_pdf_disabled = false;

        this._mensaje.remove();
        this._router.navigate(['error']);
      },
      () => {}
    );
  }
}
