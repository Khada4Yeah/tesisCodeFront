import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudCoMateriasService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getSolicitudesPorCoMaterias(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'coMaterias/solicitudes/' + idPersonal, {
      headers,
    });
  }

  getSolicitudesExternosPorCoMaterias(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'coMaterias/solicitudesExternos/' + idPersonal,
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
        'coMaterias/solicitudesDetalle/' +
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

  getDepartamentoCoMaterias(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'coMaterias/departamentoCoMaterias/' + idPersonal + '/true',
      {
        headers,
      }
    );
  }

  returnReComision(token: string, datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url + 'coMaterias/devolverReComision',
      params,
      {
        headers,
      }
    );
  }
}
