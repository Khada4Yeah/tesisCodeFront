import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class PdfMateriaSolicitudService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  uploadPdfMateria(
    token: any,
    idSolicitud: number,
    idMateria: number,
    pdf: any
  ): Observable<any> {
    let gg = {
      solicitudes_id: +idSolicitud,
      materia_id: +idMateria,
    };

    let json = JSON.stringify(gg);
    console.log(json);

    const input = new FormData();
    input.append('json', json);
    input.append('file0', pdf as File);

    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.post(
      this.url + 'solicitudes/materias_homologar/uploadPDF',
      input,
      {
        headers,
      }
    );
  }

  getPdfMateria(token: string, namePdf: string): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.get(
      this.url + 'solicitudes/materias_homologar/getPDF/' + namePdf,
      { responseType: 'blob', headers }
    );
  }

  getDocentesDepartamento(
    token: string,
    idDepartamento: number
  ): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.get(
      this.url +
        'solicitudes/materias_homologar/obtenerDocentes/' +
        idDepartamento,
      { headers }
    );
  }

  actualizarDocenteAnalisis(token: string, datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url + 'solicitudes/materias_homologar/asignarDocenteAnalisis/',
      params,
      { headers }
    );
  }

  closeAsignacionDocentes(token: string, datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url + 'solicitudes/materias_homologar/cerrarAsignacionDocentes/',
      params,
      { headers }
    );
  }

  getSolicitudesPorDoAnalisis(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'doAnalisis/solicitudes/' + idPersonal, {
      headers,
    });
  }

  getSolicitudesExternosPorDoAnalisis(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'doAnalisis/solicitudesExternos/' + idPersonal,
      {
        headers,
      }
    );
  }

  getSolicitud(
    token: any,
    idPersonal: number,
    idSolicitud: number,
    tipo: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url +
        'doAnalisis/solicitudesDetalle/' +
        idPersonal +
        '/' +
        idSolicitud +
        '/' +
        tipo,
      {
        headers,
      }
    );
  }

  getSolicitudMateria(
    token: string,
    idPersonal: number,
    idSolicitud: number,
    idMateria: number,
    tipo: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    let ids =
      '?personal_id=' +
      idPersonal +
      '&solicitudes_id=' +
      idSolicitud +
      '&materia_id=' +
      idMateria +
      '&tipo=' +
      tipo;

    return this._http.get(
      this.url + 'doAnalisis/solicitudMateriaDetalle/' + ids,
      {
        headers,
      }
    );
  }

  updateAnalisisDocente(token: string, datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url + 'doAnalisis/realizaAnalisisMateria',
      params,
      { headers }
    );
  }

  createPdfAnalisis(
    token: any,
    datos: any,
    idSolicitud: number,
    idDocente: number,
    tipo: number
  ): Observable<any> {
    const params = {
      datos: JSON.stringify(datos),
      solicitudes_id: idSolicitud,
      docente_id: idDocente,
      tipo: tipo,
    };

    console.log(params);

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'solicitudes/materias_homologar/getPDFAnalisDocente',
      { params: params, headers, responseType: 'blob' }
    );
  }

  uploadPdfAnalisis(token: string, datos: FormData): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(
      this.url + 'doAnalisis/uploadPdfAnalisisFirmado',
      datos,
      { headers }
    );
  }
}
