import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResolutionTabComponent } from './resolution-tab.component';

describe('ResolutionTabComponent', () => {
  let component: ResolutionTabComponent;
  let fixture: ComponentFixture<ResolutionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolutionTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResolutionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
