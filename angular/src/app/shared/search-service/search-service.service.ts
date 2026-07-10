import { Observable } from 'rxjs';
import { SDPQuery } from '../search-query/query';

export type ProductTypeKey = "data" | "code" | "patents" | "papers";
export interface ProductTypeState {
  data: boolean;
  code: boolean;
  patents: boolean;
  papers: boolean;
}
export type ProductProgressStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";
export interface ProductProgressState {
  key: ProductTypeKey;
  status: ProductProgressStatus;
  progress: number; // 0-100
  active: boolean;
  error?: string;
  updatedAt: number;
}
export interface SearchProgressState {
  requestId: number;
  inFlight: boolean;
  globalProgress: number; // 0-100
  activeProducts: ProductTypeKey[];
  completedProducts: ProductTypeKey[];
  failedProducts: ProductTypeKey[];
  products: Record<ProductTypeKey, ProductProgressState>;
}
export interface SearchPhraseOptions {
  forceData?: boolean;
}
export const DEFAULT_PRODUCT_TYPES: ProductTypeState = {
  data: true,
  code: true,
  patents: false,
  papers: false,
};

export const SEARCH_SERVICE = 'SEARCH_SERVICE';
export interface SearchService {
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(
    query: SDPQuery,
    searchTaxonomyKey: string,
    queryAdvSearch?: string,
    page?: number,
    pageSize?: number,
    sortOrder?:string,
    filter?:string,
    options?: SearchPhraseOptions
  ): Observable<any>;
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
   * Watch the most recent full search response (results + Facets from backend).
   * Emits after every successful searchPhrase() call.
   */
  watchSearchResponse(): Observable<any>;

  /**
   * Toggle and watch whether external products (code, patents, papers) are included in searches.
   */
  setExternalProducts(enabled: boolean): void;
  watchExternalProducts(): Observable<boolean>;

  /**
   * Watch progress for the current search request, including per-product and global status.
   */
  watchSearchProgress(): Observable<SearchProgressState>;

  /**
   * Watch and control the active product categories included in search (data/code/papers/patents).
   */
  watchProductTypes(): Observable<ProductTypeState>;
  setProductTypes(state: Partial<ProductTypeState>): void;
  setProductTypeEnabled(type: ProductTypeKey, enabled: boolean): void;
  /**
   * Returns the list of product type keys that will be queried, factoring in the external toggle.
   */
  getActiveProductTypes(): ProductTypeKey[];
}
