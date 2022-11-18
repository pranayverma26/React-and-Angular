import { AppData } from './../key-takeaways/interface/keytakeaway.interface';
import { FeedbackService } from './feedback.service';
import { Component, Input, OnInit, TemplateRef,Renderer2,ElementRef,ViewChild  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { app_constant } from 'src/app/shared/app.constant';
import { Feedback } from './interface/feedback.interface';
import { SessionData } from '../rateTheCourse/interface/rate.interface';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  @Input() feedBackData: boolean = false;
  @Input() appData!: AppData;
  @Input() widgetTypeName: string = 'DiscussionQuestion';
  @Input() itemId: number = 0;
  @Input() showComments: boolean = false;
  @Input() inputWidgetId: number = 0;

  modalRef?: BsModalRef;
  showRating: boolean = true;
  showWidget: boolean = false;
  rate: number = 0;
  comment: string = '';
  showError: boolean = false;
  error: string = 'Please provide the comments.';
  componentData: any;
  widgetId: number = 0;
  widgetTypeId: number = 0;
  feedbackDetail: any;
  isFeedbackProvided: boolean = false;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  constructor(
    private feedbackService: FeedbackService,
    private modalService: BsModalService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
         this.showWidget=false;

     }
 });
  }

  ngOnInit() {
    this.componentData = this.appData;
    let session: SessionData[] = this.componentData.SessionWidgets.filter(
      (item: any) =>
        item.WidgetTypeName.toLowerCase() === this.widgetTypeName.toLowerCase()
    );
    if (session.length > 0) {
      this.widgetTypeId = session[0].WidgetTypeId;
      this.widgetId =
        this.inputWidgetId > 0 ? this.inputWidgetId : session[0].WidgetId;
    }
    this.getFeedBackCount();
  }

  rating(rating: any) {
    this.showRating = false;
    this.rate = rating;
  }

  backRating() {
    this.showRating = true;
  }

  showFeedBackWidget() {
    this.showWidget = !this.showWidget;
  }

  getFeedBackCount() {
    let feedBackModel = {
      WidgetId: this.widgetId,
      WidgetTypeId: this.widgetTypeId,
      ItemId: this.itemId,
      UserId: this.componentData.UserId,
      TrainingFloId: this.componentData.TrainingFloId,
      CourseId: 0,
      IsOnlyEngagement: false,
    };
    this.feedbackService
      .getFeedBackCount(feedBackModel)
      .subscribe((arg: any) => {
        this.feedbackDetail = arg;
        let userFeedback = arg.FeedbackDetails.filter((item: any) => {
          return item.UserId === this.componentData.UserId;
        });
        this.isFeedbackProvided = userFeedback.length > 0;
      });
  }

  saveFeedBack() {
    if (
      (this.rate === 10 || this.rate === 8 || this.rate === 9) &&
      this.comment == ''
    ) {
      this.showError = true;
      return;
    }
    this.showError = false;

    let feedBackModel = {
      UserId: this.componentData.UserId,
      WidgetId: this.widgetId,
      WidgetIdTypeId: this.widgetTypeId,
      ItemId: this.itemId,
      IsAck: this.rate < 8 ? true : false,
      Comment: this.comment,
      FeedbackEmojiId: this.rate,
      EmojitypeId: this.rate,
    };

    this.feedbackService.saveFeedbacks(feedBackModel).subscribe((arg: any) => {
      this.showRating = false;
      this.showWidget = false;
      this.comment = '';
      this.rate = 0;
      this.showError = false;
      this.getFeedBackCount();
    });
  }

  getFeedBackDetail() {
    this.feedbackDetail = null;
    this.getFeedBackCount();
  }

  openModal(template: TemplateRef<string>) {
    this.modalRef = this.modalService.show(template);
  }

}
