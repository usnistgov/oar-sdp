import { TestBed } from '@angular/core/testing';
import { RealSearchService } from './search-service.service.real';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppConfig } from '../config-service/config.service';
import { SDPQuery } from '../search-query/query';
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

  it('should combine primary and patent results with normalized patent entry', () => {
    const service: any = TestBed.inject(RealSearchService);
    const merged = service.combineResults(
      { ResultData: [], ResultCount: 0 },
      { ResultData: [], ResultCount: 0 },
      {
        ResultData: [{
          title: 'Laser Spectrometer',
          abstract: 'A compact laser',
          patentNumber: 'US123',
          assignee: 'NIST',
          url: 'http://patents.test/US123',
          keywords: ['laser', 'spectroscopy']
        }],
        ResultCount: 1
      }
    );
    expect(merged.ResultCount).toBe(1);
    expect(merged.total).toBe(1);
    expect(merged.ResultData.length).toBe(1);
    const patent = merged.ResultData[0];
    expect(patent.external).toBe(true);
    expect(patent.source).toBe('patents');
    expect(patent.title).toBe('Laser Spectrometer');
    expect(patent.description).toBe('A compact laser');
    expect(patent['@type']).toContain('Patent');
    expect(patent.keyword).toContain('laser');
    expect(patent.contactPoint.fn).toBe('NIST');
    expect(patent.landingPage).toBe('http://patents.test/US123');
  });

  it('should combine primary and paper results and normalize the paper entry', () => {
    const service: any = TestBed.inject(RealSearchService);
    const paperRecord = {
      title: 'Quantum Metrology Advances',
      abstract: 'A review of quantum sensing methods',
      doi: '10.1234/example.doi',
      authors: ['NIST Quantum Group'],
      keywords: ['Quantum', 'Metrology']
    };
    const merged = service.combineResults(
      { ResultData: [], ResultCount: 0 },
      { ResultData: [], ResultCount: 0 },
      { ResultData: [], ResultCount: 0 },
      { ResultData: [paperRecord], ResultCount: 1 }
    );
    expect(merged.ResultCount).toBe(1);
    expect(merged.total).toBe(1);
    expect(merged.ResultData.length).toBe(1);
    const paper = merged.ResultData[0];
    expect(paper.external).toBe(true);
    expect(paper.source).toBe('papers');
    expect(paper['@type']).toContain('Paper');
    expect(paper.title).toBe('Quantum Metrology Advances');
    expect(paper.description).toBe('A review of quantum sensing methods');
    expect(paper.landingPage).toBe('https://doi.org/10.1234/example.doi');
    expect(paper.keyword).toContain('quantum');
    expect(paper.contactPoint.fn).toBe('NIST Quantum Group');
  });

  it('should merge external /facets into the combined response Facets', () => {
    const service: any = TestBed.inject(RealSearchService);
    const merged = service.combineResults(
      {
        ResultData: [{ ediid: '123', title: 'Primary' }],
        ResultCount: 1,
        Facets: {
          topics: [{ tag: 'Physics', count: 4 }],
          resourceTypes: [
            { type: 'nrdp:PublicDataResource', count: 1 },
            { type: 'Paper', count: 200 },
          ],
          components: [{ type: 'nrdp:DataFile', count: 1 }],
          authors: [{ name: 'Zed Author', count: 1 }],
          keywords: [{ keyword: 'optics', count: 2 }],
        },
      },
      { ResultData: [], ResultCount: 0 },
      { ResultData: [], ResultCount: 0 },
      { ResultData: [], ResultCount: 0 },
      undefined,
      {
        Facets: {
          topics: [
            { tag: 'Physics', count: 30 },
            { tag: 'Polymers', count: 23 },
          ],
          resourceTypes: [{ type: 'Paper', count: 230 }],
          components: [],
          authors: [{ name: 'Ann Author', count: 2 }],
          keywords: [{ keyword: 'star polymers', count: 9 }],
        },
      }
    );
    const facets = merged.Facets;
    // Topics from disjoint corpora are summed and sorted by count desc
    expect(facets.topics[0]).toEqual({ tag: 'Physics', count: 34 });
    expect(facets.topics[1]).toEqual({ tag: 'Polymers', count: 23 });
    // Duplicate resourceTypes keep the larger count instead of double-counting
    expect(facets.resourceTypes).toEqual(
      expect.arrayContaining([
        { type: 'Paper', count: 230 },
        { type: 'nrdp:PublicDataResource', count: 1 },
      ])
    );
    expect(facets.resourceTypes.filter((rt: any) => rt.type === 'Paper').length).toBe(1);
    // Keywords merged and sorted by count desc; authors alphabetical
    expect(facets.keywords[0]).toEqual({ keyword: 'star polymers', count: 9 });
    expect(facets.authors.map((a: any) => a.name)).toEqual(['Ann Author', 'Zed Author']);
    // Components preserved from the data backend
    expect(facets.components).toEqual([{ type: 'nrdp:DataFile', count: 1 }]);
  });

  it('should surface external facets when no data facets are present (papers-only)', () => {
    const service: any = TestBed.inject(RealSearchService);
    const merged = service.combineResults(
      { ResultData: [], ResultCount: 0, total: 0 },
      { ResultData: [], ResultCount: 0 },
      { ResultData: [], ResultCount: 0 },
      { ResultData: [{ title: 'A Paper' }], ResultCount: 1 },
      undefined,
      {
        Facets: {
          topics: [{ tag: 'Materials', count: 14 }],
          resourceTypes: [{ type: 'Paper', count: 230 }],
          components: [],
          authors: [],
          keywords: [{ keyword: 'star polymers', count: 9 }],
        },
      }
    );
    expect(merged.Facets.topics).toEqual([{ tag: 'Materials', count: 14 }]);
    expect(merged.Facets.resourceTypes).toEqual([{ type: 'Paper', count: 230 }]);
    expect(merged.Facets.keywords).toEqual([{ keyword: 'star polymers', count: 9 }]);
  });

  it('should flag FacetsPending until every expected facet source arrives', () => {
    const service: any = TestBed.inject(RealSearchService);
    const httpMock = TestBed.inject(HttpTestingController);
    service.setExternalProducts(true);
    service.setProductTypes({ data: false, code: false, papers: true, patents: false });

    const query = new SDPQuery();
    query.freeText = 'star';

    const emissions: any[] = [];
    service.searchPhrase(query, '', 'no', 1, 10).subscribe((r: any) => emissions.push(r));

    const papersReq = httpMock.expectOne((req) => req.url.includes('papers?'));
    const facetsReq = httpMock.expectOne((req) => req.url.includes('facets?'));

    // Results arrive before the facet aggregation: panel must stay loading
    papersReq.flush({ ResultData: [{ title: 'A Paper' }], ResultCount: 1 });
    expect(emissions.length).toBeGreaterThan(0);
    expect(emissions[emissions.length - 1].FacetsPending).toBe(true);

    facetsReq.flush({
      Facets: { topics: [{ tag: 'Materials', count: 14 }], resourceTypes: [], components: [], authors: [], keywords: [] },
    });
    const last = emissions[emissions.length - 1];
    expect(last.FacetsPending).toBe(false);
    expect(last.Facets.topics).toEqual([{ tag: 'Materials', count: 14 }]);
    httpMock.verify();
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
