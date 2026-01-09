import { TestBed } from '@angular/core/testing';
import { RealSearchService } from './search-service.service.real';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppConfig } from '../config-service/config.service';
import { of } from 'rxjs';

describe('SearchService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      providers: [
        Location,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: AppConfig,
          useValue: {
            getConfig: () =>
              of({
                RMMAPI: 'http://example.test/',
                PDRAPI: 'http://pdr.test/',
              }),
          },
        },
      ],
    })
  );

  it('should be created', () => {
    const service = TestBed.inject(RealSearchService);
    expect(service).toBeTruthy();
  });

  it('should expose external products toggle state', (done) => {
    const service = TestBed.inject(RealSearchService);
    const seen: boolean[] = [];
    const sub = service.watchExternalProducts().subscribe((v) => {
      seen.push(v);
      if (seen.length === 2) {
        expect(seen[0]).toBe(false);
        expect(seen[1]).toBe(true);
        sub.unsubscribe();
        done();
      }
    });
    service.setExternalProducts(true);
  });

  it('should combine primary and external results with normalized code entry', () => {
    const service: any = TestBed.inject(RealSearchService);
    const merged = service.combineResults(
      { ResultData: [{ ediid: '123', title: 'Primary' }], ResultCount: 1 },
      { ResultData: [{
        name: 'RepoOne',
        repositoryURL: 'http://git.test/repo',
        tags: ['science'],
        languages: ['Python'],
        organization: 'NIST DevOps',
        contact: { email: 'dev@example.com' }
      }], ResultCount: 5 }
    );
    expect(merged.ResultCount).toBe(6);
    expect(merged.total).toBe(6);
    expect(merged.ResultData.length).toBe(2);
    const external = merged.ResultData[1];
    expect(external.external).toBe(true);
    expect(external.title).toBe('RepoOne');
    expect(external['@type']).toContain('CodeRepository');
    expect(external.keyword).toContain('science');
    expect(external.contactPoint.fn).toBe('NIST DevOps');
    // Keywords are normalized to lowercase
    expect(external.keyword).toContain('python');
  });

  it('should honor product type toggles when computing active products', () => {
    const service = TestBed.inject(RealSearchService);
    service.setProductTypes({ data: true, code: true });
    service.setExternalProducts(false);
    expect(service.getActiveProductTypes()).toEqual(['data']);
    service.setExternalProducts(true);
    expect(service.getActiveProductTypes()).toEqual(
      expect.arrayContaining(['data', 'code'])
    );
    service.setProductTypeEnabled('code', false);
    expect(service.getActiveProductTypes()).not.toContain('code');
  });
});
