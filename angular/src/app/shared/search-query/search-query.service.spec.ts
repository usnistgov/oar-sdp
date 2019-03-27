import { TestBed } from '@angular/core/testing';

import { SearchQueryService } from './search-query.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SearchQueryService = TestBed.get(SearchQueryService);
    expect(service).toBeTruthy();
  });
});
