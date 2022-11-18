import { SessionData } from './../rateTheCourse/interface/rate.interface';
import { KeyTakeawayService } from './key-takeaway.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KeyTheme, CardTheme, KeyTakeAway, AppData } from './interface/keytakeaway.interface';
import { app_constant } from 'src/app/shared/app.constant';
@Component({
  selector: 'app-key-takeaways',
  templateUrl: 'key.takeaways.component.html',
  styleUrls: ['key.takeaways.component.scss'],
})
export class KeyTakeawaysComponent implements OnInit {
  @Input() appData!: AppData;
  @Input() courseId: number = 2143;
  @Input() courseName: string = '';
  @Input() countTheme: KeyTheme = {
    CountColor: 'blue',
    AddButton: 'blue',
  };
  keyTakeaway: KeyTakeAway[] = [];
  keyTakeawayCount: Number = 0;
  modalRef?: BsModalRef;
  files: File[] = [];
  keyTakeAwayLength = this.keyTakeaway.length;
  comments: string = '';
  componentData: any;
  constructor(
    private keyTakeawayService: KeyTakeawayService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.componentData = this.appData;
    this.getKeyTakeaway();
  }

  getKeyTakeaway() {
    this.keyTakeawayService
      .getKeyTakeAways(this.componentData.TrainingFloId)
      .subscribe((arg: KeyTakeAway[]) => {
        this.keyTakeaway = arg.filter((item: KeyTakeAway) => {
          return item.CourseId === this.courseId;
        });

        this.keyTakeawayCount = this.keyTakeaway.length;
      });
  }

  openModal(template: TemplateRef<string>) {
    this.modalRef = this.modalService.show(template);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  saveKeyTakeawayNotes(template: TemplateRef<string>) {
    let kTWWidget = this.componentData.SessionWidgets.filter((item: SessionData) => item.WidgetTypeName.toLowerCase() === app_constant.Key_Takeaway)[0];

    if (Object.keys(kTWWidget).length) {
      let keyData = {
        trainingFloId: this.componentData.TrainingFloId,
        widgetId: kTWWidget.WidgetId,
        notes: this.comments,
        keyTakeawayId: 0,
        courseId: this.courseId,
        userId:this.componentData.UserId
      };

      this.keyTakeawayService.saveKeyTakeAways(keyData).subscribe((arg: KeyTakeAway) => {
        this.getKeyTakeaway();
        this.modalRef?.hide();
        this.comments='';
        this.openModal(template);
      });
    }
    // this.keyTakeaway.push({id:8, name:this.takeaway , userImage:this.image})
  }

  KnowThemeOne: CardTheme = {
    KnowButton: '#255F82',
    ViewAll: '#255F82',
    textColor: 'white',
  };
}
