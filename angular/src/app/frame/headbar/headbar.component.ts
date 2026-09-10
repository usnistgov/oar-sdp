import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  HostBinding,
  HostListener,
} from "@angular/core";
import { AppComponent } from "../../app.component";
import { SearchQueryService } from "../../shared/search-query/search-query.service";
import { AppConfig } from "../../shared/config-service/config.service";
import { SDPQuery } from "../../shared/search-query/query";
import { SearchService, SEARCH_SERVICE } from "../../shared/search-service";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { MenuItem } from "primeng/api";
import { Menubar } from "primeng/menubar";

@Component({
  selector: "app-headbar",
  templateUrl: "./headbar.component.html",
  styleUrls: ["./headbar.component.css"],
})
export class HeadbarComponent implements OnInit {
  @ViewChild("menubar") menubar: Menubar;
  queryLength: number;
  appVersion: string;
  queries: SDPQuery[] = [];
  items: MenuItem[] = [];
  metricsDotVisible = false;
  metricsURL = "";
  // Toggled on scroll to shrink the sticky header (bound to the host element).
  @HostBinding("class.is-scrolled") isScrolled = false;
  private currentPath = "/";
  private readonly baseClass = new Map<string, string>();
  // Bump the suffix to re-show the "new" dot to everyone (e.g. after a Metrics relaunch).
  private readonly METRICS_SEEN_KEY = "sdp.metricsSeen.v1";

  constructor(
    @Inject(SEARCH_SERVICE) private searchService: SearchService,
    public app: AppComponent,
    public searchQueryService: SearchQueryService,
    private appConfig: AppConfig,
    public router: Router
  ) {
    this.searchQueryService.watchQueries().subscribe((value) => {
      this.queries = value as SDPQuery[];
      this.queryLength = this.queries.length;
    });
  }

  ngOnInit() {
    this.queryLength = this.searchQueryService.getQueries().length;
    this.queries = this.searchQueryService.getQueries();
    this.appConfig.getConfig().subscribe((conf) => {
      this.appVersion = conf.APPVERSION;
      // Same pattern as the featured collections: base server URL + path.
      this.metricsURL = conf.SERVERBASE + "/metrics";
    });

    this.metricsDotVisible = !this.getMetricsSeen();

    this.items = [
      // MARK: Make home button more distinct :-)
      {
        id: "home",
        icon: "pi pi-home",
        title: "Home",
        command: () => this.goHome(),
      },
      {
        id: "about",
        label: "About",
        icon: "pi pi-info-circle",
        items: [
          {
            label: "Release Notes",
            url: "https://github.com/usnistgov/oar-developer/blob/master/RELEASE_NOTES.md",
            target: "_blank",
          },
          { label: "About NIST Data", routerLink: "/about" },
          { label: "Policy", routerLink: "/policy" },
          { label: "Help", routerLink: "/help" },
        ],
      },
      {
        id: "keydatasets",
        label: "Key Datasets",
        icon: "pi pi-database",
        items: [
          // MARK: Try slash links on oar-dev
          {
            label: "CHIPS METIS",
            url: "/chips",
            target: "_blank",
          },
          {
            label: "Forensics",
            url: "/forensics",
            target: "_blank",
          },
          {
            label: "Atomic Spectroscopy Database",
            url: "https://www.nist.gov/pml/atomic-spectra-database",
            target: "_blank",
          },
          {
            label: "Ballistics Toolmark",
            url: "https://www.nist.gov/programs-projects/nist-ballistics-toolmark-database",
            target: "_blank",
          },
          {
            label: "Chemistry WebBook",
            url: "https://webbook.nist.gov/chemistry/",
            target: "_blank",
          },
          {
            label: "Digital Library of Mathematical Functions",
            url: "https://dlmf.nist.gov/",
            target: "_blank",
          },
          {
            label: "Fire Research",
            url: "https://www.nist.gov/el/fire-research-division-73300/product-services/fire-web",
            target: "_blank",
          },
          {
            label: "Materials Genome Initiative",
            url: "https://mgi.nist.gov/",
            target: "_blank",
          },
          {
            label: "National Vulnerability Database",
            url: "https://nvd.nist.gov/",
            target: "_blank",
          },
          {
            label: "Physical Reference Data",
            url: "https://www.nist.gov/pml/productsservices/physical-reference-data",
            target: "_blank",
          },
          { label: "Time", url: "https://nist.time.gov/", target: "_blank" },
          {
            label: "World Trade Center Disaster Investigation Material",
            url: "https://www.nist.gov/topics/disaster-failure-studies/world-trade-center-disaster-study/disaster-and-failure-studies",
            target: "_blank",
          },
        ],
      },
      {
        id: "srd",
        label: "SRD",
        icon: "pi pi-book",
        command: () => this.navigateToSRDs(),
      },
      {
        id: "tools",
        label: "Tools",
        icon: "pi pi-cog",
        items: [
          {
            label: "This site's code",
            url: "https://github.com/usnistgov/oar-developer",
            target: "_blank",
          },
          { label: "APIs", routerLink: "/api" },
          {
            label: "Open Source Code Portal",
            url: "https://code.nist.gov",
            target: "_blank",
          },
        ],
      },
      {
        id: "findpapers",
        label: "Find Papers",
        icon: "pi pi-file",
        items: [
          {
            label: "Search All Papers",
            url: "https://www.nist.gov/publications",
            target: "_blank",
          },
          {
            label: "JRes NIST",
            url: "https://www.nist.gov/nist-research-library/journal-research-nist",
            target: "_blank",
          },
          {
            label: "NIST PubMed Central",
            url: "https://www.ncbi.nlm.nih.gov/pmc/funder/nist/",
            target: "_blank",
          },
        ],
      },
      {
        id: "metrics",
        label: "Metrics",
        icon: "pi pi-chart-bar",
        command: () => this.openMetrics(),
      },
    ];

    // External (new-tab) leaves get an "opens in new tab" cue + arrow.
    this.decorateExternalLeaves(this.items);
    // Base style classes for top-level items (dynamic active/dot state is layered on top).
    this.baseClass.set("home", "menu-item-home");
    this.baseClass.set("keydatasets", "mega-datasets");
    this.baseClass.set("srd", "ext-link");
    this.baseClass.set("metrics", "menu-item-metrics ext-link");
    this.setItemTitle("srd", "SRD (opens in new tab)");
    this.setItemTitle("metrics", "Metrics (opens in new tab)");

    this.currentPath = this.stripUrl(this.router.url);
    this.refreshItemClasses();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentPath = this.stripUrl(
          (e as NavigationEnd).urlAfterRedirects || (e as NavigationEnd).url
        );
        this.refreshItemClasses();
        this.menubar?.hide();
      });
  }

  hideExamples() {
    this.searchQueryService.setShowExamples(false);
  }

  /**
   * Go to home page
   */
  goHome() {
    this.router.navigate([""]);
  }

  // Open the Metrics page (SERVERBASE + /metrics) in a new tab, like featured collections.
  private openMetrics() {
    this.dismissMetricsDot();
    if (this.metricsURL) {
      // "noopener" prevents the opened page from accessing window.opener (reverse tabnabbing).
      window.open(this.metricsURL, "_blank", "noopener");
    }
  }

  private getMetricsSeen(): boolean {
    try {
      return localStorage.getItem(this.METRICS_SEEN_KEY) === "true";
    } catch {
      return false;
    }
  }

  // Retire the "new" dot on Metrics permanently once the user opens it.
  private dismissMetricsDot() {
    if (!this.metricsDotVisible) return;
    this.metricsDotVisible = false;
    try {
      localStorage.setItem(this.METRICS_SEEN_KEY, "true");
    } catch {
      /* ignore storage errors */
    }
    this.refreshItemClasses();
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const scrolled = y > 8;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      // Close any open dropdown the moment the sticky header starts/stops scrolling.
      this.menubar?.hide();
    }
  }

  // Close open dropdowns when the pointer leaves the header.
  @HostListener("mouseleave")
  onHostMouseLeave() {
    this.menubar?.hide();
  }

  private stripUrl(url: string): string {
    return (url || "/").split("?")[0].split("#")[0] || "/";
  }

  private setItemTitle(id: string, title: string) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.title = title;
  }

  // Recursively tag leaf items that open a new tab with the ext-link cue.
  private decorateExternalLeaves(items: MenuItem[]) {
    for (const it of items) {
      if (it.items && it.items.length) {
        this.decorateExternalLeaves(it.items);
      } else if (it.target === "_blank") {
        it.styleClass = (it.styleClass ? it.styleClass + " " : "") + "ext-link";
        it.title = (it.label || "") + " (opens in new tab)";
      }
    }
  }

  private routeIsActive(item: MenuItem, path: string): boolean {
    const link = Array.isArray(item.routerLink)
      ? item.routerLink.join("/")
      : item.routerLink
      ? String(item.routerLink)
      : "";
    if (link) {
      if (link === "/") {
        if (path === "/") return true;
      } else if (path === link || path.startsWith(link + "/")) {
        return true;
      }
    }
    return (item.items || []).some((c) => this.routeIsActive(c, path));
  }

  private isItemActive(item: MenuItem, path: string): boolean {
    if (item.id === "home") return path === "/" || path === "";
    return this.routeIsActive(item, path);
  }

  private composeItemClass(id: string, active: boolean): string | undefined {
    const parts: string[] = [];
    const base = this.baseClass.get(id);
    if (base) parts.push(base);
    if (active) parts.push("menu-active");
    if (id === "metrics" && this.metricsDotVisible) parts.push("has-new-dot");
    const cls = parts.join(" ").trim();
    return cls || undefined;
  }

  private refreshItemClasses() {
    for (const item of this.items) {
      if (!item.id) continue;
      item.styleClass = this.composeItemClass(
        item.id,
        this.isItemActive(item, this.currentPath)
      );
    }
    this.items = [...this.items];
  }

  // Hack to open the NIST SRD page in a new tab whilst we keep the correct styling
  // (Putting the link in an href would break the styling of the link in the navbar)
  navigateToSRDs() {
    window.open("https://www.nist.gov/srd", "_blank");
  }
}
