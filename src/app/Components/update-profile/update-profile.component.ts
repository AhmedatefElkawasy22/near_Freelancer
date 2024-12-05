import { Component, inject, NgModule } from '@angular/core';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { FormControl, FormGroup,    FormsModule,    ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Services/AccountService/account.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf,Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,CommonModule,FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  countryCodes = [
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Egypt', code: '+20' },
    { name: 'Germany', code: '+49' },
    { name: 'India', code: '+91' },
    { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' },
    { name: 'France', code: '+33' },
    { name: 'Italy', code: '+39' },
    { name: 'Spain', code: '+34' },
    { name: 'Netherlands', code: '+31' },
    { name: 'Brazil', code: '+55' },
    { name: 'Russia', code: '+7' },
    { name: 'South Africa', code: '+27' },
    { name: 'Japan', code: '+81' },
    { name: 'China', code: '+86' },
    { name: 'Mexico', code: '+52' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Turkey', code: '+90' },
    { name: 'Sweden', code: '+46' },
    { name: 'Norway', code: '+47' },
    { name: 'Finland', code: '+358' },
    { name: 'Denmark', code: '+45' },
    { name: 'Belgium', code: '+32' },
    { name: 'Austria', code: '+43' },
    { name: 'Switzerland', code: '+41' },
    { name: 'New Zealand', code: '+64' },
    { name: 'Singapore', code: '+65' },
    { name: 'Hong Kong', code: '+852' },
    { name: 'Philippines', code: '+63' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Thailand', code: '+66' },
    { name: 'Vietnam', code: '+84' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Iran', code: '+98' },
    { name: 'Iraq', code: '+964' },
    { name: 'Egypt', code: '+20' },
    { name: 'Jordan', code: '+962' },
    { name: 'Qatar', code: '+974' },
    { name: 'UAE', code: '+971' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Oman', code: '+968' },
    { name: 'Lebanon', code: '+961' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Ukraine', code: '+380' },
    { name: 'Serbia', code: '+381' },
    { name: 'Croatia', code: '+385' },
    { name: 'Slovenia', code: '+386' },
    { name: 'Slovakia', code: '+421' },
    { name: 'Czech Republic', code: '+420' },
    { name: 'Hungary', code: '+36' },
    { name: 'Estonia', code: '+372' },
    { name: 'Latvia', code: '+371' },
    { name: 'Lithuania', code: '+370' },
    { name: 'Iceland', code: '+354' },
    { name: 'Malta', code: '+356' },
    { name: 'Cyprus', code: '+357' },
    { name: 'Georgia', code: '+995' },
    { name: 'Armenia', code: '+374' },
    { name: 'Azerbaijan', code: '+994' },
    { name: 'Bosnia and Herzegovina', code: '+387' },
    { name: 'Macedonia', code: '+389' },
    { name: 'Albania', code: '+355' },
    { name: 'Moldova', code: '+373' },
    { name: 'Belarus', code: '+375' },
    { name: 'Kazakhstan', code: '+7' },
    { name: 'Uzbekistan', code: '+998' },
    { name: 'Tajikistan', code: '+992' },
    { name: 'Kyrgyzstan', code: '+996' },
    { name: 'Turkmenistan', code: '+993' },
    { name: 'Afghanistan', code: '+93' },
    { name: 'Mongolia', code: '+976' },
    { name: 'South Korea', code: '+82' },
    { name: 'Taiwan', code: '+886' },
    { name: 'Macau', code: '+853' },
    { name: 'Brunei', code: '+673' },
    { name: 'Laos', code: '+856' },
    { name: 'Cambodia', code: '+855' },
    { name: 'Myanmar', code: '+95' },
    { name: 'Nepal', code: '+977' },
    { name: 'Bhutan', code: '+975' },
    { name: 'Maldives', code: '+960' },
    { name: 'Zimbabwe', code: '+263' },
    { name: 'Kenya', code: '+254' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Ghana', code: '+233' },
    { name: 'Uganda', code: '+256' },
    { name: 'Tanzania', code: '+255' },
    { name: 'Rwanda', code: '+250' },
    { name: 'Sudan', code: '+249' },
    { name: 'Angola', code: '+244' },
    { name: 'Namibia', code: '+264' },
    { name: 'Zambia', code: '+260' },
    { name: 'Botswana', code: '+267' },
    { name: 'Congo', code: '+243' },
    { name: 'Ivory Coast', code: '+225' },
    { name: 'Senegal', code: '+221' },
    { name: 'Cameroon', code: '+237' },
    { name: 'Togo', code: '+228' },
    { name: 'Burkina Faso', code: '+226' },
    { name: 'Mali', code: '+223' },
    { name: 'Niger', code: '+227' },
    { name: 'Chad', code: '+235' },
    { name: 'Somalia', code: '+252' },
  ];

  codeOfCountry!: string;
  updateProfile!: FormGroup;
  private _AccountService = inject(AccountService);
  private _MatDialog = inject(MatDialog);
  private _router = inject(Router);
  private _Location = inject(Location);

  constructor() {
    this.updateProfile = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{3,50}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s.,-]{3,50}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z\\s'-]{3,50}$"),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]{3,40}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    });
    // Call the API to get data
    this._AccountService.getCustomerInfo().subscribe({
      next: (response) => {
        // console.log('ok', response);
        this.updateProfile.patchValue({
          name: response.data.name,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
        });
      },
      error: (error) => {
        // console.log("error",error)
        this._Location.back();
        setTimeout(() => {
          this.openAlertDialog('Error', "An error occurred, please try again.");
        }, 3000);
      },
    });
  }

  onSubmit() {
    if (this.updateProfile.valid) {
      this._AccountService
        .UpdateProfile(this.updateProfile.value)
        .subscribe({
          next: (response) => {
            // console.log('ok', response);
            this.openAlertDialog('Success', 'Profile updated successfully.');
            setTimeout(() => {
              this._Location.back();
            }, 3000);
          },
          error: (error) => {
            // console.log("error",error)
            this.openAlertDialog('Error', "An error occurred, please try again.");
            setTimeout(() => {
              this._Location.back();
            }, 3000);
          },
        });
    }
  }

  openAlertDialog(title: string, message: string) {
    this._MatDialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
