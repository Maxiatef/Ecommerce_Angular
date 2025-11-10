import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { GetusercartService } from '../../services/cart/getusercart.service';
import { Cartitem } from '../../interfaces/cartitem';
import { AddtocartService } from '../../services/cart/addtocart.service';
import { RemoveService } from '../../services/cart/remove.service';
import { UpdatecountService } from '../../services/cart/updatecount.service';
import { ClearcartService } from '../../services/cart/clearcart.service';
import { Subscription } from 'rxjs';
import { count } from 'console';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Cartitem[] = [];
  private cartSubscription?: Subscription;
  totalpriceValue: number = 0;

  constructor(
    private _getusercartService: GetusercartService,
    private _addtocartService: AddtocartService,
    private _removeService: RemoveService,
    private _updatecountService: UpdatecountService,
    private _clearcartService: ClearcartService
  ) {}

  plusone(id: string) {
    this._addtocartService.addToCart(id).subscribe({
      next: (data) => {
        console.log(data, 'added to cart');
        // Refresh cart data immediately
        this.loadCart();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  minusone(id: string, count: number) {
    if (count > 1) {
      this._updatecountService.updateCount(id, count - 1).subscribe({
        next: (data) => {
          console.log(data, 'decremented count');
          // Refresh cart data immediately
          this.loadCart();
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      // If count is 1, remove the item instead
      this.remove(id);
    }
  }

  remove(id: string) {
    this._removeService.removeFromCart(id).subscribe({
      next: (data) => {
        console.log(data, 'removed from cart');
        // Refresh cart data immediately
        this.loadCart();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  clearCart() {
    this._clearcartService.clearCart().subscribe({
      next: (data) => {
        console.log(data, 'cart cleared');
        this.loadCart();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadCart() {
    this._getusercartService.getUserCart().subscribe({
      next: (data: any) => {
        console.log(data);
        this.cartItems = data.data.products || [];
        console.log(this.cartItems);
      },
      error: (error) => {
        console.error(error);
        this.cartItems = [];
      },
    });
  }

  ngOnInit() {
    // Initial load
    this.loadCart();

    // Subscribe to cart data changes from other components
    this.cartSubscription = this._getusercartService.cartData$.subscribe({
      next: (data: any) => {
        if (data?.data?.products) {
          this.cartItems = data.data.products;
          let total: number = 0;
          for (let item of this.cartItems) {
            total += item.price * item.count;


          }
          this.totalpriceValue = total;
        }
      },
    });
    {
    }
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
