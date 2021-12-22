/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * \@since 2.2.0
 * @abstract
 * @template T
 */
var NgbTimeAdapter = /** @class */ (function () {
    function NgbTimeAdapter() {
    }
    NgbTimeAdapter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY },] }
    ];
    /** @nocollapse */ NgbTimeAdapter.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
    return NgbTimeAdapter;
}());
export { NgbTimeAdapter };
if (false) {
    /**
     * Converts a user-model time of type `T` to an `NgbTimeStruct` for internal use.
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgbTimeAdapter.prototype.fromModel = function (value) { };
    /**
     * Converts an internal `NgbTimeStruct` time to a user-model time of type `T`.
     * @abstract
     * @param {?} time
     * @return {?}
     */
    NgbTimeAdapter.prototype.toModel = function (time) { };
}
var NgbTimeStructAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbTimeStructAdapter, _super);
    function NgbTimeStructAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    NgbTimeStructAdapter.prototype.fromModel = /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    function (time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    };
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    NgbTimeStructAdapter.prototype.toModel = /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    function (time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    };
    NgbTimeStructAdapter.decorators = [
        { type: Injectable }
    ];
    return NgbTimeStructAdapter;
}(NgbTimeAdapter));
export { NgbTimeStructAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci9uZ2ItdGltZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7OztBQUV2QyxNQUFNLFVBQVUsbUNBQW1DO0lBQ2pELE9BQU8sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0FBQ3BDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlRDtJQUFBO0tBV0M7O2dCQVhBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxFQUFDOzs7eUJBckJqRjtDQWdDQyxBQVhELElBV0M7U0FWcUIsY0FBYzs7Ozs7Ozs7SUFJbEMsMERBQTRDOzs7Ozs7O0lBSzVDLHVEQUF5Qzs7QUFHM0M7SUFDMEMsZ0RBQTZCO0lBRHZFOztJQW1CQSxDQUFDO0lBakJDOztPQUVHOzs7Ozs7SUFDSCx3Q0FBUzs7Ozs7SUFBVCxVQUFVLElBQW1CO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsc0NBQU87Ozs7O0lBQVAsVUFBUSxJQUFtQjtRQUN6QixPQUFPLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUM7SUFDWCxDQUFDOztnQkFsQkYsVUFBVTs7SUFtQlgsMkJBQUM7Q0FBQSxBQW5CRCxDQUMwQyxjQUFjLEdBa0J2RDtTQWxCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JUaW1lU3RydWN0fSBmcm9tICcuL25nYi10aW1lLXN0cnVjdCc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1RJTUVfQURBUFRFUl9GQUNUT1JZKCkge1xuICByZXR1cm4gbmV3IE5nYlRpbWVTdHJ1Y3RBZGFwdGVyKCk7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Qgc2VydmljZSB0aGF0IGRvZXMgdGhlIGNvbnZlcnNpb24gYmV0d2VlbiB0aGUgaW50ZXJuYWwgdGltZXBpY2tlciBgTmdiVGltZVN0cnVjdGAgbW9kZWwgYW5kXG4gKiBhbnkgcHJvdmlkZWQgdXNlciB0aW1lIG1vZGVsIGBUYCwgZXguIGEgc3RyaW5nLCBhIG5hdGl2ZSBkYXRlLCBldGMuXG4gKlxuICogVGhlIGFkYXB0ZXIgaXMgdXNlZCAqKm9ubHkqKiBmb3IgY29udmVyc2lvbiB3aGVuIGJpbmRpbmcgdGltZXBpY2tlciB0byBhIGZvcm0gY29udHJvbCxcbiAqIGV4LiBgWyhuZ01vZGVsKV09XCJ1c2VyVGltZU1vZGVsXCJgLiBIZXJlIGB1c2VyVGltZU1vZGVsYCBjYW4gYmUgb2YgYW55IHR5cGUuXG4gKlxuICogVGhlIGRlZmF1bHQgdGltZXBpY2tlciBpbXBsZW1lbnRhdGlvbiBhc3N1bWVzIHdlIHVzZSBgTmdiVGltZVN0cnVjdGAgYXMgYSB1c2VyIG1vZGVsLlxuICpcbiAqIFNlZSB0aGUgW2N1c3RvbSB0aW1lIGFkYXB0ZXIgZGVtb10oIy9jb21wb25lbnRzL3RpbWVwaWNrZXIvZXhhbXBsZXMjYWRhcHRlcikgZm9yIGFuIGV4YW1wbGUuXG4gKlxuICogQHNpbmNlIDIuMi4wXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX1RJTUVfQURBUFRFUl9GQUNUT1JZfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JUaW1lQWRhcHRlcjxUPiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHVzZXItbW9kZWwgdGltZSBvZiB0eXBlIGBUYCB0byBhbiBgTmdiVGltZVN0cnVjdGAgZm9yIGludGVybmFsIHVzZS5cbiAgICovXG4gIGFic3RyYWN0IGZyb21Nb2RlbCh2YWx1ZTogVCk6IE5nYlRpbWVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIGludGVybmFsIGBOZ2JUaW1lU3RydWN0YCB0aW1lIHRvIGEgdXNlci1tb2RlbCB0aW1lIG9mIHR5cGUgYFRgLlxuICAgKi9cbiAgYWJzdHJhY3QgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0KTogVDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYlRpbWVTdHJ1Y3RBZGFwdGVyIGV4dGVuZHMgTmdiVGltZUFkYXB0ZXI8TmdiVGltZVN0cnVjdD4ge1xuICAvKipcbiAgICogQ29udmVydHMgYSBOZ2JUaW1lU3RydWN0IHZhbHVlIGludG8gTmdiVGltZVN0cnVjdCB2YWx1ZVxuICAgKi9cbiAgZnJvbU1vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QpOiBOZ2JUaW1lU3RydWN0IHtcbiAgICByZXR1cm4gKHRpbWUgJiYgaXNJbnRlZ2VyKHRpbWUuaG91cikgJiYgaXNJbnRlZ2VyKHRpbWUubWludXRlKSkgP1xuICAgICAgICB7aG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IG51bGx9IDpcbiAgICAgICAgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXG4gICAqL1xuICB0b01vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QpOiBOZ2JUaW1lU3RydWN0IHtcbiAgICByZXR1cm4gKHRpbWUgJiYgaXNJbnRlZ2VyKHRpbWUuaG91cikgJiYgaXNJbnRlZ2VyKHRpbWUubWludXRlKSkgP1xuICAgICAgICB7aG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IG51bGx9IDpcbiAgICAgICAgbnVsbDtcbiAgfVxufVxuIl19