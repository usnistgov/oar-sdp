import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

const _c0 = ["inputtext"];
function Chips_li_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Chips_li_2_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 11);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r6.field ? ctx_r6.resolveFieldData(item_r2, ctx_r6.field) : item_r2);
} }
function Chips_li_2_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "span", 12);
    ɵngcc0.ɵɵlistener("click", function Chips_li_2_span_4_Template_span_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r10); const i_r3 = ɵngcc0.ɵɵnextContext().index; const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.removeItem($event, i_r3); });
    ɵngcc0.ɵɵelementEnd();
} }
const _c1 = function (a0) { return { $implicit: a0 }; };
function Chips_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 6, 7);
    ɵngcc0.ɵɵlistener("click", function Chips_li_2_Template_li_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const item_r2 = ctx.$implicit; const ctx_r12 = ɵngcc0.ɵɵnextContext(); return ctx_r12.onItemClick($event, item_r2); });
    ɵngcc0.ɵɵtemplate(2, Chips_li_2_ng_container_2_Template, 1, 0, "ng-container", 8);
    ɵngcc0.ɵɵtemplate(3, Chips_li_2_span_3_Template, 2, 1, "span", 9);
    ɵngcc0.ɵɵtemplate(4, Chips_li_2_span_4_Template, 1, 0, "span", 10);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(4, _c1, item_r2));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.itemTemplate);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.disabled);
} }
const _c2 = function (a1, a2) { return { "p-inputtext p-chips-multiple-container": true, "p-focus": a1, "p-disabled": a2 }; };
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Chips),
    multi: true
};
class Chips {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.allowDuplicate = true;
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onChipClick = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onClick() {
        this.inputViewChild.nativeElement.focus();
    }
    onInput() {
        this.updateFilledState();
    }
    onPaste(event) {
        if (this.separator) {
            let pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
            pastedData.split(this.separator).forEach(val => {
                this.addItem(event, val, true);
            });
            this.inputViewChild.nativeElement.value = '';
        }
        this.updateFilledState();
    }
    updateFilledState() {
        if (!this.value || this.value.length === 0) {
            this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '');
        }
        else {
            this.filled = true;
        }
    }
    onItemClick(event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }
    writeValue(value) {
        this.value = value;
        this.updateMaxedOut();
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
    resolveFieldData(data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    removeItem(event, index) {
        if (this.disabled) {
            return;
        }
        let removedItem = this.value[index];
        this.value = this.value.filter((val, i) => i != index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    }
    addItem(event, item, preventDefault) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
        if (preventDefault) {
            event.preventDefault();
        }
    }
    onKeydown(event) {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = [...this.value];
                    let removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                    this.updateFilledState();
                }
                break;
            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value, true);
                break;
            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value, true);
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                else if (this.separator) {
                    if (this.separator === ',' && event.which === 188) {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                }
                break;
        }
    }
    updateMaxedOut() {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    }
}
Chips.ɵfac = function Chips_Factory(t) { return new (t || Chips)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Chips.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Chips, selectors: [["p-chips"]], contentQueries: function Chips_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function Chips_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.inputViewChild = _t.first);
    } }, hostVars: 4, hostBindings: function Chips_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("p-inputwrapper-filled", ctx.filled)("p-inputwrapper-focus", ctx.focus);
    } }, inputs: { allowDuplicate: "allowDuplicate", disabled: "disabled", style: "style", styleClass: "styleClass", field: "field", placeholder: "placeholder", max: "max", ariaLabelledBy: "ariaLabelledBy", tabindex: "tabindex", inputId: "inputId", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", addOnTab: "addOnTab", addOnBlur: "addOnBlur", separator: "separator" }, outputs: { onAdd: "onAdd", onRemove: "onRemove", onFocus: "onFocus", onBlur: "onBlur", onChipClick: "onChipClick" }, features: [ɵngcc0.ɵɵProvidersFeature([CHIPS_VALUE_ACCESSOR])], decls: 6, vars: 17, consts: [[3, "ngClass", "ngStyle", "click"], [3, "ngClass"], ["class", "p-chips-token", 3, "click", 4, "ngFor", "ngForOf"], [1, "p-chips-input-token"], ["type", "text", 3, "disabled", "ngStyle", "keydown", "input", "paste", "focus", "blur"], ["inputtext", ""], [1, "p-chips-token", 3, "click"], ["token", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "p-chips-token-label", 4, "ngIf"], ["class", "p-chips-token-icon pi pi-times-circle", 3, "click", 4, "ngIf"], [1, "p-chips-token-label"], [1, "p-chips-token-icon", "pi", "pi-times-circle", 3, "click"]], template: function Chips_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("click", function Chips_Template_div_click_0_listener() { return ctx.onClick(); });
        ɵngcc0.ɵɵelementStart(1, "ul", 1);
        ɵngcc0.ɵɵtemplate(2, Chips_li_2_Template, 5, 6, "li", 2);
        ɵngcc0.ɵɵelementStart(3, "li", 3);
        ɵngcc0.ɵɵelementStart(4, "input", 4, 5);
        ɵngcc0.ɵɵlistener("keydown", function Chips_Template_input_keydown_4_listener($event) { return ctx.onKeydown($event); })("input", function Chips_Template_input_input_4_listener() { return ctx.onInput(); })("paste", function Chips_Template_input_paste_4_listener($event) { return ctx.onPaste($event); })("focus", function Chips_Template_input_focus_4_listener($event) { return ctx.onInputFocus($event); })("blur", function Chips_Template_input_blur_4_listener($event) { return ctx.onInputBlur($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-chips p-component")("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(14, _c2, ctx.focus, ctx.disabled));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.value);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵclassMap(ctx.inputStyleClass);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled)("ngStyle", ctx.inputStyle);
        ɵngcc0.ɵɵattribute("id", ctx.inputId)("placeholder", ctx.value && ctx.value.length ? null : ctx.placeholder)("tabindex", ctx.tabindex)("aria-labelledby", ctx.ariaLabelledBy);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgForOf, ɵngcc1.NgTemplateOutlet, ɵngcc1.NgIf], styles: [".p-chips{display:-ms-inline-flexbox;display:inline-flex}.p-chips-multiple-container{-ms-flex-align:center;align-items:center;cursor:text;display:-ms-flexbox;display:flex;list-style-type:none;margin:0;overflow:hidden;padding:0}.p-chips-token{-ms-flex:0 0 auto;-ms-flex-align:center;align-items:center;cursor:default;flex:0 0 auto}.p-chips-input-token,.p-chips-token{display:-ms-inline-flexbox;display:inline-flex}.p-chips-input-token{-ms-flex:1 1 auto;flex:1 1 auto}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{background-color:rgba(0,0,0,0);border:0;border-radius:0;box-shadow:none;margin:0;outline:0 none;padding:0;width:100%}.p-fluid .p-chips{display:-ms-flexbox;display:flex}"], encapsulation: 2, changeDetection: 0 });
Chips.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
Chips.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    disabled: [{ type: Input }],
    field: [{ type: Input }],
    placeholder: [{ type: Input }],
    max: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    tabindex: [{ type: Input }],
    inputId: [{ type: Input }],
    allowDuplicate: [{ type: Input }],
    inputStyle: [{ type: Input }],
    inputStyleClass: [{ type: Input }],
    addOnTab: [{ type: Input }],
    addOnBlur: [{ type: Input }],
    separator: [{ type: Input }],
    onAdd: [{ type: Output }],
    onRemove: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    onChipClick: [{ type: Output }],
    inputViewChild: [{ type: ViewChild, args: ['inputtext',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Chips, [{
        type: Component,
        args: [{
                selector: 'p-chips',
                template: `
        <div [ngClass]="'p-chips p-component'" [ngStyle]="style" [class]="styleClass" (click)="onClick()">
            <ul [ngClass]="{'p-inputtext p-chips-multiple-container':true,'p-focus':focus,'p-disabled':disabled}">
                <li #token *ngFor="let item of value; let i = index;" class="p-chips-token" (click)="onItemClick($event, item)">
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <span *ngIf="!disabled" class="p-chips-token-icon pi pi-times-circle" (click)="removeItem($event,i)"></span>
                </li>
                <li class="p-chips-input-token">
                    <input #inputtext type="text" [attr.id]="inputId" [attr.placeholder]="(value && value.length ? null : placeholder)" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)"
                    (input)="onInput()" (paste)="onPaste($event)" [attr.aria-labelledby]="ariaLabelledBy" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul>
        </div>
    `,
                host: {
                    '[class.p-inputwrapper-filled]': 'filled',
                    '[class.p-inputwrapper-focus]': 'focus'
                },
                providers: [CHIPS_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-chips{display:-ms-inline-flexbox;display:inline-flex}.p-chips-multiple-container{-ms-flex-align:center;align-items:center;cursor:text;display:-ms-flexbox;display:flex;list-style-type:none;margin:0;overflow:hidden;padding:0}.p-chips-token{-ms-flex:0 0 auto;-ms-flex-align:center;align-items:center;cursor:default;flex:0 0 auto}.p-chips-input-token,.p-chips-token{display:-ms-inline-flexbox;display:inline-flex}.p-chips-input-token{-ms-flex:1 1 auto;flex:1 1 auto}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{background-color:rgba(0,0,0,0);border:0;border-radius:0;box-shadow:none;margin:0;outline:0 none;padding:0;width:100%}.p-fluid .p-chips{display:-ms-flexbox;display:flex}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, { allowDuplicate: [{
            type: Input
        }], onAdd: [{
            type: Output
        }], onRemove: [{
            type: Output
        }], onFocus: [{
            type: Output
        }], onBlur: [{
            type: Output
        }], onChipClick: [{
            type: Output
        }], disabled: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], field: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], max: [{
            type: Input
        }], ariaLabelledBy: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], inputId: [{
            type: Input
        }], inputStyle: [{
            type: Input
        }], inputStyleClass: [{
            type: Input
        }], addOnTab: [{
            type: Input
        }], addOnBlur: [{
            type: Input
        }], separator: [{
            type: Input
        }], inputViewChild: [{
            type: ViewChild,
            args: ['inputtext']
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class ChipsModule {
}
ChipsModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ChipsModule });
ChipsModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ChipsModule_Factory(t) { return new (t || ChipsModule)(); }, imports: [[CommonModule, InputTextModule, SharedModule], InputTextModule, SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ChipsModule, { declarations: function () { return [Chips]; }, imports: function () { return [CommonModule, InputTextModule, SharedModule]; }, exports: function () { return [Chips, InputTextModule, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ChipsModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, InputTextModule, SharedModule],
                exports: [Chips, InputTextModule, SharedModule],
                declarations: [Chips]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { CHIPS_VALUE_ACCESSOR, Chips, ChipsModule };

//# sourceMappingURL=primeng-chips.js.map