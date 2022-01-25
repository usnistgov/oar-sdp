import { ElementRef, OnDestroy, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from 'primeng/ripple';
export declare class MenuItemContent {
    item: MenuItem;
    menu: Menu;
    constructor(menu: any);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MenuItemContent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MenuItemContent, "[pMenuItemContent]", never, { "item": "pMenuItemContent"; }, {}, never, never>;
}
export declare class Menu implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    containerViewChild: ElementRef;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    container: HTMLDivElement;
    scrollHandler: any;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    target: any;
    visible: boolean;
    relativeAlign: boolean;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    alignOverlay(): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    itemClick(event: any, item: MenuItem): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    bindScrollListener(): void;
    unbindScrollListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    hasSubMenu(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Menu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Menu, "p-menu", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "model": "model"; "popup": "popup"; "style": "style"; "styleClass": "styleClass"; "appendTo": "appendTo"; }, { "onShow": "onShow"; "onHide": "onHide"; }, never, never>;
}
export declare class MenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MenuModule, [typeof Menu, typeof MenuItemContent], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule, typeof ɵngcc3.RippleModule], [typeof Menu, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MenuModule>;
}

//# sourceMappingURL=menu.d.ts.map