import { __decorate } from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, NgZone, OnDestroy } from '@angular/core';
import { IndividualConfig, ToastPackage } from './toastr-config';
import { ToastrService } from './toastr.service';
let Toast = class Toast {
    constructor(toastrService, toastPackage, ngZone) {
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        /** width of progress bar */
        this.width = -1;
        /** a combination of toast type and options.toastClass */
        this.toastClasses = '';
        /** controls animation */
        this.state = {
            value: 'inactive',
            params: {
                easeTime: this.toastPackage.config.easeTime,
                easing: 'ease-in'
            }
        };
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
            this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
            this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(() => {
            this.resetTimeout();
        });
        this.sub3 = toastPackage.toastRef.countDuplicate().subscribe(count => {
            this.duplicatesCount = count;
        });
    }
    /** hides component when waiting to be displayed */
    get displayStyle() {
        if (this.state.value === 'inactive') {
            return 'none';
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    }
    /**
     * activates toast and sets timeout
     */
    activateToast() {
        this.state = Object.assign(Object.assign({}, this.state), { value: 'active' });
        if (!(this.options.disableTimeOut === true || this.options.disableTimeOut === 'timeOut') && this.options.timeOut) {
            this.outsideTimeout(() => this.remove(), this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.outsideInterval(() => this.updateProgress(), 10);
            }
        }
    }
    /**
     * updates progress bar width
     */
    updateProgress() {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        const now = new Date().getTime();
        const remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    }
    resetTimeout() {
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = Object.assign(Object.assign({}, this.state), { value: 'active' });
        this.outsideTimeout(() => this.remove(), this.originalTimeout);
        this.options.timeOut = this.originalTimeout;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval(() => this.updateProgress(), 10);
        }
    }
    /**
     * tells toastrService to remove this toast after animation time
     */
    remove() {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = Object.assign(Object.assign({}, this.state), { value: 'removed' });
        this.outsideTimeout(() => this.toastrService.remove(this.toastPackage.toastId), +this.toastPackage.config.easeTime);
    }
    tapToast() {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    }
    stickAround() {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    }
    delayedHideToast() {
        if ((this.options.disableTimeOut === true || this.options.disableTimeOut === 'extendedTimeOut') ||
            this.options.extendedTimeOut === 0 ||
            this.state.value === 'removed') {
            return;
        }
        this.outsideTimeout(() => this.remove(), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval(() => this.updateProgress(), 10);
        }
    }
    outsideTimeout(func, timeout) {
        if (this.ngZone) {
            this.ngZone.runOutsideAngular(() => (this.timeout = setTimeout(() => this.runInsideAngular(func), timeout)));
        }
        else {
            this.timeout = setTimeout(() => func(), timeout);
        }
    }
    outsideInterval(func, timeout) {
        if (this.ngZone) {
            this.ngZone.runOutsideAngular(() => (this.intervalId = setInterval(() => this.runInsideAngular(func), timeout)));
        }
        else {
            this.intervalId = setInterval(() => func(), timeout);
        }
    }
    runInsideAngular(func) {
        if (this.ngZone) {
            this.ngZone.run(() => func());
        }
        else {
            func();
        }
    }
};
Toast.ctorParameters = () => [
    { type: ToastrService },
    { type: ToastPackage },
    { type: NgZone }
];
__decorate([
    HostBinding('class')
], Toast.prototype, "toastClasses", void 0);
__decorate([
    HostBinding('@flyInOut')
], Toast.prototype, "state", void 0);
__decorate([
    HostBinding('style.display')
], Toast.prototype, "displayStyle", null);
__decorate([
    HostListener('click')
], Toast.prototype, "tapToast", null);
__decorate([
    HostListener('mouseenter')
], Toast.prototype, "stickAround", null);
__decorate([
    HostListener('mouseleave')
], Toast.prototype, "delayedHideToast", null);
Toast = __decorate([
    Component({
        selector: '[toast-component]',
        template: `
  <button *ngIf="options.closeButton" (click)="remove()" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alertdialog" aria-live="polite"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alertdialog" aria-live="polite"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width + '%'"></div>
  </div>
  `,
        animations: [
            trigger('flyInOut', [
                state('inactive', style({ opacity: 0 })),
                state('active', style({ opacity: 1 })),
                state('removed', style({ opacity: 0 })),
                transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
                transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
            ])
        ],
        preserveWhitespaces: false
    })
], Toast);
export { Toast };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0ci8iLCJzb3VyY2VzIjpbInRvYXN0ci90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXVDakQsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQW9DaEIsWUFDWSxhQUE0QixFQUMvQixZQUEwQixFQUN2QixNQUFlO1FBRmYsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQWpDM0IsNEJBQTRCO1FBQzVCLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLHlEQUF5RDtRQUNuQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUN4Qyx5QkFBeUI7UUFFekIsVUFBSyxHQUFHO1lBQ04sS0FBSyxFQUFFLFVBQVU7WUFDakIsTUFBTSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUMzQyxNQUFNLEVBQUUsU0FBUzthQUNsQjtTQUNGLENBQUM7UUF1QkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsSUFDM0MsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUN0QixFQUFFLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM5RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM5RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM5RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25FLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXhDRCxtREFBbUQ7SUFFbkQsSUFBSSxZQUFZO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbkMsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7SUFtQ0QsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRDs7T0FFRztJQUNILGFBQWE7UUFDWCxJQUFJLENBQUMsS0FBSyxtQ0FBUSxJQUFJLENBQUMsS0FBSyxLQUFFLEtBQUssRUFBRSxRQUFRLEdBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDNUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDdkQ7U0FDRjtJQUNILENBQUM7SUFDRDs7T0FFRztJQUNILGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkUsT0FBTztTQUNSO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3RELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsS0FBSyxZQUFZLEVBQUU7WUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMvQjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssbUNBQVEsSUFBSSxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsUUFBUSxHQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssbUNBQVEsSUFBSSxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsU0FBUyxHQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FDakIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFDMUQsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDbEMsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFFbEIsc0JBQXNCO1FBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQ0UsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEtBQUssaUJBQWlCLENBQUM7WUFDM0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQzlCO1lBQ0EsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQWUsRUFBRSxPQUFlO1FBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQzNCLEdBQUcsRUFBRSxDQUNILENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQ3hCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFDakMsT0FBTyxDQUNSLENBQUMsQ0FDTCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFlLEVBQUUsT0FBZTtRQUM5QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUMzQixHQUFHLEVBQUUsQ0FDSCxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUM1QixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQ2pDLE9BQU8sQ0FDUixDQUFDLENBQ0wsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFlO1FBQ3RDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUExSzRCLGFBQWE7WUFDakIsWUFBWTtZQUNkLE1BQU07O0FBOUJMO0lBQXJCLFdBQVcsQ0FBQyxPQUFPLENBQUM7MkNBQW1CO0FBR3hDO0lBREMsV0FBVyxDQUFDLFdBQVcsQ0FBQztvQ0FPdkI7QUFJRjtJQURDLFdBQVcsQ0FBQyxlQUFlLENBQUM7eUNBSzVCO0FBMEdEO0lBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQztxQ0FTckI7QUFFRDtJQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7d0NBWTFCO0FBRUQ7SUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzZDQWdCMUI7QUExS1UsS0FBSztJQXJDakIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDbEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsVUFBVSxDQUNSLG9CQUFvQixFQUNwQixPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FDekM7Z0JBQ0QsVUFBVSxDQUNSLG1CQUFtQixFQUNuQixPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FDekM7YUFDRixDQUFDO1NBQ0g7UUFDRCxtQkFBbUIsRUFBRSxLQUFLO0tBQzNCLENBQUM7R0FDVyxLQUFLLENBK01qQjtTQS9NWSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlIH0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICcuL3RvYXN0ci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3RvYXN0LWNvbXBvbmVudF0nLFxuICB0ZW1wbGF0ZTogYFxuICA8YnV0dG9uICpuZ0lmPVwib3B0aW9ucy5jbG9zZUJ1dHRvblwiIChjbGljayk9XCJyZW1vdmUoKVwiIGNsYXNzPVwidG9hc3QtY2xvc2UtYnV0dG9uXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgPC9idXR0b24+XG4gIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIFtjbGFzc109XCJvcHRpb25zLnRpdGxlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlXCI+XG4gICAge3sgdGl0bGUgfX0gPG5nLWNvbnRhaW5lciAqbmdJZj1cImR1cGxpY2F0ZXNDb3VudFwiPlt7eyBkdXBsaWNhdGVzQ291bnQgKyAxIH19XTwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0ZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbaW5uZXJIVE1MXT1cIm1lc3NhZ2VcIj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmICFvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRkaWFsb2dcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgIFtjbGFzc109XCJvcHRpb25zLm1lc3NhZ2VDbGFzc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwibWVzc2FnZVwiPlxuICAgIHt7IG1lc3NhZ2UgfX1cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJvcHRpb25zLnByb2dyZXNzQmFyXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoICsgJyUnXCI+PC9kaXY+XG4gIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICBzdGF0ZSgnaW5hY3RpdmUnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgICBzdGF0ZSgncmVtb3ZlZCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAnaW5hY3RpdmUgPT4gYWN0aXZlJyxcbiAgICAgICAgYW5pbWF0ZSgne3sgZWFzZVRpbWUgfX1tcyB7eyBlYXNpbmcgfX0nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdhY3RpdmUgPT4gcmVtb3ZlZCcsXG4gICAgICAgIGFuaW1hdGUoJ3t7IGVhc2VUaW1lIH19bXMge3sgZWFzaW5nIH19JylcbiAgICAgIClcbiAgICBdKVxuICBdLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIG1lc3NhZ2U/OiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZT86IHN0cmluZztcbiAgb3B0aW9uczogSW5kaXZpZHVhbENvbmZpZztcbiAgZHVwbGljYXRlc0NvdW50OiBudW1iZXI7XG4gIG9yaWdpbmFsVGltZW91dDogbnVtYmVyO1xuICAvKiogd2lkdGggb2YgcHJvZ3Jlc3MgYmFyICovXG4gIHdpZHRoID0gLTE7XG4gIC8qKiBhIGNvbWJpbmF0aW9uIG9mIHRvYXN0IHR5cGUgYW5kIG9wdGlvbnMudG9hc3RDbGFzcyAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdG9hc3RDbGFzc2VzID0gJyc7XG4gIC8qKiBjb250cm9scyBhbmltYXRpb24gKi9cbiAgQEhvc3RCaW5kaW5nKCdAZmx5SW5PdXQnKVxuICBzdGF0ZSA9IHtcbiAgICB2YWx1ZTogJ2luYWN0aXZlJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGVhc2VUaW1lOiB0aGlzLnRvYXN0UGFja2FnZS5jb25maWcuZWFzZVRpbWUsXG4gICAgICBlYXNpbmc6ICdlYXNlLWluJ1xuICAgIH1cbiAgfTtcblxuICAvKiogaGlkZXMgY29tcG9uZW50IHdoZW4gd2FpdGluZyB0byBiZSBkaXNwbGF5ZWQgKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcbiAgZ2V0IGRpc3BsYXlTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcbiAgcHJpdmF0ZSBpbnRlcnZhbElkOiBhbnk7XG4gIHByaXZhdGUgaGlkZVRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdG9hc3RyU2VydmljZTogVG9hc3RyU2VydmljZSxcbiAgICBwdWJsaWMgdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgcHJvdGVjdGVkIG5nWm9uZT86IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0b2FzdFBhY2thZ2UubWVzc2FnZTtcbiAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xuICAgIHRoaXMub3B0aW9ucyA9IHRvYXN0UGFja2FnZS5jb25maWc7XG4gICAgdGhpcy5vcmlnaW5hbFRpbWVvdXQgPSB0b2FzdFBhY2thZ2UuY29uZmlnLnRpbWVPdXQ7XG4gICAgdGhpcy50b2FzdENsYXNzZXMgPSBgJHt0b2FzdFBhY2thZ2UudG9hc3RUeXBlfSAke1xuICAgICAgdG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzXG4gICAgfWA7XG4gICAgdGhpcy5zdWIgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlVG9hc3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLnRpbWVvdXRSZXNldCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViMyA9IHRvYXN0UGFja2FnZS50b2FzdFJlZi5jb3VudER1cGxpY2F0ZSgpLnN1YnNjcmliZShjb3VudCA9PiB7XG4gICAgICB0aGlzLmR1cGxpY2F0ZXNDb3VudCA9IGNvdW50O1xuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIzLnVuc3Vic2NyaWJlKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG4gIC8qKlxuICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxuICAgKi9cbiAgYWN0aXZhdGVUb2FzdCgpIHtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ2FjdGl2ZScgfTtcbiAgICBpZiAoISh0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgPT09IHRydWUgfHwgdGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0ID09PSAndGltZU91dCcpICYmIHRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy50aW1lT3V0KTtcbiAgICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMub3B0aW9ucy50aW1lT3V0O1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0Jhcikge1xuICAgICAgICB0aGlzLm91dHNpZGVJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHVwZGF0ZXMgcHJvZ3Jlc3MgYmFyIHdpZHRoXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzcygpIHtcbiAgICBpZiAodGhpcy53aWR0aCA9PT0gMCB8fCB0aGlzLndpZHRoID09PSAxMDAgfHwgIXRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuaGlkZVRpbWUgLSBub3c7XG4gICAgdGhpcy53aWR0aCA9IChyZW1haW5pbmcgLyB0aGlzLm9wdGlvbnMudGltZU91dCkgKiAxMDA7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0FuaW1hdGlvbiA9PT0gJ2luY3JlYXNpbmcnKSB7XG4gICAgICB0aGlzLndpZHRoID0gMTAwIC0gdGhpcy53aWR0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMud2lkdGggPD0gMCkge1xuICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZHRoID49IDEwMCkge1xuICAgICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgICB9XG4gIH1cblxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMuc3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIHZhbHVlOiAnYWN0aXZlJyB9O1xuXG4gICAgdGhpcy5vdXRzaWRlVGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZSgpLCB0aGlzLm9yaWdpbmFsVGltZW91dCk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSB0aGlzLm9yaWdpbmFsVGltZW91dDtcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcHRpb25zLnRpbWVPdXQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IC0xO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMub3V0c2lkZUludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0ZWxscyB0b2FzdHJTZXJ2aWNlIHRvIHJlbW92ZSB0aGlzIHRvYXN0IGFmdGVyIGFuaW1hdGlvbiB0aW1lXG4gICAqL1xuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ3JlbW92ZWQnIH07XG4gICAgdGhpcy5vdXRzaWRlVGltZW91dChcbiAgICAgICgpID0+IHRoaXMudG9hc3RyU2VydmljZS5yZW1vdmUodGhpcy50b2FzdFBhY2thZ2UudG9hc3RJZCksXG4gICAgICArdGhpcy50b2FzdFBhY2thZ2UuY29uZmlnLmVhc2VUaW1lXG4gICAgKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIHRhcFRvYXN0KCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50b2FzdFBhY2thZ2UudHJpZ2dlclRhcCgpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGFwVG9EaXNtaXNzKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgc3RpY2tBcm91bmQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IDA7XG4gICAgdGhpcy5oaWRlVGltZSA9IDA7XG5cbiAgICAvLyBkaXNhYmxlIHByb2dyZXNzQmFyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMud2lkdGggPSAwO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBkZWxheWVkSGlkZVRvYXN0KCkge1xuICAgIGlmIChcbiAgICAgICh0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgPT09IHRydWUgfHwgdGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0ID09PSAnZXh0ZW5kZWRUaW1lT3V0JykgfHxcbiAgICAgIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQgPT09IDAgfHxcbiAgICAgIHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQpO1xuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dDtcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcHRpb25zLnRpbWVPdXQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IC0xO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMub3V0c2lkZUludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIG91dHNpZGVUaW1lb3V0KGZ1bmM6ICgpID0+IGFueSwgdGltZW91dDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMubmdab25lKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcihcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICAodGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChcbiAgICAgICAgICAgICgpID0+IHRoaXMucnVuSW5zaWRlQW5ndWxhcihmdW5jKSxcbiAgICAgICAgICAgIHRpbWVvdXRcbiAgICAgICAgICApKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKCksIHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIG91dHNpZGVJbnRlcnZhbChmdW5jOiAoKSA9PiBhbnksIHRpbWVvdXQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm5nWm9uZSkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAgICgpID0+XG4gICAgICAgICAgKHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW5JbnNpZGVBbmd1bGFyKGZ1bmMpLFxuICAgICAgICAgICAgdGltZW91dFxuICAgICAgICAgICkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiBmdW5jKCksIHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVuSW5zaWRlQW5ndWxhcihmdW5jOiAoKSA9PiBhbnkpIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiBmdW5jKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jKCk7XG4gICAgfVxuICB9XG59XG4iXX0=