import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseRegistroUsuarioExternoComponent } from './base-registroUsuarioExterno/base-registroUsuarioExterno.component';
import { RegistroUsuarioComponent } from './components/registroUsuario/registroUsuario.component';

const routes: Routes = [
  {
    path: '',
    component: BaseRegistroUsuarioExternoComponent,
    children: [
      { path: '', redirectTo: 'registro', pathMatch: 'full' },
      { path: 'registro', component: RegistroUsuarioComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroUsuarioExternoRoutingModule {}
