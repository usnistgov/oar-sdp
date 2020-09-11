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
// import { Config } from '../config/env.config';
import { AppConfig, Config } from '../config-service/config-service.service';
import { SearchService } from './search-service.service';

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

    //Treat ',', ';' the same as space
    // searchValue = searchValue.replace(/\,/g, ' ');
    // searchValue = searchValue.replace(/\;/g, ' ');

    // Replace '%26' with '&'
    searchValue = searchValue.replace(/\%26/g, '&');

    // let parameters = searchValue.match(/(?:[^\s"]+|"[^"]*")+/g);
    let parameters = searchValue.split("&");
    let searchKey = '';
    if (!_.isEmpty(parameters)) {
      for (var i = 0; i < parameters.length; i++) {
        if(i > 0) searchPhraseValue += '&';

        if (parameters[i].includes("=")) {
          searchKey = parameters[i].split("=")[0];

        let value01 = parameters[i].split("=")[1];

          searchPhraseValue += searchKey + "=" + value01;
        } else if (parameters[i].toLowerCase() == "logicalOp=and") {
          searchPhraseValue += 'logicalOp=AND';
        } else if (parameters[i].toLowerCase() == "logicalOp=or") {
          searchPhraseValue += 'logicalOp=OR';
        } else if (parameters[i].toLowerCase() == "logicalOp=not") {
            searchPhraseValue += 'logicalOp=NOT';
        } else {
            searchPhraseValue += "searchphrase=" + parameters[i];
            searchKey = "searchphrase";
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
    // console.log("url", url);

    return this.http.get(url);
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
        this._remoteQueryValue.next({queryString: queryString, searchTaxonomyKey: searchTaxonomyKey, queryAdvSearch: queryAdvSearch});
    }

    /**
     * Behavior subject to remotely start the search function. 
     */
    private _remoteStartSearch : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public _watchRemoteStart(subscriber) {
        this._remoteStartSearch.subscribe(subscriber);
    }

    /**
     * Remote start search
     */
    public startSearching(startSearch: boolean = false) : void {
        this._remoteStartSearch.next(startSearch);
    }
}

