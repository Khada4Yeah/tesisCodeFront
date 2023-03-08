/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseHomologacionCoMateriasComponent } from './base-homologacionCoMaterias.component';

describe('BaseHomologacionCoMateriasComponent', () => {
  let component: BaseHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<BaseHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
