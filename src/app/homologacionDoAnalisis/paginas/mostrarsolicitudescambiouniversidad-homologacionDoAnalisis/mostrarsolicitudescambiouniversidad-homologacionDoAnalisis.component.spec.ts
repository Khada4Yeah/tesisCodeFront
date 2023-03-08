/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent } from './mostrarsolicitudescambiouniversidad-homologacionDoAnalisis.component';

describe('MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent', () => {
  let component: MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent;
  let fixture: ComponentFixture<MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudescambiouniversidadHomologacionDoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
