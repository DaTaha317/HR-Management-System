import { TestBed } from '@angular/core/testing';

import { DaysOffService } from './days-off.service';

describe('DaysOffService', () => {
  let service: DaysOffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysOffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
