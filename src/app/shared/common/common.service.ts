import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public gaService: GoogleAnalyticsService, private router: Router) { }

  /*
   *  Go to home page and track pageview
   */
  goHome(){
    // this.gaService.gaTrackPageview('/', 'homepage');
    this.router.navigate(['']);
  }

  /*
   *  Go to external URL and track outbound event
   *  option - target. i.g., "_blank"
   */
//   openURL(url: string, option: string){
//     this.gaService.gaTrackEvent("Outbound", null, "", url);
//     (window as any).open(url, option);
//   }
}
