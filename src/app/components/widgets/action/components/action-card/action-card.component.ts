import { ActionTheme } from './../../interface/card.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {
@Input() actionList:any
@Input() actionTheme: ActionTheme = {
  idColor:'green',
  buttonColor:'green',
  completeColor:'green',
  textColor:'green'
}
  constructor() { }

  ngOnInit() {
  }

}
