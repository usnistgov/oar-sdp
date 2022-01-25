import { ElementRef, AfterContentInit, OnDestroy, EventEmitter, QueryList, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Header } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/api';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AccordionTab, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AccordionTab, "p-accordionTab", never, { "cache": "cache"; "transitionOptions": "transitionOptions"; "selected": "selected"; "header": "header"; "disabled": "disabled"; }, { "selectedChange": "selectedChange"; }, ["headerFacet", "templates"], ["p-header", "*"]>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Accordion, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Accordion, "p-accordion", never, { "expandIcon": "expandIcon"; "collapseIcon": "collapseIcon"; "activeIndex": "activeIndex"; "multiple": "multiple"; "style": "style"; "styleClass": "styleClass"; }, { "onClose": "onClose"; "onOpen": "onOpen"; "activeIndexChange": "activeIndexChange"; }, ["tabList"], ["*"]>;
}
export declare class AccordionModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<AccordionModule, [typeof Accordion, typeof AccordionTab], [typeof ɵngcc1.CommonModule], [typeof Accordion, typeof AccordionTab, typeof ɵngcc2.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<AccordionModule>;
}

//# sourceMappingURL=accordion.d.ts.map