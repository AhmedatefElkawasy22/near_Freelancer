import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { AccountService } from '../../Services/AccountService/account.service';
import { NgIf } from '@angular/common';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-enter-otp',
  standalone: true,
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css'],
  imports: [FormsModule, NgIf],
})
export class EnterOTPComponent  implements  OnInit  {
  constructor(private _router: Router, private _AcountService: AccountService,private dialog: MatDialog) {
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    if (!this.email) {
      this.openAlertDialog('Error', 'No email found, please try again.');
      setTimeout(() => {
        this._router.navigateByUrl(`/ForgotPassword`);
      }, 3000);
    }
  }
  
  email!: string | null;
  
  otp: string[] = ['', '', '', '', '', ''];
  
  isButtonDisabled: boolean = true; // Initially disable the resend button
  countdown: number = 60; // 1 minutes in seconds


  onInputKeyDown(event: any, index: number) {
    const input = event.target;
  
    // Handle Backspace to move to the previous input if empty
    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        const prevInput = input.previousElementSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
      return;
    }
  }
  
  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value.trim();
  
    // Handle input change
    if (value === '') return;
  
    // If single character is entered, move to the next input
    if (value.length === 1) {
      this.otp[index] = value; // Save the input value
      if (index < 5) {
        const nextInput = input.nextElementSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      // Keep only the first character if more than one entered
      this.otp[index] = value[0];
      input.value = value[0]; // Ensure the input field only has 1 character
    }
  }
  

  onSubmit() {
    const otpCode = this.otp.join(''); 
    
    const data = { "email": this.email, "otp": otpCode }; 
    
    this._AcountService.verifyOTP(data).subscribe(
      response => {
        //console.log("done", response);
        localStorage.setItem('tokenOTP', response);
        this.openAlertDialog("success", "OTP is correct and password can be changed now.");
        setTimeout(() => {
          this._router.navigateByUrl(`/ResetPassword`);
        }, 3000);
         
      },
      error => { 
        console.log("notdone", error);
        this.openAlertDialog('Error', `${error.error}`);
      }
    );
  }
  

  startcountdown() {
    const intervalId = setInterval(() => {
      if (this.countdown <= 0) {
        clearInterval(intervalId);
        this.isButtonDisabled = false;
      } else {
        this.countdown--;
      }
    }, 1000); // Update every second
  }
 
  resendOtp() {
    this._AcountService.ForgetPassword(this.email).subscribe(
      response => {
        this.openAlertDialog('Success', 'OTP has been sent again , Please check your email.');
      },
      error => {
        console.error("errorrrrrrr",error);
        this.openAlertDialog('Error', `${error.error.message}`);
      }
    );
    
    // Reset the countdown timer and disable the button again
    this.isButtonDisabled = true;
    this.countdown = 60;
     this.startcountdown();
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }

}
