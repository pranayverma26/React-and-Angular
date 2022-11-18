import { RespondTheme } from './interface/respond.interface';
import { Component, OnInit, Input, DebugElement } from '@angular/core';


@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss'],
})
export class RespondComponent implements OnInit {
  @Input() Action: any;
  @Input() Key: any;
  @Input() Learning: any;
  @Input() respondTheme: RespondTheme = {
    imgColor: 'blue',
  };
  @Input() ImagesList: any[] = [];

  constructor() {}

  ngOnInit() {}
}
