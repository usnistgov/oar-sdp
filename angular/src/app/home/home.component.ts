// import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AppConfig, Config } from "../shared/config-service/config.service";
import { SearchService, SEARCH_SERVICE } from "../shared/search-service";
import { SDPQuery, QueryRow } from "../shared/search-query/query";
import { Subscription } from "rxjs";
import { startCase } from "lodash";

interface TaxonomyNode {
  _id?: string;
  term?: string;
  label?: string;
  level?: number;
  parent?: string;
  [key: string]: any;
}

interface TopicTreeNode {
  id: string;
  label: string;
  query: string;
  level: number;
  parentLabel?: string;
  children: TopicTreeNode[];
}

interface RecentFeedDateField {
  field: string;
  label: string;
}

interface RecentFeedConfig {
  id: string;
  label: string;
  description?: string;
  sort?: string;
  filter?: string;
  pageSize?: number;
  dateFields?: RecentFeedDateField[];
  emptyMessage?: string;
  icon?: string;
  metricsLabel?: string;
  freeText?: string;
  queryRows?: FeedQueryRow[];
  requests?: FeedRequestVariant[];
  keywordsLimit?: number;
  typesLimit?: number;
}

interface FeedQueryRow {
  field: string;
  value: string;
  operator?: string;
  fieldType?: string;
}

interface RecentFeedState {
  items: any[];
  loading: boolean;
  error: boolean;
  loaded: boolean;
  total?: number;
  metrics?: Record<string, any>;
}

interface FeedRequestVariant {
  filter?: string | null;
  sort?: string | null;
  freeText?: string | null;
  queryRows?: FeedQueryRow[];
}
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: "sdp-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  confValues: Config;
  PDRAPIURL: string;
  SDPAPIURL: string;
  RMMAPIURL: string;
  forensicsURL: string;
  chipsURL: string;
  aiURL: string;
  recentDatasets: any[] = [];
  recentFeeds: RecentFeedConfig[] = [
    {
      id: "latest-updated",
      label: "Latest Updates",
      description: "Resources most recently updated across the catalog.",
      icon: "pi pi-history",
      metricsLabel: "updates",
      sort: "annotated:desc",
      filter: "@type=Dataset",
      keywordsLimit: 2,
      typesLimit: 1,
      dateFields: [
        { field: "annotated", label: "Updated" },
        { field: "modified", label: "Modified" },
      ],
    },
    {
      id: "latest-released",
      label: "Latest Releases",
      description: "Resources newly released to the public.",
      icon: "pi pi-calendar",
      metricsLabel: "releases",
      sort: "firstIssued:desc",
      filter: "@type=Dataset",
      keywordsLimit: 2,
      typesLimit: 1,
      dateFields: [
        { field: "firstIssued", label: "Released" },
        { field: "issued", label: "Released" },
        { field: "annotated", label: "Updated" },
      ],
    },
    // {
    //   id: "data-publications",
    //   label: "Data Publications",
    //   description: "Fresh NIST data publications and reports.",
    //   icon: "pi pi-book",
    //   metricsLabel: "publications",
    //   sort: "firstIssued:desc",
    //   filter: "@type=nrdp:DataPublication",
    //   keywordsLimit: 3,
    //   typesLimit: 1,
    //   dateFields: [
    //     { field: "firstIssued", label: "Published" },
    //     { field: "issued", label: "Published" },
    //     { field: "annotated", label: "Updated" },
    //   ],
    //   emptyMessage:
    //     "No recent data publications are available right now. Check back soon or explore another feed.",
    // },
    // {
    //   id: "ai-spotlight",
    //   label: "AI & Data Science",
    //   description:
    //     "Featured artificial intelligence and machine learning resources.",
    //   icon: "pi pi-chart-line",
    //   metricsLabel: "AI resources",
    //   sort: "annotated:desc",
    //   filter: "@type=Dataset",
    //   keywordsLimit: 2,
    //   typesLimit: 1,
    //   queryRows: [{ field: "topic.tag", value: "Artificial Intelligence" }],
    //   requests: [
    //     {
    //       queryRows: [{ field: "keyword", value: "Artificial Intelligence" }],
    //     },
    //     {
    //       filter: null,
    //       freeText: "Artificial Intelligence",
    //     },
    //   ],
    //   emptyMessage:
    //     "No fresh AI resources are available right now. Try another feed or explore the catalog.",
    // },
    // {
    //   id: "srd-updates",
    //   label: "Standard Reference Data",
    //   description: "New and updated entries from the SRD program.",
    //   icon: "pi pi-database",
    //   metricsLabel: "SRD releases",
    //   sort: "modified:desc",
    //   filter: "@type=nrdp:SRD",
    //   keywordsLimit: 2,
    //   typesLimit: 1,
    //   dateFields: [
    //     { field: "modified", label: "Updated" },
    //     { field: "firstIssued", label: "Released" },
    //     { field: "issued", label: "Released" },
    //     { field: "annotated", label: "Updated" },
    //   ],
    //   emptyMessage:
    //     "No SRD releases are available right now. Try another feed or explore the catalog.",
    //   requests: [
    //     { filter: '@type=%22nrdp:SRD%22' },
    //     { filter: "@type=nrdp%3ASRD" },
    //     {
    //       filter: "@type=SRD",
    //     },
    //     { filter: '@type=%22SRD%22' },
    //     {
    //       filter: null,
    //       queryRows: [{ field: "@type", value: "nrdp:SRD" }],
    //     },
    //     {
    //       filter: null,
    //       queryRows: [{ field: "components.@type", value: "nrdp:SRD" }],
    //     },
    //     {
    //       filter: null,
    //       freeText: "Standard Reference Data",
    //     },
    //     {
    //       filter: null,
    //       freeText: "Standard Reference Data",
    //       queryRows: [
    //         { field: "topic.tag", value: "Standard Reference Data" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: "tools-portals",
    //   label: "Tools & Portals",
    //   description: "Interactive tools and service portals supporting research.",
    //   icon: "pi pi-globe",
    //   metricsLabel: "portals",
    //   sort: "annotated:desc",
    //   filter: "@type=nrd:Portal",
    //   keywordsLimit: 2,
    //   typesLimit: 1,
    //   dateFields: [
    //     { field: "annotated", label: "Updated" },
    //     { field: "modified", label: "Modified" },
    //   ],
    //   emptyMessage:
    //     "No new tools or portals right now. Explore the catalog for additional services.",
    // },
  ];
  activeRecentFeedId = this.recentFeeds[0]?.id ?? "";
  private recentFeedsState: Record<string, RecentFeedState> = {};
  private recentFeedSubs = new Map<string, Subscription>();
  showAllCollections = false;
  featuredCollections: any[] = [];
  staticTopics: { label: string; query: string }[] = [
    { label: "Nanotechnology", query: 'topic.tag="Nanotechnology"' },
    { label: "Biotechnology", query: 'topic.tag="Biotechnology"' },
    { label: "Chemistry", query: 'topic.tag="Chemistry"' },
    { label: "Materials Science", query: 'topic.tag="Materials Science"' },
    { label: "Engineering", query: 'topic.tag="Engineering"' },
    { label: "Physics", query: 'topic.tag="Physics"' },
    { label: "Manufacturing", query: 'topic.tag="Manufacturing"' },
    { label: "Cybersecurity", query: 'topic.tag="Cybersecurity"' },
  ];
  topicRoots: TopicTreeNode[] = [];
  topicPath: TopicTreeNode[] = [];
  currentTopics: TopicTreeNode[] = [];
  topicsLoading = true;
  topicsError = false;
  skeletonCards = [0, 1, 2, 3, 4, 5];
  private readonly defaultRecentPageSize = 3;
  private readonly defaultRecentDateFields: RecentFeedDateField[] = [
    { field: "annotated", label: "Updated" },
    { field: "modified", label: "Modified" },
    { field: "firstIssued", label: "Released" },
    { field: "issued", label: "Released" },
  ];
  private readonly resourceTypeLabels: Record<string, string> = {
    Dataset: "Dataset",
    "dcat:Dataset": "Dataset",
    "nrdp:PublicDataResource": "Public Data Resource",
    "nrdp:DataPublication": "Data Publication",
    "nrd:Portal": "Research Portal",
    "nrdp:SRD": "Standard Reference Dataset",
  };
  private taxonomySub?: Subscription;
  @ViewChild("collectionsRail") collectionsRail?: ElementRef<HTMLDivElement>;
  showLeftCollectionArrow = false;
  showRightCollectionArrow = false;

  themes: any = {
    ai: {
      title: "ARTIFICIAL INTELLIGENCE",
      description:
        "NIST is advancing the science of artificial intelligence (AI) to improve the quality and reliability of AI systems.",
      image: "assets/images/Theme_AI.png",
      icon: "assets/images/forensics_collection.png",
      // curated: true,
      searchTerm: "Artificial Intelligence",
    },
    chips: {
      title: "CHIPS METIS",
      description:
        "NIST is working to develop the measurement science needed to support the next generation of computer chips.",
      image: "assets/images/Theme_CHIPS.png",
      icon: "assets/images/forensics_collection.png",
      curated: true,
      searchTerm: "CHIPS",
    },
    forensics: {
      title: "FORENSICS",
      description:
        "Bringing together experts from the forensic, research, legal and law enforcement communities to strengthen forensic science and create a safer, more just society.",
      image: "assets/images/Theme_Forensics.jpg",
      curated: true,
      icon: "assets/images/forensics_collection.png",
      searchTerm: "Forensics",
    },
    // it: {
    //   title: "INFORMATION TECHNOLOGY",
    //   description:
    //     "NIST advances the state-of-the-art in IT in such applications as cybersecurity and biometrics.",
    //   image: "assets/images/Theme_InformationTechnology.png",
    // },

    bioscience: {
      title: "BIOSCIENCE",
      description: "TO DO",
      image: "assets/images/Theme_Bioscience.png",
      searchTerm: "Bioscience",
    },
    quantum: {
      title: "QUANTUM SCIENCE",
      description: "TO DO",
      image: "assets/images/Theme_Quantum.png",
      searchTerm: "Quantum",
    },
    additiveManufacturing: {
      title: "ADDITIVE MANUFACTURING",
      description:
        "NIST is advancing the science of additive manufacturing (3D printing) to improve the quality and reliability of 3D printed parts.",
      image: "assets/images/Theme_AdditiveManufacturing.jpg",
      searchTerm: '"Additive Manufacturing"',
    },
    Materials: {
      title: "MATERIALS",
      description:
        "NIST develops testbeds, defines benchmarks and develops formability measurements and models for a variety of emerging materials.",
      image: "assets/images/Theme_Materials.jpg",
      searchTerm: "Materials",
    },
    ms: {
      title: "MATHEMATICS AND STATS",
      description:
        "NIST researchers use the latest mathematics approaches and computational methods to help tackle some of the most difficult scientific, technical and engineering problems and tasks.",
      image: "assets/images/Theme_MathematicsStatistics.png",
      searchTerm: "MS",
    },
    manufacturing: {
      title: "MANUFACTURING",
      description:
        "NIST provides technical support to the nation's manufacturing industry as they strive to out-innovate and outperform the competition.",
      image: "assets/images/Theme_Manufacturing.png",
      searchTerm: "Manufacturing",
    },

    Physics: {
      title: "PHYSICS AND NEUTRON",
      description:
        "NIST provides the measurements, standards, and technical expertise scientists and industries need to push the limits of the fundamental properties of nature.",
      image: "assets/images/Theme_Physics.jpg",
      searchTerm: "PN",
    },
    Communications: {
      title: "ADVANCED COMMUNICATIONS",
      description:
        "NIST promotes the development and deployment of advanced communications technologies by advancing the measurement science underlying wireless technologies.",
      image: "assets/images/Theme_AdvancedCommunications.jpg",
      searchTerm: "AC",
    },
    Chemistry: {
      title: "CHEMISTRY",
      description:
        "NIST develops the technology, measurement methods and standards to address the needs of the chemical industry.",
      image: "assets/images/Theme_Chemistry.png",
      searchTerm: "Chemistry",
    },
  };

  constructor(
    private router: Router,
    private appConfig: AppConfig,
    private http: HttpClient,
    @Inject(SEARCH_SERVICE) private searchService: SearchService
  ) {
    this.appConfig.getConfig().subscribe((conf) => {
      this.PDRAPIURL = conf.PDRAPI ?? conf.SDPAPI;
      this.SDPAPIURL = conf.SDPAPI;
      this.forensicsURL = conf.SERVERBASE + "/forensics";
      this.chipsURL = conf.SERVERBASE + "/chips";
      this.aiURL = conf.SERVERBASE + "/ai";
      const nextRMM = conf.RMMAPI;
      const shouldLoadTopics = !!nextRMM && nextRMM !== this.RMMAPIURL;
      this.RMMAPIURL = nextRMM;
      if (shouldLoadTopics) {
        this.loadTopicTree();
      } else if (!nextRMM) {
        this.topicsLoading = false;
      }
    });
  }

  ngOnInit() {
    this.featuredCollections = this.getThemesList();
    this.initializeRecentFeedState();
    if (this.activeRecentFeedId) {
      this.activateRecentFeed(this.activeRecentFeedId);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateCollectionScrollControls(), 0);
  }

  ngOnDestroy(): void {
    this.recentFeedSubs.forEach((sub) => sub.unsubscribe());
    this.recentFeedSubs.clear();
    if (this.taxonomySub) {
      this.taxonomySub.unsubscribe();
    }
  }

  /**
   * Set the search parameters and redirect to search page
   */
  search(searchValue: string) {
    let queryValue: string;

    switch (searchValue) {
      case "IT": {
        queryValue = 'topic.tag="Information Technology"';
        break;
      }
      case "MS": {
        queryValue = 'topic.tag="Mathematics AND Statistics"';
        break;
      }
      case "Manufacturing": {
        queryValue = "topic.tag=Manufacturing";
        break;
      }
      case "Forensics": {
        queryValue = "topic.tag=Forensics";
        break;
      }
      case "Materials": {
        queryValue = "topic.tag=Materials";
        break;
      }
      case "PN": {
        queryValue = "topic.tag=Physics,Neutron";
        break;
      }
      case "AC": {
        queryValue = 'topic.tag="Advanced Communications"';
        break;
      }
      case "Chemistry": {
        queryValue = "topic.tag=Chemistry";
        break;
      }
      case "Additive Manufacturing": {
        queryValue = '"Additive Manufacturing"';
        break;
      }
      case "Artificial Intelligence": {
        queryValue = '"Artificial Intelligence"';
        break;
      }
      case "Quantum": {
        // MARK: TO DO (10/30/2025 - discussion in progress about what search to perform based on taxonomy)
        // queryValue = "topic.tag=Quantum communications,Atomic Molecular and Quantum, Quantum Information Science"; // quantum information science &&
        queryValue = "topic.tag=Quantum"; // change to keyword search on quantum
        break;
      }
      case "Bioscience": {
        queryValue = "topic.tag=Bioscience";
        break;
      }
      default: {
        queryValue = searchValue;
        break;
      }
    }

    let params: NavigationExtras = {
      queryParams: {
        q: queryValue,
      },
    };
    this.router.navigate(["/search"], params);
  }

  /**
   * Navigate to the specific URL for a curated collection
   * @param event The click event
   * @param theme The theme object
   */
  navigateToCuratedCollection(event: Event, theme: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    let url = "";

    switch (theme.searchTerm) {
      case "Forensics":
        url = this.forensicsURL;
        break;
      case "CHIPS":
        url = this.chipsURL;
        break;
      case "Artificial Intelligence":
        url = this.aiURL;
        break;
      default:
        // If no specific URL, fall back to search
        return this.search(theme.searchTerm);
    }

    // Open in a new tab
    window.open(url, "_blank");
  }

  /**
   * Return full URL of an image from given file path
   * @param imagePath file path
   * @returns full url
   */
  getImageFullPath(imagePath: string) {
    if (!this.SDPAPIURL || !imagePath) return "";

    return this.SDPAPIURL + imagePath;
  }

  /**
   * Return full URL of an icon image from given file path
   * @param iconPath file path
   * @returns full url
   */
  getIconFullPath(iconPath: string) {
    if (!this.SDPAPIURL || !iconPath) return "";

    return this.SDPAPIURL + iconPath;
  }

  /**
   * Convert themes object to array for easier iteration
   */
  getThemesList() {
    return Object.values(this.themes);
  }

  handleCollectionClick(event: Event, theme: any) {
    if (!theme) return;
    if (theme.curated) {
      this.navigateToCuratedCollection(event, theme);
    } else {
      this.search(theme.searchTerm);
    }
  }

  toggleCollectionsView() {
    this.showAllCollections = !this.showAllCollections;
    if (!this.showAllCollections) {
      setTimeout(() => this.updateCollectionScrollControls(), 0);
    } else {
      this.showLeftCollectionArrow = false;
      this.showRightCollectionArrow = false;
    }
  }

  get activeRecentFeed(): RecentFeedConfig | undefined {
    return this.recentFeeds.find((feed) => feed.id === this.activeRecentFeedId);
  }

  private get activeRecentFeedState(): RecentFeedState | undefined {
    return this.recentFeedsState[this.activeRecentFeedId];
  }

  get recentDatasetsLoading(): boolean {
    return this.activeRecentFeedState?.loading ?? false;
  }

  get recentDatasetsError(): boolean {
    return this.activeRecentFeedState?.error ?? false;
  }

  switchRecentFeed(feedId: string) {
    if (!feedId || feedId === this.activeRecentFeedId) return;
    this.activateRecentFeed(feedId);
  }

  isRecentFeedActive(feedId: string): boolean {
    return this.activeRecentFeedId === feedId;
  }

  trackByRecentFeed(index: number, feed: RecentFeedConfig) {
    return feed?.id || index;
  }

  private initializeRecentFeedState() {
    this.recentFeeds.forEach((feed) => {
      if (!feed?.id) return;
      if (!this.recentFeedsState[feed.id]) {
        this.recentFeedsState[feed.id] = {
          items: [],
          loading: false,
          error: false,
          loaded: false,
          total: undefined,
          metrics: undefined,
        };
      }
    });
  }

  private ensureRecentFeedState(feedId: string): RecentFeedState {
    if (!this.recentFeedsState[feedId]) {
      this.recentFeedsState[feedId] = {
        items: [],
        loading: false,
        error: false,
        loaded: false,
        total: undefined,
        metrics: undefined,
      };
    }
    return this.recentFeedsState[feedId];
  }

  private getFeedStrategies(feed: RecentFeedConfig): FeedRequestVariant[] {
    const baseStrategy: FeedRequestVariant = {
      filter: feed.filter,
      sort: feed.sort,
      freeText: feed.freeText,
      queryRows: feed.queryRows,
    };

    const strategies: FeedRequestVariant[] = [];

    const hasBaseConfig =
      baseStrategy.filter ||
      baseStrategy.sort ||
      baseStrategy.freeText ||
      (baseStrategy.queryRows && baseStrategy.queryRows.length);

    if (hasBaseConfig) {
      strategies.push(baseStrategy);
    }

    if (Array.isArray(feed.requests)) {
      feed.requests.forEach((variant) => {
        if (!variant) return;
        const hasFilter = Object.prototype.hasOwnProperty.call(
          variant,
          "filter"
        );
        const hasSort = Object.prototype.hasOwnProperty.call(
          variant,
          "sort"
        );
        const hasFreeText = Object.prototype.hasOwnProperty.call(
          variant,
          "freeText"
        );
        strategies.push({
          filter: hasFilter ? variant.filter ?? undefined : feed.filter,
          sort: hasSort ? variant.sort ?? undefined : feed.sort,
          freeText: hasFreeText
            ? variant.freeText ?? ""
            : feed.freeText ?? "",
          queryRows: variant.queryRows ?? feed.queryRows,
        });
      });
    }

    if (!strategies.length) {
      strategies.push({});
    }

    return strategies;
  }

  private buildFeedQuery(
    feed: RecentFeedConfig,
    variant: FeedRequestVariant
  ): SDPQuery {
    const query = new SDPQuery();
    query.freeText = (variant.freeText ?? feed.freeText ?? "").trim();

    const rows = variant.queryRows ?? feed.queryRows ?? [];

    if (rows.length) {
      query.queryRows = rows.map((row, index) => {
        const resolvedOperator = row.operator ?? "AND";
        return new QueryRow(
          index,
          resolvedOperator,
          row.value,
          row.fieldType ?? row.field,
          row.field,
          true
        );
      });
    }

    return query;
  }

  private activateRecentFeed(feedId: string) {
    if (!feedId) return;

    this.activeRecentFeedId = feedId;
    const state = this.ensureRecentFeedState(feedId);
    this.recentDatasets = [...state.items];

    if (!state.loaded && !state.loading) {
      this.loadRecentDatasetsForFeed(feedId);
    }
  }

  private loadRecentDatasetsForFeed(feedId: string, attempt = 0) {
    const feed = this.recentFeeds.find((item) => item.id === feedId);
    if (!feed) return;

    const state = this.ensureRecentFeedState(feedId);
    state.loading = true;
    state.error = false;
    if (this.activeRecentFeedId === feedId) {
      this.recentDatasets = [];
    }

    if (this.recentFeedSubs.has(feedId)) {
      this.recentFeedSubs.get(feedId)?.unsubscribe();
    }

    const strategies = this.getFeedStrategies(feed);
    const current = strategies[attempt];

    if (!current) {
      state.loading = false;
      state.error = false;
      state.loaded = true;
      state.items = [];
      if (this.activeRecentFeedId === feedId) {
        this.recentDatasets = [];
      }
      return;
    }

    const query = this.buildFeedQuery(feed, current);
    const pageSize = feed.pageSize ?? this.defaultRecentPageSize;
    const sortOrder = current.sort ?? feed.sort ?? "annotated:desc";
    const filter = current.filter ?? feed.filter ?? "@type=Dataset";

    const sub = this.searchService
      .searchPhrase(query, "", undefined, 1, pageSize, sortOrder, filter)
      .subscribe({
        next: (response) => {
          const items = response?.ResultData || [];
          state.loading = false;
          state.error = false;
          state.loaded = true;
          state.total =
            typeof response?.ResultCount === "number"
              ? response.ResultCount
              : typeof response?.total === "number"
              ? response.total
              : undefined;
          state.metrics =
            response?.Metrics && typeof response.Metrics === "object"
              ? response.Metrics
              : undefined;
          const hasResults = items.length > 0;
          if (!hasResults && attempt + 1 < strategies.length) {
            sub.unsubscribe();
            this.loadRecentDatasetsForFeed(feedId, attempt + 1);
            return;
          }
          state.items = items;
          if (this.activeRecentFeedId === feedId) {
            this.recentDatasets = [...state.items];
          }
        },
        error: () => {
          state.loading = false;
          state.error = true;
          state.loaded = false;
          state.total = undefined;
          state.metrics = undefined;
          if (attempt + 1 < strategies.length) {
            sub.unsubscribe();
            this.loadRecentDatasetsForFeed(feedId, attempt + 1);
            return;
          }
          state.items = [];
          if (this.activeRecentFeedId === feedId) {
            this.recentDatasets = [];
          }
        },
      });

    this.recentFeedSubs.set(feedId, sub);
  }

  viewAllRecentDatasets() {
    this.search("");
  }

  openDataset(dataset: any, event: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!dataset) return;

    const landingPage = this.resolveDatasetLandingPage(dataset);

    if (landingPage) {
      window.open(landingPage, "_blank");
    } else if (dataset.title) {
      this.search(dataset.title);
    }
  }

  trackByDataset(index: number, dataset: any) {
    return dataset?.ediid || dataset?.title || index;
  }

  trackByTheme(index: number, theme: any) {
    return theme?.searchTerm || theme?.title || index;
  }

  trackByTopic(index: number, topic: { label: string }) {
    return topic?.label || index;
  }

  trackByTopicNode(index: number, topic: TopicTreeNode) {
    return topic?.id || topic?.label || index;
  }

  trackByString(index: number, value: string) {
    return value || index;
  }

  getDatasetPrimaryDate(dataset: any) {
    if (!dataset) return null;
    const feed = this.activeRecentFeed;
    const candidates =
      feed?.dateFields?.length === 0 || !feed?.dateFields
        ? this.defaultRecentDateFields
        : feed.dateFields;

    for (const candidate of candidates) {
      const value = this.resolveDatasetField(dataset, candidate.field);
      const normalized = this.coerceDateValue(value);
      if (normalized) {
        return {
          label: candidate.label,
          value: normalized,
        };
      }
    }
    return null;
  }

  getActiveFeedSummary(): string {
    const state = this.activeRecentFeedState;
    if (!state || state.loading || state.error) return "";
    const itemsShown = state.items?.length ?? 0;
    if (!itemsShown) return "";
    const total = state.total;
    const baseLabel =
      itemsShown === 1 ? "Showing 1 resource" : `Showing ${itemsShown} resources`;
    const metricsLabel = this.activeRecentFeed?.metricsLabel;
    const suffix =
      typeof total === "number" && total > itemsShown
        ? ` • Top ${itemsShown} of ${total} ${metricsLabel || "results"}`
        : "";
    const rawElapsed = state.metrics?.ElapsedTime;
    const elapsed = this.formatElapsedTime(
      typeof rawElapsed === "string" ? parseFloat(rawElapsed) : rawElapsed
    );
    const timing = elapsed ? ` • ${elapsed}` : "";
    return `${baseLabel}${suffix}${timing}`;
  }

  getActiveFeedEmptyMessage(): string {
    return (
      this.activeRecentFeed?.emptyMessage ||
      "No recent updates are available right now. Check back soon or explore our research collections below."
    );
  }

  private resolveDatasetField(dataset: any, path: string) {
    if (!dataset || !path) return null;
    return path.split(".").reduce((acc: any, key: string) => {
      if (acc === undefined || acc === null) return undefined;
      return acc[key];
    }, dataset);
  }

  private coerceDateValue(value: any): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const normalized = this.coerceDateValue(item);
        if (normalized) return normalized;
      }
      return null;
    }

    if (typeof value === "object") {
      const candidates = [
        "date",
        "value",
        "$date",
        "@value",
        "startDate",
        "endDate",
      ];
      for (const key of candidates) {
        if (key in value) {
          const normalized = this.coerceDateValue(value[key]);
          if (normalized) return normalized;
        }
      }
      return null;
    }

    if (typeof value === "number") {
      // treat small numbers as seconds and larger as milliseconds
      const millis = value > 10_000_000_000 ? value : value * 1000;
      const date = new Date(millis);
      return isNaN(date.getTime()) ? null : date.toISOString();
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed.length) return null;
      if (trimmed.toLowerCase() === "null") return null;
      return trimmed;
    }

    return null;
  }

  private resolveDatasetLandingPage(dataset: any): string {
    if (!dataset) return "";
    const rawLanding =
      typeof dataset.landingPage === "string" ? dataset.landingPage.trim() : "";
    if (rawLanding.length) {
      return rawLanding;
    }
    if (this.PDRAPIURL && dataset?.ediid) {
      return `${this.PDRAPIURL}${dataset.ediid}`;
    }
    return "";
  }

  getDatasetDescription(dataset: any): string {
    if (!dataset) return "";
    const desc = dataset.description;
    if (Array.isArray(desc)) {
      const first = desc.find(
        (value) => typeof value === "string" && value.trim().length
      );
      return first || "";
    }
    if (typeof desc === "string") {
      return desc;
    }
    return "";
  }

  getDatasetKeywords(dataset: any, max = 4): string[] {
    if (!dataset || max <= 0) return [];
    const keywords = dataset.keyword;
    if (Array.isArray(keywords)) {
      return keywords
        .filter((kw) => typeof kw === "string" && kw.trim().length)
        .map((kw) => kw.trim())
        .slice(0, max);
    }
    if (typeof keywords === "string" && keywords.trim().length) {
      return [keywords.trim()];
    }
    return [];
  }

  formatResourceTypes(
    types: string[] | string | undefined | null
  ): string[] {
    let normalized: string[] = [];
    if (typeof types === "string") {
      normalized = [types];
    } else if (Array.isArray(types)) {
      normalized = [...types];
    } else if (types == null) {
      normalized = [];
    }

    const seen = new Set<string>();
    const labels: string[] = [];

    for (const rawType of normalized) {
      if (!rawType || typeof rawType !== "string") continue;
      const key = rawType.trim();
      if (!key.length) continue;

      const label = this.resolveResourceTypeLabel(key);
      if (seen.has(label)) continue;
      seen.add(label);
      labels.push(label);
    }

    if (!labels.length) {
      const fallback = this.resolveResourceTypeLabel("Dataset");
      seen.add(fallback);
      labels.push(fallback);
    }

    if (labels.length > 1) {
      const filtered = labels.filter(
        (label) => label.toLowerCase() !== "dataset"
      );
      if (filtered.length) {
        return filtered;
      }
    }

    return labels;
  }

  formatResourceType(
    types: string[] | string | undefined | null
  ): string | null {
    const labels = this.formatResourceTypes(types);
    return labels.length ? labels[0] : null;
  }

  private resolveResourceTypeLabel(rawType: string): string {
    if (!rawType) return "Dataset";
    const canonical = rawType.trim();
    if (this.resourceTypeLabels[canonical]) {
      return this.resourceTypeLabels[canonical];
    }
    const shortName = canonical.includes(":")
      ? canonical.split(":").pop() || canonical
      : canonical;
    return startCase(shortName.replace(/[_-]+/g, " "));
  }

  private formatElapsedTime(seconds?: number): string {
    if (typeof seconds !== "number" || !isFinite(seconds) || seconds < 0) {
      return "";
    }
    if (seconds < 1) {
      // convert to ms
      return `${Math.round(seconds * 1000)} ms`;
    }
    if (seconds < 60) {
      return `${seconds.toFixed(seconds < 10 ? 2 : 1)} s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds - minutes * 60;
    if (minutes >= 1) {
      const minLabel = minutes === 1 ? "min" : "mins";
      const secLabel =
        remaining >= 1 ? ` ${remaining.toFixed(0)} s` : "";
      return `${minutes} ${minLabel}${secLabel}`;
    }
    return `${seconds.toFixed(1)} s`;
  }

  trackBySkeleton(index: number, value: number) {
    return value ?? index;
  }

  hasActivePath() {
    return this.topicPath.length > 0;
  }

  getPathLabel() {
    if (!this.topicPath.length) return "";
    return this.topicPath[this.topicPath.length - 1].label;
  }

  getBackLabel() {
    if (this.topicPath.length <= 1) {
      return "All Topics";
    }
    return this.topicPath[this.topicPath.length - 2]?.label || "Back";
  }

  drillInto(topic: TopicTreeNode) {
    if (!topic?.children?.length) return;
    this.topicPath = [...this.topicPath, topic];
    this.updateCurrentTopics();
  }

  openTopicBranch(event: Event, topic: TopicTreeNode) {
    event.stopPropagation();
    this.drillInto(topic);
  }

  onDisclosureKeydown(event: KeyboardEvent, topic: TopicTreeNode) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.openTopicBranch(event, topic);
    }
  }

  isTopicInPath(topic: TopicTreeNode): boolean {
    return this.topicPath.some((node) => node.id === topic.id);
  }

  goBackOneLevel() {
    if (!this.topicPath.length) return;
    this.topicPath = this.topicPath.slice(0, -1);
    this.updateCurrentTopics();
  }

  resetTopicNavigation() {
    if (!this.topicPath.length) return;
    this.topicPath = [];
    this.updateCurrentTopics();
  }

  getTopicDepthClass(topic: TopicTreeNode) {
    const level = topic?.level ?? (this.topicPath.length + 1);
    if (level <= 1) return "topic-chip--depth-root";
    if (level === 2) return "topic-chip--depth-child";
    return "topic-chip--depth-grandchild";
  }

  private updateCurrentTopics() {
    if (this.topicPath.length) {
      const last = this.topicPath[this.topicPath.length - 1];
      this.currentTopics = last?.children || [];
    } else {
      this.currentTopics = this.topicRoots;
    }
  }

  private loadTopicTree() {
    if (!this.RMMAPIURL) {
      this.topicsLoading = false;
      return;
    }

    const base = this.RMMAPIURL.endsWith("/")
      ? this.RMMAPIURL
      : `${this.RMMAPIURL}/`;

    this.topicsLoading = true;
    this.topicsError = false;

    if (this.taxonomySub) {
      this.taxonomySub.unsubscribe();
    }

    this.taxonomySub = this.http
      .get<TaxonomyNode[]>(`${base}taxonomy`)
      .subscribe({
        next: (nodes) => {
          this.topicRoots = this.buildTopicTree(nodes);
          this.topicPath = [];
          this.updateCurrentTopics();
          this.topicsLoading = false;
          this.topicsError = false;
        },
        error: () => {
          this.topicRoots = [];
          this.topicPath = [];
          this.currentTopics = [];
          this.topicsLoading = false;
          this.topicsError = true;
        },
      });
  }

  private buildTopicTree(nodes: TaxonomyNode[] = []): TopicTreeNode[] {
    if (!Array.isArray(nodes) || !nodes.length) {
      return [];
    }

    const nodeMap = new Map<string, TopicTreeNode>();
    const roots: TopicTreeNode[] = [];

    nodes.forEach((node) => {
      const label = this.getNodeLabel(node);
      if (!label) return;
      const key = this.normalizeLabel(label);
      if (!key) return;
      if (nodeMap.has(key)) return;
      const parentLabel =
        typeof node.parent === "string" ? node.parent.trim() : "";
      nodeMap.set(key, {
        id: node._id || label,
        label,
        level: Number(node.level) || 1,
        parentLabel: parentLabel || undefined,
        children: [],
        query: this.buildTopicQuery(label),
      });
    });

    const orphans: TopicTreeNode[] = [];

    nodeMap.forEach((topicNode) => {
      const parentKey = topicNode.parentLabel
        ? this.normalizeLabel(topicNode.parentLabel)
        : "";
      const hasParent = parentKey && nodeMap.has(parentKey);

      if (!hasParent) {
        if (topicNode.level && topicNode.level > 1) {
          orphans.push(topicNode);
        } else {
          roots.push(topicNode);
        }
        return;
      }
      nodeMap.get(parentKey)?.children.push(topicNode);
    });

    const sortNodes = (items: TopicTreeNode[]) => {
      items.sort((a, b) => a.label.localeCompare(b.label));
      items.forEach((child) => {
        if (child.children?.length) {
          sortNodes(child.children);
        }
      });
    };

    sortNodes(roots);
    // Only surface level-1 roots by default; attach otherwise orphaned nodes as root-only fallbacks.
    if (!roots.length && orphans.length) {
      sortNodes(orphans);
      return orphans.sort((a, b) => a.label.localeCompare(b.label));
    }

    return roots.sort((a, b) => a.label.localeCompare(b.label));
  }

  private getNodeLabel(node: TaxonomyNode | undefined): string {
    if (!node) return "";
    if (typeof node.label === "string" && node.label.trim().length) {
      return node.label.trim();
    }
    if (typeof node.term === "string" && node.term.trim().length) {
      return node.term.trim();
    }
    return "";
  }

  private normalizeLabel(value: string | undefined | null): string {
    return (value ?? "").trim().toLowerCase();
  }

  private buildTopicQuery(label: string): string {
    if (!label) return "";
    const sanitized = label.replace(/"/g, '\\"');
    return `topic.tag="${sanitized}"`;
  }

  onCollectionsScroll() {
    this.updateCollectionScrollControls();
  }

  scrollCollections(direction: "left" | "right") {
    if (!this.collectionsRail) return;
    const container = this.collectionsRail.nativeElement;
    const scrollAmount =
      direction === "left" ? -container.clientWidth : container.clientWidth;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    setTimeout(() => this.updateCollectionScrollControls(), 300);
  }

  @HostListener("window:resize")
  onWindowResize() {
    setTimeout(() => this.updateCollectionScrollControls(), 50);
  }

  private updateCollectionScrollControls() {
    if (!this.collectionsRail || this.showAllCollections) {
      this.showLeftCollectionArrow = false;
      this.showRightCollectionArrow = false;
      return;
    }

    const container = this.collectionsRail.nativeElement;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (maxScrollLeft <= 0) {
      this.showLeftCollectionArrow = false;
      this.showRightCollectionArrow = false;
      return;
    }

    this.showLeftCollectionArrow = container.scrollLeft > 4;
    this.showRightCollectionArrow = container.scrollLeft < maxScrollLeft - 4;
  }
}
