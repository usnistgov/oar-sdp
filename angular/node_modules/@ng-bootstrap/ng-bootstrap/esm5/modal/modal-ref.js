/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
var /**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
NgbActiveModal = /** @class */ (function () {
    function NgbActiveModal() {
    }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     * @param {?=} result
     * @return {?}
     */
    NgbActiveModal.prototype.close = /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     * @param {?=} result
     * @return {?}
     */
    function (result) { };
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     * @param {?=} reason
     * @return {?}
     */
    NgbActiveModal.prototype.dismiss = /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { };
    return NgbActiveModal;
}());
/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
export { NgbActiveModal };
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
var /**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
NgbModalRef = /** @class */ (function () {
    function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        var _this = this;
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe((/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) { _this.dismiss(reason); }));
        this.result = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        }));
        this.result.then(null, (/**
         * @return {?}
         */
        function () { }));
    }
    Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
        /**
         * The instance of a component used for the modal content.
         *
         * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
         */
        get: /**
         * The instance of a component used for the modal content.
         *
         * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
         * @return {?}
         */
        function () {
            if (this._contentRef && this._contentRef.componentRef) {
                return this._contentRef.componentRef.instance;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     * @param {?=} result
     * @return {?}
     */
    NgbModalRef.prototype.close = /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    };
    /**
     * @private
     * @param {?=} reason
     * @return {?}
     */
    NgbModalRef.prototype._dismiss = /**
     * @private
     * @param {?=} reason
     * @return {?}
     */
    function (reason) {
        this._reject(reason);
        this._removeModalElements();
    };
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     * @param {?=} reason
     * @return {?}
     */
    NgbModalRef.prototype.dismiss = /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     * @param {?=} reason
     * @return {?}
     */
    function (reason) {
        var _this = this;
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                var dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then((/**
                     * @param {?} result
                     * @return {?}
                     */
                    function (result) {
                        if (result !== false) {
                            _this._dismiss(reason);
                        }
                    }), (/**
                     * @return {?}
                     */
                    function () { }));
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgbModalRef.prototype._removeModalElements = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            var backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    };
    return NgbModalRef;
}());
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
export { NgbModalRef };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbModalRef.prototype._resolve;
    /**
     * @type {?}
     * @private
     */
    NgbModalRef.prototype._reject;
    /**
     * The promise that is resolved when the modal is closed and rejected when the modal is dismissed.
     * @type {?}
     */
    NgbModalRef.prototype.result;
    /**
     * @type {?}
     * @private
     */
    NgbModalRef.prototype._windowCmptRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalRef.prototype._contentRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalRef.prototype._backdropCmptRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalRef.prototype._beforeDismiss;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQWFBOzs7Ozs7O0lBQUE7SUFjQSxDQUFDO0lBYkM7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCw4QkFBSzs7Ozs7OztJQUFMLFVBQU0sTUFBWSxJQUFTLENBQUM7SUFFNUI7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxnQ0FBTzs7Ozs7OztJQUFQLFVBQVEsTUFBWSxJQUFTLENBQUM7SUFDaEMscUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQzs7Ozs7Ozs7Ozs7QUFLRDs7OztJQW9CRSxxQkFDWSxjQUE0QyxFQUFVLFdBQXVCLEVBQzdFLGdCQUFpRCxFQUFVLGNBQXlCO1FBRmhHLGlCQVVDO1FBVFcsbUJBQWMsR0FBZCxjQUFjLENBQThCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDN0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFXO1FBQzlGLGNBQWMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQVcsSUFBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7OztRQUFFLGNBQU8sQ0FBQyxFQUFDLENBQUM7SUFDbkMsQ0FBQztJQXJCRCxzQkFBSSwwQ0FBaUI7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b3JlJztcblxuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcblxuaW1wb3J0IHtDb250ZW50UmVmfSBmcm9tICcuLi91dGlsL3BvcHVwJztcblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IG9wZW5lZCAoYWN0aXZlKSBtb2RhbC5cbiAqXG4gKiBJbnN0YW5jZXMgb2YgdGhpcyBjbGFzcyBjYW4gYmUgaW5qZWN0ZWQgaW50byB5b3VyIGNvbXBvbmVudCBwYXNzZWQgYXMgbW9kYWwgY29udGVudC5cbiAqIFNvIHlvdSBjYW4gYC5jbG9zZSgpYCBvciBgLmRpc21pc3MoKWAgdGhlIG1vZGFsIHdpbmRvdyBmcm9tIHlvdXIgY29tcG9uZW50LlxuICovXG5leHBvcnQgY2xhc3MgTmdiQWN0aXZlTW9kYWwge1xuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsIGByZXN1bHRgIHZhbHVlLlxuICAgKlxuICAgKiBUaGUgYE5nYk1vYmFsUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxuICAgKi9cbiAgY2xvc2UocmVzdWx0PzogYW55KTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgYHJlYXNvbmAgdmFsdWUuXG4gICAqXG4gICAqIFRoZSBgTmdiTW9kYWxSZWYucmVzdWx0YCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG4gICAqL1xuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge31cbn1cblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byB0aGUgbmV3bHkgb3BlbmVkIG1vZGFsIHJldHVybmVkIGJ5IHRoZSBgTmdiTW9kYWwub3BlbigpYCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFJlZiB7XG4gIHByaXZhdGUgX3Jlc29sdmU6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XG4gIHByaXZhdGUgX3JlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcblxuICAvKipcbiAgICogVGhlIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IHVzZWQgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuICAgKlxuICAgKiBXaGVuIGEgYFRlbXBsYXRlUmVmYCBpcyB1c2VkIGFzIHRoZSBjb250ZW50IG9yIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCwgd2lsbCByZXR1cm4gYHVuZGVmaW5lZGAuXG4gICAqL1xuICBnZXQgY29tcG9uZW50SW5zdGFuY2UoKTogYW55IHtcbiAgICBpZiAodGhpcy5fY29udGVudFJlZiAmJiB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZikge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCBhbmQgcmVqZWN0ZWQgd2hlbiB0aGUgbW9kYWwgaXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgcmVzdWx0OiBQcm9taXNlPGFueT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF93aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+LCBwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmLFxuICAgICAgcHJpdmF0ZSBfYmFja2Ryb3BDbXB0UmVmPzogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+LCBwcml2YXRlIF9iZWZvcmVEaXNtaXNzPzogRnVuY3Rpb24pIHtcbiAgICBfd2luZG93Q21wdFJlZi5pbnN0YW5jZS5kaXNtaXNzRXZlbnQuc3Vic2NyaWJlKChyZWFzb246IGFueSkgPT4geyB0aGlzLmRpc21pc3MocmVhc29uKTsgfSk7XG5cbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuICAgIHRoaXMucmVzdWx0LnRoZW4obnVsbCwgKCkgPT4ge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbW9kYWwgd2l0aCBhbiBvcHRpb25hbCBgcmVzdWx0YCB2YWx1ZS5cbiAgICpcbiAgICogVGhlIGBOZ2JNb2JhbFJlZi5yZXN1bHRgIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZS5cbiAgICovXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl93aW5kb3dDbXB0UmVmKSB7XG4gICAgICB0aGlzLl9yZXNvbHZlKHJlc3VsdCk7XG4gICAgICB0aGlzLl9yZW1vdmVNb2RhbEVsZW1lbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcbiAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcbiAgICB0aGlzLl9yZW1vdmVNb2RhbEVsZW1lbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogRGlzbWlzc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsIGByZWFzb25gIHZhbHVlLlxuICAgKlxuICAgKiBUaGUgYE5nYk1vZGFsUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxuICAgKi9cbiAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93Q21wdFJlZikge1xuICAgICAgaWYgKCF0aGlzLl9iZWZvcmVEaXNtaXNzKSB7XG4gICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSB0aGlzLl9iZWZvcmVEaXNtaXNzKCk7XG4gICAgICAgIGlmIChkaXNtaXNzICYmIGRpc21pc3MudGhlbikge1xuICAgICAgICAgIGRpc21pc3MudGhlbihcbiAgICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKCkgPT4ge30pO1xuICAgICAgICB9IGVsc2UgaWYgKGRpc21pc3MgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTW9kYWxFbGVtZW50cygpIHtcbiAgICBjb25zdCB3aW5kb3dOYXRpdmVFbCA9IHRoaXMuX3dpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICB3aW5kb3dOYXRpdmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdpbmRvd05hdGl2ZUVsKTtcbiAgICB0aGlzLl93aW5kb3dDbXB0UmVmLmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLl9iYWNrZHJvcENtcHRSZWYpIHtcbiAgICAgIGNvbnN0IGJhY2tkcm9wTmF0aXZlRWwgPSB0aGlzLl9iYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICAgIGJhY2tkcm9wTmF0aXZlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYWNrZHJvcE5hdGl2ZUVsKTtcbiAgICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYgJiYgdGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XG4gICAgICB0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYgPSBudWxsO1xuICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZiA9IG51bGw7XG4gICAgdGhpcy5fY29udGVudFJlZiA9IG51bGw7XG4gIH1cbn1cbiJdfQ==