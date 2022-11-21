import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetUpComponent } from './meet-up.component';

describe('MeetUpComponent', () => {
  let component: MeetUpComponent;
  let fixture: ComponentFixture<MeetUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
