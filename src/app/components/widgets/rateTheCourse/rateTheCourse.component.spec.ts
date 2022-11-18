/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RateTheCourseComponent } from './rateTheCourse.component';

describe('RateTheCourseComponent', () => {
  let component: RateTheCourseComponent;
  let fixture: ComponentFixture<RateTheCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateTheCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTheCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
