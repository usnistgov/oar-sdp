import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { Router } from '@angular/router';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sdp-help',
  templateUrl: 'help.component.html',
  styleUrls: ['help.component.css']
})
export class HelpComponent {

  currentView = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var currentUrl = event.url;
        this.currentView = currentUrl.substring(currentUrl.indexOf("/help/") + 6);
        if (this.currentView === "") {
          this.currentView = "how-advanced-search";
        }
      }
    });
  }

  public navigateToPage(page: string): void {
    this.router.navigateByUrl("/help/" + page);
  }

}
