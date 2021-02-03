    import { Component, OnInit, OnDestroy, ElementRef, NgZone, ViewChild } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';
    import 'rxjs/add/operator/map';
    import { Subscription } from 'rxjs/Subscription';
    import * as _ from 'lodash';

    /**
     * This class represents the lazy loaded HomeComponent.
     */
    @Component({
        selector: 'sdp-search',
        templateUrl: 'search.component.html',
        styleUrls: ['search.component.css']
    })

    export class SearchComponent implements OnInit, OnDestroy {
    filterWidth: string = '25%';
    resultWidth: string = '75%';

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
    width: string;
    filterWidthNum: number;

    private _routeParamsSubscription: Subscription;

    // injected as ViewChilds so that this class can send messages to it with a synchronous method call.
    @ViewChild('parentDiv') filter : ElementRef;

    /**
     * Creates an instance of the SearchComponent
     */
    constructor(
        public ngZone: NgZone,
        private router: ActivatedRoute) 
    {
        this.mobHeight = (window.innerHeight);
        this.mobWidth = (window.innerWidth);

        window.onresize = (e) => {
            this.ngZone.run(() => {
                this.mobWidth = window.innerWidth;
                this.mobHeight = window.innerHeight;
            });
        };
    }

    onResize(event) {
        this.filterWidthNum = event.target.innerWidth / 4;
    }

    /**
     * Get the params OnInit
     */
    ngOnInit() {
        this.filterWidthNum = this.filter.nativeElement.offsetWidth / 4;

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

    updateWidth(filterMode: string){
        if(filterMode == 'normal'){
            this.filterWidth = '25%';
            this.resultWidth = '75%';
        }else{
            this.filterWidth = '40px';
            this.resultWidth = 'calc(100% - 40px)';
        }
    }

    onPageChange(number: any) {
        this.page = number;
        let params = new URLSearchParams();
        params.append('page', number);
        let url = this.removeURLParameter(window.location.href, 'page');
        var paramStr = url.split("?")[1];

        window.history.pushState(null, null, "#/search?" + paramStr + "&page=" + number);
    }

    removeURLParameter(url, parameter) {
        //prefer to use l.search if you have a location/link object
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
            }
        }

        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
        } else {
        return url;
        }
    }

    onPopState(event) {
        setTimeout(function () {
        window.addEventListener('popstate', function () {
            window.history.go(-1);
        });
        }, 100);
    }

    ngOnDestroy() {
        if (this._routeParamsSubscription) {
            this._routeParamsSubscription.unsubscribe();
        }
    }
}