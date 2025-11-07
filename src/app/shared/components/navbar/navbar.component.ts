import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, } from "@angular/router";
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CartStateService } from '../../../features/services/cart/cart-state.service';
import { GetusercartService } from '../../../features/services/cart/getusercart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  // islogged = localStorage.getItem('token');
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router,
    private _cartStateService: CartStateService,
    private _getusercartService: GetusercartService
  ) { }


  islogged: string | null = null;
  cartCount: number = 0;
  private cartSubscription?: Subscription;


  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.islogged = null;
      this.cartCount = 0;
      this._cartStateService.updateCartCount(0);
      this._router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.islogged = localStorage.getItem('token');
      
      // Subscribe to cart count changes
      this.cartSubscription = this._cartStateService.cartCount$.subscribe({
        next: (count) => {
          this.cartCount = count;
        }
      });

      // Load initial cart count if logged in
      if (this.islogged) {
        this._getusercartService.refreshCart();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
