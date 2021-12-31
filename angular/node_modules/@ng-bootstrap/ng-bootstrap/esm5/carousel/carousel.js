import { __decorate, __param, __read } from "tslib";
import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, HostListener, Inject, Input, NgZone, OnDestroy, Output, PLATFORM_ID, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { BehaviorSubject, combineLatest, NEVER, Subject, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
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
    NgbSlide.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    __decorate([
        Input()
    ], NgbSlide.prototype, "id", void 0);
    NgbSlide = __decorate([
        Directive({ selector: 'ng-template[ngbSlide]' })
    ], NgbSlide);
    return NgbSlide;
}());
export { NgbSlide };
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
        get: function () { return this._interval$.value; },
        /**
         * Time in milliseconds before the next slide is shown.
         */
        set: function (value) {
            this._interval$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbCarousel.prototype, "wrap", {
        get: function () { return this._wrap$.value; },
        /**
         * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
         */
        set: function (value) {
            this._wrap$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbCarousel.prototype, "pauseOnHover", {
        get: function () { return this._pauseOnHover$.value; },
        /**
         * If `true`, will pause slide switching when mouse cursor hovers the slide.
         *
         * @since 2.2.0
         */
        set: function (value) {
            this._pauseOnHover$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    NgbCarousel.prototype.mouseEnter = function () {
        this._mouseHover$.next(true);
    };
    NgbCarousel.prototype.mouseLeave = function () {
        this._mouseHover$.next(false);
    };
    NgbCarousel.prototype.ngAfterContentInit = function () {
        var _this = this;
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(function () {
                var hasNextSlide$ = combineLatest([
                    _this.slide.pipe(map(function (slideEvent) { return slideEvent.current; }), startWith(_this.activeId)),
                    _this._wrap$, _this.slides.changes.pipe(startWith(null))
                ])
                    .pipe(map(function (_a) {
                    var _b = __read(_a, 2), currentSlideId = _b[0], wrap = _b[1];
                    var slideArr = _this.slides.toArray();
                    var currentSlideIdx = _this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                }), distinctUntilChanged());
                combineLatest([_this._pause$, _this._pauseOnHover$, _this._mouseHover$, _this._interval$, hasNextSlide$])
                    .pipe(map(function (_a) {
                    var _b = __read(_a, 5), pause = _b[0], pauseOnHover = _b[1], mouseHover = _b[2], interval = _b[3], hasNextSlide = _b[4];
                    return ((pause || (pauseOnHover && mouseHover) || !hasNextSlide) ? 0 : interval);
                }), distinctUntilChanged(), switchMap(function (interval) { return interval > 0 ? timer(interval, interval) : NEVER; }), takeUntil(_this._destroy$))
                    .subscribe(function () { return _this._ngZone.run(function () { return _this.next(NgbSlideEventSource.TIMER); }); });
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(function () { return _this._cd.markForCheck(); });
    };
    NgbCarousel.prototype.ngAfterContentChecked = function () {
        var activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : '');
    };
    NgbCarousel.prototype.ngOnDestroy = function () { this._destroy$.next(); };
    /**
     * Navigates to a slide with the specified identifier.
     */
    NgbCarousel.prototype.select = function (slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    };
    /**
     * Navigates to the previous slide.
     */
    NgbCarousel.prototype.prev = function (source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT, source);
    };
    /**
     * Navigates to the next slide.
     */
    NgbCarousel.prototype.next = function (source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT, source);
    };
    /**
     * Pauses cycling through the slides.
     */
    NgbCarousel.prototype.pause = function () { this._pause$.next(true); };
    /**
     * Restarts cycling through the slides from left to right.
     */
    NgbCarousel.prototype.cycle = function () { this._pause$.next(false); };
    NgbCarousel.prototype._cycleToSelected = function (slideIdx, direction, source) {
        var selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source: source });
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    };
    NgbCarousel.prototype._getSlideEventDirection = function (currentActiveSlideId, nextActiveSlideId) {
        var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    };
    NgbCarousel.prototype._getSlideById = function (slideId) {
        return this.slides.find(function (slide) { return slide.id === slideId; }) || null;
    };
    NgbCarousel.prototype._getSlideIdxById = function (slideId) {
        var slide = this._getSlideById(slideId);
        return slide != null ? this.slides.toArray().indexOf(slide) : -1;
    };
    NgbCarousel.prototype._getNextSlide = function (currentSlideId) {
        var slideArr = this.slides.toArray();
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        var isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    };
    NgbCarousel.prototype._getPrevSlide = function (currentSlideId) {
        var slideArr = this.slides.toArray();
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        var isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    };
    NgbCarousel.ctorParameters = function () { return [
        { type: NgbCarouselConfig },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
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
            template: "\n    <ol class=\"carousel-indicators\" *ngIf=\"showNavigationIndicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\"\n          (click)=\"select(slide.id, NgbSlideEventSource.INDICATOR)\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"prev(NgbSlideEventSource.ARROW_LEFT)\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"next(NgbSlideEventSource.ARROW_RIGHT)\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n    </a>\n  "
        }),
        __param(1, Inject(PLATFORM_ID))
    ], NgbCarousel);
    return NgbCarousel;
}());
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
export var NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTFGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmOztHQUVHO0FBRUg7SUFPRSxrQkFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFOM0M7Ozs7V0FJRztRQUNNLE9BQUUsR0FBRyxlQUFhLE1BQU0sRUFBSSxDQUFDO0lBQ1EsQ0FBQzs7Z0JBQXBCLFdBQVc7O0lBRDdCO1FBQVIsS0FBSyxFQUFFO3dDQUE4QjtJQU4zQixRQUFRO1FBRHBCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDO09BQ2xDLFFBQVEsQ0FRcEI7SUFBRCxlQUFD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LDhDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFMVyxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBSzlCO0FBRUQsTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYkNhcm91c2VsQ29uZmlnfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XG5cbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBORVZFUiwgU3ViamVjdCwgdGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgdGhlIGluZGl2aWR1YWwgY2Fyb3VzZWwgc2xpZGUuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiU2xpZGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiU2xpZGUge1xuICAvKipcbiAgICogU2xpZGUgaWQgdGhhdCBtdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudC5cbiAgICpcbiAgICogSWYgbm90IHByb3ZpZGVkLCB3aWxsIGJlIGdlbmVyYXRlZCBpbiB0aGUgYG5nYi1zbGlkZS14eGAgZm9ybWF0LlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBDYXJvdXNlbCBpcyBhIGNvbXBvbmVudCB0byBlYXNpbHkgY3JlYXRlIGFuZCBjb250cm9sIHNsaWRlc2hvd3MuXG4gKlxuICogQWxsb3dzIHRvIHNldCBpbnRlcnZhbHMsIGNoYW5nZSB0aGUgd2F5IHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHNsaWRlcyBhbmQgcHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxuICBleHBvcnRBczogJ25nYkNhcm91c2VsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcbiAgICAndGFiSW5kZXgnOiAnMCcsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAna2V5Ym9hcmQgJiYgcHJldihOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX0xFRlQpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgbmV4dChOZ2JTbGlkZUV2ZW50U291cmNlLkFSUk9XX1JJR0hUKSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8b2wgY2xhc3M9XCJjYXJvdXNlbC1pbmRpY2F0b3JzXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkluZGljYXRvcnNcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgW2lkXT1cInNsaWRlLmlkXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3Qoc2xpZGUuaWQsIE5nYlNsaWRlRXZlbnRTb3VyY2UuSU5ESUNBVE9SKVwiPjwvbGk+XG4gICAgPC9vbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaW5uZXJcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiIGNsYXNzPVwiY2Fyb3VzZWwtaXRlbVwiIFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInByZXYoTmdiU2xpZGVFdmVudFNvdXJjZS5BUlJPV19MRUZUKVwiICpuZ0lmPVwic2hvd05hdmlnYXRpb25BcnJvd3NcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1wcmV2LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwucHJldmlvdXNcIj5QcmV2aW91czwvc3Bhbj5cbiAgICA8L2E+XG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHRcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm5leHQoTmdiU2xpZGVFdmVudFNvdXJjZS5BUlJPV19SSUdIVClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLmNhcm91c2VsLm5leHRcIj5OZXh0PC9zcGFuPlxuICAgIDwvYT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xuXG4gIHB1YmxpYyBOZ2JTbGlkZUV2ZW50U291cmNlID0gTmdiU2xpZGVFdmVudFNvdXJjZTtcblxuICBwcml2YXRlIF9kZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2ludGVydmFsJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByaXZhdGUgX21vdXNlSG92ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgX3BhdXNlT25Ib3ZlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBfcGF1c2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgX3dyYXAkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFRoZSBzbGlkZSBpZCB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgKippbml0aWFsbHkqKi5cbiAgICpcbiAgICogRm9yIHN1YnNlcXVlbnQgaW50ZXJhY3Rpb25zIHVzZSBtZXRob2RzIGBzZWxlY3QoKWAsIGBuZXh0KClgLCBldGMuIGFuZCB0aGUgYChzbGlkZSlgIG91dHB1dC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgbmV4dCBzbGlkZSBpcyBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IGludGVydmFsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJ2YWwkLnZhbHVlOyB9XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgd2lsbCAnd3JhcCcgdGhlIGNhcm91c2VsIGJ5IHN3aXRjaGluZyBmcm9tIHRoZSBsYXN0IHNsaWRlIGJhY2sgdG8gdGhlIGZpcnN0LlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHdyYXAodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl93cmFwJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCB3cmFwKCkgeyByZXR1cm4gdGhpcy5fd3JhcCQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCBhbGxvd3MgdG8gaW50ZXJhY3Qgd2l0aCBjYXJvdXNlbCB1c2luZyBrZXlib2FyZCAnYXJyb3cgbGVmdCcgYW5kICdhcnJvdyByaWdodCcuXG4gICAqL1xuICBASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIHBhdXNlIHNsaWRlIHN3aXRjaGluZyB3aGVuIG1vdXNlIGN1cnNvciBob3ZlcnMgdGhlIHNsaWRlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBwYXVzZU9uSG92ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wYXVzZU9uSG92ZXIkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHBhdXNlT25Ib3ZlcigpIHsgcmV0dXJuIHRoaXMuX3BhdXNlT25Ib3ZlciQudmFsdWU7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCAncHJldmlvdXMnIGFuZCAnbmV4dCcgbmF2aWdhdGlvbiBhcnJvd3Mgd2lsbCBiZSB2aXNpYmxlIG9uIHRoZSBzbGlkZS5cbiAgICpcbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkFycm93czogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBuYXZpZ2F0aW9uIGluZGljYXRvcnMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2xpZGUgd2lsbCBiZSB2aXNpYmxlLlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yczogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBhZnRlciB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXG4gICAqXG4gICAqIFNlZSBbYE5nYlNsaWRlRXZlbnRgXSgjL2NvbXBvbmVudHMvY2Fyb3VzZWwvYXBpI05nYlNsaWRlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgc2xpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjb25maWc6IE5nYkNhcm91c2VsQ29uZmlnLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XG4gICAgdGhpcy53cmFwID0gY29uZmlnLndyYXA7XG4gICAgdGhpcy5rZXlib2FyZCA9IGNvbmZpZy5rZXlib2FyZDtcbiAgICB0aGlzLnBhdXNlT25Ib3ZlciA9IGNvbmZpZy5wYXVzZU9uSG92ZXI7XG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkFycm93cyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkFycm93cztcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkluZGljYXRvcnM7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgbW91c2VFbnRlcigpIHtcbiAgICB0aGlzLl9tb3VzZUhvdmVyJC5uZXh0KHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5fbW91c2VIb3ZlciQubmV4dChmYWxzZSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gc2V0SW50ZXJ2YWwoKSBkb2Vzbid0IHBsYXkgd2VsbCB3aXRoIFNTUiBhbmQgcHJvdHJhY3RvcixcbiAgICAvLyBzbyB3ZSBzaG91bGQgcnVuIGl0IGluIHRoZSBicm93c2VyIGFuZCBvdXRzaWRlIEFuZ3VsYXJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhc05leHRTbGlkZSQgPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZS5waXBlKG1hcChzbGlkZUV2ZW50ID0+IHNsaWRlRXZlbnQuY3VycmVudCksIHN0YXJ0V2l0aCh0aGlzLmFjdGl2ZUlkKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXAkLCB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChbY3VycmVudFNsaWRlSWQsIHdyYXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd3JhcCA/IHNsaWRlQXJyLmxlbmd0aCA+IDEgOiBjdXJyZW50U2xpZGVJZHggPCBzbGlkZUFyci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMuX3BhdXNlJCwgdGhpcy5fcGF1c2VPbkhvdmVyJCwgdGhpcy5fbW91c2VIb3ZlciQsIHRoaXMuX2ludGVydmFsJCwgaGFzTmV4dFNsaWRlJF0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKFtwYXVzZSwgcGF1c2VPbkhvdmVyLCBtb3VzZUhvdmVyLCBpbnRlcnZhbCwgaGFzTmV4dFNsaWRlXSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICgocGF1c2UgfHwgKHBhdXNlT25Ib3ZlciAmJiBtb3VzZUhvdmVyKSB8fCAhaGFzTmV4dFNsaWRlKSA/IDAgOiBpbnRlcnZhbCkpLFxuXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3dpdGNoTWFwKGludGVydmFsID0+IGludGVydmFsID4gMCA/IHRpbWVyKGludGVydmFsLCBpbnRlcnZhbCkgOiBORVZFUiksXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLm5leHQoTmdiU2xpZGVFdmVudFNvdXJjZS5USU1FUikpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2xpZGVzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2QubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGxldCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcbiAgICB0aGlzLmFjdGl2ZUlkID0gYWN0aXZlU2xpZGUgPyBhY3RpdmVTbGlkZS5pZCA6ICh0aGlzLnNsaWRlcy5sZW5ndGggPyB0aGlzLnNsaWRlcy5maXJzdC5pZCA6ICcnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9kZXN0cm95JC5uZXh0KCk7IH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIGEgc2xpZGUgd2l0aCB0aGUgc3BlY2lmaWVkIGlkZW50aWZpZXIuXG4gICAqL1xuICBzZWxlY3Qoc2xpZGVJZDogc3RyaW5nLCBzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XG4gICAgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWQsIHRoaXMuX2dldFNsaWRlRXZlbnREaXJlY3Rpb24odGhpcy5hY3RpdmVJZCwgc2xpZGVJZCksIHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBwcmV2aW91cyBzbGlkZS5cbiAgICovXG4gIHByZXYoc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXRQcmV2U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQsIHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBuZXh0IHNsaWRlLlxuICAgKi9cbiAgbmV4dChzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlKSB7XG4gICAgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldE5leHRTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5MRUZULCBzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBjeWNsaW5nIHRocm91Z2ggdGhlIHNsaWRlcy5cbiAgICovXG4gIHBhdXNlKCkgeyB0aGlzLl9wYXVzZSQubmV4dCh0cnVlKTsgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXJ0cyBjeWNsaW5nIHRocm91Z2ggdGhlIHNsaWRlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAqL1xuICBjeWNsZSgpIHsgdGhpcy5fcGF1c2UkLm5leHQoZmFsc2UpOyB9XG5cbiAgcHJpdmF0ZSBfY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWR4OiBzdHJpbmcsIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbiwgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuICAgIGxldCBzZWxlY3RlZFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWR4KTtcbiAgICBpZiAoc2VsZWN0ZWRTbGlkZSAmJiBzZWxlY3RlZFNsaWRlLmlkICE9PSB0aGlzLmFjdGl2ZUlkKSB7XG4gICAgICB0aGlzLnNsaWRlLmVtaXQoXG4gICAgICAgICAge3ByZXY6IHRoaXMuYWN0aXZlSWQsIGN1cnJlbnQ6IHNlbGVjdGVkU2xpZGUuaWQsIGRpcmVjdGlvbjogZGlyZWN0aW9uLCBwYXVzZWQ6IHRoaXMuX3BhdXNlJC52YWx1ZSwgc291cmNlfSk7XG4gICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRTbGlkZS5pZDtcbiAgICB9XG5cbiAgICAvLyB3ZSBnZXQgaGVyZSBhZnRlciB0aGUgaW50ZXJ2YWwgZmlyZXMgb3IgYW55IGV4dGVybmFsIEFQSSBjYWxsIGxpa2UgbmV4dCgpLCBwcmV2KCkgb3Igc2VsZWN0KClcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNsaWRlRXZlbnREaXJlY3Rpb24oY3VycmVudEFjdGl2ZVNsaWRlSWQ6IHN0cmluZywgbmV4dEFjdGl2ZVNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICAgIGNvbnN0IGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50QWN0aXZlU2xpZGVJZCk7XG4gICAgY29uc3QgbmV4dEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKG5leHRBY3RpdmVTbGlkZUlkKTtcblxuICAgIHJldHVybiBjdXJyZW50QWN0aXZlU2xpZGVJZHggPiBuZXh0QWN0aXZlU2xpZGVJZHggPyBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hUIDogTmdiU2xpZGVFdmVudERpcmVjdGlvbi5MRUZUO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmQoc2xpZGUgPT4gc2xpZGUuaWQgPT09IHNsaWRlSWQpIHx8IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBzbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkKTtcbiAgICByZXR1cm4gc2xpZGUgIT0gbnVsbCA/IHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5pbmRleE9mKHNsaWRlKSA6IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TmV4dFNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50U2xpZGVJZCk7XG4gICAgY29uc3QgaXNMYXN0U2xpZGUgPSBjdXJyZW50U2xpZGVJZHggPT09IHNsaWRlQXJyLmxlbmd0aCAtIDE7XG5cbiAgICByZXR1cm4gaXNMYXN0U2xpZGUgPyAodGhpcy53cmFwID8gc2xpZGVBcnJbMF0uaWQgOiBzbGlkZUFycltzbGlkZUFyci5sZW5ndGggLSAxXS5pZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCArIDFdLmlkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJldlNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50U2xpZGVJZCk7XG4gICAgY29uc3QgaXNGaXJzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSAwO1xuXG4gICAgcmV0dXJuIGlzRmlyc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFycltzbGlkZUFyci5sZW5ndGggLSAxXS5pZCA6IHNsaWRlQXJyWzBdLmlkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCAtIDFdLmlkO1xuICB9XG59XG5cbi8qKlxuICogQSBzbGlkZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBhZnRlciB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiU2xpZGVFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgcHJldmlvdXMgc2xpZGUgaWQuXG4gICAqL1xuICBwcmV2OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNsaWRlIGlkLlxuICAgKi9cbiAgY3VycmVudDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc2xpZGUgZXZlbnQgZGlyZWN0aW9uLlxuICAgKlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGAnbGVmdCcgfCAncmlnaHQnYC5cbiAgICovXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgcGF1c2UoKSBtZXRob2Qgd2FzIGNhbGxlZCAoYW5kIG5vIGN5Y2xlKCkgY2FsbCB3YXMgZG9uZSBhZnRlcndhcmRzKS5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBwYXVzZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNvdXJjZSB0cmlnZ2VyaW5nIHRoZSBzbGlkZSBjaGFuZ2UgZXZlbnQuXG4gICAqXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYCd0aW1lcicgfCAnYXJyb3dMZWZ0JyB8ICdhcnJvd1JpZ2h0JyB8ICdpbmRpY2F0b3InYFxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2U7XG59XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgY2Fyb3VzZWwgc2xpZGUgdHJhbnNpdGlvbiBkaXJlY3Rpb24uXG4gKi9cbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICBMRUZUID0gPGFueT4nbGVmdCcsXG4gIFJJR0hUID0gPGFueT4ncmlnaHQnXG59XG5cbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnRTb3VyY2Uge1xuICBUSU1FUiA9ICd0aW1lcicsXG4gIEFSUk9XX0xFRlQgPSAnYXJyb3dMZWZ0JyxcbiAgQVJST1dfUklHSFQgPSAnYXJyb3dSaWdodCcsXG4gIElORElDQVRPUiA9ICdpbmRpY2F0b3InXG59XG5cbmV4cG9ydCBjb25zdCBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUyA9IFtOZ2JDYXJvdXNlbCwgTmdiU2xpZGVdO1xuIl19