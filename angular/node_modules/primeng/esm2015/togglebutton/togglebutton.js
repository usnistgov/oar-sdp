var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};
let ToggleButton = class ToggleButton {
    constructor() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.iconPos = 'left';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focus = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterViewInit() {
        if (this.checkboxViewChild) {
            this.checkbox = this.checkboxViewChild.nativeElement;
        }
    }
    toggle(event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            if (this.checkbox) {
                this.checkbox.focus();
            }
        }
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
        this.onModelTouched();
    }
    writeValue(value) {
        this.checked = value;
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
    get hasOnLabel() {
        return this.onLabel && this.onLabel.length > 0;
    }
    get hasOffLabel() {
        return this.onLabel && this.onLabel.length > 0;
    }
};
__decorate([
    Input()
], ToggleButton.prototype, "onLabel", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "offLabel", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "onIcon", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "offIcon", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "disabled", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "style", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "styleClass", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "inputId", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "tabindex", void 0);
__decorate([
    Input()
], ToggleButton.prototype, "iconPos", void 0);
__decorate([
    Output()
], ToggleButton.prototype, "onChange", void 0);
__decorate([
    ViewChild('checkbox')
], ToggleButton.prototype, "checkboxViewChild", void 0);
ToggleButton = __decorate([
    Component({
        selector: 'p-toggleButton',
        template: `
        <div [ngClass]="{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon && !offIcon), 
                'ui-button-text-icon-left': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'left'), 
                'ui-button-text-icon-right': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'right'),'ui-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),
                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass" 
                (click)="toggle($event)" (keydown.enter)="toggle($event)">
            <div class="ui-helper-hidden-accessible">
                <input #checkbox type="checkbox" [attr.id]="inputId" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [attr.tabindex]="tabindex"
                    role="button" [attr.aria-pressed]="checked" [attr.aria-labelledby]="ariaLabelledBy" [disabled]="disabled">
            </div>
            <span *ngIf="onIcon||offIcon" class="ui-button-icon-left" [class]="checked ? this.onIcon : this.offIcon" [ngClass]="{'ui-button-icon-left': (iconPos === 'left'), 
            'ui-button-icon-right': (iconPos === 'right')}"></span>
            <span class="ui-button-text ui-unselectable-text">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>
        </div>
    `,
        providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], ToggleButton);
export { ToggleButton };
let ToggleButtonModule = class ToggleButtonModule {
};
ToggleButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ToggleButton],
        declarations: [ToggleButton]
    })
], ToggleButtonModule);
export { ToggleButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy90b2dnbGVidXR0b24vIiwic291cmNlcyI6WyJ0b2dnbGVidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFlLFNBQVMsRUFBWSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBc0JGLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFBekI7UUFFYSxZQUFPLEdBQVcsS0FBSyxDQUFDO1FBRXhCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFrQnhCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFFeEIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTNELFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUV2QixrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQXVEeEMsQ0FBQztJQXJERyxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBc0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFF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Z01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLEFmdGVyVmlld0luaXQsVmlld0NoaWxkLEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFQlVUVE9OX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUb2dnbGVCdXR0b24pLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRvZ2dsZUJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWJ1dHRvbiB1aS10b2dnbGVidXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6IHRydWUsICd1aS1idXR0b24tdGV4dC1vbmx5JzogKCFvbkljb24gJiYgIW9mZkljb24pLCBcbiAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0JzogKG9uSWNvbiAmJiBvZmZJY29uICYmIGhhc09uTGFiZWwgJiYgaGFzT2ZmTGFiZWwgJiYgaWNvblBvcyA9PT0gJ2xlZnQnKSwgXG4gICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnOiAob25JY29uICYmIG9mZkljb24gJiYgaGFzT25MYWJlbCAmJiBoYXNPZmZMYWJlbCAmJiBpY29uUG9zID09PSAncmlnaHQnKSwndWktYnV0dG9uLWljb24tb25seSc6IChvbkljb24gJiYgb2ZmSWNvbiAmJiAhaGFzT25MYWJlbCAmJiAhaGFzT2ZmTGFiZWwpLFxuICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1hY3RpdmUnOiBjaGVja2VkLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXMsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1wcmVzc2VkXT1cImNoZWNrZWRcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJvbkljb258fG9mZkljb25cIiBjbGFzcz1cInVpLWJ1dHRvbi1pY29uLWxlZnRcIiBbY2xhc3NdPVwiY2hlY2tlZCA/IHRoaXMub25JY29uIDogdGhpcy5vZmZJY29uXCIgW25nQ2xhc3NdPVwieyd1aS1idXR0b24taWNvbi1sZWZ0JzogKGljb25Qb3MgPT09ICdsZWZ0JyksIFxuICAgICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLXJpZ2h0JzogKGljb25Qb3MgPT09ICdyaWdodCcpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLXRleHQgdWktdW5zZWxlY3RhYmxlLXRleHRcIj57e2NoZWNrZWQgPyBoYXNPbkxhYmVsID8gb25MYWJlbCA6ICd1aS1idG4nIDogaGFzT2ZmTGFiZWwgPyBvZmZMYWJlbCA6ICd1aS1idG4nfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVE9HR0xFQlVUVE9OX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlQnV0dG9uIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBvbkxhYmVsOiBzdHJpbmcgPSAnWWVzJztcblxuICAgIEBJbnB1dCgpIG9mZkxhYmVsOiBzdHJpbmcgPSAnTm8nO1xuXG4gICAgQElucHV0KCkgb25JY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvZmZJY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGljb25Qb3M6IHN0cmluZyA9ICdsZWZ0JztcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQFZpZXdDaGlsZCgnY2hlY2tib3gnKSBjaGVja2JveFZpZXdDaGlsZDogRWxlbWVudFJlZjtcbiAgICBcbiAgICBjaGVja2JveDogSFRNTElucHV0RWxlbWVudDtcbiAgICBcbiAgICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBmb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gICAgXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2JveFZpZXdDaGlsZCl7XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94ID0gPEhUTUxJbnB1dEVsZW1lbnQ+IHRoaXMuY2hlY2tib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLmNoZWNrZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrYm94LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG4gICAgXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGhhc09uTGFiZWwoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25MYWJlbCAmJiB0aGlzLm9uTGFiZWwubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGhhc09mZkxhYmVsKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uTGFiZWwgJiYgdGhpcy5vbkxhYmVsLmxlbmd0aCA+IDA7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUb2dnbGVCdXR0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW1RvZ2dsZUJ1dHRvbl1cbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlQnV0dG9uTW9kdWxlIHsgfVxuIl19