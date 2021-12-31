var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var ProgressSpinner = /** @class */ (function () {
    function ProgressSpinner() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
    __decorate([
        Input()
    ], ProgressSpinner.prototype, "style", void 0);
    __decorate([
        Input()
    ], ProgressSpinner.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ProgressSpinner.prototype, "strokeWidth", void 0);
    __decorate([
        Input()
    ], ProgressSpinner.prototype, "fill", void 0);
    __decorate([
        Input()
    ], ProgressSpinner.prototype, "animationDuration", void 0);
    ProgressSpinner = __decorate([
        Component({
            selector: 'p-progressSpinner',
            template: "\n        <div class=\"ui-progress-spinner\" [ngStyle]=\"style\" [ngClass]=\"styleClass\"  role=\"alert\" aria-busy=\"true\">\n            <svg class=\"ui-progress-spinner-svg\" viewBox=\"25 25 50 50\" [style.animation-duration]=\"animationDuration\">\n                <circle class=\"ui-progress-spinner-circle\" cx=\"50\" cy=\"50\" r=\"20\" [attr.fill]=\"fill\" [attr.stroke-width]=\"strokeWidth\" stroke-miterlimit=\"10\"/>\n            </svg>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ProgressSpinner);
    return ProgressSpinner;
}());
export { ProgressSpinner };
var ProgressSpinnerModule = /** @class */ (function () {
    function ProgressSpinnerModule() {
    }
    ProgressSpinnerModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ProgressSpinner],
            declarations: [ProgressSpinner]
        })
    ], ProgressSpinnerModule);
    return ProgressSpinnerModule;
}());
export { ProgressSpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NzcGlubmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wcm9ncmVzc3NwaW5uZXIvIiwic291cmNlcyI6WyJwcm9ncmVzc3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWE3QztJQUFBO1FBTWEsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUV0QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7SUFFOUMsQ0FBQztJQVZZO1FBQVIsS0FBSyxFQUFFO2tEQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7dURBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFO3dEQUEyQjtJQUUxQjtRQUFSLEtBQUssRUFBRTtpREFBdUI7SUFFdEI7UUFBUixLQUFLLEVBQUU7OERBQWtDO0lBVmpDLGVBQWU7UUFYM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsc2RBTVQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csZUFBZSxDQVkzQjtJQUFELHNCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksZUFBZTtBQW1CNUI7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQUxqQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztTQUNsQyxDQUFDO09BQ1cscUJBQXFCLENBQUk7SUFBRCw0QkFBQztDQUFBLEFBQXRDLElBQXNDO1NBQXpCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcHJvZ3Jlc3NTcGlubmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3Mtc3Bpbm5lclwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiICByb2xlPVwiYWxlcnRcIiBhcmlhLWJ1c3k9XCJ0cnVlXCI+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwidWktcHJvZ3Jlc3Mtc3Bpbm5lci1zdmdcIiB2aWV3Qm94PVwiMjUgMjUgNTAgNTBcIiBbc3R5bGUuYW5pbWF0aW9uLWR1cmF0aW9uXT1cImFuaW1hdGlvbkR1cmF0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cInVpLXByb2dyZXNzLXNwaW5uZXItY2lyY2xlXCIgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMjBcIiBbYXR0ci5maWxsXT1cImZpbGxcIiBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3Ryb2tlV2lkdGhcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzU3Bpbm5lciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBzdHJva2VXaWR0aDogc3RyaW5nID0gXCIyXCI7XG4gICAgXG4gICAgQElucHV0KCkgZmlsbDogc3RyaW5nID0gXCJub25lXCI7XG4gICAgXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZyA9IFwiMnNcIjtcbiAgICBcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUHJvZ3Jlc3NTcGlubmVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQcm9ncmVzc1NwaW5uZXJdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzU3Bpbm5lck1vZHVsZSB7IH0iXX0=