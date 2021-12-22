/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { isInteger } from '../../util/util';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 * @abstract
 * @template D
 */
var NgbDateAdapter = /** @class */ (function () {
    function NgbDateAdapter() {
    }
    NgbDateAdapter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] }
    ];
    /** @nocollapse */ NgbDateAdapter.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
    return NgbDateAdapter;
}());
export { NgbDateAdapter };
if (false) {
    /**
     * Converts a user-model date of type `D` to an `NgbDateStruct` for internal use.
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgbDateAdapter.prototype.fromModel = function (value) { };
    /**
     * Converts an internal `NgbDateStruct` date to a user-model date of type `D`.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbDateAdapter.prototype.toModel = function (date) { };
}
var NgbDateStructAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateStructAdapter, _super);
    function NgbDateStructAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    NgbDateStructAdapter.prototype.fromModel = /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    };
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    NgbDateStructAdapter.prototype.toModel = /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    };
    NgbDateStructAdapter.decorators = [
        { type: Injectable }
    ];
    return NgbDateStructAdapter;
}(NgbDateAdapter));
export { NgbDateStructAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBRTFDLE1BQU0sVUFBVSxtQ0FBbUM7SUFDakQsT0FBTyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFDcEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBY0Q7SUFBQTtLQVdDOztnQkFYQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsRUFBQzs7O3lCQXBCakY7Q0ErQkMsQUFYRCxJQVdDO1NBVnFCLGNBQWM7Ozs7Ozs7O0lBSWxDLDBEQUE0Qzs7Ozs7OztJQUs1Qyx1REFBeUM7O0FBRzNDO0lBQzBDLGdEQUE2QjtJQUR2RTs7SUFtQkEsQ0FBQztJQWpCQzs7T0FFRzs7Ozs7O0lBQ0gsd0NBQVM7Ozs7O0lBQVQsVUFBVSxJQUFtQjtRQUMzQixPQUFPLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILHNDQUFPOzs7OztJQUFQLFVBQVEsSUFBbUI7UUFDekIsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkYsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDO0lBQ1gsQ0FBQzs7Z0JBbEJGLFVBQVU7O0lBbUJYLDJCQUFDO0NBQUEsQUFuQkQsQ0FDMEMsY0FBYyxHQWtCdkQ7U0FsQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfREFURV9BREFQVEVSX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIoKTtcbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBzZXJ2aWNlIHRoYXQgZG9lcyB0aGUgY29udmVyc2lvbiBiZXR3ZWVuIHRoZSBpbnRlcm5hbCBkYXRlcGlja2VyIGBOZ2JEYXRlU3RydWN0YCBtb2RlbCBhbmRcbiAqIGFueSBwcm92aWRlZCB1c2VyIGRhdGUgbW9kZWwgYERgLCBleC4gYSBzdHJpbmcsIGEgbmF0aXZlIGRhdGUsIGV0Yy5cbiAqXG4gKiBUaGUgYWRhcHRlciBpcyB1c2VkICoqb25seSoqIGZvciBjb252ZXJzaW9uIHdoZW4gYmluZGluZyBkYXRlcGlja2VyIHRvIGEgZm9ybSBjb250cm9sLFxuICogZXguIGBbKG5nTW9kZWwpXT1cInVzZXJEYXRlTW9kZWxcImAuIEhlcmUgYHVzZXJEYXRlTW9kZWxgIGNhbiBiZSBvZiBhbnkgdHlwZS5cbiAqXG4gKiBUaGUgZGVmYXVsdCBkYXRlcGlja2VyIGltcGxlbWVudGF0aW9uIGFzc3VtZXMgd2UgdXNlIGBOZ2JEYXRlU3RydWN0YCBhcyBhIHVzZXIgbW9kZWwuXG4gKlxuICogU2VlIHRoZSBbZGF0ZSBmb3JtYXQgb3ZlcnZpZXddKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL292ZXJ2aWV3I2RhdGUtbW9kZWwpIGZvciBtb3JlIGRldGFpbHNcbiAqIGFuZCB0aGUgW2N1c3RvbSBhZGFwdGVyIGRlbW9dKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2V4YW1wbGVzI2FkYXB0ZXIpIGZvciBhbiBleGFtcGxlLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9EQVRFX0FEQVBURVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZUFkYXB0ZXI8RD4ge1xuICAvKipcbiAgICogQ29udmVydHMgYSB1c2VyLW1vZGVsIGRhdGUgb2YgdHlwZSBgRGAgdG8gYW4gYE5nYkRhdGVTdHJ1Y3RgIGZvciBpbnRlcm5hbCB1c2UuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tTW9kZWwodmFsdWU6IEQpOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBpbnRlcm5hbCBgTmdiRGF0ZVN0cnVjdGAgZGF0ZSB0byBhIHVzZXItbW9kZWwgZGF0ZSBvZiB0eXBlIGBEYC5cbiAgICovXG4gIGFic3RyYWN0IHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IEQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPE5nYkRhdGVTdHJ1Y3Q+IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTmdiRGF0ZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYkRhdGVTdHJ1Y3QgdmFsdWVcbiAgICovXG4gIGZyb21Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIChkYXRlICYmIGlzSW50ZWdlcihkYXRlLnllYXIpICYmIGlzSW50ZWdlcihkYXRlLm1vbnRoKSAmJiBpc0ludGVnZXIoZGF0ZS5kYXkpKSA/XG4gICAgICAgIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6XG4gICAgICAgIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHZhbHVlIGludG8gTmdiRGF0ZVN0cnVjdCB2YWx1ZVxuICAgKi9cbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIChkYXRlICYmIGlzSW50ZWdlcihkYXRlLnllYXIpICYmIGlzSW50ZWdlcihkYXRlLm1vbnRoKSAmJiBpc0ludGVnZXIoZGF0ZS5kYXkpKSA/XG4gICAgICAgIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6XG4gICAgICAgIG51bGw7XG4gIH1cbn1cbiJdfQ==