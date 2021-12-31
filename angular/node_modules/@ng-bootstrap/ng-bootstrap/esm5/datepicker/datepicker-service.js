import { __assign, __decorate, __values } from "tslib";
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, isChangedDate, isChangedMonth, isDateSelectable, generateSelectBoxYears, generateSelectBoxMonths, prevMonthDisabled, nextMonthDisabled } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerService = /** @class */ (function () {
    function NgbDatepickerService(_calendar, _i18n) {
        var _this = this;
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._VALIDATORS = {
            dayTemplateData: function (dayTemplateData) {
                if (_this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData: dayTemplateData };
                }
            },
            displayMonths: function (displayMonths) {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && _this._state.displayMonths !== displayMonths) {
                    return { displayMonths: displayMonths };
                }
            },
            disabled: function (disabled) {
                if (_this._state.disabled !== disabled) {
                    return { disabled: disabled };
                }
            },
            firstDayOfWeek: function (firstDayOfWeek) {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && _this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek: firstDayOfWeek };
                }
            },
            focusVisible: function (focusVisible) {
                if (_this._state.focusVisible !== focusVisible && !_this._state.disabled) {
                    return { focusVisible: focusVisible };
                }
            },
            markDisabled: function (markDisabled) {
                if (_this._state.markDisabled !== markDisabled) {
                    return { markDisabled: markDisabled };
                }
            },
            maxDate: function (date) {
                var maxDate = _this.toValidDate(date, null);
                if (isChangedDate(_this._state.maxDate, maxDate)) {
                    return { maxDate: maxDate };
                }
            },
            minDate: function (date) {
                var minDate = _this.toValidDate(date, null);
                if (isChangedDate(_this._state.minDate, minDate)) {
                    return { minDate: minDate };
                }
            },
            navigation: function (navigation) {
                if (_this._state.navigation !== navigation) {
                    return { navigation: navigation };
                }
            },
            outsideDays: function (outsideDays) {
                if (_this._state.outsideDays !== outsideDays) {
                    return { outsideDays: outsideDays };
                }
            }
        };
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            dayTemplateData: null,
            markDisabled: null,
            maxDate: null,
            minDate: null,
            disabled: false,
            displayMonths: 1,
            firstDate: null,
            firstDayOfWeek: 1,
            lastDate: null,
            focusDate: null,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectedDate: null,
            selectBoxes: { years: [], months: [] }
        };
    }
    Object.defineProperty(NgbDatepickerService.prototype, "model$", {
        get: function () { return this._model$.pipe(filter(function (model) { return model.months.length > 0; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "dateSelect$", {
        get: function () { return this._dateSelect$.pipe(filter(function (date) { return date !== null; })); },
        enumerable: true,
        configurable: true
    });
    NgbDatepickerService.prototype.set = function (options) {
        var _this = this;
        var patch = Object.keys(options)
            .map(function (key) { return _this._VALIDATORS[key](options[key]); })
            .reduce(function (obj, part) { return (__assign(__assign({}, obj), part)); }, {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    };
    NgbDatepickerService.prototype.focus = function (date) {
        var focusedDate = this.toValidDate(date, null);
        if (focusedDate != null && !this._state.disabled && isChangedDate(this._state.focusDate, focusedDate)) {
            this._nextState({ focusDate: date });
        }
    };
    NgbDatepickerService.prototype.focusSelect = function () {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    };
    NgbDatepickerService.prototype.open = function (date) {
        var firstDate = this.toValidDate(date, this._calendar.getToday());
        if (firstDate != null && !this._state.disabled &&
            (!this._state.firstDate || isChangedMonth(this._state.firstDate, firstDate))) {
            this._nextState({ firstDate: firstDate });
        }
    };
    NgbDatepickerService.prototype.select = function (date, options) {
        if (options === void 0) { options = {}; }
        var selectedDate = this.toValidDate(date, null);
        if (selectedDate != null && !this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate: selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    };
    NgbDatepickerService.prototype.toValidDate = function (date, defaultValue) {
        var ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    };
    NgbDatepickerService.prototype.getMonth = function (struct) {
        var e_1, _a;
        try {
            for (var _b = __values(this._state.months), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    NgbDatepickerService.prototype._nextState = function (patch) {
        var newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    };
    NgbDatepickerService.prototype._patchContexts = function (state) {
        var months = state.months, displayMonths = state.displayMonths, selectedDate = state.selectedDate, focusDate = state.focusDate, focusVisible = state.focusVisible, disabled = state.disabled, outsideDays = state.outsideDays;
        state.months.forEach(function (month) {
            month.weeks.forEach(function (week) {
                week.days.forEach(function (day) {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex =
                        !disabled && focusDate && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
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
                });
            });
        });
    };
    NgbDatepickerService.prototype._updateState = function (patch) {
        // patching fields
        var state = Object.assign({}, this._state, patch);
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
            if (state.months.length !== 0 && state.focusDate && !state.focusDate.before(state.firstDate) &&
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
            var forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            var months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months[0].firstDate;
            state.lastDate = months[months.length - 1].lastDate;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (!state.focusDate || state.focusDate.before(state.firstDate) || state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            var yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
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
    NgbDatepickerService.ctorParameters = function () { return [
        { type: NgbCalendar },
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerService = __decorate([
        Injectable()
    ], NgbDatepickerService);
    return NgbDatepickerService;
}());
export { NgbDatepickerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDbEIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFPcEQ7SUFrR0UsOEJBQW9CLFNBQXNCLEVBQVUsS0FBd0I7UUFBNUUsaUJBQWdGO1FBQTVELGNBQVMsR0FBVCxTQUFTLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQWpHcEUsZ0JBQVcsR0FDaUc7WUFDOUcsZUFBZSxFQUFFLFVBQUMsZUFBbUM7Z0JBQ25ELElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssZUFBZSxFQUFFO29CQUNuRCxPQUFPLEVBQUMsZUFBZSxpQkFBQSxFQUFDLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQztZQUNELGFBQWEsRUFBRSxVQUFDLGFBQXFC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QyxDQUFDO2FBQ3pHO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQWxNOEIsV0FBVztnQkFBaUIsaUJBQWlCOztJQWxHakUsb0JBQW9CO1FBRGhDLFVBQVUsRUFBRTtPQUNBLG9CQUFvQixDQXFTaEM7SUFBRCwyQkFBQztDQUFBLEFBclNELElBcVNDO1NBclNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmdiRGF5VGVtcGxhdGVEYXRhLCBOZ2JNYXJrRGlzYWJsZWR9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzSW50ZWdlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGJ1aWxkTW9udGhzLFxuICBjaGVja0RhdGVJblJhbmdlLFxuICBjaGVja01pbkJlZm9yZU1heCxcbiAgaXNDaGFuZ2VkRGF0ZSxcbiAgaXNDaGFuZ2VkTW9udGgsXG4gIGlzRGF0ZVNlbGVjdGFibGUsXG4gIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMsXG4gIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzLFxuICBwcmV2TW9udGhEaXNhYmxlZCxcbiAgbmV4dE1vbnRoRGlzYWJsZWRcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcblxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRlcGlja2VyU2VydmljZUlucHV0cyBleHRlbmRzIFBhcnRpYWw8XG4gICAgUmVxdWlyZWQ8UGljazxEYXRlcGlja2VyVmlld01vZGVsLCAnZGF5VGVtcGxhdGVEYXRhJyB8ICdkaXNwbGF5TW9udGhzJyB8ICdkaXNhYmxlZCcgfCAnZmlyc3REYXlPZldlZWsnIHxcbiAgICAgICAgICAgICAgICAgICAgICAnZm9jdXNWaXNpYmxlJyB8ICdtYXJrRGlzYWJsZWQnIHwgJ21heERhdGUnIHwgJ21pbkRhdGUnIHwgJ25hdmlnYXRpb24nIHwgJ291dHNpZGVEYXlzJz4+PiB7fVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlclNlcnZpY2Uge1xuICBwcml2YXRlIF9WQUxJREFUT1JTOlxuICAgICAge1tLIGluIGtleW9mIERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzXTogKHY6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzW0tdKSA9PiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+fCB2b2lkfSA9IHtcbiAgICAgICAgZGF5VGVtcGxhdGVEYXRhOiAoZGF5VGVtcGxhdGVEYXRhOiBOZ2JEYXlUZW1wbGF0ZURhdGEpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZGF5VGVtcGxhdGVEYXRhICE9PSBkYXlUZW1wbGF0ZURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB7ZGF5VGVtcGxhdGVEYXRhfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3BsYXlNb250aHM6IChkaXNwbGF5TW9udGhzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICBkaXNwbGF5TW9udGhzID0gdG9JbnRlZ2VyKGRpc3BsYXlNb250aHMpO1xuICAgICAgICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xuICAgICAgICAgICAgcmV0dXJuIHtkaXNwbGF5TW9udGhzfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZGlzYWJsZWQgIT09IGRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge2Rpc2FibGVkfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiAoZmlyc3REYXlPZldlZWs6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrID0gdG9JbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKTtcbiAgICAgICAgICBpZiAoaXNJbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKSAmJiBmaXJzdERheU9mV2VlayA+PSAwICYmIHRoaXMuX3N0YXRlLmZpcnN0RGF5T2ZXZWVrICE9PSBmaXJzdERheU9mV2Vlaykge1xuICAgICAgICAgICAgcmV0dXJuIHtmaXJzdERheU9mV2Vla307XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmb2N1c1Zpc2libGU6IChmb2N1c1Zpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZm9jdXNWaXNpYmxlICE9PSBmb2N1c1Zpc2libGUgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge2ZvY3VzVmlzaWJsZX07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtYXJrRGlzYWJsZWQ6IChtYXJrRGlzYWJsZWQ6IE5nYk1hcmtEaXNhYmxlZCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5tYXJrRGlzYWJsZWQgIT09IG1hcmtEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHttYXJrRGlzYWJsZWR9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWF4RGF0ZTogKGRhdGU6IE5nYkRhdGUpID0+IHtcbiAgICAgICAgICBjb25zdCBtYXhEYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5tYXhEYXRlLCBtYXhEYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHttYXhEYXRlfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1pbkRhdGU6IChkYXRlOiBOZ2JEYXRlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWluRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWluRGF0ZSwgbWluRGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7bWluRGF0ZX07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBuYXZpZ2F0aW9uOiAobmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4ge25hdmlnYXRpb259O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3V0c2lkZURheXM6IChvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5vdXRzaWRlRGF5cyAhPT0gb3V0c2lkZURheXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7b3V0c2lkZURheXN9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICBwcml2YXRlIF9tb2RlbCQgPSBuZXcgU3ViamVjdDxEYXRlcGlja2VyVmlld01vZGVsPigpO1xuXG4gIHByaXZhdGUgX2RhdGVTZWxlY3QkID0gbmV3IFN1YmplY3Q8TmdiRGF0ZT4oKTtcblxuICBwcml2YXRlIF9zdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcbiAgICBkYXlUZW1wbGF0ZURhdGE6IG51bGwsXG4gICAgbWFya0Rpc2FibGVkOiBudWxsLFxuICAgIG1heERhdGU6IG51bGwsXG4gICAgbWluRGF0ZTogbnVsbCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZGlzcGxheU1vbnRoczogMSxcbiAgICBmaXJzdERhdGU6IG51bGwsXG4gICAgZmlyc3REYXlPZldlZWs6IDEsXG4gICAgbGFzdERhdGU6IG51bGwsXG4gICAgZm9jdXNEYXRlOiBudWxsLFxuICAgIGZvY3VzVmlzaWJsZTogZmFsc2UsXG4gICAgbW9udGhzOiBbXSxcbiAgICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyxcbiAgICBvdXRzaWRlRGF5czogJ3Zpc2libGUnLFxuICAgIHByZXZEaXNhYmxlZDogZmFsc2UsXG4gICAgbmV4dERpc2FibGVkOiBmYWxzZSxcbiAgICBzZWxlY3RlZERhdGU6IG51bGwsXG4gICAgc2VsZWN0Qm94ZXM6IHt5ZWFyczogW10sIG1vbnRoczogW119XG4gIH07XG5cbiAgZ2V0IG1vZGVsJCgpOiBPYnNlcnZhYmxlPERhdGVwaWNrZXJWaWV3TW9kZWw+IHsgcmV0dXJuIHRoaXMuX21vZGVsJC5waXBlKGZpbHRlcihtb2RlbCA9PiBtb2RlbC5tb250aHMubGVuZ3RoID4gMCkpOyB9XG5cbiAgZ2V0IGRhdGVTZWxlY3QkKCk6IE9ic2VydmFibGU8TmdiRGF0ZT4geyByZXR1cm4gdGhpcy5fZGF0ZVNlbGVjdCQucGlwZShmaWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSBudWxsKSk7IH1cblxuICBzZXQob3B0aW9uczogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMpIHtcbiAgICBsZXQgcGF0Y2ggPSBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGtleSA9PiB0aGlzLl9WQUxJREFUT1JTW2tleV0ob3B0aW9uc1trZXldKSlcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiAoey4uLm9iaiwgLi4ucGFydH0pLCB7fSk7XG5cbiAgICBpZiAoT2JqZWN0LmtleXMocGF0Y2gpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZShwYXRjaCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIF9pMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBmb2N1cyhkYXRlPzogTmdiRGF0ZSB8IG51bGwpIHtcbiAgICBjb25zdCBmb2N1c2VkRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XG4gICAgaWYgKGZvY3VzZWREYXRlICE9IG51bGwgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkICYmIGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBmb2N1c2VkRGF0ZSkpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNEYXRlOiBkYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNTZWxlY3QoKSB7XG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0ZT86IE5nYkRhdGUgfCBudWxsKSB7XG4gICAgY29uc3QgZmlyc3REYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCB0aGlzLl9jYWxlbmRhci5nZXRUb2RheSgpKTtcbiAgICBpZiAoZmlyc3REYXRlICE9IG51bGwgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkICYmXG4gICAgICAgICghdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IGlzQ2hhbmdlZE1vbnRoKHRoaXMuX3N0YXRlLmZpcnN0RGF0ZSwgZmlyc3REYXRlKSkpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zmlyc3REYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KGRhdGU/OiBOZ2JEYXRlIHwgbnVsbCwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmIChzZWxlY3RlZERhdGUgIT0gbnVsbCAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICB0aGlzLl9uZXh0U3RhdGUoe3NlbGVjdGVkRGF0ZX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgICB0aGlzLl9kYXRlU2VsZWN0JC5uZXh0KHNlbGVjdGVkRGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9WYWxpZERhdGUoZGF0ZT86IE5nYkRhdGVTdHJ1Y3QgfCBudWxsLCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlIHwgbnVsbCk6IE5nYkRhdGUgfCBudWxsIHtcbiAgICBjb25zdCBuZ2JEYXRlID0gTmdiRGF0ZS5mcm9tKGRhdGUpO1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmlzVmFsaWQobmdiRGF0ZSkgPyBuZ2JEYXRlIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgZ2V0TW9udGgoc3RydWN0OiBOZ2JEYXRlU3RydWN0KSB7XG4gICAgZm9yIChsZXQgbW9udGggb2YgdGhpcy5fc3RhdGUubW9udGhzKSB7XG4gICAgICBpZiAoc3RydWN0Lm1vbnRoID09PSBtb250aC5udW1iZXIgJiYgc3RydWN0LnllYXIgPT09IG1vbnRoLnllYXIpIHtcbiAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYG1vbnRoICR7c3RydWN0Lm1vbnRofSBvZiB5ZWFyICR7c3RydWN0LnllYXJ9IG5vdCBmb3VuZGApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFN0YXRlKHBhdGNoOiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+KSB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZShwYXRjaCk7XG4gICAgdGhpcy5fcGF0Y2hDb250ZXh0cyhuZXdTdGF0ZSk7XG4gICAgdGhpcy5fc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB0aGlzLl9tb2RlbCQubmV4dCh0aGlzLl9zdGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXRjaENvbnRleHRzKHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XG4gICAgY29uc3Qge21vbnRocywgZGlzcGxheU1vbnRocywgc2VsZWN0ZWREYXRlLCBmb2N1c0RhdGUsIGZvY3VzVmlzaWJsZSwgZGlzYWJsZWQsIG91dHNpZGVEYXlzfSA9IHN0YXRlO1xuICAgIHN0YXRlLm1vbnRocy5mb3JFYWNoKG1vbnRoID0+IHtcbiAgICAgIG1vbnRoLndlZWtzLmZvckVhY2god2VlayA9PiB7XG4gICAgICAgIHdlZWsuZGF5cy5mb3JFYWNoKGRheSA9PiB7XG5cbiAgICAgICAgICAvLyBwYXRjaCBmb2N1cyBmbGFnXG4gICAgICAgICAgaWYgKGZvY3VzRGF0ZSkge1xuICAgICAgICAgICAgZGF5LmNvbnRleHQuZm9jdXNlZCA9IGZvY3VzRGF0ZS5lcXVhbHMoZGF5LmRhdGUpICYmIGZvY3VzVmlzaWJsZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjYWxjdWxhdGluZyB0YWJpbmRleFxuICAgICAgICAgIGRheS50YWJpbmRleCA9XG4gICAgICAgICAgICAgICFkaXNhYmxlZCAmJiBmb2N1c0RhdGUgJiYgZGF5LmRhdGUuZXF1YWxzKGZvY3VzRGF0ZSkgJiYgZm9jdXNEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgPyAwIDogLTE7XG5cbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcGF0Y2ggc2VsZWN0aW9uIGZsYWdcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LnNlbGVjdGVkID0gc2VsZWN0ZWREYXRlICE9PSBudWxsICYmIHNlbGVjdGVkRGF0ZS5lcXVhbHMoZGF5LmRhdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHZpc2liaWxpdHlcbiAgICAgICAgICBpZiAobW9udGgubnVtYmVyICE9PSBkYXkuZGF0ZS5tb250aCkge1xuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcbiAgICAgICAgICAgICAgICAoZGlzcGxheU1vbnRocyA+IDEgJiYgZGF5LmRhdGUuYWZ0ZXIobW9udGhzWzBdLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xuICAgIC8vIHBhdGNoaW5nIGZpZWxkc1xuICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc3RhdGUsIHBhdGNoKTtcblxuICAgIGxldCBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG5cbiAgICAvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcbiAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgY2hlY2tNaW5CZWZvcmVNYXgoc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZWRcbiAgICBpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbCByZWJ1aWxkIHZpYSAnc2VsZWN0KCknXG4gICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmIHRoaXMuX3N0YXRlLm1vbnRocy5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXJtaW5hdGUgZWFybHkgaWYgb25seSBmb2N1cyB2aXNpYmlsaXR5IHdhcyBjaGFuZ2VkXG4gICAgaWYgKCdmb2N1c1Zpc2libGUnIGluIHBhdGNoKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgLy8gZm9jdXMgZGF0ZSBjaGFuZ2VkXG4gICAgaWYgKCdmb2N1c0RhdGUnIGluIHBhdGNoKSB7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG5cbiAgICAgIC8vIG5vdGhpbmcgdG8gcmVidWlsZCBpZiBvbmx5IGZvY3VzIGNoYW5nZWQgYW5kIGl0IGlzIHN0aWxsIHZpc2libGVcbiAgICAgIGlmIChzdGF0ZS5tb250aHMubGVuZ3RoICE9PSAwICYmIHN0YXRlLmZvY3VzRGF0ZSAmJiAhc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpICYmXG4gICAgICAgICAgIXN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpcnN0IGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xuICAgIH1cblxuICAgIC8vIHJlYnVpbGRpbmcgbW9udGhzXG4gICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgY29uc3QgZm9yY2VSZWJ1aWxkID0gJ2RheVRlbXBsYXRlRGF0YScgaW4gcGF0Y2ggfHwgJ2ZpcnN0RGF5T2ZXZWVrJyBpbiBwYXRjaCB8fCAnbWFya0Rpc2FibGVkJyBpbiBwYXRjaCB8fFxuICAgICAgICAgICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnb3V0c2lkZURheXMnIGluIHBhdGNoO1xuXG4gICAgICBjb25zdCBtb250aHMgPSBidWlsZE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhcnREYXRlLCBzdGF0ZSwgdGhpcy5faTE4biwgZm9yY2VSZWJ1aWxkKTtcblxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xuICAgICAgc3RhdGUubW9udGhzID0gbW9udGhzO1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gbW9udGhzWzBdLmZpcnN0RGF0ZTtcbiAgICAgIHN0YXRlLmxhc3REYXRlID0gbW9udGhzW21vbnRocy5sZW5ndGggLSAxXS5sYXN0RGF0ZTtcblxuICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgZGF0ZSBpZiAnbWFya0Rpc2FibGVkJyByZXR1cm5zIHRydWVcbiAgICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiAhaXNEYXRlU2VsZWN0YWJsZShzdGF0ZS5zZWxlY3RlZERhdGUsIHN0YXRlKSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgZm9jdXMgYWZ0ZXIgbW9udGhzIHdlcmUgYnVpbHRcbiAgICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgICBpZiAoIXN0YXRlLmZvY3VzRGF0ZSB8fCBzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgfHwgc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xuICAgICAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgbW9udGhzL3llYXJzIGZvciB0aGUgc2VsZWN0IGJveCBuYXZpZ2F0aW9uXG4gICAgICBjb25zdCB5ZWFyQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLnllYXIgIT09IHN0YXRlLmZpcnN0RGF0ZS55ZWFyO1xuICAgICAgY29uc3QgbW9udGhDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUubW9udGggIT09IHN0YXRlLmZpcnN0RGF0ZS5tb250aDtcbiAgICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0Jykge1xuICAgICAgICAvLyB5ZWFycyAtPiAgYm91bmRhcmllcyAobWluL21heCB3ZXJlIGNoYW5nZWQpXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLnllYXJzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLnllYXJzID0gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9udGhzIC0+IHdoZW4gY3VycmVudCB5ZWFyIG9yIGJvdW5kYXJpZXMgY2hhbmdlXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy5tb250aHMgPVxuICAgICAgICAgICAgICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMgPSB7eWVhcnM6IFtdLCBtb250aHM6IFtdfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRpbmcgbmF2aWdhdGlvbiBhcnJvd3MgLT4gYm91bmRhcmllcyBjaGFuZ2UgKG1pbi9tYXgpIG9yIG1vbnRoL3llYXIgY2hhbmdlc1xuICAgICAgaWYgKChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnYXJyb3dzJyB8fCBzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0JykgJiZcbiAgICAgICAgICAobW9udGhDaGFuZ2VkIHx8IHllYXJDaGFuZ2VkIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCkpIHtcbiAgICAgICAgc3RhdGUucHJldkRpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgcHJldk1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSk7XG4gICAgICAgIHN0YXRlLm5leHREaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IG5leHRNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5sYXN0RGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iXX0=