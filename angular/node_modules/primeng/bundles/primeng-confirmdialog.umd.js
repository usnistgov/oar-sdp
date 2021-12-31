(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/button')) :
    typeof define === 'function' && define.amd ? define('primeng/confirmdialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/button'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.confirmdialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.button));
}(this, (function (exports, core, animations, common, dom, api, button) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}', animations.style({ transform: 'none', opacity: 1 }))
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var ConfirmDialog = /** @class */ (function () {
        function ConfirmDialog(el, renderer, confirmationService, zone, cd) {
            var _this = this;
            this.el = el;
            this.renderer = renderer;
            this.confirmationService = confirmationService;
            this.zone = zone;
            this.cd = cd;
            this.acceptIcon = 'pi pi-check';
            this.acceptLabel = 'Yes';
            this.acceptVisible = true;
            this.rejectIcon = 'pi pi-times';
            this.rejectLabel = 'No';
            this.rejectVisible = true;
            this.closeOnEscape = true;
            this.blockScroll = true;
            this.closable = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.focusTrap = true;
            this.defaultFocus = 'accept';
            this._position = "center";
            this.transformOptions = "scale(0.7)";
            this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
                if (!confirmation) {
                    _this.hide();
                    return;
                }
                if (confirmation.key === _this.key) {
                    _this.confirmation = confirmation;
                    _this.confirmationOptions = {
                        message: _this.confirmation.message || _this.message,
                        icon: _this.confirmation.icon || _this.icon,
                        header: _this.confirmation.header || _this.header,
                        rejectVisible: _this.confirmation.rejectVisible == null ? _this.rejectVisible : _this.confirmation.rejectVisible,
                        acceptVisible: _this.confirmation.acceptVisible == null ? _this.acceptVisible : _this.confirmation.acceptVisible,
                        acceptLabel: _this.confirmation.acceptLabel || _this.acceptLabel,
                        rejectLabel: _this.confirmation.rejectLabel || _this.rejectLabel,
                        acceptIcon: _this.confirmation.acceptIcon || _this.acceptIcon,
                        rejectIcon: _this.confirmation.rejectIcon || _this.rejectIcon,
                        acceptButtonStyleClass: _this.confirmation.acceptButtonStyleClass || _this.acceptButtonStyleClass,
                        rejectButtonStyleClass: _this.confirmation.rejectButtonStyleClass || _this.rejectButtonStyleClass,
                        defaultFocus: _this.confirmation.defaultFocus || _this.defaultFocus,
                        blockScroll: (_this.confirmation.blockScroll === false || _this.confirmation.blockScroll === true) ? _this.confirmation.blockScroll : _this.blockScroll
                    };
                    if (_this.confirmation.accept) {
                        _this.confirmation.acceptEvent = new core.EventEmitter();
                        _this.confirmation.acceptEvent.subscribe(_this.confirmation.accept);
                    }
                    if (_this.confirmation.reject) {
                        _this.confirmation.rejectEvent = new core.EventEmitter();
                        _this.confirmation.rejectEvent.subscribe(_this.confirmation.reject);
                    }
                    _this.visible = true;
                }
            });
        }
        Object.defineProperty(ConfirmDialog.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                if (this._visible && !this.maskVisible) {
                    this.maskVisible = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfirmDialog.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                switch (value) {
                    case 'topleft':
                    case 'bottomleft':
                    case 'left':
                        this.transformOptions = "translate3d(-100%, 0px, 0px)";
                        break;
                    case 'topright':
                    case 'bottomright':
                    case 'right':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'bottom':
                        this.transformOptions = "translate3d(0px, 100%, 0px)";
                        break;
                    case 'top':
                        this.transformOptions = "translate3d(0px, -100%, 0px)";
                        break;
                    default:
                        this.transformOptions = "scale(0.7)";
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        ConfirmDialog.prototype.option = function (name) {
            var source = this.confirmationOptions || this;
            if (source.hasOwnProperty(name)) {
                return source[name];
            }
            return undefined;
        };
        ConfirmDialog.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.contentContainer = dom.DomHandler.findSingle(this.container, '.ui-dialog-content');
                    var element = this.getElementToFocus();
                    if (element) {
                        element.focus();
                    }
                    this.appendContainer();
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    this.enableModality();
                    break;
            }
        };
        ConfirmDialog.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        ConfirmDialog.prototype.getElementToFocus = function () {
            switch (this.option('defaultFocus')) {
                case 'accept':
                    return dom.DomHandler.findSingle(this.container, 'button.ui-confirmdialog-acceptbutton');
                case 'reject':
                    return dom.DomHandler.findSingle(this.container, 'button.ui-confirmdialog-rejectbutton');
                case 'close':
                    return dom.DomHandler.findSingle(this.container, 'a.ui-dialog-titlebar-close');
                case 'none':
                    return null;
                //backward compatibility
                default:
                    return dom.DomHandler.findSingle(this.container, 'button.ui-confirmdialog-acceptbutton');
            }
        };
        ConfirmDialog.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.wrapper);
                else
                    dom.DomHandler.appendChild(this.wrapper, this.appendTo);
            }
        };
        ConfirmDialog.prototype.restoreAppend = function () {
            if (this.wrapper && this.appendTo) {
                this.el.nativeElement.appendChild(this.wrapper);
            }
        };
        ConfirmDialog.prototype.enableModality = function () {
            if (this.option('blockScroll')) {
                dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        };
        ConfirmDialog.prototype.disableModality = function () {
            this.maskVisible = false;
            if (this.option('blockScroll')) {
                dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            if (this.container) {
                this.cd.detectChanges();
            }
        };
        ConfirmDialog.prototype.close = function (event) {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit();
            }
            this.hide();
            event.preventDefault();
        };
        ConfirmDialog.prototype.hide = function () {
            this.visible = false;
            this.confirmation = null;
            this.confirmationOptions = null;
        };
        ConfirmDialog.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                this.wrapper.style.zIndex = String(this.baseZIndex + (dom.DomHandler.zindex - 1));
            }
        };
        ConfirmDialog.prototype.getMaskClass = function () {
            var maskClass = { 'ui-widget-overlay ui-dialog-mask': true, 'ui-dialog-visible': this.maskVisible, 'ui-dialog-mask-scrollblocker': this.blockScroll };
            maskClass[this.getPositionClass().toString()] = true;
            return maskClass;
        };
        ConfirmDialog.prototype.getPositionClass = function () {
            var _this = this;
            var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
            var pos = positions.find(function (item) { return item === _this.position; });
            return pos ? "ui-dialog-" + pos : '';
        };
        ConfirmDialog.prototype.bindGlobalListeners = function () {
            var _this = this;
            if ((this.closeOnEscape && this.closable) || this.focusTrap && !this.documentEscapeListener) {
                this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                    if (event.which == 27 && (_this.closeOnEscape && _this.closable)) {
                        if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex) && _this.visible) {
                            _this.close(event);
                        }
                    }
                    if (event.which === 9 && _this.focusTrap) {
                        event.preventDefault();
                        var focusableElements = dom.DomHandler.getFocusableElements(_this.container);
                        if (focusableElements && focusableElements.length > 0) {
                            if (!document.activeElement) {
                                focusableElements[0].focus();
                            }
                            else {
                                var focusedIndex = focusableElements.indexOf(document.activeElement);
                                if (event.shiftKey) {
                                    if (focusedIndex == -1 || focusedIndex === 0)
                                        focusableElements[focusableElements.length - 1].focus();
                                    else
                                        focusableElements[focusedIndex - 1].focus();
                                }
                                else {
                                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                        focusableElements[0].focus();
                                    else
                                        focusableElements[focusedIndex + 1].focus();
                                }
                            }
                        }
                    }
                });
            }
        };
        ConfirmDialog.prototype.unbindGlobalListeners = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        ConfirmDialog.prototype.onOverlayHide = function () {
            this.disableModality();
            this.unbindGlobalListeners();
            this.container = null;
        };
        ConfirmDialog.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.onOverlayHide();
            this.subscription.unsubscribe();
        };
        ConfirmDialog.prototype.accept = function () {
            if (this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.emit();
            }
            this.hide();
        };
        ConfirmDialog.prototype.reject = function () {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit();
            }
            this.hide();
        };
        ConfirmDialog.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: api.ConfirmationService },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "message", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "maskStyleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptIcon", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptLabel", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptVisible", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectIcon", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectLabel", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectVisible", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptButtonStyleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectButtonStyleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "closeOnEscape", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "blockScroll", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rtl", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "closable", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "transitionOptions", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "focusTrap", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "defaultFocus", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "visible", null);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "position", null);
        __decorate([
            core.ContentChild(api.Footer)
        ], ConfirmDialog.prototype, "footer", void 0);
        __decorate([
            core.ViewChild('content')
        ], ConfirmDialog.prototype, "contentViewChild", void 0);
        ConfirmDialog = __decorate([
            core.Component({
                selector: 'p-confirmDialog',
                template: "\n        <div [class]=\"maskStyleClass\" [ngClass]=\"getMaskClass()\" *ngIf=\"maskVisible\">\n            <div [ngClass]=\"{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" *ngIf=\"visible\">\n                <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\">\n                    <span class=\"ui-dialog-title\" *ngIf=\"option('header')\">{{option('header')}}</span>\n                    <div class=\"ui-dialog-titlebar-icons\">\n                        <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span class=\"pi pi-times\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div #content class=\"ui-dialog-content ui-widget-content\">\n                    <i [ngClass]=\"'ui-confirmdialog-icon'\" [class]=\"option('icon')\" *ngIf=\"option('icon')\"></i>\n                    <span class=\"ui-confirmdialog-message\" [innerHTML]=\"option('message')\"></span>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footer\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"!footer\">\n                    <button type=\"button\" pButton [icon]=\"option('acceptIcon')\" [label]=\"option('acceptLabel')\" (click)=\"accept()\" [ngClass]=\"'ui-confirmdialog-acceptbutton'\" [class]=\"option('acceptButtonStyleClass')\" *ngIf=\"option('acceptVisible')\"></button>\n                    <button type=\"button\" pButton [icon]=\"option('rejectIcon')\" [label]=\"option('rejectLabel')\" (click)=\"reject()\" [ngClass]=\"'ui-confirmdialog-rejectbutton'\" [class]=\"option('rejectButtonStyleClass')\" *ngIf=\"option('rejectVisible')\"></button>\n                </div>\n            </div>\n        </div>\n    ",
                animations: [
                    animations.trigger('animation', [
                        animations.transition('void => visible', [
                            animations.useAnimation(showAnimation)
                        ]),
                        animations.transition('visible => void', [
                            animations.useAnimation(hideAnimation)
                        ])
                    ])
                ],
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], ConfirmDialog);
        return ConfirmDialog;
    }());
    var ConfirmDialogModule = /** @class */ (function () {
        function ConfirmDialogModule() {
        }
        ConfirmDialogModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, button.ButtonModule],
                exports: [ConfirmDialog, button.ButtonModule, api.SharedModule],
                declarations: [ConfirmDialog]
            })
        ], ConfirmDialogModule);
        return ConfirmDialogModule;
    }());

    exports.ConfirmDialog = ConfirmDialog;
    exports.ConfirmDialogModule = ConfirmDialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-confirmdialog.umd.js.map
