var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var ScrollPanel = /** @class */ (function () {
    function ScrollPanel(el, zone) {
        this.el = el;
        this.zone = zone;
        this.timeoutFrame = function (fn) { return setTimeout(fn, 0); };
    }
    ScrollPanel.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.moveBar();
            _this.moveBar = _this.moveBar.bind(_this);
            _this.onXBarMouseDown = _this.onXBarMouseDown.bind(_this);
            _this.onYBarMouseDown = _this.onYBarMouseDown.bind(_this);
            _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_this);
            _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_this);
            window.addEventListener('resize', _this.moveBar);
            _this.contentViewChild.nativeElement.addEventListener('scroll', _this.moveBar);
            _this.contentViewChild.nativeElement.addEventListener('mouseenter', _this.moveBar);
            _this.xBarViewChild.nativeElement.addEventListener('mousedown', _this.onXBarMouseDown);
            _this.yBarViewChild.nativeElement.addEventListener('mousedown', _this.onYBarMouseDown);
            _this.calculateContainerHeight();
            _this.initialized = true;
        });
    };
    ScrollPanel.prototype.calculateContainerHeight = function () {
        var container = this.containerViewChild.nativeElement;
        var content = this.contentViewChild.nativeElement;
        var xBar = this.xBarViewChild.nativeElement;
        var containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
            }
        }
    };
    ScrollPanel.prototype.moveBar = function () {
        var _this = this;
        var container = this.containerViewChild.nativeElement;
        var content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        var xBar = this.xBarViewChild.nativeElement;
        var totalWidth = content.scrollWidth;
        var ownWidth = content.clientWidth;
        var bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        var yBar = this.yBarViewChild.nativeElement;
        var totalHeight = content.scrollHeight;
        var ownHeight = content.clientHeight;
        var right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(function () {
            if (_this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'ui-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(xBar, 'ui-scrollpanel-hidden');
                var xBarWidth = Math.max(_this.scrollXRatio * 100, 10);
                var xBarLeft = content.scrollLeft * (100 - xBarWidth) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (_this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'ui-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(yBar, 'ui-scrollpanel-hidden');
                var yBarHeight = Math.max(_this.scrollYRatio * 100, 10);
                var yBarTop = content.scrollTop * (100 - yBarHeight) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
    };
    ScrollPanel.prototype.onYBarMouseDown = function (e) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    };
    ScrollPanel.prototype.onXBarMouseDown = function (e) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    };
    ScrollPanel.prototype.onDocumentMouseMove = function (e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    };
    ScrollPanel.prototype.onMouseMoveForXBar = function (e) {
        var _this = this;
        var deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(function () {
            _this.contentViewChild.nativeElement.scrollLeft += deltaX / _this.scrollXRatio;
        });
    };
    ScrollPanel.prototype.onMouseMoveForYBar = function (e) {
        var _this = this;
        var deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(function () {
            _this.contentViewChild.nativeElement.scrollTop += deltaY / _this.scrollYRatio;
        });
    };
    ScrollPanel.prototype.scrollTop = function (scrollTop) {
        var scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    };
    ScrollPanel.prototype.onDocumentMouseUp = function (e) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    };
    ScrollPanel.prototype.requestAnimationFrame = function (f) {
        var frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    };
    ScrollPanel.prototype.ngOnDestroy = function () {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    };
    ScrollPanel.prototype.refresh = function () {
        this.moveBar();
    };
    ScrollPanel.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], ScrollPanel.prototype, "style", void 0);
    __decorate([
        Input()
    ], ScrollPanel.prototype, "styleClass", void 0);
    __decorate([
        ViewChild('container')
    ], ScrollPanel.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('content')
    ], ScrollPanel.prototype, "contentViewChild", void 0);
    __decorate([
        ViewChild('xBar')
    ], ScrollPanel.prototype, "xBarViewChild", void 0);
    __decorate([
        ViewChild('yBar')
    ], ScrollPanel.prototype, "yBarViewChild", void 0);
    ScrollPanel = __decorate([
        Component({
            selector: 'p-scrollPanel',
            template: "\n        <div #container [ngClass]=\"'ui-scrollpanel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-scrollpanel-wrapper\">\n                <div #content class=\"ui-scrollpanel-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n            <div #xBar class=\"ui-scrollpanel-bar ui-scrollpanel-bar-x\"></div>\n            <div #yBar class=\"ui-scrollpanel-bar ui-scrollpanel-bar-y\"></div>   \n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ScrollPanel);
    return ScrollPanel;
}());
export { ScrollPanel };
var ScrollPanelModule = /** @class */ (function () {
    function ScrollPanelModule() {
    }
    ScrollPanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ScrollPanel],
            declarations: [ScrollPanel]
        })
    ], ScrollPanelModule);
    return ScrollPanelModule;
}());
export { ScrollPanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Njcm9sbHBhbmVsLyIsInNvdXJjZXMiOlsic2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFpQnpDO0lBTUkscUJBQW1CLEVBQWMsRUFBUyxJQUFZO1FBQW5DLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBY3RELGlCQUFZLEdBQVEsVUFBQyxFQUFFLElBQUssT0FBQSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFqQixDQUFpQixDQUFDO0lBZFcsQ0FBQztJQTBCMUQscUNBQWUsR0FBZjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FB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QUo3QztRQUFSLEtBQUssRUFBRTs4Q0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFO21EQUFvQjtJQUlKO1FBQXZCLFNBQVMsQ0FBQyxXQUFXLENBQUM7MkRBQWdDO0lBRWpDO1FBQXJCLFNBQVMsQ0FBQyxTQUFTLENBQUM7eURBQThCO0lBRWhDO1FBQWxCLFNBQVMsQ0FBQyxNQUFNLENBQUM7c0RBQTJCO0lBRTFCO1FBQWxCLFNBQVMsQ0FBQyxNQUFNLENBQUM7c0RBQTJCO0lBZHBDLFdBQVc7UUFmdkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLDJoQkFVVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxXQUFXLENBK012QjtJQUFELGtCQUFDO0NBQUEsQUEvTUQsSUErTUM7U0EvTVksV0FBVztBQXNOeEI7SUFBQTtJQUFpQyxDQUFDO0lBQXJCLGlCQUFpQjtRQUw3QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUM5QixDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFBLEFBQWxDLElBQWtDO1NBQXJCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIE5nWm9uZSwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zY3JvbGxQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cIid1aS1zY3JvbGxwYW5lbCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktc2Nyb2xscGFuZWwtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS1zY3JvbGxwYW5lbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjeEJhciBjbGFzcz1cInVpLXNjcm9sbHBhbmVsLWJhciB1aS1zY3JvbGxwYW5lbC1iYXIteFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjeUJhciBjbGFzcz1cInVpLXNjcm9sbHBhbmVsLWJhciB1aS1zY3JvbGxwYW5lbC1iYXIteVwiPjwvZGl2PiAgIFxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxQYW5lbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgneEJhcicpIHhCYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgQFZpZXdDaGlsZCgneUJhcicpIHlCYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBzY3JvbGxZUmF0aW86IG51bWJlcjtcblxuICAgIHNjcm9sbFhSYXRpbzogbnVtYmVyO1xuXG4gICAgdGltZW91dEZyYW1lOiBhbnkgPSAoZm4pID0+IHNldFRpbWVvdXQoZm4sIDApO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlcjtcblxuICAgIGxhc3RQYWdlWDogbnVtYmVyO1xuXG4gICAgaXNYQmFyQ2xpY2tlZDogYm9vbGVhbjtcblxuICAgIGlzWUJhckNsaWNrZWQ6IGJvb2xlYW47XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUJhciA9IHRoaXMubW92ZUJhci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblhCYXJNb3VzZURvd24gPSB0aGlzLm9uWEJhck1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbllCYXJNb3VzZURvd24gPSB0aGlzLm9uWUJhck1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwID0gdGhpcy5vbkRvY3VtZW50TW91c2VVcC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcbiAgICAgICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25ZQmFyTW91c2VEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB4QmFyID0gdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lclN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKSxcbiAgICAgICAgeEJhclN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoeEJhciksXG4gICAgICAgIHB1cmVDb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodChjb250YWluZXIpIC0gcGFyc2VJbnQoeEJhclN0eWxlc1snaGVpZ2h0J10sIDEwKTtcblxuICAgICAgICBpZiAoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10gIT0gXCJub25lXCIgJiYgcHVyZUNvbnRhaW5lckhlaWdodCA9PSAwKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudC5vZmZzZXRIZWlnaHQgKyBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApID4gcGFyc2VJbnQoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10sIDEwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMucGFkZGluZ0JvdHRvbSkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCkgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQmFyKCkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvKiBob3Jpem9udGFsIHNjcm9sbCAqL1xuICAgICAgICBsZXQgeEJhciA9IHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdG90YWxXaWR0aCA9IGNvbnRlbnQuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGxldCBvd25XaWR0aCA9IGNvbnRlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGxldCBib3R0b20gPSAoY29udGFpbmVyLmNsaWVudEhlaWdodCAtIHhCYXIuY2xpZW50SGVpZ2h0KSAqIC0xO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsWFJhdGlvID0gb3duV2lkdGggLyB0b3RhbFdpZHRoO1xuXG4gICAgICAgIC8qIHZlcnRpY2FsIHNjcm9sbCAqL1xuICAgICAgICBsZXQgeUJhciA9IHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgbGV0IG93bkhlaWdodCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBsZXQgcmlnaHQgPSAoY29udGFpbmVyLmNsaWVudFdpZHRoIC0geUJhci5jbGllbnRXaWR0aCkgKiAtMTtcblxuICAgICAgICB0aGlzLnNjcm9sbFlSYXRpbyA9IG93bkhlaWdodCAvIHRvdGFsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFhSYXRpbyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh4QmFyLCAndWktc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh4QmFyLCAndWktc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeEJhcldpZHRoID0gTWF0aC5tYXgodGhpcy5zY3JvbGxYUmF0aW8gKiAxMDAsIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4QmFyTGVmdCA9IGNvbnRlbnQuc2Nyb2xsTGVmdCAqICgxMDAgLSB4QmFyV2lkdGgpIC8gKHRvdGFsV2lkdGggLSBvd25XaWR0aCk7XG4gICAgICAgICAgICAgICAgeEJhci5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOicgKyB4QmFyV2lkdGggKyAnJTsgbGVmdDonICsgeEJhckxlZnQgKyAnJTtib3R0b206JyArIGJvdHRvbSArICdweDsnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxZUmF0aW8gPj0gMSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeUJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeUJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlCYXJIZWlnaHQgPSBNYXRoLm1heCh0aGlzLnNjcm9sbFlSYXRpbyAqIDEwMCwgMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlCYXJUb3AgPSBjb250ZW50LnNjcm9sbFRvcCAqICgxMDAgLSB5QmFySGVpZ2h0KSAvICh0b3RhbEhlaWdodCAtIG93bkhlaWdodCk7XG4gICAgICAgICAgICAgICAgeUJhci5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDonICsgeUJhckhlaWdodCArICclOyB0b3A6IGNhbGMoJyArIHlCYXJUb3AgKyAnJSAtICcgKyB4QmFyLmNsaWVudEhlaWdodCArICdweCk7cmlnaHQ6JyArIHJpZ2h0ICsgJ3B4Oyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uWUJhck1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZS5wYWdlWTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgXG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblhCYXJNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmlzWEJhckNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1hCYXJDbGlja2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWEJhcihlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzWUJhckNsaWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JZQmFyKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvclhCYXIoZSk7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWUJhcihlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZUZvclhCYXIoZTogTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgZGVsdGFYID0gZS5wYWdlWCAtIHRoaXMubGFzdFBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggLyB0aGlzLnNjcm9sbFhSYXRpbztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmVGb3JZQmFyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGRlbHRhWSA9IGUucGFnZVkgLSB0aGlzLmxhc3RQYWdlWTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVkgLyB0aGlzLnNjcm9sbFlSYXRpbztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlSGVpZ2h0ID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgPiBzY3JvbGxhYmxlSGVpZ2h0ID8gc2Nyb2xsYWJsZUhlaWdodCA6IHNjcm9sbFRvcCA+IDAgPyBzY3JvbGxUb3AgOiAwO1xuICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlVXAoZTogRXZlbnQpIHtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKTtcbiAgICAgICAgdGhpcy5pc1hCYXJDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmOiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8wqB0aGlzLnRpbWVvdXRGcmFtZTtcbiAgICAgICAgZnJhbWUoZik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcbiAgICAgICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25ZQmFyTW91c2VEb3duKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubW92ZUJhcigpO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTY3JvbGxQYW5lbF0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsUGFuZWxdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsTW9kdWxlIHsgfVxuIl19