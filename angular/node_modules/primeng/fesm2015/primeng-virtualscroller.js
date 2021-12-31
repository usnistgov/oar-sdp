import { EventEmitter, ElementRef, Input, ContentChild, ContentChildren, ViewChild, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let VirtualScroller = class VirtualScroller {
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
};
VirtualScroller.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], VirtualScroller.prototype, "value", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "itemSize", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "style", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "styleClass", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "scrollHeight", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "lazy", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "rows", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "minBufferPx", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "maxBufferPx", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "trackBy", void 0);
__decorate([
    ContentChild(Header)
], VirtualScroller.prototype, "header", void 0);
__decorate([
    ContentChild(Footer)
], VirtualScroller.prototype, "footer", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], VirtualScroller.prototype, "templates", void 0);
__decorate([
    ViewChild(CdkVirtualScrollViewport)
], VirtualScroller.prototype, "viewport", void 0);
__decorate([
    Output()
], VirtualScroller.prototype, "onLazyLoad", void 0);
__decorate([
    Input()
], VirtualScroller.prototype, "totalRecords", null);
__decorate([
    Input()
], VirtualScroller.prototype, "first", null);
__decorate([
    Input()
], VirtualScroller.prototype, "cache", null);
VirtualScroller = __decorate([
    Component({
        selector: 'p-virtualScroller',
        template: `
        <div [ngClass]="'ui-virtualscroller ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-virtualscroller-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <div #content class="ui-virtualscroller-content ui-widget-content">
                <div class="ui-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; ">
                            <div [ngStyle]="{'height': itemSize + 'px'}" class="ui-virtualscroller-item">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </div>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </div>
            </div>
            <div class="ui-virtualscroller-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], VirtualScroller);
let VirtualScrollerModule = class VirtualScrollerModule {
};
VirtualScrollerModule = __decorate([
    NgModule({
        imports: [CommonModule, ScrollingModule],
        exports: [VirtualScroller, SharedModule, ScrollingModule],
        declarations: [VirtualScroller]
    })
], VirtualScrollerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScroller, VirtualScrollerModule };
//# sourceMappingURL=primeng-virtualscroller.js.map
