(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/api', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.api = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, i0, rxjs, common) { 'use strict';

    var PrimeNGConfig = /** @class */ (function () {
        function PrimeNGConfig() {
            this.ripple = false;
        }
        return PrimeNGConfig;
    }());
    PrimeNGConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function PrimeNGConfig_Factory() { return new PrimeNGConfig(); }, token: PrimeNGConfig, providedIn: "root" });
    PrimeNGConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var ConfirmationService = /** @class */ (function () {
        function ConfirmationService() {
            this.requireConfirmationSource = new rxjs.Subject();
            this.acceptConfirmationSource = new rxjs.Subject();
            this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
            this.accept = this.acceptConfirmationSource.asObservable();
        }
        ConfirmationService.prototype.confirm = function (confirmation) {
            this.requireConfirmationSource.next(confirmation);
            return this;
        };
        ConfirmationService.prototype.close = function () {
            this.requireConfirmationSource.next(null);
            return this;
        };
        ConfirmationService.prototype.onAccept = function () {
            this.acceptConfirmationSource.next();
        };
        return ConfirmationService;
    }());
    ConfirmationService.decorators = [
        { type: i0.Injectable }
    ];

    var MessageService = /** @class */ (function () {
        function MessageService() {
            this.messageSource = new rxjs.Subject();
            this.clearSource = new rxjs.Subject();
            this.messageObserver = this.messageSource.asObservable();
            this.clearObserver = this.clearSource.asObservable();
        }
        MessageService.prototype.add = function (message) {
            if (message) {
                this.messageSource.next(message);
            }
        };
        MessageService.prototype.addAll = function (messages) {
            if (messages && messages.length) {
                this.messageSource.next(messages);
            }
        };
        MessageService.prototype.clear = function (key) {
            this.clearSource.next(key || null);
        };
        return MessageService;
    }());
    MessageService.decorators = [
        { type: i0.Injectable }
    ];

    var Header = /** @class */ (function () {
        function Header() {
        }
        return Header;
    }());
    Header.decorators = [
        { type: i0.Component, args: [{
                    selector: 'p-header',
                    template: '<ng-content></ng-content>'
                },] }
    ];
    var Footer = /** @class */ (function () {
        function Footer() {
        }
        return Footer;
    }());
    Footer.decorators = [
        { type: i0.Component, args: [{
                    selector: 'p-footer',
                    template: '<ng-content></ng-content>'
                },] }
    ];
    var PrimeTemplate = /** @class */ (function () {
        function PrimeTemplate(template) {
            this.template = template;
        }
        PrimeTemplate.prototype.getType = function () {
            return this.name;
        };
        return PrimeTemplate;
    }());
    PrimeTemplate.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[pTemplate]',
                    host: {}
                },] }
    ];
    PrimeTemplate.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    PrimeTemplate.propDecorators = {
        type: [{ type: i0.Input }],
        name: [{ type: i0.Input, args: ['pTemplate',] }]
    };
    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        return SharedModule;
    }());
    SharedModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Header, Footer, PrimeTemplate],
                    declarations: [Header, Footer, PrimeTemplate]
                },] }
    ];

    var TreeDragDropService = /** @class */ (function () {
        function TreeDragDropService() {
            this.dragStartSource = new rxjs.Subject();
            this.dragStopSource = new rxjs.Subject();
            this.dragStart$ = this.dragStartSource.asObservable();
            this.dragStop$ = this.dragStopSource.asObservable();
        }
        TreeDragDropService.prototype.startDrag = function (event) {
            this.dragStartSource.next(event);
        };
        TreeDragDropService.prototype.stopDrag = function (event) {
            this.dragStopSource.next(event);
        };
        return TreeDragDropService;
    }());
    TreeDragDropService.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConfirmationService = ConfirmationService;
    exports.Footer = Footer;
    exports.Header = Header;
    exports.MessageService = MessageService;
    exports.PrimeNGConfig = PrimeNGConfig;
    exports.PrimeTemplate = PrimeTemplate;
    exports.SharedModule = SharedModule;
    exports.TreeDragDropService = TreeDragDropService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-api.umd.js.map
