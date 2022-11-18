/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoreCariculamService } from './coreCariculam.service';

describe('Service: CoreCariculam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreCariculamService]
    });
  });

  it('should ...', inject([CoreCariculamService], (service: CoreCariculamService) => {
    expect(service).toBeTruthy();
  }));
});
