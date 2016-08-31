import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
  searchPhrase(searchValue:string): Observable<string[]> {

      let params: URLSearchParams = new URLSearchParams();
      params.set('title', searchValue);



//    return this.http.get('http://oardev3.nist.gov:8080/RestApi/records/search?searchPhrase='+ searchValue)
//                    .map((res: Response) => res.json())
//                    .catch(this.handleError);

      return this.http.get("http://oardev3.nist.gov:8080/RMMApi/records/search",
          {
              search: params
          })
          .map((res: Response) => res.json())
          .catch(this.handleError);

  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

