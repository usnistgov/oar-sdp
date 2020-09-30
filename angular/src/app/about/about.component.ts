import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';
import { CommonService } from '../shared/common/common.service';
import { AppConfig, Config } from '../shared/config-service/config-service.service';

@Component({
  selector: 'sdp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  imageURL: string;
  confValues: Config;

  constructor(
    public gaService: GoogleAnalyticsService, 
    private appConfig: AppConfig,
    public commonService: CommonService) 
  { 
    this.confValues = this.appConfig.getConfig();
  }

  ngOnInit() {
    this.imageURL = this.confValues.SDPAPI + 'assets/images/sdp-background.jpg';

  }

}
