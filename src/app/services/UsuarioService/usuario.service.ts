import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../BaseServices/base.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getCargo(token: any, id: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'admin/cargo/' + id, { headers });
  }

  getCargos(token: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'admin/cargo', { headers });
  }

  createCargo(token: any, cargo: object): Observable<any> {
    let json = JSON.stringify(cargo);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'admin/cargo', params, { headers });
  }

  updateCargo(token: any, cargo: object, id: any): Observable<any> {
    let json = JSON.stringify(cargo);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.put(this.url + 'admin/cargo/' + id, params, { headers });
  }

  deleteCargo(token: any, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.delete(this.url + 'admin/cargo/' + id, { headers });
  }

  getUsuarios(token: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'admin/usuario/', { headers });
  }

  getUsuario(token: string, id: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'admin/usuario/' + id, { headers });
  }

  createUsuario(token: any, usuario: object): Observable<any> {
    let json = JSON.stringify(usuario);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + 'admin/usuario', params, { headers });
  }

  updateUsuario(token: any, usuario: any, id: any): Observable<any> {
    let json = JSON.stringify(usuario);
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.patch(this.url + 'admin/usuario/' + id, params, {
      headers,
    });
  }

  deleteUsuario(token: any, id: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.delete(this.url + 'admin/usuario/' + id, { headers });
  }

  getDepartamentos(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'admin/usuario/consultas/departamentos', {
      headers,
    });
  }

  getPersonalCedula(token: any, cedula: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'admin/usuario/consultas/personalCedula/' + cedula,
      {
        headers,
      }
    );
  }

  getEstudiantesExternos(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'admin/estudiantesExternos', {
      headers,
    });
  }

  deleteEstudianteExterno(token: any, idPersona: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(
      this.url + 'admin/estudiantesExternos' + idPersona,
      { headers }
    );
  }
}
