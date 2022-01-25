import { AfterViewInit, AfterViewChecked, OnDestroy, EventEmitter, ElementRef, Renderer2, QueryList, AfterContentInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
export declare class Sidebar implements AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    position: string;
    fullScreen: boolean;
    appendTo: string;
    blockScroll: boolean;
    style: any;
    styleClass: string;
    ariaCloseLabel: string;
    autoZIndex: boolean;
    baseZIndex: number;
    modal: boolean;
    dismissible: boolean;
    showCloseIcon: boolean;
    closeOnEscape: boolean;
    containerViewChild: ElementRef;
    templates: QueryList<any>;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    visibleChange: EventEmitter<any>;
    initialized: boolean;
    _visible: boolean;
    preventVisibleChangePropagation: boolean;
    mask: HTMLDivElement;
    maskClickListener: Function;
    documentEscapeListener: Function;
    executePostDisplayActions: boolean;
    contentTemplate: TemplateRef<any>;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    get visible(): boolean;
    set visible(val: boolean);
    ngAfterViewChecked(): void;
    show(): void;
    hide(): void;
    close(event: Event): void;
    enableModality(): void;
    disableModality(): void;
    onAnimationStart(event: any): void;
    bindDocumentEscapeListener(): void;
    unbindDocumentEscapeListener(): void;
    unbindMaskClickListener(): void;
    unbindGlobalListeners(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Sidebar, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Sidebar, "p-sidebar", never, { "position": "position"; "blockScroll": "blockScroll"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "modal": "modal"; "dismissible": "dismissible"; "showCloseIcon": "showCloseIcon"; "closeOnEscape": "closeOnEscape"; "visible": "visible"; "fullScreen": "fullScreen"; "appendTo": "appendTo"; "style": "style"; "styleClass": "styleClass"; "ariaCloseLabel": "ariaCloseLabel"; }, { "onShow": "onShow"; "onHide": "onHide"; "visibleChange": "visibleChange"; }, ["templates"], ["*"]>;
}
export declare class SidebarModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<SidebarModule, [typeof Sidebar], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RippleModule], [typeof Sidebar]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<SidebarModule>;
}

//# sourceMappingURL=sidebar.d.ts.map