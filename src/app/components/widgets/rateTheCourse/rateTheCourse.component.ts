import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { app_constant } from 'src/app/shared/app.constant';
import { CoreCariculamService } from '../core-curriculum/coreCariculam.service';
import { AppData } from '../key-takeaways/interface/keytakeaway.interface';
import { SessionData, CourseResponse } from './interface/rate.interface';

@Component({
  selector: 'app-rateTheCourse',
  templateUrl: './rateTheCourse.component.html',
  styleUrls: ['./rateTheCourse.component.scss'],
})
export class RateTheCourseComponent implements OnInit {
  @Input() appData!: AppData;
  @Input() courseId: number = 0;
  @Input() topicIndex = 0;
  @Output()
  refreshData: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  defaultTab: EventEmitter<number> = new EventEmitter<number>();
  currentActive: string = 'active';
  blank: string = '';
  currentSelected: number = 0;
  courseRating!: SessionData;

  // topics: any = [];
  componentData: any;
  comment: string = '';
  session: SessionData[] = [];
  courseRatingResponses: CourseResponse[] = [];
  commentCount: number = 0;
  isUserProvidedRating: boolean = false;
  showEditBox: boolean = false;
  editedComment: string = '';
  showEditBtn: boolean = true;
  changedMyViewCount: number = 0;
  impactFulCount: number = 0;
  learnedSomeCount: number = 0;
  madeMeConsiderCount: number = 0;
  expectedMoreCount: number = 0;
  notWhatIExpectedCount: number = 0;
  modalRef?: BsModalRef;
  deletedItem: any;
  widgetTypeName: string = app_constant.Course_Rating;
  constructor(
    private coreCariculamService: CoreCariculamService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    this.session = this.componentData.SessionWidgets.filter((item: any) => {
      return (
        item.WidgetTypeName.toLowerCase() ===
        app_constant.Community_Insights.toLowerCase()
      );
    });
    this.getRating();
  }

  setRating(currentIndex: number) {
    if (this.isUserProvidedRating) return;
    this.currentSelected = currentIndex;
  }

  getRating() {
    this.coreCariculamService
      .getCourseRating(
        this.componentData.TrainingFloId,
        this.session[0].WidgetId
      )
      .subscribe((arg: any) => {
        this.courseRating = arg[this.topicIndex];

        this.courseRatingResponses = this.courseRating.CourseRatingResponses;
        this.courseRatingResponses.forEach((element: any) => {
          if (element.UserId === this.componentData.UserId) {
            element['allowEdit'] = true;
            element['WidgetId'] = this.courseRating.WidgetId;
            this.isUserProvidedRating = true;
          }
          this.setRatingCount(element);
        });

        this.commentCount = this.courseRatingResponses.length;
      });
  }

  saveCourseRating() {
    let data = {
      courseRatingResponseId: 0,
      courseRatingId: this.courseRating.CourseRatingId,
      userId: this.componentData.UserId,
      courseRatingTypeOptionId: this.currentSelected,
      comment: this.comment,
    };
    this.coreCariculamService.saveTopicRatings(data).subscribe((arg: any) => {
      this.courseRating = arg;
      this.refreshData.emit(true);
      //this.defaultTab.emit(2);
    });
  }

  editFedBackComment(item: any) {
    this.courseRatingResponses.forEach((element: any) => {
      if (element.CourseRatingResponseId === item.CourseRatingResponseId) {
        element['showEditBox'] = true;
      }
    });
    this.editedComment = item.Comment;
  }

  cancelEdit() {
    this.courseRatingResponses.forEach((element: any) => {
      element['showEditBox'] = false;
    });
  }

  saveEdit(item: any) {
    let data = {
      courseRatingResponseId: item.CourseRatingResponseId,
      courseRatingId: item.CourseRatingId,
      userId: this.componentData.UserId,
      courseRatingTypeOptionId: item.CourseRatingTypeOptionId,
      comment: this.editedComment,
    };
    this.courseRatingResponses.forEach((element: any) => {
      if (element.CourseRatingResponseId === item.CourseRatingResponseId) {
        element['Comment'] = this.editedComment;
        element['showEditBox'] = false;
      }
    });
    this.coreCariculamService.saveTopicRatings(data).subscribe((arg: any) => {
      // this.refreshData.emit(true);
      // this.defaultTab.emit(1);
    });
  }

  deleteComment() {
    let data = {
      courseRatingResponseId: this.deletedItem.CourseRatingResponseId,
      userId: this.componentData.UserId,
    };
    this.coreCariculamService.deleteTopicComment(data).subscribe((arg: any) => {
      this.refreshData.emit(true);
      this.defaultTab.emit(1);
      this.deletedItem = null;
      this.modalRef?.hide();
    });
  }

  onDeleteComment(template: TemplateRef<string>, item: any) {
    this.modalRef = this.modalService.show(template);
    this.deletedItem = item;
  }

  setRatingCount(item: any) {
    switch (item.CourseRatingTypeOptionId) {
      case 469:
        this.changedMyViewCount++;
        break;
      case 470:
        this.impactFulCount++;
        break;
      case 477:
        this.learnedSomeCount++;
        break;
      case 472:
        this.madeMeConsiderCount++;
        break;
      case 473:
        this.expectedMoreCount++;
        break;
      case 480:
        this.notWhatIExpectedCount++;
        break;

      default:
        break;
    }
  }
}
