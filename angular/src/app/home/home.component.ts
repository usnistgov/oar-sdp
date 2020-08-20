import { Component, Inject, OnInit } from '@angular/core';
import { SelectItem, DropdownModule } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
// import { SearchService } from '../shared/search-service/index'
import { SearchService, SEARCH_SERVICE } from '../shared/search-service';
import { Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import { AppConfig, Config } from '../shared/config-service/config-service.service';
import { timer } from 'rxjs/observable/timer';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sdp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  confValues: Config;
  errorMessage: string;
  taxonomies: SelectItem[];
  suggestedTaxonomies: string[];
  suggestedTaxonomyList: string[];
  searchTaxonomyKey: string;
  display: boolean = false;
  queryAdvSearch: string = '';
  textRotate: boolean = true;
  rows: any[];
  fields: SelectItem[];
  ALL: string = 'All Fields';
  displayFields: any[] = ['Authors', 'contactPoint', 'description', 'DOI', 'Keyword', 'Publisher', 'Rights', 'Theme',
    'Title'];
  SDPAPI: any;

  /**
   * Create an instance of services for Home
   */
  constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService,
    public taxonomyListService: TaxonomyListService, 
    public searchFieldsListService: SearchfieldsListService, 
    // public searchService: SearchService, 
    private router: Router,
    private appConfig: AppConfig) {
    this.taxonomies = [];
    this.suggestedTaxonomies = [];
    this.fields = [];
    this.confValues = this.appConfig.getConfig();
  }

  /**
   *
   */
  ngOnInit() {
    this.SDPAPI = this.confValues.SDPAPI;
    this.getTaxonomies();
    this.getTaxonomySuggestions();
    this.getSearchFields();
    this.rows = [{}];
    var placeHolder = ['Kinetics database', 'Gallium', '"SRD 101"', 'XPDB', 'Interatomic Potentials'];
    var n = 0;
    var loopLength = placeHolder.length;
  }

  /**
   * Handle the nameListService observable
   */

  getTaxonomies() {
    this.taxonomyListService.get()
      .subscribe(
        (taxonomies) => {
            this.taxonomies = this.toTaxonomiesItems(taxonomies)
        },
        (error) => {
            console.log(error);
            this.errorMessage = <any>error;
        }
      );
  }

  getTaxonomySuggestions() {
    this.taxonomyListService.get()
      .subscribe(
        taxonomies => this.suggestedTaxonomies = this.toTaxonomySuggestedItems(taxonomies),
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Taxonomy items list
   */
  toTaxonomySuggestedItems(taxonomies: any[]) {
    let items: string[] = [];
    for (let taxonomy of taxonomies) {
      items.push(taxonomy.label);
    }
    return items;
  }

  /**
   * Taxonomy items list
   */
  toTaxonomiesItems(taxonomies: any[]) {
    let items: SelectItem[] = [];
    items.push({ label: 'ALL RESEARCH', value: '' });
    for (let taxonomy of taxonomies) {
      items.push({ label: taxonomy.label, value: taxonomy.label });
    }
    return items;
  }


  /**
   * Filter keywords for suggestive search
   */
  filterTaxonomies(event: any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    for (let i = 0; i < this.suggestedTaxonomies.length; i++) {
      let keyw = this.suggestedTaxonomies[i];
      if (keyw.toLowerCase().indexOf(suggTaxonomy.trim().toLowerCase()) >= 0) {
        this.suggestedTaxonomyList.push(keyw);
      }
    }
  }


  /**
   * Get database fields for Advanced Search builder
   */
  getSearchFields() {
    this.searchFieldsListService.get()
      .subscribe(
        fields => this.fields = this.toFieldItems(fields),
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Advanced Search fields dropdown
   */
  toFieldItems(fields: any[]) {
    let items: SelectItem[] = [];
    items.push({ label: this.ALL, value: 'All' });
    let fieldItems: SelectItem[] = [];
    //for (let field of fields) {
    for (let field of this.displayFields) {
      //Object.keys(fields).forEach(function(fieldKey) {
      var fieldKey = _.startCase(field);
      fieldItems.push({ label: fieldKey, value: field });
    };
    fieldItems = _.sortBy(fieldItems, ['label', 'value']);

    fieldItems.unshift({ label: this.ALL, value: 'All' });

    return fieldItems;
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
