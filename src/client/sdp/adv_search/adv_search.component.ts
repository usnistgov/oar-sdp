import { Component, OnInit } from '@angular/core';
import { SelectItem, DropdownModule } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchFieldsListService } from '../shared/searchfields-list/index';
import { SearchService } from '../shared/search-service/index';
import { Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sdp-advsearch',
  templateUrl: 'adv_search.component.html',
  styleUrls: ['adv_search.component.css']
 })

export class AdvSearchComponent implements OnInit {

    errorMessage: string;
    searchValue:string = '';
    advSearchValue:string[];
    taxonomies: SelectItem[];
  suggestedTaxonomyList: string[];
  suggestedTaxonomies: string[];

  searchTaxonomyKey: string;
    display: boolean = false;
    queryAdvSearch:string= '';
    showAdvancedSearch: boolean = false;
    rows: any[] ;
    fields: SelectItem[];
    ALL:string='All Fields';
    showDeleteButton:boolean = false;
    operators:SelectItem[];
    displayFields: any[] = ['Authors', 'contactPoint', 'description', 'DOI', 'Keyword' , 'Publisher', 'Rights' , 'Theme',
                            'Title'];
  /**
   * Create an instance of services for Home
   */
  constructor(public taxonomyListService: TaxonomyListService, public searchFieldsListService :
    SearchFieldsListService, public searchService:SearchService, private router:Router) {
             this.taxonomies = [];
             this.fields = [];
    }

  /**
   *
   */
  ngOnInit() {
      this.getTaxonomies();
      this.getSearchFields();
      this.rows =  [{}];
      this.searchOperators();
  }


  /**
   * Set the display to show the examples dialog
   */
   showDialog() {
        this.display = true;
    }

  /**
   * Advanced Search builder string
   */

   saveSearch() {
      this.searchValue = '';
      this.queryAdvSearch = 'yes';
      for (let i = 0; i < this.rows.length; i++) {
        if (typeof this.rows[i].column1 === 'undefined') {
          this.rows[i].column1 = 'AND';
        }
        if (typeof this.rows[i].column2 === 'undefined' || this.rows[i].column2 === 'All') {
          this.rows[i].column2 = 'searchphrase';
        }
        if (typeof this.rows[i].column3 === 'undefined') {
          this.rows[i].column3 = '';
        }

        let fieldValue: string;
        fieldValue = this.rows[i].column2;
        fieldValue = fieldValue.replace(/\s+/g, '');

        if (i > 0) {
          this.searchValue += '&logicalOp=' + this.rows[i].column1 + '&' + fieldValue + '=' + this.rows[i].column3;
        } else {
          this.searchValue += fieldValue + '=' + this.rows[i].column3;
        }
      }
    }

    /**
     * Handle the nameListService observable
     */

   getTaxonomies() {
      this.taxonomyListService.get()
        .subscribe(
          taxonomies => this.taxonomies = this.toTaxonomiesItems(taxonomies),
          error => this.errorMessage = <any>error
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
   * Filter keywords for suggestive search
   */
  filterTaxonomies(event:any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    for(let i = 0; i < this.suggestedTaxonomies.length; i++) {
      let keyw = this.suggestedTaxonomies[i];
      if(keyw.toLowerCase().indexOf(suggTaxonomy.toLowerCase()) >= 0) {
        this.suggestedTaxonomyList.push(keyw);
      }
    }
  }


  /**
   * Taxonomy items list
   */
  toTaxonomySuggestedItems(taxonomies:any[]) {
    let items: string[] = [];
    for (let taxonomy of taxonomies) {
      items.push(taxonomy.label);
    }
    return items;
  }

  /**
   * Taxonomy items list
   */
  toTaxonomiesItems(taxonomies:any[]) {
    let items: SelectItem[] = [];
    items.push({label: 'All Research', value: ''});
    for (let taxonomy of taxonomies) {
      items.push({label: taxonomy.label, value: taxonomy.label});
    }
    return items;
  }

  /**
   * Get database fields for Advanced Search builder
   */
  getSearchFields() {
      this.searchFieldsListService.get()
        .subscribe(
          fields => this.fields = this.toFieldItems(fields),
          error =>  this.errorMessage = <any>error
        );
  }

  /**
   * Advanced Search fields dropdown
   */
  toFieldItems(fields:any[]) {
    let items :SelectItem[] = [];
    items.push({label:this.ALL, value:'All'});
    let fieldItems: SelectItem[] = [];
    for (let field of fields) {
      if (_.includes(field.tags,'searchable')) {
        fieldItems.push({label: field.label, value: field.name});
      }
    };
    fieldItems = _.sortBy(fieldItems, ['label','value']);
    fieldItems.unshift({label:this.ALL, value:'All'});

    return fieldItems;
  }

  /**
   * Define Search operators for the drop down
   */
  searchOperators() {
    this.operators = [];
    this.operators.push({label:'AND', value:'AND'});
    this.operators.push({label:'OR', value:'OR'});
    this.operators.push({label:'NOT', value:'NOT'});
  }

  /**
   * Set the search parameters and redirect to search page
   */
  search(searchValue:string,searchTaxonomyKey:string,queryAdvSearch:string) {
      this.searchTaxonomyKey = searchTaxonomyKey;
      let params:NavigationExtras = {
        queryParams: { 'q': this.searchValue, 'key': this.searchTaxonomyKey ? this.searchTaxonomyKey:'',
          'queryAdvSearch':this.queryAdvSearch}
      };

      this.router.navigate(['/search'], params);
  }

  /**
   * Display advanced search block
   */
  advancedSearch(advSearch: boolean) {
    this.showAdvancedSearch = advSearch;
  }

  /**
   *  Pass Search example popup value to home screen
   */
  searchExample (popupValue:string) {
      this.display = false;
      this.searchValue = popupValue;
  }

  /**
   * Add rows - Advanced Search block
   */
  addRow () {
      this.rows.push({});
      this.showDeleteButton = true;
  }

  /**
   * Delete rows - Advanced Search block
   */

  deleteRow (rowIndex:number) {
      if (this.rows.length > 1) {
        this.rows.splice(rowIndex, 1);
        this.saveSearch();
      }
      if (this.rows.length === 1) {
        this.showDeleteButton = false;
      }
  }
}
