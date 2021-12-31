var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, OnDestroy, Input, Output, EventEmitter, AfterContentInit, Optional, ElementRef, ChangeDetectionStrategy, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Message, PrimeTemplate, MessageService } from 'primeng/api';
var Messages = /** @class */ (function () {
    function Messages(messageService, el) {
        this.messageService = messageService;
        this.el = el;
        this.closable = true;
        this.enableService = true;
        this.escape = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new EventEmitter();
    }
    Messages.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                default:
                    _this.contentTemplate = item.template;
                    break;
            }
        });
        if (this.messageService && this.enableService && !this.contentTemplate) {
            this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
                if (messages) {
                    if (messages instanceof Array) {
                        var filteredMessages = messages.filter(function (m) { return _this.key === m.key; });
                        _this.value = _this.value ? __spread(_this.value, filteredMessages) : __spread(filteredMessages);
                    }
                    else if (_this.key === messages.key) {
                        _this.value = _this.value ? __spread(_this.value, [messages]) : [messages];
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
                if (key) {
                    if (_this.key === key) {
                        _this.value = null;
                    }
                }
                else {
                    _this.value = null;
                }
            });
        }
    };
    Messages.prototype.hasMessages = function () {
        var parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.contentTemplate != null || this.value && this.value.length > 0;
        }
        return false;
    };
    Messages.prototype.getSeverityClass = function () {
        if (this.severity) {
            return 'ui-messages-' + this.severity;
        }
        else {
            var msg_1 = this.value[0];
            if (msg_1) {
                var severities = ['info', 'warn', 'error', 'success'];
                var severity = severities.find(function (item) { return item === msg_1.severity; });
                return severity && "ui-messages-" + severity;
            }
        }
        return null;
    };
    Messages.prototype.clear = function (event) {
        this.value = [];
        this.valueChange.emit(this.value);
        event.preventDefault();
    };
    Object.defineProperty(Messages.prototype, "icon", {
        get: function () {
            var severity = this.severity || (this.hasMessages() ? this.value[0].severity : null);
            if (this.hasMessages()) {
                switch (severity) {
                    case 'success':
                        return 'pi-check';
                        break;
                    case 'info':
                        return 'pi-info-circle';
                        break;
                    case 'error':
                        return 'pi-times';
                        break;
                    case 'warn':
                        return 'pi-exclamation-triangle';
                        break;
                    default:
                        return 'pi-info-circle';
                        break;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Messages.prototype.ngOnDestroy = function () {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    };
    Messages.ctorParameters = function () { return [
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Messages.prototype, "value", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "closable", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "style", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "enableService", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "key", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "escape", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "severity", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "hideTransitionOptions", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Messages.prototype, "templates", void 0);
    __decorate([
        Output()
    ], Messages.prototype, "valueChange", void 0);
    Messages = __decorate([
        Component({
            selector: 'p-messages',
            template: "\n        <div *ngIf=\"hasMessages()\" class=\"ui-messages ui-widget ui-corner-all\"\n                    [ngClass]=\"getSeverityClass()\" role=\"alert\" [ngStyle]=\"style\" [class]=\"styleClass\"\n                    [@messageAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\">\n            <a tabindex=\"0\" class=\"ui-messages-close\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" *ngIf=\"closable\">\n                <i class=\"pi pi-times\"></i>\n            </a>\n            <span class=\"ui-messages-icon pi\" [ngClass]=\"icon\"></span>\n            <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            <ul *ngIf=\"value && value.length\">\n                <li *ngFor=\"let msg of value\">\n                    <div *ngIf=\"!escape; else escapeOut\">\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\" [innerHTML]=\"msg.summary\"></span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\" [innerHTML]=\"msg.detail\"></span>\n                    </div>\n                    <ng-template #escapeOut>\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\">{{msg.summary}}</span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\">{{msg.detail}}</span>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
            animations: [
                trigger('messageAnimation', [
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => *', [
                        style({ transform: 'translateY(-25%)', opacity: 0 }),
                        animate('{{showTransitionParams}}')
                    ]),
                    transition('* => void', [
                        animate(('{{hideTransitionParams}}'), style({
                            opacity: 0,
                            transform: 'translateY(-25%)'
                        }))
                    ])
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __param(0, Optional())
    ], Messages);
    return Messages;
}());
export { Messages };
var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Messages],
            declarations: [Messages]
        })
    ], MessagesModule);
    return MessagesModule;
}());
export { MessagesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL21lc3NhZ2VzLyIsInNvdXJjZXMiOlsibWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyx1QkFBdUIsRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4TCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFnRGpFO0lBZ0NJLGtCQUErQixjQUE4QixFQUFTLEVBQWM7UUFBckQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTVCM0UsYUFBUSxHQUFZLElBQUksQ0FBQztRQU16QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUk5QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBSXZCLDBCQUFxQixHQUFXLGdCQUFnQixDQUFDO1FBRWpELDBCQUFxQixHQUFXLGVBQWUsQ0FBQztRQUkvQyxnQkFBVyxHQUE0QixJQUFJLFlBQVksRUFBYSxDQUFDO0lBUVEsQ0FBQztJQUV4RixxQ0FBa0IsR0FBbEI7UUFBQSxpQkFxQ0M7UUFwQ0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3hCLFFBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQixLQUFL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UUFBUSxFQUFFLENBQUE7T0FoQ2QsUUFBUSxDQWlKcEI7SUFBRCxlQUFDO0NBQUEsQUFqSkQsSUFpSkM7U0FqSlksUUFBUTtBQXdKckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDM0IsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLEFmdGVyQ29udGVudEluaXQsT3B0aW9uYWwsRWxlbWVudFJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01lc3NhZ2UsUHJpbWVUZW1wbGF0ZSxNZXNzYWdlU2VydmljZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVzc2FnZXMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCJoYXNNZXNzYWdlcygpXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcyB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldFNldmVyaXR5Q2xhc3MoKVwiIHJvbGU9XCJhbGVydFwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbQG1lc3NhZ2VBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiPlxuICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcy1jbG9zZVwiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2xlYXIoJGV2ZW50KVwiICpuZ0lmPVwiY2xvc2FibGVcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInBpIHBpLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlcy1pY29uIHBpXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDx1bCAqbmdJZj1cInZhbHVlICYmIHZhbHVlLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbXNnIG9mIHZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZXNjYXBlOyBlbHNlIGVzY2FwZU91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtc2cuc3VtbWFyeVwiIGNsYXNzPVwidWktbWVzc2FnZXMtc3VtbWFyeVwiIFtpbm5lckhUTUxdPVwibXNnLnN1bW1hcnlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1zZy5kZXRhaWxcIiBjbGFzcz1cInVpLW1lc3NhZ2VzLWRldGFpbFwiIFtpbm5lckhUTUxdPVwibXNnLmRldGFpbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZXNjYXBlT3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtc2cuc3VtbWFyeVwiIGNsYXNzPVwidWktbWVzc2FnZXMtc3VtbWFyeVwiPnt7bXNnLnN1bW1hcnl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibXNnLmRldGFpbFwiIGNsYXNzPVwidWktbWVzc2FnZXMtZGV0YWlsXCI+e3ttc2cuZGV0YWlsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdtZXNzYWdlQW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0yNSUpJywgb3BhY2l0eTogMH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyksIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMjUlKSdcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IE1lc3NhZ2VbXTtcblxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBlbmFibGVTZXJ2aWNlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldmVyaXR5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICczMDBtcyBlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyNTBtcyBlYXNlLWluJztcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1lc3NhZ2VbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1lc3NhZ2VbXT4oKTtcblxuICAgIG1lc3NhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNsZWFyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwdWJsaWMgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTZXJ2aWNlICYmIHRoaXMuZW5hYmxlU2VydmljZSAmJiAhdGhpcy5jb250ZW50VGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UubWVzc2FnZU9ic2VydmVyLnN1YnNjcmliZSgobWVzc2FnZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkTWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIobSA9PiB0aGlzLmtleSA9PT0gbS5rZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgLi4uZmlsdGVyZWRNZXNzYWdlc10gOiBbLi4uZmlsdGVyZWRNZXNzYWdlc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5rZXkgPT09IG1lc3NhZ2VzLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgLi4uW21lc3NhZ2VzXV0gOiBbbWVzc2FnZXNdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb24gPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmNsZWFyT2JzZXJ2ZXIuc3Vic2NyaWJlKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzTWVzc2FnZXMoKSB7XG4gICAgICAgIGxldCBwYXJlbnRFbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAocGFyZW50RWwgJiYgcGFyZW50RWwub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50VGVtcGxhdGUgIT0gbnVsbCB8fCB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRTZXZlcml0eUNsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zZXZlcml0eSkge1xuICAgICAgICAgICAgcmV0dXJuICd1aS1tZXNzYWdlcy0nICsgdGhpcy5zZXZlcml0eTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHRoaXMudmFsdWVbMF07XG4gICAgICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V2ZXJpdGllcyA9IFsnaW5mbycsICd3YXJuJywgJ2Vycm9yJywgJ3N1Y2Nlc3MnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXZlcml0eSA9IHNldmVyaXRpZXMuZmluZChpdGVtID0+IGl0ZW0gPT09IG1zZy5zZXZlcml0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2V2ZXJpdHkgJiYgYHVpLW1lc3NhZ2VzLSR7c2V2ZXJpdHl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNsZWFyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBbXTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2V2ZXJpdHkgPSB0aGlzLnNldmVyaXR5IHx8ICh0aGlzLmhhc01lc3NhZ2VzKCkgPyB0aGlzLnZhbHVlWzBdLnNldmVyaXR5IDogbnVsbCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzTWVzc2FnZXMoKSkge1xuICAgICAgICAgICAgc3dpdGNoKHNldmVyaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGktY2hlY2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpLXRpbWVzJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2xlYXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWVzc2FnZXNdLFxuICAgIGRlY2xhcmF0aW9uczogW01lc3NhZ2VzXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc01vZHVsZSB7IH1cbiJdfQ==