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
import { SDPQuery } from "../shared/search-query/query";
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
  recentDatasetsLoading = false;
  recentDatasetsError = false;
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
  private recentDatasetsSub?: Subscription;
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
    this.loadRecentDatasets();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateCollectionScrollControls(), 0);
  }

  ngOnDestroy(): void {
    if (this.recentDatasetsSub) {
      this.recentDatasetsSub.unsubscribe();
    }
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

  viewAllRecentDatasets() {
    this.search("");
  }

  openDataset(dataset: any, event: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!dataset) return;

    const landingPage =
      dataset.landingPage && dataset.landingPage.trim().length > 0
        ? dataset.landingPage
        : this.PDRAPIURL && dataset.ediid
        ? `${this.PDRAPIURL}${dataset.ediid}`
        : "";

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

  formatResourceType(
    types: string[] | string | undefined | null
  ): string | null {
    if (typeof types === "string") {
      types = [types];
    }

    if (!Array.isArray(types) || !types.length) {
      return null;
    }

    let fallback: string | null = null;

    for (const rawType of types) {
      if (!rawType) continue;

      const labelToken = rawType.includes(":")
        ? rawType.split(":").pop()
        : rawType;

      if (!labelToken) continue;

      const formatted = startCase(labelToken.replace(/[_-]+/g, " "));

      if (!fallback) {
        fallback = formatted;
      }

      if (formatted.toLowerCase() === "dataset") {
        continue;
      }

      return formatted;
    }

    return fallback;
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

  private loadRecentDatasets() {
    this.recentDatasetsLoading = true;
    this.recentDatasetsError = false;

    if (this.recentDatasetsSub) {
      this.recentDatasetsSub.unsubscribe();
    }

    const query = new SDPQuery();

    this.recentDatasetsSub = this.searchService
      .searchPhrase(
        query,
        "",
        undefined,
        1,
        3,
        "annotated:desc",
        "@type=Dataset"
      )
      .subscribe({
        next: (response) => {
          this.recentDatasets = response?.ResultData || [];
          this.recentDatasetsLoading = false;
          this.recentDatasetsError = false;
        },
        error: () => {
          this.recentDatasets = [];
          this.recentDatasetsLoading = false;
          this.recentDatasetsError = true;
        },
      });
  }
}
