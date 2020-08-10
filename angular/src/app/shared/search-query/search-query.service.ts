import {Data} from './data';
import {Injectable} from '@angular/core';
import {SearchEntity} from './search.entity';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs/Subject';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable } from 'rxjs';
import * as _ from 'lodash';
import { SelectItem, TreeNode, TreeModule } from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';
import { Query, QueryRow } from './query';

/**
 * The cart service provides an way to store the cart in local store.
 **/
@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  public searchEntities : SearchEntity[];
  storageSub= new BehaviorSubject<boolean>(false);
//   storageAdvSub= new BehaviorSubject<number>(0);
  addCartSpinnerSub = new BehaviorSubject<boolean>(false);
  addAllCartSpinnerSub = new BehaviorSubject<boolean>(false);
  displayQuerySub = new BehaviorSubject<boolean>(false);
  displayAdvQuerySub = new BehaviorSubject<boolean>(false);
  cartSize: number ;
  querySize: number ;
  advQuerySize: number ;
  showAddCartSpinner : boolean = false;
  showAddAllCartSpinner : boolean = false;
  displayCart : boolean = false;
  private _storage = localStorage;

  constructor(private http: HttpClient) {
  }

  public watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  /**
   * Advanced Search builder string
   */
  buildSearchString(query: Query) {
    let lSearchValue: string = '';
    for (let i = 0; i < query.queryRows.length; i++) {
      if (typeof query.queryRows[i].operator === 'undefined') {
        query.queryRows[i].operator = 'AND';
      }
      if (typeof query.queryRows[i].fieldType === 'undefined' || query.queryRows[i].fieldType === 'All') {
        query.queryRows[i].fieldType = 'searchphrase';
      }
      if (typeof query.queryRows[i].fieldText === 'undefined') {
        query.queryRows[i].fieldText = '';
      }

      let fieldValue: string;
      fieldValue = query.queryRows[i].fieldValue;
      if (i > 0) {
        lSearchValue += ' ' + query.queryRows[i].operator + ' ' + fieldValue + '=' + query.queryRows[i].fieldText;
      } else {
        if (!_.isEmpty(fieldValue) || !_.isEmpty(query.queryRows[i].fieldText)) {
            lSearchValue += fieldValue + '=' + query.queryRows[i].fieldText;
        }
      }
    }

    return lSearchValue;
  }

  saveQueries(qureies: Query[]){
    this._storage.setItem('queries',JSON.stringify(qureies));
    this.storageSub.next(true);
  }

  getQueries(): Query[]{
    let queriesAsObject = JSON.parse(this._storage.getItem('queries'));
    return queriesAsObject == null? [] : queriesAsObject;
  }
}
