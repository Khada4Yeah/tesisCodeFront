import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  registrarUsuario(usuario: any): Observable<any> {
    let json = JSON.stringify(usuario);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'user/register', params, { headers });
  }

  setDatosEstudiante(token: string, datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.patch(this.url + 'user/update', params, { headers });
  }

  getDatosEstudiante(token: string, idPersona: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'user/show/' + idPersona, { headers });
  }
}
