import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleAnalyticsService } from './shared/ga-service/google-analytics.service'
import { GoogleAnalyticsServiceMock } from "./shared/ga-service/google-analytics.service.mock";
import { ToastrModule } from 'ngx-toastr';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [Location, {provide: GoogleAnalyticsService, useClass: GoogleAnalyticsServiceMock}],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
