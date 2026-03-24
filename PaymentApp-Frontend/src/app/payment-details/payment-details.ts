
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetailFormComponent } from './payment-detail-form/payment-detail-form';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, PaymentDetailFormComponent],
  templateUrl: './payment-details.html',
  styles: []
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService) {
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.list = res as PaymentDetail[]
            alert('Deleted successfully')
          },
          error: err => { console.log(err) }
        })
  }

}
