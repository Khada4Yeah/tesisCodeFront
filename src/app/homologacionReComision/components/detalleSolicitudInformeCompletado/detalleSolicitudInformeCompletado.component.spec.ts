/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetalleSolicitudInformeCompletadoComponent } from './detalleSolicitudInformeCompletado.component';

describe('DetalleSolicitudInformeCompletadoComponent', () => {
  let component: DetalleSolicitudInformeCompletadoComponent;
  let fixture: ComponentFixture<DetalleSolicitudInformeCompletadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudInformeCompletadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolicitudInformeCompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
