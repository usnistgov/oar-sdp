import { ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class DeferredLoader implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    viewContainer: ViewContainerRef;
    private cd;
    onLoad: EventEmitter<any>;
    template: TemplateRef<any>;
    documentScrollListener: Function;
    view: EmbeddedViewRef<any>;
    constructor(el: ElementRef, renderer: Renderer2, viewContainer: ViewContainerRef, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    shouldLoad(): boolean;
    load(): void;
    isLoaded(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeferredLoader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DeferredLoader, "[pDefer]", never, {}, { "onLoad": "onLoad"; }, ["template"]>;
}
export declare class DeferModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DeferModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DeferModule, [typeof DeferredLoader], [typeof i1.CommonModule], [typeof DeferredLoader]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DeferModule>;
}
