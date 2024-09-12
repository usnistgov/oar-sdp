import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { Router } from "@angular/router";
import { CommonService } from "../shared/common/common.service";
import { AppConfig, Config } from "../shared/config-service/config.service";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sdp-help",
  templateUrl: "help.component.html",
  styleUrls: ["help.component.css"],
})
export class HelpComponent {
  currentView = "how-advanced-search";
  breadcrumbItems: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appConfig: AppConfig,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Home", command: () => this.commonService.goHome() },
      { label: "About" },
      { label: "Help" },
    ];
  }

  public navigateToPage(page: string): void {
    this.currentView = page;
  }
}
