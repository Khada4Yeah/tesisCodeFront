import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CambioCarreraRoutingModule } from './cambioCarrera-routing.module';

import { BaseCambioCarreraComponent } from './base-cambioCarrera/base-cambioCarrera.component';
import { NavbarCambioCarreraComponent } from './components/navbarCambioCarrera/navbarCambioCarrera.component';
import { CrearsolicitudCambioCarreraComponent } from './paginas/crearsolicitud-cambioCarrera/crearsolicitud-cambioCarrera.component';
import { MostrarsolicitudCambioCarreraComponent } from './paginas/mostrarsolicitud-cambioCarrera/mostrarsolicitud-cambioCarrera.component';

import { CrearSolicitudComponent } from './components/crearSolicitud/crearSolicitud.component';
import { EnviarSolicitudComponent } from './components/enviarSolicitud/enviarSolicitud.component';
import { TablaSolicitudesComponent } from './components/tablaSolicitudes/tablaSolicitudes.component';
import { EnviarsolicitudCambioCarreraComponent } from './paginas/enviarsolicitud-cambioCarrera/enviarsolicitud-cambioCarrera.component';
import { TablaSolicitudesEnviadasComponent } from './components/tablaSolicitudesEnviadas/tablaSolicitudesEnviadas.component';
import { MostrarsolicitudenviadaCambioCarreraComponent } from './paginas/mostrarsolicitudenviada-cambioCarrera/mostrarsolicitudenviada-cambioCarrera.component';

import { NgZorroModule } from '../ngzorro.module';
import { EditarSolicitudComponent } from './components/editarSolicitud/editarSolicitud.component';
import { EditarsolicitudCambioCarreraComponent } from './paginas/editarsolicitud-cambioCarrera/editarsolicitud-cambioCarrera.component';
import { EditarSolicitudEnviadaComponent } from './components/editarSolicitudEnviada/editarSolicitudEnviada.component';
import { EditarsolicitudenviadaCambioCarreraComponent } from './paginas/editarsolicitudenviada-cambioCarrera/editarsolicitudenviada-cambioCarrera.component';

@NgModule({
  declarations: [
    BaseCambioCarreraComponent,
    CrearSolicitudComponent,
    EnviarSolicitudComponent,
    TablaSolicitudesComponent,
    TablaSolicitudesEnviadasComponent,
    NavbarCambioCarreraComponent,
    CrearsolicitudCambioCarreraComponent,
    EnviarsolicitudCambioCarreraComponent,
    MostrarsolicitudCambioCarreraComponent,
    MostrarsolicitudenviadaCambioCarreraComponent,
    EditarSolicitudComponent,
    EditarsolicitudCambioCarreraComponent,
    EditarSolicitudEnviadaComponent,
    EditarsolicitudenviadaCambioCarreraComponent,
  ],
  imports: [
    CommonModule,
    CambioCarreraRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CambioCarreraModule {}
