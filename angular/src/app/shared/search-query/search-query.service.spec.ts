import { TestBed } from '@angular/core/testing';

import { SearchQueryService } from './search-query.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SearchQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: SearchQueryService = TestBed.get(SearchQueryService);
    expect(service).toBeTruthy();
  });
});
