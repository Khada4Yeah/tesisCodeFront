/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetallesolicitudescambiocarreraHomologacionCoMateriasComponent } from './detallesolicitudescambiocarrera-homologacionCoMaterias.component';

describe('DetallesolicitudescambiocarreraHomologacionCoMateriasComponent', () => {
  let component: DetallesolicitudescambiocarreraHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<DetallesolicitudescambiocarreraHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesolicitudescambiocarreraHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesolicitudescambiocarreraHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
