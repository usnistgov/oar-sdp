import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { SelectItem } from "primeng/api";
import { TreeNode } from "primeng/api";
// import { Message } from 'primeng/components/common/api';
import { Message } from "primeng/api";
import {
  SearchService,
  SEARCH_SERVICE,
  ProductTypeState,
} from "../../shared/search-service";
import { SearchQueryService } from "../../shared/search-query/search-query.service";
import {
  TaxonomyListService,
  SearchfieldsListService,
} from "../../shared/index";
import * as _ from "lodash-es";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { skip } from "rxjs/operators";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.css"],
  animations: [
    trigger("filterExpand", [
      state("collapsed", style({ width: "40px" })),
      state("expanded", style({ width: "*" })),
      transition("expanded <=> collapsed", animate("625ms")),
    ]),
  ],
})
export class FiltersComponent implements OnInit, AfterViewInit, OnDestroy {
  searchResults: any[] = [];
  suggestedThemes: string[] = [];
  suggestedKeywords: string[] = [];
  suggestedKeywordsLkup: any = {};
  suggestedAuthors: string[] = [];
  selectedAuthor: any[] = [];
  selectedKeywords: any[] = [];
  selectedThemes: any[] = [];
  selectedComponents: any[] = [];
  selectedComponentsNode: any[] = [];
  selectedResourceType: any[] = [];
  selectedResourceTypeNode: any[] = [];
  selectedAuthorDropdown: boolean = false;
  resourceTypesWithCount: TreeNode[] = [];
  authors: string[] = [];
  componentsWithCount: TreeNode[] = [];
  showComponents: string[] = ["Data File", "Access Page", "Subcollection"];
  MoreOptionsDisplayed: boolean = false;
  moreOptionsText: string = "Show More Options...";

  //  NIST theme
  themesWithCount: TreeNode[] = [];
  themesTree: TreeNode[] = [];
  showMoreLink: boolean = false;
  topicsExpanded: boolean = false;
  selectedThemesNode: any[] = [];

  componentsTree: TreeNode[] = [];
  resourceTypeTree: TreeNode[] = [];
  resultStatus: string;
  RESULT_STATUS = {
    success: "SUCCESS",
    noResult: "NO RESULT",
    userError: "USER ERROR",
    sysError: "SYS ERROR",
  };
  keywords: string[];
  searchResultsError: Message[] = [];
  searching: boolean = false;
  msgs: Message[] = [];
  status: string;
  fieldsArray: any[];
  fields: SelectItem[] = [];
  searchResType: string;
  searchResTopics: string;
  searchRecord: string;
  searchAuthors: string;
  searchKeywords: string;
  displayFields: string[] = [];
  queryAdvSearch: string;
  page: number = 1;
  isActive: boolean = true;
  filterClass: string;
  resultsClass: string;
  comheight: string; // parent div height
  comwidth: string; // parent div width
  dropdownLabelLengthLimit: number = 30;
  // Loading flags — reset to true on new search, cleared to false when Facets arrive
  recordHasLoading: boolean = true;
  themeLoading: boolean = true;
  resourceTypeLoading: boolean = true;
  authorsReady: boolean = false;
  private searchResponseSub: any = null;
  private externalToggleSubscription: any = null;
  private productTypeSubscription: any = null;
  private lastProductTypes: ProductTypeState | null = null;
  private lastResponseTotal: number = 0;

  filterStyle = {
    width: "100%",
    "background-color": "white",
    "font-weight": "400",
    "font-style": "italic",
    "font-family": "sans-serif",
  };

  //Error handling
  queryStringErrorMessage: string = "";
  queryStringError: boolean = false;
  errorMessage: string;
  exception: string;
  errorMsg: string;

  @Input() searchValue: string;
  @Input() searchTaxonomyKey: string;
  @Input() parent: HTMLElement; // parent div
  @Input() filterWidthNum: number;
  @Input() mobileMode: boolean = false;
  @Output() filterMode = new EventEmitter<string>(); // normal or collapsed

  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public searchQueryService: SearchQueryService,
    public taxonomyListService: TaxonomyListService,
    public searchFieldsListService: SearchfieldsListService
  ) {
    this.searchFieldsListService.watchFields().subscribe((fields) => {
      this.toSortItems(fields);
    });
  }

  // Track last outbound filter string to suppress only exact echoes
  private lastOutboundFilterString: string | null = null;
  private lastSeenFilterString: string = "NoFilter";
  private filterWatcherSub: any = null;

  /**
   * If search value changed, clear the filters and refresh the search result.
   * @param changes - changed detected
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterWidthNum != undefined && changes.filterWidthNum != null) {
      if (
        changes.filterWidthNum.currentValue !=
        changes.filterWidthNum.previousValue
      ) {
        if (changes.filterWidthNum.currentValue < 40) this.isActive = false;
        else this.isActive = true;
      }
    }

    if (changes.searchValue != undefined && changes.searchValue != null) {
      if (
        changes.searchValue.currentValue != changes.searchValue.previousValue ||
        changes.searchTaxonomyKey.currentValue !=
          changes.searchTaxonomyKey.previousValue
      ) {
        //Clear filters when we conduct a new search
        this.clearFilters();
        // Reset facet aggregation state so new query can trigger fresh expanded fetch
        this.resetFacetAggregationState();
        this.onSearchValueChanged();
      }
    }
  }

  ngOnInit() {
    this.msgs = [];
    this.searchResultsError = [];
    this.MoreOptionsDisplayed = false;
    // Subscribe to unified search response stream. Facets arrive with every response.
    this.searchResponseSub = this.searchService.watchSearchResponse().subscribe((resp:any)=>{
      if(!resp || !resp.ResultData) return;
      const total = this.extractResponseTotal(resp);
      this.lastResponseTotal = total;
      this.onSuccess(resp.ResultData, total, resp.Facets);
    });

    // Sync external filter string -> selection state (chips / removal / reset)
    this.filterWatcherSub = this.searchService.watchFilterString().subscribe(str => {
      const next = str || "NoFilter";
      this.lastSeenFilterString = next;
      if(this.lastOutboundFilterString === str) return; // ignore self echo
      this.applyFilterStringToSelections(next);
    });

    // External toggle changes should reset facet aggregation to avoid stale filters.
    // skip(1) ignores the BehaviorSubject's initial replay so a freshly created panel
    // (e.g. when the layout switches to mobile) does not re-show skeletons for a search
    // that already completed; only genuine toggles after init reset the facet state.
    this.externalToggleSubscription = this.searchService
      .watchExternalProducts()
      .pipe(skip(1))
      .subscribe(() => {
        this.resetFacetAggregationState();
      });

    this.productTypeSubscription = this.searchService
      .watchProductTypes()
      .pipe(skip(1))
      .subscribe((state) => {
        if (!state) return;
        if (this.lastProductTypes && _.isEqual(this.lastProductTypes, state)) {
          return;
        }
        this.lastProductTypes = state;
        this.resetFacetAggregationState();
        // A new search will fire automatically; wait for it to arrive via watchSearchResponse.
      });
  }

  ngOnDestroy(): void {
    if(this.searchResponseSub) { try { this.searchResponseSub.unsubscribe(); } catch {} }
    if(this.filterWatcherSub) { try { this.filterWatcherSub.unsubscribe(); } catch {} }
    if(this.externalToggleSubscription) { try { this.externalToggleSubscription.unsubscribe(); } catch {} }
    if(this.productTypeSubscription) { try { this.productTypeSubscription.unsubscribe(); } catch {} }
  }

  toggleMoreOptions() {
    this.MoreOptionsDisplayed = !this.MoreOptionsDisplayed;
    if (this.MoreOptionsDisplayed) {
      this.moreOptionsText = "Show Less";
    } else {
      this.moreOptionsText = "Show More Options...";
    }
  }

  /** Number of topic cards shown before the user clicks "Show More" (multiple of 3 for a clean grid). */
  private readonly TOPICS_COLLAPSED_COUNT = 9;

  /** PrimeNG icon class for each research topic (fallback used for anything unmapped). */
  private static readonly TOPIC_ICONS: { [topic: string]: string } = {
    "Information Technology": "pi-desktop",
    "Materials": "pi-box",
    "Standards": "pi-check-circle",
    "Physics": "pi-bolt",
    "Manufacturing": "pi-cog",
    "Chemistry": "pi-filter",
    "Mathematics and Statistics": "pi-chart-bar",
    "Advanced Communications": "pi-wifi",
    "Metrology": "pi-compass",
    "Bioscience": "pi-heart",
    "Electronics": "pi-mobile",
    "Environment": "pi-globe",
    "Forensics": "pi-search",
    "Public Safety": "pi-shield",
    "Fire": "pi-exclamation-triangle",
    "Health": "pi-heart-fill",
    "Energy": "pi-sun",
    "Buildings and Construction": "pi-building",
    "Nanotechnology": "pi-th-large",
    "Biometrics": "pi-id-card",
    "Neutron Research": "pi-prime",
    "Resilience": "pi-refresh",
    "Drugs and toxicology": "pi-ban",
    "DNA and biological evidence": "pi-share-alt",
    "Digital and multimedia evidence": "pi-video",
    "Infrastructure": "pi-sitemap",
    "Performance Excellence": "pi-star",
    "Trace evidence": "pi-search-plus",
    "Ballistics": "pi-send",
    "Information Processing Systems": "pi-server",
    "Heating and cooling equipment": "pi-sliders-h",
    "Greenhouse gases": "pi-cloud",
    "Fingerprints and pattern evidence": "pi-clone",
  };

  /**
   * PrimeNG icon class for each resource type. Keys are normalised (lower-cased,
   * whitespace removed) so both the backend facet labels ("Public Data Resource")
   * and the space-free placeholder values ("PublicDataResource") resolve.
   */
  private static readonly RESOURCE_TYPE_ICONS: { [key: string]: string } = {
    publicdataresource: "pi-database",
    datapublication: "pi-file-pdf",
    srd: "pi-bookmark",
    coderepository: "pi-code",
    paper: "pi-book",
    patent: "pi-briefcase",
    dataset: "pi-table",
  };

  /**
   * PrimeNG icon class for each "Record has" component. Keys are normalised so the
   * facet labels ("Data File") and placeholder values ("DataFile") both resolve.
   */
  private static readonly COMPONENT_ICONS: { [key: string]: string } = {
    datafile: "pi-file",
    accesspage: "pi-link",
    subcollection: "pi-folder",
  };

  /** Topic cards to render: all when expanded, otherwise the first TOPICS_COLLAPSED_COUNT. */
  get visibleTopics(): TreeNode[] {
    if (this.topicsExpanded) return this.themesWithCount;
    return this.themesWithCount.slice(0, this.TOPICS_COLLAPSED_COUNT);
  }

  /** Shared trackBy for every facet card grid (topics, resource types, record-has). */
  trackFacet = (_: number, node: any): string => (node && (node.key || node.data)) || '';

  /** Normalise a facet label to an icon-map key (case- and whitespace-insensitive). */
  private static iconKey(value: string): string {
    return String(value || '').replace(/\s+/g, '').toLowerCase();
  }

  /** PrimeNG icon class for a research topic, with a neutral fallback. */
  topicIcon(topic: string): string {
    return FiltersComponent.TOPIC_ICONS[topic] || 'pi-tag';
  }

  /** PrimeNG icon class for a resource type, with a neutral fallback. */
  resourceTypeIcon(label: string): string {
    return FiltersComponent.RESOURCE_TYPE_ICONS[FiltersComponent.iconKey(label)] || 'pi-tag';
  }

  /** PrimeNG icon class for a "Record has" component, with a neutral fallback. */
  componentIcon(label: string): string {
    return FiltersComponent.COMPONENT_ICONS[FiltersComponent.iconKey(label)] || 'pi-tag';
  }

  /** Count badge value for a facet card (label is "Name-count"; split on the last hyphen). */
  facetCount(node: any): string {
    if (!node || !node.label) return '';
    const label = String(node.label);
    const idx = label.lastIndexOf('-');
    return idx > -1 ? label.slice(idx + 1) : '';
  }

  /**
   * Whether `node` is present in the given facet selection array (matched by value).
   * @param node facet card node
   * @param selection one of the selectedThemesNode / selectedResourceTypeNode /
   *   selectedComponentsNode arrays
   */
  isFacetSelected(node: any, selection: any[]): boolean {
    return !!node && selection.some(n => n && n.data === node.data);
  }

  /**
   * Toggle a facet card's membership in its selection array and re-run the search.
   * The array is mutated in place so the existing filterResults() wiring (which reads
   * the component's selection fields) keeps working unchanged.
   * @param node facet card node to toggle
   * @param selection the backing selection array for that facet
   */
  toggleFacet(node: any, selection: any[]): void {
    if (!node) return;
    const idx = selection.findIndex(n => n && n.data === node.data);
    if (idx > -1) selection.splice(idx, 1);
    else selection.push(node);
    this.filterResults();
  }

  /** Expand/collapse the research topic card grid (no height animation — cards reflow naturally). */
  toggleTopicsExpanded(): void {
    this.topicsExpanded = !this.topicsExpanded;
  }

  /**
   * After view init, make the filter width the same as parent div in the parent component
   * Default width is 400px.
   */
  ngAfterViewInit() {
    if (this.parent) this.comwidth = this.parent.clientWidth + "px";
    else this.comwidth = "400px";
  }

  onSearchValueChanged() {
    this.searchService.setQueryValue(this.searchValue, "", "");
    this.queryStringErrorMessage = this.searchQueryService.validateQueryString(
      this.searchValue
    );
    if (!this.queryStringErrorMessage) {
      this.queryStringError = true;
    }

  }

  /**
   * Sort the given fields and populate this.fields
   * @param fields
   */
  toSortItems(fields: any[]) {
    this.fieldsArray = fields;
    let sortItems: SelectItem[] = [];
    this.fields = [];
    let dupFound: boolean = false;

    if (fields && fields.length > 0) {
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
          if (!dupFound)
            this.fields.push({ label: field.label, value: lValue });
        }
      }
    }

    this.fields = _.sortBy(this.fields, ["label", "value"]);
  }

  /**
   * Called when a search response arrives. Facets from the backend are used directly
   * for counts — no secondary fetch required.
   */
  onSuccess(searchResults: any[], totalCount?: number, facets?: any) {
    this.resultStatus = this.RESULT_STATUS.success;
    this.searchResults = searchResults;
    this.searchResultsError = [];
    if (searchResults.length === 0) {
      this.resultStatus = this.RESULT_STATUS.noResult;
    }
    this.buildFacetCounts(facets);
  }

  private resetFacetAggregationState() {
    // Show skeletons again until new Facets arrive with the next search response
    this.recordHasLoading = true;
    this.themeLoading = true;
    this.resourceTypeLoading = true;
    this.authorsReady = false;
  }

  /**
   * Build all facet trees and autocomplete lists from the backend Facets object.
   * Backend Facets are the single source of truth for the filter panel. When a
   * response carries no Facets (e.g. external-product-only results), render empty
   * facet lists instead of running the deprecated client-side page aggregation,
   * which produced misleading "Unspecified" topics and page-limited counts.
   */
  private buildFacetCounts(facets?: any) {
    this.buildFromFacets(facets || {});

    // Ensure Record Has always shows its three options, even when the backend
    // returned no component facets for the current query.
    if (this.componentsWithCount.length === 0) {
      this.componentsWithCount = [
        { label: 'Data File-0', data: 'Data File', key: 'DataFile' },
        { label: 'Access Page-0', data: 'Access Page', key: 'AccessPage' },
        { label: 'Subcollection-0', data: 'Subcollection', key: 'SubCollection' }
      ];
    }

    this.themesTree = [{ label: 'Research Topics -', expanded: true, children: this.themesWithCount, key: 'ResearchTopics' }];
    this.resourceTypeTree = [{ label: 'Type of Resource  -', expanded: true, children: this.resourceTypesWithCount, key: 'ResourceType' }];
    this.componentsTree = [{ label: 'Record has -', expanded: true, children: this.componentsWithCount, key: 'RecordHas' }];
    this.componentsTree[0].selectable = false;
    for (let i = 0; i < this.componentsWithCount.length; i++) this.componentsTree[0].children[i].selectable = false;

    this.authorsReady = true;
    this.topicsExpanded = false;
    this.applyFilterStringToSelections(this.lastSeenFilterString);
    this.setFacetLoadingComplete();
    this.searching = false;
  }

  /**
   * Populate facet arrays directly from the backend Facets object.
   * Shape: { topics: [{tag, count}], resourceTypes: [{type, count}],
   *          components: [{type, count}], authors: [{name}], keywords: [{keyword}] }
   */
  private buildFromFacets(facets: any) {
    // Topics → themesWithCount (sorted by count desc, backend may already sort)
    const topics: any[] = Array.isArray(facets.topics) ? facets.topics : [];
    this.themesWithCount = topics
      .filter(t => t && t.tag)
      .map(t => ({
        label: `${t.tag}-${t.count ?? 0}`,
        data: t.tag,
        key: t.tag,
      }));
    this.showMoreLink = this.themesWithCount.length > this.TOPICS_COLLAPSED_COUNT;

    // Resource types → resourceTypesWithCount
    const resourceTypes: any[] = Array.isArray(facets.resourceTypes) ? facets.resourceTypes : [];
    this.resourceTypesWithCount = resourceTypes
      .filter(rt => {
        if (!rt || !rt.type || !String(rt.type).trim()) return false;
        const parts = (rt.type as string).split(':');
        const label = _.startCase(parts.length > 1 ? parts[parts.length - 1] : parts[0]);
        return !!label && label.toLowerCase() !== 'dataset';
      })
      .map(rt => {
        const parts = (rt.type as string).split(':');
        const label = _.startCase(parts.length > 1 ? parts[parts.length - 1] : parts[0]);
        return {
          label: `${label}-${rt.count ?? 0}`,
          data: label,
          key: label,
        };
      });

    // Components → componentsWithCount (only the three shown in the UI)
    const components: any[] = Array.isArray(facets.components) ? facets.components : [];
    this.componentsWithCount = components
      .filter(c => {
        if (!c || !c.type) return false;
        const parts = (c.type as string).split(':');
        const label = _.startCase(parts.length > 1 ? parts[parts.length - 1] : parts[0]);
        return this.showComponents.includes(label);
      })
      .map(c => {
        const parts = (c.type as string).split(':');
        const label = _.startCase(parts.length > 1 ? parts[parts.length - 1] : parts[0]);
        return {
          label: `${label}-${c.count ?? 0}`,
          data: label,
          key: label,
        };
      });

    // Authors autocomplete
    const authors: any[] = Array.isArray(facets.authors) ? facets.authors : [];
    this.authors = authors.map(a => a.name).filter(n => !!n);

    // Keywords autocomplete
    const keywords: any[] = Array.isArray(facets.keywords) ? facets.keywords : [];
    this.keywords = keywords.map(k => k.keyword).filter(k => !!k);
  }

  private setFacetLoadingComplete() {
    this.recordHasLoading = false;
    this.themeLoading = false;
    this.resourceTypeLoading = false;
  }

  private extractResponseTotal(resp: any): number {
    if (!resp || typeof resp !== "object") return 0;
    const total =
      resp.ResultCount ??
      resp.total ??
      resp.totalItems ??
      (Array.isArray(resp.ResultData) ? resp.ResultData.length : 0);
    return typeof total === "number" && total >= 0 ? total : 0;
  }

  /**
   * If search is unsuccessful push the error message
   */
  onError(error: any[]) {
    this.searchResults = [];
    this.keywords = [];
    this.msgs = [];

    if ((<any>error).status == 400) {
      this.resultStatus = this.RESULT_STATUS.userError;
    } else {
      this.resultStatus = this.RESULT_STATUS.sysError;
    }

    this.exception = (<any>error).ex;
    this.errorMsg = (<any>error).message;
    this.status = (<any>error).httpStatus;
    this.msgs.push({
      severity: "error",
      summary: this.errorMsg + ":",
      detail: this.status + " - " + this.exception,
    });
    this.searching = false;
  }

  /**
   * Form the filter string and refresh the result page
   */
  filterResults() {
    let lFilterString: string = "";
    this.selectedThemes = [];
    this.selectedComponents = [];
    this.selectedResourceType = [];
    let themeSelected: boolean = false;
    let componentSelected: boolean = false;
    let resourceTypesSelected: boolean = false;
    let themeType = "";
    let compType = "";
    let resourceType = "";

    // Resource type
    if (this.selectedResourceTypeNode.length > 0) {
      lFilterString += "@type=";

      for (let res of this.selectedResourceTypeNode) {
        if (
          res &&
          typeof res.data !== "undefined" &&
          res.data !== "undefined"
        ) {
          resourceTypesSelected = true;
          this.selectedResourceType.push(res.data);
          resourceType += res.data + ",";

          lFilterString += res.data.replace(/\s/g, "") + ",";
        }
      }

      lFilterString = this.removeEndingComma(lFilterString);
    }

    // NIST Research topics
    if (this.selectedThemesNode.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "topic.tag=";

      for (let theme of this.selectedThemesNode) {
        if (
          theme != "undefined" &&
          typeof theme.data !== "undefined" &&
          theme.data !== "undefined"
        ) {
          themeSelected = true;
          this.selectedThemes.push(theme.data);
          themeType += theme.data + ",";

          lFilterString += theme.data.trim() + ",";
        }
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);

    // Record has
    if (this.selectedComponentsNode.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "components.@type=";

      for (let comp of this.selectedComponentsNode) {
        if (
          comp != "undefined" &&
          typeof comp.data !== "undefined" &&
          comp.data !== "undefined"
        ) {
          componentSelected = true;
          this.selectedComponents.push(comp.data);
          compType += comp.data + ",";

          lFilterString += comp.data.replace(/\s/g, "") + ",";
        }
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);

    // Authors and contributors
    if (this.selectedAuthor.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "contactPoint.fn=";

      for (let author of this.selectedAuthor) {
        lFilterString += author + ",";
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);

    // Keywords
    if (this.selectedKeywords.length > 0) {
      if (lFilterString != "") lFilterString += "&";

      lFilterString += "keyword=";

      for (let keyword of this.selectedKeywords) {
        lFilterString += this.suggestedKeywordsLkup[keyword] + ",";
      }
    }

    lFilterString = this.removeEndingComma(lFilterString);
    if (!lFilterString) lFilterString = "NoFilter";

  this.lastOutboundFilterString = lFilterString;
  this.searchService.setFilterString(lFilterString);
  }

  /**
   * Parse an incoming filter query string (e.g. "@type=Dataset,Software&topic.tag=Fire&components.@type=AccessPage")
   * and update selection node arrays so UI checkmarks reflect external changes (chip removal/reset).
   */
  private applyFilterStringToSelections(filterStr: string){
    if(!filterStr || filterStr === 'NoFilter'){
      this.clearSelectionsOnly();
      return;
    }
    // Break into segments by '&'
    const segs = filterStr.split('&');
    const typeMap: {[k:string]: string[]} = {};
    for(const seg of segs){
      const [k, v] = seg.split('=');
      if(!k || !v) continue;
      const values = v.split(',').filter(x=>!!x);
      if(!typeMap[k]) typeMap[k] = [];
      typeMap[k].push(...values);
    }
    // Clear current selections
    this.clearSelectionsOnly();

    // Helper: find matching TreeNode(s) by comparing data with optional space-stripped normalization
    const findNodes = (tree: TreeNode[] | undefined, values: string[], spaceInsensitive: boolean = false): any[] => {
      if(!tree || !tree.length) return [];
      const root = tree[0];
      if(!root || !root.children) return [];
      const matches: any[] = [];
      const norm = (s:string) => spaceInsensitive ? s.replace(/\s/g,'').toLowerCase() : s.toLowerCase();
      const childIndex: {[k:string]: any} = {};
      root.children.forEach(ch => { if(ch && ch.data) childIndex[norm(String(ch.data))] = ch; });
      values.forEach(v => {
        const key = norm(String(v));
        if(childIndex[key]) matches.push(childIndex[key]);
      });
      return matches;
    };

    // Apply @type
    if(typeMap['@type']){
      // Original filter string removed spaces when emitting (@type=DataPublication) whereas tree nodes keep spaces ("Data Publication").
      // We therefore track both raw (no-space) and display (with-space) forms.
      const rawTypes = [...new Set(typeMap['@type'])];
      // Derive display form by reinserting spaces using simple startCase heuristic if tree node not found directly.
      const toDisplay = (val:string) => {
        // If an exact (case-insensitive) match exists among tree children (ignoring spaces) we will use that child.data directly later.
        // For label list we prefer tree node data; keep a fallback transformation.
        return _.startCase(val); // e.g. DataPublication -> Data Publication
      };
      // Map raw values to actual TreeNode references
      const typeNodes = findNodes(this.resourceTypeTree, rawTypes, true /* space insensitive */);
      this.selectedResourceTypeNode = typeNodes;
      this.selectedResourceType = typeNodes.map(n => n.data) || rawTypes.map(toDisplay);
    }
    // Apply topic.tag
    if(typeMap['topic.tag']){
      const topics = [...new Set(typeMap['topic.tag'])];
      const topicNodes = findNodes(this.themesTree, topics, false);
      this.selectedThemesNode = topicNodes;
      this.selectedThemes = topicNodes.map(n => n.data);
    }
    // Apply components.@type
    if(typeMap['components.@type']){
      const compsRaw = [...new Set(typeMap['components.@type'])];
      const compNodes = findNodes(this.componentsTree, compsRaw, true /* space insensitive */);
      this.selectedComponentsNode = compNodes;
      this.selectedComponents = compNodes.map(n => n.data);
    }
    // Apply authors (contactPoint.fn)
    if(typeMap['contactPoint.fn']){
      // Direct value list; maintain selectedAuthor array used by filterResults()
      this.selectedAuthor = [...new Set(typeMap['contactPoint.fn'])];
    }
    // Apply keywords
    if(typeMap['keyword']){
      // Keywords are stored in their original form in the filter string; assign directly
      this.selectedKeywords = [...new Set(typeMap['keyword'])];
    }
  }

  /** Clear only selection arrays (do not emit/filter string) */
  private clearSelectionsOnly(){
    this.selectedThemes = [];
    this.selectedThemesNode = [];
    this.selectedComponents = [];
    this.selectedComponentsNode = [];
    this.selectedResourceType = [];
    this.selectedResourceTypeNode = [];
    this.selectedAuthor = [];
    this.selectedKeywords = [];
  }

  /**
   * Remove the ending comma of the given string
   * @param inputrString
   */
  removeEndingComma(inputrString: string): string {
    if (!inputrString) return "";

    if (inputrString[inputrString.length - 1] == ",")
      return inputrString.substr(0, inputrString.length - 1);
    else return inputrString;
  }

  /**
   * Create a list of suggested authors based on given search query
   * @param event - search query that user typed into the filter box
   */
  filterAuthors(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let author = event.query;
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.authors.length; i++) {
      let auth = this.authors[i];
      if (auth.toLowerCase().indexOf(author.toLowerCase()) >= 0) {
        filtered.push(auth);
      }
    }

    this.suggestedAuthors = filtered;
  }

  /**
   * Create a list of suggested keywords based on given search query
   * Because some keywords might be very long, for display purpose we only show the first few words in
   * the dropdown list.
   * suggestedKeywords - for display
   * suggestedKeywordsLkup - stores the real ketwords
   * @param event - search query that user typed into the keyword filter box
   */
  updateSuggestedKeywords(event: any) {
    let keyword = event.query.toLowerCase();
    this.suggestedKeywords = [];
    this.suggestedKeywordsLkup = {};

    // Handle current keyword: update suggested keywords and lookup
    for (let i = 0; i < this.keywords.length; i++) {
      let keyw = this.keywords[i].trim().toLowerCase();
      if (keyw.indexOf(keyword) >= 0) {
        //Avoid duplicate
        if (
          this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] == undefined
        ) {
          this.suggestedKeywords.push(this.shortenKeyword(keyw));
          this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] = keyw;
        }
      }
    }

    // Handle selected keyword: update suggested keywords lookup. Lookup array must cover all selected keywords.
    this.selectedKeywords.forEach((kw) => {
      for (let i = 0; i < this.keywords.length; i++) {
        let keyw = this.keywords[i].trim().toLowerCase();
        if (keyw.indexOf(kw.toLowerCase()) >= 0) {
          if (
            this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] == undefined
          ) {
            this.suggestedKeywordsLkup[this.shortenKeyword(keyw)] = keyw;
          }
        }
      }
    });

    this.suggestedKeywords = this.sortAlphabetically(this.suggestedKeywords);
  }

  /**
   * Some keywords are very long. They cause problem when display both in suggested keyword list or
   * selected keyword list. This function returns the first few words of the input keyword. The length
   * of the return string is based on this.dropdownLabelLengthLimit but not exactly.
   * If the length of the input keyword is less than dropdownLabelLengthLimit, the input keyword will be returned.
   * Otherwise, It selects the first few words whose total length is just exceed the length limit followed by "...".
   * @param keyword
   * @returns Keyword abbreviate
   */
  shortenKeyword(keyword: string) {
    let keywordAbbr: string;

    //If the keyword length is greater than the maximum length, we want to truncate
    //it so that the length is close the maximum length.

    if (keyword.length > this.dropdownLabelLengthLimit) {
      let wordCount = 1;
      while (
        keyword.split(" ", wordCount).join(" ").length <
        this.dropdownLabelLengthLimit
      ) {
        wordCount++;
      }

      keywordAbbr = keyword.substring(
        0,
        keyword.split(" ", wordCount).join(" ").length
      );
      if (keywordAbbr.trim().length < keyword.length)
        keywordAbbr = keywordAbbr + "...";

      let i = 1;
      let tmpKeyword = keywordAbbr;
      while (
        Object.keys(this.suggestedKeywordsLkup).indexOf(tmpKeyword) >= 0 &&
        this.suggestedKeywordsLkup[tmpKeyword] != keyword &&
        i < 100
      ) {
        tmpKeyword = keywordAbbr + "(" + i + ")";
        i++;
      }
      keywordAbbr = tmpKeyword;
    } else keywordAbbr = keyword;

    return keywordAbbr;
  }

  /**
   * Sort arrays alphabetically
   * @param array - array to be sorted
   */
  sortAlphabetically(array: string[]) {
    var sortedArray: string[] = array.sort((n1, n2) => {
      if (n1 > n2) return 1;

      if (n1 < n2) return -1;

      return 0;
    });

    return sortedArray;
  }

  /**
   * Return filter icon image class based on filter status
   */
  getFilterImgClass() {
    if (this.isActive) {
      if (this.mobileMode) {
        return "faa faa-angle-double-up";
      } else {
        return "faa faa-angle-double-left";
      }
    } else {
      if (this.mobileMode) {
        return "faa faa-angle-double-down";
      } else {
        return "faa faa-angle-double-right";
      }
    }
  }

  /**
   * clear filters
   */
  clearFilters() {
    // Clear only selections & suggestion arrays that depend on them.
    this.selectedAuthor = [];
    this.selectedKeywords = [];
    this.selectedThemes = [];
    this.selectedThemesNode = [];
    this.selectedComponents = [];
    this.selectedComponentsNode = [];
    this.selectedResourceType = [];
    this.selectedResourceTypeNode = [];
    this.selectedAuthorDropdown = false;

    // Do not rebuild facet trees here. That caused transient state where counts / ordering changed
    // and showMoreLink logic flickered (looked like topics disappeared). The next incoming search
    // response (already triggered by ResultsComponent due to filter string change) will rebuild
    // via onSuccess -> buildFacetCounts(). We only need to emit a neutral filter string.

    // Emit 'NoFilter' to clear chips; suppress echo loop tracking.
    this.lastOutboundFilterString = 'NoFilter';
    this.searchService.setFilterString('NoFilter');
  }

  /**
   * Set the width of the filter column. If the filter is active, set the width to 25%.
   * If the filter is collapsed, set the width to 40px.
   */
  setFilterWidth() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.filterMode.emit("collapsed");
    } else {
      this.filterMode.emit("normal");
    }
  }
}
