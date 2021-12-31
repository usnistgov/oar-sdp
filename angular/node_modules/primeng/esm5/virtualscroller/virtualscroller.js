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
var VirtualScroller = /** @class */ (function () {
    function VirtualScroller(el) {
        this.el = el;
        this.trackBy = function (index, item) { return item; };
        this.onLazyLoad = new EventEmitter();
        this._totalRecords = 0;
        this.page = 0;
        this._first = 0;
        this.loadedPages = [];
    }
    Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroller.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
            console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroller.prototype, "cache", {
        get: function () {
            return this._cache;
        },
        set: function (val) {
            this._cache = val;
            console.log("cache is deprecated as it is always on.");
        },
        enumerable: true,
        configurable: true
    });
    VirtualScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    _this.loadingItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    VirtualScroller.prototype.onScrollIndexChange = function (index) {
        var _this = this;
        if (this.lazy) {
            var pageRange = this.createPageRange(Math.floor(index / this.rows));
            pageRange.forEach(function (page) { return _this.loadPage(page); });
        }
    };
    VirtualScroller.prototype.createPageRange = function (page) {
        var range = [];
        if (page !== 0) {
            range.push(page - 1);
        }
        range.push(page);
        if (page !== (Math.ceil(this.value.length / this.rows) - 1)) {
            range.push(page + 1);
        }
        return range;
    };
    VirtualScroller.prototype.loadPage = function (page) {
        if (!this.loadedPages.includes(page)) {
            this.onLazyLoad.emit({ first: this.rows * page, rows: this.rows });
            this.loadedPages.push(page);
        }
    };
    VirtualScroller.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    //@deprecated
    VirtualScroller.prototype.scrollTo = function (index, mode) {
        this.scrollToIndex(index, mode);
    };
    VirtualScroller.prototype.scrollToIndex = function (index, mode) {
        if (this.viewport) {
            this.viewport.scrollToIndex(index, mode);
        }
    };
    VirtualScroller.prototype.clearCache = function () {
        this.loadedPages = [];
    };
    VirtualScroller.prototype.ngOnChanges = function (simpleChange) {
        if (simpleChange.value) {
            if (!this.lazy) {
                this.clearCache();
            }
        }
    };
    VirtualScroller.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n        <div [ngClass]=\"'ui-virtualscroller ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-virtualscroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div #content class=\"ui-virtualscroller-content ui-widget-content\">\n                <div class=\"ui-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <div [ngStyle]=\"{'height': itemSize + 'px'}\" class=\"ui-virtualscroller-item\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </div>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </div>\n            </div>\n            <div class=\"ui-virtualscroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], VirtualScroller);
    return VirtualScroller;
}());
export { VirtualScroller };
var VirtualScrollerModule = /** @class */ (function () {
    function VirtualScrollerModule() {
    }
    VirtualScrollerModule = __decorate([
        NgModule({
            imports: [CommonModule, ScrollingModule],
            exports: [VirtualScroller, SharedModule, ScrollingModule],
            declarations: [VirtualScroller]
        })
    ], VirtualScrollerModule);
    return VirtualScrollerModule;
}());
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbHNjcm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy92aXJ0dWFsc2Nyb2xsZXIvIiwic291cmNlcyI6WyJ2aXJ0dWFsc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsdUJBQXVCLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwTixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUE0QmhGO0lBOENJLHlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTFCeEIsWUFBTyxHQUFhLFVBQUMsS0FBYSxFQUFFLElBQVMsSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7UUFVdEQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTdELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFFakIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixnQkFBVyxHQUFhLEVBQUUsQ0FBQztJQUlTLENBQUM7SUFFNUIsc0JBQUkseUNBQVk7YUFBaEI7WUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQUNELFVBQWlCLEdBQVc7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7WUFDekIsT0FBTyxD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O3FEQUFvQztJQUU5RDtRQUFULE1BQU0sRUFBRTt1REFBb0Q7SUFrQnBEO1FBQVIsS0FBSyxFQUFFO3VEQUVQO0lBTVE7UUFBUixLQUFLLEVBQUU7Z0RBRVA7SUFNUTtRQUFSLEtBQUssRUFBRTtnREFFUDtJQWxFUSxlQUFlO1FBekIzQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBQyxzaERBb0JSO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLGVBQWUsQ0FnSjNCO0lBQUQsc0JBQUM7Q0FBQSxBQWhKRCxJQWdKQztTQWhKWSxlQUFlO0FBdUo1QjtJQUFBO0lBQXFDLENBQUM7SUFBekIscUJBQXFCO1FBTGpDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7WUFDdkQsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO1NBQ2xDLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlckNvbnRlbnRJbml0LElucHV0LE91dHB1dCxWaWV3Q2hpbGQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LE9uQ2hhbmdlcyxTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIZWFkZXIsRm9vdGVyLFByaW1lVGVtcGxhdGUsU2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1Njcm9sbGluZ01vZHVsZSxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtCbG9ja2FibGVVSX0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdmlydHVhbFNjcm9sbGVyJyxcbiAgICB0ZW1wbGF0ZTpgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXZpcnR1YWxzY3JvbGxlciB1aS13aWRnZXQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1oZWFkZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItdG9wXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQgI3ZpZXdwb3J0IFtuZ1N0eWxlXT1cInsnaGVpZ2h0Jzogc2Nyb2xsSGVpZ2h0fVwiIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiIFttaW5CdWZmZXJQeF09XCJtaW5CdWZmZXJQeFwiIFttYXhCdWZmZXJQeF09XCJtYXhCdWZmZXJQeFwiIChzY3JvbGxlZEluZGV4Q2hhbmdlKT1cIm9uU2Nyb2xsSW5kZXhDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqY2RrVmlydHVhbEZvcj1cImxldCBpdGVtIG9mIHZhbHVlOyB0cmFja0J5OiB0cmFja0J5OyBsZXQgaSA9IGluZGV4OyBsZXQgYyA9IGNvdW50OyBsZXQgZiA9IGZpcnN0OyBsZXQgbCA9IGxhc3Q7IGxldCBlID0gZXZlbjsgbGV0IG8gPSBvZGQ7IFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCIgY2xhc3M9XCJ1aS12aXJ0dWFsc2Nyb2xsZXItaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbSA/IGl0ZW1UZW1wbGF0ZSA6IGxvYWRpbmdJdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpLCBjb3VudDogYywgZmlyc3Q6IGYsIGxhc3Q6IGwsIGV2ZW46IGUsIG9kZDogb31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1mb290ZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYm90dG9tXCIgKm5nSWY9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJLE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XG5cbiAgICBASW5wdXQoKSBpdGVtU2l6ZTogbnVtYmVyOyBcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBhbnk7XG5cbiAgICBASW5wdXQoKSBsYXp5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWluQnVmZmVyUHg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heEJ1ZmZlclB4OiBudW1iZXI7XG4gIFxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcbiAgICAgICAgICAgICAgICBcbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyOiBIZWFkZXI7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyOiBGb290ZXI7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZChDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBsb2FkaW5nSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgX3RvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcblxuICAgIHBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBfZmlyc3Q6IG51bWJlciA9IDA7XG5cbiAgICBsb2FkZWRQYWdlczogbnVtYmVyW10gPSBbXTtcblxuICAgIF9jYWNoZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cblxuICAgIEBJbnB1dCgpIGdldCB0b3RhbFJlY29yZHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcbiAgICB9XG4gICAgc2V0IHRvdGFsUmVjb3Jkcyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidG90YWxSZWNvcmRzIGlzIGRlcHJlY2F0ZWQsIHByb3ZpZGUgYSB2YWx1ZSB3aXRoIHRoZSBsZW5ndGggb2YgdmlydHVhbCBpdGVtcyBpbnN0ZWFkLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgZmlyc3QoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xuICAgIH1cbiAgICBzZXQgZmlyc3QodmFsOm51bWJlcikge1xuICAgICAgICB0aGlzLl9maXJzdCA9IHZhbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCB1c2Ugc2Nyb2xsVG9JbmRleCBmdW5jdGlvbiB0byBzY3JvbGwgYSBzcGVjaWZpYyBpdGVtLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgY2FjaGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZTtcbiAgICB9XG4gICAgc2V0IGNhY2hlKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHZhbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWNoZSBpcyBkZXByZWNhdGVkIGFzIGl0IGlzIGFsd2F5cyBvbi5cIik7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ0l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdJdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TY3JvbGxJbmRleENoYW5nZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIGxldCBwYWdlUmFuZ2UgPSB0aGlzLmNyZWF0ZVBhZ2VSYW5nZShNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5yb3dzKSk7XG4gICAgICAgICAgICBwYWdlUmFuZ2UuZm9yRWFjaChwYWdlID0+IHRoaXMubG9hZFBhZ2UocGFnZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZVJhbmdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICBsZXQgcmFuZ2U6IG51bWJlcltdID0gW107XG5cbiAgICAgICAgaWYgKHBhZ2UgIT09IDApIHtcbiAgICAgICAgICAgIHJhbmdlLnB1c2gocGFnZSAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlLnB1c2gocGFnZSk7XG4gICAgICAgIGlmIChwYWdlICE9PSAoTWF0aC5jZWlsKHRoaXMudmFsdWUubGVuZ3RoIC8gdGhpcy5yb3dzKSAtIDEpKSB7XG4gICAgICAgICAgICByYW5nZS5wdXNoKHBhZ2UgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYW5nZTtcbiAgICB9XG5cbiAgICBsb2FkUGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZFBhZ2VzLmluY2x1ZGVzKHBhZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh7Zmlyc3Q6IHRoaXMucm93cyAqIHBhZ2UsIHJvd3M6IHRoaXMucm93c30pO1xuICAgICAgICAgICAgdGhpcy5sb2FkZWRQYWdlcy5wdXNoKHBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIC8vQGRlcHJlY2F0ZWRcbiAgICBzY3JvbGxUbyhpbmRleDogbnVtYmVyLCBtb2RlPzogU2Nyb2xsQmVoYXZpb3IpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0luZGV4KGluZGV4LCBtb2RlKTtcbiAgICB9XG5cbiAgICBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIsIG1vZGU/OiBTY3JvbGxCZWhhdmlvcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy52aWV3cG9ydCkge1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxUb0luZGV4KGluZGV4LCBtb2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyQ2FjaGUoKSB7XG4gICAgICAgIHRoaXMubG9hZGVkUGFnZXMgPSBbXTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFNjcm9sbGluZ01vZHVsZV0sXG4gICAgZXhwb3J0czogW1ZpcnR1YWxTY3JvbGxlcixTaGFyZWRNb2R1bGUsU2Nyb2xsaW5nTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtWaXJ0dWFsU2Nyb2xsZXJdXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlck1vZHVsZSB7IH1cblxuIl19