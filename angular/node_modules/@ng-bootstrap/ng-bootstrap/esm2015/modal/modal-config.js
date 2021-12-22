/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Options available when opening new modal windows with `NgbModal.open()` method.
 * @record
 */
export function NgbModalOptions() { }
if (false) {
    /**
     * `aria-labelledby` attribute value to set on the modal window.
     *
     * \@since 2.2.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.ariaLabelledBy;
    /**
     * If `true`, the backdrop element will be created for a given modal.
     *
     * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
     *
     * Default value is `true`.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.backdrop;
    /**
     * Callback right before the modal will be dismissed.
     *
     * If this function returns:
     * * `false`
     * * a promise resolved with `false`
     * * a promise that is rejected
     *
     * then the modal won't be dismissed.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.beforeDismiss;
    /**
     * If `true`, the modal will be centered vertically.
     *
     * Default value is `false`.
     *
     * \@since 1.1.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.centered;
    /**
     * A selector specifying the element all new modal windows should be appended to.
     * Since v5.3.0 it is also possible to pass the reference to an `HTMLElement`.
     *
     * If not specified, will be `body`.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.container;
    /**
     * The `Injector` to use for modal content.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.injector;
    /**
     * If `true`, the modal will be closed when `Escape` key is pressed
     *
     * Default value is `true`.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.keyboard;
    /**
     * Scrollable modal content (false by default).
     *
     * \@since 5.0.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.scrollable;
    /**
     * Size of a new modal window.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.size;
    /**
     * A custom class to append to the modal window.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.windowClass;
    /**
     * A custom class to append to the modal backdrop.
     *
     * \@since 1.1.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.backdropClass;
}
/**
 * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
 *
 * \@since 3.1.0
 */
export class NgbModalConfig {
    constructor() {
        this.backdrop = true;
        this.keyboard = true;
    }
}
NgbModalConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbModalConfig.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgbModalConfig.prototype.ariaLabelledBy;
    /** @type {?} */
    NgbModalConfig.prototype.backdrop;
    /** @type {?} */
    NgbModalConfig.prototype.beforeDismiss;
    /** @type {?} */
    NgbModalConfig.prototype.centered;
    /** @type {?} */
    NgbModalConfig.prototype.container;
    /** @type {?} */
    NgbModalConfig.prototype.injector;
    /** @type {?} */
    NgbModalConfig.prototype.keyboard;
    /** @type {?} */
    NgbModalConfig.prototype.scrollable;
    /** @type {?} */
    NgbModalConfig.prototype.size;
    /** @type {?} */
    NgbModalConfig.prototype.windowClass;
    /** @type {?} */
    NgbModalConfig.prototype.backdropClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUtuRCxxQ0FpRkM7Ozs7Ozs7O0lBM0VDLHlDQUF3Qjs7Ozs7Ozs7O0lBU3hCLG1DQUE4Qjs7Ozs7Ozs7Ozs7O0lBWTlCLHdDQUFpRDs7Ozs7Ozs7O0lBU2pELG1DQUFtQjs7Ozs7Ozs7SUFRbkIsb0NBQWlDOzs7OztJQUtqQyxtQ0FBb0I7Ozs7Ozs7SUFPcEIsbUNBQW1COzs7Ozs7O0lBT25CLHFDQUFxQjs7Ozs7SUFLckIsK0JBQW1DOzs7OztJQUtuQyxzQ0FBcUI7Ozs7Ozs7SUFPckIsd0NBQXVCOzs7Ozs7Ozs7O0FBWXpCLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBR0UsYUFBUSxHQUF1QixJQUFJLENBQUM7UUFLcEMsYUFBUSxHQUFHLElBQUksQ0FBQztLQUtqQjs7O1lBYkEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs7SUFFOUIsd0NBQXVCOztJQUN2QixrQ0FBb0M7O0lBQ3BDLHVDQUFnRDs7SUFDaEQsa0NBQWtCOztJQUNsQixtQ0FBa0I7O0lBQ2xCLGtDQUFtQjs7SUFDbkIsa0NBQWdCOztJQUNoQixvQ0FBb0I7O0lBQ3BCLDhCQUFrQzs7SUFDbEMscUNBQW9COztJQUNwQix1Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBPcHRpb25zIGF2YWlsYWJsZSB3aGVuIG9wZW5pbmcgbmV3IG1vZGFsIHdpbmRvd3Mgd2l0aCBgTmdiTW9kYWwub3BlbigpYCBtZXRob2QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiTW9kYWxPcHRpb25zIHtcbiAgLyoqXG4gICAqIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZSB2YWx1ZSB0byBzZXQgb24gdGhlIG1vZGFsIHdpbmRvdy5cbiAgICpcbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBhcmlhTGFiZWxsZWRCeT86IHN0cmluZztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgYmFja2Ryb3AgZWxlbWVudCB3aWxsIGJlIGNyZWF0ZWQgZm9yIGEgZ2l2ZW4gbW9kYWwuXG4gICAqXG4gICAqIEFsdGVybmF0aXZlbHksIHNwZWNpZnkgYCdzdGF0aWMnYCBmb3IgYSBiYWNrZHJvcCB3aGljaCBkb2Vzbid0IGNsb3NlIHRoZSBtb2RhbCBvbiBjbGljay5cbiAgICpcbiAgICogRGVmYXVsdCB2YWx1ZSBpcyBgdHJ1ZWAuXG4gICAqL1xuICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJztcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmlnaHQgYmVmb3JlIHRoZSBtb2RhbCB3aWxsIGJlIGRpc21pc3NlZC5cbiAgICpcbiAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zOlxuICAgKiAqIGBmYWxzZWBcbiAgICogKiBhIHByb21pc2UgcmVzb2x2ZWQgd2l0aCBgZmFsc2VgXG4gICAqICogYSBwcm9taXNlIHRoYXQgaXMgcmVqZWN0ZWRcbiAgICpcbiAgICogdGhlbiB0aGUgbW9kYWwgd29uJ3QgYmUgZGlzbWlzc2VkLlxuICAgKi9cbiAgYmVmb3JlRGlzbWlzcz86ICgpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBtb2RhbCB3aWxsIGJlIGNlbnRlcmVkIHZlcnRpY2FsbHkuXG4gICAqXG4gICAqIERlZmF1bHQgdmFsdWUgaXMgYGZhbHNlYC5cbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBjZW50ZXJlZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCBhbGwgbmV3IG1vZGFsIHdpbmRvd3Mgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBTaW5jZSB2NS4zLjAgaXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIHRoZSByZWZlcmVuY2UgdG8gYW4gYEhUTUxFbGVtZW50YC5cbiAgICpcbiAgICogSWYgbm90IHNwZWNpZmllZCwgd2lsbCBiZSBgYm9keWAuXG4gICAqL1xuICBjb250YWluZXI/OiBzdHJpbmcgfCBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogVGhlIGBJbmplY3RvcmAgdG8gdXNlIGZvciBtb2RhbCBjb250ZW50LlxuICAgKi9cbiAgaW5qZWN0b3I/OiBJbmplY3RvcjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgbW9kYWwgd2lsbCBiZSBjbG9zZWQgd2hlbiBgRXNjYXBlYCBrZXkgaXMgcHJlc3NlZFxuICAgKlxuICAgKiBEZWZhdWx0IHZhbHVlIGlzIGB0cnVlYC5cbiAgICovXG4gIGtleWJvYXJkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2Nyb2xsYWJsZSBtb2RhbCBjb250ZW50IChmYWxzZSBieSBkZWZhdWx0KS5cbiAgICpcbiAgICogQHNpbmNlIDUuMC4wXG4gICAqL1xuICBzY3JvbGxhYmxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2l6ZSBvZiBhIG5ldyBtb2RhbCB3aW5kb3cuXG4gICAqL1xuICBzaXplPzogJ3NtJyB8ICdsZycgfCAneGwnIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBjbGFzcyB0byBhcHBlbmQgdG8gdGhlIG1vZGFsIHdpbmRvdy5cbiAgICovXG4gIHdpbmRvd0NsYXNzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBjbGFzcyB0byBhcHBlbmQgdG8gdGhlIG1vZGFsIGJhY2tkcm9wLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYk1vZGFsYF0oIy9jb21wb25lbnRzL21vZGFsL2FwaSNOZ2JNb2RhbCkgc2VydmljZS5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCBtb2RhbHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4qXG4qIEBzaW5jZSAzLjEuMFxuKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQ29uZmlnIGltcGxlbWVudHMgUmVxdWlyZWQ8TmdiTW9kYWxPcHRpb25zPiB7XG4gIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG4gIGJhY2tkcm9wOiBib29sZWFuIHwgJ3N0YXRpYycgPSB0cnVlO1xuICBiZWZvcmVEaXNtaXNzOiAoKSA9PiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcbiAgY2VudGVyZWQ6IGJvb2xlYW47XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG4gIGtleWJvYXJkID0gdHJ1ZTtcbiAgc2Nyb2xsYWJsZTogYm9vbGVhbjtcbiAgc2l6ZTogJ3NtJyB8ICdsZycgfCAneGwnIHwgc3RyaW5nO1xuICB3aW5kb3dDbGFzczogc3RyaW5nO1xuICBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XG59XG4iXX0=