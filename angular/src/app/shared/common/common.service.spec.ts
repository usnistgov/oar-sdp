import { TestBed, inject } from '@angular/core/testing';

import { CommonService } from './common.service';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule, RouterTestingModule],
      providers: [CommonService, GoogleAnalyticsService]
    });
  });

  it('should be created', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
