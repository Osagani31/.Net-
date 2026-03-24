import { Component, signal } from '@angular/core';
import { PaymentDetailsComponent } from './payment-details/payment-details';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaymentDetailsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PaymentApp');
}
