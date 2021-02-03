import { Component, OnInit, Inject, NgZone, Input, SimpleChanges } from '@angular/core';
import { SearchService, SEARCH_SERVICE } from '../../shared/search-service';
import * as _ from 'lodash';
import { TaxonomyListService, SearchfieldsListService } from '../../shared/index';
import { SelectItem } from 'primeng/primeng';
import { SDPQuery } from '../../shared/search-query/query';
import { SearchQueryService } from '../../shared/search-query/search-query.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
    mobHeight: number;
    mobWidth: number;
    ngZone: NgZone;

    totalCount: number = 0;
    itemsPerPage: number = 10;
    searchResults: any[];
    filteredResult: any[];
    selectedFields: string[] = ['Resource Description', 'Subject keywords'];
    allChecked: boolean = false;
    fieldsArray: any[];
    displayFields: string[] = [];
    filterableFields: SelectItem[];
    fields: SelectItem[] = [];
    errorMessage: string;
    sortItemKey: string;
    currentFilter: string = "";
    currentSortOrder: string = "";

    @Input() searchValue: string;
    @Input() searchTaxonomyKey: string;
    @Input() currentPage: number = 1;

    constructor(
        @Inject(SEARCH_SERVICE) private searchService: SearchService,
        public searchFieldsListService: SearchfieldsListService,
        public searchQueryService: SearchQueryService
    ) { 
        this.mobHeight = (window.innerHeight);
        this.mobWidth = (window.innerWidth);

        this.searchService.watchFilterString((filter) => {
            if(!filter) filter="";

            let lSearchValue = "";

            if(this.searchValue)
                lSearchValue = this.searchValue.replace(/  +/g, ' ');
            
            this.search(this.searchQueryService.buildQueryFromString(lSearchValue, null, this.fields), null, 1, this.itemsPerPage, null,filter);
        });
    }

    ngOnInit() {
        this.searchFieldsListService.get().subscribe(
            fields => {
                this.filterableFields = this.toSortItems(fields);
                this.searchService.setQueryValue(this.searchValue, '', '');

                let lSearchValue = this.searchValue.replace(/  +/g, ' ');

                //Convert to a query then search
                this.search(this.searchQueryService.buildQueryFromString(lSearchValue, null, this.fields), null, 1, this.itemsPerPage);
            },
            error => {
                this.errorMessage = <any>error
            }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchValue && changes.searchValue.currentValue!=undefined) {
            this.searchService.setQueryValue(this.searchValue, '', '');
            let lSearchValue = this.searchValue.replace(/  +/g, ' ');
            this.search(this.searchQueryService.buildQueryFromString(lSearchValue, null, this.fields), null, 1, this.itemsPerPage);
        }
    }

    getCurrentPage(currentPage?: number){
        if(!currentPage)
            currentPage = this.currentPage;
        else{
            let totalPages = Math.ceil(this.totalCount/this.itemsPerPage);

            if(currentPage > totalPages){
                currentPage = totalPages;
            }

            this.currentPage = currentPage;
        }


        this.searchService.setQueryValue(this.searchValue, '', '');
        let lSearchValue = this.searchValue.replace(/  +/g, ' ');
        this.search(this.searchQueryService.buildQueryFromString(lSearchValue, null, this.fields), null, currentPage, this.itemsPerPage);
    }

    /**
     * Advanced Search fields dropdown
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
     * call the Search service with parameters
     */
    search(query: SDPQuery, searchTaxonomyKey?: string, page?: number, pageSize?: number, sortOrder?:string, filter?:string) {
        let that = this;
        let lFilter = filter;
        let lSortOrder = sortOrder;

        if(filter == "NoFilter"){
            lFilter = "";
            this.currentFilter = "";
        }else{
            if(!filter)
                lFilter = this.currentFilter;
            else    
                this.currentFilter = filter;
        }

        if(!sortOrder) lSortOrder = this.currentSortOrder;

        return this.searchService.searchPhrase(query, searchTaxonomyKey, null, page, pageSize, lSortOrder, lFilter)
        .subscribe(
            searchResults => {
                that.searchResults = searchResults.ResultData;
                // this.filterResult();
                this.totalCount = searchResults.ResultCount;
            }
        );
    }

    filterResult(){
        let filterArray = this.currentFilter.split("&");
        let topicArray: string[];
        let topics: string;
        let topicFilter: boolean = false;

        for(let i = 0; i < filterArray.length; i++){
            if(filterArray[i].indexOf("topic.tag") > 0){
                topicArray = filterArray[i].split("=")[1].split(",");
                topicFilter = true;
                break;
            }
        }

        if(topicFilter){
            for (let resultItem of this.searchResults) {
                let tempTopicArray: string[] = [];

                if (typeof resultItem.topic !== 'undefined' && resultItem.topic.length > 0) {
                    for (let topic of resultItem.topic) {
                        topics = _.split(topic.tag, ':')[0];

                        if(tempTopicArray.indexOf(topics) < 0){
                            this.filteredResult.push(resultItem);
                        }
                    }
                }
            }
        }else{
            this.filteredResult = this.searchResults;
        }

        // this.totalCount = this.filteredResult.ResultCount;
    }

    flexgrow(column: number){
        let lclass: string;
        if(this.mobWidth > 1024 ) lclass = "flex-grow" + column;
        else lclass = "full-width";

        return lclass;
    }

    resultTopBarClass(){
        if(this.mobWidth > 1024 ) return "flex-container";
        else return "";
    }

    /**
     * Reset the checkbox status to default
     */
    ResetSelectedFields() {
        this.selectedFields = ['Resource Description', 'Subject keywords'];
        this.allChecked = false;
    }

    /**
     * Check all checkboxes
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

    SortByFields() {
        console.log("this.sortItemKey", this.sortItemKey);
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

}
