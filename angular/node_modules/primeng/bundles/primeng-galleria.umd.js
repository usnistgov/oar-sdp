(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/utils'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/galleria', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/utils', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.galleria = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.utils, global.primeng.dom));
}(this, (function (exports, core, common, api, utils, dom) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __read = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var Galleria = /** @class */ (function () {
        function Galleria(element) {
            this.element = element;
            this.fullScreen = false;
            this.numVisible = 3;
            this.showItemNavigators = false;
            this.showThumbnailNavigators = true;
            this.showItemNavigatorsOnHover = false;
            this.changeItemOnIndicatorHover = false;
            this.circular = false;
            this.autoPlay = false;
            this.transitionInterval = 4000;
            this.showThumbnails = true;
            this.thumbnailsPosition = "bottom";
            this.verticalThumbnailViewPortHeight = "300px";
            this.showIndicators = false;
            this.showIndicatorsOnItem = false;
            this.indicatorsPosition = "bottom";
            this.baseZIndex = 0;
            this.activeIndexChange = new core.EventEmitter();
            this.visibleChange = new core.EventEmitter();
            this._visible = false;
            this._activeIndex = 0;
        }
        Object.defineProperty(Galleria.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._activeIndex = activeIndex;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Galleria.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (visible) {
                this._visible = visible;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Galleria.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerFacet = item.template;
                        break;
                    case 'footer':
                        _this.footerFacet = item.template;
                        break;
                    case 'indicator':
                        _this.indicatorFacet = item.template;
                        break;
                    case 'caption':
                        _this.captionFacet = item.template;
                        break;
                }
            });
        };
        Galleria.prototype.ngOnChanges = function (simpleChanges) {
            if (this.fullScreen && simpleChanges.visible) {
                if (simpleChanges.visible.currentValue) {
                    dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
                    this.zIndex = String(this.baseZIndex + ++dom.DomHandler.zindex);
                }
                else {
                    dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
            }
        };
        Galleria.prototype.onMaskHide = function () {
            this.visible = false;
            this.visibleChange.emit(false);
        };
        Galleria.prototype.onActiveItemChange = function (index) {
            if (this.activeIndex !== index) {
                this.activeIndex = index;
                this.activeIndexChange.emit(index);
            }
        };
        Galleria.prototype.ngOnDestroy = function () {
            if (this.fullScreen) {
                dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
        };
        Galleria.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], Galleria.prototype, "activeIndex", null);
        __decorate([
            core.Input()
        ], Galleria.prototype, "fullScreen", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "id", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "numVisible", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "responsiveOptions", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "showItemNavigators", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "showThumbnailNavigators", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "showItemNavigatorsOnHover", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "changeItemOnIndicatorHover", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "circular", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "autoPlay", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "transitionInterval", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "showThumbnails", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "thumbnailsPosition", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "verticalThumbnailViewPortHeight", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "showIndicators", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "showIndicatorsOnItem", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "indicatorsPosition", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "maskClass", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "containerClass", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "containerStyle", void 0);
        __decorate([
            core.ViewChild('mask', { static: false })
        ], Galleria.prototype, "mask", void 0);
        __decorate([
            core.Input()
        ], Galleria.prototype, "visible", null);
        __decorate([
            core.Output()
        ], Galleria.prototype, "activeIndexChange", void 0);
        __decorate([
            core.Output()
        ], Galleria.prototype, "visibleChange", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], Galleria.prototype, "templates", void 0);
        Galleria = __decorate([
            core.Component({
                selector: 'p-galleria',
                template: "\n        <div *ngIf=\"fullScreen;else windowed\">\n            <div *ngIf=\"visible\"  #mask [ngClass]=\"{'ui-galleria-mask ui-widget-overlay':true, 'ui-galleria-visible': this.visible}\" [class]=\"maskClass\" [ngStyle]=\"{'zIndex':zIndex}\">\n                <p-galleriaContent (maskHide)=\"onMaskHide()\" (activeItemChange)=\"onActiveItemChange($event)\" [ngStyle]=\"containerStyle\"></p-galleriaContent>\n            </div>\n        </div>\n\n        <ng-template #windowed>\n            <p-galleriaContent (activeItemChange)=\"onActiveItemChange($event)\"></p-galleriaContent>\n        </ng-template>\n    ",
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], Galleria);
        return Galleria;
    }());
    var GalleriaContent = /** @class */ (function () {
        function GalleriaContent(galleria) {
            this.galleria = galleria;
            this.maskHide = new core.EventEmitter();
            this.activeItemChange = new core.EventEmitter();
            this.id = this.galleria.id || utils.UniqueComponentId();
            this.slideShowActicve = false;
            this._activeIndex = 0;
            this.slideShowActive = true;
        }
        Object.defineProperty(GalleriaContent.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._activeIndex = activeIndex;
            },
            enumerable: true,
            configurable: true
        });
        ;
        GalleriaContent.prototype.galleriaClass = function () {
            var thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('ui-galleria-thumbnails', this.galleria.thumbnailsPosition);
            var indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('ui-galleria-indicators', this.galleria.indicatorsPosition);
            return (this.galleria.containerClass ? this.galleria.containerClass + " " : '') + (thumbnailsPosClass ? thumbnailsPosClass + " " : '') + (indicatorPosClass ? indicatorPosClass + " " : '');
        };
        GalleriaContent.prototype.startSlideShow = function () {
            var _this = this;
            this.interval = setInterval(function () {
                var activeIndex = (_this.galleria.circular && (_this.galleria.value.length - 1) === _this.galleria.activeIndex) ? 0 : (_this.galleria.activeIndex + 1);
                _this.onActiveIndexChange(activeIndex);
                _this.activeIndex = activeIndex;
            }, this.galleria.transitionInterval);
            this.slideShowActive = true;
        };
        GalleriaContent.prototype.stopSlideShow = function () {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.slideShowActive = false;
        };
        GalleriaContent.prototype.getPositionClass = function (preClassName, position) {
            var positions = ['top', 'left', 'bottom', 'right'];
            var pos = positions.find(function (item) { return item === position; });
            return pos ? preClassName + "-" + pos : '';
        };
        GalleriaContent.prototype.isVertical = function () {
            return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
        };
        GalleriaContent.prototype.onActiveIndexChange = function (index) {
            if (this.activeIndex !== index) {
                this.activeIndex = index;
                this.activeItemChange.emit(this.activeIndex);
            }
        };
        GalleriaContent.ctorParameters = function () { return [
            { type: Galleria }
        ]; };
        __decorate([
            core.Input()
        ], GalleriaContent.prototype, "activeIndex", null);
        __decorate([
            core.Output()
        ], GalleriaContent.prototype, "maskHide", void 0);
        __decorate([
            core.Output()
        ], GalleriaContent.prototype, "activeItemChange", void 0);
        GalleriaContent = __decorate([
            core.Component({
                selector: 'p-galleriaContent',
                template: "\n        <div [attr.id]=\"id\" *ngIf=\"galleria.value && galleria.value.length > 0\" [ngClass]=\"{'ui-galleria ui-widget': true, 'ui-galleria-fullscreen': this.galleria.fullScreen, \n            'ui-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem, 'ui-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen}\"\n            [ngStyle]=\"!galleria.fullScreen ? galleria.containerStyle : {}\" [class]=\"galleriaClass()\">\n            <button *ngIf=\"galleria.fullScreen\" type=\"button\" class=\"ui-galleria-close ui-link ui-widget ui-state-default ui-corner-all\" (click)=\"maskHide.emit()\">\n                <span class=\"ui-galleria-close-icon pi pi-times\"></span>\n            </button>\n            <div *ngIf=\"galleria.templates && galleria.headerFacet\" class=\"ui-galleria-header\">\n                <p-galleriaItemSlot type=\"header\" [templates]=\"galleria.templates\"></p-galleriaItemSlot>\n            </div>\n            <div class=\"ui-galleria-content\">\n                <p-galleriaItem [value]=\"galleria.value\" [activeIndex]=\"galleria.activeIndex\" [circular]=\"galleria.circular\" [templates]=\"galleria.templates\" (onActiveIndexChange)=\"onActiveIndexChange($event)\" \n                    [showIndicators]=\"galleria.showIndicators\" [changeItemOnIndicatorHover]=\"galleria.changeItemOnIndicatorHover\" [indicatorFacet]=\"galleria.indicatorFacet\"\n                    [captionFacet]=\"galleria.captionFacet\" [showItemNavigators]=\"galleria.showItemNavigators\" [autoPlay]=\"galleria.autoPlay\" [slideShowActive]=\"slideShowActive\"\n                    (startSlideShow)=\"startSlideShow()\" (stopSlideShow)=\"stopSlideShow()\"></p-galleriaItem>\n\n                <p-galleriaThumbnails *ngIf=\"galleria.showThumbnails\" [containerId]=\"id\" [value]=\"galleria.value\" (onActiveIndexChange)=\"onActiveIndexChange($event)\" [activeIndex]=\"galleria.activeIndex\" [templates]=\"galleria.templates\"\n                    [numVisible]=\"galleria.numVisible\" [responsiveOptions]=\"galleria.responsiveOptions\" [circular]=\"galleria.circular\"\n                    [isVertical]=\"isVertical()\" [contentHeight]=\"galleria.verticalThumbnailViewPortHeight\" [showThumbnailNavigators]=\"galleria.showThumbnailNavigators\"\n                    [slideShowActive]=\"slideShowActive\" (stopSlideShow)=\"stopSlideShow()\"></p-galleriaThumbnails>\n            </div>\n            <div *ngIf=\"galleria.templates && galleria.footerFacet\" class=\"ui-galleria-footer\">\n                <p-galleriaItemSlot type=\"footer\" [templates]=\"galleria.templates\"></p-galleriaItemSlot>\n            </div>\n        </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], GalleriaContent);
        return GalleriaContent;
    }());
    var GalleriaItemSlot = /** @class */ (function () {
        function GalleriaItemSlot() {
        }
        Object.defineProperty(GalleriaItemSlot.prototype, "item", {
            get: function () {
                return this._item;
            },
            set: function (item) {
                var _this = this;
                this._item = item;
                if (this.templates) {
                    this.templates.forEach(function (item) {
                        if (item.getType() === _this.type) {
                            switch (_this.type) {
                                case 'item':
                                case 'caption':
                                case 'thumbnail':
                                    _this.context = { $implicit: _this.item };
                                    _this.contentTemplate = item.template;
                                    break;
                            }
                        }
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        GalleriaItemSlot.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                if (item.getType() === _this.type) {
                    switch (_this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            _this.context = { $implicit: _this.item };
                            _this.contentTemplate = item.template;
                            break;
                        case 'indicator':
                            _this.context = { $implicit: _this.index };
                            _this.contentTemplate = item.template;
                            break;
                        default:
                            _this.context = {};
                            _this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        };
        __decorate([
            core.Input()
        ], GalleriaItemSlot.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], GalleriaItemSlot.prototype, "index", void 0);
        __decorate([
            core.Input()
        ], GalleriaItemSlot.prototype, "item", null);
        __decorate([
            core.Input()
        ], GalleriaItemSlot.prototype, "type", void 0);
        GalleriaItemSlot = __decorate([
            core.Component({
                selector: 'p-galleriaItemSlot',
                template: "\n        <ng-container *ngIf=\"contentTemplate\">\n            <ng-container *ngTemplateOutlet=\"contentTemplate; context: context\"></ng-container>\n        </ng-container>\n    ",
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], GalleriaItemSlot);
        return GalleriaItemSlot;
    }());
    var GalleriaItem = /** @class */ (function () {
        function GalleriaItem() {
            this.circular = false;
            this.showItemNavigators = false;
            this.showIndicators = true;
            this.slideShowActive = true;
            this.changeItemOnIndicatorHover = true;
            this.autoPlay = false;
            this.startSlideShow = new core.EventEmitter();
            this.stopSlideShow = new core.EventEmitter();
            this.onActiveIndexChange = new core.EventEmitter();
            this._activeIndex = 0;
        }
        Object.defineProperty(GalleriaItem.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._activeIndex = activeIndex;
                this.activeItem = this.value[this._activeIndex];
            },
            enumerable: true,
            configurable: true
        });
        ;
        GalleriaItem.prototype.ngOnInit = function () {
            if (this.autoPlay) {
                this.startSlideShow.emit();
            }
        };
        GalleriaItem.prototype.next = function () {
            var nextItemIndex = this.activeIndex + 1;
            var activeIndex = this.circular && this.value.length - 1 === this.activeIndex
                ? 0
                : nextItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
        };
        GalleriaItem.prototype.prev = function () {
            var prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
            var activeIndex = this.circular && this.activeIndex === 0
                ? this.value.length - 1
                : prevItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
        };
        GalleriaItem.prototype.stopTheSlideShow = function () {
            if (this.slideShowActive && this.stopSlideShow) {
                this.stopSlideShow.emit();
            }
        };
        GalleriaItem.prototype.navForward = function (e) {
            this.stopTheSlideShow();
            this.next();
            if (e && e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaItem.prototype.navBackward = function (e) {
            this.stopTheSlideShow();
            this.prev();
            if (e && e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaItem.prototype.onIndicatorClick = function (index) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        };
        GalleriaItem.prototype.onIndicatorMouseEnter = function (index) {
            if (this.changeItemOnIndicatorHover) {
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
            }
        };
        GalleriaItem.prototype.onIndicatorKeyDown = function (index) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        };
        GalleriaItem.prototype.isNavForwardDisabled = function () {
            return !this.circular && this.activeIndex === (this.value.length - 1);
        };
        GalleriaItem.prototype.isNavBackwardDisabled = function () {
            return !this.circular && this.activeIndex === 0;
        };
        GalleriaItem.prototype.isIndicatorItemActive = function (index) {
            return this.activeIndex === index;
        };
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "circular", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "showItemNavigators", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "showIndicators", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "slideShowActive", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "changeItemOnIndicatorHover", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "autoPlay", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "indicatorFacet", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "captionFacet", void 0);
        __decorate([
            core.Output()
        ], GalleriaItem.prototype, "startSlideShow", void 0);
        __decorate([
            core.Output()
        ], GalleriaItem.prototype, "stopSlideShow", void 0);
        __decorate([
            core.Output()
        ], GalleriaItem.prototype, "onActiveIndexChange", void 0);
        __decorate([
            core.Input()
        ], GalleriaItem.prototype, "activeIndex", null);
        GalleriaItem = __decorate([
            core.Component({
                selector: 'p-galleriaItem',
                template: "\n        <div class=\"ui-galleria-item-container\">\n            <button *ngIf=\"showItemNavigators\" type=\"button\" [ngClass]=\"{'ui-galleria-item-prev ui-galleria-item-nav ui-link': true, 'ui-state-disabled': this.isNavBackwardDisabled()}\" (click)=\"navBackward($event)\" \n                [disabled]=\"isNavBackwardDisabled()\">\n                <span class=\"ui-galleria-item-prev-icon pi pi-chevron-left\"></span>\n            </button>\n            <p-galleriaItemSlot type=\"item\" [item]=\"activeItem\" [templates]=\"templates\" class=\"ui-galleria-item\"></p-galleriaItemSlot>\n            <button *ngIf=\"showItemNavigators\" type=\"button\" [ngClass]=\"{'ui-galleria-item-next ui-galleria-item-nav ui-link': true,'ui-state-disabled': this.isNavForwardDisabled()}\" (click)=\"navForward($event)\" \n                [disabled]=\"isNavForwardDisabled()\">\n                <span class=\"ui-galleria-item-next-icon pi pi-chevron-right\"></span>\n            </button>\n            <div class=\"ui-galleria-caption\" *ngIf=\"captionFacet\">\n                <p-galleriaItemSlot type=\"caption\" [item]=\"activeItem\" [templates]=\"templates\"></p-galleriaItemSlot>\n            </div>\n        </div>\n        <ul *ngIf=\"showIndicators\" class=\"ui-galleria-indicators ui-helper-reset\">\n            <li *ngFor=\"let item of value; let index = index;\" tabindex=\"0\"\n                (click)=\"onIndicatorClick(index)\" (mouseenter)=\"onIndicatorMouseEnter(index)\" (keydown.enter)=\"onIndicatorKeyDown(index)\"\n                [ngClass]=\"{'ui-galleria-indicator': true,'ui-state-highlight': isIndicatorItemActive(index)}\">\n                <button type=\"button\" tabIndex=\"-1\" class=\"ui-link\" *ngIf=\"!indicatorFacet\">\n                </button>\n                <p-galleriaItemSlot type=\"indicator\" [index]=\"index\" [templates]=\"templates\"></p-galleriaItemSlot>\n            </li>\n        </ul>\n    ",
                host: {
                    '[class.ui-galleria-item-wrapper]': 'true',
                },
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], GalleriaItem);
        return GalleriaItem;
    }());
    var GalleriaThumbnails = /** @class */ (function () {
        function GalleriaThumbnails() {
            this.isVertical = false;
            this.slideShowActive = false;
            this.circular = false;
            this.contentHeight = "300px";
            this.showThumbnailNavigators = true;
            this.onActiveIndexChange = new core.EventEmitter();
            this.stopSlideShow = new core.EventEmitter();
            this.startPos = null;
            this.thumbnailsStyle = null;
            this.sortedResponsiveOptions = null;
            this.totalShiftedItems = 0;
            this.page = 0;
            this._numVisible = 0;
            this.d_numVisible = 0;
            this._oldNumVisible = 0;
            this._activeIndex = 0;
            this._oldactiveIndex = 0;
        }
        Object.defineProperty(GalleriaThumbnails.prototype, "numVisible", {
            get: function () {
                return this._numVisible;
            },
            set: function (numVisible) {
                this._numVisible = numVisible;
                this._oldNumVisible = this.d_numVisible;
                this.d_numVisible = numVisible;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GalleriaThumbnails.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._oldactiveIndex = this._activeIndex;
                this._activeIndex = activeIndex;
            },
            enumerable: true,
            configurable: true
        });
        ;
        GalleriaThumbnails.prototype.ngOnInit = function () {
            this.createStyle();
            this.calculatePosition();
            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
        };
        GalleriaThumbnails.prototype.ngAfterContentChecked = function () {
            var totalShiftedItems = this.totalShiftedItems;
            if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
                if (this._activeIndex <= this.getMedianItemIndex()) {
                    totalShiftedItems = 0;
                }
                else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                    totalShiftedItems = this.d_numVisible - this.value.length;
                }
                else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                    totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex() + 1;
                }
                else {
                    totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex();
                }
                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
                if (this.itemsContainer && this.itemsContainer.nativeElement) {
                    this.itemsContainer.nativeElement.style.transform = this.isVertical ? "translate3d(0, " + totalShiftedItems * (100 / this.d_numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this.d_numVisible) + "%, 0, 0)";
                }
                if (this._oldactiveIndex !== this._activeIndex) {
                    dom.DomHandler.removeClass(this.itemsContainer.nativeElement, 'ui-items-hidden');
                    this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
                }
                this._oldactiveIndex = this._activeIndex;
                this._oldNumVisible = this.d_numVisible;
            }
        };
        GalleriaThumbnails.prototype.createStyle = function () {
            if (!this.thumbnailsStyle) {
                this.thumbnailsStyle = document.createElement('style');
                this.thumbnailsStyle.type = 'text/css';
                document.body.appendChild(this.thumbnailsStyle);
            }
            var innerHTML = "\n            #" + this.containerId + " .ui-galleria-thumbnail-item {\n                flex: 1 0 " + (100 / this.d_numVisible) + "%\n            }\n        ";
            if (this.responsiveOptions) {
                this.sortedResponsiveOptions = __spread(this.responsiveOptions);
                this.sortedResponsiveOptions.sort(function (data1, data2) {
                    var value1 = data1.breakpoint;
                    var value2 = data2.breakpoint;
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2, undefined, { numeric: true });
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return -1 * result;
                });
                for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    var res = this.sortedResponsiveOptions[i];
                    innerHTML += "\n                    @media screen and (max-width: " + res.breakpoint + ") {\n                        #" + this.containerId + " .ui-galleria-thumbnail-item {\n                            flex: 1 0 " + (100 / res.numVisible) + "%\n                        }\n                    }\n                ";
                }
            }
            this.thumbnailsStyle.innerHTML = innerHTML;
        };
        GalleriaThumbnails.prototype.calculatePosition = function () {
            if (this.itemsContainer && this.sortedResponsiveOptions) {
                var windowWidth = window.innerWidth;
                var matchedResponsiveData = {
                    numVisible: this._numVisible
                };
                for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    var res = this.sortedResponsiveOptions[i];
                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
                if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                    this.d_numVisible = matchedResponsiveData.numVisible;
                }
            }
        };
        GalleriaThumbnails.prototype.getTabIndex = function (index) {
            return this.isItemActive(index) ? 0 : null;
        };
        GalleriaThumbnails.prototype.navForward = function (e) {
            this.stopTheSlideShow();
            var nextItemIndex = this._activeIndex + 1;
            if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1 || this.circular)) {
                this.step(-1);
            }
            var activeIndex = this.circular && (this.value.length - 1) === this._activeIndex ? 0 : nextItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaThumbnails.prototype.navBackward = function (e) {
            this.stopTheSlideShow();
            var prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
            var diff = prevItemIndex + this.totalShiftedItems;
            if ((this.d_numVisible - diff - 1) > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) !== 0 || this.circular)) {
                this.step(1);
            }
            var activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaThumbnails.prototype.onItemClick = function (index) {
            this.stopTheSlideShow();
            var selectedItemIndex = index;
            if (selectedItemIndex !== this._activeIndex) {
                var diff = selectedItemIndex + this.totalShiftedItems;
                var dir = 0;
                if (selectedItemIndex < this._activeIndex) {
                    dir = (this.d_numVisible - diff - 1) - this.getMedianItemIndex();
                    if (dir > 0 && (-1 * this.totalShiftedItems) !== 0) {
                        this.step(dir);
                    }
                }
                else {
                    dir = this.getMedianItemIndex() - diff;
                    if (dir < 0 && (-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1) {
                        this.step(dir);
                    }
                }
                this.activeIndex = selectedItemIndex;
                this.onActiveIndexChange.emit(this.activeIndex);
            }
        };
        GalleriaThumbnails.prototype.step = function (dir) {
            var totalShiftedItems = this.totalShiftedItems + dir;
            if (dir < 0 && (-1 * totalShiftedItems) + this.d_numVisible > (this.value.length - 1)) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
            else if (dir > 0 && totalShiftedItems > 0) {
                totalShiftedItems = 0;
            }
            if (this.circular) {
                if (dir < 0 && this.value.length - 1 === this._activeIndex) {
                    totalShiftedItems = 0;
                }
                else if (dir > 0 && this._activeIndex === 0) {
                    totalShiftedItems = this.d_numVisible - this.value.length;
                }
            }
            if (this.itemsContainer) {
                dom.DomHandler.removeClass(this.itemsContainer.nativeElement, 'ui-items-hidden');
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? "translate3d(0, " + totalShiftedItems * (100 / this.d_numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this.d_numVisible) + "%, 0, 0)";
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this.totalShiftedItems = totalShiftedItems;
        };
        GalleriaThumbnails.prototype.stopTheSlideShow = function () {
            if (this.slideShowActive && this.stopSlideShow) {
                this.stopSlideShow.emit();
            }
        };
        GalleriaThumbnails.prototype.changePageOnTouch = function (e, diff) {
            if (diff < 0) { // left
                this.navForward(e);
            }
            else { // right
                this.navBackward(e);
            }
        };
        GalleriaThumbnails.prototype.getTotalPageNumber = function () {
            return this.value.length > this.d_numVisible ? (this.value.length - this.d_numVisible) + 1 : 0;
        };
        GalleriaThumbnails.prototype.getMedianItemIndex = function () {
            var index = Math.floor(this.d_numVisible / 2);
            return (this.d_numVisible % 2) ? index : index - 1;
        };
        GalleriaThumbnails.prototype.onTransitionEnd = function () {
            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                dom.DomHandler.addClass(this.itemsContainer.nativeElement, 'ui-items-hidden');
                this.itemsContainer.nativeElement.style.transition = '';
            }
        };
        GalleriaThumbnails.prototype.onTouchEnd = function (e) {
            var touchobj = e.changedTouches[0];
            if (this.isVertical) {
                this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
            }
            else {
                this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
            }
        };
        GalleriaThumbnails.prototype.onTouchMove = function (e) {
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaThumbnails.prototype.onTouchStart = function (e) {
            var touchobj = e.changedTouches[0];
            this.startPos = {
                x: touchobj.pageX,
                y: touchobj.pageY
            };
        };
        GalleriaThumbnails.prototype.isNavBackwardDisabled = function () {
            return (!this.circular && this._activeIndex === 0) || (this.value.length <= this.d_numVisible);
        };
        GalleriaThumbnails.prototype.isNavForwardDisabled = function () {
            return (!this.circular && this._activeIndex === (this.value.length - 1)) || (this.value.length <= this.d_numVisible);
        };
        GalleriaThumbnails.prototype.firstItemAciveIndex = function () {
            return this.totalShiftedItems * -1;
        };
        GalleriaThumbnails.prototype.lastItemActiveIndex = function () {
            return this.firstItemAciveIndex() + this.d_numVisible - 1;
        };
        GalleriaThumbnails.prototype.isItemActive = function (index) {
            return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
        };
        GalleriaThumbnails.prototype.bindDocumentListeners = function () {
            var _this = this;
            if (!this.documentResizeListener) {
                this.documentResizeListener = function () {
                    _this.calculatePosition();
                };
                window.addEventListener('resize', this.documentResizeListener);
            }
        };
        GalleriaThumbnails.prototype.unbindDocumentListeners = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        GalleriaThumbnails.prototype.ngOnDestroy = function () {
            if (this.responsiveOptions) {
                this.unbindDocumentListeners();
            }
            if (this.thumbnailsStyle) {
                this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
            }
        };
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "containerId", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "isVertical", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "slideShowActive", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "circular", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "responsiveOptions", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "contentHeight", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "showThumbnailNavigators", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "templates", void 0);
        __decorate([
            core.Output()
        ], GalleriaThumbnails.prototype, "onActiveIndexChange", void 0);
        __decorate([
            core.Output()
        ], GalleriaThumbnails.prototype, "stopSlideShow", void 0);
        __decorate([
            core.ViewChild('itemsContainer')
        ], GalleriaThumbnails.prototype, "itemsContainer", void 0);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "numVisible", null);
        __decorate([
            core.Input()
        ], GalleriaThumbnails.prototype, "activeIndex", null);
        GalleriaThumbnails = __decorate([
            core.Component({
                selector: 'p-galleriaThumbnails',
                template: "\n        <div class=\"ui-galleria-thumbnail-wrapper\">\n            <div class=\"ui-galleria-thumbnail-container\">\n                <button *ngIf=\"showThumbnailNavigators\" [ngClass]=\"{'ui-galleria-thumbnail-prev ui-link': true, 'ui-state-disabled': this.isNavBackwardDisabled()}\" (click)=\"navBackward($event)\" [disabled]=\"isNavBackwardDisabled()\">\n                    <span [ngClass]=\"{'ui-galleria-thumbnail-prev-icon pi': true, 'pi-chevron-left': !this.isVertical, 'pi-chevron-up': this.isVertical}\"></span>\n                </button>\n                <div class=\"ui-galleria-thumbnail-items-container\" [ngStyle]=\"{'height': isVertical ? contentHeight : ''}\">\n                    <div #itemsContainer class=\"ui-galleria-thumbnail-items\" (transitionend)=\"onTransitionEnd()\"\n                        (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd($event)\">\n                        <div *ngFor=\"let item of value; let index = index;\" [ngClass]=\"{'ui-galleria-thumbnail-item': true, 'ui-galleria-thumbnail-item-current': activeIndex === index, 'ui-galleria-thumbnail-item-active': isItemActive(index),\n                            'ui-galleria-thumbnail-item-start': firstItemAciveIndex() === index, 'ui-galleria-thumbnail-item-end': lastItemActiveIndex() === index }\">\n                            <div class=\"ui-galleria-thumbnail-item-content\" [attr.tabindex]=\"getTabIndex(index)\" (click)=\"onItemClick(index)\" (keydown.enter)=\"onItemClick(index)\">\n                                <p-galleriaItemSlot type=\"thumbnail\" [item]=\"item\" [templates]=\"templates\"></p-galleriaItemSlot>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <button *ngIf=\"showThumbnailNavigators\" [ngClass]=\"{'ui-galleria-thumbnail-next ui-link': true, 'ui-state-disabled': this.isNavForwardDisabled()}\" (click)=\"navForward($event)\" [disabled]=\"isNavForwardDisabled()\">\n                    <span [ngClass]=\"{'ui-galleria-thumbnail-next-icon pi': true, 'pi-chevron-right': !this.isVertical, 'pi-chevron-down': this.isVertical}\"></span>\n                </button>\n            </div>\n        </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], GalleriaThumbnails);
        return GalleriaThumbnails;
    }());
    var GalleriaModule = /** @class */ (function () {
        function GalleriaModule() {
        }
        GalleriaModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, api.SharedModule],
                exports: [common.CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, api.SharedModule],
                declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
            })
        ], GalleriaModule);
        return GalleriaModule;
    }());

    exports.Galleria = Galleria;
    exports.GalleriaContent = GalleriaContent;
    exports.GalleriaItem = GalleriaItem;
    exports.GalleriaItemSlot = GalleriaItemSlot;
    exports.GalleriaModule = GalleriaModule;
    exports.GalleriaThumbnails = GalleriaThumbnails;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-galleria.umd.js.map
