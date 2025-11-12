import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetusercartService } from '../../services/cart/getusercart.service';
import { ClearcartService } from '../../services/cart/clearcart.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  loading: boolean = true;
  subtotal: number = 0;

  // simple payment method state
  selectedPayment: 'card' | 'cod' | 'paypal' = 'card';

  address = {
    name: '',
    line1: '',
    city: '',
    postal: ''
  };

  constructor(private _getusercartService: GetusercartService, private _clearcartService: ClearcartService, private router: Router) {}

  ngOnInit(): void {
    this._getusercartService.getUserCart().subscribe({
      next: (data: any) => {
        this.cartItems = data.data?.products || [];
        this.calculateSubtotal();
        this.loading = false;
      },
      error: (err) => {
        console.error('Cart load failed', err);
        this.loading = false;
      }
    });
  }

  calculateSubtotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += (item.price || 0) * (item.count || 1);
    }
    this.subtotal = total;
  }

  placeOrder() {
    // For now we simulate an order submission
    if (!this.address.name || !this.address.line1) {
      alert('Please fill at least your name and address.');
      return;
    }

    // Simulated order submission - after success clear the cart and refresh cart state
    this._clearcartService.clearCart().subscribe({
      next: (res) => {
        // Refresh cart data throughout the app
        this._getusercartService.refreshCart();
        alert('Order placed successfully! Thank you for your purchase.');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Failed to clear cart after order:', err);
        // Still navigate but warn user
        alert('Order placed but failed to clear cart automatically. Please refresh your cart.');
        this.router.navigate(['/products']);
      }
    });
  }
}
