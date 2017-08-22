import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
// import { Config } from '../';
import { environment } from '../../environment';

/**
 * This class provides the Search service with methods to search for records from tha rmm.
 */
@Injectable()
export class SearchService {
  //private RestAPIURL: string = Config.API;
  private rmmApi : string = environment.RMMAPI;
  private metaApi : string = environment.METAPI;
  private landingBackend : string = environment.LANDING;
  private serviceApi : string;
  /**
   * Creates a new SearchService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {   
  }
   /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchByIdOld(searchValue:string): Observable<string[]> {
    
    searchValue = '@id=' + searchValue;  
    return this.http.get(this.rmmApi+'records?' + searchValue)
    .map((res: Response) => res.json().ResultData)
    .catch((error: any) => Observable.throw(error.json()));
  }

  searchById(searchValue:string): Observable<string[]> {
  
    // if(this.landingAccess != "internal")
    //   this.serviceApi = this.rmmApi+"records/";
    // else 
    //   this.serviceApi = this.metaApi;
    
    if(_.includes(this.landingBackend, "rmm"))
      this.landingBackend = this.landingBackend+"records/"; //+"records?exclude=_id&ediid=";
    
    return this.http.get(this.landingBackend+ searchValue)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

/**
 * Returns the results from RMMAPI for any acceptable request params
 * @param searchValue request params
 */
 searchRMMAny(searchValue:string): Observable<string[]> {
   
    return this.http.get(this.rmmApi+'records?' + searchValue)
    .map((res: Response) => res.json().ResultData)
    .catch((error: any) => Observable.throw(error.json()));    
  }
}

