import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
    NgbAlert.prototype.closeHandler = function () { this.close.emit(); };
    NgbAlert.prototype.ngOnChanges = function (changes) {
        var typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, "alert-" + typeChange.previousValue);
            this._renderer.addClass(this._element.nativeElement, "alert-" + typeChange.currentValue);
        }
    };
    NgbAlert.prototype.ngOnInit = function () { this._renderer.addClass(this._element.nativeElement, "alert-" + this.type); };
    NgbAlert.ctorParameters = function () { return [
        { type: NgbAlertConfig },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], NgbAlert.prototype, "dismissible", void 0);
    __decorate([
        Input()
    ], NgbAlert.prototype, "type", void 0);
    __decorate([
        Output()
    ], NgbAlert.prototype, "close", void 0);
    NgbAlert = __decorate([
        Component({
            selector: 'ngb-alert',
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: { 'role': 'alert', 'class': 'alert', '[class.alert-dismissible]': 'dismissible' },
            template: "\n    <ng-content></ng-content>\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.alert.close\"\n      (click)=\"closeHandler()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    ",
            styles: ["ngb-alert{display:block}"]
        })
    ], NgbAlert);
    return NgbAlert;
}());
export { NgbAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImFsZXJ0L2FsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7Ozs7R0FJRztBQWVIO0lBcUJFLGtCQUFZLE1BQXNCLEVBQVUsU0FBb0IsRUFBVSxRQUFvQjtRQUFsRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUw5Rjs7V0FFRztRQUNPLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBR3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFZLEdBQVosY0FBaUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckMsOEJBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBUyxVQUFVLENBQUMsYUFBZSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBUyxVQUFVLENBQUMsWUFBYyxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDO0lBRUQsMkJBQVEsR0FBUixjQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVMsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBZnRFLGNBQWM7Z0JBQXFCLFNBQVM7Z0JBQW9CLFVBQVU7O0lBYnJGO1FBQVIsS0FBSyxFQUFFO2lEQUFzQjtJQU9yQjtRQUFSLEtBQUssRUFBRTswQ0FBYztJQUlaO1FBQVQsTUFBTSxFQUFFOzJDQUFrQztJQW5CaEMsUUFBUTtRQWRwQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFDO1lBQ3JGLFFBQVEsRUFBRSx3UUFNUDs7U0FFSixDQUFDO09BQ1csUUFBUSxDQXFDcEI7SUFBRCxlQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FyQ1ksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcblxuLyoqXG4gKiBBbGVydCBpcyBhIGNvbXBvbmVudCB0byBwcm92aWRlIGNvbnRleHR1YWwgZmVlZGJhY2sgbWVzc2FnZXMgZm9yIHVzZXIuXG4gKlxuICogSXQgc3VwcG9ydHMgc2V2ZXJhbCBhbGVydCB0eXBlcyBhbmQgY2FuIGJlIGRpc21pc3NlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWFsZXJ0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsncm9sZSc6ICdhbGVydCcsICdjbGFzcyc6ICdhbGVydCcsICdbY2xhc3MuYWxlcnQtZGlzbWlzc2libGVdJzogJ2Rpc21pc3NpYmxlJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxidXR0b24gKm5nSWY9XCJkaXNtaXNzaWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuYWxlcnQuY2xvc2VcIlxuICAgICAgKGNsaWNrKT1cImNsb3NlSGFuZGxlcigpXCI+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIHN0eWxlVXJsczogWycuL2FsZXJ0LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydCBpbXBsZW1lbnRzIE9uSW5pdCxcbiAgICBPbkNoYW5nZXMge1xuICAvKipcbiAgICogSWYgYHRydWVgLCBhbGVydCBjYW4gYmUgZGlzbWlzc2VkIGJ5IHRoZSB1c2VyLlxuICAgKlxuICAgKiBUaGUgY2xvc2UgYnV0dG9uICjDlykgd2lsbCBiZSBkaXNwbGF5ZWQgYW5kIHlvdSBjYW4gYmUgbm90aWZpZWRcbiAgICogb2YgdGhlIGV2ZW50IHdpdGggdGhlIGAoY2xvc2UpYCBvdXRwdXQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNtaXNzaWJsZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIGFsZXJ0LlxuICAgKlxuICAgKiBCb290c3RyYXAgcHJvdmlkZXMgc3R5bGVzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOiBgJ3N1Y2Nlc3MnYCwgYCdpbmZvJ2AsIGAnd2FybmluZydgLCBgJ2RhbmdlcidgLCBgJ3ByaW1hcnknYCxcbiAgICogYCdzZWNvbmRhcnknYCwgYCdsaWdodCdgIGFuZCBgJ2RhcmsnYC5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQuIEl0IGhhcyBubyBwYXlsb2FkIGFuZCBvbmx5IHJlbGV2YW50IGZvciBkaXNtaXNzaWJsZSBhbGVydHMuXG4gICAqL1xuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBbGVydENvbmZpZywgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gIH1cblxuICBjbG9zZUhhbmRsZXIoKSB7IHRoaXMuY2xvc2UuZW1pdCgpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHR5cGVDaGFuZ2UgPSBjaGFuZ2VzWyd0eXBlJ107XG4gICAgaWYgKHR5cGVDaGFuZ2UgJiYgIXR5cGVDaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dHlwZUNoYW5nZS5wcmV2aW91c1ZhbHVlfWApO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLmN1cnJlbnRWYWx1ZX1gKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHsgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0aGlzLnR5cGV9YCk7IH1cbn1cbiJdfQ==