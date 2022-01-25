import { ɵɵdefineInjectable, Injectable, Component, Directive, TemplateRef, Input, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

class PrimeNGConfig {
    constructor() {
        this.ripple = false;
    }
}
PrimeNGConfig.ɵprov = ɵɵdefineInjectable({ factory: function PrimeNGConfig_Factory() { return new PrimeNGConfig(); }, token: PrimeNGConfig, providedIn: "root" });
PrimeNGConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];

class ConfirmationService {
    constructor() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    confirm(confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    close() {
        this.requireConfirmationSource.next(null);
        return this;
    }
    onAccept() {
        this.acceptConfirmationSource.next();
    }
}
ConfirmationService.decorators = [
    { type: Injectable }
];

class MessageService {
    constructor() {
        this.messageSource = new Subject();
        this.clearSource = new Subject();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
    }
    add(message) {
        if (message) {
            this.messageSource.next(message);
        }
    }
    addAll(messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    clear(key) {
        this.clearSource.next(key || null);
    }
}
MessageService.decorators = [
    { type: Injectable }
];

class Header {
}
Header.decorators = [
    { type: Component, args: [{
                selector: 'p-header',
                template: '<ng-content></ng-content>'
            },] }
];
class Footer {
}
Footer.decorators = [
    { type: Component, args: [{
                selector: 'p-footer',
                template: '<ng-content></ng-content>'
            },] }
];
class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
PrimeTemplate.decorators = [
    { type: Directive, args: [{
                selector: '[pTemplate]',
                host: {}
            },] }
];
PrimeTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
PrimeTemplate.propDecorators = {
    type: [{ type: Input }],
    name: [{ type: Input, args: ['pTemplate',] }]
};
class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Header, Footer, PrimeTemplate],
                declarations: [Header, Footer, PrimeTemplate]
            },] }
];

class TreeDragDropService {
    constructor() {
        this.dragStartSource = new Subject();
        this.dragStopSource = new Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    startDrag(event) {
        this.dragStartSource.next(event);
    }
    stopDrag(event) {
        this.dragStopSource.next(event);
    }
}
TreeDragDropService.decorators = [
    { type: Injectable }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmationService, Footer, Header, MessageService, PrimeNGConfig, PrimeTemplate, SharedModule, TreeDragDropService };
//# sourceMappingURL=primeng-api.js.map
