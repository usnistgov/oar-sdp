/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, isChangedDate, isChangedMonth, isDateSelectable, generateSelectBoxYears, generateSelectBoxMonths, prevMonthDisabled, nextMonthDisabled } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { NgbDatepickerI18n } from './datepicker-i18n';
/**
 * @record
 */
export function DatepickerServiceInputs() { }
export class NgbDatepickerService {
    /**
     * @param {?} _calendar
     * @param {?} _i18n
     */
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._VALIDATORS = {
            dayTemplateData: (/**
             * @param {?} dayTemplateData
             * @return {?}
             */
            (dayTemplateData) => {
                if (this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData };
                }
            }),
            displayMonths: (/**
             * @param {?} displayMonths
             * @return {?}
             */
            (displayMonths) => {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    return { displayMonths };
                }
            }),
            disabled: (/**
             * @param {?} disabled
             * @return {?}
             */
            (disabled) => {
                if (this._state.disabled !== disabled) {
                    return { disabled };
                }
            }),
            firstDayOfWeek: (/**
             * @param {?} firstDayOfWeek
             * @return {?}
             */
            (firstDayOfWeek) => {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek };
                }
            }),
            focusVisible: (/**
             * @param {?} focusVisible
             * @return {?}
             */
            (focusVisible) => {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    return { focusVisible };
                }
            }),
            markDisabled: (/**
             * @param {?} markDisabled
             * @return {?}
             */
            (markDisabled) => {
                if (this._state.markDisabled !== markDisabled) {
                    return { markDisabled };
                }
            }),
            maxDate: (/**
             * @param {?} date
             * @return {?}
             */
            (date) => {
                /** @type {?} */
                const maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    return { maxDate };
                }
            }),
            minDate: (/**
             * @param {?} date
             * @return {?}
             */
            (date) => {
                /** @type {?} */
                const minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    return { minDate };
                }
            }),
            navigation: (/**
             * @param {?} navigation
             * @return {?}
             */
            (navigation) => {
                if (this._state.navigation !== navigation) {
                    return { navigation };
                }
            }),
            outsideDays: (/**
             * @param {?} outsideDays
             * @return {?}
             */
            (outsideDays) => {
                if (this._state.outsideDays !== outsideDays) {
                    return { outsideDays };
                }
            })
        };
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    /**
     * @return {?}
     */
    get model$() { return this._model$.pipe(filter((/**
     * @param {?} model
     * @return {?}
     */
    model => model.months.length > 0))); }
    /**
     * @return {?}
     */
    get dateSelect$() { return this._dateSelect$.pipe(filter((/**
     * @param {?} date
     * @return {?}
     */
    date => date !== null))); }
    /**
     * @param {?} options
     * @return {?}
     */
    set(options) {
        /** @type {?} */
        let patch = Object.keys(options)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        key => this._VALIDATORS[key](options[key])))
            .reduce((/**
         * @param {?} obj
         * @param {?} part
         * @return {?}
         */
        (obj, part) => (Object.assign({}, obj, part))), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    focus(date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    }
    /**
     * @return {?}
     */
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    open(date) {
        /** @type {?} */
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled && (!this._state.firstDate || isChangedMonth(this._state.firstDate, date))) {
            this._nextState({ firstDate });
        }
    }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    select(date, options = {}) {
        /** @type {?} */
        const selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    }
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    toValidDate(date, defaultValue) {
        /** @type {?} */
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    /**
     * @param {?} struct
     * @return {?}
     */
    getMonth(struct) {
        for (let month of this._state.months) {
            if (struct.month === month.number && struct.year === month.year) {
                return month;
            }
        }
        throw new Error(`month ${struct.month} of year ${struct.year} not found`);
    }
    /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    _nextState(patch) {
        /** @type {?} */
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach((/**
         * @param {?} month
         * @return {?}
         */
        month => {
            month.weeks.forEach((/**
             * @param {?} week
             * @return {?}
             */
            week => {
                week.days.forEach((/**
                 * @param {?} day
                 * @return {?}
                 */
                day => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                }));
            }));
        }));
    }
    /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    _updateState(patch) {
        // patching fields
        /** @type {?} */
        const state = Object.assign({}, this._state, patch);
        /** @type {?} */
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            const forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            /** @type {?} */
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
}
NgbDatepickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerService.ctorParameters = () => [
    { type: NgbCalendar },
    { type: NgbDatepickerI18n }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerService.prototype._VALIDATORS;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerService.prototype._model$;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerService.prototype._dateSelect$;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerService.prototype._state;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerService.prototype._calendar;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerService.prototype._i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDbEIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFFcEQsNkNBRWdIO0FBR2hILE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBMkYvQixZQUFvQixTQUFzQixFQUFVLEtBQXdCO1FBQXhELGNBQVMsR0FBVCxTQUFTLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQTFGcEUsZ0JBQVcsR0FDMkY7WUFDeEcsZUFBZTs7OztZQUFFLENBQUMsZUFBbUMsRUFBRSxFQUFFO2dCQUN2RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxLQUFLLGVBQWUsRUFBRTtvQkFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDO2lCQUMxQjtZ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bGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmdiRGF5VGVtcGxhdGVEYXRhLCBOZ2JNYXJrRGlzYWJsZWR9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzSW50ZWdlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGJ1aWxkTW9udGhzLFxuICBjaGVja0RhdGVJblJhbmdlLFxuICBjaGVja01pbkJlZm9yZU1heCxcbiAgaXNDaGFuZ2VkRGF0ZSxcbiAgaXNDaGFuZ2VkTW9udGgsXG4gIGlzRGF0ZVNlbGVjdGFibGUsXG4gIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMsXG4gIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzLFxuICBwcmV2TW9udGhEaXNhYmxlZCxcbiAgbmV4dE1vbnRoRGlzYWJsZWRcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcblxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRlcGlja2VyU2VydmljZUlucHV0cyBleHRlbmRzXG4gICAgUGFydGlhbDxQaWNrPERhdGVwaWNrZXJWaWV3TW9kZWwsICdkYXlUZW1wbGF0ZURhdGEnIHwgJ2Rpc3BsYXlNb250aHMnIHwgJ2Rpc2FibGVkJyB8ICdmaXJzdERheU9mV2VlaycgfFxuICAgICAgICAgICAgICAgICAgICAgJ2ZvY3VzVmlzaWJsZScgfCAnbWFya0Rpc2FibGVkJyB8ICdtYXhEYXRlJyB8ICdtaW5EYXRlJyB8ICduYXZpZ2F0aW9uJyB8ICdvdXRzaWRlRGF5cyc+PiB7fVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlclNlcnZpY2Uge1xuICBwcml2YXRlIF9WQUxJREFUT1JTOlxuICAgICAge1tLIGluIGtleW9mIERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzXTogKHY6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzW0tdKSA9PiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+fSA9IHtcbiAgICAgICAgZGF5VGVtcGxhdGVEYXRhOiAoZGF5VGVtcGxhdGVEYXRhOiBOZ2JEYXlUZW1wbGF0ZURhdGEpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZGF5VGVtcGxhdGVEYXRhICE9PSBkYXlUZW1wbGF0ZURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB7ZGF5VGVtcGxhdGVEYXRhfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3BsYXlNb250aHM6IChkaXNwbGF5TW9udGhzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICBkaXNwbGF5TW9udGhzID0gdG9JbnRlZ2VyKGRpc3BsYXlNb250aHMpO1xuICAgICAgICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xuICAgICAgICAgICAgcmV0dXJuIHtkaXNwbGF5TW9udGhzfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZGlzYWJsZWQgIT09IGRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge2Rpc2FibGVkfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiAoZmlyc3REYXlPZldlZWs6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrID0gdG9JbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKTtcbiAgICAgICAgICBpZiAoaXNJbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKSAmJiBmaXJzdERheU9mV2VlayA+PSAwICYmIHRoaXMuX3N0YXRlLmZpcnN0RGF5T2ZXZWVrICE9PSBmaXJzdERheU9mV2Vlaykge1xuICAgICAgICAgICAgcmV0dXJuIHtmaXJzdERheU9mV2Vla307XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmb2N1c1Zpc2libGU6IChmb2N1c1Zpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZm9jdXNWaXNpYmxlICE9PSBmb2N1c1Zpc2libGUgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge2ZvY3VzVmlzaWJsZX07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXJrRGlzYWJsZWQ6IChtYXJrRGlzYWJsZWQ6IE5nYk1hcmtEaXNhYmxlZCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5tYXJrRGlzYWJsZWQgIT09IG1hcmtEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHttYXJrRGlzYWJsZWR9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWF4RGF0ZTogKGRhdGU6IE5nYkRhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBtYXhEYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5tYXhEYXRlLCBtYXhEYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHttYXhEYXRlfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1pbkRhdGU6IChkYXRlOiBOZ2JEYXRlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWluRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWluRGF0ZSwgbWluRGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7bWluRGF0ZX07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBuYXZpZ2F0aW9uOiAobmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4ge25hdmlnYXRpb259O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3V0c2lkZURheXM6IChvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5vdXRzaWRlRGF5cyAhPT0gb3V0c2lkZURheXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7b3V0c2lkZURheXN9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICBwcml2YXRlIF9tb2RlbCQgPSBuZXcgU3ViamVjdDxEYXRlcGlja2VyVmlld01vZGVsPigpO1xuXG4gIHByaXZhdGUgX2RhdGVTZWxlY3QkID0gbmV3IFN1YmplY3Q8TmdiRGF0ZT4oKTtcblxuICBwcml2YXRlIF9zdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZGlzcGxheU1vbnRoczogMSxcbiAgICBmaXJzdERheU9mV2VlazogMSxcbiAgICBmb2N1c1Zpc2libGU6IGZhbHNlLFxuICAgIG1vbnRoczogW10sXG4gICAgbmF2aWdhdGlvbjogJ3NlbGVjdCcsXG4gICAgb3V0c2lkZURheXM6ICd2aXNpYmxlJyxcbiAgICBwcmV2RGlzYWJsZWQ6IGZhbHNlLFxuICAgIG5leHREaXNhYmxlZDogZmFsc2UsXG4gICAgc2VsZWN0Qm94ZXM6IHt5ZWFyczogW10sIG1vbnRoczogW119LFxuICAgIHNlbGVjdGVkRGF0ZTogbnVsbFxuICB9O1xuXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTxEYXRlcGlja2VyVmlld01vZGVsPiB7IHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIobW9kZWwgPT4gbW9kZWwubW9udGhzLmxlbmd0aCA+IDApKTsgfVxuXG4gIGdldCBkYXRlU2VsZWN0JCgpOiBPYnNlcnZhYmxlPE5nYkRhdGU+IHsgcmV0dXJuIHRoaXMuX2RhdGVTZWxlY3QkLnBpcGUoZmlsdGVyKGRhdGUgPT4gZGF0ZSAhPT0gbnVsbCkpOyB9XG5cbiAgc2V0KG9wdGlvbnM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzKSB7XG4gICAgbGV0IHBhdGNoID0gT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLm1hcChrZXkgPT4gdGhpcy5fVkFMSURBVE9SU1trZXldKG9wdGlvbnNba2V5XSkpXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKG9iaiwgcGFydCkgPT4gKHsuLi5vYmosIC4uLnBhcnR9KSwge30pO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUocGF0Y2gpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhciwgcHJpdmF0ZSBfaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XG5cbiAgZm9jdXMoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQgJiYgdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChkYXRlKSAmJiBpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgZGF0ZSkpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNEYXRlOiBkYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNTZWxlY3QoKSB7XG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiAoIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCBpc0NoYW5nZWRNb250aCh0aGlzLl9zdGF0ZS5maXJzdERhdGUsIGRhdGUpKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmaXJzdERhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoZGF0ZTogTmdiRGF0ZSwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICB0aGlzLl9uZXh0U3RhdGUoe3NlbGVjdGVkRGF0ZX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgICB0aGlzLl9kYXRlU2VsZWN0JC5uZXh0KHNlbGVjdGVkRGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9WYWxpZERhdGUoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgZGVmYXVsdFZhbHVlPzogTmdiRGF0ZSk6IE5nYkRhdGUge1xuICAgIGNvbnN0IG5nYkRhdGUgPSBOZ2JEYXRlLmZyb20oZGF0ZSk7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLl9jYWxlbmRhci5nZXRUb2RheSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICBnZXRNb250aChzdHJ1Y3Q6IE5nYkRhdGVTdHJ1Y3QpIHtcbiAgICBmb3IgKGxldCBtb250aCBvZiB0aGlzLl9zdGF0ZS5tb250aHMpIHtcbiAgICAgIGlmIChzdHJ1Y3QubW9udGggPT09IG1vbnRoLm51bWJlciAmJiBzdHJ1Y3QueWVhciA9PT0gbW9udGgueWVhcikge1xuICAgICAgICByZXR1cm4gbW9udGg7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgbW9udGggJHtzdHJ1Y3QubW9udGh9IG9mIHllYXIgJHtzdHJ1Y3QueWVhcn0gbm90IGZvdW5kYCk7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0U3RhdGUocGF0Y2g6IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4pIHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlKHBhdGNoKTtcbiAgICB0aGlzLl9wYXRjaENvbnRleHRzKG5ld1N0YXRlKTtcbiAgICB0aGlzLl9zdGF0ZSA9IG5ld1N0YXRlO1xuICAgIHRoaXMuX21vZGVsJC5uZXh0KHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhdGNoQ29udGV4dHMoc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwpIHtcbiAgICBjb25zdCB7bW9udGhzLCBkaXNwbGF5TW9udGhzLCBzZWxlY3RlZERhdGUsIGZvY3VzRGF0ZSwgZm9jdXNWaXNpYmxlLCBkaXNhYmxlZCwgb3V0c2lkZURheXN9ID0gc3RhdGU7XG4gICAgc3RhdGUubW9udGhzLmZvckVhY2gobW9udGggPT4ge1xuICAgICAgbW9udGgud2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcbiAgICAgICAgd2Vlay5kYXlzLmZvckVhY2goZGF5ID0+IHtcblxuICAgICAgICAgIC8vIHBhdGNoIGZvY3VzIGZsYWdcbiAgICAgICAgICBpZiAoZm9jdXNEYXRlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5mb2N1c2VkID0gZm9jdXNEYXRlLmVxdWFscyhkYXkuZGF0ZSkgJiYgZm9jdXNWaXNpYmxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNhbGN1bGF0aW5nIHRhYmluZGV4XG4gICAgICAgICAgZGF5LnRhYmluZGV4ID0gIWRpc2FibGVkICYmIGRheS5kYXRlLmVxdWFscyhmb2N1c0RhdGUpICYmIGZvY3VzRGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyID8gMCA6IC0xO1xuXG4gICAgICAgICAgLy8gb3ZlcnJpZGUgY29udGV4dCBkaXNhYmxlZFxuICAgICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGF5LmNvbnRleHQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHBhdGNoIHNlbGVjdGlvbiBmbGFnXG4gICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5zZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZSAhPT0gbnVsbCAmJiBzZWxlY3RlZERhdGUuZXF1YWxzKGRheS5kYXRlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB2aXNpYmlsaXR5XG4gICAgICAgICAgaWYgKG1vbnRoLm51bWJlciAhPT0gZGF5LmRhdGUubW9udGgpIHtcbiAgICAgICAgICAgIGRheS5oaWRkZW4gPSBvdXRzaWRlRGF5cyA9PT0gJ2hpZGRlbicgfHwgb3V0c2lkZURheXMgPT09ICdjb2xsYXBzZWQnIHx8XG4gICAgICAgICAgICAgICAgKGRpc3BsYXlNb250aHMgPiAxICYmIGRheS5kYXRlLmFmdGVyKG1vbnRoc1swXS5maXJzdERhdGUpICYmXG4gICAgICAgICAgICAgICAgIGRheS5kYXRlLmJlZm9yZShtb250aHNbZGlzcGxheU1vbnRocyAtIDFdLmxhc3REYXRlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3RhdGUocGF0Y2g6IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4pOiBEYXRlcGlja2VyVmlld01vZGVsIHtcbiAgICAvLyBwYXRjaGluZyBmaWVsZHNcbiAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3N0YXRlLCBwYXRjaCk7XG5cbiAgICBsZXQgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xuXG4gICAgLy8gbWluL21heCBkYXRlcyBjaGFuZ2VkXG4gICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgIGNoZWNrTWluQmVmb3JlTWF4KHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xuICAgIH1cblxuICAgIC8vIGRpc2FibGVkXG4gICAgaWYgKCdkaXNhYmxlZCcgaW4gcGF0Y2gpIHtcbiAgICAgIHN0YXRlLmZvY3VzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGluaXRpYWwgcmVidWlsZCB2aWEgJ3NlbGVjdCgpJ1xuICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiB0aGlzLl9zdGF0ZS5tb250aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5zZWxlY3RlZERhdGU7XG4gICAgfVxuXG4gICAgLy8gdGVybWluYXRlIGVhcmx5IGlmIG9ubHkgZm9jdXMgdmlzaWJpbGl0eSB3YXMgY2hhbmdlZFxuICAgIGlmICgnZm9jdXNWaXNpYmxlJyBpbiBwYXRjaCkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIC8vIGZvY3VzIGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZm9jdXNEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xuXG4gICAgICAvLyBub3RoaW5nIHRvIHJlYnVpbGQgaWYgb25seSBmb2N1cyBjaGFuZ2VkIGFuZCBpdCBpcyBzdGlsbCB2aXNpYmxlXG4gICAgICBpZiAoc3RhdGUubW9udGhzLmxlbmd0aCAhPT0gMCAmJiAhc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpICYmXG4gICAgICAgICAgIXN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpcnN0IGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xuICAgIH1cblxuICAgIC8vIHJlYnVpbGRpbmcgbW9udGhzXG4gICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgY29uc3QgZm9yY2VSZWJ1aWxkID0gJ2RheVRlbXBsYXRlRGF0YScgaW4gcGF0Y2ggfHwgJ2ZpcnN0RGF5T2ZXZWVrJyBpbiBwYXRjaCB8fCAnbWFya0Rpc2FibGVkJyBpbiBwYXRjaCB8fFxuICAgICAgICAgICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnb3V0c2lkZURheXMnIGluIHBhdGNoO1xuXG4gICAgICBjb25zdCBtb250aHMgPSBidWlsZE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhcnREYXRlLCBzdGF0ZSwgdGhpcy5faTE4biwgZm9yY2VSZWJ1aWxkKTtcblxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xuICAgICAgc3RhdGUubW9udGhzID0gbW9udGhzO1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gbW9udGhzLmxlbmd0aCA+IDAgPyBtb250aHNbMF0uZmlyc3REYXRlIDogdW5kZWZpbmVkO1xuICAgICAgc3RhdGUubGFzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1ttb250aHMubGVuZ3RoIC0gMV0ubGFzdERhdGUgOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIHJlc2V0IHNlbGVjdGVkIGRhdGUgaWYgJ21hcmtEaXNhYmxlZCcgcmV0dXJucyB0cnVlXG4gICAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgIWlzRGF0ZVNlbGVjdGFibGUoc3RhdGUuc2VsZWN0ZWREYXRlLCBzdGF0ZSkpIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0ZWREYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gYWRqdXN0aW5nIGZvY3VzIGFmdGVyIG1vbnRocyB3ZXJlIGJ1aWx0XG4gICAgICBpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgICAgaWYgKHN0YXRlLmZvY3VzRGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSB8fFxuICAgICAgICAgICAgc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xuICAgICAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgbW9udGhzL3llYXJzIGZvciB0aGUgc2VsZWN0IGJveCBuYXZpZ2F0aW9uXG4gICAgICBjb25zdCB5ZWFyQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLnllYXIgIT09IHN0YXRlLmZpcnN0RGF0ZS55ZWFyO1xuICAgICAgY29uc3QgbW9udGhDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUubW9udGggIT09IHN0YXRlLmZpcnN0RGF0ZS5tb250aDtcbiAgICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0Jykge1xuICAgICAgICAvLyB5ZWFycyAtPiAgYm91bmRhcmllcyAobWluL21heCB3ZXJlIGNoYW5nZWQpXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLnllYXJzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLnllYXJzID0gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9udGhzIC0+IHdoZW4gY3VycmVudCB5ZWFyIG9yIGJvdW5kYXJpZXMgY2hhbmdlXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy5tb250aHMgPVxuICAgICAgICAgICAgICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMgPSB7eWVhcnM6IFtdLCBtb250aHM6IFtdfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRpbmcgbmF2aWdhdGlvbiBhcnJvd3MgLT4gYm91bmRhcmllcyBjaGFuZ2UgKG1pbi9tYXgpIG9yIG1vbnRoL3llYXIgY2hhbmdlc1xuICAgICAgaWYgKChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnYXJyb3dzJyB8fCBzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0JykgJiZcbiAgICAgICAgICAobW9udGhDaGFuZ2VkIHx8IHllYXJDaGFuZ2VkIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCkpIHtcbiAgICAgICAgc3RhdGUucHJldkRpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgcHJldk1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSk7XG4gICAgICAgIHN0YXRlLm5leHREaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IG5leHRNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5sYXN0RGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iXX0=