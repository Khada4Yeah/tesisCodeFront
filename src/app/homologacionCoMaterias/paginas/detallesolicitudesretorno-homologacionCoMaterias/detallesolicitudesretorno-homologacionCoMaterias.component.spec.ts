/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetallesolicitudesretornoHomologacionCoMateriasComponent } from './detallesolicitudesretorno-homologacionCoMaterias.component';

describe('DetallesolicitudesretornoHomologacionCoMateriasComponent', () => {
  let component: DetallesolicitudesretornoHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<DetallesolicitudesretornoHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesolicitudesretornoHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesolicitudesretornoHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
