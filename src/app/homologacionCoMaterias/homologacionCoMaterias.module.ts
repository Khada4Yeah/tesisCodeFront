import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../ngzorro.module';

import { HomologacionCoMateriasRoutingModule } from './homologacionCoMaterias-routing.module';
import { BaseHomologacionCoMateriasComponent } from './base-homologacionCoMaterias/base-homologacionCoMaterias.component';
import { NavbarHomologacionCoMateriasComponent } from './components/navbarHomologacionCoMaterias/navbarHomologacionCoMaterias.component';
import { MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent } from './paginas/mostrarSolicitudesCambioCarrera-homologacionCoMaterias/mostrarSolicitudesCambioCarrera-homologacionCoMaterias.component';
import { TablaSolicitudesCambioCarreraComponent } from './components/tablaSolicitudesCambioCarrera/tablaSolicitudesCambioCarrera.component';
import { DetallesolicitudescambiocarreraHomologacionCoMateriasComponent } from './paginas/detallesolicitudescambiocarrera-homologacionCoMaterias/detallesolicitudescambiocarrera-homologacionCoMaterias.component';
import { DetalleSolicitudesCambioCarreraComponent } from './components/detalleSolicitudesCambioCarrera/detalleSolicitudesCambioCarrera.component';
import { AsignardocenteanalisisHomologacionCoMateriasComponent } from './paginas/asignardocenteanalisis-homologacionCoMaterias/asignardocenteanalisis-homologacionCoMaterias.component';
import { AsignarDocenteAnalisisComponent } from './components/asignarDocenteAnalisis/asignarDocenteAnalisis.component';
import { DetalleSolicitudesRetornoComponent } from './components/detalleSolicitudesRetorno/detalleSolicitudesRetorno.component';
import { DetallesolicitudesretornoHomologacionCoMateriasComponent } from './paginas/detallesolicitudesretorno-homologacionCoMaterias/detallesolicitudesretorno-homologacionCoMaterias.component';
import { TablaSolicitudesCambioUniversidadComponent } from './components/tablaSolicitudesCambioUniversidad/tablaSolicitudesCambioUniversidad.component';
import { MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent } from './paginas/mostrarsolicitudescambiouniversidad-homologacionCoMaterias/mostrarsolicitudescambiouniversidad-homologacionCoMaterias.component';

@NgModule({
  declarations: [
    BaseHomologacionCoMateriasComponent,
    NavbarHomologacionCoMateriasComponent,
    MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent,
    TablaSolicitudesCambioCarreraComponent,
    DetallesolicitudescambiocarreraHomologacionCoMateriasComponent,
    DetalleSolicitudesCambioCarreraComponent,
    AsignarDocenteAnalisisComponent,
    AsignardocenteanalisisHomologacionCoMateriasComponent,
    DetalleSolicitudesRetornoComponent,
    DetallesolicitudesretornoHomologacionCoMateriasComponent,
    TablaSolicitudesCambioUniversidadComponent,
    MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HomologacionCoMateriasRoutingModule,
  ],
  exports: [HomologacionCoMateriasRoutingModule],
})
export class HomologacionCoMateriasModule {}
