import {  Component, OnInit } from '@angular/core';
import { environment } from '../environment';
// import * as d3 from 'd3';
/**
 * This class represents the lazy loaded HelpComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'pdr-help',
  templateUrl: 'help.component.html',
  styleUrls: ['help.component.css']
})
export class HelpComponent { 
    ngOnInit() {
        //  d3.json("flare.json", function(data){ alert("data")});
    }
    ngAfterViewInit(){
        //alert("TEST");  
        window.history.replaceState( {} , '#/help/', '/pdr/help/' );
    }
}
