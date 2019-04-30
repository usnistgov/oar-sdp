import { TestBed } from '@angular/core/testing';

import { RealSearchService } from './search-service.service.real';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterModule, RouterTestingModule],
    providers: [Location]
  }));

  it('should be created', () => {
    const service: RealSearchService = TestBed.get(RealSearchService);
    expect(service).toBeTruthy();
  });
});
