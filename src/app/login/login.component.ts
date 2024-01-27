import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RememberMeService } from '../services/rememberme.service';
import { ToastrService } from 'ngx-toastr';

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
    private _rememberMeService: RememberMeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Retrieve stored credentials and set them in the form
    const storedCredentials = this._rememberMeService.getStoredCredentials();
    if (storedCredentials) {
      this.loginForm.patchValue(storedCredentials);
    }

    // Check if the 'rememberMe' control exists before subscribing to changes
    const rememberMeControl = this.loginForm.get('rememberMe');

    if (rememberMeControl) {
      rememberMeControl.valueChanges.subscribe((value) => {
        this._rememberMeService.setRememberMe(value);
      });
    }
  }

  brandImageUrl: string = 'assets/images/Shortingo.svg';
  loginIllusion: string = 'assets/images/loginIllusion.svg';
  isLoading: boolean = false;

  loginForm: FormGroup = this._builder.group({
    email: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
    rememberMe: [this._rememberMeService.getRememberMe()],
  });

  handleRememberMeChange(rememberMeValue: boolean): void {
    if (!rememberMeValue) {
      this._rememberMeService.deleteStoredCredentials();
    } else {
      this._rememberMeService.saveCredentials(this.loginForm.value);
    }
  }

  handleLogin() {
    this.isLoading = true;
    let formData = this.loginForm.value;
    
    if (this.loginForm.valid) {
      this._authService.login(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.handleRememberMeChange(formData.rememberMe);    
          this.toastr.success(response.message);
          
          this.router.navigate(['dashboard']);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('username', response.username);
        },
        error: (error) => {
          this.isLoading = false;

          if (error?.status === 401) {
            this.toastr.error('Email or Password is wrong!');
          } else if (error?.status === 400) {
            this.toastr.error(error?.error?.message);
          } else if (error?.status === 0) {
            this.toastr.error('Something went wrong, check your internet and try again!');
          } else {
            this.toastr.error(error?.message);
          }
        },
      });
    } else {
      this.isLoading = false;
      this.toastr.error('Invalid Credentials!');
    }
  }
}
