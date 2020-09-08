import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sdp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * Set the search parameters and redirect to search page
   */
  search(searchValue: string) {
    let queryValue = "topic.tag=" + searchValue;

    let params: NavigationExtras = {
      queryParams: {
        'q': queryValue
      }
    };
    this.router.navigate(['/search'], params);
  }
}
