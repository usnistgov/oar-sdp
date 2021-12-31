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
let Messages = class Messages {
    constructor(messageService, el) {
        this.messageService = messageService;
        this.el = el;
        this.closable = true;
        this.enableService = true;
        this.escape = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new EventEmitter();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
        if (this.messageService && this.enableService && !this.contentTemplate) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
                if (messages) {
                    if (messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.value = this.value ? [...this.value, ...[messages]] : [messages];
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
                if (key) {
                    if (this.key === key) {
                        this.value = null;
                    }
                }
                else {
                    this.value = null;
                }
            });
        }
    }
    hasMessages() {
        let parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.contentTemplate != null || this.value && this.value.length > 0;
        }
        return false;
    }
    getSeverityClass() {
        if (this.severity) {
            return 'ui-messages-' + this.severity;
        }
        else {
            const msg = this.value[0];
            if (msg) {
                const severities = ['info', 'warn', 'error', 'success'];
                const severity = severities.find(item => item === msg.severity);
                return severity && `ui-messages-${severity}`;
            }
        }
        return null;
    }
    clear(event) {
        this.value = [];
        this.valueChange.emit(this.value);
        event.preventDefault();
    }
    get icon() {
        const severity = this.severity || (this.hasMessages() ? this.value[0].severity : null);
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
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    }
};
Messages.ctorParameters = () => [
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: ElementRef }
];
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
        template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all"
                    [ngClass]="getSeverityClass()" role="alert" [ngStyle]="style" [class]="styleClass"
                    [@messageAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}">
            <a tabindex="0" class="ui-messages-close" (click)="clear($event)" (keydown.enter)="clear($event)" *ngIf="closable">
                <i class="pi pi-times"></i>
            </a>
            <span class="ui-messages-icon pi" [ngClass]="icon"></span>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ul *ngIf="value && value.length">
                <li *ngFor="let msg of value">
                    <div *ngIf="!escape; else escapeOut">
                        <span *ngIf="msg.summary" class="ui-messages-summary" [innerHTML]="msg.summary"></span>
                        <span *ngIf="msg.detail" class="ui-messages-detail" [innerHTML]="msg.detail"></span>
                    </div>
                    <ng-template #escapeOut>
                        <span *ngIf="msg.summary" class="ui-messages-summary">{{msg.summary}}</span>
                        <span *ngIf="msg.detail" class="ui-messages-detail">{{msg.detail}}</span>
                    </ng-template>
                </li>
            </ul>
        </div>
    `,
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
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Messages],
        declarations: [Messages]
    })
], MessagesModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Messages, MessagesModule };
//# sourceMappingURL=primeng-messages.js.map
