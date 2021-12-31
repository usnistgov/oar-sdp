var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
var InplaceDisplay = /** @class */ (function () {
    function InplaceDisplay() {
    }
    InplaceDisplay = __decorate([
        Component({
            selector: 'p-inplaceDisplay',
            template: '<ng-content></ng-content>'
        })
    ], InplaceDisplay);
    return InplaceDisplay;
}());
export { InplaceDisplay };
var InplaceContent = /** @class */ (function () {
    function InplaceContent() {
    }
    InplaceContent = __decorate([
        Component({
            selector: 'p-inplaceContent',
            template: '<ng-content></ng-content>'
        })
    ], InplaceContent);
    return InplaceContent;
}());
export { InplaceContent };
var Inplace = /** @class */ (function () {
    function Inplace() {
        this.closeIcon = 'pi pi-times';
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    Inplace.prototype.onActivateClick = function ($event) {
        if (!this.preventClick)
            this.activate(event);
    };
    Inplace.prototype.onDeactivateClick = function (event) {
        if (!this.preventClick)
            this.deactivate(event);
    };
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    Inplace.prototype.onKeydown = function (event) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
    };
    __decorate([
        Input()
    ], Inplace.prototype, "active", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "closable", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "preventClick", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "style", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "closeIcon", void 0);
    __decorate([
        Output()
    ], Inplace.prototype, "onActivate", void 0);
    __decorate([
        Output()
    ], Inplace.prototype, "onDeactivate", void 0);
    Inplace = __decorate([
        Component({
            selector: 'p-inplace',
            template: "\n        <div [ngClass]=\"{'ui-inplace ui-widget': true, 'ui-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"onActivateClick($event)\" tabindex=\"0\" (keydown)=\"onKeydown($event)\"   \n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" [icon]=\"closeIcon\" pButton (click)=\"onDeactivateClick($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Inplace);
    return Inplace;
}());
export { Inplace };
var InplaceModule = /** @class */ (function () {
    function InplaceModule() {
    }
    InplaceModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule],
            exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
            declarations: [Inplace, InplaceDisplay, InplaceContent]
        })
    ], InplaceModule);
    return InplaceModule;
}());
export { InplaceModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wbGFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wbGFjZS8iLCJzb3VyY2VzIjpbImlucGxhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU01QztJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYztBQU0zQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYztBQWtCM0I7SUFBQTtRQWNhLGNBQVMsR0FBVyxhQUFhLENBQUM7UUFFakMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFtQ25FLENBQUM7SUEvQkcsaUNBQWUsR0FBZixVQUFnQixNQUFNO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQ0FBaUIsR0FBakIsVUFBa0IsS0FBSztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsMEJBQVEsR0FBUixVQUFTLEtBQWE7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLEtBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEtBQW9CO1FBQzFCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBbERRO1FBQVIsS0FBSyxFQUFFOzJDQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTs2Q0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7NkNBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFO2lEQUF1QjtJQUV0QjtRQUFSLEtBQUssRUFBRTswQ0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFOytDQUFvQjtJQUVuQjtRQUFSLEtBQUssRUFBRTs4Q0FBbUM7SUFFakM7UUFBVCxNQUFNLEVBQUU7K0NBQW9EO0lBRW5EO1FBQVQsTUFBTSxFQUFFO2lEQUFzRDtJQWxCdEQsT0FBTztRQWhCbkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLHd2QkFXVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxPQUFPLENBcURuQjtJQUFELGNBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXJEWSxPQUFPO0FBNERwQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsY0FBYyxFQUFDLFlBQVksQ0FBQztZQUM3RCxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLGNBQWMsQ0FBQztTQUN4RCxDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnBsYWNlRGlzcGxheScsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBJbnBsYWNlRGlzcGxheSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wbGFjZUNvbnRlbnQnLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgSW5wbGFjZUNvbnRlbnQge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucGxhY2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1pbnBsYWNlIHVpLXdpZGdldCc6IHRydWUsICd1aS1pbnBsYWNlLWNsb3NhYmxlJzogY2xvc2FibGV9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWlucGxhY2UtZGlzcGxheVwiIChjbGljayk9XCJvbkFjdGl2YXRlQ2xpY2soJGV2ZW50KVwiIHRhYmluZGV4PVwiMFwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCIgICBcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiAqbmdJZj1cIiFhY3RpdmVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbcElucGxhY2VEaXNwbGF5XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWlucGxhY2UtY29udGVudFwiICpuZ0lmPVwiYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3BJbnBsYWNlQ29udGVudF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2ljb25dPVwiY2xvc2VJY29uXCIgcEJ1dHRvbiAoY2xpY2spPVwib25EZWFjdGl2YXRlQ2xpY2soJGV2ZW50KVwiICpuZ0lmPVwiY2xvc2FibGVcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBJbnBsYWNlIHtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwcmV2ZW50Q2xpY2s6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY2xvc2VJY29uOiBzdHJpbmcgPSAncGkgcGktdGltZXMnO1xuXG4gICAgQE91dHB1dCgpIG9uQWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBob3ZlcjogYm9vbGVhbjtcblxuICAgIG9uQWN0aXZhdGVDbGljaygkZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRDbGljaylcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRGVhY3RpdmF0ZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5wcmV2ZW50Q2xpY2spXG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoZXZlbnQpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKGV2ZW50PzogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZhdGUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKGV2ZW50PzogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ob3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vbkRlYWN0aXZhdGUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZShldmVudCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsQnV0dG9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW5wbGFjZSxJbnBsYWNlRGlzcGxheSxJbnBsYWNlQ29udGVudCxCdXR0b25Nb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucGxhY2UsSW5wbGFjZURpc3BsYXksSW5wbGFjZUNvbnRlbnRdXG59KVxuZXhwb3J0IGNsYXNzIElucGxhY2VNb2R1bGUgeyB9XG4iXX0=