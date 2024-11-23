import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFreelancerBusinessComponent } from './update-freelancer-business.component';

describe('UpdateFreelancerBusinessComponent', () => {
  let component: UpdateFreelancerBusinessComponent;
  let fixture: ComponentFixture<UpdateFreelancerBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFreelancerBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFreelancerBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
