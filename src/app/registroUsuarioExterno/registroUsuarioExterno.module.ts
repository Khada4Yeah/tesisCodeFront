import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroUsuarioComponent } from './components/registroUsuario/registroUsuario.component';
import { BaseRegistroUsuarioExternoComponent } from './base-registroUsuarioExterno/base-registroUsuarioExterno.component';
import { RegistroUsuarioExternoRoutingModule } from './registroUsuarioExterno-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../ngzorro.module';

@NgModule({
  declarations: [BaseRegistroUsuarioExternoComponent, RegistroUsuarioComponent],
  imports: [
    CommonModule,
    RegistroUsuarioExternoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroUsuarioExternoModule {}
