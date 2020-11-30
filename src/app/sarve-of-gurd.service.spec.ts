import { TestBed } from '@angular/core/testing';

import { SarveOfGurdService } from './sarve-of-gurd.service';

describe('SarveOfGurdService', () => {
  let service: SarveOfGurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SarveOfGurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
