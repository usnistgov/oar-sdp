import { Component, OnInit, OnDestroy, ElementRef, NgZone, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash-es';
import { SearchQueryService } from '../shared/search-query/search-query.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    selector: 'sdp-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    animations: [
        trigger('filterStatus', [
        state('collapsed', style({width: '39px'})),
        state('expanded', style({width: '*'})),
        transition('expanded <=> collapsed', animate('625ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
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
    filterWidthStr: string;
    filterMode: string = "normal";

    mouse: any = {x:0, y:0};
    mouseDragging: boolean = false;
    prevMouseX: number = 0;
    prevFilterWidth: number = 0;
    resultWidth: any;
    filterToggler: string = 'expanded';

    mobileMode: boolean = false; // set mobile mode to true if window width < 641

    queryStringErrorMessage: string;
    queryStringError: boolean = false;

    theme: string = "nist";
    // theme: string = "forensics";

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

    // resultWidth(){
    //     if(this.mobWidth == this.filterWidth){
    //         return this.filterWidth;
    //     }else{
    //         return this.mobWidth - this.filterWidth - 20;
    //     }
    // }

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
            this.theme = params['alternateView'];
            this.searchTaxonomyKey = params['key'];
            this.queryAdvSearch = params['queryAdvSearch'];
            this.page = params['page'];
            this.searchResType = params['resType'];
            this.searchResTopics = params['themes'];
            this.searchRecord = params['compType'];
            this.searchAuthors = params['authors'];
            this.searchKeywords = params['keywords'];

            if(!this.theme) this.theme = 'nist';
            if(!this.page) this.page = 1;
        });
    }

    updateWidth(filterMode?: string){
        this.filterMode = filterMode? filterMode : this.filterMode;

        if(this.filterMode == 'normal'){
            this.filterToggler = 'expanded';
        }else{
            this.filterToggler = 'collapsed';
        }

        if(!this.mobileMode){
            if(this.filterMode == 'normal'){
                this.filterWidth = this.mobWidth / 4;
                this.filterToggler = 'expanded';
            }else{
                this.filterWidth = 39;
                this.filterToggler = 'collapsed';
            }

            this.filterWidthStr = this.filterWidth + 'px';
        }else{
            this.filterWidth = this.mobWidth;
            this.filterWidthStr = "100%"
        }

        this.setResultWidth();
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

    // The following mouse functions handle drag action
    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent){
        this.mouse = {
            x: event.clientX,
            y: event.clientY
        }

        if(this.mouseDragging) {
            let diff = this.mouse.x - this.prevMouseX;
            this.filterWidth = this.prevFilterWidth + diff;
            this.filterWidth = this.filterWidth < 40? 39 : this.filterWidth > 500? 500 : this.filterWidth;
            this.filterWidthStr = this.filterWidth + 'px';
        }
        
        this.setResultWidth();
    }

    onMousedown(event) {
        this.prevMouseX = this.mouse.x;
        this.prevFilterWidth = this.filterWidth;
        this.mouseDragging = true;
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event) {
        this.mouseDragging = false;
    }

    /**
     * Set the width of the right side result list panel
     * @returns 
     */
    setResultWidth(){
    if(this.mobWidth <= this.filterWidth){
        this.resultWidth = "100%";
    }else{
        this.resultWidth = this.mobWidth - this.filterWidth - 25;
    }
}
}