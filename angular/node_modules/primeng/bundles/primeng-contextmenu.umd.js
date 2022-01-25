(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/ripple'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/contextmenu', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/ripple', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.contextmenu = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.ripple, global.ng.router));
}(this, (function (exports, core, common, dom, ripple, router) { 'use strict';

    var ContextMenuSub = /** @class */ (function () {
        function ContextMenuSub(contextMenu) {
            this.contextMenu = contextMenu;
        }
        Object.defineProperty(ContextMenuSub.prototype, "parentActive", {
            get: function () {
                return this._parentActive;
            },
            set: function (value) {
                this._parentActive = value;
                if (!value) {
                    this.activeItem = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        ContextMenuSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = item;
            var nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                var sublist = nextElement.children[0];
                sublist.style.zIndex = ++dom.DomHandler.zindex;
                this.position(sublist, item);
            }
        };
        ContextMenuSub.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
                event.preventDefault();
            }
            if (item.items)
                event.preventDefault();
            else
                this.contextMenu.hide();
        };
        ContextMenuSub.prototype.listClick = function (event) {
            this.activeItem = null;
        };
        ContextMenuSub.prototype.position = function (sublist, item) {
            this.containerOffset = dom.DomHandler.getOffset(item.parentElement);
            var viewport = dom.DomHandler.getViewport();
            var sublistWidth = sublist.offsetParent ? sublist.offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(sublist);
            var itemOuterWidth = dom.DomHandler.getOuterWidth(item.children[0]);
            var itemOuterHeight = dom.DomHandler.getOuterHeight(item.children[0]);
            var sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : dom.DomHandler.getHiddenElementOuterHeight(sublist);
            if ((parseInt(this.containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - dom.DomHandler.calculateScrollbarHeight())) {
                sublist.style.removeProperty('top');
                sublist.style.bottom = '0px';
            }
            else {
                sublist.style.removeProperty('bottom');
                sublist.style.top = '0px';
            }
            if ((parseInt(this.containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - dom.DomHandler.calculateScrollbarWidth())) {
                sublist.style.left = -sublistWidth + 'px';
            }
            else {
                sublist.style.left = itemOuterWidth + 'px';
            }
        };
        return ContextMenuSub;
    }());
    ContextMenuSub.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-contextMenuSub',
                    template: "\n        <ul [ngClass]=\"{'p-submenu-list':!root}\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #item [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':item==activeItem,'p-hidden': child.visible === false}\"\n                    (mouseenter)=\"onItemMouseEnter($event,item,child)\" role=\"none\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url ? child.url : null\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" (click)=\"itemClick($event, child)\"\n                        [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" pRipple\n                        [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" role=\"menuitem\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                        [ngStyle]=\"child.style\" [class]=\"child.styleClass\" pRipple\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-contextMenuSub [parentActive]=\"item==activeItem\" [item]=\"child\" *ngIf=\"child.items\"></p-contextMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    ContextMenuSub.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return ContextMenu; }),] }] }
    ]; };
    ContextMenuSub.propDecorators = {
        item: [{ type: core.Input }],
        root: [{ type: core.Input }],
        parentActive: [{ type: core.Input }]
    };
    var ContextMenu = /** @class */ (function () {
        function ContextMenu(el, renderer, zone) {
            this.el = el;
            this.renderer = renderer;
            this.zone = zone;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.triggerEvent = 'contextmenu';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
        }
        ContextMenu.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.global) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.triggerEventListener = this.renderer.listen(documentTarget, this.triggerEvent, function (event) {
                    _this.show(event);
                    event.preventDefault();
                });
            }
            else if (this.target) {
                this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, function (event) {
                    _this.show(event);
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
        };
        ContextMenu.prototype.show = function (event) {
            this.position(event);
            this.moveOnTop();
            this.containerViewChild.nativeElement.style.display = 'block';
            this.parentActive = true;
            dom.DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
            this.bindGlobalListeners();
            if (event) {
                event.preventDefault();
            }
            this.onShow.emit();
        };
        ContextMenu.prototype.hide = function () {
            this.containerViewChild.nativeElement.style.display = 'none';
            this.parentActive = false;
            this.unbindGlobalListeners();
            this.onHide.emit();
        };
        ContextMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        ContextMenu.prototype.toggle = function (event) {
            if (this.containerViewChild.nativeElement.offsetParent)
                this.hide();
            else
                this.show(event);
        };
        ContextMenu.prototype.position = function (event) {
            if (event) {
                var left = event.pageX + 1;
                var top = event.pageY + 1;
                var width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
                var height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : dom.DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
                var viewport = dom.DomHandler.getViewport();
                //flip
                if (left + width - document.body.scrollLeft > viewport.width) {
                    left -= width;
                }
                //flip
                if (top + height - document.body.scrollTop > viewport.height) {
                    top -= height;
                }
                //fit
                if (left < document.body.scrollLeft) {
                    left = document.body.scrollLeft;
                }
                //fit
                if (top < document.body.scrollTop) {
                    top = document.body.scrollTop;
                }
                this.containerViewChild.nativeElement.style.left = left + 'px';
                this.containerViewChild.nativeElement.style.top = top + 'px';
            }
        };
        ContextMenu.prototype.bindGlobalListeners = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function (event) {
                    if (_this.containerViewChild.nativeElement.offsetParent && _this.isOutsideClicked(event) && event.button !== 2) {
                        _this.hide();
                    }
                });
            }
            this.zone.runOutsideAngular(function () {
                if (!_this.windowResizeListener) {
                    _this.windowResizeListener = _this.onWindowResize.bind(_this);
                    window.addEventListener('resize', _this.windowResizeListener);
                }
            });
        };
        ContextMenu.prototype.unbindGlobalListeners = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
            if (this.windowResizeListener) {
                window.removeEventListener('resize', this.windowResizeListener);
                this.windowResizeListener = null;
            }
        };
        ContextMenu.prototype.onWindowResize = function (event) {
            if (this.containerViewChild.nativeElement.offsetParent) {
                this.hide();
            }
        };
        ContextMenu.prototype.isOutsideClicked = function (event) {
            return !(this.containerViewChild.nativeElement.isSameNode(event.target) || this.containerViewChild.nativeElement.contains(event.target));
        };
        ContextMenu.prototype.ngOnDestroy = function () {
            this.unbindGlobalListeners();
            if (this.triggerEventListener) {
                this.triggerEventListener();
            }
            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
        };
        return ContextMenu;
    }());
    ContextMenu.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-contextMenu',
                    template: "\n        <div #container [ngClass]=\"'p-contextmenu p-component'\"\n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-contextMenuSub [item]=\"model\" [parentActive]=\"parentActive\" root=\"root\"></p-contextMenuSub>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-contextmenu{display:none;position:absolute}.p-contextmenu ul{list-style:none;margin:0;padding:0}.p-contextmenu .p-submenu-list{display:none;min-width:100%;position:absolute;z-index:1}.p-contextmenu .p-menuitem-link{-ms-flex-align:center;align-items:center;cursor:pointer;display:-ms-flexbox;display:flex;overflow:hidden;position:relative;text-decoration:none}.p-contextmenu .p-menuitem-text{line-height:1}.p-contextmenu .p-menuitem{position:relative}.p-contextmenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-contextmenu .p-menuitem-active>p-contextmenusub>.p-submenu-list{display:block!important}"]
                },] }
    ];
    ContextMenu.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.NgZone }
    ]; };
    ContextMenu.propDecorators = {
        model: [{ type: core.Input }],
        global: [{ type: core.Input }],
        target: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        triggerEvent: [{ type: core.Input }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }]
    };
    var ContextMenuModule = /** @class */ (function () {
        function ContextMenuModule() {
        }
        return ContextMenuModule;
    }());
    ContextMenuModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule, ripple.RippleModule],
                    exports: [ContextMenu, router.RouterModule],
                    declarations: [ContextMenu, ContextMenuSub]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ContextMenu = ContextMenu;
    exports.ContextMenuModule = ContextMenuModule;
    exports.ContextMenuSub = ContextMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-contextmenu.umd.js.map
