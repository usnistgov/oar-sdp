import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/observable/throw';
import { EMPTY } from 'rxjs'
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
    searchValue = searchValue.replace(/\,/g, ' ');
    searchValue = searchValue.replace(/\;/g, ' ');
    if (searchValue.includes('&')) {
      searchValue = searchValue.split("&").join(' and ');
    }

    if (searchValue.includes('||')) {
      searchValue = searchValue.split("||").join(' or ');
    }

    let parameters = searchValue.match(/(?:[^\s"]+|"[^"]*")+/g);
    //let opArray = ['AND','NOT','OR','and','not','or']
    //let filteredArray = _.difference(parameters, opArray);
    //parameters = filteredArray;
    let searchKeyValue = '';
    let searchKey = '';

    if (!_.isEmpty(parameters)) {
      for (var i = 0; i < parameters.length; i++) {
        if (parameters[i].includes("=")) {
          searchKey = parameters[i].split("=")[0];
          searchPhraseValue += parameters[i];
        } else if (parameters[i].toLowerCase() == "and") {
          searchPhraseValue += 'logicalOp=AND';
        } else if (parameters[i].toLowerCase() == "or") {
          searchPhraseValue += 'logicalOp=OR';
        } else {
          if (!_.isEmpty(searchKey)) {
            searchPhraseValue += searchKey + "=" + parameters[i];
          } else {
            searchPhraseValue += "searchphrase=" + parameters[i];
            searchKey = "searchphrase";
          }
        }
        searchPhraseValue += '&';
      }
    }

    if (_.isEmpty(searchPhraseValue)) {
      searchPhraseValue = '&';
    }

    return this.http.get(this.RMMAPIURL + 'records?' + searchPhraseValue + 'topic.tag=' + searchTaxonomyKey);
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
    * Handle HTTP error

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
   */
}

