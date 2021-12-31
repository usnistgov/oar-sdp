var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
let Checkbox = class Checkbox {
    constructor(cd) {
        this.cd = cd;
        this.checkboxIcon = 'pi pi-check';
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.focused = false;
        this.checked = false;
    }
    onClick(event, checkbox, focus) {
        event.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        this.checked = !this.checked;
        this.updateModel(event);
        if (focus) {
            checkbox.focus();
        }
    }
    updateModel(event) {
        if (!this.binary) {
            if (this.checked)
                this.addValue();
            else
                this.removeValue();
            this.onModelChange(this.model);
            if (this.formControl) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.onModelChange(this.checked);
        }
        this.onChange.emit({ checked: this.checked, originalEvent: event });
    }
    handleChange(event) {
        if (!this.readonly) {
            this.checked = event.target.checked;
            this.updateModel(event);
        }
    }
    isChecked() {
        if (this.binary)
            return this.model;
        else
            return this.model && this.model.indexOf(this.value) > -1;
    }
    removeValue() {
        this.model = this.model.filter(val => val !== this.value);
    }
    addValue() {
        if (this.model)
            this.model = [...this.model, this.value];
        else
            this.model = [this.value];
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    writeValue(model) {
        this.model = model;
        this.checked = this.isChecked();
        this.cd.markForCheck();
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
Checkbox.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Checkbox.prototype, "value", void 0);
__decorate([
    Input()
], Checkbox.prototype, "name", void 0);
__decorate([
    Input()
], Checkbox.prototype, "disabled", void 0);
__decorate([
    Input()
], Checkbox.prototype, "binary", void 0);
__decorate([
    Input()
], Checkbox.prototype, "label", void 0);
__decorate([
    Input()
], Checkbox.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Checkbox.prototype, "tabindex", void 0);
__decorate([
    Input()
], Checkbox.prototype, "inputId", void 0);
__decorate([
    Input()
], Checkbox.prototype, "style", void 0);
__decorate([
    Input()
], Checkbox.prototype, "styleClass", void 0);
__decorate([
    Input()
], Checkbox.prototype, "labelStyleClass", void 0);
__decorate([
    Input()
], Checkbox.prototype, "formControl", void 0);
__decorate([
    Input()
], Checkbox.prototype, "checkboxIcon", void 0);
__decorate([
    Input()
], Checkbox.prototype, "readonly", void 0);
__decorate([
    Input()
], Checkbox.prototype, "required", void 0);
__decorate([
    ViewChild('cb')
], Checkbox.prototype, "inputViewChild", void 0);
__decorate([
    Output()
], Checkbox.prototype, "onChange", void 0);
Checkbox = __decorate([
    Component({
        selector: 'p-checkbox',
        template: `
        <div [ngStyle]="style" [ngClass]="{'ui-chkbox ui-widget': true,'ui-chkbox-readonly': readonly}" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [readonly]="readonly" [value]="value" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [ngClass]="{'ui-state-focus':focused}" (change)="handleChange($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy" [attr.required]="required">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick($event,cb,true)"
                        [ngClass]="{'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}" role="checkbox" [attr.aria-checked]="checked">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="checked ? checkboxIcon : null"></span>
            </div>
        </div>
        <label (click)="onClick($event,cb,true)" [class]="labelStyleClass"
                [ngClass]="{'ui-chkbox-label': true, 'ui-label-active':checked, 'ui-label-disabled':disabled, 'ui-label-focus':focused}"
                *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
        providers: [CHECKBOX_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Checkbox);
export { Checkbox };
let CheckboxModule = class CheckboxModule {
};
CheckboxModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Checkbox],
        declarations: [Checkbox]
    })
], CheckboxModule);
export { CheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoZWNrYm94LyIsInNvdXJjZXMiOlsiY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckosT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxpQkFBaUIsRUFBb0MsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBUTtJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXNCRixJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBOENqQixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXBCaEMsaUJBQVksR0FBVyxhQUFhLENBQUM7UUFRcEMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTNELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXBDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUVtQixDQUFDO0lBRTdDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQWE7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxLQUFLLEVBQUU7WUFDUCxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztnQkFFaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRXZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLE1BQU07WUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7O1lBRWxCLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFFekMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEdBQVk7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztDQUNKLENBQUE7O1lBNUYyQixpQkFBaUI7O0FBNUNoQztJQUFSLEtBQUssRUFBRTt1Q0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO3NDQUFjO0FBRWI7SUFBUixLQUFLLEVBQUU7MENBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO3dDQUFpQjtBQUVoQjtJQUFSLEtBQUssRUFBRTt1Q0FBZTtBQUVkO0lBQVIsS0FBSyxFQUFFO2dEQUF3QjtBQUV2QjtJQUFSLEtBQUssRUFBRTswQ0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7eUNBQWlCO0FBRWhCO0lBQVIsS0FBSyxFQUFFO3VDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7NENBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFO2lEQUF5QjtBQUV4QjtJQUFSLEtBQUssRUFBRTs2Q0FBMEI7QUFFekI7SUFBUixLQUFLLEVBQUU7OENBQXNDO0FBRXJDO0lBQVIsS0FBSyxFQUFFOzBDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTswQ0FBbUI7QUFFVjtJQUFoQixTQUFTLENBQUMsSUFBSSxDQUFDO2dEQUE0QjtBQUVsQztJQUFULE1BQU0sRUFBRTswQ0FBa0Q7QUFsQ2xELFFBQVE7SUFwQnBCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7S0FjVDtRQUNELFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ3BDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxRQUFRLENBMElwQjtTQTFJWSxRQUFRO0FBaUpyQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUksQ0FBQTtBQUFsQixjQUFjO0lBTDFCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDbkIsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQzNCLENBQUM7R0FDVyxjQUFjLENBQUk7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixDaGFuZ2VEZXRlY3RvclJlZixWaWV3Q2hpbGQsRWxlbWVudFJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInsndWktY2hrYm94IHVpLXdpZGdldCc6IHRydWUsJ3VpLWNoa2JveC1yZWFkb25seSc6IHJlYWRvbmx5fVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNjYiB0eXBlPVwiY2hlY2tib3hcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCIgW3ZhbHVlXT1cInZhbHVlXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXNlZH1cIiAoY2hhbmdlKT1cImhhbmRsZUNoYW5nZSgkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94LWJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zdGF0ZS1kZWZhdWx0XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50LGNiLHRydWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzpjaGVja2VkLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c2VkfVwiIHJvbGU9XCJjaGVja2JveFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJjaGVja2VkID8gY2hlY2tib3hJY29uIDogbnVsbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGxhYmVsIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxjYix0cnVlKVwiIFtjbGFzc109XCJsYWJlbFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktY2hrYm94LWxhYmVsJzogdHJ1ZSwgJ3VpLWxhYmVsLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLWxhYmVsLWRpc2FibGVkJzpkaXNhYmxlZCwgJ3VpLWxhYmVsLWZvY3VzJzpmb2N1c2VkfVwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiIFthdHRyLmZvcl09XCJpbnB1dElkXCI+e3tsYWJlbH19PC9sYWJlbD5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgYmluYXJ5OiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbGFiZWxTdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIFxuICAgIEBJbnB1dCgpIGNoZWNrYm94SWNvbjogc3RyaW5nID0gJ3BpIHBpLWNoZWNrJztcbiAgICBcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZCgnY2InKSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgbW9kZWw6IGFueTtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgICAgICBcbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBvbkNsaWNrKGV2ZW50LGNoZWNrYm94LGZvY3VzOmJvb2xlYW4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJpbmFyeSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZClcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFZhbHVlKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe2NoZWNrZWQ6dGhpcy5jaGVja2VkLCBvcmlnaW5hbEV2ZW50OiBldmVudH0pO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpwqB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuYmluYXJ5KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaW5kZXhPZih0aGlzLnZhbHVlKSA+IC0xO1xuICAgIH1cblxuICAgIHJlbW92ZVZhbHVlKCkge1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIodmFsID0+IHZhbCAhPT0gdGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgYWRkVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsKVxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IFsuLi50aGlzLm1vZGVsLCB0aGlzLnZhbHVlXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IFt0aGlzLnZhbHVlXTtcbiAgICB9XG4gICAgXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICAgXG4gICAgd3JpdGVWYWx1ZShtb2RlbDogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuaXNDaGVja2VkKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtDaGVja2JveF0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2hlY2tib3hdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94TW9kdWxlIHsgfVxuIl19