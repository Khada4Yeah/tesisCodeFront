/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsignardocenteanalisisHomologacionCoMateriasComponent } from './asignardocenteanalisis-homologacionCoMaterias.component';

describe('AsignardocenteanalisisHomologacionCoMateriasComponent', () => {
  let component: AsignardocenteanalisisHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<AsignardocenteanalisisHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignardocenteanalisisHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignardocenteanalisisHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
