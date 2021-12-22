/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbButtonLabel } from './label';
/** @type {?} */
var NGB_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return NgbRadioGroup; })),
    multi: true
};
/** @type {?} */
var nextId = 0;
/**
 * Allows to easily create Bootstrap-style radio buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
var NgbRadioGroup = /** @class */ (function () {
    function NgbRadioGroup() {
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
        this.name = "ngb-radio-" + nextId++;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(NgbRadioGroup.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) { this.setDisabledState(isDisabled); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} radio
     * @return {?}
     */
    NgbRadioGroup.prototype.onRadioChange = /**
     * @param {?} radio
     * @return {?}
     */
    function (radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    };
    /**
     * @return {?}
     */
    NgbRadioGroup.prototype.onRadioValueUpdate = /**
     * @return {?}
     */
    function () { this._updateRadiosValue(); };
    /**
     * @param {?} radio
     * @return {?}
     */
    NgbRadioGroup.prototype.register = /**
     * @param {?} radio
     * @return {?}
     */
    function (radio) { this._radios.add(radio); };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRadioGroup.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRadioGroup.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbRadioGroup.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    };
    /**
     * @param {?} radio
     * @return {?}
     */
    NgbRadioGroup.prototype.unregister = /**
     * @param {?} radio
     * @return {?}
     */
    function (radio) { this._radios.delete(radio); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRadioGroup.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value = value;
        this._updateRadiosValue();
    };
    /**
     * @private
     * @return {?}
     */
    NgbRadioGroup.prototype._updateRadiosValue = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._radios.forEach((/**
         * @param {?} radio
         * @return {?}
         */
        function (radio) { return radio.updateValue(_this._value); }));
    };
    /**
     * @private
     * @return {?}
     */
    NgbRadioGroup.prototype._updateRadiosDisabled = /**
     * @private
     * @return {?}
     */
    function () { this._radios.forEach((/**
     * @param {?} radio
     * @return {?}
     */
    function (radio) { return radio.updateDisabled(); })); };
    NgbRadioGroup.decorators = [
        { type: Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'radiogroup' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] }
    ];
    NgbRadioGroup.propDecorators = {
        name: [{ type: Input }]
    };
    return NgbRadioGroup;
}());
export { NgbRadioGroup };
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
var NgbRadio = /** @class */ (function () {
    function NgbRadio(_group, _label, _renderer, _element, _cd) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._cd = _cd;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    Object.defineProperty(NgbRadio.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        /**
         * The form control value when current radio button is checked.
         */
        set: /**
         * The form control value when current radio button is checked.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            /** @type {?} */
            var stringValue = value ? value.toString() : '';
            this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
            this._group.onRadioValueUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._group.disabled || this._disabled; },
        /**
         * If `true`, current radio button will be disabled.
         */
        set: /**
         * If `true`, current radio button will be disabled.
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this._disabled = isDisabled !== false;
            this.updateDisabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "focused", {
        set: /**
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            if (this._label) {
                this._label.focused = isFocused;
            }
            if (!isFocused) {
                this._group.onTouched();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "checked", {
        get: /**
         * @return {?}
         */
        function () { return this._checked; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "nameAttr", {
        get: /**
         * @return {?}
         */
        function () { return this.name || this._group.name; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgbRadio.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._group.unregister(this); };
    /**
     * @return {?}
     */
    NgbRadio.prototype.onChange = /**
     * @return {?}
     */
    function () { this._group.onRadioChange(this); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRadio.prototype.updateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        if (this.value !== value) {
            this._cd.markForCheck();
        }
        this._checked = this.value === value;
        this._label.active = this._checked;
    };
    /**
     * @return {?}
     */
    NgbRadio.prototype.updateDisabled = /**
     * @return {?}
     */
    function () { this._label.disabled = this.disabled; };
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
    NgbRadio.ctorParameters = function () { return [
        { type: NgbRadioGroup },
        { type: NgbButtonLabel },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    NgbRadio.propDecorators = {
        name: [{ type: Input }],
        value: [{ type: Input, args: ['value',] }],
        disabled: [{ type: Input, args: ['disabled',] }]
    };
    return NgbRadio;
}());
export { NgbRadio };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImJ1dHRvbnMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDOztJQUVqQyx3QkFBd0IsR0FBRztJQUMvQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsRUFBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNaOztJQUVHLE1BQU0sR0FBRyxDQUFDOzs7Ozs7O0FBUWQ7SUFBQTtRQUVVLFlBQU8sR0FBa0IsSUFBSSxHQUFHLEVBQVksQ0FBQztRQUM3QyxXQUFNLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7UUFjYixTQUFJLEdBQUcsZUFBYSxNQUFNLEVBQUksQ0FBQztRQUV4QyxhQUFROzs7O1FBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxFQUFDO1FBQzFCLGNBQVM7OztRQUFHLGNBQU8sQ0FBQyxFQUFDO0lBNkJ2QixDQUFDO0lBM0NDLHNCQUFJLG1DQUFROzs7O1FBQVosY0FBaUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDekMsVUFBYSxVQUFtQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUQvQjs7Ozs7SUFnQnpDLHFDQUFhOzs7O0lBQWIsVUFBYyxLQUFlO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FB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QTRCOzs7OztJQUMzRiw0QkFBOEM7Ozs7O0lBQUUsdUJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XG5cbmNvbnN0IE5HQl9SQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhZGlvR3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogQWxsb3dzIHRvIGVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIHJhZGlvIGJ1dHRvbnMuXG4gKlxuICogSW50ZWdyYXRlcyB3aXRoIGZvcm1zLCBzbyB0aGUgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byB0aGUgdW5kZXJseWluZyBmb3JtIGNvbnRyb2xcbiAqIGVpdGhlciBpbiBhIHJlYWN0aXZlIG9yIHRlbXBsYXRlLWRyaXZlbiB3YXkuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlJhZGlvR3JvdXBdJywgaG9zdDogeydyb2xlJzogJ3JhZGlvZ3JvdXAnfSwgcHJvdmlkZXJzOiBbTkdCX1JBRElPX1ZBTFVFX0FDQ0VTU09SXX0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJpdmF0ZSBfcmFkaW9zOiBTZXQ8TmdiUmFkaW8+ID0gbmV3IFNldDxOZ2JSYWRpbz4oKTtcbiAgcHJpdmF0ZSBfdmFsdWUgPSBudWxsO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cblxuICAvKipcbiAgICogTmFtZSBvZiB0aGUgcmFkaW8gZ3JvdXAgYXBwbGllZCB0byByYWRpbyBpbnB1dCBlbGVtZW50cy5cbiAgICpcbiAgICogV2lsbCBiZSBhcHBsaWVkIHRvIGFsbCByYWRpbyBpbnB1dCBlbGVtZW50cyBpbnNpZGUgdGhlIGdyb3VwLFxuICAgKiB1bmxlc3MgW2BOZ2JSYWRpb2BdKCMvY29tcG9uZW50cy9idXR0b25zL2FwaSNOZ2JSYWRpbykncyBzcGVjaWZ5IG5hbWVzIHRoZW1zZWx2ZXMuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgd2lsbCBiZSBnZW5lcmF0ZWQgaW4gdGhlIGBuZ2ItcmFkaW8teHhgIGZvcm1hdC5cbiAgICovXG4gIEBJbnB1dCgpIG5hbWUgPSBgbmdiLXJhZGlvLSR7bmV4dElkKyt9YDtcblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBvblJhZGlvQ2hhbmdlKHJhZGlvOiBOZ2JSYWRpbykge1xuICAgIHRoaXMud3JpdGVWYWx1ZShyYWRpby52YWx1ZSk7XG4gICAgdGhpcy5vbkNoYW5nZShyYWRpby52YWx1ZSk7XG4gIH1cblxuICBvblJhZGlvVmFsdWVVcGRhdGUoKSB7IHRoaXMuX3VwZGF0ZVJhZGlvc1ZhbHVlKCk7IH1cblxuICByZWdpc3RlcihyYWRpbzogTmdiUmFkaW8pIHsgdGhpcy5fcmFkaW9zLmFkZChyYWRpbyk7IH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl91cGRhdGVSYWRpb3NEaXNhYmxlZCgpO1xuICB9XG5cbiAgdW5yZWdpc3RlcihyYWRpbzogTmdiUmFkaW8pIHsgdGhpcy5fcmFkaW9zLmRlbGV0ZShyYWRpbyk7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSYWRpb3NWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9zVmFsdWUoKSB7IHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4gcmFkaW8udXBkYXRlVmFsdWUodGhpcy5fdmFsdWUpKTsgfVxuICBwcml2YXRlIF91cGRhdGVSYWRpb3NEaXNhYmxlZCgpIHsgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby51cGRhdGVEaXNhYmxlZCgpKTsgfVxufVxuXG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBtYXJrcyBhbiBpbnB1dCBvZiB0eXBlIFwicmFkaW9cIiBhcyBhIHBhcnQgb2YgdGhlXG4gKiBbYE5nYlJhZGlvR3JvdXBgXSgjL2NvbXBvbmVudHMvYnV0dG9ucy9hcGkjTmdiUmFkaW9Hcm91cCkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9cmFkaW9dJyxcbiAgaG9zdDoge1xuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbbmFtZV0nOiAnbmFtZUF0dHInLFxuICAgICcoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW8gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSBmb3IgdGhlICduYW1lJyBwcm9wZXJ0eSBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICpcbiAgICogQWxsIGlucHV0cyBvZiB0aGUgcmFkaW8gZ3JvdXAgc2hvdWxkIGhhdmUgdGhlIHNhbWUgbmFtZS4gSWYgbm90IHNwZWNpZmllZCxcbiAgICogdGhlIG5hbWUgb2YgdGhlIGVuY2xvc2luZyBncm91cCBpcyB1c2VkLlxuICAgKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9ybSBjb250cm9sIHZhbHVlIHdoZW4gY3VycmVudCByYWRpbyBidXR0b24gaXMgY2hlY2tlZC5cbiAgICovXG4gIEBJbnB1dCgndmFsdWUnKVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnJztcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHN0cmluZ1ZhbHVlKTtcbiAgICB0aGlzLl9ncm91cC5vblJhZGlvVmFsdWVVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGN1cnJlbnQgcmFkaW8gYnV0dG9uIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQgIT09IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICB9XG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2dyb3VwLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkKCkgeyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2dyb3VwLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkOyB9XG5cbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cblxuICBnZXQgbmFtZUF0dHIoKSB7IHJldHVybiB0aGlzLm5hbWUgfHwgdGhpcy5fZ3JvdXAubmFtZTsgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZ3JvdXA6IE5nYlJhZGlvR3JvdXAsIHByaXZhdGUgX2xhYmVsOiBOZ2JCdXR0b25MYWJlbCwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuX2dyb3VwLnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9ncm91cC51bnJlZ2lzdGVyKHRoaXMpOyB9XG5cbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIC8vIGxhYmVsIHdvbid0IGJlIHVwZGF0ZWQsIGlmIGl0IGlzIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudCB3aGVuIFtuZ01vZGVsXSBjaGFuZ2VzXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGVja2VkID0gdGhpcy52YWx1ZSA9PT0gdmFsdWU7XG4gICAgdGhpcy5fbGFiZWwuYWN0aXZlID0gdGhpcy5fY2hlY2tlZDtcbiAgfVxuXG4gIHVwZGF0ZURpc2FibGVkKCkgeyB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7IH1cbn1cbiJdfQ==