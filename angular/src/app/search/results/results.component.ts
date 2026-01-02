import {
  Component,
  OnInit,
  Inject,
  NgZone,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
} from "@angular/core";
import { SearchService, SEARCH_SERVICE } from "../../shared/search-service";
import * as _ from "lodash-es";
import { SearchfieldsListService } from "../../shared/index";
import { SelectItem } from "primeng/api";
import { SearchQueryService } from "../../shared/search-query/search-query.service";
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { AppConfig } from "../../shared/config-service/config.service";
import { Message } from "primeng/api";
// import { Message } from 'primeng/components/common/api';
import { Subscription } from "rxjs";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  // Removed unused mobHeight/ngZone declarations during cleanup

  totalItems: number;
  itemsPerPage: number = 10;
  searchResults: any[];
  // MARK: 09/04/2024 - took off DOI by default
  selectedFields: string[] = [
    "Resource Description",
    "Subject keywords",
    // Hide released (firtIssued) by default
    "Modified",
    // "Released"
  ];
  allChecked: boolean = false;
  fieldsArray: any[];
  displayFields: string[] = [];
  filterableFields: SelectItem[];
  fields: SelectItem[] = [];
  errorMessage: string;
  sortItemKey: string = "annotated:desc";
  currentFilter: string = "NoFilter";
  // MARK: 10/09/2025 - @Mehdi - set default sort order to annotated:desc so newest records show first
  currentSortOrder: string = "annotated:desc";
  PDRAPIURL: string;
  resultStatus: string;
  RESULT_STATUS = {
    success: "SUCCESS",
    noResult: "NO RESULT",
    userError: "USER ERROR",
    sysError: "SYS ERROR",
  };
  // Holds short detail for error card display
  lastErrorDetail: string = "";
  // Error detail fields streamlined; msgs array still records errors
  msgs: Message[] = [];
  queryStringErrorMessage: string;
  queryStringWarning: boolean;
  filterSubscription: Subscription = new Subscription();
  pageSubscription: Subscription = new Subscription();
  searchSubscription: Subscription = new Subscription();
  externalToggleSubscription: Subscription = new Subscription();
  inited: boolean = false;
  dataReady: boolean = false;
  // startupGuard ensures that during the initial bootstrap (hard page refresh scenario)
  // only ONE initial search request is allowed to proceed. Multiple synchronous/near-synchronous
  // emissions (fields list, filter string, page size, etc.) previously caused a second search
  // to unsubscribe the first in-flight request, which shows up in the browser network panel
  // as a "canceled" request. We flip this guard off after the first search (success or error)
  // to restore normal behavior.
  private startupGuard: boolean = true;
  // Tracks whether we've already kicked off the very first search (prevents
  // duplicate initial requests when the fields BehaviorSubject emits its
  // initial empty array followed by the real fields list).
  private initialSearchStarted: boolean = false;
  // Track when fields list is non-empty (ready to search)
  private fieldsReady: boolean = false;

  pagerConfig = {
    totalItems: 0,
    currentPage: 1,
    pageSize: 10,
  };
  private pageSizeSubscription: Subscription = new Subscription();

  @Input() searchValue: string;
  @Input() searchTaxonomyKey: string;
  @Input() currentPage: number = 1;
  @Input() mobWidth: number = 1920;
  @Output() totalItemsChange = new EventEmitter<number>();
  @Output() zeroResults = new EventEmitter<boolean>();
  // Emits richer context so parent can distinguish true empty query vs filter-constrained empty
  @Output() zeroResultsMeta = new EventEmitter<{
    zero: boolean;
    filterZero: boolean;
    tags?: string[];
  }>();
  // Surface error state to parent so layout (filters) can react
  @Output() errorState = new EventEmitter<boolean>();
  // Track if zero results is specifically due to active filters
  isFilterZero: boolean = false;
  // Active filter tokens parsed from currentFilter for UI tag display when filter-zero state occurs
  activeFilterTags: { raw: string; label: string }[] = [];

  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public searchFieldsListService: SearchfieldsListService,
    public searchQueryService: SearchQueryService,
    public gaService: GoogleAnalyticsService,
    private appConfig: AppConfig,
    public myElement: ElementRef
  ) {
    this.appConfig.getConfig().subscribe((conf) => {
      this.PDRAPIURL = conf.PDRAPI;
    });

    // Watch for field list readiness (drives initial search); also handle failures explicitly
    this.searchFieldsListService.watchFields().subscribe({
      next: (fields) => {
        this.fields = fields as SelectItem[];
        this.filterableFields = this.toSortItems(fields);
        // Trigger initial search ONLY once, and only after we have a non-empty
        // fields array (the BehaviorSubject first emits an empty array, which
        // previously caused an early search that was immediately canceled by
        // the real-fields emission). This eliminates the duplicate page=1&size=10 call.
        this.fieldsReady = !!(fields && fields.length > 0);
        // Important: don't start the first search until Inputs are initialized (searchValue set)
        if (
          this.startupGuard &&
          !this.initialSearchStarted &&
          this.fieldsReady
        ) {
          if (typeof this.searchValue === "undefined") {
            // Wait for Inputs/ngOnInit, we'll kick off there
            return;
          }
          this.initialSearchStarted = true; // lock before firing to avoid race
          this.searchSubscription = this.search(
            null,
            1,
            this.itemsPerPage,
            undefined,
            undefined,
            "fields-nonempty"
          );
        }
      },
      error: (error) => {
        console.log("Error loading fields: " + error);
        // Surface an error card instead of leaving skeletons up forever
        this.resultStatus = this.RESULT_STATUS.sysError;
        this.lastErrorDetail = this.formatHttpError(error);
        this.dataReady = false;
        this.errorState.emit(true);
      },
    });

    // Removed extra getSearchFields() subscription to avoid duplicate fields call
  }

  ngOnInit() {
    this.currentPage = 1;

    if (this.searchValue) {
      this.queryStringErrorMessage =
        this.searchQueryService.validateQueryString(this.searchValue);
      if (this.queryStringErrorMessage != "") this.queryStringWarning = true;
    }

    // Initial page-1 search already triggered when fields load in constructor.
    // If fields not yet loaded (rare timing), we'll start once they arrive.

    this.pageSubscription = this.searchService
      .watchCurrentPage()
      .subscribe((page) => {
        if (!page) page = 1;

        if (this.currentPage == page) {
          return;
        } else {
          this.currentPage = page;
          this.getCurrentPage(page);
        }
      });

    this.filterSubscription = this.searchService
      .watchFilterString()
      .subscribe((filter) => {
        if (!filter || this.currentFilter == filter) return;

        this.currentFilter = filter;
        // During startupGuard phase we now suppress this trigger entirely to avoid a duplicate
        // initial search. Only the fields emission is allowed to launch the first request.
        if (this.startupGuard && !this.searchResults) {
          return; // defer until initial search completes
        }
        this.searchSubscription = this.search(
          null,
          null,
          this.itemsPerPage,
          undefined,
          undefined,
          "filter-change"
        );
      });

    // Consolidated single pageSize watcher
    this.pageSizeSubscription = this.searchService
      .watchPageSize()
      .subscribe((size) => {
        const initial = !this.inited; // before we flip inited below
        const changed = size !== this.itemsPerPage;
        this.itemsPerPage = size;
        // Suppress page size as an initial trigger; only fields emission may start the first search.
        if (this.startupGuard && !this.searchResults) return;
        // Only trigger a new search if page size truly changed after init (normal behavior)
        if (!initial && changed) {
          this.search(
            null,
            1,
            this.itemsPerPage,
            undefined,
            undefined,
            "page-size-change"
          );
        }
      });
    this.inited = true;
    // If fields were already ready before Inputs were set, start the initial search now.
    if (this.startupGuard && !this.initialSearchStarted && this.fieldsReady) {
      this.initialSearchStarted = true;
      this.searchSubscription = this.search(
        null,
        1,
        this.itemsPerPage,
        undefined,
        undefined,
        "init-after-inputs"
      );
    }

    this.externalToggleSubscription = this.searchService
      .watchExternalProducts()
      .subscribe((enabled) => {
        if (!this.inited || this.startupGuard) return;
        if (!enabled) {
          const cleaned = this.stripExternalOnlyTypes(this.currentFilter);
          if (cleaned.changed) {
            this.searchService.setFilterString(cleaned.filter);
            return;
          }
        }
        this.search(
          null,
          this.currentPage || 1,
          this.itemsPerPage,
          undefined,
          undefined,
          "external-toggle"
        );
      });
  }

  /**
   * On destroy, unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    if (this.filterSubscription) this.filterSubscription.unsubscribe();
    if (this.pageSubscription) this.pageSubscription.unsubscribe();
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
    if (this.pageSizeSubscription) this.pageSizeSubscription.unsubscribe();
    if (this.externalToggleSubscription)
      this.externalToggleSubscription.unsubscribe();
  }

  /**
   * When search value changed, reset current filter and refresh search result
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (
      this.inited &&
      changes.searchValue != undefined &&
      changes.searchValue != null
    ) {
      if (
        changes.searchValue.currentValue != changes.searchValue.previousValue
      ) {
        //When conduct a new search, clean up filters and error message
        this.queryStringErrorMessage =
          this.searchQueryService.validateQueryString(this.searchValue);
        this.queryStringWarning = this.queryStringErrorMessage != "";

        this.currentFilter = "NoFilter";
        this.currentSortOrder = "annotated:desc";

        this.searchSubscription = this.search(null, 1, this.itemsPerPage);
      }
    }
  }

  /**
   * Request the given page of the search result
   * @param currentPage - page requested. If missing, this.currentPage will be used.
   */
  getCurrentPage(currentPage?: number) {
    if (!currentPage) currentPage = this.currentPage;
    else {
      let totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      this.currentPage = currentPage;
    }

    this.searchSubscription = this.search(null, currentPage, this.itemsPerPage);

    // Scroll to the top of the page (in case user clicked on the pagination control at the bottom)
    window.scrollTo(0, 0);
  }

  /**
   * Generate the dropdown list for the sortBy option in Customize View
   */
  toSortItems(fields: any[]) {
    this.fieldsArray = fields;
    let items: SelectItem[] = [];
    let sortItems: SelectItem[] = [];
    this.displayFields = [];
    this.fields = [];
    let dupFound: boolean = false;

    for (let field of fields) {
      if (_.includes(field.tags, "filterable")) {
        if (field.type !== "object") {
          if (field.name !== "component.topic.tag") {
            dupFound = false;
            for (let item of sortItems) {
              if (item.label == field.label && item.value == field.name) {
                dupFound = true;
                break;
              }
            }
            if (!dupFound)
              sortItems.push({ label: field.label, value: field.name });
          }
          if (field.label !== "Resource Title") {
            if (field.name !== "component.topic.tag") {
              if (this.displayFields.indexOf(field.label) < 0)
                this.displayFields.push(field.label);
            }
          }
        }
      }

      if (_.includes(field.tags, "searchable")) {
        let lValue = field.name.replace("component.", "components.");

        dupFound = false;
        for (let item of this.fields) {
          if (item.label == field.label && item.value == lValue) {
            dupFound = true;
            break;
          }
        }
        if (!dupFound) this.fields.push({ label: field.label, value: lValue });
      }
    }

    this.fields = _.sortBy(this.fields, ["label", "value"]);

    return sortItems;
  }

  /**
   * Call the Search service to return only given page of the results.
   * This function uses this.searchValue and append the given filter and searchTaxonomyKey for search.
   * @param searchTaxonomyKey - Taxonomy key for search
   * @param page - which page to return
   * @param pageSize - number of result per page
   * @param sortOrder - sort order
   * @param filter - additional filter that applys to regular search
   */
  search(
    searchTaxonomyKey?: string,
    page?: number,
    pageSize?: number,
    sortOrder?: string,
    filter?: string,
    origin?: string // origin is purely diagnostic to help trace initial trigger source
  ) {
    // Always unsubscribe before conduct a new search
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
    // Reset current page every time a new search starts
    this.currentPage = page ? page : 1;
    // Show skeletons
    this.dataReady = false;

    this.searchService.setQueryValue(this.searchValue, "", "");
    let lSearchValue = this.searchValue
      ? this.searchValue.replace(/  +/g, " ")
      : "";

    let query = this.searchQueryService.buildQueryFromString(
      lSearchValue,
      null,
      this.fields
    );

    let that = this;
    this.currentFilter = filter ? filter : this.currentFilter;
    this.currentSortOrder = sortOrder ? sortOrder : this.currentSortOrder;

    const sub = this.searchService
      .searchPhrase(
        query,
        searchTaxonomyKey,
        null,
        this.currentPage,
        pageSize,
        this.currentSortOrder,
        this.currentFilter
      )
      .subscribe(
        (searchResults) => {
          that.searchResults = searchResults.ResultData;
          that.totalItems = searchResults.ResultCount;
          that.resultStatus = this.RESULT_STATUS.success;
          this.lastErrorDetail = "";
          that.searchService.setTotalItems(that.totalItems);
          that.dataReady = true;
          this.totalItemsChange.emit(that.totalItems);
          const filterActive =
            this.currentFilter && this.currentFilter !== "NoFilter";
          this.isFilterZero = filterActive && that.totalItems === 0;
          this.activeFilterTags = filterActive
            ? this.parseFilterTags(this.currentFilter)
            : [];
          this.zeroResults.emit(that.totalItems === 0); // legacy boolean event
          this.zeroResultsMeta.emit({
            zero: that.totalItems === 0,
            filterZero: this.isFilterZero,
            tags: this.activeFilterTags.map((t) => t.label),
          });
          this.errorState.emit(false);
          // First successful completion clears the startup guard so later triggers behave normally
          if (this.startupGuard) this.startupGuard = false;
        },
        (error) => that.onError(error)
      );
    // (diagnostic logging hook retained in history but commented to avoid noise)

    return sub;
  }

  /**
   * Reset filters (used when zero results are due only to filtering)
   */
  // resetFiltersDueToZero retained earlier for legacy template reference; not used now.

  /**
   * Convert the flat filter query string into an array of human-readable tokens.
   * Example: "components.@type=Dataset,Software&topic.tag=Fire" -> ["Record has: Dataset, Software", "Research Topic: Fire"]
   * For a minimal implementation we'll just split on & and replace '=' with ': '.
   */
  private parseFilterTags(
    filterQuery: string
  ): { raw: string; label: string }[] {
    if (!filterQuery || filterQuery === "NoFilter") return [];
    return filterQuery.split("&").map((seg) => {
      const [key, val] = seg.split("=");
      if (!val) return { raw: seg, label: seg };
      // Show only the value(s); for multiple comma-separated values show each separated by comma + space.
      // Example: "@type=DataPublication,SRD" -> "Data Publication, SRD" (apply startCase to individual tokens when they are condensed)
      const tokens = val
        .split(",")
        .filter((v) => !!v)
        .map((v) => {
          // If token has no space but is CamelCase or PascalCase from our emitted patterns, expand with startCase
          if (/^[A-Za-z]+$/.test(v) && v.toLowerCase() !== v) {
            return _.startCase(v); // DataPublication -> Data Publication
          }
          return v;
        });
      return { raw: seg, label: tokens.join(", ") };
    });
  }

  private stripExternalOnlyTypes(filterQuery: string): {
    filter: string;
    changed: boolean;
  } {
    if (!filterQuery || filterQuery === "NoFilter") {
      return { filter: filterQuery, changed: false };
    }
    const segments = filterQuery.split("&").filter((seg) => !!seg);
    let changed = false;
    const nextSegments: string[] = [];
    segments.forEach((seg) => {
      const [key, value] = seg.split("=");
      if (!value) {
        nextSegments.push(seg);
        return;
      }
      if (key === "@type") {
        const values = value.split(",").filter((v) => !!v);
        const kept = values.filter(
          (v) => !this.isExternalOnlyTypeToken(v)
        );
        if (kept.length === values.length) {
          nextSegments.push(seg);
          return;
        }
        changed = true;
        if (kept.length) {
          nextSegments.push(`${key}=${kept.join(",")}`);
        }
        return;
      }
      nextSegments.push(seg);
    });
    if (!changed) {
      return { filter: filterQuery, changed: false };
    }
    return {
      filter: nextSegments.length ? nextSegments.join("&") : "NoFilter",
      changed: true,
    };
  }

  private isExternalOnlyTypeToken(token: string): boolean {
    const normalized = String(token || "")
      .replace(/\s/g, "")
      .toLowerCase();
    if (!normalized) return false;
    if (normalized === "coderepository") return true;
    return normalized.startsWith("vcs:");
  }

  /** Remove a single filter segment and re-run search without full reset */
  removeFilterTag(index: number) {
    if (index < 0 || index >= this.activeFilterTags.length) return;
    const remaining = this.activeFilterTags
      .filter((_, i) => i !== index)
      .map((t) => t.raw)
      .filter((seg) => !!seg && seg.indexOf("=") > 0);
    const newFilter = remaining.length ? remaining.join("&") : "NoFilter";
    this.searchService.setFilterString(newFilter);
  }

  /** Reset all filters from inside the results component */
  resetAllFilters() {
    this.searchService.setFilterString("NoFilter");
  }

  /**
   * If search is unsuccessful get the error message
   */
  onError(error: any[]) {
    this.searchResults = [];
    this.msgs = [];

    if ((<any>error).status == 400) {
      this.resultStatus = this.RESULT_STATUS.userError;
    } else {
      this.resultStatus = this.RESULT_STATUS.sysError;
    }

    const err: any = error || {};
    // Store a concise message for the error card
    this.lastErrorDetail = err.message || err.statusText || "Unknown error";
    this.msgs.push({
      severity: "error",
      summary: err.message || "Search error",
      detail: err.httpStatus || "",
    });
    // Even on error we should drop the startup guard to avoid suppressing retries.
    if (this.startupGuard) this.startupGuard = false;
    this.errorState.emit(true);
  }

  /**
   * Return class name based on given column number and window size
   * @param column
   */
  flexgrow(column: number) {
    let lclass: string = "full-width";

    if (this.mobWidth > 1024) lclass = "flex-grow" + column;
    else lclass = "full-width";

    return lclass;
  }

  /**
   * Return the class for the top bar (total result, pagination and Customize View button)
   */
  resultTopBarClass() {
    if (this.mobWidth > 1024) return "top-bar";
    else return "";
  }

  /**
   * Reset the checkbox status of the Customize View to default
   * Also reset sort order to default ("")
   */
  resetSelectedFields() {
    // MARK: 09/04/2024 - took off DOI by default
    this.selectedFields = [
      "Resource Description",
      "Subject keywords",
      "Modified",
      "Released",
    ];
    this.allChecked = false;
    // MARK: 10/09/2025 - @Mehdi - set default sort order to annotated:desc so newest records show first
    this.sortItemKey = "annotated:desc";
    this.currentSortOrder = "annotated:desc";

    this.searchSubscription = this.search(
      null,
      this.currentPage,
      this.itemsPerPage
    );
  }

  /**
   * Select all checkboxes
   */
  selectAllFields() {
    this.selectedFields = ["Subject keywords"];
    if (this.allChecked) {
      for (let field of this.fieldsArray) {
        if (_.includes(field.tags, "filterable")) {
          if (field.type !== "object") {
            if (field.label !== "Resource Title") {
              if (field.name !== "component.topic.tag") {
                this.selectedFields.push(field.label);
              }
            }
          }
        }
      }
    }
  }

  /**
   * Refresh search results based on current sort order
   * Date fields (annotated, firstIssued) sort desc by default,
   * all other fields sort asc by default
   */
  sortByFields() {
    if (this.sortItemKey && !this.sortItemKey.includes(":")) {
      const DATE_FIELDS = ["annotated", "firstIssued"];
      const defaultDirection = DATE_FIELDS.includes(this.sortItemKey)
        ? "desc"
        : "asc";
      this.sortItemKey = `${this.sortItemKey}:${defaultDirection}`;
    }

    this.currentSortOrder = this.sortItemKey;
    this.getCurrentPage();
  }

  /**
   * Update the checkbox's status when user checks or unchecks a box
   */
  updateFields() {
    this.allChecked = true;

    for (let field of this.fieldsArray) {
      if (_.includes(field.tags, "filterable")) {
        if (field.type !== "object") {
          if (field.label !== "Resource Title") {
            if (field.name !== "component.topic.tag") {
              if (this.selectedFields.indexOf(field.label) < 0) {
                this.allChecked = false;
                break;
              }
            }
          }
        }
      }
    }
    this.searchSubscription = this.search(
      null,
      this.currentPage,
      this.itemsPerPage
    );
  }

  /**
   * Return the position of the Customize View button based on the window size
   * If window width > 1025, float to right (in the same line as pagination)
   * If window width <= 1025, display nutton in a new line and centered.
   */
  customizeViewPosition(): string {
    if (this.mobWidth > 1025) {
      return "right";
    } else {
      return "";
    }
  }

  /**
   * Display the examples of adv search
   */
  showExamples() {
    this.searchQueryService.setShowExamples(true);
  }

  // Function to clear the resultItem type
  clearResultItemType(type: string): string {
    // Extract the second part after the colon
    const typeParts = type.split(":");
    if (typeParts.length < 2) {
      return type; // Return the original type if no colon is found
    }
    const secondPart = typeParts[1];

    // Add spaces between camel case words
    const result = secondPart.replace(/([a-z])([A-Z])/g, "$1 $2");
    return result;
  }

  isPdrLink(link: string): boolean {
    return link.includes("data.nist.gov/od/id/");
  }

  onPageChange(event: { page: number; pageSize: number }): void {
    this.pagerConfig = {
      ...this.pagerConfig,
      currentPage: event.page,
      pageSize: event.pageSize,
    };

    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
    this.searchService.setPageSize(this.itemsPerPage);
    this.getCurrentPage(this.currentPage);
  }

  /**
   * Called when user clicks "Search Again" in no-results card.
   * Re-run search (same query) and focuses the global search input if present.
   */
  retrySearch() {
    // Do NOT re-run the same empty-results search; just focus & select so user can edit.
    const searchInput: HTMLInputElement | null =
      document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }

  /**
   * Retry fetching records after a transient failure (system error)
   */
  retryNow() {
    // Clear previous error to reveal skeleton
    this.resultStatus = null;
    this.dataReady = false;
    this.search(
      null,
      this.currentPage || 1,
      this.itemsPerPage,
      this.currentSortOrder,
      this.currentFilter,
      "retry"
    );
  }

  // Format various HttpErrorResponse shapes into a concise string
  private formatHttpError(err: any): string {
    if (!err) return "Unknown error";
    const status = err.status || err.statusCode;
    const text = err.statusText || err.message || "";
    const url = err.url ? ` – ${err.url}` : "";
    if (status) return `${status} ${text}${url}`.trim();
    return text || "Unknown error";
  }

  /**
   * Format the annotation date to a readable format
   * @param dateString - ISO date string from the annotated field
   */
  formatAnnotationDate(dateString: string): string {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      // Format as "MM/DD/YYYY"
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch (e) {
      return dateString; // Return original if parsing fails
    }
  }

  isExternalResult(resultItem: any): boolean {
    return !!(resultItem && (resultItem.external || resultItem.source === "code"));
  }

  getResultTitle(resultItem: any): string {
    if (!resultItem) return "Untitled resource";
    return resultItem.title || resultItem.name || "Untitled resource";
  }

  getResultLink(resultItem: any): string {
    if (!resultItem) return "";
    if (this.isExternalResult(resultItem)) {
      return (
        resultItem.landingPage ||
        resultItem.homepageURL ||
        resultItem.repositoryURL ||
        resultItem.downloadURL ||
        ""
      );
    }
    if (resultItem.ediid) {
      return `${this.PDRAPIURL}${resultItem.ediid}`;
    }
    return resultItem.landingPage || "";
  }

  getResultIcon(resultItem: any): string {
    return this.isExternalResult(resultItem) ? "pi pi-share-alt" : "pi pi-database";
  }

  getPrimaryType(resultItem: any): string {
    if (!resultItem) return "";
    const typeField = resultItem["@type"];
    const typeVal = Array.isArray(typeField) ? typeField[0] : typeField;
    if (!typeVal || typeof typeVal !== "string") {
      return this.isExternalResult(resultItem) ? "External" : "";
    }
    return this.clearResultItemType(typeVal);
  }

  formatContact(resultItem: any): string {
    if (!resultItem) return "";
    if (resultItem.contactPoint && resultItem.contactPoint.fn) {
      return resultItem.contactPoint.fn;
    }
    if (typeof resultItem.contactPoint === "string") {
      return resultItem.contactPoint;
    }
    if (resultItem.organization) return resultItem.organization;
    return "";
  }
}
