import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponTrackingComponent } from './coupon-tracking.component';

describe('CouponTrackingComponent', () => {
  let component: CouponTrackingComponent;
  let fixture: ComponentFixture<CouponTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
