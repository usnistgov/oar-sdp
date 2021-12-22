/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isInteger, isNumber, padNumber, toInteger } from '../util/util';
import { NgbTime } from './ngb-time';
import { NgbTimepickerConfig } from './timepicker-config';
import { NgbTimeAdapter } from './ngb-time-adapter';
import { NgbTimepickerI18n } from './timepicker-i18n';
/** @type {?} */
var FILTER_REGEX = /[^0-9]/g;
/** @type {?} */
var NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return NgbTimepicker; })),
    multi: true
};
/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
var NgbTimepicker = /** @class */ (function () {
    function NgbTimepicker(_config, _ngbTimeAdapter, _cd, i18n) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.i18n = i18n;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    Object.defineProperty(NgbTimepicker.prototype, "hourStep", {
        get: /**
         * @return {?}
         */
        function () { return this._hourStep; },
        /**
         * The number of hours to add/subtract when clicking hour spinners.
         */
        set: /**
         * The number of hours to add/subtract when clicking hour spinners.
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._hourStep = isInteger(step) ? step : this._config.hourStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "minuteStep", {
        get: /**
         * @return {?}
         */
        function () { return this._minuteStep; },
        /**
         * The number of minutes to add/subtract when clicking minute spinners.
         */
        set: /**
         * The number of minutes to add/subtract when clicking minute spinners.
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "secondStep", {
        get: /**
         * @return {?}
         */
        function () { return this._secondStep; },
        /**
         * The number of seconds to add/subtract when clicking second spinners.
         */
        set: /**
         * The number of seconds to add/subtract when clicking second spinners.
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._secondStep = isInteger(step) ? step : this._config.secondStep;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTimepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTimepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTimepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbTimepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} step
     * @return {?}
     */
    NgbTimepicker.prototype.changeHour = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    };
    /**
     * @param {?} step
     * @return {?}
     */
    NgbTimepicker.prototype.changeMinute = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    };
    /**
     * @param {?} step
     * @return {?}
     */
    NgbTimepicker.prototype.changeSecond = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    };
    /**
     * @param {?} newVal
     * @return {?}
     */
    NgbTimepicker.prototype.updateHour = /**
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        /** @type {?} */
        var isPM = this.model.hour >= 12;
        /** @type {?} */
        var enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    };
    /**
     * @param {?} newVal
     * @return {?}
     */
    NgbTimepicker.prototype.updateMinute = /**
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    };
    /**
     * @param {?} newVal
     * @return {?}
     */
    NgbTimepicker.prototype.updateSecond = /**
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    };
    /**
     * @return {?}
     */
    NgbTimepicker.prototype.toggleMeridian = /**
     * @return {?}
     */
    function () {
        if (this.meridian) {
            this.changeHour(12);
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    NgbTimepicker.prototype.formatInput = /**
     * @param {?} input
     * @return {?}
     */
    function (input) { input.value = input.value.replace(FILTER_REGEX, ''); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTimepicker.prototype.formatHour = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTimepicker.prototype.formatMinSec = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { return padNumber(value); };
    Object.defineProperty(NgbTimepicker.prototype, "isSmallSize", {
        get: /**
         * @return {?}
         */
        function () { return this.size === 'small'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "isLargeSize", {
        get: /**
         * @return {?}
         */
        function () { return this.size === 'large'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbTimepicker.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    };
    /**
     * @private
     * @param {?=} touched
     * @return {?}
     */
    NgbTimepicker.prototype.propagateModelChange = /**
     * @private
     * @param {?=} touched
     * @return {?}
     */
    function (touched) {
        if (touched === void 0) { touched = true; }
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    };
    NgbTimepicker.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-timepicker',
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-input-container ngb-tp-hour\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeHour(hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-hours\">Increment hours</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\"\n            [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"HH\" i18n-placeholder=\"@@ngb.timepicker.HH\"\n            [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($event.target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Hours\" i18n-aria-label=\"@@ngb.timepicker.hours\"\n            (input)=\"formatInput($event.target)\"\n            (keydown.ArrowUp)=\"changeHour(hourStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeHour(-hourStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeHour(-hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-hours\">Decrement hours</span>\n          </button>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-input-container ngb-tp-minute\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeMinute(minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-minutes\">Increment minutes</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"MM\" i18n-placeholder=\"@@ngb.timepicker.MM\"\n            [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($event.target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Minutes\" i18n-aria-label=\"@@ngb.timepicker.minutes\"\n            (input)=\"formatInput($event.target)\"\n            (keydown.ArrowUp)=\"changeMinute(minuteStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeMinute(-minuteStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeMinute(-minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\"  i18n=\"@@ngb.timepicker.decrement-minutes\">Decrement minutes</span>\n          </button>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-input-container ngb-tp-second\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeSecond(secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-seconds\">Increment seconds</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"SS\" i18n-placeholder=\"@@ngb.timepicker.SS\"\n            [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($event.target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Seconds\" i18n-aria-label=\"@@ngb.timepicker.seconds\"\n            (input)=\"formatInput($event.target)\"\n            (keydown.ArrowUp)=\"changeSecond(secondStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeSecond(-secondStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeSecond(-secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-seconds\">Decrement seconds</span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-outline-primary\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\"\n                  (click)=\"toggleMeridian()\">\n            <ng-container *ngIf=\"model?.hour >= 12; else am\" i18n=\"@@ngb.timepicker.PM\">{{ i18n.getAfternoonPeriod() }}</ng-container>\n            <ng-template #am i18n=\"@@ngb.timepicker.AM\">{{ i18n.getMorningPeriod() }}</ng-template>\n          </button>\n        </div>\n      </div>\n    </fieldset>\n  ",
                    providers: [NGB_TIMEPICKER_VALUE_ACCESSOR],
                    styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron::before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-meridian,.ngb-tp-minute,.ngb-tp-second{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    NgbTimepicker.ctorParameters = function () { return [
        { type: NgbTimepickerConfig },
        { type: NgbTimeAdapter },
        { type: ChangeDetectorRef },
        { type: NgbTimepickerI18n }
    ]; };
    NgbTimepicker.propDecorators = {
        meridian: [{ type: Input }],
        spinners: [{ type: Input }],
        seconds: [{ type: Input }],
        hourStep: [{ type: Input }],
        minuteStep: [{ type: Input }],
        secondStep: [{ type: Input }],
        readonlyInputs: [{ type: Input }],
        size: [{ type: Input }]
    };
    return NgbTimepicker;
}());
export { NgbTimepicker };
if (false) {
    /** @type {?} */
    NgbTimepicker.prototype.disabled;
    /** @type {?} */
    NgbTimepicker.prototype.model;
    /**
     * @type {?}
     * @private
     */
    NgbTimepicker.prototype._hourStep;
    /**
     * @type {?}
     * @private
     */
    NgbTimepicker.prototype._minuteStep;
    /**
     * @type {?}
     * @private
     */
    NgbTimepicker.prototype._secondStep;
    /**
     * Whether to display 12H or 24H mode.
     * @type {?}
     */
    NgbTimepicker.prototype.meridian;
    /**
     * If `true`, the spinners above and below inputs are visible.
     * @type {?}
     */
    NgbTimepicker.prototype.spinners;
    /**
     * If `true`, it is possible to select seconds.
     * @type {?}
     */
    NgbTimepicker.prototype.seconds;
    /**
     * If `true`, the timepicker is readonly and can't be changed.
     * @type {?}
     */
    NgbTimepicker.prototype.readonlyInputs;
    /**
     * The size of inputs and buttons.
     * @type {?}
     */
    NgbTimepicker.prototype.size;
    /** @type {?} */
    NgbTimepicker.prototype.onChange;
    /** @type {?} */
    NgbTimepicker.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    NgbTimepicker.prototype._config;
    /**
     * @type {?}
     * @private
     */
    NgbTimepicker.prototype._ngbTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    NgbTimepicker.prototype._cd;
    /** @type {?} */
    NgbTimepicker.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci90aW1lcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7SUFFOUMsWUFBWSxHQUFHLFNBQVM7O0lBRXhCLDZCQUE2QixHQUFHO0lBQ3BDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFLRDtJQXVKRSx1QkFDcUIsT0FBNEIsRUFBVSxlQUFvQyxFQUNuRixHQUFzQixFQUFTLElBQXVCO1FBRDdDLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBQ25GLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFZbEUsYUFBUTs7OztRQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsRUFBQztRQUMxQixjQUFTOzs7UUFBRyxjQUFPLENBQUMsRUFBQztRQVpuQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBakRELHNCQUNJLG1DQUFROzs7O1FBSVosY0FBeUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQVJqRDs7V0FFRzs7Ozs7O1FBQ0gsVUFDYSxJQUFZO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2xFLENBQUM7OztPQUFBO0lBT0Qsc0JBQ0kscUNBQVU7Ozs7UUFJZCxjQUEyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBUnJEOztXQUVHOzs7Ozs7UUFDSCxVQUNlLElBQVk7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDdEUsQ0FBQzs7O09BQUE7SUFPRCxzQkFDSSxxQ0FBVTs7OztRQUlkLGNBQTJCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFSckQ7O1dBRUc7Ozs7OztRQUNILFVBQ2UsSUFBWTtZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUN0RSxDQUFDOzs7T0FBQTs7Ozs7SUErQkQsa0NBQVU7Ozs7SUFBVixVQUFXLEtBQUs7O1lBQ1IsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCx3Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBdUIsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXZFLHlDQUFpQjs7OztJQUFqQixVQUFrQixFQUFhLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvRCx3Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsVUFBbUIsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXJFLGtDQUFVOzs7O0lBQVYsVUFBVyxJQUFZO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsb0NBQVk7Ozs7SUFBWixVQUFhLElBQVk7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxvQ0FBWTs7OztJQUFaLFVBQWEsSUFBWTtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELGtDQUFVOzs7O0lBQVYsVUFBVyxNQUFjOztZQUNqQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRTs7WUFDNUIsV0FBVyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQzlFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELG9DQUFZOzs7O0lBQVosVUFBYSxNQUFjO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsb0NBQVk7Ozs7SUFBWixVQUFhLE1BQWM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELHNDQUFjOzs7SUFBZDtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxtQ0FBVzs7OztJQUFYLFVBQVksS0FBdUIsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRTdGLGtDQUFVOzs7O0lBQVYsVUFBVyxLQUFhO1FBQ3RCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsT0FBTyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNMLE9BQU8sU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQzthQUM5QjtTQUNGO2FBQU07WUFDTCxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7O0lBRUQsb0NBQVk7Ozs7SUFBWixVQUFhLEtBQWEsSUFBSSxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEQsc0JBQUksc0NBQVc7Ozs7UUFBZixjQUE2QixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUQsc0JBQUksc0NBQVc7Ozs7UUFBZixjQUE2QixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7O0lBRTVELG1DQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7Ozs7SUFFTyw0Q0FBb0I7Ozs7O0lBQTVCLFVBQTZCLE9BQWM7UUFBZCx3QkFBQSxFQUFBLGNBQWM7UUFDekMsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUNULElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7O2dCQXRRRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBRXJDLFFBQVEsRUFBRSwwN0xBZ0ZUO29CQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDOztpQkFDM0M7Ozs7Z0JBckdPLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFicEIsaUJBQWlCO2dCQWNYLGlCQUFpQjs7OzJCQWdIdEIsS0FBSzsyQkFLTCxLQUFLOzBCQUtMLEtBQUs7MkJBS0wsS0FBSzs2QkFVTCxLQUFLOzZCQVVMLEtBQUs7aUNBVUwsS0FBSzt1QkFLTCxLQUFLOztJQWtIUixvQkFBQztDQUFBLEFBdlFELElBdVFDO1NBaExZLGFBQWE7OztJQUV4QixpQ0FBa0I7O0lBQ2xCLDhCQUFlOzs7OztJQUVmLGtDQUEwQjs7Ozs7SUFDMUIsb0NBQTRCOzs7OztJQUM1QixvQ0FBNEI7Ozs7O0lBSzVCLGlDQUEyQjs7Ozs7SUFLM0IsaUNBQTJCOzs7OztJQUszQixnQ0FBMEI7Ozs7O0lBbUMxQix1Q0FBaUM7Ozs7O0lBS2pDLDZCQUE0Qzs7SUFnQjVDLGlDQUEwQjs7SUFDMUIsa0NBQXFCOzs7OztJQWRqQixnQ0FBNkM7Ozs7O0lBQUUsd0NBQTRDOzs7OztJQUMzRiw0QkFBOEI7O0lBQUUsNkJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge2lzSW50ZWdlciwgaXNOdW1iZXIsIHBhZE51bWJlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JUaW1lfSBmcm9tICcuL25nYi10aW1lJztcbmltcG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYlRpbWVBZGFwdGVyfSBmcm9tICcuL25nYi10aW1lLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JUaW1lcGlja2VySTE4bn0gZnJvbSAnLi90aW1lcGlja2VyLWkxOG4nO1xuXG5jb25zdCBGSUxURVJfUkVHRVggPSAvW14wLTldL2c7XG5cbmNvbnN0IE5HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVGltZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgaGVscHMgd2l0aCB3dGggcGlja2luZyBob3VycywgbWludXRlcyBhbmQgc2Vjb25kcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRpbWVwaWNrZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi90aW1lcGlja2VyLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZmllbGRzZXQgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1ob3VyXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cihob3VyU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1ob3Vyc1wiPkluY3JlbWVudCBob3Vyczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIm5nYi10cC1pbnB1dCBmb3JtLWNvbnRyb2xcIiBbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCJcbiAgICAgICAgICAgIFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIlxuICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiIGlucHV0bW9kZT1cIm51bWVyaWNcIiBwbGFjZWhvbGRlcj1cIkhIXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuSEhcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdEhvdXIobW9kZWw/LmhvdXIpXCIgKGNoYW5nZSk9XCJ1cGRhdGVIb3VyKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkT25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJIb3Vyc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIuaG91cnNcIlxuICAgICAgICAgICAgKGlucHV0KT1cImZvcm1hdElucHV0KCRldmVudC50YXJnZXQpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlSG91cihob3VyU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2VIb3VyKC1ob3VyU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cigtaG91clN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LWhvdXJzXCI+RGVjcmVtZW50IGhvdXJzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1taW51dGVcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0YWJpbmRleD1cIi0xXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VNaW51dGUobWludXRlU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1taW51dGVzXCI+SW5jcmVtZW50IG1pbnV0ZXM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJuZ2ItdHAtaW5wdXQgZm9ybS1jb250cm9sXCIgW2NsYXNzLmZvcm0tY29udHJvbC1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIlxuICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiIGlucHV0bW9kZT1cIm51bWVyaWNcIiBwbGFjZWhvbGRlcj1cIk1NXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuTU1cIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8ubWludXRlKVwiIChjaGFuZ2UpPVwidXBkYXRlTWludXRlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkT25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJNaW51dGVzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5taW51dGVzXCJcbiAgICAgICAgICAgIChpbnB1dCk9XCJmb3JtYXRJbnB1dCgkZXZlbnQudGFyZ2V0KVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5BcnJvd1VwKT1cImNoYW5nZU1pbnV0ZShtaW51dGVTdGVwKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlTWludXRlKC1taW51dGVTdGVwKVwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvbiBib3R0b21cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiAgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LW1pbnV0ZXNcIj5EZWNyZW1lbnQgbWludXRlczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtc3BhY2VyXCI+OjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtc2Vjb25kXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtc2Vjb25kc1wiPkluY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIiBpbnB1dG1vZGU9XCJudW1lcmljXCIgcGxhY2Vob2xkZXI9XCJTU1wiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLlNTXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/LnNlY29uZClcIiAoY2hhbmdlKT1cInVwZGF0ZVNlY29uZCgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcmVhZE9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiU2Vjb25kc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIuc2Vjb25kc1wiXG4gICAgICAgICAgICAoaW5wdXQpPVwiZm9ybWF0SW5wdXQoJGV2ZW50LnRhcmdldClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJjaGFuZ2VTZWNvbmQoc2Vjb25kU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2VTZWNvbmQoLXNlY29uZFN0ZXApOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHRhYmluZGV4PVwiLTFcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LXNlY29uZHNcIj5EZWNyZW1lbnQgc2Vjb25kczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXJpZGlhblwiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1tZXJpZGlhblwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lcmlkaWFuKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbD8uaG91ciA+PSAxMjsgZWxzZSBhbVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLlBNXCI+e3sgaTE4bi5nZXRBZnRlcm5vb25QZXJpb2QoKSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNhbSBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5BTVwiPnt7IGkxOG4uZ2V0TW9ybmluZ1BlcmlvZCgpIH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2ZpZWxkc2V0PlxuICBgLFxuICBwcm92aWRlcnM6IFtOR0JfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uQ2hhbmdlcyB7XG4gIGRpc2FibGVkOiBib29sZWFuO1xuICBtb2RlbDogTmdiVGltZTtcblxuICBwcml2YXRlIF9ob3VyU3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9taW51dGVTdGVwOiBudW1iZXI7XG4gIHByaXZhdGUgX3NlY29uZFN0ZXA6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IDEySCBvciAyNEggbW9kZS5cbiAgICovXG4gIEBJbnB1dCgpIG1lcmlkaWFuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBzcGlubmVycyBhYm92ZSBhbmQgYmVsb3cgaW5wdXRzIGFyZSB2aXNpYmxlLlxuICAgKi9cbiAgQElucHV0KCkgc3Bpbm5lcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgaXQgaXMgcG9zc2libGUgdG8gc2VsZWN0IHNlY29uZHMuXG4gICAqL1xuICBASW5wdXQoKSBzZWNvbmRzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGhvdXJzIHRvIGFkZC9zdWJ0cmFjdCB3aGVuIGNsaWNraW5nIGhvdXIgc3Bpbm5lcnMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgaG91clN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5faG91clN0ZXAgPSBpc0ludGVnZXIoc3RlcCkgPyBzdGVwIDogdGhpcy5fY29uZmlnLmhvdXJTdGVwO1xuICB9XG5cbiAgZ2V0IGhvdXJTdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ob3VyU3RlcDsgfVxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIG1pbnV0ZXMgdG8gYWRkL3N1YnRyYWN0IHdoZW4gY2xpY2tpbmcgbWludXRlIHNwaW5uZXJzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG1pbnV0ZVN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWludXRlU3RlcCA9IGlzSW50ZWdlcihzdGVwKSA/IHN0ZXAgOiB0aGlzLl9jb25maWcubWludXRlU3RlcDtcbiAgfVxuXG4gIGdldCBtaW51dGVTdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW51dGVTdGVwOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBhZGQvc3VidHJhY3Qgd2hlbiBjbGlja2luZyBzZWNvbmQgc3Bpbm5lcnMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgc2Vjb25kU3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZWNvbmRTdGVwID0gaXNJbnRlZ2VyKHN0ZXApID8gc3RlcCA6IHRoaXMuX2NvbmZpZy5zZWNvbmRTdGVwO1xuICB9XG5cbiAgZ2V0IHNlY29uZFN0ZXAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NlY29uZFN0ZXA7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgdGltZXBpY2tlciBpcyByZWFkb25seSBhbmQgY2FuJ3QgYmUgY2hhbmdlZC5cbiAgICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXRzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiBpbnB1dHMgYW5kIGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQoKSBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBOZ2JUaW1lcGlja2VyQ29uZmlnLCBwcml2YXRlIF9uZ2JUaW1lQWRhcHRlcjogTmdiVGltZUFkYXB0ZXI8YW55PixcbiAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGkxOG46IE5nYlRpbWVwaWNrZXJJMThuKSB7XG4gICAgdGhpcy5tZXJpZGlhbiA9IF9jb25maWcubWVyaWRpYW47XG4gICAgdGhpcy5zcGlubmVycyA9IF9jb25maWcuc3Bpbm5lcnM7XG4gICAgdGhpcy5zZWNvbmRzID0gX2NvbmZpZy5zZWNvbmRzO1xuICAgIHRoaXMuaG91clN0ZXAgPSBfY29uZmlnLmhvdXJTdGVwO1xuICAgIHRoaXMubWludXRlU3RlcCA9IF9jb25maWcubWludXRlU3RlcDtcbiAgICB0aGlzLnNlY29uZFN0ZXAgPSBfY29uZmlnLnNlY29uZFN0ZXA7XG4gICAgdGhpcy5kaXNhYmxlZCA9IF9jb25maWcuZGlzYWJsZWQ7XG4gICAgdGhpcy5yZWFkb25seUlucHV0cyA9IF9jb25maWcucmVhZG9ubHlJbnB1dHM7XG4gICAgdGhpcy5zaXplID0gX2NvbmZpZy5zaXplO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IHN0cnVjdFZhbHVlID0gdGhpcy5fbmdiVGltZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKTtcbiAgICB0aGlzLm1vZGVsID0gc3RydWN0VmFsdWUgPyBuZXcgTmdiVGltZShzdHJ1Y3RWYWx1ZS5ob3VyLCBzdHJ1Y3RWYWx1ZS5taW51dGUsIHN0cnVjdFZhbHVlLnNlY29uZCkgOiBuZXcgTmdiVGltZSgpO1xuICAgIGlmICghdGhpcy5zZWNvbmRzICYmICghc3RydWN0VmFsdWUgfHwgIWlzTnVtYmVyKHN0cnVjdFZhbHVlLnNlY29uZCkpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgfVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICBjaGFuZ2VIb3VyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlSG91cihzdGVwKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICBjaGFuZ2VNaW51dGUoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VNaW51dGUoc3RlcCk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgY2hhbmdlU2Vjb25kKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlU2Vjb25kKHN0ZXApO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZUhvdXIobmV3VmFsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpc1BNID0gdGhpcy5tb2RlbC5ob3VyID49IDEyO1xuICAgIGNvbnN0IGVudGVyZWRIb3VyID0gdG9JbnRlZ2VyKG5ld1ZhbCk7XG4gICAgaWYgKHRoaXMubWVyaWRpYW4gJiYgKGlzUE0gJiYgZW50ZXJlZEhvdXIgPCAxMiB8fCAhaXNQTSAmJiBlbnRlcmVkSG91ciA9PT0gMTIpKSB7XG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIgKyAxMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSG91cihlbnRlcmVkSG91cik7XG4gICAgfVxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pbnV0ZShuZXdWYWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWwudXBkYXRlTWludXRlKHRvSW50ZWdlcihuZXdWYWwpKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVTZWNvbmQobmV3VmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZVNlY29uZCh0b0ludGVnZXIobmV3VmFsKSk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdG9nZ2xlTWVyaWRpYW4oKSB7XG4gICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgIHRoaXMuY2hhbmdlSG91cigxMik7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0SW5wdXQoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHsgaW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS5yZXBsYWNlKEZJTFRFUl9SRUdFWCwgJycpOyB9XG5cbiAgZm9ybWF0SG91cih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDEyID09PSAwID8gMTIgOiB2YWx1ZSAlIDEyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYWROdW1iZXIodmFsdWUgJSAyNCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYWROdW1iZXIoTmFOKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRNaW5TZWModmFsdWU6IG51bWJlcikgeyByZXR1cm4gcGFkTnVtYmVyKHZhbHVlKTsgfVxuXG4gIGdldCBpc1NtYWxsU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJzsgfVxuXG4gIGdldCBpc0xhcmdlU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJzsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snc2Vjb25kcyddICYmICF0aGlzLnNlY29uZHMgJiYgdGhpcy5tb2RlbCAmJiAhaXNOdW1iZXIodGhpcy5tb2RlbC5zZWNvbmQpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZU1vZGVsQ2hhbmdlKHRvdWNoZWQgPSB0cnVlKSB7XG4gICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsLmlzVmFsaWQodGhpcy5zZWNvbmRzKSkge1xuICAgICAgdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKHtob3VyOiB0aGlzLm1vZGVsLmhvdXIsIG1pbnV0ZTogdGhpcy5tb2RlbC5taW51dGUsIHNlY29uZDogdGhpcy5tb2RlbC5zZWNvbmR9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiVGltZUFkYXB0ZXIudG9Nb2RlbChudWxsKSk7XG4gICAgfVxuICB9XG59XG4iXX0=