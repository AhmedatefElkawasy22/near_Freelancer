import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-send-service-request',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './send-service-request.component.html',
  styleUrl: './send-service-request.component.css',
})
export class SendServiceRequestComponent {
  SendServiceRequest: FormGroup;
  private _AccountService = inject(AccountService);
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

  onSubmit() {
    //get fleelancerId from URL
    if (this.SendServiceRequest.valid) {
      this._AccountService.SendServiceRequest(this.SendServiceRequest).subscribe({
          next: (response) => {
          console.log('Service Request Sent Successfully:', response);
            setTimeout(() => {
              // navigate
            }, 3000);
          },
          error: (error) => {
            console.error('Error sending Service Request:', error);
          },
        });
    }
  }
}
