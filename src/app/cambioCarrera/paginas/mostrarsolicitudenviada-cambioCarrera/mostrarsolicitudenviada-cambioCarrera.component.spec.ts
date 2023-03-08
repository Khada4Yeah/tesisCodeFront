/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudenviadaCambioCarreraComponent } from './mostrarsolicitudenviada-cambioCarrera.component';

describe('MostrarsolicitudenviadaCambioCarreraComponent', () => {
  let component: MostrarsolicitudenviadaCambioCarreraComponent;
  let fixture: ComponentFixture<MostrarsolicitudenviadaCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudenviadaCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudenviadaCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
