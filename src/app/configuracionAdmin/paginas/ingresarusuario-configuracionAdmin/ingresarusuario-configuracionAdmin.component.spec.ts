/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IngresarusuarioConfiguracionAdminComponent } from './ingresarusuario-configuracionAdmin.component';

describe('IngresarusuarioConfiguracionAdminComponent', () => {
  let component: IngresarusuarioConfiguracionAdminComponent;
  let fixture: ComponentFixture<IngresarusuarioConfiguracionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarusuarioConfiguracionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarusuarioConfiguracionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
