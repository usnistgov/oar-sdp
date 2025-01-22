import { TestBed } from '@angular/core/testing';

import { TaxonomyListService } from './taxonomy-list.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TaxonomyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, RouterTestingModule],
    providers: [Location, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: TaxonomyListService = TestBed.get(TaxonomyListService);
    expect(service).toBeTruthy();
  });
});
