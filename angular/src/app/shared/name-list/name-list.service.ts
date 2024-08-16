import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable({
  providedIn: 'root'
})
export class NameListService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<any> {
    return this.http.get('assets/data.json');
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
    return throwError(() => errMsg);
  }
}
