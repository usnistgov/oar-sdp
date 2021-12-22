/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, race } from 'rxjs';
import { delay, filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
import { closest } from './util';
/** @type {?} */
const isContainedIn = (/**
 * @param {?} element
 * @param {?=} array
 * @return {?}
 */
(element, array) => array ? array.some((/**
 * @param {?} item
 * @return {?}
 */
item => item.contains(element))) : false);
const ɵ0 = isContainedIn;
/** @type {?} */
const matchesSelectorIfAny = (/**
 * @param {?} element
 * @param {?=} selector
 * @return {?}
 */
(element, selector) => !selector || closest(element, selector) != null);
const ɵ1 = matchesSelectorIfAny;
// we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
const ɵ2 = /**
 * @return {?}
 */
() => {
    /** @type {?} */
    const isIOS = (/**
     * @return {?}
     */
    () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2));
    /** @type {?} */
    const isAndroid = (/**
     * @return {?}
     */
    () => /Android/.test(navigator.userAgent));
    return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
};
/** @type {?} */
const isMobile = ((ɵ2))();
// setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
// when tapping on the triggering element
/** @type {?} */
const wrapAsyncForMobile = (/**
 * @param {?} fn
 * @return {?}
 */
fn => isMobile ? (/**
 * @return {?}
 */
() => setTimeout((/**
 * @return {?}
 */
() => fn()), 100)) : fn);
const ɵ3 = wrapAsyncForMobile;
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
        () => {
            /** @type {?} */
            const shouldCloseOnClick = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const element = (/** @type {?} */ (event.target));
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
            const escapes$ = fromEvent(document, 'keydown')
                .pipe(takeUntil(closed$), 
            // tslint:disable-next-line:deprecation
            filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e.which === Key.Escape)), tap((/**
             * @param {?} e
             * @return {?}
             */
            e => e.preventDefault())));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
            // because on 'mouseup' DOM nodes might be detached
            /** @type {?} */
            const mouseDowns$ = fromEvent(document, 'mousedown').pipe(map(shouldCloseOnClick), takeUntil(closed$));
            /** @type {?} */
            const closeableClicks$ = (/** @type {?} */ (fromEvent(document, 'mouseup')
                .pipe(withLatestFrom(mouseDowns$), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ([_, shouldClose]) => shouldClose)), delay(0), takeUntil(closed$))));
            race([escapes$, closeableClicks$]).subscribe((/**
             * @return {?}
             */
            () => zone.run(close)));
        })));
    }
}
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2Nsb3NlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL2F1dG9jbG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBYyxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEYsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sUUFBUSxDQUFDOztNQUV6QixhQUFhOzs7OztBQUFHLENBQUMsT0FBb0IsRUFBRSxLQUFxQixFQUFFLEVBQUUsQ0FDbEUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSTs7OztBQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7OztNQUV4RCxvQkFBb0I7Ozs7O0FBQUcsQ0FBQyxPQUFvQixFQUFFLFFBQWlCLEVBQUUsRUFBRSxDQUNyRSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQTs7Ozs7OztBQUlqQyxHQUFHLEVBQUU7O1VBQ2YsS0FBSzs7O0lBQUcsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDNUQsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUE7O1VBQ2pHLFNBQVM7OztJQUFHLEdB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QUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUM3RSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0tBQ0w7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGUsIHJhY2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheSwgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCwgdGFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4va2V5JztcbmltcG9ydCB7Y2xvc2VzdH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgaXNDb250YWluZWRJbiA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgYXJyYXk/OiBIVE1MRWxlbWVudFtdKSA9PlxuICAgIGFycmF5ID8gYXJyYXkuc29tZShpdGVtID0+IGl0ZW0uY29udGFpbnMoZWxlbWVudCkpIDogZmFsc2U7XG5cbmNvbnN0IG1hdGNoZXNTZWxlY3RvcklmQW55ID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcj86IHN0cmluZykgPT5cbiAgICAhc2VsZWN0b3IgfHwgY2xvc2VzdChlbGVtZW50LCBzZWxlY3RvcikgIT0gbnVsbDtcblxuLy8gd2UgaGF2ZSB0byBhZGQgYSBtb3JlIHNpZ25pZmljYW50IGRlbGF5IHRvIGF2b2lkIHJlLW9wZW5pbmcgd2hlbiBoYW5kbGluZyAoY2xpY2spIG9uIGEgdG9nZ2xpbmcgZWxlbWVudFxuLy8gVE9ETzogdXNlIHByb3BlciBBbmd1bGFyIHBsYXRmb3JtIGRldGVjdGlvbiB3aGVuIE5nYkF1dG9DbG9zZSBiZWNvbWVzIGEgc2VydmljZSBhbmQgd2UgY2FuIGluamVjdCBQTEFURk9STV9JRFxuY29uc3QgaXNNb2JpbGUgPSAoKCkgPT4ge1xuICBjb25zdCBpc0lPUyA9ICgpID0+IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8XG4gICAgICAoL01hY2ludG9zaC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMik7XG4gIGNvbnN0IGlzQW5kcm9pZCA9ICgpID0+IC9BbmRyb2lkLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIHJldHVybiB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyA/ICEhbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiAoaXNJT1MoKSB8fCBpc0FuZHJvaWQoKSkgOiBmYWxzZTtcbn0pKCk7XG5cbi8vIHNldHRpbmcgJ25nYkF1dG9DbG9zZScgc3luY2hyb25vdXNseSBvbiBtb2JpbGUgcmVzdWx0cyBpbiBpbW1lZGlhdGUgcG9wdXAgY2xvc2luZ1xuLy8gd2hlbiB0YXBwaW5nIG9uIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnRcbmNvbnN0IHdyYXBBc3luY0Zvck1vYmlsZSA9IGZuID0+IGlzTW9iaWxlID8gKCkgPT4gc2V0VGltZW91dCgoKSA9PiBmbigpLCAxMDApIDogZm47XG5cbmV4cG9ydCBmdW5jdGlvbiBuZ2JBdXRvQ2xvc2UoXG4gICAgem9uZTogTmdab25lLCBkb2N1bWVudDogYW55LCB0eXBlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScsIGNsb3NlOiAoKSA9PiB2b2lkLCBjbG9zZWQkOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgaW5zaWRlRWxlbWVudHM6IEhUTUxFbGVtZW50W10sIGlnbm9yZUVsZW1lbnRzPzogSFRNTEVsZW1lbnRbXSwgaW5zaWRlU2VsZWN0b3I/OiBzdHJpbmcpIHtcbiAgLy8gY2xvc2luZyBvbiBFU0MgYW5kIG91dHNpZGUgY2xpY2tzXG4gIGlmICh0eXBlKSB7XG4gICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcih3cmFwQXN5bmNGb3JNb2JpbGUoKCkgPT4ge1xuXG4gICAgICBjb25zdCBzaG91bGRDbG9zZU9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMiB8fCBpc0NvbnRhaW5lZEluKGVsZW1lbnQsIGlnbm9yZUVsZW1lbnRzKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2luc2lkZScpIHtcbiAgICAgICAgICByZXR1cm4gaXNDb250YWluZWRJbihlbGVtZW50LCBpbnNpZGVFbGVtZW50cykgJiYgbWF0Y2hlc1NlbGVjdG9ySWZBbnkoZWxlbWVudCwgaW5zaWRlU2VsZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvdXRzaWRlJykge1xuICAgICAgICAgIHJldHVybiAhaXNDb250YWluZWRJbihlbGVtZW50LCBpbnNpZGVFbGVtZW50cyk7XG4gICAgICAgIH0gZWxzZSAvKiBpZiAodHlwZSA9PT0gdHJ1ZSkgKi8ge1xuICAgICAgICAgIHJldHVybiBtYXRjaGVzU2VsZWN0b3JJZkFueShlbGVtZW50LCBpbnNpZGVTZWxlY3RvcikgfHwgIWlzQ29udGFpbmVkSW4oZWxlbWVudCwgaW5zaWRlRWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pihkb2N1bWVudCwgJ2tleWRvd24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKGNsb3NlZCQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5Fc2NhcGUpLCB0YXAoZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpKTtcblxuXG4gICAgICAvLyB3ZSBoYXZlIHRvIHByZS1jYWxjdWxhdGUgJ3Nob3VsZENsb3NlT25DbGljaycgb24gJ21vdXNlZG93bicsXG4gICAgICAvLyBiZWNhdXNlIG9uICdtb3VzZXVwJyBET00gbm9kZXMgbWlnaHQgYmUgZGV0YWNoZWRcbiAgICAgIGNvbnN0IG1vdXNlRG93bnMkID1cbiAgICAgICAgICBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZWRvd24nKS5waXBlKG1hcChzaG91bGRDbG9zZU9uQ2xpY2spLCB0YWtlVW50aWwoY2xvc2VkJCkpO1xuXG4gICAgICBjb25zdCBjbG9zZWFibGVDbGlja3MkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2V1cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20obW91c2VEb3ducyQpLCBmaWx0ZXIoKFtfLCBzaG91bGRDbG9zZV0pID0+IHNob3VsZENsb3NlKSwgZGVsYXkoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwoY2xvc2VkJCkpIGFzIE9ic2VydmFibGU8TW91c2VFdmVudD47XG5cblxuICAgICAgcmFjZTxFdmVudD4oW2VzY2FwZXMkLCBjbG9zZWFibGVDbGlja3MkXSkuc3Vic2NyaWJlKCgpID0+IHpvbmUucnVuKGNsb3NlKSk7XG4gICAgfSkpO1xuICB9XG59XG4iXX0=