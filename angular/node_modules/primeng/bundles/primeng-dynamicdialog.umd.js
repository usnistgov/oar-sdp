(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('primeng/dynamicdialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'rxjs'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.dynamicdialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.rxjs));
}(this, (function (exports, core, animations, common, dom, rxjs) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DynamicDialogContent = /** @class */ (function () {
        function DynamicDialogContent(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        DynamicDialogContent.ctorParameters = function () { return [
            { type: core.ViewContainerRef }
        ]; };
        DynamicDialogContent = __decorate([
            core.Directive({
                selector: '[pDynamicDialogContent]'
            })
        ], DynamicDialogContent);
        return DynamicDialogContent;
    }());

    var DynamicDialogConfig = /** @class */ (function () {
        function DynamicDialogConfig() {
        }
        return DynamicDialogConfig;
    }());

    var DynamicDialogRef = /** @class */ (function () {
        function DynamicDialogRef() {
            this._onClose = new rxjs.Subject();
            this.onClose = this._onClose.asObservable();
            this._onDestroy = new rxjs.Subject();
            this.onDestroy = this._onDestroy.asObservable();
        }
        DynamicDialogRef.prototype.close = function (result) {
            this._onClose.next(result);
        };
        DynamicDialogRef.prototype.destroy = function () {
            this._onDestroy.next();
        };
        return DynamicDialogRef;
    }());

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
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
    var DynamicDialogComponent = /** @class */ (function () {
        function DynamicDialogComponent(componentFactoryResolver, cd, renderer, config, dialogRef, zone) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.cd = cd;
            this.renderer = renderer;
            this.config = config;
            this.dialogRef = dialogRef;
            this.zone = zone;
            this.visible = true;
            this.transformOptions = "scale(0.7)";
        }
        DynamicDialogComponent.prototype.ngAfterViewInit = function () {
            this.loadChildComponent(this.childComponentType);
            this.cd.detectChanges();
        };
        DynamicDialogComponent.prototype.loadChildComponent = function (componentType) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
            var viewContainerRef = this.insertionPoint.viewContainerRef;
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
        };
        DynamicDialogComponent.prototype.moveOnTop = function () {
            if (this.config.autoZIndex !== false) {
                var zIndex = (this.config.baseZIndex || 0) + (++dom.DomHandler.zindex);
                this.container.style.zIndex = String(zIndex);
                this.maskViewChild.nativeElement.style.zIndex = String(zIndex - 1);
            }
        };
        DynamicDialogComponent.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    if (this.config.modal !== false) {
                        this.enableModality();
                    }
                    this.focus();
                    break;
                case 'void':
                    this.onContainerDestroy();
                    break;
            }
        };
        DynamicDialogComponent.prototype.onAnimationEnd = function (event) {
            if (event.toState === 'void') {
                this.dialogRef.destroy();
            }
        };
        DynamicDialogComponent.prototype.onContainerDestroy = function () {
            this.unbindGlobalListeners();
            if (this.config.modal !== false) {
                this.disableModality();
            }
            this.container = null;
        };
        DynamicDialogComponent.prototype.close = function () {
            this.visible = false;
        };
        DynamicDialogComponent.prototype.enableModality = function () {
            var _this = this;
            if (this.config.closable !== false && this.config.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.wrapper, 'click', function (event) {
                    if (_this.wrapper && _this.wrapper.isSameNode(event.target)) {
                        _this.close();
                    }
                });
            }
            if (this.config.modal !== false) {
                dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        };
        DynamicDialogComponent.prototype.disableModality = function () {
            if (this.wrapper) {
                if (this.config.dismissableMask) {
                    this.unbindMaskClickListener();
                }
                if (this.config.modal !== false) {
                    dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
                if (!this.cd.destroyed) {
                    this.cd.detectChanges();
                }
            }
        };
        DynamicDialogComponent.prototype.onKeydown = function (event) {
            if (event.which === 9) {
                event.preventDefault();
                var focusableElements = dom.DomHandler.getFocusableElements(this.container);
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
        };
        DynamicDialogComponent.prototype.focus = function () {
            var focusable = dom.DomHandler.findSingle(this.container, 'a');
            if (focusable) {
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () { return focusable.focus(); }, 5);
                });
            }
        };
        DynamicDialogComponent.prototype.bindGlobalListeners = function () {
            this.bindDocumentKeydownListener();
            if (this.config.closeOnEscape !== false && this.config.closable !== false) {
                this.bindDocumentEscapeListener();
            }
        };
        DynamicDialogComponent.prototype.unbindGlobalListeners = function () {
            this.unbindDocumentKeydownListener();
            this.unbindDocumentEscapeListener();
        };
        DynamicDialogComponent.prototype.bindDocumentKeydownListener = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentKeydownListener = _this.onKeydown.bind(_this);
                window.document.addEventListener('keydown', _this.documentKeydownListener);
            });
        };
        DynamicDialogComponent.prototype.unbindDocumentKeydownListener = function () {
            if (this.documentKeydownListener) {
                window.document.removeEventListener('keydown', this.documentKeydownListener);
                this.documentKeydownListener = null;
            }
        };
        DynamicDialogComponent.prototype.bindDocumentEscapeListener = function () {
            var _this = this;
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) == (dom.DomHandler.zindex + (_this.config.baseZIndex ? _this.config.baseZIndex : 0))) {
                        _this.close();
                    }
                }
            });
        };
        DynamicDialogComponent.prototype.unbindDocumentEscapeListener = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        DynamicDialogComponent.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        DynamicDialogComponent.prototype.ngOnDestroy = function () {
            this.onContainerDestroy();
            if (this.componentRef) {
                this.componentRef.destroy();
            }
        };
        DynamicDialogComponent.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 },
            { type: DynamicDialogConfig },
            { type: DynamicDialogRef },
            { type: core.NgZone }
        ]; };
        __decorate$1([
            core.ViewChild(DynamicDialogContent)
        ], DynamicDialogComponent.prototype, "insertionPoint", void 0);
        __decorate$1([
            core.ViewChild('mask')
        ], DynamicDialogComponent.prototype, "maskViewChild", void 0);
        DynamicDialogComponent = __decorate$1([
            core.Component({
                selector: 'p-dynamicDialog',
                template: "\n        <div #mask [ngClass]=\"{'ui-dialog-mask ui-dialog-visible':true, 'ui-widget-overlay ui-dialog-mask-scrollblocker': config.modal !== false}\">\n            <div [ngClass]=\"{'ui-dialog ui-dynamicdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl': config.rtl}\" [ngStyle]=\"config.style\" [class]=\"config.styleClass\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}\"\n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" role=\"dialog\" *ngIf=\"visible\"\n                [style.width]=\"config.width\" [style.height]=\"config.height\">\n                <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\" *ngIf=\"config.showHeader === false ? false: true\">\n                    <span class=\"ui-dialog-title\">{{config.header}}</span>\n                    <div class=\"ui-dialog-titlebar-icons\">\n                        <a [ngClass]=\"'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all'\" tabindex=\"0\" role=\"button\" (click)=\"close()\" (keydown.enter)=\"close()\" *ngIf=\"config.closable !== false\">\n                            <span class=\"pi pi-times\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"ui-dialog-content ui-widget-content\" [ngStyle]=\"config.contentStyle\">\n                    <ng-template pDynamicDialogContent></ng-template>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"config.footer\">\n                    {{config.footer}}\n                </div>\n            </div>\n        </div>\n\t",
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
        ], DynamicDialogComponent);
        return DynamicDialogComponent;
    }());
    var DynamicDialogModule = /** @class */ (function () {
        function DynamicDialogModule() {
        }
        DynamicDialogModule = __decorate$1([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [DynamicDialogComponent, DynamicDialogContent],
                entryComponents: [DynamicDialogComponent]
            })
        ], DynamicDialogModule);
        return DynamicDialogModule;
    }());

    var DynamicDialogInjector = /** @class */ (function () {
        function DynamicDialogInjector(_parentInjector, _additionalTokens) {
            this._parentInjector = _parentInjector;
            this._additionalTokens = _additionalTokens;
        }
        DynamicDialogInjector.prototype.get = function (token, notFoundValue, flags) {
            var value = this._additionalTokens.get(token);
            if (value)
                return value;
            return this._parentInjector.get(token, notFoundValue);
        };
        return DynamicDialogInjector;
    }());

    var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DialogService = /** @class */ (function () {
        function DialogService(componentFactoryResolver, appRef, injector) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
        }
        DialogService.prototype.open = function (componentType, config) {
            var dialogRef = this.appendDialogComponentToBody(config);
            this.dialogComponentRef.instance.childComponentType = componentType;
            return dialogRef;
        };
        DialogService.prototype.appendDialogComponentToBody = function (config) {
            var _this = this;
            var map = new WeakMap();
            map.set(DynamicDialogConfig, config);
            var dialogRef = new DynamicDialogRef();
            map.set(DynamicDialogRef, dialogRef);
            var sub = dialogRef.onClose.subscribe(function () {
                _this.dialogComponentRef.instance.close();
            });
            var destroySub = dialogRef.onDestroy.subscribe(function () {
                _this.removeDialogComponentFromBody();
                destroySub.unsubscribe();
                sub.unsubscribe();
            });
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
            var componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
            this.appRef.attachView(componentRef.hostView);
            var domElem = componentRef.hostView.rootNodes[0];
            document.body.appendChild(domElem);
            this.dialogComponentRef = componentRef;
            return dialogRef;
        };
        DialogService.prototype.removeDialogComponentFromBody = function () {
            this.appRef.detachView(this.dialogComponentRef.hostView);
            this.dialogComponentRef.destroy();
        };
        DialogService.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.ApplicationRef },
            { type: core.Injector }
        ]; };
        DialogService = __decorate$2([
            core.Injectable()
        ], DialogService);
        return DialogService;
    }());

    exports.DialogService = DialogService;
    exports.DynamicDialogComponent = DynamicDialogComponent;
    exports.DynamicDialogConfig = DynamicDialogConfig;
    exports.DynamicDialogInjector = DynamicDialogInjector;
    exports.DynamicDialogModule = DynamicDialogModule;
    exports.DynamicDialogRef = DynamicDialogRef;
    exports.ɵa = DynamicDialogContent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dynamicdialog.umd.js.map
