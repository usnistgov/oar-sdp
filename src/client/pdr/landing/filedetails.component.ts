import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component'; 

@Component({
  selector: 'filedetails-resources',
   styleUrls: ['landing.component.css'],
  template: `
    <br>
    <div class="ui-g" style="background-color:#F3F3F3; padding-left:1%">
    <div class="ui-g-6 ui-md-6 ui-lg-6 ui-sm-10">
        <span class="textstyle1 fDetailsfFont">
         <span *ngIf="fileDetails['downloadURL']"> File </span>    
         <span *ngIf="!fileDetails['downloadURL']"> Subcollection</span>     
        </span>   
        <h4>{{ fileDetails["title"]}}</h4>
        <br><span class="font8">Path: <b>{{fileDetails["filepath"]}}</b></span>
        <span *ngIf="fileDetails['downloadURL']" class="font8"> <br>Type:<b>{{fileDetails["mediaType"]}}</b></span>
        <span *ngIf="fileDetails['downloadURL']" class="font8"><br>Size:</span>
    </div>
    <div class="ui-g-2 ui-md-2 ui-lg-2 ui-sm-10"></div>
    <div class="ui-g-4 ui-md-4 ui-lg-4 ui-sm-10">
        <button pButton class="ui-button-success" type="button" (click)="download()" label="Dowload"></button>
        <!-- button pButton class="ui-button-success" type="button" (click)="addtoCart()" label="Add to Cart"></button -->
    </div>
    
        <div class="ui-g-10 ui-md-10 ui-lg-10 ui-sm-10">
            <span class="font10"><b>Description:</b> </span>
            <div class="well filedesc" >
                {{ fileDetails["description"] }}
            </div>  
            
            <span class="font10"><b>Topic Keyword:</b></span>
            <br>
            <span class="font10"><b>Collection Metadata:</b></span>
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
