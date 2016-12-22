import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem, TabViewModule } from 'primeng/primeng';

/**
 * This class represents the headbar component.
 */

declare var Ultima: any;


@Component({
  moduleId: module.id,
  selector: 'sdp-homeheadbar',
  templateUrl: 'homeheadbar.component.html',
  styleUrls: ['homeheadbar.component.css']
})

export class HomeHeadbarComponent implements  AfterViewInit {

  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  profileMode: string = 'inline';
  darkMenu: boolean = false;

  constructor( private el: ElementRef) {
  }


  ngAfterViewInit() {
    Ultima.init(this.el.nativeElement);
  }
}
