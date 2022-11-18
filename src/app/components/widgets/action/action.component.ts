import { ActionTheme, ActionBar } from './interface/card.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ActionService } from './action.service';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() actionBar:ActionBar={
    barColor:'green'
  }
Action:any[]=[];
  constructor(private actionService:ActionService) { }

  ngOnInit():void {
this.actionService.getAction().subscribe((arg:any[])=>{
  this.Action=arg;
})
  }
actionThemeOne:ActionTheme={
  idColor:'#4BC7E7',
  buttonColor:'#255F82',
  completeColor:'green',
  textColor:'white'
}
}
