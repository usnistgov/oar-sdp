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
var NgbDatepickerConfig = /** @class */ (function () {
    function NgbDatepickerConfig() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
    NgbDatepickerConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbDatepickerConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });
    return NgbDatepickerConfig;
}());
export { NgbDatepickerConfig };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBVXREO0lBQUE7UUFLRSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUluQixlQUFVLEdBQWlDLFFBQVEsQ0FBQztRQUNwRCxnQkFBVyxHQUF1QyxTQUFTLENBQUM7UUFDNUQsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7S0FFekI7O2dCQWZBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs4QkFWaEM7Q0F5QkMsQUFmRCxJQWVDO1NBZFksbUJBQW1COzs7SUFDOUIsMENBQTZDOztJQUM3Qyw4Q0FBc0Y7O0lBQ3RGLDZDQUFpQzs7SUFDakMsNENBQWtCOztJQUNsQiw2Q0FBbUI7O0lBQ25CLDJDQUF1Rjs7SUFDdkYsc0NBQXVCOztJQUN2QixzQ0FBdUI7O0lBQ3ZCLHlDQUFvRDs7SUFDcEQsMENBQTREOztJQUM1RCwyQ0FBb0I7O0lBQ3BCLDhDQUF3Qjs7SUFDeEIsd0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG4vKipcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW2BOZ2JEYXRlcGlja2VyYF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXIpIGNvbXBvbmVudC5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZGF0ZXBpY2tlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJDb25maWcge1xuICBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcbiAgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcbiAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIGRpc3BsYXlNb250aHMgPSAxO1xuICBmaXJzdERheU9mV2VlayA9IDE7XG4gIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuICBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xuICBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xuICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnID0gJ3NlbGVjdCc7XG4gIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nID0gJ3Zpc2libGUnO1xuICBzaG93V2Vla2RheXMgPSB0cnVlO1xuICBzaG93V2Vla051bWJlcnMgPSBmYWxzZTtcbiAgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcbn1cbiJdfQ==