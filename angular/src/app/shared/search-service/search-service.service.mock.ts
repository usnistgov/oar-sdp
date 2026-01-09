import { Injectable } from "@angular/core";
// import { URLSearchParams } from '@angular/common/http';
import { HttpClient, HttpRequest, HttpParams } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import * as rxjsop from "rxjs/operators";
import { EMPTY } from "rxjs";
import * as _ from "lodash-es";
import { AppConfig, Config } from "../config-service/config.service";
import {
  SearchService,
  ProductTypeState,
  ProductTypeKey,
  DEFAULT_PRODUCT_TYPES,
} from "./search-service.service";
import { Router, NavigationExtras } from "@angular/router";
import { SDPQuery } from "../search-query/query";

@Injectable({
  providedIn: "root",
})
export class MockSearchService implements SearchService {
  private pageSize = new BehaviorSubject<number>(10);
  filterString = new BehaviorSubject<string>("");
  currentPage = new BehaviorSubject<number>(1);
  totalItems = new BehaviorSubject<number>(1);
  private externalProducts = new BehaviorSubject<boolean>(false);
  private lastSearchResponse$ = new BehaviorSubject<any>(null);
  private productTypes = new BehaviorSubject<ProductTypeState>({
    ...DEFAULT_PRODUCT_TYPES,
  });

  /**
   * Creates a new SearchService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private appConfig: AppConfig
  ) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(
    query: SDPQuery,
    searchTaxonomyKey: string,
    queryAdvSearch: string,
    page?: number,
    pageSize?: number,
    sortOrder?: string,
    filter?: string
  ): Observable<any> {
    const empty = { ResultData: [], ResultCount: 0, total: 0 };
    this.lastSearchResponse$.next(empty);
    return of(empty);
  }

  /**
   * Watch total items
   */
  watchTotalItems(): Observable<any> {
    return this.totalItems.asObservable();
  }

  /**
   * Set curent page
   **/
  setTotalItems(totalItems: number) {
    this.totalItems.next(totalItems);
  }

  /**
   * Watch current page
   */
  watchCurrentPage(): Observable<any> {
    return this.currentPage.asObservable();
  }

  /**
   * Set curent page
   **/
  setCurrentPage(page: number) {
    this.currentPage.next(page);
  }

  /**
   * Watch the filter string
   */
  watchFilterString(): Observable<any> {
    return this.filterString.asObservable();
  }

  /**
   * Set the filter string
   **/
  setFilterString(filterString: string) {
    this.filterString.next(filterString);
  }

  //   simpleSearch(page: number, pageSize: number, sortOrder:string): Observable<any> {
  //     return of({ ResultData: [], total: 0 });
  //   }
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhraseTest(
    searchValue: string,
    searchTaxonomyKey: string,
    queryAdvSearch: string
  ): Observable<any> {
    // url is relative until we're ready to submit
    let url = "records?";
    let params = new HttpParams();

    if (queryAdvSearch === "yes" && !_.includes(searchValue, "searchphrase")) {
      url += searchValue;
    } else {
      params.set("searchphrase", searchValue);
      params.set("topic.tag", searchTaxonomyKey);
    }

    return this.appConfig.getConfig().pipe(
      rxjsop.mergeMap((conf) => {
        return this.http.get(conf.RMMAPI + url, { params: params });
      }),
      rxjsop.catchError((err) => {
        console.error("Failed to complete search: " + JSON.stringify(err));
        return throwError(err);
      })
    );
  }

  /**
   * Set/watch the search value in the search text box
   */
  private _remoteQueryValue: BehaviorSubject<object> =
    new BehaviorSubject<object>({
      queryString: "",
      searchTaxonomyKey: "",
      queryAdvSearch: "yes",
    });

  public _watchQueryValue(subscriber) {
    this._remoteQueryValue.subscribe(subscriber);
  }

  public setQueryValue(
    queryString: string = "",
    searchTaxonomyKey: string = "",
    queryAdvSearch: string = "yes"
  ) {
    this._remoteQueryValue.next({
      queryString: queryString,
      searchTaxonomyKey: searchTaxonomyKey,
      queryAdvSearch: queryAdvSearch,
    });
  }

  /**
   * Start search
   */
  public search(searchValue: string, url?: string): void {
    // Reset filters when starting a new search (avoid stale filters in SPA navigation).
    this.setFilterString("NoFilter");
    let params: NavigationExtras = {
      queryParams: {
        q: searchValue,
      },
    };
    const activeProducts = this.getActiveProductTypes();
    if (activeProducts.length) {
      params.queryParams["products"] = activeProducts.join(",");
    }
    if (this.externalProducts.getValue()) {
      params.queryParams["external"] = "true";
    }

    this.router.navigate(["/search"], params);
  }

  /**
   * Watch page size
   */
  watchPageSize(): Observable<any> {
    return this.pageSize.asObservable();
  }
  
  /**
   * Set page size
   */
  setPageSize(size: number): void {
    this.pageSize.next(size);
  }

  watchSearchResponse(): Observable<any> {
    return this.lastSearchResponse$.asObservable();
  }

  fetchAllForFacetCounts(query: SDPQuery, searchTaxonomyKey: string, maxSize: number, filter?: string): Observable<any> {
    // For mock just reuse sample result
    return of({ ResultData: [], ResultCount: 0, total: 0 });
  }

  setExternalProducts(enabled: boolean): void {
    this.externalProducts.next(!!enabled);
  }

  watchExternalProducts(): Observable<boolean> {
    return this.externalProducts.asObservable();
  }

  watchProductTypes(): Observable<ProductTypeState> {
    return this.productTypes.asObservable();
  }

  setProductTypes(state: Partial<ProductTypeState>): void {
    const next = { ...this.productTypes.getValue(), ...state };
    this.productTypes.next(next);
  }

  setProductTypeEnabled(type: ProductTypeKey, enabled: boolean): void {
    const current = this.productTypes.getValue();
    if (!(type in current)) return;
    this.productTypes.next({ ...current, [type]: !!enabled });
  }

  getActiveProductTypes(): ProductTypeKey[] {
    const state = this.productTypes.getValue();
    const active: ProductTypeKey[] = [];
    if (state.data !== false) active.push("data");
    if (this.externalProducts.getValue()) {
      if (state.code) active.push("code");
      if (state.papers) active.push("papers");
      if (state.patents) active.push("patents");
    }
    return active;
  }
}
