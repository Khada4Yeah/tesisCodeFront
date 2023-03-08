/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaSolicitudesEnviadasComponent } from './tablaSolicitudesEnviadas.component';

describe('TablaSolicitudesEnviadasComponent', () => {
  let component: TablaSolicitudesEnviadasComponent;
  let fixture: ComponentFixture<TablaSolicitudesEnviadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesEnviadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudesEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
