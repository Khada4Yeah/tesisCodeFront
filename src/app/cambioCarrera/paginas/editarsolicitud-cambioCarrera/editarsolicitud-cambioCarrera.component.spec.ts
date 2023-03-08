/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarsolicitudCambioCarreraComponent } from './editarsolicitud-cambioCarrera.component';

describe('EditarsolicitudCambioCarreraComponent', () => {
  let component: EditarsolicitudCambioCarreraComponent;
  let fixture: ComponentFixture<EditarsolicitudCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarsolicitudCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
