/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
export class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
}
NgbDatepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbDatepickerConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgbDatepickerConfig.prototype.dayTemplate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.dayTemplateData;
    /** @type {?} */
    NgbDatepickerConfig.prototype.footerTemplate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.displayMonths;
    /** @type {?} */
    NgbDatepickerConfig.prototype.firstDayOfWeek;
    /** @type {?} */
    NgbDatepickerConfig.prototype.markDisabled;
    /** @type {?} */
    NgbDatepickerConfig.prototype.minDate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.maxDate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.navigation;
    /** @type {?} */
    NgbDatepickerConfig.prototype.outsideDays;
    /** @type {?} */
    NgbDatepickerConfig.prototype.showWeekdays;
    /** @type {?} */
    NgbDatepickerConfig.prototype.showWeekNumbers;
    /** @type {?} */
    NgbDatepickerConfig.prototype.startDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBV3RELE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFLRSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUluQixlQUFVLEdBQWlDLFFBQVEsQ0FBQztRQUNwRCxnQkFBVyxHQUF1QyxTQUFTLENBQUM7UUFDNUQsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7S0FFekI7OztZQWZBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7O0lBRTlCLDBDQUE2Qzs7SUFDN0MsOENBQXNGOztJQUN0Riw2Q0FBaUM7O0lBQ2pDLDRDQUFrQjs7SUFDbEIsNkNBQW1COztJQUNuQiwyQ0FBdUY7O0lBQ3ZGLHNDQUF1Qjs7SUFDdkIsc0NBQXVCOztJQUN2Qix5Q0FBb0Q7O0lBQ3BELDBDQUE0RDs7SUFDNUQsMkNBQW9COztJQUNwQiw4Q0FBd0I7O0lBQ3hCLHdDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiRGF0ZXBpY2tlcmBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JEYXRlcGlja2VyKSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRhdGVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyQ29uZmlnIHtcbiAgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG4gIGRheVRlbXBsYXRlRGF0YTogKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBhbnk7XG4gIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBkaXNwbGF5TW9udGhzID0gMTtcbiAgZmlyc3REYXlPZldlZWsgPSAxO1xuICBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlU3RydWN0LCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcbiAgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcbiAgbWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcbiAgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJyA9ICdzZWxlY3QnO1xuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyA9ICd2aXNpYmxlJztcbiAgc2hvd1dlZWtkYXlzID0gdHJ1ZTtcbiAgc2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XG4gIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XG59XG4iXX0=