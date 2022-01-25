import { ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class DeferredLoader implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    viewContainer: ViewContainerRef;
    onLoad: EventEmitter<any>;
    template: TemplateRef<any>;
    documentScrollListener: Function;
    view: EmbeddedViewRef<any>;
    constructor(el: ElementRef, renderer: Renderer2, viewContainer: ViewContainerRef);
    ngAfterViewInit(): void;
    shouldLoad(): boolean;
    load(): void;
    isLoaded(): boolean;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DeferredLoader, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<DeferredLoader, "[pDefer]", never, {}, { "onLoad": "onLoad"; }, ["template"]>;
}
export declare class DeferModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<DeferModule, [typeof DeferredLoader], [typeof ɵngcc1.CommonModule], [typeof DeferredLoader]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<DeferModule>;
}

//# sourceMappingURL=defer.d.ts.map