/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudescambiouniversidadHomologacionReComisionComponent } from './mostrarsolicitudescambiouniversidad-homologacionReComision.component';

describe('MostrarsolicitudescambiouniversidadHomologacionReComisionComponent', () => {
  let component: MostrarsolicitudescambiouniversidadHomologacionReComisionComponent;
  let fixture: ComponentFixture<MostrarsolicitudescambiouniversidadHomologacionReComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudescambiouniversidadHomologacionReComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudescambiouniversidadHomologacionReComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
