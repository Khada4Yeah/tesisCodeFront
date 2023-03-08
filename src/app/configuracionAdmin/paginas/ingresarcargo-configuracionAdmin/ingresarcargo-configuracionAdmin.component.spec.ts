/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IngresarcargoConfiguracionAdminComponent } from './ingresarcargo-configuracionAdmin.component';

describe('IngresarcargoConfiguracionAdminComponent', () => {
  let component: IngresarcargoConfiguracionAdminComponent;
  let fixture: ComponentFixture<IngresarcargoConfiguracionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarcargoConfiguracionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarcargoConfiguracionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
