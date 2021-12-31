var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef, TemplateRef, ViewRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, PrimeTemplate } from 'primeng/api';
var idx = 0;
var AccordionTab = /** @class */ (function () {
    function AccordionTab(accordion, changeDetector) {
        this.changeDetector = changeDetector;
        this.cache = true;
        this.selectedChange = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = "ui-accordiontab-" + idx++;
        this.accordion = accordion;
    }
    Object.defineProperty(AccordionTab.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            if (!this.loaded) {
                this.changeDetector.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionTab.prototype, "animating", {
        get: function () {
            return this._animating;
        },
        set: function (val) {
            this._animating = val;
            if (!this.changeDetector.destroyed) {
                this.changeDetector.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                default:
                    _this.contentTemplate = item.template;
                    break;
            }
        });
    };
    AccordionTab.prototype.toggle = function (event) {
        if (this.disabled || this.animating) {
            return false;
        }
        this.animating = true;
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        event.preventDefault();
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
        get: function () {
            return this.headerFacet && this.headerFacet.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    AccordionTab.prototype.onKeydown = function (event) {
        if (event.which === 32 || event.which === 13) {
            this.toggle(event);
            event.preventDefault();
        }
    };
    AccordionTab.prototype.ngOnDestroy = function () {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    };
    AccordionTab.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return Accordion; }),] }] },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], AccordionTab.prototype, "header", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "cache", void 0);
    __decorate([
        Output()
    ], AccordionTab.prototype, "selectedChange", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "transitionOptions", void 0);
    __decorate([
        ContentChildren(Header)
    ], AccordionTab.prototype, "headerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], AccordionTab.prototype, "templates", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "selected", null);
    AccordionTab = __decorate([
        Component({
            selector: 'p-accordionTab',
            template: "\n        <div class=\"ui-accordion-header ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-active': selected,'ui-state-disabled':disabled}\">\n            <a [attr.tabindex]=\"disabled ? -1 : 0\" [attr.id]=\"id\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"selected\" (click)=\"toggle($event)\" \n                (keydown)=\"onKeydown($event)\">\n                <span class=\"ui-accordion-toggle-icon\" [ngClass]=\"selected ? accordion.collapseIcon : accordion.expandIcon\"></span>\n                <span class=\"ui-accordion-header-text\" *ngIf=\"!hasHeaderFacet\">\n                    {{header}}\n                </span>\n                <ng-content select=\"p-header\" *ngIf=\"hasHeaderFacet\"></ng-content>\n            </a>\n        </div>\n        <div [attr.id]=\"id + '-content'\" class=\"ui-accordion-content-wrapper\" [@tabContent]=\"selected ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\" (@tabContent.done)=\"onToggleDone($event)\"\n            [ngClass]=\"{'ui-accordion-content-wrapper-overflown': !selected||animating}\" \n            role=\"region\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id\">\n            <div class=\"ui-accordion-content ui-widget-content\">\n                <ng-content></ng-content>\n                <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('tabContent', [
                    state('hidden', style({
                        height: '0'
                    })),
                    state('void', style({
                        height: '{{height}}'
                    }), { params: { height: '0' } }),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible <=> hidden', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __param(0, Inject(forwardRef(function () { return Accordion; })))
    ], AccordionTab);
    return AccordionTab;
}());
export { AccordionTab };
var Accordion = /** @class */ (function () {
    function Accordion(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.onClose = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.expandIcon = 'pi pi-fw pi-chevron-right';
        this.collapseIcon = 'pi pi-fw pi-chevron-down';
        this.activeIndexChange = new EventEmitter();
        this.tabs = [];
    }
    Accordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe(function (_) {
            _this.initTabs();
            _this.changeDetector.markForCheck();
        });
    };
    Accordion.prototype.initTabs = function () {
        this.tabs = this.tabList.toArray();
        this.updateSelectionState();
    };
    Accordion.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(Accordion.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.preventActiveIndexPropagation) {
                this.preventActiveIndexPropagation = false;
                return;
            }
            this.updateSelectionState();
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.updateSelectionState = function () {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (var i = 0; i < this.tabs.length; i++) {
                var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                var changed = selected !== this.tabs[i].selected;
                if (changed) {
                    this.tabs[i].animating = true;
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        }
    };
    Accordion.prototype.updateActiveIndex = function () {
        var _this = this;
        var index = this.multiple ? [] : null;
        this.tabs.forEach(function (tab, i) {
            if (tab.selected) {
                if (_this.multiple) {
                    index.push(i);
                }
                else {
                    index = i;
                    return;
                }
            }
        });
        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index);
    };
    Accordion.prototype.ngOnDestroy = function () {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    };
    Accordion.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Accordion.prototype, "multiple", void 0);
    __decorate([
        Output()
    ], Accordion.prototype, "onClose", void 0);
    __decorate([
        Output()
    ], Accordion.prototype, "onOpen", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "style", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "expandIcon", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "collapseIcon", void 0);
    __decorate([
        Output()
    ], Accordion.prototype, "activeIndexChange", void 0);
    __decorate([
        ContentChildren(AccordionTab)
    ], Accordion.prototype, "tabList", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "activeIndex", null);
    Accordion = __decorate([
        Component({
            selector: 'p-accordion',
            template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"tablist\">\n            <ng-content></ng-content>\n        </div>\n    "
        })
    ], Accordion);
    return Accordion;
}());
export { Accordion };
var AccordionModule = /** @class */ (function () {
    function AccordionModule() {
    }
    AccordionModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Accordion, AccordionTab, SharedModule],
            declarations: [Accordion, AccordionTab]
        })
    ], AccordionModule);
    return AccordionModule;
}());
export { AccordionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hY2NvcmRpb24vIiwic291cmNlcyI6WyJhY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDOUYsZUFBZSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWxFLElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQztBQTRDcEI7SUFtREksc0JBQWlELFNBQVMsRUFBUyxjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUE3QzNGLFVBQUssR0FBWSxJQUFJLENBQUM7UUFFckIsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4RCxzQkFBaUIsR0FBVyxzQ0FBc0MsQ0FBQztRQW1DNUUsT0FBRSxHQUFXLHFCQUFtQixHQUFHLEVBQUksQ0FBQztRQU9wQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQXNCLENBQUM7SUFDNUMsQ0FBQztJQWpDUSxzQkFBSSxrQ0FBUTthQUFaO1lBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFhLEdBQVE7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxH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QUUsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDO1NBQ3pDLENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgXG4gICAgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENoYW5nZURldGVjdG9yUmVmLCBJbmplY3QsIGZvcndhcmRSZWYsIFRlbXBsYXRlUmVmLCBWaWV3UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIEhlYWRlciwgUHJpbWVUZW1wbGF0ZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmxldCBpZHg6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hY2NvcmRpb25UYWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1hY2NvcmRpb24taGVhZGVyIHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogc2VsZWN0ZWQsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIj5cbiAgICAgICAgICAgIDxhIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gLTEgOiAwXCIgW2F0dHIuaWRdPVwiaWRcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJy1jb250ZW50J1wiIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInNlbGVjdGVkXCIgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWFjY29yZGlvbi10b2dnbGUtaWNvblwiIFtuZ0NsYXNzXT1cInNlbGVjdGVkID8gYWNjb3JkaW9uLmNvbGxhcHNlSWNvbiA6IGFjY29yZGlvbi5leHBhbmRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYWNjb3JkaW9uLWhlYWRlci10ZXh0XCIgKm5nSWY9XCIhaGFzSGVhZGVyRmFjZXRcIj5cbiAgICAgICAgICAgICAgICAgICAge3toZWFkZXJ9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiICpuZ0lmPVwiaGFzSGVhZGVyRmFjZXRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkICsgJy1jb250ZW50J1wiIGNsYXNzPVwidWktYWNjb3JkaW9uLWNvbnRlbnQtd3JhcHBlclwiIFtAdGFiQ29udGVudF09XCJzZWxlY3RlZCA/IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJ319IDoge3ZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnfX1cIiAoQHRhYkNvbnRlbnQuZG9uZSk9XCJvblRvZ2dsZURvbmUoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWFjY29yZGlvbi1jb250ZW50LXdyYXBwZXItb3ZlcmZsb3duJzogIXNlbGVjdGVkfHxhbmltYXRpbmd9XCIgXG4gICAgICAgICAgICByb2xlPVwicmVnaW9uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktYWNjb3JkaW9uLWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZSAmJiAoY2FjaGUgPyBsb2FkZWQgOiBzZWxlY3RlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCd0YWJDb250ZW50JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAne3toZWlnaHR9fSdcbiAgICAgICAgICAgIH0pLCB7cGFyYW1zOiB7aGVpZ2h0OiAnMCd9fSksXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25UYWIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEhlYWRlcikgaGVhZGVyRmFjZXQ6IFF1ZXJ5TGlzdDxIZWFkZXI+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9hbmltYXRpbmc6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWw6IGFueSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbDtcbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGFuaW1hdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hdGluZztcbiAgICB9XG4gICAgc2V0IGFuaW1hdGluZyh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW5nID0gdmFsO1xuXG4gICAgICAgIGlmICghKHRoaXMuY2hhbmdlRGV0ZWN0b3IgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGlkOiBzdHJpbmcgPSBgdWktYWNjb3JkaW9udGFiLSR7aWR4Kyt9YDtcblxuICAgIGxvYWRlZDogYm9vbGVhbjtcblxuICAgIGFjY29yZGlvbjogQWNjb3JkaW9uO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEFjY29yZGlvbikpIGFjY29yZGlvbiwgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbiBhcyBBY2NvcmRpb247XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZFRhYkluZGV4KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLm9uQ2xvc2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWNjb3JkaW9uLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24udGFic1tpXS5zZWxlY3RlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24ub25PcGVuLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLmFjY29yZGlvbi51cGRhdGVBY3RpdmVJbmRleCgpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZmluZFRhYkluZGV4KCkge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY2NvcmRpb24udGFic1tpXSA9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBnZXQgaGFzSGVhZGVyRmFjZXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlckZhY2V0ICYmIHRoaXMuaGVhZGVyRmFjZXQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBvblRvZ2dsZURvbmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMzIgfHwgZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYWNjb3JkaW9uLnRhYnMuc3BsaWNlKHRoaXMuZmluZFRhYkluZGV4KCksIDEpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWFjY29yZGlvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktYWNjb3JkaW9uIHVpLXdpZGdldCB1aS1oZWxwZXItcmVzZXQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uIGltcGxlbWVudHMgQmxvY2thYmxlVUksIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGV4cGFuZEljb246IHN0cmluZyA9ICdwaSBwaS1mdyBwaS1jaGV2cm9uLXJpZ2h0JztcblxuICAgIEBJbnB1dCgpIGNvbGxhcHNlSWNvbjogc3RyaW5nID0gJ3BpIHBpLWZ3IHBpLWNoZXZyb24tZG93bic7XG5cbiAgICBAT3V0cHV0KCkgYWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGRyZW4oQWNjb3JkaW9uVGFiKSB0YWJMaXN0OiBRdWVyeUxpc3Q8QWNjb3JkaW9uVGFiPjtcblxuICAgIHRhYkxpc3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBcbiAgICBwcml2YXRlIF9hY3RpdmVJbmRleDogYW55O1xuXG4gICAgcHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb246IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIHRhYnM6IEFjY29yZGlvblRhYltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcblxuICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24gPSB0aGlzLnRhYkxpc3QuY2hhbmdlcy5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0VGFicygpOiBhbnkge1xuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLnRhYkxpc3QudG9BcnJheSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvblN0YXRlKCk7XG4gICAgfVxuICAgICAgXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH0gXG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlSW5kZXgodmFsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSB2YWw7XG4gICAgICAgIGlmICh0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uU3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmVJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMubXVsdGlwbGUgPyB0aGlzLl9hY3RpdmVJbmRleC5pbmNsdWRlcyhpKSA6IChpID09PSB0aGlzLl9hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZWQgPSBzZWxlY3RlZCAhPT0gdGhpcy50YWJzW2ldLnNlbGVjdGVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJzW2ldLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFic1tpXS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnNbaV0uc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGxldCBpbmRleDogYW55ID0gdGhpcy5tdWx0aXBsZSA/IFtdIDogbnVsbDtcbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4LnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50YWJMaXN0U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQWNjb3JkaW9uLEFjY29yZGlvblRhYixTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0FjY29yZGlvbixBY2NvcmRpb25UYWJdXG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbk1vZHVsZSB7IH1cbiJdfQ==