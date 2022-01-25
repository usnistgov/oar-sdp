import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function Rating_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "span", 3);
    ɵngcc0.ɵɵlistener("click", function Rating_span_1_Template_span_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r3); const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.clear($event); })("keydown.enter", function Rating_span_1_Template_span_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r3); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.clear($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.iconCancelClass)("ngStyle", ctx_r0.iconCancelStyle);
    ɵngcc0.ɵɵattribute("tabindex", ctx_r0.disabled || ctx_r0.readonly ? null : "0");
} }
function Rating_span_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "span", 4);
    ɵngcc0.ɵɵlistener("click", function Rating_span_2_Template_span_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const i_r6 = ctx.index; const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.rate($event, i_r6); })("keydown.enter", function Rating_span_2_Template_span_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const i_r6 = ctx.index; const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.rate($event, i_r6); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r6 = ctx.index;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", !ctx_r1.value || i_r6 >= ctx_r1.value ? ctx_r1.iconOffClass : ctx_r1.iconOnClass)("ngStyle", !ctx_r1.value || i_r6 >= ctx_r1.value ? ctx_r1.iconOffStyle : ctx_r1.iconOnStyle);
    ɵngcc0.ɵɵattribute("tabindex", ctx_r1.disabled || ctx_r1.readonly ? null : "0");
} }
const _c0 = function (a0, a1) { return { "p-readonly": a0, "p-disabled": a1 }; };
const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
class Rating {
    constructor(cd) {
        this.cd = cd;
        this.stars = 5;
        this.cancel = true;
        this.iconOnClass = 'pi pi-star';
        this.iconOffClass = 'pi pi-star-o';
        this.iconCancelClass = 'pi pi-ban';
        this.onRate = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    rate(event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    }
    clear(event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }
    writeValue(value) {
        this.value = value;
        this.cd.detectChanges();
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
Rating.ɵfac = function Rating_Factory(t) { return new (t || Rating)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Rating.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Rating, selectors: [["p-rating"]], inputs: { stars: "stars", cancel: "cancel", iconOnClass: "iconOnClass", iconOffClass: "iconOffClass", iconCancelClass: "iconCancelClass", disabled: "disabled", readonly: "readonly", iconOnStyle: "iconOnStyle", iconOffStyle: "iconOffStyle", iconCancelStyle: "iconCancelStyle" }, outputs: { onRate: "onRate", onCancel: "onCancel" }, features: [ɵngcc0.ɵɵProvidersFeature([RATING_VALUE_ACCESSOR])], decls: 3, vars: 6, consts: [[1, "p-rating", 3, "ngClass"], ["class", "p-rating-icon p-rating-cancel", 3, "ngClass", "ngStyle", "click", "keydown.enter", 4, "ngIf"], ["class", "p-rating-icon", 3, "ngClass", "ngStyle", "click", "keydown.enter", 4, "ngFor", "ngForOf"], [1, "p-rating-icon", "p-rating-cancel", 3, "ngClass", "ngStyle", "click", "keydown.enter"], [1, "p-rating-icon", 3, "ngClass", "ngStyle", "click", "keydown.enter"]], template: function Rating_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, Rating_span_1_Template, 1, 3, "span", 1);
        ɵngcc0.ɵɵtemplate(2, Rating_span_2_Template, 1, 3, "span", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(3, _c0, ctx.readonly, ctx.disabled));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.cancel);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.starsArray);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgIf, ɵngcc1.NgForOf, ɵngcc1.NgStyle], styles: [".p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}"], encapsulation: 2, changeDetection: 0 });
Rating.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
Rating.propDecorators = {
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    stars: [{ type: Input }],
    cancel: [{ type: Input }],
    iconOnClass: [{ type: Input }],
    iconOnStyle: [{ type: Input }],
    iconOffClass: [{ type: Input }],
    iconOffStyle: [{ type: Input }],
    iconCancelClass: [{ type: Input }],
    iconCancelStyle: [{ type: Input }],
    onRate: [{ type: Output }],
    onCancel: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Rating, [{
        type: Component,
        args: [{
                selector: 'p-rating',
                template: `
        <div class="p-rating" [ngClass]="{'p-readonly': readonly, 'p-disabled': disabled}">
            <span [attr.tabindex]="(disabled || readonly) ? null : '0'" *ngIf="cancel" (click)="clear($event)" (keydown.enter)="clear($event)" class="p-rating-icon p-rating-cancel" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
            <span *ngFor="let star of starsArray;let i=index" class="p-rating-icon" [attr.tabindex]="(disabled || readonly) ? null : '0'"  (click)="rate($event,i)" (keydown.enter)="rate($event,i)"
                [ngClass]="(!value || i >= value) ? iconOffClass : iconOnClass"
                [ngStyle]="(!value || i >= value) ? iconOffStyle : iconOnStyle"></span>
        </div>
    `,
                providers: [RATING_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}"]
            }]
    }], function () { return [{ type: ɵngcc0.ChangeDetectorRef }]; }, { stars: [{
            type: Input
        }], cancel: [{
            type: Input
        }], iconOnClass: [{
            type: Input
        }], iconOffClass: [{
            type: Input
        }], iconCancelClass: [{
            type: Input
        }], onRate: [{
            type: Output
        }], onCancel: [{
            type: Output
        }], disabled: [{
            type: Input
        }], readonly: [{
            type: Input
        }], iconOnStyle: [{
            type: Input
        }], iconOffStyle: [{
            type: Input
        }], iconCancelStyle: [{
            type: Input
        }] }); })();
class RatingModule {
}
RatingModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: RatingModule });
RatingModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function RatingModule_Factory(t) { return new (t || RatingModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(RatingModule, { declarations: function () { return [Rating]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Rating]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RatingModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Rating],
                declarations: [Rating]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { RATING_VALUE_ACCESSOR, Rating, RatingModule };

//# sourceMappingURL=primeng-rating.js.map