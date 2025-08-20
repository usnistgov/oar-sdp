// import { SwitchView } from '@angular/common/src/directives/ng_switch';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AppConfig, Config } from "../shared/config-service/config.service";
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: "sdp-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"],
})
export class HomeComponent implements OnInit {
  confValues: Config;
  PDRAPIURL: string;
  SDPAPIURL: string;
  forensicsURL: string;
  chipsURL: string;

  // Search modes
  searchModes = [
    { label: "Datasets", value: "datasets", icon: "pi-database" },
    { label: "Global", value: "global", icon: "pi-globe" },
  ];
  selectedSearchMode = this.searchModes[1];
  aiSearchEnabled = true;


  // Scroll state tracking
  collectionsCanScrollLeft = false;
  collectionsCanScrollRight = true;
  topicsCanScrollLeft = false;
  topicsCanScrollRight = true;

  // Featured datasets
  featuredDatasets = [
    {
      title: "COVID-19 Configurable Data Curation System (COVID-19 CDCS)",
      description:
        "The COVID-19 CDCS represents a metadata repository that provides a catalog of COVID-19 related research literature and data..",
      type: "health",
      isNew: true,
      url: "/details/covid19",
    },
    {
      title: "Smart Manufacturing Systems Readiness Level (SMSRL) Tool",
      description:
        "The Smart Manufacturing Systems Readiness Level (SMSRL) focuses on evaluating the readiness (also can be viewed as maturity) for a factory to undergo improvements.",
      type: "manufacturing",
      isNew: false,
      url: "/details/manufacturing-standards",
    },
    {
      title: "Joint Quantum State and Measurement Tomography",
      description:
        "This software package performs joint quantum state and measurement tomography.",
      type: "physics",
      isNew: true,
      url: "/details/quantum-science",
    },
  ];

  // Topics view control
  expandedTopics = false;

  showAllCollections = false;

  // Topics list for the grid view
  topicsList = [
    {
      name: "Nanotechnology",
      icon: "circle",
      searchTerm: "Nanotechnology",
    },
    { name: "Biotechnology", icon: "heart", searchTerm: "Biotechnology" },
    { name: "Chemistry", icon: "filter", searchTerm: "Chemistry" },
    { name: "Materials Science", icon: "box", searchTerm: "Materials" },
    { name: "Engineering", icon: "cog", searchTerm: "Engineering" },
    { name: "Physics", icon: "bolt", searchTerm: "PN" },
    { name: "Info. Technology", icon: "desktop", searchTerm: "IT" },
    { name: "Communications", icon: "wifi", searchTerm: "AC" },
    { name: "Forensics", icon: "search", searchTerm: "Forensics" },
  ];

  @ViewChild("collectionsContainer") collectionsContainer: ElementRef;
  @ViewChild("topicsContainer") topicsContainer: ElementRef;

  themes: any = {
    it: {
      title: "INFORMATION TECHNOLOGY",
      description:
        "NIST advances the state-of-the-art in IT in such applications as cybersecurity and biometrics.",
      image: "assets/images/Theme_InformationTechnology.png",
      searchTerm: "IT",
      datasetCount: 53,
    },
    ms: {
      title: "MATHEMATICS AND STATISTICS",
      description:
        "NIST researchers use the latest mathematics approaches and computational methods to help tackle some of the most difficult scientific, technical and engineering problems and tasks.",
      image: "assets/images/Theme_MathematicsStatistics.png",
      searchTerm: "MS",
      datasetCount: 38,
    },
    manufacturing: {
      title: "MANUFACTURING",
      description:
        "NIST provides technical support to the nation's manufacturing industry as they strive to out-innovate and outperform the competition.",
      image: "assets/images/Theme_Manufacturing.png",
      searchTerm: "Manufacturing",
      datasetCount: 42,
    },
    forensics: {
      title: "FORENSICS",
      description:
        "Bringing together experts from the forensic, research, legal and law enforcement communities to strengthen forensic science and create a safer, more just society.",
      image: "assets/images/Theme_Forensics.jpg",
      icon: "assets/images/forensics_collection.png",
      searchTerm: "Forensics",
      datasetCount: 28,
    },
    Materials: {
      title: "MATERIALS",
      description:
        "NIST develops testbeds, defines benchmarks and develops formability measurements and models for a variety of emerging materials.",
      image: "assets/images/Theme_Materials.jpg",
      searchTerm: "Materials",
      datasetCount: 93,
    },
    Physics: {
      title: "PHYSICS AND NEUTRON",
      description:
        "NIST provides the measurements, standards, and technical expertise scientists and industries need to push the limits of the fundamental properties of nature.",
      image: "assets/images/Theme_Physics.jpg",
      searchTerm: "PN",
      datasetCount: 79,
    },
    Communications: {
      title: "ADVANCED COMMUNICATIONS",
      description:
        "NIST promotes the development and deployment of advanced communications technologies by advancing the measurement science underlying wireless technologies.",
      image: "assets/images/Theme_AdvancedCommunications.jpg",
      searchTerm: "AC",
      datasetCount: 41,
    },
    Chemistry: {
      title: "CHEMISTRY",
      description:
        "NIST develops the technology, measurement methods and standards to address the needs of the chemical industry.",
      image: "assets/images/Theme_Chemistry.png",
      searchTerm: "Chemistry",
      datasetCount: 105,
    },
    chips: {
      title: "CHIPS METIS",
      description:
        "NIST is working to develop the measurement science needed to support the next generation of computer chips.",
      image: "assets/images/Theme_CHIPS.png",
      icon: "assets/images/forensics_collection.png",
      searchTerm: "CHIPS",
      datasetCount: 35,
    },
  };

  constructor(private router: Router, private appConfig: AppConfig) {
    this.appConfig.getConfig().subscribe((conf) => {
      this.PDRAPIURL = conf.SDPAPI;
      this.SDPAPIURL = conf.SDPAPI;
      this.forensicsURL = conf.SERVERBASE + "/forensics";
      this.chipsURL = conf.SERVERBASE + "/chips";
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Check initial scroll state after view initialization
    setTimeout(() => {
      this.checkCollectionsScrollState();
      this.checkTopicsScrollState();
    }, 100);
  }

  /**
   * Convert themes object to array for easier iteration
   */
  getThemesList() {
    return Object.values(this.themes);
  }

  /**
   * Toggle expanded view for topics
   */
  toggleTopicsView() {
    this.expandedTopics = !this.expandedTopics;
  }

  /**
   * Toggle all collections
   */
  toggleCollectionsView() {
    this.showAllCollections = !this.showAllCollections;
  }

  /**
   * Check if collections can scroll left or right
   */
  checkCollectionsScrollState() {
    if (!this.collectionsContainer) return;

    const container = this.collectionsContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    this.collectionsCanScrollLeft = scrollLeft > 0;
    this.collectionsCanScrollRight = scrollLeft < scrollWidth - clientWidth - 1; // -1 for rounding
  }

  /**
   * Check if topics can scroll left or right
   */
  checkTopicsScrollState() {
    const container = document.querySelector(".topics-grid") as HTMLElement;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    this.topicsCanScrollLeft = scrollLeft > 0;
    this.topicsCanScrollRight = scrollLeft < scrollWidth - clientWidth - 1; // -1 for rounding
  }

  /**
   * Horizontal scroll for collections
   */
  scrollCollections(direction: "left" | "right") {
    if (!this.collectionsContainer) return;

    const container = this.collectionsContainer.nativeElement;
    const scrollAmount = 300;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }

    // Check scroll state after scrolling
    setTimeout(() => {
      this.checkCollectionsScrollState();
    }, 300); // Wait for scroll animation to complete
  }

  /**
   * Horizontal scroll for topics
   */
  scrollTopics(direction: "left" | "right") {
    const container = document.querySelector(".topics-grid") as HTMLElement;
    if (!container) return;

    const scrollAmount = 300;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }

    // Check scroll state after scrolling
    setTimeout(() => {
      this.checkTopicsScrollState();
    }, 300); // Wait for scroll animation to complete
  }

  /**
   * Handle collections container scroll event
   */
  onCollectionsScroll() {
    this.checkCollectionsScrollState();
  }

  /**
   * Handle topics container scroll event
   */
  onTopicsScroll() {
    this.checkTopicsScrollState();
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
      default: {
        queryValue = searchValue;
        break;
      }
    }

    let params: NavigationExtras = {
      queryParams: {
        q: queryValue,
        key: this.selectedSearchMode.value === "global" ? "global" : "",
      },
    };
    this.router.navigate(["/search"], params);
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
   * Handle search mode change from search panel
   */
  onSearchModeChange(mode: any) {
    this.selectedSearchMode = mode;
    // Update AI search enabled status based on mode
    this.aiSearchEnabled = mode.value === "global";
  }
}
