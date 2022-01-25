import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

const _c0 = function (a1, a2, a3) { return { "p-inputswitch p-component": true, "p-inputswitch-checked": a1, "p-disabled": a2, "p-focus": a3 }; };
const INPUTSWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSwitch),
    multi: true
};
class InputSwitch {
    constructor(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focused = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    onClick(event, cb) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            this.toggle(event);
            cb.focus();
        }
    }
    onInputChange(event) {
        if (!this.readonly) {
            const inputChecked = event.target.checked;
            this.updateModel(event, inputChecked);
        }
    }
    toggle(event) {
        this.updateModel(event, !this.checked);
    }
    updateModel(event, value) {
        this.checked = value;
        this.onModelChange(this.checked);
        this.onChange.emit({
            originalEvent: event,
            checked: this.checked
        });
    }
    onFocus(event) {
        this.focused = true;
    }
    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    writeValue(checked) {
        this.checked = checked;
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
}
InputSwitch.ɵfac = function InputSwitch_Factory(t) { return new (t || InputSwitch)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
InputSwitch.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: InputSwitch, selectors: [["p-inputSwitch"]], inputs: { disabled: "disabled", style: "style", styleClass: "styleClass", tabindex: "tabindex", inputId: "inputId", name: "name", readonly: "readonly", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onChange: "onChange" }, features: [ɵngcc0.ɵɵProvidersFeature([INPUTSWITCH_VALUE_ACCESSOR])], decls: 5, vars: 15, consts: [[3, "ngClass", "ngStyle", "click"], [1, "p-hidden-accessible"], ["type", "checkbox", "role", "switch", 3, "checked", "disabled", "change", "focus", "blur"], ["cb", ""], [1, "p-inputswitch-slider"]], template: function InputSwitch_Template(rf, ctx) { if (rf & 1) {
        const _r1 = ɵngcc0.ɵɵgetCurrentView();
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("click", function InputSwitch_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r1); const _r0 = ɵngcc0.ɵɵreference(3); return ctx.onClick($event, _r0); });
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "input", 2, 3);
        ɵngcc0.ɵɵlistener("change", function InputSwitch_Template_input_change_2_listener($event) { return ctx.onInputChange($event); })("focus", function InputSwitch_Template_input_focus_2_listener($event) { return ctx.onFocus($event); })("blur", function InputSwitch_Template_input_blur_2_listener($event) { return ctx.onBlur($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(4, "span", 4);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction3(11, _c0, ctx.checked, ctx.disabled, ctx.focused))("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("checked", ctx.checked)("disabled", ctx.disabled);
        ɵngcc0.ɵɵattribute("id", ctx.inputId)("name", ctx.name)("tabindex", ctx.tabindex)("aria-checked", ctx.checked)("aria-labelledby", ctx.ariaLabelledBy);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle], styles: [".p-inputswitch{display:inline-block;position:relative}.p-inputswitch-slider{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.p-inputswitch-slider:before{content:\"\";position:absolute;top:50%}"], encapsulation: 2, changeDetection: 0 });
InputSwitch.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
InputSwitch.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    tabindex: [{ type: Input }],
    inputId: [{ type: Input }],
    name: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    onChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InputSwitch, [{
        type: Component,
        args: [{
                selector: 'p-inputSwitch',
                template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}" 
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `,
                providers: [INPUTSWITCH_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-inputswitch{display:inline-block;position:relative}.p-inputswitch-slider{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.p-inputswitch-slider:before{content:\"\";position:absolute;top:50%}"]
            }]
    }], function () { return [{ type: ɵngcc0.ChangeDetectorRef }]; }, { onChange: [{
            type: Output
        }], disabled: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], inputId: [{
            type: Input
        }], name: [{
            type: Input
        }], readonly: [{
            type: Input
        }], ariaLabelledBy: [{
            type: Input
        }] }); })();
class InputSwitchModule {
}
InputSwitchModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: InputSwitchModule });
InputSwitchModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function InputSwitchModule_Factory(t) { return new (t || InputSwitchModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(InputSwitchModule, { declarations: function () { return [InputSwitch]; }, imports: function () { return [CommonModule]; }, exports: function () { return [InputSwitch]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InputSwitchModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [InputSwitch],
                declarations: [InputSwitch]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { INPUTSWITCH_VALUE_ACCESSOR, InputSwitch, InputSwitchModule };

//# sourceMappingURL=primeng-inputswitch.js.map