/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, HostListener, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { BehaviorSubject, combineLatest, NEVER, Subject, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
/** @type {?} */
var nextId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
var NgbSlide = /** @class */ (function () {
    function NgbSlide(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = "ngb-slide-" + nextId++;
    }
    NgbSlide.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
    ];
    /** @nocollapse */
    NgbSlide.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbSlide.propDecorators = {
        id: [{ type: Input }]
    };
    return NgbSlide;
}());
export { NgbSlide };
if (false) {
    /**
     * Slide id that must be unique for the entire document.
     *
     * If not provided, will be generated in the `ngb-slide-xx` format.
     * @type {?}
     */
    NgbSlide.prototype.id;
    /** @type {?} */
    NgbSlide.prototype.tplRef;
}
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
var NgbCarousel = /** @class */ (function () {
    function NgbCarousel(config, _platformId, _ngZone, _cd) {
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
    Object.defineProperty(NgbCarousel.prototype, "interval", {
        get: /**
         * @return {?}
         */
        function () { return this._interval$.value; },
        /**
         * Time in milliseconds before the next slide is shown.
         */
        set: /**
         * Time in milliseconds before the next slide is shown.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._interval$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbCarousel.prototype, "wrap", {
        get: /**
         * @return {?}
         */
        function () { return this._wrap$.value; },
        /**
         * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
         */
        set: /**
         * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._wrap$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbCarousel.prototype, "pauseOnHover", {
        get: /**
         * @return {?}
         */
        function () { return this._pauseOnHover$.value; },
        /**
         * If `true`, will pause slide switching when mouse cursor hovers the slide.
         *
         * @since 2.2.0
         */
        set: /**
         * If `true`, will pause slide switching when mouse cursor hovers the slide.
         *
         * \@since 2.2.0
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pauseOnHover$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgbCarousel.prototype.mouseEnter = /**
     * @return {?}
     */
    function () {
        this._mouseHover$.next(true);
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.mouseLeave = /**
     * @return {?}
     */
    function () {
        this._mouseHover$.next(false);
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var hasNextSlide$ = combineLatest(_this.slide.pipe(map((/**
                 * @param {?} slideEvent
                 * @return {?}
                 */
                function (slideEvent) { return slideEvent.current; })), startWith(_this.activeId)), _this._wrap$, _this.slides.changes.pipe(startWith(null)))
                    .pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = tslib_1.__read(_a, 2), currentSlideId = _b[0], wrap = _b[1];
                    /** @type {?} */
                    var slideArr = _this.slides.toArray();
                    /** @type {?} */
                    var currentSlideIdx = _this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                })), distinctUntilChanged());
                combineLatest(_this._pause$, _this._pauseOnHover$, _this._mouseHover$, _this._interval$, hasNextSlide$)
                    .pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = tslib_1.__read(_a, 5), pause = _b[0], pauseOnHover = _b[1], mouseHover = _b[2], interval = _b[3], hasNextSlide = _b[4];
                    return ((pause || (pauseOnHover && mouseHover) || !hasNextSlide) ? 0 : interval);
                })), distinctUntilChanged(), switchMap((/**
                 * @param {?} interval
                 * @return {?}
                 */
                function (interval) { return interval > 0 ? timer(interval, interval) : NEVER; })), takeUntil(_this._destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this._ngZone.run((/**
                 * @return {?}
                 */
                function () { return _this.next(NgbSlideEventSource.TIMER); })); }));
            }));
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe((/**
         * @return {?}
         */
        function () { return _this._cd.markForCheck(); }));
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._destroy$.next(); };
    /**
     * Navigates to a slide with the specified identifier.
     */
    /**
     * Navigates to a slide with the specified identifier.
     * @param {?} slideId
     * @param {?=} source
     * @return {?}
     */
    NgbCarousel.prototype.select = /**
     * Navigates to a slide with the specified identifier.
     * @param {?} slideId
     * @param {?=} source
     * @return {?}
     */
    function (slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    };
    /**
     * Navigates to the previous slide.
     */
    /**
     * Navigates to the previous slide.
     * @param {?=} source
     * @return {?}
     */
    NgbCarousel.prototype.prev = /**
     * Navigates to the previous slide.
     * @param {?=} source
     * @return {?}
     */
    function (source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT, source);
    };
    /**
     * Navigates to the next slide.
     */
    /**
     * Navigates to the next slide.
     * @param {?=} source
     * @return {?}
     */
    NgbCarousel.prototype.next = /**
     * Navigates to the next slide.
     * @param {?=} source
     * @return {?}
     */
    function (source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT, source);
    };
    /**
     * Pauses cycling through the slides.
     */
    /**
     * Pauses cycling through the slides.
     * @return {?}
     */
    NgbCarousel.prototype.pause = /**
     * Pauses cycling through the slides.
     * @return {?}
     */
    function () { this._pause$.next(true); };
    /**
     * Restarts cycling through the slides from left to right.
     */
    /**
     * Restarts cycling through the slides from left to right.
     * @return {?}
     */
    NgbCarousel.prototype.cycle = /**
     * Restarts cycling through the slides from left to right.
     * @return {?}
     */
    function () { this._pause$.next(false); };
    /**
     * @private
     * @param {?} slideIdx
     * @param {?} direction
     * @param {?=} source
     * @return {?}
     */
    NgbCarousel.prototype._cycleToSelected = /**
     * @private
     * @param {?} slideIdx
     * @param {?} direction
     * @param {?=} source
     * @return {?}
     */
    function (slideIdx, direction, source) {
        /** @type {?} */
        var selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source: source });
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    };
    /**
     * @private
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideEventDirection = /**
     * @private
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    function (currentActiveSlideId, nextActiveSlideId) {
        /** @type {?} */
        var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        /** @type {?} */
        var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    };
    /**
     * @private
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideById = /**
     * @private
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) { return this.slides.find((/**
     * @param {?} slide
     * @return {?}
     */
    function (slide) { return slide.id === slideId; })); };
    /**
     * @private
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideIdxById = /**
     * @private
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    };
    /**
     * @private
     * @param {?} currentSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getNextSlide = /**
     * @private
     * @param {?} currentSlideId
     * @return {?}
     */
    function (currentSlideId) {
        /** @type {?} */
        var slideArr = this.slides.toArray();
        /** @type {?} */
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        var isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    };
    /**
     * @private
     * @param {?} currentSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getPrevSlide = /**
     * @private
     * @param {?} currentSlideId
     * @return {?}
     */
    function (currentSlideId) {
        /** @type {?} */
        var slideArr = this.slides.toArray();
        /** @type {?} */
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        var isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    };
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
                        '(keydown.arrowLeft)': 'keyboard && prev(NgbSlideEventSource.ARROW_LEFT)',
                        '(keydown.arrowRight)': 'keyboard && next(NgbSlideEventSource.ARROW_RIGHT)'
                    },
                    template: "\n    <ol class=\"carousel-indicators\" *ngIf=\"showNavigationIndicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\"\n          (click)=\"select(slide.id, NgbSlideEventSource.INDICATOR)\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"prev(NgbSlideEventSource.ARROW_LEFT)\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"next(NgbSlideEventSource.ARROW_RIGHT)\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n    </a>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbCarousel.ctorParameters = function () { return [
        { type: NgbCarouselConfig },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    NgbCarousel.propDecorators = {
        slides: [{ type: ContentChildren, args: [NgbSlide,] }],
        activeId: [{ type: Input }],
        interval: [{ type: Input }],
        wrap: [{ type: Input }],
        keyboard: [{ type: Input }],
        pauseOnHover: [{ type: Input }],
        showNavigationArrows: [{ type: Input }],
        showNavigationIndicators: [{ type: Input }],
        slide: [{ type: Output }],
        mouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
        mouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return NgbCarousel;
}());
export { NgbCarousel };
if (false) {
    /** @type {?} */
    NgbCarousel.prototype.slides;
    /** @type {?} */
    NgbCarousel.prototype.NgbSlideEventSource;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._destroy$;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._interval$;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._mouseHover$;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._pauseOnHover$;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._pause$;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._wrap$;
    /**
     * The slide id that should be displayed **initially**.
     *
     * For subsequent interactions use methods `select()`, `next()`, etc. and the `(slide)` output.
     * @type {?}
     */
    NgbCarousel.prototype.activeId;
    /**
     * If `true`, allows to interact with carousel using keyboard 'arrow left' and 'arrow right'.
     * @type {?}
     */
    NgbCarousel.prototype.keyboard;
    /**
     * If `true`, 'previous' and 'next' navigation arrows will be visible on the slide.
     *
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationArrows;
    /**
     * If `true`, navigation indicators at the bottom of the slide will be visible.
     *
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationIndicators;
    /**
     * An event emitted right after the slide transition is completed.
     *
     * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
     * @type {?}
     */
    NgbCarousel.prototype.slide;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._platformId;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    NgbCarousel.prototype._cd;
}
/**
 * A slide change event emitted right after the slide transition is completed.
 * @record
 */
export function NgbSlideEvent() { }
if (false) {
    /**
     * The previous slide id.
     * @type {?}
     */
    NgbSlideEvent.prototype.prev;
    /**
     * The current slide id.
     * @type {?}
     */
    NgbSlideEvent.prototype.current;
    /**
     * The slide event direction.
     *
     * Possible values are `'left' | 'right'`.
     * @type {?}
     */
    NgbSlideEvent.prototype.direction;
    /**
     * Whether the pause() method was called (and no cycle() call was done afterwards).
     *
     * \@since 5.1.0
     * @type {?}
     */
    NgbSlideEvent.prototype.paused;
    /**
     * Source triggering the slide change event.
     *
     * Possible values are `'timer' | 'arrowLeft' | 'arrowRight' | 'indicator'`
     *
     * \@since 5.1.0
     * @type {?|undefined}
     */
    NgbSlideEvent.prototype.source;
}
/** @enum {string} */
var NgbSlideEventDirection = {
    LEFT: (/** @type {?} */ ('left')),
    RIGHT: (/** @type {?} */ ('right')),
};
export { NgbSlideEventDirection };
/** @enum {string} */
var NgbSlideEventSource = {
    TIMER: 'timer',
    ARROW_LEFT: 'arrowLeft',
    ARROW_RIGHT: 'arrowRight',
    INDICATOR: 'indicator',
};
export { NgbSlideEventSource };
/** @type {?} */
export var NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFFdEYsTUFBTSxHQUFHLENBQUM7Ozs7QUFLZDtJQVFFLGtCQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjs7Ozs7O1FBRGxDLE9BQUUsR0FBRyxlQUFhLE1BQU0sRUFBSSxDQUFDO0lBQ1EsQ0FBQzs7Z0JBUmhELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBQzs7OztnQkFmNUMsV0FBVzs7O3FCQXNCVixLQUFLOztJQUVSLGVBQUM7Q0FBQSxBQVRELElBU0M7U0FSWSxRQUFROzs7Ozs7OztJQU1uQixzQkFBc0M7O0lBQzFCLDBCQUErQjs7Ozs7OztBQVE3QztJQThHRSxxQkFDSSxNQUF5QixFQUErQixXQUFX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ICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYkNhcm91c2VsQ29uZmlnfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XG5cbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBORVZFUiwgU3ViamVjdCwgdGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgdGhlIGluZGl2aWR1YWwgY2Fyb3VzZWwgc2xpZGUuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiU2xpZGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiU2xpZGUge1xuICAvKipcbiAgICogU2xpZGUgaWQgdGhhdCBtdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudC5cbiAgICpcbiAgICogSWYgbm90IHByb3ZpZGVkLCB3aWxsIGJlIGdlbmVyYXRlZCBpbiB0aGUgYG5nYi1zbGlkZS14eGAgZm9ybWF0LlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBDYXJvdXNlbCBpcyBhIGNvbXBvbmVudCB0byBlYXNpbHkgY3JlYXRlIGFuZCBjb250cm9sIHNsaWRlc2hvd3MuXG4gKlxuICogQWxsb3dzIHRvIHNldCBpbnRlcnZhbHMsIGNoYW5nZSB0aGUgd2F5IHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHNsaWRlcyBhbmQgcHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxuICBleHBvcnRBczogJ25nYkNhcm91c2VsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcbiAgICAndGFiSW5kZXgnOiAnMCcsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAna2V5Ym9hcmQgJiYgcHJldihOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX0xFRlQpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgbmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX1JJR0hUKSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8b2wgY2xhc3M9XCJjYXJvdXNlbC1pbmRpY2F0b3JzXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkluZGljYXRvcnNcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgW2lkXT1cInNsaWRlLmlkXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3Qoc2xpZGUuaWQsIE5nYlNsaWRlRXZlbnRTb3VyY2UuSU5ESUNBVE9SKVwiPjwvbGk+XG4gICAgPC9vbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaW5uZXJcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiIGNsYXNzPVwiY2Fyb3VzZWwtaXRlbVwiIFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInByZXYoTmdiU2xpZGVFdmVudFNvdXJjZS5BUlJPV19MRUZUKVwiICpuZ0lmPVwic2hvd05hdmlnYXRpb25BcnJvd3NcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1wcmV2LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwucHJldmlvdXNcIj5QcmV2aW91czwvc3Bhbj5cbiAgICA8L2E+XG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHRcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm5leHQoTmdiU2xpZGVFdmVudFNvdXJjZS5BUlJPV19SSUdIVClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLmNhcm91c2VsLm5leHRcIj5OZXh0PC9zcGFuPlxuICAgIDwvYT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xuXG4gIHB1YmxpYyBOZ2JTbGlkZUV2ZW50U291cmNlID0gTmdiU2xpZGVFdmVudFNvdXJjZTtcblxuICBwcml2YXRlIF9kZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2ludGVydmFsJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgX21vdXNlSG92ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgX3BhdXNlT25Ib3ZlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBfcGF1c2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgX3dyYXAkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFRoZSBzbGlkZSBpZCB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgKippbml0aWFsbHkqKi5cbiAgICpcbiAgICogRm9yIHN1YnNlcXVlbnQgaW50ZXJhY3Rpb25zIHVzZSBtZXRob2RzIGBzZWxlY3QoKWAsIGBuZXh0KClgLCBldGMuIGFuZCB0aGUgYChzbGlkZSlgIG91dHB1dC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgbmV4dCBzbGlkZSBpcyBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IGludGVydmFsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJ2YWwkLnZhbHVlOyB9XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgd2lsbCAnd3JhcCcgdGhlIGNhcm91c2VsIGJ5IHN3aXRjaGluZyBmcm9tIHRoZSBsYXN0IHNsaWRlIGJhY2sgdG8gdGhlIGZpcnN0LlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHdyYXAodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl93cmFwJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCB3cmFwKCkgeyByZXR1cm4gdGhpcy5fd3JhcCQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCBhbGxvd3MgdG8gaW50ZXJhY3Qgd2l0aCBjYXJvdXNlbCB1c2luZyBrZXlib2FyZCAnYXJyb3cgbGVmdCcgYW5kICdhcnJvdyByaWdodCcuXG4gICAqL1xuICBASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIHBhdXNlIHNsaWRlIHN3aXRjaGluZyB3aGVuIG1vdXNlIGN1cnNvciBob3ZlcnMgdGhlIHNsaWRlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBwYXVzZU9uSG92ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wYXVzZU9uSG92ZXIkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHBhdXNlT25Ib3ZlcigpIHsgcmV0dXJuIHRoaXMuX3BhdXNlT25Ib3ZlciQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCAncHJldmlvdXMnIGFuZCAnbmV4dCcgbmF2aWdhdGlvbiBhcnJvd3Mgd2lsbCBiZSB2aXNpYmxlIG9uIHRoZSBzbGlkZS5cbiAgICpcbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkFycm93czogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBuYXZpZ2F0aW9uIGluZGljYXRvcnMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2xpZGUgd2lsbCBiZSB2aXNpYmxlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yczogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBhZnRlciB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXG4gICAqXG4gICAqIFNlZSBbYE5nYlNsaWRlRXZlbnRgXSgjL2NvbXBvbmVudHMvY2Fyb3VzZWwvYXBpI05nYlNsaWRlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgc2xpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjb25maWc6IE5nYkNhcm91c2VsQ29uZmlnLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XG4gICAgdGhpcy53cmFwID0gY29uZmlnLndyYXA7XG4gICAgdGhpcy5rZXlib2FyZCA9IGNvbmZpZy5rZXlib2FyZDtcbiAgICB0aGlzLnBhdXNlT25Ib3ZlciA9IGNvbmZpZy5wYXVzZU9uSG92ZXI7XG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkFycm93cyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkFycm93cztcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkluZGljYXRvcnM7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgbW91c2VFbnRlcigpIHtcbiAgICB0aGlzLl9tb3VzZUhvdmVyJC5uZXh0KHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5fbW91c2VIb3ZlciQubmV4dChmYWxzZSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gc2V0SW50ZXJ2YWwoKSBkb2Vzbid0IHBsYXkgd2VsbCB3aXRoIFNTUiBhbmQgcHJvdHJhY3RvcixcbiAgICAvLyBzbyB3ZSBzaG91bGQgcnVuIGl0IGluIHRoZSBicm93c2VyIGFuZCBvdXRzaWRlIEFuZ3VsYXJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhc05leHRTbGlkZSQgPSBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUucGlwZShtYXAoc2xpZGVFdmVudCA9PiBzbGlkZUV2ZW50LmN1cnJlbnQpLCBzdGFydFdpdGgodGhpcy5hY3RpdmVJZCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXAkLCB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChbY3VycmVudFNsaWRlSWQsIHdyYXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd3JhcCA/IHNsaWRlQXJyLmxlbmd0aCA+IDEgOiBjdXJyZW50U2xpZGVJZHggPCBzbGlkZUFyci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5fcGF1c2UkLCB0aGlzLl9wYXVzZU9uSG92ZXIkLCB0aGlzLl9tb3VzZUhvdmVyJCwgdGhpcy5faW50ZXJ2YWwkLCBoYXNOZXh0U2xpZGUkKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChbcGF1c2UsIHBhdXNlT25Ib3ZlciwgbW91c2VIb3ZlciwgaW50ZXJ2YWwsIGhhc05leHRTbGlkZV0pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAoKHBhdXNlIHx8IChwYXVzZU9uSG92ZXIgJiYgbW91c2VIb3ZlcikgfHwgIWhhc05leHRTbGlkZSkgPyAwIDogaW50ZXJ2YWwpKSxcblxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN3aXRjaE1hcChpbnRlcnZhbCA9PiBpbnRlcnZhbCA+IDAgPyB0aW1lcihpbnRlcnZhbCwgaW50ZXJ2YWwpIDogTkVWRVIpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5uZXh0KE5nYlNsaWRlRXZlbnRTb3VyY2UuVElNRVIpKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBsZXQgYWN0aXZlU2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQodGhpcy5hY3RpdmVJZCk7XG4gICAgdGhpcy5hY3RpdmVJZCA9IGFjdGl2ZVNsaWRlID8gYWN0aXZlU2xpZGUuaWQgOiAodGhpcy5zbGlkZXMubGVuZ3RoID8gdGhpcy5zbGlkZXMuZmlyc3QuaWQgOiBudWxsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9kZXN0cm95JC5uZXh0KCk7IH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIGEgc2xpZGUgd2l0aCB0aGUgc3BlY2lmaWVkIGlkZW50aWZpZXIuXG4gICAqL1xuICBzZWxlY3Qoc2xpZGVJZDogc3RyaW5nLCBzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XG4gICAgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWQsIHRoaXMuX2dldFNsaWRlRXZlbnREaXJlY3Rpb24odGhpcy5hY3RpdmVJZCwgc2xpZGVJZCksIHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBwcmV2aW91cyBzbGlkZS5cbiAgICovXG4gIHByZXYoc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXRQcmV2U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQsIHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBuZXh0IHNsaWRlLlxuICAgKi9cbiAgbmV4dChzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XG4gICAgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldE5leHRTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5MRUZULCBzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBjeWNsaW5nIHRocm91Z2ggdGhlIHNsaWRlcy5cbiAgICovXG4gIHBhdXNlKCkgeyB0aGlzLl9wYXVzZSQubmV4dCh0cnVlKTsgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXJ0cyBjeWNsaW5nIHRocm91Z2ggdGhlIHNsaWRlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAqL1xuICBjeWNsZSgpIHsgdGhpcy5fcGF1c2UkLm5leHQoZmFsc2UpOyB9XG5cbiAgcHJpdmF0ZSBfY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWR4OiBzdHJpbmcsIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbiwgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIGxldCBzZWxlY3RlZFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWR4KTtcbiAgICBpZiAoc2VsZWN0ZWRTbGlkZSAmJiBzZWxlY3RlZFNsaWRlLmlkICE9PSB0aGlzLmFjdGl2ZUlkKSB7XG4gICAgICB0aGlzLnNsaWRlLmVtaXQoXG4gICAgICAgICAge3ByZXY6IHRoaXMuYWN0aXZlSWQsIGN1cnJlbnQ6IHNlbGVjdGVkU2xpZGUuaWQsIGRpcmVjdGlvbjogZGlyZWN0aW9uLCBwYXVzZWQ6IHRoaXMuX3BhdXNlJC52YWx1ZSwgc291cmNlfSk7XG4gICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRTbGlkZS5pZDtcbiAgICB9XG5cbiAgICAvLyB3ZSBnZXQgaGVyZSBhZnRlciB0aGUgaW50ZXJ2YWwgZmlyZXMgb3IgYW55IGV4dGVybmFsIEFQSSBjYWxsIGxpa2UgbmV4dCgpLCBwcmV2KCkgb3Igc2VsZWN0KClcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNsaWRlRXZlbnREaXJlY3Rpb24oY3VycmVudEFjdGl2ZVNsaWRlSWQ6IHN0cmluZywgbmV4dEFjdGl2ZVNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICAgIGNvbnN0IGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50QWN0aXZlU2xpZGVJZCk7XG4gICAgY29uc3QgbmV4dEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKG5leHRBY3RpdmVTbGlkZUlkKTtcblxuICAgIHJldHVybiBjdXJyZW50QWN0aXZlU2xpZGVJZHggPiBuZXh0QWN0aXZlU2xpZGVJZHggPyBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hUIDogTmdiU2xpZGVFdmVudERpcmVjdGlvbi5MRUZUO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlIHsgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmQoc2xpZGUgPT4gc2xpZGUuaWQgPT09IHNsaWRlSWQpOyB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVJZHhCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXROZXh0U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICBjb25zdCBpc0xhc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gc2xpZGVBcnIubGVuZ3RoIC0gMTtcblxuICAgIHJldHVybiBpc0xhc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFyclswXS5pZCA6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVBcnJbY3VycmVudFNsaWRlSWR4ICsgMV0uaWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcmV2U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICBjb25zdCBpc0ZpcnN0U2xpZGUgPSBjdXJyZW50U2xpZGVJZHggPT09IDA7XG5cbiAgICByZXR1cm4gaXNGaXJzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkIDogc2xpZGVBcnJbMF0uaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVBcnJbY3VycmVudFNsaWRlSWR4IC0gMV0uaWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHNsaWRlIGNoYW5nZSBldmVudCBlbWl0dGVkIHJpZ2h0IGFmdGVyIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JTbGlkZUV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBwcmV2aW91cyBzbGlkZSBpZC5cbiAgICovXG4gIHByZXY6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2xpZGUgaWQuXG4gICAqL1xuICBjdXJyZW50OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzbGlkZSBldmVudCBkaXJlY3Rpb24uXG4gICAqXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYCdsZWZ0JyB8ICdyaWdodCdgLlxuICAgKi9cbiAgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBwYXVzZSgpIG1ldGhvZCB3YXMgY2FsbGVkIChhbmQgbm8gY3ljbGUoKSBjYWxsIHdhcyBkb25lIGFmdGVyd2FyZHMpLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHBhdXNlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU291cmNlIHRyaWdnZXJpbmcgdGhlIHNsaWRlIGNoYW5nZSBldmVudC5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgJ3RpbWVyJyB8ICdhcnJvd0xlZnQnIHwgJ2Fycm93UmlnaHQnIHwgJ2luZGljYXRvcidgXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZTtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBjYXJvdXNlbCBzbGlkZSB0cmFuc2l0aW9uIGRpcmVjdGlvbi5cbiAqL1xuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gIExFRlQgPSA8YW55PidsZWZ0JyxcbiAgUklHSFQgPSA8YW55PidyaWdodCdcbn1cblxuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudFNvdXJjZSB7XG4gIFRJTUVSID0gJ3RpbWVyJyxcbiAgQVJST1dfTEVGVCA9ICdhcnJvd0xlZnQnLFxuICBBUlJPV19SSUdIVCA9ICdhcnJvd1JpZ2h0JyxcbiAgSU5ESUNBVE9SID0gJ2luZGljYXRvcidcbn1cblxuZXhwb3J0IGNvbnN0IE5HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTID0gW05nYkNhcm91c2VsLCBOZ2JTbGlkZV07XG4iXX0=