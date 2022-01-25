import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/router';
import * as ɵngcc2 from '@angular/common';

function Steps_li_2_a_2_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 11);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(item_r1.label);
} }
function Steps_li_2_a_2_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 12);
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("innerHTML", item_r1.label, ɵngcc0.ɵɵsanitizeHtml);
} }
const _c0 = function () { return { exact: false }; };
function Steps_li_2_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 7);
    ɵngcc0.ɵɵlistener("click", function Steps_li_2_a_2_Template_a_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r14 = ɵngcc0.ɵɵnextContext(); const item_r1 = ctx_r14.$implicit; const i_r2 = ctx_r14.index; const ctx_r12 = ɵngcc0.ɵɵnextContext(); return ctx_r12.itemClick($event, item_r1, i_r2); })("keydown.enter", function Steps_li_2_a_2_Template_a_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r16 = ɵngcc0.ɵɵnextContext(); const item_r1 = ctx_r16.$implicit; const i_r2 = ctx_r16.index; const ctx_r15 = ɵngcc0.ɵɵnextContext(); return ctx_r15.itemClick($event, item_r1, i_r2); });
    ɵngcc0.ɵɵelementStart(1, "span", 8);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, Steps_li_2_a_2_span_3_Template, 2, 1, "span", 9);
    ɵngcc0.ɵɵtemplate(4, Steps_li_2_a_2_ng_template_4_Template, 1, 1, "ng-template", null, 10, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const _r8 = ɵngcc0.ɵɵreference(5);
    const ctx_r17 = ɵngcc0.ɵɵnextContext();
    const item_r1 = ctx_r17.$implicit;
    const i_r2 = ctx_r17.index;
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("routerLink", item_r1.routerLink)("queryParams", item_r1.queryParams)("routerLinkActive", "p-menuitem-link-active")("routerLinkActiveOptions", item_r1.routerLinkActiveOptions || ɵngcc0.ɵɵpureFunction0(16, _c0))("fragment", item_r1.fragment)("queryParamsHandling", item_r1.queryParamsHandling)("preserveFragment", item_r1.preserveFragment)("skipLocationChange", item_r1.skipLocationChange)("replaceUrl", item_r1.replaceUrl)("state", item_r1.state);
    ɵngcc0.ɵɵattribute("target", item_r1.target)("id", item_r1.id)("tabindex", item_r1.disabled || ctx_r4.readonly ? null : item_r1.tabindex ? item_r1.tabindex : "0");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(i_r2 + 1);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", item_r1.escape !== false)("ngIfElse", _r8);
} }
function Steps_li_2_ng_template_3_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 11);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(item_r1.label);
} }
function Steps_li_2_ng_template_3_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 12);
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("innerHTML", item_r1.label, ɵngcc0.ɵɵsanitizeHtml);
} }
function Steps_li_2_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 13);
    ɵngcc0.ɵɵlistener("click", function Steps_li_2_ng_template_3_Template_a_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r25 = ɵngcc0.ɵɵnextContext(); const item_r1 = ctx_r25.$implicit; const i_r2 = ctx_r25.index; const ctx_r23 = ɵngcc0.ɵɵnextContext(); return ctx_r23.itemClick($event, item_r1, i_r2); })("keydown.enter", function Steps_li_2_ng_template_3_Template_a_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r27 = ɵngcc0.ɵɵnextContext(); const item_r1 = ctx_r27.$implicit; const i_r2 = ctx_r27.index; const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.itemClick($event, item_r1, i_r2); });
    ɵngcc0.ɵɵelementStart(1, "span", 8);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, Steps_li_2_ng_template_3_span_3_Template, 2, 1, "span", 9);
    ɵngcc0.ɵɵtemplate(4, Steps_li_2_ng_template_3_ng_template_4_Template, 1, 1, "ng-template", null, 14, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const _r19 = ɵngcc0.ɵɵreference(5);
    const ctx_r28 = ɵngcc0.ɵɵnextContext();
    const item_r1 = ctx_r28.$implicit;
    const i_r2 = ctx_r28.index;
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵattribute("href", item_r1.url, ɵngcc0.ɵɵsanitizeUrl)("target", item_r1.target)("id", item_r1.id)("tabindex", item_r1.disabled || i_r2 !== ctx_r6.activeIndex && ctx_r6.readonly ? null : item_r1.tabindex ? item_r1.tabindex : "0");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(i_r2 + 1);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", item_r1.escape !== false)("ngIfElse", _r19);
} }
const _c1 = function (a0, a1) { return { "p-highlight p-steps-current": a0, "p-disabled": a1 }; };
function Steps_li_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li", 3, 4);
    ɵngcc0.ɵɵtemplate(2, Steps_li_2_a_2_Template, 6, 17, "a", 5);
    ɵngcc0.ɵɵtemplate(3, Steps_li_2_ng_template_3_Template, 6, 7, "ng-template", null, 6, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const _r5 = ɵngcc0.ɵɵreference(4);
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(item_r1.styleClass);
    ɵngcc0.ɵɵproperty("ngStyle", item_r1.style)("ngClass", ɵngcc0.ɵɵpureFunction2(8, _c1, ctx_r0.isActive(item_r1, i_r2), item_r1.disabled || ctx_r0.readonly && !ctx_r0.isActive(item_r1, i_r2)));
    ɵngcc0.ɵɵattribute("aria-selected", i_r2 === ctx_r0.activeIndex)("aria-expanded", i_r2 === ctx_r0.activeIndex);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.isClickableRouterLink(item_r1))("ngIfElse", _r5);
} }
const _c2 = function (a1) { return { "p-steps p-component": true, "p-readonly": a1 }; };
class Steps {
    constructor(router, route, cd) {
        this.router = router;
        this.route = route;
        this.cd = cd;
        this.activeIndex = 0;
        this.readonly = true;
        this.activeIndexChange = new EventEmitter();
    }
    ngOnInit() {
        this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
    }
    itemClick(event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.readonly && !item.disabled;
    }
    isActive(item, index) {
        if (item.routerLink)
            return this.router.isActive(item.routerLink, false) || this.router.isActive(this.router.createUrlTree([item.routerLink], { relativeTo: this.route }).toString(), false);
        else
            return index === this.activeIndex;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
Steps.ɵfac = function Steps_Factory(t) { return new (t || Steps)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Router), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.ActivatedRoute), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Steps.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Steps, selectors: [["p-steps"]], inputs: { activeIndex: "activeIndex", readonly: "readonly", model: "model", style: "style", styleClass: "styleClass" }, outputs: { activeIndexChange: "activeIndexChange" }, decls: 3, vars: 7, consts: [[3, "ngClass", "ngStyle"], ["role", "tablist"], ["class", "p-steps-item", "role", "tab", 3, "ngStyle", "class", "ngClass", 4, "ngFor", "ngForOf"], ["role", "tab", 1, "p-steps-item", 3, "ngStyle", "ngClass"], ["menuitem", ""], ["role", "presentation", "class", "p-menuitem-link", 3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "click", "keydown.enter", 4, "ngIf", "ngIfElse"], ["elseBlock", ""], ["role", "presentation", 1, "p-menuitem-link", 3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "click", "keydown.enter"], [1, "p-steps-number"], ["class", "p-steps-title", 4, "ngIf", "ngIfElse"], ["htmlLabel", ""], [1, "p-steps-title"], [1, "p-steps-title", 3, "innerHTML"], ["role", "presentation", 1, "p-menuitem-link", 3, "click", "keydown.enter"], ["htmlRouteLabel", ""]], template: function Steps_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "ul", 1);
        ɵngcc0.ɵɵtemplate(2, Steps_li_2_Template, 5, 11, "li", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(5, _c2, ctx.readonly))("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.model);
    } }, directives: [ɵngcc2.NgClass, ɵngcc2.NgStyle, ɵngcc2.NgForOf, ɵngcc2.NgIf, ɵngcc1.RouterLinkWithHref, ɵngcc1.RouterLinkActive], styles: [".p-steps{position:relative}.p-steps ul{list-style-type:none;margin:0;padding:0}.p-steps-item,.p-steps ul{display:-ms-flexbox;display:flex}.p-steps-item{-ms-flex:1 1 auto;-ms-flex-pack:center;flex:1 1 auto;justify-content:center;position:relative}.p-steps-item .p-menuitem-link{-ms-flex-align:center;-ms-flex-direction:column;align-items:center;display:-ms-inline-flexbox;display:inline-flex;flex-direction:column;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center}.p-steps-title{display:block}"], encapsulation: 2, changeDetection: 0 });
Steps.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ChangeDetectorRef }
];
Steps.propDecorators = {
    activeIndex: [{ type: Input }],
    model: [{ type: Input }],
    readonly: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    activeIndexChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Steps, [{
        type: Component,
        args: [{
                selector: 'p-steps',
                template: `
        <div [ngClass]="{'p-steps p-component':true,'p-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="p-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex"
                    [ngClass]="{'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i))}">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" [routerLink]="item.routerLink" [queryParams]="item.queryParams" role="presentation" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" 
                        (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <span class="p-steps-number">{{i + 1}}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url" class="p-menuitem-link" role="presentation" (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" 
                            [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-steps-number">{{i + 1}}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-steps{position:relative}.p-steps ul{list-style-type:none;margin:0;padding:0}.p-steps-item,.p-steps ul{display:-ms-flexbox;display:flex}.p-steps-item{-ms-flex:1 1 auto;-ms-flex-pack:center;flex:1 1 auto;justify-content:center;position:relative}.p-steps-item .p-menuitem-link{-ms-flex-align:center;-ms-flex-direction:column;align-items:center;display:-ms-inline-flexbox;display:inline-flex;flex-direction:column;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center}.p-steps-title{display:block}"]
            }]
    }], function () { return [{ type: ɵngcc1.Router }, { type: ɵngcc1.ActivatedRoute }, { type: ɵngcc0.ChangeDetectorRef }]; }, { activeIndex: [{
            type: Input
        }], readonly: [{
            type: Input
        }], activeIndexChange: [{
            type: Output
        }], model: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }] }); })();
class StepsModule {
}
StepsModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: StepsModule });
StepsModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function StepsModule_Factory(t) { return new (t || StepsModule)(); }, imports: [[CommonModule, RouterModule], RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(StepsModule, { declarations: function () { return [Steps]; }, imports: function () { return [CommonModule, RouterModule]; }, exports: function () { return [Steps, RouterModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(StepsModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RouterModule],
                exports: [Steps, RouterModule],
                declarations: [Steps]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Steps, StepsModule };

//# sourceMappingURL=primeng-steps.js.map