var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterContentInit, Input, Output, ViewChild, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
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
export { VirtualScroller };
let VirtualScrollerModule = class VirtualScrollerModule {
};
VirtualScrollerModule = __decorate([
    NgModule({
        imports: [CommonModule, ScrollingModule],
        exports: [VirtualScroller, SharedModule, ScrollingModule],
        declarations: [VirtualScroller]
    })
], VirtualScrollerModule);
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbHNjcm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy92aXJ0dWFsc2Nyb2xsZXIvIiwic291cmNlcyI6WyJ2aXJ0dWFsc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsdUJBQXVCLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwTixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUE0QmhGLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUE4Q3hCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBMUJ4QixZQUFPLEdBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFVdEQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTdELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFFakIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixnQkFBVyxHQUFhLEVBQUUsQ0FBQztJQUlTLENBQUM7SUFFNUIsSUFBSSxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFH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QUFNUTtJQUFSLEtBQUssRUFBRTs0Q0FFUDtBQU1RO0lBQVIsS0FBSyxFQUFFOzRDQUVQO0FBbEVRLGVBQWU7SUF6QjNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9CUjtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxlQUFlLENBZ0ozQjtTQWhKWSxlQUFlO0FBdUo1QixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtDQUFJLENBQUE7QUFBekIscUJBQXFCO0lBTGpDLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7UUFDdkMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7UUFDdkQsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO0tBQ2xDLENBQUM7R0FDVyxxQkFBcUIsQ0FBSTtTQUF6QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyQ29udGVudEluaXQsSW5wdXQsT3V0cHV0LFZpZXdDaGlsZCxFdmVudEVtaXR0ZXIsQ29udGVudENoaWxkLENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsVGVtcGxhdGVSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksT25DaGFuZ2VzLFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0hlYWRlcixGb290ZXIsUHJpbWVUZW1wbGF0ZSxTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U2Nyb2xsaW5nTW9kdWxlLENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC12aXJ0dWFsU2Nyb2xsZXInLFxuICAgIHRlbXBsYXRlOmBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdmlydHVhbHNjcm9sbGVyIHVpLXdpZGdldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIiAqbmdJZj1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCAjdmlld3BvcnQgW25nU3R5bGVdPVwieydoZWlnaHQnOiBzY3JvbGxIZWlnaHR9XCIgW2l0ZW1TaXplXT1cIml0ZW1TaXplXCIgW21pbkJ1ZmZlclB4XT1cIm1pbkJ1ZmZlclB4XCIgW21heEJ1ZmZlclB4XT1cIm1heEJ1ZmZlclB4XCIgKHNjcm9sbGVkSW5kZXhDaGFuZ2UpPVwib25TY3JvbGxJbmRleENoYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IHRyYWNrQnk6IHRyYWNrQnk7IGxldCBpID0gaW5kZXg7IGxldCBjID0gY291bnQ7IGxldCBmID0gZmlyc3Q7IGxldCBsID0gbGFzdDsgbGV0IGUgPSBldmVuOyBsZXQgbyA9IG9kZDsgXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IGl0ZW1TaXplICsgJ3B4J31cIiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtID8gaXRlbVRlbXBsYXRlIDogbG9hZGluZ0l0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGksIGNvdW50OiBjLCBmaXJzdDogZiwgbGFzdDogbCwgZXZlbjogZSwgb2RkOiBvfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWZvb3RlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1ib3R0b21cIiAqbmdJZj1cImZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQmxvY2thYmxlVUksT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7IFxuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IGFueTtcblxuICAgIEBJbnB1dCgpIGxhenk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtaW5CdWZmZXJQeDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4QnVmZmVyUHg6IG51bWJlcjtcbiAgXG4gICAgQElucHV0KCkgdHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuICAgICAgICAgICAgICAgIFxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXI6IEhlYWRlcjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXI6IEZvb3RlcjtcbiAgICBcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBAVmlld0NoaWxkKENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkgdmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcblxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGxvYWRpbmdJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBfdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgcGFnZTogbnVtYmVyID0gMDtcblxuICAgIF9maXJzdDogbnVtYmVyID0gMDtcblxuICAgIGxvYWRlZFBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgX2NhY2hlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgQElucHV0KCkgZ2V0IHRvdGFsUmVjb3JkcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG90YWxSZWNvcmRzO1xuICAgIH1cbiAgICBzZXQgdG90YWxSZWNvcmRzKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsUmVjb3JkcyA9IHZhbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b3RhbFJlY29yZHMgaXMgZGVwcmVjYXRlZCwgcHJvdmlkZSBhIHZhbHVlIHdpdGggdGhlIGxlbmd0aCBvZiB2aXJ0dWFsIGl0ZW1zIGluc3RlYWQuXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBmaXJzdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3Q7XG4gICAgfVxuICAgIHNldCBmaXJzdCh2YWw6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gdmFsO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHVzZSBzY3JvbGxUb0luZGV4IGZ1bmN0aW9uIHRvIHNjcm9sbCBhIHNwZWNpZmljIGl0ZW0uXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBjYWNoZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICAgIH1cbiAgICBzZXQgY2FjaGUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gdmFsO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhY2hlIGlzIGRlcHJlY2F0ZWQgYXMgaXQgaXMgYWx3YXlzIG9uLlwiKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5nSXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0l0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNjcm9sbEluZGV4Q2hhbmdlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgbGV0IHBhZ2VSYW5nZSA9IHRoaXMuY3JlYXRlUGFnZVJhbmdlKE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLnJvd3MpKTtcbiAgICAgICAgICAgIHBhZ2VSYW5nZS5mb3JFYWNoKHBhZ2UgPT4gdGhpcy5sb2FkUGFnZShwYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlUmFuZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCByYW5nZTogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBpZiAocGFnZSAhPT0gMCkge1xuICAgICAgICAgICAgcmFuZ2UucHVzaChwYWdlIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UucHVzaChwYWdlKTtcbiAgICAgICAgaWYgKHBhZ2UgIT09IChNYXRoLmNlaWwodGhpcy52YWx1ZS5sZW5ndGggLyB0aGlzLnJvd3MpIC0gMSkpIHtcbiAgICAgICAgICAgIHJhbmdlLnB1c2gocGFnZSArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVkUGFnZXMuaW5jbHVkZXMocGFnZSkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtmaXJzdDogdGhpcy5yb3dzICogcGFnZSwgcm93czogdGhpcy5yb3dzfSk7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZFBhZ2VzLnB1c2gocGFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgLy9AZGVwcmVjYXRlZFxuICAgIHNjcm9sbFRvKGluZGV4OiBudW1iZXIsIG1vZGU/OiBTY3JvbGxCZWhhdmlvcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcm9sbFRvSW5kZXgoaW5kZXgsIG1vZGUpO1xuICAgIH1cblxuICAgIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgbW9kZT86IFNjcm9sbEJlaGF2aW9yKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvSW5kZXgoaW5kZXgsIG1vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJDYWNoZSgpIHtcbiAgICAgICAgdGhpcy5sb2FkZWRQYWdlcyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubGF6eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2Nyb2xsaW5nTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVmlydHVhbFNjcm9sbGVyLFNoYXJlZE1vZHVsZSxTY3JvbGxpbmdNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1ZpcnR1YWxTY3JvbGxlcl1cbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbGVyTW9kdWxlIHsgfVxuXG4iXX0=