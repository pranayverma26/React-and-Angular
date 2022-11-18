import { LearningService } from './learning.service';
import {
  Component,
  OnInit,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';
import { app_constant } from 'src/app/shared/app.constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  AppData,
  KeyTakeAway,
} from '../key-takeaways/interface/keytakeaway.interface';
import { DiscussionData, LearningData } from './interface/Learning.interface';
import { SessionData } from '../rateTheCourse/interface/rate.interface';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss'],
})
export class LearningComponent implements OnInit {
  showData = false;
  @Input() appData!: AppData;
  learningData: any[] = [];
  //respond: any[] = [];
  keyTakeAway: KeyTakeAway[] = [];
  screenSize = window.innerWidth;
  crouselIndex: number = 2;
  response: any = null;
  defaultSelectedTab: number = 1;
  discussionQuestions: DiscussionData[] = [];
  showLoader: boolean = true;
  modalRef?: BsModalRef;
  componentData: any;
  widgetTypeName: string = app_constant.Whats_Happening;
  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    infinite: false,
    nextArrow: `<i class="fa-solid fa-chevron-right crousel-next"></i>`,
    prevArrow: `<i class="fa-solid fa-chevron-left crousel-prev"></i>`,
    variableWidth: true,
  };
  constructor(
    private modalService: BsModalService,
    private learningService: LearningService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    let session = this.componentData.SessionWidgets.filter(
      (item: SessionData) =>
        item.WidgetTypeName.toLowerCase() === app_constant.Whats_Happening
    )[0];

    this.learningService
      .getLearningData(this.componentData.TrainingFloId, session.WidgetId)
      .subscribe((response: LearningData) => {
        response?.KeyTakeaways?.forEach((item: KeyTakeAway) => {
          let keytakeaway: any = {
            ...item,
            id: item.KeyTakeawayId,
            username: item.UserName,
            ProfileImageUrl: item.ImageUrl,
            createddate: item.CreatedDate,
          };
          this.keyTakeAway.push(keytakeaway);
          this.showLoader = false;
        });
        response?.DiscussionQuestions?.forEach((item: DiscussionData) => {
          item.DiscussionQuestionResponses.forEach((element: DiscussionData) => {
            let response: any = {
              ...item,
              id: item.DiscussionQuestionId,
              Questions: item.Question,
              ...element,
            };

            this.discussionQuestions.push(response);
          });
        });
        this.showLoader = false;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.respondToScreenSizeChange(window.innerWidth);
  }

  respondToScreenSizeChange(width: number = 0) {
    this.crouselIndex = 2;
    this.slideConfig = {
      ...this.slideConfig,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
  }
  slickInit(e: any) {
    this.respondToScreenSizeChange();
  }

  breakpoint(e: any) {}

  afterChange(e: any) {}

  beforeChange(e: any) {}

  setTabDefault(tabId: number) {
    this.defaultSelectedTab = tabId;
  }

  openModal(template: TemplateRef<string>, item?: DiscussionData) {
    if (item) {
      this.response = item;
    }
    this.modalRef = this.modalService.show(template);
  }
}
