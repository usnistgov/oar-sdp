// Google Analytics (GA) script was handled differently from traditional web pages. Angular 2+ is a SPA
// which was considered only one page.
// When GA script was first added to index.html, it analyzed index.html page to decide what element to listen.
// In this all, index.html is very simple. There is nothing to listen but the home route '/'. 
// So when home route is added to the page it later it will trigger this router event. 
// We need to skip '/' to avoid registaer dup listeners.

import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
declare var gas:Function; 

@Injectable()
export class GoogleAnalyticsService {
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url != '/') {
        setTimeout(() => {
          gas('send', 'pageview', event.url, 'pageview');
        }, 1000);
      }
    })

  }
}
