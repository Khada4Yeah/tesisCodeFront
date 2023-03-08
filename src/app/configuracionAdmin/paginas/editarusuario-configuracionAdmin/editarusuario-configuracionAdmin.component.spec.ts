/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarusuarioConfiguracionAdminComponent } from './editarusuario-configuracionAdmin.component';

describe('EditarusuarioConfiguracionAdminComponent', () => {
  let component: EditarusuarioConfiguracionAdminComponent;
  let fixture: ComponentFixture<EditarusuarioConfiguracionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarusuarioConfiguracionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarusuarioConfiguracionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
