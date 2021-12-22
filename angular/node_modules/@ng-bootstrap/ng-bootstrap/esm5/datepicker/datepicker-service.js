/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var NgbDatepickerService = /** @class */ (function () {
    function NgbDatepickerService(_calendar, _i18n) {
        var _this = this;
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._VALIDATORS = {
            dayTemplateData: (/**
             * @param {?} dayTemplateData
             * @return {?}
             */
            function (dayTemplateData) {
                if (_this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData: dayTemplateData };
                }
            }),
            displayMonths: (/**
             * @param {?} displayMonths
             * @return {?}
             */
            function (displayMonths) {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && _this._state.displayMonths !== displayMonths) {
                    return { displayMonths: displayMonths };
                }
            }),
            disabled: (/**
             * @param {?} disabled
             * @return {?}
             */
            function (disabled) {
                if (_this._state.disabled !== disabled) {
                    return { disabled: disabled };
                }
            }),
            firstDayOfWeek: (/**
             * @param {?} firstDayOfWeek
             * @return {?}
             */
            function (firstDayOfWeek) {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && _this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek: firstDayOfWeek };
                }
            }),
            focusVisible: (/**
             * @param {?} focusVisible
             * @return {?}
             */
            function (focusVisible) {
                if (_this._state.focusVisible !== focusVisible && !_this._state.disabled) {
                    return { focusVisible: focusVisible };
                }
            }),
            markDisabled: (/**
             * @param {?} markDisabled
             * @return {?}
             */
            function (markDisabled) {
                if (_this._state.markDisabled !== markDisabled) {
                    return { markDisabled: markDisabled };
                }
            }),
            maxDate: (/**
             * @param {?} date
             * @return {?}
             */
            function (date) {
                /** @type {?} */
                var maxDate = _this.toValidDate(date, null);
                if (isChangedDate(_this._state.maxDate, maxDate)) {
                    return { maxDate: maxDate };
                }
            }),
            minDate: (/**
             * @param {?} date
             * @return {?}
             */
            function (date) {
                /** @type {?} */
                var minDate = _this.toValidDate(date, null);
                if (isChangedDate(_this._state.minDate, minDate)) {
                    return { minDate: minDate };
                }
            }),
            navigation: (/**
             * @param {?} navigation
             * @return {?}
             */
            function (navigation) {
                if (_this._state.navigation !== navigation) {
                    return { navigation: navigation };
                }
            }),
            outsideDays: (/**
             * @param {?} outsideDays
             * @return {?}
             */
            function (outsideDays) {
                if (_this._state.outsideDays !== outsideDays) {
                    return { outsideDays: outsideDays };
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
    Object.defineProperty(NgbDatepickerService.prototype, "model$", {
        get: /**
         * @return {?}
         */
        function () { return this._model$.pipe(filter((/**
         * @param {?} model
         * @return {?}
         */
        function (model) { return model.months.length > 0; }))); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "dateSelect$", {
        get: /**
         * @return {?}
         */
        function () { return this._dateSelect$.pipe(filter((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return date !== null; }))); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} options
     * @return {?}
     */
    NgbDatepickerService.prototype.set = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        /** @type {?} */
        var patch = Object.keys(options)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return _this._VALIDATORS[key](options[key]); }))
            .reduce((/**
         * @param {?} obj
         * @param {?} part
         * @return {?}
         */
        function (obj, part) { return (tslib_1.__assign({}, obj, part)); }), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerService.prototype.focus = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    };
    /**
     * @return {?}
     */
    NgbDatepickerService.prototype.focusSelect = /**
     * @return {?}
     */
    function () {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerService.prototype.open = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled && (!this._state.firstDate || isChangedMonth(this._state.firstDate, date))) {
            this._nextState({ firstDate: firstDate });
        }
    };
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    NgbDatepickerService.prototype.select = /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    function (date, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate: selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    };
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    NgbDatepickerService.prototype.toValidDate = /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    function (date, defaultValue) {
        /** @type {?} */
        var ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    };
    /**
     * @param {?} struct
     * @return {?}
     */
    NgbDatepickerService.prototype.getMonth = /**
     * @param {?} struct
     * @return {?}
     */
    function (struct) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this._state.months), _c = _b.next(); !_c.done; _c = _b.next()) {
                var month = _c.value;
                if (struct.month === month.number && struct.year === month.year) {
                    return month;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error("month " + struct.month + " of year " + struct.year + " not found");
    };
    /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    NgbDatepickerService.prototype._nextState = /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    function (patch) {
        /** @type {?} */
        var newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    NgbDatepickerService.prototype._patchContexts = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var months = state.months, displayMonths = state.displayMonths, selectedDate = state.selectedDate, focusDate = state.focusDate, focusVisible = state.focusVisible, disabled = state.disabled, outsideDays = state.outsideDays;
        state.months.forEach((/**
         * @param {?} month
         * @return {?}
         */
        function (month) {
            month.weeks.forEach((/**
             * @param {?} week
             * @return {?}
             */
            function (week) {
                week.days.forEach((/**
                 * @param {?} day
                 * @return {?}
                 */
                function (day) {
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
    };
    /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    NgbDatepickerService.prototype._updateState = /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    function (patch) {
        // patching fields
        /** @type {?} */
        var state = Object.assign({}, this._state, patch);
        /** @type {?} */
        var startDate = state.firstDate;
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
            var forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            var months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
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
            var yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            var monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
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
    };
    NgbDatepickerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgbDatepickerService.ctorParameters = function () { return [
        { type: NgbCalendar },
        { type: NgbDatepickerI18n }
    ]; };
    return NgbDatepickerService;
}());
export { NgbDatepickerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBR25DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbEQsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQ0wsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRXBELDZDQUVnSDtBQUVoSDtJQTRGRSw4QkFBb0IsU0FBc0IsRUFBVSxLQUF3QjtRQUE1RSxpQkFBZ0Y7UUFBNUQsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBMUZwRSxnQkFBVyxHQUMyRjtZQUN4RyxlQUFlOzs7O1lBQUUsVUFBQyxlQUFtQztnQkFDbkQsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxlQUFlLEVBQUU7b0JBQ25ELE9BQU8sRUFBQyxlQUFlLGlCQUFBLEVBQUMsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENB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QkgsV0FBVztnQkFxQlgsaUJBQWlCOztJQW1TekIsMkJBQUM7Q0FBQSxBQTdSRCxJQTZSQztTQTVSWSxvQkFBb0I7Ozs7OztJQUMvQiwyQ0F3RE07Ozs7O0lBRU4sdUNBQXFEOzs7OztJQUVyRCw0Q0FBOEM7Ozs7O0lBRTlDLHNDQVlFOzs7OztJQWdCVSx5Q0FBOEI7Ozs7O0lBQUUscUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBOZ2JEYXlUZW1wbGF0ZURhdGEsIE5nYk1hcmtEaXNhYmxlZH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNJbnRlZ2VyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgYnVpbGRNb250aHMsXG4gIGNoZWNrRGF0ZUluUmFuZ2UsXG4gIGNoZWNrTWluQmVmb3JlTWF4LFxuICBpc0NoYW5nZWREYXRlLFxuICBpc0NoYW5nZWRNb250aCxcbiAgaXNEYXRlU2VsZWN0YWJsZSxcbiAgZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyxcbiAgZ2VuZXJhdGVTZWxlY3RCb3hNb250aHMsXG4gIHByZXZNb250aERpc2FibGVkLFxuICBuZXh0TW9udGhEaXNhYmxlZFxufSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xuXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzIGV4dGVuZHNcbiAgICBQYXJ0aWFsPFBpY2s8RGF0ZXBpY2tlclZpZXdNb2RlbCwgJ2RheVRlbXBsYXRlRGF0YScgfCAnZGlzcGxheU1vbnRocycgfCAnZGlzYWJsZWQnIHwgJ2ZpcnN0RGF5T2ZXZWVrJyB8XG4gICAgICAgICAgICAgICAgICAgICAnZm9jdXNWaXNpYmxlJyB8ICdtYXJrRGlzYWJsZWQnIHwgJ21heERhdGUnIHwgJ21pbkRhdGUnIHwgJ25hdmlnYXRpb24nIHwgJ291dHNpZGVEYXlzJz4+IHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyU2VydmljZSB7XG4gIHByaXZhdGUgX1ZBTElEQVRPUlM6XG4gICAgICB7W0sgaW4ga2V5b2YgRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHNdOiAodjogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHNbS10pID0+IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD59ID0ge1xuICAgICAgICBkYXlUZW1wbGF0ZURhdGE6IChkYXlUZW1wbGF0ZURhdGE6IE5nYkRheVRlbXBsYXRlRGF0YSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5kYXlUZW1wbGF0ZURhdGEgIT09IGRheVRlbXBsYXRlRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHtkYXlUZW1wbGF0ZURhdGF9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzcGxheU1vbnRoczogKGRpc3BsYXlNb250aHM6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGRpc3BsYXlNb250aHMgPSB0b0ludGVnZXIoZGlzcGxheU1vbnRocyk7XG4gICAgICAgICAgaWYgKGlzSW50ZWdlcihkaXNwbGF5TW9udGhzKSAmJiBkaXNwbGF5TW9udGhzID4gMCAmJiB0aGlzLl9zdGF0ZS5kaXNwbGF5TW9udGhzICE9PSBkaXNwbGF5TW9udGhzKSB7XG4gICAgICAgICAgICByZXR1cm4ge2Rpc3BsYXlNb250aHN9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzYWJsZWQ6IChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7ZGlzYWJsZWR9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmlyc3REYXlPZldlZWs6IChmaXJzdERheU9mV2VlazogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgZmlyc3REYXlPZldlZWsgPSB0b0ludGVnZXIoZmlyc3REYXlPZldlZWspO1xuICAgICAgICAgIGlmIChpc0ludGVnZXIoZmlyc3REYXlPZldlZWspICYmIGZpcnN0RGF5T2ZXZWVrID49IDAgJiYgdGhpcy5fc3RhdGUuZmlyc3REYXlPZldlZWsgIT09IGZpcnN0RGF5T2ZXZWVrKSB7XG4gICAgICAgICAgICByZXR1cm4ge2ZpcnN0RGF5T2ZXZWVrfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzVmlzaWJsZTogKGZvY3VzVmlzaWJsZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5mb2N1c1Zpc2libGUgIT09IGZvY3VzVmlzaWJsZSAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7Zm9jdXNWaXNpYmxlfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtEaXNhYmxlZDogKG1hcmtEaXNhYmxlZDogTmdiTWFya0Rpc2FibGVkKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLm1hcmtEaXNhYmxlZCAhPT0gbWFya0Rpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge21hcmtEaXNhYmxlZH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXhEYXRlOiAoZGF0ZTogTmdiRGF0ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgICAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLm1heERhdGUsIG1heERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge21heERhdGV9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWluRGF0ZTogKGRhdGU6IE5nYkRhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBtaW5EYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHttaW5EYXRlfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5hdmlnYXRpb246IChuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLm5hdmlnYXRpb24gIT09IG5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7bmF2aWdhdGlvbn07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvdXRzaWRlRGF5czogKG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLm91dHNpZGVEYXlzICE9PSBvdXRzaWRlRGF5cykge1xuICAgICAgICAgICAgcmV0dXJuIHtvdXRzaWRlRGF5c307XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gIHByaXZhdGUgX21vZGVsJCA9IG5ldyBTdWJqZWN0PERhdGVwaWNrZXJWaWV3TW9kZWw+KCk7XG5cbiAgcHJpdmF0ZSBfZGF0ZVNlbGVjdCQgPSBuZXcgU3ViamVjdDxOZ2JEYXRlPigpO1xuXG4gIHByaXZhdGUgX3N0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBkaXNwbGF5TW9udGhzOiAxLFxuICAgIGZpcnN0RGF5T2ZXZWVrOiAxLFxuICAgIGZvY3VzVmlzaWJsZTogZmFsc2UsXG4gICAgbW9udGhzOiBbXSxcbiAgICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyxcbiAgICBvdXRzaWRlRGF5czogJ3Zpc2libGUnLFxuICAgIHByZXZEaXNhYmxlZDogZmFsc2UsXG4gICAgbmV4dERpc2FibGVkOiBmYWxzZSxcbiAgICBzZWxlY3RCb3hlczoge3llYXJzOiBbXSwgbW9udGhzOiBbXX0sXG4gICAgc2VsZWN0ZWREYXRlOiBudWxsXG4gIH07XG5cbiAgZ2V0IG1vZGVsJCgpOiBPYnNlcnZhYmxlPERhdGVwaWNrZXJWaWV3TW9kZWw+IHsgcmV0dXJuIHRoaXMuX21vZGVsJC5waXBlKGZpbHRlcihtb2RlbCA9PiBtb2RlbC5tb250aHMubGVuZ3RoID4gMCkpOyB9XG5cbiAgZ2V0IGRhdGVTZWxlY3QkKCk6IE9ic2VydmFibGU8TmdiRGF0ZT4geyByZXR1cm4gdGhpcy5fZGF0ZVNlbGVjdCQucGlwZShmaWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSBudWxsKSk7IH1cblxuICBzZXQob3B0aW9uczogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMpIHtcbiAgICBsZXQgcGF0Y2ggPSBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGtleSA9PiB0aGlzLl9WQUxJREFUT1JTW2tleV0ob3B0aW9uc1trZXldKSlcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiAoey4uLm9iaiwgLi4ucGFydH0pLCB7fSk7XG5cbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2gpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZShwYXRjaCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIF9pMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBmb2N1cyhkYXRlOiBOZ2JEYXRlKSB7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKGRhdGUpICYmIGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBkYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c0RhdGU6IGRhdGV9KTtcbiAgICB9XG4gIH1cblxuICBmb2N1c1NlbGVjdCgpIHtcbiAgICBpZiAoaXNEYXRlU2VsZWN0YWJsZSh0aGlzLl9zdGF0ZS5mb2N1c0RhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgdGhpcy5zZWxlY3QodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgb3BlbihkYXRlOiBOZ2JEYXRlKSB7XG4gICAgY29uc3QgZmlyc3REYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCB0aGlzLl9jYWxlbmRhci5nZXRUb2RheSgpKTtcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkICYmICghdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IGlzQ2hhbmdlZE1vbnRoKHRoaXMuX3N0YXRlLmZpcnN0RGF0ZSwgZGF0ZSkpKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZpcnN0RGF0ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdChkYXRlOiBOZ2JEYXRlLCBvcHRpb25zOiB7ZW1pdEV2ZW50PzogYm9vbGVhbn0gPSB7fSkge1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUuc2VsZWN0ZWREYXRlLCBzZWxlY3RlZERhdGUpKSB7XG4gICAgICAgIHRoaXMuX25leHRTdGF0ZSh7c2VsZWN0ZWREYXRlfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmVtaXRFdmVudCAmJiBpc0RhdGVTZWxlY3RhYmxlKHNlbGVjdGVkRGF0ZSwgdGhpcy5fc3RhdGUpKSB7XG4gICAgICAgIHRoaXMuX2RhdGVTZWxlY3QkLm5leHQoc2VsZWN0ZWREYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b1ZhbGlkRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0LCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlKTogTmdiRGF0ZSB7XG4gICAgY29uc3QgbmdiRGF0ZSA9IE5nYkRhdGUuZnJvbShkYXRlKTtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIGdldE1vbnRoKHN0cnVjdDogTmdiRGF0ZVN0cnVjdCkge1xuICAgIGZvciAobGV0IG1vbnRoIG9mIHRoaXMuX3N0YXRlLm1vbnRocykge1xuICAgICAgaWYgKHN0cnVjdC5tb250aCA9PT0gbW9udGgubnVtYmVyICYmIHN0cnVjdC55ZWFyID09PSBtb250aC55ZWFyKSB7XG4gICAgICAgIHJldHVybiBtb250aDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtb250aCAke3N0cnVjdC5tb250aH0gb2YgeWVhciAke3N0cnVjdC55ZWFyfSBub3QgZm91bmRgKTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPikge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUocGF0Y2gpO1xuICAgIHRoaXMuX3BhdGNoQ29udGV4dHMobmV3U3RhdGUpO1xuICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XG4gICAgdGhpcy5fbW9kZWwkLm5leHQodGhpcy5fc3RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGF0Y2hDb250ZXh0cyhzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xuICAgIGNvbnN0IHttb250aHMsIGRpc3BsYXlNb250aHMsIHNlbGVjdGVkRGF0ZSwgZm9jdXNEYXRlLCBmb2N1c1Zpc2libGUsIGRpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcbiAgICBzdGF0ZS5tb250aHMuZm9yRWFjaChtb250aCA9PiB7XG4gICAgICBtb250aC53ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xuICAgICAgICB3ZWVrLmRheXMuZm9yRWFjaChkYXkgPT4ge1xuXG4gICAgICAgICAgLy8gcGF0Y2ggZm9jdXMgZmxhZ1xuICAgICAgICAgIGlmIChmb2N1c0RhdGUpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmZvY3VzZWQgPSBmb2N1c0RhdGUuZXF1YWxzKGRheS5kYXRlKSAmJiBmb2N1c1Zpc2libGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGFiaW5kZXhcbiAgICAgICAgICBkYXkudGFiaW5kZXggPSAhZGlzYWJsZWQgJiYgZGF5LmRhdGUuZXF1YWxzKGZvY3VzRGF0ZSkgJiYgZm9jdXNEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgPyAwIDogLTE7XG5cbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcGF0Y2ggc2VsZWN0aW9uIGZsYWdcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LnNlbGVjdGVkID0gc2VsZWN0ZWREYXRlICE9PSBudWxsICYmIHNlbGVjdGVkRGF0ZS5lcXVhbHMoZGF5LmRhdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHZpc2liaWxpdHlcbiAgICAgICAgICBpZiAobW9udGgubnVtYmVyICE9PSBkYXkuZGF0ZS5tb250aCkge1xuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcbiAgICAgICAgICAgICAgICAoZGlzcGxheU1vbnRocyA+IDEgJiYgZGF5LmRhdGUuYWZ0ZXIobW9udGhzWzBdLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xuICAgIC8vIHBhdGNoaW5nIGZpZWxkc1xuICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc3RhdGUsIHBhdGNoKTtcblxuICAgIGxldCBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG5cbiAgICAvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcbiAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgY2hlY2tNaW5CZWZvcmVNYXgoc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZWRcbiAgICBpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbCByZWJ1aWxkIHZpYSAnc2VsZWN0KCknXG4gICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmIHRoaXMuX3N0YXRlLm1vbnRocy5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXJtaW5hdGUgZWFybHkgaWYgb25seSBmb2N1cyB2aXNpYmlsaXR5IHdhcyBjaGFuZ2VkXG4gICAgaWYgKCdmb2N1c1Zpc2libGUnIGluIHBhdGNoKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgLy8gZm9jdXMgZGF0ZSBjaGFuZ2VkXG4gICAgaWYgKCdmb2N1c0RhdGUnIGluIHBhdGNoKSB7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG5cbiAgICAgIC8vIG5vdGhpbmcgdG8gcmVidWlsZCBpZiBvbmx5IGZvY3VzIGNoYW5nZWQgYW5kIGl0IGlzIHN0aWxsIHZpc2libGVcbiAgICAgIGlmIChzdGF0ZS5tb250aHMubGVuZ3RoICE9PSAwICYmICFzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAhc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlyc3QgZGF0ZSBjaGFuZ2VkXG4gICAgaWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG4gICAgfVxuXG4gICAgLy8gcmVidWlsZGluZyBtb250aHNcbiAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICBjb25zdCBmb3JjZVJlYnVpbGQgPSAnZGF5VGVtcGxhdGVEYXRhJyBpbiBwYXRjaCB8fCAnZmlyc3REYXlPZldlZWsnIGluIHBhdGNoIHx8ICdtYXJrRGlzYWJsZWQnIGluIHBhdGNoIHx8XG4gICAgICAgICAgJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoIHx8ICdvdXRzaWRlRGF5cycgaW4gcGF0Y2g7XG5cbiAgICAgIGNvbnN0IG1vbnRocyA9IGJ1aWxkTW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGFydERhdGUsIHN0YXRlLCB0aGlzLl9pMThuLCBmb3JjZVJlYnVpbGQpO1xuXG4gICAgICAvLyB1cGRhdGluZyBtb250aHMgYW5kIGJvdW5kYXJ5IGRhdGVzXG4gICAgICBzdGF0ZS5tb250aHMgPSBtb250aHM7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1swXS5maXJzdERhdGUgOiB1bmRlZmluZWQ7XG4gICAgICBzdGF0ZS5sYXN0RGF0ZSA9IG1vbnRocy5sZW5ndGggPiAwID8gbW9udGhzW21vbnRocy5sZW5ndGggLSAxXS5sYXN0RGF0ZSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgZGF0ZSBpZiAnbWFya0Rpc2FibGVkJyByZXR1cm5zIHRydWVcbiAgICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiAhaXNEYXRlU2VsZWN0YWJsZShzdGF0ZS5zZWxlY3RlZERhdGUsIHN0YXRlKSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgZm9jdXMgYWZ0ZXIgbW9udGhzIHdlcmUgYnVpbHRcbiAgICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgICBpZiAoc3RhdGUuZm9jdXNEYXRlID09PSB1bmRlZmluZWQgfHwgc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpIHx8XG4gICAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XG4gICAgICAgICAgc3RhdGUuZm9jdXNEYXRlID0gc3RhcnREYXRlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGFkanVzdGluZyBtb250aHMveWVhcnMgZm9yIHRoZSBzZWxlY3QgYm94IG5hdmlnYXRpb25cbiAgICAgIGNvbnN0IHllYXJDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUueWVhciAhPT0gc3RhdGUuZmlyc3REYXRlLnllYXI7XG4gICAgICBjb25zdCBtb250aENoYW5nZWQgPSAhdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IHRoaXMuX3N0YXRlLmZpcnN0RGF0ZS5tb250aCAhPT0gc3RhdGUuZmlyc3REYXRlLm1vbnRoO1xuICAgICAgaWYgKHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIC8vIHllYXJzIC0+ICBib3VuZGFyaWVzIChtaW4vbWF4IHdlcmUgY2hhbmdlZClcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMubGVuZ3RoID09PSAwIHx8IHllYXJDaGFuZ2VkKSB7XG4gICAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMgPSBnZW5lcmF0ZVNlbGVjdEJveFllYXJzKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb250aHMgLT4gd2hlbiBjdXJyZW50IHllYXIgb3IgYm91bmRhcmllcyBjaGFuZ2VcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocyA9XG4gICAgICAgICAgICAgIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcyA9IHt5ZWFyczogW10sIG1vbnRoczogW119O1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGluZyBuYXZpZ2F0aW9uIGFycm93cyAtPiBib3VuZGFyaWVzIGNoYW5nZSAobWluL21heCkgb3IgbW9udGgveWVhciBjaGFuZ2VzXG4gICAgICBpZiAoKHN0YXRlLm5hdmlnYXRpb24gPT09ICdhcnJvd3MnIHx8IHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSAmJlxuICAgICAgICAgIChtb250aENoYW5nZWQgfHwgeWVhckNoYW5nZWQgfHwgJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoKSkge1xuICAgICAgICBzdGF0ZS5wcmV2RGlzYWJsZWQgPSBzdGF0ZS5kaXNhYmxlZCB8fCBwcmV2TW9udGhEaXNhYmxlZCh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlKTtcbiAgICAgICAgc3RhdGUubmV4dERpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgbmV4dE1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmxhc3REYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==