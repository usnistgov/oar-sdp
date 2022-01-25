import { ElementRef, Renderer2, OnDestroy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AnimationEvent } from '@angular/animations';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from 'primeng/ripple';
export declare class TieredMenuSub implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    item: MenuItem;
    root: boolean;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    mobileActive: boolean;
    get parentActive(): boolean;
    set parentActive(value: boolean);
    leafClick: EventEmitter<any>;
    _parentActive: boolean;
    documentClickListener: any;
    menuHoverActive: boolean;
    activeItem: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    onItemMouseEnter(event: any, item: any): void;
    onItemClick(event: any, item: any): void;
    onLeafClick(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TieredMenuSub, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TieredMenuSub, "p-tieredMenuSub", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "parentActive": "parentActive"; "item": "item"; "root": "root"; "autoDisplay": "autoDisplay"; "mobileActive": "mobileActive"; }, { "leafClick": "leafClick"; }, never, never>;
}
export declare class TieredMenu implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    parentActive: boolean;
    container: HTMLDivElement;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    scrollHandler: any;
    target: any;
    visible: boolean;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    onLeafClick(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    bindScrollListener(): void;
    unbindScrollListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TieredMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TieredMenu, "p-tieredMenu", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "model": "model"; "popup": "popup"; "style": "style"; "styleClass": "styleClass"; "appendTo": "appendTo"; }, {}, never, never>;
}
export declare class TieredMenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<TieredMenuModule, [typeof TieredMenu, typeof TieredMenuSub], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule, typeof ɵngcc3.RippleModule], [typeof TieredMenu, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<TieredMenuModule>;
}

//# sourceMappingURL=tieredmenu.d.ts.map