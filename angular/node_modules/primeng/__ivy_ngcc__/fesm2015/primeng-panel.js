import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';

function Panel_div_1_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 10);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵattribute("id", ctx_r3.id + "_header");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r3.header);
} }
function Panel_div_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Panel_div_1_5_ng_template_0_Template(rf, ctx) { }
function Panel_div_1_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, Panel_div_1_5_ng_template_0_Template, 0, 0, "ng-template");
} }
function Panel_div_1_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 11);
    ɵngcc0.ɵɵlistener("click", function Panel_div_1_button_6_Template_button_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(2); return ctx_r8.onIconClick($event); })("keydown.enter", function Panel_div_1_button_6_Template_button_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(2); return ctx_r10.onIconClick($event); });
    ɵngcc0.ɵɵelement(1, "span");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵattribute("id", ctx_r6.id + "-label")("aria-controls", ctx_r6.id + "-content")("aria-expanded", !ctx_r6.collapsed);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassMap(ctx_r6.collapsed ? ctx_r6.expandIcon : ctx_r6.collapseIcon);
} }
function Panel_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 6);
    ɵngcc0.ɵɵlistener("click", function Panel_div_1_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r12); const ctx_r11 = ɵngcc0.ɵɵnextContext(); return ctx_r11.onHeaderClick($event); });
    ɵngcc0.ɵɵtemplate(1, Panel_div_1_span_1_Template, 2, 2, "span", 7);
    ɵngcc0.ɵɵprojection(2, 1);
    ɵngcc0.ɵɵtemplate(3, Panel_div_1_ng_container_3_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵelementStart(4, "div", 8);
    ɵngcc0.ɵɵtemplate(5, Panel_div_1_5_Template, 1, 0, undefined, 4);
    ɵngcc0.ɵɵtemplate(6, Panel_div_1_button_6_Template, 2, 5, "button", 9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵattribute("id", ctx_r0.id + "-titlebar");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.header);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.toggleable);
} }
function Panel_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Panel_div_6_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Panel_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵprojection(1, 2);
    ɵngcc0.ɵɵtemplate(2, Panel_div_6_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r2.footerTemplate);
} }
const _c0 = ["*", [["p-header"]], [["p-footer"]]];
const _c1 = function (a1) { return { "p-panel p-component": true, "p-panel-toggleable": a1 }; };
const _c2 = function (a0) { return { transitionParams: a0, height: "0", opacity: "0" }; };
const _c3 = function (a1) { return { value: "hidden", params: a1 }; };
const _c4 = function (a0) { return { transitionParams: a0, height: "*", opacity: "1" }; };
const _c5 = function (a1) { return { value: "visible", params: a1 }; };
const _c6 = ["*", "p-header", "p-footer"];
let idx = 0;
class Panel {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.toggler = "icon";
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `p-panel-${idx++}`;
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
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'icons':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    onHeaderClick(event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }
    onIconClick(event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
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
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
}
Panel.ɵfac = function Panel_Factory(t) { return new (t || Panel)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
Panel.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Panel, selectors: [["p-panel"]], contentQueries: function Panel_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, Footer, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { collapsed: "collapsed", expandIcon: "expandIcon", collapseIcon: "collapseIcon", showHeader: "showHeader", toggler: "toggler", transitionOptions: "transitionOptions", toggleable: "toggleable", header: "header", style: "style", styleClass: "styleClass" }, outputs: { collapsedChange: "collapsedChange", onBeforeToggle: "onBeforeToggle", onAfterToggle: "onAfterToggle" }, ngContentSelectors: _c6, decls: 7, vars: 22, consts: [[3, "ngClass", "ngStyle"], ["class", "p-panel-header", 3, "click", 4, "ngIf"], ["role", "region", 1, "p-toggleable-content"], [1, "p-panel-content"], [4, "ngTemplateOutlet"], ["class", "p-panel-footer", 4, "ngIf"], [1, "p-panel-header", 3, "click"], ["class", "p-panel-title", 4, "ngIf"], [1, "p-panel-icons"], ["type", "button", "class", "p-panel-header-icon p-panel-toggler p-link", "pRipple", "", "role", "tab", 3, "click", "keydown.enter", 4, "ngIf"], [1, "p-panel-title"], ["type", "button", "pRipple", "", "role", "tab", 1, "p-panel-header-icon", "p-panel-toggler", "p-link", 3, "click", "keydown.enter"], [1, "p-panel-footer"]], template: function Panel_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c0);
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, Panel_div_1_Template, 7, 5, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵlistener("@panelContent.done", function Panel_Template_div_animation_panelContent_done_2_listener($event) { return ctx.onToggleDone($event); });
        ɵngcc0.ɵɵelementStart(3, "div", 3);
        ɵngcc0.ɵɵprojection(4);
        ɵngcc0.ɵɵtemplate(5, Panel_ng_container_5_Template, 1, 0, "ng-container", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(6, Panel_div_6_Template, 3, 1, "div", 5);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(12, _c1, ctx.toggleable))("ngStyle", ctx.style);
        ɵngcc0.ɵɵattribute("id", ctx.id);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.showHeader);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("@panelContent", ctx.collapsed ? ɵngcc0.ɵɵpureFunction1(16, _c3, ɵngcc0.ɵɵpureFunction1(14, _c2, ctx.animating ? ctx.transitionOptions : "0ms")) : ɵngcc0.ɵɵpureFunction1(20, _c5, ɵngcc0.ɵɵpureFunction1(18, _c4, ctx.animating ? ctx.transitionOptions : "0ms")));
        ɵngcc0.ɵɵattribute("id", ctx.id + "-content")("aria-hidden", ctx.collapsed)("aria-labelledby", ctx.id + "-titlebar");
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.footerFacet || ctx.footerTemplate);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet, ɵngcc2.Ripple], styles: [".p-panel-header{-ms-flex-align:center;-ms-flex-pack:justify;align-items:center;display:-ms-flexbox;display:flex;justify-content:space-between}.p-panel-title{line-height:1}.p-panel-header-icon{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;justify-content:center;overflow:hidden;position:relative;text-decoration:none}"], encapsulation: 2, data: { animation: [
            trigger('panelContent', [
                state('hidden', style({
                    height: '0',
                    overflow: 'hidden'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ] }, changeDetection: 0 });
Panel.ctorParameters = () => [
    { type: ElementRef }
];
Panel.propDecorators = {
    toggleable: [{ type: Input }],
    header: [{ type: Input }],
    collapsed: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    expandIcon: [{ type: Input }],
    collapseIcon: [{ type: Input }],
    showHeader: [{ type: Input }],
    toggler: [{ type: Input }],
    collapsedChange: [{ type: Output }],
    onBeforeToggle: [{ type: Output }],
    onAfterToggle: [{ type: Output }],
    transitionOptions: [{ type: Input }],
    footerFacet: [{ type: ContentChild, args: [Footer,] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Panel, [{
        type: Component,
        args: [{
                selector: 'p-panel',
                template: `
        <div [attr.id]="id" [ngClass]="{'p-panel p-component': true, 'p-panel-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-panel-icons">
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                    <button *ngIf="toggleable" type="button" [attr.id]="id + '-label'" class="p-panel-header-icon p-panel-toggler p-link" pRipple
                        (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                        <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                    </button>
                </div>
            </div>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id  + '-titlebar'">
                <div class="p-panel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                
                <div class="p-panel-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
                animations: [
                    trigger('panelContent', [
                        state('hidden', style({
                            height: '0',
                            overflow: 'hidden'
                        })),
                        state('void', style({
                            height: '{{height}}'
                        }), { params: { height: '0' } }),
                        state('visible', style({
                            height: '*'
                        })),
                        transition('visible <=> hidden', [style({ overflow: 'hidden' }), animate('{{transitionParams}}')]),
                        transition('void => hidden', animate('{{transitionParams}}')),
                        transition('void => visible', animate('{{transitionParams}}'))
                    ])
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-panel-header{-ms-flex-align:center;-ms-flex-pack:justify;align-items:center;display:-ms-flexbox;display:flex;justify-content:space-between}.p-panel-title{line-height:1}.p-panel-header-icon{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;justify-content:center;overflow:hidden;position:relative;text-decoration:none}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { collapsed: [{
            type: Input
        }], expandIcon: [{
            type: Input
        }], collapseIcon: [{
            type: Input
        }], showHeader: [{
            type: Input
        }], toggler: [{
            type: Input
        }], collapsedChange: [{
            type: Output
        }], onBeforeToggle: [{
            type: Output
        }], onAfterToggle: [{
            type: Output
        }], transitionOptions: [{
            type: Input
        }], toggleable: [{
            type: Input
        }], header: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], footerFacet: [{
            type: ContentChild,
            args: [Footer]
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class PanelModule {
}
PanelModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: PanelModule });
PanelModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function PanelModule_Factory(t) { return new (t || PanelModule)(); }, imports: [[CommonModule, SharedModule, RippleModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(PanelModule, { declarations: function () { return [Panel]; }, imports: function () { return [CommonModule, SharedModule, RippleModule]; }, exports: function () { return [Panel, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PanelModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, SharedModule, RippleModule],
                exports: [Panel, SharedModule],
                declarations: [Panel]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Panel, PanelModule };

//# sourceMappingURL=primeng-panel.js.map