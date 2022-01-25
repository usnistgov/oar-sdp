import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ChangeDetectorRef, NgZone, Input, Output, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';

function OverlayPanel_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function OverlayPanel_div_0_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 5);
    ɵngcc0.ɵɵlistener("click", function OverlayPanel_div_0_button_4_Template_button_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(2); return ctx_r3.onCloseClick($event); })("keydown.enter", function OverlayPanel_div_0_button_4_Template_button_keydown_enter_0_listener() { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r5 = ɵngcc0.ɵɵnextContext(2); return ctx_r5.hide(); });
    ɵngcc0.ɵɵelement(1, "span", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵattribute("aria-label", ctx_r2.ariaCloseLabel);
} }
const _c0 = function (a0, a1) { return { showTransitionParams: a0, hideTransitionParams: a1 }; };
const _c1 = function (a0, a1) { return { value: a0, params: a1 }; };
function OverlayPanel_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵlistener("click", function OverlayPanel_div_0_Template_div_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r7); const ctx_r6 = ɵngcc0.ɵɵnextContext(); return ctx_r6.onContainerClick(); })("@animation.start", function OverlayPanel_div_0_Template_div_animation_animation_start_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r7); const ctx_r8 = ɵngcc0.ɵɵnextContext(); return ctx_r8.onAnimationStart($event); })("@animation.done", function OverlayPanel_div_0_Template_div_animation_animation_done_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r7); const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.onAnimationEnd($event); });
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵprojection(2);
    ɵngcc0.ɵɵtemplate(3, OverlayPanel_div_0_ng_container_3_Template, 1, 0, "ng-container", 3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(4, OverlayPanel_div_0_button_4_Template, 2, 1, "button", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(ctx_r0.styleClass);
    ɵngcc0.ɵɵproperty("ngClass", "p-overlaypanel p-component")("ngStyle", ctx_r0.style)("@animation", ɵngcc0.ɵɵpureFunction2(10, _c1, ctx_r0.overlayVisible ? "open" : "close", ɵngcc0.ɵɵpureFunction2(7, _c0, ctx_r0.showTransitionOptions, ctx_r0.hideTransitionOptions)));
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.showCloseIcon);
} }
const _c2 = ["*"];
class OverlayPanel {
    constructor(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dismissable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.focusOnShow = true;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.overlayVisible = false;
        this.render = false;
        this.isContainerClicked = true;
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
            this.cd.markForCheck();
        });
    }
    onContainerClick() {
        this.isContainerClicked = true;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.isContainerClicked) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }
                    this.isContainerClicked = false;
                    this.cd.markForCheck();
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    toggle(event, target) {
        if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
                this.destroyCallback = () => {
                    this.show(null, (target || event.currentTarget || event.target));
                };
            }
            this.hide();
        }
        else {
            this.show(event, target);
        }
    }
    show(event, target) {
        this.target = target || event.currentTarget || event.target;
        this.overlayVisible = true;
        this.render = true;
        this.cd.markForCheck();
    }
    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    align() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        DomHandler.absolutePosition(this.container, this.target);
        if (DomHandler.getOffset(this.container).top < DomHandler.getOffset(this.target).top) {
            DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
        }
        if (Math.floor(DomHandler.getOffset(this.container).left) < Math.floor(DomHandler.getOffset(this.target).left) &&
            DomHandler.getOffset(this.container).left > 0) {
            DomHandler.addClass(this.container, 'p-overlaypanel-shifted');
        }
    }
    onAnimationStart(event) {
        if (event.toState === 'open') {
            this.container = event.element;
            this.onShow.emit(null);
            this.appendContainer();
            this.align();
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
            if (this.focusOnShow) {
                this.focus();
            }
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                if (this.destroyCallback) {
                    this.destroyCallback();
                    this.destroyCallback = null;
                }
                break;
            case 'close':
                this.onContainerDestroy();
                this.onHide.emit({});
                this.render = false;
                break;
        }
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }
    onWindowResize(event) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    onContainerDestroy() {
        this.target = null;
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        this.target = null;
        this.destroyCallback = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
}
OverlayPanel.ɵfac = function OverlayPanel_Factory(t) { return new (t || OverlayPanel)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
OverlayPanel.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: OverlayPanel, selectors: [["p-overlayPanel"]], contentQueries: function OverlayPanel_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { dismissable: "dismissable", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", focusOnShow: "focusOnShow", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", showCloseIcon: "showCloseIcon", style: "style", styleClass: "styleClass", appendTo: "appendTo", ariaCloseLabel: "ariaCloseLabel" }, outputs: { onShow: "onShow", onHide: "onHide" }, ngContentSelectors: _c2, decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "class", "click", 4, "ngIf"], [3, "ngClass", "ngStyle", "click"], [1, "p-overlaypanel-content"], [4, "ngTemplateOutlet"], ["type", "button", "class", "p-overlaypanel-close p-link", "pRipple", "", 3, "click", "keydown.enter", 4, "ngIf"], ["type", "button", "pRipple", "", 1, "p-overlaypanel-close", "p-link", 3, "click", "keydown.enter"], [1, "p-overlaypanel-close-icon", "pi", "pi-times"]], template: function OverlayPanel_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, OverlayPanel_div_0_Template, 5, 13, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.render);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgTemplateOutlet, ɵngcc2.Ripple], styles: [".p-overlaypanel{margin-top:10px;position:absolute}.p-overlaypanel-flipped{margin-bottom:10px;margin-top:0}.p-overlaypanel-close{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;content:\" \";height:0;left:1.25rem;pointer-events:none;position:absolute;width:0}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after,.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:rgba(0,0,0,0)}"], encapsulation: 2, data: { animation: [
            trigger('animation', [
                state('void', style({
                    transform: 'scaleY(0.8)',
                    opacity: 0
                })),
                state('close', style({
                    opacity: 0
                })),
                state('open', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => open', animate('{{showTransitionParams}}')),
                transition('open => close', animate('{{hideTransitionParams}}')),
            ])
        ] }, changeDetection: 0 });
OverlayPanel.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
OverlayPanel.propDecorators = {
    dismissable: [{ type: Input }],
    showCloseIcon: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    appendTo: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    ariaCloseLabel: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    focusOnShow: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    onShow: [{ type: Output }],
    onHide: [{ type: Output }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OverlayPanel, [{
        type: Component,
        args: [{
                selector: 'p-overlayPanel',
                template: `
        <div *ngIf="render" [ngClass]="'p-overlaypanel p-component'" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick()"
            [@animation]="{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div class="p-overlaypanel-content">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <span class="p-overlaypanel-close-icon pi pi-times"></span>
            </button>
        </div>
    `,
                animations: [
                    trigger('animation', [
                        state('void', style({
                            transform: 'scaleY(0.8)',
                            opacity: 0
                        })),
                        state('close', style({
                            opacity: 0
                        })),
                        state('open', style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        transition('void => open', animate('{{showTransitionParams}}')),
                        transition('open => close', animate('{{hideTransitionParams}}')),
                    ])
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-overlaypanel{margin-top:10px;position:absolute}.p-overlaypanel-flipped{margin-bottom:10px;margin-top:0}.p-overlaypanel-close{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;content:\" \";height:0;left:1.25rem;pointer-events:none;position:absolute;width:0}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after,.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:rgba(0,0,0,0)}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ChangeDetectorRef }, { type: ɵngcc0.NgZone }]; }, { dismissable: [{
            type: Input
        }], autoZIndex: [{
            type: Input
        }], baseZIndex: [{
            type: Input
        }], focusOnShow: [{
            type: Input
        }], showTransitionOptions: [{
            type: Input
        }], hideTransitionOptions: [{
            type: Input
        }], onShow: [{
            type: Output
        }], onHide: [{
            type: Output
        }], showCloseIcon: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], appendTo: [{
            type: Input
        }], ariaCloseLabel: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class OverlayPanelModule {
}
OverlayPanelModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: OverlayPanelModule });
OverlayPanelModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function OverlayPanelModule_Factory(t) { return new (t || OverlayPanelModule)(); }, imports: [[CommonModule, RippleModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(OverlayPanelModule, { declarations: function () { return [OverlayPanel]; }, imports: function () { return [CommonModule, RippleModule]; }, exports: function () { return [OverlayPanel]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OverlayPanelModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RippleModule],
                exports: [OverlayPanel],
                declarations: [OverlayPanel]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { OverlayPanel, OverlayPanelModule };

//# sourceMappingURL=primeng-overlaypanel.js.map