import { TestBed } from '@angular/core/testing';

import { FsksmServiceService } from './fsksm-service.service';

describe('FsksmServiceService', () => {
  let service: FsksmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FsksmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
