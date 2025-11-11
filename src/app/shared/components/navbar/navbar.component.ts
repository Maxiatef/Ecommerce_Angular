import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, } from "@angular/router";
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CartStateService } from '../../../features/services/cart/cart-state.service';
import { GetusercartService } from '../../../features/services/cart/getusercart.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router,
    private _cartStateService: CartStateService,
    private _getusercartService: GetusercartService,
    private _authStateService: AuthStateService
  ) { }


  islogged: boolean = false;
  cartCount: number = 0;
  private cartSubscription?: Subscription;
  private authSubscription?: Subscription;


  signOut() {
    this._authStateService.logout();
    this.cartCount = 0;
    this._cartStateService.updateCartCount(0);
    this._router.navigate(['/login']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Subscribe to authentication state changes
      this.authSubscription = this._authStateService.authState$.subscribe({
        next: (isLoggedIn) => {
          this.islogged = isLoggedIn;

          // Load cart count when user logs in
          if (isLoggedIn) {
            this._getusercartService.refreshCart();
          }
        }
      });

      // Subscribe to cart count changes
      this.cartSubscription = this._cartStateService.cartCount$.subscribe({
        next: (count) => {
          this.cartCount = count;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
