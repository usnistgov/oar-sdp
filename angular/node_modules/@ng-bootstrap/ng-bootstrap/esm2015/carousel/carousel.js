import { __decorate, __param } from "tslib";
import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, HostListener, Inject, Input, NgZone, OnDestroy, Output, PLATFORM_ID, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { BehaviorSubject, combineLatest, NEVER, Subject, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
let nextId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
let NgbSlide = class NgbSlide {
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = `ngb-slide-${nextId++}`;
    }
};
NgbSlide.ctorParameters = () => [
    { type: TemplateRef }
];
__decorate([
    Input()
], NgbSlide.prototype, "id", void 0);
NgbSlide = __decorate([
    Directive({ selector: 'ng-template[ngbSlide]' })
], NgbSlide);
export { NgbSlide };
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
let NgbCarousel = class NgbCarousel {
    constructor(config, _platformId, _ngZone, _cd) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._destroy$ = new Subject();
        this._interval$ = new BehaviorSubject(0);
        this._mouseHover$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(false);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(false);
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    /**
     * Time in milliseconds before the next slide is shown.
     */
    set interval(value) {
        this._interval$.next(value);
    }
    get interval() { return this._interval$.value; }
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     */
    set wrap(value) {
        this._wrap$.next(value);
    }
    get wrap() { return this._wrap$.value; }
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * @since 2.2.0
     */
    set pauseOnHover(value) {
        this._pauseOnHover$.next(value);
    }
    get pauseOnHover() { return this._pauseOnHover$.value; }
    mouseEnter() {
        this._mouseHover$.next(true);
    }
    mouseLeave() {
        this._mouseHover$.next(false);
    }
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(() => {
                const hasNextSlide$ = combineLatest([
                    this.slide.pipe(map(slideEvent => slideEvent.current), startWith(this.activeId)),
                    this._wrap$, this.slides.changes.pipe(startWith(null))
                ])
                    .pipe(map(([currentSlideId, wrap]) => {
                    const slideArr = this.slides.toArray();
                    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                }), distinctUntilChanged());
                combineLatest([this._pause$, this._pauseOnHover$, this._mouseHover$, this._interval$, hasNextSlide$])
                    .pipe(map(([pause, pauseOnHover, mouseHover, interval, hasNextSlide]) => ((pause || (pauseOnHover && mouseHover) || !hasNextSlide) ? 0 : interval)), distinctUntilChanged(), switchMap(interval => interval > 0 ? timer(interval, interval) : NEVER), takeUntil(this._destroy$))
                    .subscribe(() => this._ngZone.run(() => this.next(NgbSlideEventSource.TIMER)));
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => this._cd.markForCheck());
    }
    ngAfterContentChecked() {
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : '');
    }
    ngOnDestroy() { this._destroy$.next(); }
    /**
     * Navigates to a slide with the specified identifier.
     */
    select(slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    }
    /**
     * Navigates to the previous slide.
     */
    prev(source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT, source);
    }
    /**
     * Navigates to the next slide.
     */
    next(source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT, source);
    }
    /**
     * Pauses cycling through the slides.
     */
    pause() { this._pause$.next(true); }
    /**
     * Restarts cycling through the slides from left to right.
     */
    cycle() { this._pause$.next(false); }
    _cycleToSelected(slideIdx, direction, source) {
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source });
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    }
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    }
    _getSlideById(slideId) {
        return this.slides.find(slide => slide.id === slideId) || null;
    }
    _getSlideIdxById(slideId) {
        const slide = this._getSlideById(slideId);
        return slide != null ? this.slides.toArray().indexOf(slide) : -1;
    }
    _getNextSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    }
    _getPrevSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    }
};
NgbCarousel.ctorParameters = () => [
    { type: NgbCarouselConfig },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
__decorate([
    ContentChildren(NgbSlide)
], NgbCarousel.prototype, "slides", void 0);
__decorate([
    Input()
], NgbCarousel.prototype, "activeId", void 0);
__decorate([
    Input()
], NgbCarousel.prototype, "interval", null);
__decorate([
    Input()
], NgbCarousel.prototype, "wrap", null);
__decorate([
    Input()
], NgbCarousel.prototype, "keyboard", void 0);
__decorate([
    Input()
], NgbCarousel.prototype, "pauseOnHover", null);
__decorate([
    Input()
], NgbCarousel.prototype, "showNavigationArrows", void 0);
__decorate([
    Input()
], NgbCarousel.prototype, "showNavigationIndicators", void 0);
__decorate([
    Output()
], NgbCarousel.prototype, "slide", void 0);
__decorate([
    HostListener('mouseenter')
], NgbCarousel.prototype, "mouseEnter", null);
__decorate([
    HostListener('mouseleave')
], NgbCarousel.prototype, "mouseLeave", null);
NgbCarousel = __decorate([
    Component({
        selector: 'ngb-carousel',
        exportAs: 'ngbCarousel',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        host: {
            'class': 'carousel slide',
            '[style.display]': '"block"',
            'tabIndex': '0',
            '(keydown.arrowLeft)': 'keyboard && prev(NgbSlideEventSource.ARROW_LEFT)',
            '(keydown.arrowRight)': 'keyboard && next(NgbSlideEventSource.ARROW_RIGHT)'
        },
        template: `
    <ol class="carousel-indicators" *ngIf="showNavigationIndicators">
      <li *ngFor="let slide of slides" [id]="slide.id" [class.active]="slide.id === activeId"
          (click)="select(slide.id, NgbSlideEventSource.INDICATOR)"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides" class="carousel-item" [class.active]="slide.id === activeId">
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="prev(NgbSlideEventSource.ARROW_LEFT)" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="next(NgbSlideEventSource.ARROW_RIGHT)" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
    }),
    __param(1, Inject(PLATFORM_ID))
], NgbCarousel);
export { NgbCarousel };
/**
 * Defines the carousel slide transition direction.
 */
export var NgbSlideEventDirection;
(function (NgbSlideEventDirection) {
    NgbSlideEventDirection[NgbSlideEventDirection["LEFT"] = 'left'] = "LEFT";
    NgbSlideEventDirection[NgbSlideEventDirection["RIGHT"] = 'right'] = "RIGHT";
})(NgbSlideEventDirection || (NgbSlideEventDirection = {}));
export var NgbSlideEventSource;
(function (NgbSlideEventSource) {
    NgbSlideEventSource["TIMER"] = "timer";
    NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
    NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
    NgbSlideEventSource["INDICATOR"] = "indicator";
})(NgbSlideEventSource || (NgbSlideEventSource = {}));
export const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTFGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmOztHQUVHO0FBRUgsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQU9uQixZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQU4zQzs7OztXQUlHO1FBQ00sT0FBRSxHQUFHLGFBQWEsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNRLENBQUM7Q0FDaEQsQ0FBQTs7WUFENEIsV0FBVzs7QUFEN0I7SUFBUixLQUFLLEVBQUU7b0NBQThCO0FBTjNCLFFBQVE7SUFEcEIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFDLENBQUM7R0FDbEMsUUFBUSxDQVFwQjtTQVJZLFFBQVE7QUFVckI7Ozs7R0FJRztBQWlDSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBOEV0QixZQUNJLE1BQXlCLEVBQStCLFdBQVcsRUFBVSxPQUFlLEVBQ3BGLEdBQXNCO1FBRDBCLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNwRixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTVFM0Isd0JBQW1CLEdBQUcsbUJBQW1CLENBQUM7UUFFekMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDaEMsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsbUJBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBNEQ1Qzs7OztXQUlHO1FBQ08sVUFBSyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBS2xELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ3hELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUM7SUFDbEUsQ0FBQztJQW5FRDs7T0FFRztJQUVILElBQUksUUFBUSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRWhEOztPQUVHO0lBRUgsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFPeEM7Ozs7T0FJRztJQUVILElBQUksWUFBWSxDQUFDLEtBQWM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksWUFBWSxLQUFLLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBbUN4RCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUdELFVBQVU7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLDJEQUEyRDtRQUMzRCx5REFBeUQ7UUFDekQsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xDLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQztvQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2RCxDQUFDO3FCQUNHLElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN2QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzlELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RSxDQUFDLENBQUMsRUFDRixvQkFBb0IsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7cUJBQ2hHLElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsRUFBRSxFQUFFLENBQzFELENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUVsRixvQkFBb0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUMvRixTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUM3QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQscUJBQXFCO1FBQ25CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxXQUFXLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFeEM7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBZSxFQUFFLE1BQTRCO1FBQ2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLE1BQTRCO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLE1BQTRCO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwQzs7T0FFRztJQUNILEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0IsZ0JBQWdCLENBQUMsUUFBZ0IsRUFBRSxTQUFpQyxFQUFFLE1BQTRCO1FBQ3hHLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNYLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUNoSCxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7U0FDbEM7UUFFRCxnR0FBZ0c7UUFDaEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sdUJBQXVCLENBQUMsb0JBQTRCLEVBQUUsaUJBQXlCO1FBQ3JGLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVwRSxPQUFPLHFCQUFxQixHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQztJQUNqSCxDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQWU7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2pFLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFlO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVPLGFBQWEsQ0FBQyxjQUFzQjtRQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RCxNQUFNLFdBQVcsR0FBRyxlQUFlLEtBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFNUQsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxRQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRU8sYUFBYSxDQUFDLGNBQXNCO1FBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sWUFBWSxHQUFHLGVBQWUsS0FBSyxDQUFDLENBQUM7UUFFM0MsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxRQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0NBQ0YsQ0FBQTs7WUFySWEsaUJBQWlCOzRDQUFHLE1BQU0sU0FBQyxXQUFXO1lBQXdDLE1BQU07WUFDL0UsaUJBQWlCOztBQTlFUDtJQUExQixlQUFlLENBQUMsUUFBUSxDQUFDOzJDQUE2QjtBQWdCOUM7SUFBUixLQUFLLEVBQUU7NkNBQWtCO0FBTTFCO0lBREMsS0FBSyxFQUFFOzJDQUdQO0FBUUQ7SUFEQyxLQUFLLEVBQUU7dUNBR1A7QUFPUTtJQUFSLEtBQUssRUFBRTs2Q0FBbUI7QUFRM0I7SUFEQyxLQUFLLEVBQUU7K0NBR1A7QUFTUTtJQUFSLEtBQUssRUFBRTt5REFBK0I7QUFPOUI7SUFBUixLQUFLLEVBQUU7NkRBQW1DO0FBT2pDO0lBQVQsTUFBTSxFQUFFOzBDQUEyQztBQWNwRDtJQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7NkNBRzFCO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzZDQUcxQjtBQWpHVSxXQUFXO0lBaEN2QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsYUFBYTtRQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLGlCQUFpQixFQUFFLFNBQVM7WUFDNUIsVUFBVSxFQUFFLEdBQUc7WUFDZixxQkFBcUIsRUFBRSxrREFBa0Q7WUFDekUsc0JBQXNCLEVBQUUsbURBQW1EO1NBQzVFO1FBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7S0FDRixDQUFDO0lBZ0ZnQyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQS9FeEMsV0FBVyxDQW9OdkI7U0FwTlksV0FBVztBQTRQeEI7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxzQkFHWDtBQUhELFdBQVksc0JBQXNCO0lBQ2hDLHdEQUFZLE1BQU0sVUFBQSxDQUFBO0lBQ2xCLHlEQUFhLE9BQU8sV0FBQSxDQUFBO0FBQ3RCLENBQUMsRUFIVyxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBR2pDO0FBRUQsTUFBTSxDQUFOLElBQVksbUJBS1g7QUFMRCxXQUFZLG1CQUFtQjtJQUM3QixzQ0FBZSxDQUFBO0lBQ2YsK0NBQXdCLENBQUE7SUFDeEIsaURBQTBCLENBQUE7SUFDMUIsOENBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUxXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFLOUI7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcblxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE5FVkVSLCBTdWJqZWN0LCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyB0aGUgaW5kaXZpZHVhbCBjYXJvdXNlbCBzbGlkZS5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JTbGlkZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JTbGlkZSB7XG4gIC8qKlxuICAgKiBTbGlkZSBpZCB0aGF0IG11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50LlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHdpbGwgYmUgZ2VuZXJhdGVkIGluIHRoZSBgbmdiLXNsaWRlLXh4YCBmb3JtYXQuXG4gICAqL1xuICBASW5wdXQoKSBpZCA9IGBuZ2Itc2xpZGUtJHtuZXh0SWQrK31gO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIENhcm91c2VsIGlzIGEgY29tcG9uZW50IHRvIGVhc2lseSBjcmVhdGUgYW5kIGNvbnRyb2wgc2xpZGVzaG93cy5cbiAqXG4gKiBBbGxvd3MgdG8gc2V0IGludGVydmFscywgY2hhbmdlIHRoZSB3YXkgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgc2xpZGVzIGFuZCBwcm92aWRlcyBhIHByb2dyYW1tYXRpYyBBUEkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1jYXJvdXNlbCcsXG4gIGV4cG9ydEFzOiAnbmdiQ2Fyb3VzZWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdjYXJvdXNlbCBzbGlkZScsXG4gICAgJ1tzdHlsZS5kaXNwbGF5XSc6ICdcImJsb2NrXCInLFxuICAgICd0YWJJbmRleCc6ICcwJyxcbiAgICAnKGtleWRvd24uYXJyb3dMZWZ0KSc6ICdrZXlib2FyZCAmJiBwcmV2KE5nYlNsaWRlRXZlbnRTb3VyY2UuQVJST1dfTEVGVCknLFxuICAgICcoa2V5ZG93bi5hcnJvd1JpZ2h0KSc6ICdrZXlib2FyZCAmJiBuZXh0KE5nYlNsaWRlRXZlbnRTb3VyY2UuQVJST1dfUklHSFQpJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yc1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChzbGlkZS5pZCwgTmdiU2xpZGVFdmVudFNvdXJjZS5JTkRJQ0FUT1IpXCI+PC9saT5cbiAgICA8L29sPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgY2xhc3M9XCJjYXJvdXNlbC1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicHJldihOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX0xFRlQpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5wcmV2aW91c1wiPlByZXZpb3VzPC9zcGFuPlxuICAgIDwvYT5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX1JJR0hUKVwiICpuZ0lmPVwic2hvd05hdmlnYXRpb25BcnJvd3NcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwubmV4dFwiPk5leHQ8L3NwYW4+XG4gICAgPC9hPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkNhcm91c2VsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKE5nYlNsaWRlKSBzbGlkZXM6IFF1ZXJ5TGlzdDxOZ2JTbGlkZT47XG5cbiAgcHVibGljIE5nYlNsaWRlRXZlbnRTb3VyY2UgPSBOZ2JTbGlkZUV2ZW50U291cmNlO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfaW50ZXJ2YWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgcHJpdmF0ZSBfbW91c2VIb3ZlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBfcGF1c2VPbkhvdmVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIF9wYXVzZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBfd3JhcCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICAvKipcbiAgICogVGhlIHNsaWRlIGlkIHRoYXQgc2hvdWxkIGJlIGRpc3BsYXllZCAqKmluaXRpYWxseSoqLlxuICAgKlxuICAgKiBGb3Igc3Vic2VxdWVudCBpbnRlcmFjdGlvbnMgdXNlIG1ldGhvZHMgYHNlbGVjdCgpYCwgYG5leHQoKWAsIGV0Yy4gYW5kIHRoZSBgKHNsaWRlKWAgb3V0cHV0LlxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSBuZXh0IHNsaWRlIGlzIHNob3duLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pbnRlcnZhbCQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgaW50ZXJ2YWwoKSB7IHJldHVybiB0aGlzLl9pbnRlcnZhbCQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsICd3cmFwJyB0aGUgY2Fyb3VzZWwgYnkgc3dpdGNoaW5nIGZyb20gdGhlIGxhc3Qgc2xpZGUgYmFjayB0byB0aGUgZmlyc3QuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgd3JhcCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3dyYXAkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHdyYXAoKSB7IHJldHVybiB0aGlzLl93cmFwJC52YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGFsbG93cyB0byBpbnRlcmFjdCB3aXRoIGNhcm91c2VsIHVzaW5nIGtleWJvYXJkICdhcnJvdyBsZWZ0JyBhbmQgJ2Fycm93IHJpZ2h0Jy5cbiAgICovXG4gIEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHdpbGwgcGF1c2Ugc2xpZGUgc3dpdGNoaW5nIHdoZW4gbW91c2UgY3Vyc29yIGhvdmVycyB0aGUgc2xpZGUuXG4gICAqXG4gICAqIEBzaW5jZSAyLjIuMFxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHBhdXNlT25Ib3Zlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3BhdXNlT25Ib3ZlciQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgcGF1c2VPbkhvdmVyKCkgeyByZXR1cm4gdGhpcy5fcGF1c2VPbkhvdmVyJC52YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsICdwcmV2aW91cycgYW5kICduZXh0JyBuYXZpZ2F0aW9uIGFycm93cyB3aWxsIGJlIHZpc2libGUgb24gdGhlIHNsaWRlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uQXJyb3dzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5hdmlnYXRpb24gaW5kaWNhdG9ycyBhdCB0aGUgYm90dG9tIG9mIHRoZSBzbGlkZSB3aWxsIGJlIHZpc2libGUuXG4gICAqXG4gICAqIEBzaW5jZSAyLjIuMFxuICAgKi9cbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGFmdGVyIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZC5cbiAgICpcbiAgICogU2VlIFtgTmdiU2xpZGVFdmVudGBdKCMvY29tcG9uZW50cy9jYXJvdXNlbC9hcGkjTmdiU2xpZGVFdmVudCkgZm9yIHBheWxvYWQgZGV0YWlscy5cbiAgICovXG4gIEBPdXRwdXQoKSBzbGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2xpZGVFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNvbmZpZzogTmdiQ2Fyb3VzZWxDb25maWcsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQsIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IGNvbmZpZy5pbnRlcnZhbDtcbiAgICB0aGlzLndyYXAgPSBjb25maWcud3JhcDtcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xuICAgIHRoaXMucGF1c2VPbkhvdmVyID0gY29uZmlnLnBhdXNlT25Ib3ZlcjtcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uQXJyb3dzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uQXJyb3dzO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBtb3VzZUVudGVyKCkge1xuICAgIHRoaXMuX21vdXNlSG92ZXIkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgbW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLl9tb3VzZUhvdmVyJC5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBzZXRJbnRlcnZhbCgpIGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggU1NSIGFuZCBwcm90cmFjdG9yLFxuICAgIC8vIHNvIHdlIHNob3VsZCBydW4gaXQgaW4gdGhlIGJyb3dzZXIgYW5kIG91dHNpZGUgQW5ndWxhclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFzTmV4dFNsaWRlJCA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlLnBpcGUobWFwKHNsaWRlRXZlbnQgPT4gc2xpZGVFdmVudC5jdXJyZW50KSwgc3RhcnRXaXRoKHRoaXMuYWN0aXZlSWQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcCQsIHRoaXMuc2xpZGVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKFtjdXJyZW50U2xpZGVJZCwgd3JhcF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3cmFwID8gc2xpZGVBcnIubGVuZ3RoID4gMSA6IGN1cnJlbnRTbGlkZUlkeCA8IHNsaWRlQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICAgICAgY29tYmluZUxhdGVzdChbdGhpcy5fcGF1c2UkLCB0aGlzLl9wYXVzZU9uSG92ZXIkLCB0aGlzLl9tb3VzZUhvdmVyJCwgdGhpcy5faW50ZXJ2YWwkLCBoYXNOZXh0U2xpZGUkXSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoW3BhdXNlLCBwYXVzZU9uSG92ZXIsIG1vdXNlSG92ZXIsIGludGVydmFsLCBoYXNOZXh0U2xpZGVdKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKChwYXVzZSB8fCAocGF1c2VPbkhvdmVyICYmIG1vdXNlSG92ZXIpIHx8ICFoYXNOZXh0U2xpZGUpID8gMCA6IGludGVydmFsKSksXG5cbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzd2l0Y2hNYXAoaW50ZXJ2YWwgPT4gaW50ZXJ2YWwgPiAwID8gdGltZXIoaW50ZXJ2YWwsIGludGVydmFsKSA6IE5FVkVSKSxcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMubmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLlRJTUVSKSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVTbGlkZSA/IGFjdGl2ZVNsaWRlLmlkIDogKHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogJycpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTsgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gYSBzbGlkZSB3aXRoIHRoZSBzcGVjaWZpZWQgaWRlbnRpZmllci5cbiAgICovXG4gIHNlbGVjdChzbGlkZUlkOiBzdHJpbmcsIHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcbiAgICB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZCwgdGhpcy5fZ2V0U2xpZGVFdmVudERpcmVjdGlvbih0aGlzLmFjdGl2ZUlkLCBzbGlkZUlkKSwgc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIHByZXZpb3VzIHNsaWRlLlxuICAgKi9cbiAgcHJldihzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XG4gICAgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldFByZXZTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5SSUdIVCwgc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIG5leHQgc2xpZGUuXG4gICAqL1xuICBuZXh0KHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcbiAgICB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0TmV4dFNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQsIHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIGN5Y2xpbmcgdGhyb3VnaCB0aGUgc2xpZGVzLlxuICAgKi9cbiAgcGF1c2UoKSB7IHRoaXMuX3BhdXNlJC5uZXh0KHRydWUpOyB9XG5cbiAgLyoqXG4gICAqIFJlc3RhcnRzIGN5Y2xpbmcgdGhyb3VnaCB0aGUgc2xpZGVzIGZyb20gbGVmdCB0byByaWdodC5cbiAgICovXG4gIGN5Y2xlKCkgeyB0aGlzLl9wYXVzZSQubmV4dChmYWxzZSk7IH1cblxuICBwcml2YXRlIF9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZHg6IHN0cmluZywgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLCBzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XG4gICAgbGV0IHNlbGVjdGVkU2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQoc2xpZGVJZHgpO1xuICAgIGlmIChzZWxlY3RlZFNsaWRlICYmIHNlbGVjdGVkU2xpZGUuaWQgIT09IHRoaXMuYWN0aXZlSWQpIHtcbiAgICAgIHRoaXMuc2xpZGUuZW1pdChcbiAgICAgICAgICB7cHJldjogdGhpcy5hY3RpdmVJZCwgY3VycmVudDogc2VsZWN0ZWRTbGlkZS5pZCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHBhdXNlZDogdGhpcy5fcGF1c2UkLnZhbHVlLCBzb3VyY2V9KTtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xuICAgIH1cblxuICAgIC8vIHdlIGdldCBoZXJlIGFmdGVyIHRoZSBpbnRlcnZhbCBmaXJlcyBvciBhbnkgZXh0ZXJuYWwgQVBJIGNhbGwgbGlrZSBuZXh0KCksIHByZXYoKSBvciBzZWxlY3QoKVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVFdmVudERpcmVjdGlvbihjdXJyZW50QWN0aXZlU2xpZGVJZDogc3RyaW5nLCBuZXh0QWN0aXZlU2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcbiAgICBjb25zdCBuZXh0QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQobmV4dEFjdGl2ZVNsaWRlSWQpO1xuXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUJ5SWQoc2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMuZmluZChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCkgfHwgbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNsaWRlSWR4QnlJZChzbGlkZUlkOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IHNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpO1xuICAgIHJldHVybiBzbGlkZSAhPSBudWxsID8gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2Yoc2xpZGUpIDogLTE7XG4gIH1cblxuICBwcml2YXRlIF9nZXROZXh0U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICBjb25zdCBpc0xhc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gc2xpZGVBcnIubGVuZ3RoIC0gMTtcblxuICAgIHJldHVybiBpc0xhc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFyclswXS5pZCA6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVBcnJbY3VycmVudFNsaWRlSWR4ICsgMV0uaWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcmV2U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICBjb25zdCBpc0ZpcnN0U2xpZGUgPSBjdXJyZW50U2xpZGVJZHggPT09IDA7XG5cbiAgICByZXR1cm4gaXNGaXJzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkIDogc2xpZGVBcnJbMF0uaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVBcnJbY3VycmVudFNsaWRlSWR4IC0gMV0uaWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHNsaWRlIGNoYW5nZSBldmVudCBlbWl0dGVkIHJpZ2h0IGFmdGVyIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JTbGlkZUV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBwcmV2aW91cyBzbGlkZSBpZC5cbiAgICovXG4gIHByZXY6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2xpZGUgaWQuXG4gICAqL1xuICBjdXJyZW50OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzbGlkZSBldmVudCBkaXJlY3Rpb24uXG4gICAqXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYCdsZWZ0JyB8ICdyaWdodCdgLlxuICAgKi9cbiAgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBwYXVzZSgpIG1ldGhvZCB3YXMgY2FsbGVkIChhbmQgbm8gY3ljbGUoKSBjYWxsIHdhcyBkb25lIGFmdGVyd2FyZHMpLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHBhdXNlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU291cmNlIHRyaWdnZXJpbmcgdGhlIHNsaWRlIGNoYW5nZSBldmVudC5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgJ3RpbWVyJyB8ICdhcnJvd0xlZnQnIHwgJ2Fycm93UmlnaHQnIHwgJ2luZGljYXRvcidgXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZTtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBjYXJvdXNlbCBzbGlkZSB0cmFuc2l0aW9uIGRpcmVjdGlvbi5cbiAqL1xuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gIExFRlQgPSA8YW55PidsZWZ0JyxcbiAgUklHSFQgPSA8YW55PidyaWdodCdcbn1cblxuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudFNvdXJjZSB7XG4gIFRJTUVSID0gJ3RpbWVyJyxcbiAgQVJST1dfTEVGVCA9ICdhcnJvd0xlZnQnLFxuICBBUlJPV19SSUdIVCA9ICdhcnJvd1JpZ2h0JyxcbiAgSU5ESUNBVE9SID0gJ2luZGljYXRvcidcbn1cblxuZXhwb3J0IGNvbnN0IE5HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTID0gW05nYkNhcm91c2VsLCBOZ2JTbGlkZV07XG4iXX0=