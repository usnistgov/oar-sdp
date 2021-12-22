/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
var NgbTooltipConfig = /** @class */ (function () {
    function NgbTooltipConfig() {
        this.autoClose = true;
        this.placement = 'auto';
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
    NgbTooltipConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbTooltipConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(); }, token: NgbTooltipConfig, providedIn: "root" });
    return NgbTooltipConfig;
}());
export { NgbTooltipConfig };
if (false) {
    /** @type {?} */
    NgbTooltipConfig.prototype.autoClose;
    /** @type {?} */
    NgbTooltipConfig.prototype.placement;
    /** @type {?} */
    NgbTooltipConfig.prototype.triggers;
    /** @type {?} */
    NgbTooltipConfig.prototype.container;
    /** @type {?} */
    NgbTooltipConfig.prototype.disableTooltip;
    /** @type {?} */
    NgbTooltipConfig.prototype.tooltipClass;
    /** @type {?} */
    NgbTooltipConfig.prototype.openDelay;
    /** @type {?} */
    NgbTooltipConfig.prototype.closeDelay;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAvdG9vbHRpcC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBU3pDO0lBQUE7UUFFRSxjQUFTLEdBQW1DLElBQUksQ0FBQztRQUNqRCxjQUFTLEdBQW1CLE1BQU0sQ0FBQztRQUNuQyxhQUFRLEdBQUcsYUFBYSxDQUFDO1FBRXpCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxlQUFVLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCOztnQkFWQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7MkJBVGhDO0NBbUJDLEFBVkQsSUFVQztTQVRZLGdCQUFnQjs7O0lBQzNCLHFDQUFpRDs7SUFDakQscUNBQW1DOztJQUNuQyxvQ0FBeUI7O0lBQ3pCLHFDQUFrQjs7SUFDbEIsMENBQXVCOztJQUN2Qix3Q0FBcUI7O0lBQ3JCLHFDQUFjOztJQUNkLHNDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuXG4vKipcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW2BOZ2JUb29sdGlwYF0oIy9jb21wb25lbnRzL3Rvb2x0aXAvYXBpI05nYlRvb2x0aXApIGNvbXBvbmVudC5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdG9vbHRpcHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBDb25maWcge1xuICBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJyA9IHRydWU7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7XG4gIHRyaWdnZXJzID0gJ2hvdmVyIGZvY3VzJztcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGRpc2FibGVUb29sdGlwID0gZmFsc2U7XG4gIHRvb2x0aXBDbGFzczogc3RyaW5nO1xuICBvcGVuRGVsYXkgPSAwO1xuICBjbG9zZURlbGF5ID0gMDtcbn1cbiJdfQ==