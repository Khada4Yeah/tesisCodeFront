/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarHomologacionVicedecanoComponent } from './navbarHomologacionVicedecano.component';

describe('NavbarHomologacionVicedecanoComponent', () => {
  let component: NavbarHomologacionVicedecanoComponent;
  let fixture: ComponentFixture<NavbarHomologacionVicedecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHomologacionVicedecanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHomologacionVicedecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
