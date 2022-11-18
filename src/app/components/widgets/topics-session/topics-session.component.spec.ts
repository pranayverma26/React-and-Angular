/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicsSessionComponent } from './topics-session.component';

describe('TopicsSessionComponent', () => {
  let component: TopicsSessionComponent;
  let fixture: ComponentFixture<TopicsSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
