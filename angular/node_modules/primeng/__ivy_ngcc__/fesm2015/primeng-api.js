import { ɵɵdefineInjectable, Injectable, Component, Directive, TemplateRef, Input, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';

const _c0 = ["*"];
class PrimeNGConfig {
    constructor() {
        this.ripple = false;
    }
}
PrimeNGConfig.ɵfac = function PrimeNGConfig_Factory(t) { return new (t || PrimeNGConfig)(); };
PrimeNGConfig.ɵprov = ɵɵdefineInjectable({ factory: function PrimeNGConfig_Factory() { return new PrimeNGConfig(); }, token: PrimeNGConfig, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PrimeNGConfig, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return []; }, null); })();

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
ConfirmationService.ɵfac = function ConfirmationService_Factory(t) { return new (t || ConfirmationService)(); };
ConfirmationService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ConfirmationService, factory: ConfirmationService.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ConfirmationService, [{
        type: Injectable
    }], function () { return []; }, null); })();

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
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(); };
MessageService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: MessageService, factory: MessageService.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MessageService, [{
        type: Injectable
    }], function () { return []; }, null); })();

class Header {
}
Header.ɵfac = function Header_Factory(t) { return new (t || Header)(); };
Header.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Header, selectors: [["p-header"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function Header_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Header, [{
        type: Component,
        args: [{
                selector: 'p-header',
                template: '<ng-content></ng-content>'
            }]
    }], null, null); })();
class Footer {
}
Footer.ɵfac = function Footer_Factory(t) { return new (t || Footer)(); };
Footer.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Footer, selectors: [["p-footer"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function Footer_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Footer, [{
        type: Component,
        args: [{
                selector: 'p-footer',
                template: '<ng-content></ng-content>'
            }]
    }], null, null); })();
class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
PrimeTemplate.ɵfac = function PrimeTemplate_Factory(t) { return new (t || PrimeTemplate)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.TemplateRef)); };
PrimeTemplate.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: PrimeTemplate, selectors: [["", "pTemplate", ""]], inputs: { type: "type", name: ["pTemplate", "name"] } });
PrimeTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
PrimeTemplate.propDecorators = {
    type: [{ type: Input }],
    name: [{ type: Input, args: ['pTemplate',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PrimeTemplate, [{
        type: Directive,
        args: [{
                selector: '[pTemplate]',
                host: {}
            }]
    }], function () { return [{ type: ɵngcc0.TemplateRef }]; }, { type: [{
            type: Input
        }], name: [{
            type: Input,
            args: ['pTemplate']
        }] }); })();
class SharedModule {
}
SharedModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SharedModule });
SharedModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SharedModule_Factory(t) { return new (t || SharedModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SharedModule, { declarations: function () { return [Header, Footer, PrimeTemplate]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Header, Footer, PrimeTemplate]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Header, Footer, PrimeTemplate],
                declarations: [Header, Footer, PrimeTemplate]
            }]
    }], null, null); })();

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
TreeDragDropService.ɵfac = function TreeDragDropService_Factory(t) { return new (t || TreeDragDropService)(); };
TreeDragDropService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TreeDragDropService, factory: TreeDragDropService.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TreeDragDropService, [{
        type: Injectable
    }], function () { return []; }, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmationService, Footer, Header, MessageService, PrimeNGConfig, PrimeTemplate, SharedModule, TreeDragDropService };

//# sourceMappingURL=primeng-api.js.map