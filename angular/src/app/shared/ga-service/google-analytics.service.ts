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
        //   console.log("Router gas() pageview: event URL", event.url, "title: pageview");
          gas('send', 'pageview', event.url, 'pageview');
        }, 1000);
      }
    })
  }

  /*
   * Tracking pageview
   */
  gaTrackPageview(url: string, title: string) {
    // console.log("Calling gas() pageview: URL", url, "title", title);
    gas('send', 'pageview', url, title);
  }

  // Tracking events
  gaTrackEvent(category: string, event?: any, label?: string, action?: string) {
    console.log('Tracking: category', category);
    console.log('Tracking: event', event);
    console.log('Tracking: label', label);
    console.log('Tracking: action', action);
    if (action == undefined) {
      // menu item
      if (event.item != undefined) {
        action = event.item.url;
        label = event.item.label;
      } else if (event.path != undefined) {
        for (var i = 0; i < event.path.length; i++) {
          if (event.path[i].href != undefined) {
            action = event.path[i].href;
            label = event.path[i].innerText;
            if (label == '' || label == undefined)
              label = event.path[i].hostname;
            break;
          }
        }
      } else
        action = 'URL not catched';
    }
    action = (action == undefined) ? "" : action;
    label = (label == undefined) ? "" : label;

    console.log("Calling gas(): Event category", category, "action", action, "label", label);
    gas('send', 'event', category, action, label, 1);
  }

/*
*   To hide the GA tracking code in config server, we need move the script session here.
*   First we read the tracking code from the config server, then form the script src and added the script
*   to the top of current page. 
*/
  public appendGaTrackingCode(gaCode: string) {
    try {
      let scriptId = '_fed_an_ua_tag';

      if (document.getElementById(scriptId)) {
        console.log("Found GA id.");
        document.getElementById(scriptId).remove();
      }

      var s = document.createElement('script') as any;
      s.type = "text/javascript";
      s.id = scriptId;
      s.src = "https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=DOC&subagency=NIST&pua=" + gaCode + "&yt=true&exts=ppsx,pps,f90,sch,rtf,wrl,txz,m1v,xlsm,msi,xsd,f,tif,eps,mpg,xml,pl,xlt,c";

      var h = document.getElementsByTagName("head");
      document.getElementsByTagName("head")[0].appendChild(s);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }
}
