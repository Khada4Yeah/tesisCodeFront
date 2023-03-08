import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseCambioUniversidadComponent } from './base-cambioUniversidad/base-cambioUniversidad.component';
import { NavbarCambioUniversidadComponent } from './components/navbarCambioUniversidad/navbarCambioUniversidad.component';
import { CrearsolicitudCambioUniversidadComponent } from './paginas/crearsolicitud-cambioUniversidad/crearsolicitud-cambioUniversidad.component';
import { EditardatosestudianteCambioUniversidadComponent } from './paginas/editardatosestudiante-cambioUniversidad/editardatosestudiante-cambioUniversidad.component';
import { EditarsolicitudCambioUniversidadComponent } from './paginas/editarsolicitud-cambioUniversidad/editarsolicitud-cambioUniversidad.component';
import { EditarsolicitudenviadaCambioUniversidadComponent } from './paginas/editarsolicitudenviada-cambioUniversidad/editarsolicitudenviada-cambioUniversidad.component';
import { EnviarsolicitudCambioUniversidadComponent } from './paginas/enviarsolicitud-cambioUniversidad/enviarsolicitud-cambioUniversidad.component';
import { MostrarsolicitudCambioUniversidadComponent } from './paginas/mostrarsolicitud-cambioUniversidad/mostrarsolicitud-cambioUniversidad.component';
import { MostrarsolicitudenviadaCambioUniversidadComponent } from './paginas/mostrarsolicitudenviada-cambioUniversidad/mostrarsolicitudenviada-cambioUniversidad.component';

const routes: Routes = [
  {
    path: '',
    component: BaseCambioUniversidadComponent,
    children: [
      { path: '', redirectTo: 'mostrarSolicitudes', pathMatch: 'full' },
      {
        path: 'mostrarSolicitudes',
        component: MostrarsolicitudCambioUniversidadComponent,
      },
      {
        path: 'crearSolicitud',
        component: CrearsolicitudCambioUniversidadComponent,
      },
      {
        path: 'editarSolicitud/:id',
        component: EditarsolicitudCambioUniversidadComponent,
      },
      {
        path: 'mostrarSolicitudesEnviadas',
        component: MostrarsolicitudenviadaCambioUniversidadComponent,
      },
      {
        path: 'enviarSolicitud',
        component: EnviarsolicitudCambioUniversidadComponent,
      },
      {
        path: 'editarSolicitudEnviada/:id',
        component: EditarsolicitudenviadaCambioUniversidadComponent,
      },
      {
        path: 'editarDatos',
        component: EditardatosestudianteCambioUniversidadComponent,
      },

      { path: 'logout/:sure', component: NavbarCambioUniversidadComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioUniversidadRoutingModule {}
