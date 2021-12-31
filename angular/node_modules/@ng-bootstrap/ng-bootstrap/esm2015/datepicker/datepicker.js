import { __decorate } from "tslib";
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
export const NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbDatepicker),
    multi: true
};
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
let NgbDatepickerContent = class NgbDatepickerContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
NgbDatepickerContent.ctorParameters = () => [
    { type: TemplateRef }
];
NgbDatepickerContent = __decorate([
    Directive({ selector: 'ng-template[ngbDatepickerContent]' })
], NgbDatepickerContent);
export { NgbDatepickerContent };
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
let NgbDatepicker = class NgbDatepicker {
    constructor(_service, _calendar, i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
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
        this.onChange = (_) => { };
        this.onTouched = () => { };
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(input => this[input] = config[input]);
        _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe(date => { this.dateSelect.emit(date); });
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(model => {
            const newDate = model.firstDate;
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map(viewModel => viewModel.firstDate)
            };
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: () => navigationPrevented = true
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            const newSelectedDate = model.selectedDate;
            const newFocusedDate = model.focusDate;
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
        });
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state() { return this._publicState; }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar() { return this._calendar; }
    /**
     *  Focuses on given date.
     */
    focusDate(date) { this._service.focus(NgbDate.from(date)); }
    /**
     *  Selects focused date.
     */
    focusSelect() { this._service.focusSelect(); }
    focus() {
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? date.day ? date : Object.assign(Object.assign({}, date), { day: 1 }) : null));
    }
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular(() => {
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            const { nativeElement } = this._elementRef;
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter(({ target, relatedTarget }) => !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day') &&
                nativeElement.contains(target) && nativeElement.contains(relatedTarget))), takeUntil(this._destroyed$))
                .subscribe(({ type }) => this._ngZone.run(() => this._service.set({ focusVisible: type === 'focusin' })));
        });
    }
    ngOnDestroy() { this._destroyed$.next(); }
    ngOnInit() {
        if (this.model === undefined) {
            const inputs = {};
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach(name => inputs[name] = this[name]);
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
    }
    ngOnChanges(changes) {
        const inputs = {};
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter(name => name in changes)
            .forEach(name => inputs[name] = this[name]);
        this._service.set(inputs);
        if ('startDate' in changes) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    onNavigateDateSelect(date) { this._service.open(date); }
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
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    setDisabledState(disabled) { this._service.set({ disabled }); }
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
};
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
        template: `
    <ng-template #defaultDayTemplate let-date="date" let-currentMonth="currentMonth" let-selected="selected"
                 let-disabled="disabled" let-focused="focused">
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
        [date]="model.firstDate!"
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
    })
], NgbDatepicker);
export { NgbDatepicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRixPQUFPLEVBQXNCLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBQyxNQUFNLG9CQUFv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SSxFQUFDLENBQUM7aURBQTZDO0FBQzlCO0lBQW5ELFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztzREFBdUM7QUFhakY7SUFBUixLQUFLLEVBQUU7a0RBQThDO0FBVTdDO0lBQVIsS0FBSyxFQUFFO3NEQUFrRjtBQUtqRjtJQUFSLEtBQUssRUFBRTtvREFBdUI7QUFPdEI7SUFBUixLQUFLLEVBQUU7cURBQXdCO0FBT3ZCO0lBQVIsS0FBSyxFQUFFO3FEQUFrQztBQVNqQztJQUFSLEtBQUssRUFBRTttREFBbUY7QUFPbEY7SUFBUixLQUFLLEVBQUU7OENBQXdCO0FBT3ZCO0lBQVIsS0FBSyxFQUFFOzhDQUF3QjtBQVN2QjtJQUFSLEtBQUssRUFBRTtpREFBMEM7QUFXekM7SUFBUixLQUFLLEVBQUU7a0RBQWlEO0FBS2hEO0lBQVIsS0FBSyxFQUFFO21EQUF1QjtBQUt0QjtJQUFSLEtBQUssRUFBRTtzREFBMEI7QUFVekI7SUFBUixLQUFLLEVBQUU7Z0RBQXdEO0FBT3REO0lBQVQsTUFBTSxFQUFFOytDQUEyRDtBQVMxRDtJQUFULE1BQU0sRUFBRTtpREFBMEM7QUFVekM7SUFBVCxNQUFNLEVBQUU7NkNBQTBCO0FBN0l4QixhQUFhO0lBakR6QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBRXJDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDVDtRQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLG9CQUFvQixDQUFDOztLQUNqRSxDQUFDO0dBQ1csYUFBYSxDQThVekI7U0E5VVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgdGFrZSwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtEYXRlcGlja2VyU2VydmljZUlucHV0cywgTmdiRGF0ZXBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmF2aWdhdGlvbkV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYkRhdGVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5pbXBvcnQge2lzQ2hhbmdlZERhdGUsIGlzQ2hhbmdlZE1vbnRofSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xuaW1wb3J0IHtoYXNDbGFzc05hbWV9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0aGUgbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCB0aGUgbW9udGggZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyIGNoYW5nZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGguXG4gICAqL1xuICBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB3ZSdyZSBuYXZpZ2F0aW5nIHRvLlxuICAgKi9cbiAgbmV4dDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgbmF2aWdhdGlvbiBmcm9tIGhhcHBlbmluZy5cbiAgICpcbiAgICogQHNpbmNlIDQuMS4wXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIHRoZSByZWFkb25seSBwdWJsaWMgc3RhdGUgb2YgdGhlIGRhdGVwaWNrZXIuXG4gKlxuICogQWNjZXNzaWJsZSB2aWEgdGhlIGBkYXRlcGlja2VyLnN0YXRlYCBnZXR0ZXJcbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JEYXRlcGlja2VyU3RhdGUge1xuICAvKipcbiAgICogVGhlIGVhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgZGlzcGxheWVkIG9yIHNlbGVjdGVkXG4gICAqL1xuICByZWFkb25seSBtaW5EYXRlOiBOZ2JEYXRlIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGxhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZFxuICAgKi9cbiAgcmVhZG9ubHkgbWF4RGF0ZTogTmdiRGF0ZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJzdCB2aXNpYmxlIGRhdGUgb2YgY3VycmVudGx5IGRpc3BsYXllZCBtb250aHNcbiAgICovXG4gIHJlYWRvbmx5IGZpcnN0RGF0ZTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogVGhlIGxhc3QgdmlzaWJsZSBkYXRlIG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhzXG4gICAqL1xuICByZWFkb25seSBsYXN0RGF0ZTogTmdiRGF0ZTtcblxuICAvKipcbiAgICogVGhlIGRhdGUgY3VycmVudGx5IGZvY3VzZWQgYnkgdGhlIGRhdGVwaWNrZXJcbiAgICovXG4gIHJlYWRvbmx5IGZvY3VzZWREYXRlOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBGaXJzdCBkYXRlcyBvZiBtb250aHMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlclxuICAgKlxuICAgKiBAc2luY2UgNS4zLjBcbiAgICovXG4gIHJlYWRvbmx5IG1vbnRoczogTmdiRGF0ZVtdO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFya3MgdGhlIGNvbnRlbnQgdGVtcGxhdGUgdGhhdCBjdXN0b21pemVzIHRoZSB3YXkgZGF0ZXBpY2tlciBtb250aHMgYXJlIGRpc3BsYXllZFxuICpcbiAqIEBzaW5jZSA1LjMuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYkRhdGVwaWNrZXJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgaGlnaGx5IGNvbmZpZ3VyYWJsZSBjb21wb25lbnQgdGhhdCBoZWxwcyB5b3Ugd2l0aCBzZWxlY3RpbmcgY2FsZW5kYXIgZGF0ZXMuXG4gKlxuICogYE5nYkRhdGVwaWNrZXJgIGlzIG1lYW50IHRvIGJlIGRpc3BsYXllZCBpbmxpbmUgb24gYSBwYWdlIG9yIHB1dCBpbnNpZGUgYSBwb3B1cC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RGF5VGVtcGxhdGUgbGV0LWRhdGU9XCJkYXRlXCIgbGV0LWN1cnJlbnRNb250aD1cImN1cnJlbnRNb250aFwiIGxldC1zZWxlY3RlZD1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIiBsZXQtZm9jdXNlZD1cImZvY3VzZWRcIj5cbiAgICAgIDxkaXYgbmdiRGF0ZXBpY2tlckRheVZpZXdcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICAgIFtjdXJyZW50TW9udGhdPVwiY3VycmVudE1vbnRoXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW2ZvY3VzZWRdPVwiZm9jdXNlZFwiPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdENvbnRlbnRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vZGVsLm1vbnRoczsgbGV0IGkgPSBpbmRleDtcIiBjbGFzcz1cIm5nYi1kcC1tb250aFwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIiBjbGFzcz1cIm5nYi1kcC1tb250aC1uYW1lXCI+XG4gICAgICAgICAge3sgaTE4bi5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLm51bWJlciwgbW9udGgueWVhcikgfX0ge3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMobW9udGgueWVhcikgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZ2ItZGF0ZXBpY2tlci1tb250aCBbbW9udGhdPVwibW9udGguZmlyc3REYXRlXCI+PC9uZ2ItZGF0ZXBpY2tlci1tb250aD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlclwiPlxuICAgICAgPG5nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24gKm5nSWY9XCJuYXZpZ2F0aW9uICE9PSAnbm9uZSdcIlxuICAgICAgICBbZGF0ZV09XCJtb2RlbC5maXJzdERhdGUhXCJcbiAgICAgICAgW21vbnRoc109XCJtb2RlbC5tb250aHNcIlxuICAgICAgICBbZGlzYWJsZWRdPVwibW9kZWwuZGlzYWJsZWRcIlxuICAgICAgICBbc2hvd1NlbGVjdF09XCJtb2RlbC5uYXZpZ2F0aW9uID09PSAnc2VsZWN0J1wiXG4gICAgICAgIFtwcmV2RGlzYWJsZWRdPVwibW9kZWwucHJldkRpc2FibGVkXCJcbiAgICAgICAgW25leHREaXNhYmxlZF09XCJtb2RlbC5uZXh0RGlzYWJsZWRcIlxuICAgICAgICBbc2VsZWN0Qm94ZXNdPVwibW9kZWwuc2VsZWN0Qm94ZXNcIlxuICAgICAgICAobmF2aWdhdGUpPVwib25OYXZpZ2F0ZUV2ZW50KCRldmVudClcIlxuICAgICAgICAoc2VsZWN0KT1cIm9uTmF2aWdhdGVEYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgIDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtY29udGVudFwiIFtjbGFzcy5uZ2ItZHAtbW9udGhzXT1cIiFjb250ZW50VGVtcGxhdGVcIiAjY29udGVudD5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGU/LnRlbXBsYXRlUmVmIHx8IGRlZmF1bHRDb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsIE5nYkRhdGVwaWNrZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyIGltcGxlbWVudHMgT25EZXN0cm95LFxuICAgIE9uQ2hhbmdlcywgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hdXRvQ2xvc2U6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uYXZpZ2F0aW9uOiBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vdXRzaWRlRGF5czogc3RyaW5nO1xuXG4gIG1vZGVsOiBEYXRlcGlja2VyVmlld01vZGVsO1xuXG4gIEBWaWV3Q2hpbGQoJ2RlZmF1bHREYXlUZW1wbGF0ZScsIHtzdGF0aWM6IHRydWV9KSBwcml2YXRlIF9kZWZhdWx0RGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSBfY29udGVudEVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQENvbnRlbnRDaGlsZChOZ2JEYXRlcGlja2VyQ29udGVudCwge3N0YXRpYzogdHJ1ZX0pIGNvbnRlbnRUZW1wbGF0ZTogTmdiRGF0ZXBpY2tlckNvbnRlbnQ7XG5cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlOiBOZ2JEYXRlIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9wdWJsaWNTdGF0ZTogTmdiRGF0ZXBpY2tlclN0YXRlID0gPGFueT57fTtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheS5cbiAgICpcbiAgICogQWxsb3dzIHRvIGNvbXBsZXRlbHkgb3ZlcnJpZGUgdGhlIHdheSBhIGRheSAnY2VsbCcgaW4gdGhlIGNhbGVuZGFyIGlzIGRpc3BsYXllZC5cbiAgICpcbiAgICogU2VlIFtgRGF5VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0RheVRlbXBsYXRlQ29udGV4dCkgZm9yIHRoZSBkYXRhIHlvdSBnZXQgaW5zaWRlLlxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayB0byBwYXNzIGFueSBhcmJpdHJhcnkgZGF0YSB0byB0aGUgdGVtcGxhdGUgY2VsbCB2aWEgdGhlXG4gICAqIFtgRGF5VGVtcGxhdGVDb250ZXh0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI0RheVRlbXBsYXRlQ29udGV4dCkncyBgZGF0YWAgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBgY3VycmVudGAgaXMgdGhlIG1vbnRoIHRoYXQgaXMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlci5cbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBASW5wdXQoKSBkYXlUZW1wbGF0ZURhdGE6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50Pzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheS5cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICpcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1bi5cbiAgICovXG4gIEBJbnB1dCgpIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRhdGVwaWNrZXIgZm9vdGVyLlxuICAgKlxuICAgKiBAc2luY2UgMy4zLjBcbiAgICovXG4gIEBJbnB1dCgpIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdG8gbWFyayBzb21lIGRhdGVzIGFzIGRpc2FibGVkLlxuICAgKlxuICAgKiBJdCBpcyBjYWxsZWQgZm9yIGVhY2ggbmV3IGRhdGUgd2hlbiBuYXZpZ2F0aW5nIHRvIGEgZGlmZmVyZW50IG1vbnRoLlxuICAgKlxuICAgKiBgY3VycmVudGAgaXMgdGhlIG1vbnRoIHRoYXQgaXMgY3VycmVudGx5IGRpc3BsYXllZCBieSB0aGUgZGF0ZXBpY2tlci5cbiAgICovXG4gIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ/OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGxhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZC5cbiAgICpcbiAgICogSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYWZ0ZXIgdGhlIGN1cnJlbnQgbW9udGguXG4gICAqL1xuICBASW5wdXQoKSBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBUaGUgZWFybGllc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGJlZm9yZSB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdHlwZS5cbiAgICpcbiAgICogKiBgXCJzZWxlY3RcImAgLSBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCBuYXZpZ2F0aW9uIGFycm93c1xuICAgKiAqIGBcImFycm93c1wiYCAtIG9ubHkgbmF2aWdhdGlvbiBhcnJvd3NcbiAgICogKiBgXCJub25lXCJgIC0gbm8gbmF2aWdhdGlvbiB2aXNpYmxlIGF0IGFsbFxuICAgKi9cbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuICAvKipcbiAgICogVGhlIHdheSBvZiBkaXNwbGF5aW5nIGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgbW9udGguXG4gICAqXG4gICAqICogYFwidmlzaWJsZVwiYCAtIGRheXMgYXJlIHZpc2libGVcbiAgICogKiBgXCJoaWRkZW5cImAgLSBkYXlzIGFyZSBoaWRkZW4sIHdoaXRlIHNwYWNlIHByZXNlcnZlZFxuICAgKiAqIGBcImNvbGxhcHNlZFwiYCAtIGRheXMgYXJlIGNvbGxhcHNlZCwgc28gdGhlIGRhdGVwaWNrZXIgaGVpZ2h0IG1pZ2h0IGNoYW5nZSBiZXR3ZWVuIG1vbnRoc1xuICAgKlxuICAgKiBGb3IgdGhlIDIrIG1vbnRocyB2aWV3LCBkYXlzIGluIGJldHdlZW4gbW9udGhzIGFyZSBuZXZlciBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHdlZWtkYXlzIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd1dlZWtkYXlzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHdlZWsgbnVtYmVycyB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGRhdGUgdG8gb3BlbiBjYWxlbmRhciB3aXRoLlxuICAgKlxuICAgKiBXaXRoIHRoZSBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuICAgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBpcyBwcm92aWRlZCwgY2FsZW5kYXIgd2lsbCBvcGVuIHdpdGggY3VycmVudCBtb250aC5cbiAgICpcbiAgICogWW91IGNvdWxkIHVzZSBgbmF2aWdhdGVUbyhkYXRlKWAgbWV0aG9kIGFzIGFuIGFsdGVybmF0aXZlLlxuICAgKi9cbiAgQElucHV0KCkgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9O1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0aGUgbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBkaXNwbGF5ZWQgbW9udGggY2hhbmdlcy5cbiAgICpcbiAgICogU2VlIFtgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnRgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQpIGZvciB0aGUgcGF5bG9hZCBpbmZvLlxuICAgKi9cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXG4gICAqXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgYE5nYkRhdGVgLlxuICAgKlxuICAgKiBAc2luY2UgNS4yLjBcbiAgICovXG4gIEBPdXRwdXQoKSBkYXRlU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdXNlciBzZWxlY3RzIGEgZGF0ZSB1c2luZyBrZXlib2FyZCBvciBtb3VzZS5cbiAgICpcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBgTmdiRGF0ZWAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgJ2RhdGVTZWxlY3QnIG91dHB1dCBpbnN0ZWFkIGR1ZSB0byBjb2xsaXNpb24gd2l0aCBuYXRpdmVcbiAgICogJ3NlbGVjdCcgZXZlbnQuXG4gICAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ID0gdGhpcy5kYXRlU2VsZWN0O1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsIHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhciwgcHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLFxuICAgICAgY29uZmlnOiBOZ2JEYXRlcGlja2VyQ29uZmlnLCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgcHJpdmF0ZSBfbmdiRGF0ZUFkYXB0ZXI6IE5nYkRhdGVBZGFwdGVyPGFueT4sIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG4gICAgWydkYXlUZW1wbGF0ZScsICdkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdmb290ZXJUZW1wbGF0ZScsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsXG4gICAgICdtYXhEYXRlJywgJ25hdmlnYXRpb24nLCAnb3V0c2lkZURheXMnLCAnc2hvd1dlZWtkYXlzJywgJ3Nob3dXZWVrTnVtYmVycycsICdzdGFydERhdGUnXVxuICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzW2lucHV0XSA9IGNvbmZpZ1tpbnB1dF0pO1xuXG4gICAgX3NlcnZpY2UuZGF0ZVNlbGVjdCQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpLnN1YnNjcmliZShkYXRlID0+IHsgdGhpcy5kYXRlU2VsZWN0LmVtaXQoZGF0ZSk7IH0pO1xuXG4gICAgX3NlcnZpY2UubW9kZWwkLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpKS5zdWJzY3JpYmUobW9kZWwgPT4ge1xuICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vZGVsLmZpcnN0RGF0ZSAhO1xuICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZpcnN0RGF0ZSA6IG51bGw7XG5cbiAgICAgIC8vIHVwZGF0ZSBwdWJsaWMgc3RhdGVcbiAgICAgIHRoaXMuX3B1YmxpY1N0YXRlID0ge1xuICAgICAgICBtYXhEYXRlOiBtb2RlbC5tYXhEYXRlLFxuICAgICAgICBtaW5EYXRlOiBtb2RlbC5taW5EYXRlLFxuICAgICAgICBmaXJzdERhdGU6IG1vZGVsLmZpcnN0RGF0ZSAhLFxuICAgICAgICBsYXN0RGF0ZTogbW9kZWwubGFzdERhdGUgISxcbiAgICAgICAgZm9jdXNlZERhdGU6IG1vZGVsLmZvY3VzRGF0ZSAhLFxuICAgICAgICBtb250aHM6IG1vZGVsLm1vbnRocy5tYXAodmlld01vZGVsID0+IHZpZXdNb2RlbC5maXJzdERhdGUpXG4gICAgICB9O1xuXG4gICAgICBsZXQgbmF2aWdhdGlvblByZXZlbnRlZCA9IGZhbHNlO1xuICAgICAgLy8gZW1pdHRpbmcgbmF2aWdhdGlvbiBldmVudCBpZiB0aGUgZmlyc3QgbW9udGggY2hhbmdlc1xuICAgICAgaWYgKCFuZXdEYXRlLmVxdWFscyhvbGREYXRlKSkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xuICAgICAgICAgIGN1cnJlbnQ6IG9sZERhdGUgPyB7eWVhcjogb2xkRGF0ZS55ZWFyLCBtb250aDogb2xkRGF0ZS5tb250aH0gOiBudWxsLFxuICAgICAgICAgIG5leHQ6IHt5ZWFyOiBuZXdEYXRlLnllYXIsIG1vbnRoOiBuZXdEYXRlLm1vbnRofSxcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gbmF2aWdhdGlvblByZXZlbnRlZCA9IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FuJ3QgcHJldmVudCB0aGUgdmVyeSBmaXJzdCBuYXZpZ2F0aW9uXG4gICAgICAgIGlmIChuYXZpZ2F0aW9uUHJldmVudGVkICYmIG9sZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4ob2xkRGF0ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1NlbGVjdGVkRGF0ZSA9IG1vZGVsLnNlbGVjdGVkRGF0ZTtcbiAgICAgIGNvbnN0IG5ld0ZvY3VzZWREYXRlID0gbW9kZWwuZm9jdXNEYXRlO1xuICAgICAgY29uc3Qgb2xkRm9jdXNlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5mb2N1c0RhdGUgOiBudWxsO1xuXG4gICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgIC8vIGhhbmRsaW5nIHNlbGVjdGlvbiBjaGFuZ2VcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld1NlbGVjdGVkRGF0ZSwgdGhpcy5fY29udHJvbFZhbHVlKSkge1xuICAgICAgICB0aGlzLl9jb250cm9sVmFsdWUgPSBuZXdTZWxlY3RlZERhdGU7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdGb2N1c2VkRGF0ZSwgb2xkRm9jdXNlZERhdGUpICYmIG9sZEZvY3VzZWREYXRlICYmIG1vZGVsLmZvY3VzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIGNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICBSZXR1cm5zIHRoZSByZWFkb25seSBwdWJsaWMgc3RhdGUgb2YgdGhlIGRhdGVwaWNrZXJcbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqL1xuICBnZXQgc3RhdGUoKTogTmdiRGF0ZXBpY2tlclN0YXRlIHsgcmV0dXJuIHRoaXMuX3B1YmxpY1N0YXRlOyB9XG5cbiAgLyoqXG4gICAqICBSZXR1cm5zIHRoZSBjYWxlbmRhciBzZXJ2aWNlIHVzZWQgaW4gdGhlIHNwZWNpZmljIGRhdGVwaWNrZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqICBAc2luY2UgNS4zLjBcbiAgICovXG4gIGdldCBjYWxlbmRhcigpOiBOZ2JDYWxlbmRhciB7IHJldHVybiB0aGlzLl9jYWxlbmRhcjsgfVxuXG4gIC8qKlxuICAgKiAgRm9jdXNlcyBvbiBnaXZlbiBkYXRlLlxuICAgKi9cbiAgZm9jdXNEYXRlKGRhdGU/OiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IHZvaWQgeyB0aGlzLl9zZXJ2aWNlLmZvY3VzKE5nYkRhdGUuZnJvbShkYXRlKSk7IH1cblxuICAvKipcbiAgICogIFNlbGVjdHMgZm9jdXNlZCBkYXRlLlxuICAgKi9cbiAgZm9jdXNTZWxlY3QoKTogdm9pZCB7IHRoaXMuX3NlcnZpY2UuZm9jdXNTZWxlY3QoKTsgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTERpdkVsZW1lbnQ+KCdkaXYubmdiLWRwLWRheVt0YWJpbmRleD1cIjBcIl0nKTtcbiAgICAgIGlmIChlbGVtZW50VG9Gb2N1cykge1xuICAgICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgcHJvdmlkZWQgZGF0ZS5cbiAgICpcbiAgICogV2l0aCB0aGUgZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXG4gICAqXG4gICAqIFVzZSB0aGUgYFtzdGFydERhdGVdYCBpbnB1dCBhcyBhbiBhbHRlcm5hdGl2ZS5cbiAgICovXG4gIG5hdmlnYXRlVG8oZGF0ZT86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheT86IG51bWJlcn0pIHtcbiAgICB0aGlzLl9zZXJ2aWNlLm9wZW4oTmdiRGF0ZS5mcm9tKGRhdGUgPyBkYXRlLmRheSA/IGRhdGUgYXMgTmdiRGF0ZVN0cnVjdCA6IHsuLi5kYXRlLCBkYXk6IDF9IDogbnVsbCkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBmb2N1c0lucyQgPSBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4odGhpcy5fY29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdmb2N1c2luJyk7XG4gICAgICBjb25zdCBmb2N1c091dHMkID0gZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KHRoaXMuX2NvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnZm9jdXNvdXQnKTtcbiAgICAgIGNvbnN0IHtuYXRpdmVFbGVtZW50fSA9IHRoaXMuX2VsZW1lbnRSZWY7XG5cbiAgICAgIC8vIHdlJ3JlIGNoYW5naW5nICdmb2N1c1Zpc2libGUnIG9ubHkgd2hlbiBlbnRlcmluZyBvciBsZWF2aW5nIG1vbnRocyB2aWV3XG4gICAgICAvLyBhbmQgaWdub3JpbmcgYWxsIGZvY3VzIGV2ZW50cyB3aGVyZSBib3RoICd0YXJnZXQnIGFuZCAncmVsYXRlZCcgdGFyZ2V0IGFyZSBkYXkgY2VsbHNcbiAgICAgIG1lcmdlKGZvY3VzSW5zJCwgZm9jdXNPdXRzJClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgKHt0YXJnZXQsIHJlbGF0ZWRUYXJnZXR9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICEoaGFzQ2xhc3NOYW1lKHRhcmdldCwgJ25nYi1kcC1kYXknKSAmJiBoYXNDbGFzc05hbWUocmVsYXRlZFRhcmdldCwgJ25nYi1kcC1kYXknKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQgYXMgTm9kZSkgJiYgbmF0aXZlRWxlbWVudC5jb250YWlucyhyZWxhdGVkVGFyZ2V0IGFzIE5vZGUpKSksXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh7dHlwZX0pID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fc2VydmljZS5zZXQoe2ZvY3VzVmlzaWJsZTogdHlwZSA9PT0gJ2ZvY3VzaW4nfSkpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9kZXN0cm95ZWQkLm5leHQoKTsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1vZGVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlucHV0czogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMgPSB7fTtcbiAgICAgIFsnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJyxcbiAgICAgICAnb3V0c2lkZURheXMnXVxuICAgICAgICAgIC5mb3JFYWNoKG5hbWUgPT4gaW5wdXRzW25hbWVdID0gdGhpc1tuYW1lXSk7XG4gICAgICB0aGlzLl9zZXJ2aWNlLnNldChpbnB1dHMpO1xuXG4gICAgICB0aGlzLm5hdmlnYXRlVG8odGhpcy5zdGFydERhdGUpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZGF5VGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuZGF5VGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0RGF5VGVtcGxhdGU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGlucHV0czogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMgPSB7fTtcbiAgICBbJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ21hcmtEaXNhYmxlZCcsICdmaXJzdERheU9mV2VlaycsICduYXZpZ2F0aW9uJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsXG4gICAgICdvdXRzaWRlRGF5cyddXG4gICAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lIGluIGNoYW5nZXMpXG4gICAgICAgIC5mb3JFYWNoKG5hbWUgPT4gaW5wdXRzW25hbWVdID0gdGhpc1tuYW1lXSk7XG4gICAgdGhpcy5fc2VydmljZS5zZXQoaW5wdXRzKTtcblxuICAgIGlmICgnc3RhcnREYXRlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICBjb25zdCB7Y3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlfSA9IGNoYW5nZXMuc3RhcnREYXRlO1xuICAgICAgaWYgKGlzQ2hhbmdlZE1vbnRoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkRhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkge1xuICAgIHRoaXMuX3NlcnZpY2UuZm9jdXMoZGF0ZSk7XG4gICAgdGhpcy5fc2VydmljZS5zZWxlY3QoZGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICB9XG5cbiAgb25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkgeyB0aGlzLl9zZXJ2aWNlLm9wZW4oZGF0ZSk7IH1cblxuICBvbk5hdmlnYXRlRXZlbnQoZXZlbnQ6IE5hdmlnYXRpb25FdmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgIGNhc2UgTmF2aWdhdGlvbkV2ZW50LlBSRVY6XG4gICAgICAgIHRoaXMuX3NlcnZpY2Uub3Blbih0aGlzLl9jYWxlbmRhci5nZXRQcmV2KHRoaXMubW9kZWwuZmlyc3REYXRlICEsICdtJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTmF2aWdhdGlvbkV2ZW50Lk5FWFQ6XG4gICAgICAgIHRoaXMuX3NlcnZpY2Uub3Blbih0aGlzLl9jYWxlbmRhci5nZXROZXh0KHRoaXMubW9kZWwuZmlyc3REYXRlICEsICdtJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5fc2VydmljZS5zZXQoe2Rpc2FibGVkfSk7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlID0gTmdiRGF0ZS5mcm9tKHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VsZWN0KHRoaXMuX2NvbnRyb2xWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==