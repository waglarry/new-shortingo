import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  brandImageUrl: string = 'assets/images/Shortingo.svg';
  loginIllusion: string = 'assets/images/loginIllusion.svg';
  isLoading: boolean = false;

  loginForm = this._builder.group({
    email: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  handleLogin() {
    this.isLoading = true;
    let formData = this.loginForm.value;

    if (this.loginForm.valid) {
      this._authService.login(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          alert(response.message);
          this.router.navigate(['dashboard']);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('username', response.username);
        },
        error: (error) => {
          this.isLoading = false;

          if (error?.status === 401) {
            alert('Email or Password is wrong!');
          } else if (error?.status === 400) {
            alert(error?.error?.message);
          } else if (error?.status === 0) {
            alert('Something went wrong, check your internet and try again!');
          } else {
            alert(error?.message);
          }
        },
      });
    } else {
      this.isLoading = false;
      alert('Invalid Credentials!');
    }
  }
}
