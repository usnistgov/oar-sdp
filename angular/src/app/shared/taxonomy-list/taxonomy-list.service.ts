import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import * as rxjsop from 'rxjs/operators';
import { AppConfig, Config } from '../config-service/config.service';

/**
 * This class provides the TaxonomyList service with methods to read taxonomies and add names.
 */
@Injectable({
  providedIn: 'root'
})
export class TaxonomyListService {

  /**
   * Creates a new TaxonomyListService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient,
              private appConfig: AppConfig)
  { }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<any> {
      return this.appConfig.getConfig().pipe(
          rxjsop.mergeMap((conf) => {
              return this.http.get(conf.RMMAPI + 'taxonomy?level=1');
          }),
          rxjsop.catchError((err) => {
              console.error("Failed to download taxonomy: " + JSON.stringify(err));
              return throwError(err);
          })
      );
  }

  /**
    * Handle HTTP error
    */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

