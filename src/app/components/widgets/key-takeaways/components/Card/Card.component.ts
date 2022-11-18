import { AppData, KeyTakeAway } from './../../interface/keytakeaway.interface';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CardTheme } from '../../interface/keytakeaway.interface';
import { app_constant } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-Card',
  templateUrl: './Card.component.html',
  styleUrls: ['./Card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() showKey = true;
  @Input() appData?: AppData;
  @Input() keyTakeAwayList: KeyTakeAway[] = [];
  @Input() knowtheme: CardTheme = {
    KnowButton: 'blue',
    ViewAll: 'blue',
    textColor: 'pink',
  };
  showFeedback: boolean = false;
  modalRef?: BsModalRef;
  keyTakeaway!: KeyTakeAway;
  files: File[] = [];
  componentData: any;
  screenSize = window.innerWidth;
  crouselIndex: number = 2;
  widgetTypeName: string = app_constant.Key_Takeaway;
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

  ) {}
  id: string = 'all';

  ngOnInit() {
    this.componentData = this.appData;
  }

  selectTab(ids: string) {
    this.id = ids;
  }

  openModal(template: TemplateRef<string>, key?: KeyTakeAway) {
    if (key) {
      this.keyTakeaway = key;
    }
    this.modalRef = this.modalService.show(template);
  }

  giveFeedBack(keyId: number) {}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  SaveKeytakeawayNotes() {
    this.modalRef?.hide();
  }

  DeleteItem(key: KeyTakeAway) {
    this.keyTakeAwayList.splice(this.keyTakeAwayList.indexOf(key), 1);
    this.modalRef?.hide();
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
}
