/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrearsolicitudCambioCarreraComponent } from './crearsolicitud-cambioCarrera.component';

describe('CrearsolicitudCambioCarreraComponent', () => {
  let component: CrearsolicitudCambioCarreraComponent;
  let fixture: ComponentFixture<CrearsolicitudCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearsolicitudCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsolicitudCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
