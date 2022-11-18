/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeyTakeawayService } from './key-takeaway.service';

describe('Service: KeyTakeaway', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyTakeawayService]
    });
  });

  it('should ...', inject([KeyTakeawayService], (service: KeyTakeawayService) => {
    expect(service).toBeTruthy();
  }));
});
