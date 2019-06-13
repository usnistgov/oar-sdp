import {ComponentCanDeactivate} from '../can-deactivate/component-can-deactivate';
import {NgForm} from "@angular/forms";

export abstract class FormCanDeactivate extends ComponentCanDeactivate{

 abstract get dataChanged():boolean;
 
 canDeactivate():boolean{
     return !this.dataChanged;
  }
}