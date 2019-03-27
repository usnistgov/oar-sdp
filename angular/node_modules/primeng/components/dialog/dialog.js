"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var idx = 0;
var Dialog = /** @class */ (function () {
    function Dialog(el, domHandler, renderer, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.zone = zone;
        this.draggable = true;
        this.resizable = true;
        this.minWidth = 150;
        this.minHeight = 150;
        this.closeOnEscape = true;
        this.closable = true;
        this.responsive = true;
        this.showHeader = true;
        this.breakpoint = 640;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.minX = 0;
        this.minY = 0;
        this.focusOnShow = true;
        this.transitionOptions = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
        this.id = "ui-dialog-" + idx++;
    }
    Dialog.prototype.focus = function () {
        var focusable = this.domHandler.findSingle(this.container, 'button');
        if (focusable) {
            this.zone.runOutsideAngular(function () {
                setTimeout(function () { return focusable.focus(); }, 5);
            });
        }
    };
    Dialog.prototype.positionOverlay = function () {
        var viewport = this.domHandler.getViewport();
        if (this.domHandler.getOuterHeight(this.container) > viewport.height) {
            this.contentViewChild.nativeElement.style.height = (viewport.height * .75) + 'px';
            this.container.style.height = 'auto';
        }
        else {
            this.contentViewChild.nativeElement.style.height = null;
            if (this.height) {
                this.container.style.height = this.height + 'px';
            }
        }
        if (this.positionLeft >= 0 && this.positionTop >= 0) {
            this.container.style.left = this.positionLeft + 'px';
            this.container.style.top = this.positionTop + 'px';
        }
        else if (this.positionTop >= 0) {
            this.center();
            this.container.style.top = this.positionTop + 'px';
        }
        else {
            this.center();
        }
    };
    Dialog.prototype.close = function (event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Dialog.prototype.center = function () {
        var elementWidth = this.domHandler.getOuterWidth(this.container);
        var elementHeight = this.domHandler.getOuterHeight(this.container);
        if (elementWidth == 0 && elementHeight == 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.container);
            elementHeight = this.domHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = Math.max(Math.floor((viewport.width - elementWidth) / 2), 0);
        var y = Math.max(Math.floor((viewport.height - elementHeight) / 2), 0);
        this.container.style.left = x + 'px';
        this.container.style.top = y + 'px';
    };
    Dialog.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            var maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            if (this.blockScroll) {
                maskStyleClass += ' ui-dialog-mask-scrollblocker';
            }
            this.domHandler.addMultipleClasses(this.mask, maskStyleClass);
            if (this.closable && this.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    _this.close(event);
                });
            }
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                this.domHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    };
    Dialog.prototype.disableModality = function () {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                var bodyChildren = document.body.children;
                var hasBlockerMasks = void 0;
                for (var i = 0; i < bodyChildren.length; i++) {
                    var bodyChild = bodyChildren[i];
                    if (this.domHandler.hasClass(bodyChild, 'ui-dialog-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }
                if (!hasBlockerMasks) {
                    this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
            }
            this.mask = null;
        }
    };
    Dialog.prototype.toggleMaximize = function (event) {
        if (this.maximized)
            this.revertMaximize();
        else
            this.maximize();
        event.preventDefault();
    };
    Dialog.prototype.maximize = function () {
        this.domHandler.addClass(this.container, 'ui-dialog-maximized');
        this.preMaximizePageX = parseFloat(this.container.style.top);
        this.preMaximizePageY = parseFloat(this.container.style.left);
        this.preMaximizeContainerWidth = this.domHandler.getOuterWidth(this.container);
        this.preMaximizeContainerHeight = this.domHandler.getOuterHeight(this.container);
        this.preMaximizeContentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
        this.container.style.top = '0px';
        this.container.style.left = '0px';
        this.container.style.width = '100vw';
        this.container.style.height = '100vh';
        var diffHeight = parseFloat(this.container.style.top);
        if (this.headerViewChild && this.headerViewChild.nativeElement) {
            diffHeight += this.domHandler.getOuterHeight(this.headerViewChild.nativeElement);
        }
        if (this.footerViewChild && this.footerViewChild.nativeElement) {
            diffHeight += this.domHandler.getOuterHeight(this.footerViewChild.nativeElement);
        }
        this.contentViewChild.nativeElement.style.height = 'calc(100vh - ' + diffHeight + 'px)';
        this.domHandler.addClass(document.body, 'ui-overflow-hidden');
        this.maximized = true;
    };
    Dialog.prototype.revertMaximize = function () {
        var _this = this;
        this.container.style.top = this.preMaximizePageX + 'px';
        this.container.style.left = this.preMaximizePageY + 'px';
        this.container.style.width = this.preMaximizeContainerWidth + 'px';
        this.container.style.height = this.preMaximizeContainerHeight + 'px';
        this.contentViewChild.nativeElement.style.height = this.preMaximizeContentHeight + 'px';
        this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
        this.maximized = false;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () { return _this.domHandler.removeClass(_this.container, 'ui-dialog-maximized'); }, 300);
        });
    };
    Dialog.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Dialog.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    Dialog.prototype.onCloseMouseDown = function (event) {
        this.closeIconMouseDown = true;
    };
    Dialog.prototype.initDrag = function (event) {
        if (this.closeIconMouseDown) {
            this.closeIconMouseDown = false;
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.domHandler.addClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.onDrag = function (event) {
        if (this.dragging) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var leftPos = parseInt(this.container.style.left) + deltaX;
            var topPos = parseInt(this.container.style.top) + deltaY;
            if (leftPos >= this.minX) {
                this.container.style.left = leftPos + 'px';
            }
            if (topPos >= this.minY) {
                this.container.style.top = topPos + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.endDrag = function (event) {
        if (this.draggable) {
            this.dragging = false;
            this.domHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.initResize = function (event) {
        if (this.resizable) {
            this.preWidth = null;
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.domHandler.addClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.onResize = function (event) {
        if (this.resizing) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var containerWidth = this.domHandler.getOuterWidth(this.container);
            var containerHeight = this.domHandler.getOuterHeight(this.container);
            var contentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
            var newWidth = containerWidth + deltaX;
            var newHeight = containerHeight + deltaY;
            if (newWidth > this.minWidth) {
                this.container.style.width = newWidth + 'px';
            }
            if (newHeight > this.minHeight) {
                this.container.style.height = newHeight + 'px';
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onResizeEnd = function (event) {
        if (this.resizing) {
            this.resizing = false;
            this.domHandler.removeClass(document.body, 'ui-unselectable-text');
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
        if (this.responsive) {
            this.bindDocumentResponsiveListener();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    };
    Dialog.prototype.unbindGlobalListeners = function () {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentResponsiveListener();
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
            _this.documentResizeEndListener = _this.onResizeEnd.bind(_this);
            window.document.addEventListener('mousemove', _this.documentResizeListener);
            window.document.addEventListener('mouseup', _this.documentResizeEndListener);
        });
    };
    Dialog.prototype.unbindDocumentResizeListeners = function () {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mouseup', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    };
    Dialog.prototype.bindDocumentResponsiveListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentResponsiveListener = _this.onWindowResize.bind(_this);
            window.addEventListener('resize', _this.documentResponsiveListener);
        });
    };
    Dialog.prototype.unbindDocumentResponsiveListener = function () {
        if (this.documentResponsiveListener) {
            window.removeEventListener('resize', this.documentResponsiveListener);
            this.documentResponsiveListener = null;
        }
    };
    Dialog.prototype.onWindowResize = function (event) {
        if (this.maximized) {
            return;
        }
        var viewport = this.domHandler.getViewport();
        var width = this.domHandler.getOuterWidth(this.container);
        if (viewport.width <= this.breakpoint) {
            if (!this.preWidth) {
                this.preWidth = width;
            }
            this.container.style.left = '0px';
            this.container.style.width = '100%';
        }
        else {
            this.container.style.width = this.preWidth + 'px';
            this.positionOverlay();
        }
    };
    Dialog.prototype.bindDocumentEscapeListener = function () {
        var _this = this;
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event.which == 27) {
                if (parseInt(_this.container.style.zIndex) == domhandler_1.DomHandler.zindex) {
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
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    };
    Dialog.prototype.restoreAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    };
    Dialog.prototype.onAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.onShow.emit({});
                this.appendContainer();
                this.moveOnTop();
                this.positionOverlay();
                this.bindGlobalListeners();
                if (this.maximized) {
                    this.domHandler.addClass(document.body, 'ui-overflow-hidden');
                }
                if (this.modal) {
                    this.enableModality();
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                break;
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    };
    Dialog.prototype.onContainerDestroy = function () {
        this.unbindGlobalListeners();
        this.dragging = false;
        if (this.maximized) {
            this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        this.container = null;
    };
    Dialog.prototype.ngOnDestroy = function () {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dialog.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "resizable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "minHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dialog.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dialog.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "positionLeft", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "positionTop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dialog.prototype, "contentStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "modal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "closeOnEscape", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "dismissableMask", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "closable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dialog.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dialog.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dialog.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "showHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "breakpoint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "blockScroll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "minX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dialog.prototype, "minY", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "focusOnShow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dialog.prototype, "maximizable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dialog.prototype, "transitionOptions", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.Header, { descendants: false }),
        __metadata("design:type", core_1.QueryList)
    ], Dialog.prototype, "headerFacet", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.Footer, { descendants: false }),
        __metadata("design:type", core_1.QueryList)
    ], Dialog.prototype, "footerFacet", void 0);
    __decorate([
        core_1.ViewChild('titlebar'),
        __metadata("design:type", core_1.ElementRef)
    ], Dialog.prototype, "headerViewChild", void 0);
    __decorate([
        core_1.ViewChild('content'),
        __metadata("design:type", core_1.ElementRef)
    ], Dialog.prototype, "contentViewChild", void 0);
    __decorate([
        core_1.ViewChild('footer'),
        __metadata("design:type", core_1.ElementRef)
    ], Dialog.prototype, "footerViewChild", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dialog.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dialog.prototype, "onHide", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dialog.prototype, "visibleChange", void 0);
    Dialog = __decorate([
        core_1.Component({
            selector: 'p-dialog',
            template: "\n        <div #container [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}\"\n            [ngStyle]=\"style\" [class]=\"styleClass\" [style.width.px]=\"width\" [style.height.px]=\"height\" [style.minWidth.px]=\"minWidth\" [style.minHeight.px]=\"minHeight\" (mousedown)=\"moveOnTop()\" \n            [@animation]=\"{value: 'visible', params: {transitionParams: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" role=\"dialog\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"visible\">\n            <div #titlebar class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\" (mousedown)=\"initDrag($event)\" *ngIf=\"showHeader\">\n                <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"headerFacet && headerFacet.first\">\n                    <ng-content select=\"p-header\"></ng-content>\n                </span>\n                <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"close($event)\" (mousedown)=\"onCloseMouseDown($event)\">\n                    <span class=\"pi pi-times\"></span>\n                </a>\n                <a *ngIf=\"maximizable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"toggleMaximize($event)\">\n                    <span [ngClass]=\"maximized ? 'pi pi-window-minimize' : 'pi pi-window-maximize'\"></span>\n                </a>\n            </div>\n            <div #content class=\"ui-dialog-content ui-widget-content\" [ngStyle]=\"contentStyle\">\n                <ng-content></ng-content>\n            </div>\n            <div #footer class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footerFacet && footerFacet.first\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n            <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\" (mousedown)=\"initResize($event)\"></div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('animation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translate3d(0, 25%, 0) scale(0.9)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'none',
                        opacity: 1
                    })),
                    animations_1.transition('* => *', animations_1.animate('{{transitionParams}}'))
                ])
            ],
            providers: [domhandler_1.DomHandler]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, core_1.NgZone])
    ], Dialog);
    return Dialog;
}());
exports.Dialog = Dialog;
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Dialog, shared_1.SharedModule],
            declarations: [Dialog]
        })
    ], DialogModule);
    return DialogModule;
}());
exports.DialogModule = DialogModule;
//# sourceMappingURL=dialog.js.map