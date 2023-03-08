/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarsolicitudenviadaCambioUniversidadComponent } from './editarsolicitudenviada-cambioUniversidad.component';

describe('EditarsolicitudenviadaCambioUniversidadComponent', () => {
  let component: EditarsolicitudenviadaCambioUniversidadComponent;
  let fixture: ComponentFixture<EditarsolicitudenviadaCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarsolicitudenviadaCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudenviadaCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
