import { Component, OnInit, NgZone, Inject, Renderer2, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
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
import { Query, QueryRow } from '../shared/search-query/query';

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

export class AdvSearchComponent extends FormCanDeactivate implements OnInit, AfterViewInit {

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
  queryNameValidateError: boolean = false;
  queryNameValidateErrorMsg: string = '';
  screenWidth: number;
  queries: Query[] = [];
  currentQuery: Query = new Query();
  currentQueryIndex: number = 0;
  previousQueryIndex: number = 0;

  /**
   * Constructor
   */
  constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService,
    public ngZone: NgZone,
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
        // If user clicks on the dropdown button, display the action popup list
        //otherwise hide it.
        if(e.target['name'] == 'dropdownButton')
            this.showDropdown = true;
        else
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
  }

  /**
   * init
   */
  ngOnInit() {
    var i = 0;

    // this.getTaxonomies();
    this.searchFieldsListService.getSearchFields().subscribe(
        (fields) => {
            this.fields = (fields as SelectItem[]);

            if(this.queries && this.queries.length > 0){
                this.currentQueryIndex = 0;
                this.displayQuery(this.currentQueryIndex);
            }
        },
        (err) => {
            this.errorMessage = <any>err;
        }
    )

    this.rows = [];
    this.searchOperators();

    this.editQuery = false;
    this.addQuery = false;
    this.queryName = '';
    this.imageURL = this.confValues.SDPAPI + 'assets/images/sdp-background.jpg';
    this.queries = this.searchQueryService.getQueries();
  }

      /**
     *  Following functions detect screen size
     */
    @HostListener("window:resize", [])
    public onResize() {
        this.detectScreenSize();
    }

    public ngAfterViewInit() {
        this.detectScreenSize();
    }

    private detectScreenSize() {
        this.screenWidth = window.innerWidth;
        this.mobWidth = window.innerWidth;
        this.mobHeight = window.innerHeight;

        this.onWindowResize();
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
    if(this.mobWidth > 767){
        this.breadcrumb_top = '0em';
    }else{
        this.breadcrumb_top = '-2.5em';
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
  * Delete query confirm popup
  */
  deleteConfirmQuery(queryName: string) {
    if (confirm("Do you really want to delete this query?")) {
        this.queries = this.queries.filter(query => query.queryName != queryName);
        // Save to local storage
        this.searchQueryService.saveQueries(this.queries);
        this.setCurrentQuery(0)
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
   * Advanced Search builder string
   */
  buildSearchString(query: Query) {
    let lSearchValue: string = '';
    this.queryAdvSearch = 'yes';

    for (let i = 0; i < query.queryRows.length; i++) {
      if (typeof query.queryRows[i].operator === 'undefined') {
        query.queryRows[i].operator = 'AND';
      }
      if (typeof query.queryRows[i].fieldType === 'undefined' || query.queryRows[i].fieldType === 'All') {
        query.queryRows[i].fieldType = 'searchphrase';
      }
      if (typeof query.queryRows[i].fieldText === 'undefined') {
        query.queryRows[i].fieldText = '';
      }

      let fieldValue: string;
      fieldValue = query.queryRows[i].fieldType;
      if (i > 0) {
        lSearchValue += ' ' + query.queryRows[i].operator + ' ' + fieldValue + '=' + query.queryRows[i].fieldText;
      } else {
        if (!_.isEmpty(fieldValue) || !_.isEmpty(query.queryRows[i].fieldText)) {
            lSearchValue += fieldValue + '=' + query.queryRows[i].fieldText;
        }
      }
    }

    return lSearchValue;
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
   * Delete a row in current query
   * @param index - index number of the row to be deleted
   */
  deleteRow(index: number){
    this.currentQuery.queryRows = this.currentQuery.queryRows.filter(row => row == this.currentQuery.queryRows[index]);
  }

  /**
   * Duplicate current row in current query
   * @param row - row to be duplicated
   */
  duplicateRow(row: QueryRow){
    this.currentQuery.queryRows.push(JSON.parse(JSON.stringify(row)));
    this.onDataChange();
  }

  /**
   * Duplicate query
   * Creates a new query then populates it with the given query
   * No need to update search box in the top search panel since this is a duplicate
   */
  dupQuery(index: number) {
    this.currentQueryIndex = null;
    this.previousQueryIndex = index;
    this.currentQuery = JSON.parse(JSON.stringify(this.queries[index]));
    this.currentQuery.queryName = this.currentQuery.queryName + " copy";
    this.dataChanged = true;
    this.editQuery = false;
    this.addQuery = true;
  }

  /**
   * Export query list
   */
  exportList() {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(JSON.stringify(this.queries));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'NIST-SDP-Queries.json';
    hiddenElement.click();
  }

  /**
   * Import query list
   */
  importList(event) {
      console.log('reading file...')
    var files = event.srcElement.files;
    files = files[0];
    let _this = this;
    var dataFile = [];
    var read: FileReader = new FileReader();
    read.readAsText(files);
    read.onloadend = function () {
      let fileData = read.result;
      console.log('fileData', fileData);
      _this.queries = JSON.parse(fileData.toString());
      console.log('this.query', _this.queries);
      _this.setCurrentQuery(0);
    }
  }

  /**
   * Init for creating new query
   */
  createQueryInit(row: any = {}) {
    this.previousQueryIndex = this.currentQueryIndex;
    this.currentQueryIndex = null;
    this.queryName = '';
    this.readyEdit = false;
    this.editQuery = false;
    this.addQuery = true;

    this.currentQuery = new Query();
    this.currentQuery.queryRows = [new QueryRow()];

  }

    /**
     * When query name input field focused
     * If not in edit/add mode and query name field already populated, it means this is an existing query
     *  - set the readyEdit flag to true 
     */
    setReadyEdit(){
        this.readyEdit = false;
        if(this.currentQuery.queryName && !this.addQuery && !this.editQuery)
        {
            this.previousQueryIndex = this.currentQueryIndex;
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
                if(queryName != this.queries[this.previousQueryIndex].queryName && this.queries.filter(query => { query.queryName == queryName }).length > 0){
                    this.queryNameValidateErrorMsg = "Query name already exists";
                    this.queryNameValidateError = true;
                }
            }
            
            if (this.addQuery){
                if(this.queries && this.queries.filter(query => { query.queryName == queryName }).length > 0){
                    this.queryNameValidateErrorMsg = "Query name already exists";
                    this.queryNameValidateError = true;
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
    saveAdvSearchQuery() {
        //Double check query name field value
        if(!this.queryNameValidation(this.currentQuery.queryName))
            return;

        // Build this.searchValue
        this.searchValue = this.buildSearchString(this.currentQuery);

        // If this is edit mode, replace previous query in the query list with the current query. Otherwise just insert
        // the current query to the list.
        if(this.editQuery){
            // Remove previous query in the list (saved as previousQueryIndex)
            this.queries = this.queries.filter(query => query.queryName != this.queries[this.previousQueryIndex].queryName);
        }
        // Add current query
        this.queries.push(JSON.parse(JSON.stringify(this.currentQuery)));
        // Sort by query name
        this.queries.sort((a, b) => a.queryName.localeCompare(b.queryName));
        // Save to local storage
        this.searchQueryService.saveQueries(this.queries);
        // Set current query index
        this.currentQueryIndex = this.queries.findIndex(query => query.queryName == this.currentQuery.queryName);
        // Refresh the right panel (query details)
        this.displayQuery(this.currentQueryIndex);

        // Update search box in the top search panel
        this.searchService.setQueryValue(this.searchValue, '', '');

        this.addQuery = false;
        this.editQuery = false;
        this.dataChanged = false;
    }

  /**
   * Cancel query edit.
   * Set previous query as current query.
   * Set edit/add flag to false.
   */
  cancelAdvSearchQuery() {
    this.editQuery = false;
    this.addQuery = false;
    this.searchValue = '';
    this.dataChanged = false;
    this.queryNameValidateError = false;
    this.currentQueryIndex = this.previousQueryIndex;
    if(this.currentQueryIndex != null)
        this.setCurrentQuery(this.currentQueryIndex);
    else
        this.setCurrentQuery(0);
    
    this.setReadyEdit();


    // New function
    if(this.queries.length > 0){
        this.displayQuery(this.currentQueryIndex);
    }else{
        this.currentQuery = new Query();
        this.currentQueryIndex = 0;
    }
  }

  /*
  * Execute query
  */
  executeQuery(query: Query) {
      let lQueryValue = this.buildSearchString(query);
      this.searchService.setQueryValue(lQueryValue, '', '');
      this.searchService.startSearching(true);
    // this.queryString = "/#/search?q=" + queryValue + "&key=&queryAdvSearch=";
    // window.open(this.queryString, '_self');
  }

    /**
     * Show query in the right panel. Do nothing in edit/add mode.
     * @param queryName - query to be displayed
     */
    displayQuery(index: number){
        if(!this.editQuery && !this.addQuery)
        {
            this.editQuery=false;
            this.addQuery=false;
            this.setCurrentQuery(index);         
        }
    }
    
    /**
     * Set the current query, build the search string. 
     * @param index - the index number of the current query
     */
    setCurrentQuery(index: number){
        // New function
        if(this.queries.length > 0 && index < this.queries.length){
            this.currentQuery = JSON.parse(JSON.stringify(this.queries[index]));
            this.currentQueryIndex = index;
            this.searchValue = this.buildSearchString(this.currentQuery);
            // Update search box in the top search panel
            this.searchService.setQueryValue(this.searchValue, '', ''); 
        }else{
            this.currentQuery = new Query();
            this.currentQueryIndex = 0;

            this.searchService.setQueryValue('', '', ''); 
        }
    }

    /**
     * When field type dropdown changed, if not edit/add mode, set to edit mode.
     * @param event 
     */
    onDataChange() {
        //Check if this is an existing query
        this.setReadyEdit();

        this.dataChanged = true;
        this.setMode(this.currentQuery.queryName);
    }

    /**
     * 
     */
    setMode(queryName: string){
        if(this.readyEdit) {
            this.previousQueryIndex = this.currentQueryIndex;
            this.editQuery = true;
            this.addQuery = false;
            this.readyEdit = false;
        }
    
        if(!this.editQuery && !this.addQuery){
            this.previousQueryIndex = null;
            this.addQuery = true;
            this.editQuery = false;
            this.createQueryInit();
        }
    }

    setDropdown(){
        this.ngZone.run(() => {
            this.showDropdown = true;
        });
    }
}