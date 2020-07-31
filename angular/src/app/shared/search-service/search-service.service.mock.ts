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
// import * as mockSearchResult from '../../../assets/sample01.json';

@Injectable({
  providedIn: 'root'
})

export class MockSearchService implements SearchService{
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
    var mockSearchResult = require('../../../assets/sample01.json');
    return of(mockSearchResult);
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
    public startSearching(startSearch: boolean = true) {
        this._remoteStartSearch.next(startSearch);
    }
}

