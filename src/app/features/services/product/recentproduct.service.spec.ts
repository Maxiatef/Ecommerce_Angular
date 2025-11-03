import { TestBed } from '@angular/core/testing';

import { RecentproductService } from './recentproduct.service';

describe('RecentproductService', () => {
  let service: RecentproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
