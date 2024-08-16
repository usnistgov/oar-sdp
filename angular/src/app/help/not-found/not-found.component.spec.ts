import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpPageNotFoundComponent } from './not-found.component';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HelpPageNotFoundComponent', () => {
  let component: HelpPageNotFoundComponent;
  let fixture: ComponentFixture<HelpPageNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [ HelpPageNotFoundComponent ],
      providers: [GoogleAnalyticsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
