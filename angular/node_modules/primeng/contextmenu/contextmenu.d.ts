import { ElementRef, AfterViewInit, OnDestroy, Renderer2, NgZone, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from 'primeng/ripple';
export declare class ContextMenuSub {
    item: MenuItem;
    root: boolean;
    get parentActive(): boolean;
    set parentActive(value: boolean);
    contextMenu: ContextMenu;
    constructor(contextMenu: any);
    activeItem: any;
    containerOffset: any;
    hideTimeout: any;
    _parentActive: boolean;
    onItemMouseEnter(event: any, item: any, menuitem: any): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    position(sublist: any, item: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ContextMenuSub, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ContextMenuSub, "p-contextMenuSub", never, { "parentActive": "parentActive"; "item": "item"; "root": "root"; }, {}, never, never>;
}
export declare class ContextMenu implements AfterViewInit, OnDestroy {
    el: ElementRef;
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
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    containerViewChild: ElementRef;
    parentActive: boolean;
    documentClickListener: any;
    windowResizeListener: any;
    triggerEventListener: any;
    constructor(el: ElementRef, renderer: Renderer2, zone: NgZone);
    ngAfterViewInit(): void;
    show(event?: MouseEvent): void;
    hide(): void;
    moveOnTop(): void;
    toggle(event?: MouseEvent): void;
    position(event?: MouseEvent): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    onWindowResize(event: any): void;
    isOutsideClicked(event: Event): boolean;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ContextMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ContextMenu, "p-contextMenu", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "triggerEvent": "triggerEvent"; "model": "model"; "global": "global"; "target": "target"; "style": "style"; "styleClass": "styleClass"; "appendTo": "appendTo"; }, { "onShow": "onShow"; "onHide": "onHide"; }, never, never>;
}
export declare class ContextMenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ContextMenuModule, [typeof ContextMenu, typeof ContextMenuSub], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule, typeof ɵngcc3.RippleModule], [typeof ContextMenu, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ContextMenuModule>;
}

//# sourceMappingURL=contextmenu.d.ts.map