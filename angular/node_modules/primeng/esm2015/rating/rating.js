var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
let Rating = class Rating {
    constructor(cd) {
        this.cd = cd;
        this.stars = 5;
        this.cancel = true;
        this.iconOnClass = 'pi pi-star';
        this.iconOffClass = 'pi pi-star-o';
        this.iconCancelClass = 'pi pi-ban';
        this.onRate = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    rate(event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    }
    clear(event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }
    writeValue(value) {
        this.value = value;
        this.cd.detectChanges();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
};
Rating.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Rating.prototype, "disabled", void 0);
__decorate([
    Input()
], Rating.prototype, "readonly", void 0);
__decorate([
    Input()
], Rating.prototype, "stars", void 0);
__decorate([
    Input()
], Rating.prototype, "cancel", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOnClass", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOnStyle", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOffClass", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOffStyle", void 0);
__decorate([
    Input()
], Rating.prototype, "iconCancelClass", void 0);
__decorate([
    Input()
], Rating.prototype, "iconCancelStyle", void 0);
__decorate([
    Output()
], Rating.prototype, "onRate", void 0);
__decorate([
    Output()
], Rating.prototype, "onCancel", void 0);
Rating = __decorate([
    Component({
        selector: 'p-rating',
        template: `
        <div class="ui-rating" [ngClass]="{'ui-state-disabled': disabled}">
            <a [attr.tabindex]="disabled ? null : '0'" *ngIf="cancel" (click)="clear($event)" (keydown.enter)="clear($event)"  class="ui-rating-cancel">
                <span class="ui-rating-icon" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
            </a>
            <a [attr.tabindex]="disabled ? null : '0'" *ngFor="let star of starsArray;let i=index" (click)="rate($event,i)" (keydown.enter)="rate($event,i)">
                <span class="ui-rating-icon" 
                    [ngClass]="(!value || i >= value) ? iconOffClass : iconOnClass"
                    [ngStyle]="(!value || i >= value) ? iconOffStyle : iconOnStyle"
                ></span>
            </a>
        </div>
    `,
        providers: [RATING_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Rating);
export { Rating };
let RatingModule = class RatingModule {
};
RatingModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Rating],
        declarations: [Rating]
    })
], RatingModule);
export { RatingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9yYXRpbmcvIiwic291cmNlcyI6WyJyYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBb0JGLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07SUEwQmYsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFwQmhDLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixnQkFBVyxHQUFXLFlBQVksQ0FBQztRQUluQyxpQkFBWSxHQUFXLGNBQWMsQ0FBQztRQUl0QyxvQkFBZSxHQUFXLFdBQVcsQ0FBQztRQUlyQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTNELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBTlEsQ0FBQztJQVU3QyxRQUFRO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFD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QUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDakIsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ3pCLENBQUM7R0FDVyxZQUFZLENBQUk7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgUkFUSU5HX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYXRpbmcpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXJhdGluZycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLXJhdGluZ1wiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIj5cbiAgICAgICAgICAgIDxhIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6ICcwJ1wiICpuZ0lmPVwiY2FuY2VsXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjbGVhcigkZXZlbnQpXCIgIGNsYXNzPVwidWktcmF0aW5nLWNhbmNlbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcmF0aW5nLWljb25cIiBbbmdDbGFzc109XCJpY29uQ2FuY2VsQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uQ2FuY2VsU3R5bGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiAnMCdcIiAqbmdGb3I9XCJsZXQgc3RhciBvZiBzdGFyc0FycmF5O2xldCBpPWluZGV4XCIgKGNsaWNrKT1cInJhdGUoJGV2ZW50LGkpXCIgKGtleWRvd24uZW50ZXIpPVwicmF0ZSgkZXZlbnQsaSlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXJhdGluZy1pY29uXCIgXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIighdmFsdWUgfHwgaSA+PSB2YWx1ZSkgPyBpY29uT2ZmQ2xhc3MgOiBpY29uT25DbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIighdmFsdWUgfHwgaSA+PSB2YWx1ZSkgPyBpY29uT2ZmU3R5bGUgOiBpY29uT25TdHlsZVwiXG4gICAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtSQVRJTkdfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmcgaW1wbGVtZW50cyBPbkluaXQsQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0YXJzOiBudW1iZXIgPSA1O1xuXG4gICAgQElucHV0KCkgY2FuY2VsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGljb25PbkNsYXNzOiBzdHJpbmcgPSAncGkgcGktc3Rhcic7XG5cbiAgICBASW5wdXQoKSBpY29uT25TdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgaWNvbk9mZkNsYXNzOiBzdHJpbmcgPSAncGkgcGktc3Rhci1vJztcblxuICAgIEBJbnB1dCgpIGljb25PZmZTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgaWNvbkNhbmNlbENsYXNzOiBzdHJpbmcgPSAncGkgcGktYmFuJztcblxuICAgIEBJbnB1dCgpIGljb25DYW5jZWxTdHlsZTogYW55O1xuXG4gICAgQE91dHB1dCgpIG9uUmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9IFxuICAgIFxuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBwdWJsaWMgc3RhcnNBcnJheTogbnVtYmVyW107XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhcnNBcnJheSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFyczsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJzQXJyYXlbaV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJhdGUoZXZlbnQsIGk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkmJiF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gKGkgKyAxKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMub25SYXRlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiAoaSsxKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBjbGVhcihldmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkmJiF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMub25DYW5jZWwuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cbiAgICBcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUmF0aW5nXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtSYXRpbmddXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ01vZHVsZSB7IH0iXX0=