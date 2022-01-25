import { EventEmitter, Directive, ElementRef, Optional, Input, Output, HostListener, NgModule } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/forms';
class InputTextarea {
    constructor(el, ngModel, control) {
        this.el = el;
        this.ngModel = ngModel;
        this.control = control;
        this.onResize = new EventEmitter();
    }
    ngOnInit() {
        if (this.ngModel) {
            this.ngModelSubscription = this.ngModel.valueChanges.subscribe(() => {
                this.updateState();
            });
        }
        if (this.control) {
            this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }
    ngAfterViewInit() {
        if (this.autoResize)
            this.resize();
    }
    onInput(e) {
        this.updateState();
    }
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
    onFocus(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    onBlur(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    resize(event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }
        this.onResize.emit(event || {});
    }
    updateState() {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize();
        }
    }
    ngOnDestroy() {
        if (this.ngModelSubscription) {
            this.ngModelSubscription.unsubscribe();
        }
        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }
    }
}
InputTextarea.ɵfac = function InputTextarea_Factory(t) { return new (t || InputTextarea)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.NgModel, 8), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.NgControl, 8)); };
InputTextarea.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: InputTextarea, selectors: [["", "pInputTextarea", ""]], hostVars: 10, hostBindings: function InputTextarea_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("input", function InputTextarea_input_HostBindingHandler($event) { return ctx.onInput($event); })("focus", function InputTextarea_focus_HostBindingHandler($event) { return ctx.onFocus($event); })("blur", function InputTextarea_blur_HostBindingHandler($event) { return ctx.onBlur($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("p-inputtextarea", true)("p-inputtext", true)("p-component", true)("p-filled", ctx.filled)("p-inputtextarea-resizable", ctx.autoResize);
    } }, inputs: { autoResize: "autoResize" }, outputs: { onResize: "onResize" } });
InputTextarea.ctorParameters = () => [
    { type: ElementRef },
    { type: NgModel, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }] }
];
InputTextarea.propDecorators = {
    autoResize: [{ type: Input }],
    onResize: [{ type: Output }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onFocus: [{ type: HostListener, args: ['focus', ['$event'],] }],
    onBlur: [{ type: HostListener, args: ['blur', ['$event'],] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InputTextarea, [{
        type: Directive,
        args: [{
                selector: '[pInputTextarea]',
                host: {
                    '[class.p-inputtextarea]': 'true',
                    '[class.p-inputtext]': 'true',
                    '[class.p-component]': 'true',
                    '[class.p-filled]': 'filled',
                    '[class.p-inputtextarea-resizable]': 'autoResize'
                }
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.NgModel, decorators: [{
                type: Optional
            }] }, { type: ɵngcc1.NgControl, decorators: [{
                type: Optional
            }] }]; }, { onResize: [{
            type: Output
        }], onInput: [{
            type: HostListener,
            args: ['input', ['$event']]
        }], onFocus: [{
            type: HostListener,
            args: ['focus', ['$event']]
        }], onBlur: [{
            type: HostListener,
            args: ['blur', ['$event']]
        }], autoResize: [{
            type: Input
        }] }); })();
class InputTextareaModule {
}
InputTextareaModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: InputTextareaModule });
InputTextareaModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function InputTextareaModule_Factory(t) { return new (t || InputTextareaModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(InputTextareaModule, { declarations: function () { return [InputTextarea]; }, imports: function () { return [CommonModule]; }, exports: function () { return [InputTextarea]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InputTextareaModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [InputTextarea],
                declarations: [InputTextarea]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { InputTextarea, InputTextareaModule };

//# sourceMappingURL=primeng-inputtextarea.js.map