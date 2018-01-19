import {Data} from './data';
import {Injectable} from '@angular/core';
import {CartEntity} from './cart.entity';
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
export class CartService {

  public cartEntities : CartEntity[];
  storageSub= new BehaviorSubject<number>(this.getCartlength());
  private _storage = localStorage;


  constructor(private http: Http) {
    this.initCart();
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  initCart () {

    // if we dont have  any cart history, create a empty cart
    if(!this._storage.getItem('cart')) {

      let emptyMap : { [key:string]:number; } = {};
      this.setCart(emptyMap);

    }
  }

  saveListOfCartEntities(listOfCartEntries : CartEntity[]) {
    // reduce all the entities to a map
    let cartMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
      map[cartEntry.data.id] = cartEntry;
      return map;
    }, {});

    // persist the map
    this.setCart(cartMap);
    //this.storageSub.next(44);
    //this.setCartLength (5);
    console.log("cart size" + this.getCart().length);

  }
  /**
   * Returns all the products in the cart form the local storage
   *
   **/
  getAllCartEntities()  {
    // get the cart
    let myCartMap = this.getCart();
    let cartEntities : CartEntity[] = [];

    // convert the map to an array
    for (let key in myCartMap) {
      let value = myCartMap[key];
      cartEntities.push(value);
    }
    // return the array
    return Promise.resolve(cartEntities);

  }

  clearTheCart() {
    this._storage.clear();
    //this.storageSub.next(true);
  }

  /**
   * Returns a specific cart entry from the cartEntry map
   **/
  getCartEntryByDataId(dataId) {

    let myCartMap = this.getCart();
    return Promise.resolve(myCartMap[dataId]);

  }

  private getCartlength():number {
    return 5;
  }

  setCartLength(value: number) {
    this.storageSub.next(value);
  }
  /**
   * Will persist the product to local storage
   *
   **/
  addDataToCart(data: Data) : void {
    // product id , quantity
    let cartMap = this.getCart();

    // if we dont have  any cart history, create a empty cart
    if (!this._storage.getItem('cart')) {
      let emptyMap: { [key: string]: number; } = {};
      this.setCart(emptyMap);
      let cartMap = this.getCart();
      // if not, set default value
      cartMap[data.id] = {
        'data': data,
      }
      // save the map
      this.setCart(cartMap);
    }

    cartMap = this.getCart();

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
    this.setCart(cartMap);
  }

  /**
   * Retrive the cart from local storage
   **/
  private getCart() {

    let cartAsString = this._storage.getItem('cart');
    return JSON.parse(cartAsString);

  }
  /**
   * Persists the cart to local storage
   **/
  private setCart(cartMap) : void{
    this._storage.setItem('cart',JSON.stringify(cartMap));
    //this.storageSub.next(true);
  }

}
