import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RateTheCourseComponent } from './components/widgets/rateTheCourse/rateTheCourse.component';
import { CoachInsightsComponent } from './components/widgets/coach-insights/coach-insights.component';
import { FeedbackComponent } from './components/widgets/feedback/feedback.component';
import { CoreCurriculumComponent } from './components/widgets/core-curriculum/core-curriculum.component';
import { LeftNavigationComponent } from './components/widgets/left-navigation/left-navigation.component';
import { TopicsSessionComponent } from './components/widgets/topics-session/topics-session.component';
import { HeaderComponent } from './components/widgets/header/header.component';
import { LearningComponent } from './components/widgets/learning/learning.component';
import { CoachesPerspectiveComponent } from './components/widgets/coaches-perspective/coaches-perspective.component';
import { DiscussionQuestionComponent } from './components/widgets/discussion-question/discussion.question.component';
import { ActionCardComponent } from './components/widgets/action/components/action-card/action-card.component';
import { FooterSectionComponent } from './components/widgets/footer-section/footer-section.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleChartsModule } from 'angular-google-charts';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ActionComponent } from './components/widgets/action/action.component';
import { CommunityComponent } from './components/widgets/community/community.component';
import { CardComponent } from './components/widgets/key-takeaways/components/Card/Card.component';
import { KeyTakeawaysComponent } from './components/widgets/key-takeaways/key.takeaways.component';
import { PollsComponent } from './components/widgets/polls/polls.component';
import { RespondComponent } from './components/widgets/respond/respond.component';
import { TrainingMaterialComponent } from './components/widgets/training-material/training-material.component';
import { FilterPipe } from './shared/filter.pipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MeetUpComponent } from './components/widgets/meet-up/meet-up.component';

@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    RespondComponent,
    KeyTakeawaysComponent,
    CardComponent,
    CommunityComponent,
    ActionCardComponent,
    DiscussionQuestionComponent,
    TrainingMaterialComponent,
    TopicsSessionComponent,
    CoachesPerspectiveComponent,
    FilterPipe,
    LeftNavigationComponent,
    FilterPipe,
    HeaderComponent,
    CoreCurriculumComponent,
    FooterSectionComponent,
    CoachInsightsComponent,
    FeedbackComponent,
    RateTheCourseComponent,
    LearningComponent,
    ActionComponent,
    MeetUpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    NgxDropzoneModule,
    GoogleChartsModule,
    SlickCarouselModule,
    NgxDocViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
