import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Output, Input, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

const _c0 = ["inputfield"];
const _c1 = function (a1) { return { "ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default": true, "ui-state-disabled": a1 }; };
const _c2 = function (a1) { return { "ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default": true, "ui-state-disabled": a1 }; };
const SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Spinner),
    multi: true
};
class Spinner {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this._step = 1;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.keyPattern = /[0-9\+\-]/;
        this.negativeSeparator = '-';
    }
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
        if (this._step != null) {
            let tokens = this.step.toString().split(/[,]|[.]/);
            this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
        }
    }
    ngOnInit() {
        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp(`[${this.thousandSeparator || this.localeThousandSeparator}]`, 'gim');
            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
            }
        }
    }
    repeat(event, interval, dir) {
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue;
        let precision = this.getPrecision();
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
    }
    getPrecision() {
        return this.precision === undefined ? this.calculatedPrecision : this.precision;
    }
    toFixed(value, precision) {
        let power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    }
    onUpButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onUpButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onUpButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onDownButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onInputKeydown(event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    }
    onInputChange(event) {
        this.onChange.emit(event);
    }
    onInput(event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
        this.updateFilledState();
    }
    onInputBlur(event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    parseValue(val) {
        let value;
        let precision = this.getPrecision();
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
    }
    formatValue() {
        let value = this.value;
        let precision = this.getPrecision();
        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
                    if (precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp(`[${this.localeThousandSeparator}]`, 'gim'), this.thousandSeparator);
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
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    writeValue(value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    updateFilledState() {
        this.filled = (this.value !== undefined && this.value != null);
    }
}
Spinner.ɵfac = function Spinner_Factory(t) { return new (t || Spinner)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Spinner.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Spinner, selectors: [["p-spinner"]], viewQuery: function Spinner_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.inputfieldViewChild = _t.first);
    } }, hostVars: 4, hostBindings: function Spinner_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("ui-inputwrapper-filled", ctx.filled)("ui-inputwrapper-focus", ctx.focus);
    } }, inputs: { step: "step", disabled: "disabled", min: "min", max: "max", maxlength: "maxlength", size: "size", placeholder: "placeholder", inputId: "inputId", readonly: "readonly", tabindex: "tabindex", required: "required", name: "name", ariaLabelledBy: "ariaLabelledBy", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", formatInput: "formatInput", decimalSeparator: "decimalSeparator", thousandSeparator: "thousandSeparator", precision: "precision" }, outputs: { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur" }, features: [ɵngcc0.ɵɵProvidersFeature([SPINNER_VALUE_ACCESSOR])], decls: 7, vars: 28, consts: [[1, "ui-spinner", "ui-widget", "ui-corner-all"], ["type", "text", 3, "value", "disabled", "readonly", "ngStyle", "ngClass", "keydown", "blur", "input", "change", "focus"], ["inputfield", ""], ["type", "button", "tabindex", "-1", 3, "ngClass", "disabled", "mouseleave", "mousedown", "mouseup"], [1, "ui-spinner-button-icon", "pi", "pi-caret-up", "ui-clickable"], [1, "ui-spinner-button-icon", "pi", "pi-caret-down", "ui-clickable"]], template: function Spinner_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "span", 0);
        ɵngcc0.ɵɵelementStart(1, "input", 1, 2);
        ɵngcc0.ɵɵlistener("keydown", function Spinner_Template_input_keydown_1_listener($event) { return ctx.onInputKeydown($event); })("blur", function Spinner_Template_input_blur_1_listener($event) { return ctx.onInputBlur($event); })("input", function Spinner_Template_input_input_1_listener($event) { return ctx.onInput($event); })("change", function Spinner_Template_input_change_1_listener($event) { return ctx.onInputChange($event); })("focus", function Spinner_Template_input_focus_1_listener($event) { return ctx.onInputFocus($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "button", 3);
        ɵngcc0.ɵɵlistener("mouseleave", function Spinner_Template_button_mouseleave_3_listener($event) { return ctx.onUpButtonMouseleave($event); })("mousedown", function Spinner_Template_button_mousedown_3_listener($event) { return ctx.onUpButtonMousedown($event); })("mouseup", function Spinner_Template_button_mouseup_3_listener($event) { return ctx.onUpButtonMouseup($event); });
        ɵngcc0.ɵɵelement(4, "span", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "button", 3);
        ɵngcc0.ɵɵlistener("mouseleave", function Spinner_Template_button_mouseleave_5_listener($event) { return ctx.onDownButtonMouseleave($event); })("mousedown", function Spinner_Template_button_mousedown_5_listener($event) { return ctx.onDownButtonMousedown($event); })("mouseup", function Spinner_Template_button_mouseup_5_listener($event) { return ctx.onDownButtonMouseup($event); });
        ɵngcc0.ɵɵelement(6, "span", 5);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassMap(ctx.inputStyleClass);
        ɵngcc0.ɵɵproperty("value", ctx.formattedValue || null)("disabled", ctx.disabled)("readonly", ctx.readonly)("ngStyle", ctx.inputStyle)("ngClass", "ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all");
        ɵngcc0.ɵɵattribute("id", ctx.inputId)("name", ctx.name)("aria-valumin", ctx.min)("aria-valuemax", ctx.max)("aria-valuenow", ctx.value)("aria-labelledby", ctx.ariaLabelledBy)("size", ctx.size)("maxlength", ctx.maxlength)("tabindex", ctx.tabindex)("placeholder", ctx.placeholder)("required", ctx.required);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(24, _c1, ctx.disabled))("disabled", ctx.disabled || ctx.readonly);
        ɵngcc0.ɵɵattribute("readonly", ctx.readonly);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(26, _c2, ctx.disabled))("disabled", ctx.disabled || ctx.readonly);
        ɵngcc0.ɵɵattribute("readonly", ctx.readonly);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgClass], styles: [".ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{padding-right:1.5em;vertical-align:middle}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{left:50%;margin-left:-.5em;margin-top:-.5em;position:absolute;top:50%;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}"], encapsulation: 2, changeDetection: 0 });
Spinner.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
Spinner.propDecorators = {
    onChange: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    maxlength: [{ type: Input }],
    size: [{ type: Input }],
    placeholder: [{ type: Input }],
    inputId: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    tabindex: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    inputStyle: [{ type: Input }],
    inputStyleClass: [{ type: Input }],
    formatInput: [{ type: Input }],
    decimalSeparator: [{ type: Input }],
    thousandSeparator: [{ type: Input }],
    precision: [{ type: Input }],
    inputfieldViewChild: [{ type: ViewChild, args: ['inputfield',] }],
    step: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Spinner, [{
        type: Component,
        args: [{
                selector: 'p-spinner',
                template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input #inputfield type="text" [attr.id]="inputId" [value]="formattedValue||null" [attr.name]="name" [attr.aria-valumin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="value" [attr.aria-labelledby]="ariaLabelledBy"
            [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
            (keydown)="onInputKeydown($event)" (blur)="onInputBlur($event)" (input)="onInput($event)" (change)="onInputChange($event)" (focus)="onInputFocus($event)"
            [ngStyle]="inputStyle" [class]="inputStyleClass" [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'">
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled||readonly" tabindex="-1" [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)" (mousedown)="onUpButtonMousedown($event)" (mouseup)="onUpButtonMouseup($event)">
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled||readonly" tabindex="-1" [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)" (mousedown)="onDownButtonMousedown($event)" (mouseup)="onDownButtonMouseup($event)">
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `,
                host: {
                    '[class.ui-inputwrapper-filled]': 'filled',
                    '[class.ui-inputwrapper-focus]': 'focus'
                },
                providers: [SPINNER_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{padding-right:1.5em;vertical-align:middle}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{left:50%;margin-left:-.5em;margin-top:-.5em;position:absolute;top:50%;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, { onChange: [{
            type: Output
        }], onFocus: [{
            type: Output
        }], onBlur: [{
            type: Output
        }], step: [{
            type: Input
        }], disabled: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], maxlength: [{
            type: Input
        }], size: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], inputId: [{
            type: Input
        }], readonly: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], required: [{
            type: Input
        }], name: [{
            type: Input
        }], ariaLabelledBy: [{
            type: Input
        }], inputStyle: [{
            type: Input
        }], inputStyleClass: [{
            type: Input
        }], formatInput: [{
            type: Input
        }], decimalSeparator: [{
            type: Input
        }], thousandSeparator: [{
            type: Input
        }], precision: [{
            type: Input
        }], inputfieldViewChild: [{
            type: ViewChild,
            args: ['inputfield']
        }] }); })();
class SpinnerModule {
}
SpinnerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SpinnerModule });
SpinnerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SpinnerModule_Factory(t) { return new (t || SpinnerModule)(); }, imports: [[CommonModule, InputTextModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SpinnerModule, { declarations: function () { return [Spinner]; }, imports: function () { return [CommonModule, InputTextModule]; }, exports: function () { return [Spinner]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SpinnerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, InputTextModule],
                exports: [Spinner],
                declarations: [Spinner]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { SPINNER_VALUE_ACCESSOR, Spinner, SpinnerModule };

//# sourceMappingURL=primeng-spinner.js.map