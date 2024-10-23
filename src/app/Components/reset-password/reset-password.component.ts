import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AccountService } from '../../Services/AccountService/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _AccountService: AccountService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      this.openAlertDialog('Error', 'Please fill all fields correctly.');
      return;
    }
    //console.log('Form Submitted:', this.resetPasswordForm.value);
    const DataBody =  {
      email: localStorage.getItem('email'),
      token: localStorage.getItem('tokenOTP'),
      newPassword: this.resetPasswordForm.get('password')?.value,
      confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value,
   };
   
    this._AccountService.resetPassword(DataBody).subscribe(
      (response) => {
        //console.log(response);
        this.openAlertDialog(
          'Success',
          'Password reset successful. You can now login.'
        );
        localStorage.removeItem('email');
        localStorage.removeItem('tokenOTP');
        setTimeout(() => {
          this._router.navigateByUrl(`/Login`);
        }, 3000);
      },
      (error) => {
        //console.error('Error:', error);
        this.openAlertDialog('Error', error.error.message);
      }
    );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (
        confirmPassControl.errors &&
        !confirmPassControl.errors['mustMatch']
      ) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
