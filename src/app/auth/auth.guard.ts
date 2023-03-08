import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/LoginServices/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private identity: any;
  private id: any;

  constructor(private _router: Router, private _loginService: LoginService) {
    this.id = this._loginService.getToken();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.id) {
      this.identity = this._loginService.getIdentity();
      if (this.identity) {
        if (this.identity.rol_sistema == 'ADMIN') {
          return this._router.navigateByUrl('configuracionAdmin').then(() => {
            return false;
          });
        } else if (this.identity.rol_sistema == 'ESTUDIANTE') {
          return this._router.navigateByUrl('cambioCarrera').then(() => {
            return false;
          });
        } else if (this.identity.rol_sistema == 'VICEDECANO') {
          return this._router
            .navigateByUrl('homologacionVicedecano')
            .then(() => {
              return false;
            });
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
