/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgbAlertConfig } from './alert-config';
/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
var NgbAlert = /** @class */ (function () {
    function NgbAlert(config, _renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         */
        this.close = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
    }
    /**
     * @return {?}
     */
    NgbAlert.prototype.closeHandler = /**
     * @return {?}
     */
    function () { this.close.emit(null); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbAlert.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, "alert-" + typeChange.previousValue);
            this._renderer.addClass(this._element.nativeElement, "alert-" + typeChange.currentValue);
        }
    };
    /**
     * @return {?}
     */
    NgbAlert.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { this._renderer.addClass(this._element.nativeElement, "alert-" + this.type); };
    NgbAlert.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-alert',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { 'role': 'alert', 'class': 'alert', '[class.alert-dismissible]': 'dismissible' },
                    template: "\n    <ng-content></ng-content>\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.alert.close\"\n      (click)=\"closeHandler()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    ",
                    styles: ["ngb-alert{display:block}"]
                }] }
    ];
    /** @nocollapse */
    NgbAlert.ctorParameters = function () { return [
        { type: NgbAlertConfig },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NgbAlert.propDecorators = {
        dismissible: [{ type: Input }],
        type: [{ type: Input }],
        close: [{ type: Output }]
    };
    return NgbAlert;
}());
export { NgbAlert };
if (false) {
    /**
     * If `true`, alert can be dismissed by the user.
     *
     * The close button (×) will be displayed and you can be notified
     * of the event with the `(close)` output.
     * @type {?}
     */
    NgbAlert.prototype.dismissible;
    /**
     * Type of the alert.
     *
     * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
     * `'secondary'`, `'light'` and `'dark'`.
     * @type {?}
     */
    NgbAlert.prototype.type;
    /**
     * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
     * @type {?}
     */
    NgbAlert.prototype.close;
    /**
     * @type {?}
     * @private
     */
    NgbAlert.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    NgbAlert.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImFsZXJ0L2FsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUlWLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU85QztJQW1DRSxrQkFBWSxNQUFzQixFQUFVLFNBQW9CLEVBQVUsUUFBb0I7UUFBbEQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7Ozs7UUFGcEYsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFHekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsK0JBQVk7OztJQUFaLGNBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFekMsOEJBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOztZQUMxQixVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBUyxVQUFVLENBQUMsYUFBZSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBUyxVQUFVLENBQUMsWUFBYyxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDOzs7O0lBRUQsMkJBQVE7OztJQUFSLGNBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBUyxJQUFJLENBQUMsSUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFsRDNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFDO29CQUNyRixRQUFRLEVBQUUsd1FBTVA7O2lCQUVKOzs7O2dCQXBCTyxjQUFjO2dCQVJwQixTQUFTO2dCQUNULFVBQVU7Ozs4QkFvQ1QsS0FBSzt1QkFPTCxLQUFLO3dCQUlMLE1BQU07O0lBa0JULGVBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQXJDWSxRQUFROzs7Ozs7Ozs7SUFRbkIsK0JBQThCOzs7Ozs7OztJQU85Qix3QkFBc0I7Ozs7O0lBSXRCLHlCQUEyQzs7Ozs7SUFFUCw2QkFBNEI7Ozs7O0lBQUUsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnLi9hbGVydC1jb25maWcnO1xuXG4vKipcbiAqIEFsZXJ0IGlzIGEgY29tcG9uZW50IHRvIHByb3ZpZGUgY29udGV4dHVhbCBmZWVkYmFjayBtZXNzYWdlcyBmb3IgdXNlci5cbiAqXG4gKiBJdCBzdXBwb3J0cyBzZXZlcmFsIGFsZXJ0IHR5cGVzIGFuZCBjYW4gYmUgZGlzbWlzc2VkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItYWxlcnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDogeydyb2xlJzogJ2FsZXJ0JywgJ2NsYXNzJzogJ2FsZXJ0JywgJ1tjbGFzcy5hbGVydC1kaXNtaXNzaWJsZV0nOiAnZGlzbWlzc2libGUnfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImRpc21pc3NpYmxlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5hbGVydC5jbG9zZVwiXG4gICAgICAoY2xpY2spPVwiY2xvc2VIYW5kbGVyKClcIj5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vYWxlcnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0IGltcGxlbWVudHMgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGFsZXJ0IGNhbiBiZSBkaXNtaXNzZWQgYnkgdGhlIHVzZXIuXG4gICAqXG4gICAqIFRoZSBjbG9zZSBidXR0b24gKMOXKSB3aWxsIGJlIGRpc3BsYXllZCBhbmQgeW91IGNhbiBiZSBub3RpZmllZFxuICAgKiBvZiB0aGUgZXZlbnQgd2l0aCB0aGUgYChjbG9zZSlgIG91dHB1dC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc21pc3NpYmxlOiBib29sZWFuO1xuICAvKipcbiAgICogVHlwZSBvZiB0aGUgYWxlcnQuXG4gICAqXG4gICAqIEJvb3RzdHJhcCBwcm92aWRlcyBzdHlsZXMgZm9yIHRoZSBmb2xsb3dpbmcgdHlwZXM6IGAnc3VjY2VzcydgLCBgJ2luZm8nYCwgYCd3YXJuaW5nJ2AsIGAnZGFuZ2VyJ2AsIGAncHJpbWFyeSdgLFxuICAgKiBgJ3NlY29uZGFyeSdgLCBgJ2xpZ2h0J2AgYW5kIGAnZGFyaydgLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjbG9zZSBidXR0b24gaXMgY2xpY2tlZC4gSXQgaGFzIG5vIHBheWxvYWQgYW5kIG9ubHkgcmVsZXZhbnQgZm9yIGRpc21pc3NpYmxlIGFsZXJ0cy5cbiAgICovXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkFsZXJ0Q29uZmlnLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5kaXNtaXNzaWJsZSA9IGNvbmZpZy5kaXNtaXNzaWJsZTtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgfVxuXG4gIGNsb3NlSGFuZGxlcigpIHsgdGhpcy5jbG9zZS5lbWl0KG51bGwpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHR5cGVDaGFuZ2UgPSBjaGFuZ2VzWyd0eXBlJ107XG4gICAgaWYgKHR5cGVDaGFuZ2UgJiYgIXR5cGVDaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dHlwZUNoYW5nZS5wcmV2aW91c1ZhbHVlfWApO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLmN1cnJlbnRWYWx1ZX1gKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHsgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0aGlzLnR5cGV9YCk7IH1cbn1cbiJdfQ==