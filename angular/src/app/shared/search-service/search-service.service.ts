import { Observable } from 'rxjs';
import { SDPQuery } from '../search-query/query';

export const SEARCH_SERVICE = 'SEARCH_SERVICE';
export interface SearchService {
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(query: SDPQuery, searchTaxonomyKey: string, queryAdvSearch?: string, page?: number, pageSize?: number, sortOrder?:string, filter?:string): Observable<any>;
//   simpleSearch(page: number, pageSize: number, sortOrder:string): Observable<any>;

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhraseTest(searchValue: string, searchTaxonomyKey: string, queryAdvSearch?: string): Observable<any>;

  _watchQueryValue(subscriber);

  search(searchValue: string, url?: string) : void;

  setQueryValue(queryString: string, searchTaxonomyKey: string, queryAdvSearch?: string): void;

  watchFilterString():Observable<any>;
  setFilterString(filterString: string);
  watchCurrentPage():Observable<any>;
  setCurrentPage(page: number);
  watchTotalItems():Observable<any>;
  setTotalItems(page: number);

  watchPageSize(): Observable<any>;
  setPageSize(pageSize: number);

  /**
   * Watch the most recent full search response (results + facets if provided by backend).
   * Implementations should emit after every successful searchPhrase() call.
   */
  watchSearchResponse(): Observable<any>;

  /**
   * Fetch a larger (capped) result set with only minimal fields to compute global facet counts.
   * Implementations should limit size to a safe cap to avoid huge payloads.
   */
  fetchAllForFacetCounts(query: SDPQuery, searchTaxonomyKey: string, maxSize: number, filter?: string): Observable<any>;
}

