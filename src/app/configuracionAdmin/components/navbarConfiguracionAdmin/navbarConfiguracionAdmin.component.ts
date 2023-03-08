import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbarConfiguracionAdmin',
  templateUrl: './navbarConfiguracionAdmin.component.html',
  styleUrls: ['./navbarConfiguracionAdmin.component.css'],
})
export class NavbarConfiguracionAdminComponent implements OnInit {
  isCollapsed = false;
  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        //REDIRECCION A AUTENTICACIÓN
        this._router.navigate(['/auth']);
      }
    });
  }
}
