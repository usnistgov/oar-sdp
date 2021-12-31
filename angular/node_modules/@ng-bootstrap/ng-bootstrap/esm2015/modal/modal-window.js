import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { Key } from '../util/key';
import { ModalDismissReasons } from './modal-dismiss-reasons';
let NgbModalWindow = class NgbModalWindow {
    constructor(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to modal opening
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    dismiss(reason) { this.dismissEvent.emit(reason); }
    ngOnInit() { this._elWithFocus = this._document.activeElement; }
    ngAfterViewInit() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular(() => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), 
            // tslint:disable-next-line:deprecation
            filter(e => e.which === Key.Escape && this.keyboard))
                .subscribe(event => requestAnimationFrame(() => {
                if (!event.defaultPrevented) {
                    this._zone.run(() => this.dismiss(ModalDismissReasons.ESC));
                }
            }));
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap(() => preventClose = false), switchMap(() => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1))), filter(({ target }) => nativeElement === target))
                .subscribe(() => { preventClose = true; });
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(this._closed$)).subscribe(({ target }) => {
                if (this.backdrop === true && nativeElement === target && !preventClose) {
                    this._zone.run(() => this.dismiss(ModalDismissReasons.BACKDROP_CLICK));
                }
                preventClose = false;
            });
        });
        if (!nativeElement.contains(document.activeElement)) {
            const autoFocusable = nativeElement.querySelector(`[ngbAutofocus]`);
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    ngOnDestroy() {
        const body = this._document.body;
        const elWithFocus = this._elWithFocus;
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular(() => {
            setTimeout(() => elementToFocus.focus());
            this._elWithFocus = null;
        });
        this._closed$.next();
    }
};
NgbModalWindow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: NgZone }
];
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
        template: `
    <div #dialog [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +
     (scrollable ? ' modal-dialog-scrollable' : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `,
        encapsulation: ViewEncapsulation.None,
        styles: ["ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}"]
    }),
    __param(0, Inject(DOCUMENT))
], NgbModalWindow);
export { NgbModalWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBcUI1RCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBa0J6QixZQUM4QixTQUFjLEVBQVUsTUFBK0IsRUFBVSxLQUFhO1FBQTlFLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFqQnBHLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGlCQUFZLEdBQW1CLElBQUksQ0FBQyxDQUFFLGlEQUFpRDtRQU10RixhQUFRLEdBQXFCLElBQUksQ0FBQztRQUVsQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBS04saUJBQVksR0FB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QUFDaEI7SUFBUixLQUFLLEVBQUU7a0RBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzRDQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7bURBQXFCO0FBRVY7SUFBbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztvREFBbUM7QUFoQjFDLGNBQWM7SUFuQjFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLG9FQUFvRTtZQUMvRSxNQUFNLEVBQUUsUUFBUTtZQUNoQixVQUFVLEVBQUUsSUFBSTtZQUNoQixtQkFBbUIsRUFBRSxNQUFNO1lBQzNCLHdCQUF3QixFQUFFLGdCQUFnQjtZQUMxQyx5QkFBeUIsRUFBRSxpQkFBaUI7U0FDN0M7UUFDRCxRQUFRLEVBQUU7Ozs7O0tBS1A7UUFDSCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FFdEMsQ0FBQztJQW9CSyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQW5CVixjQUFjLENBd0YxQjtTQXhGWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge2dldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHN9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1tb2RhbC13aW5kb3cnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnXCJtb2RhbCBmYWRlIHNob3cgZC1ibG9ja1wiICsgKHdpbmRvd0NsYXNzID8gXCIgXCIgKyB3aW5kb3dDbGFzcyA6IFwiXCIpJyxcbiAgICAncm9sZSc6ICdkaWFsb2cnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ1thdHRyLmFyaWEtbW9kYWxdJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5JyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnYXJpYURlc2NyaWJlZEJ5JyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNkaWFsb2cgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKHNpemUgPyAnIG1vZGFsLScgKyBzaXplIDogJycpICsgKGNlbnRlcmVkID8gJyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnIDogJycpICtcbiAgICAgKHNjcm9sbGFibGUgPyAnIG1vZGFsLWRpYWxvZy1zY3JvbGxhYmxlJyA6ICcnKVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9tb2RhbC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxXaW5kb3cgaW1wbGVtZW50cyBPbkluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VsV2l0aEZvY3VzOiBFbGVtZW50IHwgbnVsbCA9IG51bGw7ICAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXG5cbiAgQFZpZXdDaGlsZCgnZGlhbG9nJywge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgX2RpYWxvZ0VsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuICBASW5wdXQoKSBhcmlhRGVzY3JpYmVkQnk6IHN0cmluZztcbiAgQElucHV0KCkgYmFja2Ryb3A6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xuICBASW5wdXQoKSBjZW50ZXJlZDogc3RyaW5nO1xuICBASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XG4gIEBJbnB1dCgpIHNjcm9sbGFibGU6IHN0cmluZztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoKSB3aW5kb3dDbGFzczogc3RyaW5nO1xuXG4gIEBPdXRwdXQoJ2Rpc21pc3MnKSBkaXNtaXNzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuICBkaXNtaXNzKHJlYXNvbik6IHZvaWQgeyB0aGlzLmRpc21pc3NFdmVudC5lbWl0KHJlYXNvbik7IH1cblxuICBuZ09uSW5pdCgpIHsgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50OyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IHtuYXRpdmVFbGVtZW50fSA9IHRoaXMuX2VsUmVmO1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXG4gICAgICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4obmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksXG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlICYmIHRoaXMua2V5Ym9hcmQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuRVNDKSk7XG4gICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgLy8gV2UncmUgbGlzdGVuaW5nIHRvICdtb3VzZWRvd24nIGFuZCAnbW91c2V1cCcgdG8gcHJldmVudCBtb2RhbCBmcm9tIGNsb3Npbmcgd2hlbiBwcmVzc2luZyB0aGUgbW91c2VcbiAgICAgIC8vIGluc2lkZSB0aGUgbW9kYWwgZGlhbG9nIGFuZCByZWxlYXNpbmcgaXQgb3V0c2lkZVxuICAgICAgbGV0IHByZXZlbnRDbG9zZSA9IGZhbHNlO1xuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RpYWxvZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIHRhcCgoKSA9PiBwcmV2ZW50Q2xvc2UgPSBmYWxzZSksXG4gICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TW91c2VFdmVudD4obmF0aXZlRWxlbWVudCwgJ21vdXNldXAnKS5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgdGFrZSgxKSkpLFxuICAgICAgICAgICAgICBmaWx0ZXIoKHt0YXJnZXR9KSA9PiBuYXRpdmVFbGVtZW50ID09PSB0YXJnZXQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4geyBwcmV2ZW50Q2xvc2UgPSB0cnVlOyB9KTtcblxuICAgICAgLy8gV2UncmUgbGlzdGVuaW5nIHRvICdjbGljaycgdG8gZGlzbWlzcyBtb2RhbCBvbiBtb2RhbCB3aW5kb3cgY2xpY2ssIGV4Y2VwdCB3aGVuOlxuICAgICAgLy8gMS4gY2xpY2tpbmcgb24gbW9kYWwgZGlhbG9nIGl0c2VsZlxuICAgICAgLy8gMi4gY2xvc2luZyB3YXMgcHJldmVudGVkIGJ5IG1vdXNlZG93bi91cCBoYW5kbGVyc1xuICAgICAgLy8gMy4gY2xpY2tpbmcgb24gc2Nyb2xsYmFyIHdoZW4gdGhlIHZpZXdwb3J0IGlzIHRvbyBzbWFsbCBhbmQgbW9kYWwgZG9lc24ndCBmaXQgKGNsaWNrIGlzIG5vdCB0cmlnZ2VyZWQgYXQgYWxsKVxuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdjbGljaycpLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpKS5zdWJzY3JpYmUoKHt0YXJnZXR9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tkcm9wID09PSB0cnVlICYmIG5hdGl2ZUVsZW1lbnQgPT09IHRhcmdldCAmJiAhcHJldmVudENsb3NlKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuQkFDS0RST1BfQ0xJQ0spKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2ZW50Q2xvc2UgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKCFuYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBhdXRvRm9jdXNhYmxlID0gbmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbbmdiQXV0b2ZvY3VzXWApIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3QgZmlyc3RGb2N1c2FibGUgPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKG5hdGl2ZUVsZW1lbnQpWzBdO1xuXG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9IGF1dG9Gb2N1c2FibGUgfHwgZmlyc3RGb2N1c2FibGUgfHwgbmF0aXZlRWxlbWVudDtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZWxXaXRoRm9jdXMgPSB0aGlzLl9lbFdpdGhGb2N1cztcblxuICAgIGxldCBlbGVtZW50VG9Gb2N1cztcbiAgICBpZiAoZWxXaXRoRm9jdXMgJiYgZWxXaXRoRm9jdXNbJ2ZvY3VzJ10gJiYgYm9keS5jb250YWlucyhlbFdpdGhGb2N1cykpIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gYm9keTtcbiAgICB9XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCkpO1xuICAgICAgdGhpcy5fZWxXaXRoRm9jdXMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==