/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent, race } from 'rxjs';
import { delay, filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
import { closest } from './util';
/** @type {?} */
var isContainedIn = (/**
 * @param {?} element
 * @param {?=} array
 * @return {?}
 */
function (element, array) {
    return array ? array.some((/**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.contains(element); })) : false;
});
var ɵ0 = isContainedIn;
/** @type {?} */
var matchesSelectorIfAny = (/**
 * @param {?} element
 * @param {?=} selector
 * @return {?}
 */
function (element, selector) {
    return !selector || closest(element, selector) != null;
});
var ɵ1 = matchesSelectorIfAny;
// we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
var ɵ2 = /**
 * @return {?}
 */
function () {
    /** @type {?} */
    var isIOS = (/**
     * @return {?}
     */
    function () { return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2); });
    /** @type {?} */
    var isAndroid = (/**
     * @return {?}
     */
    function () { return /Android/.test(navigator.userAgent); });
    return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
};
/** @type {?} */
var isMobile = ((ɵ2))();
// setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
// when tapping on the triggering element
/** @type {?} */
var wrapAsyncForMobile = (/**
 * @param {?} fn
 * @return {?}
 */
function (fn) { return isMobile ? (/**
 * @return {?}
 */
function () { return setTimeout((/**
 * @return {?}
 */
function () { return fn(); }), 100); }) : fn; });
var ɵ3 = wrapAsyncForMobile;
/**
 * @param {?} zone
 * @param {?} document
 * @param {?} type
 * @param {?} close
 * @param {?} closed$
 * @param {?} insideElements
 * @param {?=} ignoreElements
 * @param {?=} insideSelector
 * @return {?}
 */
export function ngbAutoClose(zone, document, type, close, closed$, insideElements, ignoreElements, insideSelector) {
    // closing on ESC and outside clicks
    if (type) {
        zone.runOutsideAngular(wrapAsyncForMobile((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var shouldCloseOnClick = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var element = (/** @type {?} */ (event.target));
                if (event.button === 2 || isContainedIn(element, ignoreElements)) {
                    return false;
                }
                if (type === 'inside') {
                    return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
                }
                else if (type === 'outside') {
                    return !isContainedIn(element, insideElements);
                }
                else /* if (type === true) */ {
                    return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
                }
            });
            /** @type {?} */
            var escapes$ = fromEvent(document, 'keydown')
                .pipe(takeUntil(closed$), 
            // tslint:disable-next-line:deprecation
            filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.which === Key.Escape; })), tap((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.preventDefault(); })));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
            // because on 'mouseup' DOM nodes might be detached
            /** @type {?} */
            var mouseDowns$ = fromEvent(document, 'mousedown').pipe(map(shouldCloseOnClick), takeUntil(closed$));
            /** @type {?} */
            var closeableClicks$ = (/** @type {?} */ (fromEvent(document, 'mouseup')
                .pipe(withLatestFrom(mouseDowns$), filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), _ = _b[0], shouldClose = _b[1];
                return shouldClose;
            })), delay(0), takeUntil(closed$))));
            race([escapes$, closeableClicks$]).subscribe((/**
             * @return {?}
             */
            function () { return zone.run(close); }));
        })));
    }
}
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2Nsb3NlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL2F1dG9jbG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQWMsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQzs7SUFFekIsYUFBYTs7Ozs7QUFBRyxVQUFDLE9BQW9CLEVBQUUsS0FBcUI7SUFDOUQsT0FBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O0lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQixFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFBMUQsQ0FBMEQsQ0FBQTs7O0lBRXhELG9CQUFvQjs7Ozs7QUFBRyxVQUFDLE9BQW9CLEVBQUUsUUFBaUI7SUFDakUsT0FBQSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQUk7QUFBL0MsQ0FBK0MsQ0FBQTs7Ozs7OztBQUlqQzs7UUFDVixLQUFLOzs7SUFBRyxjQUFNLE9BQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDNUQsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEVBRG5GLENBQ21GLENB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QUc5RSxJQUFJLENBQVEsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVM7OztZQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFmLENBQWUsRUFBQyxDQUFDO1FBQzdFLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDTDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZSwgcmFjZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlbGF5LCBmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB0YXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi9rZXknO1xuaW1wb3J0IHtjbG9zZXN0fSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBpc0NvbnRhaW5lZEluID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhcnJheT86IEhUTUxFbGVtZW50W10pID0+XG4gICAgYXJyYXkgPyBhcnJheS5zb21lKGl0ZW0gPT4gaXRlbS5jb250YWlucyhlbGVtZW50KSkgOiBmYWxzZTtcblxuY29uc3QgbWF0Y2hlc1NlbGVjdG9ySWZBbnkgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yPzogc3RyaW5nKSA9PlxuICAgICFzZWxlY3RvciB8fCBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSAhPSBudWxsO1xuXG4vLyB3ZSBoYXZlIHRvIGFkZCBhIG1vcmUgc2lnbmlmaWNhbnQgZGVsYXkgdG8gYXZvaWQgcmUtb3BlbmluZyB3aGVuIGhhbmRsaW5nIChjbGljaykgb24gYSB0b2dnbGluZyBlbGVtZW50XG4vLyBUT0RPOiB1c2UgcHJvcGVyIEFuZ3VsYXIgcGxhdGZvcm0gZGV0ZWN0aW9uIHdoZW4gTmdiQXV0b0Nsb3NlIGJlY29tZXMgYSBzZXJ2aWNlIGFuZCB3ZSBjYW4gaW5qZWN0IFBMQVRGT1JNX0lEXG5jb25zdCBpc01vYmlsZSA9ICgoKSA9PiB7XG4gIGNvbnN0IGlzSU9TID0gKCkgPT4gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHxcbiAgICAgICgvTWFjaW50b3NoLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAyKTtcbiAgY29uc3QgaXNBbmRyb2lkID0gKCkgPT4gL0FuZHJvaWQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgcmV0dXJuIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnID8gISFuYXZpZ2F0b3IudXNlckFnZW50ICYmIChpc0lPUygpIHx8IGlzQW5kcm9pZCgpKSA6IGZhbHNlO1xufSkoKTtcblxuLy8gc2V0dGluZyAnbmdiQXV0b0Nsb3NlJyBzeW5jaHJvbm91c2x5IG9uIG1vYmlsZSByZXN1bHRzIGluIGltbWVkaWF0ZSBwb3B1cCBjbG9zaW5nXG4vLyB3aGVuIHRhcHBpbmcgb24gdGhlIHRyaWdnZXJpbmcgZWxlbWVudFxuY29uc3Qgd3JhcEFzeW5jRm9yTW9iaWxlID0gZm4gPT4gaXNNb2JpbGUgPyAoKSA9PiBzZXRUaW1lb3V0KCgpID0+IGZuKCksIDEwMCkgOiBmbjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5nYkF1dG9DbG9zZShcbiAgICB6b25lOiBOZ1pvbmUsIGRvY3VtZW50OiBhbnksIHR5cGU6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJywgY2xvc2U6ICgpID0+IHZvaWQsIGNsb3NlZCQ6IE9ic2VydmFibGU8YW55PixcbiAgICBpbnNpZGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSwgaWdub3JlRWxlbWVudHM/OiBIVE1MRWxlbWVudFtdLCBpbnNpZGVTZWxlY3Rvcj86IHN0cmluZykge1xuICAvLyBjbG9zaW5nIG9uIEVTQyBhbmQgb3V0c2lkZSBjbGlja3NcbiAgaWYgKHR5cGUpIHtcbiAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKHdyYXBBc3luY0Zvck1vYmlsZSgoKSA9PiB7XG5cbiAgICAgIGNvbnN0IHNob3VsZENsb3NlT25DbGljayA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyIHx8IGlzQ29udGFpbmVkSW4oZWxlbWVudCwgaWdub3JlRWxlbWVudHMpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnaW5zaWRlJykge1xuICAgICAgICAgIHJldHVybiBpc0NvbnRhaW5lZEluKGVsZW1lbnQsIGluc2lkZUVsZW1lbnRzKSAmJiBtYXRjaGVzU2VsZWN0b3JJZkFueShlbGVtZW50LCBpbnNpZGVTZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ291dHNpZGUnKSB7XG4gICAgICAgICAgcmV0dXJuICFpc0NvbnRhaW5lZEluKGVsZW1lbnQsIGluc2lkZUVsZW1lbnRzKTtcbiAgICAgICAgfSBlbHNlIC8qIGlmICh0eXBlID09PSB0cnVlKSAqLyB7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoZXNTZWxlY3RvcklmQW55KGVsZW1lbnQsIGluc2lkZVNlbGVjdG9yKSB8fCAhaXNDb250YWluZWRJbihlbGVtZW50LCBpbnNpZGVFbGVtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KGRvY3VtZW50LCAna2V5ZG93bicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwoY2xvc2VkJCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LkVzY2FwZSksIHRhcChlID0+IGUucHJldmVudERlZmF1bHQoKSkpO1xuXG5cbiAgICAgIC8vIHdlIGhhdmUgdG8gcHJlLWNhbGN1bGF0ZSAnc2hvdWxkQ2xvc2VPbkNsaWNrJyBvbiAnbW91c2Vkb3duJyxcbiAgICAgIC8vIGJlY2F1c2Ugb24gJ21vdXNldXAnIERPTSBub2RlcyBtaWdodCBiZSBkZXRhY2hlZFxuICAgICAgY29uc3QgbW91c2VEb3ducyQgPVxuICAgICAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNlZG93bicpLnBpcGUobWFwKHNob3VsZENsb3NlT25DbGljayksIHRha2VVbnRpbChjbG9zZWQkKSk7XG5cbiAgICAgIGNvbnN0IGNsb3NlYWJsZUNsaWNrcyQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZXVwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbShtb3VzZURvd25zJCksIGZpbHRlcigoW18sIHNob3VsZENsb3NlXSkgPT4gc2hvdWxkQ2xvc2UpLCBkZWxheSgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbChjbG9zZWQkKSkgYXMgT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcblxuXG4gICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIGNsb3NlYWJsZUNsaWNrcyRdKS5zdWJzY3JpYmUoKCkgPT4gem9uZS5ydW4oY2xvc2UpKTtcbiAgICB9KSk7XG4gIH1cbn1cbiJdfQ==