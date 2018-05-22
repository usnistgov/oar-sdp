import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 

@Component({
   moduleId: module.id,  
  selector: 'filedetails-resources',
  styleUrls: ['filedetails.component.css'],
 templateUrl: 'filedetails.component.html',
})

export class FileDetailsComponent {
   @Input() fileDetails: any[];

   download(){
       window.open(this.fileDetails["downloadURL"]);
       //alert("download here");
   }
  
  /**
   * Function to display bytes in appropriate format.
   **/ 
  formatBytes(a,b){
       if(0==a)return"0 Bytes";
       var c=1024,
       d=b||2,
       e=["Bytes","kB","MB","GB","TB","PB","EB","ZB","YB"],
       f=Math.floor(Math.log(a)/Math.log(c));
       return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
   }

   addtoCart(){
      alert("Coming soon");
   }
 }
