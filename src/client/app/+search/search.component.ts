import { Component, OnInit,OnDestroy } from '@angular/core';
import { Config,SearchService,TaxonomyListService} from '../shared/index';
import { ActivatedRoute}     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import {SelectItem} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sdp-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    providers:[TaxonomyListService, SearchService],
    directives: [
     ]
})

export class SearchPanel implements OnInit {

    private _routeParamsSubscription: Subscription;
    errorMessage: string;
    searchResults: any[] = [];
    searchValue:string;
    taxonomies: SelectItem[];
    searchTaxonomyKey: string;
    cols: any[];
    columnOptions: SelectItem[];
    searching:boolean = false;
    keywords: string[];
    themes:string[] = [];
    authors:string[] = [];
    filteredResults:any[] = [];
    keyword:string;
    Keywords:string[] = [];
    selectedKeywords:string[] = [];
    selectedTheme:string;
    selectedAuthor:string;
    suggestedKeywords:string[] = [];
    suggestedThemes:string[] = [];
    suggestedAuthors:string[] = [];
    const ALL:string='All';
    filteredKeywords:string[] = [];
    filteredThemes:string[] = [];
    filteredAuthors:string[] = [];
    summaryPageOpen : boolean = false;
    summaryCandidate = null;

    /**
     * Creates an instance of the SearchPanel
     *
     */
    constructor(private route: ActivatedRoute, public taxonomyListService: TaxonomyListService, public searchService:SearchService) {
    }


    /**
     * Handle the nameListService observable
     */
    getTaxonomies() {
        this.taxonomyListService.get()
            .subscribe(
            taxonomies => this.taxonomies = this.toTaxonomiesItems(taxonomies),
            error =>  this.errorMessage = <any>error
        );
    }

    toTaxonomiesItems(taxonomies:any[]){
        let items :SelectItem[] = [];
        items.push({label:this.ALL, value:''});
        for (let taxonomy of taxonomies) {
            items.push({label:taxonomy.researchCategory, value:taxonomy.keyIdentifier});
        }
        return items;
    }

    collectThemes(searchResults:any[]){
        let themes :string[] = [];
        for (let resultItem of searchResults) {
            if(resultItem.theme && resultItem.theme != null && resultItem.theme.length > 0){
                for (let theme of resultItem.theme) {
                    if(themes.indexOf(theme) < 0){
                        themes.push(theme);
                    }
                }
            }
        }
        return themes;
    }


    collectAuthors(searchResults:any[]){
        let authors :string[] = [];
        for (let resultItem of searchResults) {
            if(resultItem.contactPoint && resultItem.contactPoint != null && resultItem.contactPoint.fn != null){
                if(authors.indexOf(resultItem.contactPoint.fn) < 0){
                    authors.push(resultItem.contactPoint.fn);
                }
            }
        }
        return authors;
    }


    collectKeywords(searchResults:any[]){
        let kwords :string[] = [];
        for (let resultItem of searchResults) {
            if(resultItem.keyword && resultItem.keyword != null && resultItem.keyword.length > 0){
                for (let keyword of resultItem.keyword) {
                    if(kwords.indexOf(keyword) < 0){
                        kwords.push(keyword);
                    }
                }
            }
        }
        return kwords;
     }


    onSuccess(searchResults:any[]){
        this.searchResults = searchResults;
        this.filteredResults = searchResults;
        this.keywords = this.collectKeywords(searchResults);
        this.themes = this.collectThemes(searchResults);
        this.authors = this.collectAuthors(searchResults);
        this.clearFilters();
        console.log('Themes size=' + this.themes.length);
    }


    onError(error:any[]){
        this.errorMessage = <any>error;
        this.searchResults = [];
        this.filteredResults = [];
        this.keywords = [];
        this.themes = [];
    }

    search(){
        this.searching = true;
        this.keyword = '';
        let that = this;
        return this.searchService.searchPhrase(this.searchValue)
            .subscribe(
            searchResults => that.onSuccess(searchResults),
            error => that.onError(error),
            () => this.searching = false
         );
    }


    filterKeywords(event:any){
        let keyword = event.query;
        this.suggestedKeywords = [];
        for(let i = 0; i < this.keywords.length; i++) {
            let keyw = this.keywords[i];
            if(keyw.toLowerCase().indexOf(keyword.toLowerCase()) == 0) {
                this.suggestedKeywords.push(keyw);
            }
        }
        this.suggestedKeywords = this.sortAlphabetically(this.suggestedKeywords);
//        this.suggestedKeywords.splice(0, 0, "All");
    }

    filterThemes(event:any){
        let theme = event.query;
        this.suggestedThemes = [];
        for(let i = 0; i < this.themes.length; i++) {
            let them = this.themes[i];
            if(them.toLowerCase().indexOf(theme.toLowerCase()) == 0) {
                this.suggestedThemes.push(them);
            }
        }
        this.suggestedThemes = this.sortAlphabetically(this.suggestedThemes);
        this.suggestedThemes.splice(0, 0, "All");

    }

    filterAuthors(event:any){
        let author = event.query;
        this.suggestedAuthors = [];
        for(let i = 0; i < this.authors.length; i++) {
            let autho = this.authors[i];
            if(autho.toLowerCase().indexOf(author) == 0) {
                this.suggestedAuthors.push(autho);
            }
        }
        this.suggestedAuthors = this.sortAlphabetically(this.suggestedAuthors);
        this.suggestedAuthors.splice(0, 0, "All");
    }


    sortAlphabetically(array:string[]){
        var sortedArray: string[] = array.sort((n1,n2) => {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });
        return sortedArray;
    }


    onThemeDropdownClick(event:any){
        var tmp = this.suggestedThemes; // wierd, have to do this, otherwise nothing display
        this.suggestedThemes = [];
        //mimic remote call
        setTimeout(() => {
            this.suggestedThemes = this.themes;
        }, 100);
    }

    onAuthorDropdownClick(event:any){
        var tmp = this.suggestedAuthors; // wierd, have to do this, otherwise nothing display
        this.suggestedAuthors = [];
        //mimic remote call
        setTimeout(() => {
            this.suggestedAuthors = this.authors;
        }, 100);
    }



    filterByTheme(searchResults:any[], selectedTheme:string){
        if(selectedTheme != null && selectedTheme !== this.ALL && selectedTheme !== "") {
            var filteredResults = [];
            if (searchResults && searchResults.length > 0 ) {
                for (let resultItem of searchResults)
                {
                    if (resultItem.theme && resultItem.theme != null && this.containsTheme(resultItem.theme, selectedTheme)) {
                        filteredResults.push(resultItem);
                    }
                }
             }
            return filteredResults;
        }else{
            return searchResults;
        }
     }

    filterByAuthor(searchResults:any[], selectedAuthor:string){
        console.log("called filterByAuthor: " + selectedAuthor);

        if(selectedAuthor != null  && selectedAuthor !== this.ALL  && selectedAuthor !== "") {
            var filteredResults = [];
            if (searchResults && searchResults.length > 0) {
                for (let resultItem of searchResults)
                {
                    if (resultItem.contactPoint && resultItem.contactPoint != null && resultItem.contactPoint.fn != null &&  selectedAuthor === resultItem.contactPoint.fn) {
                        filteredResults.push(resultItem);
                    }
                }
            }
            return filteredResults;
        }else{
            return searchResults;
        }
    }


    filterResults(event:any){
        this.filteredResults =this.filterByKeyword(this.searchResults, this.selectedKeywords);
        this.suggestedKeywords = this.collectKeywords(this.filteredResults);
        this.suggestedThemes = this.collectThemes(this.filteredResults);
        this.filteredResults =this.filterByTheme(this.filteredResults, this.selectedTheme);
        this.suggestedAuthors = this.collectAuthors(this.filteredResults);
        this.filteredResults = this.filterByAuthor(this.filteredResults, this.selectedAuthor);
    }



    /**
     *
     */
    clearFilters(){

        this.filteredResults = this.searchResults;
        this.suggestedThemes = [];
        this.suggestedKeywords =[];
        this.suggestedAuthors = [];
        this.selectedAuthor = null;
        this.selectedKeywords = [];
        this.selectedTheme =null;
    }

    /**
     *
     * @param resultKeywords
     * @param keywords
     * @returns {boolean}
     */
    containsAllKeywords(resultKeywords:string[], keywords:string[]){
        for (let keyw of keywords) {
            if(resultKeywords.indexOf(keyw) === -1)
                return false;
        }
        return true;
    }


    containsTheme(resultThemes:string[], theme:string){
        return resultThemes && resultThemes != null && resultThemes.indexOf(theme) >= 0;
    }


    filterByKeyword(searchResults, selectedKeywords){
        var filteredResults = [];
        if(selectedKeywords.length > 0 && selectedKeywords.indexOf(this.ALL) < 0) {
            if (searchResults != null && searchResults.length > 0) {
                for (let resultItem of searchResults)
                {
                    if (resultItem.keyword && resultItem.keyword != null && this.containsAllKeywords(resultItem.keyword, selectedKeywords)) {
                        filteredResults.push(resultItem);
                    }
                }
            }
            return filteredResults;
        }else {
           return searchResults;
        }
     }

    openSummaryPage(searchItem:any){
        console.log("Called: " + searchItem.title);
        this.summaryCandidate = searchItem;
        this.summaryPageOpen = true;
    }


    /**
     * Get the params OnInit
     */
    ngOnInit() {
        this.columnOptions = [];
        this.cols = [];
        this.cols.push({header:'Author', field:'contactPoint.fn'});
        this.cols.push({header:'Keyword', field:'keyword'});
        this.cols.push({header:'Description', field:'description'});
        this.cols.push({header:'Date Modified', field:'modified'});

        this.columnOptions = [];
        for(let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
        }

        this._routeParamsSubscription = this.route.queryParams.subscribe(params => {
            this.searchValue =params['q'];
            this.searchTaxonomyKey=params['key'];
            this.getTaxonomies();
            this.search();
        });
    }


    ngOnDestroy() {
           this._routeParamsSubscription.unsubscribe();
    }

}
