/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbRatingConfig } from './rating-config';
import { getValueInRange } from '../util/util';
import { Key } from '../util/key';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * The context for the custom star display template defined in the `starTemplate`.
 * @record
 */
export function StarTemplateContext() { }
if (false) {
    /**
     * The star fill percentage, an integer in the `[0, 100]` range.
     * @type {?}
     */
    StarTemplateContext.prototype.fill;
    /**
     * Index of the star, starts with `0`.
     * @type {?}
     */
    StarTemplateContext.prototype.index;
}
/** @type {?} */
const NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbRating)),
    multi: true
};
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
export class NgbRating {
    /**
     * @param {?} config
     * @param {?} _changeDetectorRef
     */
    constructor(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event emitted when the user is hovering over a given rating.
         *
         * Event payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event emitted when the user stops hovering over a given rating.
         *
         * Event payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event emitted when the user selects a new rating.
         *
         * Event payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    ariaValueText() { return `${this.nextRate} out of ${this.max}`; }
    /**
     * @param {?} value
     * @return {?}
     */
    enter(value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    /**
     * @return {?}
     */
    handleBlur() { this.onTouched(); }
    /**
     * @param {?} value
     * @return {?}
     */
    handleClick(value) {
        if (!this.readonly && !this.disabled) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
            case Key.ArrowLeft:
                this.update(this.rate - 1);
                break;
            case Key.ArrowUp:
            case Key.ArrowRight:
                this.update(this.rate + 1);
                break;
            case Key.Home:
                this.update(0);
                break;
            case Key.End:
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contexts = Array.from({ length: this.max }, (/**
         * @param {?} v
         * @param {?} k
         * @return {?}
         */
        (v, k) => ({ fill: 0, index: k })));
        this._updateState(this.rate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @return {?}
     */
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    update(value, internalChange = true) {
        /** @type {?} */
        const newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _getFillValue(index) {
        /** @type {?} */
        const diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return parseInt((diff * 100).toFixed(2), 10);
        }
        return 0;
    }
    /**
     * @private
     * @param {?} nextValue
     * @return {?}
     */
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((/**
         * @param {?} context
         * @param {?} index
         * @return {?}
         */
        (context, index) => context.fill = this._getFillValue(index)));
    }
}
NgbRating.decorators = [
    { type: Component, args: [{
                selector: 'ngb-rating',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'd-inline-flex',
                    '[tabindex]': 'disabled ? -1 : 0',
                    'role': 'slider',
                    'aria-valuemin': '0',
                    '[attr.aria-valuemax]': 'max',
                    '[attr.aria-valuenow]': 'nextRate',
                    '[attr.aria-valuetext]': 'ariaValueText()',
                    '[attr.aria-disabled]': 'readonly ? true : null',
                    '(blur)': 'handleBlur()',
                    '(keydown)': 'handleKeyDown($event)',
                    '(mouseleave)': 'reset()'
                },
                template: `
    <ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
    <ng-template ngFor [ngForOf]="contexts" let-index="index">
      <span class="sr-only">({{ index < nextRate ? '*' : ' ' }})</span>
      <span (mouseenter)="enter(index + 1)" (click)="handleClick(index + 1)" [style.cursor]="readonly || disabled ? 'default' : 'pointer'">
        <ng-template [ngTemplateOutlet]="starTemplate || starTemplateFromContent || t" [ngTemplateOutletContext]="contexts[index]">
        </ng-template>
      </span>
    </ng-template>
  `,
                providers: [NGB_RATING_VALUE_ACCESSOR]
            }] }
];
/** @nocollapse */
NgbRating.ctorParameters = () => [
    { type: NgbRatingConfig },
    { type: ChangeDetectorRef }
];
NgbRating.propDecorators = {
    max: [{ type: Input }],
    rate: [{ type: Input }],
    readonly: [{ type: Input }],
    resettable: [{ type: Input }],
    starTemplate: [{ type: Input }],
    starTemplateFromContent: [{ type: ContentChild, args: [TemplateRef, { static: false },] }],
    hover: [{ type: Output }],
    leave: [{ type: Output }],
    rateChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbRating.prototype.contexts;
    /** @type {?} */
    NgbRating.prototype.disabled;
    /** @type {?} */
    NgbRating.prototype.nextRate;
    /**
     * The maximal rating that can be given.
     * @type {?}
     */
    NgbRating.prototype.max;
    /**
     * The current rating. Could be a decimal value like `3.75`.
     * @type {?}
     */
    NgbRating.prototype.rate;
    /**
     * If `true`, the rating can't be changed.
     * @type {?}
     */
    NgbRating.prototype.readonly;
    /**
     * If `true`, the rating can be reset to `0` by mouse clicking currently set rating.
     * @type {?}
     */
    NgbRating.prototype.resettable;
    /**
     * The template to override the way each star is displayed.
     *
     * Alternatively put an `<ng-template>` as the only child of your `<ngb-rating>` element
     * @type {?}
     */
    NgbRating.prototype.starTemplate;
    /** @type {?} */
    NgbRating.prototype.starTemplateFromContent;
    /**
     * An event emitted when the user is hovering over a given rating.
     *
     * Event payload equals to the rating being hovered over.
     * @type {?}
     */
    NgbRating.prototype.hover;
    /**
     * An event emitted when the user stops hovering over a given rating.
     *
     * Event payload equals to the rating of the last item being hovered over.
     * @type {?}
     */
    NgbRating.prototype.leave;
    /**
     * An event emitted when the user selects a new rating.
     *
     * Event payload equals to the newly selected rating.
     * @type {?}
     */
    NgbRating.prototype.rateChange;
    /** @type {?} */
    NgbRating.prototype.onChange;
    /** @type {?} */
    NgbRating.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    NgbRating.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJyYXRpbmcvcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEMsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUt2RSx5Q0FVQzs7Ozs7O0lBTkMsbUNBQWE7Ozs7O0lBS2Isb0NBQWM7OztNQUdWLHlCQUF5QixHQUFHO0lBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7O0FBa0NELE1BQU0sT0FBTyxTQUFTOzs7OztJQTJEcEIsWUFBWSxNQUF1QixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBekRsRixhQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUNyQyxhQUFRLEdBQUcsS0FBSyxDQUFDOzs7Ozs7UUFxQ1AsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7OztRQU9uQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7Ozs7O1FBT25DLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUV0RCxh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RUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3ZDOzs7O1lBekRPLGVBQWU7WUFickIsaUJBQWlCOzs7a0JBaUZoQixLQUFLO21CQUtMLEtBQUs7dUJBS0wsS0FBSzt5QkFLTCxLQUFLOzJCQU9MLEtBQUs7c0NBQ0wsWUFBWSxTQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7b0JBT3pDLE1BQU07b0JBT04sTUFBTTt5QkFPTixNQUFNOzs7O0lBcERQLDZCQUFxQzs7SUFDckMsNkJBQWlCOztJQUNqQiw2QkFBaUI7Ozs7O0lBTWpCLHdCQUFxQjs7Ozs7SUFLckIseUJBQXNCOzs7OztJQUt0Qiw2QkFBMkI7Ozs7O0lBSzNCLCtCQUE2Qjs7Ozs7OztJQU83QixpQ0FBd0Q7O0lBQ3hELDRDQUFzRzs7Ozs7OztJQU90RywwQkFBNkM7Ozs7Ozs7SUFPN0MsMEJBQTZDOzs7Ozs7O0lBTzdDLCtCQUFzRDs7SUFFdEQsNkJBQTBCOztJQUMxQiw4QkFBcUI7Ozs7O0lBRWdCLHVDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiUmF0aW5nQ29uZmlnfSBmcm9tICcuL3JhdGluZy1jb25maWcnO1xuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBUaGUgY29udGV4dCBmb3IgdGhlIGN1c3RvbSBzdGFyIGRpc3BsYXkgdGVtcGxhdGUgZGVmaW5lZCBpbiB0aGUgYHN0YXJUZW1wbGF0ZWAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhclRlbXBsYXRlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBUaGUgc3RhciBmaWxsIHBlcmNlbnRhZ2UsIGFuIGludGVnZXIgaW4gdGhlIGBbMCwgMTAwXWAgcmFuZ2UuXG4gICAqL1xuICBmaWxsOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBzdGFyLCBzdGFydHMgd2l0aCBgMGAuXG4gICAqL1xuICBpbmRleDogbnVtYmVyO1xufVxuXG5jb25zdCBOR0JfUkFUSU5HX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiUmF0aW5nKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBoZWxwcyB2aXN1YWxpc2luZyBhbmQgaW50ZXJhY3Rpbmcgd2l0aCBhIHN0YXIgcmF0aW5nIGJhci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXJhdGluZycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2QtaW5saW5lLWZsZXgnLFxuICAgICdbdGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAwJyxcbiAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICduZXh0UmF0ZScsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdhcmlhVmFsdWVUZXh0KCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdyZWFkb25seSA/IHRydWUgOiBudWxsJyxcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxuICAgICcobW91c2VsZWF2ZSknOiAncmVzZXQoKSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3QgbGV0LWZpbGw9XCJmaWxsXCI+e3sgZmlsbCA9PT0gMTAwID8gJyYjOTczMzsnIDogJyYjOTczNDsnIH19PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiY29udGV4dHNcIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+KHt7IGluZGV4IDwgbmV4dFJhdGUgPyAnKicgOiAnICcgfX0pPC9zcGFuPlxuICAgICAgPHNwYW4gKG1vdXNlZW50ZXIpPVwiZW50ZXIoaW5kZXggKyAxKVwiIChjbGljayk9XCJoYW5kbGVDbGljayhpbmRleCArIDEpXCIgW3N0eWxlLmN1cnNvcl09XCJyZWFkb25seSB8fCBkaXNhYmxlZCA/ICdkZWZhdWx0JyA6ICdwb2ludGVyJ1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RhclRlbXBsYXRlIHx8IHN0YXJUZW1wbGF0ZUZyb21Db250ZW50IHx8IHRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dHNbaW5kZXhdXCI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkNoYW5nZXMge1xuICBjb250ZXh0czogU3RhclRlbXBsYXRlQ29udGV4dFtdID0gW107XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIG5leHRSYXRlOiBudW1iZXI7XG5cblxuICAvKipcbiAgICogVGhlIG1heGltYWwgcmF0aW5nIHRoYXQgY2FuIGJlIGdpdmVuLlxuICAgKi9cbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHJhdGluZy4gQ291bGQgYmUgYSBkZWNpbWFsIHZhbHVlIGxpa2UgYDMuNzVgLlxuICAgKi9cbiAgQElucHV0KCkgcmF0ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSByYXRpbmcgY2FuJ3QgYmUgY2hhbmdlZC5cbiAgICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSByYXRpbmcgY2FuIGJlIHJlc2V0IHRvIGAwYCBieSBtb3VzZSBjbGlja2luZyBjdXJyZW50bHkgc2V0IHJhdGluZy5cbiAgICovXG4gIEBJbnB1dCgpIHJlc2V0dGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSB0byBvdmVycmlkZSB0aGUgd2F5IGVhY2ggc3RhciBpcyBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEFsdGVybmF0aXZlbHkgcHV0IGFuIGA8bmctdGVtcGxhdGU+YCBhcyB0aGUgb25seSBjaGlsZCBvZiB5b3VyIGA8bmdiLXJhdGluZz5gIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8U3RhclRlbXBsYXRlQ29udGV4dD47XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IGZhbHNlfSkgc3RhclRlbXBsYXRlRnJvbUNvbnRlbnQ6IFRlbXBsYXRlUmVmPFN0YXJUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgaXMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cbiAgICpcbiAgICogRXZlbnQgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBiZWluZyBob3ZlcmVkIG92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGhvdmVyaW5nIG92ZXIgYSBnaXZlbiByYXRpbmcuXG4gICAqXG4gICAqIEV2ZW50IHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgb2YgdGhlIGxhc3QgaXRlbSBiZWluZyBob3ZlcmVkIG92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBuZXcgcmF0aW5nLlxuICAgKlxuICAgKiBFdmVudCBwYXlsb2FkIGVxdWFscyB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgcmF0aW5nLlxuICAgKi9cbiAgQE91dHB1dCgpIHJhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JSYXRpbmdDb25maWcsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heDtcbiAgICB0aGlzLnJlYWRvbmx5ID0gY29uZmlnLnJlYWRvbmx5O1xuICB9XG5cbiAgYXJpYVZhbHVlVGV4dCgpIHsgcmV0dXJuIGAke3RoaXMubmV4dFJhdGV9IG91dCBvZiAke3RoaXMubWF4fWA7IH1cblxuICBlbnRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl91cGRhdGVTdGF0ZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuaG92ZXIuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkgeyB0aGlzLm9uVG91Y2hlZCgpOyB9XG5cbiAgaGFuZGxlQ2xpY2sodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy51cGRhdGUodGhpcy5yZXNldHRhYmxlICYmIHRoaXMucmF0ZSA9PT0gdmFsdWUgPyAwIDogdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSAtIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICBjYXNlIEtleS5BcnJvd1JpZ2h0OlxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUgKyAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICB0aGlzLnVwZGF0ZSgwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMubWF4KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbm90ZSAncmV0dXJuJyBpbiBkZWZhdWx0IGNhc2VcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydyYXRlJ10pIHtcbiAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0cyA9IEFycmF5LmZyb20oe2xlbmd0aDogdGhpcy5tYXh9LCAodiwgaykgPT4gKHtmaWxsOiAwLCBpbmRleDoga30pKTtcbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmxlYXZlLmVtaXQodGhpcy5uZXh0UmF0ZSk7XG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxuXG4gIHVwZGF0ZSh2YWx1ZTogbnVtYmVyLCBpbnRlcm5hbENoYW5nZSA9IHRydWUpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdSYXRlID0gZ2V0VmFsdWVJblJhbmdlKHZhbHVlLCB0aGlzLm1heCwgMCk7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMucmF0ZSAhPT0gbmV3UmF0ZSkge1xuICAgICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcbiAgICAgIHRoaXMucmF0ZUNoYW5nZS5lbWl0KHRoaXMucmF0ZSk7XG4gICAgfVxuICAgIGlmIChpbnRlcm5hbENoYW5nZSkge1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnJhdGUpO1xuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnVwZGF0ZSh2YWx1ZSwgZmFsc2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RmlsbFZhbHVlKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGRpZmYgPSB0aGlzLm5leHRSYXRlIC0gaW5kZXg7XG5cbiAgICBpZiAoZGlmZiA+PSAxKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICBpZiAoZGlmZiA8IDEgJiYgZGlmZiA+IDApIHtcbiAgICAgIHJldHVybiBwYXJzZUludCgoZGlmZiAqIDEwMCkudG9GaXhlZCgyKSwgMTApO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3RhdGUobmV4dFZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLm5leHRSYXRlID0gbmV4dFZhbHVlO1xuICAgIHRoaXMuY29udGV4dHMuZm9yRWFjaCgoY29udGV4dCwgaW5kZXgpID0+IGNvbnRleHQuZmlsbCA9IHRoaXMuX2dldEZpbGxWYWx1ZShpbmRleCkpO1xuICB9XG59XG4iXX0=