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
var NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return NgbRating; })),
    multi: true
};
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
var NgbRating = /** @class */ (function () {
    function NgbRating(config, _changeDetectorRef) {
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
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    NgbRating.prototype.ariaValueText = /**
     * @return {?}
     */
    function () { return this.nextRate + " out of " + this.max; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.enter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.handleBlur = /**
     * @return {?}
     */
    function () { this.onTouched(); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.handleClick = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.readonly && !this.disabled) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbRating.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbRating.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contexts = Array.from({ length: this.max }, (/**
         * @param {?} v
         * @param {?} k
         * @return {?}
         */
        function (v, k) { return ({ fill: 0, index: k }); }));
        this._updateState(this.rate);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @return {?}
     */
    NgbRating.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbRating.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    NgbRating.prototype.update = /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    function (value, internalChange) {
        if (internalChange === void 0) { internalChange = true; }
        /** @type {?} */
        var newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    NgbRating.prototype._getFillValue = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return parseInt((diff * 100).toFixed(2), 10);
        }
        return 0;
    };
    /**
     * @private
     * @param {?} nextValue
     * @return {?}
     */
    NgbRating.prototype._updateState = /**
     * @private
     * @param {?} nextValue
     * @return {?}
     */
    function (nextValue) {
        var _this = this;
        this.nextRate = nextValue;
        this.contexts.forEach((/**
         * @param {?} context
         * @param {?} index
         * @return {?}
         */
        function (context, index) { return context.fill = _this._getFillValue(index); }));
    };
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
                    template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"readonly || disabled ? 'default' : 'pointer'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || starTemplateFromContent || t\" [ngTemplateOutletContext]=\"contexts[index]\">\n        </ng-template>\n      </span>\n    </ng-template>\n  ",
                    providers: [NGB_RATING_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    NgbRating.ctorParameters = function () { return [
        { type: NgbRatingConfig },
        { type: ChangeDetectorRef }
    ]; };
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
    return NgbRating;
}());
export { NgbRating };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJyYXRpbmcvcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEMsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUt2RSx5Q0FVQzs7Ozs7O0lBTkMsbUNBQWE7Ozs7O0lBS2Isb0NBQWM7OztJQUdWLHlCQUF5QixHQUFHO0lBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxFQUFDO0lBQ3hDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFLRDtJQXdGRSxtQkFBWSxNQUF1QixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBekRsRixhQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUNyQyxhQUFRLEdBQUcsS0FBSyxDQUFDOzs7Ozs7UUFxQ1AsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7OztRQU9uQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7Ozs7O1FBT25DLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUV0RCxhQUFROzs7O1FBQUcsVUFB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QzFDLHNCQUFzQixFQUFFLHdCQUF3Qjt3QkFDaEQsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLFdBQVcsRUFBRSx1QkFBdUI7d0JBQ3BDLGNBQWMsRUFBRSxTQUFTO3FCQUMxQjtvQkFDRCxRQUFRLEVBQUUsNGtCQVNUO29CQUNELFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUN2Qzs7OztnQkF6RE8sZUFBZTtnQkFickIsaUJBQWlCOzs7c0JBaUZoQixLQUFLO3VCQUtMLEtBQUs7MkJBS0wsS0FBSzs2QkFLTCxLQUFLOytCQU9MLEtBQUs7MENBQ0wsWUFBWSxTQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7d0JBT3pDLE1BQU07d0JBT04sTUFBTTs2QkFPTixNQUFNOztJQTZHVCxnQkFBQztDQUFBLEFBaE1ELElBZ01DO1NBbktZLFNBQVM7OztJQUVwQiw2QkFBcUM7O0lBQ3JDLDZCQUFpQjs7SUFDakIsNkJBQWlCOzs7OztJQU1qQix3QkFBcUI7Ozs7O0lBS3JCLHlCQUFzQjs7Ozs7SUFLdEIsNkJBQTJCOzs7OztJQUszQiwrQkFBNkI7Ozs7Ozs7SUFPN0IsaUNBQXdEOztJQUN4RCw0Q0FBc0c7Ozs7Ozs7SUFPdEcsMEJBQTZDOzs7Ozs7O0lBTzdDLDBCQUE2Qzs7Ozs7OztJQU83QywrQkFBc0Q7O0lBRXRELDZCQUEwQjs7SUFDMUIsOEJBQXFCOzs7OztJQUVnQix1Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogVGhlIGNvbnRleHQgZm9yIHRoZSBjdXN0b20gc3RhciBkaXNwbGF5IHRlbXBsYXRlIGRlZmluZWQgaW4gdGhlIGBzdGFyVGVtcGxhdGVgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YXJUZW1wbGF0ZUNvbnRleHQge1xuICAvKipcbiAgICogVGhlIHN0YXIgZmlsbCBwZXJjZW50YWdlLCBhbiBpbnRlZ2VyIGluIHRoZSBgWzAsIDEwMF1gIHJhbmdlLlxuICAgKi9cbiAgZmlsbDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgc3Rhciwgc3RhcnRzIHdpdGggYDBgLlxuICAgKi9cbiAgaW5kZXg6IG51bWJlcjtcbn1cblxuY29uc3QgTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhdGluZyksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgaGVscHMgdmlzdWFsaXNpbmcgYW5kIGludGVyYWN0aW5nIHdpdGggYSBzdGFyIHJhdGluZyBiYXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1yYXRpbmcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdkLWlubGluZS1mbGV4JyxcbiAgICAnW3RhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogMCcsXG4gICAgJ3JvbGUnOiAnc2xpZGVyJyxcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4JyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnbmV4dFJhdGUnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVldGV4dF0nOiAnYXJpYVZhbHVlVGV4dCgpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAncmVhZG9ubHkgPyB0cnVlIDogbnVsbCcsXG4gICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ3Jlc2V0KCknXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0IGxldC1maWxsPVwiZmlsbFwiPnt7IGZpbGwgPT09IDEwMCA/ICcmIzk3MzM7JyA6ICcmIzk3MzQ7JyB9fTwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImNvbnRleHRzXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPih7eyBpbmRleCA8IG5leHRSYXRlID8gJyonIDogJyAnIH19KTwvc3Bhbj5cbiAgICAgIDxzcGFuIChtb3VzZWVudGVyKT1cImVudGVyKGluZGV4ICsgMSlcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soaW5kZXggKyAxKVwiIFtzdHlsZS5jdXJzb3JdPVwicmVhZG9ubHkgfHwgZGlzYWJsZWQgPyAnZGVmYXVsdCcgOiAncG9pbnRlcidcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInN0YXJUZW1wbGF0ZSB8fCBzdGFyVGVtcGxhdGVGcm9tQ29udGVudCB8fCB0XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRzW2luZGV4XVwiPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9SQVRJTkdfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZyBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgY29udGV4dHM6IFN0YXJUZW1wbGF0ZUNvbnRleHRbXSA9IFtdO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICBuZXh0UmF0ZTogbnVtYmVyO1xuXG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbWFsIHJhdGluZyB0aGF0IGNhbiBiZSBnaXZlbi5cbiAgICovXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCByYXRpbmcuIENvdWxkIGJlIGEgZGVjaW1hbCB2YWx1ZSBsaWtlIGAzLjc1YC5cbiAgICovXG4gIEBJbnB1dCgpIHJhdGU6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgcmF0aW5nIGNhbid0IGJlIGNoYW5nZWQuXG4gICAqL1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgcmF0aW5nIGNhbiBiZSByZXNldCB0byBgMGAgYnkgbW91c2UgY2xpY2tpbmcgY3VycmVudGx5IHNldCByYXRpbmcuXG4gICAqL1xuICBASW5wdXQoKSByZXNldHRhYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgdGhlIHdheSBlYWNoIHN0YXIgaXMgZGlzcGxheWVkLlxuICAgKlxuICAgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhbiBgPG5nLXRlbXBsYXRlPmAgYXMgdGhlIG9ubHkgY2hpbGQgb2YgeW91ciBgPG5nYi1yYXRpbmc+YCBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSBzdGFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPFN0YXJUZW1wbGF0ZUNvbnRleHQ+O1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIHN0YXJUZW1wbGF0ZUZyb21Db250ZW50OiBUZW1wbGF0ZVJlZjxTdGFyVGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGlzIGhvdmVyaW5nIG92ZXIgYSBnaXZlbiByYXRpbmcuXG4gICAqXG4gICAqIEV2ZW50IHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgYmVpbmcgaG92ZXJlZCBvdmVyLlxuICAgKi9cbiAgQE91dHB1dCgpIGhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxuICAgKlxuICAgKiBFdmVudCBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIG9mIHRoZSBsYXN0IGl0ZW0gYmVpbmcgaG92ZXJlZCBvdmVyLlxuICAgKi9cbiAgQE91dHB1dCgpIGxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgbmV3IHJhdGluZy5cbiAgICpcbiAgICogRXZlbnQgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIHJhdGluZy5cbiAgICovXG4gIEBPdXRwdXQoKSByYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUmF0aW5nQ29uZmlnLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XG4gICAgdGhpcy5yZWFkb25seSA9IGNvbmZpZy5yZWFkb25seTtcbiAgfVxuXG4gIGFyaWFWYWx1ZVRleHQoKSB7IHJldHVybiBgJHt0aGlzLm5leHRSYXRlfSBvdXQgb2YgJHt0aGlzLm1heH1gOyB9XG5cbiAgZW50ZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlU3RhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmhvdmVyLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHsgdGhpcy5vblRvdWNoZWQoKTsgfVxuXG4gIGhhbmRsZUNsaWNrKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlKHRoaXMucmVzZXR0YWJsZSAmJiB0aGlzLnJhdGUgPT09IHZhbHVlID8gMCA6IHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUgLSAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlICsgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgdGhpcy51cGRhdGUoMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLm1heCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG5vdGUgJ3JldHVybicgaW4gZGVmYXVsdCBjYXNlXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncmF0ZSddKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dHMgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMubWF4fSwgKHYsIGspID0+ICh7ZmlsbDogMCwgaW5kZXg6IGt9KSk7XG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZS5lbWl0KHRoaXMubmV4dFJhdGUpO1xuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICB1cGRhdGUodmFsdWU6IG51bWJlciwgaW50ZXJuYWxDaGFuZ2UgPSB0cnVlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3UmF0ZSA9IGdldFZhbHVlSW5SYW5nZSh2YWx1ZSwgdGhpcy5tYXgsIDApO1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJhdGUgIT09IG5ld1JhdGUpIHtcbiAgICAgIHRoaXMucmF0ZSA9IG5ld1JhdGU7XG4gICAgICB0aGlzLnJhdGVDaGFuZ2UuZW1pdCh0aGlzLnJhdGUpO1xuICAgIH1cbiAgICBpZiAoaW50ZXJuYWxDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5yYXRlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy51cGRhdGUodmFsdWUsIGZhbHNlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZpbGxWYWx1ZShpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gdGhpcy5uZXh0UmF0ZSAtIGluZGV4O1xuXG4gICAgaWYgKGRpZmYgPj0gMSkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgaWYgKGRpZmYgPCAxICYmIGRpZmYgPiAwKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoKGRpZmYgKiAxMDApLnRvRml4ZWQoMiksIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0YXRlKG5leHRWYWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXh0UmF0ZSA9IG5leHRWYWx1ZTtcbiAgICB0aGlzLmNvbnRleHRzLmZvckVhY2goKGNvbnRleHQsIGluZGV4KSA9PiBjb250ZXh0LmZpbGwgPSB0aGlzLl9nZXRGaWxsVmFsdWUoaW5kZXgpKTtcbiAgfVxufVxuIl19