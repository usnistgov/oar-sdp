var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, TemplateRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'primeng/api';
var Paginator = /** @class */ (function () {
    function Paginator(cd) {
        this.cd = cd;
        this.pageLinkSize = 5;
        this.onPageChange = new EventEmitter();
        this.alwaysShow = true;
        this.dropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.totalRecords = 0;
        this.rows = 0;
        this._first = 0;
    }
    Paginator.prototype.ngOnInit = function () {
        this.updatePaginatorState();
    };
    Paginator.prototype.ngOnChanges = function (simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
    };
    Object.defineProperty(Paginator.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.updateRowsPerPageOptions = function () {
        var e_1, _a;
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            try {
                for (var _b = __values(this.rowsPerPageOptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (typeof opt == 'object' && opt['showAll']) {
                        this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                    }
                    else {
                        this.rowsPerPageItems.push({ label: String(opt), value: opt });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    Paginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    Paginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    Paginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    };
    Paginator.prototype.updateFirst = function () {
        var _this = this;
        var page = this.getPage();
        if (page > 0 && this.totalRecords && (this.first >= this.totalRecords)) {
            Promise.resolve(null).then(function () { return _this.changePage(page - 1); });
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function (event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    };
    Paginator.prototype.changePageToPrev = function (event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    };
    Paginator.prototype.changePageToNext = function (event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    };
    Paginator.prototype.changePageToLast = function (event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    };
    Paginator.prototype.onPageLinkClick = function (event, page) {
        this.changePage(page);
        event.preventDefault();
    };
    Paginator.prototype.onRppChange = function (event) {
        this.changePage(this.getPage());
    };
    Paginator.prototype.updatePaginatorState = function () {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    };
    Object.defineProperty(Paginator.prototype, "currentPageReport", {
        get: function () {
            return this.currentPageReportTemplate
                .replace("{currentPage}", String(this.getPage() + 1))
                .replace("{totalPages}", String(this.getPageCount()))
                .replace("{first}", String(this._first + 1))
                .replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords)))
                .replace("{rows}", String(this.rows))
                .replace("{totalRecords}", String(this.totalRecords));
        },
        enumerable: true,
        configurable: true
    });
    Paginator.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Paginator.prototype, "pageLinkSize", void 0);
    __decorate([
        Output()
    ], Paginator.prototype, "onPageChange", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "style", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "alwaysShow", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "templateLeft", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "templateRight", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "dropdownAppendTo", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "dropdownScrollHeight", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "currentPageReportTemplate", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "showCurrentPageReport", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "totalRecords", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "rows", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        Input()
    ], Paginator.prototype, "first", null);
    Paginator = __decorate([
        Component({
            selector: 'p-paginator',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'\"\n            *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\">\n            <div class=\"ui-paginator-left-content\" *ngIf=\"templateLeft\">\n                <ng-container *ngTemplateOutlet=\"templateLeft; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n            <span class=\"ui-paginator-current\" *ngIf=\"showCurrentPageReport\">{{currentPageReport}}</span>\n            <a [attr.tabindex]=\"isFirstPage() ? null : '0'\" class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToFirst($event)\" (keydown.enter)=\"changePageToFirst($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-backward\"></span>\n            </a>\n            <a tabindex=\"0\" [attr.tabindex]=\"isFirstPage() ? null : '0'\" class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToPrev($event)\" (keydown.enter)=\"changePageToPrev($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-left\"></span>\n            </a>\n            <span class=\"ui-paginator-pages\">\n                <a tabindex=\"0\" *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"onPageLinkClick($event, pageLink - 1)\" (keydown.enter)=\"onPageLinkClick($event, pageLink - 1)\" [ngClass]=\"{'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</a>\n            </span>\n            <a [attr.tabindex]=\"isLastPage() ? null : '0'\" class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToNext($event)\" (keydown.enter)=\"changePageToNext($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-right\"></span>\n            </a>\n            <a [attr.tabindex]=\"isLastPage() ? null : '0'\" class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToLast($event)\" (keydown.enter)=\"changePageToLast($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-forward\"></span>\n            </a>\n            <p-dropdown [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" \n                (onChange)=\"onRppChange($event)\" [appendTo]=\"dropdownAppendTo\" [scrollHeight]=\"dropdownScrollHeight\"></p-dropdown>\n            <div class=\"ui-paginator-right-content\" *ngIf=\"templateRight\">\n                <ng-container *ngTemplateOutlet=\"templateRight; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Paginator);
    return Paginator;
}());
export { Paginator };
var PaginatorModule = /** @class */ (function () {
    function PaginatorModule() {
    }
    PaginatorModule = __decorate([
        NgModule({
            imports: [CommonModule, DropdownModule, FormsModule, SharedModule],
            exports: [Paginator, DropdownModule, FormsModule, SharedModule],
            declarations: [Paginator]
        })
    ], PaginatorModule);
    return PaginatorModule;
}());
export { PaginatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYWdpbmF0b3IvIiwic291cmNlcyI6WyJwYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxhQUFhLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQXdDekM7SUFzQ0ksbUJBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcENoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV4QixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTXRELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFRM0IseUJBQW9CLEdBQVcsT0FBTyxDQUFDO1FBRXZDLDhCQUF5QixHQUFXLCtCQUErQixDQUFDO1FBSXBFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFVMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUV5QixDQUFDO0lBRTdDLDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLFlBQTJCO1FBQ25DLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFD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LENBQUMsWUFBWSxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsWUFBWSxDQUFDO1lBQy9ELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLFlBQVksQ0FBQztZQUM1RCxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDNUIsQ0FBQztPQUNXLGVBQWUsQ0FBSTtJQUFELHNCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LE9uSW5pdCxJbnB1dCxPdXRwdXQsQ2hhbmdlRGV0ZWN0b3JSZWYsRXZlbnRFbWl0dGVyLFRlbXBsYXRlUmVmLE9uQ2hhbmdlcyxTaW1wbGVDaGFuZ2VzLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEcm9wZG93bk1vZHVsZX0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQge1NlbGVjdEl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYWdpbmF0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1wYWdpbmF0b3IgdWktd2lkZ2V0IHVpLXdpZGdldC1oZWFkZXIgdWktdW5zZWxlY3RhYmxlLXRleHQgdWktaGVscGVyLWNsZWFyZml4J1wiXG4gICAgICAgICAgICAqbmdJZj1cImFsd2F5c1Nob3cgPyB0cnVlIDogKHBhZ2VMaW5rcyAmJiBwYWdlTGlua3MubGVuZ3RoID4gMSlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItbGVmdC1jb250ZW50XCIgKm5nSWY9XCJ0ZW1wbGF0ZUxlZnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVMZWZ0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBwYWdpbmF0b3JTdGF0ZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItY3VycmVudFwiICpuZ0lmPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCI+e3tjdXJyZW50UGFnZVJlcG9ydH19PC9zcGFuPlxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNGaXJzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1maXJzdCB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvRmlyc3QoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZVBhZ2VUb0ZpcnN0KCRldmVudClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0ZpcnN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1zdGVwLWJhY2t3YXJkXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgW2F0dHIudGFiaW5kZXhdPVwiaXNGaXJzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1wcmV2IHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0ZpcnN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1jYXJldC1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcGFnZXNcIj5cbiAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAqbmdGb3I9XCJsZXQgcGFnZUxpbmsgb2YgcGFnZUxpbmtzXCIgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcGFnZSB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25QYWdlTGlua0NsaWNrKCRldmVudCwgcGFnZUxpbmsgLSAxKVwiIChrZXlkb3duLmVudGVyKT1cIm9uUGFnZUxpbmtDbGljaygkZXZlbnQsIHBhZ2VMaW5rIC0gMSlcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6IChwYWdlTGluay0xID09IGdldFBhZ2UoKSl9XCI+e3twYWdlTGlua319PC9hPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLW5leHQgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVBhZ2VUb05leHQoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZVBhZ2VUb05leHQoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmlzTGFzdFBhZ2UoKX1cIiBbdGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1jYXJldC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIFthdHRyLnRhYmluZGV4XT1cImlzTGFzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1sYXN0IHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9MYXN0KCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjaGFuZ2VQYWdlVG9MYXN0KCRldmVudClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0xhc3RQYWdlKCl9XCIgW3RhYmluZGV4XT1cImlzTGFzdFBhZ2UoKSA/IC0xIDogbnVsbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLWljb24gcGkgcGktc3RlcC1mb3J3YXJkXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHAtZHJvcGRvd24gW29wdGlvbnNdPVwicm93c1BlclBhZ2VJdGVtc1wiIFsobmdNb2RlbCldPVwicm93c1wiICpuZ0lmPVwicm93c1BlclBhZ2VPcHRpb25zXCIgXG4gICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uUnBwQ2hhbmdlKCRldmVudClcIiBbYXBwZW5kVG9dPVwiZHJvcGRvd25BcHBlbmRUb1wiIFtzY3JvbGxIZWlnaHRdPVwiZHJvcGRvd25TY3JvbGxIZWlnaHRcIj48L3AtZHJvcGRvd24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGFnaW5hdG9yLXJpZ2h0LWNvbnRlbnRcIiAqbmdJZj1cInRlbXBsYXRlUmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVSaWdodDsgY29udGV4dDogeyRpbXBsaWNpdDogcGFnaW5hdG9yU3RhdGV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtTaXplOiBudW1iZXIgPSA1O1xuXG4gICAgQE91dHB1dCgpIG9uUGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYWx3YXlzU2hvdzogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgdGVtcGxhdGVMZWZ0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICAgIEBJbnB1dCgpIHRlbXBsYXRlUmlnaHQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoKSBkcm9wZG93bkFwcGVuZFRvOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkcm9wZG93blNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcblxuICAgIEBJbnB1dCgpIGN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGU6IHN0cmluZyA9ICd7Y3VycmVudFBhZ2V9IG9mIHt0b3RhbFBhZ2VzfSc7XG5cbiAgICBASW5wdXQoKSBzaG93Q3VycmVudFBhZ2VSZXBvcnQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB0b3RhbFJlY29yZHM6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXIgPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogYW55W107XG5cbiAgICBwYWdlTGlua3M6IG51bWJlcltdO1xuXG4gICAgcm93c1BlclBhZ2VJdGVtczogU2VsZWN0SXRlbVtdO1xuICAgIFxuICAgIHBhZ2luYXRvclN0YXRlOiBhbnk7XG5cbiAgICBfZmlyc3Q6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvdGFsUmVjb3Jkcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IHNpbXBsZUNoYW5nZS5maXJzdC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgZmlyc3QoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xuICAgIH1cbiAgICBzZXQgZmlyc3QodmFsOm51bWJlcikge1xuICAgICAgICB0aGlzLl9maXJzdCA9IHZhbDtcbiAgICB9XG5cbiAgICB1cGRhdGVSb3dzUGVyUGFnZU9wdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBvcHQgb2YgdGhpcy5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PSAnb2JqZWN0JyAmJiBvcHRbJ3Nob3dBbGwnXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMudW5zaGlmdCh7bGFiZWw6IG9wdFsnc2hvd0FsbCddLCB2YWx1ZTogdGhpcy50b3RhbFJlY29yZHN9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcy5wdXNoKHtsYWJlbDogU3RyaW5nKG9wdCksIHZhbHVlOiBvcHR9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpcnN0UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSgpID09PSAwO1xuICAgIH1cblxuICAgIGlzTGFzdFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gdGhpcy5nZXRQYWdlQ291bnQoKSAtIDE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUNvdW50KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxSZWNvcmRzL3RoaXMucm93cyl8fDE7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlUGFnZUxpbmtCb3VuZGFyaWVzKCkge1xuICAgICAgICBsZXQgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgIHZpc2libGVQYWdlcyA9IE1hdGgubWluKHRoaXMucGFnZUxpbmtTaXplLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICAvL2NhbGN1bGF0ZSByYW5nZSwga2VlcCBjdXJyZW50IGluIG1pZGRsZSBpZiBuZWNlc3NhcnlcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKHRoaXMuZ2V0UGFnZSgpIC0gKCh2aXNpYmxlUGFnZXMpIC8gMikpKSxcbiAgICAgICAgZW5kID0gTWF0aC5taW4obnVtYmVyT2ZQYWdlcyAtIDEsIHN0YXJ0ICsgdmlzaWJsZVBhZ2VzIC0gMSk7XG5cbiAgICAgICAgLy9jaGVjayB3aGVuIGFwcHJvYWNoaW5nIHRvIGxhc3QgcGFnZVxuICAgICAgICB2YXIgZGVsdGEgPSB0aGlzLnBhZ2VMaW5rU2l6ZSAtIChlbmQgLSBzdGFydCArIDEpO1xuICAgICAgICBzdGFydCA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gZGVsdGEpO1xuXG4gICAgICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gICAgfVxuXG4gICAgdXBkYXRlUGFnZUxpbmtzKCkge1xuICAgICAgICB0aGlzLnBhZ2VMaW5rcyA9IFtdO1xuICAgICAgICBsZXQgYm91bmRhcmllcyA9IHRoaXMuY2FsY3VsYXRlUGFnZUxpbmtCb3VuZGFyaWVzKCksXG4gICAgICAgIHN0YXJ0ID0gYm91bmRhcmllc1swXSxcbiAgICAgICAgZW5kID0gYm91bmRhcmllc1sxXTtcblxuICAgICAgICBmb3IobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wYWdlTGlua3MucHVzaChpICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlKHAgOm51bWJlcikge1xuICAgICAgICB2YXIgcGMgPSB0aGlzLmdldFBhZ2VDb3VudCgpO1xuXG4gICAgICAgIGlmIChwID49IDAgJiYgcCA8IHBjKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IHRoaXMucm93cyAqIHA7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgcGFnZTogcCxcbiAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICAgICAgcGFnZUNvdW50OiBwY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmlyc3QoKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgPiAwICYmIHRoaXMudG90YWxSZWNvcmRzICYmICh0aGlzLmZpcnN0ID49IHRoaXMudG90YWxSZWNvcmRzKSkge1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZmlyc3QgLyB0aGlzLnJvd3MpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb0ZpcnN0KGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuaXNGaXJzdFBhZ2UoKSl7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKDApO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb1ByZXYoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpIC0gMSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvTmV4dChldmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5nZXRQYWdlKCkgICsgMSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvTGFzdChldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmlzTGFzdFBhZ2UoKSl7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZUNvdW50KCkgLSAxKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VMaW5rQ2xpY2soZXZlbnQsIHBhZ2UpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uUnBwQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVBhZ2luYXRvclN0YXRlKCkge1xuICAgICAgICB0aGlzLnBhZ2luYXRvclN0YXRlID0ge1xuICAgICAgICAgICAgcGFnZTogdGhpcy5nZXRQYWdlKCksXG4gICAgICAgICAgICBwYWdlQ291bnQ6IHRoaXMuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHRvdGFsUmVjb3JkczogdGhpcy50b3RhbFJlY29yZHNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjdXJyZW50UGFnZVJlcG9ydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie2N1cnJlbnRQYWdlfVwiLCBTdHJpbmcodGhpcy5nZXRQYWdlKCkgKyAxKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt0b3RhbFBhZ2VzfVwiLCBTdHJpbmcodGhpcy5nZXRQYWdlQ291bnQoKSkpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7Zmlyc3R9XCIsIFN0cmluZyh0aGlzLl9maXJzdCArIDEpKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie2xhc3R9XCIsIFN0cmluZyhNYXRoLm1pbih0aGlzLl9maXJzdCArIHRoaXMucm93cywgdGhpcy50b3RhbFJlY29yZHMpKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcIntyb3dzfVwiLCBTdHJpbmcodGhpcy5yb3dzKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt0b3RhbFJlY29yZHN9XCIsIFN0cmluZyh0aGlzLnRvdGFsUmVjb3JkcykpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLERyb3Bkb3duTW9kdWxlLEZvcm1zTW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BhZ2luYXRvcixEcm9wZG93bk1vZHVsZSxGb3Jtc01vZHVsZSxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhZ2luYXRvcl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yTW9kdWxlIHsgfVxuIl19