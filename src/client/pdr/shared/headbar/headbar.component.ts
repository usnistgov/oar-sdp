import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem, TabViewModule } from 'primeng/primeng';
import { Config } from '../config/env.config';
import { environment } from '../../environment';
/**
 * This class represents the headbar component.
 */

declare var Ultima: any;


@Component({
  moduleId: module.id,
  selector: 'pdr-headbar',
  templateUrl: 'headbar.component.html',
  styleUrls: ['headbar.component.css']
})

export class HeadbarComponent {

  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  darkMenu: boolean = false;
  profileMode: string = 'inline';
  private SDPAPI : string = environment.SDPAPI;
  private landingService : string = environment.LANDING;
  internalBadge: boolean = false;

   
  constructor( private el: ElementRef) {
  }

  onClickSearch(){
    //alert("Test");
    window.open(this.SDPAPI);
  }
  onClickAbout(){
    window.open("../#/about");
  }
  checkinternal() {
    if(this.landingService == "internal")
      this.internalBadge = true;
      return this.internalBadge;
  }
}
