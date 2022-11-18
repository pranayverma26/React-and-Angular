/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeftNavService } from './left-nav.service';

describe('Service: LeftNav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeftNavService]
    });
  });

  it('should ...', inject([LeftNavService], (service: LeftNavService) => {
    expect(service).toBeTruthy();
  }));
});
