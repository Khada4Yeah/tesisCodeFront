import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseConfiguracionAdminComponent } from './base-configuracionAdmin/base-configuracionAdmin.component';
import { NavbarConfiguracionAdminComponent } from './components/navbarConfiguracionAdmin/navbarConfiguracionAdmin.component';
import { EditarcargoConfiguracionAdminComponent } from './paginas/editarcargo-configuracionAdmin/editarcargo-configuracionAdmin.component';
import { EditarusuarioConfiguracionAdminComponent } from './paginas/editarusuario-configuracionAdmin/editarusuario-configuracionAdmin.component';
import { IngresarcargoConfiguracionAdminComponent } from './paginas/ingresarcargo-configuracionAdmin/ingresarcargo-configuracionAdmin.component';
import { IngresarusuarioConfiguracionAdminComponent } from './paginas/ingresarusuario-configuracionAdmin/ingresarusuario-configuracionAdmin.component';
import { MostrarcargosConfiguracionAdminComponent } from './paginas/mostrarcargos-configuracionAdmin/mostrarcargos-configuracionAdmin.component';
import { MostrarestudiantesexternosConfiguracionAdminComponent } from './paginas/mostrarestudiantesexternos-configuracionAdmin/mostrarestudiantesexternos-configuracionAdmin.component';
import { MostrarusuariosConfiguracionAdminComponent } from './paginas/mostrarusuarios-configuracionAdmin/mostrarusuarios-configuracionAdmin.component';

const routes: Routes = [
  {
    path: '',
    component: BaseConfiguracionAdminComponent,
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      {
        path: 'cargos',
        component: MostrarcargosConfiguracionAdminComponent,
      },
      {
        path: 'ingresarCargo',
        component: IngresarcargoConfiguracionAdminComponent,
      },
      {
        path: 'editarCargo/:id',
        component: EditarcargoConfiguracionAdminComponent,
      },
      {
        path: 'usuarios',
        component: MostrarusuariosConfiguracionAdminComponent,
      },
      {
        path: 'ingresarUsuario',
        component: IngresarusuarioConfiguracionAdminComponent,
      },
      {
        path: 'editarUsuario/:id',
        component: EditarusuarioConfiguracionAdminComponent,
      },
      {
        path: 'estudiantesExternos',
        component: MostrarestudiantesexternosConfiguracionAdminComponent,
      },
      {
        path: 'logout/:sure',
        component: NavbarConfiguracionAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionAdminRoutingModule {}
