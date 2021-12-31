(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('primeng/overlaypanel', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api', '@angular/animations'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.overlaypanel = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api, global.ng.animations));
}(this, (function (exports, core, common, dom, api, animations) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var OverlayPanel = /** @class */ (function () {
        function OverlayPanel(el, renderer, cd, zone) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.dismissable = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '225ms ease-out';
            this.hideTransitionOptions = '195ms ease-in';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.overlayVisible = false;
            this.render = false;
            this.isContainerClicked = true;
        }
        OverlayPanel.prototype.ngAfterContentInit = function () {
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
        };
        OverlayPanel.prototype.onContainerClick = function () {
            this.isContainerClicked = true;
        };
        OverlayPanel.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener && this.dismissable) {
                this.zone.runOutsideAngular(function () {
                    var documentEvent = dom.DomHandler.isIOS() ? 'touchstart' : 'click';
                    _this.documentClickListener = _this.renderer.listen('document', documentEvent, function (event) {
                        if (!_this.container.contains(event.target) && _this.target !== event.target && !_this.target.contains(event.target) && !_this.isContainerClicked) {
                            _this.zone.run(function () {
                                _this.hide();
                            });
                        }
                        _this.isContainerClicked = false;
                        _this.cd.markForCheck();
                    });
                });
            }
        };
        OverlayPanel.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        OverlayPanel.prototype.toggle = function (event, target) {
            var _this = this;
            if (this.overlayVisible) {
                if (this.hasTargetChanged(event, target)) {
                    this.destroyCallback = function () {
                        _this.show(null, (target || event.currentTarget || event.target));
                    };
                }
                this.overlayVisible = false;
            }
            else {
                this.show(event, target);
            }
        };
        OverlayPanel.prototype.show = function (event, target) {
            this.target = target || event.currentTarget || event.target;
            this.overlayVisible = true;
            this.render = true;
        };
        OverlayPanel.prototype.hasTargetChanged = function (event, target) {
            return this.target != null && this.target !== (target || event.currentTarget || event.target);
        };
        OverlayPanel.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        OverlayPanel.prototype.restoreAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        OverlayPanel.prototype.align = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            dom.DomHandler.absolutePosition(this.container, this.target);
            if (dom.DomHandler.getOffset(this.container).top < dom.DomHandler.getOffset(this.target).top) {
                dom.DomHandler.addClass(this.container, 'ui-overlaypanel-flipped');
            }
            if (Math.floor(dom.DomHandler.getOffset(this.container).left) < Math.floor(dom.DomHandler.getOffset(this.target).left) &&
                dom.DomHandler.getOffset(this.container).left > 0) {
                dom.DomHandler.addClass(this.container, 'ui-overlaypanel-shifted');
            }
        };
        OverlayPanel.prototype.onAnimationStart = function (event) {
            if (event.toState === 'open') {
                this.container = event.element;
                this.onShow.emit(null);
                this.appendContainer();
                this.align();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
            }
        };
        OverlayPanel.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    if (this.destroyCallback) {
                        this.destroyCallback();
                        this.destroyCallback = null;
                    }
                    break;
                case 'close':
                    this.onContainerDestroy();
                    this.onHide.emit({});
                    this.render = false;
                    break;
            }
        };
        OverlayPanel.prototype.hide = function () {
            this.overlayVisible = false;
        };
        OverlayPanel.prototype.onCloseClick = function (event) {
            this.hide();
            event.preventDefault();
        };
        OverlayPanel.prototype.onWindowResize = function (event) {
            this.hide();
        };
        OverlayPanel.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        OverlayPanel.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        OverlayPanel.prototype.onContainerDestroy = function () {
            this.target = null;
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
        };
        OverlayPanel.prototype.ngOnDestroy = function () {
            this.target = null;
            this.destroyCallback = null;
            if (this.container) {
                this.restoreAppend();
                this.onContainerDestroy();
            }
        };
        OverlayPanel.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "dismissable", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "showCloseIcon", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "ariaCloseLabel", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "showTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], OverlayPanel.prototype, "hideTransitionOptions", void 0);
        __decorate([
            core.Output()
        ], OverlayPanel.prototype, "onShow", void 0);
        __decorate([
            core.Output()
        ], OverlayPanel.prototype, "onHide", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], OverlayPanel.prototype, "templates", void 0);
        OverlayPanel = __decorate([
            core.Component({
                selector: 'p-overlayPanel',
                template: "\n        <div *ngIf=\"render\" [ngClass]=\"'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onContainerClick()\"\n            [@animation]=\"{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" \n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div class=\"ui-overlaypanel-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n            <a tabindex=\"0\" *ngIf=\"showCloseIcon\" class=\"ui-overlaypanel-close ui-state-default\" (click)=\"onCloseClick($event)\" (keydown.enter)=\"hide()\" [attr.aria-label]=\"ariaCloseLabel\">\n                <span class=\"ui-overlaypanel-close-icon pi pi-times\"></span>\n            </a>\n        </div>\n    ",
                animations: [
                    animations.trigger('animation', [
                        animations.state('void', animations.style({
                            transform: 'translateY(5%)',
                            opacity: 0
                        })),
                        animations.state('close', animations.style({
                            transform: 'translateY(5%)',
                            opacity: 0
                        })),
                        animations.state('open', animations.style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                        animations.transition('open => close', animations.animate('{{hideTransitionParams}}'))
                    ])
                ],
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], OverlayPanel);
        return OverlayPanel;
    }());
    var OverlayPanelModule = /** @class */ (function () {
        function OverlayPanelModule() {
        }
        OverlayPanelModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [OverlayPanel],
                declarations: [OverlayPanel]
            })
        ], OverlayPanelModule);
        return OverlayPanelModule;
    }());

    exports.OverlayPanel = OverlayPanel;
    exports.OverlayPanelModule = OverlayPanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-overlaypanel.umd.js.map
