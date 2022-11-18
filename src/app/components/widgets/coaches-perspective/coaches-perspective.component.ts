import { CoachesService } from './coaches.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { app_constant } from 'src/app/shared/app.constant';
import { AppData } from '../key-takeaways/interface/keytakeaway.interface';
import { CochesPerPective } from './interface/coaches.interface';
import { SessionData } from '../rateTheCourse/interface/rate.interface';
@Component({
  selector: 'app-coaches-perspective',
  templateUrl: './coaches-perspective.component.html',
  styleUrls: ['./coaches-perspective.component.scss'],
})
export class CoachesPerspectiveComponent implements OnInit {
  @Input() appData?: AppData;
  Coaches: CochesPerPective[] = [];
  coachPers: any = null;
  modalRef?: BsModalRef;
  componentData: any;
  showLoader: boolean = true;
  widgetTypeName: string = app_constant.Community_Insights;
  defaultInsightQuestion: string = `Pick one at a time and tell us what you love most about an LLC, C
  corp, S corp, Sole Proprietorship or Partnership business
  structure.?`;
  constructor(
    private coachesService: CoachesService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    let session = this.componentData.SessionWidgets.filter(
      (item: SessionData) =>
        item.WidgetTypeName.toLowerCase() === app_constant.Community_Insights
    )[0];
    this.coachesService
      .getCoachData(this.componentData.TrainingFloId, session.WidgetId)
      .subscribe((response: CochesPerPective[]) => {
        this.Coaches = response;
        this.showLoader = false;
      });
  }
  openModal(template: TemplateRef<string>, item?: CochesPerPective) {
    if (item) {
      this.coachPers = item;
    }
    this.modalRef = this.modalService.show(template);
  }
}
