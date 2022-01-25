import { Component, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, ContentChildren, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/button';

const _c0 = ["*"];
function Inplace_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c1 = function (a0) { return { "p-disabled": a0 }; };
function Inplace_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵlistener("click", function Inplace_div_1_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.onActivateClick($event); })("keydown", function Inplace_div_1_Template_div_keydown_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r5 = ɵngcc0.ɵɵnextContext(); return ctx_r5.onKeydown($event); });
    ɵngcc0.ɵɵprojection(1);
    ɵngcc0.ɵɵtemplate(2, Inplace_div_1_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(2, _c1, ctx_r0.disabled));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.displayTemplate);
} }
function Inplace_div_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Inplace_div_2_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 7);
    ɵngcc0.ɵɵlistener("click", function Inplace_div_2_button_3_Template_button_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(2); return ctx_r8.onDeactivateClick($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("icon", ctx_r7.closeIcon);
} }
function Inplace_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 5);
    ɵngcc0.ɵɵprojection(1, 1);
    ɵngcc0.ɵɵtemplate(2, Inplace_div_2_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵtemplate(3, Inplace_div_2_button_3_Template, 1, 1, "button", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.closable);
} }
const _c2 = [[["", "pInplaceDisplay", ""]], [["", "pInplaceContent", ""]]];
const _c3 = function (a1) { return { "p-inplace p-component": true, "p-inplace-closable": a1 }; };
const _c4 = ["[pInplaceDisplay]", "[pInplaceContent]"];
class InplaceDisplay {
}
InplaceDisplay.ɵfac = function InplaceDisplay_Factory(t) { return new (t || InplaceDisplay)(); };
InplaceDisplay.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: InplaceDisplay, selectors: [["p-inplaceDisplay"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function InplaceDisplay_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InplaceDisplay, [{
        type: Component,
        args: [{
                selector: 'p-inplaceDisplay',
                template: '<ng-content></ng-content>'
            }]
    }], null, null); })();
class InplaceContent {
}
InplaceContent.ɵfac = function InplaceContent_Factory(t) { return new (t || InplaceContent)(); };
InplaceContent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: InplaceContent, selectors: [["p-inplaceContent"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function InplaceContent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InplaceContent, [{
        type: Component,
        args: [{
                selector: 'p-inplaceContent',
                template: '<ng-content></ng-content>'
            }]
    }], null, null); })();
class Inplace {
    constructor(cd) {
        this.cd = cd;
        this.closeIcon = 'pi pi-times';
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'display':
                    this.displayTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    onActivateClick(event) {
        if (!this.preventClick)
            this.activate(event);
    }
    onDeactivateClick(event) {
        if (!this.preventClick)
            this.deactivate(event);
    }
    activate(event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
            this.cd.markForCheck();
        }
    }
    deactivate(event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
            this.cd.markForCheck();
        }
    }
    onKeydown(event) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
    }
}
Inplace.ɵfac = function Inplace_Factory(t) { return new (t || Inplace)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Inplace.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Inplace, selectors: [["p-inplace"]], contentQueries: function Inplace_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { closeIcon: "closeIcon", active: "active", closable: "closable", disabled: "disabled", preventClick: "preventClick", style: "style", styleClass: "styleClass" }, outputs: { onActivate: "onActivate", onDeactivate: "onDeactivate" }, ngContentSelectors: _c4, decls: 3, vars: 8, consts: [[3, "ngClass", "ngStyle"], ["class", "p-inplace-display", "tabindex", "0", 3, "ngClass", "click", "keydown", 4, "ngIf"], ["class", "p-inplace-content", 4, "ngIf"], ["tabindex", "0", 1, "p-inplace-display", 3, "ngClass", "click", "keydown"], [4, "ngTemplateOutlet"], [1, "p-inplace-content"], ["type", "button", "pButton", "", 3, "icon", "click", 4, "ngIf"], ["type", "button", "pButton", "", 3, "icon", "click"]], template: function Inplace_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c2);
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, Inplace_div_1_Template, 3, 4, "div", 1);
        ɵngcc0.ɵɵtemplate(2, Inplace_div_2_Template, 4, 2, "div", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(6, _c3, ctx.closable))("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.active);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.active);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet, ɵngcc2.ButtonDirective], styles: [".p-inplace .p-inplace-display{cursor:pointer;display:inline}.p-inplace .p-inplace-content{display:inline}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content{display:-ms-flexbox;display:flex}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content>.p-inputtext{-ms-flex:1 1 auto;flex:1 1 auto;width:1%}"], encapsulation: 2, changeDetection: 0 });
Inplace.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
Inplace.propDecorators = {
    active: [{ type: Input }],
    closable: [{ type: Input }],
    disabled: [{ type: Input }],
    preventClick: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    closeIcon: [{ type: Input }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    onActivate: [{ type: Output }],
    onDeactivate: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Inplace, [{
        type: Component,
        args: [{
                selector: 'p-inplace',
                template: `
        <div [ngClass]="{'p-inplace p-component': true, 'p-inplace-closable': closable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-inplace-display" (click)="onActivateClick($event)" tabindex="0" (keydown)="onKeydown($event)"   
                [ngClass]="{'p-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
                <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
            </div>
            <div class="p-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                <button type="button" [icon]="closeIcon" pButton (click)="onDeactivateClick($event)" *ngIf="closable"></button>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-inplace .p-inplace-display{cursor:pointer;display:inline}.p-inplace .p-inplace-content{display:inline}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content{display:-ms-flexbox;display:flex}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content>.p-inputtext{-ms-flex:1 1 auto;flex:1 1 auto;width:1%}"]
            }]
    }], function () { return [{ type: ɵngcc0.ChangeDetectorRef }]; }, { closeIcon: [{
            type: Input
        }], onActivate: [{
            type: Output
        }], onDeactivate: [{
            type: Output
        }], active: [{
            type: Input
        }], closable: [{
            type: Input
        }], disabled: [{
            type: Input
        }], preventClick: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class InplaceModule {
}
InplaceModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: InplaceModule });
InplaceModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function InplaceModule_Factory(t) { return new (t || InplaceModule)(); }, imports: [[CommonModule, ButtonModule], ButtonModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(InplaceModule, { declarations: function () { return [Inplace, InplaceDisplay, InplaceContent]; }, imports: function () { return [CommonModule, ButtonModule]; }, exports: function () { return [Inplace, InplaceDisplay, InplaceContent, ButtonModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InplaceModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, ButtonModule],
                exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
                declarations: [Inplace, InplaceDisplay, InplaceContent]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Inplace, InplaceContent, InplaceDisplay, InplaceModule };

//# sourceMappingURL=primeng-inplace.js.map