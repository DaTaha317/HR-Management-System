import { TestBed } from '@angular/core/testing';

import { DeptServicesService } from './dept-services.service';

describe('DeptServicesService', () => {
  let service: DeptServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeptServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
