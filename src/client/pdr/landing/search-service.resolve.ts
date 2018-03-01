
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SearchService } from '../shared/search-service/index';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class SearchResolve implements Resolve<any> {
  
  constructor(private searchService: SearchService, private rtr: Router ) {}
  
  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
    let searchId = route.params['id'];
    if (_.includes(rstate.url,'ark')) 
       searchId = rstate.url.split('/id/').pop();
    //console.log("root url :"+ searchId);
    return this.searchService.searchById(searchId);
  }
}


  
