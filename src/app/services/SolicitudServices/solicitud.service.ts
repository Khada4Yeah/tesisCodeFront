import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getSolicitudesPersonales(token: string, idPersonal: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'estudiante/solicitudes/' + idPersonal, {
      headers,
    });
  }

  getSolicitudesPersonalesExterno(
    token: string,
    idPersona: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'estudianteExterno/solicitudes/' + idPersona,
      {
        headers,
      }
    );
  }

  getUltimaSolicitud(
    token: string,
    idPersona: number,
    tipo: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'estudiante/ultimaSolicitud/' + idPersona + '/' + tipo,
      {
        headers,
      }
    );
  }

  getMateriasSolicitud(
    token: string,
    idPersona: number,
    tipo: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url +
        'estudiante/solicitud/materiasSolicitud/' +
        idPersona +
        '/' +
        tipo,
      {
        headers,
      }
    );
  }

  getSolicitudMateriasCorrecion(
    token: string,
    idPersona: number,
    tipo: number
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url +
        'estudiante/solicitud/solicitudMateriasCorrecion/' +
        idPersona +
        '/' +
        tipo,
      { headers }
    );
  }

  getUniversidades(token: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'estudiante/universidades/', {
      headers,
    });
  }

  getEscuelas(token: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'estudiante/escuelas/', {
      headers,
    });
  }

  getEscuelaEstudiante(token: any, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'estudiante/escuelas/' + id, { headers });
  }

  getMallaEstudiante(
    token: any,
    idPersonal: any,
    idEscuela: any
  ): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    let ids = '?q[]=' + idPersonal + '&q[]=' + idEscuela;
    return this._http.get(this.url + 'estudiante/malla/' + ids, { headers });
  }

  getMallaMateriasEscuela(token: any, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'estudiante/materias/' + id, { headers });
  }

  createSolicitud(token: string, solicitud: any): Observable<any> {
    let json = JSON.stringify(solicitud);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + 'estudiante/solicitudes', params, {
      headers,
    });
  }

  sendPdfMateriasHomologar(
    token: string,
    formulario: FormData
  ): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(
      this.url + 'estudiante/solicitud/cargarPdfMaterias',
      formulario,
      { headers }
    );
  }

  updateSolicitud(token: string, solicitud: any): Observable<any> {
    let json = JSON.stringify(solicitud);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(this.url + 'estudiante/solicitudes/' + -1, params, {
      headers,
    });
  }

  updateSolicitudMaterias(
    token: string,
    formulario: FormData
  ): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(
      this.url + 'estudiante/solicitud/cargarPdfCorrecciones',
      formulario,
      { headers }
    );
  }

  getSolicitudesPersonalesExternos(token: string, idPersona: number) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    this._http.get(this.url + 'estudianteExterno/solicitudes/' + idPersona, {
      headers,
    });
  }
}
