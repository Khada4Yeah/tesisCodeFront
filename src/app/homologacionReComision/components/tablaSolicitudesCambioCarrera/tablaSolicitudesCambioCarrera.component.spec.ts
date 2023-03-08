/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaSolicitudesCambioCarreraComponent } from './tablaSolicitudesCambioCarrera.component';

describe('TablaSolicitudesCambioCarreraComponent', () => {
  let component: TablaSolicitudesCambioCarreraComponent;
  let fixture: ComponentFixture<TablaSolicitudesCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudesCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
