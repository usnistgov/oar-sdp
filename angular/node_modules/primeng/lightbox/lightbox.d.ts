import { ElementRef, Renderer2, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class Lightbox implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    images: any[];
    type: string;
    style: any;
    styleClass: string;
    appendTo: any;
    easing: 'ease-out';
    effectDuration: any;
    autoZIndex: boolean;
    baseZIndex: number;
    closeOnEscape: boolean;
    visible: boolean;
    loading: boolean;
    currentImage: any;
    captionText: string;
    zindex: any;
    panel: any;
    index: number;
    mask: any;
    preventDocumentClickListener: boolean;
    documentClickListener: any;
    documentEscapeListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    onImageClick(event: any, image: any, i: any, content: any): void;
    ngAfterViewInit(): void;
    onLinkClick(event: any, content: any): void;
    displayImage(image: any): void;
    show(): void;
    hide(event: any): void;
    center(): void;
    onImageLoad(event: any, content: any): void;
    prev(placeholder: any): void;
    next(placeholder: any): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    get leftVisible(): boolean;
    get rightVisible(): boolean;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Lightbox, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Lightbox, "p-lightbox", never, { "type": "type"; "effectDuration": "effectDuration"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "closeOnEscape": "closeOnEscape"; "images": "images"; "style": "style"; "styleClass": "styleClass"; "appendTo": "appendTo"; "easing": "easing"; }, {}, never, ["a", "*"]>;
}
export declare class LightboxModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<LightboxModule, [typeof Lightbox], [typeof ɵngcc1.CommonModule], [typeof Lightbox]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<LightboxModule>;
}

//# sourceMappingURL=lightbox.d.ts.map