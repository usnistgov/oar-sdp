/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TemplateRef } from '@angular/core';
var ContentRef = /** @class */ (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());
export { ContentRef };
if (false) {
    /** @type {?} */
    ContentRef.prototype.nodes;
    /** @type {?} */
    ContentRef.prototype.viewRef;
    /** @type {?} */
    ContentRef.prototype.componentRef;
}
/**
 * @template T
 */
var /**
 * @template T
 */
PopupService = /** @class */ (function () {
    function PopupService(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver, _applicationRef) {
        this._type = _type;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._applicationRef = _applicationRef;
    }
    /**
     * @param {?=} content
     * @param {?=} context
     * @return {?}
     */
    PopupService.prototype.open = /**
     * @param {?=} content
     * @param {?=} context
     * @return {?}
     */
    function (content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    };
    /**
     * @return {?}
     */
    PopupService.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._applicationRef.detachView(this._contentRef.viewRef);
                this._contentRef.viewRef.destroy();
                this._contentRef = null;
            }
        }
    };
    /**
     * @private
     * @param {?} content
     * @param {?=} context
     * @return {?}
     */
    PopupService.prototype._getContentRef = /**
     * @private
     * @param {?} content
     * @param {?=} context
     * @return {?}
     */
    function (content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            /** @type {?} */
            var viewRef = content.createEmbeddedView(context);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText("" + content)]]);
        }
    };
    return PopupService;
}());
/**
 * @template T
 */
export { PopupService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._windowRef;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._contentRef;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    PopupService.prototype._applicationRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxXQUFXLEVBT1osTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFDRSxvQkFBbUIsS0FBWSxFQUFTLE9BQWlCLEVBQVMsWUFBZ0M7UUFBL0UsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7SUFBRyxDQUFDO0lBQ3hHLGlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEYSwyQkFBbUI7O0lBQUUsNkJBQXdCOztJQUFFLGtDQUF1Qzs7Ozs7QUFHcEc7Ozs7SUFJRSxzQkFDWSxLQUFVLEVBQVUsU0FBbUIsRUFBVSxpQkFBbUMsRUFDcEYsU0FBb0IsRUFBVSx5QkFBbUQsRUFDakYsZUFBK0I7UUFGL0IsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3BGLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ2pGLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtJQUFHLENBQUM7Ozs7OztJQUUvQywyQkFBSTs7Ozs7SUFBSixVQUFLLE9BQW1DLEVBQUUsT0FBYTtRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FDcEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDeEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsNEJBQUs7OztJQUFMO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7O0lBRU8scUNBQWM7Ozs7OztJQUF0QixVQUF1QixPQUFrQyxFQUFFLE9BQWE7UUFDdEUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7YUFBTSxJQUFJLE9BQU8sWUFBWSxXQUFXLEVBQUU7O2dCQUNuQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztZQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFHLE9BQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQzs7Ozs7Ozs7OztJQTNDQyxrQ0FBb0M7Ozs7O0lBQ3BDLG1DQUFnQzs7Ozs7SUFHNUIsNkJBQWtCOzs7OztJQUFFLGlDQUEyQjs7Ozs7SUFBRSx5Q0FBMkM7Ozs7O0lBQzVGLGlDQUE0Qjs7Ozs7SUFBRSxpREFBMkQ7Ozs7O0lBQ3pGLHVDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdG9yLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld1JlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQXBwbGljYXRpb25SZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50UmVmIHtcbiAgY29uc3RydWN0b3IocHVibGljIG5vZGVzOiBhbnlbXSwgcHVibGljIHZpZXdSZWY/OiBWaWV3UmVmLCBwdWJsaWMgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2U8VD4ge1xuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxUPjtcbiAgcHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3R5cGU6IGFueSwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYpIHt9XG5cbiAgb3Blbihjb250ZW50Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiwgY29udGV4dD86IGFueSk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgaWYgKCF0aGlzLl93aW5kb3dSZWYpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKGNvbnRlbnQsIGNvbnRleHQpO1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFQ+KHRoaXMuX3R5cGUpLCAwLCB0aGlzLl9pbmplY3RvcixcbiAgICAgICAgICB0aGlzLl9jb250ZW50UmVmLm5vZGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fd2luZG93UmVmO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX3dpbmRvd1JlZi5ob3N0VmlldykpO1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcblxuICAgICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZik7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiwgY29udGV4dD86IGFueSk6IENvbnRlbnRSZWYge1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IGNvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRleHQpO1xuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbdGhpcy5fcmVuZGVyZXIuY3JlYXRlVGV4dChgJHtjb250ZW50fWApXV0pO1xuICAgIH1cbiAgfVxufVxuIl19