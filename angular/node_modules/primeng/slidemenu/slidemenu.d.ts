import { ElementRef, AfterViewChecked, OnDestroy, Renderer2, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
export declare class SlideMenuSub implements OnDestroy {
    item: MenuItem;
    root: boolean;
    backLabel: string;
    menuWidth: number;
    effectDuration: any;
    easing: string;
    index: number;
    slideMenu: SlideMenu;
    constructor(slideMenu: any);
    activeItem: any;
    itemClick(event: any, item: MenuItem, listitem: any): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SlideMenuSub, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SlideMenuSub, "p-slideMenuSub", never, { "backLabel": "backLabel"; "easing": "easing"; "item": "item"; "root": "root"; "menuWidth": "menuWidth"; "effectDuration": "effectDuration"; "index": "index"; }, {}, never, never>;
}
export declare class SlideMenu implements AfterViewChecked, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    menuWidth: number;
    viewportHeight: number;
    effectDuration: any;
    easing: string;
    backLabel: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    containerViewChild: ElementRef;
    backwardViewChild: ElementRef;
    slideMenuContentViewChild: ElementRef;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    scrollHandler: any;
    left: number;
    animating: boolean;
    target: any;
    visible: boolean;
    viewportUpdated: boolean;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    set container(element: ElementRef);
    set backward(element: ElementRef);
    set slideMenuContent(element: ElementRef);
    updateViewPort(): void;
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    onClick(event: any): void;
    goBack(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    bindScrollListener(): void;
    unbindScrollListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SlideMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SlideMenu, "p-slideMenu", never, { "menuWidth": "menuWidth"; "viewportHeight": "viewportHeight"; "effectDuration": "effectDuration"; "easing": "easing"; "backLabel": "backLabel"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "model": "model"; "popup": "popup"; "style": "style"; "styleClass": "styleClass"; "appendTo": "appendTo"; }, { "onShow": "onShow"; "onHide": "onHide"; }, never, never>;
}
export declare class SlideMenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<SlideMenuModule, [typeof SlideMenu, typeof SlideMenuSub], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule], [typeof SlideMenu, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<SlideMenuModule>;
}

//# sourceMappingURL=slidemenu.d.ts.map