import { Observable } from 'rxjs';

export const SEARCH_SERVICE = 'SEARCH_SERVICE';
export interface SearchService {
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string): Observable<any>;
  
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhraseTest(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string): Observable<any>;

  _watchQueryValue(subscriber);
  _watchRemoteStart(subscriber);

  startSearching(startSearch: boolean) : void;

  setQueryValue(queryString: string, searchTaxonomyKey: string, queryAdvSearch: string): void;
}

