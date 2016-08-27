import { Component, OnInit,OnDestroy } from '@angular/core';
import { Config,SearchService,TaxonomyListService} from '../shared/index';
import { ActivatedRoute}     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sdp-search-results',
    templateUrl: 'search-results.component.html',
    styleUrls: ['search-results.component.css'],
    providers:[TaxonomyListService, SearchService],
    directives: [
     ]
})

export class SearchResultsComponent implements OnInit {

    private _routeParamsSubscription: Subscription;
    searchValue: string;
    searchKey: string;
    errorMessage: string;
    taxonomies: any[] = [];
    searchResults: any[] = [];


    /**
     * Creates an instance of the SearchResultsComponent
     *
     */
    constructor(private route: ActivatedRoute, public taxonomyListService: TaxonomyListService, public searchService:SearchService) {


    }

    /**
     * Get the params OnInit
     */
    ngOnInit() {


        this._routeParamsSubscription = this.route.queryParams.subscribe(params => {

            this.searchValue =params['q'];
            this.searchKey=params['key'];

            console.log("value", this.searchValue);
            console.log("key", this.searchKey);

            this.getTaxonomies();


        });

//
//        // Capture the session ID if available
//        this.searchValue = this.route
//            .queryParams
//            .map(params => params['q'] || '');
////
////        // Capture the session ID if available
//        this.searchKey = this.route
//            .queryParams
//            .map(params => params['key'] || '');


//        this.route.params.subscribe(params => this.searchValue = params.q,this.searchKey = params.key );

//
//        this.searchValue = this.searchValue.get('q');
//        this.searchKey = this.routeParams.get('key');


//        this.route
//            .queryParams
//            .map(function (params) {
//                this.searchKey = params['key'];
//                this.searchValue = params['q'];
//
//            })
//


//        console.log("value", this.searchValue);
//        console.log("key", this.searchKey);
//
//        this.getTaxonomies();
//
////        grid.addEventListener('sort-order-changed', function() {
////            var idx = grid.sortOrder[0].column;
////            var lesser = grid.sortOrder[0].direction == 'asc' ? -1 : 1;
////            data.sort(function(a, b) {
////                return (a[idx] < b[idx]) ? lesser : -lesser;
////            });
////        });


    }


    /**
     * Handle the nameListService observable
     */
    getTaxonomies() {
        this.taxonomyListService.get()
            .subscribe(
            taxonomies => this.taxonomies = taxonomies,
            error =>  this.errorMessage = <any>error
        );
    }

    search(){
        return this.searchService.searchPhrase(this.searchValue)
            .subscribe(
            searchResults => this.searchResults = searchResults,
            error =>  this.errorMessage = <any>error
        );

    }


    ngOnDestroy() {
           this._routeParamsSubscription.unsubscribe();
    }

}
