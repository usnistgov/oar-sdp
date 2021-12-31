var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild, OnInit, EventEmitter, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const INPUTNUMBER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
};
let InputNumber = class InputNumber {
    constructor(el) {
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
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._decimal = this.getDecimalExpression();
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._suffix = new RegExp(`[${this.suffix || ''}]`, 'g');
        this._prefix = new RegExp(`[${this.prefix || ''}]`, 'g');
        this._index = d => index.get(d);
    }
    formatValue(value) {
        if (value != null) {
            if (this.format) {
                let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                let formattedValue = formatter.format(value);
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
    }
    formattedValue() {
        return this.formatValue(this.value);
    }
    onInput(event) {
        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    }
    onInputKeyDown(event) {
        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        let inputValue = event.target.value;
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
                let newValueStr = null;
                if (selectionStart === selectionEnd) {
                    let deleteChar = inputValue.charAt(selectionStart - 1);
                    let decimalCharIndex = inputValue.search(this._decimal);
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
    }
    onInputKeyPress(event) {
        event.preventDefault();
        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        if ((48 <= code && code <= 57) || this.isMinusSign(char)) {
            this.insert(event, char);
        }
    }
    onPaste(event) {
        event.preventDefault();
        let data = (event.clipboardData || window['clipboardData']).getData('Text');
        if (data) {
            let filteredData = this.parseValue(data);
            if (filteredData != null) {
                this.insert(event, filteredData.toString());
            }
        }
    }
    onInputClick() {
        this.initCursor();
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        let newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValue);
        this.input.nativeElement.setAttribute('aria-valuenow', newValue);
        this.updateModel(event, newValue);
        this.onBlur.emit(event);
    }
    onUpButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
    }
    onUpButtonMouseUp() {
        this.clearTimer();
    }
    onUpButtonMouseLeave() {
        this.clearTimer();
    }
    onUpButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    }
    onUpButtonKeyUp() {
        this.clearTimer();
    }
    onDownButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
    }
    onDownButtonMouseUp() {
        this.clearTimer();
    }
    onDownButtonMouseLeave() {
        this.clearTimer();
    }
    onDownButtonKeyUp() {
        this.clearTimer();
    }
    onDownButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.input.nativeElement.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
            return;
        }
        this.updateInput(newValue, 'spin');
        this.updateModel(event, newValue);
    }
    repeat(event, interval, dir) {
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    insert(event, text) {
        let selectionStart = this.input.nativeElement.selectionStart;
        let selectionEnd = this.input.nativeElement.selectionEnd;
        let inputValue = this.input.nativeElement.value.trim();
        let maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
        let newValueStr;
        let decimalCharIndex = inputValue.search(this._decimal);
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
    }
    insertText(value, text, start, end) {
        let newValueStr;
        if ((end - start) === value.length)
            newValueStr = text;
        else if (start === 0)
            newValueStr = text + value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start) + text;
        else
            newValueStr = value.slice(0, start) + text + value.slice(end);
        return newValueStr;
    }
    initCursor() {
        let selectionStart = this.input.nativeElement.selectionStart;
        let inputValue = this.input.nativeElement.value;
        let valueLength = inputValue.length;
        let index = null;
        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return;
        }
        //left
        let i = selectionStart - 1;
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
    }
    updateInput(value, operation) {
        let currentLength = this.input.nativeElement.value.length;
        if (currentLength === 0) {
            this.input.nativeElement.value = this.formatValue(value);
            this.input.nativeElement.setSelectionRange(0, 0);
            this.initCursor();
            this.input.nativeElement.setSelectionRange(this.input.nativeElement.selectionStart + 1, this.input.nativeElement.selectionStart + 1);
        }
        else {
            let selectionStart = this.input.nativeElement.selectionEnd;
            let selectionEnd = this.input.nativeElement.selectionEnd;
            let formattedValue = this.formatValue(value);
            if (this.maxlength && this.maxlength < formattedValue.length) {
                return;
            }
            this.input.nativeElement.value = this.formatValue(value);
            let newLength = this.input.nativeElement.value.length;
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
    }
    updateModel(event, value) {
        this.value = value;
        this.onModelChange(value);
    }
    updateValue(event, valueStr, operation) {
        if (valueStr != null) {
            let newValue = this.parseValue(valueStr);
            this.updateInput(newValue, operation);
        }
    }
    validateValue(value) {
        if (this.min !== null && value < this.min) {
            return this.min;
        }
        if (this.max !== null && value > this.max) {
            return this.max;
        }
        return value;
    }
    deleteRange(value, start, end) {
        let newValueStr;
        if ((end - start) === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);
        return newValueStr;
    }
    isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }
        return false;
    }
    isMinusSign(char) {
        if (this._minusSign.test(char)) {
            this._minusSign.lastIndex = 0;
            return true;
        }
        return false;
    }
    parseValue(text) {
        let filteredText = text.trim()
            .replace(/\s/g, '')
            .replace(this._currency, '')
            .replace(this._group, '')
            .replace(this._suffix, '')
            .replace(this._prefix, '')
            .replace(this._minusSign, '-')
            .replace(this._decimal, '.')
            .replace(this._numeral, this._index);
        if (filteredText) {
            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }
        return null;
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    getOptions() {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        };
    }
    getDecimalExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(1.1).trim().replace(this._numeral, '')}]`, 'g');
    }
    getGroupingExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
        return new RegExp(`[${formatter.format(1000).trim().replace(this._numeral, '')}]`, 'g');
    }
    getMinusSignExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }
    getCurrencyExpression() {
        if (this.currency) {
            const formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay });
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._decimal, '').replace(this._group, '')}]`, 'g');
        }
        return new RegExp(`[]`, 'g');
    }
    filled() {
        return (this.value != null && this.value.toString().length > 0);
    }
    resetRegex() {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
    }
};
InputNumber.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <span [ngClass]="{'ui-inputnumber ui-widget': true, 'ui-inputwrapper-filled': this.filled(), 'ui-inputwrapper-focus': this.focused,
                'ui-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked', 'ui-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal',
                'ui-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}">
            <input #input class="ui-inputnumber-input" pInputText [value]="formattedValue()" [attr.placeholder]="placeholder" [attr.title]="title" [attr.id]="inputId"
                [attr.size]="size" [attr.name]="name" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel"
                [attr.aria-required]="ariaRequired" [disabled]="disabled" [attr.required]="required" [attr.aria-valumin]="min" [attr.aria-valuemax]="max"
                (input)="onInput($event)" (keydown)="onInputKeyDown($event)" (keypress)="onInputKeyPress($event)" (paste)="onPaste($event)" (click)="onInputClick()"
                (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
            <span class="ui-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'">
                <button type="button" pButton [ngClass]="{'ui-inputnumber-button ui-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
                <button type="button" pButton [ngClass]="{'ui-inputnumber-button ui-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
            </span>
            <button type="button" pButton [ngClass]="{'ui-inputnumber-button ui-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
            <button type="button" pButton [ngClass]="{'ui-inputnumber-button ui-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
        </span>
    `,
        changeDetection: ChangeDetectionStrategy.Default,
        providers: [INPUTNUMBER_VALUE_ACCESSOR]
    })
], InputNumber);
export { InputNumber };
let InputNumberModule = class InputNumberModule {
};
InputNumberModule = __decorate([
    NgModule({
        imports: [CommonModule, InputTextModule, ButtonModule],
        exports: [InputNumber],
        declarations: [InputNumber]
    })
], InputNumberModule);
export { InputNumberModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRudW1iZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2lucHV0bnVtYmVyLyIsInNvdXJjZXMiOlsiaW5wdXRudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pKLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBUTtJQUMzQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQTJCRixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBeUdwQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXhHeEIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQWNqQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQXdDNUIsd0JBQW1CLEdBQVcsa0JBQWtCLENBQUM7UUFFakQsd0JBQW1CLEdBQVcsb0JBQW9CLENBQUM7UUFFbkQsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6QixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBSWhCLFlBQU8sR0FBc0IsSUFBSSxZ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WSxXQUFXO0FBZ25CeEIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBSSxDQUFBO0FBQXJCLGlCQUFpQjtJQUw3QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztRQUNyRCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQzlCLENBQUM7R0FDVyxpQkFBaUIsQ0FBSTtTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBmb3J3YXJkUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IElOUFVUTlVNQkVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXROdW1iZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucHV0TnVtYmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3VpLWlucHV0bnVtYmVyIHVpLXdpZGdldCc6IHRydWUsICd1aS1pbnB1dHdyYXBwZXItZmlsbGVkJzogdGhpcy5maWxsZWQoKSwgJ3VpLWlucHV0d3JhcHBlci1mb2N1cyc6IHRoaXMuZm9jdXNlZCxcbiAgICAgICAgICAgICAgICAndWktaW5wdXRudW1iZXItYnV0dG9ucy1zdGFja2VkJzogdGhpcy5zaG93QnV0dG9ucyAmJiB0aGlzLmJ1dHRvbkxheW91dCA9PT0gJ3N0YWNrZWQnLCAndWktaW5wdXRudW1iZXItYnV0dG9ucy1ob3Jpem9udGFsJzogdGhpcy5zaG93QnV0dG9ucyAmJiB0aGlzLmJ1dHRvbkxheW91dCA9PT0gJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgICAgICd1aS1pbnB1dG51bWJlci1idXR0b25zLXZlcnRpY2FsJzogdGhpcy5zaG93QnV0dG9ucyAmJiB0aGlzLmJ1dHRvbkxheW91dCA9PT0gJ3ZlcnRpY2FsJ31cIj5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgY2xhc3M9XCJ1aS1pbnB1dG51bWJlci1pbnB1dFwiIHBJbnB1dFRleHQgW3ZhbHVlXT1cImZvcm1hdHRlZFZhbHVlKClcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFthdHRyLnRpdGxlXT1cInRpdGxlXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXJlcXVpcmVkXT1cImFyaWFSZXF1aXJlZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW2F0dHIuYXJpYS12YWx1bWluXT1cIm1pblwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCJcbiAgICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25JbnB1dEtleURvd24oJGV2ZW50KVwiIChrZXlwcmVzcyk9XCJvbklucHV0S2V5UHJlc3MoJGV2ZW50KVwiIChwYXN0ZSk9XCJvblBhc3RlKCRldmVudClcIiAoY2xpY2spPVwib25JbnB1dENsaWNrKClcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktaW5wdXRudW1iZXItYnV0dG9uLWdyb3VwXCIgKm5nSWY9XCJzaG93QnV0dG9ucyAmJiBidXR0b25MYXlvdXQgPT09ICdzdGFja2VkJ1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW25nQ2xhc3NdPVwieyd1aS1pbnB1dG51bWJlci1idXR0b24gdWktaW5wdXRudW1iZXItYnV0dG9uLXVwJzogdHJ1ZX1cIiBbY2xhc3NdPVwiaW5jcmVtZW50QnV0dG9uQ2xhc3NcIiBbaWNvbl09XCJpbmNyZW1lbnRCdXR0b25JY29uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0aGlzLm9uVXBCdXR0b25Nb3VzZURvd24oJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uVXBCdXR0b25Nb3VzZVVwKClcIiAobW91c2VsZWF2ZSk9XCJvblVwQnV0dG9uTW91c2VMZWF2ZSgpXCIgKGtleWRvd24pPVwib25VcEJ1dHRvbktleURvd24oJGV2ZW50KVwiIChrZXl1cCk9XCJvblVwQnV0dG9uS2V5VXAoKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW25nQ2xhc3NdPVwieyd1aS1pbnB1dG51bWJlci1idXR0b24gdWktaW5wdXRudW1iZXItYnV0dG9uLWRvd24nOiB0cnVlfVwiIFtjbGFzc109XCJkZWNyZW1lbnRCdXR0b25DbGFzc1wiIFtpY29uXT1cImRlY3JlbWVudEJ1dHRvbkljb25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cInRoaXMub25Eb3duQnV0dG9uTW91c2VEb3duKCRldmVudClcIiAobW91c2V1cCk9XCJvbkRvd25CdXR0b25Nb3VzZVVwKClcIiAobW91c2VsZWF2ZSk9XCJvbkRvd25CdXR0b25Nb3VzZUxlYXZlKClcIiAoa2V5ZG93bik9XCJvbkRvd25CdXR0b25LZXlEb3duKCRldmVudClcIiAoa2V5dXApPVwib25Eb3duQnV0dG9uS2V5VXAoKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBbbmdDbGFzc109XCJ7J3VpLWlucHV0bnVtYmVyLWJ1dHRvbiB1aS1pbnB1dG51bWJlci1idXR0b24tdXAnOiB0cnVlfVwiIFtjbGFzc109XCJpbmNyZW1lbnRCdXR0b25DbGFzc1wiIFtpY29uXT1cImluY3JlbWVudEJ1dHRvbkljb25cIiAqbmdJZj1cInNob3dCdXR0b25zICYmIGJ1dHRvbkxheW91dCAhPT0gJ3N0YWNrZWQnXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cInRoaXMub25VcEJ1dHRvbk1vdXNlRG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25VcEJ1dHRvbk1vdXNlVXAoKVwiIChtb3VzZWxlYXZlKT1cIm9uVXBCdXR0b25Nb3VzZUxlYXZlKClcIiAoa2V5ZG93bik9XCJvblVwQnV0dG9uS2V5RG93bigkZXZlbnQpXCIgKGtleXVwKT1cIm9uVXBCdXR0b25LZXlVcCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtuZ0NsYXNzXT1cInsndWktaW5wdXRudW1iZXItYnV0dG9uIHVpLWlucHV0bnVtYmVyLWJ1dHRvbi1kb3duJzogdHJ1ZX1cIiBbY2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uQ2xhc3NcIiBbaWNvbl09XCJkZWNyZW1lbnRCdXR0b25JY29uXCIgKm5nSWY9XCJzaG93QnV0dG9ucyAmJiBidXR0b25MYXlvdXQgIT09ICdzdGFja2VkJ1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0aGlzLm9uRG93bkJ1dHRvbk1vdXNlRG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2VVcCgpXCIgKG1vdXNlbGVhdmUpPVwib25Eb3duQnV0dG9uTW91c2VMZWF2ZSgpXCIgKGtleWRvd24pPVwib25Eb3duQnV0dG9uS2V5RG93bigkZXZlbnQpXCIgKGtleXVwKT1cIm9uRG93bkJ1dHRvbktleVVwKClcIj48L2J1dHRvbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIHByb3ZpZGVyczogW0lOUFVUTlVNQkVSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dE51bWJlciBpbXBsZW1lbnRzIE9uSW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgc2hvd0J1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGZvcm1hdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBidXR0b25MYXlvdXQ6IHN0cmluZyA9IFwic3RhY2tlZFwiO1xuXG4gICAgQElucHV0KCkgcHJlZml4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbG9jYWxlTWF0Y2hlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY3VycmVuY3k6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGN1cnJlbmN5RGlzcGxheTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXNlR3JvdXBpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4bGVuZ3RoOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYVJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBhdXRvY29tcGxldGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4RnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGluY3JlbWVudEJ1dHRvbkNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkZWNyZW1lbnRCdXR0b25DbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5jcmVtZW50QnV0dG9uSWNvbjogc3RyaW5nID0gJ3BpIHBpLWNoZXZyb24tdXAnO1xuXG4gICAgQElucHV0KCkgZGVjcmVtZW50QnV0dG9uSWNvbjogc3RyaW5nID0gJ3BpIHBpLWNoZXZyb24tZG93bic7XG5cbiAgICBASW5wdXQoKSBtb2RlOiBzdHJpbmcgPSBcImRlY2ltYWxcIjtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICB2YWx1ZTogbnVtYmVyO1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIGlzU3BlY2lhbENoYXI6IGJvb2xlYW47XG5cbiAgICB0aW1lcjogYW55O1xuXG4gICAgbGFzdFZhbHVlOiBzdHJpbmc7XG5cbiAgICBfbnVtZXJhbDogYW55O1xuXG4gICAgbnVtYmVyRm9ybWF0OiBhbnk7XG5cbiAgICBfZGVjaW1hbDogYW55O1xuXG4gICAgX2dyb3VwOiBhbnk7XG5cbiAgICBfbWludXNTaWduOiBhbnk7XG5cbiAgICBfY3VycmVuY3k6IGFueTtcblxuICAgIF9wcmVmaXg6IGFueTtcblxuICAgIF9zdWZmaXg6IGFueTtcblxuICAgIF9pbmRleDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubnVtYmVyRm9ybWF0ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB0aGlzLmdldE9wdGlvbnMoKSk7XG4gICAgICAgIGNvbnN0IG51bWVyYWxzID0gWy4uLm5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwge3VzZUdyb3VwaW5nOiBmYWxzZX0pLmZvcm1hdCg5ODc2NTQzMjEwKV0ucmV2ZXJzZSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG5ldyBNYXAobnVtZXJhbHMubWFwKChkLCBpKSA9PiBbZCwgaV0pKTtcbiAgICAgICAgdGhpcy5fbnVtZXJhbCA9IG5ldyBSZWdFeHAoYFske251bWVyYWxzLmpvaW4oJycpfV1gLCAnZycpO1xuICAgICAgICB0aGlzLl9kZWNpbWFsID0gdGhpcy5nZXREZWNpbWFsRXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9ncm91cCA9IHRoaXMuZ2V0R3JvdXBpbmdFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX21pbnVzU2lnbiA9IHRoaXMuZ2V0TWludXNTaWduRXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9jdXJyZW5jeSA9IHRoaXMuZ2V0Q3VycmVuY3lFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX3N1ZmZpeCA9IG5ldyBSZWdFeHAoYFske3RoaXMuc3VmZml4fHwnJ31dYCwgJ2cnKTtcbiAgICAgICAgdGhpcy5fcHJlZml4ID0gbmV3IFJlZ0V4cChgWyR7dGhpcy5wcmVmaXh8fCcnfV1gLCAnZycpO1xuICAgICAgICB0aGlzLl9pbmRleCA9IGQgPT4gaW5kZXguZ2V0KGQpO1xuICAgIH1cblxuICAgIGZvcm1hdFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB0aGlzLmdldE9wdGlvbnMoKSk7XG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5wcmVmaXggKyBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWZmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZSArIHRoaXMuc3VmZml4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZvcm1hdHRlZFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbklucHV0KGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3BlY2lhbENoYXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IHRoaXMubGFzdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTcGVjaWFsQ2hhciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uSW5wdXRLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmlzU3BlY2lhbENoYXIgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gZXZlbnQudGFyZ2V0LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vdXBcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAxKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vbGVmdFxuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmFsQ2hhcihpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25TdGFydCAtIDEpKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3JpZ2h0XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyYWxDaGFyKGlucHV0VmFsdWUuY2hhckF0KHNlbGVjdGlvblN0YXJ0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9iYWNrc3BhY2VcbiAgICAgICAgICAgIGNhc2UgODoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlU3RyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCA9PT0gc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWxldGVDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2ltYWxDaGFySW5kZXggPSBpbnB1dFZhbHVlLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJhbENoYXIoZGVsZXRlQ2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ncm91cC50ZXN0KGRlbGV0ZUNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JvdXAubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQgLSAyKSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2RlY2ltYWwudGVzdChkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQgLSAxLCBzZWxlY3Rpb25TdGFydCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjaW1hbENoYXJJbmRleCA+IDAgJiYgc2VsZWN0aW9uU3RhcnQgPiBkZWNpbWFsQ2hhckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0IC0gMSkgKyAnMCcgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCAtIDEpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWVTdHIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsICdkZWxldGUtc2luZ2xlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5kZWxldGVSYW5nZShpbnB1dFZhbHVlLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsICdkZWxldGUtcmFuZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEtleVByZXNzKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBjb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcbiAgICAgICAgbGV0IGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuXG4gICAgICAgIGlmICgoNDggPD0gY29kZSAmJiBjb2RlIDw9IDU3KSB8fCB0aGlzLmlzTWludXNTaWduKGNoYXIpKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydChldmVudCwgY2hhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhc3RlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBkYXRhID0gKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93WydjbGlwYm9hcmREYXRhJ10pLmdldERhdGEoJ1RleHQnKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLnBhcnNlVmFsdWUoZGF0YSk7XG4gICAgICAgICAgICBpZiAoZmlsdGVyZWREYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydChldmVudCwgZmlsdGVyZWREYXRhLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dENsaWNrKCkge1xuICAgICAgICB0aGlzLmluaXRDdXJzb3IoKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMudmFsaWRhdGVWYWx1ZSh0aGlzLnBhcnNlVmFsdWUodGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlKSk7XG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JywgbmV3VmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCBuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVXBCdXR0b25Nb3VzZVVwKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICBvblVwQnV0dG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwQnV0dG9uS2V5VXAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIC0xKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25Nb3VzZVVwKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25Nb3VzZUxlYXZlKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25LZXlVcCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAtMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGluKGV2ZW50LCBkaXIpIHtcbiAgICAgICAgbGV0IHN0ZXAgPSB0aGlzLnN0ZXAgKiBkaXI7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlKSB8fCAwO1xuICAgICAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLnZhbGlkYXRlVmFsdWUoY3VycmVudFZhbHVlICsgc3RlcCk7XG4gICAgICAgIGlmICh0aGlzLm1heGxlbmd0aCAmJiB0aGlzLm1heGxlbmd0aCA8IHRoaXMuZm9ybWF0VmFsdWUobmV3VmFsdWUpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0KG5ld1ZhbHVlLCAnc3BpbicpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50LCBpbnRlcnZhbCwgZGlyKSB7XG4gICAgICAgIGxldCBpID0gaW50ZXJ2YWwgfHwgNTAwO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgNDAsIGRpcik7XG4gICAgICAgIH0sIGkpO1xuXG4gICAgICAgIHRoaXMuc3BpbihldmVudCwgZGlyKTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydChldmVudCwgdGV4dCkge1xuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGxldCBzZWxlY3Rpb25FbmQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgIGxldCBtYXhGcmFjdGlvbkRpZ2l0cyA9IHRoaXMubnVtYmVyRm9ybWF0LnJlc29sdmVkT3B0aW9ucygpLm1heGltdW1GcmFjdGlvbkRpZ2l0cztcbiAgICAgICAgbGV0IG5ld1ZhbHVlU3RyO1xuICAgICAgICBsZXQgZGVjaW1hbENoYXJJbmRleCA9IGlucHV0VmFsdWUuc2VhcmNoKHRoaXMuX2RlY2ltYWwpO1xuICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKGRlY2ltYWxDaGFySW5kZXggPiAwICYmIHNlbGVjdGlvblN0YXJ0ID4gZGVjaW1hbENoYXJJbmRleCkge1xuICAgICAgICAgICAgaWYgKChzZWxlY3Rpb25TdGFydCArIHRleHQubGVuZ3RoIC0gKGRlY2ltYWxDaGFySW5kZXggKyAxKSkgPD0gbWF4RnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQpICsgdGV4dCArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyB0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsICdpbnNlcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5pbnNlcnRUZXh0KGlucHV0VmFsdWUsIHRleHQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsICdpbnNlcnQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydFRleHQodmFsdWUsIHRleHQsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlU3RyO1xuXG4gICAgICAgIGlmICgoZW5kIC0gc3RhcnQpID09PSB2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRleHQ7XG4gICAgICAgIGVsc2UgaWYgKHN0YXJ0ID09PSAwKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB0ZXh0ICsgdmFsdWUuc2xpY2UoZW5kKTtcbiAgICAgICAgZWxzZSBpZiAoZW5kID09PSB2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0KSArIHRleHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdGV4dCArIHZhbHVlLnNsaWNlKGVuZCk7XG5cbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlU3RyO1xuICAgIH1cblxuICAgIGluaXRDdXJzb3IoKSB7XG4gICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZUxlbmd0aCA9IGlucHV0VmFsdWUubGVuZ3RoO1xuICAgICAgICBsZXQgaW5kZXggPSBudWxsO1xuXG4gICAgICAgIGxldCBjaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGNoYXIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2xlZnRcbiAgICAgICAgbGV0IGkgPSBzZWxlY3Rpb25TdGFydCAtIDE7XG4gICAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgICAgIGNoYXIgPSBpbnB1dFZhbHVlLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJhbENoYXIoY2hhcikpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShpbmRleCArIDEsIGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpID0gc2VsZWN0aW9uU3RhcnQgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB2YWx1ZUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNoYXIgPSBpbnB1dFZhbHVlLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoaW5kZXgsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUlucHV0KHZhbHVlLCBvcGVyYXRpb24pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIGlmIChjdXJyZW50TGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEN1cnNvcigpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCArIDEsIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25FbmQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhsZW5ndGggJiYgdGhpcy5tYXhsZW5ndGggPCBmb3JtYXR0ZWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgbGV0IG5ld0xlbmd0aCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChuZXdMZW5ndGggPT09IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnaW5zZXJ0JylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCArIDEsIHNlbGVjdGlvbkVuZCArIDEpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2RlbGV0ZS1zaW5nbGUnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kIC0gMSwgc2VsZWN0aW9uRW5kIC0gMSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uID09PSAnZGVsZXRlLXJhbmdlJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uID09PSAnc3BpbicpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZCArIChuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHZhbHVlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVNb2RlbChldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodmFsdWUpO1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKGV2ZW50LCB2YWx1ZVN0ciwgb3BlcmF0aW9uKSB7XG4gICAgICAgIGlmICh2YWx1ZVN0ciAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWVTdHIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dChuZXdWYWx1ZSwgb3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlVmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMubWluICE9PSBudWxsICYmIHZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1pbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heCAhPT0gbnVsbCAmJiB2YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZGVsZXRlUmFuZ2UodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlU3RyO1xuXG4gICAgICAgIGlmICgoZW5kIC0gc3RhcnQpID09PSB2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9ICcnO1xuICAgICAgICBlbHNlIGlmIChzdGFydCA9PT0gMClcbiAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoZW5kKTtcbiAgICAgICAgZWxzZSBpZiAoZW5kID09PSB2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB2YWx1ZS5zbGljZSgwLCBzdGFydCkgKyB2YWx1ZS5zbGljZShlbmQpO1xuXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZVN0cjtcbiAgICB9XG5cbiAgICBpc051bWVyYWxDaGFyKGNoYXIpIHtcbiAgICAgICAgaWYgKGNoYXIubGVuZ3RoID09PSAxICYmICh0aGlzLl9udW1lcmFsLnRlc3QoY2hhcikgfHwgdGhpcy5fZGVjaW1hbC50ZXN0KGNoYXIpIHx8IHRoaXMuX2dyb3VwLnRlc3QoY2hhcikgfHwgdGhpcy5fbWludXNTaWduLnRlc3QoY2hhcikpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UmVnZXgoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzTWludXNTaWduKGNoYXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX21pbnVzU2lnbi50ZXN0KGNoYXIpKSB7XG4gICAgICAgICAgICB0aGlzLl9taW51c1NpZ24ubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHBhcnNlVmFsdWUodGV4dCkge1xuICAgICAgICBsZXQgZmlsdGVyZWRUZXh0ID0gdGV4dC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX2N1cnJlbmN5LCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9ncm91cCwgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fc3VmZml4LCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9wcmVmaXgsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX21pbnVzU2lnbiwgJy0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX2RlY2ltYWwsICcuJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9udW1lcmFsLCB0aGlzLl9pbmRleCk7XG5cbiAgICAgICAgaWYgKGZpbHRlcmVkVGV4dCkge1xuICAgICAgICAgICAgbGV0IHBhcnNlZFZhbHVlID0gK2ZpbHRlcmVkVGV4dDtcbiAgICAgICAgICAgIHJldHVybiBpc05hTihwYXJzZWRWYWx1ZSkgPyBudWxsIDogcGFyc2VkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvY2FsZU1hdGNoZXI6IHRoaXMubG9jYWxlTWF0Y2hlcixcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLm1vZGUsXG4gICAgICAgICAgICBjdXJyZW5jeTogdGhpcy5jdXJyZW5jeSxcbiAgICAgICAgICAgIGN1cnJlbmN5RGlzcGxheTogdGhpcy5jdXJyZW5jeURpc3BsYXksXG4gICAgICAgICAgICB1c2VHcm91cGluZzogdGhpcy51c2VHcm91cGluZyxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogdGhpcy5taW5GcmFjdGlvbkRpZ2l0cyxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogdGhpcy5tYXhGcmFjdGlvbkRpZ2l0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldERlY2ltYWxFeHByZXNzaW9uKCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHt1c2VHcm91cGluZzogZmFsc2V9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYFske2Zvcm1hdHRlci5mb3JtYXQoMS4xKS50cmltKCkucmVwbGFjZSh0aGlzLl9udW1lcmFsLCAnJyl9XWAsICdnJyk7XG4gICAgfVxuXG4gICAgZ2V0R3JvdXBpbmdFeHByZXNzaW9uKCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHt1c2VHcm91cGluZzogdHJ1ZX0pO1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgWyR7Zm9ybWF0dGVyLmZvcm1hdCgxMDAwKS50cmltKCkucmVwbGFjZSh0aGlzLl9udW1lcmFsLCAnJyl9XWAsICdnJyk7XG4gICAgfVxuXG4gICAgZ2V0TWludXNTaWduRXhwcmVzc2lvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7dXNlR3JvdXBpbmc6IGZhbHNlfSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGBbJHtmb3JtYXR0ZXIuZm9ybWF0KC0xKS50cmltKCkucmVwbGFjZSh0aGlzLl9udW1lcmFsLCAnJyl9XWAsICdnJyk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVuY3lFeHByZXNzaW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW5jeSkge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7c3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5LCBjdXJyZW5jeURpc3BsYXk6IHRoaXMuY3VycmVuY3lEaXNwbGF5fSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgWyR7Zm9ybWF0dGVyLmZvcm1hdCgxKS5yZXBsYWNlKC9cXHMvZywgJycpLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgJycpLnJlcGxhY2UodGhpcy5fZGVjaW1hbCwgJycpLnJlcGxhY2UodGhpcy5fZ3JvdXAsICcnKX1dYCwgJ2cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGBbXWAsJ2cnKTtcbiAgICB9XG5cbiAgICBmaWxsZWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52YWx1ZSAhPSBudWxsICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwKVxuICAgIH1cblxuICAgIHJlc2V0UmVnZXgoKSB7XG4gICAgICAgIHRoaXMuX251bWVyYWwubGFzdEluZGV4ID0gIDA7XG4gICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gIDA7XG4gICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9ICAwO1xuICAgICAgICB0aGlzLl9taW51c1NpZ24ubGFzdEluZGV4ID0gIDA7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsSW5wdXRUZXh0TW9kdWxlLCBCdXR0b25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dE51bWJlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXROdW1iZXJdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0TnVtYmVyTW9kdWxlIHsgfVxuIl19