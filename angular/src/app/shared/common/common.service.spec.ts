import { TestBed, inject } from '@angular/core/testing';

import { CommonService } from './common.service';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterModule, RouterTestingModule],
    providers: [CommonService, GoogleAnalyticsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should be created', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
