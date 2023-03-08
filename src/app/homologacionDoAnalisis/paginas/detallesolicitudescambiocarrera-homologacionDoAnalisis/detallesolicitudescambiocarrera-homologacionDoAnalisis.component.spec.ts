/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent } from './detallesolicitudescambiocarrera-homologacionDoAnalisis.component';

describe('DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent', () => {
  let component: DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent;
  let fixture: ComponentFixture<DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesolicitudescambiocarreraHomologacionDoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
