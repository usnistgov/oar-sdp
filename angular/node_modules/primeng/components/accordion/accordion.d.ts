import { ElementRef, AfterContentInit, OnDestroy, EventEmitter, QueryList, ChangeDetectorRef } from '@angular/core';
import { Header } from '../common/shared';
import { BlockableUI } from '../common/blockableui';
import { Subscription } from 'rxjs';
export declare class AccordionTab implements OnDestroy {
    accordion: Accordion;
    header: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<any>;
    transitionOptions: string;
    headerFacet: QueryList<Header>;
    animating: boolean;
    id: string;
    constructor(accordion: Accordion);
    toggle(event: any): boolean;
    findTabIndex(): number;
    readonly lazy: boolean;
    readonly hasHeaderFacet: boolean;
    onToggleDone(event: Event): void;
    ngOnDestroy(): void;
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
    lazy: boolean;
    tabList: QueryList<AccordionTab>;
    tabListSubscription: Subscription;
    private _activeIndex;
    tabs: AccordionTab[];
    constructor(el: ElementRef, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    initTabs(): any;
    getBlockableElement(): HTMLElement;
    activeIndex: any;
    updateSelectionState(): void;
    ngOnDestroy(): void;
}
export declare class AccordionModule {
}
