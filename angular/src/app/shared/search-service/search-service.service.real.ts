import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/observable/throw';
import { EMPTY } from 'rxjs'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { AppConfig, Config } from '../config-service/config-service.service';
import { SearchService } from './search-service.service';
import { Router, NavigationExtras } from '@angular/router';

/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable({
  providedIn: 'root'
})

export class RealSearchService implements SearchService{
  confValues: Config;
  private RMMAPIURL: string;

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
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(searchValue: string, searchTaxonomyKey: string, queryAdvSearch: string): Observable<any> {
    let searchPhraseValue = '';
    let finalKeyValueStr = '';
    if(searchValue == undefined){
      return EMPTY;
    }

    let lSearchValue = this.convertSearchvalue(searchValue);
    // Replace '%26' with '&'
    lSearchValue = lSearchValue.replace(/\%26/g, '&');

    // let parameters = searchValue.match(/(?:[^\s"]+|"[^"]*")+/g);
    let parameters = lSearchValue.split("&");
    if (!_.isEmpty(parameters)) {
      for (var i = 0; i < parameters.length; i++) {
        if(i > 0) searchPhraseValue += '&';

        if (parameters[i].includes("=")) {
            searchPhraseValue += parameters[i].split("=")[0] + "=" + parameters[i].split("=")[1];
        } else if (parameters[i].toLowerCase() == "logicalOp=and") {
            searchPhraseValue += 'logicalOp=AND';
        } else if (parameters[i].toLowerCase() == "logicalOp=or") {
            searchPhraseValue += 'logicalOp=OR';
        } else if (parameters[i].toLowerCase() == "logicalOp=not") {
            searchPhraseValue += 'logicalOp=NOT';
        } else {
            searchPhraseValue += "searchphrase=" + parameters[i];
        }
      }
    }

    //If only thing in quotes is space, removes it
    let quotes = searchPhraseValue.match(/\"(.*?)\"/g);

    if(quotes){
        for(let i = 0; i < quotes.length; i++){
            if(quotes[i].match(/\"(.*?)\"/)[1].trim() == '')
                searchPhraseValue = searchPhraseValue.replace(quotes[i], '');
        }
    }

    let keyString: string = '';
    if(searchTaxonomyKey){
        keyString = '&topic.tag=' + searchTaxonomyKey;
    }

    let url = this.RMMAPIURL + 'records?' + searchPhraseValue + keyString;
    console.log("url", url);

    return this.http.get(url);
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
        searchString = searchString.replace(new RegExp('= ', 'g'), '=&');

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
     * Start search
     */
    public search(searchValue: string) : void {
        let params: NavigationExtras = {
            queryParams: {
                'q': searchValue
            }
        };
        this.router.navigate(['/search'], params);
    }
}

