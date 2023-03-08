import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { SolicitudService } from 'src/app/services/SolicitudServices/solicitud.service';
import { ArchivosService } from 'src/app/services/BaseServices/archivos.service';
import { UrlService } from 'src/app/services/UrlServices/url.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-tablaSolicitudesEnviadas',
  templateUrl: './tablaSolicitudesEnviadas.component.html',
  styleUrls: ['./tablaSolicitudesEnviadas.component.css'],
})
export class TablaSolicitudesEnviadasComponent implements OnInit {
  // TOKEN Y DATOS ESTUDIANTE
  public usuario: any;
  public token: string;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public btn_pdf_disabled: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitudes: any;

  constructor(
    private _loginService: LoginService,
    private _solicitudesService: SolicitudService,
    private modal: NzModalService,
    private _archivosService: ArchivosService,
    private _router: Router,
    private _mensaje: NzMessageService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.usuario = this._loginService.getIdentity();

    this.pagina_cargada = false;
    this.btn_pdf_disabled = false;
  }

  ngOnInit() {
    this.getSolicitudesPorPersona();
  }

  // OBTENER SOLICITUDES DEL ESTUDIANTE PARA LLENAR TABLA
  getSolicitudesPorPersona() {
    this._solicitudesService
      .getSolicitudesPersonalesExterno(this.token, this.usuario.sub)
      .subscribe(
        (response) => {
          console.log(response);
          this.solicitudes = [];
          if (response.status == 'success' && response.solicitudes.length > 0) {
            for (const element of response.solicitudes) {
              if (element.estado !== 'GENERADA') {
                this.solicitudes.push(element);
                console.log(this.solicitudes);
              }
            }
          } else if (response.status == 'error') {
            console.log('Response Error:', response);
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

  getPdf(nombrePdf: string) {
    this.btn_pdf_disabled = true;

    this._mensaje.loading('Obteniendo archivo...', { nzDuration: 0 });

    this._archivosService.getPDF(this.token, nombrePdf).subscribe(
      (response) => {
        if (response.type === 'application/pdf') {
          setTimeout(() => {
            this._mensaje.remove();
            const url = URL.createObjectURL(response);
            window.open(url);
            this.btn_pdf_disabled = false;
          }, 2000);
        } else {
          this._mensaje.remove();
          this._mensaje.error('Archivo no encontrado...', { nzDuration: 2000 });
          this.btn_pdf_disabled = false;
        }
      },
      (error) => {
        this._mensaje.remove();
        this._mensaje.error('Archivo no encontrado...', { nzDuration: 2000 });
        this.btn_pdf_disabled = false;
      },
      () => {}
    );
  }

  createTplModal(
    tplTitle: TemplateRef<{}>,
    tplContent: TemplateRef<{}>,
    tplFooter: TemplateRef<{}>
  ): void {
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: 'Template Context',
      },
      nzOnOk: () => console.log('Click ok'),
    });
  }

  destroyTplModal(modelRef: NzModalRef): void {
    modelRef.destroy();
  }

  editCorrecionSolicitud(idSolicitud: number) {
    this._urlService.encriptarParametro(idSolicitud.toString()).subscribe(
      (id) => {
        if (id !== '') {
          this._router.navigate([
            'cambioCarrera',
            'editarSolicitudEnviada',
            id,
          ]);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
