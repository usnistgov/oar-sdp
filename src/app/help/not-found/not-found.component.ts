import {Component, ViewChild, ElementRef} from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'help-page-not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.css']
})
export class  HelpPageNotFoundComponent {

  constructor(public gaService: GoogleAnalyticsService) { }
  
  public HelpPageNotFoundComponent () {
   }







}
