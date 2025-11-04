import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  rePassword!: string;
  phone!: string;

  constructor(private _registerService: RegisterService, private _router: Router) { }



  registerForm: FormGroup = new FormGroup({
    // name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    name: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$')]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')])
  }, this.passwordmatch);
  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //     this.registerForm.reset();
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  passwordmatch(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password == rePassword ? null : { notmatched: true };

  }



  //   onSubmit() {
  //   this._registerService.register(this.name, this.email, this.password, this.rePassword, this.phone).subscribe({
  //     next: (response) => {
  //       console.log('Registration successful:', response);
  //     },
  //     error: (error) => {
  //       console.error('Registration failed:', error);
  //     }
  //   });
  // } 
  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, rePassword, phone } = this.registerForm.value;
      this._registerService.register(name, email, password, rePassword, phone).subscribe({
        next: (response) => {console.log('Registration successful:', response);this._router.navigate(['/login']); },
        error: (error) => console.error('Registration failed:', error)
      });
    }
  }
  ngOnInit(): void {
    this.onSubmit();
  }




}
