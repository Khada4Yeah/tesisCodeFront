/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent } from './mostrarSolicitudesCambioCarrera-homologacionDoAnalisis.component';

describe('MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent', () => {
  let component: MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent;
  let fixture: ComponentFixture<MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarSolicitudesCambioCarreraHomologacionDoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
