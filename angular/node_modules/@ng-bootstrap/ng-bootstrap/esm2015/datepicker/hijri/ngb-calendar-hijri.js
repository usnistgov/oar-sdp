/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgbDate } from '../ngb-date';
import { NgbCalendar } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
/**
 * @abstract
 */
export class NgbCalendarHijri extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return this.fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    }
    /**
     * @private
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    _setDay(date, day) {
        day = +day;
        /** @type {?} */
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    /**
     * @private
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    }
    /**
     * @private
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
}
NgbCalendarHijri.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @abstract
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    NgbCalendarHijri.prototype.getDaysPerMonth = function (month, year) { };
    /**
     * Returns the equivalent Hijri date value for a give input Gregorian date.
     * `gDate` is s JS Date to be converted to Hijri.
     * @abstract
     * @param {?} gDate
     * @return {?}
     */
    NgbCalendarHijri.prototype.fromGregorian = function (gDate) { };
    /**
     * Converts the current Hijri date to Gregorian.
     * @abstract
     * @param {?} hDate
     * @return {?}
     */
    NgbCalendarHijri.prototype.toGregorian = function (hDate) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhpanJpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2hpanJpL25nYi1jYWxlbmRhci1oaWpyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQVksV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHekMsTUFBTSxPQUFnQixnQkFBaUIsU0FBUSxXQUFXOzs7O0lBbUJ4RCxjQUFjLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTlCLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFL0QsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBRWhDLE9BQU8sQ0FBQyxJQUFhLEVBQUUsU0FBb0IsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDO1FBQ3hELElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBELFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxHQUFHO2dCQUNOLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FB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QUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsSUFBYSxFQUFFLElBQVk7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQTVHRixVQUFVOzs7Ozs7Ozs7Ozs7SUFPVCx3RUFBOEQ7Ozs7Ozs7O0lBTTlELGdFQUE2Qzs7Ozs7OztJQUs3Qyw4REFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcbmltcG9ydCB7TmdiUGVyaW9kLCBOZ2JDYWxlbmRhcn0gZnJvbSAnLi4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzTnVtYmVyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiQ2FsZW5kYXJIaWpyaSBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgbW9udGguXG4gICAqIGBtb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXG4gICAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cbiAgICovXG4gIGFic3RyYWN0IGdldERheXNQZXJNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSGlqcmkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICAgKiBgZ0RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tR3JlZ29yaWFuKGdEYXRlOiBEYXRlKTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIGN1cnJlbnQgSGlqcmkgZGF0ZSB0byBHcmVnb3JpYW4uXG4gICAqL1xuICBhYnN0cmFjdCB0b0dyZWdvcmlhbihoRGF0ZTogTmdiRGF0ZSk6IERhdGU7XG5cbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XG5cbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cblxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG4gICAgZGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0WWVhcihkYXRlLCBkYXRlLnllYXIgKyBudW1iZXIpO1xuICAgICAgICBkYXRlLm1vbnRoID0gMTtcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIG51bWJlcik7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldERheShkYXRlLCBkYXRlLmRheSArIG51bWJlcik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGRheSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0RGF5KCk7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcbiAgfVxuXG4gIGdldFdlZWtOdW1iZXIod2VlazogcmVhZG9ubHkgTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcbiAgICB9XG5cbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcbiAgICBjb25zdCBkYXRlID0gd2Vla1t0aHVyc2RheUluZGV4XTtcblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSk7XG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XG4gICAgY29uc3QgTXVoRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4obmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCAxLCAxKSk7ICAvLyBDb21wYXJlIHdpdGggTXVoYXJyYW0gMVxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBNdWhEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XG4gIH1cblxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIHRoaXMuZnJvbUdyZWdvcmlhbihuZXcgRGF0ZSgpKTsgfVxuXG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSkgJiZcbiAgICAgICAgIWlzTmFOKHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldERheShkYXRlOiBOZ2JEYXRlLCBkYXk6IG51bWJlcik6IE5nYkRhdGUge1xuICAgIGRheSA9ICtkYXk7XG4gICAgbGV0IG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICBpZiAoZGF5IDw9IDApIHtcbiAgICAgIHdoaWxlIChkYXkgPD0gMCkge1xuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCAtIDEpO1xuICAgICAgICBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gICAgICAgIGRheSArPSBtRGF5cztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRheSA+IG1EYXlzKSB7XG4gICAgICB3aGlsZSAoZGF5ID4gbURheXMpIHtcbiAgICAgICAgZGF5IC09IG1EYXlzO1xuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIDEpO1xuICAgICAgICBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGUuZGF5ID0gZGF5O1xuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TW9udGgoZGF0ZTogTmdiRGF0ZSwgbW9udGg6IG51bWJlcik6IE5nYkRhdGUge1xuICAgIG1vbnRoID0gK21vbnRoO1xuICAgIGRhdGUueWVhciA9IGRhdGUueWVhciArIE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gICAgZGF0ZS5tb250aCA9IE1hdGguZmxvb3IoKChtb250aCAtIDEpICUgMTIgKyAxMikgJSAxMikgKyAxO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0WWVhcihkYXRlOiBOZ2JEYXRlLCB5ZWFyOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgICBkYXRlLnllYXIgPSAreWVhcjtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufVxuIl19