import { Component, OnInit } from '@angular/core';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Recentproductinterface[] = [];

  constructor(private _cartService: CartService) { }

  removeitem(item: Recentproductinterface) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  ngOnInit() {
    this.cartItems = this._cartService.getCartItems();
    // console.log(this._cartService.getCartItems(),"cart component");
    console.log(this.cartItems,'my cart')
  }
}
