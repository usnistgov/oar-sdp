import { TestBed } from '@angular/core/testing';

import { RealSearchService } from './search-service.service.real';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, RouterTestingModule],
    providers: [Location, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: RealSearchService = TestBed.get(RealSearchService);
    expect(service).toBeTruthy();
  });
});
