import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FreelancerService } from '../../Services/Freelancer/freelancer.service';

import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-offered-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-offered-service.component.html',
  styleUrl: './add-offered-service.component.css',
})
export class AddOfferedServiceComponent {
  addServiceFG!: FormGroup;
  private _freelancerService = inject(FreelancerService);
  previewImage: string | ArrayBuffer | null = null;
  private dialog = inject(MatDialog);
  private _Location = inject(Location);


  constructor() {
    this.addServiceFG = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{2,50}$'),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.,!? ]{2,250}$'),
        Validators.minLength(2),
        Validators.maxLength(250),
      ]),
      image: new FormControl([null]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{1,6}(\\.[0-9]{1,2})?$'),
      ]),
      isAvailable: new FormControl(true),
    });
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.addServiceFG.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.addServiceFG && this.addServiceFG.valid) {
      this._freelancerService
        .addOfferedService(this.addServiceFG.value)
        .subscribe({
          next: (response) => {
            // console.log('Service Request Sent Successfully:', response);
            this.openAlertDialog(
              'Success',
              'Your service has been added successfully'
            );
            setTimeout(() => {
              this._Location.back();
            }, 3000);
          },
          error: (error) => {
            this.openAlertDialog('Error', (error=="Bad Request"? "An error occurred, please try again." :error) );
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
