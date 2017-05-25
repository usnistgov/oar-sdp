import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem, TabViewModule } from 'primeng/primeng';
import { Config } from '../config/env.config';
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
  private SDPAPI : string = Config.SDPAPI;
  constructor( private el: ElementRef) {
  }

  onClickSearch(){
    //alert("Test");
    window.open(this.SDPAPI);
  }
  onClickAbout(){
    window.open("../#/about");
  }

}
