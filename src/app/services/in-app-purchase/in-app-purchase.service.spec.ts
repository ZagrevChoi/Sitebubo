import { TestBed } from '@angular/core/testing';

import { InAppPurchaseService } from './in-app-purchase.service';

describe('InAppPurchaseService', () => {
  let service: InAppPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InAppPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
