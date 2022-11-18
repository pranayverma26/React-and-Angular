import { app_constant } from './../../../shared/app.constant';
import { Component, Input, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DiscussionService } from './discussion.service';
import { AppData } from '../key-takeaways/interface/keytakeaway.interface';
import { DiscussionData } from '../learning/interface/Learning.interface';
import { DiscussionQues } from './interface/discussion.interface';
@Component({
  selector: 'app-discussion-question',
  templateUrl: 'discussion.question.component.html',
  styleUrls: ['discussion.question.component.scss'],
})
export class DiscussionQuestionComponent implements OnInit {
  [x: string]: any;
  @Input() appData!: AppData;
  response: any[] = [];
  currentDate = new Date();
  discussionQuestions!: DiscussionQues[];
  show = false;
  submit = false;
  hide = true;
  discussion: string = '';
  updatedId!: number;
  isselected!: boolean;
  box1: any;
  // showcontent: any;
  modalRef?: BsModalRef;
  questionResponse: DiscussionQues[] = [];
  componentData: any;
  isAlreadyResponded: boolean = false;
  showLoader: boolean = true;
  widgetTypeName: string = app_constant.Discussion_Question;
  deletedItem: any = null;
  constructor(
    private modalService: BsModalService,
    private discussionService: DiscussionService
  ) {}

  getValue(val: DiscussionQues) {
    this.response.push({ id: this.response.length, comment: val });
  }

  openModal(template: TemplateRef<string>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.componentData = this.appData;
    this.getDiscussionData();
  }

  getDiscussionData() {
    this.showLoader = true;
    this.discussionService
      .getQuestions(this.componentData.TrainingFloId)
      .subscribe((response: DiscussionQues[]) => {
        response.forEach((element: DiscussionQues) => {
          let objResponse = element.response.filter((quesRes: any) => {
            return quesRes.UserId === this.componentData.UserId;
          });
          if (objResponse.length > 0) {
            element.isResponded = true;
          }
        });
        this.discussionQuestions = response;
        this.showLoader = false;
      });
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    nextArrow: `<i class="fa-solid fa-chevron-right crousel-next"></i>`,
    prevArrow: `<i class="fa-solid fa-chevron-left crousel-prev"></i>`,
  };

  slickInit(e: any) {}

  breakpoint(e: any) {}

  afterChange(e: any) {}

  beforeChange(e: any) {}

  edit(val: any) {
    this.response[this.updatedId].comment = this.box1.val;
  }

  DiscussionQuestionSave(item: any, value: any, template: TemplateRef<any>) {
    if (!value) {
      return;
    }
    var data = {
      discussionQuestionId: item.DiscussionQuestionId,
      response: value,
      userId: this.componentData.UserId,
      trainingFloId: this.componentData.TrainingFloId,
    };
    this.discussionService.saveDQResponse(data).subscribe((arg: DiscussionQues) => {
      this.getDiscussionData();
      this.openModal(template);
      this.discussion = '';
    });
  }

  onEdit(questionIdIndex: number, questionResponse: DiscussionQues, showEdit: boolean) {
    let dq: any = this.discussionQuestions[questionIdIndex];
    dq.response.forEach((element: any) => {
      if (
        element.DiscussionQuestionResponseId ===
        questionResponse.DiscussionQuestionResponseId
      ) {
        element['showEdit'] = showEdit;
      }
    });
  }
  onSave(questionIdIndex: number, questionResponse: DiscussionQues, response: string) {
    if (!response) return;
    let dq: any = this.discussionQuestions[questionIdIndex];
    var data = {
      DiscussionQuestionId: dq.DiscussionQuestionId,
      Response: response,
      UserId: this.componentData.UserId,
      TrainingFloId: this.componentData.TrainingFloId,
      DiscussionQuestionResponseId:
        questionResponse.DiscussionQuestionResponseId,
    };
    this.discussionService.saveDQResponse(data).subscribe((arg: DiscussionQues) => {
      dq.response.forEach((element: any) => {
        if (
          element.DiscussionQuestionResponseId ===
          questionResponse.DiscussionQuestionResponseId
        ) {
          element['showEdit'] = false;
          element.Response = response;
        }
      });
    });
  }

  openDeleteModal(
    template: TemplateRef<string>,
    questionIdIndex: number,
    questionResponse: DiscussionQues
  ) {
    this.modalRef = this.modalService.show(template);
    this.deletedItem = {
      questionIdIndex: questionIdIndex,
      questionResponse: questionResponse,
    };
  }

  DeleteComment() {
    let dq: any = this.discussionQuestions[this.deletedItem.questionIdIndex];
    var data = {
      DiscussionQuestionId: dq.DiscussionQuestionId,
      UserId: this.componentData.UserId,
      TrainingFloId: this.componentData.TrainingFloId,
      DiscussionQuestionResponseId:
        this.deletedItem.questionResponse.DiscussionQuestionResponseId,
    };
    this.discussionService.deleteDQResponse(data).subscribe((arg: DiscussionQues) => {
      this.modalRef?.hide();
      this.getDiscussionData();
      this.deletedItem = null;
    });
  }
}
