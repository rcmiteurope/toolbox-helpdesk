import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetailsPanelComponent } from './customer-details-panel.component';

describe('CustomerDetailsPanelComponent', () => {
  let component: CustomerDetailsPanelComponent;
  let fixture: ComponentFixture<CustomerDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('customer', {
      name: 'Alex Smith',
      email: 'alex@test.com',
      role: 'Software Engineer',
      avatar: null,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display customer name and role', () => {
    const name = fixture.nativeElement.querySelector('.customer-name');
    const role = fixture.nativeElement.querySelector('.customer-role');
    expect(name?.textContent?.trim()).toBe('Alex Smith');
    expect(role?.textContent?.trim()).toBe('Software Engineer');
  });
});
