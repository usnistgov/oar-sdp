/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbButtonLabel } from './label';
/** @type {?} */
const NGB_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbRadioGroup)),
    multi: true
};
/** @type {?} */
let nextId = 0;
/**
 * Allows to easily create Bootstrap-style radio buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
export class NgbRadioGroup {
    constructor() {
        this._radios = new Set();
        this._value = null;
        /**
         * Name of the radio group applied to radio input elements.
         *
         * Will be applied to all radio input elements inside the group,
         * unless [`NgbRadio`](#/components/buttons/api#NgbRadio)'s specify names themselves.
         *
         * If not provided, will be generated in the `ngb-radio-xx` format.
         */
        this.name = `ngb-radio-${nextId++}`;
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
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) { this.setDisabledState(isDisabled); }
    /**
     * @param {?} radio
     * @return {?}
     */
    onRadioChange(radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    }
    /**
     * @return {?}
     */
    onRadioValueUpdate() { this._updateRadiosValue(); }
    /**
     * @param {?} radio
     * @return {?}
     */
    register(radio) { this._radios.add(radio); }
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
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    }
    /**
     * @param {?} radio
     * @return {?}
     */
    unregister(radio) { this._radios.delete(radio); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value = value;
        this._updateRadiosValue();
    }
    /**
     * @private
     * @return {?}
     */
    _updateRadiosValue() { this._radios.forEach((/**
     * @param {?} radio
     * @return {?}
     */
    (radio) => radio.updateValue(this._value))); }
    /**
     * @private
     * @return {?}
     */
    _updateRadiosDisabled() { this._radios.forEach((/**
     * @param {?} radio
     * @return {?}
     */
    (radio) => radio.updateDisabled())); }
}
NgbRadioGroup.decorators = [
    { type: Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'radiogroup' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] }
];
NgbRadioGroup.propDecorators = {
    name: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbRadioGroup.prototype._radios;
    /**
     * @type {?}
     * @private
     */
    NgbRadioGroup.prototype._value;
    /**
     * @type {?}
     * @private
     */
    NgbRadioGroup.prototype._disabled;
    /**
     * Name of the radio group applied to radio input elements.
     *
     * Will be applied to all radio input elements inside the group,
     * unless [`NgbRadio`](#/components/buttons/api#NgbRadio)'s specify names themselves.
     *
     * If not provided, will be generated in the `ngb-radio-xx` format.
     * @type {?}
     */
    NgbRadioGroup.prototype.name;
    /** @type {?} */
    NgbRadioGroup.prototype.onChange;
    /** @type {?} */
    NgbRadioGroup.prototype.onTouched;
}
/**
 * A directive that marks an input of type "radio" as a part of the
 * [`NgbRadioGroup`](#/components/buttons/api#NgbRadioGroup).
 */
export class NgbRadio {
    /**
     * @param {?} _group
     * @param {?} _label
     * @param {?} _renderer
     * @param {?} _element
     * @param {?} _cd
     */
    constructor(_group, _label, _renderer, _element, _cd) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._cd = _cd;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    /**
     * The form control value when current radio button is checked.
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        /** @type {?} */
        const stringValue = value ? value.toString() : '';
        this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
        this._group.onRadioValueUpdate();
    }
    /**
     * If `true`, current radio button will be disabled.
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) {
        this._disabled = isDisabled !== false;
        this.updateDisabled();
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        if (this._label) {
            this._label.focused = isFocused;
        }
        if (!isFocused) {
            this._group.onTouched();
        }
    }
    /**
     * @return {?}
     */
    get checked() { return this._checked; }
    /**
     * @return {?}
     */
    get disabled() { return this._group.disabled || this._disabled; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get nameAttr() { return this.name || this._group.name; }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._group.unregister(this); }
    /**
     * @return {?}
     */
    onChange() { this._group.onRadioChange(this); }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        if (this.value !== value) {
            this._cd.markForCheck();
        }
        this._checked = this.value === value;
        this._label.active = this._checked;
    }
    /**
     * @return {?}
     */
    updateDisabled() { this._label.disabled = this.disabled; }
}
NgbRadio.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=radio]',
                host: {
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '[name]': 'nameAttr',
                    '(change)': 'onChange()',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                }
            },] }
];
/** @nocollapse */
NgbRadio.ctorParameters = () => [
    { type: NgbRadioGroup },
    { type: NgbButtonLabel },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NgbRadio.propDecorators = {
    name: [{ type: Input }],
    value: [{ type: Input, args: ['value',] }],
    disabled: [{ type: Input, args: ['disabled',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._value;
    /**
     * The value for the 'name' property of the input element.
     *
     * All inputs of the radio group should have the same name. If not specified,
     * the name of the enclosing group is used.
     * @type {?}
     */
    NgbRadio.prototype.name;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._group;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._label;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._element;
    /**
     * @type {?}
     * @private
     */
    NgbRadio.prototype._cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImJ1dHRvbnMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDOztNQUVqQyx3QkFBd0IsR0FBRztJQUMvQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7Q0FDWjs7SUFFRyxNQUFNLEdBQUcsQ0FBQzs7Ozs7OztBQVNkLE1BQU0sT0FBTyxhQUFhO0lBRDFCO1FBRVUsWUFBTyxHQUFrQixJQUFJLEdBQUcsRUFBWSxDQUFDO1FBQzdDLFdBQU0sR0FBRyxJQUFJLENBQUM7Ozs7Ozs7OztRQWNiLFNBQUksR0FBRyxhQUFhLE1BQU0sRUFBRSxFQUFFLENBQUM7UUFFeEMsYUFBUTs7OztRQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLEVBQUM7UUFDMUIsY0FBUzs7O1FBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO0lBNkJ2QixDQUFDOzs7O0lBM0NDLElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3pDLElBQUksUUFBUSxDQUFDLFVBQW1CLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFleEUsYUFBYSxDQUFDLEtBQWU7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FB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USxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELGNBQWMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O1lBbEYzRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxTQUFTO29CQUN0QixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFVBQVUsRUFBRSxZQUFZO29CQUN4QixTQUFTLEVBQUUsZ0JBQWdCO29CQUMzQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1QjthQUNGOzs7O1lBb0RxQixhQUFhO1lBdEkzQixjQUFjO1lBSDBELFNBQVM7WUFBbkQsVUFBVTtZQUF4QyxpQkFBaUI7OzttQkFpR3RCLEtBQUs7b0JBS0wsS0FBSyxTQUFDLE9BQU87dUJBV2IsS0FBSyxTQUFDLFVBQVU7Ozs7Ozs7SUExQmpCLDRCQUEwQjs7Ozs7SUFDMUIsNkJBQTJCOzs7OztJQUMzQiwwQkFBMkI7Ozs7Ozs7O0lBUTNCLHdCQUFzQjs7Ozs7SUF3Q2xCLDBCQUE2Qjs7Ozs7SUFBRSwwQkFBOEI7Ozs7O0lBQUUsNkJBQTRCOzs7OztJQUMzRiw0QkFBOEM7Ozs7O0lBQUUsdUJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XG5cbmNvbnN0IE5HQl9SQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhZGlvR3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogQWxsb3dzIHRvIGVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIHJhZGlvIGJ1dHRvbnMuXG4gKlxuICogSW50ZWdyYXRlcyB3aXRoIGZvcm1zLCBzbyB0aGUgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byB0aGUgdW5kZXJseWluZyBmb3JtIGNvbnRyb2xcbiAqIGVpdGhlciBpbiBhIHJlYWN0aXZlIG9yIHRlbXBsYXRlLWRyaXZlbiB3YXkuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlJhZGlvR3JvdXBdJywgaG9zdDogeydyb2xlJzogJ3JhZGlvZ3JvdXAnfSwgcHJvdmlkZXJzOiBbTkdCX1JBRElPX1ZBTFVFX0FDQ0VTU09SXX0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJpdmF0ZSBfcmFkaW9zOiBTZXQ8TmdiUmFkaW8+ID0gbmV3IFNldDxOZ2JSYWRpbz4oKTtcbiAgcHJpdmF0ZSBfdmFsdWUgPSBudWxsO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cblxuICAvKipcbiAgICogTmFtZSBvZiB0aGUgcmFkaW8gZ3JvdXAgYXBwbGllZCB0byByYWRpbyBpbnB1dCBlbGVtZW50cy5cbiAgICpcbiAgICogV2lsbCBiZSBhcHBsaWVkIHRvIGFsbCByYWRpbyBpbnB1dCBlbGVtZW50cyBpbnNpZGUgdGhlIGdyb3VwLFxuICAgKiB1bmxlc3MgW2BOZ2JSYWRpb2BdKCMvY29tcG9uZW50cy9idXR0b25zL2FwaSNOZ2JSYWRpbykncyBzcGVjaWZ5IG5hbWVzIHRoZW1zZWx2ZXMuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgd2lsbCBiZSBnZW5lcmF0ZWQgaW4gdGhlIGBuZ2ItcmFkaW8teHhgIGZvcm1hdC5cbiAgICovXG4gIEBJbnB1dCgpIG5hbWUgPSBgbmdiLXJhZGlvLSR7bmV4dElkKyt9YDtcblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBvblJhZGlvQ2hhbmdlKHJhZGlvOiBOZ2JSYWRpbykge1xuICAgIHRoaXMud3JpdGVWYWx1ZShyYWRpby52YWx1ZSk7XG4gICAgdGhpcy5vbkNoYW5nZShyYWRpby52YWx1ZSk7XG4gIH1cblxuICBvblJhZGlvVmFsdWVVcGRhdGUoKSB7IHRoaXMuX3VwZGF0ZVJhZGlvc1ZhbHVlKCk7IH1cblxuICByZWdpc3RlcihyYWRpbzogTmdiUmFkaW8pIHsgdGhpcy5fcmFkaW9zLmFkZChyYWRpbyk7IH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl91cGRhdGVSYWRpb3NEaXNhYmxlZCgpO1xuICB9XG5cbiAgdW5yZWdpc3RlcihyYWRpbzogTmdiUmFkaW8pIHsgdGhpcy5fcmFkaW9zLmRlbGV0ZShyYWRpbyk7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSYWRpb3NWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9zVmFsdWUoKSB7IHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4gcmFkaW8udXBkYXRlVmFsdWUodGhpcy5fdmFsdWUpKTsgfVxuICBwcml2YXRlIF91cGRhdGVSYWRpb3NEaXNhYmxlZCgpIHsgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby51cGRhdGVEaXNhYmxlZCgpKTsgfVxufVxuXG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBtYXJrcyBhbiBpbnB1dCBvZiB0eXBlIFwicmFkaW9cIiBhcyBhIHBhcnQgb2YgdGhlXG4gKiBbYE5nYlJhZGlvR3JvdXBgXSgjL2NvbXBvbmVudHMvYnV0dG9ucy9hcGkjTmdiUmFkaW9Hcm91cCkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9cmFkaW9dJyxcbiAgaG9zdDoge1xuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbbmFtZV0nOiAnbmFtZUF0dHInLFxuICAgICcoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW8gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSBmb3IgdGhlICduYW1lJyBwcm9wZXJ0eSBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICpcbiAgICogQWxsIGlucHV0cyBvZiB0aGUgcmFkaW8gZ3JvdXAgc2hvdWxkIGhhdmUgdGhlIHNhbWUgbmFtZS4gSWYgbm90IHNwZWNpZmllZCxcbiAgICogdGhlIG5hbWUgb2YgdGhlIGVuY2xvc2luZyBncm91cCBpcyB1c2VkLlxuICAgKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9ybSBjb250cm9sIHZhbHVlIHdoZW4gY3VycmVudCByYWRpbyBidXR0b24gaXMgY2hlY2tlZC5cbiAgICovXG4gIEBJbnB1dCgndmFsdWUnKVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnJztcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHN0cmluZ1ZhbHVlKTtcbiAgICB0aGlzLl9ncm91cC5vblJhZGlvVmFsdWVVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGN1cnJlbnQgcmFkaW8gYnV0dG9uIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQgIT09IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICB9XG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2dyb3VwLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkKCkgeyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2dyb3VwLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkOyB9XG5cbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cblxuICBnZXQgbmFtZUF0dHIoKSB7IHJldHVybiB0aGlzLm5hbWUgfHwgdGhpcy5fZ3JvdXAubmFtZTsgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZ3JvdXA6IE5nYlJhZGlvR3JvdXAsIHByaXZhdGUgX2xhYmVsOiBOZ2JCdXR0b25MYWJlbCwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuX2dyb3VwLnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9ncm91cC51bnJlZ2lzdGVyKHRoaXMpOyB9XG5cbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIC8vIGxhYmVsIHdvbid0IGJlIHVwZGF0ZWQsIGlmIGl0IGlzIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudCB3aGVuIFtuZ01vZGVsXSBjaGFuZ2VzXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGVja2VkID0gdGhpcy52YWx1ZSA9PT0gdmFsdWU7XG4gICAgdGhpcy5fbGFiZWwuYWN0aXZlID0gdGhpcy5fY2hlY2tlZDtcbiAgfVxuXG4gIHVwZGF0ZURpc2FibGVkKCkgeyB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7IH1cbn1cbiJdfQ==