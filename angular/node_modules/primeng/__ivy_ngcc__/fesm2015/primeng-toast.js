import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, NgZone, Input, Output, ViewChild, ChangeDetectorRef, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { MessageService, PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate, query, animateChild } from '@angular/animations';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
import * as ɵngcc3 from 'primeng/api';

const _c0 = ["container"];
const _c1 = function (a0, a1, a2, a3) { return { "pi-info-circle": a0, "pi-exclamation-triangle": a1, "pi-times-circle": a2, "pi-check": a3 }; };
function ToastItem_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelement(1, "span", 6);
    ɵngcc0.ɵɵelementStart(2, "div", 7);
    ɵngcc0.ɵɵelementStart(3, "div", 8);
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "div", 9);
    ɵngcc0.ɵɵtext(6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction4(3, _c1, ctx_r1.message.severity == "info", ctx_r1.message.severity == "warn", ctx_r1.message.severity == "error", ctx_r1.message.severity == "success"));
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.message.summary);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.message.detail);
} }
function ToastItem_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 10);
    ɵngcc0.ɵɵlistener("click", function ToastItem_button_4_Template_button_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.onCloseIconClick($event); })("keydown.enter", function ToastItem_button_4_Template_button_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r6 = ɵngcc0.ɵɵnextContext(); return ctx_r6.onCloseIconClick($event); });
    ɵngcc0.ɵɵelement(1, "span", 11);
    ɵngcc0.ɵɵelementEnd();
} }
function ToastItem_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c2 = function (a0, a1, a2, a3) { return { showTransformParams: a0, hideTransformParams: a1, showTransitionParams: a2, hideTransitionParams: a3 }; };
const _c3 = function (a1) { return { value: "visible", params: a1 }; };
const _c4 = function (a0) { return { $implicit: a0 }; };
function Toast_p_toastItem_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "p-toastItem", 3);
    ɵngcc0.ɵɵlistener("onClose", function Toast_p_toastItem_2_Template_p_toastItem_onClose_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.onMessageClose($event); })("@toastAnimation.start", function Toast_p_toastItem_2_Template_p_toastItem_animation_toastAnimation_start_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r6 = ɵngcc0.ɵɵnextContext(); return ctx_r6.onAnimationStart($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const msg_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("message", msg_r2)("index", i_r3)("template", ctx_r1.template)("@toastAnimation", undefined)("showTransformOptions", ctx_r1.showTransformOptions)("hideTransformOptions", ctx_r1.hideTransformOptions)("showTransitionOptions", ctx_r1.showTransitionOptions)("hideTransitionOptions", ctx_r1.hideTransitionOptions);
} }
class ToastItem {
    constructor(zone) {
        this.zone = zone;
        this.onClose = new EventEmitter();
    }
    ngAfterViewInit() {
        this.initTimeout();
    }
    initTimeout() {
        if (!this.message.sticky) {
            this.zone.runOutsideAngular(() => {
                this.timeout = setTimeout(() => {
                    this.onClose.emit({
                        index: this.index,
                        message: this.message
                    });
                }, this.message.life || 3000);
            });
        }
    }
    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    onMouseEnter() {
        this.clearTimeout();
    }
    onMouseLeave() {
        this.initTimeout();
    }
    onCloseIconClick(event) {
        this.clearTimeout();
        this.onClose.emit({
            index: this.index,
            message: this.message
        });
        event.preventDefault();
    }
    ngOnDestroy() {
        this.clearTimeout();
    }
}
ToastItem.ɵfac = function ToastItem_Factory(t) { return new (t || ToastItem)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
ToastItem.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ToastItem, selectors: [["p-toastItem"]], viewQuery: function ToastItem_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
    } }, inputs: { message: "message", index: "index", template: "template", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClose: "onClose" }, decls: 6, vars: 16, consts: [[1, "p-toast-message", 3, "ngClass", "mouseenter", "mouseleave"], ["container", ""], ["role", "alert", "aria-live", "assertive", "aria-atomic", "true", 1, "p-toast-message-content"], [4, "ngIf"], ["type", "button", "class", "p-toast-icon-close p-link", "pRipple", "", 3, "click", "keydown.enter", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-toast-message-icon", "pi", 3, "ngClass"], [1, "p-toast-message-text"], [1, "p-toast-summary"], [1, "p-toast-detail"], ["type", "button", "pRipple", "", 1, "p-toast-icon-close", "p-link", 3, "click", "keydown.enter"], [1, "p-toast-icon-close-icon", "pi", "pi-times"]], template: function ToastItem_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵlistener("mouseenter", function ToastItem_Template_div_mouseenter_0_listener() { return ctx.onMouseEnter(); })("mouseleave", function ToastItem_Template_div_mouseleave_0_listener() { return ctx.onMouseLeave(); });
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, ToastItem_ng_container_3_Template, 7, 8, "ng-container", 3);
        ɵngcc0.ɵɵtemplate(4, ToastItem_button_4_Template, 2, 0, "button", 4);
        ɵngcc0.ɵɵtemplate(5, ToastItem_ng_container_5_Template, 1, 0, "ng-container", 5);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngClass", "p-toast-message-" + ctx.message.severity)("@messageState", ɵngcc0.ɵɵpureFunction1(12, _c3, ɵngcc0.ɵɵpureFunction4(7, _c2, ctx.showTransformOptions, ctx.hideTransformOptions, ctx.showTransitionOptions, ctx.hideTransitionOptions)));
        ɵngcc0.ɵɵattribute("id", ctx.message.id);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.template);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.message.closable !== false);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(14, _c4, ctx.message));
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet, ɵngcc2.Ripple], encapsulation: 2, data: { animation: [
            trigger('messageState', [
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => *', [
                    style({ transform: '{{showTransformParams}}', opacity: 0 }),
                    animate('{{showTransitionParams}}')
                ]),
                transition('* => void', [
                    animate(('{{hideTransitionParams}}'), style({
                        height: 0,
                        opacity: 0,
                        transform: '{{hideTransformParams}}'
                    }))
                ])
            ])
        ] }, changeDetection: 0 });
ToastItem.ctorParameters = () => [
    { type: NgZone }
];
ToastItem.propDecorators = {
    message: [{ type: Input }],
    index: [{ type: Input }],
    template: [{ type: Input }],
    showTransformOptions: [{ type: Input }],
    hideTransformOptions: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    onClose: [{ type: Output }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastItem, [{
        type: Component,
        args: [{
                selector: 'p-toastItem',
                template: `
        <div #container [attr.id]="message.id" class="p-toast-message" [ngClass]="'p-toast-message-' + message.severity" [@messageState]="{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            <div class="p-toast-message-content" role="alert" aria-live="assertive" aria-atomic="true">
                <ng-container *ngIf="!template">
                    <span class="p-toast-message-icon pi" [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                        'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
                    <div class="p-toast-message-text">
                        <div class="p-toast-summary">{{message.summary}}</div>
                        <div class="p-toast-detail">{{message.detail}}</div>
                    </div>
                </ng-container>
                <button type="button" class="p-toast-icon-close p-link" (click)="onCloseIconClick($event)" (keydown.enter)="onCloseIconClick($event)" *ngIf="message.closable !== false" pRipple>
                    <span class="p-toast-icon-close-icon pi pi-times"></span>
                </button>
                <ng-container *ngTemplateOutlet="template; context: {$implicit: message}"></ng-container>
            </div>
        </div>
    `,
                animations: [
                    trigger('messageState', [
                        state('visible', style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        transition('void => *', [
                            style({ transform: '{{showTransformParams}}', opacity: 0 }),
                            animate('{{showTransitionParams}}')
                        ]),
                        transition('* => void', [
                            animate(('{{hideTransitionParams}}'), style({
                                height: 0,
                                opacity: 0,
                                transform: '{{hideTransformParams}}'
                            }))
                        ])
                    ])
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ɵngcc0.NgZone }]; }, { onClose: [{
            type: Output
        }], message: [{
            type: Input
        }], index: [{
            type: Input
        }], template: [{
            type: Input
        }], showTransformOptions: [{
            type: Input
        }], hideTransformOptions: [{
            type: Input
        }], showTransitionOptions: [{
            type: Input
        }], hideTransitionOptions: [{
            type: Input
        }], containerViewChild: [{
            type: ViewChild,
            args: ['container']
        }] }); })();
class Toast {
    constructor(messageService, cd) {
        this.messageService = messageService;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.position = 'top-right';
        this.preventOpenDuplicates = false;
        this.preventDuplicates = false;
        this.showTransformOptions = 'translateY(100%)';
        this.hideTransformOptions = 'translateY(-100%)';
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.onClose = new EventEmitter();
    }
    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe(messages => {
            if (messages) {
                if (messages instanceof Array) {
                    const filteredMessages = messages.filter(m => this.canAdd(m));
                    this.add(filteredMessages);
                }
                else if (this.canAdd(messages)) {
                    this.add([messages]);
                }
            }
        });
        this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
            if (key) {
                if (this.key === key) {
                    this.messages = null;
                }
            }
            else {
                this.messages = null;
            }
            this.cd.markForCheck();
        });
    }
    add(messages) {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
        if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }
        this.cd.markForCheck();
    }
    canAdd(message) {
        let allow = this.key === message.key;
        if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
        }
        if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
        }
        return allow;
    }
    containsMessage(collection, message) {
        if (!collection) {
            return false;
        }
        return collection.find(m => {
            return ((m.summary === message.summary) && (m.detail == message.detail) && (m.severity === message.severity));
        }) != null;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'message':
                    this.template = item.template;
                    break;
                default:
                    this.template = item.template;
                    break;
            }
        });
    }
    onMessageClose(event) {
        this.messages.splice(event.index, 1);
        this.onClose.emit({
            message: event.message
        });
        this.cd.detectChanges();
    }
    onAnimationStart(event) {
        if (event.fromState === 'void' && this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    }
}
Toast.ɵfac = function Toast_Factory(t) { return new (t || Toast)(ɵngcc0.ɵɵdirectiveInject(ɵngcc3.MessageService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Toast.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Toast, selectors: [["p-toast"]], contentQueries: function Toast_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function Toast_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
    } }, inputs: { autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", position: "position", preventOpenDuplicates: "preventOpenDuplicates", preventDuplicates: "preventDuplicates", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", key: "key", style: "style", styleClass: "styleClass" }, outputs: { onClose: "onClose" }, decls: 3, vars: 5, consts: [[3, "ngClass", "ngStyle"], ["container", ""], [3, "message", "index", "template", "showTransformOptions", "hideTransformOptions", "showTransitionOptions", "hideTransitionOptions", "onClose", 4, "ngFor", "ngForOf"], [3, "message", "index", "template", "showTransformOptions", "hideTransformOptions", "showTransitionOptions", "hideTransitionOptions", "onClose"]], template: function Toast_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵtemplate(2, Toast_p_toastItem_2_Template, 1, 8, "p-toastItem", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-toast p-component p-toast-" + ctx.position)("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.messages);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgForOf, ToastItem], styles: [".p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex}.p-toast-message-text{-ms-flex:1 1 auto;flex:1 1 auto}.p-toast-top-right{right:20px;top:20px}.p-toast-top-left{left:20px;top:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{left:50%;margin-left:-10em;top:20px}.p-toast-bottom-center{bottom:20px;left:50%;margin-left:-10em}.p-toast-center{-ms-transform:translate(-50%,-50%);left:50%;min-width:20vw;top:50%;transform:translate(-50%,-50%)}.p-toast-icon-close{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;overflow:hidden;position:relative}.p-toast-icon-close.p-link{cursor:pointer}"], encapsulation: 2, data: { animation: [
            trigger('toastAnimation', [
                transition(':enter, :leave', [
                    query('@*', animateChild())
                ])
            ])
        ] }, changeDetection: 0 });
Toast.ctorParameters = () => [
    { type: MessageService },
    { type: ChangeDetectorRef }
];
Toast.propDecorators = {
    key: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    position: [{ type: Input }],
    preventOpenDuplicates: [{ type: Input }],
    preventDuplicates: [{ type: Input }],
    showTransformOptions: [{ type: Input }],
    hideTransformOptions: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    onClose: [{ type: Output }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Toast, [{
        type: Component,
        args: [{
                selector: 'p-toast',
                template: `
        <div #container [ngClass]="'p-toast p-component p-toast-' + position" [ngStyle]="style" [class]="styleClass">
            <p-toastItem *ngFor="let msg of messages; let i=index" [message]="msg" [index]="i" (onClose)="onMessageClose($event)"
                    [template]="template" @toastAnimation (@toastAnimation.start)="onAnimationStart($event)" 
                    [showTransformOptions]="showTransformOptions" [hideTransformOptions]="hideTransformOptions" 
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-toastItem>
        </div>
    `,
                animations: [
                    trigger('toastAnimation', [
                        transition(':enter, :leave', [
                            query('@*', animateChild())
                        ])
                    ])
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex}.p-toast-message-text{-ms-flex:1 1 auto;flex:1 1 auto}.p-toast-top-right{right:20px;top:20px}.p-toast-top-left{left:20px;top:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{left:50%;margin-left:-10em;top:20px}.p-toast-bottom-center{bottom:20px;left:50%;margin-left:-10em}.p-toast-center{-ms-transform:translate(-50%,-50%);left:50%;min-width:20vw;top:50%;transform:translate(-50%,-50%)}.p-toast-icon-close{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;overflow:hidden;position:relative}.p-toast-icon-close.p-link{cursor:pointer}"]
            }]
    }], function () { return [{ type: ɵngcc3.MessageService }, { type: ɵngcc0.ChangeDetectorRef }]; }, { autoZIndex: [{
            type: Input
        }], baseZIndex: [{
            type: Input
        }], position: [{
            type: Input
        }], preventOpenDuplicates: [{
            type: Input
        }], preventDuplicates: [{
            type: Input
        }], showTransformOptions: [{
            type: Input
        }], hideTransformOptions: [{
            type: Input
        }], showTransitionOptions: [{
            type: Input
        }], hideTransitionOptions: [{
            type: Input
        }], onClose: [{
            type: Output
        }], key: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], containerViewChild: [{
            type: ViewChild,
            args: ['container']
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class ToastModule {
}
ToastModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ToastModule });
ToastModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ToastModule_Factory(t) { return new (t || ToastModule)(); }, imports: [[CommonModule, RippleModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ToastModule, { declarations: function () { return [Toast, ToastItem]; }, imports: function () { return [CommonModule, RippleModule]; }, exports: function () { return [Toast, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RippleModule],
                exports: [Toast, SharedModule],
                declarations: [Toast, ToastItem]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Toast, ToastItem, ToastModule };

//# sourceMappingURL=primeng-toast.js.map