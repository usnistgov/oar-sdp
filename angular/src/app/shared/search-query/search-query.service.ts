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

/**
 * The cart service provides an way to store the cart in local store.
 **/
@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  public searchEntities : SearchEntity[];
  storageSub= new BehaviorSubject<number>(0);
  storageAdvSub= new BehaviorSubject<number>(0);
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
    this.initCart();
    this.getAllSearchEntities();
    this.setQueryLength(this.querySize);
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  watchAddFileCart(): Observable<any> {
    return this.addCartSpinnerSub.asObservable();
  }

  watchAddAllFilesCart(): Observable<any> {
    return this.addAllCartSpinnerSub.asObservable();
  }

  watchQuery(): Observable<any> {
    return this.displayQuerySub.asObservable();
  }

  watchAdvQuery(): Observable<any> {
    return this.displayAdvQuerySub.asObservable();
  }


  initCart () {

    // if we dont have  any cart history, create a empty cart
    if(!this._storage.getItem('query')) {

      let emptyMap : { [key:string]:number; } = {};
      this.setQuery(emptyMap);

    }
    if(!this._storage.getItem('advquery')) {

      let emptyMap : { [key:string]:number; } = {};
      this.setAdvQuery(emptyMap);

    }
  }

  saveListOfSearchEntities(listOfCartEntries : SearchEntity[]) {
    // reduce all the entities to a map
    let cartMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
      map[cartEntry.data.id] = cartEntry;
      return map;
    }, {});

    // persist the map
    this.setQuery(cartMap);
    let cart  = this.getAllSearchEntities();
    this.setQueryLength (this.querySize);
  }

  /**
   * Returns all the products in the cart form the local storage
   *
   **/
  getAllSearchEntities()  {
    // get the cart
    let myCartMap = this.getQuery();
    let searchEntities : SearchEntity[] = [];

    // convert the map to an array
    for (let key in myCartMap) {
      let value = myCartMap[key];
      searchEntities.push(value);
    }

    this.querySize = searchEntities.length;
    // return the array
    return Promise.resolve(searchEntities);

  }

  /**
   * Returns all the products in the cart form the local storage
   *
   **/
  removeDownloadStatus()  {
    // get the cart
    let myCartMap = this.getQuery();
    let searchEntities : SearchEntity[] = [];

    // convert the map to an array
    for (let key in myCartMap) {
      let value = myCartMap[key];
      if (value.data.downloadedStatus == null ) {
        searchEntities.push(value);
      }
    }
    let cartMap = searchEntities.reduce(function(map, cartEntry, i) {
      map[cartEntry.data.id] = cartEntry;
      return map;
    }, {});
    this.clearTheCart();
    // persist the map
    this.setQuery(cartMap);
    this.getQuery();
    this.cartSize = searchEntities.length;
    // return the array
    return Promise.resolve(searchEntities);

  }

  clearTheCart() {
    this._storage.clear();
    //this.storageSub.next(true);
  }

  /**
   * Returns a specific cart entry from the cartEntry map
   **/
  getCartEntryByDataId(dataId) {

    let myCartMap = this.getQuery();
    return Promise.resolve(myCartMap[dataId]);

  }

  setQueryLength(value: number) {
    this.storageSub.next(value);
    // console.log("query size inside method: " + this.storageSub.getValue());
  }

  setAdvQueryLength(value: number) {
    this.storageAdvSub.next(value);
    // console.log("cart size inside method: " + this.storageAdvSub.getValue());
  }

  /**
   * Will persist the product to local storage
   *
   **/
  saveSearchQuery(data: Data) : void {
    // product id , quantity
    let cartMap = this.getQuery();

    // if we dont have  any cart history, create a empty cart
    if (!this._storage.getItem('query')) {
      let emptyMap: { [key: string]: number; } = {};
      this.setQuery(emptyMap);
      let cartMap = this.getQuery();
      // if not, set default value
      cartMap[data.id] = {
        'data': data,
      }
      // save the map
      this.setQuery(cartMap);
    }

    cartMap = this.getQuery();

    // if the current key exists in the map , append value
    if (cartMap[data.id] != undefined) {
      cartMap[data.id] = {
        'data': data,
      }
    } else {
      // if not, set default value
      cartMap[data.id] = {
        'data': data,
      }
    }
    // save the map
    this.setQuery(cartMap);
    let query  = this.getAllSearchEntities();
    this.setQueryLength (this.querySize);
    //this.updateFileSpinnerStatus(false);
    this.getQuery();
  }

  updateFileSpinnerStatus(addFileSpinner:boolean)
  {
    this.addCartSpinnerSub.next(addFileSpinner);
  }

  updateAllFilesSpinnerStatus(addAllFilesSpinner:boolean)
  {
    this.addAllCartSpinnerSub.next(addAllFilesSpinner);
  }

  updateQueryDisplayStatus(displayQuery:boolean)
  {
    this.displayQuerySub.next(displayQuery);
  }
  /**
   * Retrive the cart from local storage
   **/
  private getQuery() {

    let queryAsString = this._storage.getItem('query');
    // console.log("query" + JSON.stringify(queryAsString));
    return JSON.parse(queryAsString);

  }

  /**
   * Retrive the cart from local storage
   **/
  private getAdvQuery() {

    let queryAsString = this._storage.getItem('advquery');
    // console.log("query" + JSON.stringify(queryAsString));
    return JSON.parse(queryAsString);

  }

  /**
   * Persists the cart to local storage
   **/
  private setQuery(cartMap) : void{
    this._storage.setItem('query',JSON.stringify(cartMap));
    //this.storageSub.next(true);
  }

  /**
   * Persists the cart to local storage
   **/
  private setAdvQuery(cartMap) : void{
    this._storage.setItem('advquery',JSON.stringify(cartMap));
    //this.storageSub.next(true);
  }
}
