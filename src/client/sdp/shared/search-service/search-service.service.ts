import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { Config } from '../config/env.config';
import { environment } from '../../environment';


/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable()
export class SearchService {
  private RMMAPIURL: string = environment.RMMAPI;


  /**
   * Creates a new SearchService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhrase(searchValue:string, searchTaxonomyKey:string, queryAdvSearch:string): Observable<string[]> {
    let searchPhraseValue = '';
    let finalKeyValueStr = '';
    if (searchValue.includes('&')) {
      searchValue = searchValue.split("&").join(' ');
    }

    if (!_.isEmpty(searchValue)) {
      let parameters = searchValue.match(/(?:[^\s"]+|"[^"]*")+/g);
      //let opArray = ['AND','NOT','OR','and','not','or']
      //let filteredArray = _.difference(parameters, opArray);
      //parameters = filteredArray;
      let searchKeyValue = '';

      if (!_.isEmpty(parameters)) {
        for (var i = 0; i < parameters.length; i++) {
          if (parameters[i].includes("=") || parameters[i].includes("OR") || parameters[i].includes("AND")) {
            if (parameters[i].includes("searchphrase")) {
              searchPhraseValue += parameters[i] + '&';
            } else {
              searchKeyValue += parameters[i] + '&';
            }
          } else {
            searchPhraseValue += parameters[i] + '&';
          }
        }
      }


      if (_.isEmpty(searchPhraseValue)) {
        searchPhraseValue = '&';
      }
      searchKeyValue = searchKeyValue.replace(/"/g, '');
      let searchKeyValueStr = searchKeyValue.split("&");
      for (var i = 0; i < searchKeyValueStr.length; i++) {
        let value = searchKeyValueStr[i];
        if (value == 'OR' || value == 'or') {
          value = value.replace(/OR/g, 'logicalOp=OR');
        } else if (value == 'AND' || value == 'and') {
          value = value.replace(/and/g, 'logicalOp=AND');
        }
        finalKeyValueStr += value + '&';
      }


      /*

      let searchKeyValueParam = newSearchKeyValue.split("&");
      for (var i = 0; i < searchKeyValueParam.length; i++) {
        let value = searchKeyValueParam[i];
        if (i % 2 == 1 && i != searchKeyValueParam.length - 2) {
          if (_.includes(['AND', 'OR', 'and', 'or'], value)) {
            finalKeyValueStr += value + '&';
          } else {
            finalKeyValueStr += '&OR&' + value + '&';
          }
        } else {
          finalKeyValueStr += value + '&';
        }
      }
      */


      if (!searchPhraseValue.includes('searchphrase')) {
        searchPhraseValue = 'searchphrase=' + searchPhraseValue;
      }

      console.log('url' + this.RMMAPIURL + 'records?' + searchPhraseValue + finalKeyValueStr + 'topic.tag=' + searchTaxonomyKey);
      return this.http.get(this.RMMAPIURL + 'records?' + searchPhraseValue + finalKeyValueStr + 'topic.tag=' + searchTaxonomyKey)
        .map((res: Response) => res.json().ResultData)
        .catch((error: any) => Observable.throw(error.json()));
    }
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchPhraseTest(searchValue:string, searchTaxonomyKey:string, queryAdvSearch:string): Observable<string[]> {
    if ((queryAdvSearch === 'yes' && (!(_.includes(searchValue, 'searchphrase'))))) {
      return this.http.get(this.RMMAPIURL + 'records?' + searchValue)
        .map((res: Response) => res.json().ResultData)
        .catch((error: any) => Observable.throw(error.json()));
    } else {
      let params: URLSearchParams = new URLSearchParams();
      params.set('searchphrase', searchValue);
      params.set('topic.tag', searchTaxonomyKey);

      return this.http.get(this.RMMAPIURL + 'records?',
        {
          search: params

        })
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json()));
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

