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
export class ConfiguracionAdminGuard implements CanActivate {
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
    if (this.id != undefined && this.id != null && this.id != NaN) {
      this.identity = this._loginService.getIdentity();
      if (this.identity.rol_sistema == 'ADMIN') {
        return true;
      } else {
        return this._router.navigateByUrl('error').then(() => false);
      }
    } else {
      return this._router.navigateByUrl('auth').then(() => false);
    }
  }
}
