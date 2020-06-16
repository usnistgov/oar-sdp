import { TestBed, inject } from '@angular/core/testing';

import { AdvSearchService } from './adv-search.service';

describe('AdvSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvSearchService]
    });
  });

  it('should be created', inject([AdvSearchService], (service: AdvSearchService) => {
    expect(service).toBeTruthy();
  }));
});
