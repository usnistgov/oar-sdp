import {Component, Input} from '@angular/core';
import { FieldsetModule } from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
      <div *ngIf="!isArrayOrObject(node.value)" class="ui-g break-long-words" style="padding:0;">
        <div class="ui-g-2 ui-md-3 ui-lg-2 ui-sm-3" style="padding:0;">
          <span style="color:#1471AE; word-wrap: break-word;">{{ifIntegerThenitem(node.key)}}</span>
          <!--span *ngIf="isInteger(node.key)" style="color:grey; word-wrap: break-word;">{{ifIntegerThenitem(node.key)}}</span-->
        </div>
        <div class="ui-g-10 ui-md-9 ui-lg-10 ui-sm-9" style="padding:0;">
          <span class="font10"> {{node.value}}</span>
        </div>
      </div>
       <div *ngIf="isArrayOrObject(node.value)">
        <br>
         <p-fieldset legend="{{ ifIntegerThenitem(node.key) }}"  [toggleable]="true">
          <fieldset-view [entry]="node.value"></fieldset-view>
         </p-fieldset> 
        <br>
       </div>
    </div> 
  `
})
export class MetadataView {
  @Input() entry:any[];
  // [ngClass]="{'customlegend': isInteger(node.key), 'notcustomlegend':!isInteger(node.key) }"

  isArray(obj : any ) {
    return Array.isArray(obj);
  }

  isObject(obj: any)
  {
    if (typeof obj === 'object') 
    {
      return true;
    }
  }

  isArrayOrObject(obj: any){
    if(!this.isArray(obj) &&  !this.isObject(obj))
      return false;

    else if(this.isArray(obj) || this.isObject(obj))
      return true;
  }
  
  isInteger(value){
    if((parseFloat(value) === parseInt(value)) && !isNaN(value)){
      return true;
    } else {
      return false;
    }
  }

  ifIntegerThenitem(value){
    if((parseFloat(value) === parseInt(value)) && !isNaN(value)){
      return 'item ['+value+']';
    } else {
      return value;
    }
  }
}
