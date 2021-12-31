import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, forwardRef, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isInteger, isNumber, padNumber, toInteger } from '../util/util';
import { NgbTime } from './ngb-time';
import { NgbTimepickerConfig } from './timepicker-config';
import { NgbTimeAdapter } from './ngb-time-adapter';
import { NgbTimepickerI18n } from './timepicker-i18n';
var FILTER_REGEX = /[^0-9]/g;
var NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTimepicker; }),
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
        this.onChange = function (_) { };
        this.onTouched = function () { };
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
        get: function () { return this._hourStep; },
        /**
         * The number of hours to add/subtract when clicking hour spinners.
         */
        set: function (step) {
            this._hourStep = isInteger(step) ? step : this._config.hourStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "minuteStep", {
        get: function () { return this._minuteStep; },
        /**
         * The number of minutes to add/subtract when clicking minute spinners.
         */
        set: function (step) {
            this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "secondStep", {
        get: function () { return this._secondStep; },
        /**
         * The number of seconds to add/subtract when clicking second spinners.
         */
        set: function (step) {
            this._secondStep = isInteger(step) ? step : this._config.secondStep;
        },
        enumerable: true,
        configurable: true
    });
    NgbTimepicker.prototype.writeValue = function (value) {
        var structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    };
    NgbTimepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbTimepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbTimepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    NgbTimepicker.prototype.changeHour = function (step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.changeMinute = function (step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.changeSecond = function (step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateHour = function (newVal) {
        var isPM = this.model.hour >= 12;
        var enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateMinute = function (newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateSecond = function (newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.toggleMeridian = function () {
        if (this.meridian) {
            this.changeHour(12);
        }
    };
    NgbTimepicker.prototype.formatInput = function (input) { input.value = input.value.replace(FILTER_REGEX, ''); };
    NgbTimepicker.prototype.formatHour = function (value) {
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
    NgbTimepicker.prototype.formatMinSec = function (value) { return padNumber(isNumber(value) ? value : NaN); };
    Object.defineProperty(NgbTimepicker.prototype, "isSmallSize", {
        get: function () { return this.size === 'small'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "isLargeSize", {
        get: function () { return this.size === 'large'; },
        enumerable: true,
        configurable: true
    });
    NgbTimepicker.prototype.ngOnChanges = function (changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    };
    NgbTimepicker.prototype.propagateModelChange = function (touched) {
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
    NgbTimepicker.ctorParameters = function () { return [
        { type: NgbTimepickerConfig },
        { type: NgbTimeAdapter },
        { type: ChangeDetectorRef },
        { type: NgbTimepickerI18n }
    ]; };
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "meridian", void 0);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "spinners", void 0);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "seconds", void 0);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "hourStep", null);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "minuteStep", null);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "secondStep", null);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "readonlyInputs", void 0);
    __decorate([
        Input()
    ], NgbTimepicker.prototype, "size", void 0);
    NgbTimepicker = __decorate([
        Component({
            selector: 'ngb-timepicker',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-input-container ngb-tp-hour\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeHour(hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-hours\">Increment hours</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\"\n            [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"HH\" i18n-placeholder=\"@@ngb.timepicker.HH\"\n            [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($any($event).target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Hours\" i18n-aria-label=\"@@ngb.timepicker.hours\"\n            (input)=\"formatInput($any($event).target)\"\n            (keydown.ArrowUp)=\"changeHour(hourStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeHour(-hourStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeHour(-hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-hours\">Decrement hours</span>\n          </button>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-input-container ngb-tp-minute\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeMinute(minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-minutes\">Increment minutes</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"MM\" i18n-placeholder=\"@@ngb.timepicker.MM\"\n            [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($any($event).target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Minutes\" i18n-aria-label=\"@@ngb.timepicker.minutes\"\n            (input)=\"formatInput($any($event).target)\"\n            (keydown.ArrowUp)=\"changeMinute(minuteStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeMinute(-minuteStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeMinute(-minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\"  i18n=\"@@ngb.timepicker.decrement-minutes\">Decrement minutes</span>\n          </button>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-input-container ngb-tp-second\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeSecond(secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-seconds\">Increment seconds</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"SS\" i18n-placeholder=\"@@ngb.timepicker.SS\"\n            [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($any($event).target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Seconds\" i18n-aria-label=\"@@ngb.timepicker.seconds\"\n            (input)=\"formatInput($any($event).target)\"\n            (keydown.ArrowUp)=\"changeSecond(secondStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeSecond(-secondStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeSecond(-secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-seconds\">Decrement seconds</span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-outline-primary\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\"\n                  (click)=\"toggleMeridian()\">\n            <ng-container *ngIf=\"model && model.hour >= 12; else am\"\n                          i18n=\"@@ngb.timepicker.PM\">{{ i18n.getAfternoonPeriod() }}</ng-container>\n            <ng-template #am i18n=\"@@ngb.timepicker.AM\">{{ i18n.getMorningPeriod() }}</ng-template>\n          </button>\n        </div>\n      </div>\n    </fieldset>\n  ",
            providers: [NGB_TIMEPICKER_VALUE_ACCESSOR],
            styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron::before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-meridian,.ngb-tp-minute,.ngb-tp-second{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}"]
        })
    ], NgbTimepicker);
    return NgbTimepicker;
}());
export { NgbTimepicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci90aW1lcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELElBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUUvQixJQUFNLDZCQUE2QixHQUFHO0lBQ3BDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRjs7R0FFRztBQXlGSDtJQWtFRSx1QkFDcUIsT0FBNEIsRUFBVSxlQUFvQyxFQUNuRixHQUFzQixFQUFTLElBQXVCO1FBRDdDLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBQ25GLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFZbEUsYUFBUSxHQUFH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S0FBSyxFQUFFO21EQUFtQjtJQUtsQjtRQUFSLEtBQUssRUFBRTttREFBbUI7SUFLbEI7UUFBUixLQUFLLEVBQUU7a0RBQWtCO0lBTTFCO1FBREMsS0FBSyxFQUFFO2lEQUdQO0lBUUQ7UUFEQyxLQUFLLEVBQUU7bURBR1A7SUFRRDtRQURDLEtBQUssRUFBRTttREFHUDtJQU9RO1FBQVIsS0FBSyxFQUFFO3lEQUF5QjtJQUt4QjtRQUFSLEtBQUssRUFBRTsrQ0FBb0M7SUFoRWpDLGFBQWE7UUF4RnpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFFckMsUUFBUSxFQUFFLGlnTUFpRlQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQzs7U0FDM0MsQ0FBQztPQUNXLGFBQWEsQ0FrTHpCO0lBQUQsb0JBQUM7Q0FBQSxBQWxMRCxJQWtMQztTQWxMWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge2lzSW50ZWdlciwgaXNOdW1iZXIsIHBhZE51bWJlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JUaW1lfSBmcm9tICcuL25nYi10aW1lJztcbmltcG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYlRpbWVBZGFwdGVyfSBmcm9tICcuL25nYi10aW1lLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JUaW1lcGlja2VySTE4bn0gZnJvbSAnLi90aW1lcGlja2VyLWkxOG4nO1xuXG5jb25zdCBGSUxURVJfUkVHRVggPSAvW14wLTldL2c7XG5cbmNvbnN0IE5HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVGltZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgaGVscHMgd2l0aCB3dGggcGlja2luZyBob3VycywgbWludXRlcyBhbmQgc2Vjb25kcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRpbWVwaWNrZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi90aW1lcGlja2VyLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZmllbGRzZXQgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1ob3VyXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cihob3VyU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1ob3Vyc1wiPkluY3JlbWVudCBob3Vyczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIm5nYi10cC1pbnB1dCBmb3JtLWNvbnRyb2xcIiBbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCJcbiAgICAgICAgICAgIFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIlxuICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiIGlucHV0bW9kZT1cIm51bWVyaWNcIiBwbGFjZWhvbGRlcj1cIkhIXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuSEhcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdEhvdXIobW9kZWw/LmhvdXIpXCIgKGNoYW5nZSk9XCJ1cGRhdGVIb3VyKCRhbnkoJGV2ZW50KS50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkT25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJIb3Vyc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIuaG91cnNcIlxuICAgICAgICAgICAgKGlucHV0KT1cImZvcm1hdElucHV0KCRhbnkoJGV2ZW50KS50YXJnZXQpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlSG91cihob3VyU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2VIb3VyKC1ob3VyU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cigtaG91clN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LWhvdXJzXCI+RGVjcmVtZW50IGhvdXJzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1taW51dGVcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0YWJpbmRleD1cIi0xXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VNaW51dGUobWludXRlU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1taW51dGVzXCI+SW5jcmVtZW50IG1pbnV0ZXM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJuZ2ItdHAtaW5wdXQgZm9ybS1jb250cm9sXCIgW2NsYXNzLmZvcm0tY29udHJvbC1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIlxuICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiIGlucHV0bW9kZT1cIm51bWVyaWNcIiBwbGFjZWhvbGRlcj1cIk1NXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuTU1cIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8ubWludXRlKVwiIChjaGFuZ2UpPVwidXBkYXRlTWludXRlKCRhbnkoJGV2ZW50KS50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkT25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJNaW51dGVzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5taW51dGVzXCJcbiAgICAgICAgICAgIChpbnB1dCk9XCJmb3JtYXRJbnB1dCgkYW55KCRldmVudCkudGFyZ2V0KVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5BcnJvd1VwKT1cImNoYW5nZU1pbnV0ZShtaW51dGVTdGVwKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlTWludXRlKC1taW51dGVTdGVwKVwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvbiBib3R0b21cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiAgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LW1pbnV0ZXNcIj5EZWNyZW1lbnQgbWludXRlczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtc3BhY2VyXCI+OjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtc2Vjb25kXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtc2Vjb25kc1wiPkluY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIiBpbnB1dG1vZGU9XCJudW1lcmljXCIgcGxhY2Vob2xkZXI9XCJTU1wiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLlNTXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/LnNlY29uZClcIiAoY2hhbmdlKT1cInVwZGF0ZVNlY29uZCgkYW55KCRldmVudCkudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcmVhZE9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiU2Vjb25kc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIuc2Vjb25kc1wiXG4gICAgICAgICAgICAoaW5wdXQpPVwiZm9ybWF0SW5wdXQoJGFueSgkZXZlbnQpLnRhcmdldClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJjaGFuZ2VTZWNvbmQoc2Vjb25kU3RlcCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2VTZWNvbmQoLXNlY29uZFN0ZXApOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHRhYmluZGV4PVwiLTFcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LXNlY29uZHNcIj5EZWNyZW1lbnQgc2Vjb25kczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXJpZGlhblwiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1tZXJpZGlhblwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lcmlkaWFuKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbCAmJiBtb2RlbC5ob3VyID49IDEyOyBlbHNlIGFtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuUE1cIj57eyBpMThuLmdldEFmdGVybm9vblBlcmlvZCgpIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2FtIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLkFNXCI+e3sgaTE4bi5nZXRNb3JuaW5nUGVyaW9kKCkgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZmllbGRzZXQ+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NpemU6IHN0cmluZztcblxuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgbW9kZWw6IE5nYlRpbWU7XG5cbiAgcHJpdmF0ZSBfaG91clN0ZXA6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWludXRlU3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9zZWNvbmRTdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSAxMkggb3IgMjRIIG1vZGUuXG4gICAqL1xuICBASW5wdXQoKSBtZXJpZGlhbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgc3Bpbm5lcnMgYWJvdmUgYW5kIGJlbG93IGlucHV0cyBhcmUgdmlzaWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIHNwaW5uZXJzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGl0IGlzIHBvc3NpYmxlIHRvIHNlbGVjdCBzZWNvbmRzLlxuICAgKi9cbiAgQElucHV0KCkgc2Vjb25kczogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBob3VycyB0byBhZGQvc3VidHJhY3Qgd2hlbiBjbGlja2luZyBob3VyIHNwaW5uZXJzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGhvdXJTdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX2hvdXJTdGVwID0gaXNJbnRlZ2VyKHN0ZXApID8gc3RlcCA6IHRoaXMuX2NvbmZpZy5ob3VyU3RlcDtcbiAgfVxuXG4gIGdldCBob3VyU3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faG91clN0ZXA7IH1cblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBtaW51dGVzIHRvIGFkZC9zdWJ0cmFjdCB3aGVuIGNsaWNraW5nIG1pbnV0ZSBzcGlubmVycy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBtaW51dGVTdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX21pbnV0ZVN0ZXAgPSBpc0ludGVnZXIoc3RlcCkgPyBzdGVwIDogdGhpcy5fY29uZmlnLm1pbnV0ZVN0ZXA7XG4gIH1cblxuICBnZXQgbWludXRlU3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWludXRlU3RlcDsgfVxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gYWRkL3N1YnRyYWN0IHdoZW4gY2xpY2tpbmcgc2Vjb25kIHNwaW5uZXJzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHNlY29uZFN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kU3RlcCA9IGlzSW50ZWdlcihzdGVwKSA/IHN0ZXAgOiB0aGlzLl9jb25maWcuc2Vjb25kU3RlcDtcbiAgfVxuXG4gIGdldCBzZWNvbmRTdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zZWNvbmRTdGVwOyB9XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIHRpbWVwaWNrZXIgaXMgcmVhZG9ubHkgYW5kIGNhbid0IGJlIGNoYW5nZWQuXG4gICAqL1xuICBASW5wdXQoKSByZWFkb25seUlucHV0czogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgaW5wdXRzIGFuZCBidXR0b25zLlxuICAgKi9cbiAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogTmdiVGltZXBpY2tlckNvbmZpZywgcHJpdmF0ZSBfbmdiVGltZUFkYXB0ZXI6IE5nYlRpbWVBZGFwdGVyPGFueT4sXG4gICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBpMThuOiBOZ2JUaW1lcGlja2VySTE4bikge1xuICAgIHRoaXMubWVyaWRpYW4gPSBfY29uZmlnLm1lcmlkaWFuO1xuICAgIHRoaXMuc3Bpbm5lcnMgPSBfY29uZmlnLnNwaW5uZXJzO1xuICAgIHRoaXMuc2Vjb25kcyA9IF9jb25maWcuc2Vjb25kcztcbiAgICB0aGlzLmhvdXJTdGVwID0gX2NvbmZpZy5ob3VyU3RlcDtcbiAgICB0aGlzLm1pbnV0ZVN0ZXAgPSBfY29uZmlnLm1pbnV0ZVN0ZXA7XG4gICAgdGhpcy5zZWNvbmRTdGVwID0gX2NvbmZpZy5zZWNvbmRTdGVwO1xuICAgIHRoaXMuZGlzYWJsZWQgPSBfY29uZmlnLmRpc2FibGVkO1xuICAgIHRoaXMucmVhZG9ubHlJbnB1dHMgPSBfY29uZmlnLnJlYWRvbmx5SW5wdXRzO1xuICAgIHRoaXMuc2l6ZSA9IF9jb25maWcuc2l6ZTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICBjb25zdCBzdHJ1Y3RWYWx1ZSA9IHRoaXMuX25nYlRpbWVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSk7XG4gICAgdGhpcy5tb2RlbCA9IHN0cnVjdFZhbHVlID8gbmV3IE5nYlRpbWUoc3RydWN0VmFsdWUuaG91ciwgc3RydWN0VmFsdWUubWludXRlLCBzdHJ1Y3RWYWx1ZS5zZWNvbmQpIDogbmV3IE5nYlRpbWUoKTtcbiAgICBpZiAoIXRoaXMuc2Vjb25kcyAmJiAoIXN0cnVjdFZhbHVlIHx8ICFpc051bWJlcihzdHJ1Y3RWYWx1ZS5zZWNvbmQpKSkge1xuICAgICAgdGhpcy5tb2RlbC5zZWNvbmQgPSAwO1xuICAgIH1cbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XG5cbiAgY2hhbmdlSG91cihzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLm1vZGVsLmNoYW5nZUhvdXIoc3RlcCk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgY2hhbmdlTWludXRlKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlTWludXRlKHN0ZXApO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIGNoYW5nZVNlY29uZChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLm1vZGVsLmNoYW5nZVNlY29uZChzdGVwKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVIb3VyKG5ld1ZhbDogc3RyaW5nKSB7XG4gICAgY29uc3QgaXNQTSA9IHRoaXMubW9kZWwuaG91ciA+PSAxMjtcbiAgICBjb25zdCBlbnRlcmVkSG91ciA9IHRvSW50ZWdlcihuZXdWYWwpO1xuICAgIGlmICh0aGlzLm1lcmlkaWFuICYmIChpc1BNICYmIGVudGVyZWRIb3VyIDwgMTIgfHwgIWlzUE0gJiYgZW50ZXJlZEhvdXIgPT09IDEyKSkge1xuICAgICAgdGhpcy5tb2RlbC51cGRhdGVIb3VyKGVudGVyZWRIb3VyICsgMTIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIpO1xuICAgIH1cbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVNaW51dGUobmV3VmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZU1pbnV0ZSh0b0ludGVnZXIobmV3VmFsKSk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlU2Vjb25kKG5ld1ZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbC51cGRhdGVTZWNvbmQodG9JbnRlZ2VyKG5ld1ZhbCkpO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHRvZ2dsZU1lcmlkaWFuKCkge1xuICAgIGlmICh0aGlzLm1lcmlkaWFuKSB7XG4gICAgICB0aGlzLmNoYW5nZUhvdXIoMTIpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdElucHV0KGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7IGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUucmVwbGFjZShGSUxURVJfUkVHRVgsICcnKTsgfVxuXG4gIGZvcm1hdEhvdXIodmFsdWU/OiBudW1iZXIpIHtcbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICBpZiAodGhpcy5tZXJpZGlhbikge1xuICAgICAgICByZXR1cm4gcGFkTnVtYmVyKHZhbHVlICUgMTIgPT09IDAgPyAxMiA6IHZhbHVlICUgMTIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDI0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhZE51bWJlcihOYU4pO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdE1pblNlYyh2YWx1ZT86IG51bWJlcikgeyByZXR1cm4gcGFkTnVtYmVyKGlzTnVtYmVyKHZhbHVlKSA/IHZhbHVlIDogTmFOKTsgfVxuXG4gIGdldCBpc1NtYWxsU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJzsgfVxuXG4gIGdldCBpc0xhcmdlU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJzsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snc2Vjb25kcyddICYmICF0aGlzLnNlY29uZHMgJiYgdGhpcy5tb2RlbCAmJiAhaXNOdW1iZXIodGhpcy5tb2RlbC5zZWNvbmQpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZU1vZGVsQ2hhbmdlKHRvdWNoZWQgPSB0cnVlKSB7XG4gICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsLmlzVmFsaWQodGhpcy5zZWNvbmRzKSkge1xuICAgICAgdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKHtob3VyOiB0aGlzLm1vZGVsLmhvdXIsIG1pbnV0ZTogdGhpcy5tb2RlbC5taW51dGUsIHNlY29uZDogdGhpcy5tb2RlbC5zZWNvbmR9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiVGltZUFkYXB0ZXIudG9Nb2RlbChudWxsKSk7XG4gICAgfVxuICB9XG59XG4iXX0=