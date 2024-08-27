import { Component, OnInit, Inject, forwardRef } from "@angular/core";
import { AppComponent } from "../../app.component";
import { SearchQueryService } from "../../shared/search-query/search-query.service";
import * as _ from "lodash-es";
import { AppConfig } from "../../shared/config-service/config.service";
import { SDPQuery } from "../../shared/search-query/query";
import { SearchService, SEARCH_SERVICE } from "../../shared/search-service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-headbar",
  templateUrl: "./headbar.component.html",
  styleUrls: ["./headbar.component.css"],
})
export class HeadbarComponent implements OnInit {
  queryLength: number;
  appVersion: string;
  queries: SDPQuery[] = [];
  items: MenuItem[] = [];

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
      this.appVersion = conf.APPVERSION
    });

    this.items = [
      // MARK: Make home button more distinct :-)
      {
        icon: "pi pi-home",
        command: () => this.goHome(),
      },
      {
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
          { label: "Help", routerLink: "/contactus" },
        ],
      },
      {
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
        label: "SRD",
        icon: "pi pi-book",
        command: () => this.navigateToSRDs(),
      },
      {
        label: "Tools",
        icon: "pi pi-bolt",
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
        label: "Find Papers",
        icon: "pi pi-search",
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
    ];
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

  // Hack to open the NIST SRD page in a new tab whilst we keep the correct styling
  // (Putting the link in an href would break the styling of the link in the navbar)
  navigateToSRDs() {
    window.open("https://www.nist.gov/srd", "_blank");
  }
}
