import { Component, OnInit, NgZone, Inject, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  styleUrls: ['adv-search.component.scss'],
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
  rows: any[] = [];
  fields: SelectItem[];
  ALL: string = 'ALL FIELDS';
  showDeleteButton: boolean = false;
  operators: SelectItem[];
  searchEntities: SearchEntity[] = [];
  selectedAdvSearch: string = '';
  queryValue: string[];
  editQuery: boolean = false;
  addQuery: boolean = false;
  mobHeight: number;
  mobWidth: number;
  width: string;
  isActive: boolean = true;
  filterClass: string = "ui-g-12 ui-md-9 ui-lg-9";
  resultsClass: string = "ui-g-12 ui-md-9 ui-lg-9";
  msgs: Message[] = [];
  oldQueryName: string = '';
  queryString: string;
  caretDown = 'faa faa-angle-down';
  placeholder: string;
  imageURL: string;
  confValues: Config;
  searchBoxWith: string = '50%';
  breadcrumb_top: string = '6em';
  readyEdit: boolean = false; // indecating current query is ready for editing. If user type in any character
                              // in the query name field, edit mode will be set to true. Otherwise add mode will
                              // set to true

  // @ViewChild('input1') inputEl: ElementRef;
  @ViewChild('dataChanged')
  dataChanged: boolean = false;  
  showDropdown: boolean = false;
  selectedRow: string;
  queryNameValidateError: boolean = false;
  queryNameValidateErrorMsg: string = '';

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

    this.renderer.listen('window', 'click',(e:Event)=>{ 
        this.showDropdown = false;
    })

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
  onKeyup(event, field: string) {
    this.dataChanged = true;

    if(field = 'queryName')
        this.queryNameValidation(event.target.value);
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
        //Display the top item in query list
        if(this.searchEntities && this.searchEntities.length > 0){
            this.queryName = this.searchEntities[0].data.queryName;
        }else{
            this.queryName = "";
        }

        this.setCurrentQuery(this.queryName)
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
   * Populate the right panel
   */
  showAdvSearch(queryName: any) {
    if(!queryName) return;  // nothing to display

    this.queryName = queryName;
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
  buildSearchString() {
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
  addRow(row: any = {}) {
    let rows = [...this.rows, JSON.parse(JSON.stringify(row))];
    this.rows = rows;
  }

  /**
   * Delete rows - Advanced Search block
   */
  deleteRow(rowIndex: number) {
    //Check if this is an existing query
    this.setReadyEdit();

    this.dataChanged = true;
    this.setMode(this.queryName);

    this.rows = this.rows.filter((val, i) => i != rowIndex);
    if(!this.rows) this.rows = [{}];
  }

  /**
   * Copy rows
   * 1. If not edit/add mode, 
   */
  copyRow(row: any[]) {
    //Check if this is an existing query
    this.setReadyEdit();

    this.dataChanged = true;
    this.setMode(this.queryName);

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
   * Creates a new query then populates it with the given query
   */
  dupQuery(query: any) {
    this.selectedRow = query.data.queryName;
    this.createQueryInit(query);

    this.searchValue = query.data.queryValue;
    this.showAdvSearch(query.data.queryName);
    this.queryName = query.data.queryName + " copy";
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
  createQueryInit(row: any = {}) {
    this.oldQueryName = '';
    this.queryName = '';
    this.readyEdit = false;
    this.editQuery = false;
    this.addQuery = true;
    this.rows = [];
    this.addRow(row);
  }

    /**
     * When query name input field focused
     * If not in edit/add mode and query name field already populated, it means this is an existing query
     *  - set the readyEdit flag to true 
     */
    setReadyEdit(){
        this.readyEdit = false;
        if(this.queryName && !this.addQuery && !this.editQuery)
        {
            this.oldQueryName = this.queryName;
            this.readyEdit = true;
        } 
    }

    /**
     * Query name field validation
     * 1. This field is required
     * 2. Query name should be unique
     * @param queryName 
     */
    queryNameValidation(queryName: string){
        this.queryNameValidateError = false;
        if (_.isEmpty(queryName)) {
        this.queryNameValidateErrorMsg = "Query name is required";
        this.queryNameValidateError = true;
        } else {
            if (this.editQuery) {
                for (let searchEntity of this.searchEntities) {
                    if (queryName == searchEntity.data.queryName && queryName != this.oldQueryName) {
                        this.queryNameValidateErrorMsg = "Query name already exists";
                        this.queryNameValidateError = true;
                    }
                }
            }
            
            if (this.addQuery){
                for (let resultItem of this.searchEntities) {
                    if (queryName == resultItem.data.queryName) {
                        this.queryNameValidateErrorMsg = "Query name already exists";
                        this.queryNameValidateError = true;
                    }
                }
            }
        }

        return !this.queryNameValidateError;
    }

    /**
     * Save query 
     * 1. Filter current query from the list
     * 2. Add the new query to the list
     */
    saveAdvSearchQuery(queryName: any) {
        //Double check query name field value
        if(!this.queryNameValidation(queryName))
            return;

        // Build this.searchValue
        this.buildSearchString();

        let data: Data;
        var date = new Date();
        data = { 'queryName': queryName, 'queryValue': this.searchValue, 'id': queryName, 'date': date.getTime() };
        this.searchEntities = this.searchEntities.filter(entry => entry.data.queryName != this.oldQueryName);
        this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
        this.searchQueryService.saveSearchQuery(data);
        this.getSearchQueryList();
        this.setCurrentQuery(queryName);
        this.addQuery = false;
        this.editQuery = false;
        this.dataChanged = false;
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
    this.dataChanged = false;
    this.queryNameValidateError = false;
    this.setReadyEdit();
    if(this.oldQueryName)
        this.setCurrentQuery(this.oldQueryName);
    else if(this.searchEntities && this.searchEntities.length > 0)
        this.setCurrentQuery(this.searchEntities[0].data.queryName)
  }

  /*
  * Execute query
  */
  executeQuery(queryValue: string) {
    this.queryString = "/#/search?q=" + queryValue + "&key=&queryAdvSearch=";
    window.open(this.queryString, '_self');
  }

    /**
     * Show query in the right panel. Do nothing in edit/add mode.
     * @param queryName - query to be displayed
     */
    showQuery(queryName: string){
        if(!this.editQuery && !this.addQuery)
        {
            this.editQuery=false;
            this.addQuery=false;
            this.showAdvSearch(queryName);
        }
    }
    
    /**
     * When user clicks on a query in the query list, highlight the query and 
     * display the query content at the right panel.
     * @param queryName 
     */
    setCurrentQuery(queryName: string){
        this.showQuery(queryName);
        this.selectedRow = queryName;
    }

    /**
     * When field type dropdown changed, if not edit/add mode, set to edit mode.
     * @param event 
     */
    onDropdownChange(event) {
        //Check if this is an existing query
        this.setReadyEdit();

        this.dataChanged = true;
        this.setMode(this.queryName);
    }

    /**
     * 
     */
    setMode(queryName: string){
        if(this.readyEdit) {
            this.oldQueryName = this.queryName;
            this.editQuery = true;
            this.addQuery = false;
            this.readyEdit = false;
        }
    
        if(!this.editQuery && !this.addQuery){
            this.oldQueryName = "";
            this.addQuery = true;
            this.editQuery = false;
            this.createQueryInit();
        }
    }
}