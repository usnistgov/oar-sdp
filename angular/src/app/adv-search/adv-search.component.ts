import { Component, OnInit, NgZone, Inject, Renderer2, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
import { SearchService, SEARCH_SERVICE } from '../shared/search-service';
import { Router, NavigationExtras } from '@angular/router';
import { SearchQueryService } from '../shared/search-query/search-query.service';
import { FormCanDeactivate } from '../form-can-deactivate/form-can-deactivate';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';
import { AppConfig, Config } from '../shared/config-service/config-service.service';
import { SDPQuery, QueryRow } from '../shared/search-query/query';
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
    fields: SelectItem[];
    operators: SelectItem[];
    editQuery: boolean = false;
    addQuery: boolean = false;
    mobHeight: number;
    mobWidth: number;
    resultsClass: string = "ui-g-12 ui-md-9 ui-lg-9";
    breadcrumb_top: string = '6em';
    showDropdown: boolean = false;
    queryNameValidateError: boolean = false;
    queryNameValidateErrorMsg: string = '';
    screenWidth: number;
    queries: SDPQuery[] = [];
    currentQuery: SDPQuery = new SDPQuery();
    currentQueryIndex: number = 0;
    previousQueryIndex: number = 0;

    // readyEdit: indecating current query is ready for editing. If user type in any character
    // in the query name field, edit mode will be set to true. Otherwise add mode will
    // set to true
    readyEdit: boolean = false; 

    @ViewChild('dataChanged') dataChanged: boolean = false; 

    /**
     * Constructor
     */
    constructor(@Inject(SEARCH_SERVICE) private searchService: SearchService,
        public ngZone: NgZone,
        public taxonomyListService: TaxonomyListService,
        public searchFieldsListService: SearchfieldsListService,
        public gaService: GoogleAnalyticsService,
        private router: Router,
        public searchQueryService: SearchQueryService,
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

        this.fields = [];
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
        this.searchOperators();

        this.editQuery = false;
        this.addQuery = false;

        this.searchFieldsListService.getSearchFields().subscribe(
            (fields) => {
                this.fields = (fields as SelectItem[]);
                this.queries = this.searchQueryService.getQueries();
                if(this.queries && this.queries.length > 0){
                    this.currentQueryIndex = 0;
                    this.displayQuery(this.currentQueryIndex);
                }
            },
            (err) => {
                this.errorMessage = <any>err;
            }
        );

        this.searchQueryService.watchQueries().subscribe(value => {
            if(value)
                this.queries = value as SDPQuery[];
        });
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
     * Do validation and variable init when user keys in a text input field.
     * @param event - text input value
     * @param field - if this is query name field, validate query name
     */
    onKeyup(event, field: string) {
        this.dataChanged = true;
        this.queryNameValidateErrorMsg = "";
        this.queryNameValidateError = false;

        if(field = 'queryName'){
            if (_.isEmpty(event.target.value)) {
                this.queryNameValidateErrorMsg = "Query name is required";
                this.queryNameValidateError = true;
            } else {
                if(!this.searchQueryService.queryNameValidation(event.target.value, this.queries[this.previousQueryIndex].queryName, this.getMode())){
                    this.queryNameValidateErrorMsg = "Query name is required";
                    this.queryNameValidateError = true;
                }
            }
        }
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
        let params: NavigationExtras = {
        queryParams: {
            'q': this.searchValue, 'key': searchTaxonomyKey ? searchTaxonomyKey : '',
            'queryAdvSearch': queryAdvSearch
        }
        };

        this.router.navigate(['/search'], params);
    }

    /**
     * Delete a row in current query
     * @param index - index number of the row to be deleted
     */
    deleteRow(index: number){
        this.currentQuery.queryRows = this.currentQuery.queryRows.filter(row => row.id != this.currentQuery.queryRows[index].id);

        this.onDataChange();
    }

    /**
     * Duplicate current row in current query
     * @param row - row to be duplicated
     */
    duplicateRow(row: QueryRow){
        let newRow: QueryRow = JSON.parse(JSON.stringify(row));
        newRow.id = this.nextRowId(this.currentQuery);
        this.currentQuery.queryRows.push(newRow);
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
        var files = event.srcElement.files;
        files = files[0];
        let _this = this;
        var dataFile = [];
        var read: FileReader = new FileReader();
        read.readAsText(files);
        read.onloadend = function () {
        let fileData = read.result;
        _this.queries = JSON.parse(fileData.toString());
        // Save to local storage
        _this.searchQueryService.saveQueries(_this.queries);
        _this.setCurrentQuery(0);
        }
    }

    /**
     * Init for creating new query
     */
    createQueryInit(row: any = {}) {
        this.previousQueryIndex = this.currentQueryIndex;
        this.currentQueryIndex = null;
        this.readyEdit = false;
        this.editQuery = false;
        this.addQuery = true;

        this.currentQuery = new SDPQuery();
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
     * Return edit mode as a string
     */
    getMode(){
        let mode: string;
        if(this.editQuery) mode = "EDIT";
        else mode = "ADD";

        return mode;
    }

    /**
     * Save query 
     * 1. Filter current query from the list
     * 2. Add the new query to the list
     */
    saveAdvSearchQuery() {
        //Double check query name field value
        if(!this.searchQueryService.queryNameValidation(this.currentQuery.queryName, this.queries[this.previousQueryIndex].queryName, this.getMode())){
            this.queryNameValidateErrorMsg = "Query name is required";
            this.queryNameValidateError = true;
            return;
        }

        // Build this.searchValue
        this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);

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


        // If query list is not empty, diaplay current query. Otherwise set current query to blank.
        if(this.queries.length > 0){
            this.displayQuery(this.currentQueryIndex);
        }else{
            this.currentQuery = new SDPQuery();
            this.currentQueryIndex = 0;
        }
    }

    /*
    * Execute query
    */
    executeQuery(query: SDPQuery) {
        let lQueryValue = this.searchQueryService.buildSearchString(query);
        this.searchService.setQueryValue(lQueryValue, '', '');
        this.searchService.startSearching(true);
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
            this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
            // Update search box in the top search panel
            this.searchService.setQueryValue(this.searchValue, '', ''); 
        }else{
            this.currentQuery = new SDPQuery();
            this.currentQueryIndex = 0;

            this.searchService.setQueryValue('', '', ''); 
        }
    }

    /**
     * When field type dropdown changed, if not edit/add mode, set to edit mode.
     * @param event 
     */
    onDataChange() {
        // Check if this is an existing query, if so, note current query index for backup purpose
        // and set readyEdit flag to true.
        this.setReadyEdit();

        this.dataChanged = true;
        this.setMode();
    }

    onFieldTypeChange(row: QueryRow){
        let field = this.fields.filter(field => field.label == row.fieldType);
        if(field != null && field.length > 0)   
            row.fieldValue = field[0].value;

        this.onDataChange();
    }

    /**
     * Set current mode (edit or add) based on readEdit flag.
     */
    setMode(){
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

    /**
     * Return next unique row id
     * @param query - given query
     */
    nextRowId(query: SDPQuery) {
        let id = Math.max.apply(Math, query.queryRows.map(function(o) { return o.id; })) + 1;
        if(id == null) return 1;
        else return id;
    }

    /**
     * Return next unique query id
     */
    nextQueryId() {
        return Math.max.apply(Math, this.queries.map(function(o) { return o.id; })) + 1;
    }

    /**
     * Look up field type
     * @param fieldValue - input field value
     */
    getFieldType(fieldValue: string){
        let field = this.fields.filter(field => field.value == fieldValue);
        if(field && field.length>0) return field[0].label;
        else return "";
    }
}