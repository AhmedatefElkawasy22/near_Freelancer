import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../Services/AccountService/account.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-send-service-request',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './send-service-request.component.html',
  styleUrl: './send-service-request.component.css',
})
export class SendServiceRequestComponent implements OnInit {
  SendServiceRequest: FormGroup;
  private _AccountService = inject(AccountService);
  freelancerId: string | null = null;
  private ActivatedRoute = inject(ActivatedRoute);
  // private _router = inject(Router);
  private _Location = inject(Location);
  private dialog = inject(MatDialog);
  constructor() {
    this.SendServiceRequest = new FormGroup({
      freelancerId: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{5,50}$'),
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      price: new FormControl(0, [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{5,300}$'),
        Validators.minLength(5),
        Validators.maxLength(300),
      ]),
    });
  }
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      this.freelancerId = params.get('freelancerId');
      if (!this.freelancerId || this.freelancerId === 'null') {
        this.openAlertDialog(
          'Error',
          'Invalid Freelancer ID. Please try again.'
        );
        setTimeout(() => {
          this._Location.back();
        }, 3000);
      } else {
        if (this.freelancerId) {
          this.SendServiceRequest.get("freelancerId")?.setValue(this.freelancerId);
        }
      }
    });
  }

  onSubmit() {
    
    if (this.SendServiceRequest.valid) {
      this._AccountService
        .SendServiceRequest(this.SendServiceRequest.value)
        .subscribe({
          next: (response) => {
            // console.log('Service Request Sent Successfully:', response);
            this.openAlertDialog(
              'Success',
              'Your service request has been sent successfully'
            );
            setTimeout(() => {
              this._Location.back();
            }, 3000);
          },
          error: (error) => {
            this.openAlertDialog('Error', (error=="Bad Request"? "An error occurred, please try again." :error) );
            // console.error('Error sending Service Request:', error);
          },
        });
    } else {
      this.openAlertDialog(
        'warning',
        'Something went wrong, please try again.'
      );
    }
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
