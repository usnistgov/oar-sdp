import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ChangeDetectorRef, Input, ViewChild, ContentChildren, Output, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';

const _c0 = ["container"];
function Sidebar_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 5);
    ɵngcc0.ɵɵlistener("click", function Sidebar_button_3_Template_button_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.close($event); })("keydown.enter", function Sidebar_button_3_Template_button_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r5 = ɵngcc0.ɵɵnextContext(); return ctx_r5.close($event); });
    ɵngcc0.ɵɵelement(1, "span", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵattribute("aria-label", ctx_r1.ariaCloseLabel);
} }
function Sidebar_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c1 = function (a1, a2, a3, a4, a5, a6) { return { "p-sidebar": true, "p-sidebar-active": a1, "p-sidebar-left": a2, "p-sidebar-right": a3, "p-sidebar-top": a4, "p-sidebar-bottom": a5, "p-sidebar-full": a6 }; };
const _c2 = ["*"];
class Sidebar {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.position = 'left';
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.modal = true;
        this.dismissible = true;
        this.showCloseIcon = true;
        this.closeOnEscape = true;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
    }
    ngAfterViewInit() {
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        if (this.visible) {
            this.show();
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    get visible() {
        return this._visible;
    }
    set visible(val) {
        this._visible = val;
        if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
            if (this._visible)
                this.show();
            else {
                if (this.preventVisibleChangePropagation)
                    this.preventVisibleChangePropagation = false;
                else
                    this.hide();
            }
        }
    }
    ngAfterViewChecked() {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.executePostDisplayActions = false;
        }
    }
    show() {
        this.executePostDisplayActions = true;
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        if (this.modal) {
            this.enableModality();
        }
    }
    hide() {
        this.onHide.emit({});
        if (this.modal) {
            this.disableModality();
        }
    }
    close(event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask');
            if (this.dismissible) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                    if (this.dismissible) {
                        this.close(event);
                    }
                });
            }
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        }
    }
    disableModality() {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            this.mask = null;
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
            case 'hidden':
                this.unbindGlobalListeners();
                break;
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.containerViewChild.nativeElement.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                    this.close(event);
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    unbindGlobalListeners() {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();
    }
    ngOnDestroy() {
        this.initialized = false;
        if (this.visible) {
            this.hide();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindGlobalListeners();
    }
}
Sidebar.ɵfac = function Sidebar_Factory(t) { return new (t || Sidebar)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Sidebar.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Sidebar, selectors: [["p-sidebar"]], contentQueries: function Sidebar_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function Sidebar_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
    } }, inputs: { position: "position", blockScroll: "blockScroll", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", modal: "modal", dismissible: "dismissible", showCloseIcon: "showCloseIcon", closeOnEscape: "closeOnEscape", visible: "visible", fullScreen: "fullScreen", appendTo: "appendTo", style: "style", styleClass: "styleClass", ariaCloseLabel: "ariaCloseLabel" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange" }, ngContentSelectors: _c2, decls: 6, vars: 15, consts: [["role", "complementary", 3, "ngClass", "ngStyle"], ["container", ""], [1, "p-sidebar-content"], ["type", "button", "class", "p-sidebar-close p-link", "pRipple", "", 3, "click", "keydown.enter", 4, "ngIf"], [4, "ngTemplateOutlet"], ["type", "button", "pRipple", "", 1, "p-sidebar-close", "p-link", 3, "click", "keydown.enter"], [1, "p-sidebar-close-icon", "pi", "pi-times"]], template: function Sidebar_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵlistener("@panelState.start", function Sidebar_Template_div_animation_panelState_start_0_listener($event) { return ctx.onAnimationStart($event); });
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, Sidebar_button_3_Template, 2, 1, "button", 3);
        ɵngcc0.ɵɵprojection(4);
        ɵngcc0.ɵɵtemplate(5, Sidebar_ng_container_5_Template, 1, 0, "ng-container", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction6(8, _c1, ctx.visible, ctx.position === "left", ctx.position === "right", ctx.position === "top", ctx.position === "bottom", ctx.fullScreen))("@panelState", ctx.visible ? "visible" : "hidden")("ngStyle", ctx.style);
        ɵngcc0.ɵɵattribute("aria-modal", ctx.modal);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", ctx.showCloseIcon);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet, ɵngcc2.Ripple], styles: [".p-sidebar{position:fixed;transition:transform .3s}.p-sidebar-content{position:relative}.p-sidebar-close{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;overflow:hidden;position:absolute;right:0;top:0}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask-leave.p-component-overlay{background-color:rgba(0,0,0,0)}.p-sidebar-left{-ms-transform:translateX(-100%);height:100%;left:0;top:0;transform:translateX(-100%);width:20rem}.p-sidebar-left.p-sidebar-active{-ms-transform:translateX(0);transform:translateX(0)}.p-sidebar-right{-ms-transform:translateX(100%);height:100%;right:0;top:0;transform:translateX(100%);width:20rem}.p-sidebar-right.p-sidebar-active{-ms-transform:translateX(0);transform:translateX(0)}.p-sidebar-top{-ms-transform:translateY(-100%);height:10rem;left:0;top:0;transform:translateY(-100%);width:100%}.p-sidebar-top.p-sidebar-active{-ms-transform:translateY(0);transform:translateY(0)}.p-sidebar-bottom{-ms-transform:translateY(100%);bottom:0;height:10rem;left:0;transform:translateY(100%);width:100%}.p-sidebar-bottom.p-sidebar-active{-ms-transform:translateY(0);transform:translateY(0)}.p-sidebar-full{height:100%;left:0;top:0;transition:none;width:100%}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"], encapsulation: 2, data: { animation: [
            trigger('panelState', [
                state('hidden', style({
                    opacity: 0
                })),
                state('visible', style({
                    opacity: 1
                })),
                transition('visible => hidden', animate('300ms ease-in')),
                transition('hidden => visible', animate('300ms ease-out'))
            ])
        ] }, changeDetection: 0 });
Sidebar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
Sidebar.propDecorators = {
    position: [{ type: Input }],
    fullScreen: [{ type: Input }],
    appendTo: [{ type: Input }],
    blockScroll: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    ariaCloseLabel: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    modal: [{ type: Input }],
    dismissible: [{ type: Input }],
    showCloseIcon: [{ type: Input }],
    closeOnEscape: [{ type: Input }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    onShow: [{ type: Output }],
    onHide: [{ type: Output }],
    visibleChange: [{ type: Output }],
    visible: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Sidebar, [{
        type: Component,
        args: [{
                selector: 'p-sidebar',
                template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left'), 'p-sidebar-right': (position === 'right'),
            'p-sidebar-top': (position === 'top'), 'p-sidebar-bottom': (position === 'bottom'),
            'p-sidebar-full': fullScreen}"
            [@panelState]="visible ? 'visible' : 'hidden'" (@panelState.start)="onAnimationStart($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
            <div class="p-sidebar-content">
                <button type="button" class="p-sidebar-close p-link" *ngIf="showCloseIcon" (click)="close($event)" (keydown.enter)="close($event)" [attr.aria-label]="ariaCloseLabel" pRipple>
                    <span class="p-sidebar-close-icon pi pi-times"></span>
                </button>
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
    `,
                animations: [
                    trigger('panelState', [
                        state('hidden', style({
                            opacity: 0
                        })),
                        state('visible', style({
                            opacity: 1
                        })),
                        transition('visible => hidden', animate('300ms ease-in')),
                        transition('hidden => visible', animate('300ms ease-out'))
                    ])
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-sidebar{position:fixed;transition:transform .3s}.p-sidebar-content{position:relative}.p-sidebar-close{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;overflow:hidden;position:absolute;right:0;top:0}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask-leave.p-component-overlay{background-color:rgba(0,0,0,0)}.p-sidebar-left{-ms-transform:translateX(-100%);height:100%;left:0;top:0;transform:translateX(-100%);width:20rem}.p-sidebar-left.p-sidebar-active{-ms-transform:translateX(0);transform:translateX(0)}.p-sidebar-right{-ms-transform:translateX(100%);height:100%;right:0;top:0;transform:translateX(100%);width:20rem}.p-sidebar-right.p-sidebar-active{-ms-transform:translateX(0);transform:translateX(0)}.p-sidebar-top{-ms-transform:translateY(-100%);height:10rem;left:0;top:0;transform:translateY(-100%);width:100%}.p-sidebar-top.p-sidebar-active{-ms-transform:translateY(0);transform:translateY(0)}.p-sidebar-bottom{-ms-transform:translateY(100%);bottom:0;height:10rem;left:0;transform:translateY(100%);width:100%}.p-sidebar-bottom.p-sidebar-active{-ms-transform:translateY(0);transform:translateY(0)}.p-sidebar-full{height:100%;left:0;top:0;transition:none;width:100%}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ChangeDetectorRef }]; }, { position: [{
            type: Input
        }], blockScroll: [{
            type: Input
        }], autoZIndex: [{
            type: Input
        }], baseZIndex: [{
            type: Input
        }], modal: [{
            type: Input
        }], dismissible: [{
            type: Input
        }], showCloseIcon: [{
            type: Input
        }], closeOnEscape: [{
            type: Input
        }], onShow: [{
            type: Output
        }], onHide: [{
            type: Output
        }], visibleChange: [{
            type: Output
        }], visible: [{
            type: Input
        }], fullScreen: [{
            type: Input
        }], appendTo: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], ariaCloseLabel: [{
            type: Input
        }], containerViewChild: [{
            type: ViewChild,
            args: ['container']
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class SidebarModule {
}
SidebarModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SidebarModule });
SidebarModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SidebarModule_Factory(t) { return new (t || SidebarModule)(); }, imports: [[CommonModule, RippleModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SidebarModule, { declarations: function () { return [Sidebar]; }, imports: function () { return [CommonModule, RippleModule]; }, exports: function () { return [Sidebar]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RippleModule],
                exports: [Sidebar],
                declarations: [Sidebar]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Sidebar, SidebarModule };

//# sourceMappingURL=primeng-sidebar.js.map