import {Data} from './data';
import {Injectable} from '@angular/core';
import {SearchEntity} from './search.entity';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Subject} from 'rxjs/Subject';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable } from 'rxjs';
import * as _ from 'lodash';
import { SelectItem, TreeNode, TreeModule } from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';




/**
 * The cart service provides an way to store the cart in local store.
 **/
@Injectable()
export class SearchQueryService {

  public searchEntities : SearchEntity[];
  storageSub= new BehaviorSubject<number>(0);
  addCartSpinnerSub = new BehaviorSubject<boolean>(false);
  addAllCartSpinnerSub = new BehaviorSubject<boolean>(false);
  displayQuerySub = new BehaviorSubject<boolean>(false);
  cartSize: number ;
  showAddCartSpinner : boolean = false;
  showAddAllCartSpinner : boolean = false;
  displayCart : boolean = false;
  private _storage = localStorage;




  constructor(private http: Http) {
    this.initCart();
    this.getAllSearchEntities();
    //this.setCartLength (this.cartSize);
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


  initCart () {

    // if we dont have  any cart history, create a empty cart
    if(!this._storage.getItem('cart')) {

      let emptyMap : { [key:string]:number; } = {};
      this.setQuery(emptyMap);

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
    console.log("cart length" + this.cartSize);
    this.setQueryLength (this.cartSize);
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

    this.cartSize = searchEntities.length;
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
      console.log("status before" + JSON.stringify(value.data.downloadStatus));
      if (value.data.downloadedStatus == null ) {
        console.log("status after" + JSON.stringify(value.data.downloadStatus));
        console.log("value" + JSON.stringify(value.data.resId));
        searchEntities.push(value);
      }
    }
    console.log("cart" + JSON.stringify(searchEntities));
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
    console.log("cart size inside method" + this.storageSub.getValue());
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

      console.log("key exists");
      console.log("data id - " + data.id);
    } else {
      // if not, set default value
      cartMap[data.id] = {
        'data': data,
      }
    }
    // save the map
    this.setQuery(cartMap);
    let cart  = this.getAllSearchEntities();
    this.setQueryLength (this.cartSize);
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
    console.log("query" + JSON.stringify(queryAsString));
    return JSON.parse(queryAsString);

  }
  /**
   * Persists the cart to local storage
   **/
  private setQuery(cartMap) : void{
    this._storage.setItem('query',JSON.stringify(cartMap));
    //this.storageSub.next(true);
  }

}
