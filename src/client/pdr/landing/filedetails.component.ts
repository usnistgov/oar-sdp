import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 

@Component({
  selector: 'filedetails-resources',
  template: `
    <br>
    <div class="ui-g">
    <div class="ui-g-6 ui-md-6 ui-lg-6 ui-sm-10">
        <span class="textstyle1" style="font-family: Arial, Helvetica, sans-serif; color: grey;font-size: 12;">
         <span *ngIf="fileDetails['downloadURL']"> File </span>    
         <span *ngIf="!fileDetails['downloadURL']"> Subcollection</span>     
        </span>   
        <h4>{{ fileDetails["title"]}}</h4>
        <br><span style="font-size:8pt;">Path: <b>{{fileDetails["filepath"]}}</b></span>
        <span *ngIf="fileDetails['downloadURL']" style="font-size:8pt;"> <br>Type:<b>{{fileDetails["mediaType"]}}</b></span>
        <span *ngIf="fileDetails['downloadURL']" style="font-size:8pt;"><br>Size:</span>
    </div>
    <div class="ui-g-2 ui-md-2 ui-lg-2 ui-sm-10"></div>
    <div class="ui-g-4 ui-md-4 ui-lg-4 ui-sm-10">
        <button pButton class="ui-button-success" type="button" (click)="download()" label="Dowload"></button>
        <button pButton class="ui-button-success" type="button" (click)="addtoCart()" label="Add to Cart"></button>
    </div>
    
        <div class="ui-g-10 ui-md-10 ui-lg-10 ui-sm-10">
            <span style="font-size:10pt;"><b>Description:</b> </span>
            <div class="well" style="background-color:green; text-align: left; color: white">
                {{ fileDetails["description"] }}
            </div>  
            
            <span style="font-size:10pt;"><b>Topic Keyword:</b></span>
            <br>
            <span style="font-size:10pt;"><b>Collection Metadata:</b></span>
        </div>    
    </div>
  `
})

export class FileDetailsComponent {
   @Input() fileDetails: any[];

   download(){
       window.open(this.fileDetails["downloadURL"]);
       //alert("download here");
   }

   addtoCart(){
      alert("Coming soon");
   }
 }
