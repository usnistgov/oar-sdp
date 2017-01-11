import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable()
export class SearchService {

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
  searchPhrase(searchValue:string, searchTaxonomyKey:string, queryAdvSearch:string, summaryPageOpen:boolean): Observable<string[]> {
    if ((queryAdvSearch === 'yes' && (!(_.includes(searchValue, 'searchphrase')))) || (summaryPageOpen)) {
      console.log("params" + searchValue);
      if (summaryPageOpen) {
        searchValue = "resId=" + searchValue;
      }
      return this.http.get('http://10.200.222.250:8082/RMMApi/records/advancedsearch?' + searchValue)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json()));
    } else {

      let params: URLSearchParams = new URLSearchParams();
      params.set('searchphrase', searchValue);
      if (searchTaxonomyKey === '') {
        searchTaxonomyKey = 'all';
      }
      params.set('theme', searchTaxonomyKey);

      if (searchValue == "" && searchTaxonomyKey == "") {
        return this.http.get('http://10.200.222.250:8082/RMMApi/catalog/records')
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json()));
      } else {
        console.log("inside if condition");
        return this.http.get('http://10.200.222.250:8082/RMMApi/records/advancedsearch',
        {
            search: params

      })
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json()));
      }
    }
  }

//    return this.http.get('http://oardev3.nist.gov:8080/RestApi/records/search?searchPhrase='+ searchValue)
//                    .map((res: Response) => res.json())
//                    .catch(this.handleError);



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

