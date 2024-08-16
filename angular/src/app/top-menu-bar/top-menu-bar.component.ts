import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { SearchQueryService } from "../shared/search-query/search-query.service";
import { AppConfig } from "../shared/config-service/config.service";
import { AppComponent } from "../app.component";
import { Router } from "@angular/router";
import { SDPQuery } from "../shared/search-query/query";
import { SearchService, SEARCH_SERVICE } from "../shared/search-service";
@Component({
  selector: "app-top-menu-bar",
  templateUrl: "./top-menu-bar.component.html",
  styleUrls: ["./top-menu-bar.component.css"],
})
export class TopMenuBarComponent implements OnInit {
  collapsed: boolean = true;
  keyDatasetsCollapsed: boolean = true;
  developerCollapsed: boolean = true;
  aboutCollapsed: boolean = true;
  aboutFindPapers: boolean = true;

  queryLength: number;
  appVersion: string;
  queries: SDPQuery[] = [];

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
    });
  }

  hideExamples() {
    this.searchQueryService.setShowExamples(false);
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  toggleKeyDatasets() {
    this.keyDatasetsCollapsed = !this.keyDatasetsCollapsed;
  }

  toggleDeveloper() {
    this.developerCollapsed = !this.developerCollapsed;
  }

  toggleAbout() {
    this.aboutCollapsed = !this.aboutCollapsed;
  }

  toggleFindPapers() {
    this.aboutFindPapers = !this.aboutFindPapers;
  }
  // Hack to open the NIST SRD page in a new tab whilst we keep the correct styling
  // (Putting the link in an href would break the styling of the link in the navbar)
  navigateToSRDs() {
    window.open("https://www.nist.gov/srd", "_blank");
  }
}
