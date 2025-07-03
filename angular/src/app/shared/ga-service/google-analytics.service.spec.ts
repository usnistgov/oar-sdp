import { TestBed, inject } from '@angular/core/testing';

import { GoogleAnalyticsService } from './google-analytics.service';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GoogleAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterModule, RouterTestingModule],
    providers: [GoogleAnalyticsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should be created', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);

    expect(service).toBeTruthy();
  });
});
