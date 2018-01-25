import {Component, OnInit, AfterViewInit, ElementRef, Input} from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem, TabViewModule } from 'primeng/primeng';
import { environment } from '../../environment';
import { CartService } from '../../datacart/cart.service';
import { CartEntity } from '../../datacart/cart.entity';
import { DatacartComponent } from '../../datacart/datacart.component';
import {Observable } from 'rxjs';



/**
 * This class represents the headbar component.
 */

declare var Ultima: any;


@Component({
  moduleId: module.id,
  selector: 'pdr-headbar',
  templateUrl: 'headbar.component.html',
  styleUrls: ['headbar.component.css'],
})

export class HeadbarComponent implements OnInit {

  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  darkMenu: boolean = false;
  profileMode: string = 'inline';
  SDPAPI : string = environment.SDPAPI;
  landingService : string = environment.LANDING;
  internalBadge: boolean = false;
  cartEntities: CartEntity[];
  //cartLength: number;
  errorMessage: string = 'test';
  cartLength : number;


  constructor( private el: ElementRef, private cartService: CartService) {

    //this.cartLength = this.cartService.watchStorage();
    //this.getDataCartList();
    //this.cartService.setCartLength(this.cartLength);
    this.cartService.watchStorage().subscribe(value => {
      this.cartLength = value;
    });
    //console.log("hello world");
  }

  checkinternal() {
    if(!this.landingService.includes('rmm'))
      this.internalBadge = true;
    return this.internalBadge;
  }

  getDataCartList () {

    this.cartService.getAllCartEntities().then(function (result) {

      this.cartEntities = result;
      this.cartLength = this.cartEntities.length;
      console.log("cart length inside" + this.cartLength);
      return this.cartLength;
    }.bind(this), function (err) {
      alert("something went wrong while fetching the products");
    });
    return null;
  }

  updateCartStatus()
  {
    this.cartService.updateCartDisplayStatus(true);
  }

  /**
   * Get the params OnInit
   */
  ngOnInit() {
  }
}
