/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseRegistroUsuarioExternoComponent } from './base-registroUsuarioExterno.component';

describe('BaseRegistroUsuarioExternoComponent', () => {
  let component: BaseRegistroUsuarioExternoComponent;
  let fixture: ComponentFixture<BaseRegistroUsuarioExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseRegistroUsuarioExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRegistroUsuarioExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
