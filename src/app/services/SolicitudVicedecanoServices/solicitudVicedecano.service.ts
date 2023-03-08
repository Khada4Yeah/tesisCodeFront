import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudVicedecanoService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getSolicitudesPorVicedecano(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'vicedecano/solicitudes/' + id, {
      headers,
    });
  }

  getSolicitudesExternosPorVicedecano(
    token: string,
    idPersonal: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'vicedecano/solicitudesExternos/' + idPersonal,
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
        'vicedecano/solicitudesDetalle/' +
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

  getMateriasAprobadas(
    token: any,
    idPersonal: any,
    idEscuela: any,
    idMalla: any
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    let ids = '?q[]=' + idPersonal + '&q[]=' + idEscuela + '&q[]=' + idMalla;

    return this._http.get(this.url + 'vicedecano/historialEstudiante/' + ids, {
      headers,
    });
  }

  getDepartamentos(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'vicedecano/obtenerDepartamentos', {
      headers,
    });
  }

  setDepartamentoSolicitud(
    token: string,
    idSolicitud: number,
    idDepartamento: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url +
        'vicedecano/asignarDepartamentoSolicitud/' +
        idSolicitud +
        '/' +
        idDepartamento,
      null,
      { headers }
    );
  }

  sendToReComision(token: string, idSolicitud: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url + 'vicedecano/enviarReComision/' + idSolicitud,
      null,
      {
        headers,
      }
    );
  }

  sendParaCorreccion(token: any, datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(
      this.url + 'vicedecano/correcionSolicitud',
      params,
      { headers }
    );
  }

  rejectSolicitud(observaciones: any, token: string, id: any): Observable<any> {
    let json = JSON.stringify(observaciones);
    console.log(json);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(
      this.url + 'vicedecano/rechazarSolicitud/' + id,
      params,
      { headers }
    );
  }
}
