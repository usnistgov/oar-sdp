/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { padNumber, toInteger, isNumber } from '../util/util';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 * @abstract
 */
var NgbDateParserFormatter = /** @class */ (function () {
    function NgbDateParserFormatter() {
    }
    NgbDateParserFormatter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] }
    ];
    /** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
    return NgbDateParserFormatter;
}());
export { NgbDateParserFormatter };
if (false) {
    /**
     * Parses the given `string` to an `NgbDateStruct`.
     *
     * Implementations should try their best to provide a result, even
     * partial. They must return `null` if the value can't be parsed.
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgbDateParserFormatter.prototype.parse = function (value) { };
    /**
     * Formats the given `NgbDateStruct` to a `string`.
     *
     * Implementations should return an empty string if the given date is `null`,
     * and try their best to provide a partial result if the given date is incomplete or invalid.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbDateParserFormatter.prototype.format = function (date) { };
}
var NgbDateISOParserFormatter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateISOParserFormatter, _super);
    function NgbDateISOParserFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NgbDateISOParserFormatter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            /** @type {?} */
            var dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateISOParserFormatter.prototype.format = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date ?
            date.year + "-" + (isNumber(date.month) ? padNumber(date.month) : '') + "-" + (isNumber(date.day) ? padNumber(date.day) : '') :
            '';
    };
    NgbDateISOParserFormatter.decorators = [
        { type: Injectable }
    ];
    return NgbDateISOParserFormatter;
}(NgbDateParserFormatter));
export { NgbDateISOParserFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRXpDLE1BQU0sVUFBVSx1Q0FBdUM7SUFDckQsT0FBTyxJQUFJLHlCQUF5QixFQUFFLENBQUM7QUFDekMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkQ7SUFBQTtLQWlCQzs7Z0JBakJBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLHVDQUF1QyxFQUFDOzs7aUNBdkJyRjtDQXdDQyxBQWpCRCxJQWlCQztTQWhCcUIsc0JBQXNCOzs7Ozs7Ozs7OztJQU8xQyw4REFBNkM7Ozs7Ozs7Ozs7SUFRN0MsOERBQTZDOztBQUcvQztJQUMrQyxxREFBc0I7SUFEckU7O0lBcUJBLENBQUM7Ozs7O0lBbkJDLHlDQUFLOzs7O0lBQUwsVUFBTSxLQUFhO1FBQ2pCLElBQUksS0FBSyxFQUFFOztnQkFDSCxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDekMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ2hFO2lCQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckYsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDbkY7aUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0csT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDdEc7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCwwQ0FBTTs7OztJQUFOLFVBQU8sSUFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLFVBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUM7WUFDdEgsRUFBRSxDQUFDO0lBQ1QsQ0FBQzs7Z0JBcEJGLFVBQVU7O0lBcUJYLGdDQUFDO0NBQUEsQUFyQkQsQ0FDK0Msc0JBQXNCLEdBb0JwRTtTQXBCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhZE51bWJlciwgdG9JbnRlZ2VyLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWSgpIHtcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyKCk7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Qgc2VydmljZSBmb3IgcGFyc2luZyBhbmQgZm9ybWF0dGluZyBkYXRlcyBmb3IgdGhlXG4gKiBbYE5nYklucHV0RGF0ZXBpY2tlcmBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JJbnB1dERhdGVwaWNrZXIpIGRpcmVjdGl2ZS5cbiAqIENvbnZlcnRzIGJldHdlZW4gdGhlIGludGVybmFsIGBOZ2JEYXRlU3RydWN0YCBtb2RlbCBwcmVzZW50YXRpb24gYW5kIGEgYHN0cmluZ2AgdGhhdCBpcyBkaXNwbGF5ZWQgaW4gdGhlXG4gKiBpbnB1dCBlbGVtZW50LlxuICpcbiAqIFdoZW4gdXNlciB0eXBlcyBzb21ldGhpbmcgaW4gdGhlIGlucHV0IHRoaXMgc2VydmljZSBhdHRlbXB0cyB0byBwYXJzZSBpdCBpbnRvIGEgYE5nYkRhdGVTdHJ1Y3RgIG9iamVjdC5cbiAqIEFuZCB2aWNlIHZlcnNhLCB3aGVuIHVzZXJzIHNlbGVjdHMgYSBkYXRlIGluIHRoZSBjYWxlbmRhciB3aXRoIHRoZSBtb3VzZSwgaXQgbXVzdCBiZSBkaXNwbGF5ZWQgYXMgYSBgc3RyaW5nYFxuICogaW4gdGhlIGlucHV0LlxuICpcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyB0aGUgSVNPIDg2MDEgZm9ybWF0LCBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb24gdmlhIERJXG4gKiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgc3RyaW5nIGZvcm1hdCBvciBhIGN1c3RvbSBwYXJzaW5nIGxvZ2ljLlxuICpcbiAqIFNlZSB0aGUgW2RhdGUgZm9ybWF0IG92ZXJ2aWV3XSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9vdmVydmlldyNkYXRlLW1vZGVsKSBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9QQVJTRVJfRk9STUFUVEVSX0ZBQ1RPUll9KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIge1xuICAvKipcbiAgICogUGFyc2VzIHRoZSBnaXZlbiBgc3RyaW5nYCB0byBhbiBgTmdiRGF0ZVN0cnVjdGAuXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxuICAgKiBwYXJ0aWFsLiBUaGV5IG11c3QgcmV0dXJuIGBudWxsYCBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgcGFyc2VkLlxuICAgKi9cbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgdGhlIGdpdmVuIGBOZ2JEYXRlU3RydWN0YCB0byBhIGBzdHJpbmdgLlxuICAgKlxuICAgKiBJbXBsZW1lbnRhdGlvbnMgc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGdpdmVuIGRhdGUgaXMgYG51bGxgLFxuICAgKiBhbmQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHBhcnRpYWwgcmVzdWx0IGlmIHRoZSBnaXZlbiBkYXRlIGlzIGluY29tcGxldGUgb3IgaW52YWxpZC5cbiAgICovXG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlciBleHRlbmRzIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIge1xuICBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBkYXRlUGFydHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoJy0nKTtcbiAgICAgIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAxICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkpIHtcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IG51bGwsIGRheTogbnVsbH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDIgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pKSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiBudWxsfTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMyAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1sxXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzJdKSkge1xuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogdG9JbnRlZ2VyKGRhdGVQYXJ0c1sxXSksIGRheTogdG9JbnRlZ2VyKGRhdGVQYXJ0c1syXSl9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/XG4gICAgICAgIGAke2RhdGUueWVhcn0tJHtpc051bWJlcihkYXRlLm1vbnRoKSA/IHBhZE51bWJlcihkYXRlLm1vbnRoKSA6ICcnfS0ke2lzTnVtYmVyKGRhdGUuZGF5KSA/IHBhZE51bWJlcihkYXRlLmRheSkgOiAnJ31gIDpcbiAgICAgICAgJyc7XG4gIH1cbn1cbiJdfQ==