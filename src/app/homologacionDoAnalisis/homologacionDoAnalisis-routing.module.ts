import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseHomologacionDoAnalisisComponent } from './base-homologacionDoAnalisis/base-homologacionDoAnalisis.component';
import { NavbarHomologacionDoAnalisisComponent } from './components/navbarHomologacionDoAnalisis/navbarHomologacionDoAnalisis.component';
import { CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent } from './paginas/crearAnalisisDocenteCambioCarrera-homologacionDoAnanlisis/crearAnalisisDocenteCambioCarrera-homologacionDoAnanlisis.component';
import { DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent } from './paginas/detallesolicitudescambiocarrera-homologacionDoAnalisis/detallesolicitudescambiocarrera-homologacionDoAnalisis.component';
import { MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent } from './paginas/mostrarSolicitudesCambioCarrera-homologacionDoAnalisis/mostrarSolicitudesCambioCarrera-homologacionDoAnalisis.component';
import { MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent } from './paginas/mostrarsolicitudescambiouniversidad-homologacionDoAnalisis/mostrarsolicitudescambiouniversidad-homologacionDoAnalisis.component';

const routes = [
  {
    path: '',
    component: BaseHomologacionDoAnalisisComponent,
    children: [
      {
        path: '',
        redirecTo: '/solicitudesCambioCarrera',
        pathMatch: 'full',
      },
      {
        path: 'solicitudesCambioCarrera',
        component:
          MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent,
      },
      {
        path: 'solicitudesCambioUniversidad',
        component:
          MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent,
      },
      {
        path: 'detalleSolicitud/:tipo/:id',
        component:
          DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent,
      },
      {
        path: 'crearAnalisis/:tipo/:idM/:idS',
        component:
          CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent,
      },
      {
        path: 'logout/:sure',
        component: NavbarHomologacionDoAnalisisComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomologacionDoAnalisisRoutingModule {}
