import { TestBed } from '@angular/core/testing';

import { OneproductService } from './oneproduct.service';

describe('OneproductService', () => {
  let service: OneproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
