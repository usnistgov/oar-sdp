import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgbAlertConfig } from './alert-config';
/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
let NgbAlert = class NgbAlert {
    constructor(config, _renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         */
        this.close = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
    }
    closeHandler() { this.close.emit(); }
    ngOnChanges(changes) {
        const typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, `alert-${typeChange.previousValue}`);
            this._renderer.addClass(this._element.nativeElement, `alert-${typeChange.currentValue}`);
        }
    }
    ngOnInit() { this._renderer.addClass(this._element.nativeElement, `alert-${this.type}`); }
};
NgbAlert.ctorParameters = () => [
    { type: NgbAlertConfig },
    { type: Renderer2 },
    { type: ElementRef }
];
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
        template: `
    <ng-content></ng-content>
    <button *ngIf="dismissible" type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="closeHandler()">
      <span aria-hidden="true">&times;</span>
    </button>
    `,
        styles: ["ngb-alert{display:block}"]
    })
], NgbAlert);
export { NgbAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImFsZXJ0L2FsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7Ozs7R0FJRztBQWVILElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFxQm5CLFlBQVksTUFBc0IsRUFBVSxTQUFvQixFQUFVLFFBQW9CO1FBQWxELGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBTDlGOztXQUVHO1FBQ08sVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFHekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXJDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUMxRjtJQUNILENBQUM7SUFFRCxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDM0YsQ0FBQTs7WUFoQnFCLGNBQWM7WUFBcUIsU0FBUztZQUFvQixVQUFVOztBQWJyRjtJQUFSLEtBQUssRUFBRTs2Q0FBc0I7QUFPckI7SUFBUixLQUFLLEVBQUU7c0NBQWM7QUFJWjtJQUFULE1BQU0sRUFBRTt1Q0FBa0M7QUFuQmhDLFFBQVE7SUFkcEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLGFBQWEsRUFBQztRQUNyRixRQUFRLEVBQUU7Ozs7OztLQU1QOztLQUVKLENBQUM7R0FDVyxRQUFRLENBcUNwQjtTQXJDWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnLi9hbGVydC1jb25maWcnO1xuXG4vKipcbiAqIEFsZXJ0IGlzIGEgY29tcG9uZW50IHRvIHByb3ZpZGUgY29udGV4dHVhbCBmZWVkYmFjayBtZXNzYWdlcyBmb3IgdXNlci5cbiAqXG4gKiBJdCBzdXBwb3J0cyBzZXZlcmFsIGFsZXJ0IHR5cGVzIGFuZCBjYW4gYmUgZGlzbWlzc2VkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItYWxlcnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDogeydyb2xlJzogJ2FsZXJ0JywgJ2NsYXNzJzogJ2FsZXJ0JywgJ1tjbGFzcy5hbGVydC1kaXNtaXNzaWJsZV0nOiAnZGlzbWlzc2libGUnfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImRpc21pc3NpYmxlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5hbGVydC5jbG9zZVwiXG4gICAgICAoY2xpY2spPVwiY2xvc2VIYW5kbGVyKClcIj5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vYWxlcnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0IGltcGxlbWVudHMgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGFsZXJ0IGNhbiBiZSBkaXNtaXNzZWQgYnkgdGhlIHVzZXIuXG4gICAqXG4gICAqIFRoZSBjbG9zZSBidXR0b24gKMOXKSB3aWxsIGJlIGRpc3BsYXllZCBhbmQgeW91IGNhbiBiZSBub3RpZmllZFxuICAgKiBvZiB0aGUgZXZlbnQgd2l0aCB0aGUgYChjbG9zZSlgIG91dHB1dC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc21pc3NpYmxlOiBib29sZWFuO1xuICAvKipcbiAgICogVHlwZSBvZiB0aGUgYWxlcnQuXG4gICAqXG4gICAqIEJvb3RzdHJhcCBwcm92aWRlcyBzdHlsZXMgZm9yIHRoZSBmb2xsb3dpbmcgdHlwZXM6IGAnc3VjY2VzcydgLCBgJ2luZm8nYCwgYCd3YXJuaW5nJ2AsIGAnZGFuZ2VyJ2AsIGAncHJpbWFyeSdgLFxuICAgKiBgJ3NlY29uZGFyeSdgLCBgJ2xpZ2h0J2AgYW5kIGAnZGFyaydgLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjbG9zZSBidXR0b24gaXMgY2xpY2tlZC4gSXQgaGFzIG5vIHBheWxvYWQgYW5kIG9ubHkgcmVsZXZhbnQgZm9yIGRpc21pc3NpYmxlIGFsZXJ0cy5cbiAgICovXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkFsZXJ0Q29uZmlnLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5kaXNtaXNzaWJsZSA9IGNvbmZpZy5kaXNtaXNzaWJsZTtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgfVxuXG4gIGNsb3NlSGFuZGxlcigpIHsgdGhpcy5jbG9zZS5lbWl0KCk7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgdHlwZUNoYW5nZSA9IGNoYW5nZXNbJ3R5cGUnXTtcbiAgICBpZiAodHlwZUNoYW5nZSAmJiAhdHlwZUNoYW5nZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLnByZXZpb3VzVmFsdWV9YCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3R5cGVDaGFuZ2UuY3VycmVudFZhbHVlfWApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3RoaXMudHlwZX1gKTsgfVxufVxuIl19