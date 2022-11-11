import { AfterViewInit, ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import ReactComponent from './ReactComponent/reactComponent';
import { createRoot } from 'react-dom/client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('reactComponentPlaceHolder')
  reactComponentPlaceHolder!: ElementRef;
  title = 'my-angular-app';

  ngAfterViewInit() {
    ReactDOM.render(
      React.createElement(ReactComponent),
      this.reactComponentPlaceHolder.nativeElement
    );
  }
}