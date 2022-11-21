import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactComponent from 'src/app/ReactComponent/reactComponent';

@Component({
  selector: 'app-meet-up',
  templateUrl: './meet-up.component.html',
  styleUrls: ['./meet-up.component.css'],
})
export class MeetUpComponent implements AfterViewInit {
  @ViewChild('reactComponentPlaceHolder')
  reactComponentPlaceHolder!: ElementRef;
  props = { role: 'host', room: '635fdee94208780bf66732ae' };
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    ReactDOM.render(
      React.createElement(ReactComponent, this.props),
      this.reactComponentPlaceHolder.nativeElement
    );
  }
}
