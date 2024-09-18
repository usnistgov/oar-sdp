import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { GoogleAnalyticsService } from "../../shared/ga-service/google-analytics.service";
import { AppConfig, Config } from "../../shared/config-service/config.service";
import { CommonService } from "../../shared/common/common.service";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.css"],
})
export class ContactUsComponent implements OnInit {
  breadcrumbItems: any[];

  constructor(
    public commonService: CommonService,
    public gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Home", command: () => this.commonService.goHome() },
      { label: "Contact Us" },
    ];
  }
}
