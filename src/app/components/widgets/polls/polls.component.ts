import { AppData } from './../key-takeaways/interface/keytakeaway.interface';
import { IComponentData } from './../../../shared/common.interface';
import { IPollTheme, IPollWidget, PollData, PollResponse } from './interface/poll.interface';
import { PollsService } from './polls.service';
import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  HostListener,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { isNgTemplate } from '@angular/compiler';
import { RespondTheme } from '../respond/interface/respond.interface';
// import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-polls',
  templateUrl: 'polls.component.html',
  styleUrls: ['polls.component.scss'],
})
export class PollsComponent implements OnInit {
  @Input() pollType!: PollData;
  @Input() pollButton = '';
  @Input() respondColor = '';
  @Input() appData!: AppData;
  @Input() widgetId = '';
  @Input() pollWidgetDetail: IPollWidget = {
    widgetId: 0,
    flowId: 0,
    clientId: 0,
  };
  @Input() theme: IPollTheme = {
    barColor: 'green',
    submitButtonColor: 'green',
  };

  @Input()
  get showPostCommunityRelatedSection(): boolean {
    return this._showPostCommunityRelatedSection;
  }
  set showPostCommunityRelatedSection(value: boolean) {
    this._showPostCommunityRelatedSection = value;
    this.getPollResponse();
  }
  private _showPostCommunityRelatedSection: boolean = true;

  respondThemeOne: RespondTheme = {
    imgColor: 'green',
  };

  pollQuestion: PollData[] = [];
  isPollSubmitted: boolean = false;
  pollOptions: PollData[]=[];
  isResponseValid: boolean = true;
  questionClass: string = 'carousel-item';
  activeQuestionClass: string = 'carousel-item active';
  carouselId: string = '';
  carouselTargetId = '';
  disablePoll: boolean = false;
  selectedPollId: any = 0;
  modalRef?: BsModalRef;
  defaultPollId: number = 0;
  title: any = '';
  type: any = 'PieChart';
  chartData: any = [];
  modelTitle: string = '';
  componentData: any;
  pollResponse: PollResponse[] = [];
  session: any;
  showLoader: boolean = true;
  chartWidth: number = 400;
  constructor(
    private pollService: PollsService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.carouselId = this.widgetId;
    this.carouselTargetId = `#${this.carouselId}`;
    this.componentData = this.appData;
    this.session = this.componentData.SessionWidgets.filter((item: any) => {
      return item.WidgetTypeName.toLowerCase() === 'Poll'.toLowerCase();
    });
    this.getPollResponse();
  }

  getPollResponse() {
    try {
      this.pollService
        .getPolls(this.componentData.TrainingFloId, this.session[0].WidgetId)
        .subscribe((response: any[]) => {
          let preCommunityPoll = response.filter((item: any) => {
            return item.IsPreCommunityPoll == 1;
          });
          let postCommunityPoll = response.filter((item: any) => {
            return item.IsPreCommunityPoll == 0;
          });
          if (this.showPostCommunityRelatedSection) {
            this.pollOptions = preCommunityPoll;
          } else {
            this.pollOptions =
              postCommunityPoll.length > 0
                ? postCommunityPoll
                : preCommunityPoll;
          }
          this.formatPollResponse();
        });
    } catch (error) {}
  }

  formatPollResponse() {
    this.chartData = [];
    this.pollService
      .getPollsResponse(
        this.componentData.TrainingFloId,
        this.session[0].WidgetId
      )
      .subscribe((response: any) => {
        this.pollResponse = response.PollsResponses;
        let pollData: any = this.pollResponse.filter((item: any) => {
          return item.UserId === this.appData.UserId;
        });
        if (pollData.length > 0) {
          this.pollOptions.forEach((element: any) => {
            pollData.forEach((poll: any) => {
              if (
                element.PollId === poll.PollId &&
                this.appData.UserId === poll.UserId
              ) {
                element.disabled = true;
                element.selectedPollId = poll.PollOptionId;
              }
            });
          });
        }
        this.pollOptions.forEach((question: any) => {
          //this.title = question.Question;
          this.modelTitle = question.Question;
          question.PollOptions.forEach((element: any) => {
            let item = element.PollOptionId;
            let optionVoted = this.pollResponse.filter((poll: any) => {
              return poll.PollOptionId === item;
            });
            let data: any = [element.OptionText, optionVoted.length];
            this.chartData.push(data);
          });
        });
        this.showLoader = false;
      });
  }

  public onSubmit(item: any, template: TemplateRef<any>) {
    let pollata = {
      pollId: item.PollId,
      pollOptionId: item.selectedPollId, // this.selectedPollId,
      widgetId: this.session[0].WidgetId,
      pageId: 104,
      trainingFloId: this.appData.TrainingFloId,
      userId: this.appData.UserId,
      courseId: this.appData.CourseId,
      isMultiPoll: false,
    };

    this.pollService.savePolls(pollata).subscribe((arg: any) => {
      this.formatPollResponse();
      this.openModal(template);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    if (window.innerWidth < 400) {
      this.chartWidth = 300;
    } else {
      this.chartWidth = 400;
    }
  }
}
