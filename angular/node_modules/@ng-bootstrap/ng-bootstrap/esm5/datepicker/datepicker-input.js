import { __decorate, __param } from "tslib";
import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ngbAutoClose } from '../util/autoclose';
import { ngbFocusTrap } from '../util/focus-trap';
import { positionElements } from '../util/positioning';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepicker } from './datepicker';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDateParserFormatter } from './ngb-date-parser-formatter';
import { NgbInputDatepickerConfig } from './datepicker-input-config';
import { NgbDatepickerConfig } from './datepicker-config';
import { isString } from '../util/util';
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbInputDatepicker; }),
    multi: true
};
var NGB_DATEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return NgbInputDatepicker; }),
    multi: true
};
/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
var NgbInputDatepicker = /** @class */ (function () {
    function NgbInputDatepicker(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, _ngZone, _calendar, _dateAdapter, _document, _changeDetector, config) {
        var _this = this;
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._cfr = _cfr;
        this._ngZone = _ngZone;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._changeDetector = _changeDetector;
        this._cRef = null;
        this._disabled = false;
        this._elWithFocus = null;
        this._model = null;
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * Event emitted right after the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired after closing datepicker window.
         *
         * @since 4.2.0
         */
        this.closed = new EventEmitter();
        this._onChange = function (_) { };
        this._onTouched = function () { };
        this._validatorChange = function () { };
        ['autoClose', 'container', 'positionTarget', 'placement'].forEach(function (input) { return _this[input] = config[input]; });
        this._zoneSubscription = _ngZone.onStable.subscribe(function () { return _this._updatePopupPosition(); });
    }
    Object.defineProperty(NgbInputDatepicker.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value === '' || (value && value !== 'false');
            if (this.isOpen()) {
                this._cRef.instance.setDisabledState(this._disabled);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgbInputDatepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    NgbInputDatepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    NgbInputDatepicker.prototype.registerOnValidatorChange = function (fn) { this._validatorChange = fn; };
    NgbInputDatepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    NgbInputDatepicker.prototype.validate = function (c) {
        var value = c.value;
        if (value != null) {
            var ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
            if (!ngbDate) {
                return { 'ngbDate': { invalid: value } };
            }
            if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                return { 'ngbDate': { minDate: { minDate: this.minDate, actual: value } } };
            }
            if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                return { 'ngbDate': { maxDate: { maxDate: this.maxDate, actual: value } } };
            }
        }
        return null;
    };
    NgbInputDatepicker.prototype.writeValue = function (value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    };
    NgbInputDatepicker.prototype.manualDateChange = function (value, updateView) {
        if (updateView === void 0) { updateView = false; }
        var inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    };
    NgbInputDatepicker.prototype.isOpen = function () { return !!this._cRef; };
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    NgbInputDatepicker.prototype.open = function () {
        var _this = this;
        if (!this.isOpen()) {
            var cf = this._cfr.resolveComponentFactory(NgbDatepicker);
            this._cRef = this._vcRef.createComponent(cf);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange(function (selectedDate) {
                _this.writeValue(selectedDate);
                _this._onChange(selectedDate);
                _this._onTouched();
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            this._elWithFocus = this._document.activeElement;
            ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
            this._cRef.instance.focus();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, function () { return _this.close(); }, this.closed, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
        }
    };
    /**
     * Closes the datepicker popup.
     */
    NgbInputDatepicker.prototype.close = function () {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this.closed.emit();
            this._changeDetector.markForCheck();
            // restore focus
            var elementToFocus = this._elWithFocus;
            if (isString(this.restoreFocus)) {
                elementToFocus = this._document.querySelector(this.restoreFocus);
            }
            else if (this.restoreFocus !== undefined) {
                elementToFocus = this.restoreFocus;
            }
            // in IE document.activeElement can contain an object without 'focus()' sometimes
            if (elementToFocus && elementToFocus['focus']) {
                elementToFocus.focus();
            }
            else {
                this._document.body.focus();
            }
        }
    };
    /**
     * Toggles the datepicker popup.
     */
    NgbInputDatepicker.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    NgbInputDatepicker.prototype.navigateTo = function (date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    };
    NgbInputDatepicker.prototype.onBlur = function () { this._onTouched(); };
    NgbInputDatepicker.prototype.onFocus = function () { this._elWithFocus = this._elRef.nativeElement; };
    NgbInputDatepicker.prototype.ngOnChanges = function (changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
            if (this.isOpen()) {
                if (changes['minDate']) {
                    this._cRef.instance.minDate = this.minDate;
                }
                if (changes['maxDate']) {
                    this._cRef.instance.maxDate = this.maxDate;
                }
                this._cRef.instance.ngOnChanges(changes);
            }
        }
    };
    NgbInputDatepicker.prototype.ngOnDestroy = function () {
        this.close();
        this._zoneSubscription.unsubscribe();
    };
    NgbInputDatepicker.prototype._applyDatepickerInputs = function (datepickerInstance) {
        var _this = this;
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
            .forEach(function (optionName) {
            if (_this[optionName] !== undefined) {
                datepickerInstance[optionName] = _this[optionName];
            }
        });
        datepickerInstance.startDate = this.startDate || this._model;
    };
    NgbInputDatepicker.prototype._applyPopupStyling = function (nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.addClass(nativeElement, 'show');
        if (this.container === 'body') {
            this._renderer.addClass(nativeElement, 'ngb-dp-body');
        }
    };
    NgbInputDatepicker.prototype._subscribeForDatepickerOutputs = function (datepickerInstance) {
        var _this = this;
        datepickerInstance.navigate.subscribe(function (navigateEvent) { return _this.navigate.emit(navigateEvent); });
        datepickerInstance.dateSelect.subscribe(function (date) {
            _this.dateSelect.emit(date);
            if (_this.autoClose === true || _this.autoClose === 'inside') {
                _this.close();
            }
        });
    };
    NgbInputDatepicker.prototype._writeModelValue = function (model) {
        var value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    };
    NgbInputDatepicker.prototype._fromDateStruct = function (date) {
        var ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    };
    NgbInputDatepicker.prototype._updatePopupPosition = function () {
        if (!this._cRef) {
            return;
        }
        var hostElement;
        if (isString(this.positionTarget)) {
            hostElement = this._document.querySelector(this.positionTarget);
        }
        else if (this.positionTarget instanceof HTMLElement) {
            hostElement = this.positionTarget;
        }
        else {
            hostElement = this._elRef.nativeElement;
        }
        if (this.positionTarget && !hostElement) {
            throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
        }
        positionElements(hostElement, this._cRef.location.nativeElement, this.placement, this.container === 'body');
    };
    NgbInputDatepicker.ctorParameters = function () { return [
        { type: NgbDateParserFormatter },
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: NgZone },
        { type: NgbCalendar },
        { type: NgbDateAdapter },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ChangeDetectorRef },
        { type: NgbInputDatepickerConfig }
    ]; };
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "autoClose", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "dayTemplate", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "dayTemplateData", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "displayMonths", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "firstDayOfWeek", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "footerTemplate", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "markDisabled", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "minDate", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "maxDate", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "navigation", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "outsideDays", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "placement", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "restoreFocus", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "showWeekdays", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "showWeekNumbers", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "startDate", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "container", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "positionTarget", void 0);
    __decorate([
        Output()
    ], NgbInputDatepicker.prototype, "dateSelect", void 0);
    __decorate([
        Output()
    ], NgbInputDatepicker.prototype, "navigate", void 0);
    __decorate([
        Output()
    ], NgbInputDatepicker.prototype, "closed", void 0);
    __decorate([
        Input()
    ], NgbInputDatepicker.prototype, "disabled", null);
    NgbInputDatepicker = __decorate([
        Directive({
            selector: 'input[ngbDatepicker]',
            exportAs: 'ngbDatepicker',
            host: {
                '(input)': 'manualDateChange($event.target.value)',
                '(change)': 'manualDateChange($event.target.value, true)',
                '(focus)': 'onFocus()',
                '(blur)': 'onBlur()',
                '[disabled]': 'disabled'
            },
            providers: [
                NGB_DATEPICKER_VALUE_ACCESSOR, NGB_DATEPICKER_VALIDATOR,
                { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig }
            ],
        }),
        __param(8, Inject(DOCUMENT))
    ], NgbInputDatepicker);
    return NgbInputDatepicker;
}());
export { NgbInputDatepicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNYLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGFBQWEsRUFBNkIsTUFBTSxjQUFjLENBQUM7QUFFdkUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFbkUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENB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c0M7SUFTcEM7UUFBVCxNQUFNLEVBQUU7MERBQTBDO0lBT3pDO1FBQVQsTUFBTSxFQUFFO3dEQUEyRDtJQU8xRDtRQUFULE1BQU0sRUFBRTtzREFBbUM7SUFHNUM7UUFEQyxLQUFLLEVBQUU7c0RBR1A7SUFsTVUsa0JBQWtCO1FBZjlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsUUFBUSxFQUFFLGVBQWU7WUFDekIsSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSx1Q0FBdUM7Z0JBQ2xELFVBQVUsRUFBRSw2Q0FBNkM7Z0JBQ3pELFNBQVMsRUFBRSxXQUFXO2dCQUN0QixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsWUFBWSxFQUFFLFVBQVU7YUFDekI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsNkJBQTZCLEVBQUUsd0JBQXdCO2dCQUN2RCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUM7YUFDdEU7U0FDRixDQUFDO1FBcU5LLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BcE5WLGtCQUFrQixDQXFjOUI7SUFBRCx5QkFBQztDQUFBLEFBcmNELElBcWNDO1NBcmNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxJREFUT1JTLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50c30gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge05nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge05nYklucHV0RGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0LWNvbmZpZyc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJDb25maWd9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMSURBVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IGFsbG93cyB0byBzdGljayBhIGRhdGVwaWNrZXIgcG9wdXAgdG8gYW4gaW5wdXQgZmllbGQuXG4gKlxuICogTWFuYWdlcyBpbnRlcmFjdGlvbiB3aXRoIHRoZSBpbnB1dCBmaWVsZCBpdHNlbGYsIGRvZXMgdmFsdWUgZm9ybWF0dGluZyBhbmQgcHJvdmlkZXMgZm9ybXMgaW50ZWdyYXRpb24uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25nYkRhdGVwaWNrZXJdJyxcbiAgZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcbiAgaG9zdDoge1xuICAgICcoaW5wdXQpJzogJ21hbnVhbERhdGVDaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxuICAgICcoY2hhbmdlKSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUsIHRydWUpJyxcbiAgICAnKGZvY3VzKSc6ICdvbkZvY3VzKCknLFxuICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTkdCX0RBVEVQSUNLRVJfVkFMSURBVE9SLFxuICAgIHtwcm92aWRlOiBOZ2JEYXRlcGlja2VyQ29uZmlnLCB1c2VFeGlzdGluZzogTmdiSW5wdXREYXRlcGlja2VyQ29uZmlnfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JJbnB1dERhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogYm9vbGVhbiB8IHN0cmluZztcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBib29sZWFuIHwgJyc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uYXZpZ2F0aW9uOiBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vdXRzaWRlRGF5czogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2NSZWY6IENvbXBvbmVudFJlZjxOZ2JEYXRlcGlja2VyPnwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2VsV2l0aEZvY3VzOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9tb2RlbDogTmdiRGF0ZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9pbnB1dFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIGRhdGUgc2VsZWN0aW9uIC8gb3V0c2lkZSBjbGljayBvciBub3QuXG4gICAqXG4gICAqICogYHRydWVgIC0gdGhlIHBvcHVwIHdpbGwgY2xvc2Ugb24gYm90aCBkYXRlIHNlbGVjdGlvbiBhbmQgb3V0c2lkZSBjbGljay5cbiAgICogKiBgZmFsc2VgIC0gdGhlIHBvcHVwIGNhbiBvbmx5IGJlIGNsb3NlZCBtYW51YWxseSB2aWEgYGNsb3NlKClgIG9yIGB0b2dnbGUoKWAgbWV0aG9kcy5cbiAgICogKiBgXCJpbnNpZGVcImAgLSB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvbiBkYXRlIHNlbGVjdGlvbiwgYnV0IG5vdCBvdXRzaWRlIGNsaWNrcy5cbiAgICogKiBgXCJvdXRzaWRlXCJgIC0gdGhlIHBvcHVwIHdpbGwgY2xvc2Ugb25seSBvbiB0aGUgb3V0c2lkZSBjbGljayBhbmQgbm90IG9uIGRhdGUgc2VsZWN0aW9uL2luc2lkZSBjbGlja3MuXG4gICAqXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gYSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkuXG4gICAqXG4gICAqIEFsbG93cyB0byBjb21wbGV0ZWx5IG92ZXJyaWRlIHRoZSB3YXkgYSBkYXkgJ2NlbGwnIGluIHRoZSBjYWxlbmRhciBpcyBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIFNlZSBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpIGZvciB0aGUgZGF0YSB5b3UgZ2V0IGluc2lkZS5cbiAgICovXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdG8gcGFzcyBhbnkgYXJiaXRyYXJ5IGRhdGEgdG8gdGhlIHRlbXBsYXRlIGNlbGwgdmlhIHRoZVxuICAgKiBbYERheVRlbXBsYXRlQ29udGV4dGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNEYXlUZW1wbGF0ZUNvbnRleHQpJ3MgYGRhdGFgIHBhcmFtZXRlci5cbiAgICpcbiAgICogYGN1cnJlbnRgIGlzIHRoZSBtb250aCB0aGF0IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudD86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGRpc3BsYXkuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAqXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW4uXG4gICAqL1xuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXRlcGlja2VyIGZvb3Rlci5cbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIHRvIG1hcmsgc29tZSBkYXRlcyBhcyBkaXNhYmxlZC5cbiAgICpcbiAgICogSXQgaXMgY2FsbGVkIGZvciBlYWNoIG5ldyBkYXRlIHdoZW4gbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBtb250aC5cbiAgICpcbiAgICogYGN1cnJlbnRgIGlzIHRoZSBtb250aCB0aGF0IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG4gICAqL1xuICBASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50Pzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBlYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIGRpc3BsYXllZCBvciBzZWxlY3RlZC4gQWxzbyB1c2VkIGZvciBmb3JtIHZhbGlkYXRpb24uXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGJlZm9yZSB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXRlc3QgZGF0ZSB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgb3Igc2VsZWN0ZWQuIEFsc28gdXNlZCBmb3IgZm9ybSB2YWxpZGF0aW9uLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsICd5ZWFyJyBzZWxlY3QgYm94IHdpbGwgZGlzcGxheSAxMCB5ZWFycyBhZnRlciB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdHlwZS5cbiAgICpcbiAgICogKiBgXCJzZWxlY3RcImAgLSBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCBuYXZpZ2F0aW9uIGFycm93c1xuICAgKiAqIGBcImFycm93c1wiYCAtIG9ubHkgbmF2aWdhdGlvbiBhcnJvd3NcbiAgICogKiBgXCJub25lXCJgIC0gbm8gbmF2aWdhdGlvbiB2aXNpYmxlIGF0IGFsbFxuICAgKi9cbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuICAvKipcbiAgICogVGhlIHdheSBvZiBkaXNwbGF5aW5nIGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgbW9udGguXG4gICAqXG4gICAqICogYFwidmlzaWJsZVwiYCAtIGRheXMgYXJlIHZpc2libGVcbiAgICogKiBgXCJoaWRkZW5cImAgLSBkYXlzIGFyZSBoaWRkZW4sIHdoaXRlIHNwYWNlIHByZXNlcnZlZFxuICAgKiAqIGBcImNvbGxhcHNlZFwiYCAtIGRheXMgYXJlIGNvbGxhcHNlZCwgc28gdGhlIGRhdGVwaWNrZXIgaGVpZ2h0IG1pZ2h0IGNoYW5nZSBiZXR3ZWVuIG1vbnRoc1xuICAgKlxuICAgKiBGb3IgdGhlIDIrIG1vbnRocyB2aWV3LCBkYXlzIGluIGJldHdlZW4gbW9udGhzIGFyZSBuZXZlciBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlZmVycmVkIHBsYWNlbWVudCBvZiB0aGUgZGF0ZXBpY2tlciBwb3B1cC5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgXCJ0b3BcImAsIGBcInRvcC1sZWZ0XCJgLCBgXCJ0b3AtcmlnaHRcImAsIGBcImJvdHRvbVwiYCwgYFwiYm90dG9tLWxlZnRcImAsXG4gICAqIGBcImJvdHRvbS1yaWdodFwiYCwgYFwibGVmdFwiYCwgYFwibGVmdC10b3BcImAsIGBcImxlZnQtYm90dG9tXCJgLCBgXCJyaWdodFwiYCwgYFwicmlnaHQtdG9wXCJgLFxuICAgKiBgXCJyaWdodC1ib3R0b21cImBcbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nIHdpdGggc3BhY2Ugc2VwYXJhdGVkIHBvc3NpYmxlIHZhbHVlcy5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJib3R0b20tbGVmdCBib3R0b20tcmlnaHQgdG9wLWxlZnQgdG9wLXJpZ2h0XCJgXG4gICAqXG4gICAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgd2hlbiBjbG9zaW5nIGRhdGVwaWNrZXIgd2lsbCBmb2N1cyBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIGRhdGVwaWNrZXIgd2FzIG9wZW5lZC5cbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSB5b3UgY291bGQgcHJvdmlkZSBhIHNlbGVjdG9yIG9yIGFuIGBIVE1MRWxlbWVudGAgdG8gZm9jdXMuIElmIHRoZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3Qgb3IgaW52YWxpZCxcbiAgICogd2UnbGwgZmFsbGJhY2sgdG8gZm9jdXMgZG9jdW1lbnQgYm9keS5cbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqL1xuICBASW5wdXQoKSByZXN0b3JlRm9jdXM6IHRydWUgfCBzdHJpbmcgfCBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3ZWVrZGF5cyB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3ZWVrIG51bWJlcnMgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRvIG9wZW4gY2FsZW5kYXIgd2l0aC5cbiAgICpcbiAgICogV2l0aCB0aGUgZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgaXMgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXG4gICAqXG4gICAqIFlvdSBjb3VsZCB1c2UgYG5hdmlnYXRlVG8oZGF0ZSlgIG1ldGhvZCBhcyBhbiBhbHRlcm5hdGl2ZS5cbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfTtcblxuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkYXRlcGlja2VyIHBvcHVwIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICpcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYFwiYm9keVwiYC5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGNzcyBzZWxlY3RvciBvciBodG1sIGVsZW1lbnQgc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgZGF0ZXBpY2tlciBwb3B1cCBzaG91bGQgYmUgcG9zaXRpb25lZCBhZ2FpbnN0LlxuICAgKlxuICAgKiBCeSBkZWZhdWx0IHRoZSBpbnB1dCBpcyB1c2VkIGFzIGEgdGFyZ2V0LlxuICAgKlxuICAgKiBAc2luY2UgNC4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uVGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXG4gICAqXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgYE5nYkRhdGVgLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjFcbiAgICovXG4gIEBPdXRwdXQoKSBkYXRlU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHJpZ2h0IGFmdGVyIHRoZSBuYXZpZ2F0aW9uIGhhcHBlbnMgYW5kIGRpc3BsYXllZCBtb250aCBjaGFuZ2VzLlxuICAgKlxuICAgKiBTZWUgW2BOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudGBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCkgZm9yIHRoZSBwYXlsb2FkIGluZm8uXG4gICAqL1xuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCBhZnRlciBjbG9zaW5nIGRhdGVwaWNrZXIgd2luZG93LlxuICAgKlxuICAgKiBAc2luY2UgNC4yLjBcbiAgICovXG4gIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWUgPT09ICcnIHx8ICh2YWx1ZSAmJiB2YWx1ZSAhPT0gJ2ZhbHNlJyk7XG5cbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5fY1JlZiAhLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5fZGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF92YWxpZGF0b3JDaGFuZ2UgPSAoKSA9PiB7fTtcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfcGFyc2VyRm9ybWF0dGVyOiBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX3ZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHByaXZhdGUgX2RhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgY29uZmlnOiBOZ2JJbnB1dERhdGVwaWNrZXJDb25maWcpIHtcbiAgICBbJ2F1dG9DbG9zZScsICdjb250YWluZXInLCAncG9zaXRpb25UYXJnZXQnLCAncGxhY2VtZW50J10uZm9yRWFjaChpbnB1dCA9PiB0aGlzW2lucHV0XSA9IGNvbmZpZ1tpbnB1dF0pO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl91cGRhdGVQb3B1cFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fdmFsaWRhdG9yQ2hhbmdlID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3Qge3ZhbHVlfSA9IGM7XG5cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgY29uc3QgbmdiRGF0ZSA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xuXG4gICAgICBpZiAoIW5nYkRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHsnbmdiRGF0ZSc6IHtpbnZhbGlkOiB2YWx1ZX19O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taW5EYXRlICYmIG5nYkRhdGUuYmVmb3JlKE5nYkRhdGUuZnJvbSh0aGlzLm1pbkRhdGUpKSkge1xuICAgICAgICByZXR1cm4geyduZ2JEYXRlJzoge21pbkRhdGU6IHttaW5EYXRlOiB0aGlzLm1pbkRhdGUsIGFjdHVhbDogdmFsdWV9fX07XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgbmdiRGF0ZS5hZnRlcihOZ2JEYXRlLmZyb20odGhpcy5tYXhEYXRlKSkpIHtcbiAgICAgICAgcmV0dXJuIHsnbmdiRGF0ZSc6IHttYXhEYXRlOiB7bWF4RGF0ZTogdGhpcy5tYXhEYXRlLCBhY3R1YWw6IHZhbHVlfX19O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX21vZGVsID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fZGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG4gICAgdGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcbiAgfVxuXG4gIG1hbnVhbERhdGVDaGFuZ2UodmFsdWU6IHN0cmluZywgdXBkYXRlVmlldyA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZUNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5faW5wdXRWYWx1ZTtcbiAgICBpZiAoaW5wdXRWYWx1ZUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX21vZGVsID0gdGhpcy5fZnJvbURhdGVTdHJ1Y3QodGhpcy5fcGFyc2VyRm9ybWF0dGVyLnBhcnNlKHZhbHVlKSk7XG4gICAgfVxuICAgIGlmIChpbnB1dFZhbHVlQ2hhbmdlZCB8fCAhdXBkYXRlVmlldykge1xuICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5fbW9kZWwgPyB0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSA6ICh2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKHVwZGF0ZVZpZXcgJiYgdGhpcy5fbW9kZWwpIHtcbiAgICAgIHRoaXMuX3dyaXRlTW9kZWxWYWx1ZSh0aGlzLl9tb2RlbCk7XG4gICAgfVxuICB9XG5cbiAgaXNPcGVuKCkgeyByZXR1cm4gISF0aGlzLl9jUmVmOyB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxuICAgKlxuICAgKiBJZiB0aGUgcmVsYXRlZCBmb3JtIGNvbnRyb2wgY29udGFpbnMgYSB2YWxpZCBkYXRlLCB0aGUgY29ycmVzcG9uZGluZyBtb250aCB3aWxsIGJlIG9wZW5lZC5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICBjb25zdCBjZiA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JEYXRlcGlja2VyKTtcbiAgICAgIHRoaXMuX2NSZWYgPSB0aGlzLl92Y1JlZi5jcmVhdGVDb21wb25lbnQoY2YpO1xuXG4gICAgICB0aGlzLl9hcHBseVBvcHVwU3R5bGluZyh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgdGhpcy5fYXBwbHlEYXRlcGlja2VySW5wdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xuICAgICAgdGhpcy5fc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHModGhpcy5fY1JlZi5pbnN0YW5jZSk7XG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLm5nT25Jbml0KCk7XG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLndyaXRlVmFsdWUodGhpcy5fZGF0ZUFkYXB0ZXIudG9Nb2RlbCh0aGlzLl9tb2RlbCkpO1xuXG4gICAgICAvLyBkYXRlIHNlbGVjdGlvbiBldmVudCBoYW5kbGluZ1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5yZWdpc3Rlck9uQ2hhbmdlKChzZWxlY3RlZERhdGUpID0+IHtcbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2NSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5kaXNhYmxlZCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGZvY3VzIGhhbmRsaW5nXG4gICAgICB0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBuZ2JGb2N1c1RyYXAodGhpcy5fbmdab25lLCB0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuY2xvc2VkLCB0cnVlKTtcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UuZm9jdXMoKTtcblxuICAgICAgbmdiQXV0b0Nsb3NlKFxuICAgICAgICAgIHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsIHRoaXMuYXV0b0Nsb3NlLCAoKSA9PiB0aGlzLmNsb3NlKCksIHRoaXMuY2xvc2VkLCBbXSxcbiAgICAgICAgICBbdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgZGF0ZXBpY2tlciBwb3B1cC5cbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLl92Y1JlZi5yZW1vdmUodGhpcy5fdmNSZWYuaW5kZXhPZih0aGlzLl9jUmVmICEuaG9zdFZpZXcpKTtcbiAgICAgIHRoaXMuX2NSZWYgPSBudWxsO1xuICAgICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgIGxldCBlbGVtZW50VG9Gb2N1czogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5fZWxXaXRoRm9jdXM7XG4gICAgICBpZiAoaXNTdHJpbmcodGhpcy5yZXN0b3JlRm9jdXMpKSB7XG4gICAgICAgIGVsZW1lbnRUb0ZvY3VzID0gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnJlc3RvcmVGb2N1cyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVzdG9yZUZvY3VzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbWVudFRvRm9jdXMgPSB0aGlzLnJlc3RvcmVGb2N1cyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLy8gaW4gSUUgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gY29udGFpbiBhbiBvYmplY3Qgd2l0aG91dCAnZm9jdXMoKScgc29tZXRpbWVzXG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMgJiYgZWxlbWVudFRvRm9jdXNbJ2ZvY3VzJ10pIHtcbiAgICAgICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgZGF0ZXBpY2tlciBwb3B1cC5cbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBwcm92aWRlZCBkYXRlLlxuICAgKlxuICAgKiBXaXRoIHRoZSBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuICAgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBwcm92aWRlZCBjYWxlbmRhciB3aWxsIG9wZW4gY3VycmVudCBtb250aC5cbiAgICpcbiAgICogVXNlIHRoZSBgW3N0YXJ0RGF0ZV1gIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlLlxuICAgKi9cbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfSkge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLl9jUmVmICEuaW5zdGFuY2UubmF2aWdhdGVUbyhkYXRlKTtcbiAgICB9XG4gIH1cblxuICBvbkJsdXIoKSB7IHRoaXMuX29uVG91Y2hlZCgpOyB9XG5cbiAgb25Gb2N1cygpIHsgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50OyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydtaW5EYXRlJ10gfHwgY2hhbmdlc1snbWF4RGF0ZSddKSB7XG4gICAgICB0aGlzLl92YWxpZGF0b3JDaGFuZ2UoKTtcblxuICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ21pbkRhdGUnXSkge1xuICAgICAgICAgIHRoaXMuX2NSZWYgIS5pbnN0YW5jZS5taW5EYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydtYXhEYXRlJ10pIHtcbiAgICAgICAgICB0aGlzLl9jUmVmICEuaW5zdGFuY2UubWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jUmVmICEuaW5zdGFuY2UubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5RGF0ZXBpY2tlcklucHV0cyhkYXRlcGlja2VySW5zdGFuY2U6IE5nYkRhdGVwaWNrZXIpOiB2b2lkIHtcbiAgICBbJ2RheVRlbXBsYXRlJywgJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ2Zvb3RlclRlbXBsYXRlJywgJ21hcmtEaXNhYmxlZCcsICdtaW5EYXRlJyxcbiAgICAgJ21heERhdGUnLCAnbmF2aWdhdGlvbicsICdvdXRzaWRlRGF5cycsICdzaG93TmF2aWdhdGlvbicsICdzaG93V2Vla2RheXMnLCAnc2hvd1dlZWtOdW1iZXJzJ11cbiAgICAgICAgLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzW29wdGlvbk5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRhdGVwaWNrZXJJbnN0YW5jZVtvcHRpb25OYW1lXSA9IHRoaXNbb3B0aW9uTmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBkYXRlcGlja2VySW5zdGFuY2Uuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUgfHwgdGhpcy5fbW9kZWw7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVBvcHVwU3R5bGluZyhuYXRpdmVFbGVtZW50OiBhbnkpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnZHJvcGRvd24tbWVudScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsZW1lbnQsICdzaG93Jyk7XG5cbiAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxlbWVudCwgJ25nYi1kcC1ib2R5Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKSB7XG4gICAgZGF0ZXBpY2tlckluc3RhbmNlLm5hdmlnYXRlLnN1YnNjcmliZShuYXZpZ2F0ZUV2ZW50ID0+IHRoaXMubmF2aWdhdGUuZW1pdChuYXZpZ2F0ZUV2ZW50KSk7XG4gICAgZGF0ZXBpY2tlckluc3RhbmNlLmRhdGVTZWxlY3Quc3Vic2NyaWJlKGRhdGUgPT4ge1xuICAgICAgdGhpcy5kYXRlU2VsZWN0LmVtaXQoZGF0ZSk7XG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUgfHwgdGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dyaXRlTW9kZWxWYWx1ZShtb2RlbDogTmdiRGF0ZSB8IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3BhcnNlckZvcm1hdHRlci5mb3JtYXQobW9kZWwpO1xuICAgIHRoaXMuX2lucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuX2NSZWYgIS5pbnN0YW5jZS53cml0ZVZhbHVlKHRoaXMuX2RhdGVBZGFwdGVyLnRvTW9kZWwobW9kZWwpKTtcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Zyb21EYXRlU3RydWN0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogTmdiRGF0ZSB8IG51bGwge1xuICAgIGNvbnN0IG5nYkRhdGUgPSBkYXRlID8gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSkgOiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQb3B1cFBvc2l0aW9uKCkge1xuICAgIGlmICghdGhpcy5fY1JlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgaWYgKGlzU3RyaW5nKHRoaXMucG9zaXRpb25UYXJnZXQpKSB7XG4gICAgICBob3N0RWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wb3NpdGlvblRhcmdldCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uVGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIGhvc3RFbGVtZW50ID0gdGhpcy5wb3NpdGlvblRhcmdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgaG9zdEVsZW1lbnQgPSB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uVGFyZ2V0ICYmICFob3N0RWxlbWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZ2JEYXRlcGlja2VyIGNvdWxkIG5vdCBmaW5kIGVsZW1lbnQgZGVjbGFyZWQgaW4gW3Bvc2l0aW9uVGFyZ2V0XSB0byBwb3NpdGlvbiBhZ2FpbnN0LicpO1xuICAgIH1cblxuICAgIHBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQsIHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpO1xuICB9XG59XG4iXX0=