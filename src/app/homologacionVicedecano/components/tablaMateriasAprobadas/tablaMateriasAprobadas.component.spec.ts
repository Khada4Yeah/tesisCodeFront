/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaMateriasAprobadasComponent } from './tablaMateriasAprobadas.component';

describe('TablaMateriasAprobadasComponent', () => {
  let component: TablaMateriasAprobadasComponent;
  let fixture: ComponentFixture<TablaMateriasAprobadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaMateriasAprobadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMateriasAprobadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
