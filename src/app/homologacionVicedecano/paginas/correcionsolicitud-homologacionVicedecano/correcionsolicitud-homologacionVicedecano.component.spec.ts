/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CorrecionsolicitudHomologacionVicedecanoComponent } from './correcionsolicitud-homologacionVicedecano.component';

describe('CorrecionsolicitudHomologacionVicedecanoComponent', () => {
  let component: CorrecionsolicitudHomologacionVicedecanoComponent;
  let fixture: ComponentFixture<CorrecionsolicitudHomologacionVicedecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrecionsolicitudHomologacionVicedecanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrecionsolicitudHomologacionVicedecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
