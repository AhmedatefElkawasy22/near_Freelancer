import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendServiceRequestComponent } from './send-service-request.component';

describe('SendServiceRequestComponent', () => {
  let component: SendServiceRequestComponent;
  let fixture: ComponentFixture<SendServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendServiceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
