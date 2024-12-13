import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferedServiceComponent } from './add-offered-service.component';

describe('AddOfferedServiceComponent', () => {
  let component: AddOfferedServiceComponent;
  let fixture: ComponentFixture<AddOfferedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfferedServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfferedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
