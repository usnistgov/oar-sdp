import { ElementRef, OnInit, AfterContentInit, EventEmitter, QueryList, TemplateRef, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/api';
import * as ɵngcc3 from 'primeng/paginator';
export declare class DataView implements OnInit, AfterContentInit, BlockableUI, OnChanges {
    el: ElementRef;
    cd: ChangeDetectorRef;
    layout: string;
    paginator: boolean;
    rows: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: any[];
    paginatorPosition: string;
    alwaysShowPaginator: boolean;
    paginatorDropdownAppendTo: any;
    paginatorDropdownScrollHeight: string;
    currentPageReportTemplate: string;
    showCurrentPageReport: boolean;
    showJumpToPageDropdown: boolean;
    showPageLinks: boolean;
    lazy: boolean;
    emptyMessage: string;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    trackBy: Function;
    filterBy: string;
    filterLocale: string;
    loading: boolean;
    loadingIcon: string;
    first: number;
    sortField: string;
    sortOrder: number;
    value: any[];
    onPage: EventEmitter<any>;
    onSort: EventEmitter<any>;
    onChangeLayout: EventEmitter<any>;
    header: any;
    footer: any;
    templates: QueryList<any>;
    _value: any[];
    listItemTemplate: TemplateRef<any>;
    gridItemTemplate: TemplateRef<any>;
    itemTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    paginatorLeftTemplate: TemplateRef<any>;
    paginatorRightTemplate: TemplateRef<any>;
    filteredValue: any[];
    filterValue: string;
    initialized: boolean;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngAfterContentInit(): void;
    updateItemTemplate(): void;
    changeLayout(layout: string): void;
    updateTotalRecords(): void;
    paginate(event: any): void;
    sort(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
    filter(filter: string, filterMatchMode?: string): void;
    hasFilter(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataView, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DataView, "p-dataView", never, { "layout": "layout"; "pageLinks": "pageLinks"; "paginatorPosition": "paginatorPosition"; "alwaysShowPaginator": "alwaysShowPaginator"; "paginatorDropdownScrollHeight": "paginatorDropdownScrollHeight"; "currentPageReportTemplate": "currentPageReportTemplate"; "showPageLinks": "showPageLinks"; "emptyMessage": "emptyMessage"; "trackBy": "trackBy"; "loadingIcon": "loadingIcon"; "first": "first"; "totalRecords": "totalRecords"; "rows": "rows"; "paginator": "paginator"; "rowsPerPageOptions": "rowsPerPageOptions"; "paginatorDropdownAppendTo": "paginatorDropdownAppendTo"; "showCurrentPageReport": "showCurrentPageReport"; "showJumpToPageDropdown": "showJumpToPageDropdown"; "lazy": "lazy"; "style": "style"; "styleClass": "styleClass"; "filterBy": "filterBy"; "filterLocale": "filterLocale"; "loading": "loading"; "sortField": "sortField"; "sortOrder": "sortOrder"; "value": "value"; }, { "onLazyLoad": "onLazyLoad"; "onPage": "onPage"; "onSort": "onSort"; "onChangeLayout": "onChangeLayout"; }, ["header", "footer", "templates"], ["p-header", "p-footer"]>;
}
export declare class DataViewLayoutOptions {
    dv: DataView;
    style: any;
    styleClass: string;
    constructor(dv: DataView);
    changeLayout(event: Event, layout: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataViewLayoutOptions, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DataViewLayoutOptions, "p-dataViewLayoutOptions", never, { "style": "style"; "styleClass": "styleClass"; }, {}, never, never>;
}
export declare class DataViewModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<DataViewModule, [typeof DataView, typeof DataViewLayoutOptions], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.SharedModule, typeof ɵngcc3.PaginatorModule], [typeof DataView, typeof ɵngcc2.SharedModule, typeof DataViewLayoutOptions]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<DataViewModule>;
}

//# sourceMappingURL=dataview.d.ts.map