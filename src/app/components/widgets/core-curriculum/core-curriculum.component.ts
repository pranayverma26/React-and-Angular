
import { app_constant } from './../../../shared/app.constant';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AppData, KeyTheme } from '../key-takeaways/interface/keytakeaway.interface';
import { CoreCariculamService } from './coreCariculam.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CoreData } from './interface/core.interface';
import { SessionData } from '../rateTheCourse/interface/rate.interface';

@Component({
  selector: 'app-core-curriculum',
  templateUrl: './core-curriculum.component.html',
  styleUrls: ['./core-curriculum.component.scss'],
})
export class CoreCurriculumComponent implements OnInit {
  modalRef?: BsModalRef;
  @Input() appData!: AppData;
  currentActive: string = 'active';
  blank: string = '';
  currentSelected: number = 0;
  courseRating!: CoreData;
  keyThemeOne: KeyTheme = {
    CountColor: 'light-blue',
    AddButton: '#255F82',
  };
  topics: CoreData[] = [];
  componentData: any;
  comment: string = '';
  session: SessionData[] = [];
  courseId: number = 0;
  // courseRatingResponses: any = [];
  defaultSelectedTab: number = 1;
  bio!: CoreData;
  showLoader: boolean = false;
  constructor(
    private coreCariCulamService: CoreCariculamService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    this.session = this.componentData.SessionWidgets.filter((item:SessionData) => {
      return (
        item.WidgetTypeName.toLowerCase() ===
        app_constant.Community_Insights.toLowerCase()
      );
    });
    this.getTopic();
  }

  getTopic() {
    this.coreCariCulamService
      .getTopics(this.componentData.TrainingFloId, this.session[0].WidgetId)
      .subscribe((arg: any) => {
        this.topics = arg;
      });
  }

  refreshTopicData() {

   return this.getTopic();
  }

  setDefaultTab(tabId: number) {

    this.defaultSelectedTab = tabId;
  }

  openModal(template: TemplateRef<any>, bio: CoreData) {
    this.modalRef = this.modalService.show(template);
    this.bio = bio;
  }
}
