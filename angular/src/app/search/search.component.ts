import { Component, OnInit, OnDestroy, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { SearchQueryService } from '../shared/search-query/search-query.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    selector: 'sdp-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy {

    page: number = 1;
    queryAdvSearch: string;
    searchValue: string;
    searchTaxonomyKey: string;
    searchResType: string;
    searchResTopics: string;
    searchRecord: string;
    searchAuthors: string;
    searchKeywords: string;

    mobHeight: number;
    mobWidth: number;
    filterWidth: number;
    filterMode: string = "normal";

    mobileMode: boolean = false; // set mobile mode to true if window width < 641

    queryStringErrorMessage: string;
    queryStringError: boolean = false;

    private _routeParamsSubscription: Subscription;

    // injected as ViewChilds so that this class can send messages to it with a synchronous method call.
    @ViewChild('parentDiv') filter : ElementRef;

    /**
     * Creates an instance of the SearchComponent
     */
    constructor(
        public ngZone: NgZone,
        private router: ActivatedRoute,
        public searchQueryService: SearchQueryService) 
    {
        this.mobHeight = (window.innerHeight);
        this.mobWidth = (window.innerWidth);
    }

    onResize(event) {
        this.mobWidth = window.innerWidth;
        this.mobileMode = this.mobWidth < 641;

        this.updateWidth();
    }

    resultWidth(){
        if(this.mobWidth == this.filterWidth){
            return this.filterWidth;
        }else{
            return this.mobWidth - this.filterWidth - 20;
        }
    }

    getDisplayStyle(){
        if(this.mobWidth == this.filterWidth){
            return "normal";
        }else{
            return "flex";
        }
    }

    /**
     * Get the params OnInit
     */
    ngOnInit() {
        this.mobileMode = this.mobWidth < 641;
        this.updateWidth();

        // this.getTaxonomySuggestions();
        this._routeParamsSubscription = this.router.queryParams.subscribe(params => {
            this.searchValue = params['q'];
            this.searchTaxonomyKey = params['key'];
            this.queryAdvSearch = params['queryAdvSearch'];
            this.page = params['page'];
            this.searchResType = params['resType'];
            this.searchResTopics = params['themes'];
            this.searchRecord = params['compType'];
            this.searchAuthors = params['authors'];
            this.searchKeywords = params['keywords'];

            if(!this.page) this.page = 1;
        });
    }

    updateWidth(filterMode?: string){
        this.filterMode = filterMode? filterMode : this.filterMode;

        if(this.mobWidth > 641){
            if(this.filterMode == 'normal'){
                this.filterWidth = this.mobWidth / 4;
            }else{
                this.filterWidth = 40;
            }
        }else{
            this.filterWidth = this.mobWidth;
        }
    }

    ngOnDestroy() {
        if (this._routeParamsSubscription) {
            this._routeParamsSubscription.unsubscribe();
        }
    }
    @ViewChild('results')
    divResult: ElementRef;

    getHeight(){
        return this.divResult.nativeElement.offsetHeight;
    }
}