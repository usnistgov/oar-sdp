/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgbDate } from '../ngb-date';
import { fromJSDate, NgbCalendar, toJSDate } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
import { fromGregorian, getDayNumberInHebrewYear, getDaysInHebrewMonth, isHebrewLeapYear, toGregorian, setHebrewDay, setHebrewMonth } from './hebrew';
/**
 * \@since 3.2.0
 */
export class NgbCalendarHebrew extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @param {?=} year
     * @return {?}
     */
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        /** @type {?} */
        let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian(date).getTime());
    }
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
        const day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        /** @type {?} */
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian(new Date()); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    toGregorian(date) { return fromJSDate(toGregorian(date)); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    fromGregorian(date) { return fromGregorian(toJSDate(date)); }
}
NgbCalendarHebrew.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBYSxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLHdCQUF3QixFQUN4QixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxZQUFZLEVBQ1osY0FBYyxFQUNmLE1BQU0sVUFBVSxDQUFDOzs7O0FBTWxCLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxXQUFXOzs7O0lBQ2hELGNBQWMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRTlCLFNBQVMsQ0FBQyxJQUFhO1FBQ3JCLElBQUksSUFBSSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFB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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUs3RSxhQUFhLENBQUMsSUFBYSxJQUFhLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1lBaEVoRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge2Zyb21KU0RhdGUsIE5nYkNhbGVuZGFyLCBOZ2JQZXJpb2QsIHRvSlNEYXRlfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge1xuICBmcm9tR3JlZ29yaWFuLFxuICBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIsXG4gIGdldERheXNJbkhlYnJld01vbnRoLFxuICBpc0hlYnJld0xlYXBZZWFyLFxuICB0b0dyZWdvcmlhbixcbiAgc2V0SGVicmV3RGF5LFxuICBzZXRIZWJyZXdNb250aFxufSBmcm9tICcuL2hlYnJldyc7XG5cbi8qKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckhlYnJldyBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpIHtcbiAgICBpZiAoeWVhciAmJiBpc0hlYnJld0xlYXBZZWFyKHllYXIpKSB7XG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTtcbiAgICB9XG4gIH1cblxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxuXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGxldCBiID0gZGF0ZSAmJiBpc051bWJlcihkYXRlLnllYXIpICYmIGlzTnVtYmVyKGRhdGUubW9udGgpICYmIGlzTnVtYmVyKGRhdGUuZGF5KTtcbiAgICBiID0gYiAmJiBkYXRlLm1vbnRoID4gMCAmJiBkYXRlLm1vbnRoIDw9IChpc0hlYnJld0xlYXBZZWFyKGRhdGUueWVhcikgPyAxMyA6IDEyKTtcbiAgICBiID0gYiAmJiBkYXRlLmRheSA+IDAgJiYgZGF0ZS5kYXkgPD0gZ2V0RGF5c0luSGVicmV3TW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICByZXR1cm4gYiAmJiAhaXNOYU4odG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XG5cbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIGRhdGUueWVhciArPSBudW1iZXI7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGRhdGUgPSBzZXRIZWJyZXdNb250aChkYXRlLCBudW1iZXIpO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHJldHVybiBzZXRIZWJyZXdEYXkoZGF0ZSwgbnVtYmVyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHsgcmV0dXJuIHRoaXMuZ2V0TmV4dChkYXRlLCBwZXJpb2QsIC1udW1iZXIpOyB9XG5cbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XG4gICAgY29uc3QgZGF5ID0gdG9HcmVnb3JpYW4oZGF0ZSkuZ2V0RGF5KCk7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcbiAgfVxuXG4gIGdldFdlZWtOdW1iZXIod2VlazogcmVhZG9ubHkgTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG4gICAgY29uc3QgZGF0ZSA9IHdlZWtbd2Vlay5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gTWF0aC5jZWlsKGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSAvIDcpO1xuICB9XG5cbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XG5cbiAgLyoqXG4gICAqIEBzaW5jZSAzLjQuMFxuICAgKi9cbiAgdG9HcmVnb3JpYW4oZGF0ZTogTmdiRGF0ZSk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUpTRGF0ZSh0b0dyZWdvcmlhbihkYXRlKSk7IH1cblxuICAvKipcbiAgICogQHNpbmNlIDMuNC4wXG4gICAqL1xuICBmcm9tR3JlZ29yaWFuKGRhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21HcmVnb3JpYW4odG9KU0RhdGUoZGF0ZSkpOyB9XG59XG4iXX0=