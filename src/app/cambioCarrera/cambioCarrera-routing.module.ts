import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseCambioCarreraComponent } from './base-cambioCarrera/base-cambioCarrera.component';
import { NavbarCambioCarreraComponent } from './components/navbarCambioCarrera/navbarCambioCarrera.component';
import { CrearsolicitudCambioCarreraComponent } from './paginas/crearsolicitud-cambioCarrera/crearsolicitud-cambioCarrera.component';
import { EditarsolicitudCambioCarreraComponent } from './paginas/editarsolicitud-cambioCarrera/editarsolicitud-cambioCarrera.component';
import { EditarsolicitudenviadaCambioCarreraComponent } from './paginas/editarsolicitudenviada-cambioCarrera/editarsolicitudenviada-cambioCarrera.component';
import { EnviarsolicitudCambioCarreraComponent } from './paginas/enviarsolicitud-cambioCarrera/enviarsolicitud-cambioCarrera.component';
import { MostrarsolicitudCambioCarreraComponent } from './paginas/mostrarsolicitud-cambioCarrera/mostrarsolicitud-cambioCarrera.component';
import { MostrarsolicitudenviadaCambioCarreraComponent } from './paginas/mostrarsolicitudenviada-cambioCarrera/mostrarsolicitudenviada-cambioCarrera.component';

const routes: Routes = [
  {
    path: '',
    component: BaseCambioCarreraComponent,
    children: [
      { path: '', redirectTo: 'mostrarSolicitudes', pathMatch: 'full' },
      {
        path: 'mostrarSolicitudes',
        component: MostrarsolicitudCambioCarreraComponent,
      },
      {
        path: 'crearSolicitud',
        component: CrearsolicitudCambioCarreraComponent,
      },
      {
        path: 'editarSolicitud/:id',
        component: EditarsolicitudCambioCarreraComponent,
      },
      {
        path: 'mostrarSolicitudesEnviadas',
        component: MostrarsolicitudenviadaCambioCarreraComponent,
      },
      {
        path: 'enviarSolicitud',
        component: EnviarsolicitudCambioCarreraComponent,
      },
      {
        path: 'editarSolicitudEnviada/:id',
        component: EditarsolicitudenviadaCambioCarreraComponent,
      },
      { path: 'logout/:sure', component: NavbarCambioCarreraComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioCarreraRoutingModule {}
