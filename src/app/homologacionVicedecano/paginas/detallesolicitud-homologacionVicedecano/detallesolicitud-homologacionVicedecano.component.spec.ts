/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetallesolicitudHomologacionVicedecanoComponent } from './detallesolicitud-homologacionVicedecano.component';

describe('DetallesolicitudHomologacionVicedecanoComponent', () => {
  let component: DetallesolicitudHomologacionVicedecanoComponent;
  let fixture: ComponentFixture<DetallesolicitudHomologacionVicedecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesolicitudHomologacionVicedecanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesolicitudHomologacionVicedecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
