import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseHomologacionReComisionComponent } from './base-homologacionReComision/base-homologacionReComision.component';
import { NavbarHomologacionReComisionComponent } from './components/navbarHomologacionReComision/navbarHomologacionReComision.component';
import { AsignardocenteanalisisHomologacionReComisionComponent } from './paginas/asignardocenteanalisis-homologacionReComision/asignardocenteanalisis-homologacionReComision.component';
import { DetallesolicitudcambiocarreraHomologacionReComisionComponent } from './paginas/detallesolicitudcambiocarrera-homologacionReComision/detallesolicitudcambiocarrera-homologacionReComision.component';
import { DetallesolicitudinformecompletadoHomologacionReComisionComponent } from './paginas/detallesolicitudinformecompletado-homologacionReComision/detallesolicitudinformecompletado-homologacionReComision.component';
import { MostrarsolicitudesCambioCarreraHomologacionReComisionComponent } from './paginas/mostrarsolicitudesCambioCarrera-homologacionReComision/mostrarsolicitudesCambioCarrera-homologacionReComision.component';
import { MostrarsolicitudescambiouniversidadHomologacionReComisionComponent } from './paginas/mostrarsolicitudescambiouniversidad-homologacionReComision/mostrarsolicitudescambiouniversidad-homologacionReComision.component';

const routes = [
  {
    path: '',
    component: BaseHomologacionReComisionComponent,
    children: [
      { path: '', redirecTo: 'solicitudesCambioCarrera', pathMatch: 'full' },
      {
        path: 'solicitudesCambioCarrera',
        component:
          MostrarsolicitudesCambioCarreraHomologacionReComisionComponent,
      },
      {
        path: 'solicitudesCambioUniversidad',
        component:
          MostrarsolicitudescambiouniversidadHomologacionReComisionComponent,
      },
      {
        path: 'detalleSolicitud/:tipo/:id',
        component: DetallesolicitudcambiocarreraHomologacionReComisionComponent,
      },
      {
        path: 'asignarDocenteAnalisis/:tipo/:id',
        component: AsignardocenteanalisisHomologacionReComisionComponent,
      },
      {
        path: 'detalleSolicitudInformesTerminados/:tipo/:id',
        component:
          DetallesolicitudinformecompletadoHomologacionReComisionComponent,
      },
      {
        path: 'logout/:sure',
        component: NavbarHomologacionReComisionComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomologacionReComisionRoutingModule {}
