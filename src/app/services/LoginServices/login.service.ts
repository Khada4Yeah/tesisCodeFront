import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { global } from '../BaseServices/base.service';

const ayu = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class LoginService {
  private url: string;
  public identity: any;
  public token: any;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  loginUTM(login: any, gettoken: boolean = false): Observable<any> {
    if (gettoken != false) {
      login.gettoken = 'true';
    }

    let json = JSON.stringify(login);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'user/login', params, {
      headers: headers,
    });
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getIdentity2(): Observable<any> {
    console.log(this.getToken());
    let json = JSON.stringify(this.getToken());
    let params = 'json= {"token":' + json + '}';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.getToken());
    return this._http.post(this.url + 'user/identity', params, { headers });
  }

  getIdentity() {
    return ayu.decodeToken(this.getToken());
  }
}
