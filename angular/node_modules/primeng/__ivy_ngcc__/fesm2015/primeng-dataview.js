import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, Output, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils, FilterUtils } from 'primeng/utils';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/paginator';

function DataView_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 10);
    ɵngcc0.ɵɵelementStart(1, "div", 11);
    ɵngcc0.ɵɵelement(2, "i");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵclassMap("p-dataview-loading-icon pi-spin " + ctx_r0.loadingIcon);
} }
function DataView_div_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function DataView_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵprojection(1);
    ɵngcc0.ɵɵtemplate(2, DataView_div_2_ng_container_2_Template, 1, 0, "ng-container", 13);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate);
} }
function DataView_p_paginator_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "p-paginator", 14);
    ɵngcc0.ɵɵlistener("onPageChange", function DataView_p_paginator_3_Template_p_paginator_onPageChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(); return ctx_r8.paginate($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("rows", ctx_r2.rows)("first", ctx_r2.first)("totalRecords", ctx_r2.totalRecords)("pageLinkSize", ctx_r2.pageLinks)("alwaysShow", ctx_r2.alwaysShowPaginator)("rowsPerPageOptions", ctx_r2.rowsPerPageOptions)("dropdownAppendTo", ctx_r2.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r2.paginatorDropdownScrollHeight)("templateLeft", ctx_r2.paginatorLeftTemplate)("templateRight", ctx_r2.paginatorRightTemplate)("currentPageReportTemplate", ctx_r2.currentPageReportTemplate)("showCurrentPageReport", ctx_r2.showCurrentPageReport)("showJumpToPageDropdown", ctx_r2.showJumpToPageDropdown)("showPageLinks", ctx_r2.showPageLinks);
} }
function DataView_ng_template_6_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c0 = function (a0, a1) { return { $implicit: a0, rowIndex: a1 }; };
function DataView_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, DataView_ng_template_6_ng_container_0_Template, 1, 0, "ng-container", 15);
} if (rf & 2) {
    const rowData_r10 = ctx.$implicit;
    const rowIndex_r11 = ctx.index;
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r3.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction2(2, _c0, rowData_r10, rowIndex_r11));
} }
function DataView_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 16);
    ɵngcc0.ɵɵelementStart(1, "div", 17);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r4.emptyMessage);
} }
function DataView_p_paginator_9_Template(rf, ctx) { if (rf & 1) {
    const _r14 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "p-paginator", 18);
    ɵngcc0.ɵɵlistener("onPageChange", function DataView_p_paginator_9_Template_p_paginator_onPageChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r14); const ctx_r13 = ɵngcc0.ɵɵnextContext(); return ctx_r13.paginate($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("rows", ctx_r5.rows)("first", ctx_r5.first)("totalRecords", ctx_r5.totalRecords)("pageLinkSize", ctx_r5.pageLinks)("alwaysShow", ctx_r5.alwaysShowPaginator)("rowsPerPageOptions", ctx_r5.rowsPerPageOptions)("dropdownAppendTo", ctx_r5.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r5.paginatorDropdownScrollHeight)("templateLeft", ctx_r5.paginatorLeftTemplate)("templateRight", ctx_r5.paginatorRightTemplate)("currentPageReportTemplate", ctx_r5.currentPageReportTemplate)("showCurrentPageReport", ctx_r5.showCurrentPageReport)("showJumpToPageDropdown", ctx_r5.showJumpToPageDropdown)("showPageLinks", ctx_r5.showPageLinks);
} }
function DataView_div_10_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function DataView_div_10_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 19);
    ɵngcc0.ɵɵprojection(1, 1);
    ɵngcc0.ɵɵtemplate(2, DataView_div_10_ng_container_2_Template, 1, 0, "ng-container", 13);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r6.footerTemplate);
} }
const _c1 = [[["p-header"]], [["p-footer"]]];
const _c2 = function (a1, a2) { return { "p-dataview p-component": true, "p-dataview-list": a1, "p-dataview-grid": a2 }; };
const _c3 = ["p-header", "p-footer"];
const _c4 = function (a0) { return { "p-highlight": a0 }; };
class DataView {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.layout = 'list';
        this.pageLinks = 5;
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.paginatorDropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.showPageLinks = true;
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new EventEmitter();
        this.trackBy = (index, item) => item;
        this.loadingIcon = 'pi pi-spinner';
        this.first = 0;
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onChangeLayout = new EventEmitter();
    }
    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.value) {
            this._value = simpleChanges.value.currentValue;
            this.updateTotalRecords();
            if (!this.lazy && this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        if (simpleChanges.sortField || simpleChanges.sortOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'listItem':
                    this.listItemTemplate = item.template;
                    break;
                case 'gridItem':
                    this.gridItemTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
            }
        });
        this.updateItemTemplate();
    }
    updateItemTemplate() {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
                break;
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
                break;
        }
    }
    changeLayout(layout) {
        this.layout = layout;
        this.onChangeLayout.emit({
            layout: this.layout
        });
        this.updateItemTemplate();
        this.cd.markForCheck();
    }
    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    }
    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }
    sort() {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort((data1, data2) => {
                let value1 = ObjectUtils.resolveFieldData(data1, this.sortField);
                let value2 = ObjectUtils.resolveFieldData(data2, this.sortField);
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2);
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (this.sortOrder * result);
            });
            if (this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    }
    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder
        };
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    filter(filter, filterMatchMode = "contains") {
        this.filterValue = filter;
        if (this.value && this.value.length) {
            let searchFields = this.filterBy.split(',');
            this.filteredValue = FilterUtils.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.cd.markForCheck();
        }
    }
    hasFilter() {
        return this.filterValue && this.filterValue.trim().length > 0;
    }
}
DataView.ɵfac = function DataView_Factory(t) { return new (t || DataView)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
DataView.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataView, selectors: [["p-dataView"]], contentQueries: function DataView_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, Header, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, Footer, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.header = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.footer = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { layout: "layout", pageLinks: "pageLinks", paginatorPosition: "paginatorPosition", alwaysShowPaginator: "alwaysShowPaginator", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showPageLinks: "showPageLinks", emptyMessage: "emptyMessage", trackBy: "trackBy", loadingIcon: "loadingIcon", first: "first", totalRecords: "totalRecords", rows: "rows", paginator: "paginator", rowsPerPageOptions: "rowsPerPageOptions", paginatorDropdownAppendTo: "paginatorDropdownAppendTo", showCurrentPageReport: "showCurrentPageReport", showJumpToPageDropdown: "showJumpToPageDropdown", lazy: "lazy", style: "style", styleClass: "styleClass", filterBy: "filterBy", filterLocale: "filterLocale", loading: "loading", sortField: "sortField", sortOrder: "sortOrder", value: "value" }, outputs: { onLazyLoad: "onLazyLoad", onPage: "onPage", onSort: "onSort", onChangeLayout: "onChangeLayout" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c3, decls: 11, vars: 19, consts: [[3, "ngClass", "ngStyle"], ["class", "p-dataview-loading", 4, "ngIf"], ["class", "p-dataview-header", 4, "ngIf"], ["styleClass", "p-paginator-top", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "onPageChange", 4, "ngIf"], [1, "p-dataview-content"], [1, "p-grid", "p-nogutter"], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], ["class", "p-col", 4, "ngIf"], ["styleClass", "p-paginator-bottom", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "onPageChange", 4, "ngIf"], ["class", "p-dataview-footer", 4, "ngIf"], [1, "p-dataview-loading"], [1, "p-dataview-loading-overlay", "p-component-overlay"], [1, "p-dataview-header"], [4, "ngTemplateOutlet"], ["styleClass", "p-paginator-top", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "onPageChange"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-col"], [1, "p-dataview-emptymessage"], ["styleClass", "p-paginator-bottom", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "onPageChange"], [1, "p-dataview-footer"]], template: function DataView_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c1);
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, DataView_div_1_Template, 3, 2, "div", 1);
        ɵngcc0.ɵɵtemplate(2, DataView_div_2_Template, 3, 1, "div", 2);
        ɵngcc0.ɵɵtemplate(3, DataView_p_paginator_3_Template, 1, 14, "p-paginator", 3);
        ɵngcc0.ɵɵelementStart(4, "div", 4);
        ɵngcc0.ɵɵelementStart(5, "div", 5);
        ɵngcc0.ɵɵtemplate(6, DataView_ng_template_6_Template, 1, 5, "ng-template", 6);
        ɵngcc0.ɵɵpipe(7, "slice");
        ɵngcc0.ɵɵtemplate(8, DataView_div_8_Template, 3, 1, "div", 7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(9, DataView_p_paginator_9_Template, 1, 14, "p-paginator", 8);
        ɵngcc0.ɵɵtemplate(10, DataView_div_10_Template, 3, 1, "div", 9);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(16, _c2, ctx.layout === "list", ctx.layout === "grid"))("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.loading);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.header || ctx.headerTemplate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.paginator && (ctx.paginatorPosition === "top" || ctx.paginatorPosition == "both"));
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.paginator ? ɵngcc0.ɵɵpipeBind3(7, 12, ctx.filteredValue || ctx.value, ctx.lazy ? 0 : ctx.first, (ctx.lazy ? 0 : ctx.first) + ctx.rows) : ctx.filteredValue || ctx.value)("ngForTrackBy", ctx.trackBy);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.isEmpty());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.paginator && (ctx.paginatorPosition === "bottom" || ctx.paginatorPosition == "both"));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.footer || ctx.footerTemplate);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgForOf, ɵngcc1.NgTemplateOutlet, ɵngcc2.Paginator], pipes: [ɵngcc1.SlicePipe], styles: [".p-dataview{position:relative}.p-dataview .p-dataview-loading-overlay{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;position:absolute;z-index:2}"], encapsulation: 2, changeDetection: 0 });
DataView.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
DataView.propDecorators = {
    layout: [{ type: Input }],
    paginator: [{ type: Input }],
    rows: [{ type: Input }],
    totalRecords: [{ type: Input }],
    pageLinks: [{ type: Input }],
    rowsPerPageOptions: [{ type: Input }],
    paginatorPosition: [{ type: Input }],
    alwaysShowPaginator: [{ type: Input }],
    paginatorDropdownAppendTo: [{ type: Input }],
    paginatorDropdownScrollHeight: [{ type: Input }],
    currentPageReportTemplate: [{ type: Input }],
    showCurrentPageReport: [{ type: Input }],
    showJumpToPageDropdown: [{ type: Input }],
    showPageLinks: [{ type: Input }],
    lazy: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    onLazyLoad: [{ type: Output }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    trackBy: [{ type: Input }],
    filterBy: [{ type: Input }],
    filterLocale: [{ type: Input }],
    loading: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    first: [{ type: Input }],
    sortField: [{ type: Input }],
    sortOrder: [{ type: Input }],
    value: [{ type: Input }],
    onPage: [{ type: Output }],
    onSort: [{ type: Output }],
    onChangeLayout: [{ type: Output }],
    header: [{ type: ContentChild, args: [Header,] }],
    footer: [{ type: ContentChild, args: [Footer,] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataView, [{
        type: Component,
        args: [{
                selector: 'p-dataView',
                template: `
        <div [ngClass]="{'p-dataview p-component': true, 'p-dataview-list': (layout === 'list'), 'p-dataview-grid': (layout === 'grid')}" [ngStyle]="style" [class]="styleClass">
            <div class="p-dataview-loading" *ngIf="loading">
                <div class="p-dataview-loading-overlay p-component-overlay">
                    <i [class]="'p-dataview-loading-icon pi-spin ' + loadingIcon"></i>
                </div>
            </div>
            <div class="p-dataview-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="p-paginator-top" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>
            <div class="p-dataview-content">
                <div class="p-grid p-nogutter">
                    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)" [ngForTrackBy]="trackBy">
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}"></ng-container>
                    </ng-template>
                    <div *ngIf="isEmpty()" class="p-col">
                        <div class="p-dataview-emptymessage">{{emptyMessage}}</div>
                    </div>
                </div>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="p-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>
            <div class="p-dataview-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-dataview{position:relative}.p-dataview .p-dataview-loading-overlay{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;display:-ms-flexbox;display:flex;justify-content:center;position:absolute;z-index:2}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, { layout: [{
            type: Input
        }], pageLinks: [{
            type: Input
        }], paginatorPosition: [{
            type: Input
        }], alwaysShowPaginator: [{
            type: Input
        }], paginatorDropdownScrollHeight: [{
            type: Input
        }], currentPageReportTemplate: [{
            type: Input
        }], showPageLinks: [{
            type: Input
        }], emptyMessage: [{
            type: Input
        }], onLazyLoad: [{
            type: Output
        }], trackBy: [{
            type: Input
        }], loadingIcon: [{
            type: Input
        }], first: [{
            type: Input
        }], onPage: [{
            type: Output
        }], onSort: [{
            type: Output
        }], onChangeLayout: [{
            type: Output
        }], totalRecords: [{
            type: Input
        }], rows: [{
            type: Input
        }], paginator: [{
            type: Input
        }], rowsPerPageOptions: [{
            type: Input
        }], paginatorDropdownAppendTo: [{
            type: Input
        }], showCurrentPageReport: [{
            type: Input
        }], showJumpToPageDropdown: [{
            type: Input
        }], lazy: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], filterBy: [{
            type: Input
        }], filterLocale: [{
            type: Input
        }], loading: [{
            type: Input
        }], sortField: [{
            type: Input
        }], sortOrder: [{
            type: Input
        }], value: [{
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
        }] }); })();
class DataViewLayoutOptions {
    constructor(dv) {
        this.dv = dv;
    }
    changeLayout(event, layout) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    }
}
DataViewLayoutOptions.ɵfac = function DataViewLayoutOptions_Factory(t) { return new (t || DataViewLayoutOptions)(ɵngcc0.ɵɵdirectiveInject(DataView)); };
DataViewLayoutOptions.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataViewLayoutOptions, selectors: [["p-dataViewLayoutOptions"]], inputs: { style: "style", styleClass: "styleClass" }, decls: 5, vars: 10, consts: [[3, "ngClass", "ngStyle"], ["type", "button", 1, "p-button", "p-button-icon-only", 3, "ngClass", "click", "keydown.enter"], [1, "pi", "pi-bars"], [1, "pi", "pi-th-large"]], template: function DataViewLayoutOptions_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "button", 1);
        ɵngcc0.ɵɵlistener("click", function DataViewLayoutOptions_Template_button_click_1_listener($event) { return ctx.changeLayout($event, "list"); })("keydown.enter", function DataViewLayoutOptions_Template_button_keydown_enter_1_listener($event) { return ctx.changeLayout($event, "list"); });
        ɵngcc0.ɵɵelement(2, "i", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "button", 1);
        ɵngcc0.ɵɵlistener("click", function DataViewLayoutOptions_Template_button_click_3_listener($event) { return ctx.changeLayout($event, "grid"); })("keydown.enter", function DataViewLayoutOptions_Template_button_keydown_enter_3_listener($event) { return ctx.changeLayout($event, "grid"); });
        ɵngcc0.ɵɵelement(4, "i", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-dataview-layout-options p-selectbutton p-buttonset")("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(6, _c4, ctx.dv.layout === "list"));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(8, _c4, ctx.dv.layout === "grid"));
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle], encapsulation: 2 });
DataViewLayoutOptions.ctorParameters = () => [
    { type: DataView }
];
DataViewLayoutOptions.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataViewLayoutOptions, [{
        type: Component,
        args: [{
                selector: 'p-dataViewLayoutOptions',
                template: `
        <div [ngClass]="'p-dataview-layout-options p-selectbutton p-buttonset'" [ngStyle]="style" [class]="styleClass">
            <button type="button" class="p-button p-button-icon-only" [ngClass]="{'p-highlight': dv.layout === 'list'}" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')">
                <i class="pi pi-bars"></i>
            </button><button type="button" class="p-button p-button-icon-only" [ngClass]="{'p-highlight': dv.layout === 'grid'}" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')">
                <i class="pi pi-th-large"></i>
            </button>
        </div>
    `,
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: DataView }]; }, { style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }] }); })();
class DataViewModule {
}
DataViewModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DataViewModule });
DataViewModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DataViewModule_Factory(t) { return new (t || DataViewModule)(); }, imports: [[CommonModule, SharedModule, PaginatorModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DataViewModule, { declarations: function () { return [DataView, DataViewLayoutOptions]; }, imports: function () { return [CommonModule, SharedModule, PaginatorModule]; }, exports: function () { return [DataView, SharedModule, DataViewLayoutOptions]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataViewModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, SharedModule, PaginatorModule],
                exports: [DataView, SharedModule, DataViewLayoutOptions],
                declarations: [DataView, DataViewLayoutOptions]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { DataView, DataViewLayoutOptions, DataViewModule };

//# sourceMappingURL=primeng-dataview.js.map