/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditardatosestudianteCambioUniversidadComponent } from './editardatosestudiante-cambioUniversidad.component';

describe('EditardatosestudianteCambioUniversidadComponent', () => {
  let component: EditardatosestudianteCambioUniversidadComponent;
  let fixture: ComponentFixture<EditardatosestudianteCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditardatosestudianteCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardatosestudianteCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
