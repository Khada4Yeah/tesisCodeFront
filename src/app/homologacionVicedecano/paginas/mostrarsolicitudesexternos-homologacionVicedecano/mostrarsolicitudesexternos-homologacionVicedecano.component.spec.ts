/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudesexternosHomologacionVicedecanoComponent } from './mostrarsolicitudesexternos-homologacionVicedecano.component';

describe('MostrarsolicitudesexternosHomologacionVicedecanoComponent', () => {
  let component: MostrarsolicitudesexternosHomologacionVicedecanoComponent;
  let fixture: ComponentFixture<MostrarsolicitudesexternosHomologacionVicedecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudesexternosHomologacionVicedecanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudesexternosHomologacionVicedecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
