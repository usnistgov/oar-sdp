import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, ContentChild, ContentChildren, ViewChild, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/cdk/scrolling';

function VirtualScroller_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function VirtualScroller_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 9);
    ɵngcc0.ɵɵprojection(1);
    ɵngcc0.ɵɵtemplate(2, VirtualScroller_div_1_ng_container_2_Template, 1, 0, "ng-container", 10);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate);
} }
function VirtualScroller_ng_container_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { "height": a0 }; };
const _c1 = function (a0, a1, a2, a3, a4, a5, a6) { return { $implicit: a0, index: a1, count: a2, first: a3, last: a4, even: a5, odd: a6 }; };
function VirtualScroller_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "div", 11);
    ɵngcc0.ɵɵtemplate(2, VirtualScroller_ng_container_7_ng_container_2_Template, 1, 0, "ng-container", 12);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const c_r8 = ctx.count;
    const f_r9 = ctx.first;
    const l_r10 = ctx.last;
    const e_r11 = ctx.even;
    const o_r12 = ctx.odd;
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(3, _c0, ctx_r3.itemSize + "px"));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", item_r6 ? ctx_r3.itemTemplate : ctx_r3.loadingItemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction7(5, _c1, item_r6, i_r7, c_r8, f_r9, l_r10, e_r11, o_r12));
} }
function VirtualScroller_div_8_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function VirtualScroller_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 13);
    ɵngcc0.ɵɵprojection(1, 1);
    ɵngcc0.ɵɵtemplate(2, VirtualScroller_div_8_ng_container_2_Template, 1, 0, "ng-container", 10);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r4.footerTemplate);
} }
const _c2 = [[["p-header"]], [["p-footer"]]];
const _c3 = ["p-header", "p-footer"];
class VirtualScroller {
    constructor(el) {
        this.el = el;
        this.trackBy = (index, item) => item;
        this.onLazyLoad = new EventEmitter();
        this._totalRecords = 0;
        this.page = 0;
        this._first = 0;
        this.loadedPages = [];
    }
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
    }
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
        console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
    }
    get cache() {
        return this._cache;
    }
    set cache(val) {
        this._cache = val;
        console.log("cache is deprecated as it is always on.");
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    this.loadingItemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onScrollIndexChange(index) {
        if (this.lazy) {
            let pageRange = this.createPageRange(Math.floor(index / this.rows));
            pageRange.forEach(page => this.loadPage(page));
        }
    }
    createPageRange(page) {
        let range = [];
        if (page !== 0) {
            range.push(page - 1);
        }
        range.push(page);
        if (page !== (Math.ceil(this.value.length / this.rows) - 1)) {
            range.push(page + 1);
        }
        return range;
    }
    loadPage(page) {
        if (!this.loadedPages.includes(page)) {
            this.onLazyLoad.emit({ first: this.rows * page, rows: this.rows });
            this.loadedPages.push(page);
        }
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    //@deprecated
    scrollTo(index, mode) {
        this.scrollToIndex(index, mode);
    }
    scrollToIndex(index, mode) {
        if (this.viewport) {
            this.viewport.scrollToIndex(index, mode);
        }
    }
    clearCache() {
        this.loadedPages = [];
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            if (!this.lazy) {
                this.clearCache();
            }
        }
    }
}
VirtualScroller.ɵfac = function VirtualScroller_Factory(t) { return new (t || VirtualScroller)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
VirtualScroller.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: VirtualScroller, selectors: [["p-virtualScroller"]], contentQueries: function VirtualScroller_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, Header, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, Footer, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.header = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.footer = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function VirtualScroller_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(CdkVirtualScrollViewport, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.viewport = _t.first);
    } }, inputs: { trackBy: "trackBy", totalRecords: "totalRecords", first: "first", cache: "cache", value: "value", itemSize: "itemSize", style: "style", styleClass: "styleClass", scrollHeight: "scrollHeight", lazy: "lazy", rows: "rows", minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx" }, outputs: { onLazyLoad: "onLazyLoad" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c3, decls: 9, vars: 14, consts: [[3, "ngClass", "ngStyle"], ["class", "p-virtualscroller-header", 4, "ngIf"], [1, "p-virtualscroller-content"], ["content", ""], [1, "p-virtualscroller-list"], [3, "ngStyle", "itemSize", "minBufferPx", "maxBufferPx", "scrolledIndexChange"], ["viewport", ""], [4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTrackBy"], ["class", "p-virtualscroller-footer", 4, "ngIf"], [1, "p-virtualscroller-header"], [4, "ngTemplateOutlet"], [1, "p-virtualscroller-item", 3, "ngStyle"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-virtualscroller-footer"]], template: function VirtualScroller_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c2);
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, VirtualScroller_div_1_Template, 3, 1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2, 3);
        ɵngcc0.ɵɵelementStart(4, "div", 4);
        ɵngcc0.ɵɵelementStart(5, "cdk-virtual-scroll-viewport", 5, 6);
        ɵngcc0.ɵɵlistener("scrolledIndexChange", function VirtualScroller_Template_cdk_virtual_scroll_viewport_scrolledIndexChange_5_listener($event) { return ctx.onScrollIndexChange($event); });
        ɵngcc0.ɵɵtemplate(7, VirtualScroller_ng_container_7_Template, 3, 13, "ng-container", 7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(8, VirtualScroller_div_8_Template, 3, 1, "div", 8);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-virtualscroller p-component")("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.header || ctx.headerTemplate);
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(12, _c0, ctx.scrollHeight))("itemSize", ctx.itemSize)("minBufferPx", ctx.minBufferPx)("maxBufferPx", ctx.maxBufferPx);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("cdkVirtualForOf", ctx.value)("cdkVirtualForTrackBy", ctx.trackBy);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.footer || ctx.footerTemplate);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc2.CdkVirtualScrollViewport, ɵngcc2.CdkFixedSizeVirtualScroll, ɵngcc2.CdkVirtualForOf, ɵngcc1.NgTemplateOutlet], encapsulation: 2 });
VirtualScroller.ctorParameters = () => [
    { type: ElementRef }
];
VirtualScroller.propDecorators = {
    value: [{ type: Input }],
    itemSize: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    scrollHeight: [{ type: Input }],
    lazy: [{ type: Input }],
    rows: [{ type: Input }],
    minBufferPx: [{ type: Input }],
    maxBufferPx: [{ type: Input }],
    trackBy: [{ type: Input }],
    header: [{ type: ContentChild, args: [Header,] }],
    footer: [{ type: ContentChild, args: [Footer,] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    viewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport,] }],
    onLazyLoad: [{ type: Output }],
    totalRecords: [{ type: Input }],
    first: [{ type: Input }],
    cache: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(VirtualScroller, [{
        type: Component,
        args: [{
                selector: 'p-virtualScroller',
                template: `
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content">
                <div class="p-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd;">
                            <div [ngStyle]="{'height': itemSize + 'px'}" class="p-virtualscroller-item">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </div>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </div>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.Default,
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { trackBy: [{
            type: Input
        }], onLazyLoad: [{
            type: Output
        }], totalRecords: [{
            type: Input
        }], first: [{
            type: Input
        }], cache: [{
            type: Input
        }], value: [{
            type: Input
        }], itemSize: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], scrollHeight: [{
            type: Input
        }], lazy: [{
            type: Input
        }], rows: [{
            type: Input
        }], minBufferPx: [{
            type: Input
        }], maxBufferPx: [{
            type: Input
        }], header: [{
            type: ContentChild,
            args: [Header]
        }], footer: [{
            type: ContentChild,
            args: [Footer]
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }], viewport: [{
            type: ViewChild,
            args: [CdkVirtualScrollViewport]
        }] }); })();
class VirtualScrollerModule {
}
VirtualScrollerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: VirtualScrollerModule });
VirtualScrollerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function VirtualScrollerModule_Factory(t) { return new (t || VirtualScrollerModule)(); }, imports: [[CommonModule, ScrollingModule], SharedModule, ScrollingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(VirtualScrollerModule, { declarations: function () { return [VirtualScroller]; }, imports: function () { return [CommonModule, ScrollingModule]; }, exports: function () { return [VirtualScroller, SharedModule, ScrollingModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(VirtualScrollerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, ScrollingModule],
                exports: [VirtualScroller, SharedModule, ScrollingModule],
                declarations: [VirtualScroller]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScroller, VirtualScrollerModule };

//# sourceMappingURL=primeng-virtualscroller.js.map