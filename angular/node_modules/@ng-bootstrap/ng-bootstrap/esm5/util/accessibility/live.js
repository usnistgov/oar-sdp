/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/** @type {?} */
export var ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
/**
 * @return {?}
 */
export function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
/**
 * @param {?} document
 * @param {?=} lazyCreate
 * @return {?}
 */
function getLiveElement(document, lazyCreate) {
    if (lazyCreate === void 0) { lazyCreate = false; }
    /** @type {?} */
    var element = (/** @type {?} */ (document.body.querySelector('#ngb-live')));
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
var Live = /** @class */ (function () {
    function Live(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    Live.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Live.prototype.say = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var element = getLiveElement(this._document, true);
        /** @type {?} */
        var delay = this._delay;
        element.textContent = '';
        /** @type {?} */
        var setText = (/**
         * @return {?}
         */
        function () { return element.textContent = message; });
        if (delay === null) {
            setText();
        }
        else {
            setTimeout(setText, delay);
        }
    };
    Live.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    Live.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
    ]; };
    /** @nocollapse */ Live.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Live_Factory() { return new Live(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });
    return Live;
}());
export { Live };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Live.prototype._document;
    /**
     * @type {?}
     * @private
     */
    Live.prototype._delay;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFPekMsTUFBTSxLQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FDN0Msc0JBQXNCLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBQyxDQUFDOzs7O0FBQ25GLE1BQU0sVUFBVSx1QkFBdUI7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7QUFHRCxTQUFTLGNBQWMsQ0FBQyxRQUFhLEVBQUUsVUFBa0I7SUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7O1FBQ25ELE9BQU8sR0FBRyxtQkFBQSxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBZTtJQUVyRSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1FBQ2pDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUlEO0lBRUUsY0FBc0MsU0FBYyxFQUFtQyxNQUFXO1FBQTVELGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBbUMsV0FBTSxHQUFOLE1BQU0sQ0FBSztJQUFHLENBQUM7Ozs7SUFFdEcsMEJBQVc7OztJQUFYOztZQUNRLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxrQkFBRzs7OztJQUFILFVBQUksT0FBZTs7WUFDWCxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDOztZQUM5QyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFFekIsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7O1lBQ25CLE9BQU87OztRQUFHLGNBQU0sT0FBQSxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sRUFBN0IsQ0FBNkIsQ0FBQTtRQUNuRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWDthQUFNO1lBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7O2dCQXRCRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O2dEQUVqQixNQUFNLFNBQUMsUUFBUTtnREFBMkIsTUFBTSxTQUFDLGVBQWU7OztlQXJDL0U7Q0EwREMsQUF2QkQsSUF1QkM7U0F0QlksSUFBSTs7Ozs7O0lBQ0gseUJBQXdDOzs7OztJQUFFLHNCQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuXG4vLyB1c2VmdWxuZXNzIChhbmQgZGVmYXVsdCB2YWx1ZSkgb2YgZGVsYXkgZG9jdW1lbnRlZCBpbiBNYXRlcmlhbCdzIENES1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvNjQwNWRhOWI4ZTg1MzJhN2U1Yzg1NGM5MjBlZTE4MTVjMjc1ZDczNC9zcmMvY2RrL2ExMXkvbGl2ZS1hbm5vdW5jZXIvbGl2ZS1hbm5vdW5jZXIudHMjTDUwXG5leHBvcnQgdHlwZSBBUklBX0xJVkVfREVMQVlfVFlQRSA9IG51bWJlciB8IG51bGw7XG5leHBvcnQgY29uc3QgQVJJQV9MSVZFX0RFTEFZID0gbmV3IEluamVjdGlvblRva2VuPEFSSUFfTElWRV9ERUxBWV9UWVBFPihcbiAgICAnbGl2ZSBhbm5vdW5jZXIgZGVsYXknLCB7cHJvdmlkZWRJbjogJ3Jvb3QnLCBmYWN0b3J5OiBBUklBX0xJVkVfREVMQVlfRkFDVE9SWX0pO1xuZXhwb3J0IGZ1bmN0aW9uIEFSSUFfTElWRV9ERUxBWV9GQUNUT1JZKCk6IG51bWJlciB7XG4gIHJldHVybiAxMDA7XG59XG5cblxuZnVuY3Rpb24gZ2V0TGl2ZUVsZW1lbnQoZG9jdW1lbnQ6IGFueSwgbGF6eUNyZWF0ZSA9IGZhbHNlKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNuZ2ItbGl2ZScpIGFzIEhUTUxFbGVtZW50O1xuXG4gIGlmIChlbGVtZW50ID09IG51bGwgJiYgbGF6eUNyZWF0ZSkge1xuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICduZ2ItbGl2ZScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXRvbWljJywgJ3RydWUnKTtcblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3Itb25seScpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIEBJbmplY3QoQVJJQV9MSVZFX0RFTEFZKSBwcml2YXRlIF9kZWxheTogYW55KSB7fVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCk7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBzYXkobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGdldExpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50LCB0cnVlKTtcbiAgICBjb25zdCBkZWxheSA9IHRoaXMuX2RlbGF5O1xuXG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgIGNvbnN0IHNldFRleHQgPSAoKSA9PiBlbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBpZiAoZGVsYXkgPT09IG51bGwpIHtcbiAgICAgIHNldFRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dChzZXRUZXh0LCBkZWxheSk7XG4gICAgfVxuICB9XG59XG4iXX0=