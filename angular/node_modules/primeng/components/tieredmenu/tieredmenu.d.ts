import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class TieredMenuSub {
    tieredMenu: TieredMenu;
    domHandler: DomHandler;
    item: MenuItem;
    root: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    hideDelay: number;
    constructor(tieredMenu: TieredMenu, domHandler: DomHandler);
    activeItem: HTMLLIElement;
    hideTimeout: any;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    onItemMouseLeave(event: Event): void;
    itemClick(event: Event, item: MenuItem): boolean;
    listClick(event: Event): void;
}
export declare class TieredMenu implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    hideDelay: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    container: HTMLDivElement;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    target: any;
    visible: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class TieredMenuModule {
}
