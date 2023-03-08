import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CambioCarreraGuard } from './cambioCarrera/cambioCarrera.guard';
import { ConfiguracionAdminGuard } from './configuracionAdmin/configuracionAdmin.guard';
import { ErrorComponent } from './error/errorComponent/errorComponent.component';
import { HomologacionVicedecanoGuard } from './homologacionVicedecano/homologacionVicedecano.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'cambioCarrera',
    loadChildren: () =>
      import('./cambioCarrera/cambioCarrera.module').then(
        (m) => m.CambioCarreraModule
      ),
    //canActivate: [CambioCarreraGuard],
  },
  {
    path: 'cambioUniversidad',
    loadChildren: () =>
      import('./cambioUniversidad/cambioUniverisdad.module').then(
        (m) => m.CambioUniversidadModule
      ),
  },
  {
    path: 'homologacionVicedecano',
    loadChildren: () =>
      import('./homologacionVicedecano/homologacionVicedecano.module').then(
        (m) => m.HomologacionVicedecanoModule
      ),
    //canActivate: [HomologacionVicedecanoGuard],
  },
  {
    path: 'homologacionReComision',
    loadChildren: () =>
      import('./homologacionReComision/homologacionReComision.module').then(
        (m) => m.HomologacionReComisionModule
      ),
  },
  {
    path: 'homologacionCoMaterias',
    loadChildren: () =>
      import('./homologacionCoMaterias/homologacionCoMaterias.module').then(
        (m) => m.HomologacionCoMateriasModule
      ),
  },
  {
    path: 'homologacionDoAnalisis',
    loadChildren: () =>
      import('./homologacionDoAnalisis/homologacionDoAnalisis.module').then(
        (m) => m.HomologacionDoAnalisisModule
      ),
  },
  {
    path: 'configuracionAdmin',
    loadChildren: () =>
      import('./configuracionAdmin/configuracionAdmin.module').then(
        (m) => m.ConfiguracionAdminModule
      ),
    //canActivate: [ConfiguracionAdminGuard],
  },
  {
    path: 'registroUsuario',
    loadChildren: () =>
      import('./registroUsuarioExterno/registroUsuarioExterno.module').then(
        (m) => m.RegistroUsuarioExternoModule
      ),
  },
  { path: 'error', component: ErrorComponent },

  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
