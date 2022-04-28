import { HostListener, Directive } from "@angular/core";

@Directive()
export abstract class ComponentCanDeactivate {
 
  abstract  canDeactivate(): boolean;

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue =true;
        }
    }
}