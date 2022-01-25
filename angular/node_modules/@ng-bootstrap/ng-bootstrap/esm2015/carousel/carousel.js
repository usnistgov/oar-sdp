import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { BehaviorSubject, combineLatest, NEVER, Subject, timer, zip } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { ngbCompleteTransition, ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbCarouselTransitionIn, ngbCarouselTransitionOut, NgbSlideEventDirection } from './carousel-transition';
let nextId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
export class NgbSlide {
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = `ngb-slide-${nextId++}`;
        /**
         * An event emitted when the slide transition is finished
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
    }
}
NgbSlide.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
];
NgbSlide.ctorParameters = () => [
    { type: TemplateRef }
];
NgbSlide.propDecorators = {
    id: [{ type: Input }],
    slid: [{ type: Output }]
};
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
export class NgbCarousel {
    constructor(config, _platformId, _ngZone, _cd, _container) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this._container = _container;
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._destroy$ = new Subject();
        this._interval$ = new BehaviorSubject(0);
        this._mouseHover$ = new BehaviorSubject(false);
        this._focused$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(false);
        this._pauseOnFocus$ = new BehaviorSubject(false);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(false);
        /**
         * An event emitted just before the slide transition starts.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
        /*
         * Keep the ids of the panels currently transitionning
         * in order to allow only the transition revertion
         */
        this._transitionIds = null;
        this.animation = config.animation;
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.pauseOnFocus = config.pauseOnFocus;
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
    /**
     * If `true`, will pause slide switching when the focus is inside the carousel.
     */
    set pauseOnFocus(value) {
        this._pauseOnFocus$.next(value);
    }
    get pauseOnFocus() { return this._pauseOnFocus$.value; }
    set mouseHover(value) { this._mouseHover$.next(value); }
    get mouseHover() { return this._mouseHover$.value; }
    set focused(value) { this._focused$.next(value); }
    get focused() { return this._focused$.value; }
    arrowLeft() {
        this.focus();
        this.prev(NgbSlideEventSource.ARROW_LEFT);
    }
    arrowRight() {
        this.focus();
        this.next(NgbSlideEventSource.ARROW_RIGHT);
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
                combineLatest([
                    this._pause$, this._pauseOnHover$, this._mouseHover$, this._pauseOnFocus$, this._focused$, this._interval$,
                    hasNextSlide$
                ])
                    .pipe(map(([pause, pauseOnHover, mouseHover, pauseOnFocus, focused, interval, hasNextSlide]) => ((pause || (pauseOnHover && mouseHover) || (pauseOnFocus && focused) || !hasNextSlide) ?
                    0 :
                    interval)), distinctUntilChanged(), switchMap(interval => interval > 0 ? timer(interval, interval) : NEVER), takeUntil(this._destroy$))
                    .subscribe(() => this._ngZone.run(() => this.next(NgbSlideEventSource.TIMER)));
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            var _a;
            (_a = this._transitionIds) === null || _a === void 0 ? void 0 : _a.forEach(id => ngbCompleteTransition(this._getSlideElement(id)));
            this._transitionIds = null;
            this._cd.markForCheck();
            // The following code need to be done asynchronously, after the dom becomes stable,
            // otherwise all changes will be undone.
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                for (const { id } of this.slides) {
                    const element = this._getSlideElement(id);
                    if (id === this.activeId) {
                        element.classList.add('active');
                    }
                    else {
                        element.classList.remove('active');
                    }
                }
            });
        });
    }
    ngAfterContentChecked() {
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : '');
    }
    ngAfterViewInit() {
        // Initialize the 'active' class (not managed by the template)
        if (this.activeId) {
            const element = this._getSlideElement(this.activeId);
            if (element) {
                element.classList.add('active');
            }
        }
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
    /**
     * Set the focus on the carousel.
     */
    focus() { this._container.nativeElement.focus(); }
    _cycleToSelected(slideIdx, direction, source) {
        const transitionIds = this._transitionIds;
        if (transitionIds && (transitionIds[0] !== slideIdx || transitionIds[1] !== this.activeId)) {
            // Revert prevented
            return;
        }
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this._transitionIds = [this.activeId, slideIdx];
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source });
            const options = {
                animation: this.animation,
                runningTransition: 'stop',
                context: { direction },
            };
            const transitions = [];
            const activeSlide = this._getSlideById(this.activeId);
            if (activeSlide) {
                const activeSlideTransition = ngbRunTransition(this._ngZone, this._getSlideElement(activeSlide.id), ngbCarouselTransitionOut, options);
                activeSlideTransition.subscribe(() => { activeSlide.slid.emit({ isShown: false, direction, source }); });
                transitions.push(activeSlideTransition);
            }
            const previousId = this.activeId;
            this.activeId = selectedSlide.id;
            const nextSlide = this._getSlideById(this.activeId);
            const transition = ngbRunTransition(this._ngZone, this._getSlideElement(selectedSlide.id), ngbCarouselTransitionIn, options);
            transition.subscribe(() => { nextSlide === null || nextSlide === void 0 ? void 0 : nextSlide.slid.emit({ isShown: true, direction, source }); });
            transitions.push(transition);
            zip(...transitions).pipe(take(1)).subscribe(() => {
                this._transitionIds = null;
                this.slid.emit({ prev: previousId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source });
            });
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
    _getSlideElement(slideId) {
        return this._container.nativeElement.querySelector(`#slide-${slideId}`);
    }
}
NgbCarousel.decorators = [
    { type: Component, args: [{
                selector: 'ngb-carousel',
                exportAs: 'ngbCarousel',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'carousel slide',
                    '[style.display]': '"block"',
                    'tabIndex': '0',
                    '(keydown.arrowLeft)': 'keyboard && arrowLeft()',
                    '(keydown.arrowRight)': 'keyboard && arrowRight()',
                    '(mouseenter)': 'mouseHover = true',
                    '(mouseleave)': 'mouseHover = false',
                    '(focusin)': 'focused = true',
                    '(focusout)': 'focused = false',
                    '[attr.aria-activedescendant]': `'slide-' + activeId`
                },
                template: `
    <ol class="carousel-indicators" [class.sr-only]="!showNavigationIndicators" role="tablist">
      <li *ngFor="let slide of slides" [class.active]="slide.id === activeId"
          role="tab" [attr.aria-labelledby]="'slide-' + slide.id" [attr.aria-controls]="'slide-' + slide.id"
          [attr.aria-selected]="slide.id === activeId"
          (click)="focus();select(slide.id, NgbSlideEventSource.INDICATOR);"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides; index as i; count as c" class="carousel-item" [id]="'slide-' + slide.id" role="tabpanel">
        <span class="sr-only" i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number">
          Slide {{i + 1}} of {{c}}
        </span>
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
            },] }
];
NgbCarousel.ctorParameters = () => [
    { type: NgbCarouselConfig },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
NgbCarousel.propDecorators = {
    slides: [{ type: ContentChildren, args: [NgbSlide,] }],
    animation: [{ type: Input }],
    activeId: [{ type: Input }],
    interval: [{ type: Input }],
    wrap: [{ type: Input }],
    keyboard: [{ type: Input }],
    pauseOnHover: [{ type: Input }],
    pauseOnFocus: [{ type: Input }],
    showNavigationArrows: [{ type: Input }],
    showNavigationIndicators: [{ type: Input }],
    slide: [{ type: Output }],
    slid: [{ type: Output }]
};
export var NgbSlideEventSource;
(function (NgbSlideEventSource) {
    NgbSlideEventSource["TIMER"] = "timer";
    NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
    NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
    NgbSlideEventSource["INDICATOR"] = "indicator";
})(NgbSlideEventSource || (NgbSlideEventSource = {}));
export const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sV0FBVyxFQUVYLFdBQVcsRUFDWCxpQkFBaUIsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVGLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGdCQUFnQixFQUF1QixNQUFNLGtDQUFrQyxDQUFDO0FBQy9HLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUV2QixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmOztHQUVHO0FBRUgsTUFBTSxPQUFPLFFBQVE7SUFlbkIsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFkM0M7Ozs7V0FJRztRQUNNLE9BQUUsR0FBRyxhQUFhLE1BQU0sRUFBRSxFQUFFLENBQUM7UUFFdEM7Ozs7V0FJRztRQUNPLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztJQUVYLENBQUM7OztZQWhCaEQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFDOzs7WUF2QjVDLFdBQVc7OztpQkE4QlYsS0FBSzttQkFPTCxNQUFNOztBQUtUOzs7O0dBSUc7QUEyQ0gsTUFBTSxPQUFPLFdBQVc7SUF3SHRCLFlBQ0ksTUFBeUIsRUFBK0IsV0FBVyxFQUFVLE9BQWUsRUFDcEYsR0FBc0IsRUFBVSxVQUFzQjtRQUROLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNwRixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUF0SDNELHdCQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBRXpDLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQTZFNUM7Ozs7V0FJRztRQUNPLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUVwRDs7Ozs7O1dBTUc7UUFDTyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFFbkQ7OztXQUdHO1FBQ0ssbUJBQWMsR0FBNEIsSUFBSSxDQUFDO1FBYXJELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDeEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztJQUNsRSxDQUFDO0lBdEdEOztPQUVHO0lBQ0gsSUFDSSxRQUFRLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFaEQ7O09BRUc7SUFDSCxJQUNJLElBQUksQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQU94Qzs7OztPQUlHO0lBQ0gsSUFDSSxZQUFZLENBQUMsS0FBYztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxZQUFZLEtBQUssT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFeEQ7O09BRUc7SUFDSCxJQUNJLFlBQVksQ0FBQyxLQUFjO1FBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLFlBQVksS0FBSyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQXNDeEQsSUFBSSxVQUFVLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRSxJQUFJLFVBQVUsS0FBSyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVwRCxJQUFJLE9BQU8sQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNELElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBZTlDLFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLDJEQUEyRDtRQUMzRCx5REFBeUQ7UUFDekQsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xDLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQztvQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2RCxDQUFDO3FCQUNHLElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN2QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzlELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RSxDQUFDLENBQUMsRUFDRixvQkFBb0IsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELGFBQWEsQ0FBQztvQkFDWixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQzFHLGFBQWE7aUJBQ2QsQ0FBQztxQkFDRyxJQUFJLENBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFDaEUsWUFBWSxDQUFpRSxFQUFFLEVBQUUsQ0FDL0UsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ25GLENBQUMsQ0FBQyxDQUFDO29CQUNILFFBQVEsQ0FBQyxDQUFDLEVBRXZCLG9CQUFvQixFQUFFLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQy9GLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzdCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFOztZQUNqRSxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFFM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUV4QixtRkFBbUY7WUFDbkYsd0NBQXdDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNqRCxLQUFLLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNqQzt5QkFBTTt3QkFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQsZUFBZTtRQUNiLDhEQUE4RDtRQUM5RCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4Qzs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFlLEVBQUUsTUFBNEI7UUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsTUFBNEI7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsTUFBNEI7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBDOztPQUVHO0lBQ0gsS0FBSyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyQzs7T0FFRztJQUNILEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFMUMsZ0JBQWdCLENBQUMsUUFBZ0IsRUFBRSxTQUFpQyxFQUFFLE1BQTRCO1FBQ3hHLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUYsbUJBQW1CO1lBQ25CLE9BQU87U0FDUjtRQUVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNYLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUVoSCxNQUFNLE9BQU8sR0FBeUM7Z0JBQ3BELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsT0FBTyxFQUFFLEVBQUMsU0FBUyxFQUFDO2FBQ3JCLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBMkIsRUFBRSxDQUFDO1lBQy9DLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxFQUFFO2dCQUNmLE1BQU0scUJBQXFCLEdBQ3ZCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDN0cscUJBQXFCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RyxXQUFXLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDekM7WUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxNQUFNLFVBQVUsR0FDWixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDOUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRixXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTdCLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1YsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFlLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDakgsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELGdHQUFnRztRQUNoRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxvQkFBNEIsRUFBRSxpQkFBeUI7UUFDckYsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXBFLE9BQU8scUJBQXFCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDO0lBQ2pILENBQUM7SUFFTyxhQUFhLENBQUMsT0FBZTtRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDakUsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE9BQWU7UUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU8sYUFBYSxDQUFDLGNBQXNCO1FBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sV0FBVyxHQUFHLGVBQWUsS0FBSyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUU1RCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFTyxhQUFhLENBQUMsY0FBc0I7UUFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxLQUFLLENBQUMsQ0FBQztRQUUzQyxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFlO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7WUF2WEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsaUJBQWlCLEVBQUUsU0FBUztvQkFDNUIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YscUJBQXFCLEVBQUUseUJBQXlCO29CQUNoRCxzQkFBc0IsRUFBRSwwQkFBMEI7b0JBQ2xELGNBQWMsRUFBRSxtQkFBbUI7b0JBQ25DLGNBQWMsRUFBRSxvQkFBb0I7b0JBQ3BDLFdBQVcsRUFBRSxnQkFBZ0I7b0JBQzdCLFlBQVksRUFBRSxpQkFBaUI7b0JBQy9CLDhCQUE4QixFQUFFLHFCQUFxQjtpQkFDdEQ7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7WUFsRk8saUJBQWlCOzRDQTRNUyxNQUFNLFNBQUMsV0FBVztZQXZObEQsTUFBTTtZQVJOLGlCQUFpQjtZQUlqQixVQUFVOzs7cUJBb0dULGVBQWUsU0FBQyxRQUFRO3dCQWtCeEIsS0FBSzt1QkFPTCxLQUFLO3VCQUtMLEtBQUs7bUJBVUwsS0FBSzt1QkFVTCxLQUFLOzJCQU9MLEtBQUs7MkJBVUwsS0FBSzttQ0FZTCxLQUFLO3VDQU9MLEtBQUs7b0JBT0wsTUFBTTttQkFTTixNQUFNOztBQXlTVCxNQUFNLENBQU4sSUFBWSxtQkFLWDtBQUxELFdBQVksbUJBQW1CO0lBQzdCLHNDQUFlLENBQUE7SUFDZiwrQ0FBd0IsQ0FBQTtJQUN4QixpREFBMEIsQ0FBQTtJQUMxQiw4Q0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBTFcsbUJBQW1CLEtBQW5CLG1CQUFtQixRQUs5QjtBQUVELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcblxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE5FVkVSLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aW1lciwgemlwfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtuZ2JDb21wbGV0ZVRyYW5zaXRpb24sIG5nYlJ1blRyYW5zaXRpb24sIE5nYlRyYW5zaXRpb25PcHRpb25zfSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XG5pbXBvcnQge1xuICBuZ2JDYXJvdXNlbFRyYW5zaXRpb25JbixcbiAgbmdiQ2Fyb3VzZWxUcmFuc2l0aW9uT3V0LFxuICBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLFxuICBOZ2JDYXJvdXNlbEN0eFxufSBmcm9tICcuL2Nhcm91c2VsLXRyYW5zaXRpb24nO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBpbmRpdmlkdWFsIGNhcm91c2VsIHNsaWRlLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlNsaWRlXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlNsaWRlIHtcbiAgLyoqXG4gICAqIFNsaWRlIGlkIHRoYXQgbXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgd2lsbCBiZSBnZW5lcmF0ZWQgaW4gdGhlIGBuZ2Itc2xpZGUteHhgIGZvcm1hdC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi1zbGlkZS0ke25leHRJZCsrfWA7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBmaW5pc2hlZFxuICAgKlxuICAgKiBAc2luY2UgOC4wLjBcbiAgICovXG4gIEBPdXRwdXQoKSBzbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JTaW5nbGVTbGlkZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQ2Fyb3VzZWwgaXMgYSBjb21wb25lbnQgdG8gZWFzaWx5IGNyZWF0ZSBhbmQgY29udHJvbCBzbGlkZXNob3dzLlxuICpcbiAqIEFsbG93cyB0byBzZXQgaW50ZXJ2YWxzLCBjaGFuZ2UgdGhlIHdheSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBzbGlkZXMgYW5kIHByb3ZpZGVzIGEgcHJvZ3JhbW1hdGljIEFQSS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWNhcm91c2VsJyxcbiAgZXhwb3J0QXM6ICduZ2JDYXJvdXNlbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2Nhcm91c2VsIHNsaWRlJyxcbiAgICAnW3N0eWxlLmRpc3BsYXldJzogJ1wiYmxvY2tcIicsXG4gICAgJ3RhYkluZGV4JzogJzAnLFxuICAgICcoa2V5ZG93bi5hcnJvd0xlZnQpJzogJ2tleWJvYXJkICYmIGFycm93TGVmdCgpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgYXJyb3dSaWdodCgpJyxcbiAgICAnKG1vdXNlZW50ZXIpJzogJ21vdXNlSG92ZXIgPSB0cnVlJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ21vdXNlSG92ZXIgPSBmYWxzZScsXG4gICAgJyhmb2N1c2luKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhmb2N1c291dCknOiAnZm9jdXNlZCA9IGZhbHNlJyxcbiAgICAnW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XSc6IGAnc2xpZGUtJyArIGFjdGl2ZUlkYFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiBbY2xhc3Muc3Itb25seV09XCIhc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiJ3NsaWRlLScgKyBzbGlkZS5pZFwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwiJ3NsaWRlLScgKyBzbGlkZS5pZFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgIChjbGljayk9XCJmb2N1cygpO3NlbGVjdChzbGlkZS5pZCwgTmdiU2xpZGVFdmVudFNvdXJjZS5JTkRJQ0FUT1IpO1wiPjwvbGk+XG4gICAgPC9vbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaW5uZXJcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlczsgaW5kZXggYXMgaTsgY291bnQgYXMgY1wiIGNsYXNzPVwiY2Fyb3VzZWwtaXRlbVwiIFtpZF09XCInc2xpZGUtJyArIHNsaWRlLmlkXCIgcm9sZT1cInRhYnBhbmVsXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJDdXJyZW50bHkgc2VsZWN0ZWQgc2xpZGUgbnVtYmVyIHJlYWQgYnkgc2NyZWVuIHJlYWRlckBAbmdiLmNhcm91c2VsLnNsaWRlLW51bWJlclwiPlxuICAgICAgICAgIFNsaWRlIHt7aSArIDF9fSBvZiB7e2N9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImFycm93TGVmdCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5wcmV2aW91c1wiPlByZXZpb3VzPC9zcGFuPlxuICAgIDwvYT5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwiYXJyb3dSaWdodCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cbiAgICA8L2E+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiU2xpZGUpIHNsaWRlczogUXVlcnlMaXN0PE5nYlNsaWRlPjtcblxuICBwdWJsaWMgTmdiU2xpZGVFdmVudFNvdXJjZSA9IE5nYlNsaWRlRXZlbnRTb3VyY2U7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9pbnRlcnZhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICBwcml2YXRlIF9tb3VzZUhvdmVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIF9mb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIF9wYXVzZU9uSG92ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgX3BhdXNlT25Gb2N1cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBfcGF1c2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgX3dyYXAkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0byBlbmFibGUvZGlzYWJsZSB0aGUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQHNpbmNlIDguMC4wXG4gICAqL1xuICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBzbGlkZSBpZCB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgKippbml0aWFsbHkqKi5cbiAgICpcbiAgICogRm9yIHN1YnNlcXVlbnQgaW50ZXJhY3Rpb25zIHVzZSBtZXRob2RzIGBzZWxlY3QoKWAsIGBuZXh0KClgLCBldGMuIGFuZCB0aGUgYChzbGlkZSlgIG91dHB1dC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgbmV4dCBzbGlkZSBpcyBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IGludGVydmFsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJ2YWwkLnZhbHVlOyB9XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgd2lsbCAnd3JhcCcgdGhlIGNhcm91c2VsIGJ5IHN3aXRjaGluZyBmcm9tIHRoZSBsYXN0IHNsaWRlIGJhY2sgdG8gdGhlIGZpcnN0LlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHdyYXAodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl93cmFwJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCB3cmFwKCkgeyByZXR1cm4gdGhpcy5fd3JhcCQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCBhbGxvd3MgdG8gaW50ZXJhY3Qgd2l0aCBjYXJvdXNlbCB1c2luZyBrZXlib2FyZCAnYXJyb3cgbGVmdCcgYW5kICdhcnJvdyByaWdodCcuXG4gICAqL1xuICBASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIHBhdXNlIHNsaWRlIHN3aXRjaGluZyB3aGVuIG1vdXNlIGN1cnNvciBob3ZlcnMgdGhlIHNsaWRlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBwYXVzZU9uSG92ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wYXVzZU9uSG92ZXIkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHBhdXNlT25Ib3ZlcigpIHsgcmV0dXJuIHRoaXMuX3BhdXNlT25Ib3ZlciQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIHBhdXNlIHNsaWRlIHN3aXRjaGluZyB3aGVuIHRoZSBmb2N1cyBpcyBpbnNpZGUgdGhlIGNhcm91c2VsLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHBhdXNlT25Gb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3BhdXNlT25Gb2N1cyQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgcGF1c2VPbkZvY3VzKCkgeyByZXR1cm4gdGhpcy5fcGF1c2VPbkZvY3VzJC52YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsICdwcmV2aW91cycgYW5kICduZXh0JyBuYXZpZ2F0aW9uIGFycm93cyB3aWxsIGJlIHZpc2libGUgb24gdGhlIHNsaWRlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uQXJyb3dzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5hdmlnYXRpb24gaW5kaWNhdG9ycyBhdCB0aGUgYm90dG9tIG9mIHRoZSBzbGlkZSB3aWxsIGJlIHZpc2libGUuXG4gICAqXG4gICAqIEBzaW5jZSAyLjIuMFxuICAgKi9cbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIGp1c3QgYmVmb3JlIHRoZSBzbGlkZSB0cmFuc2l0aW9uIHN0YXJ0cy5cbiAgICpcbiAgICogU2VlIFtgTmdiU2xpZGVFdmVudGBdKCMvY29tcG9uZW50cy9jYXJvdXNlbC9hcGkjTmdiU2xpZGVFdmVudCkgZm9yIHBheWxvYWQgZGV0YWlscy5cbiAgICovXG4gIEBPdXRwdXQoKSBzbGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2xpZGVFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBhZnRlciB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXG4gICAqXG4gICAqIFNlZSBbYE5nYlNsaWRlRXZlbnRgXSgjL2NvbXBvbmVudHMvY2Fyb3VzZWwvYXBpI05nYlNsaWRlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqXG4gICAqIEBzaW5jZSA4LjAuMFxuICAgKi9cbiAgQE91dHB1dCgpIHNsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XG5cbiAgLypcbiAgICogS2VlcCB0aGUgaWRzIG9mIHRoZSBwYW5lbHMgY3VycmVudGx5IHRyYW5zaXRpb25uaW5nXG4gICAqIGluIG9yZGVyIHRvIGFsbG93IG9ubHkgdGhlIHRyYW5zaXRpb24gcmV2ZXJ0aW9uXG4gICAqL1xuICBwcml2YXRlIF90cmFuc2l0aW9uSWRzOiBbc3RyaW5nLCBzdHJpbmddIHwgbnVsbCA9IG51bGw7XG5cbiAgc2V0IG1vdXNlSG92ZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fbW91c2VIb3ZlciQubmV4dCh2YWx1ZSk7IH1cblxuICBnZXQgbW91c2VIb3ZlcigpIHsgcmV0dXJuIHRoaXMuX21vdXNlSG92ZXIkLnZhbHVlOyB9XG5cbiAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZm9jdXNlZCQubmV4dCh2YWx1ZSk7IH1cblxuICBnZXQgZm9jdXNlZCgpIHsgcmV0dXJuIHRoaXMuX2ZvY3VzZWQkLnZhbHVlOyB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjb25maWc6IE5nYkNhcm91c2VsQ29uZmlnLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfY29udGFpbmVyOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XG4gICAgdGhpcy53cmFwID0gY29uZmlnLndyYXA7XG4gICAgdGhpcy5rZXlib2FyZCA9IGNvbmZpZy5rZXlib2FyZDtcbiAgICB0aGlzLnBhdXNlT25Ib3ZlciA9IGNvbmZpZy5wYXVzZU9uSG92ZXI7XG4gICAgdGhpcy5wYXVzZU9uRm9jdXMgPSBjb25maWcucGF1c2VPbkZvY3VzO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb25BcnJvd3MgPSBjb25maWcuc2hvd05hdmlnYXRpb25BcnJvd3M7XG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSBjb25maWcuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzO1xuICB9XG5cbiAgYXJyb3dMZWZ0KCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgICB0aGlzLnByZXYoTmdiU2xpZGVFdmVudFNvdXJjZS5BUlJPV19MRUZUKTtcbiAgfVxuXG4gIGFycm93UmlnaHQoKSB7XG4gICAgdGhpcy5mb2N1cygpO1xuICAgIHRoaXMubmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX1JJR0hUKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBzZXRJbnRlcnZhbCgpIGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggU1NSIGFuZCBwcm90cmFjdG9yLFxuICAgIC8vIHNvIHdlIHNob3VsZCBydW4gaXQgaW4gdGhlIGJyb3dzZXIgYW5kIG91dHNpZGUgQW5ndWxhclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFzTmV4dFNsaWRlJCA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlLnBpcGUobWFwKHNsaWRlRXZlbnQgPT4gc2xpZGVFdmVudC5jdXJyZW50KSwgc3RhcnRXaXRoKHRoaXMuYWN0aXZlSWQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcCQsIHRoaXMuc2xpZGVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKFtjdXJyZW50U2xpZGVJZCwgd3JhcF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3cmFwID8gc2xpZGVBcnIubGVuZ3RoID4gMSA6IGN1cnJlbnRTbGlkZUlkeCA8IHNsaWRlQXJyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICAgICAgY29tYmluZUxhdGVzdChbXG4gICAgICAgICAgdGhpcy5fcGF1c2UkLCB0aGlzLl9wYXVzZU9uSG92ZXIkLCB0aGlzLl9tb3VzZUhvdmVyJCwgdGhpcy5fcGF1c2VPbkZvY3VzJCwgdGhpcy5fZm9jdXNlZCQsIHRoaXMuX2ludGVydmFsJCxcbiAgICAgICAgICBoYXNOZXh0U2xpZGUkXG4gICAgICAgIF0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKFtwYXVzZSwgcGF1c2VPbkhvdmVyLCBtb3VzZUhvdmVyLCBwYXVzZU9uRm9jdXMsIGZvY3VzZWQsIGludGVydmFsLFxuICAgICAgICAgICAgICAgICAgICAgIGhhc05leHRTbGlkZV06IFtib29sZWFuLCBib29sZWFuLCBib29sZWFuLCBib29sZWFuLCBib29sZWFuLCBudW1iZXIsIGJvb2xlYW5dKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKChwYXVzZSB8fCAocGF1c2VPbkhvdmVyICYmIG1vdXNlSG92ZXIpIHx8IChwYXVzZU9uRm9jdXMgJiYgZm9jdXNlZCkgfHwgIWhhc05leHRTbGlkZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWwpKSxcblxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN3aXRjaE1hcChpbnRlcnZhbCA9PiBpbnRlcnZhbCA+IDAgPyB0aW1lcihpbnRlcnZhbCwgaW50ZXJ2YWwpIDogTkVWRVIpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5uZXh0KE5nYlNsaWRlRXZlbnRTb3VyY2UuVElNRVIpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25JZHMgPy5mb3JFYWNoKGlkID0+IG5nYkNvbXBsZXRlVHJhbnNpdGlvbih0aGlzLl9nZXRTbGlkZUVsZW1lbnQoaWQpKSk7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uSWRzID0gbnVsbDtcblxuICAgICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBuZWVkIHRvIGJlIGRvbmUgYXN5bmNocm9ub3VzbHksIGFmdGVyIHRoZSBkb20gYmVjb21lcyBzdGFibGUsXG4gICAgICAvLyBvdGhlcndpc2UgYWxsIGNoYW5nZXMgd2lsbCBiZSB1bmRvbmUuXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHsgaWQgfSBvZiB0aGlzLnNsaWRlcykge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9nZXRTbGlkZUVsZW1lbnQoaWQpO1xuICAgICAgICAgIGlmIChpZCA9PT0gdGhpcy5hY3RpdmVJZCkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGxldCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcbiAgICB0aGlzLmFjdGl2ZUlkID0gYWN0aXZlU2xpZGUgPyBhY3RpdmVTbGlkZS5pZCA6ICh0aGlzLnNsaWRlcy5sZW5ndGggPyB0aGlzLnNsaWRlcy5maXJzdC5pZCA6ICcnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSAnYWN0aXZlJyBjbGFzcyAobm90IG1hbmFnZWQgYnkgdGhlIHRlbXBsYXRlKVxuICAgIGlmICh0aGlzLmFjdGl2ZUlkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZ2V0U2xpZGVFbGVtZW50KHRoaXMuYWN0aXZlSWQpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveSQubmV4dCgpOyB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxuICAgKi9cbiAgc2VsZWN0KHNsaWRlSWQ6IHN0cmluZywgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIHRoaXMuX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkLCB0aGlzLl9nZXRTbGlkZUV2ZW50RGlyZWN0aW9uKHRoaXMuYWN0aXZlSWQsIHNsaWRlSWQpLCBzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgcHJldmlvdXMgc2xpZGUuXG4gICAqL1xuICBwcmV2KHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcbiAgICB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0UHJldlNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hULCBzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgbmV4dCBzbGlkZS5cbiAgICovXG4gIG5leHQoc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXROZXh0U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVCwgc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgY3ljbGluZyB0aHJvdWdoIHRoZSBzbGlkZXMuXG4gICAqL1xuICBwYXVzZSgpIHsgdGhpcy5fcGF1c2UkLm5leHQodHJ1ZSk7IH1cblxuICAvKipcbiAgICogUmVzdGFydHMgY3ljbGluZyB0aHJvdWdoIHRoZSBzbGlkZXMgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICAgKi9cbiAgY3ljbGUoKSB7IHRoaXMuX3BhdXNlJC5uZXh0KGZhbHNlKTsgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZvY3VzIG9uIHRoZSBjYXJvdXNlbC5cbiAgICovXG4gIGZvY3VzKCkgeyB0aGlzLl9jb250YWluZXIubmF0aXZlRWxlbWVudC5mb2N1cygpOyB9XG5cbiAgcHJpdmF0ZSBfY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWR4OiBzdHJpbmcsIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbiwgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25JZHMgPSB0aGlzLl90cmFuc2l0aW9uSWRzO1xuICAgIGlmICh0cmFuc2l0aW9uSWRzICYmICh0cmFuc2l0aW9uSWRzWzBdICE9PSBzbGlkZUlkeCB8fCB0cmFuc2l0aW9uSWRzWzFdICE9PSB0aGlzLmFjdGl2ZUlkKSkge1xuICAgICAgLy8gUmV2ZXJ0IHByZXZlbnRlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzZWxlY3RlZFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWR4KTtcbiAgICBpZiAoc2VsZWN0ZWRTbGlkZSAmJiBzZWxlY3RlZFNsaWRlLmlkICE9PSB0aGlzLmFjdGl2ZUlkKSB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uSWRzID0gW3RoaXMuYWN0aXZlSWQsIHNsaWRlSWR4XTtcbiAgICAgIHRoaXMuc2xpZGUuZW1pdChcbiAgICAgICAgICB7cHJldjogdGhpcy5hY3RpdmVJZCwgY3VycmVudDogc2VsZWN0ZWRTbGlkZS5pZCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHBhdXNlZDogdGhpcy5fcGF1c2UkLnZhbHVlLCBzb3VyY2V9KTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogTmdiVHJhbnNpdGlvbk9wdGlvbnM8TmdiQ2Fyb3VzZWxDdHg+ID0ge1xuICAgICAgICBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLFxuICAgICAgICBydW5uaW5nVHJhbnNpdGlvbjogJ3N0b3AnLFxuICAgICAgICBjb250ZXh0OiB7ZGlyZWN0aW9ufSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG4gICAgICBjb25zdCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcbiAgICAgIGlmIChhY3RpdmVTbGlkZSkge1xuICAgICAgICBjb25zdCBhY3RpdmVTbGlkZVRyYW5zaXRpb24gPVxuICAgICAgICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIHRoaXMuX2dldFNsaWRlRWxlbWVudChhY3RpdmVTbGlkZS5pZCksIG5nYkNhcm91c2VsVHJhbnNpdGlvbk91dCwgb3B0aW9ucyk7XG4gICAgICAgIGFjdGl2ZVNsaWRlVHJhbnNpdGlvbi5zdWJzY3JpYmUoKCkgPT4geyBhY3RpdmVTbGlkZS5zbGlkLmVtaXQoe2lzU2hvd246IGZhbHNlLCBkaXJlY3Rpb24sIHNvdXJjZX0pOyB9KTtcbiAgICAgICAgdHJhbnNpdGlvbnMucHVzaChhY3RpdmVTbGlkZVRyYW5zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2aW91c0lkID0gdGhpcy5hY3RpdmVJZDtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xuICAgICAgY29uc3QgbmV4dFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbiA9XG4gICAgICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIHRoaXMuX2dldFNsaWRlRWxlbWVudChzZWxlY3RlZFNsaWRlLmlkKSwgbmdiQ2Fyb3VzZWxUcmFuc2l0aW9uSW4sIG9wdGlvbnMpO1xuICAgICAgdHJhbnNpdGlvbi5zdWJzY3JpYmUoKCkgPT4geyBuZXh0U2xpZGUgPy5zbGlkLmVtaXQoe2lzU2hvd246IHRydWUsIGRpcmVjdGlvbiwgc291cmNlfSk7IH0pO1xuICAgICAgdHJhbnNpdGlvbnMucHVzaCh0cmFuc2l0aW9uKTtcblxuICAgICAgemlwKC4uLnRyYW5zaXRpb25zKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25JZHMgPSBudWxsO1xuICAgICAgICB0aGlzLnNsaWQuZW1pdChcbiAgICAgICAgICAgIHtwcmV2OiBwcmV2aW91c0lkLCBjdXJyZW50OiBzZWxlY3RlZFNsaWRlICEuaWQsIGRpcmVjdGlvbjogZGlyZWN0aW9uLCBwYXVzZWQ6IHRoaXMuX3BhdXNlJC52YWx1ZSwgc291cmNlfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB3ZSBnZXQgaGVyZSBhZnRlciB0aGUgaW50ZXJ2YWwgZmlyZXMgb3IgYW55IGV4dGVybmFsIEFQSSBjYWxsIGxpa2UgbmV4dCgpLCBwcmV2KCkgb3Igc2VsZWN0KClcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNsaWRlRXZlbnREaXJlY3Rpb24oY3VycmVudEFjdGl2ZVNsaWRlSWQ6IHN0cmluZywgbmV4dEFjdGl2ZVNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICAgIGNvbnN0IGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50QWN0aXZlU2xpZGVJZCk7XG4gICAgY29uc3QgbmV4dEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKG5leHRBY3RpdmVTbGlkZUlkKTtcblxuICAgIHJldHVybiBjdXJyZW50QWN0aXZlU2xpZGVJZHggPiBuZXh0QWN0aXZlU2xpZGVJZHggPyBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hUIDogTmdiU2xpZGVFdmVudERpcmVjdGlvbi5MRUZUO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmQoc2xpZGUgPT4gc2xpZGUuaWQgPT09IHNsaWRlSWQpIHx8IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBzbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkKTtcbiAgICByZXR1cm4gc2xpZGUgIT0gbnVsbCA/IHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5pbmRleE9mKHNsaWRlKSA6IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TmV4dFNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50U2xpZGVJZCk7XG4gICAgY29uc3QgaXNMYXN0U2xpZGUgPSBjdXJyZW50U2xpZGVJZHggPT09IHNsaWRlQXJyLmxlbmd0aCAtIDE7XG5cbiAgICByZXR1cm4gaXNMYXN0U2xpZGUgPyAodGhpcy53cmFwID8gc2xpZGVBcnJbMF0uaWQgOiBzbGlkZUFycltzbGlkZUFyci5sZW5ndGggLSAxXS5pZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCArIDFdLmlkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJldlNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50U2xpZGVJZCk7XG4gICAgY29uc3QgaXNGaXJzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSAwO1xuXG4gICAgcmV0dXJuIGlzRmlyc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFycltzbGlkZUFyci5sZW5ndGggLSAxXS5pZCA6IHNsaWRlQXJyWzBdLmlkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCAtIDFdLmlkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVFbGVtZW50KHNsaWRlSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgI3NsaWRlLSR7c2xpZGVJZH1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgc2xpZGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNsaWRlRXZlbnQge1xuICAvKipcbiAgICogVGhlIHByZXZpb3VzIHNsaWRlIGlkLlxuICAgKi9cbiAgcHJldjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzbGlkZSBpZC5cbiAgICovXG4gIGN1cnJlbnQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHNsaWRlIGV2ZW50IGRpcmVjdGlvbi5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgJ2xlZnQnIHwgJ3JpZ2h0J2AuXG4gICAqL1xuICBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb247XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHBhdXNlKCkgbWV0aG9kIHdhcyBjYWxsZWQgKGFuZCBubyBjeWNsZSgpIGNhbGwgd2FzIGRvbmUgYWZ0ZXJ3YXJkcykuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcGF1c2VkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTb3VyY2UgdHJpZ2dlcmluZyB0aGUgc2xpZGUgY2hhbmdlIGV2ZW50LlxuICAgKlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGAndGltZXInIHwgJ2Fycm93TGVmdCcgfCAnYXJyb3dSaWdodCcgfCAnaW5kaWNhdG9yJ2BcbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlO1xufVxuXG4vKipcbiAqIEEgc2xpZGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxuICpcbiAqIEBzaW5jZSA4LjAuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNpbmdsZVNsaWRlRXZlbnQge1xuICAvKipcbiAgICogdHJ1ZSBpZiB0aGUgc2xpZGUgaXMgc2hvd24sIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgaXNTaG93bjogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIHNsaWRlIGV2ZW50IGRpcmVjdGlvbi5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgJ2xlZnQnIHwgJ3JpZ2h0J2AuXG4gICAqL1xuICBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb247XG5cbiAgLyoqXG4gICAqIFNvdXJjZSB0cmlnZ2VyaW5nIHRoZSBzbGlkZSBjaGFuZ2UgZXZlbnQuXG4gICAqXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYCd0aW1lcicgfCAnYXJyb3dMZWZ0JyB8ICdhcnJvd1JpZ2h0JyB8ICdpbmRpY2F0b3InYFxuICAgKlxuICAgKi9cbiAgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZTtcbn1cblxuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudFNvdXJjZSB7XG4gIFRJTUVSID0gJ3RpbWVyJyxcbiAgQVJST1dfTEVGVCA9ICdhcnJvd0xlZnQnLFxuICBBUlJPV19SSUdIVCA9ICdhcnJvd1JpZ2h0JyxcbiAgSU5ESUNBVE9SID0gJ2luZGljYXRvcidcbn1cblxuZXhwb3J0IGNvbnN0IE5HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTID0gW05nYkNhcm91c2VsLCBOZ2JTbGlkZV07XG4iXX0=