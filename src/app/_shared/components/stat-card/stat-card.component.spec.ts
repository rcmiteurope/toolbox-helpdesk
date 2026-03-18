import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Open Tickets');
    fixture.componentRef.setInput('value', 124);
    fixture.componentRef.setInput('change', 12);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label and value', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('.stat-label')?.textContent?.trim()).toBe('Open Tickets');
    expect(el.querySelector('.stat-value')?.textContent?.trim()).toBe('124');
  });

  it('should display positive change', () => {
    const change = fixture.nativeElement.querySelector('.stat-change');
    expect(change?.textContent?.trim()).toBe('+12%');
    expect(change?.classList.contains('positive')).toBe(true);
  });
});
