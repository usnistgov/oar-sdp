import { Injectable } from '@angular/core';
// import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EMPTY } from 'rxjs'
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash-es';
import { AppConfig, Config } from '../config-service/config-service.service';
import { SearchService } from './search-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { SDPQuery } from '../search-query/query';

/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable({
    providedIn: 'root'
})

export class RealSearchService implements SearchService{
    confValues: Config;
    private RMMAPIURL: string;
    operators = {
        'AND': 'logicalOp=AND',
        'OR': 'logicalOp=OR',
        'NOT': 'logicalOp=NOT'
    }

    filterString = new BehaviorSubject<string>('');
    currentPage = new BehaviorSubject<number>(1);
    totalItems = new BehaviorSubject<number>(1);

    /**
     * Creates a new SearchService with the injected Http.
     * @param {HttpClient} http - The injected Http.
     * @constructor
     */
    constructor(private http: HttpClient,
        private router: Router,
        private appConfig: AppConfig) {
        this.confValues = this.appConfig.getConfig();
        this.RMMAPIURL = this.confValues.RMMAPI;
    }

    /**
     * Watch total items (search result)
     */
    watchTotalItems(): Observable<any>{
        return this.totalItems.asObservable();
    }

    /**
     * Set total items (search result)
     * @param page 
     */
    setTotalItems(totalItems: number) {
        this.totalItems.next(totalItems);
    }

    /**
     * Watch current page
     */
    watchCurrentPage(): Observable<any> {
        return this.currentPage.asObservable();
    }

    /**
     * Set curent page
     * @param page 
     */
    setCurrentPage(page: number) {
        this.currentPage.next(page);
    }

    /**
     * Watch the filter string
     */
    watchFilterString(): Observable<any>{
        return this.filterString.asObservable();
    }

    /**
     * Set the filter string
     * @param filterString 
     */
    setFilterString(filterString: string) {
        this.filterString.next(filterString);
    }

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
     */
    searchPhrase(query: SDPQuery, searchTaxonomyKey: string, queryAdvSearch?: string, page?: number, pageSize?: number, sortOrder?:string, filter?:string): Observable<any> {
        let searchPhraseValue = '';
        let finalKeyValueStr = '';

        if(query.freeText != null && query.freeText != undefined && query.freeText.trim()!= "")
            searchPhraseValue = 'searchphrase=' + query.freeText.trim();

        // Processing rows
        for (let i = 0; i < query.queryRows.length; i++) {
            if (typeof query.queryRows[i].operator === 'undefined') {
                query.queryRows[i].operator = 'AND';
            }

            //Skip operator for the first row
            if(i > 0){
                if(query.queryRows[i].operator.trim() == "AND")
                    finalKeyValueStr += '&';
                else
                    finalKeyValueStr += '&' + this.operators[query.queryRows[i].operator] + '&';
            }

            //If user didn't provide search value, ignore the row
            if(!this.isEmpty(query.queryRows[i].fieldText) && !this.isEmpty(query.queryRows[i].fieldValue)){
                if(finalKeyValueStr[finalKeyValueStr.length-1] != "&")
                    finalKeyValueStr = finalKeyValueStr.trim() + " ";

                finalKeyValueStr += query.queryRows[i].fieldValue + '=' + query.queryRows[i].fieldText.replace(/"/g, ''); 
            }
        }

        let keyString: string = '';
        if(searchTaxonomyKey){
            keyString = '&topic.tag=' + searchTaxonomyKey;
        }

        let url = this.RMMAPIURL + 'records?';

        if(searchPhraseValue)
            url += "&" + searchPhraseValue.trim();
       
        if(sortOrder){
            url += '&sort.asc=' + sortOrder;
        }

        if(finalKeyValueStr.trim() != ""){
            url += '&' + finalKeyValueStr.trim();
        }

        if(keyString)
            url += "&" + keyString.trim();
            
        if(filter && filter != "NoFilter"){
            url += "&" + filter.trim();
        }

        if(page){
            url += '&page=' + page;
            if(pageSize)
                url += '&size=' + pageSize;
            else //default
                url += '&size=10';
        }

        // only include the fields we need
        url += '&include=ediid,description,title,keyword,topic.tag,contactPoint,components,@type,doi,landingPage&exclude=_id';

        // console.log('url', url);
        return this.http.get(url);
    }

    /**
     * Check if a string object is empty
     * @param stringValue 
     */
    isEmpty(stringValue: string){
        return stringValue == null || stringValue == undefined || stringValue.trim() == '';
    }

    /**
     * Convert the text from search text box into url parameter. For example,
     * convert "Research Topic=water" to "topic.tag%3Dwater"
     * convert "Research Topic=water OR Research Topic=fire" to "topic.tag%3Dwater&logicalOp%3DOR=&topic.tag%3Dfire"
     * @param searchValue - search value typically from the search text box
     */
    convertSearchvalue(searchValue: string): string{
        let searchString = '';
        if(!searchValue) return searchString;

        searchString = searchValue.trim();
        // Strip spaces around "="
        searchString = searchString.replace(new RegExp(' =', 'g'), '=');
        searchString = searchString.replace(new RegExp('= ', 'g'), '=');

        // Reserve everything in quotes
        let quotes = searchString.match(/\"(.*?)\"/g);

        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i].match(/\"(.*?)\"/)[1].trim() != '')
                    searchString = searchString.replace(new RegExp(quotes[i].match(/\"(.*?)\"/)[1], 'g'), 'Quooooote'+i);
                else
                    searchString = searchString.replace(quotes[i], 'Quooooote'+i);
            }
        }

        searchString = searchString.replace(/ OR /g, '&logicalOp=OR&');
        searchString = searchString.replace(/ NOR /g, '&logicalOp=NOR&');
        searchString = searchString.replace(/ AND /g, '&logicalOp=AND&');
        searchString = searchString.replace(/ /g, '&');

        // Restore the contents in quotes
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i].match(/\"(.*?)\"/)[1].trim() != '')
                    searchString = searchString.replace(new RegExp('Quooooote'+i, 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
                else
                    searchString = searchString.replace('Quooooote'+i, quotes[i]);
            }
        }
        return searchString;
    }

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
     */
    searchPhraseTest(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string): Observable<any> {
        if ((queryAdvSearch === 'yes' && (!(_.includes(searchValue, 'searchphrase'))))) {
        return this.http.get(this.RMMAPIURL + 'records?' + searchValue);
        } else {
        let params = new HttpParams();
        params.set('searchphrase', searchValue);
        params.set('topic.tag', searchTaxonomyKey);

        return this.http.get(this.RMMAPIURL + 'records?',
            {
            params: params

            });
        }
    }

        /**
         * Behavior subject to remotely set the search value. 
         */
        private _remoteQueryValue : BehaviorSubject<object> = new BehaviorSubject<object>({queryString: '', searchTaxonomyKey: '', queryAdvSearch: 'yes'});
        public _watchQueryValue(subscriber){
            this._remoteQueryValue.subscribe(subscriber);
        }

        public setQueryValue(queryString: string = "", searchTaxonomyKey: string = '', queryAdvSearch: string = 'yes') {
            if(queryString == null) queryString = "";
            let lq = queryString.replace(/searchphrase=/g, '')
            this._remoteQueryValue.next({queryString: lq, searchTaxonomyKey: searchTaxonomyKey, queryAdvSearch: queryAdvSearch});
        }

        /**
         * Navigate to the search page with given search value
         * @param searchValue 
         * @param url 
         */
        public search(searchValue: string, url?: string) : void {
            let params: NavigationExtras = {
                queryParams: {
                    'q': searchValue
                }
            };

            if(url == '/search'){
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
            }

            this.router.navigate(['/search'], params);
        }
}

