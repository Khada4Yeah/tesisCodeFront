/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarHomologacionDoAnalisisComponent } from './navbarHomologacionDoAnalisis.component';

describe('NavbarHomologacionDoAnalisisComponent', () => {
  let component: NavbarHomologacionDoAnalisisComponent;
  let fixture: ComponentFixture<NavbarHomologacionDoAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHomologacionDoAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHomologacionDoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
