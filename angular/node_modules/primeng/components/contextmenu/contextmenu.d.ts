import { ElementRef, AfterViewInit, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class ContextMenuSub {
    domHandler: DomHandler;
    contextMenu: ContextMenu;
    item: MenuItem;
    root: boolean;
    constructor(domHandler: DomHandler, contextMenu: ContextMenu);
    activeItem: any;
    containerLeft: any;
    hideTimeout: any;
    onItemMouseEnter(event: any, item: any, menuitem: any): void;
    onItemMouseLeave(event: any, link: any): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    position(sublist: any, item: any): void;
    calculateScrollbarWidth(): number;
}
export declare class ContextMenu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    zone: NgZone;
    model: MenuItem[];
    global: boolean;
    target: any;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    triggerEvent: string;
    containerViewChild: ElementRef;
    documentClickListener: any;
    windowResizeListener: any;
    triggerEventListener: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, zone: NgZone);
    ngAfterViewInit(): void;
    show(event?: MouseEvent): void;
    hide(): void;
    moveOnTop(): void;
    toggle(event?: MouseEvent): void;
    position(event?: MouseEvent): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    onWindowResize(event: any): void;
    ngOnDestroy(): void;
}
export declare class ContextMenuModule {
}
