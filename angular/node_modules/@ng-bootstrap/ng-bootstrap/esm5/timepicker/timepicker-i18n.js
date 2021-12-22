/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayPeriods, TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * @param {?} locale
 * @return {?}
 */
export function NGB_TIMEPICKER_I18N_FACTORY(locale) {
    return new NgbTimepickerI18nDefault(locale);
}
/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 * @abstract
 */
var NgbTimepickerI18n = /** @class */ (function () {
    function NgbTimepickerI18n() {
    }
    NgbTimepickerI18n.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [LOCALE_ID] },] }
    ];
    /** @nocollapse */ NgbTimepickerI18n.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbTimepickerI18n_Factory() { return NGB_TIMEPICKER_I18N_FACTORY(i0.ɵɵinject(i0.LOCALE_ID)); }, token: NgbTimepickerI18n, providedIn: "root" });
    return NgbTimepickerI18n;
}());
export { NgbTimepickerI18n };
if (false) {
    /**
     * Returns the name for the period before midday.
     * @abstract
     * @return {?}
     */
    NgbTimepickerI18n.prototype.getMorningPeriod = function () { };
    /**
     * Returns the name for the period after midday.
     * @abstract
     * @return {?}
     */
    NgbTimepickerI18n.prototype.getAfternoonPeriod = function () { };
}
var NgbTimepickerI18nDefault = /** @class */ (function (_super) {
    tslib_1.__extends(NgbTimepickerI18nDefault, _super);
    function NgbTimepickerI18nDefault(locale) {
        var _this = _super.call(this) || this;
        _this._periods = getLocaleDayPeriods(locale, FormStyle.Standalone, TranslationWidth.Narrow);
        return _this;
    }
    /**
     * @return {?}
     */
    NgbTimepickerI18nDefault.prototype.getMorningPeriod = /**
     * @return {?}
     */
    function () { return this._periods[0]; };
    /**
     * @return {?}
     */
    NgbTimepickerI18nDefault.prototype.getAfternoonPeriod = /**
     * @return {?}
     */
    function () { return this._periods[1]; };
    NgbTimepickerI18nDefault.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgbTimepickerI18nDefault.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return NgbTimepickerI18nDefault;
}(NgbTimepickerI18n));
export { NgbTimepickerI18nDefault };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbTimepickerI18nDefault.prototype._periods;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1pMThuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0aW1lcGlja2VyL3RpbWVwaWNrZXItaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsU0FBUyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUVqRixNQUFNLFVBQVUsMkJBQTJCLENBQUMsTUFBTTtJQUNoRCxPQUFPLElBQUksd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsQ0FBQzs7Ozs7OztBQU9EO0lBQUE7S0FXQzs7Z0JBWEEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUM7Ozs0QkFaNUY7Q0F1QkMsQUFYRCxJQVdDO1NBVnFCLGlCQUFpQjs7Ozs7OztJQUlyQywrREFBb0M7Ozs7OztJQUtwQyxpRUFBc0M7O0FBR3hDO0lBQzhDLG9EQUFpQjtJQUc3RCxrQ0FBK0IsTUFBYztRQUE3QyxZQUNFLGlCQUFPLFNBR1I7UUFEQyxLQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUM3RixDQUFDOzs7O0lBRUQsbURBQWdCOzs7SUFBaEIsY0FBNkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUV2RCxxREFBa0I7OztJQUFsQixjQUErQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFaMUQsVUFBVTs7Ozs2Q0FJSSxNQUFNLFNBQUMsU0FBUzs7SUFTL0IsK0JBQUM7Q0FBQSxBQWJELENBQzhDLGlCQUFpQixHQVk5RDtTQVpZLHdCQUF3Qjs7Ozs7O0lBQ25DLDRDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtU3R5bGUsIGdldExvY2FsZURheVBlcmlvZHMsIFRyYW5zbGF0aW9uV2lkdGh9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBOR0JfVElNRVBJQ0tFUl9JMThOX0ZBQ1RPUlkobG9jYWxlKSB7XG4gIHJldHVybiBuZXcgTmdiVGltZXBpY2tlckkxOG5EZWZhdWx0KGxvY2FsZSk7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgc2VydmljZSBzdXBwbHlpbmcgZGF5IHBlcmlvZHMgKGZvciBleGFtcGxlLCAnQU0nIGFuZCAnUE0nKSB0byBOZ2JUaW1lcGlja2VyIGNvbXBvbmVudC5cbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgc2VydmljZSBob25vcnMgdGhlIEFuZ3VsYXIgbG9jYWxlLCBhbmQgdXNlcyB0aGUgcmVnaXN0ZXJlZCBsb2NhbGUgZGF0YSxcbiAqIGFzIGV4cGxhaW5lZCBpbiB0aGUgQW5ndWxhciBpMThuIGd1aWRlLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfVElNRVBJQ0tFUl9JMThOX0ZBQ1RPUlksIGRlcHM6IFtMT0NBTEVfSURdfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JUaW1lcGlja2VySTE4biB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIGZvciB0aGUgcGVyaW9kIGJlZm9yZSBtaWRkYXkuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb3JuaW5nUGVyaW9kKCk6IHN0cmluZztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZSBmb3IgdGhlIHBlcmlvZCBhZnRlciBtaWRkYXkuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRBZnRlcm5vb25QZXJpb2QoKTogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiVGltZXBpY2tlckkxOG4ge1xuICBwcml2YXRlIF9wZXJpb2RzOiBbc3RyaW5nLCBzdHJpbmddO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9wZXJpb2RzID0gZ2V0TG9jYWxlRGF5UGVyaW9kcyhsb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLk5hcnJvdyk7XG4gIH1cblxuICBnZXRNb3JuaW5nUGVyaW9kKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9wZXJpb2RzWzBdOyB9XG5cbiAgZ2V0QWZ0ZXJub29uUGVyaW9kKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9wZXJpb2RzWzFdOyB9XG59XG4iXX0=