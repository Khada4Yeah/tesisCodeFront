/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent } from './mostrarsolicitudescambiouniversidad-homologacionCoMaterias.component';

describe('MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent', () => {
  let component: MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudescambiouniversidadHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
