/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
/**
 * @param {?} jsDate
 * @return {?}
 */
export function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
/**
 * @param {?} date
 * @return {?}
 */
export function toJSDate(date) {
    /** @type {?} */
    var jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
/**
 * @return {?}
 */
export function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 * @abstract
 */
var NgbCalendar = /** @class */ (function () {
    function NgbCalendar() {
    }
    NgbCalendar.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] }
    ];
    /** @nocollapse */ NgbCalendar.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
    return NgbCalendar;
}());
export { NgbCalendar };
if (false) {
    /**
     * Returns the number of days per week.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getDaysPerWeek = function () { };
    /**
     * Returns an array of months per year.
     *
     * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
     * @abstract
     * @param {?=} year
     * @return {?}
     */
    NgbCalendar.prototype.getMonths = function (year) { };
    /**
     * Returns the number of weeks per month.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getWeeksPerMonth = function () { };
    /**
     * Returns the weekday number for a given day.
     *
     * With the default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbCalendar.prototype.getWeekday = function (date) { };
    /**
     * Adds a number of years, months or days to a given date.
     *
     * * `period` can be `y`, `m` or `d` and defaults to day.
     * * `number` defaults to 1.
     *
     * Always returns a new date.
     * @abstract
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendar.prototype.getNext = function (date, period, number) { };
    /**
     * Subtracts a number of years, months or days from a given date.
     *
     * * `period` can be `y`, `m` or `d` and defaults to day.
     * * `number` defaults to 1.
     *
     * Always returns a new date.
     * @abstract
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendar.prototype.getPrev = function (date, period, number) { };
    /**
     * Returns the week number for a given week.
     * @abstract
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendar.prototype.getWeekNumber = function (week, firstDayOfWeek) { };
    /**
     * Returns the today's date.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getToday = function () { };
    /**
     * Checks if a date is valid in the current calendar.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbCalendar.prototype.isValid = function (date) { };
}
var NgbCalendarGregorian = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarGregorian, _super);
    function NgbCalendarGregorian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getMonths = /**
     * @return {?}
     */
    function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getNext = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        /** @type {?} */
        var jsDate = toJSDate(date);
        /** @type {?} */
        var checkMonth = true;
        /** @type {?} */
        var expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromJSDate(jsDate);
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getPrev = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        return this.getNext(date, period, -number);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var jsDate = toJSDate(date);
        /** @type {?} */
        var day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeekNumber = /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        var date = week[thursdayIndex];
        /** @type {?} */
        var jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        var time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromJSDate(new Date()); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarGregorian.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        /** @type {?} */
        var jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    };
    NgbCalendarGregorian.decorators = [
        { type: Injectable }
    ];
    return NgbCalendarGregorian;
}(NgbCalendar));
export { NgbCalendarGregorian };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL25nYi1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFFdkMsTUFBTSxVQUFVLFVBQVUsQ0FBQyxNQUFZO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDcEYsQ0FBQzs7Ozs7QUFDRCxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQWE7O1FBQzlCLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ2hFLDJDQUEyQztJQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7OztBQUlELE1BQU0sVUFBVSwrQkFBK0I7SUFDN0MsT0FBTyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFDcEMsQ0FBQzs7Ozs7Ozs7QUFRRDtJQUFBO0tBNERDOztnQkE1REEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsK0JBQStCLEVBQUM7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LEtBQUssQ0FBQztTQUNkO1FBRUQsNkNBQTZDO1FBQzdDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDs7WUFFSyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUU3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDekcsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEMsQ0FBQzs7Z0JBcEZGLFVBQVU7O0lBcUZYLDJCQUFDO0NBQUEsQUFyRkQsQ0FDMEMsV0FBVyxHQW9GcEQ7U0FwRlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21KU0RhdGUoanNEYXRlOiBEYXRlKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZShqc0RhdGUuZ2V0RnVsbFllYXIoKSwganNEYXRlLmdldE1vbnRoKCkgKyAxLCBqc0RhdGUuZ2V0RGF0ZSgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0pTRGF0ZShkYXRlOiBOZ2JEYXRlKSB7XG4gIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XG4gIC8vIHRoaXMgaXMgZG9uZSBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cbiAgaWYgKCFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSkge1xuICAgIGpzRGF0ZS5zZXRGdWxsWWVhcihkYXRlLnllYXIpO1xuICB9XG4gIHJldHVybiBqc0RhdGU7XG59XG5cbmV4cG9ydCB0eXBlIE5nYlBlcmlvZCA9ICd5JyB8ICdtJyB8ICdkJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0NBTEVOREFSX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgTmdiQ2FsZW5kYXJHcmVnb3JpYW4oKTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgdGhhdCByZXByZXNlbnRzIHRoZSBjYWxlbmRhciB1c2VkIGJ5IHRoZSBkYXRlcGlja2VyLlxuICpcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgdGhlIEdyZWdvcmlhbiBjYWxlbmRhci4gWW91IGNhbiBpbmplY3QgaXQgaW4geW91ciBvd25cbiAqIGltcGxlbWVudGF0aW9ucyBpZiBuZWNlc3NhcnkgdG8gc2ltcGxpZnkgYE5nYkRhdGVgIGNhbGN1bGF0aW9ucy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiQ2FsZW5kYXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgcGVyIHdlZWsuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXlzUGVyV2VlaygpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbW9udGhzIHBlciB5ZWFyLlxuICAgKlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxIGFuZCByZXR1cm4gWzEsIDIsIC4uLiwgMTJdO1xuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHdlZWtzIHBlciBtb250aC5cbiAgICovXG4gIGFic3RyYWN0IGdldFdlZWtzUGVyTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3ZWVrZGF5IG51bWJlciBmb3IgYSBnaXZlbiBkYXkuXG4gICAqXG4gICAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBudW1iZXIgb2YgeWVhcnMsIG1vbnRocyBvciBkYXlzIHRvIGEgZ2l2ZW4gZGF0ZS5cbiAgICpcbiAgICogKiBgcGVyaW9kYCBjYW4gYmUgYHlgLCBgbWAgb3IgYGRgIGFuZCBkZWZhdWx0cyB0byBkYXkuXG4gICAqICogYG51bWJlcmAgZGVmYXVsdHMgdG8gMS5cbiAgICpcbiAgICogQWx3YXlzIHJldHVybnMgYSBuZXcgZGF0ZS5cbiAgICovXG4gIGFic3RyYWN0IGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgYSBudW1iZXIgb2YgeWVhcnMsIG1vbnRocyBvciBkYXlzIGZyb20gYSBnaXZlbiBkYXRlLlxuICAgKlxuICAgKiAqIGBwZXJpb2RgIGNhbiBiZSBgeWAsIGBtYCBvciBgZGAgYW5kIGRlZmF1bHRzIHRvIGRheS5cbiAgICogKiBgbnVtYmVyYCBkZWZhdWx0cyB0byAxLlxuICAgKlxuICAgKiBBbHdheXMgcmV0dXJucyBhIG5ldyBkYXRlLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcik6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdlZWsgbnVtYmVyIGZvciBhIGdpdmVuIHdlZWsuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrTnVtYmVyKHdlZWs6IHJlYWRvbmx5IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdG9kYXkncyBkYXRlLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0VG9kYXkoKTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgZGF0ZSBpcyB2YWxpZCBpbiB0aGUgY3VycmVudCBjYWxlbmRhci5cbiAgICovXG4gIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckdyZWdvcmlhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XG5cbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cblxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG4gICAgbGV0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuICAgIGxldCBjaGVja01vbnRoID0gdHJ1ZTtcbiAgICBsZXQgZXhwZWN0ZWRNb250aCA9IGpzRGF0ZS5nZXRNb250aCgpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBqc0RhdGUuc2V0RnVsbFllYXIoanNEYXRlLmdldEZ1bGxZZWFyKCkgKyBudW1iZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBleHBlY3RlZE1vbnRoICs9IG51bWJlcjtcbiAgICAgICAganNEYXRlLnNldE1vbnRoKGV4cGVjdGVkTW9udGgpO1xuICAgICAgICBleHBlY3RlZE1vbnRoID0gZXhwZWN0ZWRNb250aCAlIDEyO1xuICAgICAgICBpZiAoZXhwZWN0ZWRNb250aCA8IDApIHtcbiAgICAgICAgICBleHBlY3RlZE1vbnRoID0gZXhwZWN0ZWRNb250aCArIDEyO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyBudW1iZXIpO1xuICAgICAgICBjaGVja01vbnRoID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrTW9udGggJiYganNEYXRlLmdldE1vbnRoKCkgIT09IGV4cGVjdGVkTW9udGgpIHtcbiAgICAgIC8vIHRoaXMgbWVhbnMgdGhlIGRlc3RpbmF0aW9uIG1vbnRoIGhhcyBsZXNzIGRheXMgdGhhbiB0aGUgaW5pdGlhbCBtb250aFxuICAgICAgLy8gbGV0J3MgZ28gYmFjayB0byB0aGUgZW5kIG9mIHRoZSBwcmV2aW91cyBtb250aDpcbiAgICAgIGpzRGF0ZS5zZXREYXRlKDApO1xuICAgIH1cblxuICAgIHJldHVybiBmcm9tSlNEYXRlKGpzRGF0ZSk7XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcbiAgICBsZXQgZGF5ID0ganNEYXRlLmdldERheSgpO1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IHJlYWRvbmx5IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XG4gICAgICBmaXJzdERheU9mV2VlayA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgdGh1cnNkYXlJbmRleCA9ICg0ICsgNyAtIGZpcnN0RGF5T2ZXZWVrKSAlIDc7XG4gICAgbGV0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xuXG4gICAgY29uc3QganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XG4gICAganNEYXRlLnNldE1vbnRoKDApOyAgLy8gQ29tcGFyZSB3aXRoIEphbiAxXG4gICAganNEYXRlLnNldERhdGUoMSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIGpzRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xuICB9XG5cbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tSlNEYXRlKG5ldyBEYXRlKCkpOyB9XG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFkYXRlIHx8ICFpc0ludGVnZXIoZGF0ZS55ZWFyKSB8fCAhaXNJbnRlZ2VyKGRhdGUubW9udGgpIHx8ICFpc0ludGVnZXIoZGF0ZS5kYXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8geWVhciAwIGRvZXNuJ3QgZXhpc3QgaW4gR3JlZ29yaWFuIGNhbGVuZGFyXG4gICAgaWYgKGRhdGUueWVhciA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuXG4gICAgcmV0dXJuICFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSAmJiBqc0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS55ZWFyICYmIGpzRGF0ZS5nZXRNb250aCgpICsgMSA9PT0gZGF0ZS5tb250aCAmJlxuICAgICAgICBqc0RhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmRheTtcbiAgfVxufVxuIl19