import { TrainingTheme } from './components/widgets/training-material/interface/training.interface';
import {
  IPollTheme,
  IPollWidget,
} from './components/widgets/polls/interface/poll.interface';
import { KeyTheme } from './components/widgets/key-takeaways/interface/keytakeaway.interface';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SessionData } from './components/widgets/rateTheCourse/interface/rate.interface';
import { CommunityData } from './components/widgets/community/interface/community.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'trainup-meet';
  //userName: string = 'test user';
  trainingFlowId: number = 0;
  componentData: any;
  showPostCommunityRelatedSection: boolean = false;
  showHideMenu: boolean = true;
  screenSize = window.innerWidth;
  sessionData: SessionData[] = [];
  reloadComponent: boolean = false;
  communityData!: CommunityData;

  constructor(private elementRef: ElementRef, private appService: AppService) {
    let myAttribute =
      this.elementRef.nativeElement.getAttribute('componentData');
    this.componentData = JSON.parse(myAttribute);
    console.log('Component Data', this.componentData);

    if (!this.componentData) {
      this.componentData = {
        ClientId: 34,
        TrainingFloId: 522,
        TrainingFloCommunityId: 71,
        CourseId: 2143,
        SessionWidgets: [
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 1,
            WidgetTypeName: 'Poll',
            WidgetId: 3632,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 19,
            WidgetTypeName: 'PreActivity',
            WidgetId: 3633,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 12,
            WidgetTypeName: 'UpcomingTraining',
            WidgetId: 3634,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 13,
            WidgetTypeName: 'WhatsHappening',
            WidgetId: 3635,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 3,
            WidgetTypeName: 'Resource',
            WidgetId: 3636,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 2,
            WidgetTypeName: 'DiscussionQuestion',
            WidgetId: 3637,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 4,
            WidgetTypeName: 'KeyTakeaway',
            WidgetId: 3638,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 6,
            WidgetTypeName: 'See',
            WidgetId: 3639,
            PageId: 104,
          },
          {
            TrainingFloId: 522,
            TrainingFloCommunityId: 71,
            TrainingFloWidgetId: 0,
            WidgetTypeId: 10,
            WidgetTypeName: 'CommunityInsight',
            WidgetId: 3651,
            PageId: 104,
          },
        ],
        MetadataModel: null,
        IspostcommunityEnabled: true,
        UserId: 133263,
        UserName: 'Bhikaji',
        UserImageUrl: null,
      };
    }
    if (this.componentData.IspostcommunityEnabled) {
      this.showPostCommunityRelatedSection = true;
    }
    this.trainingFlowId = this.componentData?.TrainingFloId;
  }

  pollWidgetDetail: IPollWidget = {
    widgetId: 2998,
    flowId: 451,
    clientId: 33,
  };

  pollThemeOne: IPollTheme = {
    barColor: '#4bc7e7',
    submitButtonColor: '#255F82',
  };
  pollThemeTwo: IPollTheme = {
    barColor: '#4bc7e7',
    submitButtonColor: '#255F82',
  };

  keythemeOne: KeyTheme = {
    CountColor: 'light-blue',
    AddButton: '#255F82',
  };
  trainingThemeOne: TrainingTheme = {
    barColor: '#4BC7E7',
  };

  ngOnInit(): void {
    const innerWidth = window.innerWidth;
    if (innerWidth < 1200) {
      this.showHideMenu = false;
    }
    this.appService
      .getSessionData(
        this.componentData.TrainingFloCommunityId,
        this.componentData.UserId
      )
      .subscribe((arg: any) => {
        this.sessionData = arg;
      });
  }

  onCommunityTabChange(communityData: any) {
    this.showPostCommunityRelatedSection = communityData.showPostCommunity;
    this.communityData = communityData;
  }

  showHideLeftMenu() {
    this.showHideMenu = !this.showHideMenu;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const innerWidth = window.innerWidth;
    if (innerWidth < 1200) {
      this.showHideMenu = false;
    }
  }

  updateComponentData(compData: any) {
    this.reloadComponent = true;
    this.componentData = compData;
    this.showPostCommunityRelatedSection =
      this.componentData.IspostcommunityEnabled;
    this.trainingFlowId = this.componentData?.TrainingFloId;
    setTimeout(() => {
      this.reloadComponent = false;
    }, 500);
  }
}
