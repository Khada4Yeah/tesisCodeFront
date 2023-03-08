/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaSolicitudesCambioUniversidadComponent } from './tablaSolicitudesCambioUniversidad.component';

describe('TablaSolicitudesCambioUniversidadComponent', () => {
  let component: TablaSolicitudesCambioUniversidadComponent;
  let fixture: ComponentFixture<TablaSolicitudesCambioUniversidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesCambioUniversidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudesCambioUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
