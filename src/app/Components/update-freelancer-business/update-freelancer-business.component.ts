import { Component, inject } from '@angular/core';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FreelancerService } from '../../Services/Freelancer/freelancer.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-freelancer-business',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-freelancer-business.component.html',
  styleUrl: './update-freelancer-business.component.css',
})
export class UpdateFreelancerBusinessComponent {
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
  updateFreelancerBusiness!: FormGroup;
  private _freelancerService = inject(FreelancerService);
  private _MatDialog = inject(MatDialog);
  private _router = inject(Router);
  private _Location = inject(Location);

  constructor() {
    this.updateFreelancerBusiness = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{5,50}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{5,300}$'),
        Validators.minLength(5),
        Validators.maxLength(300),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+?[0-9]{10,15}$'),
      ]),
      profession: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{5,50}$'),
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s.,-]{5,50}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z\\s'-]{2,50}$"),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]{2,40}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      skills: new FormArray([]),
    });

    this._freelancerService.getFreelancer().subscribe({
      next: (response) => {
        // console.log('ok', response);
        this.updateFreelancerBusiness.patchValue({
          name: response.data.name,
          description: response.data.description,
          phoneNumber: response.data.phoneNumber,
          profession: response.data.profession,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
        });
        const skillsArray = this.updateFreelancerBusiness.get(
          'skills'
        ) as FormArray;
        skillsArray.clear();
        response.data.skills.forEach((skill: string) => {
          skillsArray.push(
            new FormControl(skill, [
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9\\s]{3,50}$'),
              Validators.minLength(3),
              Validators.maxLength(50),
            ])
          );
        });
      },
      error: (error) => {
        // console.log("error",error)
        this._router.navigateByUrl('/home');
        // this.openAlertDialog('Error', error);
        // setTimeout(() => {
        // }, 3000);
      },
    });
  }

  get skills() {
    return this.updateFreelancerBusiness.get('skills') as FormArray;
  }

  addskill() {
    this.skills.push(
      new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s]{3,50}$'),
        Validators.minLength(3),
        Validators.maxLength(50),
      ])
    );
  }
  removeskill(i: number) {
    this.skills.removeAt(i);
  }

  onSubmit() {
    const phoneNumber = this.updateFreelancerBusiness.get('phoneNumber')?.value;
    // console.log('code', this.codeOfCountry);
    if (!this.codeOfCountry || this.codeOfCountry.trim() === '') {
      this.openAlertDialog('warning', 'Country code is required. Please select it from the provided options.');
      return;
    }
    if (phoneNumber.startsWith('+')) {
      this.openAlertDialog('warning', 'Please remove the country code from the phone number field and select it separately.');
      return;
    }
    
    if (this.updateFreelancerBusiness.valid) {
      // add code to phoneNumber
      if (this.codeOfCountry && this.codeOfCountry.startsWith('+')) {
        this.updateFreelancerBusiness
          .get('phoneNumber')
          ?.setValue(this.codeOfCountry + phoneNumber);
      }
      //  console.log(this.updateFreelancerBusiness)
      this._freelancerService
        .updateFreelancerBusiness(this.updateFreelancerBusiness.value)
        .subscribe({
          next: (response) => {
            console.log('API response:', response);
            this.openAlertDialog(
              'succsses',
              'your Business has been add successfuly'
            );
            setTimeout(() => {
              this._Location.back();
            }, 3000);
          },
          error: (err) => {
            this.openAlertDialog('Error', err);
            setTimeout(() => {
              this._router.navigateByUrl('/home');
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
