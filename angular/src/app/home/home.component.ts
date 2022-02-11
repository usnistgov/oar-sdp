// import { SwitchView } from '@angular/common/src/directives/ng_switch';
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
    let queryValue: string;
    
    switch(searchValue) { 
        case 'IT': { 
            queryValue = 'topic.tag="Information Technology"';
            break; 
        } 
        case 'MS': { 
            queryValue = 'topic.tag="Mathematics AND Statistics"';
            break; 
        } 
        case 'Manufacturing': { 
            queryValue = 'topic.tag=Manufacturing';
            break; 
        } 
        case 'Forensics': { 
            queryValue = 'topic.tag=Forensics';
            break; 
        } 
        case 'Materials': { 
            queryValue = 'topic.tag=Materials';
            break; 
        } 
        case 'PN': { 
            queryValue = 'topic.tag=Physics,Neutron'; 
            break; 
        } 
        case 'AC': { 
            queryValue = 'topic.tag="Advanced Communications"';
            break; 
        } 
        case 'Chemistry': { 
            queryValue = 'topic.tag=Chemistry';
            break; 
        } 
        default: { 
            queryValue = 'topic.tag="Information Technology"';
            break; 
        } 
     } 

    let params: NavigationExtras = {
      queryParams: {
        'q': queryValue
      }
    };
    this.router.navigate(['/search'], params);
  }

//   onFocusEventAction(id: string) {
//       console.log("I am on focus!")

//         document.getElementById(id).style.background = "green";

//   }
}
