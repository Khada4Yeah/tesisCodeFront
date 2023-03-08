import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../ngzorro.module';
import { BaseHomologacionDoAnalisisComponent } from './base-homologacionDoAnalisis/base-homologacionDoAnalisis.component';
import { NavbarHomologacionDoAnalisisComponent } from './components/navbarHomologacionDoAnalisis/navbarHomologacionDoAnalisis.component';
import { HomologacionDoAnalisisRoutingModule } from './homologacionDoAnalisis-routing.module';
import { MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent } from './paginas/mostrarSolicitudesCambioCarrera-homologacionDoAnalisis/mostrarSolicitudesCambioCarrera-homologacionDoAnalisis.component';
import { TablaSolicitudesCambioCarreraComponent } from './components/tablaSolicitudesCambioCarrera/tablaSolicitudesCambioCarrera.component';
import { DetalleSolicitudesCambioCarreraComponent } from './components/detalleSolicitudesCambioCarrera/detalleSolicitudesCambioCarrera.component';
import { DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent } from './paginas/detallesolicitudescambiocarrera-homologacionDoAnalisis/detallesolicitudescambiocarrera-homologacionDoAnalisis.component';
import { CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent } from './paginas/crearAnalisisDocenteCambioCarrera-homologacionDoAnanlisis/crearAnalisisDocenteCambioCarrera-homologacionDoAnanlisis.component';
import { CrearAnalisisDocenteComponent } from './components/crearAnalisisDocente/crearAnalisisDocente.component';
import { TablaSolicitudesCambioUniversidadComponent } from './components/tablaSolicitudesCambioUniversidad/tablaSolicitudesCambioUniversidad.component';
import { MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent } from './paginas/mostrarsolicitudescambiouniversidad-homologacionDoAnalisis/mostrarsolicitudescambiouniversidad-homologacionDoAnalisis.component';

@NgModule({
  declarations: [
    BaseHomologacionDoAnalisisComponent,
    NavbarHomologacionDoAnalisisComponent,
    MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent,
    TablaSolicitudesCambioCarreraComponent,
    DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent,
    DetalleSolicitudesCambioCarreraComponent,
    CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent,
    CrearAnalisisDocenteComponent,
    TablaSolicitudesCambioUniversidadComponent,
    MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HomologacionDoAnalisisRoutingModule,
  ],
  exports: [HomologacionDoAnalisisRoutingModule],
})
export class HomologacionDoAnalisisModule {}
