import { EventEmitter, ElementRef, Input, ViewChild, Output, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { UniqueComponentId } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Galleria = class Galleria {
    constructor(element) {
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
        this.activeIndexChange = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this._visible = false;
        this._activeIndex = 0;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    get visible() {
        return this._visible;
    }
    ;
    set visible(visible) {
        this._visible = visible;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerFacet = item.template;
                    break;
                case 'footer':
                    this.footerFacet = item.template;
                    break;
                case 'indicator':
                    this.indicatorFacet = item.template;
                    break;
                case 'caption':
                    this.captionFacet = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChanges) {
        if (this.fullScreen && simpleChanges.visible) {
            if (simpleChanges.visible.currentValue) {
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
                this.zIndex = String(this.baseZIndex + ++DomHandler.zindex);
            }
            else {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
        }
    }
    onMaskHide() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
    onActiveItemChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeIndexChange.emit(index);
        }
    }
    ngOnDestroy() {
        if (this.fullScreen) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
    }
};
Galleria.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Galleria.prototype, "activeIndex", null);
__decorate([
    Input()
], Galleria.prototype, "fullScreen", void 0);
__decorate([
    Input()
], Galleria.prototype, "id", void 0);
__decorate([
    Input()
], Galleria.prototype, "value", void 0);
__decorate([
    Input()
], Galleria.prototype, "numVisible", void 0);
__decorate([
    Input()
], Galleria.prototype, "responsiveOptions", void 0);
__decorate([
    Input()
], Galleria.prototype, "showItemNavigators", void 0);
__decorate([
    Input()
], Galleria.prototype, "showThumbnailNavigators", void 0);
__decorate([
    Input()
], Galleria.prototype, "showItemNavigatorsOnHover", void 0);
__decorate([
    Input()
], Galleria.prototype, "changeItemOnIndicatorHover", void 0);
__decorate([
    Input()
], Galleria.prototype, "circular", void 0);
__decorate([
    Input()
], Galleria.prototype, "autoPlay", void 0);
__decorate([
    Input()
], Galleria.prototype, "transitionInterval", void 0);
__decorate([
    Input()
], Galleria.prototype, "showThumbnails", void 0);
__decorate([
    Input()
], Galleria.prototype, "thumbnailsPosition", void 0);
__decorate([
    Input()
], Galleria.prototype, "verticalThumbnailViewPortHeight", void 0);
__decorate([
    Input()
], Galleria.prototype, "showIndicators", void 0);
__decorate([
    Input()
], Galleria.prototype, "showIndicatorsOnItem", void 0);
__decorate([
    Input()
], Galleria.prototype, "indicatorsPosition", void 0);
__decorate([
    Input()
], Galleria.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Galleria.prototype, "maskClass", void 0);
__decorate([
    Input()
], Galleria.prototype, "containerClass", void 0);
__decorate([
    Input()
], Galleria.prototype, "containerStyle", void 0);
__decorate([
    ViewChild('mask', { static: false })
], Galleria.prototype, "mask", void 0);
__decorate([
    Input()
], Galleria.prototype, "visible", null);
__decorate([
    Output()
], Galleria.prototype, "activeIndexChange", void 0);
__decorate([
    Output()
], Galleria.prototype, "visibleChange", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Galleria.prototype, "templates", void 0);
Galleria = __decorate([
    Component({
        selector: 'p-galleria',
        template: `
        <div *ngIf="fullScreen;else windowed">
            <div *ngIf="visible"  #mask [ngClass]="{'ui-galleria-mask ui-widget-overlay':true, 'ui-galleria-visible': this.visible}" [class]="maskClass" [ngStyle]="{'zIndex':zIndex}">
                <p-galleriaContent (maskHide)="onMaskHide()" (activeItemChange)="onActiveItemChange($event)" [ngStyle]="containerStyle"></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Galleria);
let GalleriaContent = class GalleriaContent {
    constructor(galleria) {
        this.galleria = galleria;
        this.maskHide = new EventEmitter();
        this.activeItemChange = new EventEmitter();
        this.id = this.galleria.id || UniqueComponentId();
        this.slideShowActicve = false;
        this._activeIndex = 0;
        this.slideShowActive = true;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    galleriaClass() {
        const thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('ui-galleria-thumbnails', this.galleria.thumbnailsPosition);
        const indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('ui-galleria-indicators', this.galleria.indicatorsPosition);
        return (this.galleria.containerClass ? this.galleria.containerClass + " " : '') + (thumbnailsPosClass ? thumbnailsPosClass + " " : '') + (indicatorPosClass ? indicatorPosClass + " " : '');
    }
    startSlideShow() {
        this.interval = setInterval(() => {
            let activeIndex = (this.galleria.circular && (this.galleria.value.length - 1) === this.galleria.activeIndex) ? 0 : (this.galleria.activeIndex + 1);
            this.onActiveIndexChange(activeIndex);
            this.activeIndex = activeIndex;
        }, this.galleria.transitionInterval);
        this.slideShowActive = true;
    }
    stopSlideShow() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideShowActive = false;
    }
    getPositionClass(preClassName, position) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find(item => item === position);
        return pos ? `${preClassName}-${pos}` : '';
    }
    isVertical() {
        return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
    }
    onActiveIndexChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeItemChange.emit(this.activeIndex);
        }
    }
};
GalleriaContent.ctorParameters = () => [
    { type: Galleria }
];
__decorate([
    Input()
], GalleriaContent.prototype, "activeIndex", null);
__decorate([
    Output()
], GalleriaContent.prototype, "maskHide", void 0);
__decorate([
    Output()
], GalleriaContent.prototype, "activeItemChange", void 0);
GalleriaContent = __decorate([
    Component({
        selector: 'p-galleriaContent',
        template: `
        <div [attr.id]="id" *ngIf="galleria.value && galleria.value.length > 0" [ngClass]="{'ui-galleria ui-widget': true, 'ui-galleria-fullscreen': this.galleria.fullScreen, 
            'ui-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem, 'ui-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen}"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}" [class]="galleriaClass()">
            <button *ngIf="galleria.fullScreen" type="button" class="ui-galleria-close ui-link ui-widget ui-state-default ui-corner-all" (click)="maskHide.emit()">
                <span class="ui-galleria-close-icon pi pi-times"></span>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="ui-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="ui-galleria-content">
                <p-galleriaItem [value]="galleria.value" [activeIndex]="galleria.activeIndex" [circular]="galleria.circular" [templates]="galleria.templates" (onActiveIndexChange)="onActiveIndexChange($event)" 
                    [showIndicators]="galleria.showIndicators" [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover" [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet" [showItemNavigators]="galleria.showItemNavigators" [autoPlay]="galleria.autoPlay" [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()" (stopSlideShow)="stopSlideShow()"></p-galleriaItem>

                <p-galleriaThumbnails *ngIf="galleria.showThumbnails" [containerId]="id" [value]="galleria.value" (onActiveIndexChange)="onActiveIndexChange($event)" [activeIndex]="galleria.activeIndex" [templates]="galleria.templates"
                    [numVisible]="galleria.numVisible" [responsiveOptions]="galleria.responsiveOptions" [circular]="galleria.circular"
                    [isVertical]="isVertical()" [contentHeight]="galleria.verticalThumbnailViewPortHeight" [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive" (stopSlideShow)="stopSlideShow()"></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="ui-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], GalleriaContent);
let GalleriaItemSlot = class GalleriaItemSlot {
    get item() {
        return this._item;
    }
    ;
    set item(item) {
        this._item = item;
        if (this.templates) {
            this.templates.forEach((item) => {
                if (item.getType() === this.type) {
                    switch (this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            this.context = { $implicit: this.item };
                            this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            if (item.getType() === this.type) {
                switch (this.type) {
                    case 'item':
                    case 'caption':
                    case 'thumbnail':
                        this.context = { $implicit: this.item };
                        this.contentTemplate = item.template;
                        break;
                    case 'indicator':
                        this.context = { $implicit: this.index };
                        this.contentTemplate = item.template;
                        break;
                    default:
                        this.context = {};
                        this.contentTemplate = item.template;
                        break;
                }
            }
        });
    }
};
__decorate([
    Input()
], GalleriaItemSlot.prototype, "templates", void 0);
__decorate([
    Input()
], GalleriaItemSlot.prototype, "index", void 0);
__decorate([
    Input()
], GalleriaItemSlot.prototype, "item", null);
__decorate([
    Input()
], GalleriaItemSlot.prototype, "type", void 0);
GalleriaItemSlot = __decorate([
    Component({
        selector: 'p-galleriaItemSlot',
        template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], GalleriaItemSlot);
let GalleriaItem = class GalleriaItem {
    constructor() {
        this.circular = false;
        this.showItemNavigators = false;
        this.showIndicators = true;
        this.slideShowActive = true;
        this.changeItemOnIndicatorHover = true;
        this.autoPlay = false;
        this.startSlideShow = new EventEmitter();
        this.stopSlideShow = new EventEmitter();
        this.onActiveIndexChange = new EventEmitter();
        this._activeIndex = 0;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
        this.activeItem = this.value[this._activeIndex];
    }
    ngOnInit() {
        if (this.autoPlay) {
            this.startSlideShow.emit();
        }
    }
    next() {
        let nextItemIndex = this.activeIndex + 1;
        let activeIndex = this.circular && this.value.length - 1 === this.activeIndex
            ? 0
            : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    prev() {
        let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
        let activeIndex = this.circular && this.activeIndex === 0
            ? this.value.length - 1
            : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    navForward(e) {
        this.stopTheSlideShow();
        this.next();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        this.prev();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onIndicatorClick(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }
    onIndicatorMouseEnter(index) {
        if (this.changeItemOnIndicatorHover) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }
    onIndicatorKeyDown(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }
    isNavForwardDisabled() {
        return !this.circular && this.activeIndex === (this.value.length - 1);
    }
    isNavBackwardDisabled() {
        return !this.circular && this.activeIndex === 0;
    }
    isIndicatorItemActive(index) {
        return this.activeIndex === index;
    }
};
__decorate([
    Input()
], GalleriaItem.prototype, "circular", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "value", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "showItemNavigators", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "showIndicators", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "slideShowActive", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "changeItemOnIndicatorHover", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "autoPlay", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "templates", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "indicatorFacet", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "captionFacet", void 0);
__decorate([
    Output()
], GalleriaItem.prototype, "startSlideShow", void 0);
__decorate([
    Output()
], GalleriaItem.prototype, "stopSlideShow", void 0);
__decorate([
    Output()
], GalleriaItem.prototype, "onActiveIndexChange", void 0);
__decorate([
    Input()
], GalleriaItem.prototype, "activeIndex", null);
GalleriaItem = __decorate([
    Component({
        selector: 'p-galleriaItem',
        template: `
        <div class="ui-galleria-item-container">
            <button *ngIf="showItemNavigators" type="button" [ngClass]="{'ui-galleria-item-prev ui-galleria-item-nav ui-link': true, 'ui-state-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" 
                [disabled]="isNavBackwardDisabled()">
                <span class="ui-galleria-item-prev-icon pi pi-chevron-left"></span>
            </button>
            <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="ui-galleria-item"></p-galleriaItemSlot>
            <button *ngIf="showItemNavigators" type="button" [ngClass]="{'ui-galleria-item-next ui-galleria-item-nav ui-link': true,'ui-state-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)" 
                [disabled]="isNavForwardDisabled()">
                <span class="ui-galleria-item-next-icon pi pi-chevron-right"></span>
            </button>
            <div class="ui-galleria-caption" *ngIf="captionFacet">
                <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
            </div>
        </div>
        <ul *ngIf="showIndicators" class="ui-galleria-indicators ui-helper-reset">
            <li *ngFor="let item of value; let index = index;" tabindex="0"
                (click)="onIndicatorClick(index)" (mouseenter)="onIndicatorMouseEnter(index)" (keydown.enter)="onIndicatorKeyDown(index)"
                [ngClass]="{'ui-galleria-indicator': true,'ui-state-highlight': isIndicatorItemActive(index)}">
                <button type="button" tabIndex="-1" class="ui-link" *ngIf="!indicatorFacet">
                </button>
                <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
            </li>
        </ul>
    `,
        host: {
            '[class.ui-galleria-item-wrapper]': 'true',
        },
        changeDetection: ChangeDetectionStrategy.Default
    })
], GalleriaItem);
let GalleriaThumbnails = class GalleriaThumbnails {
    constructor() {
        this.isVertical = false;
        this.slideShowActive = false;
        this.circular = false;
        this.contentHeight = "300px";
        this.showThumbnailNavigators = true;
        this.onActiveIndexChange = new EventEmitter();
        this.stopSlideShow = new EventEmitter();
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
    get numVisible() {
        return this._numVisible;
    }
    ;
    set numVisible(numVisible) {
        this._numVisible = numVisible;
        this._oldNumVisible = this.d_numVisible;
        this.d_numVisible = numVisible;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._oldactiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
    }
    ngOnInit() {
        this.createStyle();
        this.calculatePosition();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
    }
    ngAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;
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
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            }
            if (this._oldactiveIndex !== this._activeIndex) {
                DomHandler.removeClass(this.itemsContainer.nativeElement, 'ui-items-hidden');
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this._oldactiveIndex = this._activeIndex;
            this._oldNumVisible = this.d_numVisible;
        }
    }
    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = document.createElement('style');
            this.thumbnailsStyle.type = 'text/css';
            document.body.appendChild(this.thumbnailsStyle);
        }
        let innerHTML = `
            #${this.containerId} .ui-galleria-thumbnail-item {
                flex: 1 0 ${(100 / this.d_numVisible)}%
            }
        `;
        if (this.responsiveOptions) {
            this.sortedResponsiveOptions = [...this.responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
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
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .ui-galleria-thumbnail-item {
                            flex: 1 0 ${(100 / res.numVisible)}%
                        }
                    }
                `;
            }
        }
        this.thumbnailsStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.itemsContainer && this.sortedResponsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this._numVisible
            };
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                this.d_numVisible = matchedResponsiveData.numVisible;
            }
        }
    }
    getTabIndex(index) {
        return this.isItemActive(index) ? 0 : null;
    }
    navForward(e) {
        this.stopTheSlideShow();
        let nextItemIndex = this._activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
        }
        let activeIndex = this.circular && (this.value.length - 1) === this._activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if ((this.d_numVisible - diff - 1) > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) !== 0 || this.circular)) {
            this.step(1);
        }
        let activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onItemClick(index) {
        this.stopTheSlideShow();
        let selectedItemIndex = index;
        if (selectedItemIndex !== this._activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
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
    }
    step(dir) {
        let totalShiftedItems = this.totalShiftedItems + dir;
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
            DomHandler.removeClass(this.itemsContainer.nativeElement, 'ui-items-hidden');
            this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    changePageOnTouch(e, diff) {
        if (diff < 0) { // left
            this.navForward(e);
        }
        else { // right
            this.navBackward(e);
        }
    }
    getTotalPageNumber() {
        return this.value.length > this.d_numVisible ? (this.value.length - this.d_numVisible) + 1 : 0;
    }
    getMedianItemIndex() {
        let index = Math.floor(this.d_numVisible / 2);
        return (this.d_numVisible % 2) ? index : index - 1;
    }
    onTransitionEnd() {
        if (this.itemsContainer && this.itemsContainer.nativeElement) {
            DomHandler.addClass(this.itemsContainer.nativeElement, 'ui-items-hidden');
            this.itemsContainer.nativeElement.style.transition = '';
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    isNavBackwardDisabled() {
        return (!this.circular && this._activeIndex === 0) || (this.value.length <= this.d_numVisible);
    }
    isNavForwardDisabled() {
        return (!this.circular && this._activeIndex === (this.value.length - 1)) || (this.value.length <= this.d_numVisible);
    }
    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }
    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible - 1;
    }
    isItemActive(index) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }
    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = () => {
                this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
        }
    }
};
__decorate([
    Input()
], GalleriaThumbnails.prototype, "containerId", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "value", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "isVertical", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "slideShowActive", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "circular", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "responsiveOptions", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "contentHeight", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "showThumbnailNavigators", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "templates", void 0);
__decorate([
    Output()
], GalleriaThumbnails.prototype, "onActiveIndexChange", void 0);
__decorate([
    Output()
], GalleriaThumbnails.prototype, "stopSlideShow", void 0);
__decorate([
    ViewChild('itemsContainer')
], GalleriaThumbnails.prototype, "itemsContainer", void 0);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "numVisible", null);
__decorate([
    Input()
], GalleriaThumbnails.prototype, "activeIndex", null);
GalleriaThumbnails = __decorate([
    Component({
        selector: 'p-galleriaThumbnails',
        template: `
        <div class="ui-galleria-thumbnail-wrapper">
            <div class="ui-galleria-thumbnail-container">
                <button *ngIf="showThumbnailNavigators" [ngClass]="{'ui-galleria-thumbnail-prev ui-link': true, 'ui-state-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()">
                    <span [ngClass]="{'ui-galleria-thumbnail-prev-icon pi': true, 'pi-chevron-left': !this.isVertical, 'pi-chevron-up': this.isVertical}"></span>
                </button>
                <div class="ui-galleria-thumbnail-items-container" [ngStyle]="{'height': isVertical ? contentHeight : ''}">
                    <div #itemsContainer class="ui-galleria-thumbnail-items" (transitionend)="onTransitionEnd()"
                        (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)">
                        <div *ngFor="let item of value; let index = index;" [ngClass]="{'ui-galleria-thumbnail-item': true, 'ui-galleria-thumbnail-item-current': activeIndex === index, 'ui-galleria-thumbnail-item-active': isItemActive(index),
                            'ui-galleria-thumbnail-item-start': firstItemAciveIndex() === index, 'ui-galleria-thumbnail-item-end': lastItemActiveIndex() === index }">
                            <div class="ui-galleria-thumbnail-item-content" [attr.tabindex]="getTabIndex(index)" (click)="onItemClick(index)" (keydown.enter)="onItemClick(index)">
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button *ngIf="showThumbnailNavigators" [ngClass]="{'ui-galleria-thumbnail-next ui-link': true, 'ui-state-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)" [disabled]="isNavForwardDisabled()">
                    <span [ngClass]="{'ui-galleria-thumbnail-next-icon pi': true, 'pi-chevron-right': !this.isVertical, 'pi-chevron-down': this.isVertical}"></span>
                </button>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], GalleriaThumbnails);
let GalleriaModule = class GalleriaModule {
};
GalleriaModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
        declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
    })
], GalleriaModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Galleria, GalleriaContent, GalleriaItem, GalleriaItemSlot, GalleriaModule, GalleriaThumbnails };
//# sourceMappingURL=primeng-galleria.js.map
