import { Injectable } from '@angular/core';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: Recentproductinterface[] = [];
  

  addToCart(item: Recentproductinterface) {
    this.cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }
}
