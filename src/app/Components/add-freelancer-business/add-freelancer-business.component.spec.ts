import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreelancerBusinessComponent } from './add-freelancer-business.component';

describe('AddFreelancerBusinessComponent', () => {
  let component: AddFreelancerBusinessComponent;
  let fixture: ComponentFixture<AddFreelancerBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFreelancerBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFreelancerBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
