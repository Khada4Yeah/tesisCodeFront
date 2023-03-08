/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetallesolicitudinformecompletadoHomologacionReComisionComponent } from './detallesolicitudinformecompletado-homologacionReComision.component';

describe('DetallesolicitudinformecompletadoHomologacionReComisionComponent', () => {
  let component: DetallesolicitudinformecompletadoHomologacionReComisionComponent;
  let fixture: ComponentFixture<DetallesolicitudinformecompletadoHomologacionReComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesolicitudinformecompletadoHomologacionReComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesolicitudinformecompletadoHomologacionReComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
