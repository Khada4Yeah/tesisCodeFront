/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetallesolicitudcambiocarreraHomologacionReComisionComponent } from './detallesolicitudcambiocarrera-homologacionReComision.component';

describe('DetallesolicitudcambiocarreraHomologacionReComisionComponent', () => {
  let component: DetallesolicitudcambiocarreraHomologacionReComisionComponent;
  let fixture: ComponentFixture<DetallesolicitudcambiocarreraHomologacionReComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesolicitudcambiocarreraHomologacionReComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesolicitudcambiocarreraHomologacionReComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
