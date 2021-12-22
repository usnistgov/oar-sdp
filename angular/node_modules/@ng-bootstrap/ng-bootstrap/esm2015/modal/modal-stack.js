/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable, Injector, NgZone, RendererFactory2, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { ScrollBar } from '../util/scrollbar';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../util/scrollbar";
export class NgbModalStack {
    /**
     * @param {?} _applicationRef
     * @param {?} _injector
     * @param {?} _document
     * @param {?} _scrollBar
     * @param {?} _rendererFactory
     * @param {?} _ngZone
     */
    constructor(_applicationRef, _injector, _document, _scrollBar, _rendererFactory, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._ngZone = _ngZone;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass'];
        this._windowCmpts = [];
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._windowCmpts.length) {
                /** @type {?} */
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(this._ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        }));
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    open(moduleCFR, contentInjector, content, options) {
        /** @type {?} */
        const containerEl = options.container instanceof HTMLElement ? options.container : isDefined(options.container) ?
            this._document.querySelector(options.container) :
            this._document.body;
        /** @type {?} */
        const renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        const revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        const removeBodyClass = (/**
         * @return {?}
         */
        () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._revertAriaHidden();
            }
        });
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        /** @type {?} */
        const activeModal = new NgbActiveModal();
        /** @type {?} */
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
        /** @type {?} */
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        let windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (/**
         * @param {?} result
         * @return {?}
         */
        (result) => { ngbModalRef.close(result); });
        activeModal.dismiss = (/**
         * @param {?} reason
         * @return {?}
         */
        (reason) => { ngbModalRef.dismiss(reason); });
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalRefs.forEach((/**
     * @param {?} ngbModalRef
     * @return {?}
     */
    ngbModalRef => ngbModalRef.dismiss(reason))); }
    /**
     * @return {?}
     */
    hasOpenModals() { return this._modalRefs.length > 0; }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    _attachBackdrop(moduleCFR, containerEl) {
        /** @type {?} */
        let backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        let backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    _attachWindowComponent(moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    _applyWindowOptions(windowInstance, options) {
        this._windowAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        }));
    }
    /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        }));
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @param {?} options
     * @return {?}
     */
    _getContentRef(moduleCFR, contentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
        }
    }
    /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _createFromTemplateRef(content, activeModal) {
        /** @type {?} */
        const context = {
            $implicit: activeModal,
            /**
             * @param {?} result
             * @return {?}
             */
            close(result) { activeModal.close(result); },
            /**
             * @param {?} reason
             * @return {?}
             */
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        const viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    _createFromString(content) {
        /** @type {?} */
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @param {?} options
     * @return {?}
     */
    _createFromComponent(moduleCFR, contentInjector, content, context, options) {
        /** @type {?} */
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        const modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        const componentRef = contentCmptFactory.create(modalContentInjector);
        /** @type {?} */
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            ((/** @type {?} */ (componentNativeEl))).classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    _setAriaHidden(element) {
        /** @type {?} */
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((/**
             * @param {?} sibling
             * @return {?}
             */
            sibling => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }));
            this._setAriaHidden(parent);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((/**
         * @param {?} value
         * @param {?} element
         * @return {?}
         */
        (value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        }));
        this._ariaHiddenValues.clear();
    }
    /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    _registerModalRef(ngbModalRef) {
        /** @type {?} */
        const unregisterModalRef = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        });
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        }));
    }
}
NgbModalStack.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NgbModalStack.ctorParameters = () => [
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ScrollBar },
    { type: RendererFactory2 },
    { type: NgZone }
];
/** @nocollapse */ NgbModalStack.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.ScrollBar), i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i0.NgZone)); }, token: NgbModalStack, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._activeWindowCmptHasChanged;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._ariaHiddenValues;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._backdropAttributes;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._modalRefs;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._windowAttributes;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._windowCmpts;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._applicationRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._document;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._scrollBar;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._rendererFactory;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFHZCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVsRCxPQUFPLEVBQUMsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHOUMsTUFBTSxPQUFPLGFBQWE7Ozs7Ozs7OztJQVN4QixZQUNZLGVBQStCLEVBQVUsU0FBbUIsRUFBNEIsU0FBYyxFQUN0RyxVQUFxQixFQUFVLGdCQUFrQyxFQUFVLE9BQWU7UUFEMUYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUE0QixjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ3RHLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsWUFB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bUUsTUFBTSxTQUFDLFFBQVE7WUFsQnBGLFNBQVM7WUFQZixnQkFBZ0I7WUFEaEIsTUFBTTs7Ozs7Ozs7SUFpQk4sb0RBQW9EOzs7OztJQUNwRCwwQ0FBNEQ7Ozs7O0lBQzVELDRDQUFnRDs7Ozs7SUFDaEQsbUNBQXVDOzs7OztJQUN2QywwQ0FDZ0c7Ozs7O0lBQ2hHLHFDQUEwRDs7Ozs7SUFHdEQsd0NBQXVDOzs7OztJQUFFLGtDQUEyQjs7Ozs7SUFBRSxrQ0FBd0M7Ozs7O0lBQzlHLG1DQUE2Qjs7Ozs7SUFBRSx5Q0FBMEM7Ozs7O0lBQUUsZ0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHtDb250ZW50UmVmfSBmcm9tICcuLi91dGlsL3BvcHVwJztcbmltcG9ydCB7U2Nyb2xsQmFyfSBmcm9tICcuLi91dGlsL3Njcm9sbGJhcic7XG5pbXBvcnQge2lzRGVmaW5lZCwgaXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xuaW1wb3J0IHtOZ2JNb2RhbE9wdGlvbnN9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmltcG9ydCB7TmdiQWN0aXZlTW9kYWwsIE5nYk1vZGFsUmVmfSBmcm9tICcuL21vZGFsLXJlZic7XG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsU3RhY2sge1xuICBwcml2YXRlIF9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2FyaWFIaWRkZW5WYWx1ZXM6IE1hcDxFbGVtZW50LCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIF9iYWNrZHJvcEF0dHJpYnV0ZXMgPSBbJ2JhY2tkcm9wQ2xhc3MnXTtcbiAgcHJpdmF0ZSBfbW9kYWxSZWZzOiBOZ2JNb2RhbFJlZltdID0gW107XG4gIHByaXZhdGUgX3dpbmRvd0F0dHJpYnV0ZXMgPVxuICAgICAgWydhcmlhTGFiZWxsZWRCeScsICdiYWNrZHJvcCcsICdjZW50ZXJlZCcsICdrZXlib2FyZCcsICdzY3JvbGxhYmxlJywgJ3NpemUnLCAnd2luZG93Q2xhc3MnXTtcbiAgcHJpdmF0ZSBfd2luZG93Q21wdHM6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9zY3JvbGxCYXI6IFNjcm9sbEJhciwgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIC8vIFRyYXAgZm9jdXMgb24gYWN0aXZlIFdpbmRvd0NtcHRcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhY3RpdmVXaW5kb3dDbXB0ID0gdGhpcy5fd2luZG93Q21wdHNbdGhpcy5fd2luZG93Q21wdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIG5nYkZvY3VzVHJhcCh0aGlzLl9uZ1pvbmUsIGFjdGl2ZVdpbmRvd0NtcHQubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQpO1xuICAgICAgICB0aGlzLl9yZXZlcnRBcmlhSGlkZGVuKCk7XG4gICAgICAgIHRoaXMuX3NldEFyaWFIaWRkZW4oYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4obW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSwgb3B0aW9ucyk6IE5nYk1vZGFsUmVmIHtcbiAgICBjb25zdCBjb250YWluZXJFbCA9IG9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBvcHRpb25zLmNvbnRhaW5lciA6IGlzRGVmaW5lZChvcHRpb25zLmNvbnRhaW5lcikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuXG4gICAgY29uc3QgcmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhciA9IHRoaXMuX3Njcm9sbEJhci5jb21wZW5zYXRlKCk7XG4gICAgY29uc3QgcmVtb3ZlQm9keUNsYXNzID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9tb2RhbFJlZnMubGVuZ3RoKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgICAgIHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFjb250YWluZXJFbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG1vZGFsIGNvbnRhaW5lciBcIiR7b3B0aW9ucy5jb250YWluZXIgfHwgJ2JvZHknfVwiIHdhcyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IG5ldyBOZ2JBY3RpdmVNb2RhbCgpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPVxuICAgICAgICB0aGlzLl9nZXRDb250ZW50UmVmKG1vZHVsZUNGUiwgb3B0aW9ucy5pbmplY3RvciB8fCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsLCBvcHRpb25zKTtcblxuICAgIGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiA9XG4gICAgICAgIG9wdGlvbnMuYmFja2Ryb3AgIT09IGZhbHNlID8gdGhpcy5fYXR0YWNoQmFja2Ryb3AobW9kdWxlQ0ZSLCBjb250YWluZXJFbCkgOiBudWxsO1xuICAgIGxldCB3aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+ID0gdGhpcy5fYXR0YWNoV2luZG93Q29tcG9uZW50KG1vZHVsZUNGUiwgY29udGFpbmVyRWwsIGNvbnRlbnRSZWYpO1xuICAgIGxldCBuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYgPSBuZXcgTmdiTW9kYWxSZWYod2luZG93Q21wdFJlZiwgY29udGVudFJlZiwgYmFja2Ryb3BDbXB0UmVmLCBvcHRpb25zLmJlZm9yZURpc21pc3MpO1xuXG4gICAgdGhpcy5fcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZik7XG4gICAgdGhpcy5fcmVnaXN0ZXJXaW5kb3dDbXB0KHdpbmRvd0NtcHRSZWYpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIsIHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHJlbW92ZUJvZHlDbGFzcywgcmVtb3ZlQm9keUNsYXNzKTtcbiAgICBhY3RpdmVNb2RhbC5jbG9zZSA9IChyZXN1bHQ6IGFueSkgPT4geyBuZ2JNb2RhbFJlZi5jbG9zZShyZXN1bHQpOyB9O1xuICAgIGFjdGl2ZU1vZGFsLmRpc21pc3MgPSAocmVhc29uOiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pOyB9O1xuXG4gICAgdGhpcy5fYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0NtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgIH1cblxuICAgIGlmIChiYWNrZHJvcENtcHRSZWYgJiYgYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmdiTW9kYWxSZWY7XG4gIH1cblxuICBkaXNtaXNzQWxsKHJlYXNvbj86IGFueSkgeyB0aGlzLl9tb2RhbFJlZnMuZm9yRWFjaChuZ2JNb2RhbFJlZiA9PiBuZ2JNb2RhbFJlZi5kaXNtaXNzKHJlYXNvbikpOyB9XG5cbiAgaGFzT3Blbk1vZGFscygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21vZGFsUmVmcy5sZW5ndGggPiAwOyB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoQmFja2Ryb3AobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnkpOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4ge1xuICAgIGxldCBiYWNrZHJvcEZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiTW9kYWxCYWNrZHJvcCk7XG4gICAgbGV0IGJhY2tkcm9wQ21wdFJlZiA9IGJhY2tkcm9wRmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoYmFja2Ryb3BDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZChiYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgcmV0dXJuIGJhY2tkcm9wQ21wdFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGFpbmVyRWw6IGFueSwgY29udGVudFJlZjogYW55KTpcbiAgICAgIENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4ge1xuICAgIGxldCB3aW5kb3dGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsV2luZG93KTtcbiAgICBsZXQgd2luZG93Q21wdFJlZiA9IHdpbmRvd0ZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yLCBjb250ZW50UmVmLm5vZGVzKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHdpbmRvd0NtcHRSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHdpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgcmV0dXJuIHdpbmRvd0NtcHRSZWY7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVdpbmRvd09wdGlvbnMod2luZG93SW5zdGFuY2U6IE5nYk1vZGFsV2luZG93LCBvcHRpb25zOiBPYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl93aW5kb3dBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuICAgICAgICB3aW5kb3dJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcEluc3RhbmNlOiBOZ2JNb2RhbEJhY2tkcm9wLCBvcHRpb25zOiBPYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLl9iYWNrZHJvcEF0dHJpYnV0ZXMuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoaXNEZWZpbmVkKG9wdGlvbnNbb3B0aW9uTmFtZV0pKSB7XG4gICAgICAgIGJhY2tkcm9wSW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcbiAgICAgIG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyk6IENvbnRlbnRSZWYge1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50LCBhY3RpdmVNb2RhbCk7XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tQ29tcG9uZW50KG1vZHVsZUNGUiwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVNb2RhbCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbVRlbXBsYXRlUmVmKGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4sIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAkaW1wbGljaXQ6IGFjdGl2ZU1vZGFsLFxuICAgICAgY2xvc2UocmVzdWx0KSB7IGFjdGl2ZU1vZGFsLmNsb3NlKHJlc3VsdCk7IH0sXG4gICAgICBkaXNtaXNzKHJlYXNvbikgeyBhY3RpdmVNb2RhbC5kaXNtaXNzKHJlYXNvbik7IH1cbiAgICB9O1xuICAgIGNvbnN0IHZpZXdSZWYgPSBjb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHZpZXdSZWYpO1xuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudDogc3RyaW5nKTogQ29udGVudFJlZiB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7Y29udGVudH1gKTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRdXSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tQ29tcG9uZW50KFxuICAgICAgbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSwgY29udGV4dDogTmdiQWN0aXZlTW9kYWwsXG4gICAgICBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCBjb250ZW50Q21wdEZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29udGVudCk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50SW5qZWN0b3IgPVxuICAgICAgICBJbmplY3Rvci5jcmVhdGUoe3Byb3ZpZGVyczogW3twcm92aWRlOiBOZ2JBY3RpdmVNb2RhbCwgdXNlVmFsdWU6IGNvbnRleHR9XSwgcGFyZW50OiBjb250ZW50SW5qZWN0b3J9KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjb250ZW50Q21wdEZhY3RvcnkuY3JlYXRlKG1vZGFsQ29udGVudEluamVjdG9yKTtcbiAgICBjb25zdCBjb21wb25lbnROYXRpdmVFbCA9IGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChvcHRpb25zLnNjcm9sbGFibGUpIHtcbiAgICAgIChjb21wb25lbnROYXRpdmVFbCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnY29tcG9uZW50LWhvc3Qtc2Nyb2xsYWJsZScpO1xuICAgIH1cbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgLy8gRklYTUU6IHdlIHNob3VsZCBoZXJlIGdldCByaWQgb2YgdGhlIGNvbXBvbmVudCBuYXRpdmVFbGVtZW50XG4gICAgLy8gYW5kIHVzZSBgW0FycmF5LmZyb20oY29tcG9uZW50TmF0aXZlRWwuY2hpbGROb2RlcyldYCBpbnN0ZWFkIGFuZCByZW1vdmUgdGhlIGFib3ZlIENTUyBjbGFzcy5cbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnROYXRpdmVFbF1dLCBjb21wb25lbnRSZWYuaG9zdFZpZXcsIGNvbXBvbmVudFJlZik7XG4gIH1cblxuICBwcml2YXRlIF9zZXRBcmlhSGlkZGVuKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCAmJiBlbGVtZW50ICE9PSB0aGlzLl9kb2N1bWVudC5ib2R5KSB7XG4gICAgICBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgaWYgKHNpYmxpbmcgIT09IGVsZW1lbnQgJiYgc2libGluZy5ub2RlTmFtZSAhPT0gJ1NDUklQVCcpIHtcbiAgICAgICAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLnNldChzaWJsaW5nLCBzaWJsaW5nLmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSk7XG4gICAgICAgICAgc2libGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3NldEFyaWFIaWRkZW4ocGFyZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXZlcnRBcmlhSGlkZGVuKCkge1xuICAgIHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuZm9yRWFjaCgodmFsdWUsIGVsZW1lbnQpID0+IHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZikge1xuICAgIGNvbnN0IHVucmVnaXN0ZXJNb2RhbFJlZiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbW9kYWxSZWZzLmluZGV4T2YobmdiTW9kYWxSZWYpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5fbW9kYWxSZWZzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLl9tb2RhbFJlZnMucHVzaChuZ2JNb2RhbFJlZik7XG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4odW5yZWdpc3Rlck1vZGFsUmVmLCB1bnJlZ2lzdGVyTW9kYWxSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJXaW5kb3dDbXB0KG5nYldpbmRvd0NtcHQ6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4pIHtcbiAgICB0aGlzLl93aW5kb3dDbXB0cy5wdXNoKG5nYldpbmRvd0NtcHQpO1xuICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLm5leHQoKTtcblxuICAgIG5nYldpbmRvd0NtcHQub25EZXN0cm95KCgpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fd2luZG93Q21wdHMuaW5kZXhPZihuZ2JXaW5kb3dDbXB0KTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuX3dpbmRvd0NtcHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLm5leHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19