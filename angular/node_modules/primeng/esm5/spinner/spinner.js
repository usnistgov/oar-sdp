var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Spinner; }),
    multi: true
};
var Spinner = /** @class */ (function () {
    function Spinner(el, cd) {
        this.el = el;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this._step = 1;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.keyPattern = /[0-9\+\-]/;
        this.negativeSeparator = '-';
    }
    Object.defineProperty(Spinner.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (val) {
            this._step = val;
            if (this._step != null) {
                var tokens = this.step.toString().split(/[,]|[.]/);
                this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Spinner.prototype.ngOnInit = function () {
        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp("[" + (this.thousandSeparator || this.localeThousandSeparator) + "]", 'gim');
            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
            }
        }
    };
    Spinner.prototype.repeat = function (event, interval, dir) {
        var _this = this;
        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
            _this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    };
    Spinner.prototype.spin = function (event, dir) {
        var step = this.step * dir;
        var currentValue;
        var precision = this.getPrecision();
        if (this.value)
            currentValue = (typeof this.value === 'string') ? this.parseValue(this.value) : this.value;
        else
            currentValue = 0;
        if (precision)
            this.value = parseFloat(this.toFixed(currentValue + step, precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    };
    Spinner.prototype.getPrecision = function () {
        return this.precision === undefined ? this.calculatedPrecision : this.precision;
    };
    Spinner.prototype.toFixed = function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    };
    Spinner.prototype.onUpButtonMousedown = function (event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    };
    Spinner.prototype.onUpButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onUpButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMousedown = function (event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    };
    Spinner.prototype.onDownButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onInputKeydown = function (event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    };
    Spinner.prototype.onInputChange = function (event) {
        this.onChange.emit(event);
    };
    Spinner.prototype.onInput = function (event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
        this.updateFilledState();
    };
    Spinner.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Spinner.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    Spinner.prototype.parseValue = function (val) {
        var value;
        var precision = this.getPrecision();
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.formatInput) {
                val = val.replace(this.thousandRegExp, '');
            }
            if (precision) {
                val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                value = parseFloat(val);
            }
            else {
                value = parseInt(val, 10);
            }
            if (!isNaN(value)) {
                if (this.max !== null && value > this.max) {
                    value = this.max;
                }
                if (this.min !== null && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    };
    Spinner.prototype.formatValue = function () {
        var value = this.value;
        var precision = this.getPrecision();
        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
                    if (precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp("[" + this.localeThousandSeparator + "]", 'gim'), this.thousandSeparator);
                    }
                    value = value.join('');
                }
            }
            this.formattedValue = value.toString();
        }
        else {
            this.formattedValue = null;
        }
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.formattedValue;
        }
    };
    Spinner.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    Spinner.prototype.writeValue = function (value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    Spinner.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Spinner.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Spinner.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Spinner.prototype.updateFilledState = function () {
        this.filled = (this.value !== undefined && this.value != null);
    };
    Spinner.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Output()
    ], Spinner.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Spinner.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], Spinner.prototype, "onBlur", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "min", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "max", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "maxlength", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "size", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "required", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "name", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "inputStyle", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "inputStyleClass", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "formatInput", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "decimalSeparator", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "thousandSeparator", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "precision", void 0);
    __decorate([
        ViewChild('inputfield')
    ], Spinner.prototype, "inputfieldViewChild", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "step", null);
    Spinner = __decorate([
        Component({
            selector: 'p-spinner',
            template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #inputfield type=\"text\" [attr.id]=\"inputId\" [value]=\"formattedValue||null\" [attr.name]=\"name\" [attr.aria-valumin]=\"min\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"value\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n            (keydown)=\"onInputKeydown($event)\" (blur)=\"onInputBlur($event)\" (input)=\"onInput($event)\" (change)=\"onInputChange($event)\" (focus)=\"onInputFocus($event)\"\n            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [ngClass]=\"'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-up ui-clickable\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-down ui-clickable\"></span>\n            </button>\n        </span>\n    ",
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [SPINNER_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
var SpinnerModule = /** @class */ (function () {
    function SpinnerModule() {
    }
    SpinnerModule = __decorate([
        NgModule({
            imports: [CommonModule, InputTextModule],
            exports: [Spinner],
            declarations: [Spinner]
        })
    ], SpinnerModule);
    return SpinnerModule;
}());
export { SpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvc3Bpbm5lci8iLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVKLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFRO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU8sQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUEyQkY7SUFzRkksaUJBQW1CLEVBQWMsRUFBUyxFQUFxQjtRQUE1QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFwRnJELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBd0N6RCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBSWxCLGtCQUFhLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVwQyxlQUFVLEdBQVcsV0FBVyxDQUFDO1FBUTFCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztJQXdCbUMsQ0FBQztJ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QTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFMekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztZQUN2QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsVmlld0NoaWxkLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBTUElOTkVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU3Bpbm5lciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zcGlubmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXNwaW5uZXIgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGxcIj5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXRmaWVsZCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbdmFsdWVdPVwiZm9ybWF0dGVkVmFsdWV8fG51bGxcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbYXR0ci5hcmlhLXZhbHVtaW5dPVwibWluXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIiBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgIFthdHRyLnNpemVdPVwic2l6ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCIgW2F0dHIucmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCIgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCIndWktc3Bpbm5lci1pbnB1dCB1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCdcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtuZ0NsYXNzXT1cInsndWktc3Bpbm5lci1idXR0b24gdWktc3Bpbm5lci11cCB1aS1jb3JuZXItdHIgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkfHxyZWFkb25seVwiIHRhYmluZGV4PVwiLTFcIiBbYXR0ci5yZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25VcEJ1dHRvbk1vdXNlbGVhdmUoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25VcEJ1dHRvbk1vdXNlZG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25VcEJ1dHRvbk1vdXNldXAoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3Bpbm5lci1idXR0b24taWNvbiBwaSBwaS1jYXJldC11cCB1aS1jbGlja2FibGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtuZ0NsYXNzXT1cInsndWktc3Bpbm5lci1idXR0b24gdWktc3Bpbm5lci1kb3duIHVpLWNvcm5lci1iciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWR8fHJlYWRvbmx5XCIgdGFiaW5kZXg9XCItMVwiIFthdHRyLnJlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvbkRvd25CdXR0b25Nb3VzZWxlYXZlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uRG93bkJ1dHRvbk1vdXNlZG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyLWJ1dHRvbi1pY29uIHBpIHBpLWNhcmV0LWRvd24gdWktY2xpY2thYmxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtTUElOTkVSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgU3Bpbm5lciBpbXBsZW1lbnRzIE9uSW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gICAgXG4gICAgQElucHV0KCkgbWF4bGVuZ3RoOiBudW1iZXI7XG4gICAgXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcbiAgICAgICAgICAgIFxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZm9ybWF0SW5wdXQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0aG91c2FuZFNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHJlY2lzaW9uOiBudW1iZXI7XG4gICAgXG4gICAgdmFsdWU6IGFueTtcblxuICAgIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gICAgZm9ybWF0dGVkVmFsdWU6IHN0cmluZztcbiAgICAgICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBrZXlQYXR0ZXJuOiBSZWdFeHAgPSAvWzAtOVxcK1xcLV0vO1xuICAgICAgICBcbiAgICBwdWJsaWMgdGltZXI6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgZm9jdXM6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGZpbGxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgbmVnYXRpdmVTZXBhcmF0b3IgPSAnLSc7XG5cbiAgICBsb2NhbGVEZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBsb2NhbGVUaG91c2FuZFNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgdGhvdXNhbmRSZWdFeHA6IFJlZ0V4cDtcblxuICAgIGNhbGN1bGF0ZWRQcmVjaXNpb246IG51bWJlcjtcbiAgICBcbiAgICBAVmlld0NoaWxkKCdpbnB1dGZpZWxkJykgaW5wdXRmaWVsZFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWw6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0ZXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KC9bLF18Wy5dLyk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRQcmVjaXNpb24gPSB0b2tlbnNbMV0gPyB0b2tlbnNbMV0ubGVuZ3RoIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5mb3JtYXRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yID0gKDEuMSkudG9Mb2NhbGVTdHJpbmcoKS5zdWJzdHJpbmcoMSwgMik7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZVRob3VzYW5kU2VwYXJhdG9yID0gKDEwMDApLnRvTG9jYWxlU3RyaW5nKCkuc3Vic3RyaW5nKDEsIDIpO1xuICAgICAgICAgICAgdGhpcy50aG91c2FuZFJlZ0V4cCA9IG5ldyBSZWdFeHAoYFske3RoaXMudGhvdXNhbmRTZXBhcmF0b3IgfHwgdGhpcy5sb2NhbGVUaG91c2FuZFNlcGFyYXRvcn1dYCwgJ2dpbScpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWNpbWFsU2VwYXJhdG9yICYmIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgJiYgdGhpcy5kZWNpbWFsU2VwYXJhdG9yID09PSB0aGlzLnRob3VzYW5kU2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhvdXNhbmRTZXBhcmF0b3IgYW5kIGRlY2ltYWxTZXBhcmF0b3IgY2Fubm90IGhhdmUgdGhlIHNhbWUgdmFsdWUuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50OiBFdmVudCwgaW50ZXJ2YWw6IG51bWJlciwgZGlyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGkgPSBpbnRlcnZhbHx8NTAwO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgNDAsIGRpcik7XG4gICAgICAgIH0sIGkpO1xuXG4gICAgICAgIHRoaXMuc3BpbihldmVudCwgZGlyKTtcbiAgICB9XG4gICAgXG4gICAgc3BpbihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzdGVwID0gdGhpcy5zdGVwICogZGlyO1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlOiBudW1iZXI7XG4gICAgICAgIGxldCBwcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKVxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnc3RyaW5nJykgPyB0aGlzLnBhcnNlVmFsdWUodGhpcy52YWx1ZSkgOiB0aGlzLnZhbHVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKHByZWNpc2lvbilcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMudG9GaXhlZChjdXJyZW50VmFsdWUgKyBzdGVwLCBwcmVjaXNpb24pKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGN1cnJlbnRWYWx1ZSArIHN0ZXA7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLm1heGxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiB0aGlzLm1heGxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAodGhpcy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLnZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1pbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKCk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRQcmVjaXNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5jYWxjdWxhdGVkUHJlY2lzaW9uIDogdGhpcy5wcmVjaXNpb247XG4gICAgfVxuICAgIFxuICAgIHRvRml4ZWQodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbnx8MCk7XG4gICAgICAgIHJldHVybiBTdHJpbmcoTWF0aC5yb3VuZCh2YWx1ZSAqIHBvd2VyKSAvIHBvd2VyKTtcbiAgICB9XG4gICAgXG4gICAgb25VcEJ1dHRvbk1vdXNlZG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIDEpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblVwQnV0dG9uTW91c2V1cChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblVwQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkRvd25CdXR0b25Nb3VzZWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAtMSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uRG93bkJ1dHRvbk1vdXNldXAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25Eb3duQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbklucHV0S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMzgpIHtcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDQwKSB7XG4gICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSgoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWUpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICB9XG4gICAgICAgIFxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgcGFyc2VWYWx1ZSh2YWw6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgICAgICBsZXQgcHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24oKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgKHZhbC50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtYXRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKHRoaXMudGhvdXNhbmRSZWdFeHAsICcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZWNpc2lvbikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZm9ybWF0SW5wdXQgPyB2YWwucmVwbGFjZSh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgfHwgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yLCAnLicpIDogdmFsLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWwsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXggIT09IG51bGwgJiYgdmFsdWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWF4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbiAhPT0gbnVsbCAmJiB2YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5taW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZm9ybWF0VmFsdWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGxldCBwcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbigpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtYXRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7bWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyMH0pO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgJiYgdGhpcy50aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvcik7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVjaXNpb24gJiYgdmFsdWVbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlWzFdID0gKHRoaXMuZGVjaW1hbFNlcGFyYXRvciB8fCB0aGlzLmxvY2FsZURlY2ltYWxTZXBhcmF0b3IpICsgdmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgJiYgdmFsdWVbMF0ubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbMF0gPSB2YWx1ZVswXS5yZXBsYWNlKG5ldyBSZWdFeHAoYFske3RoaXMubG9jYWxlVGhvdXNhbmRTZXBhcmF0b3J9XWAsICdnaW0nKSwgdGhpcy50aG91c2FuZFNlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZCAmJiB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICAgICAgXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0VmFsdWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cbiAgICBcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgIT0gbnVsbCk7XG4gICAgfVxufVxuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxJbnB1dFRleHRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTcGlubmVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGlubmVyXVxufSlcbmV4cG9ydCBjbGFzcyBTcGlubmVyTW9kdWxlIHsgfVxuIl19