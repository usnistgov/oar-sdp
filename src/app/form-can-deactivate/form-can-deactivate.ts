import {ComponentCanDeactivate} from '../can-deactivate/component-can-deactivate';
import {NgForm} from "@angular/forms";
import { Directive } from "@angular/core";

@Directive()
export abstract class FormCanDeactivate extends ComponentCanDeactivate{

 abstract get dataChanged():boolean;
 
 canDeactivate():boolean{
    //  return !this.dataChanged;
     return true;
  }
}