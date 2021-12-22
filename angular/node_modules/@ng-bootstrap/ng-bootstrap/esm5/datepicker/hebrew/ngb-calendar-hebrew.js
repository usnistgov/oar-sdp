/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from '../ngb-date';
import { fromJSDate, NgbCalendar, toJSDate } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
import { fromGregorian, getDayNumberInHebrewYear, getDaysInHebrewMonth, isHebrewLeapYear, toGregorian, setHebrewDay, setHebrewMonth } from './hebrew';
/**
 * \@since 3.2.0
 */
var NgbCalendarHebrew = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarHebrew, _super);
    function NgbCalendarHebrew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @param {?=} year
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getMonths = /**
     * @param {?=} year
     * @return {?}
     */
    function (year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    };
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian(date).getTime());
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getNext = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getPrev = /**
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
    NgbCalendarHebrew.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeekNumber = /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (week, firstDayOfWeek) {
        /** @type {?} */
        var date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    };
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromGregorian(new Date()); };
    /**
     * @since 3.4.0
     */
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.toGregorian = /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    function (date) { return fromJSDate(toGregorian(date)); };
    /**
     * @since 3.4.0
     */
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.fromGregorian = /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    function (date) { return fromGregorian(toJSDate(date)); };
    NgbCalendarHebrew.decorators = [
        { type: Injectable }
    ];
    return NgbCalendarHebrew;
}(NgbCalendar));
export { NgbCalendarHebrew };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQWEsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIsb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGNBQWMsRUFDZixNQUFNLFVBQVUsQ0FBQzs7OztBQUtsQjtJQUN1Qyw2Q0FBVztJQURsRDs7SUFpRUEsQ0FBQzs7OztJQS9EQywwQ0FBYzs7O0lBQWQsY0FBbUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUU5QixxQ0FBUzs7OztJQUFULFVBQVUsSUFBYTtRQUNyQixJQUFJLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxF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Q3ZELENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVIsY0FBc0IsT0FBTyxhQUFhLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RDs7T0FFRzs7Ozs7O0lBQ0gsdUNBQVc7Ozs7O0lBQVgsVUFBWSxJQUFhLElBQWEsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdFOztPQUVHOzs7Ozs7SUFDSCx5Q0FBYTs7Ozs7SUFBYixVQUFjLElBQWEsSUFBYSxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQWhFaEYsVUFBVTs7SUFpRVgsd0JBQUM7Q0FBQSxBQWpFRCxDQUN1QyxXQUFXLEdBZ0VqRDtTQWhFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcbmltcG9ydCB7ZnJvbUpTRGF0ZSwgTmdiQ2FsZW5kYXIsIE5nYlBlcmlvZCwgdG9KU0RhdGV9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc051bWJlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcbmltcG9ydCB7XG4gIGZyb21HcmVnb3JpYW4sXG4gIGdldERheU51bWJlckluSGVicmV3WWVhcixcbiAgZ2V0RGF5c0luSGVicmV3TW9udGgsXG4gIGlzSGVicmV3TGVhcFllYXIsXG4gIHRvR3JlZ29yaWFuLFxuICBzZXRIZWJyZXdEYXksXG4gIHNldEhlYnJld01vbnRoXG59IGZyb20gJy4vaGVicmV3JztcblxuLyoqXG4gKiBAc2luY2UgMy4yLjBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySGVicmV3IGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cblxuICBnZXRNb250aHMoeWVhcj86IG51bWJlcikge1xuICAgIGlmICh5ZWFyICYmIGlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcbiAgICAgIHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTNdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdO1xuICAgIH1cbiAgfVxuXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgbGV0IGIgPSBkYXRlICYmIGlzTnVtYmVyKGRhdGUueWVhcikgJiYgaXNOdW1iZXIoZGF0ZS5tb250aCkgJiYgaXNOdW1iZXIoZGF0ZS5kYXkpO1xuICAgIGIgPSBiICYmIGRhdGUubW9udGggPiAwICYmIGRhdGUubW9udGggPD0gKGlzSGVicmV3TGVhcFllYXIoZGF0ZS55ZWFyKSA/IDEzIDogMTIpO1xuICAgIGIgPSBiICYmIGRhdGUuZGF5ID4gMCAmJiBkYXRlLmRheSA8PSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgIHJldHVybiBiICYmICFpc05hTih0b0dyZWdvcmlhbihkYXRlKS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xuICAgIGRhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcblxuICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgZGF0ZS55ZWFyICs9IG51bWJlcjtcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAgZGF0ZSA9IHNldEhlYnJld01vbnRoKGRhdGUsIG51bWJlcik7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgcmV0dXJuIHNldEhlYnJld0RheShkYXRlLCBudW1iZXIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cblxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xuICB9XG5cbiAgZ2V0V2Vla051bWJlcih3ZWVrOiByZWFkb25seSBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICBjb25zdCBkYXRlID0gd2Vla1t3ZWVrLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBNYXRoLmNlaWwoZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyKGRhdGUpIC8gNyk7XG4gIH1cblxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7IH1cblxuICAvKipcbiAgICogQHNpbmNlIDMuNC4wXG4gICAqL1xuICB0b0dyZWdvcmlhbihkYXRlOiBOZ2JEYXRlKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tSlNEYXRlKHRvR3JlZ29yaWFuKGRhdGUpKTsgfVxuXG4gIC8qKlxuICAgKiBAc2luY2UgMy40LjBcbiAgICovXG4gIGZyb21HcmVnb3JpYW4oZGF0ZTogTmdiRGF0ZSk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUdyZWdvcmlhbih0b0pTRGF0ZShkYXRlKSk7IH1cbn1cbiJdfQ==