/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetalleSolicitudesCambioCarreraComponent } from './detalleSolicitudesCambioCarrera.component';

describe('DetalleSolicitudesCambioCarreraComponent', () => {
  let component: DetalleSolicitudesCambioCarreraComponent;
  let fixture: ComponentFixture<DetalleSolicitudesCambioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudesCambioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolicitudesCambioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
