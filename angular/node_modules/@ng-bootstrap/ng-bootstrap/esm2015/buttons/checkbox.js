/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbButtonLabel } from './label';
/** @type {?} */
const NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbCheckBox)),
    multi: true
};
/**
 * Allows to easily create Bootstrap-style checkbox buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
export class NgbCheckBox {
    /**
     * @param {?} _label
     * @param {?} _cd
     */
    constructor(_label, _cd) {
        this._label = _label;
        this._cd = _cd;
        /**
         * If `true`, the checkbox button will be disabled
         */
        this.disabled = false;
        /**
         * The form control value when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * The form control value when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        this._label.focused = isFocused;
        if (!isFocused) {
            this.onTouched();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        /** @type {?} */
        const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
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
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        this._cd.markForCheck();
    }
}
NgbCheckBox.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=checkbox]',
                host: {
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '(change)': 'onInputChange($event)',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                },
                providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
NgbCheckBox.ctorParameters = () => [
    { type: NgbButtonLabel },
    { type: ChangeDetectorRef }
];
NgbCheckBox.propDecorators = {
    disabled: [{ type: Input }],
    valueChecked: [{ type: Input }],
    valueUnChecked: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbCheckBox.prototype.checked;
    /**
     * If `true`, the checkbox button will be disabled
     * @type {?}
     */
    NgbCheckBox.prototype.disabled;
    /**
     * The form control value when the checkbox is checked.
     * @type {?}
     */
    NgbCheckBox.prototype.valueChecked;
    /**
     * The form control value when the checkbox is unchecked.
     * @type {?}
     */
    NgbCheckBox.prototype.valueUnChecked;
    /** @type {?} */
    NgbCheckBox.prototype.onChange;
    /** @type {?} */
    NgbCheckBox.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    NgbCheckBox.prototype._label;
    /**
     * @type {?}
     * @private
     */
    NgbCheckBox.prototype._cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImJ1dHRvbnMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7TUFFakMsMkJBQTJCLEdBQUc7SUFDbEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7Ozs7QUFvQkQsTUFBTSxPQUFPLFdBQVc7Ozs7O0lBNEJ0QixZQUFvQixNQUFzQixFQUFVLEdBQXNCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7Ozs7UUF0QmpFLGFBQVEsR0FBRyxLQUFLLENBQUM7Ozs7UUFLakIsaUJBQVksR0FBRyxJQUFJLENBQUM7Ozs7UUFLcEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFaEMsYUFBUTs7OztRQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLEVBQUM7UUFDMUIsY0FBUzs7O1FBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO0lBU3dELENBQUM7Ozs7O0lBUDlFLElBQUksT0FBTyxDQUFDLFNBQWtCO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQzs7Ozs7SUFJRCxhQUFhLENBQUMsTUFBTTs7Y0FDWixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWM7UUFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUF1QixJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFdkUsaUJBQWlCLENBQUMsRUFBYSxJQUFVLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFL0QsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEMsc0ZBQXNGO1FBQ3RGLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBL0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxJQUFJLEVBQUU7b0JBQ0osV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLFlBQVksRUFBRSxVQUFVO29CQUN4QixVQUFVLEVBQUUsdUJBQXVCO29CQUNuQyxTQUFTLEVBQUUsZ0JBQWdCO29CQUMzQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1QjtnQkFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUN6Qzs7OztZQXpCTyxjQUFjO1lBSGQsaUJBQWlCOzs7dUJBbUN0QixLQUFLOzJCQUtMLEtBQUs7NkJBS0wsS0FBSzs7OztJQWZOLDhCQUFROzs7OztJQUtSLCtCQUEwQjs7Ozs7SUFLMUIsbUNBQTZCOzs7OztJQUs3QixxQ0FBZ0M7O0lBRWhDLCtCQUEwQjs7SUFDMUIsZ0NBQXFCOzs7OztJQVNULDZCQUE4Qjs7Ozs7SUFBRSwwQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7TmdiQnV0dG9uTGFiZWx9IGZyb20gJy4vbGFiZWwnO1xuXG5jb25zdCBOR0JfQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JDaGVja0JveCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5cbi8qKlxuICogQWxsb3dzIHRvIGVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIGNoZWNrYm94IGJ1dHRvbnMuXG4gKlxuICogSW50ZWdyYXRlcyB3aXRoIGZvcm1zLCBzbyB0aGUgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byB0aGUgdW5kZXJseWluZyBmb3JtIGNvbnRyb2xcbiAqIGVpdGhlciBpbiBhIHJlYWN0aXZlIG9yIHRlbXBsYXRlLWRyaXZlbiB3YXkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9Y2hlY2tib3hdJyxcbiAgaG9zdDoge1xuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICcoY2hhbmdlKSc6ICdvbklucHV0Q2hhbmdlKCRldmVudCknLFxuICAgICcoZm9jdXMpJzogJ2ZvY3VzZWQgPSB0cnVlJyxcbiAgICAnKGJsdXIpJzogJ2ZvY3VzZWQgPSBmYWxzZSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTkdCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JDaGVja0JveCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgY2hlY2tlZDtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY2hlY2tib3ggYnV0dG9uIHdpbGwgYmUgZGlzYWJsZWRcbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsdWUgd2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC5cbiAgICovXG4gIEBJbnB1dCgpIHZhbHVlQ2hlY2tlZCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsdWUgd2hlbiB0aGUgY2hlY2tib3ggaXMgdW5jaGVja2VkLlxuICAgKi9cbiAgQElucHV0KCkgdmFsdWVVbkNoZWNrZWQgPSBmYWxzZTtcblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBzZXQgZm9jdXNlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9sYWJlbC5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgIGlmICghaXNGb2N1c2VkKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xhYmVsOiBOZ2JCdXR0b25MYWJlbCwgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc3QgbW9kZWxUb1Byb3BhZ2F0ZSA9ICRldmVudC50YXJnZXQuY2hlY2tlZCA/IHRoaXMudmFsdWVDaGVja2VkIDogdGhpcy52YWx1ZVVuQ2hlY2tlZDtcbiAgICB0aGlzLm9uQ2hhbmdlKG1vZGVsVG9Qcm9wYWdhdGUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgdGhpcy53cml0ZVZhbHVlKG1vZGVsVG9Qcm9wYWdhdGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5jaGVja2VkID0gdmFsdWUgPT09IHRoaXMudmFsdWVDaGVja2VkO1xuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuY2hlY2tlZDtcblxuICAgIC8vIGxhYmVsIHdvbid0IGJlIHVwZGF0ZWQsIGlmIGl0IGlzIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudCB3aGVuIFtuZ01vZGVsXSBjaGFuZ2VzXG4gICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==