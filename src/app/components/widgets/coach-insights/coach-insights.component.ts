import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-insights',
  templateUrl: './coach-insights.component.html',
  styleUrls: ['./coach-insights.component.scss']
})
export class CoachInsightsComponent implements OnInit {

  showRating: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  hundred(){
    this.showRating = false;
  }

}
