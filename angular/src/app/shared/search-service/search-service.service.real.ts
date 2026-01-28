import { Injectable } from "@angular/core";
// import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpRequest, HttpParams } from "@angular/common/http";
import {
  Observable,
  throwError,
  of,
  BehaviorSubject,
  forkJoin,
  defer,
  merge,
} from "rxjs";
import * as rxjsop from "rxjs/operators";
import { EMPTY } from "rxjs";
import * as _ from "lodash-es";
import { AppConfig, Config } from "../config-service/config.service";
import {
  SearchService,
  ProductTypeState,
  ProductTypeKey,
  ProductProgressState,
  SearchProgressState,
  DEFAULT_PRODUCT_TYPES,
  SearchPhraseOptions,
} from "./search-service.service";
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
  private productTypes = new BehaviorSubject<ProductTypeState>({
    ...DEFAULT_PRODUCT_TYPES,
  });
  private readonly productPrefKey = "sdpProductTypes";
  private searchProgress$ = new BehaviorSubject<SearchProgressState>(
    this.createInitialProgressState()
  );
  private progressTimers: Partial<Record<ProductTypeKey, any>> = {};
  private progressRequestId: number = 0;

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
    this.productTypes.next(this.readProductPref());
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
    filter?: string,
    options?: SearchPhraseOptions
  ): Observable<any> {
    const itemsPerPage = pageSize || this.pageSize.getValue();
    const activeProducts = this.getActiveProductTypes();
    const forceData = !!options?.forceData;
    const includeData = forceData || activeProducts.includes("data");
    const includeCode = !forceData && activeProducts.includes("code");
    const includePapers = !forceData && activeProducts.includes("papers");
    const includePatents = !forceData && activeProducts.includes("patents");
    const progressProducts: ProductTypeKey[] = [];
    if (includeData) progressProducts.push("data");
    if (includeCode) progressProducts.push("code");
    if (includePapers) progressProducts.push("papers");
    if (includePatents) progressProducts.push("patents");
    const rows = Array.isArray(query.queryRows) ? query.queryRows : [];

    if (!progressProducts.length) {
      const empty = this.emptyResult();
      this.lastSearchResponse$.next(empty);
      this.resetProgressState();
      return of(empty);
    }

    const requestId = this.beginProgress(progressProducts);
    let url: string | null = null;
    let externalUrl: string | null = null;
    let papersUrl: string | null = null;
    let patentsUrl: string | null = null;

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
      let queryStringBase = "records?";
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
      url = queryStringBase + queryString;
      // Include required fields
      const includeClause =
        "include=ediid,description,title,keyword,topic.tag,contactPoint,annotated," +
        "components.@type,@type,doi,landingPage,firstIssued,modified&exclude=_id";
      url += (parts.length ? "&" : "") + includeClause;

      if (includeCode) {
        externalUrl =
          "code?" +
          queryString +
          (parts.length ? "&" : "") +
          "include=_id,name,title,description,organization,repositoryURL,homepageURL,downloadURL,languages,tags,contact,dates,status,vcs,@type";
      }
      if (includePapers) {
        papersUrl =
          "papers?" +
          queryString +
          (parts.length ? "&" : "") +
          "include=_id,title,name,description,abstract,summary,authors,author,organization,doi,publicationDate,publishedDate,contact,contactPoint,landingPage,url,keyword,keywords,tags,subjects,topic.tag,@type";
      }
      if (includePatents) {
        patentsUrl =
          "patents?" +
          queryString +
          (parts.length ? "&" : "") +
          "include=_id,title,name,description,abstract,summary,patentNumber,publicationNumber,publicationDate,assignee,assignees,applicant,applicants,organization,owner,inventor,inventors,contact,contactPoint,landingPage,url,keyword,keywords,tags,topic.tag,@type";
      }
    }

    return this.appConfig.getConfig().pipe(
      rxjsop.mergeMap((conf) => {
        const empty = this.emptyResult();
        const hasRecordsRequest = includeData && !!url;
        const hasCodeRequest = includeCode && !!externalUrl;
        const hasPapersRequest = includePapers && !!papersUrl;
        const hasPatentsRequest = includePatents && !!patentsUrl;
        const records$ =
          includeData && url
            ? this.http
                .get(conf.RMMAPI + url)
                .pipe(this.attachProgress("data", requestId))
            : includeData
            ? of(empty).pipe(
                rxjsop.tap(() =>
                  this.completeProductProgress("data", "success", requestId)
                )
              )
            : of(empty);
        const external$ =
          includeCode && externalUrl
            ? this.http.get(conf.RMMAPI + externalUrl).pipe(
                this.attachProgress("code", requestId, {
                  swallowError: true,
                  fallbackValue: empty,
                })
              )
            : includeCode
            ? of(empty).pipe(
                rxjsop.tap(() =>
                  this.completeProductProgress("code", "success", requestId)
                )
              )
            : of(empty);
        const papers$ =
          includePapers && papersUrl
            ? this.http.get(conf.RMMAPI + papersUrl).pipe(
                this.attachProgress("papers", requestId, {
                  swallowError: true,
                  fallbackValue: empty,
                })
              )
            : includePapers
            ? of(empty).pipe(
                rxjsop.tap(() =>
                  this.completeProductProgress("papers", "success", requestId)
                )
              )
            : of(empty);
        const patents$ =
          includePatents && patentsUrl
            ? this.http
                .get(conf.RMMAPI + patentsUrl)
                .pipe(
                  this.attachProgress("patents", requestId, {
                    swallowError: true,
                    fallbackValue: empty,
                  })
                )
            : includePatents
            ? of(empty).pipe(
                rxjsop.tap(() =>
                  this.completeProductProgress("patents", "success", requestId)
                )
              )
            : of(empty);

        const streams: Array<
          Observable<{
            key: "records" | "external" | "papers" | "patents";
            value: any;
          }>
        > = [];
        if (hasRecordsRequest) {
          streams.push(
            records$.pipe(
              rxjsop.map((value) => ({ key: "records" as const, value }))
            )
          );
        }
        if (hasCodeRequest) {
          streams.push(
            external$.pipe(
              rxjsop.map((value) => ({ key: "external" as const, value }))
            )
          );
        }
        if (hasPapersRequest) {
          streams.push(
            papers$.pipe(
              rxjsop.map((value) => ({ key: "papers" as const, value }))
            )
          );
        }
        if (hasPatentsRequest) {
          streams.push(
            patents$.pipe(
              rxjsop.map((value) => ({ key: "patents" as const, value }))
            )
          );
        }

        if (!streams.length) {
          return of(empty);
        }

        const initial = {
          records: empty,
          external: empty,
          papers: empty,
          patents: empty,
        };

        return merge(...streams).pipe(
          rxjsop.scan(
            (acc, update) => ({
              ...acc,
              [update.key]: update.value,
            }),
            initial
          ),
          rxjsop.map(({ records, external, papers, patents }) =>
            this.combineResults(records, external, patents, papers, filter)
          )
        );
      }),
      rxjsop.tap((resp) => this.lastSearchResponse$.next(resp)),
      rxjsop.catchError((err) => {
        console.error("Failed to complete search: " + JSON.stringify(err));
        // Ensure progress reflects failure for the active request.
        this.completeAllInFlightAsError(requestId, err);
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

    const activeProducts = this.getActiveProductTypes();
    if (activeProducts.length) {
      queryParams.products = activeProducts.join(",");
    }

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
    const activeProducts = this.getActiveProductTypes();
    const includeData = activeProducts.includes("data");
    const includeCode = activeProducts.includes("code");
    const includePapers = activeProducts.includes("papers");
    const includePatents = activeProducts.includes("patents");
    if (!includeData && !includeCode && !includePapers && !includePatents) {
      return of(this.emptyResult());
    }

    // Build a lightweight include list (only fields needed for facet counting)
    let clone: SDPQuery = JSON.parse(JSON.stringify(query));
    // Force first page only
    let baseUrl = includeData
      ? this.buildFacetOnlyUrl(
          clone,
          searchTaxonomyKey,
          filter,
          maxSize,
          "records"
        )
      : null;
    const externalUrl = includeCode
      ? this.buildFacetOnlyUrl(
          clone,
          searchTaxonomyKey,
          filter,
          maxSize,
          "code"
        )
      : null;
    const papersUrl = includePapers
      ? this.buildFacetOnlyUrl(
          clone,
          searchTaxonomyKey,
          filter,
          maxSize,
          "papers"
        )
      : null;
    const patentsUrl = includePatents
      ? this.buildFacetOnlyUrl(
          clone,
          searchTaxonomyKey,
          filter,
          maxSize,
          "patents"
        )
      : null;

    return this.appConfig.getConfig().pipe(
      rxjsop.mergeMap((conf) => {
        const records$ =
          includeData && baseUrl
            ? this.http.get(conf.RMMAPI + baseUrl)
            : of(this.emptyResult());
        const external$ =
          includeCode && externalUrl
            ? this.http
                .get(conf.RMMAPI + externalUrl)
                .pipe(rxjsop.catchError(() => of(this.emptyResult())))
            : of(this.emptyResult());
        const papers$ =
          includePapers && papersUrl
            ? this.http
                .get(conf.RMMAPI + papersUrl)
                .pipe(rxjsop.catchError(() => of(this.emptyResult())))
            : of(this.emptyResult());
        const patents$ =
          includePatents && patentsUrl
            ? this.http
                .get(conf.RMMAPI + patentsUrl)
                .pipe(rxjsop.catchError(() => of(this.emptyResult())))
            : of(this.emptyResult());
        return forkJoin({
          records: records$,
          external: external$,
          papers: papers$,
          patents: patents$,
        }).pipe(
          rxjsop.map(({ records, external, papers, patents }) =>
            this.combineResults(records, external, patents, papers, filter)
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
    base: "records" | "code" | "papers" | "patents" = "records"
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
    const patentInclude =
      "include=@type,keyword,keywords,topic.tag,contactPoint,assignee,assignees,applicant,applicants,organization,owner,inventor,inventors,tags";
    const papersInclude =
      "include=@type,keyword,keywords,tags,subjects,topic.tag,contactPoint,authors,author,organization";
    const recordInclude =
      "include=keyword,topic.tag,contactPoint,components.@type,@type&exclude=_id";
    const include =
      base === "code"
        ? codeInclude
        : base === "papers"
        ? papersInclude
        : base === "patents"
        ? patentInclude
        : recordInclude;
    url += (parts.length ? "&" : "") + include;
    return url;
  }

  /**
   * Normalize and merge record + external responses into a single response object.
   */
  private combineResults(
    primary: any,
    external?: any,
    patents?: any,
    papers?: any,
    filter?: string
  ) {
    const typeTokens = this.extractTypeFilterTokens(filter);
    const allowed =
      typeTokens.length > 0
        ? this.getAllowedSourcesForTypeTokens(typeTokens)
        : null;

    const allowData = allowed ? allowed.data : true;
    const allowCode = allowed ? allowed.code : true;
    const allowPapers = allowed ? allowed.papers : true;
    const allowPatents = allowed ? allowed.patents : true;

    const primaryData = allowData ? this.extractResultData(primary) : [];
    const externalData = allowCode
      ? this.normalizeExternalRecords(external, "code")
      : [];
    const patentData = allowPatents
      ? this.normalizeExternalRecords(patents, "patents")
      : [];
    const paperData = allowPapers
      ? this.extractResultData(papers)
          .map((item) => this.normalizePaperRecord(item))
          .filter((item) => !!item)
      : [];
    const combinedTotal =
      (allowData ? this.extractTotalCount(primary, primaryData.length) : 0) +
      (allowCode ? this.extractTotalCount(external, externalData.length) : 0) +
      (allowPatents ? this.extractTotalCount(patents, patentData.length) : 0) +
      (allowPapers ? this.extractTotalCount(papers, paperData.length) : 0);

    return {
      ...(allowData && primary && typeof primary === "object" ? primary : {}),
      ResultData: [
        ...primaryData,
        ...externalData,
        ...paperData,
        ...patentData,
      ],
      ResultCount: combinedTotal,
      total: combinedTotal,
    };
  }

  private extractTypeFilterTokens(filter?: string): string[] {
    if (!filter || filter === "NoFilter") return [];
    const segment = filter
      .split("&")
      .find((part) => part.trim().startsWith("@type="));
    if (!segment) return [];
    const [, raw] = segment.split("=");
    if (!raw) return [];
    const tokens = raw
      .split(",")
      .map((value) => value.trim())
      .filter((value) => !!value)
      .map((value) => value.replace(/\s/g, "").toLowerCase());
    return Array.from(new Set(tokens));
  }

  private getAllowedSourcesForTypeTokens(tokens: string[]): ProductTypeState {
    let allowData = false;
    let allowCode = false;
    let allowPapers = false;
    let allowPatents = false;
    tokens.forEach((token) => {
      if (!token) return;
      if (token === "coderepository") {
        allowCode = true;
        return;
      }
      if (token === "paper") {
        allowPapers = true;
        return;
      }
      if (token.startsWith("patent")) {
        allowPatents = true;
        return;
      }
      allowData = true;
    });
    return {
      data: allowData,
      code: allowCode,
      papers: allowPapers,
      patents: allowPatents,
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

  private normalizeExternalRecords(
    resp: any,
    source: "code" | "patents" = "code"
  ): any[] {
    const raw = this.extractResultData(resp);
    const normalizer =
      source === "patents"
        ? (item) => this.normalizePatentRecord(item)
        : (item) => this.normalizeCodeRecord(item);
    return raw.map(normalizer).filter((item) => !!item);
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
    let contactPoint = rawContactPoint;
    if (contactName) {
      if (
        rawContactPoint &&
        typeof rawContactPoint === "object" &&
        !Array.isArray(rawContactPoint)
      ) {
        contactPoint = rawContactPoint.fn
          ? rawContactPoint
          : { ...rawContactPoint, fn: contactName };
      } else if (typeof rawContactPoint === "string") {
        contactPoint = { fn: contactName };
      }
    }
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

  private normalizePatentRecord(item: any): any | null {
    if (!item) return null;
    const title =
      item.title ||
      item.patentTitle ||
      item.inventionTitle ||
      item.name ||
      "Patent";
    const description =
      (Array.isArray(item.description) ? item.description[0] : item.description) ||
      (Array.isArray(item.abstract) ? item.abstract[0] : item.abstract) ||
      (Array.isArray(item.summary) ? item.summary[0] : item.summary) ||
      "";
    const landing =
      item.landingPage ||
      item.url ||
      item.patentUrl ||
      item.patentURL ||
      item.documentUrl ||
      item.documentURL ||
      item.link ||
      item.homepageURL ||
      item.repositoryURL ||
      item.downloadURL ||
      "";
    const keywords = this.normalizeKeywords(
      item.keyword,
      item.keywords,
      item.tags,
      item.subject,
      item.subjects,
      item.cpc,
      item.ipc,
      item.uspc,
      item.classifications
    );
    const contactName =
      this.extractContactName(item.contactPoint) ||
      this.extractContactName(item.contact) ||
      this.extractContactName(item.assignee) ||
      this.extractContactName(item.assignees) ||
      this.extractContactName(item.applicant) ||
      this.extractContactName(item.applicants) ||
      this.extractContactName(item.organization) ||
      this.extractContactName(item.owner) ||
      this.extractContactName(item.inventor) ||
      this.extractContactName(item.inventors) ||
      "";
    const rawContactPoint =
      item.contactPoint ||
      item.contact ||
      (contactName ? { fn: contactName } : {});
    let contactPoint = rawContactPoint;
    if (contactName) {
      if (
        rawContactPoint &&
        typeof rawContactPoint === "object" &&
        !Array.isArray(rawContactPoint)
      ) {
        contactPoint = rawContactPoint.fn
          ? rawContactPoint
          : { ...rawContactPoint, fn: contactName };
      } else if (typeof rawContactPoint === "string") {
        contactPoint = { fn: contactName };
      }
    }
    const typeArray = this.normalizePatentTypes(
      item["@type"] || item.type || item.docType
    );
    const topic = this.normalizeTopicField(
      item.topic || item.topics || item.subjects || item.subject
    );
    return {
      ...item,
      external: true,
      source: "patents",
      ediid:
        item.ediid ||
        item._id ||
        item.id ||
        item.patentNumber ||
        item.publicationNumber ||
        title,
      title,
      description,
      landingPage: landing,
      keyword: keywords,
      topic,
      components: Array.isArray(item.components) ? item.components : [],
      ["@type"]: typeArray,
      annotated:
        item.annotated ||
        item.modified ||
        item.updated ||
        item.publicationDate ||
        item.publication_date ||
        item.issuedDate ||
        (item.dates &&
          (item.dates.published ||
            item.dates.issued ||
            item.dates.modified ||
            item.dates.updated)) ||
        null,
      contactPoint,
    };
  }

  private normalizePaperRecord(item: any): any | null {
    if (!item) return null;
    return {
      ...item,
      external: true,
      source: "papers",
      ["@type"]: ["Paper"],
    };
  }


  private normalizeCodeTypes(typeField: any, vcs?: string): string[] {
    const types = new Set<string>();
    const add = (val: any) => {
      const v = typeof val === "string" ? val.trim() : "";
      if (v && v.toLowerCase().startsWith("vcs:")) return;
      if (v) types.add(v);
    };
    if (Array.isArray(typeField)) {
      typeField.forEach(add);
    } else {
      add(typeField);
    }
    types.add("CodeRepository");
    return Array.from(types);
  }

  private normalizePatentTypes(typeField: any): string[] {
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
    const hasPatent = Array.from(types).some((val) =>
      val.replace(/\s/g, "").toLowerCase().includes("patent")
    );
    if (!hasPatent) {
      types.add("Patent");
    }
    return Array.from(types);
  }


  private extractContactName(value: any): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
      for (const entry of value) {
        const name = this.extractContactName(entry);
        if (name) return name;
      }
      return "";
    }
    if (typeof value === "object") {
      return (
        value.fn ||
        value.name ||
        value.label ||
        value.organization ||
        value.company ||
        ""
      );
    }
    return "";
  }

  private normalizeTopicField(value: any): { tag: string }[] {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value
        .map((entry) => {
          if (!entry) return null;
          if (typeof entry === "string") return { tag: entry };
          if (entry.tag) return entry;
          if (entry.label) return { tag: entry.label };
          if (entry.name) return { tag: entry.name };
          return null;
        })
        .filter((entry) => !!entry);
    }
    if (typeof value === "string") {
      return value
        .split(/[;,]/)
        .map((tag) => tag.trim())
        .filter((tag) => !!tag)
        .map((tag) => ({ tag }));
    }
    if (typeof value === "object") {
      if (value.tag) return [value];
      if (value.label) return [{ tag: value.label }];
      if (value.name) return [{ tag: value.name }];
    }
    return [];
  }

  private normalizeKeywords(...sources: any[]): string[] {
    const tokens = new Set<string>();
    const add = (val: any) => {
      const token =
        typeof val === "string"
          ? val
          : val && (val.label || val.name || val.value)
          ? val.label || val.name || val.value
          : "";
      const trimmed = String(token || "").trim();
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

  watchSearchProgress(): Observable<SearchProgressState> {
    return this.searchProgress$.asObservable();
  }

  private createInitialProductProgress(key: ProductTypeKey): ProductProgressState {
    return {
      key,
      status: "idle",
      progress: 0,
      active: false,
      error: undefined,
      updatedAt: Date.now(),
    };
  }

  private createInitialProgressState(): SearchProgressState {
    return {
      requestId: 0,
      inFlight: false,
      globalProgress: 0,
      activeProducts: [],
      completedProducts: [],
      failedProducts: [],
      products: {
        data: this.createInitialProductProgress("data"),
        code: this.createInitialProductProgress("code"),
        papers: this.createInitialProductProgress("papers"),
        patents: this.createInitialProductProgress("patents"),
      },
    };
  }

  private resetProgressState(): void {
    this.clearAllProgressTimers();
    this.progressRequestId += 1;
    const next = this.createInitialProgressState();
    next.requestId = this.progressRequestId;
    this.searchProgress$.next(next);
  }

  private beginProgress(activeProducts: ProductTypeKey[]): number {
    this.clearAllProgressTimers();
    this.progressRequestId += 1;
    const requestId = this.progressRequestId;
    const uniqueActive = Array.from(new Set(activeProducts));
    const base = this.createInitialProgressState();
    const now = Date.now();
    const nextProducts = { ...base.products };
    uniqueActive.forEach((key) => {
      const existing = nextProducts[key] || this.createInitialProductProgress(key);
      nextProducts[key] = {
        ...existing,
        active: true,
        status: "loading",
        progress: Math.max(existing.progress || 0, 4),
        error: undefined,
        updatedAt: now,
      };
    });
    const nextState = this.recomputeProgress({
      ...base,
      requestId,
      activeProducts: uniqueActive,
      products: nextProducts,
    });
    this.searchProgress$.next(nextState);
    return requestId;
  }

  private attachProgress<T>(
    key: ProductTypeKey,
    requestId: number,
    options?: { swallowError?: boolean; fallbackValue?: T }
  ): (source: Observable<T>) => Observable<T> {
    const swallowError = !!options?.swallowError;
    const fallbackValue = options?.fallbackValue as T;
    return (source: Observable<T>) =>
      defer(() => {
        this.startProductProgress(key, requestId);
        return source.pipe(
          rxjsop.tap({
            next: () => this.completeProductProgress(key, "success", requestId),
          }),
          rxjsop.catchError((err) => {
            this.completeProductProgress(key, "error", requestId, err);
            if (swallowError) {
              return of(fallbackValue);
            }
            return throwError(err);
          })
        );
      });
  }

  private startProductProgress(key: ProductTypeKey, requestId: number): void {
    const state = this.searchProgress$.getValue();
    if (state.requestId !== requestId) return;
    this.clearProgressTimer(key);
    this.updateProductProgress(key, requestId, (current) => ({
      ...current,
      active: true,
      status: "loading",
      progress: Math.max(current.progress || 0, 6),
      error: undefined,
      updatedAt: Date.now(),
    }));
    const cap = 92;
    const tickMs = 320;
    this.progressTimers[key] = setInterval(() => {
      const latest = this.searchProgress$.getValue();
      if (latest.requestId !== requestId) {
        this.clearProgressTimer(key);
        return;
      }
      const product = latest.products[key];
      if (!product || product.status !== "loading") {
        this.clearProgressTimer(key);
        return;
      }
      const remaining = Math.max(0, cap - product.progress);
      if (remaining <= 0) {
        return;
      }
      const step = Math.max(0.6, remaining * 0.12);
      const nextProgress = Math.min(cap, product.progress + step);
      this.updateProductProgress(key, requestId, (current) => ({
        ...current,
        progress: nextProgress,
        updatedAt: Date.now(),
      }));
    }, tickMs);
  }

  private completeProductProgress(
    key: ProductTypeKey,
    status: "success" | "error",
    requestId: number,
    error?: any
  ): void {
    const state = this.searchProgress$.getValue();
    if (state.requestId !== requestId) return;
    this.clearProgressTimer(key);
    const now = Date.now();
    const errText = status === "error" ? this.formatProgressError(error) : undefined;
    const updatedProduct: ProductProgressState = {
      ...(state.products[key] || this.createInitialProductProgress(key)),
      key,
      active: true,
      status,
      progress: 100,
      error: errText,
      updatedAt: now,
    };
    const completedProducts = state.completedProducts.includes(key)
      ? state.completedProducts
      : [...state.completedProducts, key];
    const failedProducts =
      status === "error"
        ? state.failedProducts.includes(key)
          ? state.failedProducts
          : [...state.failedProducts, key]
        : state.failedProducts.filter((k) => k !== key);
    const next = this.recomputeProgress({
      ...state,
      completedProducts,
      failedProducts,
      products: {
        ...state.products,
        [key]: updatedProduct,
      },
    });
    this.searchProgress$.next(next);
  }

  private completeAllInFlightAsError(requestId: number, error: any): void {
    const state = this.searchProgress$.getValue();
    if (state.requestId !== requestId) return;
    state.activeProducts.forEach((key) => {
      const product = state.products[key];
      if (!product || product.status === "loading") {
        this.completeProductProgress(key, "error", requestId, error);
      }
    });
  }

  private updateProductProgress(
    key: ProductTypeKey,
    requestId: number,
    updater: (current: ProductProgressState) => ProductProgressState
  ): void {
    const state = this.searchProgress$.getValue();
    if (state.requestId !== requestId) return;
    const current = state.products[key] || this.createInitialProductProgress(key);
    const updated = updater(current);
    const next = this.recomputeProgress({
      ...state,
      products: {
        ...state.products,
        [key]: {
          ...updated,
          progress: this.clampProgress(updated.progress),
        },
      },
    });
    this.searchProgress$.next(next);
  }

  private recomputeProgress(state: SearchProgressState): SearchProgressState {
    const active = state.activeProducts || [];
    if (!active.length) {
      return {
        ...state,
        inFlight: false,
        globalProgress: 0,
        completedProducts: [],
        failedProducts: [],
      };
    }
    const loadingCount = active.reduce((acc, key) => {
      const product = state.products[key];
      return acc + (product && product.status === "loading" ? 1 : 0);
    }, 0);
    const totalProgress = active.reduce((acc, key) => {
      const product = state.products[key];
      return acc + this.clampProgress(product?.progress ?? 0);
    }, 0);
    const completedProducts = Array.from(
      new Set(state.completedProducts.filter((key) => active.includes(key)))
    );
    const failedProducts = Array.from(
      new Set(state.failedProducts.filter((key) => active.includes(key)))
    );
    const globalProgress = Math.round(totalProgress / active.length);
    return {
      ...state,
      inFlight: loadingCount > 0,
      globalProgress: this.clampProgress(globalProgress),
      completedProducts,
      failedProducts,
    };
  }

  private clampProgress(value: number): number {
    if (!Number.isFinite(value)) return 0;
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
  }

  private clearProgressTimer(key: ProductTypeKey): void {
    const timerId = this.progressTimers[key];
    if (timerId) {
      clearInterval(timerId);
    }
    delete this.progressTimers[key];
  }

  private clearAllProgressTimers(): void {
    (Object.keys(this.progressTimers) as ProductTypeKey[]).forEach((key) => {
      this.clearProgressTimer(key);
    });
    this.progressTimers = {};
  }

  private formatProgressError(err: any): string {
    if (!err) return "Request failed";
    const status = err.status || err.statusCode;
    const text = err.statusText || err.message || "";
    if (status) {
      return `${status} ${text}`.trim();
    }
    return text || "Request failed";
  }

  watchProductTypes(): Observable<ProductTypeState> {
    return this.productTypes.asObservable();
  }

  setProductTypes(state: Partial<ProductTypeState>): void {
    const current = this.productTypes.getValue();
    const next = this.normalizeProductState({
      ...current,
      ...state,
    });
    if (_.isEqual(current, next)) {
      return;
    }
    this.productTypes.next(next);
    this.persistProductPref(next);
    this.resetProgressState();
    this.syncProductQueryParams();
  }

  setProductTypeEnabled(type: ProductTypeKey, enabled: boolean): void {
    const current = this.productTypes.getValue();
    if (!(type in current)) {
      return;
    }
    const next = this.normalizeProductState({
      ...current,
      [type]: !!enabled,
    });
    if (_.isEqual(current, next)) {
      return;
    }
    this.productTypes.next(next);
    this.persistProductPref(next);
    this.resetProgressState();
    this.syncProductQueryParams();
  }

  getActiveProductTypes(): ProductTypeKey[] {
    const state = this.productTypes.getValue();
    const allowExternal = this.externalProducts.getValue();
    const active: ProductTypeKey[] = [];
    if (state.data !== false) active.push("data");
    if (allowExternal) {
      if (state.code) active.push("code");
      if (state.papers) active.push("papers");
      if (state.patents) active.push("patents");
    }
    return active;
  }

  setExternalProducts(enabled: boolean): void {
    const normalized = !!enabled;
    if (this.externalProducts.getValue() === normalized) {
      return;
    }
    this.externalProducts.next(normalized);
    this.persistExternalPref(normalized);
    this.resetProgressState();
    this.syncProductQueryParams();
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

  private syncProductQueryParams(): void {
    const currentUrl = this.router.url || "";
    if (!currentUrl.startsWith("/search")) {
      return;
    }
    const tree = this.router.parseUrl(currentUrl);
    const currentParams = tree.queryParams || {};
    const activeProducts = this.getActiveProductTypes();
    const nextParams: Record<string, any> = { ...currentParams };

    if (activeProducts.length) {
      nextParams.products = activeProducts.join(",");
    } else {
      delete nextParams.products;
    }

    if (this.externalProducts.getValue()) {
      nextParams.external = "true";
    } else {
      delete nextParams.external;
    }

    const normalize = (value: any) =>
      typeof value === "undefined" ? "" : String(value);
    if (
      normalize(currentParams.products) === normalize(nextParams.products) &&
      normalize(currentParams.external) === normalize(nextParams.external)
    ) {
      return;
    }

    tree.queryParams = nextParams;
    this.router.navigateByUrl(tree, { replaceUrl: true });
  }

  private normalizeProductState(
    state: Partial<ProductTypeState> | null | undefined
  ): ProductTypeState {
    const base: ProductTypeState = { ...DEFAULT_PRODUCT_TYPES };
    const incoming = state || {};
    (Object.keys(base) as ProductTypeKey[]).forEach((key) => {
      if (typeof incoming[key] === "boolean") {
        base[key] = incoming[key] as boolean;
      }
    });
    return base;
  }

  private readProductPref(): ProductTypeState {
    try {
      const raw = localStorage.getItem(this.productPrefKey);
      if (!raw) return { ...DEFAULT_PRODUCT_TYPES };
      const parsed = JSON.parse(raw);
      return this.normalizeProductState(parsed);
    } catch (_e) {
      return { ...DEFAULT_PRODUCT_TYPES };
    }
  }

  private persistProductPref(state: ProductTypeState): void {
    try {
      localStorage.setItem(this.productPrefKey, JSON.stringify(state));
    } catch (_e) {
      // ignore
    }
  }

  private emptyResult() {
    return { ResultData: [], ResultCount: 0, total: 0 };
  }
}
