var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var UIMessage = /** @class */ (function () {
    function UIMessage() {
        this.escape = true;
    }
    Object.defineProperty(UIMessage.prototype, "icon", {
        get: function () {
            var icon = null;
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
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-message-info': (severity === 'info'),\n                'ui-message-warn': (severity === 'warn'),\n                'ui-message-error': (severity === 'error'),\n                'ui-message-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <div *ngIf=\"!escape; else escapeOut\">\n                <span *ngIf=\"!escape\" class=\"ui-message-text\" [innerHTML]=\"text\"></span>\n            </div>\n            <ng-template #escapeOut>\n                <span *ngIf=\"escape\" class=\"ui-message-text\">{{text}}</span>\n            </ng-template>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], UIMessage);
    return UIMessage;
}());
export { UIMessage };
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [UIMessage],
            declarations: [UIMessage]
        })
    ], MessageModule);
    return MessageModule;
}());
export { MessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVzc2FnZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXFCN0M7SUFBQTtRQU1hLFdBQU0sR0FBWSxJQUFJLENBQUM7SUErQnBDLENBQUM7SUE3Qkcsc0JBQUksMkJBQUk7YUFBUjtZQUNJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztZQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsUUFBTyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNsQixLQUFLLFNBQVM7d0JBQ1YsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDekIsTUFBTTtvQkFFTixLQUFLLE1BQU07d0JBQ1AsSUFBSSxHQUFHLG1CQUFtQixDQUFDO3dCQUMvQixNQUFNO29CQUVOLEtBQUssT0FBTzt3QkFDUixJQUFJLEdBQUcsYUFBYSxDQUFDO3dCQUN6QixNQUFNO29CQUVOLEtBQUssTUFBTTt3QkFDUCxJQUFJLEdBQUcsNEJBQTRCLENBQUM7d0JBQ3hDLE1BQU07b0JBRU47d0JBQ0ksSUFBSSxHQUFHLG1CQUFtQixDQUFDO3dCQUMvQixNQUFNO2lCQUNUO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQWxDUTtRQUFSLEtBQUssRUFBRTsrQ0FBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7MkNBQWM7SUFFYjtRQUFSLEtBQUssRUFBRTs2Q0FBd0I7SUFOdkIsU0FBUztRQW5CckIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLDR2QkFjVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxTQUFTLENBcUNyQjtJQUFELGdCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FyQ1ksU0FBUztBQTRDdEI7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFMekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDNUIsQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVzc2FnZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBjbGFzcz1cInVpLW1lc3NhZ2UgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGxcIiAqbmdJZj1cInNldmVyaXR5XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1tZXNzYWdlLWluZm8nOiAoc2V2ZXJpdHkgPT09ICdpbmZvJyksXG4gICAgICAgICAgICAgICAgJ3VpLW1lc3NhZ2Utd2Fybic6IChzZXZlcml0eSA9PT0gJ3dhcm4nKSxcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS1lcnJvcic6IChzZXZlcml0eSA9PT0gJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgJ3VpLW1lc3NhZ2Utc3VjY2Vzcyc6IChzZXZlcml0eSA9PT0gJ3N1Y2Nlc3MnKX1cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVzc2FnZS1pY29uXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZXNjYXBlOyBlbHNlIGVzY2FwZU91dFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWVzY2FwZVwiIGNsYXNzPVwidWktbWVzc2FnZS10ZXh0XCIgW2lubmVySFRNTF09XCJ0ZXh0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2VzY2FwZU91dD5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImVzY2FwZVwiIGNsYXNzPVwidWktbWVzc2FnZS10ZXh0XCI+e3t0ZXh0fX08L3NwYW4+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBVSU1lc3NhZ2Uge1xuXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICBsZXQgaWNvbjogc3RyaW5nID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zZXZlcml0eSkge1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMuc2V2ZXJpdHkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1jaGVjayc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1pbmZvLWNpcmNsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktdGltZXMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnd2Fybic6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktZXhjbGFtYXRpb24tdHJpYW5nbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1pbmZvLWNpcmNsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWNvbjtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1VJTWVzc2FnZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVUlNZXNzYWdlXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTW9kdWxlIHsgfVxuIl19