import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CambioUniversidadRoutingModule } from './cambioUniversidad-routing.module';
import { BaseCambioUniversidadComponent } from './base-cambioUniversidad/base-cambioUniversidad.component';
import { NavbarCambioUniversidadComponent } from './components/navbarCambioUniversidad/navbarCambioUniversidad.component';
import { MostrarsolicitudCambioUniversidadComponent } from './paginas/mostrarsolicitud-cambioUniversidad/mostrarsolicitud-cambioUniversidad.component';
import { TablaSolicitudesComponent } from './components/tablaSolicitudes/tablaSolicitudes.component';
import { CrearsolicitudCambioUniversidadComponent } from './paginas/crearsolicitud-cambioUniversidad/crearsolicitud-cambioUniversidad.component';
import { NgZorroModule } from '../ngzorro.module';
import { EditarDatosEstudianteComponent } from './components/editarDatosEstudiante/editarDatosEstudiante.component';
import { EditardatosestudianteCambioUniversidadComponent } from './paginas/editardatosestudiante-cambioUniversidad/editardatosestudiante-cambioUniversidad.component';
import { CrearSolicitudComponent } from './components/crearSolicitud/crearSolicitud.component';
import { EditarSolicitudComponent } from './components/editarSolicitud/editarSolicitud.component';
import { EditarsolicitudCambioUniversidadComponent } from './paginas/editarsolicitud-cambioUniversidad/editarsolicitud-cambioUniversidad.component';
import { TablaSolicitudesEnviadasComponent } from './components/tablaSolicitudesEnviadas/tablaSolicitudesEnviadas.component';
import { MostrarsolicitudenviadaCambioUniversidadComponent } from './paginas/mostrarsolicitudenviada-cambioUniversidad/mostrarsolicitudenviada-cambioUniversidad.component';
import { EnviarSolicitudComponent } from './components/enviarSolicitud/enviarSolicitud.component';
import { EnviarsolicitudCambioUniversidadComponent } from './paginas/enviarsolicitud-cambioUniversidad/enviarsolicitud-cambioUniversidad.component';
import { EditarSolicitudEnviadaComponent } from './components/editarSolicitudEnviada/editarSolicitudEnviada.component';
import { EditarsolicitudenviadaCambioUniversidadComponent } from './paginas/editarsolicitudenviada-cambioUniversidad/editarsolicitudenviada-cambioUniversidad.component';

@NgModule({
  declarations: [
    BaseCambioUniversidadComponent,
    NavbarCambioUniversidadComponent,
    MostrarsolicitudCambioUniversidadComponent,
    TablaSolicitudesComponent,
    CrearsolicitudCambioUniversidadComponent,
    CrearSolicitudComponent,
    EditarDatosEstudianteComponent,
    EditardatosestudianteCambioUniversidadComponent,
    EditarSolicitudComponent,
    EditarsolicitudCambioUniversidadComponent,
    EnviarSolicitudComponent,
    EnviarsolicitudCambioUniversidadComponent,
    TablaSolicitudesEnviadasComponent,
    MostrarsolicitudenviadaCambioUniversidadComponent,
    EditarSolicitudEnviadaComponent,
    EditarsolicitudenviadaCambioUniversidadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
    CambioUniversidadRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CambioUniversidadModule {}
