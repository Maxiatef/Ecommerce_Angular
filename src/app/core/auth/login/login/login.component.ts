import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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



  constructor(private _loginService: LoginService,private _router: Router) { }
  login() {
    this._loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);this._router.navigate(['/home']);
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
