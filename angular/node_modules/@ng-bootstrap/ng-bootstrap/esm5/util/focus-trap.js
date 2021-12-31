import { __read } from "tslib";
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
export var FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
export function getFocusableBoundaryElements(element) {
    var list = Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))
        .filter(function (el) { return el.tabIndex !== -1; });
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * @param zone Angular zone
 * @param element The element around which focus will be trapped inside
 * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 */
export var ngbFocusTrap = function (zone, element, stopFocusTrap$, refocusOnClick) {
    if (refocusOnClick === void 0) { refocusOnClick = false; }
    zone.runOutsideAngular(function () {
        // last focused element
        var lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(function (e) { return e.target; }));
        // 'tab' / 'shift+tab' stream
        fromEvent(element, 'keydown')
            .pipe(takeUntil(stopFocusTrap$), 
        // tslint:disable:deprecation
        filter(function (e) { return e.which === Key.Tab; }), 
        // tslint:enable:deprecation
        withLatestFrom(lastFocusedElement$))
            .subscribe(function (_a) {
            var _b = __read(_a, 2), tabEvent = _b[0], focusedElement = _b[1];
            var _c = __read(getFocusableBoundaryElements(element), 2), first = _c[0], last = _c[1];
            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        });
        // inside click
        if (refocusOnClick) {
            fromEvent(element, 'click')
                .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(function (arr) { return arr[1]; }))
                .subscribe(function (lastFocusedElement) { return lastFocusedElement.focus(); });
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBRzFCLE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFHO0lBQ3pDLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSw0Q0FBNEMsRUFBRSx3QkFBd0I7SUFDM0csMEJBQTBCLEVBQUUsbUJBQW1CLEVBQUUsaUNBQWlDO0NBQ25GLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsT0FBb0I7SUFDL0QsSUFBTSxJQUFJLEdBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQTRCLENBQUM7U0FDdkYsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQ3JCLFVBQUMsSUFBWSxFQUFFLE9BQW9CLEVBQUUsY0FBK0IsRUFBRSxjQUFzQjtJQUF0QiwrQkFBQSxFQUFBLHNCQUFzQjtJQUMxRixJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDckIsdUJBQXVCO1FBQ3ZCLElBQU0sbUJBQW1CLEdBQ3JCLFNBQVMsQ0FBYSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsQ0FBQyxDQUFDLENBQUM7UUFFbEcsNkJBQTZCO1FBQzdCLFNBQVMsQ0FBZ0IsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUN2QyxJQUFJLENBQ0QsU0FBUyxDQUFDLGNBQWMsQ0FBQztRQUN6Qiw2QkFBNkI7UUFDN0IsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRyxFQUFuQixDQUFtQixDQUFDO1FBQ2hDLDRCQUE0QjtRQUM1QixjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUN2QyxTQUFTLENBQUMsVUFBQyxFQUEwQjtnQkFBMUIsa0JBQTBCLEVBQXpCLGdCQUFRLEVBQUUsc0JBQWM7WUFDOUIsSUFBQSxxREFBcUQsRUFBcEQsYUFBSyxFQUFFLFlBQTZDLENBQUM7WUFFM0QsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLElBQUksY0FBYyxLQUFLLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDM0I7WUFFRCxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNqRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2QsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzNCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFUCxlQUFlO1FBQ2YsSUFBSSxjQUFjLEVBQUU7WUFDbEIsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7aUJBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLENBQUMsQ0FBZ0IsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO2lCQUN2RyxTQUFTLENBQUMsVUFBQSxrQkFBa0IsSUFBSSxPQUFBLGtCQUFrQixDQUFDLEtBQUssRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0tleX0gZnJvbSAnLi9rZXknO1xuXG5cbmV4cG9ydCBjb25zdCBGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IgPSBbXG4gICdhW2hyZWZdJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsXG4gICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xuXS5qb2luKCcsICcpO1xuXG4vKipcbiAqIFJldHVybnMgZmlyc3QgYW5kIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnRzIGluc2lkZSBvZiBhIGdpdmVuIGVsZW1lbnQgYmFzZWQgb24gc3BlY2lmaWMgQ1NTIHNlbGVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRbXSB7XG4gIGNvbnN0IGxpc3Q6IEhUTUxFbGVtZW50W10gPVxuICAgICAgQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PilcbiAgICAgICAgICAuZmlsdGVyKGVsID0+IGVsLnRhYkluZGV4ICE9PSAtMSk7XG4gIHJldHVybiBbbGlzdFswXSwgbGlzdFtsaXN0Lmxlbmd0aCAtIDFdXTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IGVuZm9yY2VzIGJyb3dzZXIgZm9jdXMgdG8gYmUgdHJhcHBlZCBpbnNpZGUgYSBET00gZWxlbWVudC5cbiAqXG4gKiBXb3JrcyBvbmx5IGZvciBjbGlja3MgaW5zaWRlIHRoZSBlbGVtZW50IGFuZCBuYXZpZ2F0aW9uIHdpdGggJ1RhYicsIGlnbm9yaW5nIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHpvbmUgQW5ndWxhciB6b25lXG4gKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCBhcm91bmQgd2hpY2ggZm9jdXMgd2lsbCBiZSB0cmFwcGVkIGluc2lkZVxuICogQHBhcmFtIHN0b3BGb2N1c1RyYXAkIFRoZSBvYnNlcnZhYmxlIHN0cmVhbS4gV2hlbiBjb21wbGV0ZWQgdGhlIGZvY3VzIHRyYXAgd2lsbCBjbGVhbiB1cCBsaXN0ZW5lcnNcbiAqIGFuZCBmcmVlIGludGVybmFsIHJlc291cmNlc1xuICogQHBhcmFtIHJlZm9jdXNPbkNsaWNrIFB1dCB0aGUgZm9jdXMgYmFjayB0byB0aGUgbGFzdCBmb2N1c2VkIGVsZW1lbnQgd2hlbmV2ZXIgYSBjbGljayBvY2N1cnMgb24gZWxlbWVudCAoZGVmYXVsdCB0b1xuICogZmFsc2UpXG4gKi9cbmV4cG9ydCBjb25zdCBuZ2JGb2N1c1RyYXAgPVxuICAgICh6b25lOiBOZ1pvbmUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdG9wRm9jdXNUcmFwJDogT2JzZXJ2YWJsZTxhbnk+LCByZWZvY3VzT25DbGljayA9IGZhbHNlKSA9PiB7XG4gICAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgLy8gbGFzdCBmb2N1c2VkIGVsZW1lbnRcbiAgICAgICAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50JCA9XG4gICAgICAgICAgICBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4oZWxlbWVudCwgJ2ZvY3VzaW4nKS5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIG1hcChlID0+IGUudGFyZ2V0KSk7XG5cbiAgICAgICAgLy8gJ3RhYicgLyAnc2hpZnQrdGFiJyBzdHJlYW1cbiAgICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KGVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuVGFiKSxcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOmRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbdGFiRXZlbnQsIGZvY3VzZWRFbGVtZW50XSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdFtmaXJzdCwgbGFzdF0gPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgIGlmICgoZm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0IHx8IGZvY3VzZWRFbGVtZW50ID09PSBlbGVtZW50KSAmJiB0YWJFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGxhc3QuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBsYXN0ICYmICF0YWJFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGZpcnN0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaW5zaWRlIGNsaWNrXG4gICAgICAgIGlmIChyZWZvY3VzT25DbGljaykge1xuICAgICAgICAgIGZyb21FdmVudChlbGVtZW50LCAnY2xpY2snKVxuICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSwgbWFwKGFyciA9PiBhcnJbMV0gYXMgSFRNTEVsZW1lbnQpKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKGxhc3RGb2N1c2VkRWxlbWVudCA9PiBsYXN0Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4iXX0=