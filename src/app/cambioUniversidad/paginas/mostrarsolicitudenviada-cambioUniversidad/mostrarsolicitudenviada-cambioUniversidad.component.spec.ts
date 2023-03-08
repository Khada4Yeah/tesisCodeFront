/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudenviadaCambioUniversidadComponent } from './mostrarsolicitudenviada-cambioUniversidad.component';

describe('MostrarsolicitudenviadaCambioUniversidadComponent', () => {
  let component: MostrarsolicitudenviadaCambioUniversidadComponent;
  let fixture: ComponentFixture<MostrarsolicitudenviadaCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudenviadaCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudenviadaCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
