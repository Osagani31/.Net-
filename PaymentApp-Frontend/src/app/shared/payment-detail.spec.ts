import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PaymentDetailService } from './payment-detail';

describe('PaymentDetailService', () => {
  let service: PaymentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PaymentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
