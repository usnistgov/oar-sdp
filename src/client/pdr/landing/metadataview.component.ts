import {Component, Input} from '@angular/core';
import { FieldsetModule } from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';

 @Component ({
  selector: 'fieldset-view',
  moduleId: module.id, 
  styleUrls: ['metadataview.component.css'],
  template: `
    <!-- p-accordion [multiple]="true">
        <p-accordionTab header="{{node.key}}" *ngFor="let node of (entry | keyvalues)" [selected]="true">
          <fieldset-view  *ngIf="isArray(node.value) || isObject(node.value)" [entry]="node.value"></fieldset-view>
           <span *ngIf="!isArray(node.value) &&  !isObject(node.value)">{{ node.value }} </span>
        </p-accordionTab>
    </p-accordion -->
    <div *ngFor="let node of (entry | keyvalues)" >
      <div *ngIf="!isArray(node.value) &&  !isObject(node.value)" class="ui-g break-long-words">
        <div class="ui-g-2 ui-md-3 ui-lg-3 ui-sm-3"><span style="color:#1471AE; word-wrap: break-word;">{{node.key}}</span></div>
        <div class="ui-g-10 ui-md-9 ui-lg-10 ui-sm-9"><span class="font10"> {{node.value}}</span></div>
      </div>
      <br *ngIf="isArray(node.value) || isObject(node.value)"/>
       <p-fieldset *ngIf="isArray(node.value) || isObject(node.value)" legend="{{node.key}}"  [toggleable]="true">
          <fieldset-view [entry]="node.value"></fieldset-view>
       </p-fieldset> 
       <br *ngIf="isArray(node.value) || isObject(node.value)"/>
   
    </div> 
  `
 })
 export class MetadataView {
   @Input() entry:any[];
  


  isArray(obj : any ) {
     return Array.isArray(obj)
  }

  isObject(obj: any)
  {
    if (typeof obj === "object") {
    return true;
   }
  }
  
}