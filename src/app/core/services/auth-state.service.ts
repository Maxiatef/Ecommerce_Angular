import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    // BehaviorSubject to hold the authentication state
    private authStateSubject = new BehaviorSubject<boolean>(false);

    // Observable that components can subscribe to
    authState$: Observable<boolean> = this.authStateSubject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // Initialize auth state on service creation
        this.checkAuthState();
    }

    // Check current authentication state
    private checkAuthState(): void {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            this.authStateSubject.next(!!token);
        }
    }

    // Update authentication state
    updateAuthState(isLoggedIn: boolean): void {
        this.authStateSubject.next(isLoggedIn);
    }

    // Get current authentication state
    getCurrentAuthState(): boolean {
        return this.authStateSubject.value;
    }

    // Login method (can be called from login component)
    login(token: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', token);
            this.updateAuthState(true);
        }
    }

    // Logout method (can be called from navbar component)
    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            this.updateAuthState(false);
        }
    }
}
