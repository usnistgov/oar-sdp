import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from 'primeng/ripple';
import * as ɵngcc2 from '@angular/common';

const _c0 = function (a1, a2) { return { "p-button-icon": true, "p-button-icon-left": a1, "p-button-icon-right": a2 }; };
function ToggleButton_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 3);
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(ctx_r0.checked ? ctx_r0.onIcon : ctx_r0.offIcon);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(3, _c0, ctx_r0.iconPos === "left", ctx_r0.iconPos === "right"));
} }
const _c1 = function (a1, a2, a3) { return { "p-button p-togglebutton p-component": true, "p-button-icon-only": a1, "p-highlight": a2, "p-disabled": a3 }; };
const TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};
class ToggleButton {
    constructor(cd) {
        this.cd = cd;
        this.iconPos = 'left';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    toggle(event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            this.cd.markForCheck();
        }
    }
    onBlur() {
        this.onModelTouched();
    }
    writeValue(value) {
        this.checked = value;
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
    get hasOnLabel() {
        return this.onLabel && this.onLabel.length > 0;
    }
    get hasOffLabel() {
        return this.onLabel && this.onLabel.length > 0;
    }
}
ToggleButton.ɵfac = function ToggleButton_Factory(t) { return new (t || ToggleButton)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
ToggleButton.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ToggleButton, selectors: [["p-toggleButton"]], inputs: { iconPos: "iconPos", disabled: "disabled", onLabel: "onLabel", offLabel: "offLabel", onIcon: "onIcon", offIcon: "offIcon", ariaLabelledBy: "ariaLabelledBy", style: "style", styleClass: "styleClass", inputId: "inputId", tabindex: "tabindex" }, outputs: { onChange: "onChange" }, features: [ɵngcc0.ɵɵProvidersFeature([TOGGLEBUTTON_VALUE_ACCESSOR])], decls: 4, vars: 12, consts: [["role", "checkbox", "pRipple", "", 3, "ngClass", "ngStyle", "click", "keydown.enter"], [3, "class", "ngClass", 4, "ngIf"], [1, "p-button-label"], [3, "ngClass"]], template: function ToggleButton_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("click", function ToggleButton_Template_div_click_0_listener($event) { return ctx.toggle($event); })("keydown.enter", function ToggleButton_Template_div_keydown_enter_0_listener($event) { return ctx.toggle($event); });
        ɵngcc0.ɵɵtemplate(1, ToggleButton_span_1_Template, 1, 6, "span", 1);
        ɵngcc0.ɵɵelementStart(2, "span", 2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction3(8, _c1, ctx.onIcon && ctx.offIcon && !ctx.hasOnLabel && !ctx.hasOffLabel, ctx.checked, ctx.disabled))("ngStyle", ctx.style);
        ɵngcc0.ɵɵattribute("tabindex", ctx.disabled ? null : "0")("aria-checked", ctx.checked);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.onIcon || ctx.offIcon);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.checked ? ctx.hasOnLabel ? ctx.onLabel : "" : ctx.hasOffLabel ? ctx.offLabel : "");
    } }, directives: [ɵngcc1.Ripple, ɵngcc2.NgClass, ɵngcc2.NgStyle, ɵngcc2.NgIf], styles: [".p-button[_ngcontent-%COMP%]{-moz-user-select:none;-ms-flex-align:center;-ms-user-select:none;-webkit-user-select:none;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;margin:0;overflow:hidden;position:relative;text-align:center;user-select:none;vertical-align:bottom}.p-button-label[_ngcontent-%COMP%]{-ms-flex:1 1 auto;flex:1 1 auto}.p-button-icon-right[_ngcontent-%COMP%]{-ms-flex-order:1;order:1}.p-button[_ngcontent-%COMP%]:disabled{cursor:default}.p-button-icon-only[_ngcontent-%COMP%]{-ms-flex-pack:center;justify-content:center}.p-button-icon-only[_ngcontent-%COMP%]   .p-button-label[_ngcontent-%COMP%]{-ms-flex:0 0 auto;flex:0 0 auto;visibility:hidden;width:0}.p-button-vertical[_ngcontent-%COMP%]{-ms-flex-direction:column;flex-direction:column}.p-button-icon-bottom[_ngcontent-%COMP%]{-ms-flex-order:2;order:2}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]{margin:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:not(:last-child){border-right:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:first-of-type{border-bottom-right-radius:0;border-top-right-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:last-of-type{border-bottom-left-radius:0;border-top-left-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:focus{position:relative;z-index:1}"], changeDetection: 0 });
ToggleButton.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
ToggleButton.propDecorators = {
    onLabel: [{ type: Input }],
    offLabel: [{ type: Input }],
    onIcon: [{ type: Input }],
    offIcon: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    disabled: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    inputId: [{ type: Input }],
    tabindex: [{ type: Input }],
    iconPos: [{ type: Input }],
    onChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToggleButton, [{
        type: Component,
        args: [{
                selector: 'p-toggleButton',
                template: `
        <div [ngClass]="{'p-button p-togglebutton p-component': true, 'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked,'p-disabled':disabled}" 
                        [ngStyle]="style" [class]="styleClass" (click)="toggle($event)" (keydown.enter)="toggle($event)"
                        [attr.tabindex]="disabled ? null : '0'" role="checkbox" [attr.aria-checked]="checked" pRipple>
            <span *ngIf="onIcon||offIcon" [class]="checked ? this.onIcon : this.offIcon" 
                [ngClass]="{'p-button-icon': true, 'p-button-icon-left': (iconPos === 'left'), 'p-button-icon-right': (iconPos === 'right')}"></span>
            <span class="p-button-label">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>
        </div>
    `,
                providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".p-button{-moz-user-select:none;-ms-flex-align:center;-ms-user-select:none;-webkit-user-select:none;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;margin:0;overflow:hidden;position:relative;text-align:center;user-select:none;vertical-align:bottom}.p-button-label{-ms-flex:1 1 auto;flex:1 1 auto}.p-button-icon-right{-ms-flex-order:1;order:1}.p-button:disabled{cursor:default}.p-button-icon-only{-ms-flex-pack:center;justify-content:center}.p-button-icon-only .p-button-label{-ms-flex:0 0 auto;flex:0 0 auto;visibility:hidden;width:0}.p-button-vertical{-ms-flex-direction:column;flex-direction:column}.p-button-icon-bottom{-ms-flex-order:2;order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-bottom-right-radius:0;border-top-right-radius:0}.p-buttonset .p-button:last-of-type{border-bottom-left-radius:0;border-top-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}"]
            }]
    }], function () { return [{ type: ɵngcc0.ChangeDetectorRef }]; }, { iconPos: [{
            type: Input
        }], onChange: [{
            type: Output
        }], disabled: [{
            type: Input
        }], onLabel: [{
            type: Input
        }], offLabel: [{
            type: Input
        }], onIcon: [{
            type: Input
        }], offIcon: [{
            type: Input
        }], ariaLabelledBy: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], inputId: [{
            type: Input
        }], tabindex: [{
            type: Input
        }] }); })();
class ToggleButtonModule {
}
ToggleButtonModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ToggleButtonModule });
ToggleButtonModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ToggleButtonModule_Factory(t) { return new (t || ToggleButtonModule)(); }, imports: [[CommonModule, RippleModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ToggleButtonModule, { declarations: function () { return [ToggleButton]; }, imports: function () { return [CommonModule, RippleModule]; }, exports: function () { return [ToggleButton]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToggleButtonModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RippleModule],
                exports: [ToggleButton],
                declarations: [ToggleButton]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButton, ToggleButtonModule };

//# sourceMappingURL=primeng-togglebutton.js.map