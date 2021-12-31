var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
let InplaceDisplay = class InplaceDisplay {
};
InplaceDisplay = __decorate([
    Component({
        selector: 'p-inplaceDisplay',
        template: '<ng-content></ng-content>'
    })
], InplaceDisplay);
export { InplaceDisplay };
let InplaceContent = class InplaceContent {
};
InplaceContent = __decorate([
    Component({
        selector: 'p-inplaceContent',
        template: '<ng-content></ng-content>'
    })
], InplaceContent);
export { InplaceContent };
let Inplace = class Inplace {
    constructor() {
        this.closeIcon = 'pi pi-times';
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    onActivateClick($event) {
        if (!this.preventClick)
            this.activate(event);
    }
    onDeactivateClick(event) {
        if (!this.preventClick)
            this.deactivate(event);
    }
    activate(event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    }
    deactivate(event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    }
    onKeydown(event) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
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
        template: `
        <div [ngClass]="{'ui-inplace ui-widget': true, 'ui-inplace-closable': closable}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-inplace-display" (click)="onActivateClick($event)" tabindex="0" (keydown)="onKeydown($event)"   
                [ngClass]="{'ui-state-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
            </div>
            <div class="ui-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <button type="button" [icon]="closeIcon" pButton (click)="onDeactivateClick($event)" *ngIf="closable"></button>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Inplace);
export { Inplace };
let InplaceModule = class InplaceModule {
};
InplaceModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule],
        exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
        declarations: [Inplace, InplaceDisplay, InplaceContent]
    })
], InplaceModule);
export { InplaceModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wbGFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wbGFjZS8iLCJzb3VyY2VzIjpbImlucGxhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU01QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUcsQ0FBQTtBQUFqQixjQUFjO0lBSjFCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLDJCQUEyQjtLQUN4QyxDQUFDO0dBQ1csY0FBYyxDQUFHO1NBQWpCLGNBQWM7QUFNM0IsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHLENBQUE7QUFBakIsY0FBYztJQUoxQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSwyQkFBMkI7S0FDeEMsQ0FBQztHQUNXLGNBQWMsQ0FBRztTQUFqQixjQUFjO0FBa0IzQixJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBQXBCO1FBY2EsY0FBUyxHQUFXLGFBQWEsQ0FBQztRQUVqQyxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQW1DbkUsQ0FBQztJQS9CRyxlQUFlLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzFCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQW5EWTtJQUFSLEtBQUssRUFBRTt1Q0FBaUI7QUFFaEI7SUFBUixLQUFLLEVBQUU7eUNBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO3lDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTs2Q0FBdUI7QUFFdEI7SUFBUixLQUFLLEVBQUU7c0NBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTsyQ0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7MENBQW1DO0FBRWpDO0lBQVQsTUFBTSxFQUFFOzJDQUFvRDtBQUVuRDtJQUFULE1BQU0sRUFBRTs2Q0FBc0Q7QUFsQnRELE9BQU87SUFoQm5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7S0FXVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxPQUFPLENBcURuQjtTQXJEWSxPQUFPO0FBNERwQixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUksQ0FBQTtBQUFqQixhQUFhO0lBTHpCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7UUFDcEMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxjQUFjLEVBQUMsWUFBWSxDQUFDO1FBQzdELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsY0FBYyxDQUFDO0tBQ3hELENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wbGFjZURpc3BsYXknLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgSW5wbGFjZURpc3BsYXkge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucGxhY2VDb250ZW50JyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIElucGxhY2VDb250ZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnBsYWNlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktaW5wbGFjZSB1aS13aWRnZXQnOiB0cnVlLCAndWktaW5wbGFjZS1jbG9zYWJsZSc6IGNsb3NhYmxlfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1pbnBsYWNlLWRpc3BsYXlcIiAoY2xpY2spPVwib25BY3RpdmF0ZUNsaWNrKCRldmVudClcIiB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiICAgXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgKm5nSWY9XCIhYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3BJbnBsYWNlRGlzcGxheV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1pbnBsYWNlLWNvbnRlbnRcIiAqbmdJZj1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltwSW5wbGFjZUNvbnRlbnRdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtpY29uXT1cImNsb3NlSWNvblwiIHBCdXR0b24gKGNsaWNrKT1cIm9uRGVhY3RpdmF0ZUNsaWNrKCRldmVudClcIiAqbmdJZj1cImNsb3NhYmxlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgSW5wbGFjZSB7XG5cbiAgICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcHJldmVudENsaWNrOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGNsb3NlSWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcblxuICAgIEBPdXRwdXQoKSBvbkFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaG92ZXI6IGJvb2xlYW47XG5cbiAgICBvbkFjdGl2YXRlQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5wcmV2ZW50Q2xpY2spXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkRlYWN0aXZhdGVDbGljayhldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJldmVudENsaWNrKVxuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZShldmVudD86IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbkFjdGl2YXRlLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZShldmVudD86IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaG92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub25EZWFjdGl2YXRlLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoZXZlbnQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0lucGxhY2UsSW5wbGFjZURpc3BsYXksSW5wbGFjZUNvbnRlbnQsQnV0dG9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnBsYWNlLElucGxhY2VEaXNwbGF5LElucGxhY2VDb250ZW50XVxufSlcbmV4cG9ydCBjbGFzcyBJbnBsYWNlTW9kdWxlIHsgfVxuIl19