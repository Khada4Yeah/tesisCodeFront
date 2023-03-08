/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaEstudiantesExternosComponent } from './tablaEstudiantesExternos.component';

describe('TablaEstudiantesExternosComponent', () => {
  let component: TablaEstudiantesExternosComponent;
  let fixture: ComponentFixture<TablaEstudiantesExternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaEstudiantesExternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEstudiantesExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
