/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoachesPerspectiveComponent } from './coaches-perspective.component';

describe('CoachesPerspectiveComponent', () => {
  let component: CoachesPerspectiveComponent;
  let fixture: ComponentFixture<CoachesPerspectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachesPerspectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesPerspectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
