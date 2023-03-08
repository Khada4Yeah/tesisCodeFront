/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudesHomologacionVicedecanoComponent } from './mostrarsolicitudes-homologacionVicedecano.component';

describe('MostrarsolicitudesHomologacionVicedecanoComponent', () => {
  let component: MostrarsolicitudesHomologacionVicedecanoComponent;
  let fixture: ComponentFixture<MostrarsolicitudesHomologacionVicedecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudesHomologacionVicedecanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudesHomologacionVicedecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
