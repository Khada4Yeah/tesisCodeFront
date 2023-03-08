/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaSolicitudesExternosComponent } from './tablaSolicitudesExternos.component';

describe('TablaSolicitudesExternosComponent', () => {
  let component: TablaSolicitudesExternosComponent;
  let fixture: ComponentFixture<TablaSolicitudesExternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesExternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudesExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
