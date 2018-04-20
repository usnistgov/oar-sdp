import { Component, OnInit } from '@angular/core';
import { SelectItem, DropdownModule } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchFieldsListService } from '../shared/searchfields-list/index';
import { SearchService } from '../shared/search-service/index';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from '../shared/search-query/data';
import { SearchQueryService } from '../shared/search-query/search-query.service';
import { SearchEntity } from '../shared/search-query/search.entity';

import * as _ from 'lodash';
declare var jQuery: any


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
    advSearchList: SelectItem[] = [];
    suggestedTaxonomyList: string[];
    suggestedTaxonomies: string[];
    textRotate: boolean = true;
    searchTaxonomyKey: string;
    display: boolean = false;
    queryAdvSearch:string= '';
    showAdvancedSearch: boolean = false;
    showAdvSearchBuilder: boolean = false;
    queryName:string='';
    showQueryName:boolean = false;
    rows: any[] ;
    fields: SelectItem[];
    ALL:string='ALL FIELDS';
    showDeleteButton:boolean = false;
    operators:SelectItem[];
    searchEntities: SearchEntity[] = [];
    selectedAdvSearch : string = '';
    queryValue: string[];


  displayFields: any[] = ['Authors', 'contactPoint', 'description', 'DOI', 'Keyword' , 'Publisher', 'Rights' , 'Theme',
                            'Title'];
  /**
   * Create an instance of services for Home
   */
  constructor(public taxonomyListService: TaxonomyListService, public searchFieldsListService :
    SearchFieldsListService, public searchService:SearchService, private router:Router,public searchQueryService: SearchQueryService) {
    this.taxonomies = [];
    this.fields = [];
    setTimeout(() => {
      this.getAdvSearchQueryList();
      console.log("+++++++++++length+++++++" + this.searchEntities.length);
    },1000);

    setTimeout(() => {
      this.advSearchList.push({label:'Create New', value:'add'})
      for (let resultItem of this.searchEntities) {
        if (!_.isEmpty(resultItem.data.queryName)) {
          console.log("query name++++++" + resultItem.data.queryName);
          this.advSearchList.push({label: resultItem.data.queryName, value: resultItem.data.queryName});
        }
      }
    },1000);

}

  /**
   *
   */
  ngOnInit() {
    //jQuery('.element').atrotating();
    this.getTaxonomies();
    this.getSearchFields();
    this.rows =  [{}];
    this.searchOperators();
    var placeHolder = ['Kinetics database', 'Gallium', '"SRD 101"', 'XPDB', 'Interatomic Potentials'];
    var i=0;
    var loopLength=placeHolder.length;
    setInterval(function(){
      if(i<loopLength){
        var newPlaceholder = placeHolder[i];
        i++;
        jQuery('#advsearchinput').attr('placeholder',newPlaceholder);
      } else {
        jQuery('#advsearchinput').attr('placeholder',placeHolder[0]);
        i=0;
      }
    },2000);
      /*
      this.advSearchList = [
      {label:'', value:null},
      {label:'Create New', value:'add'},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}

    ]; */
  }

  getAdvSearchQueryList() {
    this.searchQueryService.getAllAdvSearchEntities().then(function (result) {
    this.searchEntities = result;
    console.log("cart entities inside datacartlist _______" + JSON.stringify(this.searchEntities));
    }.bind(this), function (err) {
    });
  }


  /**
   * Set the display to show the examples dialog
   */
   showDialog() {
        this.display = true;
    }

  /**
   * Set the display to show the examples dialog
   */
  showAdvSearch() {
    if (this.selectedAdvSearch == "") {
      this.showAdvSearchBuilder = false;
    } else {
      console.log("adv search----" + this.selectedAdvSearch);
      this.showAdvSearchBuilder = true;
      this.rows = [{}];
      for (let resultItem of this.searchEntities) {
        if (this.selectedAdvSearch.includes(resultItem.data.queryName)) {
          this.queryValue = resultItem.data.queryValue.split('&');
          console.log("query value++ " + this.queryValue);
          for (var i = 0; i <  this.queryValue.length; i++) {
            if (i==0) {
              this.rows[i] = [{}];
              let row = this.queryValue[i].split('=');
              if (row[0].includes('searchphrase')) {
                this.rows[i].column3 = 'All'
              } else {
                this.rows[i].column3 = row[0];
              }
              this.rows[i].column2 = row[1];
            }

            if (i!= 0 ) {
              if (i % 2 != 0) {
                this.rows[i] = [{}];
                let row = this.queryValue[i].split('=');
                this.rows[i].column1 = row[1];
              }

              if (i % 2 == 0) {
                let row = this.queryValue[i].split('=');
                if (row[0].includes('searchphrase')) {
                  this.rows[i-1].column3 = 'All'
                } else {
                  this.rows[i-1].column3 = row[0];
                }
                this.rows[i-1].column2 = row[1];
                this.showDeleteButton = true;
              }
            }
          }
        }
      }
      this.saveSearch();
    }
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
        if (typeof this.rows[i].column3 === 'undefined' || this.rows[i].column3 === 'All') {
          this.rows[i].column3 = 'searchphrase';
        }
        if (typeof this.rows[i].column2 === 'undefined') {
          this.rows[i].column2 = '';
        }

        let fieldValue: string;
        fieldValue = this.rows[i].column3;
        fieldValue = fieldValue.replace(/\s+/g, '');

        if (i > 0) {
          this.searchValue += '&logicalOp=' + this.rows[i].column1 + '&' + fieldValue + '=' + this.rows[i].column2;
        } else {
          if (!_.isEmpty(fieldValue) || !_.isEmpty(this.rows[i].columns)) {
            this.searchValue += fieldValue + '=' + this.rows[i].column2;
          }
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
   * Set the display to show the examples dialog
   */
  toggleTextRotate() {
    console.log("hello" + this.textRotate);
    if (this.searchValue == "") {
      this.textRotate = !this.textRotate;
    }
  }

  /**
   * Filter keywords for suggestive search
   */
  filterTaxonomies(event:any) {
    let suggTaxonomy = event.query;
    this.suggestedTaxonomyList = [];
    for(let i = 0; i < this.suggestedTaxonomies.length; i++) {
      let keyw = this.suggestedTaxonomies[i];
      if(keyw.toLowerCase().indexOf(suggTaxonomy.trim().toLowerCase()) >= 0) {
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
    items.push({label: 'ALL RESEARCH', value: ''});
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
    this.textRotate = !this.textRotate;
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


  clearText(){
    var field = (<HTMLInputElement>document.getElementById('searchinput'));
    if (!Boolean(this.searchValue.trim())) {
      field.value = ' ';
    }
  }

  addPlaceholder() {
    var field = (<HTMLInputElement>document.getElementById('searchinput'));
    if (!Boolean(this.searchValue)) {
      field.value = '';
    }
  }

  displayQuery () {
    this.showQueryName = true;
    //data = {'queryName':queryName,'queryValue':this.searchValue,'id':queryName};
    //this.searchQueryService.saveAdvSearchQuery(data);

  }

  saveAdvSearchQuery (queryName:any) {
    let data : Data;
    data = {'queryName':queryName,'queryValue':this.searchValue,'id':queryName};
    this.searchQueryService.saveAdvSearchQuery(data);
    this.getAdvSearchQueryList();
    this.showQueryName = false;
  }

  deleteAdvSearchQuery (queryName:any) {
    this.searchEntities = this.searchEntities.filter(entry => entry.data.queryName != queryName);
    this.searchQueryService.saveListOfAdvSearchEntities(this.searchEntities);
    this.advSearchList = [];
    setTimeout(() => {
      this.advSearchList.push({label:'Create New', value:'add'})
      for (let resultItem of this.searchEntities) {
        if (!_.isEmpty(resultItem.data.queryName)) {
          console.log("query name++++++" + resultItem.data.queryName);
          this.advSearchList.push({label: resultItem.data.queryName, value: resultItem.data.queryName});
        }
      }
    },1000);
    this.showAdvSearchBuilder = false;
  }

  cancelAdvSearchQuery () {
    this.advSearchList = [];
    setTimeout(() => {
      this.advSearchList.push({label:'Create New', value:'add'})
      for (let resultItem of this.searchEntities) {
        if (!_.isEmpty(resultItem.data.queryName)) {
          console.log("query name++++++" + resultItem.data.queryName);
          this.advSearchList.push({label: resultItem.data.queryName, value: resultItem.data.queryName});
        }
      }
    },1000);
    this.showAdvSearchBuilder = false;
  }

  resetAdvSearchQuery(){
    for (let resultItem of this.searchEntities) {
      if (this.selectedAdvSearch.includes(resultItem.data.queryName)) {
        this.queryValue = resultItem.data.queryValue.split('&');
        console.log("query value++ " + this.queryValue);
        for (var i = 0; i < this.queryValue.length; i++) {
            this.rows[i] = [{}];
        }
      }
    }
  }
}
