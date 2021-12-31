(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/focustrap')) :
    typeof define === 'function' && define.amd ? define('primeng/dialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/focustrap'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.dialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.focustrap));
}(this, (function (exports, core, animations, common, dom, api, focustrap) { 'use strict';

    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var idx = 0;
    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}', animations.style({ transform: 'none', opacity: 1 }))
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var Dialog = /** @class */ (function () {
        function Dialog(el, renderer, zone, cd) {
            this.el = el;
            this.renderer = renderer;
            this.zone = zone;
            this.cd = cd;
            this.draggable = true;
            this.resizable = true;
            this.closeOnEscape = true;
            this.closable = true;
            this.showHeader = true;
            this.blockScroll = false;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.minX = 0;
            this.minY = 0;
            this.focusOnShow = true;
            this.keepInViewport = true;
            this.focusTrap = true;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.closeIcon = 'pi pi-times';
            this.minimizeIcon = 'pi pi-window-minimize';
            this.maximizeIcon = 'pi pi-window-maximize';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.visibleChange = new core.EventEmitter();
            this.onResizeInit = new core.EventEmitter();
            this.onResizeEnd = new core.EventEmitter();
            this.onDragEnd = new core.EventEmitter();
            this.id = "ui-dialog-" + idx++;
            this._style = {};
            this._position = "center";
            this.transformOptions = "scale(0.7)";
        }
        Object.defineProperty(Dialog.prototype, "positionLeft", {
            get: function () {
                return 0;
            },
            set: function (_positionLeft) {
                console.log("positionLeft property is deprecated.");
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Dialog.prototype, "positionTop", {
            get: function () {
                return 0;
            },
            set: function (_positionTop) {
                console.log("positionTop property is deprecated.");
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Dialog.prototype, "responsive", {
            get: function () {
                return false;
            },
            set: function (_responsive) {
                console.log("Responsive property is deprecated.");
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Dialog.prototype, "breakpoint", {
            get: function () {
                return 649;
            },
            set: function (_breakpoint) {
                console.log("Breakpoint property is not utilized and deprecated, use CSS media queries instead.");
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Dialog.prototype, "visible", {
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
        Object.defineProperty(Dialog.prototype, "style", {
            get: function () {
                return this._style;
            },
            set: function (value) {
                if (value) {
                    this._style = __assign({}, value);
                    this.originalStyle = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dialog.prototype, "position", {
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
        Dialog.prototype.focus = function () {
            var focusable = dom.DomHandler.findSingle(this.container, 'button');
            if (focusable) {
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () { return focusable.focus(); }, 5);
                });
            }
        };
        Dialog.prototype.close = function (event) {
            this.visibleChange.emit(false);
            event.preventDefault();
        };
        Dialog.prototype.enableModality = function () {
            var _this = this;
            if (this.closable && this.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.wrapper, 'click', function (event) {
                    if (_this.wrapper && _this.wrapper.isSameNode(event.target)) {
                        _this.close(event);
                    }
                });
            }
            if (this.modal) {
                dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        };
        Dialog.prototype.disableModality = function () {
            if (this.wrapper) {
                if (this.dismissableMask) {
                    this.unbindMaskClickListener();
                }
                if (this.modal) {
                    dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
                if (!this.cd.destroyed) {
                    this.cd.detectChanges();
                }
            }
        };
        Dialog.prototype.maximize = function () {
            this.maximized = !this.maximized;
            if (!this.modal && !this.blockScroll) {
                if (this.maximized)
                    dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
                else
                    dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
        };
        Dialog.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        Dialog.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                this.wrapper.style.zIndex = String(this.baseZIndex + (dom.DomHandler.zindex - 1));
            }
        };
        Dialog.prototype.initDrag = function (event) {
            if (dom.DomHandler.hasClass(event.target, 'ui-dialog-titlebar-icon') || dom.DomHandler.hasClass(event.target.parentElement, 'ui-dialog-titlebar-icon')) {
                return;
            }
            if (this.draggable) {
                this.dragging = true;
                this.lastPageX = event.pageX;
                this.lastPageY = event.pageY;
                this.container.style.margin = '0';
                dom.DomHandler.addClass(document.body, 'ui-unselectable-text');
            }
        };
        Dialog.prototype.onKeydown = function (event) {
            if (this.focusTrap) {
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
            }
        };
        Dialog.prototype.onDrag = function (event) {
            if (this.dragging) {
                var containerWidth = dom.DomHandler.getOuterWidth(this.container);
                var containerHeight = dom.DomHandler.getOuterHeight(this.container);
                var deltaX = event.pageX - this.lastPageX;
                var deltaY = event.pageY - this.lastPageY;
                var offset = dom.DomHandler.getOffset(this.container);
                var leftPos = offset.left + deltaX;
                var topPos = offset.top + deltaY;
                var viewport = dom.DomHandler.getViewport();
                this.container.style.position = 'fixed';
                if (this.keepInViewport) {
                    if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
                        this._style.left = leftPos + 'px';
                        this.lastPageX = event.pageX;
                        this.container.style.left = leftPos + 'px';
                    }
                    if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
                        this._style.top = topPos + 'px';
                        this.lastPageY = event.pageY;
                        this.container.style.top = topPos + 'px';
                    }
                }
                else {
                    this.lastPageX = event.pageX;
                    this.container.style.left = leftPos + 'px';
                    this.lastPageY = event.pageY;
                    this.container.style.top = topPos + 'px';
                }
            }
        };
        Dialog.prototype.endDrag = function (event) {
            if (this.dragging) {
                this.dragging = false;
                dom.DomHandler.removeClass(document.body, 'ui-unselectable-text');
                this.cd.detectChanges();
                this.onDragEnd.emit(event);
            }
        };
        Dialog.prototype.resetPosition = function () {
            this.container.style.position = '';
            this.container.style.left = '';
            this.container.style.top = '';
            this.container.style.margin = '';
        };
        //backward compatibility
        Dialog.prototype.center = function () {
            this.resetPosition();
        };
        Dialog.prototype.initResize = function (event) {
            if (this.resizable) {
                this.resizing = true;
                this.lastPageX = event.pageX;
                this.lastPageY = event.pageY;
                dom.DomHandler.addClass(document.body, 'ui-unselectable-text');
                this.onResizeInit.emit(event);
            }
        };
        Dialog.prototype.onResize = function (event) {
            if (this.resizing) {
                var deltaX = event.pageX - this.lastPageX;
                var deltaY = event.pageY - this.lastPageY;
                var containerWidth = dom.DomHandler.getOuterWidth(this.container);
                var containerHeight = dom.DomHandler.getOuterHeight(this.container);
                var contentHeight = dom.DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
                var newWidth = containerWidth + deltaX;
                var newHeight = containerHeight + deltaY;
                var minWidth = this.container.style.minWidth;
                var minHeight = this.container.style.minHeight;
                var offset = dom.DomHandler.getOffset(this.container);
                var viewport = dom.DomHandler.getViewport();
                var hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);
                if (hasBeenDragged) {
                    newWidth += deltaX;
                    newHeight += deltaY;
                }
                if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
                    this._style.width = newWidth + 'px';
                    this.container.style.width = this._style.width;
                }
                if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
                    this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';
                    if (this._style.height) {
                        this._style.height = newHeight + 'px';
                        this.container.style.height = this._style.height;
                    }
                }
                this.lastPageX = event.pageX;
                this.lastPageY = event.pageY;
            }
        };
        Dialog.prototype.resizeEnd = function (event) {
            if (this.resizing) {
                this.resizing = false;
                dom.DomHandler.removeClass(document.body, 'ui-unselectable-text');
                this.onResizeEnd.emit(event);
            }
        };
        Dialog.prototype.bindGlobalListeners = function () {
            if (this.draggable) {
                this.bindDocumentDragListener();
                this.bindDocumentDragEndListener();
            }
            if (this.resizable) {
                this.bindDocumentResizeListeners();
            }
            if (this.closeOnEscape && this.closable) {
                this.bindDocumentEscapeListener();
            }
        };
        Dialog.prototype.unbindGlobalListeners = function () {
            this.unbindDocumentDragListener();
            this.unbindDocumentDragEndListener();
            this.unbindDocumentResizeListeners();
            this.unbindDocumentEscapeListener();
        };
        Dialog.prototype.bindDocumentDragListener = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentDragListener = _this.onDrag.bind(_this);
                window.document.addEventListener('mousemove', _this.documentDragListener);
            });
        };
        Dialog.prototype.unbindDocumentDragListener = function () {
            if (this.documentDragListener) {
                window.document.removeEventListener('mousemove', this.documentDragListener);
                this.documentDragListener = null;
            }
        };
        Dialog.prototype.bindDocumentDragEndListener = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentDragEndListener = _this.endDrag.bind(_this);
                window.document.addEventListener('mouseup', _this.documentDragEndListener);
            });
        };
        Dialog.prototype.unbindDocumentDragEndListener = function () {
            if (this.documentDragEndListener) {
                window.document.removeEventListener('mouseup', this.documentDragEndListener);
                this.documentDragEndListener = null;
            }
        };
        Dialog.prototype.bindDocumentResizeListeners = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentResizeListener = _this.onResize.bind(_this);
                _this.documentResizeEndListener = _this.resizeEnd.bind(_this);
                window.document.addEventListener('mousemove', _this.documentResizeListener);
                window.document.addEventListener('mouseup', _this.documentResizeEndListener);
            });
        };
        Dialog.prototype.unbindDocumentResizeListeners = function () {
            if (this.documentResizeListener && this.documentResizeEndListener) {
                window.document.removeEventListener('mousemove', this.documentResizeListener);
                window.document.removeEventListener('mouseup', this.documentResizeEndListener);
                this.documentResizeListener = null;
                this.documentResizeEndListener = null;
            }
        };
        Dialog.prototype.bindDocumentEscapeListener = function () {
            var _this = this;
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex)) {
                        _this.close(event);
                    }
                }
            });
        };
        Dialog.prototype.unbindDocumentEscapeListener = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        Dialog.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.wrapper);
                else
                    dom.DomHandler.appendChild(this.wrapper, this.appendTo);
            }
        };
        Dialog.prototype.restoreAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.wrapper);
            }
        };
        Dialog.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.onShow.emit({});
                    this.appendContainer();
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    if (this.modal) {
                        this.enableModality();
                    }
                    if (!this.modal && this.blockScroll) {
                        dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
                    }
                    if (this.focusOnShow) {
                        this.focus();
                    }
                    break;
            }
        };
        Dialog.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onContainerDestroy();
                    this.onHide.emit({});
                    break;
            }
        };
        Dialog.prototype.onContainerDestroy = function () {
            this.unbindGlobalListeners();
            this.dragging = false;
            this.maskVisible = false;
            if (this.maximized) {
                dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                this.maximized = false;
            }
            if (this.modal) {
                this.disableModality();
            }
            if (this.blockScroll) {
                dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.container = null;
            this.wrapper = null;
            this._style = this.originalStyle ? __assign({}, this.originalStyle) : {};
        };
        Dialog.prototype.ngOnDestroy = function () {
            if (this.container) {
                this.restoreAppend();
                this.onContainerDestroy();
            }
        };
        Dialog.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], Dialog.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "draggable", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "resizable", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "positionLeft", null);
        __decorate([
            core.Input()
        ], Dialog.prototype, "positionTop", null);
        __decorate([
            core.Input()
        ], Dialog.prototype, "contentStyle", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "contentStyleClass", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "modal", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "closeOnEscape", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "dismissableMask", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "rtl", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "closable", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "responsive", null);
        __decorate([
            core.Input()
        ], Dialog.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "maskStyleClass", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "showHeader", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "breakpoint", null);
        __decorate([
            core.Input()
        ], Dialog.prototype, "blockScroll", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "minX", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "minY", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "focusOnShow", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "maximizable", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "keepInViewport", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "focusTrap", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "transitionOptions", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "closeIcon", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "minimizeIcon", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "maximizeIcon", void 0);
        __decorate([
            core.ContentChildren(api.Header, { descendants: false })
        ], Dialog.prototype, "headerFacet", void 0);
        __decorate([
            core.ContentChildren(api.Footer, { descendants: false })
        ], Dialog.prototype, "footerFacet", void 0);
        __decorate([
            core.ViewChild('titlebar')
        ], Dialog.prototype, "headerViewChild", void 0);
        __decorate([
            core.ViewChild('content')
        ], Dialog.prototype, "contentViewChild", void 0);
        __decorate([
            core.ViewChild('footer')
        ], Dialog.prototype, "footerViewChild", void 0);
        __decorate([
            core.Output()
        ], Dialog.prototype, "onShow", void 0);
        __decorate([
            core.Output()
        ], Dialog.prototype, "onHide", void 0);
        __decorate([
            core.Output()
        ], Dialog.prototype, "visibleChange", void 0);
        __decorate([
            core.Output()
        ], Dialog.prototype, "onResizeInit", void 0);
        __decorate([
            core.Output()
        ], Dialog.prototype, "onResizeEnd", void 0);
        __decorate([
            core.Output()
        ], Dialog.prototype, "onDragEnd", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "visible", null);
        __decorate([
            core.Input()
        ], Dialog.prototype, "style", null);
        __decorate([
            core.Input()
        ], Dialog.prototype, "position", null);
        Dialog = __decorate([
            core.Component({
                selector: 'p-dialog',
                template: "\n        <div *ngIf=\"maskVisible\" [class]=\"maskStyleClass\" \n            [ngClass]=\"{'ui-dialog-mask': true, 'ui-widget-overlay': this.modal, 'ui-dialog-visible': this.maskVisible, 'ui-dialog-mask-scrollblocker': this.modal || this.blockScroll,\n                'ui-dialog-left': position === 'left',\n                'ui-dialog-right': position === 'right',\n                'ui-dialog-top': position === 'top',\n                'ui-dialog-topleft': position === 'topleft',\n                'ui-dialog-topright': position === 'topright',\n                'ui-dialog-bottom': position === 'bottom',\n                'ui-dialog-bottomleft': position === 'bottomleft',\n                'ui-dialog-bottomright': position === 'bottomright'}\" >\n            <div #container [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable,'ui-dialog-resizable':resizable, 'ui-dialog-maximized': maximized}\"\n                [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"visible\" pFocusTrap [pFocusTrapDisabled]=\"focusTrap === false\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" role=\"dialog\" [attr.aria-labelledby]=\"id + '-label'\">\n                <div #titlebar class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\" (mousedown)=\"initDrag($event)\" *ngIf=\"showHeader\">\n                    <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                    <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"headerFacet && headerFacet.first\">\n                        <ng-content select=\"p-header\"></ng-content>\n                    </span>\n                    <div class=\"ui-dialog-titlebar-icons\">\n                        <a *ngIf=\"maximizable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"maximize()\" (keydown.enter)=\"maximize()\">\n                            <span [ngClass]=\"maximized ? minimizeIcon : maximizeIcon\"></span>\n                        </a>\n                        <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span [class]=\"closeIcon\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div #content [ngClass]=\"'ui-dialog-content ui-widget-content'\" [ngStyle]=\"contentStyle\" [class]=\"contentStyleClass\">\n                    <ng-content></ng-content>\n                </div>\n                <div #footer class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footerFacet && footerFacet.first\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n                <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\" (mousedown)=\"initResize($event)\"></div>\n            </div>\n        </div>\n    ",
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
        ], Dialog);
        return Dialog;
    }());
    var DialogModule = /** @class */ (function () {
        function DialogModule() {
        }
        DialogModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, focustrap.FocusTrapModule],
                exports: [Dialog, api.SharedModule],
                declarations: [Dialog]
            })
        ], DialogModule);
        return DialogModule;
    }());

    exports.Dialog = Dialog;
    exports.DialogModule = DialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dialog.umd.js.map
