import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseHomologacionReComisionComponent } from './base-homologacionReComision/base-homologacionReComision.component';
import { HomologacionReComisionRoutingModule } from './homologacionReComision-routing.module';
import { NavbarHomologacionReComisionComponent } from './components/navbarHomologacionReComision/navbarHomologacionReComision.component';
import { TablaSolicitudesCambioCarreraComponent } from './components/tablaSolicitudesCambioCarrera/tablaSolicitudesCambioCarrera.component';
import { MostrarsolicitudesCambioCarreraHomologacionReComisionComponent } from './paginas/mostrarsolicitudesCambioCarrera-homologacionReComision/mostrarsolicitudesCambioCarrera-homologacionReComision.component';
import { DetalleSolicitudesCambioCarreraComponent } from './components/detalleSolicitudesCambioCarrera/detalleSolicitudesCambioCarrera.component';
import { DetallesolicitudcambiocarreraHomologacionReComisionComponent } from './paginas/detallesolicitudcambiocarrera-homologacionReComision/detallesolicitudcambiocarrera-homologacionReComision.component';

import { NgZorroModule } from '../ngzorro.module';
import { AsignarDocenteAnalisisComponent } from './components/asignarDocenteAnalisis/asignarDocenteAnalisis.component';
import { AsignardocenteanalisisHomologacionReComisionComponent } from './paginas/asignardocenteanalisis-homologacionReComision/asignardocenteanalisis-homologacionReComision.component';
import { DetalleSolicitudInformeCompletadoComponent } from './components/detalleSolicitudInformeCompletado/detalleSolicitudInformeCompletado.component';
import { DetallesolicitudinformecompletadoHomologacionReComisionComponent } from './paginas/detallesolicitudinformecompletado-homologacionReComision/detallesolicitudinformecompletado-homologacionReComision.component';
import { TablaSolicitudesCambioUniversidadComponent } from './components/tablaSolicitudesCambioUniversidad/tablaSolicitudesCambioUniversidad.component';
import { MostrarsolicitudescambiouniversidadHomologacionReComisionComponent } from './paginas/mostrarsolicitudescambiouniversidad-homologacionReComision/mostrarsolicitudescambiouniversidad-homologacionReComision.component';

@NgModule({
  declarations: [
    BaseHomologacionReComisionComponent,
    NavbarHomologacionReComisionComponent,
    TablaSolicitudesCambioCarreraComponent,
    MostrarsolicitudesCambioCarreraHomologacionReComisionComponent,
    DetalleSolicitudesCambioCarreraComponent,
    DetallesolicitudcambiocarreraHomologacionReComisionComponent,
    AsignarDocenteAnalisisComponent,
    AsignardocenteanalisisHomologacionReComisionComponent,
    DetalleSolicitudInformeCompletadoComponent,
    DetallesolicitudinformecompletadoHomologacionReComisionComponent,
    TablaSolicitudesCambioUniversidadComponent,
    MostrarsolicitudescambiouniversidadHomologacionReComisionComponent,
  ],
  imports: [
    HomologacionReComisionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomologacionReComisionModule {}
