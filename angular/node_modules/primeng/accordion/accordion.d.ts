import { ElementRef, AfterContentInit, OnDestroy, EventEmitter, QueryList, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Header, BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
export declare class AccordionTab implements AfterContentInit, OnDestroy {
    changeDetector: ChangeDetectorRef;
    header: string;
    disabled: boolean;
    cache: boolean;
    selectedChange: EventEmitter<any>;
    transitionOptions: string;
    headerFacet: QueryList<Header>;
    templates: QueryList<any>;
    private _selected;
    get selected(): any;
    set selected(val: any);
    contentTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    id: string;
    loaded: boolean;
    accordion: Accordion;
    constructor(accordion: any, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    toggle(event: any): boolean;
    findTabIndex(): number;
    get hasHeaderFacet(): boolean;
    onKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionTab, "p-accordionTab", never, { "header": "header"; "disabled": "disabled"; "cache": "cache"; "transitionOptions": "transitionOptions"; "selected": "selected"; }, { "selectedChange": "selectedChange"; }, ["headerFacet", "templates"], ["p-header", "*"]>;
}
export declare class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    el: ElementRef;
    changeDetector: ChangeDetectorRef;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    activeIndexChange: EventEmitter<any>;
    tabList: QueryList<AccordionTab>;
    tabListSubscription: Subscription;
    private _activeIndex;
    preventActiveIndexPropagation: boolean;
    tabs: AccordionTab[];
    constructor(el: ElementRef, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    initTabs(): any;
    getBlockableElement(): HTMLElement;
    get activeIndex(): any;
    set activeIndex(val: any);
    updateSelectionState(): void;
    updateActiveIndex(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Accordion, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Accordion, "p-accordion", never, { "multiple": "multiple"; "style": "style"; "styleClass": "styleClass"; "expandIcon": "expandIcon"; "collapseIcon": "collapseIcon"; "activeIndex": "activeIndex"; }, { "onClose": "onClose"; "onOpen": "onOpen"; "activeIndexChange": "activeIndexChange"; }, ["tabList"], ["*"]>;
}
export declare class AccordionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AccordionModule, [typeof Accordion, typeof AccordionTab], [typeof i1.CommonModule], [typeof Accordion, typeof AccordionTab, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AccordionModule>;
}
