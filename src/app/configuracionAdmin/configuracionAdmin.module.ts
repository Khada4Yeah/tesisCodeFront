import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../ngzorro.module';

import { ConfiguracionAdminRoutingModule } from './configuracionAdmin-routing.module';
import { NavbarConfiguracionAdminComponent } from './components/navbarConfiguracionAdmin/navbarConfiguracionAdmin.component';
import { BaseConfiguracionAdminComponent } from './base-configuracionAdmin/base-configuracionAdmin.component';
import { MostrarusuariosConfiguracionAdminComponent } from './paginas/mostrarusuarios-configuracionAdmin/mostrarusuarios-configuracionAdmin.component';
import { IngresarusuarioConfiguracionAdminComponent } from './paginas/ingresarusuario-configuracionAdmin/ingresarusuario-configuracionAdmin.component';
import { MostrarcargosConfiguracionAdminComponent } from './paginas/mostrarcargos-configuracionAdmin/mostrarcargos-configuracionAdmin.component';
import { IngresarcargoConfiguracionAdminComponent } from './paginas/ingresarcargo-configuracionAdmin/ingresarcargo-configuracionAdmin.component';
import { TablaCargosComponent } from './components/tablaCargos/tablaCargos.component';
import { IngresarCargoComponent } from './components/ingresarCargo/ingresarCargo.component';
import { EditarCargoComponent } from './components/editarCargo/editarCargo.component';
import { EditarcargoConfiguracionAdminComponent } from './paginas/editarcargo-configuracionAdmin/editarcargo-configuracionAdmin.component';
import { TablaUsuariosComponent } from './components/tablaUsuarios/tablaUsuarios.component';
import { IngresarUsuarioComponent } from './components/ingresarUsuario/ingresarUsuario.component';
import { EditarUsuarioComponent } from './components/editarUsuario/editarUsuario.component';
import { EditarusuarioConfiguracionAdminComponent } from './paginas/editarusuario-configuracionAdmin/editarusuario-configuracionAdmin.component';
import { TablaEstudiantesExternosComponent } from './components/tablaEstudiantesExternos/tablaEstudiantesExternos.component';
import { MostrarestudiantesexternosConfiguracionAdminComponent } from './paginas/mostrarestudiantesexternos-configuracionAdmin/mostrarestudiantesexternos-configuracionAdmin.component';

@NgModule({
  declarations: [
    BaseConfiguracionAdminComponent,
    TablaCargosComponent,
    IngresarCargoComponent,
    EditarCargoComponent,
    TablaUsuariosComponent,
    IngresarUsuarioComponent,
    EditarUsuarioComponent,
    MostrarcargosConfiguracionAdminComponent,
    IngresarcargoConfiguracionAdminComponent,
    EditarcargoConfiguracionAdminComponent,
    MostrarusuariosConfiguracionAdminComponent,
    IngresarusuarioConfiguracionAdminComponent,
    EditarusuarioConfiguracionAdminComponent,
    NavbarConfiguracionAdminComponent,
    TablaEstudiantesExternosComponent,
    MostrarestudiantesexternosConfiguracionAdminComponent,
  ],
  imports: [
    CommonModule,
    ConfiguracionAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfiguracionAdminModule {}
