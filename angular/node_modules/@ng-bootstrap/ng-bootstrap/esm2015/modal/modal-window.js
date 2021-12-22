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
export class NgbModalWindow {
    /**
     * @param {?} _document
     * @param {?} _elRef
     * @param {?} _zone
     */
    constructor(_document, _elRef, _zone) {
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
    dismiss(reason) { this.dismissEvent.emit(reason); }
    /**
     * @return {?}
     */
    ngOnInit() { this._elWithFocus = this._document.activeElement; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), 
            // tslint:disable-next-line:deprecation
            filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e.which === Key.Escape && this.keyboard)))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => requestAnimationFrame((/**
             * @return {?}
             */
            () => {
                if (!event.defaultPrevented) {
                    this._zone.run((/**
                     * @return {?}
                     */
                    () => this.dismiss(ModalDismissReasons.ESC)));
                }
            }))));
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            /** @type {?} */
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap((/**
             * @return {?}
             */
            () => preventClose = false)), switchMap((/**
             * @return {?}
             */
            () => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1)))), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ target }) => nativeElement === target)))
                .subscribe((/**
             * @return {?}
             */
            () => { preventClose = true; }));
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(this._closed$)).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ target }) => {
                if (this.backdrop === true && nativeElement === target && !preventClose) {
                    this._zone.run((/**
                     * @return {?}
                     */
                    () => this.dismiss(ModalDismissReasons.BACKDROP_CLICK)));
                }
                preventClose = false;
            }));
        }));
        if (!nativeElement.contains(document.activeElement)) {
            /** @type {?} */
            const autoFocusable = (/** @type {?} */ (nativeElement.querySelector(`[ngbAutofocus]`)));
            /** @type {?} */
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            /** @type {?} */
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const elWithFocus = this._elWithFocus;
        /** @type {?} */
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => elementToFocus.focus()));
            this._elWithFocus = null;
        }));
        this._closed$.next();
    }
}
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
                template: `
    <div #dialog [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +
     (scrollable ? ' modal-dialog-scrollable' : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `,
                encapsulation: ViewEncapsulation.None,
                styles: ["ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}"]
            }] }
];
/** @nocollapse */
NgbModalWindow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBb0I1RCxNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBaUJ6QixZQUM4QixTQUFjLEVBQVUsTUFBK0IsRUFBVSxLQUFhO1FBQTlFLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFoQnBHLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBTTlCLGFBQVEsR0FBcUIsSUFBSSxDQUFDO1FBRWxDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFLTixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFHMEQsQ0FBQzs7Ozs7SUFFaEgsT0FBTyxDQUFDLE1BQU0sSUFBVSxJQUFJLENBQUMs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S0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUVMLE1BQU0sU0FBQyxTQUFTOzs7Ozs7O0lBYmpCLGtDQUF1Qzs7Ozs7SUFDdkMsc0NBQThCOzs7OztJQUU5QixtQ0FBZ0Y7O0lBRWhGLHdDQUFnQzs7SUFDaEMsa0NBQTJDOztJQUMzQyxrQ0FBMEI7O0lBQzFCLGtDQUF5Qjs7SUFDekIsb0NBQTRCOztJQUM1Qiw4QkFBc0I7O0lBQ3RCLHFDQUE2Qjs7SUFFN0Isc0NBQXFEOzs7OztJQUdqRCxtQ0FBd0M7Ozs7O0lBQUUsZ0NBQXVDOzs7OztJQUFFLCtCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ1wibW9kYWwgZmFkZSBzaG93IGQtYmxvY2tcIiArICh3aW5kb3dDbGFzcyA/IFwiIFwiICsgd2luZG93Q2xhc3MgOiBcIlwiKScsXG4gICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdbYXR0ci5hcmlhLW1vZGFsXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRCeScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjZGlhbG9nIFtjbGFzc109XCInbW9kYWwtZGlhbG9nJyArIChzaXplID8gJyBtb2RhbC0nICsgc2l6ZSA6ICcnKSArIChjZW50ZXJlZCA/ICcgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJyA6ICcnKSArXG4gICAgIChzY3JvbGxhYmxlID8gJyBtb2RhbC1kaWFsb2ctc2Nyb2xsYWJsZScgOiAnJylcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWwuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsV2luZG93IGltcGxlbWVudHMgT25Jbml0LFxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9lbFdpdGhGb2N1czogRWxlbWVudDsgIC8vIGVsZW1lbnQgdGhhdCBpcyBmb2N1c2VkIHByaW9yIHRvIG1vZGFsIG9wZW5pbmdcblxuICBAVmlld0NoaWxkKCdkaWFsb2cnLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSBfZGlhbG9nRWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhY2tkcm9wOiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcbiAgQElucHV0KCkgY2VudGVyZWQ6IHN0cmluZztcbiAgQElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xuICBASW5wdXQoKSBzY3JvbGxhYmxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgd2luZG93Q2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCdkaXNtaXNzJykgZGlzbWlzc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgZGlzbWlzcyhyZWFzb24pOiB2b2lkIHsgdGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pOyB9XG5cbiAgbmdPbkluaXQoKSB7IHRoaXMuX2VsV2l0aEZvY3VzID0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudDsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCB7bmF0aXZlRWxlbWVudH0gPSB0aGlzLl9lbFJlZjtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblxuICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLFxuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LkVzY2FwZSAmJiB0aGlzLmtleWJvYXJkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkVTQykpO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgIC8vIFdlJ3JlIGxpc3RlbmluZyB0byAnbW91c2Vkb3duJyBhbmQgJ21vdXNldXAnIHRvIHByZXZlbnQgbW9kYWwgZnJvbSBjbG9zaW5nIHdoZW4gcHJlc3NpbmcgdGhlIG1vdXNlXG4gICAgICAvLyBpbnNpZGUgdGhlIG1vZGFsIGRpYWxvZyBhbmQgcmVsZWFzaW5nIGl0IG91dHNpZGVcbiAgICAgIGxldCBwcmV2ZW50Q2xvc2UgPSBmYWxzZTtcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kaWFsb2dFbC5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCB0YXAoKCkgPT4gcHJldmVudENsb3NlID0gZmFsc2UpLFxuICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdtb3VzZXVwJykucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIHRha2UoMSkpKSxcbiAgICAgICAgICAgICAgZmlsdGVyKCh7dGFyZ2V0fSkgPT4gbmF0aXZlRWxlbWVudCA9PT0gdGFyZ2V0KSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHsgcHJldmVudENsb3NlID0gdHJ1ZTsgfSk7XG5cbiAgICAgIC8vIFdlJ3JlIGxpc3RlbmluZyB0byAnY2xpY2snIHRvIGRpc21pc3MgbW9kYWwgb24gbW9kYWwgd2luZG93IGNsaWNrLCBleGNlcHQgd2hlbjpcbiAgICAgIC8vIDEuIGNsaWNraW5nIG9uIG1vZGFsIGRpYWxvZyBpdHNlbGZcbiAgICAgIC8vIDIuIGNsb3Npbmcgd2FzIHByZXZlbnRlZCBieSBtb3VzZWRvd24vdXAgaGFuZGxlcnNcbiAgICAgIC8vIDMuIGNsaWNraW5nIG9uIHNjcm9sbGJhciB3aGVuIHRoZSB2aWV3cG9ydCBpcyB0b28gc21hbGwgYW5kIG1vZGFsIGRvZXNuJ3QgZml0IChjbGljayBpcyBub3QgdHJpZ2dlcmVkIGF0IGFsbClcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50PihuYXRpdmVFbGVtZW50LCAnY2xpY2snKS5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSkuc3Vic2NyaWJlKCh7dGFyZ2V0fSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5iYWNrZHJvcCA9PT0gdHJ1ZSAmJiBuYXRpdmVFbGVtZW50ID09PSB0YXJnZXQgJiYgIXByZXZlbnRDbG9zZSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkJBQ0tEUk9QX0NMSUNLKSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmVudENsb3NlID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghbmF0aXZlRWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgY29uc3QgYXV0b0ZvY3VzYWJsZSA9IG5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgW25nYkF1dG9mb2N1c11gKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IGZpcnN0Rm9jdXNhYmxlID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhuYXRpdmVFbGVtZW50KVswXTtcblxuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPSBhdXRvRm9jdXNhYmxlIHx8IGZpcnN0Rm9jdXNhYmxlIHx8IG5hdGl2ZUVsZW1lbnQ7XG4gICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XG5cbiAgICBsZXQgZWxlbWVudFRvRm9jdXM7XG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGVsV2l0aEZvY3VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XG4gICAgfVxuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBlbGVtZW50VG9Gb2N1cy5mb2N1cygpKTtcbiAgICAgIHRoaXMuX2VsV2l0aEZvY3VzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICB9XG59XG4iXX0=