import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseHomologacionVicedecanoComponent } from './base-homologacionVicedecano/base-homologacionVicedecano.component';
import { NavbarHomologacionVicedecanoComponent } from './components/navbarHomologacionVicedecano/navbarHomologacionVicedecano.component';
import { TablaMateriasAprobadasComponent } from './components/tablaMateriasAprobadas/tablaMateriasAprobadas.component';
import { CorrecionsolicitudHomologacionVicedecanoComponent } from './paginas/correcionsolicitud-homologacionVicedecano/correcionsolicitud-homologacionVicedecano.component';
import { DetallesolicitudHomologacionVicedecanoComponent } from './paginas/detallesolicitud-homologacionVicedecano/detallesolicitud-homologacionVicedecano.component';
import { MostrarsolicitudesHomologacionVicedecanoComponent } from './paginas/mostrarsolicitudes-homologacionVicedecano/mostrarsolicitudes-homologacionVicedecano.component';
import { MostrarsolicitudesexternosHomologacionVicedecanoComponent } from './paginas/mostrarsolicitudesexternos-homologacionVicedecano/mostrarsolicitudesexternos-homologacionVicedecano.component';

const routes = [
  {
    path: '',
    component: BaseHomologacionVicedecanoComponent,
    children: [
      { path: '', redirectTo: 'solicitudesCambioCarrera', pathMatch: 'full' },
      {
        path: 'solicitudesCambioCarrera',
        component: MostrarsolicitudesHomologacionVicedecanoComponent,
      },
      {
        path: 'solicitudesCambioUniversidad',
        component: MostrarsolicitudesexternosHomologacionVicedecanoComponent,
      },
      {
        path: 'detalleSolicitud/:tipo/:id',
        component: DetallesolicitudHomologacionVicedecanoComponent,
      },
      {
        path: 'materiasAprobdas/:idPersonal/:idEscuela/:idMalla',
        component: TablaMateriasAprobadasComponent,
      },
      {
        path: 'marcarCorreciones/:id',
        component: CorrecionsolicitudHomologacionVicedecanoComponent,
      },
      {
        path: 'logout/:sure',
        component: NavbarHomologacionVicedecanoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomologacionVicedecanoRoutingModule {}
