import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickToolsGridComponent, QuickTool } from './quick-tools-grid.component';

describe('QuickToolsGridComponent', () => {
  let component: QuickToolsGridComponent;
  let fixture: ComponentFixture<QuickToolsGridComponent>;

  const mockTools: QuickTool[] = [
    { label: 'History', icon: 'pi pi-history' },
    { label: 'Call', icon: 'pi pi-phone' },
    { label: 'Email', icon: 'pi pi-envelope' },
    { label: 'Share', icon: 'pi pi-share-alt' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickToolsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickToolsGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tools', mockTools);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 tool buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.tool-btn');
    expect(buttons.length).toBe(4);
  });
});
