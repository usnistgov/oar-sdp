import { ElementRef, AfterContentInit, EventEmitter, QueryList, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { Header, Footer } from 'primeng/api';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BlockableUI } from 'primeng/api';
export declare class VirtualScroller implements AfterContentInit, BlockableUI, OnChanges {
    el: ElementRef;
    value: any[];
    itemSize: number;
    style: any;
    styleClass: string;
    scrollHeight: any;
    lazy: boolean;
    rows: number;
    minBufferPx: number;
    maxBufferPx: number;
    trackBy: Function;
    header: Header;
    footer: Footer;
    templates: QueryList<any>;
    viewport: CdkVirtualScrollViewport;
    onLazyLoad: EventEmitter<any>;
    itemTemplate: TemplateRef<any>;
    loadingItemTemplate: TemplateRef<any>;
    _totalRecords: number;
    page: number;
    _first: number;
    loadedPages: number[];
    _cache: boolean;
    constructor(el: ElementRef);
    totalRecords: number;
    first: number;
    cache: boolean;
    ngAfterContentInit(): void;
    onScrollIndexChange(index: number): void;
    createPageRange(page: number): number[];
    loadPage(page: number): void;
    getBlockableElement(): HTMLElement;
    scrollTo(index: number, mode?: ScrollBehavior): void;
    scrollToIndex(index: number, mode?: ScrollBehavior): void;
    clearCache(): void;
    ngOnChanges(simpleChange: SimpleChanges): void;
}
export declare class VirtualScrollerModule {
}
