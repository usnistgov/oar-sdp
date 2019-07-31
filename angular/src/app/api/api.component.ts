import { Component } from '@angular/core';
import { AppConfig, Config } from '../shared/config-service/config-service.service';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sdp-api',
  templateUrl: 'api.component.html',
  styleUrls: ['api.component.css']
})
export class ApiComponent {
  confValues: Config;
  RestAPIURL: any;

    /**
   * Create an instance of services for Home
   */
  constructor(
    private appConfig: AppConfig,
    public gaService: GoogleAnalyticsService) {
      this.confValues = this.appConfig.getConfig();
      this.RestAPIURL = this.confValues.RMMAPI;
  }
}