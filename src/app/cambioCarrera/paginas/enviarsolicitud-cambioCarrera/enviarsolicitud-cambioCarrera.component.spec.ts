/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnviarsolicitudCambioCarreraComponent } from './enviarsolicitud-cambioCarrera.component';

describe('EnviarsolicitudCambioCarreraComponent', () => {
  let component: EnviarsolicitudCambioCarreraComponent;
  let fixture: ComponentFixture<EnviarsolicitudCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarsolicitudCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarsolicitudCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
