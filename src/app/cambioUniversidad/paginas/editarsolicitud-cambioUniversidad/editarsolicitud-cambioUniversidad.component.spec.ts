/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarsolicitudCambioUniversidadComponent } from './editarsolicitud-cambioUniversidad.component';

describe('EditarsolicitudCambioUniversidadComponent', () => {
  let component: EditarsolicitudCambioUniversidadComponent;
  let fixture: ComponentFixture<EditarsolicitudCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarsolicitudCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
