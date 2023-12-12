import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerImgComponent } from './customer-img.component';

describe('CustomerImgComponent', () => {
  let component: CustomerImgComponent;
  let fixture: ComponentFixture<CustomerImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerImgComponent]
    });
    fixture = TestBed.createComponent(CustomerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
