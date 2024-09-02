import { Component, OnInit } from "@angular/core";
import { GoogleAnalyticsService } from "../shared/ga-service/google-analytics.service";
import { CommonService } from "../shared/common/common.service";
import { AppConfig, Config } from "../shared/config-service/config.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: "sdp-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  breadcrumbItems: MenuItem[];
  constructor(
    public gaService: GoogleAnalyticsService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Home", command: () => this.commonService.goHome() },
      { label: "About" },
      { label: "NIST Data" },
    ];
  }
}
