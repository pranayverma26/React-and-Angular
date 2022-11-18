/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrainingMaterialComponent } from './training-material.component';

describe('TrainingMaterialComponent', () => {
  let component: TrainingMaterialComponent;
  let fixture: ComponentFixture<TrainingMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
