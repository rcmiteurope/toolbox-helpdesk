import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityTimelineComponent } from './activity-timeline.component';
import { TimelineEvent } from '../../../main/tickets/models/ticket.model';

describe('ActivityTimelineComponent', () => {
  let component: ActivityTimelineComponent;
  let fixture: ComponentFixture<ActivityTimelineComponent>;

  const mockEvents: TimelineEvent[] = [
    {
      id: 'at1',
      ticketId: '4092',
      type: 'created',
      description: 'Ticket Created',
      detail: 'Monitoring Alert: Zabbix',
      createdAt: '2026-03-18T10:00:00Z',
      icon: 'plus',
    },
    {
      id: 'at2',
      ticketId: '4092',
      type: 'assigned',
      description: 'Assigned to SRE Team',
      detail: 'Auto-assigned: Infrastructure',
      createdAt: '2026-03-18T10:15:00Z',
      icon: 'users',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityTimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('events', mockEvents);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render timeline items', () => {
    const items = fixture.nativeElement.querySelectorAll('.timeline-item');
    expect(items.length).toBe(2);
  });

  it('should display event descriptions', () => {
    const titles = fixture.nativeElement.querySelectorAll('.timeline-title');
    expect(titles[0]?.textContent?.trim()).toBe('Ticket Created');
    expect(titles[1]?.textContent?.trim()).toBe('Assigned to SRE Team');
  });
});
