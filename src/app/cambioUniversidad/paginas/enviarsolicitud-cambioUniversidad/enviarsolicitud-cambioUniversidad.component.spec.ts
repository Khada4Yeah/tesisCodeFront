/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnviarsolicitudCambioUniversidadComponent } from './enviarsolicitud-cambioUniversidad.component';

describe('EnviarsolicitudCambioUniversidadComponent', () => {
  let component: EnviarsolicitudCambioUniversidadComponent;
  let fixture: ComponentFixture<EnviarsolicitudCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarsolicitudCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarsolicitudCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
