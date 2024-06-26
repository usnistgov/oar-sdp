import { TestBed } from '@angular/core/testing';

import { NameListService } from './name-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NameListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: NameListService = TestBed.get(NameListService);
    expect(service).toBeTruthy();
  });
});
