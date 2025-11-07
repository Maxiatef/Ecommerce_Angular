import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//--------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  // BehaviorSubject to hold the cart count
  private cartCountSubject = new BehaviorSubject<number>(0);
  
  // Observable that components can subscribe to
  cartCount$: Observable<number> = this.cartCountSubject.asObservable();

  constructor() { }

  // Update cart count
  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  // Get current cart count value
  getCurrentCartCount(): number {
    return this.cartCountSubject.value;
  }

  // Increment cart count
  incrementCartCount(): void {
    this.cartCountSubject.next(this.cartCountSubject.value + 1);
  }

  // Decrement cart count
  decrementCartCount(): void {
    const currentCount = this.cartCountSubject.value;
    if (currentCount > 0) {
      this.cartCountSubject.next(currentCount - 1);
    }
  }
}
//--------------------------------------------------------------------