import { Component } from "@angular/core";
import { AppConfig, Config } from "../shared/config-service/config.service";
import { CommonService } from "../shared/common/common.service";
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sdp-api",
  templateUrl: "api.component.html",
  styleUrls: ["api.component.css"],
})
export class ApiComponent {
  RestAPIURL: any;
  imageURL: string;
  breadcrumbItems: any[];

  /**
   * Create an instance of services for Home
   */
  constructor(
    private appConfig: AppConfig,
    public commonService: CommonService,
    public gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.appConfig.getConfig().subscribe((conf) => {
      this.RestAPIURL = conf.RMMAPI;
      this.imageURL = conf.SDPAPI + "assets/images/sdp-background.jpg";
    });
    this.breadcrumbItems = [
      { label: "Home", command: () => this.commonService.goHome() },
      { label: "About" },
      { label: "API" },
    ];
  }
}
