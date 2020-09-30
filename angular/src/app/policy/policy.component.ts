import { Component } from '@angular/core';
import { CommonService } from '../shared/common/common.service';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';
import { AppConfig, Config } from '../shared/config-service/config-service.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sdp-policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.component.css']
})
export class PolicyComponent { 
  imageURL: string;
  confValues: Config;

  constructor(public commonService: CommonService, 
              public gaService: GoogleAnalyticsService,
              private appConfig: AppConfig)
  {
      this.confValues = this.appConfig.getConfig();
  }

  ngOnInit() {
    this.imageURL = this.confValues.SDPAPI + 'assets/images/sdp-background.jpg';

  }
}
