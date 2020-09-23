import { Observable } from 'rxjs';
import { SDPQuery } from '../search-query/query';

export const SEARCH_SERVICE = 'SEARCH_SERVICE';
export interface SearchService {
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(query: SDPQuery, searchTaxonomyKey: string, queryAdvSearch?: string): Observable<any>;
  
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhraseTest(searchValue: string, searchTaxonomyKey: string, queryAdvSearch?: string): Observable<any>;

  _watchQueryValue(subscriber);

  search(searchValue: string, url?: string) : void;

  setQueryValue(queryString: string, searchTaxonomyKey: string, queryAdvSearch?: string): void;
}

