import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudReComisionService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getSolicitudesPorReComision(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'reComision/solicitudes/' + id, {
      headers,
    });
  }

  getSolicitudesExternosPorReComision(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'reComision/solicitudesExternos/' + idPersonal,
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
        'reComision/solicitudesDetalle/' +
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

  getDepartamentoReComision(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'reComision/departamentoReComision/' + idPersonal + '/true',
      {
        headers,
      }
    );
  }

  sendToCoMaterias(token: string, idSolicitud: number): Observable<any> {
    let json = JSON.stringify({ solicitudes_id: idSolicitud });

    let data = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(this.url + 'reComision/enviarCoMaterias', data, {
      headers,
    });
  }
}
