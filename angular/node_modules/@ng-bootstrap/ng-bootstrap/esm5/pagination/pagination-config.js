/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
var NgbPaginationConfig = /** @class */ (function () {
    function NgbPaginationConfig() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
    NgbPaginationConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbPaginationConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbPaginationConfig_Factory() { return new NgbPaginationConfig(); }, token: NgbPaginationConfig, providedIn: "root" });
    return NgbPaginationConfig;
}());
export { NgbPaginationConfig };
if (false) {
    /** @type {?} */
    NgbPaginationConfig.prototype.disabled;
    /** @type {?} */
    NgbPaginationConfig.prototype.boundaryLinks;
    /** @type {?} */
    NgbPaginationConfig.prototype.directionLinks;
    /** @type {?} */
    NgbPaginationConfig.prototype.ellipses;
    /** @type {?} */
    NgbPaginationConfig.prototype.maxSize;
    /** @type {?} */
    NgbPaginationConfig.prototype.pageSize;
    /** @type {?} */
    NgbPaginationConfig.prototype.rotate;
    /** @type {?} */
    NgbPaginationConfig.prototype.size;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24vcGFnaW5hdGlvbi1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBUXpDO0lBQUE7UUFFRSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxXQUFNLEdBQUcsS0FBSyxDQUFDO0tBRWhCOztnQkFWQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OEJBUmhDO0NBa0JDLEFBVkQsSUFVQztTQVRZLG1CQUFtQjs7O0lBQzlCLHVDQUFpQjs7SUFDakIsNENBQXNCOztJQUN0Qiw2Q0FBc0I7O0lBQ3RCLHVDQUFnQjs7SUFDaEIsc0NBQVk7O0lBQ1osdUNBQWM7O0lBQ2QscUNBQWU7O0lBQ2YsbUNBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiUGFnaW5hdGlvbmBdKCMvY29tcG9uZW50cy9wYWdpbmF0aW9uL2FwaSNOZ2JQYWdpbmF0aW9uKSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHBhZ2luYXRpb25zIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uQ29uZmlnIHtcbiAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRhcnlMaW5rcyA9IGZhbHNlO1xuICBkaXJlY3Rpb25MaW5rcyA9IHRydWU7XG4gIGVsbGlwc2VzID0gdHJ1ZTtcbiAgbWF4U2l6ZSA9IDA7XG4gIHBhZ2VTaXplID0gMTA7XG4gIHJvdGF0ZSA9IGZhbHNlO1xuICBzaXplOiAnc20nIHwgJ2xnJztcbn1cbiJdfQ==