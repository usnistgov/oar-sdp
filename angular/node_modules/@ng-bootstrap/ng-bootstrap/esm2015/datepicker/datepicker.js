/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerConfig } from './datepicker-config';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { isChangedDate, isChangedMonth } from './datepicker-tools';
import { hasClassName } from '../util/util';
/** @type {?} */
export const NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbDatepicker)),
    multi: true
};
/**
 * An event emitted right before the navigation happens and the month displayed by the datepicker changes.
 * @record
 */
export function NgbDatepickerNavigateEvent() { }
if (false) {
    /**
     * The currently displayed month.
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.current;
    /**
     * The month we're navigating to.
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.next;
    /**
     * Calling this function will prevent navigation from happening.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.preventDefault;
}
/**
 * An interface that represents the readonly public state of the datepicker.
 *
 * Accessible via the `datepicker.state` getter
 *
 * \@since 5.2.0
 * @record
 */
export function NgbDatepickerState() { }
if (false) {
    /**
     * The earliest date that can be displayed or selected
     * @type {?}
     */
    NgbDatepickerState.prototype.minDate;
    /**
     * The latest date that can be displayed or selected
     * @type {?}
     */
    NgbDatepickerState.prototype.maxDate;
    /**
     * The first visible date of currently displayed months
     * @type {?}
     */
    NgbDatepickerState.prototype.firstDate;
    /**
     * The last visible date of currently displayed months
     * @type {?}
     */
    NgbDatepickerState.prototype.lastDate;
    /**
     * The date currently focused by the datepicker
     * @type {?}
     */
    NgbDatepickerState.prototype.focusedDate;
    /**
     * First dates of months currently displayed by the datepicker
     *
     * \@since 5.3.0
     * @type {?}
     */
    NgbDatepickerState.prototype.months;
}
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * \@since 5.3.0
 */
export class NgbDatepickerContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbDatepickerContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbDatepickerContent]' },] }
];
/** @nocollapse */
NgbDatepickerContent.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbDatepickerContent.prototype.templateRef;
}
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
export class NgbDatepicker {
    /**
     * @param {?} _service
     * @param {?} _calendar
     * @param {?} i18n
     * @param {?} config
     * @param {?} cd
     * @param {?} _elementRef
     * @param {?} _ngbDateAdapter
     * @param {?} _ngZone
     */
    constructor(_service, _calendar, i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this._destroyed$ = new Subject();
        this._publicState = (/** @type {?} */ ({}));
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
         * \@since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * Please use 'dateSelect' output instead, this will be deprecated in version 6.0 due to collision with native
         * 'select' event.
         */
        this.select = this.dateSelect;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach((/**
         * @param {?} input
         * @return {?}
         */
        input => this[input] = config[input]));
        _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe((/**
         * @param {?} date
         * @return {?}
         */
        date => { this.dateSelect.emit(date); }));
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe((/**
         * @param {?} model
         * @return {?}
         */
        model => {
            /** @type {?} */
            const newDate = model.firstDate;
            /** @type {?} */
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map((/**
                 * @param {?} viewModel
                 * @return {?}
                 */
                viewModel => viewModel.firstDate))
            };
            /** @type {?} */
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: (/**
                     * @return {?}
                     */
                    () => navigationPrevented = true)
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            /** @type {?} */
            const newSelectedDate = model.selectedDate;
            /** @type {?} */
            const newFocusedDate = model.focusDate;
            /** @type {?} */
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            cd.markForCheck();
        }));
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * \@since 5.2.0
     * @return {?}
     */
    get state() { return this._publicState; }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     * \@since 5.3.0
     * @return {?}
     */
    get calendar() { return this._calendar; }
    /**
     *  Focuses on given date.
     * @param {?} date
     * @return {?}
     */
    focusDate(date) { this._service.focus(NgbDate.from(date)); }
    /**
     *  Selects focused date.
     * @return {?}
     */
    focusSelect() { this._service.focusSelect(); }
    /**
     * @return {?}
     */
    focus() {
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        }));
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? date.day ? (/** @type {?} */ (date)) : Object.assign({}, date, { day: 1 }) : null));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            /** @type {?} */
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            const { nativeElement } = this._elementRef;
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ target, relatedTarget }) => !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day') &&
                nativeElement.contains((/** @type {?} */ (target))) && nativeElement.contains((/** @type {?} */ (relatedTarget)))))), takeUntil(this._destroyed$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ type }) => this._ngZone.run((/**
             * @return {?}
             */
            () => this._service.set({ focusVisible: type === 'focusin' })))));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._destroyed$.next(); }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.model === undefined) {
            /** @type {?} */
            const inputs = {};
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => inputs[name] = this[name]));
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const inputs = {};
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter((/**
         * @param {?} name
         * @return {?}
         */
        name => name in changes))
            .forEach((/**
         * @param {?} name
         * @return {?}
         */
        name => inputs[name] = this[name]));
        this._service.set(inputs);
        if ('startDate' in changes) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onNavigateDateSelect(date) { this._service.open(date); }
    /**
     * @param {?} event
     * @return {?}
     */
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabledState(disabled) { this._service.set({ disabled }); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
}
NgbDatepicker.decorators = [
    { type: Component, args: [{
                exportAs: 'ngbDatepicker',
                selector: 'ngb-datepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template #defaultDayTemplate let-date="date" let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <div ngbDatepickerDayView
        [date]="date"
        [currentMonth]="currentMonth"
        [selected]="selected"
        [disabled]="disabled"
        [focused]="focused">
      </div>
    </ng-template>

    <ng-template #defaultContentTemplate>
      <div *ngFor="let month of model.months; let i = index;" class="ngb-dp-month">
        <div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
          {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
        </div>
        <ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
      </div>
    </ng-template>

    <div class="ngb-dp-header">
      <ngb-datepicker-navigation *ngIf="navigation !== 'none'"
        [date]="model.firstDate"
        [months]="model.months"
        [disabled]="model.disabled"
        [showSelect]="model.navigation === 'select'"
        [prevDisabled]="model.prevDisabled"
        [nextDisabled]="model.nextDisabled"
        [selectBoxes]="model.selectBoxes"
        (navigate)="onNavigateEvent($event)"
        (select)="onNavigateDateSelect($event)">
      </ngb-datepicker-navigation>
    </div>

    <div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
      <ng-template [ngTemplateOutlet]="contentTemplate?.templateRef || defaultContentTemplate"></ng-template>
    </div>

    <ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
  `,
                providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService],
                styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}.ngb-dp-body{z-index:1050}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-months{display:-ms-flexbox;display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}"]
            }] }
];
/** @nocollapse */
NgbDatepicker.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar },
    { type: NgbDatepickerI18n },
    { type: NgbDatepickerConfig },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgbDateAdapter },
    { type: NgZone }
];
NgbDatepicker.propDecorators = {
    _defaultDayTemplate: [{ type: ViewChild, args: ['defaultDayTemplate', { static: true },] }],
    _contentEl: [{ type: ViewChild, args: ['content', { static: true },] }],
    contentTemplate: [{ type: ContentChild, args: [NgbDatepickerContent, { static: true },] }],
    dayTemplate: [{ type: Input }],
    dayTemplateData: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    footerTemplate: [{ type: Input }],
    markDisabled: [{ type: Input }],
    maxDate: [{ type: Input }],
    minDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    navigate: [{ type: Output }],
    dateSelect: [{ type: Output }],
    select: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbDatepicker.prototype.model;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._defaultDayTemplate;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._contentEl;
    /** @type {?} */
    NgbDatepicker.prototype.contentTemplate;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._controlValue;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._destroyed$;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._publicState;
    /**
     * The reference to a custom template for the day.
     *
     * Allows to completely override the way a day 'cell' in the calendar is displayed.
     *
     * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplate;
    /**
     * The callback to pass any arbitrary data to the template cell via the
     * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
     *
     * `current` is the month that is currently displayed by the datepicker.
     *
     * \@since 3.3.0
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplateData;
    /**
     * The number of months to display.
     * @type {?}
     */
    NgbDatepicker.prototype.displayMonths;
    /**
     * The first day of the week.
     *
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
     * @type {?}
     */
    NgbDatepicker.prototype.firstDayOfWeek;
    /**
     * The reference to the custom template for the datepicker footer.
     *
     * \@since 3.3.0
     * @type {?}
     */
    NgbDatepicker.prototype.footerTemplate;
    /**
     * The callback to mark some dates as disabled.
     *
     * It is called for each new date when navigating to a different month.
     *
     * `current` is the month that is currently displayed by the datepicker.
     * @type {?}
     */
    NgbDatepicker.prototype.markDisabled;
    /**
     * The latest date that can be displayed or selected.
     *
     * If not provided, 'year' select box will display 10 years after the current month.
     * @type {?}
     */
    NgbDatepicker.prototype.maxDate;
    /**
     * The earliest date that can be displayed or selected.
     *
     * If not provided, 'year' select box will display 10 years before the current month.
     * @type {?}
     */
    NgbDatepicker.prototype.minDate;
    /**
     * Navigation type.
     *
     * * `"select"` - select boxes for month and navigation arrows
     * * `"arrows"` - only navigation arrows
     * * `"none"` - no navigation visible at all
     * @type {?}
     */
    NgbDatepicker.prototype.navigation;
    /**
     * The way of displaying days that don't belong to the current month.
     *
     * * `"visible"` - days are visible
     * * `"hidden"` - days are hidden, white space preserved
     * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
     *
     * For the 2+ months view, days in between months are never shown.
     * @type {?}
     */
    NgbDatepicker.prototype.outsideDays;
    /**
     * If `true`, weekdays will be displayed.
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekdays;
    /**
     * If `true`, week numbers will be displayed.
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekNumbers;
    /**
     * The date to open calendar with.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date is provided, calendar will open with current month.
     *
     * You could use `navigateTo(date)` method as an alternative.
     * @type {?}
     */
    NgbDatepicker.prototype.startDate;
    /**
     * An event emitted right before the navigation happens and displayed month changes.
     *
     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
     * @type {?}
     */
    NgbDatepicker.prototype.navigate;
    /**
     * An event emitted when user selects a date using keyboard or mouse.
     *
     * The payload of the event is currently selected `NgbDate`.
     *
     * \@since 5.2.0
     * @type {?}
     */
    NgbDatepicker.prototype.dateSelect;
    /**
     * An event emitted when user selects a date using keyboard or mouse.
     *
     * The payload of the event is currently selected `NgbDate`.
     *
     * Please use 'dateSelect' output instead, this will be deprecated in version 6.0 due to collision with native
     * 'select' event.
     * @type {?}
     */
    NgbDatepicker.prototype.select;
    /** @type {?} */
    NgbDatepicker.prototype.onChange;
    /** @type {?} */
    NgbDatepicker.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._service;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._calendar;
    /** @type {?} */
    NgbDatepicker.prototype.i18n;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._ngbDateAdapter;
    /**
     * @type {?}
     * @private
     */
    NgbDatepicker.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBRU4sV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBMEIsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQXNCLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7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K0JBQW1DOztJQUVuQyxpQ0FBMEI7O0lBQzFCLGtDQUFxQjs7Ozs7SUFHakIsaUNBQXNDOzs7OztJQUFFLGtDQUE4Qjs7SUFBRSw2QkFBOEI7Ozs7O0lBQ2xELG9DQUE0Qzs7Ozs7SUFDaEcsd0NBQTRDOzs7OztJQUFFLGdDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgdGFrZSwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtEYXRlcGlja2VyU2VydmljZUlucHV0cywgTmdiRGF0ZXBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmF2aWdhdGlvbkV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYkRhdGVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5pbXBvcnQge2lzQ2hhbmdlZERhdGUsIGlzQ2hhbmdlZE1vbnRofSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xuaW1wb3J0IHtoYXNDbGFzc05hbWV9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0aGUgbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCB0aGUgbW9udGggZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyIGNoYW5nZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGguXG4gICAqL1xuICBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcblxuICAvKipcbiAgICogVGhlIG1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG8uXG4gICAqL1xuICBuZXh0OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcblxuICAvKipcbiAgICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIHdpbGwgcHJldmVudCBuYXZpZ2F0aW9uIGZyb20gaGFwcGVuaW5nLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgdGhlIHJlYWRvbmx5IHB1YmxpYyBzdGF0ZSBvZiB0aGUgZGF0ZXBpY2tlci5cbiAqXG4gKiBBY2Nlc3NpYmxlIHZpYSB0aGUgYGRhdGVwaWNrZXIuc3RhdGVgIGdldHRlclxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJTdGF0ZSB7XG4gIC8qKlxuICAgKiBUaGUgZWFybGllc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWRcbiAgICovXG4gIHJlYWRvbmx5IG1pbkRhdGU6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWRcbiAgICovXG4gIHJlYWRvbmx5IG1heERhdGU6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJzdCB2aXNpYmxlIGRhdGUgb2YgY3VycmVudGx5IGRpc3BsYXllZCBtb250aHNcbiAgICovXG4gIHJlYWRvbmx5IGZpcnN0RGF0ZTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogVGhlIGxhc3QgdmlzaWJsZSBkYXRlIG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhzXG4gICAqL1xuICByZWFkb25seSBsYXN0RGF0ZTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogVGhlIGRhdGUgY3VycmVudGx5IGZvY3VzZWQgYnkgdGhlIGRhdGVwaWNrZXJcbiAgICovXG4gIHJlYWRvbmx5IGZvY3VzZWREYXRlOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBGaXJzdCBkYXRlcyBvZiBtb250aHMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlclxuICAgKlxuICAgKiBAc2luY2UgNS4zLjBcbiAgICovXG4gIHJlYWRvbmx5IG1vbnRoczogTmdiRGF0ZVtdO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFya3MgdGhlIGNvbnRlbnQgdGVtcGxhdGUgdGhhdCBjdXN0b21pemVzIHRoZSB3YXkgZGF0ZXBpY2tlciBtb250aHMgYXJlIGRpc3BsYXllZFxuICpcbiAqIEBzaW5jZSA1LjMuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYkRhdGVwaWNrZXJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgaGlnaGx5IGNvbmZpZ3VyYWJsZSBjb21wb25lbnQgdGhhdCBoZWxwcyB5b3Ugd2l0aCBzZWxlY3RpbmcgY2FsZW5kYXIgZGF0ZXMuXG4gKlxuICogYE5nYkRhdGVwaWNrZXJgIGlzIG1lYW50IHRvIGJlIGRpc3BsYXllZCBpbmxpbmUgb24gYSBwYWdlIG9yIHB1dCBpbnNpZGUgYSBwb3B1cC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RGF5VGVtcGxhdGUgbGV0LWRhdGU9XCJkYXRlXCIgbGV0LWN1cnJlbnRNb250aD1cImN1cnJlbnRNb250aFwiIGxldC1zZWxlY3RlZD1cInNlbGVjdGVkXCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIiBsZXQtZm9jdXNlZD1cImZvY3VzZWRcIj5cbiAgICAgIDxkaXYgbmdiRGF0ZXBpY2tlckRheVZpZXdcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICAgIFtjdXJyZW50TW9udGhdPVwiY3VycmVudE1vbnRoXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW2ZvY3VzZWRdPVwiZm9jdXNlZFwiPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdENvbnRlbnRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vZGVsLm1vbnRoczsgbGV0IGkgPSBpbmRleDtcIiBjbGFzcz1cIm5nYi1kcC1tb250aFwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIiBjbGFzcz1cIm5nYi1kcC1tb250aC1uYW1lXCI+XG4gICAgICAgICAge3sgaTE4bi5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLm51bWJlciwgbW9udGgueWVhcikgfX0ge3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMobW9udGgueWVhcikgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZ2ItZGF0ZXBpY2tlci1tb250aCBbbW9udGhdPVwibW9udGguZmlyc3REYXRlXCI+PC9uZ2ItZGF0ZXBpY2tlci1tb250aD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlclwiPlxuICAgICAgPG5nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24gKm5nSWY9XCJuYXZpZ2F0aW9uICE9PSAnbm9uZSdcIlxuICAgICAgICBbZGF0ZV09XCJtb2RlbC5maXJzdERhdGVcIlxuICAgICAgICBbbW9udGhzXT1cIm1vZGVsLm1vbnRoc1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJtb2RlbC5kaXNhYmxlZFwiXG4gICAgICAgIFtzaG93U2VsZWN0XT1cIm1vZGVsLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnXCJcbiAgICAgICAgW3ByZXZEaXNhYmxlZF09XCJtb2RlbC5wcmV2RGlzYWJsZWRcIlxuICAgICAgICBbbmV4dERpc2FibGVkXT1cIm1vZGVsLm5leHREaXNhYmxlZFwiXG4gICAgICAgIFtzZWxlY3RCb3hlc109XCJtb2RlbC5zZWxlY3RCb3hlc1wiXG4gICAgICAgIChuYXZpZ2F0ZSk9XCJvbk5hdmlnYXRlRXZlbnQoJGV2ZW50KVwiXG4gICAgICAgIChzZWxlY3QpPVwib25OYXZpZ2F0ZURhdGVTZWxlY3QoJGV2ZW50KVwiPlxuICAgICAgPC9uZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1jb250ZW50XCIgW2NsYXNzLm5nYi1kcC1tb250aHNdPVwiIWNvbnRlbnRUZW1wbGF0ZVwiICNjb250ZW50PlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZT8udGVtcGxhdGVSZWYgfHwgZGVmYXVsdENvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG5cbiAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICBgLFxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTmdiRGF0ZXBpY2tlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksXG4gICAgT25DaGFuZ2VzLCBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgbW9kZWw6IERhdGVwaWNrZXJWaWV3TW9kZWw7XG5cbiAgQFZpZXdDaGlsZCgnZGVmYXVsdERheVRlbXBsYXRlJywge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgX2RlZmF1bHREYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHtzdGF0aWM6IHRydWV9KSBwcml2YXRlIF9jb250ZW50RWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAQ29udGVudENoaWxkKE5nYkRhdGVwaWNrZXJDb250ZW50LCB7c3RhdGljOiB0cnVlfSkgY29udGVudFRlbXBsYXRlOiBOZ2JEYXRlcGlja2VyQ29udGVudDtcblxuICBwcml2YXRlIF9jb250cm9sVmFsdWU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9wdWJsaWNTdGF0ZTogTmdiRGF0ZXBpY2tlclN0YXRlID0gPGFueT57fTtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheS5cbiAgICpcbiAgICogQWxsb3dzIHRvIGNvbXBsZXRlbHkgb3ZlcnJpZGUgdGhlIHdheSBhIGRheSAnY2VsbCcgaW4gdGhlIGNhbGVuZGFyIGlzIGRpc3BsYXllZC5cbiAgICpcbiAgICogU2VlIFtgRGF5VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0RheVRlbXBsYXRlQ29udGV4dCkgZm9yIHRoZSBkYXRhIHlvdSBnZXQgaW5zaWRlLlxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayB0byBwYXNzIGFueSBhcmJpdHJhcnkgZGF0YSB0byB0aGUgdGVtcGxhdGUgY2VsbCB2aWEgdGhlXG4gICAqIFtgRGF5VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0RheVRlbXBsYXRlQ29udGV4dCkncyBgZGF0YWAgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBgY3VycmVudGAgaXMgdGhlIG1vbnRoIHRoYXQgaXMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlci5cbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBASW5wdXQoKSBkYXlUZW1wbGF0ZURhdGE6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5LlxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgKlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuLlxuICAgKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byB0aGUgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZGF0ZXBpY2tlciBmb290ZXIuXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayB0byBtYXJrIHNvbWUgZGF0ZXMgYXMgZGlzYWJsZWQuXG4gICAqXG4gICAqIEl0IGlzIGNhbGxlZCBmb3IgZWFjaCBuZXcgZGF0ZSB3aGVuIG5hdmlnYXRpbmcgdG8gYSBkaWZmZXJlbnQgbW9udGguXG4gICAqXG4gICAqIGBjdXJyZW50YCBpcyB0aGUgbW9udGggdGhhdCBpcyBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyLlxuICAgKi9cbiAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGFmdGVyIHRoZSBjdXJyZW50IG1vbnRoLlxuICAgKi9cbiAgQElucHV0KCkgbWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcblxuICAvKipcbiAgICogVGhlIGVhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsICd5ZWFyJyBzZWxlY3QgYm94IHdpbGwgZGlzcGxheSAxMCB5ZWFycyBiZWZvcmUgdGhlIGN1cnJlbnQgbW9udGguXG4gICAqL1xuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0aW9uIHR5cGUuXG4gICAqXG4gICAqICogYFwic2VsZWN0XCJgIC0gc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgbmF2aWdhdGlvbiBhcnJvd3NcbiAgICogKiBgXCJhcnJvd3NcImAgLSBvbmx5IG5hdmlnYXRpb24gYXJyb3dzXG4gICAqICogYFwibm9uZVwiYCAtIG5vIG5hdmlnYXRpb24gdmlzaWJsZSBhdCBhbGxcbiAgICovXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFRoZSB3YXkgb2YgZGlzcGxheWluZyBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIHRoZSBjdXJyZW50IG1vbnRoLlxuICAgKlxuICAgKiAqIGBcInZpc2libGVcImAgLSBkYXlzIGFyZSB2aXNpYmxlXG4gICAqICogYFwiaGlkZGVuXCJgIC0gZGF5cyBhcmUgaGlkZGVuLCB3aGl0ZSBzcGFjZSBwcmVzZXJ2ZWRcbiAgICogKiBgXCJjb2xsYXBzZWRcImAgLSBkYXlzIGFyZSBjb2xsYXBzZWQsIHNvIHRoZSBkYXRlcGlja2VyIGhlaWdodCBtaWdodCBjaGFuZ2UgYmV0d2VlbiBtb250aHNcbiAgICpcbiAgICogRm9yIHRoZSAyKyBtb250aHMgdmlldywgZGF5cyBpbiBiZXR3ZWVuIG1vbnRocyBhcmUgbmV2ZXIgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3ZWVrZGF5cyB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3ZWVrIG51bWJlcnMgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRvIG9wZW4gY2FsZW5kYXIgd2l0aC5cbiAgICpcbiAgICogV2l0aCB0aGUgZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgaXMgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXG4gICAqXG4gICAqIFlvdSBjb3VsZCB1c2UgYG5hdmlnYXRlVG8oZGF0ZSlgIG1ldGhvZCBhcyBhbiBhbHRlcm5hdGl2ZS5cbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXG4gICAqXG4gICAqIFNlZSBbYE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50KSBmb3IgdGhlIHBheWxvYWQgaW5mby5cbiAgICovXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxuICAgKlxuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkIGBOZ2JEYXRlYC5cbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqL1xuICBAT3V0cHV0KCkgZGF0ZVNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXG4gICAqXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgYE5nYkRhdGVgLlxuICAgKlxuICAgKiBQbGVhc2UgdXNlICdkYXRlU2VsZWN0JyBvdXRwdXQgaW5zdGVhZCwgdGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgaW4gdmVyc2lvbiA2LjAgZHVlIHRvIGNvbGxpc2lvbiB3aXRoIG5hdGl2ZVxuICAgKiAnc2VsZWN0JyBldmVudC5cbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSB0aGlzLmRhdGVTZWxlY3Q7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXG4gICAgICBjb25maWc6IE5nYkRhdGVwaWNrZXJDb25maWcsIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcml2YXRlIF9uZ2JEYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55PiwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICBbJ2RheVRlbXBsYXRlJywgJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ2Zvb3RlclRlbXBsYXRlJywgJ21hcmtEaXNhYmxlZCcsICdtaW5EYXRlJyxcbiAgICAgJ21heERhdGUnLCAnbmF2aWdhdGlvbicsICdvdXRzaWRlRGF5cycsICdzaG93V2Vla2RheXMnLCAnc2hvd1dlZWtOdW1iZXJzJywgJ3N0YXJ0RGF0ZSddXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXNbaW5wdXRdID0gY29uZmlnW2lucHV0XSk7XG5cbiAgICBfc2VydmljZS5kYXRlU2VsZWN0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKGRhdGUgPT4geyB0aGlzLmRhdGVTZWxlY3QuZW1pdChkYXRlKTsgfSk7XG5cbiAgICBfc2VydmljZS5tb2RlbCQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpLnN1YnNjcmliZShtb2RlbCA9PiB7XG4gICAgICBjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xuICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZpcnN0RGF0ZSA6IG51bGw7XG5cbiAgICAgIC8vIHVwZGF0ZSBwdWJsaWMgc3RhdGVcbiAgICAgIHRoaXMuX3B1YmxpY1N0YXRlID0ge1xuICAgICAgICBtYXhEYXRlOiBtb2RlbC5tYXhEYXRlLFxuICAgICAgICBtaW5EYXRlOiBtb2RlbC5taW5EYXRlLFxuICAgICAgICBmaXJzdERhdGU6IG1vZGVsLmZpcnN0RGF0ZSxcbiAgICAgICAgbGFzdERhdGU6IG1vZGVsLmxhc3REYXRlLFxuICAgICAgICBmb2N1c2VkRGF0ZTogbW9kZWwuZm9jdXNEYXRlLFxuICAgICAgICBtb250aHM6IG1vZGVsLm1vbnRocy5tYXAodmlld01vZGVsID0+IHZpZXdNb2RlbC5maXJzdERhdGUpXG4gICAgICB9O1xuXG4gICAgICBsZXQgbmF2aWdhdGlvblByZXZlbnRlZCA9IGZhbHNlO1xuICAgICAgLy8gZW1pdHRpbmcgbmF2aWdhdGlvbiBldmVudCBpZiB0aGUgZmlyc3QgbW9udGggY2hhbmdlc1xuICAgICAgaWYgKCFuZXdEYXRlLmVxdWFscyhvbGREYXRlKSkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xuICAgICAgICAgIGN1cnJlbnQ6IG9sZERhdGUgPyB7eWVhcjogb2xkRGF0ZS55ZWFyLCBtb250aDogb2xkRGF0ZS5tb250aH0gOiBudWxsLFxuICAgICAgICAgIG5leHQ6IHt5ZWFyOiBuZXdEYXRlLnllYXIsIG1vbnRoOiBuZXdEYXRlLm1vbnRofSxcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gbmF2aWdhdGlvblByZXZlbnRlZCA9IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FuJ3QgcHJldmVudCB0aGUgdmVyeSBmaXJzdCBuYXZpZ2F0aW9uXG4gICAgICAgIGlmIChuYXZpZ2F0aW9uUHJldmVudGVkICYmIG9sZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4ob2xkRGF0ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1NlbGVjdGVkRGF0ZSA9IG1vZGVsLnNlbGVjdGVkRGF0ZTtcbiAgICAgIGNvbnN0IG5ld0ZvY3VzZWREYXRlID0gbW9kZWwuZm9jdXNEYXRlO1xuICAgICAgY29uc3Qgb2xkRm9jdXNlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5mb2N1c0RhdGUgOiBudWxsO1xuXG4gICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgIC8vIGhhbmRsaW5nIHNlbGVjdGlvbiBjaGFuZ2VcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld1NlbGVjdGVkRGF0ZSwgdGhpcy5fY29udHJvbFZhbHVlKSkge1xuICAgICAgICB0aGlzLl9jb250cm9sVmFsdWUgPSBuZXdTZWxlY3RlZERhdGU7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdGb2N1c2VkRGF0ZSwgb2xkRm9jdXNlZERhdGUpICYmIG9sZEZvY3VzZWREYXRlICYmIG1vZGVsLmZvY3VzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIGNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICBSZXR1cm5zIHRoZSByZWFkb25seSBwdWJsaWMgc3RhdGUgb2YgdGhlIGRhdGVwaWNrZXJcbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqL1xuICBnZXQgc3RhdGUoKTogTmdiRGF0ZXBpY2tlclN0YXRlIHsgcmV0dXJuIHRoaXMuX3B1YmxpY1N0YXRlOyB9XG5cbiAgLyoqXG4gICAqICBSZXR1cm5zIHRoZSBjYWxlbmRhciBzZXJ2aWNlIHVzZWQgaW4gdGhlIHNwZWNpZmljIGRhdGVwaWNrZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqICBAc2luY2UgNS4zLjBcbiAgICovXG4gIGdldCBjYWxlbmRhcigpOiBOZ2JDYWxlbmRhciB7IHJldHVybiB0aGlzLl9jYWxlbmRhcjsgfVxuXG4gIC8qKlxuICAgKiAgRm9jdXNlcyBvbiBnaXZlbiBkYXRlLlxuICAgKi9cbiAgZm9jdXNEYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiB2b2lkIHsgdGhpcy5fc2VydmljZS5mb2N1cyhOZ2JEYXRlLmZyb20oZGF0ZSkpOyB9XG5cbiAgLyoqXG4gICAqICBTZWxlY3RzIGZvY3VzZWQgZGF0ZS5cbiAgICovXG4gIGZvY3VzU2VsZWN0KCk6IHZvaWQgeyB0aGlzLl9zZXJ2aWNlLmZvY3VzU2VsZWN0KCk7IH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPVxuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PignZGl2Lm5nYi1kcC1kYXlbdGFiaW5kZXg9XCIwXCJdJyk7XG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcbiAgICAgICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIHByb3ZpZGVkIGRhdGUuXG4gICAqXG4gICAqIFdpdGggdGhlIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuICAgKlxuICAgKiBVc2UgdGhlIGBbc3RhcnREYXRlXWAgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmUuXG4gICAqL1xuICBuYXZpZ2F0ZVRvKGRhdGU/OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9KSB7XG4gICAgdGhpcy5fc2VydmljZS5vcGVuKE5nYkRhdGUuZnJvbShkYXRlID8gZGF0ZS5kYXkgPyBkYXRlIGFzIE5nYkRhdGVTdHJ1Y3QgOiB7Li4uZGF0ZSwgZGF5OiAxfSA6IG51bGwpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgZm9jdXNJbnMkID0gZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KHRoaXMuX2NvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnZm9jdXNpbicpO1xuICAgICAgY29uc3QgZm9jdXNPdXRzJCA9IGZyb21FdmVudDxGb2N1c0V2ZW50Pih0aGlzLl9jb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ2ZvY3Vzb3V0Jyk7XG4gICAgICBjb25zdCB7bmF0aXZlRWxlbWVudH0gPSB0aGlzLl9lbGVtZW50UmVmO1xuXG4gICAgICAvLyB3ZSdyZSBjaGFuZ2luZyAnZm9jdXNWaXNpYmxlJyBvbmx5IHdoZW4gZW50ZXJpbmcgb3IgbGVhdmluZyBtb250aHMgdmlld1xuICAgICAgLy8gYW5kIGlnbm9yaW5nIGFsbCBmb2N1cyBldmVudHMgd2hlcmUgYm90aCAndGFyZ2V0JyBhbmQgJ3JlbGF0ZWQnIHRhcmdldCBhcmUgZGF5IGNlbGxzXG4gICAgICBtZXJnZShmb2N1c0lucyQsIGZvY3VzT3V0cyQpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICh7dGFyZ2V0LCByZWxhdGVkVGFyZ2V0fSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAhKGhhc0NsYXNzTmFtZSh0YXJnZXQsICduZ2ItZHAtZGF5JykgJiYgaGFzQ2xhc3NOYW1lKHJlbGF0ZWRUYXJnZXQsICduZ2ItZHAtZGF5JykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0IGFzIE5vZGUpICYmIG5hdGl2ZUVsZW1lbnQuY29udGFpbnMocmVsYXRlZFRhcmdldCBhcyBOb2RlKSkpLFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoe3R5cGV9KSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX3NlcnZpY2Uuc2V0KHtmb2N1c1Zpc2libGU6IHR5cGUgPT09ICdmb2N1c2luJ30pKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG4gICAgICBbJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ21hcmtEaXNhYmxlZCcsICdmaXJzdERheU9mV2VlaycsICduYXZpZ2F0aW9uJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsXG4gICAgICAgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgICAuZm9yRWFjaChuYW1lID0+IGlucHV0c1tuYW1lXSA9IHRoaXNbbmFtZV0pO1xuICAgICAgdGhpcy5fc2VydmljZS5zZXQoaW5wdXRzKTtcblxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmRheVRlbXBsYXRlKSB7XG4gICAgICB0aGlzLmRheVRlbXBsYXRlID0gdGhpcy5fZGVmYXVsdERheVRlbXBsYXRlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBpbnB1dHM6IERhdGVwaWNrZXJTZXJ2aWNlSW5wdXRzID0ge307XG4gICAgWydkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdtYXJrRGlzYWJsZWQnLCAnZmlyc3REYXlPZldlZWsnLCAnbmF2aWdhdGlvbicsICdtaW5EYXRlJywgJ21heERhdGUnLFxuICAgICAnb3V0c2lkZURheXMnXVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSBpbiBjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaChuYW1lID0+IGlucHV0c1tuYW1lXSA9IHRoaXNbbmFtZV0pO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0KGlucHV0cyk7XG5cbiAgICBpZiAoJ3N0YXJ0RGF0ZScgaW4gY2hhbmdlcykge1xuICAgICAgY29uc3Qge2N1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZX0gPSBjaGFuZ2VzLnN0YXJ0RGF0ZTtcbiAgICAgIGlmIChpc0NoYW5nZWRNb250aChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25EYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VsZWN0KGRhdGUsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgfVxuXG4gIG9uTmF2aWdhdGVEYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHsgdGhpcy5fc2VydmljZS5vcGVuKGRhdGUpOyB9XG5cbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5QUkVWOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuTkVYVDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5fc2VydmljZS5zZXQoe2Rpc2FibGVkfSk7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlID0gTmdiRGF0ZS5mcm9tKHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VsZWN0KHRoaXMuX2NvbnRyb2xWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==