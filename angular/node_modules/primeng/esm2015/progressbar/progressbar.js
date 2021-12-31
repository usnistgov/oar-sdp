var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
let ProgressBar = class ProgressBar {
    constructor() {
        this.showValue = true;
        this.unit = '%';
        this.mode = 'determinate';
    }
};
__decorate([
    Input()
], ProgressBar.prototype, "value", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "showValue", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "style", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "styleClass", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "unit", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "mode", void 0);
ProgressBar = __decorate([
    Component({
        selector: 'p-progressBar',
        template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100"
            [ngClass]="{'ui-progressbar ui-widget ui-widget-content ui-corner-all': true, 'ui-progressbar-determinate': (mode === 'determinate'), 'ui-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div class="ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all" [style.width]="value + '%'" style="display:block"></div>
            <div class="ui-progressbar-label" [style.display]="value != null ? 'block' : 'none'" *ngIf="showValue">{{value}}{{unit}}</div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], ProgressBar);
export { ProgressBar };
let ProgressBarModule = class ProgressBarModule {
};
ProgressBarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressBar],
        declarations: [ProgressBar]
    })
], ProgressBarModule);
export { ProgressBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Byb2dyZXNzYmFyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWE3QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQXhCO1FBSWEsY0FBUyxHQUFZLElBQUksQ0FBQztRQU0xQixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBRW5CLFNBQUksR0FBVyxhQUFhLENBQUM7SUFFMUMsQ0FBQztDQUFBLENBQUE7QUFaWTtJQUFSLEtBQUssRUFBRTswQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOzhDQUEyQjtBQUUxQjtJQUFSLEtBQUssRUFBRTswQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOytDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTt5Q0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7eUNBQThCO0FBWjdCLFdBQVc7SUFYdkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGVBQWU7UUFDekIsUUFBUSxFQUFFOzs7Ozs7S0FNVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxXQUFXLENBY3ZCO1NBZFksV0FBVztBQXFCeEIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBSSxDQUFBO0FBQXJCLGlCQUFpQjtJQUw3QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUM5QixDQUFDO0dBQ1csaUJBQWlCLENBQUk7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wcm9ncmVzc0JhcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXByb2dyZXNzYmFyIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLXByb2dyZXNzYmFyLWRldGVybWluYXRlJzogKG1vZGUgPT09ICdkZXRlcm1pbmF0ZScpLCAndWktcHJvZ3Jlc3NiYXItaW5kZXRlcm1pbmF0ZSc6IChtb2RlID09PSAnaW5kZXRlcm1pbmF0ZScpfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXByb2dyZXNzYmFyLXZhbHVlIHVpLXByb2dyZXNzYmFyLXZhbHVlLWFuaW1hdGUgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgW3N0eWxlLndpZHRoXT1cInZhbHVlICsgJyUnXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3NiYXItbGFiZWxcIiBbc3R5bGUuZGlzcGxheV09XCJ2YWx1ZSAhPSBudWxsID8gJ2Jsb2NrJyA6ICdub25lJ1wiICpuZ0lmPVwic2hvd1ZhbHVlXCI+e3t2YWx1ZX19e3t1bml0fX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdW5pdDogc3RyaW5nID0gJyUnO1xuICAgIFxuICAgIEBJbnB1dCgpIG1vZGU6IHN0cmluZyA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Byb2dyZXNzQmFyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQcm9ncmVzc0Jhcl1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJNb2R1bGUgeyB9Il19