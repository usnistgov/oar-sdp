import { Directive, ElementRef, Input, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

import * as ɵngcc0 from '@angular/core';
class FocusTrap {
    constructor(el) {
        this.el = el;
    }
    onkeydown(e) {
        if (this.pFocusTrapDisabled !== true) {
            e.preventDefault();
            let focusableElements = DomHandler.getFocusableElements(this.el.nativeElement);
            if (focusableElements && focusableElements.length > 0) {
                if (!focusableElements[0].ownerDocument.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                    if (e.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                            focusableElements[0].focus();
                        else
                            focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
    }
}
FocusTrap.ɵfac = function FocusTrap_Factory(t) { return new (t || FocusTrap)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
FocusTrap.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: FocusTrap, selectors: [["", "pFocusTrap", ""]], hostBindings: function FocusTrap_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("keydown.tab", function FocusTrap_keydown_tab_HostBindingHandler($event) { return ctx.onkeydown($event); })("keydown.shift.tab", function FocusTrap_keydown_shift_tab_HostBindingHandler($event) { return ctx.onkeydown($event); });
    } }, inputs: { pFocusTrapDisabled: "pFocusTrapDisabled" } });
FocusTrap.ctorParameters = () => [
    { type: ElementRef }
];
FocusTrap.propDecorators = {
    pFocusTrapDisabled: [{ type: Input }],
    onkeydown: [{ type: HostListener, args: ['keydown.tab', ['$event'],] }, { type: HostListener, args: ['keydown.shift.tab', ['$event'],] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FocusTrap, [{
        type: Directive,
        args: [{
                selector: '[pFocusTrap]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { onkeydown: [{
            type: HostListener,
            args: ['keydown.tab', ['$event']]
        }, {
            type: HostListener,
            args: ['keydown.shift.tab', ['$event']]
        }], pFocusTrapDisabled: [{
            type: Input
        }] }); })();
class FocusTrapModule {
}
FocusTrapModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: FocusTrapModule });
FocusTrapModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function FocusTrapModule_Factory(t) { return new (t || FocusTrapModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(FocusTrapModule, { declarations: function () { return [FocusTrap]; }, imports: function () { return [CommonModule]; }, exports: function () { return [FocusTrap]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FocusTrapModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [FocusTrap],
                declarations: [FocusTrap]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { FocusTrap, FocusTrapModule };

//# sourceMappingURL=primeng-focustrap.js.map