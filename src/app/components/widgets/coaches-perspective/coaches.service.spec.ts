/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoachesService } from './coaches.service';

describe('Service: Coaches', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoachesService]
    });
  });

  it('should ...', inject([CoachesService], (service: CoachesService) => {
    expect(service).toBeTruthy();
  }));
});
