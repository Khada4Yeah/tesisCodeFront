/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarsolicitudenviadaCambioCarreraComponent } from './editarsolicitudenviada-cambioCarrera.component';

describe('EditarsolicitudenviadaCambioCarreraComponent', () => {
  let component: EditarsolicitudenviadaCambioCarreraComponent;
  let fixture: ComponentFixture<EditarsolicitudenviadaCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarsolicitudenviadaCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudenviadaCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
