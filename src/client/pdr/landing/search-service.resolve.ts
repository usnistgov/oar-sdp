import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SearchService } from '../shared/search-service/index';

@Injectable()
export class SearchResolve implements Resolve<any> {
  
  constructor(private searchService: SearchService) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.searchService.searchById(route.params['id']);
  }
}