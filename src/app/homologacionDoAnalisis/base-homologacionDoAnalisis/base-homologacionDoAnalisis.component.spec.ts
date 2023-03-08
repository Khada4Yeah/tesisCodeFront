/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseHomologacionDoAnalisisComponent } from './base-homologacionDoAnalisis.component';

describe('BaseHomologacionDoAnalisisComponent', () => {
  let component: BaseHomologacionDoAnalisisComponent;
  let fixture: ComponentFixture<BaseHomologacionDoAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseHomologacionDoAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseHomologacionDoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
