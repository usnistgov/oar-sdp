/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
export class NgbTimepickerConfig {
    constructor() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
}
NgbTimepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTimepickerConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbTimepickerConfig_Factory() { return new NgbTimepickerConfig(); }, token: NgbTimepickerConfig, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgbTimepickerConfig.prototype.meridian;
    /** @type {?} */
    NgbTimepickerConfig.prototype.spinners;
    /** @type {?} */
    NgbTimepickerConfig.prototype.seconds;
    /** @type {?} */
    NgbTimepickerConfig.prototype.hourStep;
    /** @type {?} */
    NgbTimepickerConfig.prototype.minuteStep;
    /** @type {?} */
    NgbTimepickerConfig.prototype.secondStep;
    /** @type {?} */
    NgbTimepickerConfig.prototype.disabled;
    /** @type {?} */
    NgbTimepickerConfig.prototype.readonlyInputs;
    /** @type {?} */
    NgbTimepickerConfig.prototype.size;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIvdGltZXBpY2tlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBU3pDLE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFFRSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFNBQUksR0FBaUMsUUFBUSxDQUFDO0tBQy9DOzs7WUFYQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OztJQUU5Qix1Q0FBaUI7O0lBQ2pCLHVDQUFnQjs7SUFDaEIsc0NBQWdCOztJQUNoQix1Q0FBYTs7SUFDYix5Q0FBZTs7SUFDZix5Q0FBZTs7SUFDZix1Q0FBaUI7O0lBQ2pCLDZDQUF1Qjs7SUFDdkIsbUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiVGltZXBpY2tlcmBdKCMvY29tcG9uZW50cy90aW1lcGlja2VyL2FwaSNOZ2JUaW1lcGlja2VyKSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHRpbWVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyQ29uZmlnIHtcbiAgbWVyaWRpYW4gPSBmYWxzZTtcbiAgc3Bpbm5lcnMgPSB0cnVlO1xuICBzZWNvbmRzID0gZmFsc2U7XG4gIGhvdXJTdGVwID0gMTtcbiAgbWludXRlU3RlcCA9IDE7XG4gIHNlY29uZFN0ZXAgPSAxO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICByZWFkb25seUlucHV0cyA9IGZhbHNlO1xuICBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnID0gJ21lZGl1bSc7XG59XG4iXX0=