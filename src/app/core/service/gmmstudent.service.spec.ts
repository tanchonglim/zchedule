import { TestBed } from '@angular/core/testing';

import { GMMStudentService } from './gmmstudent.service';

describe('GMMStudentService', () => {
  let service: GMMStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GMMStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
