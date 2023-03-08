/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarusuariosConfiguracionAdminComponent } from './mostrarusuarios-configuracionAdmin.component';

describe('MostrarusuariosConfiguracionAdminComponent', () => {
  let component: MostrarusuariosConfiguracionAdminComponent;
  let fixture: ComponentFixture<MostrarusuariosConfiguracionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarusuariosConfiguracionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarusuariosConfiguracionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
