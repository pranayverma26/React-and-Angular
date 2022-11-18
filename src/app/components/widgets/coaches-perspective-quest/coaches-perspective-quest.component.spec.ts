import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesPerspectiveQuestComponent } from './coaches-perspective-quest.component';

describe('CoachesPerspectiveQuestComponent', () => {
  let component: CoachesPerspectiveQuestComponent;
  let fixture: ComponentFixture<CoachesPerspectiveQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesPerspectiveQuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachesPerspectiveQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
