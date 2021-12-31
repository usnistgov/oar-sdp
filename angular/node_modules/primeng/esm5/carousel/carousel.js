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
import { Component, Input, ElementRef, ViewChild, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone, EventEmitter, Output, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';
var Carousel = /** @class */ (function () {
    function Carousel(el, zone) {
        this.el = el;
        this.zone = zone;
        this.orientation = "horizontal";
        this.verticalViewPortHeight = "300px";
        this.contentClass = "";
        this.dotsContainerClass = "";
        this.circular = false;
        this.autoplayInterval = 0;
        this.onPage = new EventEmitter();
        this._numVisible = 1;
        this._numScroll = 1;
        this._oldNumScroll = 0;
        this.prevState = {
            numScroll: 0,
            numVisible: 0,
            value: []
        };
        this.defaultNumScroll = 1;
        this.defaultNumVisible = 1;
        this._page = 0;
        this.isRemainingItemsAdded = false;
        this.remainingItems = 0;
        this.swipeThreshold = 20;
        this.totalShiftedItems = this.page * this.numScroll * -1;
    }
    Object.defineProperty(Carousel.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            if (this.isCreated && val !== this._page) {
                if (this.autoplayInterval) {
                    this.stopAutoplay();
                    this.allowAutoplay = false;
                }
                if (val > this._page && val < (this.totalDots() - 1)) {
                    this.step(-1, val);
                }
                else if (val < this._page && val !== 0) {
                    this.step(1, val);
                }
            }
            this._page = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "numVisible", {
        get: function () {
            return this._numVisible;
        },
        set: function (val) {
            this._numVisible = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "numScroll", {
        get: function () {
            return this._numVisible;
        },
        set: function (val) {
            this._numScroll = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.circular && this._value) {
                this.setCloneItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Carousel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.id = UniqueComponentId();
        this.allowAutoplay = !!this.autoplayInterval;
        if (this.circular) {
            this.setCloneItems();
        }
        if (this.responsiveOptions) {
            this.defaultNumScroll = this._numScroll;
            this.defaultNumVisible = this._numVisible;
        }
        this.createStyle();
        this.calculatePosition();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Carousel.prototype.ngAfterContentChecked = function () {
        var isCircular = this.isCircular();
        var totalShiftedItems = this.totalShiftedItems;
        if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            var page = this._page;
            if (this.totalDots() !== 0 && page >= this.totalDots()) {
                page = this.totalDots() - 1;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            totalShiftedItems = (page * this._numScroll) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
                totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
                this.isRemainingItemsAdded = true;
            }
            else {
                this.isRemainingItemsAdded = false;
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            this._oldNumScroll = this._numScroll;
            this.prevState.numScroll = this._numScroll;
            this.prevState.numVisible = this._numVisible;
            this.prevState.value = this._value;
            if (this.totalDots() > 0 && this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            }
            this.isCreated = true;
            if (this.autoplayInterval && this.isAutoplay()) {
                this.startAutoplay();
            }
        }
        if (isCircular) {
            if (this.page === 0) {
                totalShiftedItems = -1 * this._numVisible;
            }
            else if (totalShiftedItems === 0) {
                totalShiftedItems = -1 * this.value.length;
                if (this.remainingItems > 0) {
                    this.isRemainingItemsAdded = true;
                }
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
        }
    };
    Carousel.prototype.createStyle = function () {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        var innerHTML = "\n            #" + this.id + " .ui-carousel-item {\n\t\t\t\tflex: 1 0 " + (100 / this.numVisible) + "%\n\t\t\t}\n        ";
        if (this.responsiveOptions) {
            this.responsiveOptions.sort(function (data1, data2) {
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
            for (var i = 0; i < this.responsiveOptions.length; i++) {
                var res = this.responsiveOptions[i];
                innerHTML += "\n                    @media screen and (max-width: " + res.breakpoint + ") {\n                        #" + this.id + " .ui-carousel-item {\n                            flex: 1 0 " + (100 / res.numVisible) + "%\n                        }\n                    }\n                ";
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    };
    Carousel.prototype.calculatePosition = function () {
        if (this.itemsContainer && this.responsiveOptions) {
            var windowWidth = window.innerWidth;
            var matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (var i = 0; i < this.responsiveOptions.length; i++) {
                var res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                var page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                var totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }
                this.totalShiftedItems = totalShiftedItems;
                this._numScroll = matchedResponsiveData.numScroll;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }
        }
    };
    Carousel.prototype.setCloneItems = function () {
        var _a, _b;
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            (_a = this.clonedItemsForStarting).push.apply(_a, __spread(this.value.slice(-1 * this._numVisible)));
            (_b = this.clonedItemsForFinishing).push.apply(_b, __spread(this.value.slice(0, this._numVisible)));
        }
    };
    Carousel.prototype.firstIndex = function () {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    };
    Carousel.prototype.lastIndex = function () {
        return this.firstIndex() + this.numVisible - 1;
    };
    Carousel.prototype.totalDots = function () {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    };
    Carousel.prototype.totalDotsArray = function () {
        var totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    };
    Carousel.prototype.containerClass = function () {
        return {
            'ui-carousel ui-widget': true,
            'ui-carousel-vertical': this.isVertical(),
            'ui-carousel-horizontal': !this.isVertical()
        };
    };
    Carousel.prototype.contentClasses = function () {
        return 'ui-carousel-content ' + this.contentClass;
    };
    Carousel.prototype.dotsContentClasses = function () {
        return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
    };
    Carousel.prototype.isVertical = function () {
        return this.orientation === 'vertical';
    };
    Carousel.prototype.isCircular = function () {
        return this.circular && this.value && this.value.length >= this.numVisible;
    };
    Carousel.prototype.isAutoplay = function () {
        return this.autoplayInterval && this.allowAutoplay;
    };
    Carousel.prototype.isForwardNavDisabled = function () {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    };
    Carousel.prototype.isBackwardNavDisabled = function () {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    };
    Carousel.prototype.isEmpty = function () {
        return !this.value || this.value.length === 0;
    };
    Carousel.prototype.navForward = function (e, index) {
        if (this.isCircular() || this._page < (this.totalDots() - 1)) {
            this.step(-1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.navBackward = function (e, index) {
        if (this.isCircular() || this._page !== 0) {
            this.step(1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.onDotClick = function (e, index) {
        var page = this._page;
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (index > page) {
            this.navForward(e, index);
        }
        else if (index < page) {
            this.navBackward(e, index);
        }
    };
    Carousel.prototype.step = function (dir, page) {
        var totalShiftedItems = this.totalShiftedItems;
        var isCircular = this.isCircular();
        if (page != null) {
            totalShiftedItems = (this._numScroll * page) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            this.isRemainingItemsAdded = false;
        }
        else {
            totalShiftedItems += (this._numScroll * dir);
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - (this._numScroll * dir);
                this.isRemainingItemsAdded = false;
            }
            var originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
            page = Math.abs(Math.floor((originalShiftedItems / this._numScroll)));
        }
        if (isCircular && this.page === (this.totalDots() - 1) && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        }
        else if (isCircular && this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = (this.totalDots() - 1);
        }
        else if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
            totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
            this.isRemainingItemsAdded = true;
        }
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    };
    Carousel.prototype.startAutoplay = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.totalDots() > 0) {
                if (_this.page === (_this.totalDots() - 1)) {
                    _this.step(-1, 0);
                }
                else {
                    _this.step(-1, _this.page + 1);
                }
            }
        }, this.autoplayInterval);
    };
    Carousel.prototype.stopAutoplay = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    Carousel.prototype.onTransitionEnd = function () {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + this.totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + this.totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            }
        }
    };
    Carousel.prototype.onTouchStart = function (e) {
        var touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    };
    Carousel.prototype.onTouchMove = function (e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.onTouchEnd = function (e) {
        var touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    };
    Carousel.prototype.changePageOnTouch = function (e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            }
            else {
                this.navBackward(e);
            }
        }
    };
    Carousel.prototype.bindDocumentListeners = function () {
        var _this = this;
        if (!this.documentResizeListener) {
            this.documentResizeListener = function (e) {
                _this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    };
    Carousel.prototype.unbindDocumentListeners = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Carousel.prototype.ngOnDestroy = function () {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    };
    Carousel.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Carousel.prototype, "page", null);
    __decorate([
        Input()
    ], Carousel.prototype, "numVisible", null);
    __decorate([
        Input()
    ], Carousel.prototype, "numScroll", null);
    __decorate([
        Input()
    ], Carousel.prototype, "responsiveOptions", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "verticalViewPortHeight", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "contentClass", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "dotsContainerClass", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "value", null);
    __decorate([
        Input()
    ], Carousel.prototype, "circular", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "autoplayInterval", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "style", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "styleClass", void 0);
    __decorate([
        Output()
    ], Carousel.prototype, "onPage", void 0);
    __decorate([
        ViewChild('itemsContainer')
    ], Carousel.prototype, "itemsContainer", void 0);
    __decorate([
        ContentChild(Header)
    ], Carousel.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer)
    ], Carousel.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Carousel.prototype, "templates", void 0);
    Carousel = __decorate([
        Component({
            selector: 'p-carousel',
            template: "\n\t\t<div [attr.id]=\"id\" [ngClass]=\"containerClass()\" [ngStyle]=\"style\" [class]=\"styleClass\">\n\t\t\t<div class=\"ui-carousel-header\" *ngIf=\"headerFacet\">\n\t\t\t\t<ng-content select=\"p-header\"></ng-content>\n\t\t\t</div>\n\t\t\t<div [class]=\"contentClasses()\">\n\t\t\t\t<div class=\"ui-carousel-container\">\n\t\t\t\t\t<button [ngClass]=\"{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}\" [disabled]=\"isBackwardNavDisabled()\" (click)=\"navBackward($event)\">\n\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"ui-carousel-items-content\" [ngStyle]=\"{'height': isVertical() ? verticalViewPortHeight : 'auto'}\">\n\t\t\t\t\t\t<div #itemsContainer class=\"ui-carousel-items-container\" (transitionend)=\"onTransitionEnd()\" (touchend)=\"onTouchEnd($event)\" (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\">\n\t\t\t\t\t\t\t<div *ngFor=\"let item of clonedItemsForStarting; let index = index\" [ngClass]= \"{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),\n\t\t\t\t\t\t\t'ui-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let item of value; let index = index\" [ngClass]= \"{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),\n\t\t\t\t\t\t\t'ui-carousel-item-start': firstIndex() === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': lastIndex() === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let item of clonedItemsForFinishing; let index = index\" [ngClass]= \"{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),\n\t\t\t\t\t\t\t'ui-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button [ngClass]=\"{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}\" [disabled]=\"isForwardNavDisabled()\" (click)=\"navForward($event)\">\n\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<ul [class]=\"dotsContentClasses()\">\n\t\t\t\t\t<li *ngFor=\"let totalDot of totalDotsArray(); let i = index\" [ngClass]=\"{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}\">\n\t\t\t\t\t\t<button class=\"ui-button ui-widget ui-state-default ui-corner-all\" (click)=\"onDotClick($event, i)\">\n\t\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}\"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"ui-carousel-footer\" *ngIf=\"footerFacet\">\n\t\t\t\t<ng-content select=\"p-footer\"></ng-content>\n\t\t\t</div>\n\t\t</div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Carousel);
    return Carousel;
}());
export { Carousel };
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [CommonModule, Carousel, SharedModule],
            declarations: [Carousel]
        })
    ], CarouselModule);
    return CarouselModule;
}());
export { CarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2Nhcm91c2VsLyIsInNvdXJjZXMiOlsiY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbE4sT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0RsRDtJQWlJQyxrQkFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUExRjdDLGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLE9BQU8sQ0FBQztRQUVqQyxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFZaEMsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV6QixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFNeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTVELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUFRO1lBQ2hCLFNBQVMsRUFBQyxDQUFDO1lBQ1gsVUFBVSxFQUFDLENB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QUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSwraEhBNkNOO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLFFBQVEsQ0Fxa0JwQjtJQUFELGVBQUM7Q0FBQSxBQXJrQkQsSUFxa0JDO1NBcmtCWSxRQUFRO0FBNGtCckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztZQUNyQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztZQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDeEIsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBOZ01vZHVsZSwgTmdab25lLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlLCBIZWFkZXIsIEZvb3RlciB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdwLWNhcm91c2VsJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2IFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1oZWFkZXJcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XG5cdFx0XHRcdDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IFtjbGFzc109XCJjb250ZW50Q2xhc3NlcygpXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtcHJldiB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNCYWNrd2FyZE5hdkRpc2FibGVkKCl9XCIgW2Rpc2FibGVkXT1cImlzQmFja3dhcmROYXZEaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIj5cblx0XHRcdFx0XHRcdDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtcHJldi1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tbGVmdCc6ICFpc1ZlcnRpY2FsKCksICdwaS1jaGV2cm9uLXVwJzogaXNWZXJ0aWNhbCgpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidWktY2Fyb3VzZWwtaXRlbXMtY29udGVudFwiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXNWZXJ0aWNhbCgpID8gdmVydGljYWxWaWV3UG9ydEhlaWdodCA6ICdhdXRvJ31cIj5cblx0XHRcdFx0XHRcdDxkaXYgI2l0ZW1zQ29udGFpbmVyIGNsYXNzPVwidWktY2Fyb3VzZWwtaXRlbXMtY29udGFpbmVyXCIgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCIgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIiAodG91Y2htb3ZlKT1cIm9uVG91Y2hNb3ZlKCRldmVudClcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3VpLWNhcm91c2VsLWl0ZW0gdWktY2Fyb3VzZWwtaXRlbS1jbG9uZWQnOiB0cnVlLCd1aS1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6ICh0b3RhbFNoaWZ0ZWRJdGVtcyAqIC0xKSA9PT0gKHZhbHVlLmxlbmd0aCksXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLXN0YXJ0JzogMCA9PT0gaW5kZXgsXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLWVuZCc6IChjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nLmxlbmd0aCAtIDEpID09PSBpbmRleH1cIj5cblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgbGV0IGluZGV4ID0gaW5kZXhcIiBbbmdDbGFzc109IFwieyd1aS1jYXJvdXNlbC1pdGVtJzogdHJ1ZSwndWktY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAoZmlyc3RJbmRleCgpIDw9IGluZGV4ICYmIGxhc3RJbmRleCgpID49IGluZGV4KSxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiBmaXJzdEluZGV4KCkgPT09IGluZGV4LFxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1lbmQnOiBsYXN0SW5kZXgoKSA9PT0gaW5kZXh9XCI+XG5cdFx0XHRcdFx0XHRcdFx0PG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmc7IGxldCBpbmRleCA9IGluZGV4XCIgW25nQ2xhc3NdPSBcInsndWktY2Fyb3VzZWwtaXRlbSB1aS1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsJ3VpLWNhcm91c2VsLWl0ZW0tYWN0aXZlJzogKCh0b3RhbFNoaWZ0ZWRJdGVtcyAqLTEpID09PSBudW1WaXNpYmxlKSxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiAwID09PSBpbmRleCxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tZW5kJzogKGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nLmxlbmd0aCAtIDEpID09PSBpbmRleH1cIj5cblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxidXR0b24gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1uZXh0IHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNGb3J3YXJkTmF2RGlzYWJsZWQoKX1cIiBbZGlzYWJsZWRdPVwiaXNGb3J3YXJkTmF2RGlzYWJsZWQoKVwiIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIj5cblx0XHRcdFx0XHRcdDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtbmV4dC1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tcmlnaHQnOiAhaXNWZXJ0aWNhbCgpLCAncGktY2hldnJvbi1kb3duJzogaXNWZXJ0aWNhbCgpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDx1bCBbY2xhc3NdPVwiZG90c0NvbnRlbnRDbGFzc2VzKClcIj5cblx0XHRcdFx0XHQ8bGkgKm5nRm9yPVwibGV0IHRvdGFsRG90IG9mIHRvdGFsRG90c0FycmF5KCk7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLWRvdC1pdGVtJzp0cnVlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOiBfcGFnZSA9PT0gaX1cIj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbkRvdENsaWNrKCRldmVudCwgaSlcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1kb3QtaWNvbiBwaSc6dHJ1ZSwgJ3BpLWNpcmNsZS1vbic6IF9wYWdlID09PSBpLCAncGktY2lyY2xlLW9mZic6ICEoX3BhZ2UgPT09IGkpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XG5cdFx0XHRcdDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuXHRASW5wdXQoKSBnZXQgcGFnZSgpOm51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhZ2U7XG5cdH1cblx0c2V0IHBhZ2UodmFsOm51bWJlcikge1xuXHRcdGlmICh0aGlzLmlzQ3JlYXRlZCAmJiB2YWwgIT09IHRoaXMuX3BhZ2UpIHtcblx0XHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcblx0XHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh2YWwgPiB0aGlzLl9wYWdlICYmIHZhbCA8ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpIHtcblx0XHRcdFx0dGhpcy5zdGVwKC0xLCB2YWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodmFsIDwgdGhpcy5fcGFnZSAmJiB2YWwgIT09IDApIHtcblx0XHRcdFx0dGhpcy5zdGVwKDEsIHZhbCk7XG5cdFx0XHR9XG5cdFx0fSBcblxuXHRcdHRoaXMuX3BhZ2UgPSB2YWw7XG5cdH1cblx0XHRcblx0QElucHV0KCkgZ2V0IG51bVZpc2libGUoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuXHR9XG5cdHNldCBudW1WaXNpYmxlKHZhbDpudW1iZXIpIHtcblx0XHR0aGlzLl9udW1WaXNpYmxlID0gdmFsO1xuXHR9XG5cdFx0XG5cdEBJbnB1dCgpIGdldCBudW1TY3JvbGwoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuXHR9XG5cdHNldCBudW1TY3JvbGwodmFsOm51bWJlcikge1xuXHRcdHRoaXMuX251bVNjcm9sbCA9IHZhbDtcblx0fVxuXHRcblx0QElucHV0KCkgcmVzcG9uc2l2ZU9wdGlvbnM6IGFueVtdO1xuXHRcblx0QElucHV0KCkgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcblx0XG5cdEBJbnB1dCgpIHZlcnRpY2FsVmlld1BvcnRIZWlnaHQgPSBcIjMwMHB4XCI7XG5cdFxuXHRASW5wdXQoKSBjb250ZW50Q2xhc3M6IFN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KCkgZG90c0NvbnRhaW5lckNsYXNzOiBTdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dCgpIGdldCB2YWx1ZSgpIDphbnlbXSB7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xuXHR9O1xuXHRzZXQgdmFsdWUodmFsKSB7XG5cdFx0dGhpcy5fdmFsdWUgPSB2YWw7XG5cdFx0aWYgKHRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fdmFsdWUpIHtcblx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xuXHRcdH1cblx0fVxuXHRcblx0QElucHV0KCkgY2lyY3VsYXI6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdEBJbnB1dCgpIGF1dG9wbGF5SW50ZXJ2YWw6bnVtYmVyID0gMDtcblxuXHRASW5wdXQoKSBzdHlsZTogYW55O1xuXG5cdEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblx0XG4gICAgQE91dHB1dCgpIG9uUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0QFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInKSBpdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuXHRAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyRmFjZXQ7XG5cblx0QENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG5cdF9udW1WaXNpYmxlOiBudW1iZXIgPSAxO1xuXG5cdF9udW1TY3JvbGw6IG51bWJlciA9IDE7XG5cblx0X29sZE51bVNjcm9sbDogbnVtYmVyID0gMDtcblxuXHRwcmV2U3RhdGU6IGFueSA9IHtcblx0XHRudW1TY3JvbGw6MCxcblx0XHRudW1WaXNpYmxlOjAsXG5cdFx0dmFsdWU6IFtdXG5cdH07XG5cblx0ZGVmYXVsdE51bVNjcm9sbDpudW1iZXIgPSAxO1xuXG5cdGRlZmF1bHROdW1WaXNpYmxlOm51bWJlciA9IDE7XG5cblx0X3BhZ2U6IG51bWJlciA9IDA7XG5cblx0X3ZhbHVlOiBhbnlbXTtcblxuXHRjYXJvdXNlbFN0eWxlOmFueTtcblxuXHRpZDpzdHJpbmc7XG5cblx0dG90YWxTaGlmdGVkSXRlbXM7XG5cblx0aXNSZW1haW5pbmdJdGVtc0FkZGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRhbmltYXRpb25UaW1lb3V0OmFueTtcblxuXHR0cmFuc2xhdGVUaW1lb3V0OmFueTtcblxuXHRyZW1haW5pbmdJdGVtczogbnVtYmVyID0gMDtcblxuXHRfaXRlbXM6IGFueVtdO1xuXG5cdHN0YXJ0UG9zOiBhbnk7XG5cblx0ZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG5cdGNsb25lZEl0ZW1zRm9yU3RhcnRpbmc6IGFueVtdO1xuXG5cdGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nOiBhbnlbXTtcblxuXHRhbGxvd0F1dG9wbGF5OiBib29sZWFuO1xuXG5cdGludGVydmFsOiBhbnk7XG5cblx0aXNDcmVhdGVkOiBib29sZWFuO1xuXG5cdHN3aXBlVGhyZXNob2xkOiBudW1iZXIgPSAyMDtcblxuXHRwdWJsaWMgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkgeyBcblx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5wYWdlICogdGhpcy5udW1TY3JvbGwgKiAtMTsgXG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5pZCA9IFVuaXF1ZUNvbXBvbmVudElkKCk7XG5cdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gISF0aGlzLmF1dG9wbGF5SW50ZXJ2YWw7XG5cblx0XHRpZiAodGhpcy5jaXJjdWxhcikge1xuXHRcdFx0dGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdHRoaXMuZGVmYXVsdE51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcblx0XHRcdHRoaXMuZGVmYXVsdE51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xuXHRcdH1cblxuXHRcdHRoaXMuY3JlYXRlU3R5bGUoKTtcblx0XHR0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0dGhpcy5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKTtcblx0XHR9XG5cblx0XHR0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG5cdFx0XHRzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG5cdFx0XHRcdGNhc2UgJ2l0ZW0nOlxuXHRcdFx0XHRcdHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcblx0XHRjb25zdCBpc0NpcmN1bGFyID0gdGhpcy5pc0NpcmN1bGFyKCk7XG5cdFx0bGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcztcblx0XHRcblx0XHRpZiAodGhpcy52YWx1ZSAmJiAodGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsICE9PSB0aGlzLl9udW1TY3JvbGwgfHwgdGhpcy5wcmV2U3RhdGUubnVtVmlzaWJsZSAhPT0gdGhpcy5fbnVtVmlzaWJsZSB8fCB0aGlzLnByZXZTdGF0ZS52YWx1ZS5sZW5ndGggIT09IHRoaXMudmFsdWUubGVuZ3RoKSkge1xuXHRcdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0aGlzLnJlbWFpbmluZ0l0ZW1zID0gKHRoaXMudmFsdWUubGVuZ3RoIC0gdGhpcy5fbnVtVmlzaWJsZSkgJSB0aGlzLl9udW1TY3JvbGw7XG5cblx0XHRcdGxldCBwYWdlID0gdGhpcy5fcGFnZTtcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpICE9PSAwICYmIHBhZ2UgPj0gdGhpcy50b3RhbERvdHMoKSkge1xuICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLnRvdGFsRG90cygpIC0gMTtcblx0XHRcdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0XHRcdHRoaXMub25QYWdlLmVtaXQoe1xuXHRcdFx0XHRcdHBhZ2U6IHRoaXMucGFnZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAocGFnZSAqIHRoaXMuX251bVNjcm9sbCkgKiAtMTtcbiAgICAgICAgICAgIGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgLT0gdGhpcy5fbnVtVmlzaWJsZTtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0aWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKC0xICogdGhpcy5yZW1haW5pbmdJdGVtcykgKyB0aGlzLl9udW1TY3JvbGw7XG5cdFx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG90YWxTaGlmdGVkSXRlbXMgIT09IHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgICAgICB9XG5cblx0XHRcdHRoaXMuX29sZE51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcblx0XHRcdHRoaXMucHJldlN0YXRlLm51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcblx0XHRcdHRoaXMucHJldlN0YXRlLm51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xuXHRcdFx0dGhpcy5wcmV2U3RhdGUudmFsdWUgPSB0aGlzLl92YWx1ZTtcblxuXHRcdFx0aWYgKHRoaXMudG90YWxEb3RzKCkgPiAwICYmIHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLmlzVmVydGljYWwoKSA/IGB0cmFuc2xhdGUzZCgwLCAke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMClgIDogYHRyYW5zbGF0ZTNkKCR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcblxuXHRcdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmlzQXV0b3BsYXkoKSkge1xuXHRcdFx0XHR0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNDaXJjdWxhcikge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiB0aGlzLl9udW1WaXNpYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodG90YWxTaGlmdGVkSXRlbXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IC0xICogdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nSXRlbXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykge1xuXHRcdFx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgICAgICB9XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlU3R5bGUoKSB7XG5cdFx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTdHlsZSkge1xuXHRcdFx0XHR0aGlzLmNhcm91c2VsU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdFx0XHR0aGlzLmNhcm91c2VsU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jYXJvdXNlbFN0eWxlKTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICMke3RoaXMuaWR9IC51aS1jYXJvdXNlbC1pdGVtIHtcblx0XHRcdFx0ZmxleDogMSAwICR7ICgxMDAvIHRoaXMubnVtVmlzaWJsZSkgfSVcblx0XHRcdH1cbiAgICAgICAgYDtcblxuXHRcdFx0aWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5yZXNwb25zaXZlT3B0aW9ucy5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZTEgPSBkYXRhMS5icmVha3BvaW50O1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlMiA9IGRhdGEyLmJyZWFrcG9pbnQ7XG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IG51bGw7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyICE9IG51bGwpXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAtMTtcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZTEgIT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcblx0XHRcdFx0XHRcdHJlc3VsdCA9IDE7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAwO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZTIgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyLCB1bmRlZmluZWQsIHsgbnVtZXJpYzogdHJ1ZSB9KTtcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAodmFsdWUxIDwgdmFsdWUyKSA/IC0xIDogKHZhbHVlMSA+IHZhbHVlMikgPyAxIDogMDtcblxuXHRcdFx0XHRcdHJldHVybiAtMSAqIHJlc3VsdDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlc3BvbnNpdmVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGV0IHJlcyA9IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cblx0XHRcdFx0XHRpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3Jlcy5icmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIyR7dGhpcy5pZH0gLnVpLWNhcm91c2VsLWl0ZW0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMCAkeyAoMTAwLyByZXMubnVtVmlzaWJsZSkgfSVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmNhcm91c2VsU3R5bGUuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdH1cblxuXHRjYWxjdWxhdGVQb3NpdGlvbigpIHtcblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lciAmJiB0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHRsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdGxldCBtYXRjaGVkUmVzcG9uc2l2ZURhdGEgPSB7XG5cdFx0XHRcdG51bVZpc2libGU6IHRoaXMuZGVmYXVsdE51bVZpc2libGUsXG5cdFx0XHRcdG51bVNjcm9sbDogdGhpcy5kZWZhdWx0TnVtU2Nyb2xsXG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHJlcyA9IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cblx0XHRcdFx0aWYgKHBhcnNlSW50KHJlcy5icmVha3BvaW50LCAxMCkgPj0gd2luZG93V2lkdGgpIHtcblx0XHRcdFx0XHRtYXRjaGVkUmVzcG9uc2l2ZURhdGEgPSByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX251bVNjcm9sbCAhPT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCkge1xuXHRcdFx0XHRsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XG5cdFx0XHRcdHBhZ2UgPSBNYXRoLmZsb29yKChwYWdlICogdGhpcy5fbnVtU2Nyb2xsKSAvIG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwpO1xuXG5cdFx0XHRcdGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IChtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsICogdGhpcy5wYWdlKSAqIC0xO1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xuXHRcdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdFx0XHR0aGlzLl9udW1TY3JvbGwgPSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsO1xuXG5cdFx0XHRcdHRoaXMuX3BhZ2UgPSBwYWdlO1xuXHRcdFx0XHR0aGlzLm9uUGFnZS5lbWl0KHtcblx0XHRcdFx0XHRwYWdlOiB0aGlzLnBhZ2Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9udW1WaXNpYmxlICE9PSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZSkge1xuXHRcdFx0XHR0aGlzLl9udW1WaXNpYmxlID0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XG5cdFx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0c2V0Q2xvbmVJdGVtcygpIHtcblx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yU3RhcnRpbmcgPSBbXTtcblx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yRmluaXNoaW5nID0gW107XG5cdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpKSB7XG5cdFx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yU3RhcnRpbmcucHVzaCguLi50aGlzLnZhbHVlLnNsaWNlKC0xICogdGhpcy5fbnVtVmlzaWJsZSkpO1xuXHRcdFx0dGhpcy5jbG9uZWRJdGVtc0ZvckZpbmlzaGluZy5wdXNoKC4uLnRoaXMudmFsdWUuc2xpY2UoMCwgdGhpcy5fbnVtVmlzaWJsZSkpO1xuXHRcdH1cblx0fVxuXG5cdGZpcnN0SW5kZXgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNDaXJjdWxhcigpID8gKC0xICogKHRoaXMudG90YWxTaGlmdGVkSXRlbXMgKyB0aGlzLm51bVZpc2libGUpKSA6ICh0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogLTEpO1xuXHR9XG5cblx0bGFzdEluZGV4KCkge1xuXHRcdHJldHVybiB0aGlzLmZpcnN0SW5kZXgoKSArIHRoaXMubnVtVmlzaWJsZSAtIDE7XG5cdH1cblxuXHR0b3RhbERvdHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWUgPyBNYXRoLmNlaWwoKHRoaXMudmFsdWUubGVuZ3RoIC0gdGhpcy5fbnVtVmlzaWJsZSkgLyB0aGlzLl9udW1TY3JvbGwpICsgMSA6IDA7XG5cdH1cblxuXHR0b3RhbERvdHNBcnJheSgpIHtcblx0XHRjb25zdCB0b3RhbERvdHMgPSB0aGlzLnRvdGFsRG90cygpO1xuXHRcdHJldHVybiB0b3RhbERvdHMgPD0gMCA/IFtdIDogQXJyYXkodG90YWxEb3RzKS5maWxsKDApO1xuXHR9XG5cblx0Y29udGFpbmVyQ2xhc3MoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdCd1aS1jYXJvdXNlbCB1aS13aWRnZXQnOnRydWUsIFxuXHRcdFx0J3VpLWNhcm91c2VsLXZlcnRpY2FsJzogdGhpcy5pc1ZlcnRpY2FsKCksXG5cdFx0XHQndWktY2Fyb3VzZWwtaG9yaXpvbnRhbCc6ICF0aGlzLmlzVmVydGljYWwoKVxuXHRcdH07XG5cdH1cblxuXHRjb250ZW50Q2xhc3NlcygpIHtcblx0XHRyZXR1cm4gJ3VpLWNhcm91c2VsLWNvbnRlbnQgJysgdGhpcy5jb250ZW50Q2xhc3M7XG5cdH1cblxuXHRkb3RzQ29udGVudENsYXNzZXMoKSB7XG5cdFx0cmV0dXJuICd1aS1jYXJvdXNlbC1kb3RzLWNvbnRhaW5lciB1aS1oZWxwZXItcmVzZXQgJyArIHRoaXMuZG90c0NvbnRhaW5lckNsYXNzO1xuXHR9XG5cblx0aXNWZXJ0aWNhbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJztcblx0fVxuXG5cdGlzQ2lyY3VsYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2lyY3VsYXIgJiYgdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm51bVZpc2libGU7XG5cdH1cblxuXHRpc0F1dG9wbGF5KCkge1xuXHRcdHJldHVybiB0aGlzLmF1dG9wbGF5SW50ZXJ2YWwgJiYgdGhpcy5hbGxvd0F1dG9wbGF5O1xuXHR9XG5cblx0aXNGb3J3YXJkTmF2RGlzYWJsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNFbXB0eSgpIHx8ICh0aGlzLl9wYWdlID49ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgIXRoaXMuaXNDaXJjdWxhcigpKTtcblx0fVxuXG5cdGlzQmFja3dhcmROYXZEaXNhYmxlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pc0VtcHR5KCkgfHwgKHRoaXMuX3BhZ2UgPD0gMCAgJiYgIXRoaXMuaXNDaXJjdWxhcigpKTtcblx0fVxuXG5cdGlzRW1wdHkoKSB7XG5cdFx0cmV0dXJuICF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoID09PSAwO1xuXHR9XG5cblx0bmF2Rm9yd2FyZChlLGluZGV4Pykge1xuXHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSB8fCB0aGlzLl9wYWdlIDwgKHRoaXMudG90YWxEb3RzKCkgLSAxKSkge1xuXHRcdFx0dGhpcy5zdGVwKC0xLCBpbmRleCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChlICYmIGUuY2FuY2VsYWJsZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXG5cdG5hdkJhY2t3YXJkKGUsaW5kZXg/KSB7XG5cdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpIHx8IHRoaXMuX3BhZ2UgIT09IDApIHtcblx0XHRcdHRoaXMuc3RlcCgxLCBpbmRleCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRvbkRvdENsaWNrKGUsIGluZGV4KSB7XG5cdFx0bGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xuXG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoaW5kZXggPiBwYWdlKSB7XG5cdFx0XHR0aGlzLm5hdkZvcndhcmQoZSwgaW5kZXgpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChpbmRleCA8IHBhZ2UpIHtcblx0XHRcdHRoaXMubmF2QmFja3dhcmQoZSwgaW5kZXgpO1xuXHRcdH1cblx0fVxuXG5cdHN0ZXAoZGlyLCBwYWdlKSB7XG5cdFx0bGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcztcblx0XHRjb25zdCBpc0NpcmN1bGFyID0gdGhpcy5pc0NpcmN1bGFyKCk7XG5cblx0XHRpZiAocGFnZSAhPSBudWxsKSB7XG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyA9ICh0aGlzLl9udW1TY3JvbGwgKiBwYWdlKSAqIC0xO1xuXG5cdFx0XHRpZiAoaXNDaXJjdWxhcikge1xuXHRcdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyAtPSB0aGlzLl9udW1WaXNpYmxlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9ICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpO1xuXHRcdFx0aWYgKHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkKSB7XG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9IHRoaXMucmVtYWluaW5nSXRlbXMgLSAodGhpcy5fbnVtU2Nyb2xsICogZGlyKTtcblx0XHRcdFx0dGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IG9yaWdpbmFsU2hpZnRlZEl0ZW1zID0gaXNDaXJjdWxhciA/ICh0b3RhbFNoaWZ0ZWRJdGVtcyArIHRoaXMuX251bVZpc2libGUpIDogdG90YWxTaGlmdGVkSXRlbXM7XG5cdFx0XHRwYWdlID0gTWF0aC5hYnMoTWF0aC5mbG9vcigob3JpZ2luYWxTaGlmdGVkSXRlbXMgLyB0aGlzLl9udW1TY3JvbGwpKSk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzQ2lyY3VsYXIgJiYgdGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpICYmIGRpciA9PT0gLTEpIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiAodGhpcy52YWx1ZS5sZW5ndGggKyB0aGlzLl9udW1WaXNpYmxlKTtcblx0XHRcdHBhZ2UgPSAwO1xuXHRcdH1cblx0XHRlbHNlIGlmIChpc0NpcmN1bGFyICYmIHRoaXMucGFnZSA9PT0gMCAmJiBkaXIgPT09IDEpIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gMDtcblx0XHRcdHBhZ2UgPSAodGhpcy50b3RhbERvdHMoKSAtIDEpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChwYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpICYmIHRoaXMucmVtYWluaW5nSXRlbXMgPiAwKSB7XG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyArPSAoKHRoaXMucmVtYWluaW5nSXRlbXMgKiAtMSkgLSAodGhpcy5fbnVtU2Nyb2xsICogZGlyKSk7XG5cdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuaXRlbXNDb250YWluZXIpIHtcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLmlzVmVydGljYWwoKSA/IGB0cmFuc2xhdGUzZCgwLCAke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMClgIDogYHRyYW5zbGF0ZTNkKCR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG5cdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gNTAwbXMgZWFzZSAwcyc7XG5cdFx0fVxuXG5cdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdHRoaXMuX3BhZ2UgPSBwYWdlO1xuXHRcdHRoaXMub25QYWdlLmVtaXQoe1xuXHRcdFx0cGFnZTogdGhpcy5wYWdlXG5cdFx0fSk7XG5cdH1cblxuXHRzdGFydEF1dG9wbGF5KCkge1xuXHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy50b3RhbERvdHMoKSA+IDApIHtcblx0XHRcdFx0aWYgKHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSkge1xuXHRcdFx0XHRcdHRoaXMuc3RlcCgtMSwgMCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zdGVwKC0xLCB0aGlzLnBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIFxuXHRcdHRoaXMuYXV0b3BsYXlJbnRlcnZhbCk7XG5cdH1cblxuXHRzdG9wQXV0b3BsYXkoKSB7XG5cdFx0aWYgKHRoaXMuaW50ZXJ2YWwpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG5cdFx0fVxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kKCkge1xuXHRcdGlmICh0aGlzLml0ZW1zQ29udGFpbmVyKSB7XG5cdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuXG5cdFx0XHRpZiAoKHRoaXMucGFnZSA9PT0gMCB8fCB0aGlzLnBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpICYmIHRoaXMuaXNDaXJjdWxhcigpKSB7XG5cdFx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLmlzVmVydGljYWwoKSA/IGB0cmFuc2xhdGUzZCgwLCAke3RoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG9uVG91Y2hTdGFydChlKSB7XG5cdFx0bGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdHRoaXMuc3RhcnRQb3MgPSB7XG5cdFx0XHR4OiB0b3VjaG9iai5wYWdlWCxcblx0XHRcdHk6IHRvdWNob2JqLnBhZ2VZXG5cdFx0fTtcblx0fVxuXG5cdG9uVG91Y2hNb3ZlKGUpIHtcblx0XHRpZiAoZS5jYW5jZWxhYmxlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cdG9uVG91Y2hFbmQoZSkge1xuXHRcdGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHRpZiAodGhpcy5pc1ZlcnRpY2FsKCkpIHtcblx0XHRcdHRoaXMuY2hhbmdlUGFnZU9uVG91Y2goZSwgKHRvdWNob2JqLnBhZ2VZIC0gdGhpcy5zdGFydFBvcy55KSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCAodG91Y2hvYmoucGFnZVggLSB0aGlzLnN0YXJ0UG9zLngpKTtcblx0XHR9XG5cdH1cblxuXHRjaGFuZ2VQYWdlT25Ub3VjaChlLCBkaWZmKSB7XG5cdFx0aWYgKE1hdGguYWJzKGRpZmYpID4gdGhpcy5zd2lwZVRocmVzaG9sZCkge1xuXHRcdFx0aWYgKGRpZmYgPCAwKSB7XG5cdFx0XHRcdHRoaXMubmF2Rm9yd2FyZChlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLm5hdkJhY2t3YXJkKGUpO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YmluZERvY3VtZW50TGlzdGVuZXJzKCkge1xuXHRcdGlmICghdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG5cdFx0XHR0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSAoZSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcblx0XHR9XG5cdH1cblxuXHR1bmJpbmREb2N1bWVudExpc3RlbmVycygpIHtcblx0XHRpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcblx0XHRcdHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdHRoaXMudW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHR9XG4gICAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG5cdGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIENhcm91c2VsLCBTaGFyZWRNb2R1bGVdLFxuXHRkZWNsYXJhdGlvbnM6IFtDYXJvdXNlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxNb2R1bGUgeyB9XG4iXX0=