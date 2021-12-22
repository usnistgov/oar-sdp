/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Interface used to type all toast config options. See `NgbToastConfig`.
 *
 * \@since 5.0.0
 * @record
 */
export function NgbToastOptions() { }
if (false) {
    /**
     * Specify if the toast component should emit the `hide()` output
     * after a certain `delay` in ms.
     * @type {?|undefined}
     */
    NgbToastOptions.prototype.autohide;
    /**
     * Delay in ms after which the `hide()` output should be emitted.
     * @type {?|undefined}
     */
    NgbToastOptions.prototype.delay;
    /**
     * Type of aria-live attribute to be used.
     *
     * Could be one of these 2 values (as string):
     * - `polite` (default)
     * - `alert`
     * @type {?|undefined}
     */
    NgbToastOptions.prototype.ariaLive;
}
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * \@since 5.0.0
 */
var NgbToastConfig = /** @class */ (function () {
    function NgbToastConfig() {
        this.autohide = true;
        this.delay = 500;
        this.ariaLive = 'polite';
    }
    NgbToastConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbToastConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbToastConfig_Factory() { return new NgbToastConfig(); }, token: NgbToastConfig, providedIn: "root" });
    return NgbToastConfig;
}());
export { NgbToastConfig };
if (false) {
    /** @type {?} */
    NgbToastConfig.prototype.autohide;
    /** @type {?} */
    NgbToastConfig.prototype.delay;
    /** @type {?} */
    NgbToastConfig.prototype.ariaLive;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0b2FzdC90b2FzdC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBT3pDLHFDQW9CQzs7Ozs7OztJQWZDLG1DQUFtQjs7Ozs7SUFLbkIsZ0NBQWU7Ozs7Ozs7OztJQVNmLG1DQUE4Qjs7Ozs7Ozs7O0FBVWhDO0lBQUE7UUFFRSxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixhQUFRLEdBQXVCLFFBQVEsQ0FBQztLQUN6Qzs7Z0JBTEEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7O3lCQXBDaEM7Q0F5Q0MsQUFMRCxJQUtDO1NBSlksY0FBYzs7O0lBQ3pCLGtDQUFnQjs7SUFDaEIsK0JBQVk7O0lBQ1osa0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgdXNlZCB0byB0eXBlIGFsbCB0b2FzdCBjb25maWcgb3B0aW9ucy4gU2VlIGBOZ2JUb2FzdENvbmZpZ2AuXG4gKlxuICogQHNpbmNlIDUuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVG9hc3RPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgaWYgdGhlIHRvYXN0IGNvbXBvbmVudCBzaG91bGQgZW1pdCB0aGUgYGhpZGUoKWAgb3V0cHV0XG4gICAqIGFmdGVyIGEgY2VydGFpbiBgZGVsYXlgIGluIG1zLlxuICAgKi9cbiAgYXV0b2hpZGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZWxheSBpbiBtcyBhZnRlciB3aGljaCB0aGUgYGhpZGUoKWAgb3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxuICAgKi9cbiAgZGVsYXk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgYXJpYS1saXZlIGF0dHJpYnV0ZSB0byBiZSB1c2VkLlxuICAgKlxuICAgKiBDb3VsZCBiZSBvbmUgb2YgdGhlc2UgMiB2YWx1ZXMgKGFzIHN0cmluZyk6XG4gICAqIC0gYHBvbGl0ZWAgKGRlZmF1bHQpXG4gICAqIC0gYGFsZXJ0YFxuICAgKi9cbiAgYXJpYUxpdmU/OiAncG9saXRlJyB8ICdhbGVydCc7XG59XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVG9hc3QgY29tcG9uZW50LiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LFxuICogYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdG9hc3RzIHVzZWQgaW4gdGhlXG4gKiBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAc2luY2UgNS4wLjBcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiVG9hc3RDb25maWcgaW1wbGVtZW50cyBOZ2JUb2FzdE9wdGlvbnMge1xuICBhdXRvaGlkZSA9IHRydWU7XG4gIGRlbGF5ID0gNTAwO1xuICBhcmlhTGl2ZTogJ3BvbGl0ZScgfCAnYWxlcnQnID0gJ3BvbGl0ZSc7XG59XG4iXX0=