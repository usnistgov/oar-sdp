/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth, formatDate } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * @param {?} locale
 * @return {?}
 */
export function NGB_DATEPICKER_18N_FACTORY(locale) {
    return new NgbDatepickerI18nDefault(locale);
}
/**
 * A service supplying i18n data to the datepicker component.
 *
 * The default implementation of this service uses the Angular locale and registered locale data for
 * weekdays and month names (as explained in the Angular i18n guide).
 *
 * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
 * numerals. For other static labels the datepicker uses the default Angular i18n.
 *
 * See the [i18n demo](#/components/datepicker/examples#i18n) and
 * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
 * a custom provider for i18n.
 * @abstract
 */
export class NgbDatepickerI18n {
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * \@since 3.0.0
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return `${date.day}`; }
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * \@since 3.0.0
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return `${weekNumber}`; }
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * \@since 3.0.0
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return `${year}`; }
}
NgbDatepickerI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID] },] }
];
/** @nocollapse */ NgbDatepickerI18n.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerI18n_Factory() { return NGB_DATEPICKER_18N_FACTORY(i0.ɵɵinject(i0.LOCALE_ID)); }, token: NgbDatepickerI18n, providedIn: "root" });
if (false) {
    /**
     * Returns the short weekday name to display in the heading of the month view.
     *
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
     * @abstract
     * @param {?} weekday
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getWeekdayShortName = function (weekday) { };
    /**
     * Returns the short month name to display in the date picker navigation.
     *
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * @abstract
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getMonthShortName = function (month, year) { };
    /**
     * Returns the full month name to display in the date picker navigation.
     *
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * @abstract
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getMonthFullName = function (month, year) { };
    /**
     * Returns the value of the `aria-label` attribute for a specific date.
     *
     * \@since 2.0.0
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getDayAriaLabel = function (date) { };
}
export class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    /**
     * @param {?} _locale
     */
    constructor(_locale) {
        super();
        this._locale = _locale;
        /** @type {?} */
        const weekdaysStartingOnSunday = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
        this._weekdaysShort = weekdaysStartingOnSunday.map((/**
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        (day, index) => weekdaysStartingOnSunday[(index + 1) % 7]));
        this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return this._weekdaysShort[weekday - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthShortName(month) { return this._monthsShort[month - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthFullName(month) { return this._monthsFull[month - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
}
NgbDatepickerI18nDefault.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerI18nDefault.prototype._weekdaysShort;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerI18nDefault.prototype._monthsShort;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerI18nDefault.prototype._monthsFull;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerI18nDefault.prototype._locale;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUdoSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsTUFBTTtJQUMvQyxPQUFPLElBQUksd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELE1BQU0sT0FBZ0IsaUJBQWlCOzs7Ozs7OztJQWtDckMsY0FBYyxDQUFDLElBQW1CLElBQVksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBT3JFLGVBQWUsQ0FBQyxVQUFrQixJQUFZLE9BQU8sR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBT3ZFLGVBQWUsQ0FBQyxJQUFZLElBQVksT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7O1lBakQ1RCxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSwwQkFBMEIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7O0lBT3pGLHlFQUFzRDs7Ozs7Ozs7OztJQU90RCwyRUFBaUU7Ozs7Ozs7Ozs7SUFPakUsMEVBQWdFOzs7Ozs7Ozs7SUFPaEUsa0VBQXNEOztBQXlCeEQsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGlCQUFpQjs7OztJQUs3RCxZQUF1QyxPQUFlO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRDZCLFlBQU8sR0FBUCxPQUFPLENBQVE7O2NBRzlDLHdCQUF3QixHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUN6RyxJQUFJLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDLEdBQUc7Ozs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBRTlHLElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRixDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLE9BQWUsSUFBWSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFekYsaUJBQWlCLENBQUMsS0FBYSxJQUFZLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUVqRixnQkFBZ0IsQ0FBQyxLQUFhLElBQVksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRS9FLGVBQWUsQ0FBQyxJQUFtQjs7Y0FDM0IsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM1RCxPQUFPLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7WUF6QkYsVUFBVTs7Ozt5Q0FNSSxNQUFNLFNBQUMsU0FBUzs7Ozs7OztJQUo3QixrREFBc0M7Ozs7O0lBQ3RDLGdEQUFvQzs7Ozs7SUFDcEMsK0NBQW1DOzs7OztJQUV2QiwyQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybVN0eWxlLCBnZXRMb2NhbGVEYXlOYW1lcywgZ2V0TG9jYWxlTW9udGhOYW1lcywgVHJhbnNsYXRpb25XaWR0aCwgZm9ybWF0RGF0ZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlkobG9jYWxlKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0KGxvY2FsZSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHN1cHBseWluZyBpMThuIGRhdGEgdG8gdGhlIGRhdGVwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgc2VydmljZSB1c2VzIHRoZSBBbmd1bGFyIGxvY2FsZSBhbmQgcmVnaXN0ZXJlZCBsb2NhbGUgZGF0YSBmb3JcbiAqIHdlZWtkYXlzIGFuZCBtb250aCBuYW1lcyAoYXMgZXhwbGFpbmVkIGluIHRoZSBBbmd1bGFyIGkxOG4gZ3VpZGUpLlxuICpcbiAqIEl0IGFsc28gcHJvdmlkZXMgYSB3YXkgdG8gaTE4biBkYXRhIHRoYXQgZGVwZW5kcyBvbiBjYWxlbmRhciBjYWxjdWxhdGlvbnMsIGxpa2UgYXJpYSBsYWJlbHMsIGRheSwgd2VlayBhbmQgeWVhclxuICogbnVtZXJhbHMuIEZvciBvdGhlciBzdGF0aWMgbGFiZWxzIHRoZSBkYXRlcGlja2VyIHVzZXMgdGhlIGRlZmF1bHQgQW5ndWxhciBpMThuLlxuICpcbiAqIFNlZSB0aGUgW2kxOG4gZGVtb10oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZXhhbXBsZXMjaTE4bikgYW5kXG4gKiBbSGVicmV3IGNhbGVuZGFyIGRlbW9dKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2NhbGVuZGFycyNoZWJyZXcpIG9uIGhvdyB0byBleHRlbmQgdGhpcyBjbGFzcyBhbmQgZGVmaW5lXG4gKiBhIGN1c3RvbSBwcm92aWRlciBmb3IgaTE4bi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlksIGRlcHM6IFtMT0NBTEVfSURdfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4biB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzaG9ydCB3ZWVrZGF5IG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGluZyBvZiB0aGUgbW9udGggdmlldy5cbiAgICpcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1bi5cbiAgICovXG4gIGFic3RyYWN0IGdldFdlZWtkYXlTaG9ydE5hbWUod2Vla2RheTogbnVtYmVyKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzaG9ydCBtb250aCBuYW1lIHRvIGRpc3BsYXkgaW4gdGhlIGRhdGUgcGlja2VyIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICovXG4gIGFic3RyYWN0IGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZ1bGwgbW9udGggbmFtZSB0byBkaXNwbGF5IGluIHRoZSBkYXRlIHBpY2tlciBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgYXJpYS1sYWJlbGAgYXR0cmlidXRlIGZvciBhIHNwZWNpZmljIGRhdGUuXG4gICAqXG4gICAqIEBzaW5jZSAyLjAuMFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBkYXkgdGhhdCBpcyByZW5kZXJlZCBpbiBhIGRheSBjZWxsLlxuICAgKlxuICAgKiBAc2luY2UgMy4wLjBcbiAgICovXG4gIGdldERheU51bWVyYWxzKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcgeyByZXR1cm4gYCR7ZGF0ZS5kYXl9YDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgd2VlayBudW1iZXIgcmVuZGVyZWQgYnkgZGF0ZXBpY2tlci5cbiAgICpcbiAgICogQHNpbmNlIDMuMC4wXG4gICAqL1xuICBnZXRXZWVrTnVtZXJhbHMod2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGAke3dlZWtOdW1iZXJ9YDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhciB0aGF0IGlzIHJlbmRlcmVkIGluIHRoZSBkYXRlcGlja2VyIHllYXIgc2VsZWN0IGJveC5cbiAgICpcbiAgICogQHNpbmNlIDMuMC4wXG4gICAqL1xuICBnZXRZZWFyTnVtZXJhbHMoeWVhcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGAke3llYXJ9YDsgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xuICBwcml2YXRlIF93ZWVrZGF5c1Nob3J0OiBBcnJheTxzdHJpbmc+O1xuICBwcml2YXRlIF9tb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbW9udGhzRnVsbDogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3Qgd2Vla2RheXNTdGFydGluZ09uU3VuZGF5ID0gZ2V0TG9jYWxlRGF5TmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguU2hvcnQpO1xuICAgIHRoaXMuX3dlZWtkYXlzU2hvcnQgPSB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXkubWFwKChkYXksIGluZGV4KSA9PiB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXlbKGluZGV4ICsgMSkgJSA3XSk7XG5cbiAgICB0aGlzLl9tb250aHNTaG9ydCA9IGdldExvY2FsZU1vbnRoTmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQpO1xuICAgIHRoaXMuX21vbnRoc0Z1bGwgPSBnZXRMb2NhbGVNb250aE5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpO1xuICB9XG5cbiAgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFt3ZWVrZGF5IC0gMV07IH1cblxuICBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0W21vbnRoIC0gMV07IH1cblxuICBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbW9udGhzRnVsbFttb250aCAtIDFdOyB9XG5cbiAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xuICAgIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KTtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShqc0RhdGUsICdmdWxsRGF0ZScsIHRoaXMuX2xvY2FsZSk7XG4gIH1cbn1cbiJdfQ==