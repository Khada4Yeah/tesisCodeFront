/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarHomologacionReComisionComponent } from './navbarHomologacionReComision.component';

describe('NavbarHomologacionReComisionComponent', () => {
  let component: NavbarHomologacionReComisionComponent;
  let fixture: ComponentFixture<NavbarHomologacionReComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHomologacionReComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHomologacionReComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
