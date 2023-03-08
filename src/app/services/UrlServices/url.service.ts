import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor() {}

  encriptarParametro(parametro: string): Observable<string> {
    const encriptarId = of(parametro).pipe(
      map((id) => AES.encrypt(id.toString(), 'ecrPad21_2>2').toString())
    );
    return encriptarId;
  }

  desencriptarParametro(parametro: string): Observable<string> {
    return new Observable((observer) => {
      try {
        const desencriptarId = AES.decrypt(parametro, 'ecrPad21_2>2').toString(
          enc.Utf8
        );

        observer.next(desencriptarId);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
