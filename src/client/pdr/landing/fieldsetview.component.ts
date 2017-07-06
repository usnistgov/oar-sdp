import {Component, Input} from '@angular/core';
import { FieldsetModule } from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';

@Component ({
  selector: 'fieldset-view',
  styleUrls: ['landing.component.css'],
  template: `
    <!-- p-accordion [multiple]="true">
        <p-accordionTab header="{{node.key}}" *ngFor="let node of (entry | keyvalues)" [selected]="true">
          <fieldset-view  *ngIf="isArray(node.value) || isObject(node.value)" [entry]="node.value"></fieldset-view>
           <span *ngIf="!isArray(node.value) &&  !isObject(node.value)">{{ node.value }} </span>
        </p-accordionTab>
    </p-accordion -->
    <p-fieldset legend="{{node.key}}"  *ngFor="let node of (entry | keyvalues)" [toggleable]="true">
      <fieldset-view  *ngIf="isArray(node.value) || isObject(node.value)" [entry]="node.value"></fieldset-view>
       <span *ngIf="!isArray(node.value) &&  !isObject(node.value)">{{ node.value }} </span>
    </p-fieldset>
     
    
  `
})
export class FieldSetView {
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