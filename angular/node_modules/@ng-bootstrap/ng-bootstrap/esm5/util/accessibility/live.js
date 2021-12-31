import { __decorate, __param } from "tslib";
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
export function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
function getLiveElement(document, lazyCreate) {
    if (lazyCreate === void 0) { lazyCreate = false; }
    var element = document.body.querySelector('#ngb-live');
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
var Live = /** @class */ (function () {
    function Live(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    Live.prototype.ngOnDestroy = function () {
        var element = getLiveElement(this._document);
        if (element) {
            // if exists, it will always be attached to the <body>
            element.parentElement.removeChild(element);
        }
    };
    Live.prototype.say = function (message) {
        var element = getLiveElement(this._document, true);
        var delay = this._delay;
        if (element != null) {
            element.textContent = '';
            var setText = function () { return element.textContent = message; };
            if (delay === null) {
                setText();
            }
            else {
                setTimeout(setText, delay);
            }
        }
    };
    Live.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
    ]; };
    Live.ɵprov = i0.ɵɵdefineInjectable({ factory: function Live_Factory() { return new Live(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });
    Live = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Inject(DOCUMENT)), __param(1, Inject(ARIA_LIVE_DELAY))
    ], Live);
    return Live;
}());
export { Live };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQU96QyxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQzdDLHNCQUFzQixFQUFFLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDO0FBQ3BGLE1BQU0sVUFBVSx1QkFBdUI7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBR0QsU0FBUyxjQUFjLENBQUMsUUFBYSxFQUFFLFVBQWtCO0lBQWxCLDJCQUFBLEVBQUEsa0JBQWtCO0lBQ3ZELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQztJQUV0RSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1FBQ2pDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUtEO0lBQ0UsY0FBc0MsU0FBYyxFQUFtQyxNQUFXO1FBQTVELGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBbUMsV0FBTSxHQUFOLE1BQU0sQ0FBSztJQUFHLENBQUM7SUFFdEcsMEJBQVcsR0FBWDtRQUNFLElBQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxPQUFPLEVBQUU7WUFDWCxzREFBc0Q7WUFDdEQsT0FBTyxDQUFDLGFBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQsa0JBQUcsR0FBSCxVQUFJLE9BQWU7UUFDakIsSUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUxQixJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDbkIsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDekIsSUFBTSxPQUFPLEdBQUcsY0FBTSxPQUFBLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxFQUE3QixDQUE2QixDQUFDO1lBQ3BELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDbEIsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDOztnREF2QlksTUFBTSxTQUFDLFFBQVE7Z0RBQTJCLE1BQU0sU0FBQyxlQUFlOzs7SUFEbEUsSUFBSTtRQURoQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFFbEIsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUEsRUFBMEIsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7T0FEbkUsSUFBSSxDQXlCaEI7ZUE3REQ7Q0E2REMsQUF6QkQsSUF5QkM7U0F6QlksSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuXG4vLyB1c2VmdWxuZXNzIChhbmQgZGVmYXVsdCB2YWx1ZSkgb2YgZGVsYXkgZG9jdW1lbnRlZCBpbiBNYXRlcmlhbCdzIENES1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvNjQwNWRhOWI4ZTg1MzJhN2U1Yzg1NGM5MjBlZTE4MTVjMjc1ZDczNC9zcmMvY2RrL2ExMXkvbGl2ZS1hbm5vdW5jZXIvbGl2ZS1hbm5vdW5jZXIudHMjTDUwXG5leHBvcnQgdHlwZSBBUklBX0xJVkVfREVMQVlfVFlQRSA9IG51bWJlciB8IG51bGw7XG5leHBvcnQgY29uc3QgQVJJQV9MSVZFX0RFTEFZID0gbmV3IEluamVjdGlvblRva2VuPEFSSUFfTElWRV9ERUxBWV9UWVBFPihcbiAgICAnbGl2ZSBhbm5vdW5jZXIgZGVsYXknLCB7cHJvdmlkZWRJbjogJ3Jvb3QnLCBmYWN0b3J5OiBBUklBX0xJVkVfREVMQVlfRkFDVE9SWX0pO1xuZXhwb3J0IGZ1bmN0aW9uIEFSSUFfTElWRV9ERUxBWV9GQUNUT1JZKCk6IG51bWJlciB7XG4gIHJldHVybiAxMDA7XG59XG5cblxuZnVuY3Rpb24gZ2V0TGl2ZUVsZW1lbnQoZG9jdW1lbnQ6IGFueSwgbGF6eUNyZWF0ZSA9IGZhbHNlKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNuZ2ItbGl2ZScpIGFzIEhUTUxFbGVtZW50O1xuXG4gIGlmIChlbGVtZW50ID09IG51bGwgJiYgbGF6eUNyZWF0ZSkge1xuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICduZ2ItbGl2ZScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXRvbWljJywgJ3RydWUnKTtcblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3Itb25seScpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIEBJbmplY3QoQVJJQV9MSVZFX0RFTEFZKSBwcml2YXRlIF9kZWxheTogYW55KSB7fVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCk7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIC8vIGlmIGV4aXN0cywgaXQgd2lsbCBhbHdheXMgYmUgYXR0YWNoZWQgdG8gdGhlIDxib2R5PlxuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50ICEucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgc2F5KG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCwgdHJ1ZSk7XG4gICAgY29uc3QgZGVsYXkgPSB0aGlzLl9kZWxheTtcblxuICAgIGlmIChlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIGNvbnN0IHNldFRleHQgPSAoKSA9PiBlbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xuICAgICAgICBzZXRUZXh0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KHNldFRleHQsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==