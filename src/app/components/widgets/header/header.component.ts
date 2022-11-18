import { AppData } from './../key-takeaways/interface/keytakeaway.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CommunityData, CommunityType } from '../community/interface/community.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() appData!: AppData;
  @Input()
  get showHideMenu(): boolean {
    return this._showHideMenu;
  }
  title = 'Business Structure';
  communityData?: CommunityType;
  componentData: any;
  screenSize = window.innerWidth;
  setResolutionWidth: boolean = false;

  set showHideMenu(value: boolean) {
    if (this.screenSize > 768 && this.screenSize < 991 && value) {
      this.setResolutionWidth = true;
    } else {
      this.setResolutionWidth = false;
    }
    this._showHideMenu = value;
  }
  private _showHideMenu: boolean = true;

  @Input()
  get headerData(): CommunityData {
    return this._headerData;
  }
  set headerData(value: CommunityData) {
    if (value?.showPostCommunity) {
      this.communityData = value?.postCommunity;
    } else {
      this.communityData = value?.preCommunity;
    }
    this._headerData = value;
  }
  private _headerData: any = {};

  constructor() {}

  ngOnInit() {
    this.componentData = this.appData;
  }

  redirectBack() {
    window.history.go(-1);
  }
}
