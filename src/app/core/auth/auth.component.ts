import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private _authService: AuthService,
     private _router: Router,
     private _toastrService:ToastrService
    ) {}
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.required]),
  });

  login() {
    const formValue = this.loginForm.value;
    const body = new HttpParams()
      .set('username', formValue.username || '')
      .set('password', formValue.Password || '')
      .set('grant_type', 'password')
      .set('mobileid', '9cb2fcb2de1c71e8');
    this._authService.login(body.toString()).subscribe({
      next: (res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userToken', res.access_token);
        }
      },
      complete: () => {
        this._toastrService.success('Login Successfully');
        this._router.navigate(['/dashboard']);
      },
    });
  }
}
