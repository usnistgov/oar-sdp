import { Component } from '@angular/core';
import { CommonService } from '../shared/common/common.service';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sdp-policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.component.css']
})
export class PolicyComponent { 
  constructor(
    public commonService: CommonService, public gaService: GoogleAnalyticsService){
  }

}
