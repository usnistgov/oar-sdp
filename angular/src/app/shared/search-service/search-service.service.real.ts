import { Injectable } from "@angular/core";
// import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpRequest, HttpParams } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject, forkJoin } from "rxjs";
import * as rxjsop from "rxjs/operators";
import { EMPTY } from "rxjs";
import * as _ from "lodash-es";
import { AppConfig, Config } from "../config-service/config.service";
import { SearchService } from "./search-service.service";
import { Router, NavigationExtras } from "@angular/router";
import { SDPQuery } from "../search-query/query";

/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable({
  providedIn: "root",
})
export class RealSearchService implements SearchService {
  private pageSize = new BehaviorSubject<number>(10); // Default to 10 items per page
  private lastSearchResponse$ = new BehaviorSubject<any>(null); // broadcast unified response
  private externalProducts = new BehaviorSubject<boolean>(false);
  private readonly externalPrefKey = "sdpExternalProducts";

  operators = {
    AND: "logicalOp=AND",
    OR: "logicalOp=OR",
    NOT: "logicalOp=NOT",
  };

  filterString = new BehaviorSubject<string>("");
  currentPage = new BehaviorSubject<number>(1);
  totalItems = new BehaviorSubject<number>(1);

  /**
   * Creates a new SearchService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private appConfig: AppConfig
  ) {
    this.externalProducts.next(this.readExternalPref());
  }

  /**
   * Watch total items (search result)
   */
  watchTotalItems(): Observable<any> {
    return this.totalItems.asObservable();
  }

  /**
   * Set total items (search result)
   * @param page
   */
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
   * @param page
   */
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
   * @param filterString
   */
  setFilterString(filterString: string) {
    this.filterString.next(filterString);
  }

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
    sortOrder?: string,
    filter?: string
  ): Observable<any> {
    let url: string;
    let externalUrl: string | null = null;
    const itemsPerPage = pageSize || this.pageSize.getValue();
    const includeExternal = this.externalProducts.getValue();
    const rows = Array.isArray(query.queryRows) ? query.queryRows : [];

    if (rows[0]?.fieldValue == "isPartOf.@id") {
      url =
        "/rmm/records?" +
        rows[0].fieldValue +
        "=" +
        rows[0].fieldText;
    } else {
      let searchPhraseValue = "";
      let finalKeyValueStr = "";

      if (
        query.freeText != null &&
        query.freeText != undefined &&
        query.freeText.trim() != ""
      ) {
        searchPhraseValue = "searchphrase=" + query.freeText.trim();
      }

      // Processing rows
      for (let i = 0; i < rows.length; i++) {
        if (typeof rows[i].operator === "undefined") {
          rows[i].operator = "AND";
        }

        if (i > 0) {
          if (rows[i].operator.trim() == "AND") {
            finalKeyValueStr += "&";
          } else {
            finalKeyValueStr += "&" + this.operators[rows[i].operator] + "&";
          }
        }

        if (!this.isEmpty(rows[i].fieldText) && !this.isEmpty(rows[i].fieldValue)) {
          if (finalKeyValueStr[finalKeyValueStr.length - 1] != "&") {
            finalKeyValueStr = finalKeyValueStr.trim() + " ";
          }
          finalKeyValueStr +=
            rows[i].fieldValue + "=" + rows[i].fieldText.replace(/"/g, "");
        }
      }

      let keyString: string = searchTaxonomyKey
        ? "&topic.tag=" + searchTaxonomyKey
        : "";

      // Build URL with all parameters ensuring searchphrase is first and no leading '&'
      url = "records?";
      const parts: string[] = [];
      if (searchPhraseValue) parts.push(searchPhraseValue.trim());
      if (sortOrder) {
        // Handle case where sortOrder doesn't include direction
        if (sortOrder.includes(":")) {
          const [field, direction] = sortOrder.split(":");
          parts.push("sort." + direction + "=" + field);
        } else {
          // Default to ascending sort when no direction specified
          parts.push("sort.asc=" + sortOrder);
        }
      }
      if (finalKeyValueStr.trim() != "") parts.push(finalKeyValueStr.trim());
      if (keyString) parts.push(keyString.replace(/^&/, "").trim());
      if (filter && filter != "NoFilter") parts.push(filter.trim());
      if (page) {
        parts.push("page=" + page);
        parts.push("size=" + itemsPerPage);
      }
      const queryString = parts.join("&");
      url += queryString;
      // Include required fields
      const includeClause =
        "include=ediid,description,title,keyword,topic.tag,contactPoint,annotated," +
        "components.@type,@type,doi,landingPage,firstIssued,modified&exclude=_id";
      url += (parts.length ? "&" : "") + includeClause;

      if (includeExternal) {
        externalUrl =
          "code?" +
          queryString +
          (parts.length ? "&" : "") +
          "include=_id,name,title,description,organization,repositoryURL,homepageURL,downloadURL,languages,tags,contact,dates,status,vcs,@type";
      }
    }

    return this.appConfig.getConfig().pipe(
      rxjsop.mergeMap((conf) => {
        const records$ = this.http.get(conf.RMMAPI + url);
        if (!includeExternal || !externalUrl) {
          return records$;
        }
        const external$ = this.http
          .get(conf.RMMAPI + externalUrl)
          .pipe(rxjsop.catchError(() => of({ ResultData: [], total: 0 })));

        return forkJoin({ records: records$, external: external$ }).pipe(
          rxjsop.map(({ records, external }) =>
            this.combineResults(records, external)
          )
        );
      }),
      rxjsop.tap((resp) => this.lastSearchResponse$.next(resp)),
      rxjsop.catchError((err) => {
        console.error("Failed to complete search: " + JSON.stringify(err));
        return throwError(err);
      })
    );
  }

  /**
   * Check if a string object is empty
   * @param stringValue
   */
  isEmpty(stringValue: string) {
    return (
      stringValue == null ||
      stringValue == undefined ||
      stringValue.trim() == ""
    );
  }

  /**
   * Convert the text from search text box into url parameter. For example,
   * convert "Research Topic=water" to "topic.tag%3Dwater"
   * convert "Research Topic=water OR Research Topic=fire" to "topic.tag%3Dwater&logicalOp%3DOR=&topic.tag%3Dfire"
   * @param searchValue - search value typically from the search text box
   */
  convertSearchvalue(searchValue: string): string {
    let searchString = "";
    if (!searchValue) return searchString;

    searchString = searchValue.trim();
    // Strip spaces around "="
    searchString = searchString.replace(new RegExp(" =", "g"), "=");
    searchString = searchString.replace(new RegExp("= ", "g"), "=");

    // Reserve everything in quotes
    let quotes = searchString.match(/\"(.*?)\"/g);

    if (quotes) {
      for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].match(/\"(.*?)\"/)[1].trim() != "")
          searchString = searchString.replace(
            new RegExp(quotes[i].match(/\"(.*?)\"/)[1], "g"),
            "Quooooote" + i
          );
        else searchString = searchString.replace(quotes[i], "Quooooote" + i);
      }
    }

    searchString = searchString.replace(/ OR /g, "&logicalOp=OR&");
    searchString = searchString.replace(/ NOR /g, "&logicalOp=NOR&");
    searchString = searchString.replace(/ AND /g, "&logicalOp=AND&");
    searchString = searchString.replace(/ /g, "&");

    // Restore the contents in quotes
    if (quotes) {
      for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].match(/\"(.*?)\"/)[1].trim() != "")
          searchString = searchString.replace(
            new RegExp("Quooooote" + i, "g"),
            quotes[i].match(/\"(.*?)\"/)[1]
          );
        else searchString = searchString.replace("Quooooote" + i, quotes[i]);
      }
    }
    return searchString;
  }

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
   * Behavior subject to remotely set the search value.
   */
  private _remoteQueryValue: BehaviorSubject<{
    queryString: string;
    searchTaxonomyKey: string;
    queryAdvSearch: string;
  }> = new BehaviorSubject({
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
    const cleaned = (queryString || "").replace(/searchphrase=/g, "");
    this._remoteQueryValue.next({
      queryString: cleaned,
      searchTaxonomyKey,
      queryAdvSearch,
    });
  }

  /**
   * Navigate to the search page with given search value
   * @param searchValue
   * @param url
   */
  public search(searchValue: string, url?: string): void {
    // Reset filters when starting a new search (avoids stale filters across navigation).
    this.setFilterString("NoFilter");
    const queryParams: any = {
      q: searchValue,
    };

    if (this.externalProducts.getValue()) {
      queryParams.external = "true";
    }

    let params: NavigationExtras = {
      queryParams,
    };

    if (url == "/search") {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
    }

    this.router.navigate(["/search"], params);
  }

  watchPageSize(): Observable<any> {
    return this.pageSize.asObservable();
  }

  setPageSize(size: number) {
    this.pageSize.next(size);
  }

  watchSearchResponse(): Observable<any> {
    return this.lastSearchResponse$.asObservable();
  }

  fetchAllForFacetCounts(
    query: SDPQuery,
    searchTaxonomyKey: string,
    maxSize: number,
    filter?: string
  ): Observable<any> {
    // Build a lightweight include list (only fields needed for facet counting)
    let clone: SDPQuery = JSON.parse(JSON.stringify(query));
    // Force first page only
    let baseUrl = this.buildFacetOnlyUrl(
      clone,
      searchTaxonomyKey,
      filter,
      maxSize,
      "records"
    );
    const includeExternal = this.externalProducts.getValue();
    const externalUrl = includeExternal
      ? this.buildFacetOnlyUrl(clone, searchTaxonomyKey, filter, maxSize, "code")
      : null;

    return this.appConfig.getConfig().pipe(
      rxjsop.mergeMap((conf) => {
        const records$ = this.http.get(conf.RMMAPI + baseUrl);
        if (!includeExternal || !externalUrl) {
          return records$;
        }
        const external$ = this.http
          .get(conf.RMMAPI + externalUrl)
          .pipe(rxjsop.catchError(() => of({ ResultData: [], total: 0 })));
        return forkJoin({ records: records$, external: external$ }).pipe(
          rxjsop.map(({ records, external }) =>
            this.combineResults(records, external)
          )
        );
      }),
      rxjsop.catchError((err) => throwError(err))
    );
  }

  // Helper builds facet-only URL (no export outside service)
  private buildFacetOnlyUrl(
    query: SDPQuery,
    searchTaxonomyKey: string,
    filter: string,
    size: number,
    base: "records" | "code" = "records"
  ): string {
    let searchPhraseValue = query.freeText
      ? "searchphrase=" + query.freeText.trim()
      : "";
    let finalKeyValueStr = "";
    const rows = Array.isArray(query.queryRows) ? query.queryRows : [];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      if (!row.fieldText || !row.fieldValue) continue;
      if (finalKeyValueStr && row.operator && row.operator !== "AND") {
        finalKeyValueStr += "&" + this.operators[row.operator] + "&";
      } else if (finalKeyValueStr) {
        finalKeyValueStr += "&";
      }
      finalKeyValueStr +=
        row.fieldValue + "=" + row.fieldText.replace(/"/g, "");
    }
    let keyString = searchTaxonomyKey ? "topic.tag=" + searchTaxonomyKey : "";
    let url = base + "?";
    const parts: string[] = [];
    if (searchPhraseValue) parts.push(searchPhraseValue);
    if (finalKeyValueStr) parts.push(finalKeyValueStr);
    if (keyString) parts.push(keyString);
    if (filter && filter !== "NoFilter") parts.push(filter.trim());
    parts.push("page=1");
    parts.push("size=" + size);
    url += parts.join("&");
    const codeInclude =
      "include=@type,keyword,topic.tag,contactPoint,components.@type,languages,tags,contact,organization";
    const recordInclude =
      "include=keyword,topic.tag,contactPoint,components.@type,@type&exclude=_id";
    url += (parts.length ? "&" : "") + (base === "code" ? codeInclude : recordInclude);
    return url;
  }

  /**
   * Normalize and merge record + external responses into a single response object.
   */
  private combineResults(primary: any, external: any) {
    const primaryData = this.extractResultData(primary);
    const externalData = this.normalizeExternalRecords(external);
    const combinedTotal =
      this.extractTotalCount(primary, primaryData.length) +
      externalData.length;

    return {
      ...(primary && typeof primary === "object" ? primary : {}),
      ResultData: [...primaryData, ...externalData],
      ResultCount: combinedTotal,
      total: combinedTotal,
    };
  }

  private extractResultData(resp: any): any[] {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp.ResultData)) return resp.ResultData;
    if (Array.isArray(resp.result)) return resp.result;
    return [];
  }

  private extractTotalCount(resp: any, fallback: number = 0): number {
    if (resp && typeof resp.ResultCount === "number") return resp.ResultCount;
    if (resp && typeof resp.total === "number") return resp.total;
    if (resp && typeof resp.totalItems === "number") return resp.totalItems;
    const data = this.extractResultData(resp);
    return data.length || fallback;
  }

  private normalizeExternalRecords(resp: any): any[] {
    const raw = this.extractResultData(resp);
    return raw
      .map((item) => this.normalizeCodeRecord(item))
      .filter((item) => !!item);
  }

  private normalizeCodeRecord(item: any): any | null {
    if (!item) return null;
    const title = item.title || item.name || "Code resource";
    const landing =
      item.landingPage ||
      item.homepageURL ||
      item.repositoryURL ||
      item.downloadURL ||
      "";
    const keywords = this.normalizeKeywords(
      item.keyword,
      item.tags,
      item.languages
    );
    const contactName =
      (item.contactPoint && (item.contactPoint.fn || item.contactPoint.name)) ||
      (item.contact && (item.contact.fn || item.contact.name)) ||
      item.organization ||
      item.contact?.email ||
      "";
    const rawContactPoint =
      item.contactPoint ||
      item.contact ||
      (contactName ? { fn: contactName } : {});
    const contactPoint =
      contactName &&
      rawContactPoint &&
      typeof rawContactPoint === "object" &&
      !Array.isArray(rawContactPoint) &&
      !rawContactPoint.fn
        ? { ...rawContactPoint, fn: contactName }
        : rawContactPoint;
    const typeArray = this.normalizeCodeTypes(item["@type"], item.vcs);
    const topic = Array.isArray(item.topic) ? item.topic : [];
    return {
      ...item,
      external: true,
      source: "code",
      ediid: item.ediid || item._id || item.id || title,
      title,
      description: Array.isArray(item.description)
        ? item.description[0]
        : item.description || "",
      landingPage: landing,
      keyword: keywords,
      topic,
      components: Array.isArray(item.components) ? item.components : [],
      ["@type"]: typeArray,
      annotated:
        item.annotated ||
        item.modified ||
        (item.dates &&
          (item.dates.modified ||
            item.dates.updated ||
            item.dates.lastModified)) ||
        null,
      contactPoint,
    };
  }

  private normalizeCodeTypes(typeField: any, vcs?: string): string[] {
    const types = new Set<string>();
    const add = (val: any) => {
      const v = typeof val === "string" ? val.trim() : "";
      if (v) types.add(v);
    };
    if (Array.isArray(typeField)) {
      typeField.forEach(add);
    } else {
      add(typeField);
    }
    types.add("CodeRepository");
    if (vcs && typeof vcs === "string" && vcs.trim()) {
      types.add(`vcs:${vcs.trim()}`);
    }
    return Array.from(types);
  }

  private normalizeKeywords(...sources: any[]): string[] {
    const tokens = new Set<string>();
    const add = (val: any) => {
      const token =
        typeof val === "string"
          ? val
          : val && val.label
          ? val.label
          : "";
      const trimmed = token.trim();
      if (trimmed) tokens.add(trimmed.toLowerCase());
    };
    sources.forEach((src) => {
      if (!src) return;
      if (Array.isArray(src)) {
        src.forEach(add);
      } else if (typeof src === "string") {
        src.split(/[;,]/).forEach(add);
      }
    });
    return Array.from(tokens);
  }

  setExternalProducts(enabled: boolean): void {
    const normalized = !!enabled;
    this.externalProducts.next(normalized);
    this.persistExternalPref(normalized);
  }

  watchExternalProducts(): Observable<boolean> {
    return this.externalProducts.asObservable();
  }

  private readExternalPref(): boolean {
    try {
      const raw = localStorage.getItem(this.externalPrefKey);
      if (raw === null) return false;
      return raw === "true" || raw === "1";
    } catch (_e) {
      return false;
    }
  }

  private persistExternalPref(enabled: boolean): void {
    try {
      localStorage.setItem(this.externalPrefKey, enabled ? "true" : "false");
    } catch (_e) {
      // ignore
    }
  }
}
