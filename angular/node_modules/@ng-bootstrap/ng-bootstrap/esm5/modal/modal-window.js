import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
        this._elWithFocus = null; // element that is focused prior to modal opening
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    NgbModalWindow.prototype.dismiss = function (reason) { this.dismissEvent.emit(reason); };
    NgbModalWindow.prototype.ngOnInit = function () { this._elWithFocus = this._document.activeElement; };
    NgbModalWindow.prototype.ngAfterViewInit = function () {
        var _this = this;
        var nativeElement = this._elRef.nativeElement;
        this._zone.runOutsideAngular(function () {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(_this._closed$), 
            // tslint:disable-next-line:deprecation
            filter(function (e) { return e.which === Key.Escape && _this.keyboard; }))
                .subscribe(function (event) { return requestAnimationFrame(function () {
                if (!event.defaultPrevented) {
                    _this._zone.run(function () { return _this.dismiss(ModalDismissReasons.ESC); });
                }
            }); });
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            var preventClose = false;
            fromEvent(_this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(_this._closed$), tap(function () { return preventClose = false; }), switchMap(function () { return fromEvent(nativeElement, 'mouseup').pipe(takeUntil(_this._closed$), take(1)); }), filter(function (_a) {
                var target = _a.target;
                return nativeElement === target;
            }))
                .subscribe(function () { preventClose = true; });
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(_this._closed$)).subscribe(function (_a) {
                var target = _a.target;
                if (_this.backdrop === true && nativeElement === target && !preventClose) {
                    _this._zone.run(function () { return _this.dismiss(ModalDismissReasons.BACKDROP_CLICK); });
                }
                preventClose = false;
            });
        });
        if (!nativeElement.contains(document.activeElement)) {
            var autoFocusable = nativeElement.querySelector("[ngbAutofocus]");
            var firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            var elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    };
    NgbModalWindow.prototype.ngOnDestroy = function () {
        var _this = this;
        var body = this._document.body;
        var elWithFocus = this._elWithFocus;
        var elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular(function () {
            setTimeout(function () { return elementToFocus.focus(); });
            _this._elWithFocus = null;
        });
        this._closed$.next();
    };
    NgbModalWindow.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        ViewChild('dialog', { static: true })
    ], NgbModalWindow.prototype, "_dialogEl", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "ariaDescribedBy", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "backdrop", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "centered", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "keyboard", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "scrollable", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "size", void 0);
    __decorate([
        Input()
    ], NgbModalWindow.prototype, "windowClass", void 0);
    __decorate([
        Output('dismiss')
    ], NgbModalWindow.prototype, "dismissEvent", void 0);
    NgbModalWindow = __decorate([
        Component({
            selector: 'ngb-modal-window',
            host: {
                '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                'role': 'dialog',
                'tabindex': '-1',
                '[attr.aria-modal]': 'true',
                '[attr.aria-labelledby]': 'ariaLabelledBy',
                '[attr.aria-describedby]': 'ariaDescribedBy',
            },
            template: "\n    <div #dialog [class]=\"'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +\n     (scrollable ? ' modal-dialog-scrollable' : '')\" role=\"document\">\n        <div class=\"modal-content\"><ng-content></ng-content></div>\n    </div>\n    ",
            encapsulation: ViewEncapsulation.None,
            styles: ["ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}"]
        }),
        __param(0, Inject(DOCUMENT))
    ], NgbModalWindow);
    return NgbModalWindow;
}());
export { NgbModalWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBcUI1RDtJQWtCRSx3QkFDOEIsU0FBYyxFQUFVLE1BQStCLEVBQVUsS0FBYTtRQUE5RSxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBakJwRyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixpQkFBWSxHQUFtQixJQUFJLENBQUMsQ0FBRSxpREFBaUQ7UUFNdEYsYUFBUSxHQUFxQixJQUFJLENBQUM7UUFFbEMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUtOLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUcw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REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7c0RBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO2dEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7dURBQXFCO0lBRVY7UUFBbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3REFBbUM7SUFoQjFDLGNBQWM7UUFuQjFCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSxvRUFBb0U7Z0JBQy9FLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsbUJBQW1CLEVBQUUsTUFBTTtnQkFDM0Isd0JBQXdCLEVBQUUsZ0JBQWdCO2dCQUMxQyx5QkFBeUIsRUFBRSxpQkFBaUI7YUFDN0M7WUFDRCxRQUFRLEVBQUUsK1JBS1A7WUFDSCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FFdEMsQ0FBQztRQW9CSyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQW5CVixjQUFjLENBd0YxQjtJQUFELHFCQUFDO0NBQUEsQUF4RkQsSUF3RkM7U0F4RlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ1wibW9kYWwgZmFkZSBzaG93IGQtYmxvY2tcIiArICh3aW5kb3dDbGFzcyA/IFwiIFwiICsgd2luZG93Q2xhc3MgOiBcIlwiKScsXG4gICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdbYXR0ci5hcmlhLW1vZGFsXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRCeScsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2FyaWFEZXNjcmliZWRCeScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjZGlhbG9nIFtjbGFzc109XCInbW9kYWwtZGlhbG9nJyArIChzaXplID8gJyBtb2RhbC0nICsgc2l6ZSA6ICcnKSArIChjZW50ZXJlZCA/ICcgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJyA6ICcnKSArXG4gICAgIChzY3JvbGxhYmxlID8gJyBtb2RhbC1kaWFsb2ctc2Nyb2xsYWJsZScgOiAnJylcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWwuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsV2luZG93IGltcGxlbWVudHMgT25Jbml0LFxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9lbFdpdGhGb2N1czogRWxlbWVudCB8IG51bGwgPSBudWxsOyAgLy8gZWxlbWVudCB0aGF0IGlzIGZvY3VzZWQgcHJpb3IgdG8gbW9kYWwgb3BlbmluZ1xuXG4gIEBWaWV3Q2hpbGQoJ2RpYWxvZycsIHtzdGF0aWM6IHRydWV9KSBwcml2YXRlIF9kaWFsb2dFbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcbiAgQElucHV0KCkgYXJpYURlc2NyaWJlZEJ5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhY2tkcm9wOiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcbiAgQElucHV0KCkgY2VudGVyZWQ6IHN0cmluZztcbiAgQElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xuICBASW5wdXQoKSBzY3JvbGxhYmxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgd2luZG93Q2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCdkaXNtaXNzJykgZGlzbWlzc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgZGlzbWlzcyhyZWFzb24pOiB2b2lkIHsgdGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pOyB9XG5cbiAgbmdPbkluaXQoKSB7IHRoaXMuX2VsV2l0aEZvY3VzID0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudDsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCB7bmF0aXZlRWxlbWVudH0gPSB0aGlzLl9lbFJlZjtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblxuICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLFxuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LkVzY2FwZSAmJiB0aGlzLmtleWJvYXJkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkVTQykpO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgIC8vIFdlJ3JlIGxpc3RlbmluZyB0byAnbW91c2Vkb3duJyBhbmQgJ21vdXNldXAnIHRvIHByZXZlbnQgbW9kYWwgZnJvbSBjbG9zaW5nIHdoZW4gcHJlc3NpbmcgdGhlIG1vdXNlXG4gICAgICAvLyBpbnNpZGUgdGhlIG1vZGFsIGRpYWxvZyBhbmQgcmVsZWFzaW5nIGl0IG91dHNpZGVcbiAgICAgIGxldCBwcmV2ZW50Q2xvc2UgPSBmYWxzZTtcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kaWFsb2dFbC5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCB0YXAoKCkgPT4gcHJldmVudENsb3NlID0gZmFsc2UpLFxuICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdtb3VzZXVwJykucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIHRha2UoMSkpKSxcbiAgICAgICAgICAgICAgZmlsdGVyKCh7dGFyZ2V0fSkgPT4gbmF0aXZlRWxlbWVudCA9PT0gdGFyZ2V0KSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHsgcHJldmVudENsb3NlID0gdHJ1ZTsgfSk7XG5cbiAgICAgIC8vIFdlJ3JlIGxpc3RlbmluZyB0byAnY2xpY2snIHRvIGRpc21pc3MgbW9kYWwgb24gbW9kYWwgd2luZG93IGNsaWNrLCBleGNlcHQgd2hlbjpcbiAgICAgIC8vIDEuIGNsaWNraW5nIG9uIG1vZGFsIGRpYWxvZyBpdHNlbGZcbiAgICAgIC8vIDIuIGNsb3Npbmcgd2FzIHByZXZlbnRlZCBieSBtb3VzZWRvd24vdXAgaGFuZGxlcnNcbiAgICAgIC8vIDMuIGNsaWNraW5nIG9uIHNjcm9sbGJhciB3aGVuIHRoZSB2aWV3cG9ydCBpcyB0b28gc21hbGwgYW5kIG1vZGFsIGRvZXNuJ3QgZml0IChjbGljayBpcyBub3QgdHJpZ2dlcmVkIGF0IGFsbClcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50PihuYXRpdmVFbGVtZW50LCAnY2xpY2snKS5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSkuc3Vic2NyaWJlKCh7dGFyZ2V0fSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5iYWNrZHJvcCA9PT0gdHJ1ZSAmJiBuYXRpdmVFbGVtZW50ID09PSB0YXJnZXQgJiYgIXByZXZlbnRDbG9zZSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkJBQ0tEUk9QX0NMSUNLKSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmVudENsb3NlID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghbmF0aXZlRWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgY29uc3QgYXV0b0ZvY3VzYWJsZSA9IG5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgW25nYkF1dG9mb2N1c11gKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IGZpcnN0Rm9jdXNhYmxlID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhuYXRpdmVFbGVtZW50KVswXTtcblxuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPSBhdXRvRm9jdXNhYmxlIHx8IGZpcnN0Rm9jdXNhYmxlIHx8IG5hdGl2ZUVsZW1lbnQ7XG4gICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XG5cbiAgICBsZXQgZWxlbWVudFRvRm9jdXM7XG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGVsV2l0aEZvY3VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XG4gICAgfVxuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBlbGVtZW50VG9Gb2N1cy5mb2N1cygpKTtcbiAgICAgIHRoaXMuX2VsV2l0aEZvY3VzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICB9XG59XG4iXX0=