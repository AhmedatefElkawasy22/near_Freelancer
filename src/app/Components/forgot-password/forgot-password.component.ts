import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Services/AccountService/account.service';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email!: string;

  constructor(
    private _AccountService: AccountService,
    private dialog: MatDialog,
    private _router: Router
  ) {}

  onSubmit() {
    // console.log(this.email);
    if (this.email.length > 0) {
      this._AccountService.ForgetPassword(this.email).subscribe(
        response => {
          this.openAlertDialog('Success', 'Please check your email to receive the OTP.');
          localStorage.setItem('email', this.email);
          setTimeout(() => {
            this._router.navigateByUrl(`/EnterOTP`);
          }, 5000);
        },
        error => {
          //console.error("errorrrrrrr",error);
          this.openAlertDialog('Error', `${error.error.message || error.error}`);
        }
      );
    } else {
      this.openAlertDialog('Warning', 'Please enter your email address before submitting.');
    }
  }

  // Method to open the alert dialog
  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
