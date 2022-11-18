/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoreCurriculumComponent } from './core-curriculum.component';

describe('CoreCurriculumComponent', () => {
  let component: CoreCurriculumComponent;
  let fixture: ComponentFixture<CoreCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
