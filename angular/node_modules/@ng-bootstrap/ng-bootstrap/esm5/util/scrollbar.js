/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () { });
var ɵ0 = noop;
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
var ScrollBar = /** @class */ (function () {
    function ScrollBar(_document) {
        this._document = _document;
    }
    /**
     * To be called right before a potential vertical scrollbar would be removed:
     *
     * - if there was a scrollbar, adds some compensation padding to the body
     * to keep the same layout as when the scrollbar is there
     * - if there was none, there is nothing to do
     *
     * @return a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    /**
     * To be called right before a potential vertical scrollbar would be removed:
     *
     * - if there was a scrollbar, adds some compensation padding to the body
     * to keep the same layout as when the scrollbar is there
     * - if there was none, there is nothing to do
     *
     * @return {?} a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    ScrollBar.prototype.compensate = /**
     * To be called right before a potential vertical scrollbar would be removed:
     *
     * - if there was a scrollbar, adds some compensation padding to the body
     * to keep the same layout as when the scrollbar is there
     * - if there was none, there is nothing to do
     *
     * @return {?} a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    function () {
        /** @type {?} */
        var width = this._getWidth();
        return !this._isPresent(width) ? noop : this._adjustBody(width);
    };
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @return a callback used to revert the padding to its previous value
     */
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @private
     * @param {?} scrollbarWidth
     * @return {?} a callback used to revert the padding to its previous value
     */
    ScrollBar.prototype._adjustBody = /**
     * Adds a padding of the given width on the right of the body.
     *
     * @private
     * @param {?} scrollbarWidth
     * @return {?} a callback used to revert the padding to its previous value
     */
    function (scrollbarWidth) {
        /** @type {?} */
        var body = this._document.body;
        /** @type {?} */
        var userSetPaddingStyle = body.style.paddingRight;
        /** @type {?} */
        var actualPadding = parseFloat(window.getComputedStyle(body)['padding-right']);
        body.style['padding-right'] = actualPadding + scrollbarWidth + "px";
        return (/**
         * @return {?}
         */
        function () { return body.style['padding-right'] = userSetPaddingStyle; });
    };
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @return true if scrollbar is present, false otherwise
     */
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @private
     * @param {?} scrollbarWidth
     * @return {?} true if scrollbar is present, false otherwise
     */
    ScrollBar.prototype._isPresent = /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @private
     * @param {?} scrollbarWidth
     * @return {?} true if scrollbar is present, false otherwise
     */
    function (scrollbarWidth) {
        /** @type {?} */
        var rect = this._document.body.getBoundingClientRect();
        /** @type {?} */
        var bodyToViewportGap = window.innerWidth - (rect.left + rect.right);
        /** @type {?} */
        var uncertainty = 0.1 * scrollbarWidth;
        return bodyToViewportGap >= scrollbarWidth - uncertainty;
    };
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @return the width of a scrollbar on this page
     */
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @private
     * @return {?} the width of a scrollbar on this page
     */
    ScrollBar.prototype._getWidth = /**
     * Calculates and returns the width of a scrollbar.
     *
     * @private
     * @return {?} the width of a scrollbar on this page
     */
    function () {
        /** @type {?} */
        var measurer = this._document.createElement('div');
        measurer.className = 'modal-scrollbar-measure';
        /** @type {?} */
        var body = this._document.body;
        body.appendChild(measurer);
        /** @type {?} */
        var width = measurer.getBoundingClientRect().width - measurer.clientWidth;
        body.removeChild(measurer);
        return width;
    };
    ScrollBar.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ScrollBar.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ ScrollBar.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(i0.ɵɵinject(i1.DOCUMENT)); }, token: ScrollBar, providedIn: "root" });
    return ScrollBar;
}());
export { ScrollBar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScrollBar.prototype._document;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL3Njcm9sbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7O0lBR25DLElBQUk7OztBQUFHLGNBQU8sQ0FBQyxDQUFBOzs7Ozs7OztBQWVyQjtJQUVFLG1CQUFzQyxTQUFjO1FBQWQsY0FBUyxHQUFULFNBQVMsQ0FBSztJQUFHLENBQUM7SUFFeEQ7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7OztJQUNILDhCQUFVOzs7Ozs7Ozs7O0lBQVY7O1lBQ1EsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSywrQkFBVzs7Ozs7OztJQUFuQixVQUFvQixjQUFzQjs7WUFDbEMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTs7WUFDMUIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZOztZQUM3QyxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFNLGFBQWEsR0FBRyxjQUFjLE9BQUksQ0FBQztRQUNwRTs7O1FBQU8sY0FBTSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsbUJBQW1CLEVBQWpELENBQWlELEVBQUM7SUFDakUsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssOEJBQVU7Ozs7Ozs7SUFBbEIsVUFBbUIsY0FBc0I7O1lBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7WUFDbEQsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7WUFDaEUsV0FBVyxHQUFHLEdBQUcsR0FBRyxjQUFjO1FBQ3hDLE9BQU8saUJBQWlCLElBQUksY0FBYyxHQUFHLFdBQVcsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNLLDZCQUFTOzs7Ozs7SUFBakI7O1lBQ1EsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNwRCxRQUFRLENBQUMsU0FBUyxHQUFHLHlCQUF5QixDQUFDOztZQUV6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBQ3JCLEtBQUssR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVc7UUFDM0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQTNERixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O2dEQUVqQixNQUFNLFNBQUMsUUFBUTs7O29CQXJCOUI7Q0ErRUMsQUE1REQsSUE0REM7U0EzRFksU0FBUzs7Ozs7O0lBQ1IsOEJBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG4vKiogVHlwZSBmb3IgdGhlIGNhbGxiYWNrIHVzZWQgdG8gcmV2ZXJ0IHRoZSBzY3JvbGxiYXIgY29tcGVuc2F0aW9uLiAqL1xuZXhwb3J0IHR5cGUgQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIgPSAoKSA9PiB2b2lkO1xuXG5cblxuLyoqXG4gKiBVdGlsaXR5IHRvIGhhbmRsZSB0aGUgc2Nyb2xsYmFyLlxuICpcbiAqIEl0IGFsbG93cyB0byBjb21wZW5zYXRlIHRoZSBsYWNrIG9mIGEgdmVydGljYWwgc2Nyb2xsYmFyIGJ5IGFkZGluZyBhblxuICogZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keSwgYW5kIHRvIHJlbW92ZSB0aGlzIGNvbXBlbnNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgU2Nyb2xsQmFyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge31cblxuICAvKipcbiAgICogVG8gYmUgY2FsbGVkIHJpZ2h0IGJlZm9yZSBhIHBvdGVudGlhbCB2ZXJ0aWNhbCBzY3JvbGxiYXIgd291bGQgYmUgcmVtb3ZlZDpcbiAgICpcbiAgICogLSBpZiB0aGVyZSB3YXMgYSBzY3JvbGxiYXIsIGFkZHMgc29tZSBjb21wZW5zYXRpb24gcGFkZGluZyB0byB0aGUgYm9keVxuICAgKiB0byBrZWVwIHRoZSBzYW1lIGxheW91dCBhcyB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgdGhlcmVcbiAgICogLSBpZiB0aGVyZSB3YXMgbm9uZSwgdGhlcmUgaXMgbm90aGluZyB0byBkb1xuICAgKlxuICAgKiBAcmV0dXJuIGEgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIGNvbXBlbnNhdGlvbiAobm9vcCBpZiB0aGVyZSB3YXMgbm9uZSxcbiAgICogb3RoZXJ3aXNlIGEgZnVuY3Rpb24gcmVtb3ZpbmcgdGhlIHBhZGRpbmcpXG4gICAqL1xuICBjb21wZW5zYXRlKCk6IENvbXBlbnNhdGlvblJldmVydGVyIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuX2dldFdpZHRoKCk7XG4gICAgcmV0dXJuICF0aGlzLl9pc1ByZXNlbnQod2lkdGgpID8gbm9vcCA6IHRoaXMuX2FkanVzdEJvZHkod2lkdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBwYWRkaW5nIG9mIHRoZSBnaXZlbiB3aWR0aCBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHkuXG4gICAqXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgcGFkZGluZyB0byBpdHMgcHJldmlvdXMgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX2FkanVzdEJvZHkoc2Nyb2xsYmFyV2lkdGg6IG51bWJlcik6IENvbXBlbnNhdGlvblJldmVydGVyIHtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCB1c2VyU2V0UGFkZGluZ1N0eWxlID0gYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ7XG4gICAgY29uc3QgYWN0dWFsUGFkZGluZyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlbJ3BhZGRpbmctcmlnaHQnXSk7XG4gICAgYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gYCR7YWN0dWFsUGFkZGluZyArIHNjcm9sbGJhcldpZHRofXB4YDtcbiAgICByZXR1cm4gKCkgPT4gYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gdXNlclNldFBhZGRpbmdTdHlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB3aGV0aGVyIGEgc2Nyb2xsYmFyIGlzIGN1cnJlbnRseSBwcmVzZW50IG9uIHRoZSBib2R5LlxuICAgKlxuICAgKiBAcmV0dXJuIHRydWUgaWYgc2Nyb2xsYmFyIGlzIHByZXNlbnQsIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgcHJpdmF0ZSBfaXNQcmVzZW50KHNjcm9sbGJhcldpZHRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBib2R5VG9WaWV3cG9ydEdhcCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gKHJlY3QubGVmdCArIHJlY3QucmlnaHQpO1xuICAgIGNvbnN0IHVuY2VydGFpbnR5ID0gMC4xICogc2Nyb2xsYmFyV2lkdGg7XG4gICAgcmV0dXJuIGJvZHlUb1ZpZXdwb3J0R2FwID49IHNjcm9sbGJhcldpZHRoIC0gdW5jZXJ0YWludHk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhbmQgcmV0dXJucyB0aGUgd2lkdGggb2YgYSBzY3JvbGxiYXIuXG4gICAqXG4gICAqIEByZXR1cm4gdGhlIHdpZHRoIG9mIGEgc2Nyb2xsYmFyIG9uIHRoaXMgcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBtZWFzdXJlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lYXN1cmVyLmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSc7XG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1lYXN1cmVyKTtcbiAgICBjb25zdCB3aWR0aCA9IG1lYXN1cmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gbWVhc3VyZXIuY2xpZW50V2lkdGg7XG4gICAgYm9keS5yZW1vdmVDaGlsZChtZWFzdXJlcik7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cbn1cbiJdfQ==