import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { environment } from '../../../environments/environment';
declare var gas:Function; 

@Injectable()
export class GoogleAnalyticsService {
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gas('send', 'pageview', event.url, 'pageview');
      }
    })
  }
}
