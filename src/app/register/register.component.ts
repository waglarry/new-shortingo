import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  brandImageUrl: string = 'assets/images/Shortingo.svg';
  registerIllusion: string = 'assets/images/registerIllusion.svg';
  isLoading: boolean = false;

  registerForm = this._builder.group({
    username: this._builder.control('', Validators.required),
    email: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
    confirmPassword: this._builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  handleRegister() {
    this.isLoading = true;
    let formData = this.registerForm.value;
    if (this.registerForm.valid) {
      if (formData.password !== formData.confirmPassword) {
        alert('Password do not match!');
      } else {
        this._authService.register(formData).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['login']);
          },
          error: (error) => {
            this.isLoading = false;

            if (error?.status === 400) {
              alert(error?.error?.message);
            } else if (error?.status === 0) {
              alert('Something went wrong, check your internet and try again!');
            } else {
              alert(error?.message);
            }
          },
        });
      }
    } else {
      this.isLoading = false;
      alert('Invalid Credentials!');
    }
  }
}
