/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Attribute, Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { NgbToastConfig } from './toast-config';
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * \@since 5.0.0
 */
var NgbToastHeader = /** @class */ (function () {
    function NgbToastHeader() {
    }
    NgbToastHeader.decorators = [
        { type: Directive, args: [{ selector: '[ngbToastHeader]' },] }
    ];
    return NgbToastHeader;
}());
export { NgbToastHeader };
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * \@since 5.0.0
 */
var NgbToast = /** @class */ (function () {
    function NgbToast(ariaLive, config) {
        this.ariaLive = ariaLive;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired immediately when toast's `hide()` method has been called.
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross (&times)
         *
         * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
         * that.
         */
        this.hideOutput = new EventEmitter();
        if (this.ariaLive == null) {
            this.ariaLive = config.ariaLive;
        }
        this.delay = config.delay;
        this.autohide = config.autohide;
    }
    /**
     * @return {?}
     */
    NgbToast.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () { this._init(); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbToast.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    };
    /**
     * @return {?}
     */
    NgbToast.prototype.hide = /**
     * @return {?}
     */
    function () {
        this._clearTimeout();
        this.hideOutput.emit();
    };
    /**
     * @private
     * @return {?}
     */
    NgbToast.prototype._init = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout((/**
             * @return {?}
             */
            function () { return _this.hide(); }), this.delay);
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgbToast.prototype._clearTimeout = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    };
    NgbToast.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-toast',
                    exportAs: 'ngbToast',
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'role': 'alert',
                        '[attr.aria-live]': 'ariaLive',
                        'aria-atomic': 'true',
                        '[class.toast]': 'true',
                        '[class.show]': 'true',
                    },
                    template: "\n    <ng-template #headerTpl>\n      <strong class=\"mr-auto\">{{header}}</strong>\n    </ng-template>\n    <ng-template [ngIf]=\"contentHeaderTpl || header\">\n      <div class=\"toast-header\">\n        <ng-template [ngTemplateOutlet]=\"contentHeaderTpl || headerTpl\"></ng-template>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.toast.close-aria\" (click)=\"hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n    </ng-template>\n    <div class=\"toast-body\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    styles: [".ngb-toasts{position:fixed;top:0;right:0;margin:.5em;z-index:1200}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}"]
                }] }
    ];
    /** @nocollapse */
    NgbToast.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['aria-live',] }] },
        { type: NgbToastConfig }
    ]; };
    NgbToast.propDecorators = {
        delay: [{ type: Input }],
        autohide: [{ type: Input }],
        header: [{ type: Input }],
        contentHeaderTpl: [{ type: ContentChild, args: [NgbToastHeader, { read: TemplateRef, static: true },] }],
        hideOutput: [{ type: Output, args: ['hide',] }]
    };
    return NgbToast;
}());
export { NgbToast };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbToast.prototype._timeoutID;
    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     * @type {?}
     */
    NgbToast.prototype.delay;
    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     * @type {?}
     */
    NgbToast.prototype.autohide;
    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     * @type {?}
     */
    NgbToast.prototype.header;
    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     * @type {?}
     */
    NgbToast.prototype.contentHeaderTpl;
    /**
     * An event fired immediately when toast's `hide()` method has been called.
     * It can only occur in 2 different scenarios:
     * - `autohide` timeout fires
     * - user clicks on a closing cross (&times)
     *
     * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
     * that.
     * @type {?}
     */
    NgbToast.prototype.hideOutput;
    /** @type {?} */
    NgbToast.prototype.ariaLive;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvYXN0L3RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBUTlDO0lBQUE7SUFFQSxDQUFDOztnQkFGQSxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUM7O0lBRXpDLHFCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRFksY0FBYzs7Ozs7OztBQVMzQjtJQW9FRSxrQkFBMkMsUUFBZ0IsRUFBRSxNQUFzQjtRQUF4QyxhQUFRLEdBQVIsUUFBUSxDQUFROzs7OztRQWJNLHFCQUFnQixHQUEyQixJQUFJLENBQUM7Ozs7Ozs7Ozs7UUFXakcsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFHcEQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxxQ0FBa0I7OztJQUFsQixjQUF1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUV0Qyw4QkFBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxVQUFVLElBQUksT0FBTyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7SUFFRCx1QkFBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVPLHdCQUFLOzs7O0lBQWI7UUFBQSxpQkFJQztRQUhDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVOzs7WUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOzs7OztJQUVPLGdDQUFhOzs7O0lBQXJCO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDSCxDQUFDOztnQkFyR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsT0FBTzt3QkFDZixrQkFBa0IsRUFBRSxVQUFVO3dCQUM5QixhQUFhLEVBQUUsTUFBTTt3QkFDckIsZUFBZSxFQUFFLE1BQU07d0JBQ3ZCLGNBQWMsRUFBRSxNQUFNO3FCQUN2QjtvQkFDRCxRQUFRLEVBQUUsZ21CQWVUOztpQkFFRjs7Ozs2Q0F3Q2MsU0FBUyxTQUFDLFdBQVc7Z0JBdEY1QixjQUFjOzs7d0JBdURuQixLQUFLOzJCQU1MLEtBQUs7eUJBTUwsS0FBSzttQ0FNTCxZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDOzZCQVc5RCxNQUFNLFNBQUMsTUFBTTs7SUFvQ2hCLGVBQUM7Q0FBQSxBQXRHRCxJQXNHQztTQXpFWSxRQUFROzs7Ozs7SUFFbkIsOEJBQW1COzs7Ozs7SUFNbkIseUJBQXVCOzs7Ozs7SUFNdkIsNEJBQTJCOzs7Ozs7SUFNM0IsMEJBQXdCOzs7Ozs7SUFNeEIsb0NBQWlIOzs7Ozs7Ozs7OztJQVdqSCw4QkFBc0Q7O0lBRTFDLDRCQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiVG9hc3RDb25maWd9IGZyb20gJy4vdG9hc3QtY29uZmlnJztcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBhbGxvd3MgdGhlIHVzYWdlIG9mIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXNcbiAqIGluc2lkZSBvZiB0aGUgdG9hc3QncyBoZWFkZXIuXG4gKlxuICogQHNpbmNlIDUuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlRvYXN0SGVhZGVyXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0SGVhZGVyIHtcbn1cblxuLyoqXG4gKiBUb2FzdHMgcHJvdmlkZSBmZWVkYmFjayBtZXNzYWdlcyBhcyBub3RpZmljYXRpb25zIHRvIHRoZSB1c2VyLlxuICogR29hbCBpcyB0byBtaW1pYyB0aGUgcHVzaCBub3RpZmljYXRpb25zIGF2YWlsYWJsZSBib3RoIG9uIG1vYmlsZSBhbmQgZGVza3RvcCBvcGVyYXRpbmcgc3lzdGVtcy5cbiAqXG4gKiBAc2luY2UgNS4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRvYXN0JyxcbiAgZXhwb3J0QXM6ICduZ2JUb2FzdCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdhbGVydCcsXG4gICAgJ1thdHRyLmFyaWEtbGl2ZV0nOiAnYXJpYUxpdmUnLFxuICAgICdhcmlhLWF0b21pYyc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLnRvYXN0XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLnNob3ddJzogJ3RydWUnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjaGVhZGVyVHBsPlxuICAgICAgPHN0cm9uZyBjbGFzcz1cIm1yLWF1dG9cIj57e2hlYWRlcn19PC9zdHJvbmc+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29udGVudEhlYWRlclRwbCB8fCBoZWFkZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1oZWFkZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRIZWFkZXJUcGwgfHwgaGVhZGVyVHBsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRvYXN0LmNsb3NlLWFyaWFcIiAoY2xpY2spPVwiaGlkZSgpXCI+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1ib2R5XCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3RvYXN0LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUb2FzdCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsXG4gICAgT25DaGFuZ2VzIHtcbiAgcHJpdmF0ZSBfdGltZW91dElEO1xuXG4gIC8qKlxuICAgKiBEZWxheSBhZnRlciB3aGljaCB0aGUgdG9hc3Qgd2lsbCBoaWRlIChtcykuXG4gICAqIGRlZmF1bHQ6IGA1MDBgIChtcykgKGluaGVyaXRlZCBmcm9tIE5nYlRvYXN0Q29uZmlnKVxuICAgKi9cbiAgQElucHV0KCkgZGVsYXk6IG51bWJlcjtcblxuICAvKipcbiAgICogQXV0byBoaWRlIHRoZSB0b2FzdCBhZnRlciBhIGRlbGF5IGluIG1zLlxuICAgKiBkZWZhdWx0OiBgdHJ1ZWAgKGluaGVyaXRlZCBmcm9tIE5nYlRvYXN0Q29uZmlnKVxuICAgKi9cbiAgQElucHV0KCkgYXV0b2hpZGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRleHQgdG8gYmUgdXNlZCBhcyB0b2FzdCdzIGhlYWRlci5cbiAgICogSWdub3JlZCBpZiBhIENvbnRlbnRDaGlsZCB0ZW1wbGF0ZSBpcyBzcGVjaWZpZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHRlbXBsYXRlIGxpa2UgYDxuZy10ZW1wbGF0ZSBuZ2JUb2FzdEhlYWRlcj48L25nLXRlbXBsYXRlPmAgY2FuIGJlXG4gICAqIHVzZWQgaW4gdGhlIHByb2plY3RlZCBjb250ZW50IHRvIGFsbG93IG1hcmt1cCB1c2FnZS5cbiAgICovXG4gIEBDb250ZW50Q2hpbGQoTmdiVG9hc3RIZWFkZXIsIHtyZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlfSkgY29udGVudEhlYWRlclRwbDogVGVtcGxhdGVSZWY8YW55PnwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIGltbWVkaWF0ZWx5IHdoZW4gdG9hc3QncyBgaGlkZSgpYCBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICAgKiBJdCBjYW4gb25seSBvY2N1ciBpbiAyIGRpZmZlcmVudCBzY2VuYXJpb3M6XG4gICAqIC0gYGF1dG9oaWRlYCB0aW1lb3V0IGZpcmVzXG4gICAqIC0gdXNlciBjbGlja3Mgb24gYSBjbG9zaW5nIGNyb3NzICgmdGltZXMpXG4gICAqXG4gICAqIEFkZGl0aW9uYWxseSB0aGlzIG91dHB1dCBpcyBwdXJlbHkgaW5mb3JtYXRpdmUuIFRoZSB0b2FzdCB3b24ndCBkaXNhcHBlYXIuIEl0J3MgdXAgdG8gdGhlIHVzZXIgdG8gdGFrZSBjYXJlIG9mXG4gICAqIHRoYXQuXG4gICAqL1xuICBAT3V0cHV0KCdoaWRlJykgaGlkZU91dHB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCdhcmlhLWxpdmUnKSBwdWJsaWMgYXJpYUxpdmU6IHN0cmluZywgY29uZmlnOiBOZ2JUb2FzdENvbmZpZykge1xuICAgIGlmICh0aGlzLmFyaWFMaXZlID09IG51bGwpIHtcbiAgICAgIHRoaXMuYXJpYUxpdmUgPSBjb25maWcuYXJpYUxpdmU7XG4gICAgfVxuICAgIHRoaXMuZGVsYXkgPSBjb25maWcuZGVsYXk7XG4gICAgdGhpcy5hdXRvaGlkZSA9IGNvbmZpZy5hdXRvaGlkZTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHsgdGhpcy5faW5pdCgpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICgnYXV0b2hpZGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZW91dCgpO1xuICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XG4gICAgdGhpcy5oaWRlT3V0cHV0LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b2hpZGUgJiYgIXRoaXMuX3RpbWVvdXRJRCkge1xuICAgICAgdGhpcy5fdGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5kZWxheSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xlYXJUaW1lb3V0KCkge1xuICAgIGlmICh0aGlzLl90aW1lb3V0SUQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0SUQpO1xuICAgICAgdGhpcy5fdGltZW91dElEID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==