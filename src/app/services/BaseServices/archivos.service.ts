import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { global } from '../BaseServices/base.service';

@Injectable({ providedIn: 'root' })
export class ArchivosService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getPDF(token: string, nombrePdf: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'documentos/getPDF/' + nombrePdf, {
      responseType: 'blob',
      headers,
    });
  }
}
