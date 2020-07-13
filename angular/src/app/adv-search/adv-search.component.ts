import { Component, OnInit, NgZone, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SelectItem, DropdownModule, ConfirmationService, Message } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
// import { SearchService } from '../shared/search-service/index';
import { SearchService, SEARCH_SERVICE } from '../shared/search-service';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from '../shared/search-query/data';
import { SearchQueryService } from '../shared/search-query/search-query.service';
import { SearchEntity } from '../shared/search-query/search.entity';
import { FormCanDeactivate } from '../form-can-deactivate/form-can-deactivate';
import { timer } from 'rxjs/observable/timer';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';
import { AppConfig, Config } from '../shared/config-service/config-service.service';

import * as _ from 'lodash';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sdp-advsearch',
  templateUrl: 'adv-search.component.html',
  styleUrls: ['adv-search.component.css'],
  providers: [ConfirmationService]

})

export class AdvSearchComponent extends FormCanDeactivate implements OnInit {

  errorMessage: string;
  searchValue: string = '';
  advSearchValue: string[];
  taxonomies: SelectItem[];
  advSearchList: SelectItem[] = [];
  suggestedTaxonomyList: string[];
  suggestedTaxonomies: string[] = [];
  textRotate: boolean = true;
  searchTaxonomyKey: string;
  // display: boolean = false;
  displayQueryBuilder: boolean = false;
  queryAdvSearch: string = '';
  showAdvancedSearch: boolean = false;
  showAdvSearchBuilder: boolean = false;
  queryName: string = '';
  showSaveQueryDialog: boolean = false;
  rows: any[] = [];
  fields: SelectItem[];
  duplicateQuery: boolean = false;
  ALL: string = 'ALL FIELDS';
  showDeleteButton: boolean = false;
  operators: SelectItem[];
  searchEntities: SearchEntity[] = [];
  selectedAdvSearch: string = '';
  queryValue: string[];
  editQuery: boolean = false;
  addQuery: boolean = false;
  cloneQuery: boolean = false;
  mobHeight: number;
  mobWidth: number;
  width: string;
  isActive: boolean = true;
  filterClass: string = "ui-g-12 ui-md-9 ui-lg-9";
  resultsClass: string = "ui-g-12 ui-md-9 ui-lg-9";
  msgs: Message[] = [];
  queryNameReq: boolean = false;
  oldQueryName: string = '';
  queryString: string;
  caretDown = 'faa faa-angle-down';
  placeholder: string;
  imageURL: string;
  confValues: Config;
  searchBoxWith: string = '50%';
  breadcrumb_top: string = '6em';

  // @ViewChild('input1') inputEl: ElementRef;
  @ViewChild('dataChanged')
  dataChanged: boolean = false;  

  /**
   * Constructor
   */
  constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService,
    ngZone: NgZone,
    public taxonomyListService: TaxonomyListService,
    public searchFieldsListService: SearchfieldsListService,
    public gaService: GoogleAnalyticsService,
    // public searchService: SearchService,
    private router: Router,
    public searchQueryService: SearchQueryService,
    private confirmationService: ConfirmationService,
    private appConfig: AppConfig,
    private renderer: Renderer2) {

    super();

    this.confValues = this.appConfig.getConfig();
    this.taxonomies = [];
    this.fields = [];
    setTimeout(() => {
      this.getSearchQueryList();
    }, 100);

    this.mobHeight = (window.innerHeight);
    this.mobWidth = (window.innerWidth);
    // Init search box size and breadcrumb position
    this.onWindowResize();

    window.onresize = (e) => {
      ngZone.run(() => {
        this.mobWidth = window.innerWidth;
        this.mobHeight = window.innerHeight;
        this.onWindowResize();
      });
    };
  }


  /**
   * init
   */
  ngOnInit() {
    var i = 0;

    // this.getTaxonomies();
    this.getSearchFields();

    this.rows = [];
    this.searchOperators();

    this.editQuery = false;
    this.addQuery = false;
    this.queryName = '';
    this.imageURL = this.confValues.SDPAPI + 'assets/images/sdp-background.jpg';
  }

  /**
   * Key press event
   */
  onKeydown(event) {
    this.dataChanged = true;
    
    if(!this.editQuery && !this.addQuery){
      this.createQueryInit();
    }
  }

  /**
   * When window resized, we need to resize the search text box and reposition breadcrumb accordingly
   * When top menu bar collapse, we want to place breadcrumb inside the top menu bar
   */
  onWindowResize(){
    if(this.mobWidth > 750){
      this.breadcrumb_top = '6em';
    }else{
      this.breadcrumb_top = '3.5em';
    }
  }

  /**
   * Get search query list
   */
  getSearchQueryList() {
    this.searchQueryService.getAllSearchEntities().then(function (result) {
      this.searchEntities = _.sortBy(result, [function (o) { return o.date; }]);
      this.searchEntities = _.reverse(this.searchEntities);
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
  }

  /**
   * Confirm cancel query edit
   */
  cancelConfirm() {
    if (this.dataChanged) {
      if (confirm("Do you really want to cancel this edit?")) {
        this.cancelAdvSearchQuery()
      }
    } else {
      this.cancelAdvSearchQuery();
    }
  }

  /*
  * Delete confirm popup
  */
  deleteConfirmQuery(queryName: string) {
    if (confirm("Do you really want to delete this query?")) {
      this.searchEntities = this.searchEntities.filter(entry => entry.data.queryName != queryName);
      this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
    }

  }

  /*
  * Set column width - seems not been used
  */
  setResultsWidth() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.resultsClass = "ui-g-12 ui-md-11 ui-lgc-11";
      this.filterClass = "ui-g-12 ui-md-11 ui-lgc-1";
    } else {
      this.resultsClass = "ui-g-12 ui-md-9 ui-lg-9";
    }
  }

  /**
   * Set the display to show the examples dialog
   */
  showAdvSearch(queryName: any) {
    console.log("this.editQuery", this.editQuery);
    this.queryName = queryName;
    if (!this.cloneQuery) {
      this.oldQueryName = queryName;
    } else {
      this.oldQueryName = "";
    }
    this.rows = [{}];
    let k = 1;
    for (let resultItem of this.searchEntities) {
      if (queryName == resultItem.data.queryName) {
        this.searchValue = resultItem.data.queryValue;
        this.queryValue = resultItem.data.queryValue.split('&');

        if (this.queryValue.length > 1) {
          for (var i = 0; i < this.queryValue.length; i++) {
            if (i == 0) {
              this.rows[i] = [{}];
              let row = this.queryValue[i].split('=');
              if (row[0].includes('searchphrase')) {
                this.rows[i].column3 = 'All'
              } else {
                this.rows[i].column3 = row[0];
              }
              this.rows[i].column2 = row[1];
            }

            if (i != 0) {
              if (i % 2 != 0) {
                this.rows[k] = [{}];
                let row = this.queryValue[i].split('=');
                this.rows[k].column1 = row[1];
                i++;
                row = this.queryValue[i].split('=');
                if (row[0].includes('searchphrase')) {
                  this.rows[k].column3 = 'All'
                } else {
                  this.rows[k].column3 = row[0];
                }
                this.rows[k].column2 = row[1];
                k++;
              }
            }
          }
        } else {
          let row = this.queryValue[0].split('=');
          if (row[0].includes('searchphrase')) {
            this.rows[0].column3 = 'All'
          } else {
            this.rows[0].column3 = row[0];
          }
          this.rows[0].column2 = row[1];
        }
      }
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
    this.dataChanged = true;
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
    for (let field of fields) {
      if (_.includes(field.tags, 'searchable')) {
        fieldItems.push({ label: field.label, value: field.name });
      }
    };
    fieldItems = _.sortBy(fieldItems, ['label', 'value']);
    fieldItems.unshift({ label: this.ALL, value: 'All' });

    return fieldItems;
  }

  /**
   * Define Search operators for the drop down
   */
  searchOperators() {
    this.operators = [];
    this.operators.push({ label: 'AND', value: 'AND' });
    this.operators.push({ label: 'OR', value: 'OR' });
    this.operators.push({ label: 'NOT', value: 'NOT' });
  }

  /**
   * Set the search parameters and redirect to search page
   */
  search(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string) {
    this.searchTaxonomyKey = searchTaxonomyKey;
    let params: NavigationExtras = {
      queryParams: {
        'q': this.searchValue, 'key': this.searchTaxonomyKey ? this.searchTaxonomyKey : '',
        'queryAdvSearch': this.queryAdvSearch
      }
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
  searchExample(popupValue: string) {
    this.searchValue = popupValue;
    this.textRotate = !this.textRotate;
  }

  /**
   * Add rows - Advanced Search block
   */
  addRow() {
    let rows = [...this.rows, {}];
    this.rows = rows;
  }

  /**
   * Delete rows - Advanced Search block
   */
  deleteRow(rowIndex: number) {
    this.rows = this.rows.filter((val, i) => i != rowIndex);
    this.saveSearch();
  }

  /**
   * Copy rows
   */
  copyRow(row: any[]) {
    let rows = [...this.rows, this.clone(row)];
    //let rows = [...this.rows,row];
    this.rows = rows;
  }

  /**
   * Clone one object
   */
  clone(obj) {
    if (obj == null || typeof (obj) != 'object')
      return obj;

    var temp = new obj.constructor();
    for (var key in obj)
      temp[key] = this.clone(obj[key]);

    return temp;
  }

  /**
   * Clear search text box - on focus
   */
  clearText() {
    var field = (<HTMLInputElement>document.getElementById('advsearchinput'));
    if (!Boolean(this.searchValue.trim())) {
      field.value = ' ';
    }
  }

  /**
   * Display placeholder - on blur
   */
  addPlaceholder() {
    var field = (<HTMLInputElement>document.getElementById('advsearchinput'));
    if (!Boolean(this.searchValue)) {
      field.value = '';
    }
  }

  /**
   * Duplicate query
   */
  dupQuery(queryName: any, queryValue: string) {
    // this.showSaveQueryDialog = true;

    this.editQuery = false;
    this.addQuery = true;
    this.cloneQuery = true;
    this.searchValue = queryValue;
    this.showAdvSearch(queryName);
    //data = {'queryName':queryName,'queryValue':this.searchValue,'id':queryName};
    //this.searchQueryService.saveAdvSearchQuery(data);

  }

  /**
   * Export query list
   */
  exportList() {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(JSON.stringify(this.searchEntities));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'NIST-SDP-Queries.json';
    hiddenElement.click();
  }

  /**
   * Import query list
   */
  importList(event) {
    var files = event.srcElement.files;
    files = files[0];
    var dataFile = [];
    var read: FileReader = new FileReader();
    read.readAsText(files);
    read.onloadend = function () {
      let fileData = read.result;
      let fileJson = JSON.parse(fileData.toString());
      for (let i in fileJson) {
        let dataset = fileJson[i].data;
        var dataQuery = JSON.stringify(dataset)
        dataFile.push(dataQuery);
      }
    }
    setTimeout(() => {
      for (let i = 0; i < dataFile.length; i++) {
        let data = dataFile[i];    //voila!
        this.searchQueryService.saveSearchQuery(JSON.parse(data));
      }
    }, 100);
    setTimeout(() => {
      this.getSearchQueryList();
      // console.log("+++++++++++length+++++++" + this.searchEntities.length);
    }, 100);
  }

  /**
   * Init for creating new query
   */
  createQueryInit() {
    this.oldQueryName = '';
    this.editQuery = false;
    this.addQuery = true;
    this.cloneQuery = false;
    this.rows = [];
    this.addRow();
  }

  /**
   * Save query
   */
  saveQuery(queryName: any) {
    this.saveAdvSearchQuery(queryName, this.addQuery);
  }

  /**
   * Save query - detail
   */
  saveAdvSearchQuery(queryName: any, addQuery: boolean) {
    this.duplicateQuery = false;
    this.queryNameReq = false;

    if (_.isEmpty(this.queryName)) {
      this.queryNameReq = true;
    } else {
      if (this.editQuery) {
        queryName = this.queryName;

        let data: Data;
        var date = new Date();
        data = { 'queryName': queryName, 'queryValue': this.searchValue, 'id': queryName, 'date': date.getTime() };
        for (let resultItem of this.searchEntities) {
          if (queryName == resultItem.data.queryName && queryName != this.oldQueryName) {
            this.duplicateQuery = true;
            this.showSaveQueryDialog = true;
          }
        }
        if (!this.duplicateQuery) {
          this.searchEntities = this.searchEntities.filter(entry => entry.data.queryName != this.oldQueryName);
          this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
          this.searchQueryService.saveSearchQuery(data);
          this.getSearchQueryList();
          this.editQuery = false;
          this.dataChanged = false;
          this.cloneQuery = false;
        }
      } else if (this.addQuery || addQuery) {

        this.getSearchQueryList();
        this.duplicateQuery = false;
        for (let resultItem of this.searchEntities) {
          if (queryName == resultItem.data.queryName) {
            this.duplicateQuery = true;
            this.showSaveQueryDialog = true;
          }
        }
        if (!this.duplicateQuery) {
          let data: Data;
          var date = new Date();
          data = { 'queryName': queryName, 'queryValue': this.searchValue, 'id': queryName, 'date': date.getTime() };
          this.searchEntities = this.searchEntities.filter(entry => entry.data.queryName != this.oldQueryName);
          this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
          this.searchQueryService.saveSearchQuery(data);
          this.getSearchQueryList();
          this.duplicateQuery = false;
          this.showSaveQueryDialog = false;
          this.addQuery = false;
          this.editQuery = false;
          this.dataChanged = false;
          this.cloneQuery = false;
        }
      }
    }
  }

  /*
  * Cancel query edit
  */
  cancelAdvSearchQuery() {
    this.editQuery = false;
    this.rows = [];
    // this.displayQueryBuilder = false;
    this.editQuery = false;
    this.addQuery = false;
    this.queryName = '';
    this.searchValue = '';
    this.queryNameReq = false;
    this.duplicateQuery = false;
    this.dataChanged = false;
    this.cloneQuery = false;
  }

  /*
  * Execute query
  */
  executeQuery(queryValue: string) {
    this.queryString = "/search?q=" + queryValue + "&key=&queryAdvSearch=";
    window.open(this.queryString, '_self');
  }
}