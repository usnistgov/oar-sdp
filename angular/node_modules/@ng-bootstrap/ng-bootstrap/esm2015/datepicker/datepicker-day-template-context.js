/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The context for the datepicker 'day' template.
 *
 * You can override the way dates are displayed in the datepicker via the `[dayTemplate]` input.
 * @record
 */
export function DayTemplateContext() { }
if (false) {
    /**
     * The date that corresponds to the template. Same as the `date` parameter.
     *
     * Can be used for convenience as a default template key, ex. `let-d`.
     *
     * \@since 3.3.0
     * @type {?}
     */
    DayTemplateContext.prototype.$implicit;
    /**
     * The month currently displayed by the datepicker.
     * @type {?}
     */
    DayTemplateContext.prototype.currentMonth;
    /**
     * The year currently displayed by the datepicker.
     *
     * \@since 5.2.0
     * @type {?}
     */
    DayTemplateContext.prototype.currentYear;
    /**
     * Any data you pass using the `[dayTemplateData]` input in the datepicker.
     *
     * \@since 3.3.0
     * @type {?|undefined}
     */
    DayTemplateContext.prototype.data;
    /**
     * The date that corresponds to the template.
     * @type {?}
     */
    DayTemplateContext.prototype.date;
    /**
     * `True` if the current date is disabled.
     * @type {?}
     */
    DayTemplateContext.prototype.disabled;
    /**
     * `True` if the current date is focused.
     * @type {?}
     */
    DayTemplateContext.prototype.focused;
    /**
     * `True` if the current date is selected.
     * @type {?}
     */
    DayTemplateContext.prototype.selected;
    /**
     * `True` if the current date is today (equal to `NgbCalendar.getToday()`).
     *
     * \@since 4.1.0
     * @type {?}
     */
    DayTemplateContext.prototype.today;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSx3Q0F1REM7Ozs7Ozs7Ozs7SUEvQ0MsdUNBQW1COzs7OztJQUtuQiwwQ0FBcUI7Ozs7Ozs7SUFPckIseUNBQW9COzs7Ozs7O0lBT3BCLGtDQUFXOzs7OztJQUtYLGtDQUFjOzs7OztJQUtkLHNDQUFrQjs7Ozs7SUFLbEIscUNBQWlCOzs7OztJQUtqQixzQ0FBa0I7Ozs7Ozs7SUFPbEIsbUNBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuLyoqXG4gKiBUaGUgY29udGV4dCBmb3IgdGhlIGRhdGVwaWNrZXIgJ2RheScgdGVtcGxhdGUuXG4gKlxuICogWW91IGNhbiBvdmVycmlkZSB0aGUgd2F5IGRhdGVzIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIGRhdGVwaWNrZXIgdmlhIHRoZSBgW2RheVRlbXBsYXRlXWAgaW5wdXQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF5VGVtcGxhdGVDb250ZXh0IHtcbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHRlbXBsYXRlLiBTYW1lIGFzIHRoZSBgZGF0ZWAgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBmb3IgY29udmVuaWVuY2UgYXMgYSBkZWZhdWx0IHRlbXBsYXRlIGtleSwgZXguIGBsZXQtZGAuXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgJGltcGxpY2l0OiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlci5cbiAgICovXG4gIGN1cnJlbnRNb250aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgeWVhciBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyLlxuICAgKlxuICAgKiBAc2luY2UgNS4yLjBcbiAgICovXG4gIGN1cnJlbnRZZWFyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEFueSBkYXRhIHlvdSBwYXNzIHVzaW5nIHRoZSBgW2RheVRlbXBsYXRlRGF0YV1gIGlucHV0IGluIHRoZSBkYXRlcGlja2VyLlxuICAgKlxuICAgKiBAc2luY2UgMy4zLjBcbiAgICovXG4gIGRhdGE/OiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgZGF0ZTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogYFRydWVgIGlmIHRoZSBjdXJyZW50IGRhdGUgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogYFRydWVgIGlmIHRoZSBjdXJyZW50IGRhdGUgaXMgZm9jdXNlZC5cbiAgICovXG4gIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGBUcnVlYCBpZiB0aGUgY3VycmVudCBkYXRlIGlzIHNlbGVjdGVkLlxuICAgKi9cbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGBUcnVlYCBpZiB0aGUgY3VycmVudCBkYXRlIGlzIHRvZGF5IChlcXVhbCB0byBgTmdiQ2FsZW5kYXIuZ2V0VG9kYXkoKWApLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIHRvZGF5OiBib29sZWFuO1xufVxuIl19