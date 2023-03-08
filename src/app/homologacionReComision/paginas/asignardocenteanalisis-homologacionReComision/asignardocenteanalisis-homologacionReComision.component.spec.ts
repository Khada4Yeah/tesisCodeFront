/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsignardocenteanalisisHomologacionReComisionComponent } from './asignardocenteanalisis-homologacionReComision.component';

describe('AsignardocenteanalisisHomologacionReComisionComponent', () => {
  let component: AsignardocenteanalisisHomologacionReComisionComponent;
  let fixture: ComponentFixture<AsignardocenteanalisisHomologacionReComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignardocenteanalisisHomologacionReComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignardocenteanalisisHomologacionReComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
