import { forwardRef, EventEmitter, ElementRef, Input, ViewChild, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var INPUTNUMBER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputNumber; }),
    multi: true
};
var InputNumber = /** @class */ (function () {
    function InputNumber(el) {
        this.el = el;
        this.showButtons = false;
        this.format = true;
        this.buttonLayout = "stacked";
        this.useGrouping = true;
        this.incrementButtonIcon = 'pi pi-chevron-up';
        this.decrementButtonIcon = 'pi pi-chevron-down';
        this.mode = "decimal";
        this.step = 1;
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    InputNumber.prototype.ngOnInit = function () {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        var numerals = __spread(new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)).reverse();
        var index = new Map(numerals.map(function (d, i) { return [d, i]; }));
        this._numeral = new RegExp("[" + numerals.join('') + "]", 'g');
        this._decimal = this.getDecimalExpression();
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._suffix = new RegExp("[" + (this.suffix || '') + "]", 'g');
        this._prefix = new RegExp("[" + (this.prefix || '') + "]", 'g');
        this._index = function (d) { return index.get(d); };
    };
    InputNumber.prototype.formatValue = function (value) {
        if (value != null) {
            if (this.format) {
                var formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                var formattedValue = formatter.format(value);
                if (this.prefix) {
                    formattedValue = this.prefix + formattedValue;
                }
                if (this.suffix) {
                    formattedValue = formattedValue + this.suffix;
                }
                return formattedValue;
            }
            return value;
        }
        return '';
    };
    InputNumber.prototype.formattedValue = function () {
        return this.formatValue(this.value);
    };
    InputNumber.prototype.onInput = function (event) {
        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    };
    InputNumber.prototype.onInputKeyDown = function (event) {
        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }
        var selectionStart = event.target.selectionStart;
        var selectionEnd = event.target.selectionEnd;
        var inputValue = event.target.value;
        if (event.altKey) {
            event.preventDefault();
        }
        switch (event.which) {
            //up
            case 38:
                this.spin(event, 1);
                event.preventDefault();
                break;
            //down
            case 40:
                this.spin(event, -1);
                event.preventDefault();
                break;
            //left
            case 37:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                    event.preventDefault();
                }
                break;
            //right
            case 39:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                    event.preventDefault();
                }
                break;
            //backspace
            case 8: {
                event.preventDefault();
                var newValueStr = null;
                if (selectionStart === selectionEnd) {
                    var deleteChar = inputValue.charAt(selectionStart - 1);
                    var decimalCharIndex = inputValue.search(this._decimal);
                    this._decimal.lastIndex = 0;
                    if (this.isNumeralChar(deleteChar)) {
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    }
                    if (newValueStr != null) {
                        this.updateValue(event, newValueStr, 'delete-single');
                    }
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, 'delete-range');
                }
                break;
            }
            default:
                break;
        }
    };
    InputNumber.prototype.onInputKeyPress = function (event) {
        event.preventDefault();
        var code = event.which || event.keyCode;
        var char = String.fromCharCode(code);
        if ((48 <= code && code <= 57) || this.isMinusSign(char)) {
            this.insert(event, char);
        }
    };
    InputNumber.prototype.onPaste = function (event) {
        event.preventDefault();
        var data = (event.clipboardData || window['clipboardData']).getData('Text');
        if (data) {
            var filteredData = this.parseValue(data);
            if (filteredData != null) {
                this.insert(event, filteredData.toString());
            }
        }
    };
    InputNumber.prototype.onInputClick = function () {
        this.initCursor();
    };
    InputNumber.prototype.onInputFocus = function (event) {
        this.focused = true;
        this.onFocus.emit(event);
    };
    InputNumber.prototype.onInputBlur = function (event) {
        this.focused = false;
        var newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValue);
        this.input.nativeElement.setAttribute('aria-valuenow', newValue);
        this.updateModel(event, newValue);
        this.onBlur.emit(event);
    };
    InputNumber.prototype.onUpButtonMouseDown = function (event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
    };
    InputNumber.prototype.onUpButtonMouseUp = function () {
        this.clearTimer();
    };
    InputNumber.prototype.onUpButtonMouseLeave = function () {
        this.clearTimer();
    };
    InputNumber.prototype.onUpButtonKeyDown = function (event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    };
    InputNumber.prototype.onUpButtonKeyUp = function () {
        this.clearTimer();
    };
    InputNumber.prototype.onDownButtonMouseDown = function (event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
    };
    InputNumber.prototype.onDownButtonMouseUp = function () {
        this.clearTimer();
    };
    InputNumber.prototype.onDownButtonMouseLeave = function () {
        this.clearTimer();
    };
    InputNumber.prototype.onDownButtonKeyUp = function () {
        this.clearTimer();
    };
    InputNumber.prototype.onDownButtonKeyDown = function (event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    };
    InputNumber.prototype.spin = function (event, dir) {
        var step = this.step * dir;
        var currentValue = this.parseValue(this.input.nativeElement.value) || 0;
        var newValue = this.validateValue(currentValue + step);
        if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
            return;
        }
        this.updateInput(newValue, 'spin');
        this.updateModel(event, newValue);
    };
    InputNumber.prototype.repeat = function (event, interval, dir) {
        var _this = this;
        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
            _this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    };
    InputNumber.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    InputNumber.prototype.insert = function (event, text) {
        var selectionStart = this.input.nativeElement.selectionStart;
        var selectionEnd = this.input.nativeElement.selectionEnd;
        var inputValue = this.input.nativeElement.value.trim();
        var maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
        var newValueStr;
        var decimalCharIndex = inputValue.search(this._decimal);
        this._decimal.lastIndex = 0;
        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
            if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length);
                this.updateValue(event, newValueStr, 'insert');
            }
        }
        else {
            newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, 'insert');
        }
    };
    InputNumber.prototype.insertText = function (value, text, start, end) {
        var newValueStr;
        if ((end - start) === value.length)
            newValueStr = text;
        else if (start === 0)
            newValueStr = text + value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start) + text;
        else
            newValueStr = value.slice(0, start) + text + value.slice(end);
        return newValueStr;
    };
    InputNumber.prototype.initCursor = function () {
        var selectionStart = this.input.nativeElement.selectionStart;
        var inputValue = this.input.nativeElement.value;
        var valueLength = inputValue.length;
        var index = null;
        var char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return;
        }
        //left
        var i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i;
                break;
            }
            else {
                i--;
            }
        }
        if (index !== null) {
            this.input.nativeElement.setSelectionRange(index + 1, index + 1);
        }
        else {
            i = selectionStart + 1;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i;
                    break;
                }
                else {
                    i++;
                }
            }
            if (index !== null) {
                this.input.nativeElement.setSelectionRange(index, index);
            }
        }
    };
    InputNumber.prototype.updateInput = function (value, operation) {
        var currentLength = this.input.nativeElement.value.length;
        if (currentLength === 0) {
            this.input.nativeElement.value = this.formatValue(value);
            this.input.nativeElement.setSelectionRange(0, 0);
            this.initCursor();
            this.input.nativeElement.setSelectionRange(this.input.nativeElement.selectionStart + 1, this.input.nativeElement.selectionStart + 1);
        }
        else {
            var selectionStart = this.input.nativeElement.selectionEnd;
            var selectionEnd = this.input.nativeElement.selectionEnd;
            var formattedValue = this.formatValue(value);
            if (this.maxlength && this.maxlength < formattedValue.length) {
                return;
            }
            this.input.nativeElement.value = this.formatValue(value);
            var newLength = this.input.nativeElement.value.length;
            if (newLength === currentLength) {
                if (operation === 'insert')
                    this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'delete-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range')
                    this.input.nativeElement.setSelectionRange(selectionStart, selectionStart);
                else if (operation === 'spin')
                    this.input.nativeElement.setSelectionRange(selectionStart, selectionEnd);
            }
            else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
        }
        this.input.nativeElement.setAttribute('aria-valuenow', value);
    };
    InputNumber.prototype.updateModel = function (event, value) {
        this.value = value;
        this.onModelChange(value);
    };
    InputNumber.prototype.updateValue = function (event, valueStr, operation) {
        if (valueStr != null) {
            var newValue = this.parseValue(valueStr);
            this.updateInput(newValue, operation);
        }
    };
    InputNumber.prototype.validateValue = function (value) {
        if (this.min !== null && value < this.min) {
            return this.min;
        }
        if (this.max !== null && value > this.max) {
            return this.max;
        }
        return value;
    };
    InputNumber.prototype.deleteRange = function (value, start, end) {
        var newValueStr;
        if ((end - start) === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);
        return newValueStr;
    };
    InputNumber.prototype.isNumeralChar = function (char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }
        return false;
    };
    InputNumber.prototype.isMinusSign = function (char) {
        if (this._minusSign.test(char)) {
            this._minusSign.lastIndex = 0;
            return true;
        }
        return false;
    };
    InputNumber.prototype.parseValue = function (text) {
        var filteredText = text.trim()
            .replace(/\s/g, '')
            .replace(this._currency, '')
            .replace(this._group, '')
            .replace(this._suffix, '')
            .replace(this._prefix, '')
            .replace(this._minusSign, '-')
            .replace(this._decimal, '.')
            .replace(this._numeral, this._index);
        if (filteredText) {
            var parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }
        return null;
    };
    InputNumber.prototype.writeValue = function (value) {
        this.value = value;
    };
    InputNumber.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputNumber.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputNumber.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    InputNumber.prototype.getOptions = function () {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        };
    };
    InputNumber.prototype.getDecimalExpression = function () {
        var formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp("[" + formatter.format(1.1).trim().replace(this._numeral, '') + "]", 'g');
    };
    InputNumber.prototype.getGroupingExpression = function () {
        var formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
        return new RegExp("[" + formatter.format(1000).trim().replace(this._numeral, '') + "]", 'g');
    };
    InputNumber.prototype.getMinusSignExpression = function () {
        var formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp("[" + formatter.format(-1).trim().replace(this._numeral, '') + "]", 'g');
    };
    InputNumber.prototype.getCurrencyExpression = function () {
        if (this.currency) {
            var formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay });
            return new RegExp("[" + formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._decimal, '').replace(this._group, '') + "]", 'g');
        }
        return new RegExp("[]", 'g');
    };
    InputNumber.prototype.filled = function () {
        return (this.value != null && this.value.toString().length > 0);
    };
    InputNumber.prototype.resetRegex = function () {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
    };
    InputNumber.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], InputNumber.prototype, "showButtons", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "format", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "buttonLayout", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "prefix", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "locale", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "suffix", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "localeMatcher", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "currency", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "currencyDisplay", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "useGrouping", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "size", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "maxlength", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "title", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "ariaLabel", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "ariaRequired", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "name", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "required", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "autocomplete", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "min", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "max", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "minFractionDigits", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "maxFractionDigits", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "incrementButtonClass", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "decrementButtonClass", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "incrementButtonIcon", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "decrementButtonIcon", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "mode", void 0);
    __decorate([
        Input()
    ], InputNumber.prototype, "step", void 0);
    __decorate([
        ViewChild('input')
    ], InputNumber.prototype, "input", void 0);
    __decorate([
        Output()
    ], InputNumber.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], InputNumber.prototype, "onBlur", void 0);
    InputNumber = __decorate([
        Component({
            selector: 'p-inputNumber',
            template: "\n        <span [ngClass]=\"{'ui-inputnumber ui-widget': true, 'ui-inputwrapper-filled': this.filled(), 'ui-inputwrapper-focus': this.focused,\n                'ui-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked', 'ui-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal',\n                'ui-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}\">\n            <input #input class=\"ui-inputnumber-input\" pInputText [value]=\"formattedValue()\" [attr.placeholder]=\"placeholder\" [attr.title]=\"title\" [attr.id]=\"inputId\"\n                [attr.size]=\"size\" [attr.name]=\"name\" [attr.autocomplete]=\"autocomplete\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.aria-label]=\"ariaLabel\"\n                [attr.aria-required]=\"ariaRequired\" [disabled]=\"disabled\" [attr.required]=\"required\" [attr.aria-valumin]=\"min\" [attr.aria-valuemax]=\"max\"\n                (input)=\"onInput($event)\" (keydown)=\"onInputKeyDown($event)\" (keypress)=\"onInputKeyPress($event)\" (paste)=\"onPaste($event)\" (click)=\"onInputClick()\"\n                (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <span class=\"ui-inputnumber-button-group\" *ngIf=\"showButtons && buttonLayout === 'stacked'\">\n                <button type=\"button\" pButton [ngClass]=\"{'ui-inputnumber-button ui-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n                <button type=\"button\" pButton [ngClass]=\"{'ui-inputnumber-button ui-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n            </span>\n            <button type=\"button\" pButton [ngClass]=\"{'ui-inputnumber-button ui-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n            <button type=\"button\" pButton [ngClass]=\"{'ui-inputnumber-button ui-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n        </span>\n    ",
            changeDetection: ChangeDetectionStrategy.Default,
            providers: [INPUTNUMBER_VALUE_ACCESSOR]
        })
    ], InputNumber);
    return InputNumber;
}());
var InputNumberModule = /** @class */ (function () {
    function InputNumberModule() {
    }
    InputNumberModule = __decorate([
        NgModule({
            imports: [CommonModule, InputTextModule, ButtonModule],
            exports: [InputNumber],
            declarations: [InputNumber]
        })
    ], InputNumberModule);
    return InputNumberModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { INPUTNUMBER_VALUE_ACCESSOR, InputNumber, InputNumberModule };
//# sourceMappingURL=primeng-inputnumber.js.map
