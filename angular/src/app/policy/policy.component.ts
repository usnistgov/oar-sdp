import { Component } from "@angular/core";
import { CommonService } from "../shared/common/common.service";
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { AppConfig, Config } from "../shared/config-service/config.service";
import { MenuItem } from "primeng/api";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sdp-policy",
  templateUrl: "policy.component.html",
  styleUrls: ["policy.component.css"],
})
export class PolicyComponent {
  confValues: Config;
  breadcrumbItems: MenuItem[];

  constructor(
    public commonService: CommonService,
    public gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Home", command: () => this.commonService.goHome() },
      { label: "About" },
      { label: "Policy" },
    ];
  }
}
