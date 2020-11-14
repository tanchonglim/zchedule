import { TestBed } from '@angular/core/testing';

import { CgiServiceService } from './cgi-service.service';

describe('CgiServiceService', () => {
  let service: CgiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CgiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
