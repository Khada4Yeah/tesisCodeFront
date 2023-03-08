/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarHomologacionCoMateriasComponent } from './navbarHomologacionCoMaterias.component';

describe('NavbarHomologacionCoMateriasComponent', () => {
  let component: NavbarHomologacionCoMateriasComponent;
  let fixture: ComponentFixture<NavbarHomologacionCoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHomologacionCoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHomologacionCoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
