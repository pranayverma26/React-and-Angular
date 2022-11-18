import { AppData, KeyTakeAway } from '../key-takeaways/interface/keytakeaway.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { KeyTakeawayService } from '../key-takeaways/key-takeaway.service';
import { ResourceTypes } from 'src/app/shared/enums/enums';
import { TrainingData, TrainingTheme } from './interface/training.interface';
import { TrainingService } from './training.service';
import { app_constant } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-training-material',
  templateUrl: './training-material.component.html',
  styleUrls: ['./training-material.component.scss'],
})
export class TrainingMaterialComponent implements OnInit {

  @Input() appData: AppData | undefined;
  @Input() trainingTheme: TrainingTheme = { barColor: 'green' };
  @Input() courseId: number = 0;
  @Input() courseName: string = '';

  buttonSelected: number = -1;
  comments: string = '';
  componentData: any;
  keyTakeaway: KeyTakeAway[] = [];
  modalRef?: BsModalRef;
  resourceTypes = ResourceTypes;
  searchText: string = '';
  showLoader: boolean = true;
  trainingRecordings: TrainingData[] = [];
  trainingResources: TrainingData[] = [];
  typeNumber!: number;
  widgetTypeName: string = app_constant.See;

  constructor(
    private trainingService: TrainingService,
    private keyTakeawayService: KeyTakeawayService,
    private modalService: BsModalService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.componentData = this.appData;
    this.getKeyTakeaway();
    let session = this.componentData.SessionWidgets.filter((item: any) => {
      return (
        item.WidgetTypeName.toLowerCase() === app_constant.See.toLowerCase()
      );
    });

    this.trainingService.getTrainingMat(this.componentData.TrainingFloId, session[0].WidgetId, this.appData?.CourseId)
      .subscribe((response: TrainingData) => {
        // this.ResourceTypes = response.ResourceTypes;
        response?.SessionRecordings?.forEach((item: TrainingData) => {
          let resource: TrainingData = {
            ...item,
            id: item.HTMLContentId,
            heading: item.Title,
            para: item.Description,
            videoUrl: item['URL'],
            comments: '',
          };
          this.trainingRecordings.push(resource);
        });
        response?.Resources?.forEach((item: TrainingData) => {
          let resource: TrainingData = {
            ...item,
            id: item.ResourceId,
            typeid: item.ResourceTypeId,
            heading: item.Name,
            para: item.Description,
            videoUrl: item['URL'],
            // TODO: Create enums in place of hard coded numbers.
            sanitizedURL: this.getSanitizedURL(
              item['URL'],
              item.ResourceTypeId
            ),
            comments: '',
          };

          this.trainingResources.push(resource);
        });
        if (this.trainingRecordings?.length > 0) {
          this.buttonSelected = this.trainingRecordings[0]?.id;
        } else (this.trainingResources?.length > 0)
        this.buttonSelected = this.trainingResources[0]?.id;
        this.showLoader = false;
      });
  }

  openModal(template: TemplateRef<string>) {
    this.modalRef = this.modalService.show(template);
  }

  search(event: any) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.trainingService.search.next(this.searchText);
  }

  setTabDefault(tabId: number) {
    if (tabId === 0) {
      this.buttonSelected = this.trainingRecordings[0].id;
    } else {
      this.buttonSelected = this.trainingResources[0].id;
    }
  }

  getKeyTakeaway() {
    this.keyTakeawayService
      .getKeyTakeAways(this.componentData.TrainingFloId)
      .subscribe((arg: KeyTakeAway[]) => {
        this.keyTakeaway = arg.filter((item:KeyTakeAway) => {
          return item.CourseId === this.courseId;
        });
      });
  }

  saveKeyTakeAwayNotes(): void {
    let kTWWidget = this.componentData.SessionWidgets.filter(
      (item: KeyTakeAway) =>
        item.WidgetTypeName.toLowerCase() === app_constant.Key_Takeaway
    )[0];

    if (Object.keys(kTWWidget).length) {
      let keyData = {
        trainingFloId: this.componentData.TrainingFloId,
        widgetId: kTWWidget.WidgetId,
        notes: this.comments,
        keyTakeawayId: 0,
        courseId: this.courseId,
        userId: this.componentData.UserId,
      };

      this.keyTakeawayService.saveKeyTakeAways(keyData)
        .subscribe(() => {
          this.getKeyTakeaway();
          this.modalRef?.hide();
          this.comments = ''
        });
    }
  }

  isOfficeDoc(typeId: number): boolean {
    switch (typeId) {
      case this.resourceTypes.WordDoc:
      case this.resourceTypes.ExcelDoc:
      case this.resourceTypes.PPTDoc:
        return true;
      default:
        false;
    }
    return false;
  }

  private getSanitizedURL(url: string, resourceTypeId: number): SafeResourceUrl | string {
    switch (resourceTypeId) {
      case ResourceTypes.Youtube:
        return this._sanitizer.bypassSecurityTrustResourceUrl(
          url.replace('watch?v=', 'embed/')
        );
      case ResourceTypes.PDF:
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }
}
