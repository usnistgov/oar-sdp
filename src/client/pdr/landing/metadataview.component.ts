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
        <div class="ui-g-2 ui-md-3 ui-lg-2 ui-sm-3" style="padding:0;"><span style="color:#1471AE; word-wrap: break-word;">{{check_if_is_integer_item(node.key)}}</span></div>
        <div class="ui-g-10 ui-md-9 ui-lg-10 ui-sm-9" style="padding:0;"><span class="font10"> {{node.value}}</span></div>
      </div>
      <br *ngIf="isArray(node.value) || isObject(node.value)"/>
       <p-fieldset *ngIf="isArray(node.value) || isObject(node.value)" legend="{{ check_if_is_integer_item(node.key) }}"  [toggleable]="true">
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
  
 check_if_is_integer(value){
   if((parseFloat(value) == parseInt(value)) && !isNaN(value)){ 
      // I can have spacespacespace1 - which is 1 and validators pases but
      // spacespacespace doesn't - which is what i wanted.
      // 1space2 doesn't pass - good
      // of course, when saving data you do another parseInt.
      
       return true;
   } else {
       return false;
   }
  }

   check_if_is_integer_item(value){
   if((parseFloat(value) == parseInt(value)) && !isNaN(value)){ 
     
      return "item_ "+value;
   } else {
       return value;
   }
  }
}