var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
let UIMessage = class UIMessage {
    constructor() {
        this.escape = true;
    }
    get icon() {
        let icon = null;
        if (this.severity) {
            switch (this.severity) {
                case 'success':
                    icon = 'pi pi-check';
                    break;
                case 'info':
                    icon = 'pi pi-info-circle';
                    break;
                case 'error':
                    icon = 'pi pi-times';
                    break;
                case 'warn':
                    icon = 'pi pi-exclamation-triangle';
                    break;
                default:
                    icon = 'pi pi-info-circle';
                    break;
            }
        }
        return icon;
    }
};
__decorate([
    Input()
], UIMessage.prototype, "severity", void 0);
__decorate([
    Input()
], UIMessage.prototype, "text", void 0);
__decorate([
    Input()
], UIMessage.prototype, "escape", void 0);
UIMessage = __decorate([
    Component({
        selector: 'p-message',
        template: `
        <div aria-live="polite" class="ui-message ui-widget ui-corner-all" *ngIf="severity"
        [ngClass]="{'ui-message-info': (severity === 'info'),
                'ui-message-warn': (severity === 'warn'),
                'ui-message-error': (severity === 'error'),
                'ui-message-success': (severity === 'success')}">
            <span class="ui-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="ui-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="ui-message-text">{{text}}</span>
            </ng-template>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], UIMessage);
export { UIMessage };
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIMessage],
        declarations: [UIMessage]
    })
], MessageModule);
export { MessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVzc2FnZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXFCN0MsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUF0QjtRQU1hLFdBQU0sR0FBWSxJQUFJLENBQUM7SUErQnBDLENBQUM7SUE3QkcsSUFBSSxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsS0FBSyxTQUFTO29CQUNWLElBQUksR0FBRyxhQUFhLENBQUM7b0JBQ3pCLE1BQU07Z0JBRU4sS0FBSyxNQUFNO29CQUNQLElBQUksR0FBRyxtQkFBbUIsQ0FBQztvQkFDL0IsTUFBTTtnQkFFTixLQUFLLE9BQU87b0JBQ1IsSUFBSSxHQUFHLGFBQWEsQ0FBQztvQkFDekIsTUFBTTtnQkFFTixLQUFLLE1BQU07b0JBQ1AsSUFBSSxHQUFHLDRCQUE0QixDQUFDO29CQUN4QyxNQUFNO2dCQUVOO29CQUNJLElBQUksR0FBRyxtQkFBbUIsQ0FBQztvQkFDL0IsTUFBTTthQUNUO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTtBQW5DWTtJQUFSLEtBQUssRUFBRTsyQ0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7dUNBQWM7QUFFYjtJQUFSLEtBQUssRUFBRTt5Q0FBd0I7QUFOdkIsU0FBUztJQW5CckIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztLQWNUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLFNBQVMsQ0FxQ3JCO1NBckNZLFNBQVM7QUE0Q3RCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDNUIsQ0FBQztHQUNXLGFBQWEsQ0FBSTtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZXNzYWdlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGNsYXNzPVwidWktbWVzc2FnZSB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwic2V2ZXJpdHlcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lc3NhZ2UtaW5mbyc6IChzZXZlcml0eSA9PT0gJ2luZm8nKSxcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS13YXJuJzogKHNldmVyaXR5ID09PSAnd2FybicpLFxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLWVycm9yJzogKHNldmVyaXR5ID09PSAnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS1zdWNjZXNzJzogKHNldmVyaXR5ID09PSAnc3VjY2VzcycpfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlLWljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFlc2NhcGU7IGVsc2UgZXNjYXBlT3V0XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZXNjYXBlXCIgY2xhc3M9XCJ1aS1tZXNzYWdlLXRleHRcIiBbaW5uZXJIVE1MXT1cInRleHRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZXNjYXBlT3V0PlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZXNjYXBlXCIgY2xhc3M9XCJ1aS1tZXNzYWdlLXRleHRcIj57e3RleHR9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZSB7XG5cbiAgICBASW5wdXQoKSBzZXZlcml0eTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpY29uOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNldmVyaXR5KSB7XG4gICAgICAgICAgICBzd2l0Y2godGhpcy5zZXZlcml0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWNoZWNrJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWluZm8tY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS10aW1lcyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1leGNsYW1hdGlvbi10cmlhbmdsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWluZm8tY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpY29uO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVUlNZXNzYWdlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtVSU1lc3NhZ2VdXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VNb2R1bGUgeyB9XG4iXX0=