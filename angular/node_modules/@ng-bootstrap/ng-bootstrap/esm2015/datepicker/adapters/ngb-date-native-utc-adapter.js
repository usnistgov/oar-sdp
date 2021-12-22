/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDateNativeAdapter } from './ngb-date-native-adapter';
/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * \@since 3.2.0
 */
export class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeUTCAdapter.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0FBUS9ELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxvQkFBb0I7Ozs7OztJQUNyRCxlQUFlLENBQUMsSUFBVTtRQUNsQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLENBQUM7SUFDOUYsQ0FBQzs7Ozs7O0lBRVMsYUFBYSxDQUFDLElBQW1COztjQUNuQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RSw4QkFBOEI7UUFDOUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBWEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge05nYkRhdGVOYXRpdmVBZGFwdGVyfSBmcm9tICcuL25nYi1kYXRlLW5hdGl2ZS1hZGFwdGVyJztcblxuLyoqXG4gKiBTYW1lIGFzIFtgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXJgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIpLCBidXQgd2l0aCBVVEMgZGF0ZXMuXG4gKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlTmF0aXZlVVRDQWRhcHRlciBleHRlbmRzIE5nYkRhdGVOYXRpdmVBZGFwdGVyIHtcbiAgcHJvdGVjdGVkIF9mcm9tTmF0aXZlRGF0ZShkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIHt5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdG9OYXRpdmVEYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEYXRlIHtcbiAgICBjb25zdCBqc0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSkpO1xuICAgIC8vIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxuICAgIGpzRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLnllYXIpO1xuICAgIHJldHVybiBqc0RhdGU7XG4gIH1cbn1cbiJdfQ==