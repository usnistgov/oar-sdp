import { TestBed } from '@angular/core/testing';

import { NameListService } from './name-list.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NameListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: NameListService = TestBed.get(NameListService);
    expect(service).toBeTruthy();
  });
});
