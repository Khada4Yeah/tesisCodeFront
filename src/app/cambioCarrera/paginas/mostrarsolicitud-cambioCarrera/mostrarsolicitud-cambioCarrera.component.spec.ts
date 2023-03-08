/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudCambioCarreraComponent } from './mostrarsolicitud-cambioCarrera.component';

describe('MostrarsolicitudCambioCarreraComponent', () => {
  let component: MostrarsolicitudCambioCarreraComponent;
  let fixture: ComponentFixture<MostrarsolicitudCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
