import { CommunityData, CommunityType } from './interface/community.interface';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommunityService } from './community.service';
import * as $ from 'jquery';
import { AppData } from '../key-takeaways/interface/keytakeaway.interface';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  @Input() appData?: AppData;
  @Input() showLeftMenu: boolean = true;
  @Output()
  change: EventEmitter<CommunityData> = new EventEmitter<CommunityData>();

  showLoader: boolean = true;
  @Output()
  showHideLeftMenu: EventEmitter<boolean> = new EventEmitter();
  activeTab: any = '0';
  SubPara =
    '    Business moves quickly, and if your team is not supported for speed, you can easily fall behind. Over the next two days, we will learn product methodologies, including Agile, which is an iterative approach to project management. We will close by learning about how to deploy cross-functional teams to leverage the entire scope of experience in your organization.';

  modalRef?: BsModalRef;

  preCommunity?: CommunityType ;
  postCommunity?: CommunityType;
  TrainingFloId:number=484;
  componentData: any;
  sectionURL: string = window.location.href + '/#training';


  communityData?: CommunityData;

  constructor(
    private modalService: BsModalService,
    private communityService: CommunityService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    this.getCommunityData();
    setTimeout(() => {

      this.selectTab(this.componentData.IspostcommunityEnabled ? 1 : 0);
    }, 50);
  }

  getCommunityData() {
    this.communityService
      .getCommunity(
        this.componentData.TrainingFloId,
        this.componentData.SessionWidgets[0].PageId
      )
      .subscribe((response: CommunityType[]) => {
        this.preCommunity = response.find((item: CommunityType) => {
          return (
            item.CommunityType.toLocaleLowerCase().trim() ===
            'Pre Community'.toLocaleLowerCase().trim()
          );
        });
        this.postCommunity = response.find((item: CommunityType) => {
          return (
            item.CommunityType.toLocaleLowerCase().trim() ===
            'Post Community'.toLocaleLowerCase().trim()
          );
        });

        this.triggerDataChange(this.componentData.IspostcommunityEnabled);
        this.showLoader = false;
        setTimeout(() => {

          this.selectTab(this.componentData.IspostcommunityEnabled ? 1 : 0);
        }, 50);
      });
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  openModal(template: TemplateRef<string>) {
    this.modalRef = this.modalService.show(template);
  }

  onSelect(data: TabDirective): void {
    this.triggerDataChange(data.id === '1');
    this.activeTab = data.id;
  }

  scrollSectionURL() {
    $('html, body').animate(
      {
        scrollTop: ($('#training') as any).offset().top - 150,
      },
      1000
    );
    return;
  }

  hideLeftMenu() {
    this.showLeftMenu = !this.showHideLeftMenu;
    this.showHideLeftMenu.emit(this.showLeftMenu);
  }

  triggerDataChange(showPostCommunity: boolean) {
    this.communityData = {
      showPostCommunity: showPostCommunity,
      preCommunity: this.preCommunity,
      postCommunity: this.postCommunity,
    };
    this.change.emit(this.communityData);
  }
}
