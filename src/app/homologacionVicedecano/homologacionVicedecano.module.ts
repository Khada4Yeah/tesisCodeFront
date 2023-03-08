import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomologacionVicedecanoRoutingModule } from './homologacionVicedecano-routing.module';
import { BaseHomologacionVicedecanoComponent } from './base-homologacionVicedecano/base-homologacionVicedecano.component';
import { TablaSolicitudesComponent } from './components/tablaSolicitudes/tablaSolicitudes.component';
import { MostrarsolicitudesHomologacionVicedecanoComponent } from './paginas/mostrarsolicitudes-homologacionVicedecano/mostrarsolicitudes-homologacionVicedecano.component';
import { NavbarHomologacionVicedecanoComponent } from './components/navbarHomologacionVicedecano/navbarHomologacionVicedecano.component';
import { DetallesolicitudHomologacionVicedecanoComponent } from './paginas/detallesolicitud-homologacionVicedecano/detallesolicitud-homologacionVicedecano.component';
import { DetalleSolicitudComponent } from './components/detalleSolicitud/detalleSolicitud.component';
import { TablaMateriasAprobadasComponent } from './components/tablaMateriasAprobadas/tablaMateriasAprobadas.component';
import { CorrecionSolicitudComponent } from './components/correcionSolicitud/correcionSolicitud.component';
import { CorrecionsolicitudHomologacionVicedecanoComponent } from './paginas/correcionsolicitud-homologacionVicedecano/correcionsolicitud-homologacionVicedecano.component';
import { NgZorroModule } from '../ngzorro.module';
import { TablaSolicitudesExternosComponent } from './components/tablaSolicitudesExternos/tablaSolicitudesExternos.component';
import { MostrarsolicitudesexternosHomologacionVicedecanoComponent } from './paginas/mostrarsolicitudesexternos-homologacionVicedecano/mostrarsolicitudesexternos-homologacionVicedecano.component';

@NgModule({
  declarations: [
    BaseHomologacionVicedecanoComponent,
    NavbarHomologacionVicedecanoComponent,
    TablaSolicitudesComponent,
    TablaMateriasAprobadasComponent,
    DetalleSolicitudComponent,
    MostrarsolicitudesHomologacionVicedecanoComponent,
    DetallesolicitudHomologacionVicedecanoComponent,
    CorrecionSolicitudComponent,
    CorrecionsolicitudHomologacionVicedecanoComponent,
    TablaSolicitudesExternosComponent,
    MostrarsolicitudesexternosHomologacionVicedecanoComponent,
  ],
  imports: [
    HomologacionVicedecanoRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomologacionVicedecanoModule {}
