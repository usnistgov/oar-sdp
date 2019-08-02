import { Component } from '@angular/core';
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
  constructor(public gaService: GoogleAnalyticsService){
  }

}
