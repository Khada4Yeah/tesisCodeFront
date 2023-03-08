/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostrarsolicitudesCambioCarreraHomologacionReComisionComponent } from './mostrarsolicitudesCambioCarrera-homologacionReComision.component';

describe('MostrarsolicitudesCambioCarreraHomologacionReComisionComponent', () => {
  let component: MostrarsolicitudesCambioCarreraHomologacionReComisionComponent;
  let fixture: ComponentFixture<MostrarsolicitudesCambioCarreraHomologacionReComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarsolicitudesCambioCarreraHomologacionReComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarsolicitudesCambioCarreraHomologacionReComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
