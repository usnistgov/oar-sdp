import { Component, OnInit, NgZone, Inject, Renderer2, ViewChild, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
import { SearchService, SEARCH_SERVICE } from '../shared/search-service';
import { Router, NavigationExtras } from '@angular/router';
import { SearchQueryService } from '../shared/search-query/search-query.service';
import { FormCanDeactivate } from '../form-can-deactivate/form-can-deactivate';
import { GoogleAnalyticsService } from '../shared/ga-service/google-analytics.service';
import { AppConfig, Config } from '../shared/config-service/config-service.service';
import { SDPQuery, QueryRow, CurrentQueryInfo } from '../shared/search-query/query';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ConfirmService } from '../shared/confirm/confirm.service';
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
    operators: SelectItem[] = [
        { label: 'AND', value: 'AND' },
        { label: 'OR', value: 'OR' }
    ];
    // editQuery: boolean = false;
    // addQuery: boolean = false;
    mobHeight: number;
    mobWidth: number;
    resultsClass: string = "ui-g-12 ui-md-9 ui-lg-9";
    breadcrumb_top: string = '6em';
    showDropdown: boolean = false;
    queryNameValidateError: boolean = false;
    queryNameValidateErrorMsg: string = '';
    screenWidth: number;
    queries: SDPQuery[] = [];
    currentQueryInfo: CurrentQueryInfo;
    currentQuery: SDPQuery = new SDPQuery();
    currentQueryIndex: number = 0;
    previousQueryIndex: number = 0;
    rowInputValidateError: boolean = false;
    nextQuery: SDPQuery;
    nextQueryIndex: number;

    @ViewChild('dataChanged') dataChanged: boolean = false; 
    @ViewChild('field2') queryName: ElementRef;
    @ViewChild('op1') op_confirm: OverlayPanel;
    @ViewChild('op5') op: OverlayPanel;
    @ViewChild('overlayTarget') overlayTarget: ElementRef;

    toggleOverlay = ({ originalEvent }) => this.op.toggle(originalEvent);

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
        private renderer: Renderer2,
        private confirmDialogSvc: ConfirmService) {

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
        // this.editQuery = false;
        // this.addQuery = false;

        this.searchFieldsListService.getSearchFields().subscribe(
            (fields) => {
                this.fields = (fields as SelectItem[]);
                this.queries = this.searchQueryService.getQueries();
                this.currentQueryInfo = this.searchQueryService.getCurrentQueryInfo();
                this.currentQuery = this.currentQueryInfo.query;
                this.dataChanged = this.currentQueryInfo.dataChanged;   //Restore status
                this.currentQueryIndex = this.currentQueryInfo.queryIndex;
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

    setRowText(fieldValue: string, queryRow: QueryRow){
        this.dataChanged = true;
        if (_.isEmpty(fieldValue)) {
            queryRow.validated = false;
            this.rowInputValidateError = true;
        }else{
            queryRow.validated = true;
            this.rowInputValidateError = false;

            if(!_.isEmpty(queryRow.fieldType)){
                this.currentQueryInfo.query = this.currentQuery;
                this.searchQueryService.saveCurrentQueryInfo(this.currentQueryInfo);

                this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
                // Update search box in the top search panel
                this.searchService.setQueryValue(this.searchValue, '', '');
            }
        }
    }

    /**
     * Validate query name field
     * @param queryName - if query name provided and it's the same as current query name, do nothing
     *                  - otherwise check query name and set mode
     */
    checkQueryName(queryName?: string) {
        if(queryName != null && queryName != undefined){
            if(this.currentQuery.queryName == queryName)
                return;
            else
                this.currentQuery.queryName = queryName;
        }
        
        this.queryNameValidateErrorMsg = "";
        this.queryNameValidateError = false;

        if (_.isEmpty(this.currentQuery.queryName)) {
            this.queryNameValidateErrorMsg = "Query name is required";
            this.queryNameValidateError = true;
        } else {
            if(this.queries.length > 0){
                let prevQueryName: string = "";
                
                if(!this.searchQueryService.queryNameValidation(this.currentQuery.queryName, prevQueryName)){
                    this.queryNameValidateErrorMsg = "Existing query will be overwritten if continue!";
                    this.queryNameValidateError = true;
                }
            }
        }

        // if(!this.editQuery && !this.addQuery){
        //     this.addQuery = false;
        //     this.editQuery = true;
        //     this.previousQueryIndex = this.currentQueryIndex;  
        // }   

        this.dataChanged = true;
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

    /*
    * Delete query confirm popup
    */
    deleteConfirmQuery(queryName: string, index: number) {
        this.confirmDialogSvc.confirm(
            'Do you really want to delete this query?',   //Title
            'Query name: ' + queryName, //Message
            false,   //Show warning sign
            true,   //Show second button
            false,  // Hide third button
            'Yes',  // Button one caption
            'Cance'    // Button two caption
        )
        .then((returnValue) => {
            if (returnValue.trim().toLowerCase() == 'yes'){
                this.queries.splice(index, 1);
                // Save to local storage
                this.searchQueryService.saveQueries(this.queries);
                // If this is current query, clear data input boxes
                if(index == this.currentQueryIndex){
                    this.clearAdvSearchQuery();
                }
            }
            else
                console.log("User canceled discard request");
        })
        .catch(() => {
            console.log("User canceled discard request (indirectly)");
        });
    }

    /**
     * Delete a row in current query
     * @param index - index number of the row to be deleted
     */
    deleteRow(index: number){
        this.currentQuery.queryRows = this.currentQuery.queryRows.filter(row => row.id != this.currentQuery.queryRows[index].id);

        if(this.currentQuery.queryRows.length <= 0){
            this.currentQuery.queryRows.push(new QueryRow());
        }

        this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
        // Update search box in the top search panel
        this.searchService.setQueryValue(this.searchValue, '', '');

        //Validate field value
        if(this.currentQuery.queryRows.filter(row => row.validated == false).length > 0)
            this.rowInputValidateError = true;
        else
            this.rowInputValidateError = false;

        this.onDataChange();
    }

    /**
     * Duplicate current row in current query
     * @param row - row to be duplicated
     */
    duplicateRow(row: QueryRow, index: number){
        let newRow: QueryRow = JSON.parse(JSON.stringify(row));
        newRow.id = this.nextRowId(this.currentQuery);
        this.currentQuery.queryRows.splice(index, 0, newRow);

        this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
        // Update search box in the top search panel
        this.searchService.setQueryValue(this.searchValue, '', '');

        this.onDataChange();
    }

    /**
     * When user changes operator, update the query string in the main search box and set mode
     */
    onOperatorChange(){
        this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
        // Update search box in the top search panel
        this.searchService.setQueryValue(this.searchValue, '', '');
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
        // this.editQuery = false;
        // this.addQuery = true;
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
        }
    }

    /**
     * Init for creating new query
     */
    InitCurrentQuery() {
        this.previousQueryIndex = this.currentQueryIndex;
        this.currentQueryIndex = -1;
        this.dataChanged = false;

        this.currentQuery = new SDPQuery();
        this.saveCurrentQueryInfo();
    }

    /**
     * Save current query info to local storage
     */
    saveCurrentQueryInfo(){
        this.currentQueryInfo = new CurrentQueryInfo(this.currentQuery, this.currentQueryIndex, this.dataChanged);
        this.searchQueryService.saveCurrentQueryInfo(this.currentQueryInfo);
    }

    /**
     * Save query 
     * 1. Filter current query from the list
     * 2. Add the new query to the list
     */
    confirmSaveAdvSearchQuery(event, overlaypanel: OverlayPanel) {
        overlaypanel.toggle(event);

        setTimeout(()=>{ 
            this.queryName.nativeElement.focus();
        },0); 
    }

    saveAdvQuery(inputQuery: SDPQuery, overlaypanel: OverlayPanel){
        if(inputQuery.queryName){
            this.queries = this.queries.filter(query => query.queryName != inputQuery.queryName);
            this.queries.push(inputQuery);
            this.searchQueryService.saveQueries(this.queries);
            this.dataChanged = false;
            this.currentQueryIndex = -1;
            overlaypanel.hide();
        }
        else
            alert("Query name is required.");
    }

    /**
     * This is for the case when user right click on the search text box. An overlay panel with field value
     * will popup. This function returns overlay panel style based on the screen size.
     */
    overlayStyle(){
        if(this.mobWidth > 461){
            return {'position':'related','left':'50%','max-width':'800px'};
        }
        else{
            return {'position':'related','left':'50%','max-width':'400px'};
        }
    }

    /**
     * Confirm cancel query edit
     */
    clearConfirm() {
        if (this.dataChanged) {
            this.confirmDialogSvc.confirm(
                'You have unsaved data!',   //Title
                'Do you really want to cancel this edit?', //Message
                true,   //Show warning sign
                true,   //Show second button
                false,  // Hide third button
                'Yes',  // Button one caption
                'Cance'    // Button two caption
                )
                .then((returnValue) => {
                    if (returnValue.trim().toLowerCase() == 'yes')
                        this.clearAdvSearchQuery()
                    else
                        console.log("User canceled discard request");
                })
                .catch(() => {
                    console.log("User canceled discard request (indirectly)");
                });
        } else {
            this.clearAdvSearchQuery();
        }
    }

    /**
     * Cancel query edit.
     * Set previous query as current query.
     * Set edit/add flag to false.
     */
    clearAdvSearchQuery() {
        this.searchValue = '';
        this.dataChanged = false;
        this.queryNameValidateError = false;
        this.currentQueryIndex = -1;
        this.setCurrentQuery(new SDPQuery());
        this.saveCurrentQueryInfo();
    }

    /*
    * Execute query
    */
    executeQuery(query: SDPQuery, index: number) {
        //Save current query info first
        this.saveCurrentQueryInfo();

        let lQueryValue = this.searchQueryService.buildSearchString(query);
        this.searchService.setQueryValue(lQueryValue, '', '');
        this.searchService.search(lQueryValue);
    }
    
    /**
     * Set the current query, build the search string. 
     * @param index - the index number of the current query
     */
    setCurrentQuery(query: SDPQuery, event?: any, index: number = -1){
        if(this.dataChanged){
            this.nextQuery = query;
            this.nextQueryIndex = index;
            // this.op_confirm.toggle(event);
            this.op_confirm.show(event, this.overlayTarget.nativeElement);
        }else{
            this.setCurrentQueryNoAsk(query, index);
        }

    }

    setCurrentQueryNoAsk(query: SDPQuery, index: number = -1){
        this.currentQuery = JSON.parse(JSON.stringify(query));  
        this.currentQueryIndex = index;
        this.dataChanged = false;
        this.saveCurrentQueryInfo();

        this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
        // Update search box in the top search panel
        this.searchService.setQueryValue(this.searchValue, '', ''); 
    }

    /**
     * When field type dropdown changed, if not edit/add mode, set to edit mode.
     * @param event 
     */
    onDataChange() {
        this.dataChanged = true;
        this.currentQueryIndex = -1;
        this.saveCurrentQueryInfo();
    }

    onFieldTypeChange(row: QueryRow){
        let field = this.fields.filter(field => field.label == row.fieldType);
        if(field != null && field.length > 0)   
            row.fieldValue = field[0].value;

        if(!_.isEmpty(row.fieldText)){
            this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
            // Update search box in the top search panel
            this.searchService.setQueryValue(this.searchValue, '', '');
        }

        this.onDataChange();
    }

    setFreeText(sampleText: string){
        this.currentQuery.freeText = sampleText;
        this.onDataChange();

        this.searchValue = this.searchQueryService.buildSearchString(this.currentQuery);
        // Update search box in the top search panel
        this.searchService.setQueryValue(this.searchValue, '', '');
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

    showExamples(){
        this.searchQueryService.setShowExamples(true);
    }

    getFieldTextPlacehoder(queryRow: QueryRow){
        if(!_.isEmpty(queryRow.fieldValue)){
            return "Field value is required...";
        }else{
            return "Enter field value..."
        }
    }
}