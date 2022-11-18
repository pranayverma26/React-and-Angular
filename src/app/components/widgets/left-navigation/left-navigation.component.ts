import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { LeftNavService } from './left-nav.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommunityType } from '../community/interface/community.interface';
import { AppData } from '../key-takeaways/interface/keytakeaway.interface';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss'],
})
export class LeftNavigationComponent implements OnInit {
  modalRef?: BsModalRef;
  @Input() appData!: AppData;
  @Input() sessionData: any;
  collapse: boolean = true;
  componentData: any;
  communityData!: CommunityType;
  selectedItem = { TrainingFloId: -1 };

  @Output()
  componentDataChange: EventEmitter<boolean> = new EventEmitter();
  showLeftMenu: boolean = true;
  @Output()
  showHideLeftMenu: EventEmitter<boolean> = new EventEmitter();
  userImageUrl: string = '';
  constructor(
    private leftNavService: LeftNavService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    this.userImageUrl = this.componentData.UserImageUrl;
  }
  private _headerData: any = {};
  redirectBack() {
    window.history.go(-1);
  }

  hideleftMenu() {
    this.showLeftMenu = !this.showHideLeftMenu;
    this.showHideLeftMenu.emit(this.showLeftMenu);
  }

  getAppData(item: any, template: TemplateRef<string>) {
    if (!item.IsAllowed) {
      this.openModal(template);
    } else {
      this.leftNavService
        .getSessionData(item.TrainingFloId, item.CourseId)
        .subscribe((arg: any) => {
          this.componentDataChange.emit(arg);
          this.selectedItem = item;
        });
    }
  }

  openModal(template: TemplateRef<string>) {
    this.modalRef = this.modalService.show(template);
  }
  @Input()
  get headerData(): CommunityType {
    return this._headerData;
  }
  set headerData(value: any) {
    if (value.showPostCommunity) {
      this.communityData = value.postCommunity;
    } else {
      this.communityData = value.preCommunity;
    }
    this._headerData = value;
  }
}
