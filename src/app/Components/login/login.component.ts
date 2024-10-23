import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../Services/Login/login-service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  UserLoginForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private _loginService: LoginService
  ) {
    this.UserLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.UserLoginForm.valid) {
      this._loginService.LoginUser(this.UserLoginForm.value).subscribe(
        (data) => {
          this.openSnackBar('wellcome 😊', 'Close');
        },
        (error) => {
          //console.log('res', error);
          this.openSnackBar(error.error.message , 'Close');
        }
      );
    } else {
      this.openSnackBar('Please fill in the data correctly.', 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
