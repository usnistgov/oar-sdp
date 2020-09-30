import { TestBed } from '@angular/core/testing';

import { SearchQueryService } from './search-query.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('SearchQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, ToastrModule.forRoot()]
  }));

  it('should be created', () => {
    const service: SearchQueryService = TestBed.get(SearchQueryService);
    expect(service).toBeTruthy();
  });
});
