/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarSolicitudEnviadaComponent } from './editarSolicitudEnviada.component';

describe('EditarSolicitudEnviadaComponent', () => {
  let component: EditarSolicitudEnviadaComponent;
  let fixture: ComponentFixture<EditarSolicitudEnviadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSolicitudEnviadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudEnviadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
