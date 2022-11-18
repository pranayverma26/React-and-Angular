/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardComponent } from './Card.component';
import { jsDocComment } from '@angular/compiler';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// var a;

// function show_hide()
// {
//   if(a==1)
//   {
//     document.getElementById("custom-show").style.display="inline";
//     return a=0;
//   }
//     else
//     {
//       document.getElementById("custom-show").style.display="none";
//       return a=1;
//     }
// }