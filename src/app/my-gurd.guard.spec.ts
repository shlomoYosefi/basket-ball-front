import { TestBed } from '@angular/core/testing';

import { MyGurdGuard } from './my-gurd.guard';

describe('MyGurdGuard', () => {
  let guard: MyGurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyGurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
