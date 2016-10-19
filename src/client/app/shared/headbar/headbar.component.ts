import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { Location} from '@angular/common';
import {SelectItem, TabViewModule} from 'primeng/primeng';

/**
 * This class represents the headbar component.
 */

declare var Ultima: any;


@Component({
  moduleId: module.id,
  selector: 'sdp-headbar',
  templateUrl: 'headbar.component.html',
  styleUrls: ['headbar.component.css']
})

export class HeadbarComponent implements AfterViewInit {

  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  darkMenu: boolean = false;
  profileMode: string = 'inline';

  constructor( private el: ElementRef) {
  }


  ngAfterViewInit() {
    Ultima.init(this.el.nativeElement);
  }
}
