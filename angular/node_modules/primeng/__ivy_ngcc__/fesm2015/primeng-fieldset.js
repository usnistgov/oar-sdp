import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, ContentChildren, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';

const _c0 = function (a0, a1) { return { "pi-minus": a0, "pi-plus": a1 }; };
function Fieldset_ng_container_2_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 9);
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(1, _c0, !ctx_r4.collapsed, ctx_r4.collapsed));
} }
function Fieldset_ng_container_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Fieldset_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "a", 7);
    ɵngcc0.ɵɵlistener("click", function Fieldset_ng_container_2_Template_a_click_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r7); const ctx_r6 = ɵngcc0.ɵɵnextContext(); return ctx_r6.toggle($event); })("keydown.enter", function Fieldset_ng_container_2_Template_a_keydown_enter_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r7); const ctx_r8 = ɵngcc0.ɵɵnextContext(); return ctx_r8.toggle($event); });
    ɵngcc0.ɵɵtemplate(2, Fieldset_ng_container_2_span_2_Template, 1, 4, "span", 8);
    ɵngcc0.ɵɵtemplate(3, Fieldset_ng_container_2_ng_container_3_Template, 1, 0, "ng-container", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    const _r1 = ɵngcc0.ɵɵreference(4);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵattribute("aria-controls", ctx_r0.id + "-content")("aria-expanded", !ctx_r0.collapsed);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.toggleable);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r1);
} }
function Fieldset_ng_template_3_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Fieldset_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 10);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵprojection(2, 1);
    ɵngcc0.ɵɵtemplate(3, Fieldset_ng_template_3_ng_container_3_Template, 1, 0, "ng-container", 6);
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r2.legend);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r2.headerTemplate);
} }
function Fieldset_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c1 = ["*", [["p-header"]]];
const _c2 = function (a1) { return { "p-fieldset p-component": true, "p-fieldset-toggleable": a1 }; };
const _c3 = function (a0) { return { transitionParams: a0, height: "0" }; };
const _c4 = function (a1) { return { value: "hidden", params: a1 }; };
const _c5 = function (a0) { return { transitionParams: a0, height: "*" }; };
const _c6 = function (a1) { return { value: "visible", params: a1 }; };
const _c7 = ["*", "p-header"];
let idx = 0;
class Fieldset {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `p-fieldset-${idx++}`;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    }
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onToggleDone(event) {
        this.animating = false;
    }
}
Fieldset.ɵfac = function Fieldset_Factory(t) { return new (t || Fieldset)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
Fieldset.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Fieldset, selectors: [["p-fieldset"]], contentQueries: function Fieldset_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { collapsed: "collapsed", transitionOptions: "transitionOptions", legend: "legend", toggleable: "toggleable", style: "style", styleClass: "styleClass" }, outputs: { collapsedChange: "collapsedChange", onBeforeToggle: "onBeforeToggle", onAfterToggle: "onAfterToggle" }, ngContentSelectors: _c7, decls: 9, vars: 22, consts: [[3, "ngClass", "ngStyle"], [1, "p-fieldset-legend"], [4, "ngIf", "ngIfElse"], ["legendContent", ""], ["role", "region", 1, "p-toggleable-content"], [1, "p-fieldset-content"], [4, "ngTemplateOutlet"], ["tabindex", "0", "pRipple", "", 3, "click", "keydown.enter"], ["class", "p-fieldset-toggler pi", 3, "ngClass", 4, "ngIf"], [1, "p-fieldset-toggler", "pi", 3, "ngClass"], [1, "p-fieldset-legend-text"]], template: function Fieldset_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c1);
        ɵngcc0.ɵɵelementStart(0, "fieldset", 0);
        ɵngcc0.ɵɵelementStart(1, "legend", 1);
        ɵngcc0.ɵɵtemplate(2, Fieldset_ng_container_2_Template, 4, 4, "ng-container", 2);
        ɵngcc0.ɵɵtemplate(3, Fieldset_ng_template_3_Template, 4, 2, "ng-template", null, 3, ɵngcc0.ɵɵtemplateRefExtractor);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "div", 4);
        ɵngcc0.ɵɵlistener("@fieldsetContent.done", function Fieldset_Template_div_animation_fieldsetContent_done_5_listener($event) { return ctx.onToggleDone($event); });
        ɵngcc0.ɵɵelementStart(6, "div", 5);
        ɵngcc0.ɵɵprojection(7);
        ɵngcc0.ɵɵtemplate(8, Fieldset_ng_container_8_Template, 1, 0, "ng-container", 6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = ɵngcc0.ɵɵreference(4);
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(12, _c2, ctx.toggleable))("ngStyle", ctx.style);
        ɵngcc0.ɵɵattribute("id", ctx.id);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.toggleable)("ngIfElse", _r1);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("@fieldsetContent", ctx.collapsed ? ɵngcc0.ɵɵpureFunction1(16, _c4, ɵngcc0.ɵɵpureFunction1(14, _c3, ctx.transitionOptions)) : ɵngcc0.ɵɵpureFunction1(20, _c6, ɵngcc0.ɵɵpureFunction1(18, _c5, ctx.animating ? ctx.transitionOptions : "0ms")));
        ɵngcc0.ɵɵattribute("id", ctx.id + "-content")("aria-labelledby", ctx.id)("aria-hidden", ctx.collapsed);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet, ɵngcc2.Ripple], styles: [".p-fieldset-legend>a,.p-fieldset-legend>span{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center}.p-fieldset-toggleable .p-fieldset-legend a{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:pointer;overflow:hidden;position:relative;user-select:none}.p-fieldset-legend-text{line-height:1}"], encapsulation: 2, data: { animation: [
            trigger('fieldsetContent', [
                state('hidden', style({
                    height: '0',
                    overflow: 'hidden'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ] }, changeDetection: 0 });
Fieldset.ctorParameters = () => [
    { type: ElementRef }
];
Fieldset.propDecorators = {
    legend: [{ type: Input }],
    toggleable: [{ type: Input }],
    collapsed: [{ type: Input }],
    collapsedChange: [{ type: Output }],
    onBeforeToggle: [{ type: Output }],
    onAfterToggle: [{ type: Output }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    transitionOptions: [{ type: Input }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Fieldset, [{
        type: Component,
        args: [{
                selector: 'p-fieldset',
                template: `
        <fieldset [attr.id]="id" [ngClass]="{'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="p-fieldset-legend">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed" pRipple>
                        <span class="p-fieldset-toggler pi" *ngIf="toggleable" [ngClass]="{'pi-minus': !collapsed,'pi-plus':collapsed}"></span>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="p-fieldset-legend-text">{{legend}}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@fieldsetContent]="collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}" 
                        [attr.aria-labelledby]="id" [attr.aria-hidden]="collapsed"
                         (@fieldsetContent.done)="onToggleDone($event)" role="region">
                <div class="p-fieldset-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `,
                animations: [
                    trigger('fieldsetContent', [
                        state('hidden', style({
                            height: '0',
                            overflow: 'hidden'
                        })),
                        state('visible', style({
                            height: '*'
                        })),
                        transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                        transition('void => *', animate(0))
                    ])
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-fieldset-legend>a,.p-fieldset-legend>span{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center}.p-fieldset-toggleable .p-fieldset-legend a{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:pointer;overflow:hidden;position:relative;user-select:none}.p-fieldset-legend-text{line-height:1}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { collapsed: [{
            type: Input
        }], collapsedChange: [{
            type: Output
        }], onBeforeToggle: [{
            type: Output
        }], onAfterToggle: [{
            type: Output
        }], transitionOptions: [{
            type: Input
        }], legend: [{
            type: Input
        }], toggleable: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class FieldsetModule {
}
FieldsetModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: FieldsetModule });
FieldsetModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function FieldsetModule_Factory(t) { return new (t || FieldsetModule)(); }, imports: [[CommonModule, RippleModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(FieldsetModule, { declarations: function () { return [Fieldset]; }, imports: function () { return [CommonModule, RippleModule]; }, exports: function () { return [Fieldset, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FieldsetModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RippleModule],
                exports: [Fieldset, SharedModule],
                declarations: [Fieldset]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Fieldset, FieldsetModule };

//# sourceMappingURL=primeng-fieldset.js.map