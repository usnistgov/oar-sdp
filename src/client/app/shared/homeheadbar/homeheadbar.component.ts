import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import {SelectItem, TabViewModule} from 'primeng/primeng';

/**
 * This class represents the headbar component.
 */

 declare var Modena: any;
 
@Component({
  moduleId: module.id,
  selector: 'sdp-homeheadbar',
  templateUrl: 'homeheadbar.component.html',
  styleUrls: ['homeheadbar.component.css']
})

export class HomeHeadbarComponent implements OnInit {

  ngOnInit() {
        Modena.init();
    }

}
