import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';
import { CommonService } from '../shared/common/common.service';
import { AppConfig, Config } from '../shared/config-service/config.service';

@Component({
  selector: 'sdp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  imageURL: string;

  constructor(public gaService: GoogleAnalyticsService, 
              private appConfig: AppConfig,
              public commonService: CommonService) 
  {   }

  ngOnInit() {
      this.appConfig.getConfig().subscribe(
          (conf) => {
              this.imageURL = conf.SDPAPI + 'assets/images/sdp-background.jpg';
          }
      );
  }

}
