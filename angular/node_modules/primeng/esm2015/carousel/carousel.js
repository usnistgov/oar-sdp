var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input, ElementRef, ViewChild, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone, EventEmitter, Output, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';
let Carousel = class Carousel {
    constructor(el, zone) {
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
    get page() {
        return this._page;
    }
    set page(val) {
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
    }
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(val) {
        this._numVisible = val;
    }
    get numScroll() {
        return this._numVisible;
    }
    set numScroll(val) {
        this._numScroll = val;
    }
    get value() {
        return this._value;
    }
    ;
    set value(val) {
        this._value = val;
        if (this.circular && this._value) {
            this.setCloneItems();
        }
    }
    ngAfterContentInit() {
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
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterContentChecked() {
        const isCircular = this.isCircular();
        let totalShiftedItems = this.totalShiftedItems;
        if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            let page = this._page;
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
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
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
    }
    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        let innerHTML = `
            #${this.id} .ui-carousel-item {
				flex: 1 0 ${(100 / this.numVisible)}%
			}
        `;
        if (this.responsiveOptions) {
            this.responsiveOptions.sort((data1, data2) => {
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
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .ui-carousel-item {
                            flex: 1 0 ${(100 / res.numVisible)}%
                        }
                    }
                `;
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.itemsContainer && this.responsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                let totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
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
    }
    setCloneItems() {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
            this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
        }
    }
    firstIndex() {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    }
    lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
    }
    totalDots() {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }
    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    }
    containerClass() {
        return {
            'ui-carousel ui-widget': true,
            'ui-carousel-vertical': this.isVertical(),
            'ui-carousel-horizontal': !this.isVertical()
        };
    }
    contentClasses() {
        return 'ui-carousel-content ' + this.contentClass;
    }
    dotsContentClasses() {
        return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    isCircular() {
        return this.circular && this.value && this.value.length >= this.numVisible;
    }
    isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
    }
    isForwardNavDisabled() {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    }
    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    }
    isEmpty() {
        return !this.value || this.value.length === 0;
    }
    navForward(e, index) {
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
    }
    navBackward(e, index) {
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
    }
    onDotClick(e, index) {
        let page = this._page;
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
    }
    step(dir, page) {
        let totalShiftedItems = this.totalShiftedItems;
        const isCircular = this.isCircular();
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
            let originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
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
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    }
    startAutoplay() {
        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this.page === (this.totalDots() - 1)) {
                    this.step(-1, 0);
                }
                else {
                    this.step(-1, this.page + 1);
                }
            }
        }, this.autoplayInterval);
    }
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    onTransitionEnd() {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }
    changePageOnTouch(e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            }
            else {
                this.navBackward(e);
            }
        }
    }
    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = (e) => {
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
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
};
Carousel.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
        template: `
		<div [attr.id]="id" [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
			<div class="ui-carousel-header" *ngIf="headerFacet">
				<ng-content select="p-header"></ng-content>
			</div>
			<div [class]="contentClasses()">
				<div class="ui-carousel-container">
					<button [ngClass]="{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}" [disabled]="isBackwardNavDisabled()" (click)="navBackward($event)">
						<span [ngClass]="{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}"></span>
					</button>
					<div class="ui-carousel-items-content" [ngStyle]="{'height': isVertical() ? verticalViewPortHeight : 'auto'}">
						<div #itemsContainer class="ui-carousel-items-container" (transitionend)="onTransitionEnd()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
							<div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of value; let index = index" [ngClass]= "{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
							'ui-carousel-item-start': firstIndex() === index,
							'ui-carousel-item-end': lastIndex() === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of clonedItemsForFinishing; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
						</div>
					</div>
					<button [ngClass]="{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}" [disabled]="isForwardNavDisabled()" (click)="navForward($event)">
						<span [ngClass]="{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}"></span>
					</button>
				</div>
				<ul [class]="dotsContentClasses()">
					<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}">
						<button class="ui-button ui-widget ui-state-default ui-corner-all" (click)="onDotClick($event, i)">
							<span [ngClass]="{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}"></span>
						</button>
					</li>
				</ul>
			</div>
			<div class="ui-carousel-footer" *ngIf="footerFacet">
				<ng-content select="p-footer"></ng-content>
			</div>
		</div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Carousel);
export { Carousel };
let CarouselModule = class CarouselModule {
};
CarouselModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [CommonModule, Carousel, SharedModule],
        declarations: [Carousel]
    })
], CarouselModule);
export { CarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2Nhcm91c2VsLyIsInNvdXJjZXMiOlsiY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xOLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW9EbEQsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQWlJcEIsWUFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUExRjdDLGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLE9BQU8sQ0FBQztRQUVqQyxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFZaEMsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV6QixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFNeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTVELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUFRO1lBQ2hCLFNBQVMsRUFBQyxDQUFDO1lBQ1gsVUFBVSxF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O0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ1QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztRQUNyQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDeEIsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIE5nTW9kdWxlLCBOZ1pvbmUsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBDb250ZW50Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUsIEhlYWRlciwgRm9vdGVyIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3AtY2Fyb3VzZWwnLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxkaXYgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWhlYWRlclwiICpuZ0lmPVwiaGVhZGVyRmFjZXRcIj5cblx0XHRcdFx0PG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgW2NsYXNzXT1cImNvbnRlbnRDbGFzc2VzKClcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxidXR0b24gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1wcmV2IHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzp0cnVlLCAndWktc3RhdGUtZGlzYWJsZWQnOiBpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKX1cIiBbZGlzYWJsZWRdPVwiaXNCYWNrd2FyZE5hdkRpc2FibGVkKClcIiAoY2xpY2spPVwibmF2QmFja3dhcmQoJGV2ZW50KVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1wcmV2LWljb24gcGknOiB0cnVlLCAncGktY2hldnJvbi1sZWZ0JzogIWlzVmVydGljYWwoKSwgJ3BpLWNoZXZyb24tdXAnOiBpc1ZlcnRpY2FsKCl9XCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1pdGVtcy1jb250ZW50XCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpc1ZlcnRpY2FsKCkgPyB2ZXJ0aWNhbFZpZXdQb3J0SGVpZ2h0IDogJ2F1dG8nfVwiPlxuXHRcdFx0XHRcdFx0PGRpdiAjaXRlbXNDb250YWluZXIgY2xhc3M9XCJ1aS1jYXJvdXNlbC1pdGVtcy1jb250YWluZXJcIiAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKCRldmVudClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNsb25lZEl0ZW1zRm9yU3RhcnRpbmc7IGxldCBpbmRleCA9IGluZGV4XCIgW25nQ2xhc3NdPSBcInsndWktY2Fyb3VzZWwtaXRlbSB1aS1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsJ3VpLWNhcm91c2VsLWl0ZW0tYWN0aXZlJzogKHRvdGFsU2hpZnRlZEl0ZW1zICogLTEpID09PSAodmFsdWUubGVuZ3RoKSxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiAwID09PSBpbmRleCxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tZW5kJzogKGNsb25lZEl0ZW1zRm9yU3RhcnRpbmcubGVuZ3RoIC0gMSkgPT09IGluZGV4fVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHZhbHVlOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3VpLWNhcm91c2VsLWl0ZW0nOiB0cnVlLCd1aS1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6IChmaXJzdEluZGV4KCkgPD0gaW5kZXggJiYgbGFzdEluZGV4KCkgPj0gaW5kZXgpLFxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1zdGFydCc6IGZpcnN0SW5kZXgoKSA9PT0gaW5kZXgsXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLWVuZCc6IGxhc3RJbmRleCgpID09PSBpbmRleH1cIj5cblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjbG9uZWRJdGVtc0ZvckZpbmlzaGluZzsgbGV0IGluZGV4ID0gaW5kZXhcIiBbbmdDbGFzc109IFwieyd1aS1jYXJvdXNlbC1pdGVtIHVpLWNhcm91c2VsLWl0ZW0tY2xvbmVkJzogdHJ1ZSwndWktY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAoKHRvdGFsU2hpZnRlZEl0ZW1zICotMSkgPT09IG51bVZpc2libGUpLFxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1zdGFydCc6IDAgPT09IGluZGV4LFxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1lbmQnOiAoY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcubGVuZ3RoIC0gMSkgPT09IGluZGV4fVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGJ1dHRvbiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLW5leHQgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktc3RhdGUtZGlzYWJsZWQnOiBpc0ZvcndhcmROYXZEaXNhYmxlZCgpfVwiIFtkaXNhYmxlZF09XCJpc0ZvcndhcmROYXZEaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm5hdkZvcndhcmQoJGV2ZW50KVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1uZXh0LWljb24gcGknOiB0cnVlLCAncGktY2hldnJvbi1yaWdodCc6ICFpc1ZlcnRpY2FsKCksICdwaS1jaGV2cm9uLWRvd24nOiBpc1ZlcnRpY2FsKCl9XCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PHVsIFtjbGFzc109XCJkb3RzQ29udGVudENsYXNzZXMoKVwiPlxuXHRcdFx0XHRcdDxsaSAqbmdGb3I9XCJsZXQgdG90YWxEb3Qgb2YgdG90YWxEb3RzQXJyYXkoKTsgbGV0IGkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtZG90LWl0ZW0nOnRydWUsJ3VpLXN0YXRlLWhpZ2hsaWdodCc6IF9wYWdlID09PSBpfVwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm9uRG90Q2xpY2soJGV2ZW50LCBpKVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLWRvdC1pY29uIHBpJzp0cnVlLCAncGktY2lyY2xlLW9uJzogX3BhZ2UgPT09IGksICdwaS1jaXJjbGUtb2ZmJzogIShfcGFnZSA9PT0gaSl9XCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0PC91bD5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyRmFjZXRcIj5cblx0XHRcdFx0PG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG5cdEBJbnB1dCgpIGdldCBwYWdlKCk6bnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fcGFnZTtcblx0fVxuXHRzZXQgcGFnZSh2YWw6bnVtYmVyKSB7XG5cdFx0aWYgKHRoaXMuaXNDcmVhdGVkICYmIHZhbCAhPT0gdGhpcy5fcGFnZSkge1xuXHRcdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhbCA+IHRoaXMuX3BhZ2UgJiYgdmFsIDwgKHRoaXMudG90YWxEb3RzKCkgLSAxKSkge1xuXHRcdFx0XHR0aGlzLnN0ZXAoLTEsIHZhbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh2YWwgPCB0aGlzLl9wYWdlICYmIHZhbCAhPT0gMCkge1xuXHRcdFx0XHR0aGlzLnN0ZXAoMSwgdmFsKTtcblx0XHRcdH1cblx0XHR9IFxuXG5cdFx0dGhpcy5fcGFnZSA9IHZhbDtcblx0fVxuXHRcdFxuXHRASW5wdXQoKSBnZXQgbnVtVmlzaWJsZSgpOm51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX251bVZpc2libGU7XG5cdH1cblx0c2V0IG51bVZpc2libGUodmFsOm51bWJlcikge1xuXHRcdHRoaXMuX251bVZpc2libGUgPSB2YWw7XG5cdH1cblx0XHRcblx0QElucHV0KCkgZ2V0IG51bVNjcm9sbCgpOm51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX251bVZpc2libGU7XG5cdH1cblx0c2V0IG51bVNjcm9sbCh2YWw6bnVtYmVyKSB7XG5cdFx0dGhpcy5fbnVtU2Nyb2xsID0gdmFsO1xuXHR9XG5cdFxuXHRASW5wdXQoKSByZXNwb25zaXZlT3B0aW9uczogYW55W107XG5cdFxuXHRASW5wdXQoKSBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuXHRcblx0QElucHV0KCkgdmVydGljYWxWaWV3UG9ydEhlaWdodCA9IFwiMzAwcHhcIjtcblx0XG5cdEBJbnB1dCgpIGNvbnRlbnRDbGFzczogU3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoKSBkb3RzQ29udGFpbmVyQ2xhc3M6IFN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KCkgZ2V0IHZhbHVlKCkgOmFueVtdIHtcblx0XHRyZXR1cm4gdGhpcy5fdmFsdWU7XG5cdH07XG5cdHNldCB2YWx1ZSh2YWwpIHtcblx0XHR0aGlzLl92YWx1ZSA9IHZhbDtcblx0XHRpZiAodGhpcy5jaXJjdWxhciAmJiB0aGlzLl92YWx1ZSkge1xuXHRcdFx0dGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG5cdFx0fVxuXHR9XG5cdFxuXHRASW5wdXQoKSBjaXJjdWxhcjpib29sZWFuID0gZmFsc2U7XG5cblx0QElucHV0KCkgYXV0b3BsYXlJbnRlcnZhbDpudW1iZXIgPSAwO1xuXG5cdEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cblx0QElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXHRcbiAgICBAT3V0cHV0KCkgb25QYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRAVmlld0NoaWxkKCdpdGVtc0NvbnRhaW5lcicpIGl0ZW1zQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG5cdEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXJGYWNldDtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDtcblxuXHRAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cblx0X251bVZpc2libGU6IG51bWJlciA9IDE7XG5cblx0X251bVNjcm9sbDogbnVtYmVyID0gMTtcblxuXHRfb2xkTnVtU2Nyb2xsOiBudW1iZXIgPSAwO1xuXG5cdHByZXZTdGF0ZTogYW55ID0ge1xuXHRcdG51bVNjcm9sbDowLFxuXHRcdG51bVZpc2libGU6MCxcblx0XHR2YWx1ZTogW11cblx0fTtcblxuXHRkZWZhdWx0TnVtU2Nyb2xsOm51bWJlciA9IDE7XG5cblx0ZGVmYXVsdE51bVZpc2libGU6bnVtYmVyID0gMTtcblxuXHRfcGFnZTogbnVtYmVyID0gMDtcblxuXHRfdmFsdWU6IGFueVtdO1xuXG5cdGNhcm91c2VsU3R5bGU6YW55O1xuXG5cdGlkOnN0cmluZztcblxuXHR0b3RhbFNoaWZ0ZWRJdGVtcztcblxuXHRpc1JlbWFpbmluZ0l0ZW1zQWRkZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdGFuaW1hdGlvblRpbWVvdXQ6YW55O1xuXG5cdHRyYW5zbGF0ZVRpbWVvdXQ6YW55O1xuXG5cdHJlbWFpbmluZ0l0ZW1zOiBudW1iZXIgPSAwO1xuXG5cdF9pdGVtczogYW55W107XG5cblx0c3RhcnRQb3M6IGFueTtcblxuXHRkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cblx0Y2xvbmVkSXRlbXNGb3JTdGFydGluZzogYW55W107XG5cblx0Y2xvbmVkSXRlbXNGb3JGaW5pc2hpbmc6IGFueVtdO1xuXG5cdGFsbG93QXV0b3BsYXk6IGJvb2xlYW47XG5cblx0aW50ZXJ2YWw6IGFueTtcblxuXHRpc0NyZWF0ZWQ6IGJvb2xlYW47XG5cblx0c3dpcGVUaHJlc2hvbGQ6IG51bWJlciA9IDIwO1xuXG5cdHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7IFxuXHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnBhZ2UgKiB0aGlzLm51bVNjcm9sbCAqIC0xOyBcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcblx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSAhIXRoaXMuYXV0b3BsYXlJbnRlcnZhbDtcblxuXHRcdGlmICh0aGlzLmNpcmN1bGFyKSB7XG5cdFx0XHR0aGlzLnNldENsb25lSXRlbXMoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0dGhpcy5kZWZhdWx0TnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuXHRcdFx0dGhpcy5kZWZhdWx0TnVtVmlzaWJsZSA9IHRoaXMuX251bVZpc2libGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVTdHlsZSgpO1xuXHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcblxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLmJpbmREb2N1bWVudExpc3RlbmVycygpO1xuXHRcdH1cblxuXHRcdHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcblx0XHRcdFx0Y2FzZSAnaXRlbSc6XG5cdFx0XHRcdFx0dGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdFxuXHRcdGlmICh0aGlzLnZhbHVlICYmICh0aGlzLnByZXZTdGF0ZS5udW1TY3JvbGwgIT09IHRoaXMuX251bVNjcm9sbCB8fCB0aGlzLnByZXZTdGF0ZS5udW1WaXNpYmxlICE9PSB0aGlzLl9udW1WaXNpYmxlIHx8IHRoaXMucHJldlN0YXRlLnZhbHVlLmxlbmd0aCAhPT0gdGhpcy52YWx1ZS5sZW5ndGgpKSB7XG5cdFx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMucmVtYWluaW5nSXRlbXMgPSAodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLl9udW1WaXNpYmxlKSAlIHRoaXMuX251bVNjcm9sbDtcblxuXHRcdFx0bGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xuXHRcdFx0aWYgKHRoaXMudG90YWxEb3RzKCkgIT09IDAgJiYgcGFnZSA+PSB0aGlzLnRvdGFsRG90cygpKSB7XG4gICAgICAgICAgICAgICAgcGFnZSA9IHRoaXMudG90YWxEb3RzKCkgLSAxO1xuXHRcdFx0XHR0aGlzLl9wYWdlID0gcGFnZTtcblx0XHRcdFx0dGhpcy5vblBhZ2UuZW1pdCh7XG5cdFx0XHRcdFx0cGFnZTogdGhpcy5wYWdlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyA9IChwYWdlICogdGhpcy5fbnVtU2Nyb2xsKSAqIC0xO1xuICAgICAgICAgICAgaWYgKGlzQ2lyY3VsYXIpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyAtPSB0aGlzLl9udW1WaXNpYmxlO1xuICAgICAgICAgICAgfVxuXG5cdFx0XHRpZiAocGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiB0aGlzLnJlbWFpbmluZ0l0ZW1zID4gMCkge1xuXHRcdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyArPSAoLTEgKiB0aGlzLnJlbWFpbmluZ0l0ZW1zKSArIHRoaXMuX251bVNjcm9sbDtcblx0XHRcdFx0dGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cblxuXHRcdFx0dGhpcy5fb2xkTnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuXHRcdFx0dGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuXHRcdFx0dGhpcy5wcmV2U3RhdGUubnVtVmlzaWJsZSA9IHRoaXMuX251bVZpc2libGU7XG5cdFx0XHR0aGlzLnByZXZTdGF0ZS52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuXG5cdFx0XHRpZiAodGhpcy50b3RhbERvdHMoKSA+IDAgJiYgdGhpcy5pdGVtc0NvbnRhaW5lciAmJiB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuXG5cdFx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsICYmIHRoaXMuaXNBdXRvcGxheSgpKSB7XG5cdFx0XHRcdHRoaXMuc3RhcnRBdXRvcGxheSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqIHRoaXMuX251bVZpc2libGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zICE9PSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zKSB7XG5cdFx0XHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cblx0XHR9XG5cdH1cblxuXHRjcmVhdGVTdHlsZSgpIHtcblx0XHRcdGlmICghdGhpcy5jYXJvdXNlbFN0eWxlKSB7XG5cdFx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhcm91c2VsU3R5bGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgIyR7dGhpcy5pZH0gLnVpLWNhcm91c2VsLWl0ZW0ge1xuXHRcdFx0XHRmbGV4OiAxIDAgJHsgKDEwMC8gdGhpcy5udW1WaXNpYmxlKSB9JVxuXHRcdFx0fVxuICAgICAgICBgO1xuXG5cdFx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0XHR0aGlzLnJlc3BvbnNpdmVPcHRpb25zLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlMSA9IGRhdGExLmJyZWFrcG9pbnQ7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUyID0gZGF0YTIuYnJlYWtwb2ludDtcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gbnVsbDtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbClcblx0XHRcdFx0XHRcdHJlc3VsdCA9IC0xO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gMTtcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcblx0XHRcdFx0XHRcdHJlc3VsdCA9IDA7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIsIHVuZGVmaW5lZCwgeyBudW1lcmljOiB0cnVlIH0pO1xuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xuXG5cdFx0XHRcdFx0cmV0dXJuIC0xICogcmVzdWx0O1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgcmVzID0gdGhpcy5yZXNwb25zaXZlT3B0aW9uc1tpXTtcblxuXHRcdFx0XHRcdGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7cmVzLmJyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfSAudWktY2Fyb3VzZWwtaXRlbSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSAwICR7ICgxMDAvIHJlcy5udW1WaXNpYmxlKSB9JVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0fVxuXG5cdGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xuXHRcdGlmICh0aGlzLml0ZW1zQ29udGFpbmVyICYmIHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0bGV0IG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHtcblx0XHRcdFx0bnVtVmlzaWJsZTogdGhpcy5kZWZhdWx0TnVtVmlzaWJsZSxcblx0XHRcdFx0bnVtU2Nyb2xsOiB0aGlzLmRlZmF1bHROdW1TY3JvbGxcblx0XHRcdH07XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcmVzID0gdGhpcy5yZXNwb25zaXZlT3B0aW9uc1tpXTtcblxuXHRcdFx0XHRpZiAocGFyc2VJbnQocmVzLmJyZWFrcG9pbnQsIDEwKSA+PSB3aW5kb3dXaWR0aCkge1xuXHRcdFx0XHRcdG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fbnVtU2Nyb2xsICE9PSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsKSB7XG5cdFx0XHRcdGxldCBwYWdlID0gdGhpcy5fcGFnZTtcblx0XHRcdFx0cGFnZSA9IE1hdGguZmxvb3IoKHBhZ2UgKiB0aGlzLl9udW1TY3JvbGwpIC8gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCk7XG5cblx0XHRcdFx0bGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gKG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwgKiB0aGlzLnBhZ2UpICogLTE7XG5cblx0XHRcdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpKSB7XG5cdFx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgLT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG5cdFx0XHRcdHRoaXMuX251bVNjcm9sbCA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGw7XG5cblx0XHRcdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0XHRcdHRoaXMub25QYWdlLmVtaXQoe1xuXHRcdFx0XHRcdHBhZ2U6IHRoaXMucGFnZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX251bVZpc2libGUgIT09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlKSB7XG5cdFx0XHRcdHRoaXMuX251bVZpc2libGUgPSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZTtcblx0XHRcdFx0dGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHRzZXRDbG9uZUl0ZW1zKCkge1xuXHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JTdGFydGluZyA9IFtdO1xuXHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcgPSBbXTtcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkpIHtcblx0XHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JTdGFydGluZy5wdXNoKC4uLnRoaXMudmFsdWUuc2xpY2UoLTEgKiB0aGlzLl9udW1WaXNpYmxlKSk7XG5cdFx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yRmluaXNoaW5nLnB1c2goLi4udGhpcy52YWx1ZS5zbGljZSgwLCB0aGlzLl9udW1WaXNpYmxlKSk7XG5cdFx0fVxuXHR9XG5cblx0Zmlyc3RJbmRleCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pc0NpcmN1bGFyKCkgPyAoLTEgKiAodGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyArIHRoaXMubnVtVmlzaWJsZSkpIDogKHRoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAtMSk7XG5cdH1cblxuXHRsYXN0SW5kZXgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlyc3RJbmRleCgpICsgdGhpcy5udW1WaXNpYmxlIC0gMTtcblx0fVxuXG5cdHRvdGFsRG90cygpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZSA/IE1hdGguY2VpbCgodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLl9udW1WaXNpYmxlKSAvIHRoaXMuX251bVNjcm9sbCkgKyAxIDogMDtcblx0fVxuXG5cdHRvdGFsRG90c0FycmF5KCkge1xuXHRcdGNvbnN0IHRvdGFsRG90cyA9IHRoaXMudG90YWxEb3RzKCk7XG5cdFx0cmV0dXJuIHRvdGFsRG90cyA8PSAwID8gW10gOiBBcnJheSh0b3RhbERvdHMpLmZpbGwoMCk7XG5cdH1cblxuXHRjb250YWluZXJDbGFzcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0J3VpLWNhcm91c2VsIHVpLXdpZGdldCc6dHJ1ZSwgXG5cdFx0XHQndWktY2Fyb3VzZWwtdmVydGljYWwnOiB0aGlzLmlzVmVydGljYWwoKSxcblx0XHRcdCd1aS1jYXJvdXNlbC1ob3Jpem9udGFsJzogIXRoaXMuaXNWZXJ0aWNhbCgpXG5cdFx0fTtcblx0fVxuXG5cdGNvbnRlbnRDbGFzc2VzKCkge1xuXHRcdHJldHVybiAndWktY2Fyb3VzZWwtY29udGVudCAnKyB0aGlzLmNvbnRlbnRDbGFzcztcblx0fVxuXG5cdGRvdHNDb250ZW50Q2xhc3NlcygpIHtcblx0XHRyZXR1cm4gJ3VpLWNhcm91c2VsLWRvdHMtY29udGFpbmVyIHVpLWhlbHBlci1yZXNldCAnICsgdGhpcy5kb3RzQ29udGFpbmVyQ2xhc3M7XG5cdH1cblxuXHRpc1ZlcnRpY2FsKCkge1xuXHRcdHJldHVybiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xuXHR9XG5cblx0aXNDaXJjdWxhcigpIHtcblx0XHRyZXR1cm4gdGhpcy5jaXJjdWxhciAmJiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID49IHRoaXMubnVtVmlzaWJsZTtcblx0fVxuXG5cdGlzQXV0b3BsYXkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmFsbG93QXV0b3BsYXk7XG5cdH1cblxuXHRpc0ZvcndhcmROYXZEaXNhYmxlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pc0VtcHR5KCkgfHwgKHRoaXMuX3BhZ2UgPj0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiAhdGhpcy5pc0NpcmN1bGFyKCkpO1xuXHR9XG5cblx0aXNCYWNrd2FyZE5hdkRpc2FibGVkKCkge1xuXHRcdHJldHVybiB0aGlzLmlzRW1wdHkoKSB8fCAodGhpcy5fcGFnZSA8PSAwICAmJiAhdGhpcy5pc0NpcmN1bGFyKCkpO1xuXHR9XG5cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDA7XG5cdH1cblxuXHRuYXZGb3J3YXJkKGUsaW5kZXg/KSB7XG5cdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpIHx8IHRoaXMuX3BhZ2UgPCAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XG5cdFx0XHR0aGlzLnN0ZXAoLTEsIGluZGV4KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cblx0bmF2QmFja3dhcmQoZSxpbmRleD8pIHtcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkgfHwgdGhpcy5fcGFnZSAhPT0gMCkge1xuXHRcdFx0dGhpcy5zdGVwKDEsIGluZGV4KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChlICYmIGUuY2FuY2VsYWJsZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXG5cdG9uRG90Q2xpY2soZSwgaW5kZXgpIHtcblx0XHRsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XG5cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChpbmRleCA+IHBhZ2UpIHtcblx0XHRcdHRoaXMubmF2Rm9yd2FyZChlLCBpbmRleCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGluZGV4IDwgcGFnZSkge1xuXHRcdFx0dGhpcy5uYXZCYWNrd2FyZChlLCBpbmRleCk7XG5cdFx0fVxuXHR9XG5cblx0c3RlcChkaXIsIHBhZ2UpIHtcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcblxuXHRcdGlmIChwYWdlICE9IG51bGwpIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gKHRoaXMuX251bVNjcm9sbCAqIHBhZ2UpICogLTE7XG5cblx0XHRcdGlmIChpc0NpcmN1bGFyKSB7XG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IHRoaXMuX251bVZpc2libGU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKHRoaXMuX251bVNjcm9sbCAqIGRpcik7XG5cdFx0XHRpZiAodGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQpIHtcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gdGhpcy5yZW1haW5pbmdJdGVtcyAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpO1xuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgb3JpZ2luYWxTaGlmdGVkSXRlbXMgPSBpc0NpcmN1bGFyID8gKHRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5fbnVtVmlzaWJsZSkgOiB0b3RhbFNoaWZ0ZWRJdGVtcztcblx0XHRcdHBhZ2UgPSBNYXRoLmFicyhNYXRoLmZsb29yKChvcmlnaW5hbFNoaWZ0ZWRJdGVtcyAvIHRoaXMuX251bVNjcm9sbCkpKTtcblx0XHR9XG5cblx0XHRpZiAoaXNDaXJjdWxhciAmJiB0aGlzLnBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgZGlyID09PSAtMSkge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqICh0aGlzLnZhbHVlLmxlbmd0aCArIHRoaXMuX251bVZpc2libGUpO1xuXHRcdFx0cGFnZSA9IDA7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGlzQ2lyY3VsYXIgJiYgdGhpcy5wYWdlID09PSAwICYmIGRpciA9PT0gMSkge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuXHRcdFx0cGFnZSA9ICh0aGlzLnRvdGFsRG90cygpIC0gMSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9ICgodGhpcy5yZW1haW5pbmdJdGVtcyAqIC0xKSAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpKTtcblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSA1MDBtcyBlYXNlIDBzJztcblx0XHR9XG5cblx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG5cdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0dGhpcy5vblBhZ2UuZW1pdCh7XG5cdFx0XHRwYWdlOiB0aGlzLnBhZ2Vcblx0XHR9KTtcblx0fVxuXG5cdHN0YXJ0QXV0b3BsYXkoKSB7XG5cdFx0dGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpID4gMCkge1xuXHRcdFx0XHRpZiAodGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XG5cdFx0XHRcdFx0dGhpcy5zdGVwKC0xLCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnN0ZXAoLTEsIHRoaXMucGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwgXG5cdFx0dGhpcy5hdXRvcGxheUludGVydmFsKTtcblx0fVxuXG5cdHN0b3BBdXRvcGxheSgpIHtcblx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcblx0XHR9XG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQoKSB7XG5cdFx0aWYgKHRoaXMuaXRlbXNDb250YWluZXIpIHtcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG5cblx0XHRcdGlmICgodGhpcy5wYWdlID09PSAwIHx8IHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSkgJiYgdGhpcy5pc0NpcmN1bGFyKCkpIHtcblx0XHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25Ub3VjaFN0YXJ0KGUpIHtcblx0XHRsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0dGhpcy5zdGFydFBvcyA9IHtcblx0XHRcdHg6IHRvdWNob2JqLnBhZ2VYLFxuXHRcdFx0eTogdG91Y2hvYmoucGFnZVlcblx0XHR9O1xuXHR9XG5cblx0b25Ub3VjaE1vdmUoZSkge1xuXHRcdGlmIChlLmNhbmNlbGFibGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblx0b25Ub3VjaEVuZChlKSB7XG5cdFx0bGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdGlmICh0aGlzLmlzVmVydGljYWwoKSkge1xuXHRcdFx0dGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCAodG91Y2hvYmoucGFnZVkgLSB0aGlzLnN0YXJ0UG9zLnkpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmNoYW5nZVBhZ2VPblRvdWNoKGUsICh0b3VjaG9iai5wYWdlWCAtIHRoaXMuc3RhcnRQb3MueCkpO1xuXHRcdH1cblx0fVxuXG5cdGNoYW5nZVBhZ2VPblRvdWNoKGUsIGRpZmYpIHtcblx0XHRpZiAoTWF0aC5hYnMoZGlmZikgPiB0aGlzLnN3aXBlVGhyZXNob2xkKSB7XG5cdFx0XHRpZiAoZGlmZiA8IDApIHtcblx0XHRcdFx0dGhpcy5uYXZGb3J3YXJkKGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMubmF2QmFja3dhcmQoZSk7XG5cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRiaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG5cdFx0aWYgKCF0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcblx0XHRcdHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IChlKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcblx0XHRcdH07XG5cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuXHRcdH1cblx0fVxuXG5cdHVuYmluZERvY3VtZW50TGlzdGVuZXJzKCkge1xuXHRcdGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuXHRcdFx0dGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0dGhpcy51bmJpbmREb2N1bWVudExpc3RlbmVycygpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdH1cbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcblx0ZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQ2Fyb3VzZWwsIFNoYXJlZE1vZHVsZV0sXG5cdGRlY2xhcmF0aW9uczogW0Nhcm91c2VsXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7IH1cbiJdfQ==