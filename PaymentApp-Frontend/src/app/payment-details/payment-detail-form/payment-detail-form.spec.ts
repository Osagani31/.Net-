import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailFormComponent } from './payment-detail-form';

describe('PaymentDetailFormComponent', () => {
  let component: PaymentDetailFormComponent;
  let fixture: ComponentFixture<PaymentDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDetailFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
