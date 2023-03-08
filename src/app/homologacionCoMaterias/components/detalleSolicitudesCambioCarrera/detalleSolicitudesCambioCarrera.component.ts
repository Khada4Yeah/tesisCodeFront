import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudCoMateriasService } from 'src/app/services/SolicitudCoMateriasServices/solicitudCoMaterias.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-detalleSolicitudesCambioCarrera',
  templateUrl: './detalleSolicitudesCambioCarrera.component.html',
  styleUrls: ['./detalleSolicitudesCambioCarrera.component.css'],
})
export class DetalleSolicitudesCambioCarreraComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;

  // TOKEN Y DATOS RESPONSABLE COMISION
  public identity: any;
  public token: string;
  public id_solicitud: number;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public flag_pdf_obtenido: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _solicitudesCoMaterias: SolicitudCoMateriasService,
    private _modal: NzModalService,
    private _mensaje: NzMessageService,
    private _archivosService: ArchivosService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;

    this.flag_pdf_obtenido = false;
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
    this._solicitudesCoMaterias
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
          console.log(this.materias_solicitud);
        }
      );
  }

  asignarMateriasProfesores() {
    let tipo_solicitud = '';
    if (this.solicitud_detallada[0].tipo === 'CAMBIO CARRERA') {
      tipo_solicitud = 'cambioCarrera';
    } else if (this.solicitud_detallada[0].tipo === 'CAMBIO UNIVERSIDAD') {
      tipo_solicitud = 'cambioUniversidad';
    }

    this._urlService
      .encriptarParametro(this.id_solicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionCoMaterias',
          'asignarDocenteAnalisis',
          tipo_solicitud,
          id,
        ]);
      });
  }

  getPdf(nombrePdf: string) {
    this._archivosService.getPDF(this.token, nombrePdf).subscribe(
      (response) => {
        if (response.type === 'application/pdf') {
          const url = URL.createObjectURL(response);
          window.open(url);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {}
    );
  }
}
