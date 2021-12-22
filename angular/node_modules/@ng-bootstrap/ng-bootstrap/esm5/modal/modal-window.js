/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { Key } from '../util/key';
import { ModalDismissReasons } from './modal-dismiss-reasons';
var NgbModalWindow = /** @class */ (function () {
    function NgbModalWindow(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    /**
     * @param {?} reason
     * @return {?}
     */
    NgbModalWindow.prototype.dismiss = /**
     * @param {?} reason
     * @return {?}
     */
    function (reason) { this.dismissEvent.emit(reason); };
    /**
     * @return {?}
     */
    NgbModalWindow.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { this._elWithFocus = this._document.activeElement; };
    /**
     * @return {?}
     */
    NgbModalWindow.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var nativeElement = this._elRef.nativeElement;
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(_this._closed$), 
            // tslint:disable-next-line:deprecation
            filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.which === Key.Escape && _this.keyboard; })))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return requestAnimationFrame((/**
             * @return {?}
             */
            function () {
                if (!event.defaultPrevented) {
                    _this._zone.run((/**
                     * @return {?}
                     */
                    function () { return _this.dismiss(ModalDismissReasons.ESC); }));
                }
            })); }));
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            /** @type {?} */
            var preventClose = false;
            fromEvent(_this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(_this._closed$), tap((/**
             * @return {?}
             */
            function () { return preventClose = false; })), switchMap((/**
             * @return {?}
             */
            function () { return fromEvent(nativeElement, 'mouseup').pipe(takeUntil(_this._closed$), take(1)); })), filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var target = _a.target;
                return nativeElement === target;
            })))
                .subscribe((/**
             * @return {?}
             */
            function () { preventClose = true; }));
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(_this._closed$)).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var target = _a.target;
                if (_this.backdrop === true && nativeElement === target && !preventClose) {
                    _this._zone.run((/**
                     * @return {?}
                     */
                    function () { return _this.dismiss(ModalDismissReasons.BACKDROP_CLICK); }));
                }
                preventClose = false;
            }));
        }));
        if (!nativeElement.contains(document.activeElement)) {
            /** @type {?} */
            var autoFocusable = (/** @type {?} */ (nativeElement.querySelector("[ngbAutofocus]")));
            /** @type {?} */
            var firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            /** @type {?} */
            var elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    };
    /**
     * @return {?}
     */
    NgbModalWindow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var body = this._document.body;
        /** @type {?} */
        var elWithFocus = this._elWithFocus;
        /** @type {?} */
        var elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () { return elementToFocus.focus(); }));
            _this._elWithFocus = null;
        }));
        this._closed$.next();
    };
    NgbModalWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-modal-window',
                    host: {
                        '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                        'role': 'dialog',
                        'tabindex': '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                    },
                    template: "\n    <div #dialog [class]=\"'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +\n     (scrollable ? ' modal-dialog-scrollable' : '')\" role=\"document\">\n        <div class=\"modal-content\"><ng-content></ng-content></div>\n    </div>\n    ",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    NgbModalWindow.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    NgbModalWindow.propDecorators = {
        _dialogEl: [{ type: ViewChild, args: ['dialog', { static: true },] }],
        ariaLabelledBy: [{ type: Input }],
        backdrop: [{ type: Input }],
        centered: [{ type: Input }],
        keyboard: [{ type: Input }],
        scrollable: [{ type: Input }],
        size: [{ type: Input }],
        windowClass: [{ type: Input }],
        dismissEvent: [{ type: Output, args: ['dismiss',] }]
    };
    return NgbModalWindow;
}());
export { NgbModalWindow };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbModalWindow.prototype._closed$;
    /**
     * @type {?}
     * @private
     */
    NgbModalWindow.prototype._elWithFocus;
    /**
     * @type {?}
     * @private
     */
    NgbModalWindow.prototype._dialogEl;
    /** @type {?} */
    NgbModalWindow.prototype.ariaLabelledBy;
    /** @type {?} */
    NgbModalWindow.prototype.backdrop;
    /** @type {?} */
    NgbModalWindow.prototype.centered;
    /** @type {?} */
    NgbModalWindow.prototype.keyboard;
    /** @type {?} */
    NgbModalWindow.prototype.scrollable;
    /** @type {?} */
    NgbModalWindow.prototype.size;
    /** @type {?} */
    NgbModalWindow.prototype.windowClass;
    /** @type {?} */
    NgbModalWindow.prototype.dismissEvent;
    /**
     * @type {?}
     * @private
     */
    NgbModalWindow.prototype._document;
    /**
     * @type {?}
     * @private
     */
    NgbModalWindow.prototype._elRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalWindow.prototype._zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTVEO0lBbUNFLHdCQUM4QixTQUFjLEVBQVUsTUFBK0IsRUFBVSxLQUFhO1FBQTlFLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFoQnBHLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBTTlCLGFBQVEsR0FBcUIsSUFBSSxDQUFDO1FBRWxDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFLTixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFHMEQsQ0FBQzs7Ozs7SUFFaEgsZ0NBQU87Ozs7SUFBUCxVQUFRLE1BQU0sSUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLElB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QUM7aUNBRWxDLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBRUwsTUFBTSxTQUFDLFNBQVM7O0lBd0VuQixxQkFBQztDQUFBLEFBekdELElBeUdDO1NBdkZZLGNBQWM7Ozs7OztJQUV6QixrQ0FBdUM7Ozs7O0lBQ3ZDLHNDQUE4Qjs7Ozs7SUFFOUIsbUNBQWdGOztJQUVoRix3Q0FBZ0M7O0lBQ2hDLGtDQUEyQzs7SUFDM0Msa0NBQTBCOztJQUMxQixrQ0FBeUI7O0lBQ3pCLG9DQUE0Qjs7SUFDNUIsOEJBQXNCOztJQUN0QixxQ0FBNkI7O0lBRTdCLHNDQUFxRDs7Ozs7SUFHakQsbUNBQXdDOzs7OztJQUFFLGdDQUF1Qzs7Ozs7SUFBRSwrQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7Z2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50c30gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5pbXBvcnQge01vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwtZGlzbWlzcy1yZWFzb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLW1vZGFsLXdpbmRvdycsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdcIm1vZGFsIGZhZGUgc2hvdyBkLWJsb2NrXCIgKyAod2luZG93Q2xhc3MgPyBcIiBcIiArIHdpbmRvd0NsYXNzIDogXCJcIiknLFxuICAgICdyb2xlJzogJ2RpYWxvZycsXG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnW2F0dHIuYXJpYS1tb2RhbF0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkQnknLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2RpYWxvZyBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZycgKyAoc2l6ZSA/ICcgbW9kYWwtJyArIHNpemUgOiAnJykgKyAoY2VudGVyZWQgPyAnIG1vZGFsLWRpYWxvZy1jZW50ZXJlZCcgOiAnJykgK1xuICAgICAoc2Nyb2xsYWJsZSA/ICcgbW9kYWwtZGlhbG9nLXNjcm9sbGFibGUnIDogJycpXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL21vZGFsLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFdpbmRvdyBpbXBsZW1lbnRzIE9uSW5pdCxcbiAgICBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWxXaXRoRm9jdXM6IEVsZW1lbnQ7ICAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXG5cbiAgQFZpZXdDaGlsZCgnZGlhbG9nJywge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgX2RpYWxvZ0VsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuICBASW5wdXQoKSBiYWNrZHJvcDogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XG4gIEBJbnB1dCgpIGNlbnRlcmVkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGtleWJvYXJkID0gdHJ1ZTtcbiAgQElucHV0KCkgc2Nyb2xsYWJsZTogc3RyaW5nO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdpbmRvd0NsYXNzOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgnZGlzbWlzcycpIGRpc21pc3NFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxuXG4gIGRpc21pc3MocmVhc29uKTogdm9pZCB7IHRoaXMuZGlzbWlzc0V2ZW50LmVtaXQocmVhc29uKTsgfVxuXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3Qge25hdGl2ZUVsZW1lbnR9ID0gdGhpcy5fZWxSZWY7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cbiAgICAgIGZyb21FdmVudDxLZXlib2FyZEV2ZW50PihuYXRpdmVFbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSxcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5Fc2NhcGUgJiYgdGhpcy5rZXlib2FyZCkpXG4gICAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5FU0MpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAvLyBXZSdyZSBsaXN0ZW5pbmcgdG8gJ21vdXNlZG93bicgYW5kICdtb3VzZXVwJyB0byBwcmV2ZW50IG1vZGFsIGZyb20gY2xvc2luZyB3aGVuIHByZXNzaW5nIHRoZSBtb3VzZVxuICAgICAgLy8gaW5zaWRlIHRoZSBtb2RhbCBkaWFsb2cgYW5kIHJlbGVhc2luZyBpdCBvdXRzaWRlXG4gICAgICBsZXQgcHJldmVudENsb3NlID0gZmFsc2U7XG4gICAgICBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZGlhbG9nRWwubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgdGFwKCgpID0+IHByZXZlbnRDbG9zZSA9IGZhbHNlKSxcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb21FdmVudDxNb3VzZUV2ZW50PihuYXRpdmVFbGVtZW50LCAnbW91c2V1cCcpLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCB0YWtlKDEpKSksXG4gICAgICAgICAgICAgIGZpbHRlcigoe3RhcmdldH0pID0+IG5hdGl2ZUVsZW1lbnQgPT09IHRhcmdldCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7IHByZXZlbnRDbG9zZSA9IHRydWU7IH0pO1xuXG4gICAgICAvLyBXZSdyZSBsaXN0ZW5pbmcgdG8gJ2NsaWNrJyB0byBkaXNtaXNzIG1vZGFsIG9uIG1vZGFsIHdpbmRvdyBjbGljaywgZXhjZXB0IHdoZW46XG4gICAgICAvLyAxLiBjbGlja2luZyBvbiBtb2RhbCBkaWFsb2cgaXRzZWxmXG4gICAgICAvLyAyLiBjbG9zaW5nIHdhcyBwcmV2ZW50ZWQgYnkgbW91c2Vkb3duL3VwIGhhbmRsZXJzXG4gICAgICAvLyAzLiBjbGlja2luZyBvbiBzY3JvbGxiYXIgd2hlbiB0aGUgdmlld3BvcnQgaXMgdG9vIHNtYWxsIGFuZCBtb2RhbCBkb2Vzbid0IGZpdCAoY2xpY2sgaXMgbm90IHRyaWdnZXJlZCBhdCBhbGwpXG4gICAgICBmcm9tRXZlbnQ8TW91c2VFdmVudD4obmF0aXZlRWxlbWVudCwgJ2NsaWNrJykucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCkpLnN1YnNjcmliZSgoe3RhcmdldH0pID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYmFja2Ryb3AgPT09IHRydWUgJiYgbmF0aXZlRWxlbWVudCA9PT0gdGFyZ2V0ICYmICFwcmV2ZW50Q2xvc2UpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5CQUNLRFJPUF9DTElDSykpO1xuICAgICAgICB9XG4gICAgICAgIHByZXZlbnRDbG9zZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIW5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IGF1dG9Gb2N1c2FibGUgPSBuYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuZ2JBdXRvZm9jdXNdYCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBjb25zdCBmaXJzdEZvY3VzYWJsZSA9IGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMobmF0aXZlRWxlbWVudClbMF07XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzID0gYXV0b0ZvY3VzYWJsZSB8fCBmaXJzdEZvY3VzYWJsZSB8fCBuYXRpdmVFbGVtZW50O1xuICAgICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBlbFdpdGhGb2N1cyA9IHRoaXMuX2VsV2l0aEZvY3VzO1xuXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xuICAgIGlmIChlbFdpdGhGb2N1cyAmJiBlbFdpdGhGb2N1c1snZm9jdXMnXSAmJiBib2R5LmNvbnRhaW5zKGVsV2l0aEZvY3VzKSkge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBlbFdpdGhGb2N1cztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBib2R5O1xuICAgIH1cbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbWVudFRvRm9jdXMuZm9jdXMoKSk7XG4gICAgICB0aGlzLl9lbFdpdGhGb2N1cyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcbiAgfVxufVxuIl19