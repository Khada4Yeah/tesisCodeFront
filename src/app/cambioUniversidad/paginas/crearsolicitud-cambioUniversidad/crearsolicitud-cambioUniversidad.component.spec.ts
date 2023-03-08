/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrearsolicitudCambioUniversidadComponent } from './crearsolicitud-cambioUniversidad.component';

describe('CrearsolicitudCambioUniversidadComponent', () => {
  let component: CrearsolicitudCambioUniversidadComponent;
  let fixture: ComponentFixture<CrearsolicitudCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearsolicitudCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsolicitudCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
