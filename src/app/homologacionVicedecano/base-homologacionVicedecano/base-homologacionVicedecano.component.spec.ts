/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseHomologacionVicedecanoComponent } from './base-homologacionVicedecano.component';

describe('BaseHomologacionVicedecanoComponent', () => {
  let component: BaseHomologacionVicedecanoComponent;
  let fixture: ComponentFixture<BaseHomologacionVicedecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseHomologacionVicedecanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseHomologacionVicedecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
