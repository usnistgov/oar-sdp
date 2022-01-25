import { EventEmitter, Directive, ElementRef, Renderer2, ViewContainerRef, Output, ContentChild, TemplateRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
class DeferredLoader {
    constructor(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.documentScrollListener();
                    this.documentScrollListener = null;
                }
            });
        }
    }
    shouldLoad() {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = document.documentElement;
            let winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    }
    load() {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    }
    isLoaded() {
        return this.view != null;
    }
    ngOnDestroy() {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
}
DeferredLoader.ɵfac = function DeferredLoader_Factory(t) { return new (t || DeferredLoader)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef)); };
DeferredLoader.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: DeferredLoader, selectors: [["", "pDefer", ""]], contentQueries: function DeferredLoader_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, outputs: { onLoad: "onLoad" } });
DeferredLoader.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef }
];
DeferredLoader.propDecorators = {
    onLoad: [{ type: Output }],
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DeferredLoader, [{
        type: Directive,
        args: [{
                selector: '[pDefer]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ViewContainerRef }]; }, { onLoad: [{
            type: Output
        }], template: [{
            type: ContentChild,
            args: [TemplateRef]
        }] }); })();
class DeferModule {
}
DeferModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DeferModule });
DeferModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DeferModule_Factory(t) { return new (t || DeferModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DeferModule, { declarations: function () { return [DeferredLoader]; }, imports: function () { return [CommonModule]; }, exports: function () { return [DeferredLoader]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DeferModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [DeferredLoader],
                declarations: [DeferredLoader]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { DeferModule, DeferredLoader };

//# sourceMappingURL=primeng-defer.js.map