/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent } from './crearAnalisisDocenteCambioCarrera-homologacionDoAnanlisis.component';

describe('CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent', () => {
  let component: CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent;
  let fixture: ComponentFixture<CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnalisisDocenteCambioCarreraHomologacionDoAnanlisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
