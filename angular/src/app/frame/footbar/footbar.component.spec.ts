import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootbarComponent } from './footbar.component';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FootbarComponent', () => {
  let component: FootbarComponent;
  let fixture: ComponentFixture<FootbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [ FootbarComponent ],
      providers: [GoogleAnalyticsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
