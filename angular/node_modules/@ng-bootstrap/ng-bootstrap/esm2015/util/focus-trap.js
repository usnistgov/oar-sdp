/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
/** @type {?} */
const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
export function getFocusableBoundaryElements(element) {
    /** @type {?} */
    const list = Array.from((/** @type {?} */ (element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))))
        .filter((/**
     * @param {?} el
     * @return {?}
     */
    el => el.tabIndex !== -1));
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param zone Angular zone
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * \@param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 * @type {?}
 */
export const ngbFocusTrap = (/**
 * @param {?} zone
 * @param {?} element
 * @param {?} stopFocusTrap$
 * @param {?=} refocusOnClick
 * @return {?}
 */
(zone, element, stopFocusTrap$, refocusOnClick = false) => {
    zone.runOutsideAngular((/**
     * @return {?}
     */
    () => {
        // last focused element
        /** @type {?} */
        const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map((/**
         * @param {?} e
         * @return {?}
         */
        e => e.target)));
        // 'tab' / 'shift+tab' stream
        fromEvent(element, 'keydown')
            .pipe(takeUntil(stopFocusTrap$), 
        // tslint:disable:deprecation
        filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.which === Key.Tab)), 
        // tslint:enable:deprecation
        withLatestFrom(lastFocusedElement$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([tabEvent, focusedElement]) => {
            const [first, last] = getFocusableBoundaryElements(element);
            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        }));
        // inside click
        if (refocusOnClick) {
            fromEvent(element, 'click')
                .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map((/**
             * @param {?} arr
             * @return {?}
             */
            arr => (/** @type {?} */ (arr[1])))))
                .subscribe((/**
             * @param {?} lastFocusedElement
             * @return {?}
             */
            lastFocusedElement => lastFocusedElement.focus()));
        }
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFDOztNQUdwQiwyQkFBMkIsR0FBRztJQUNsQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsNENBQTRDLEVBQUUsd0JBQXdCO0lBQzNHLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLGlDQUFpQztDQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztBQUtaLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxPQUFvQjs7VUFDekQsSUFBSSxHQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLEVBQTJCLENBQUM7U0FDdkYsTUFBTTs7OztJQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBQztJQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFjRCxNQUFNLE9BQU8sWUFBWTs7Ozs7OztBQUNyQixDQUFDLElBQVksRUFBRSxPQUFvQixFQUFFLGNBQStCLEVBQUUsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFFO0lBQzlGLElBQUksQ0FBQyxpQkFBaUI7OztJQUFDLEdBQUcsRUFBRTs7O2NBRXBCLG1CQUFtQixHQUNyQixTQUFTLENBQWEsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDO1FBRWpHLDZCQUE2QjtRQUM3QixTQUFTLENBQWdCLE9BQU8sRUFBRSxTQUFTLENBQUM7YUFDdkMsSUFBSSxDQUNELFNBQVMsQ0FBQyxjQUFjLENBQUM7UUFDekIsNkJBQTZCO1FBQzdCLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBQztRQUNoQyw0QkFBNEI7UUFDNUIsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDdkMsU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRTtrQkFDbkMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsNEJBQTRCLENBQUMsT0FBTyxDQUFDO1lBRTFELElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxJQUFJLGNBQWMsS0FBSyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNqRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxjQUFjLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDakQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNkLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMzQjtRQUNILENBQUMsRUFBQyxDQUFDO1FBRVAsZUFBZTtRQUNmLElBQUksY0FBYyxFQUFFO1lBQ2xCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2lCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUc7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBZSxFQUFDLENBQUM7aUJBQ3ZHLFNBQVM7Ozs7WUFBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQztTQUNsRTtJQUNILENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB0YWtlVW50aWwsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7S2V5fSBmcm9tICcuL2tleSc7XG5cblxuY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxuICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcbl0uam9pbignLCAnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50W10ge1xuICBjb25zdCBsaXN0OiBIVE1MRWxlbWVudFtdID1cbiAgICAgIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pXG4gICAgICAgICAgLmZpbHRlcihlbCA9PiBlbC50YWJJbmRleCAhPT0gLTEpO1xuICByZXR1cm4gW2xpc3RbMF0sIGxpc3RbbGlzdC5sZW5ndGggLSAxXV07XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBlbmZvcmNlcyBicm93c2VyIGZvY3VzIHRvIGJlIHRyYXBwZWQgaW5zaWRlIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogV29ya3Mgb25seSBmb3IgY2xpY2tzIGluc2lkZSB0aGUgZWxlbWVudCBhbmQgbmF2aWdhdGlvbiB3aXRoICdUYWInLCBpZ25vcmluZyBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB6b25lIEFuZ3VsYXIgem9uZVxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgYXJvdW5kIHdoaWNoIGZvY3VzIHdpbGwgYmUgdHJhcHBlZCBpbnNpZGVcbiAqIEBwYXJhbSBzdG9wRm9jdXNUcmFwJCBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0uIFdoZW4gY29tcGxldGVkIHRoZSBmb2N1cyB0cmFwIHdpbGwgY2xlYW4gdXAgbGlzdGVuZXJzXG4gKiBhbmQgZnJlZSBpbnRlcm5hbCByZXNvdXJjZXNcbiAqIEBwYXJhbSByZWZvY3VzT25DbGljayBQdXQgdGhlIGZvY3VzIGJhY2sgdG8gdGhlIGxhc3QgZm9jdXNlZCBlbGVtZW50IHdoZW5ldmVyIGEgY2xpY2sgb2NjdXJzIG9uIGVsZW1lbnQgKGRlZmF1bHQgdG9cbiAqIGZhbHNlKVxuICovXG5leHBvcnQgY29uc3QgbmdiRm9jdXNUcmFwID1cbiAgICAoem9uZTogTmdab25lLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PiwgcmVmb2N1c09uQ2xpY2sgPSBmYWxzZSkgPT4ge1xuICAgICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIC8vIGxhc3QgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIGNvbnN0IGxhc3RGb2N1c2VkRWxlbWVudCQgPVxuICAgICAgICAgICAgZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KGVsZW1lbnQsICdmb2N1c2luJykucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCBtYXAoZSA9PiBlLnRhcmdldCkpO1xuXG4gICAgICAgIC8vICd0YWInIC8gJ3NoaWZ0K3RhYicgc3RyZWFtXG4gICAgICAgIGZyb21FdmVudDxLZXlib2FyZEV2ZW50PihlbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLFxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOmRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LlRhYiksXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpkZXByZWNhdGlvblxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW3RhYkV2ZW50LCBmb2N1c2VkRWxlbWVudF0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3RbZmlyc3QsIGxhc3RdID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50KTtcblxuICAgICAgICAgICAgICBpZiAoKGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCB8fCBmb2N1c2VkRWxlbWVudCA9PT0gZWxlbWVudCkgJiYgdGFiRXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBsYXN0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCAmJiAhdGFiRXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBmaXJzdC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGluc2lkZSBjbGlja1xuICAgICAgICBpZiAocmVmb2N1c09uQ2xpY2spIHtcbiAgICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgd2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCksIG1hcChhcnIgPT4gYXJyWzFdIGFzIEhUTUxFbGVtZW50KSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZShsYXN0Rm9jdXNlZEVsZW1lbnQgPT4gbGFzdEZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuIl19