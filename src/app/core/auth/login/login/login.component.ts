import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { isPlatformBrowser } from '@angular/common';
import { AuthStateService } from '../../../services/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;



  constructor(
    private _loginService: LoginService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _authStateService: AuthStateService
  ) { }

  login() {
    this._loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (isPlatformBrowser(this.platformId)) {
          // Use AuthStateService to handle login
          this._authStateService.login(response.token);
        }
        console.log('Login successful:', response);
        this._router.navigate(['/home']);


      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  ngOnInit(): void {
    this.login();
  }


}
