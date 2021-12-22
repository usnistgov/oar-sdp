/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgbModalConfig } from './modal-config';
import { NgbModalStack } from './modal-stack';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
import * as i2 from "./modal-config";
/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
var NgbModal = /** @class */ (function () {
    function NgbModal(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NgbModal.prototype.open = /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    };
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    NgbModal.prototype.dismissAll = /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { this._modalStack.dismissAll(reason); };
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * \@since 3.3.0
     * @return {?}
     */
    NgbModal.prototype.hasOpenModals = /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * \@since 3.3.0
     * @return {?}
     */
    function () { return this._modalStack.hasOpenModals(); };
    NgbModal.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    NgbModal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: NgbModalStack },
        { type: NgbModalConfig }
    ]; };
    /** @nocollapse */ NgbModal.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NgbModalStack), i0.ɵɵinject(i2.NgbModalConfig)); }, token: NgbModal, providedIn: "root" });
    return NgbModal;
}());
export { NgbModal };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbModal.prototype._moduleCFR;
    /**
     * @type {?}
     * @private
     */
    NgbModal.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    NgbModal.prototype._modalStack;
    /**
     * @type {?}
     * @private
     */
    NgbModal.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQWtCLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFRNUM7SUFFRSxrQkFDWSxVQUFvQyxFQUFVLFNBQW1CLEVBQVUsV0FBMEIsRUFDckcsT0FBdUI7UUFEdkIsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDckcsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7SUFBRyxDQUFDO0lBRXZDOzs7Ozs7OztPQVFHOzs7Ozs7Ozs7Ozs7O0lBQ0gsdUJBQUk7Ozs7Ozs7Ozs7OztJQUFKLFVBQUssT0FBWSxFQUFFLE9BQTZCO1FBQTdCLHdCQUFBLEVBQUEsWUFBNkI7O1lBQ3hDLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUNoRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsNkJBQVU7Ozs7Ozs7SUFBVixVQUFXLE1BQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakU7Ozs7T0FJRzs7Ozs7OztJQUNILGdDQUFhOzs7Ozs7SUFBYixjQUEyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOztnQkFoQ3RFLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7Z0JBWkYsd0JBQXdCO2dCQUFsQyxRQUFRO2dCQUlwQixhQUFhO2dCQUZJLGNBQWM7OzttQkFGdkM7Q0E2Q0MsQUFqQ0QsSUFpQ0M7U0FoQ1ksUUFBUTs7Ozs7O0lBRWYsOEJBQTRDOzs7OztJQUFFLDZCQUEyQjs7Ozs7SUFBRSwrQkFBa0M7Ozs7O0lBQzdHLDJCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3IsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiTW9kYWxPcHRpb25zLCBOZ2JNb2RhbENvbmZpZ30gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHtOZ2JNb2RhbFJlZn0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHtOZ2JNb2RhbFN0YWNrfSBmcm9tICcuL21vZGFsLXN0YWNrJztcblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIG9wZW5pbmcgbW9kYWwgd2luZG93cy5cbiAqXG4gKiBDcmVhdGluZyBhIG1vZGFsIGlzIHN0cmFpZ2h0Zm9yd2FyZDogY3JlYXRlIGEgY29tcG9uZW50IG9yIGEgdGVtcGxhdGUgYW5kIHBhc3MgaXQgYXMgYW4gYXJndW1lbnQgdG9cbiAqIHRoZSBgLm9wZW4oKWAgbWV0aG9kLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfbW9kYWxTdGFjazogTmdiTW9kYWxTdGFjayxcbiAgICAgIHByaXZhdGUgX2NvbmZpZzogTmdiTW9kYWxDb25maWcpIHt9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgbmV3IG1vZGFsIHdpbmRvdyB3aXRoIHRoZSBzcGVjaWZpZWQgY29udGVudCBhbmQgc3VwcGxpZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQ29udGVudCBjYW4gYmUgcHJvdmlkZWQgYXMgYSBgVGVtcGxhdGVSZWZgIG9yIGEgY29tcG9uZW50IHR5cGUuIElmIHlvdSBwYXNzIGEgY29tcG9uZW50IHR5cGUgYXMgY29udGVudCxcbiAgICogdGhlbiBpbnN0YW5jZXMgb2YgdGhvc2UgY29tcG9uZW50cyBjYW4gYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGUgYE5nYkFjdGl2ZU1vZGFsYCBjbGFzcy4gWW91IGNhbiB0aGVuXG4gICAqIHVzZSBgTmdiQWN0aXZlTW9kYWxgIG1ldGhvZHMgdG8gY2xvc2UgLyBkaXNtaXNzIG1vZGFscyBmcm9tIFwiaW5zaWRlXCIgb2YgeW91ciBjb21wb25lbnQuXG4gICAqXG4gICAqIEFsc28gc2VlIHRoZSBbYE5nYk1vZGFsT3B0aW9uc2BdKCMvY29tcG9uZW50cy9tb2RhbC9hcGkjTmdiTW9kYWxPcHRpb25zKSBmb3IgdGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIG9wdGlvbnMuXG4gICAqL1xuICBvcGVuKGNvbnRlbnQ6IGFueSwgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zID0ge30pOiBOZ2JNb2RhbFJlZiB7XG4gICAgY29uc3QgY29tYmluZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY29uZmlnLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5fbW9kYWxTdGFjay5vcGVuKHRoaXMuX21vZHVsZUNGUiwgdGhpcy5faW5qZWN0b3IsIGNvbnRlbnQsIGNvbWJpbmVkT3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogRGlzbWlzc2VzIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIG1vZGFsIHdpbmRvd3Mgd2l0aCB0aGUgc3VwcGxpZWQgcmVhc29uLlxuICAgKlxuICAgKiBAc2luY2UgMy4xLjBcbiAgICovXG4gIGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7IHRoaXMuX21vZGFsU3RhY2suZGlzbWlzc0FsbChyZWFzb24pOyB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGVyZSBhcmUgY3VycmVudGx5IGFueSBvcGVuIG1vZGFsIHdpbmRvd3MgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBAc2luY2UgMy4zLjBcbiAgICovXG4gIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLmhhc09wZW5Nb2RhbHMoKTsgfVxufVxuIl19