import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseHomologacionCoMateriasComponent } from './base-homologacionCoMaterias/base-homologacionCoMaterias.component';
import { NavbarHomologacionCoMateriasComponent } from './components/navbarHomologacionCoMaterias/navbarHomologacionCoMaterias.component';
import { AsignardocenteanalisisHomologacionCoMateriasComponent } from './paginas/asignardocenteanalisis-homologacionCoMaterias/asignardocenteanalisis-homologacionCoMaterias.component';
import { DetallesolicitudescambiocarreraHomologacionCoMateriasComponent } from './paginas/detallesolicitudescambiocarrera-homologacionCoMaterias/detallesolicitudescambiocarrera-homologacionCoMaterias.component';
import { DetallesolicitudesretornoHomologacionCoMateriasComponent } from './paginas/detallesolicitudesretorno-homologacionCoMaterias/detallesolicitudesretorno-homologacionCoMaterias.component';
import { MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent } from './paginas/mostrarSolicitudesCambioCarrera-homologacionCoMaterias/mostrarSolicitudesCambioCarrera-homologacionCoMaterias.component';
import { MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent } from './paginas/mostrarsolicitudescambiouniversidad-homologacionCoMaterias/mostrarsolicitudescambiouniversidad-homologacionCoMaterias.component';

const routes = [
  {
    path: '',
    component: BaseHomologacionCoMateriasComponent,
    children: [
      { path: '', redirecTo: '/solicitudesCambioCarrera', pathMatch: 'full' },
      {
        path: 'solicitudesCambioCarrera',
        component:
          MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent,
      },
      {
        path: 'solicitudesCambioUniversidad',
        component:
          MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent,
      },
      {
        path: 'detalleSolicitud/:tipo/:id',
        component:
          DetallesolicitudescambiocarreraHomologacionCoMateriasComponent,
      },
      {
        path: 'asignarDocenteAnalisis/:tipo/:id',
        component: AsignardocenteanalisisHomologacionCoMateriasComponent,
      },
      {
        path: 'detalleSolicitudInforme/:tipo/:id',
        component: DetallesolicitudesretornoHomologacionCoMateriasComponent,
      },
      {
        path: 'logout/:sure',
        component: NavbarHomologacionCoMateriasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomologacionCoMateriasRoutingModule {}
