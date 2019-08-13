// Google Analytics (GA) script was handled differently from traditional web pages. Angular 2+ is a SPA
// which was considered only one page.
// When GA script was first added to index.html, it analyzed index.html page to decide what element to listen.
// In this all, index.html is very simple. There is nothing to listen but the home route '/'. 
// So when home route is added to the page it later it will trigger this router event. 
// We need to skip '/' to avoid registaer dup listeners.

import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var gas: Function;

@Injectable()
export class GoogleAnalyticsService {
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url != '/') {
        setTimeout(() => {
          console.log("Router gas() pageview: event URL", event.url, "title: pageview");
          gas('send', 'pageview', event.url, 'pageview');
        }, 1000);
      }
    })
  }

  /*
   * Tracking pageview
   */
  gaTrackPageview(url: string, title: string) {
    console.log("Calling gas() pageview: URL", url, "title", title);
    gas('send', 'pageview', url, title);
  }

  /*
   * Tracking events
   * If action and label are provided, use them. Otherwise try to get them from event param.
   * If nothing available, leave them blank.
   */
  gaTrackEvent(category: string, event?:any, label?: string, action?: string) {
    console.log("Original event param: category", category, "action", action, "label", label);
    if(action == undefined){
      // menu item
      if(event.item != undefined){
        action = event.item.url;
        label = event.item.label;
      }else if(event.path != undefined){
        for(var i = 0; i < event.path.length; i++){
          if(event.path[i].href != undefined){
            action = event.path[i].href;
            label = event.path[i].innerText;
            if(label == '' || label == undefined)
              label = event.path[i].hostname;
            break;
          }
        }
      }else
        action = 'URL not catched';
    }
    action = (action == undefined)?"":action;
    label = (label == undefined)?"":label;

    console.log("Calling gas(): Event category", category, "action", action, "label", label);
    gas('send', 'event', category, action, label, 1);

    // setTimeout(() => {
    //   console.log("Event category", category, "action", action, "label", label);
    //   gas('send', 'event', category, action, label, 1);
    // }, 1000);
  }
}
