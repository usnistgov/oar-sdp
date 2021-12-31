import { EventEmitter, Optional, ElementRef, Input, ContentChildren, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService, PrimeTemplate } from 'primeng/api';

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

/**
 * Generated bundle index. Do not edit.
 */

export { Messages, MessagesModule };
//# sourceMappingURL=primeng-messages.js.map
