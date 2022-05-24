import { Component, OnInit, Inject, NgZone, Input, SimpleChanges, ElementRef } from '@angular/core';
import { SearchService, SEARCH_SERVICE } from '../../shared/search-service';
import * as _ from 'lodash-es';
import { SearchfieldsListService } from '../../shared/index';
import { SelectItem } from 'primeng/api';
import { SearchQueryService } from '../../shared/search-query/search-query.service';
import { GoogleAnalyticsService } from '../../shared/ga-service/google-analytics.service';
import { AppConfig, Config } from '../../shared/config-service/config-service.service';
import { Message } from 'primeng/api';
// import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
    mobHeight: number;
    ngZone: NgZone;

    totalItems: number;
    itemsPerPage: number = 10;
    searchResults: any[];
    selectedFields: string[] = ['Resource Description', 'Subject keywords'];
    allChecked: boolean = false;
    fieldsArray: any[];
    displayFields: string[] = [];
    filterableFields: SelectItem[];
    fields: SelectItem[] = [];
    errorMessage: string;
    sortItemKey: string;
    currentFilter: string = "NoFilter";
    currentSortOrder: string = "";
    confValues: Config;
    PDRAPIURL: string;
    resultStatus: string;
    RESULT_STATUS = {
        'success': 'SUCCESS',
        'noResult': 'NO RESULT',
        'userError': 'USER ERROR',
        'sysError': 'SYS ERROR'
    }
    exception: string;
    errorMsg: string;
    status: string;
    msgs: Message[] = [];
    queryStringErrorMessage: string;
    queryStringWarning: boolean;
    filterSubscription: Subscription = new Subscription();
    pageSubscription: Subscription = new Subscription();
    searchSubscription: Subscription = new Subscription();
    inited: boolean = false;
    dataReady: boolean = false;

    @Input() searchValue: string;
    @Input() searchTaxonomyKey: string;
    @Input() currentPage: number = 1;
    @Input() mobWidth: number = 1920;

    constructor(
        @Inject(SEARCH_SERVICE) private searchService: SearchService,
        public searchFieldsListService: SearchfieldsListService,
        public searchQueryService: SearchQueryService,
        public gaService: GoogleAnalyticsService,
        private appConfig: AppConfig,
        public myElement: ElementRef
    ) { 
        this.confValues = this.appConfig.getConfig();
        this.PDRAPIURL = this.confValues.PDRAPI;
    }

    ngOnInit() {
        this.currentPage = 1;
        
        if(this.searchValue){
            this.queryStringErrorMessage = this.searchQueryService.validateQueryString(this.searchValue);
            if(this.queryStringErrorMessage != "")
                this.queryStringWarning = true;
        }

        this.searchFieldsListService.get().subscribe(
            fields => {
                this.filterableFields = this.toSortItems(fields);

                //Convert to a query then search
                this.searchSubscription = this.search(null, 1, this.itemsPerPage);
            },
            error => {
                this.errorMessage = <any>error
            }
        );

        this.pageSubscription = (this.searchService.watchCurrentPage().subscribe(page => {
            if(!page) page=1;

            if(this.currentPage == page){
                return;
            }else{
                this.currentPage = page;
                this.getCurrentPage(page);
            }           
        }));

        this.filterSubscription = (this.searchService.watchFilterString().subscribe(filter => {
            if(!filter || this.currentFilter == filter) return;
 
            this.currentFilter = filter; 

            this.searchSubscription = this.search(null, null, this.itemsPerPage);
        }));

        this.inited = true;
    }

    /**
     * On destroy, unsubscribe all subscriptions
     */
    ngOnDestroy(): void {
        if(this.filterSubscription) this.filterSubscription.unsubscribe();
        if(this.pageSubscription) this.pageSubscription.unsubscribe();
        if(this.searchSubscription) this.searchSubscription.unsubscribe();
    }

    /**
     * When search value changed, reset current filter and refresh search result
     * @param changes 
     */
    ngOnChanges(changes: SimpleChanges) {
        if(this.inited && changes.searchValue != undefined && changes.searchValue != null){
            if (changes.searchValue.currentValue != changes.searchValue.previousValue) {
                //When conduct a new search, clean up filters and error message
                this.queryStringErrorMessage = this.searchQueryService.validateQueryString(this.searchValue);
                this.queryStringWarning = this.queryStringErrorMessage != "";

                this.currentFilter = "NoFilter";
                this.currentSortOrder = "";

                console.log("Search value", this.searchValue);
                this.searchSubscription = this.search(null, 1, this.itemsPerPage);
            }
        }
    }

    /**
     * Request the given page of the search result
     * @param currentPage - page requested. If missing, this.currentPage will be used.
     */
    getCurrentPage(currentPage?: number){
        if(!currentPage)
            currentPage = this.currentPage;
        else{
            let totalPages = Math.ceil(this.totalItems/this.itemsPerPage);

            if(currentPage > totalPages){
                currentPage = totalPages;
            }

            this.currentPage = currentPage;
        }

        this.searchSubscription = this.search(null, currentPage, this.itemsPerPage);

        // Scroll to the top of the page (in case user clicked on the pagination control at the bottom)
        window.scrollTo(0, 0);
    }

    /**
     * Generate the dropdown list for the sortBy option in Customize View
     */
    toSortItems(fields: any[]) {
        this.fieldsArray = fields;
        let items: SelectItem[] = [];
        let sortItems: SelectItem[] = [];
        this.displayFields = [];
        this.fields = [];
        let dupFound: boolean = false;

        for (let field of fields) {
            if (_.includes(field.tags, 'filterable')) {
                if (field.type !== 'object') {
                if (field.name !== 'component.topic.tag') {
                    dupFound = false;
                    for(let item of sortItems){
                        if(item.label==field.label && item.value==field.name){
                            dupFound = true;
                            break;
                        }
                    }
                    if(!dupFound)
                        sortItems.push({ label: field.label, value: field.name });
                }
                if (field.label !== 'Resource Title') {
                    if (field.name !== 'component.topic.tag') {
                        if(this.displayFields.indexOf(field.label) < 0)
                            this.displayFields.push(field.label);
                    }
                }
                }
            }

            if (_.includes(field.tags, 'searchable')) {
                let lValue = field.name.replace('component.', 'components.');

                dupFound = false;
                for(let item of this.fields){
                    if(item.label==field.label && item.value==lValue){
                        dupFound = true;
                        break;
                    }
                }
                if(!dupFound)
                    this.fields.push({ label: field.label, value: lValue });
            }
        }

        this.fields = _.sortBy(this.fields, ['label','value']);

        return sortItems;
    }

    /**
     * Call the Search service to return only given page of the results. 
     * This function uses this.searchValue and append the given filter and searchTaxonomyKey for search.
     * @param searchTaxonomyKey - Taxonomy key for search
     * @param page - which page to return
     * @param pageSize - number of result per page
     * @param sortOrder - sort order
     * @param filter - additional filter that applys to regular search
     */
    search(searchTaxonomyKey?: string, page?: number, pageSize?: number, sortOrder?:string, filter?:string) {
        // Always unsubscribe before conduct a new search
        if(this.searchSubscription) this.searchSubscription.unsubscribe();
        // Reset current page every time a new search starts
        this.currentPage = page? page : 1;

        this.searchService.setQueryValue(this.searchValue, '', '');
        let lSearchValue = this.searchValue? this.searchValue.replace(/  +/g, ' ') : "";

        let query = this.searchQueryService.buildQueryFromString(lSearchValue, null, this.fields);

        let that = this;
        this.currentFilter = filter? filter : this.currentFilter;
        this.currentSortOrder = sortOrder? sortOrder : this.currentSortOrder;

        return this.searchService.searchPhrase(query, searchTaxonomyKey, null, this.currentPage, pageSize, this.currentSortOrder, this.currentFilter)
        .subscribe(
            searchResults => {
                console.log("searchResults", searchResults);
                that.searchResults = searchResults.ResultData;
                that.totalItems = searchResults.ResultCount;
                that.resultStatus = this.RESULT_STATUS.success;
                that.searchService.setTotalItems(that.totalItems);
                that.dataReady = true;
            },
            error => that.onError(error)
        );
    }

    /**
     * If search is unsuccessful get the error message
     */
    onError(error: any[]) {
        this.searchResults = [];
        this.msgs = [];

        if((<any>error).status == 400){
            this.resultStatus = this.RESULT_STATUS.userError;
        }else{
            this.resultStatus = this.RESULT_STATUS.sysError;
        }

        this.exception = (<any>error).ex;
        this.errorMsg = (<any>error).message;
        this.status = (<any>error).httpStatus;
        this.msgs.push({ severity: 'error', summary: this.errorMsg + ':', detail: this.status + ' - ' + this.exception });
    }

    /**
     * Return class name based on given column number and window size
     * @param column 
     */
    flexgrow(column: number){
        let lclass: string = "full-width";

        if(this.mobWidth > 1024 ) lclass = "flex-grow" + column;
        else lclass = "full-width";

        return lclass;
    }

    /**
     * Return the class for the top bar (total result, pagination and Customize View button)
     */
    resultTopBarClass(){
        if(this.mobWidth > 1024 ) return "top-bar";
        else return "";
    }

    /**
     * Reset the checkbox status of the Customize View to default
     * Also reset sort order to default ("")
     */
    ResetSelectedFields() {
        this.selectedFields = ['Resource Description', 'Subject keywords'];
        this.allChecked = false;
        this.sortItemKey = null;
        this.currentSortOrder = "";

        this.searchSubscription = this.search(null, this.currentPage, this.itemsPerPage);
    }

    /**
     * Select all checkboxes
     */
    SelectAllFields() {
        this.selectedFields = [];
        if (this.allChecked) {
            for (let field of this.fieldsArray) {
                if (_.includes(field.tags, 'filterable')) {
                    if (field.type !== 'object') {
                        if (field.label !== 'Resource Title') {
                            if (field.name !== 'component.topic.tag') {
                                this.selectedFields.push(field.label);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Refresh (reload) the search result based on current sort order (when user set the sort order)
     */
    SortByFields() {
        this.currentSortOrder = this.sortItemKey;
        this.getCurrentPage();
    }

    /**
     * Update the checkbox's status when user checks or unchecks a box
     */
    updateFields(){
        this.allChecked = true;

        for (let field of this.fieldsArray) {
            if (_.includes(field.tags, 'filterable')) {
                if (field.type !== 'object') {
                    if (field.label !== 'Resource Title') {
                        if (field.name !== 'component.topic.tag') {
                            if(this.selectedFields.indexOf(field.label) < 0){
                                this.allChecked = false;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Return the position of the Customize View button based on the window size
     * If window width > 1025, float to right (in the same line as pagination)
     * If window width <= 1025, display nutton in a new line and centered.
     */
    customizeViewPosition(): string{
        if(this.mobWidth > 1025){
            return 'right';
        }else{
            return '';
        }
    }

    /**
     * Display the examples of adv search
     */
    showExamples(){
        this.searchQueryService.setShowExamples(true);
    }
}
