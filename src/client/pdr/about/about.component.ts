import {  Component, OnInit } from '@angular/core';
import { environment } from '../environment';
// import * as d3 from 'd3';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'pdr-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent { 
    ngOnInit() {
        alert("About:"+environment.DISTAPI);
        // d3.json("flare.json", function(data){ alert("data")});
    }
}
