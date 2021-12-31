import { __assign, __decorate } from "tslib";
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { DatepickerServiceInputs, NgbDatepickerService } from './datepicker-service';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerConfig } from './datepicker-config';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { isChangedDate, isChangedMonth } from './datepicker-tools';
import { hasClassName } from '../util/util';
export var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbDatepicker; }),
    multi: true
};
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
var NgbDatepickerContent = /** @class */ (function () {
    function NgbDatepickerContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbDatepickerContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbDatepickerContent = __decorate([
        Directive({ selector: 'ng-template[ngbDatepickerContent]' })
    ], NgbDatepickerContent);
    return NgbDatepickerContent;
}());
export { NgbDatepickerContent };
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
var NgbDatepicker = /** @class */ (function () {
    function NgbDatepicker(_service, _calendar, i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
        var _this = this;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this._controlValue = null;
        this._destroyed$ = new Subject();
        this._publicState = {};
        /**
         * An event emitted right before the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @deprecated 6.0.0 Please use 'dateSelect' output instead due to collision with native
         * 'select' event.
         */
        this.select = this.dateSelect;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(function (input) { return _this[input] = config[input]; });
        _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe(function (date) { _this.dateSelect.emit(date); });
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(function (model) {
            var newDate = model.firstDate;
            var oldDate = _this.model ? _this.model.firstDate : null;
            // update public state
            _this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map(function (viewModel) { return viewModel.firstDate; })
            };
            var navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                _this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: function () { return navigationPrevented = true; }
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    _this._service.open(oldDate);
                    return;
                }
            }
            var newSelectedDate = model.selectedDate;
            var newFocusedDate = model.focusDate;
            var oldFocusedDate = _this.model ? _this.model.focusDate : null;
            _this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, _this._controlValue)) {
                _this._controlValue = newSelectedDate;
                _this.onTouched();
                _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                _this.focus();
            }
            cd.markForCheck();
        });
    }
    Object.defineProperty(NgbDatepicker.prototype, "state", {
        /**
         *  Returns the readonly public state of the datepicker
         *
         * @since 5.2.0
         */
        get: function () { return this._publicState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepicker.prototype, "calendar", {
        /**
         *  Returns the calendar service used in the specific datepicker instance.
         *
         *  @since 5.3.0
         */
        get: function () { return this._calendar; },
        enumerable: true,
        configurable: true
    });
    /**
     *  Focuses on given date.
     */
    NgbDatepicker.prototype.focusDate = function (date) { this._service.focus(NgbDate.from(date)); };
    /**
     *  Selects focused date.
     */
    NgbDatepicker.prototype.focusSelect = function () { this._service.focusSelect(); };
    NgbDatepicker.prototype.focus = function () {
        var _this = this;
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
            var elementToFocus = _this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    };
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    NgbDatepicker.prototype.navigateTo = function (date) {
        this._service.open(NgbDate.from(date ? date.day ? date : __assign(__assign({}, date), { day: 1 }) : null));
    };
    NgbDatepicker.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            var focusIns$ = fromEvent(_this._contentEl.nativeElement, 'focusin');
            var focusOuts$ = fromEvent(_this._contentEl.nativeElement, 'focusout');
            var nativeElement = _this._elementRef.nativeElement;
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter(function (_a) {
                var target = _a.target, relatedTarget = _a.relatedTarget;
                return !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day') &&
                    nativeElement.contains(target) && nativeElement.contains(relatedTarget));
            }), takeUntil(_this._destroyed$))
                .subscribe(function (_a) {
                var type = _a.type;
                return _this._ngZone.run(function () { return _this._service.set({ focusVisible: type === 'focusin' }); });
            });
        });
    };
    NgbDatepicker.prototype.ngOnDestroy = function () { this._destroyed$.next(); };
    NgbDatepicker.prototype.ngOnInit = function () {
        var _this = this;
        if (this.model === undefined) {
            var inputs_1 = {};
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach(function (name) { return inputs_1[name] = _this[name]; });
            this._service.set(inputs_1);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
    };
    NgbDatepicker.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var inputs = {};
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter(function (name) { return name in changes; })
            .forEach(function (name) { return inputs[name] = _this[name]; });
        this._service.set(inputs);
        if ('startDate' in changes) {
            var _a = changes.startDate, currentValue = _a.currentValue, previousValue = _a.previousValue;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    };
    NgbDatepicker.prototype.onDateSelect = function (date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    };
    NgbDatepicker.prototype.onNavigateDateSelect = function (date) { this._service.open(date); };
    NgbDatepicker.prototype.onNavigateEvent = function (event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    };
    NgbDatepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbDatepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbDatepicker.prototype.setDisabledState = function (disabled) { this._service.set({ disabled: disabled }); };
    NgbDatepicker.prototype.writeValue = function (value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    };
    NgbDatepicker.ctorParameters = function () { return [
        { type: NgbDatepickerService },
        { type: NgbCalendar },
        { type: NgbDatepickerI18n },
        { type: NgbDatepickerConfig },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgbDateAdapter },
        { type: NgZone }
    ]; };
    __decorate([
        ViewChild('defaultDayTemplate', { static: true })
    ], NgbDatepicker.prototype, "_defaultDayTemplate", void 0);
    __decorate([
        ViewChild('content', { static: true })
    ], NgbDatepicker.prototype, "_contentEl", void 0);
    __decorate([
        ContentChild(NgbDatepickerContent, { static: true })
    ], NgbDatepicker.prototype, "contentTemplate", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "dayTemplate", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "dayTemplateData", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "displayMonths", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "firstDayOfWeek", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "footerTemplate", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "markDisabled", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "maxDate", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "minDate", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "navigation", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "outsideDays", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "showWeekdays", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "showWeekNumbers", void 0);
    __decorate([
        Input()
    ], NgbDatepicker.prototype, "startDate", void 0);
    __decorate([
        Output()
    ], NgbDatepicker.prototype, "navigate", void 0);
    __decorate([
        Output()
    ], NgbDatepicker.prototype, "dateSelect", void 0);
    __decorate([
        Output()
    ], NgbDatepicker.prototype, "select", void 0);
    NgbDatepicker = __decorate([
        Component({
            exportAs: 'ngbDatepicker',
            selector: 'ngb-datepicker',
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            template: "\n    <ng-template #defaultDayTemplate let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\"\n                 let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <ng-template #defaultContentTemplate>\n      <div *ngFor=\"let month of model.months; let i = index;\" class=\"ngb-dp-month\">\n        <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\" class=\"ngb-dp-month-name\">\n          {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n        </div>\n        <ngb-datepicker-month [month]=\"month.firstDate\"></ngb-datepicker-month>\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate!\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showSelect]=\"model.navigation === 'select'\"\n        [prevDisabled]=\"model.prevDisabled\"\n        [nextDisabled]=\"model.nextDisabled\"\n        [selectBoxes]=\"model.selectBoxes\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div class=\"ngb-dp-content\" [class.ngb-dp-months]=\"!contentTemplate\" #content>\n      <ng-template [ngTemplateOutlet]=\"contentTemplate?.templateRef || defaultContentTemplate\"></ng-template>\n    </div>\n\n    <ng-template [ngTemplateOutlet]=\"footerTemplate\"></ng-template>\n  ",
            providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService],
            styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}.ngb-dp-body{z-index:1050}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-months{display:-ms-flexbox;display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}"]
        })
    ], NgbDatepicker);
    return NgbDatepicker;
}());
export { NgbDatepicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQXNCLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBQyxNQUFNLG9CQUFv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QUNqRSxDQUFDO09BQ1csYUFBYSxDQThVekI7SUFBRCxvQkFBQztDQUFBLEFBOVVELElBOFVDO1NBOVVZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zyb21FdmVudCwgbWVyZ2UsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHRha2UsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7RGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMsIE5nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5hdmlnYXRpb25FdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJDb25maWd9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHtpc0NoYW5nZWREYXRlLCBpc0NoYW5nZWRNb250aH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcbmltcG9ydCB7aGFzQ2xhc3NOYW1lfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEYXRlcGlja2VyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgdGhlIG1vbnRoIGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlciBjaGFuZ2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoLlxuICAgKi9cbiAgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0gfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggd2UncmUgbmF2aWdhdGluZyB0by5cbiAgICovXG4gIG5leHQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xuXG4gIC8qKlxuICAgKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBwcmV2ZW50IG5hdmlnYXRpb24gZnJvbSBoYXBwZW5pbmcuXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgcmVwcmVzZW50cyB0aGUgcmVhZG9ubHkgcHVibGljIHN0YXRlIG9mIHRoZSBkYXRlcGlja2VyLlxuICpcbiAqIEFjY2Vzc2libGUgdmlhIHRoZSBgZGF0ZXBpY2tlci5zdGF0ZWAgZ2V0dGVyXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlclN0YXRlIHtcbiAgLyoqXG4gICAqIFRoZSBlYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZFxuICAgKi9cbiAgcmVhZG9ubHkgbWluRGF0ZTogTmdiRGF0ZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWRcbiAgICovXG4gIHJlYWRvbmx5IG1heERhdGU6IE5nYkRhdGUgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlyc3QgdmlzaWJsZSBkYXRlIG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhzXG4gICAqL1xuICByZWFkb25seSBmaXJzdERhdGU6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IHZpc2libGUgZGF0ZSBvZiBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoc1xuICAgKi9cbiAgcmVhZG9ubHkgbGFzdERhdGU6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIGN1cnJlbnRseSBmb2N1c2VkIGJ5IHRoZSBkYXRlcGlja2VyXG4gICAqL1xuICByZWFkb25seSBmb2N1c2VkRGF0ZTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogRmlyc3QgZGF0ZXMgb2YgbW9udGhzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXJcbiAgICpcbiAgICogQHNpbmNlIDUuMy4wXG4gICAqL1xuICByZWFkb25seSBtb250aHM6IE5nYkRhdGVbXTtcbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IG1hcmtzIHRoZSBjb250ZW50IHRlbXBsYXRlIHRoYXQgY3VzdG9taXplcyB0aGUgd2F5IGRhdGVwaWNrZXIgbW9udGhzIGFyZSBkaXNwbGF5ZWRcbiAqXG4gKiBAc2luY2UgNS4zLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JEYXRlcGlja2VyQ29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyQ29udGVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGhpZ2hseSBjb25maWd1cmFibGUgY29tcG9uZW50IHRoYXQgaGVscHMgeW91IHdpdGggc2VsZWN0aW5nIGNhbGVuZGFyIGRhdGVzLlxuICpcbiAqIGBOZ2JEYXRlcGlja2VyYCBpcyBtZWFudCB0byBiZSBkaXNwbGF5ZWQgaW5saW5lIG9uIGEgcGFnZSBvciBwdXQgaW5zaWRlIGEgcG9wdXAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ25nYkRhdGVwaWNrZXInLFxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXIuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdERheVRlbXBsYXRlIGxldC1kYXRlPVwiZGF0ZVwiIGxldC1jdXJyZW50TW9udGg9XCJjdXJyZW50TW9udGhcIiBsZXQtc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgIGxldC1kaXNhYmxlZD1cImRpc2FibGVkXCIgbGV0LWZvY3VzZWQ9XCJmb2N1c2VkXCI+XG4gICAgICA8ZGl2IG5nYkRhdGVwaWNrZXJEYXlWaWV3XG4gICAgICAgIFtkYXRlXT1cImRhdGVcIlxuICAgICAgICBbY3VycmVudE1vbnRoXT1cImN1cnJlbnRNb250aFwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFtmb2N1c2VkXT1cImZvY3VzZWRcIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRDb250ZW50VGVtcGxhdGU+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb2RlbC5tb250aHM7IGxldCBpID0gaW5kZXg7XCIgY2xhc3M9XCJuZ2ItZHAtbW9udGhcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm5hdmlnYXRpb24gPT09ICdub25lJyB8fCAoZGlzcGxheU1vbnRocyA+IDEgJiYgbmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpXCIgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuICAgICAgICAgIHt7IGkxOG4uZ2V0TW9udGhGdWxsTmFtZShtb250aC5udW1iZXIsIG1vbnRoLnllYXIpIH19IHt7IGkxOG4uZ2V0WWVhck51bWVyYWxzKG1vbnRoLnllYXIpIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmdiLWRhdGVwaWNrZXItbW9udGggW21vbnRoXT1cIm1vbnRoLmZpcnN0RGF0ZVwiPjwvbmdiLWRhdGVwaWNrZXItbW9udGg+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1oZWFkZXJcIj5cbiAgICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uICpuZ0lmPVwibmF2aWdhdGlvbiAhPT0gJ25vbmUnXCJcbiAgICAgICAgW2RhdGVdPVwibW9kZWwuZmlyc3REYXRlIVwiXG4gICAgICAgIFttb250aHNdPVwibW9kZWwubW9udGhzXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcbiAgICAgICAgW3Nob3dTZWxlY3RdPVwibW9kZWwubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCdcIlxuICAgICAgICBbcHJldkRpc2FibGVkXT1cIm1vZGVsLnByZXZEaXNhYmxlZFwiXG4gICAgICAgIFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcbiAgICAgICAgW3NlbGVjdEJveGVzXT1cIm1vZGVsLnNlbGVjdEJveGVzXCJcbiAgICAgICAgKG5hdmlnYXRlKT1cIm9uTmF2aWdhdGVFdmVudCgkZXZlbnQpXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XG4gICAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWNvbnRlbnRcIiBbY2xhc3MubmdiLWRwLW1vbnRoc109XCIhY29udGVudFRlbXBsYXRlXCIgI2NvbnRlbnQ+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlPy50ZW1wbGF0ZVJlZiB8fCBkZWZhdWx0Q29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLCBOZ2JEYXRlcGlja2VyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxcbiAgICBPbkNoYW5nZXMsIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbmF2aWdhdGlvbjogc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3V0c2lkZURheXM6IHN0cmluZztcblxuICBtb2RlbDogRGF0ZXBpY2tlclZpZXdNb2RlbDtcblxuICBAVmlld0NoaWxkKCdkZWZhdWx0RGF5VGVtcGxhdGUnLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSBfZGVmYXVsdERheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgX2NvbnRlbnRFbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBDb250ZW50Q2hpbGQoTmdiRGF0ZXBpY2tlckNvbnRlbnQsIHtzdGF0aWM6IHRydWV9KSBjb250ZW50VGVtcGxhdGU6IE5nYkRhdGVwaWNrZXJDb250ZW50O1xuXG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZTogTmdiRGF0ZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9kZXN0cm95ZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfcHVibGljU3RhdGU6IE5nYkRhdGVwaWNrZXJTdGF0ZSA9IDxhbnk+e307XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gYSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkuXG4gICAqXG4gICAqIEFsbG93cyB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB3YXkgYSBkYXkgJ2NlbGwnIGluIHRoZSBjYWxlbmRhciBpcyBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIFNlZSBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpIGZvciB0aGUgZGF0YSB5b3UgZ2V0IGluc2lkZS5cbiAgICovXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdG8gcGFzcyBhbnkgYXJiaXRyYXJ5IGRhdGEgdG8gdGhlIHRlbXBsYXRlIGNlbGwgdmlhIHRoZVxuICAgKiBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpJ3MgYGRhdGFgIHBhcmFtZXRlci5cbiAgICpcbiAgICogYGN1cnJlbnRgIGlzIHRoZSBtb250aCB0aGF0IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudD86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGRpc3BsYXkuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAqXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW4uXG4gICAqL1xuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXRlcGlja2VyIGZvb3Rlci5cbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIHRvIG1hcmsgc29tZSBkYXRlcyBhcyBkaXNhYmxlZC5cbiAgICpcbiAgICogSXQgaXMgY2FsbGVkIGZvciBlYWNoIG5ldyBkYXRlIHdoZW4gbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBtb250aC5cbiAgICpcbiAgICogYGN1cnJlbnRgIGlzIHRoZSBtb250aCB0aGF0IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG4gICAqL1xuICBASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50Pzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGFmdGVyIHRoZSBjdXJyZW50IG1vbnRoLlxuICAgKi9cbiAgQElucHV0KCkgbWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcblxuICAvKipcbiAgICogVGhlIGVhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsICd5ZWFyJyBzZWxlY3QgYm94IHdpbGwgZGlzcGxheSAxMCB5ZWFycyBiZWZvcmUgdGhlIGN1cnJlbnQgbW9udGguXG4gICAqL1xuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0aW9uIHR5cGUuXG4gICAqXG4gICAqICogYFwic2VsZWN0XCJgIC0gc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgbmF2aWdhdGlvbiBhcnJvd3NcbiAgICogKiBgXCJhcnJvd3NcImAgLSBvbmx5IG5hdmlnYXRpb24gYXJyb3dzXG4gICAqICogYFwibm9uZVwiYCAtIG5vIG5hdmlnYXRpb24gdmlzaWJsZSBhdCBhbGxcbiAgICovXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFRoZSB3YXkgb2YgZGlzcGxheWluZyBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIHRoZSBjdXJyZW50IG1vbnRoLlxuICAgKlxuICAgKiAqIGBcInZpc2libGVcImAgLSBkYXlzIGFyZSB2aXNpYmxlXG4gICAqICogYFwiaGlkZGVuXCJgIC0gZGF5cyBhcmUgaGlkZGVuLCB3aGl0ZSBzcGFjZSBwcmVzZXJ2ZWRcbiAgICogKiBgXCJjb2xsYXBzZWRcImAgLSBkYXlzIGFyZSBjb2xsYXBzZWQsIHNvIHRoZSBkYXRlcGlja2VyIGhlaWdodCBtaWdodCBjaGFuZ2UgYmV0d2VlbiBtb250aHNcbiAgICpcbiAgICogRm9yIHRoZSAyKyBtb250aHMgdmlldywgZGF5cyBpbiBiZXR3ZWVuIG1vbnRocyBhcmUgbmV2ZXIgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3ZWVrZGF5cyB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3ZWVrIG51bWJlcnMgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRvIG9wZW4gY2FsZW5kYXIgd2l0aC5cbiAgICpcbiAgICogV2l0aCB0aGUgZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgaXMgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXG4gICAqXG4gICAqIFlvdSBjb3VsZCB1c2UgYG5hdmlnYXRlVG8oZGF0ZSlgIG1ldGhvZCBhcyBhbiBhbHRlcm5hdGl2ZS5cbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXG4gICAqXG4gICAqIFNlZSBbYE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50KSBmb3IgdGhlIHBheWxvYWQgaW5mby5cbiAgICovXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxuICAgKlxuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkIGBOZ2JEYXRlYC5cbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqL1xuICBAT3V0cHV0KCkgZGF0ZVNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXG4gICAqXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgYE5nYkRhdGVgLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCA2LjAuMCBQbGVhc2UgdXNlICdkYXRlU2VsZWN0JyBvdXRwdXQgaW5zdGVhZCBkdWUgdG8gY29sbGlzaW9uIHdpdGggbmF0aXZlXG4gICAqICdzZWxlY3QnIGV2ZW50LlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdCA9IHRoaXMuZGF0ZVNlbGVjdDtcblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLCBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bixcbiAgICAgIGNvbmZpZzogTmdiRGF0ZXBpY2tlckNvbmZpZywgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX25nYkRhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIFsnZGF5VGVtcGxhdGUnLCAnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnZm9vdGVyVGVtcGxhdGUnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLFxuICAgICAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJywgJ291dHNpZGVEYXlzJywgJ3Nob3dXZWVrZGF5cycsICdzaG93V2Vla051bWJlcnMnLCAnc3RhcnREYXRlJ11cbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpc1tpbnB1dF0gPSBjb25maWdbaW5wdXRdKTtcblxuICAgIF9zZXJ2aWNlLmRhdGVTZWxlY3QkLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpKS5zdWJzY3JpYmUoZGF0ZSA9PiB7IHRoaXMuZGF0ZVNlbGVjdC5lbWl0KGRhdGUpOyB9KTtcblxuICAgIF9zZXJ2aWNlLm1vZGVsJC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKG1vZGVsID0+IHtcbiAgICAgIGNvbnN0IG5ld0RhdGUgPSBtb2RlbC5maXJzdERhdGUgITtcbiAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5maXJzdERhdGUgOiBudWxsO1xuXG4gICAgICAvLyB1cGRhdGUgcHVibGljIHN0YXRlXG4gICAgICB0aGlzLl9wdWJsaWNTdGF0ZSA9IHtcbiAgICAgICAgbWF4RGF0ZTogbW9kZWwubWF4RGF0ZSxcbiAgICAgICAgbWluRGF0ZTogbW9kZWwubWluRGF0ZSxcbiAgICAgICAgZmlyc3REYXRlOiBtb2RlbC5maXJzdERhdGUgISxcbiAgICAgICAgbGFzdERhdGU6IG1vZGVsLmxhc3REYXRlICEsXG4gICAgICAgIGZvY3VzZWREYXRlOiBtb2RlbC5mb2N1c0RhdGUgISxcbiAgICAgICAgbW9udGhzOiBtb2RlbC5tb250aHMubWFwKHZpZXdNb2RlbCA9PiB2aWV3TW9kZWwuZmlyc3REYXRlKVxuICAgICAgfTtcblxuICAgICAgbGV0IG5hdmlnYXRpb25QcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICAgIC8vIGVtaXR0aW5nIG5hdmlnYXRpb24gZXZlbnQgaWYgdGhlIGZpcnN0IG1vbnRoIGNoYW5nZXNcbiAgICAgIGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHtcbiAgICAgICAgICBjdXJyZW50OiBvbGREYXRlID8ge3llYXI6IG9sZERhdGUueWVhciwgbW9udGg6IG9sZERhdGUubW9udGh9IDogbnVsbCxcbiAgICAgICAgICBuZXh0OiB7eWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aH0sXG4gICAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IG5hdmlnYXRpb25QcmV2ZW50ZWQgPSB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhbid0IHByZXZlbnQgdGhlIHZlcnkgZmlyc3QgbmF2aWdhdGlvblxuICAgICAgICBpZiAobmF2aWdhdGlvblByZXZlbnRlZCAmJiBvbGREYXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKG9sZERhdGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdTZWxlY3RlZERhdGUgPSBtb2RlbC5zZWxlY3RlZERhdGU7XG4gICAgICBjb25zdCBuZXdGb2N1c2VkRGF0ZSA9IG1vZGVsLmZvY3VzRGF0ZTtcbiAgICAgIGNvbnN0IG9sZEZvY3VzZWREYXRlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwuZm9jdXNEYXRlIDogbnVsbDtcblxuICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAvLyBoYW5kbGluZyBzZWxlY3Rpb24gY2hhbmdlXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdTZWxlY3RlZERhdGUsIHRoaXMuX2NvbnRyb2xWYWx1ZSkpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbFZhbHVlID0gbmV3U2VsZWN0ZWREYXRlO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX25nYkRhdGVBZGFwdGVyLnRvTW9kZWwobmV3U2VsZWN0ZWREYXRlKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsaW5nIGZvY3VzIGNoYW5nZVxuICAgICAgaWYgKGlzQ2hhbmdlZERhdGUobmV3Rm9jdXNlZERhdGUsIG9sZEZvY3VzZWREYXRlKSAmJiBvbGRGb2N1c2VkRGF0ZSAmJiBtb2RlbC5mb2N1c1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICBjZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgUmV0dXJucyB0aGUgcmVhZG9ubHkgcHVibGljIHN0YXRlIG9mIHRoZSBkYXRlcGlja2VyXG4gICAqXG4gICAqIEBzaW5jZSA1LjIuMFxuICAgKi9cbiAgZ2V0IHN0YXRlKCk6IE5nYkRhdGVwaWNrZXJTdGF0ZSB7IHJldHVybiB0aGlzLl9wdWJsaWNTdGF0ZTsgfVxuXG4gIC8qKlxuICAgKiAgUmV0dXJucyB0aGUgY2FsZW5kYXIgc2VydmljZSB1c2VkIGluIHRoZSBzcGVjaWZpYyBkYXRlcGlja2VyIGluc3RhbmNlLlxuICAgKlxuICAgKiAgQHNpbmNlIDUuMy4wXG4gICAqL1xuICBnZXQgY2FsZW5kYXIoKTogTmdiQ2FsZW5kYXIgeyByZXR1cm4gdGhpcy5fY2FsZW5kYXI7IH1cblxuICAvKipcbiAgICogIEZvY3VzZXMgb24gZ2l2ZW4gZGF0ZS5cbiAgICovXG4gIGZvY3VzRGF0ZShkYXRlPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiB2b2lkIHsgdGhpcy5fc2VydmljZS5mb2N1cyhOZ2JEYXRlLmZyb20oZGF0ZSkpOyB9XG5cbiAgLyoqXG4gICAqICBTZWxlY3RzIGZvY3VzZWQgZGF0ZS5cbiAgICovXG4gIGZvY3VzU2VsZWN0KCk6IHZvaWQgeyB0aGlzLl9zZXJ2aWNlLmZvY3VzU2VsZWN0KCk7IH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPVxuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PignZGl2Lm5nYi1kcC1kYXlbdGFiaW5kZXg9XCIwXCJdJyk7XG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcbiAgICAgICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIHByb3ZpZGVkIGRhdGUuXG4gICAqXG4gICAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuICAgKlxuICAgKiBVc2UgdGhlIGBbc3RhcnREYXRlXWAgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmUuXG4gICAqL1xuICBuYXZpZ2F0ZVRvKGRhdGU/OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9KSB7XG4gICAgdGhpcy5fc2VydmljZS5vcGVuKE5nYkRhdGUuZnJvbShkYXRlID8gZGF0ZS5kYXkgPyBkYXRlIGFzIE5nYkRhdGVTdHJ1Y3QgOiB7Li4uZGF0ZSwgZGF5OiAxfSA6IG51bGwpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgZm9jdXNJbnMkID0gZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KHRoaXMuX2NvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnZm9jdXNpbicpO1xuICAgICAgY29uc3QgZm9jdXNPdXRzJCA9IGZyb21FdmVudDxGb2N1c0V2ZW50Pih0aGlzLl9jb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ2ZvY3Vzb3V0Jyk7XG4gICAgICBjb25zdCB7bmF0aXZlRWxlbWVudH0gPSB0aGlzLl9lbGVtZW50UmVmO1xuXG4gICAgICAvLyB3ZSdyZSBjaGFuZ2luZyAnZm9jdXNWaXNpYmxlJyBvbmx5IHdoZW4gZW50ZXJpbmcgb3IgbGVhdmluZyBtb250aHMgdmlld1xuICAgICAgLy8gYW5kIGlnbm9yaW5nIGFsbCBmb2N1cyBldmVudHMgd2hlcmUgYm90aCAndGFyZ2V0JyBhbmQgJ3JlbGF0ZWQnIHRhcmdldCBhcmUgZGF5IGNlbGxzXG4gICAgICBtZXJnZShmb2N1c0lucyQsIGZvY3VzT3V0cyQpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICh7dGFyZ2V0LCByZWxhdGVkVGFyZ2V0fSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAhKGhhc0NsYXNzTmFtZSh0YXJnZXQsICduZ2ItZHAtZGF5JykgJiYgaGFzQ2xhc3NOYW1lKHJlbGF0ZWRUYXJnZXQsICduZ2ItZHAtZGF5JykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0IGFzIE5vZGUpICYmIG5hdGl2ZUVsZW1lbnQuY29udGFpbnMocmVsYXRlZFRhcmdldCBhcyBOb2RlKSkpLFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoe3R5cGV9KSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX3NlcnZpY2Uuc2V0KHtmb2N1c1Zpc2libGU6IHR5cGUgPT09ICdmb2N1c2luJ30pKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG4gICAgICBbJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ21hcmtEaXNhYmxlZCcsICdmaXJzdERheU9mV2VlaycsICduYXZpZ2F0aW9uJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsXG4gICAgICAgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgICAuZm9yRWFjaChuYW1lID0+IGlucHV0c1tuYW1lXSA9IHRoaXNbbmFtZV0pO1xuICAgICAgdGhpcy5fc2VydmljZS5zZXQoaW5wdXRzKTtcblxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmRheVRlbXBsYXRlKSB7XG4gICAgICB0aGlzLmRheVRlbXBsYXRlID0gdGhpcy5fZGVmYXVsdERheVRlbXBsYXRlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG4gICAgWydkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdtYXJrRGlzYWJsZWQnLCAnZmlyc3REYXlPZldlZWsnLCAnbmF2aWdhdGlvbicsICdtaW5EYXRlJywgJ21heERhdGUnLFxuICAgICAnb3V0c2lkZURheXMnXVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSBpbiBjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaChuYW1lID0+IGlucHV0c1tuYW1lXSA9IHRoaXNbbmFtZV0pO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0KGlucHV0cyk7XG5cbiAgICBpZiAoJ3N0YXJ0RGF0ZScgaW4gY2hhbmdlcykge1xuICAgICAgY29uc3Qge2N1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZX0gPSBjaGFuZ2VzLnN0YXJ0RGF0ZTtcbiAgICAgIGlmIChpc0NoYW5nZWRNb250aChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25EYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VsZWN0KGRhdGUsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgfVxuXG4gIG9uTmF2aWdhdGVEYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHsgdGhpcy5fc2VydmljZS5vcGVuKGRhdGUpOyB9XG5cbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5QUkVWOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSAhLCAnbScsIDEpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5ORVhUOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0TmV4dCh0aGlzLm1vZGVsLmZpcnN0RGF0ZSAhLCAnbScsIDEpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuX3NlcnZpY2Uuc2V0KHtkaXNhYmxlZH0pOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZSA9IE5nYkRhdGUuZnJvbSh0aGlzLl9uZ2JEYXRlQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNlbGVjdCh0aGlzLl9jb250cm9sVmFsdWUpO1xuICB9XG59XG4iXX0=