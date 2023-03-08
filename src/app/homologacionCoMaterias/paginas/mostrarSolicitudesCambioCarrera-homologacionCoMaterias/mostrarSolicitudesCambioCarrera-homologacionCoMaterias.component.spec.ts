/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent } from './mostrarSolicitudesCambioCarrera-homologacionCoMaterias.component';

describe('MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent', () => {
  let component: MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarSolicitudesCambioCarreraHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
