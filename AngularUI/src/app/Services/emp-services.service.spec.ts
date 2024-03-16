import { TestBed } from '@angular/core/testing';

import { EmpServicesService } from './emp-services.service';

describe('EmpServicesService', () => {
  let service: EmpServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
