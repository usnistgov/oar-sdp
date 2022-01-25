import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function Toolbar_div_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Toolbar_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtemplate(1, Toolbar_div_2_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.leftTemplate);
} }
function Toolbar_div_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Toolbar_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 5);
    ɵngcc0.ɵɵtemplate(1, Toolbar_div_3_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r1.rightTemplate);
} }
const _c0 = ["*"];
class Toolbar {
    constructor(el) {
        this.el = el;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'left':
                    this.leftTemplate = item.template;
                    break;
                case 'right':
                    this.rightTemplate = item.template;
                    break;
            }
        });
    }
}
Toolbar.ɵfac = function Toolbar_Factory(t) { return new (t || Toolbar)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
Toolbar.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Toolbar, selectors: [["p-toolbar"]], contentQueries: function Toolbar_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { style: "style", styleClass: "styleClass" }, ngContentSelectors: _c0, decls: 4, vars: 6, consts: [["role", "toolbar", 3, "ngClass", "ngStyle"], ["class", "p-toolbar-group-left", 4, "ngIf"], ["class", "p-toolbar-group-right", 4, "ngIf"], [1, "p-toolbar-group-left"], [4, "ngTemplateOutlet"], [1, "p-toolbar-group-right"]], template: function Toolbar_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵprojection(1);
        ɵngcc0.ɵɵtemplate(2, Toolbar_div_2_Template, 2, 1, "div", 1);
        ɵngcc0.ɵɵtemplate(3, Toolbar_div_3_Template, 2, 1, "div", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-toolbar p-component")("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.leftTemplate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.rightTemplate);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet], styles: [".p-toolbar{-ms-flex-pack:justify;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:space-between}.p-toolbar,.p-toolbar-group-left,.p-toolbar-group-right{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}"], encapsulation: 2, changeDetection: 0 });
Toolbar.ctorParameters = () => [
    { type: ElementRef }
];
Toolbar.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Toolbar, [{
        type: Component,
        args: [{
                selector: 'p-toolbar',
                template: `
        <div [ngClass]="'p-toolbar p-component'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
            <div class="p-toolbar-group-left" *ngIf="leftTemplate">
                <ng-container *ngTemplateOutlet="leftTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-right" *ngIf="rightTemplate">
                <ng-container *ngTemplateOutlet="rightTemplate"></ng-container>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-toolbar{-ms-flex-pack:justify;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:space-between}.p-toolbar,.p-toolbar-group-left,.p-toolbar-group-right{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class ToolbarModule {
}
ToolbarModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ToolbarModule });
ToolbarModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ToolbarModule_Factory(t) { return new (t || ToolbarModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ToolbarModule, { declarations: function () { return [Toolbar]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Toolbar]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToolbarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Toolbar],
                declarations: [Toolbar]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Toolbar, ToolbarModule };

//# sourceMappingURL=primeng-toolbar.js.map