/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarestudiantesexternosConfiguracionAdminComponent } from './mostrarestudiantesexternos-configuracionAdmin.component';

describe('MostrarestudiantesexternosConfiguracionAdminComponent', () => {
  let component: MostrarestudiantesexternosConfiguracionAdminComponent;
  let fixture: ComponentFixture<MostrarestudiantesexternosConfiguracionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarestudiantesexternosConfiguracionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarestudiantesexternosConfiguracionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
