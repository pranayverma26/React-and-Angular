import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CoreData } from '../core-curriculum/interface/core.interface';
import { AppData } from '../key-takeaways/interface/keytakeaway.interface';
import { TopicService } from './topics.service';

@Component({
  selector: 'app-topics-session',
  templateUrl: './topics-session.component.html',
  styleUrls: ['./topics-session.component.scss'],
})
export class TopicsSessionComponent implements OnInit {
  modalRef?: BsModalRef;
  @Input() appData!: AppData;
  topics: CoreData[] = [];
  componentData: any;
  bio!: CoreData;
  showLoader: boolean = true;
  constructor(
    private topicService: TopicService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.componentData = this.appData;
    this.topicService
      .getTopics(this.componentData.TrainingFloId, 0)
      .subscribe((arg: any) => {
        this.topics = arg;
        this.showLoader = false;
      });
  }

  openModal(template: TemplateRef<string>, bio: CoreData) {
    this.modalRef = this.modalService.show(template);
    this.bio = bio;
  }
}
