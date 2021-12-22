/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable, merge } from 'rxjs';
import { share, filter, delay, map } from 'rxjs/operators';
export class Trigger {
    /**
     * @param {?} open
     * @param {?=} close
     */
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    /**
     * @return {?}
     */
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
if (false) {
    /** @type {?} */
    Trigger.prototype.open;
    /** @type {?} */
    Trigger.prototype.close;
}
/** @type {?} */
const DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave'],
    'focus': ['focusin', 'focusout'],
};
/**
 * @param {?} triggers
 * @param {?=} aliases
 * @return {?}
 */
export function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    /** @type {?} */
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    /** @type {?} */
    const parsedTriggers = trimmedTriggers.split(/\s+/).map((/**
     * @param {?} trigger
     * @return {?}
     */
    trigger => trigger.split(':'))).map((/**
     * @param {?} triggerPair
     * @return {?}
     */
    (triggerPair) => {
        /** @type {?} */
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    }));
    /** @type {?} */
    const manualTriggers = parsedTriggers.filter((/**
     * @param {?} triggerPair
     * @return {?}
     */
    triggerPair => triggerPair.isManual()));
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} isOpenedFn
 * @return {?}
 */
export function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    subscriber => {
        /** @type {?} */
        const listeners = [];
        /** @type {?} */
        const openFn = (/**
         * @return {?}
         */
        () => subscriber.next(true));
        /** @type {?} */
        const closeFn = (/**
         * @return {?}
         */
        () => subscriber.next(false));
        /** @type {?} */
        const toggleFn = (/**
         * @return {?}
         */
        () => subscriber.next(!isOpenedFn()));
        triggers.forEach((/**
         * @param {?} trigger
         * @return {?}
         */
        (trigger) => {
            if (trigger.open === trigger.close) {
                listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
            }
            else {
                listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
            }
        }));
        return (/**
         * @return {?}
         */
        () => { listeners.forEach((/**
         * @param {?} unsubscribeFn
         * @return {?}
         */
        unsubscribeFn => unsubscribeFn())); });
    }));
}
/** @type {?} */
const delayOrNoop = (/**
 * @template T
 * @param {?} time
 * @return {?}
 */
(time) => time > 0 ? delay(time) : (/**
 * @param {?} a
 * @return {?}
 */
(a) => a));
const ɵ0 = delayOrNoop;
/**
 * @param {?} openDelay
 * @param {?} closeDelay
 * @param {?} isOpenedFn
 * @return {?}
 */
export function triggerDelay(openDelay, closeDelay, isOpenedFn) {
    return (/**
     * @param {?} input$
     * @return {?}
     */
    (input$) => {
        /** @type {?} */
        let pending = null;
        /** @type {?} */
        const filteredInput$ = input$.pipe(map((/**
         * @param {?} open
         * @return {?}
         */
        open => ({ open }))), filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const currentlyOpen = isOpenedFn();
            if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
                pending = event;
                return true;
            }
            if (pending && pending.open !== event.open) {
                pending = null;
            }
            return false;
        })), share());
        /** @type {?} */
        const delayedOpen$ = filteredInput$.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.open)), delayOrNoop(openDelay));
        /** @type {?} */
        const delayedClose$ = filteredInput$.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => !event.open)), delayOrNoop(closeDelay));
        return merge(delayedOpen$, delayedClose$)
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
            }
            return false;
        })), map((/**
         * @param {?} event
         * @return {?}
         */
        event => event.open)));
    });
}
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} isOpenedFn
 * @param {?} openFn
 * @param {?} closeFn
 * @param {?=} openDelay
 * @param {?=} closeDelay
 * @return {?}
 */
export function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay = 0, closeDelay = 0) {
    /** @type {?} */
    const parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return (/**
         * @return {?}
         */
        () => { });
    }
    /** @type {?} */
    const subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
        .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
        .subscribe((/**
     * @param {?} open
     * @return {?}
     */
    open => (open ? openFn() : closeFn())));
    return (/**
     * @return {?}
     */
    () => subscription.unsubscribe());
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvdHJpZ2dlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxNQUFNLE9BQU8sT0FBTzs7Ozs7SUFDbEIsWUFBbUIsSUFBWSxFQUFTLEtBQWM7UUFBbkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDcEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztDQUN6RTs7O0lBUGEsdUJBQW1COztJQUFFLHdCQUFxQjs7O01BU2xELGVBQWUsR0FBRztJQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO0lBQ3JDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7Q0FDakM7Ozs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBZ0IsRUFBRSxPQUFPLEdBQUcsZUFBZTs7VUFDakUsZUFBZSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUUvQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1VBRUssY0FBYyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFD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QUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7Ozs7Ozs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBYSxFQUFFLGFBQWtCLEVBQUUsUUFBZ0IsRUFBRSxVQUF5QixFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLENBQUMsRUFDOUcsVUFBVSxHQUFHLENBQUM7O1VBQ1YsY0FBYyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFFOUMsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDL0Q7OztRQUFPLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztLQUNqQjs7VUFFSyxZQUFZLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztTQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDckQsU0FBUzs7OztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDO0lBRTFFOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgbWVyZ2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzaGFyZSwgZmlsdGVyLCBkZWxheSwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9wZW46IHN0cmluZywgcHVibGljIGNsb3NlPzogc3RyaW5nKSB7XG4gICAgaWYgKCFjbG9zZSkge1xuICAgICAgdGhpcy5jbG9zZSA9IG9wZW47XG4gICAgfVxuICB9XG5cbiAgaXNNYW51YWwoKSB7IHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnOyB9XG59XG5cbmNvbnN0IERFRkFVTFRfQUxJQVNFUyA9IHtcbiAgJ2hvdmVyJzogWydtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnXSxcbiAgJ2ZvY3VzJzogWydmb2N1c2luJywgJ2ZvY3Vzb3V0J10sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vyczogc3RyaW5nLCBhbGlhc2VzID0gREVGQVVMVF9BTElBU0VTKTogVHJpZ2dlcltdIHtcbiAgY29uc3QgdHJpbW1lZFRyaWdnZXJzID0gKHRyaWdnZXJzIHx8ICcnKS50cmltKCk7XG5cbiAgaWYgKHRyaW1tZWRUcmlnZ2Vycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBwYXJzZWRUcmlnZ2VycyA9IHRyaW1tZWRUcmlnZ2Vycy5zcGxpdCgvXFxzKy8pLm1hcCh0cmlnZ2VyID0+IHRyaWdnZXIuc3BsaXQoJzonKSkubWFwKCh0cmlnZ2VyUGFpcikgPT4ge1xuICAgIGxldCBhbGlhcyA9IGFsaWFzZXNbdHJpZ2dlclBhaXJbMF1dIHx8IHRyaWdnZXJQYWlyO1xuICAgIHJldHVybiBuZXcgVHJpZ2dlcihhbGlhc1swXSwgYWxpYXNbMV0pO1xuICB9KTtcblxuICBjb25zdCBtYW51YWxUcmlnZ2VycyA9IHBhcnNlZFRyaWdnZXJzLmZpbHRlcih0cmlnZ2VyUGFpciA9PiB0cmlnZ2VyUGFpci5pc01hbnVhbCgpKTtcblxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID4gMSkge1xuICAgIHRocm93ICdUcmlnZ2VycyBwYXJzZSBlcnJvcjogb25seSBvbmUgbWFudWFsIHRyaWdnZXIgaXMgYWxsb3dlZCc7XG4gIH1cblxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG1hbnVhbCB0cmlnZ2VyIGNhblxcJ3QgYmUgbWl4ZWQgd2l0aCBvdGhlciB0cmlnZ2Vycyc7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkVHJpZ2dlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlVHJpZ2dlcnMocmVuZGVyZXI6IGFueSwgbmF0aXZlRWxlbWVudDogYW55LCB0cmlnZ2VyczogVHJpZ2dlcltdLCBpc09wZW5lZEZuOiAoKSA9PiBib29sZWFuKSB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPihzdWJzY3JpYmVyID0+IHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXTtcbiAgICBjb25zdCBvcGVuRm4gPSAoKSA9PiBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgY29uc3QgY2xvc2VGbiA9ICgpID0+IHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgY29uc3QgdG9nZ2xlRm4gPSAoKSA9PiBzdWJzY3JpYmVyLm5leHQoIWlzT3BlbmVkRm4oKSk7XG5cbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyOiBUcmlnZ2VyKSA9PiB7XG4gICAgICBpZiAodHJpZ2dlci5vcGVuID09PSB0cmlnZ2VyLmNsb3NlKSB7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLm9wZW4sIHRvZ2dsZUZuKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLm9wZW4sIG9wZW5GbiksXG4gICAgICAgICAgICByZW5kZXJlci5saXN0ZW4obmF0aXZlRWxlbWVudCwgdHJpZ2dlci5jbG9zZSwgY2xvc2VGbikpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHsgbGlzdGVuZXJzLmZvckVhY2godW5zdWJzY3JpYmVGbiA9PiB1bnN1YnNjcmliZUZuKCkpOyB9O1xuICB9KTtcbn1cblxuY29uc3QgZGVsYXlPck5vb3AgPSA8VD4odGltZTogbnVtYmVyKSA9PiB0aW1lID4gMCA/IGRlbGF5PFQ+KHRpbWUpIDogKGE6IE9ic2VydmFibGU8VD4pID0+IGE7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyRGVsYXkob3BlbkRlbGF5OiBudW1iZXIsIGNsb3NlRGVsYXk6IG51bWJlciwgaXNPcGVuZWRGbjogKCkgPT4gYm9vbGVhbikge1xuICByZXR1cm4gKGlucHV0JDogT2JzZXJ2YWJsZTxib29sZWFuPikgPT4ge1xuICAgIGxldCBwZW5kaW5nID0gbnVsbDtcbiAgICBjb25zdCBmaWx0ZXJlZElucHV0JCA9IGlucHV0JC5waXBlKFxuICAgICAgICBtYXAob3BlbiA9PiAoe29wZW59KSksIGZpbHRlcihldmVudCA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudGx5T3BlbiA9IGlzT3BlbmVkRm4oKTtcbiAgICAgICAgICBpZiAoY3VycmVudGx5T3BlbiAhPT0gZXZlbnQub3BlbiAmJiAoIXBlbmRpbmcgfHwgcGVuZGluZy5vcGVuID09PSBjdXJyZW50bHlPcGVuKSkge1xuICAgICAgICAgICAgcGVuZGluZyA9IGV2ZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwZW5kaW5nICYmIHBlbmRpbmcub3BlbiAhPT0gZXZlbnQub3Blbikge1xuICAgICAgICAgICAgcGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlKCkpO1xuICAgIGNvbnN0IGRlbGF5ZWRPcGVuJCA9IGZpbHRlcmVkSW5wdXQkLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50Lm9wZW4pLCBkZWxheU9yTm9vcChvcGVuRGVsYXkpKTtcbiAgICBjb25zdCBkZWxheWVkQ2xvc2UkID0gZmlsdGVyZWRJbnB1dCQucGlwZShmaWx0ZXIoZXZlbnQgPT4gIWV2ZW50Lm9wZW4pLCBkZWxheU9yTm9vcChjbG9zZURlbGF5KSk7XG4gICAgcmV0dXJuIG1lcmdlKGRlbGF5ZWRPcGVuJCwgZGVsYXllZENsb3NlJClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgPT09IHBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQub3BlbiAhPT0gaXNPcGVuZWRGbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKGV2ZW50ID0+IGV2ZW50Lm9wZW4pKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlblRvVHJpZ2dlcnMoXG4gICAgcmVuZGVyZXI6IGFueSwgbmF0aXZlRWxlbWVudDogYW55LCB0cmlnZ2Vyczogc3RyaW5nLCBpc09wZW5lZEZuOiAoKSA9PiBib29sZWFuLCBvcGVuRm4sIGNsb3NlRm4sIG9wZW5EZWxheSA9IDAsXG4gICAgY2xvc2VEZWxheSA9IDApIHtcbiAgY29uc3QgcGFyc2VkVHJpZ2dlcnMgPSBwYXJzZVRyaWdnZXJzKHRyaWdnZXJzKTtcblxuICBpZiAocGFyc2VkVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzWzBdLmlzTWFudWFsKCkpIHtcbiAgICByZXR1cm4gKCkgPT4ge307XG4gIH1cblxuICBjb25zdCBzdWJzY3JpcHRpb24gPSBvYnNlcnZlVHJpZ2dlcnMocmVuZGVyZXIsIG5hdGl2ZUVsZW1lbnQsIHBhcnNlZFRyaWdnZXJzLCBpc09wZW5lZEZuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodHJpZ2dlckRlbGF5KG9wZW5EZWxheSwgY2xvc2VEZWxheSwgaXNPcGVuZWRGbikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKG9wZW4gPT4gKG9wZW4gPyBvcGVuRm4oKSA6IGNsb3NlRm4oKSkpO1xuXG4gIHJldHVybiAoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbn1cbiJdfQ==