
import { Component } from '@angular/core';
import { PaymentDetailsComponent } from '../payment-details/payment-details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaymentDetailsComponent],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'PaymentApp';
}
