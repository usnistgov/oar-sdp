var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule, PrimeTemplate } from 'primeng/api';
var idx = 0;
var TabViewNav = /** @class */ (function () {
    function TabViewNav() {
        this.orientation = 'top';
        this.onTabClick = new EventEmitter();
        this.onTabCloseClick = new EventEmitter();
    }
    TabViewNav.prototype.getDefaultHeaderClass = function (tab) {
        var styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    };
    TabViewNav.prototype.clickTab = function (event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    TabViewNav.prototype.clickClose = function (event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    __decorate([
        Input()
    ], TabViewNav.prototype, "tabs", void 0);
    __decorate([
        Input()
    ], TabViewNav.prototype, "orientation", void 0);
    __decorate([
        Output()
    ], TabViewNav.prototype, "onTabClick", void 0);
    __decorate([
        Output()
    ], TabViewNav.prototype, "onTabCloseClick", void 0);
    TabViewNav = __decorate([
        Component({
            selector: '[p-tabViewNav]',
            host: {
                '[class.ui-tabview-nav]': 'true',
                '[class.ui-helper-reset]': 'true',
                '[class.ui-helper-clearfix]': 'true',
                '[class.ui-widget-header]': 'true',
                '[class.ui-corner-all]': 'true'
            },
            template: "\n        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n            <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\" role=\"presentation\" [attr.tabindex]=\"tab.disabled ? -1 : 0\"\n                [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}\"\n                (click)=\"clickTab($event,tab)\" *ngIf=\"!tab.closed\" tabindex=\"0\" (keydown.enter)=\"clickTab($event,tab)\">\n                <a [attr.id]=\"tab.id + '-label'\" role=\"tab\" [attr.aria-selected]=\"tab.selected\" [attr.aria-controls]=\"tab.id\" [pTooltip]=\"tab.tooltip\" [tooltipPosition]=\"tab.tooltipPosition\"\n                    [attr.aria-selected]=\"tab.selected\" [positionStyle]=\"tab.tooltipPositionStyle\" [tooltipStyleClass]=\"tab.tooltipStyleClass\">\n                    <ng-container *ngIf=\"!tab.headerTemplate\" >\n                        <span class=\"ui-tabview-left-icon\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                        <span class=\"ui-tabview-title\">{{tab.header}}</span>\n                        <span class=\"ui-tabview-right-icon\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                    </ng-container>\n                    <ng-container *ngIf=\"tab.headerTemplate\">\n                        <ng-container *ngTemplateOutlet=\"tab.headerTemplate\"></ng-container>\n                    </ng-container>\n                </a>\n                <span *ngIf=\"tab.closable\" class=\"ui-tabview-close pi pi-times\" (click)=\"clickClose($event,tab)\"></span>\n            </li>\n        </ng-template>\n    "
        })
    ], TabViewNav);
    return TabViewNav;
}());
export { TabViewNav };
var TabPanel = /** @class */ (function () {
    function TabPanel(viewContainer, cd) {
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.cache = true;
        this.tooltipPosition = 'top';
        this.tooltipPositionStyle = 'absolute';
        this.id = "ui-tabpanel-" + idx++;
    }
    TabPanel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                default:
                    _this.contentTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(TabPanel.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            if (!this.loaded) {
                this.cd.detectChanges();
            }
            this.loaded = true;
        },
        enumerable: true,
        configurable: true
    });
    TabPanel.prototype.ngOnDestroy = function () {
        this.view = null;
    };
    TabPanel.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], TabPanel.prototype, "header", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "closable", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "headerStyle", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "headerStyleClass", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "leftIcon", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "rightIcon", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "cache", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltip", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltipPosition", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltipPositionStyle", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltipStyleClass", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], TabPanel.prototype, "templates", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "selected", null);
    TabPanel = __decorate([
        Component({
            selector: 'p-tabPanel',
            template: "\n        <div [attr.id]=\"id\" class=\"ui-tabview-panel ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': !selected}\"\n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </ng-container>\n        </div>\n    "
        })
    ], TabPanel);
    return TabPanel;
}());
export { TabPanel };
var TabView = /** @class */ (function () {
    function TabView(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.activeIndexChange = new EventEmitter();
    }
    TabView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabPanels.changes.subscribe(function (_) {
            _this.initTabs();
        });
    };
    TabView.prototype.initTabs = function () {
        this.tabs = this.tabPanels.toArray();
        var selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    };
    TabView.prototype.open = function (event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            var selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            var selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
        }
        if (event) {
            event.preventDefault();
        }
    };
    TabView.prototype.close = function (event, tab) {
        var _this = this;
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: function () {
                    _this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
        event.stopPropagation();
    };
    TabView.prototype.closeTab = function (tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            tab.selected = false;
            for (var i = 0; i < this.tabs.length; i++) {
                var tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    };
    TabView.prototype.findSelectedTab = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    };
    TabView.prototype.findTabIndex = function (tab) {
        var index = -1;
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    };
    TabView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(TabView.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.preventActiveIndexPropagation) {
                this.preventActiveIndexPropagation = false;
                return;
            }
            if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
                this.findSelectedTab().selected = false;
                this.tabs[this._activeIndex].selected = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabView.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], TabView.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "style", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "controlClose", void 0);
    __decorate([
        ContentChildren(TabPanel)
    ], TabView.prototype, "tabPanels", void 0);
    __decorate([
        Output()
    ], TabView.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], TabView.prototype, "onClose", void 0);
    __decorate([
        Output()
    ], TabView.prototype, "activeIndexChange", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "activeIndex", null);
    TabView = __decorate([
        Component({
            selector: 'p-tabView',
            template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation!='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation=='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], TabView);
    return TabView;
}());
export { TabView };
var TabViewModule = /** @class */ (function () {
    function TabViewModule() {
    }
    TabViewModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, TooltipModule],
            exports: [TabView, TabPanel, TabViewNav, SharedModule],
            declarations: [TabView, TabPanel, TabViewNav]
        })
    ], TabViewModule);
    return TabViewModule;
}());
export { TabViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGFidmlldy8iLCJzb3VyY2VzIjpbInRhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFDbEYsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHdkQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBZ0NwQjtJQUFBO1FBSWEsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFFM0IsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF1QnRFLENBQUM7SUFyQkcsMENBQXFCLEdBQXJCLFVBQXNCLEdBQVk7UUFDOUIsSUFBSSxVQUFVLEdBQUcsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN0QixVQUFVLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsNkJBQVEsR0FBUixVQUFTLEtBQUssRUFBRSxHQUFhO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2pCLGFBQWEs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cG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQWZ0ZXJDb250ZW50SW5pdCxcbiAgICAgICAgQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZixFbWJlZGRlZFZpZXdSZWYsVmlld0NvbnRhaW5lclJlZixDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxubGV0IGlkeDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbcC10YWJWaWV3TmF2XScsXG4gICAgaG9zdDp7XG4gICAgICAgICdbY2xhc3MudWktdGFidmlldy1uYXZdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWhlbHBlci1yZXNldF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktaGVscGVyLWNsZWFyZml4XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXQtaGVhZGVyXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxuICAgICAgICAgICAgPGxpIFtjbGFzc109XCJnZXREZWZhdWx0SGVhZGVyQ2xhc3ModGFiKVwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBbYXR0ci50YWJpbmRleF09XCJ0YWIuZGlzYWJsZWQgPyAtMSA6IDBcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktdGFidmlldy1zZWxlY3RlZCB1aS1zdGF0ZS1hY3RpdmUnOiB0YWIuc2VsZWN0ZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGlja1RhYigkZXZlbnQsdGFiKVwiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIiB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bi5lbnRlcik9XCJjbGlja1RhYigkZXZlbnQsdGFiKVwiPlxuICAgICAgICAgICAgICAgIDxhIFthdHRyLmlkXT1cInRhYi5pZCArICctbGFiZWwnXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidGFiLnNlbGVjdGVkXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0YWIuaWRcIiBbcFRvb2x0aXBdPVwidGFiLnRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cInRhYi50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5zZWxlY3RlZFwiIFtwb3NpdGlvblN0eWxlXT1cInRhYi50b29sdGlwUG9zaXRpb25TdHlsZVwiIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0YWIudG9vbHRpcFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0YWIuaGVhZGVyVGVtcGxhdGVcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctbGVmdC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLmxlZnRJY29uXCIgKm5nSWY9XCJ0YWIubGVmdEljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctdGl0bGVcIj57e3RhYi5oZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdGFidmlldy1yaWdodC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLnJpZ2h0SWNvblwiICpuZ0lmPVwidGFiLnJpZ2h0SWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGFiLmNsb3NhYmxlXCIgY2xhc3M9XCJ1aS10YWJ2aWV3LWNsb3NlIHBpIHBpLXRpbWVzXCIgKGNsaWNrKT1cImNsaWNrQ2xvc2UoJGV2ZW50LHRhYilcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXdOYXYge1xuICAgIFxuICAgIEBJbnB1dCgpIHRhYnM6IFRhYlBhbmVsW107XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBAT3V0cHV0KCkgb25UYWJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uVGFiQ2xvc2VDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgZ2V0RGVmYXVsdEhlYWRlckNsYXNzKHRhYjpUYWJQYW5lbCkge1xuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9ICd1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci0nICsgdGhpcy5vcmllbnRhdGlvbjtcbiAgICAgICAgaWYgKHRhYi5oZWFkZXJTdHlsZUNsYXNzKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArIFwiIFwiICsgdGFiLmhlYWRlclN0eWxlQ2xhc3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxuICAgIFxuICAgIGNsaWNrVGFiKGV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIHRoaXMub25UYWJDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFiOiB0YWJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY2xpY2tDbG9zZShldmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICB0aGlzLm9uVGFiQ2xvc2VDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFiOiB0YWJcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZFwiIGNsYXNzPVwidWktdGFidmlldy1wYW5lbCB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6ICFzZWxlY3RlZH1cIlxuICAgICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkICsgJy1sYWJlbCdcIiAqbmdJZj1cIiFjbG9zZWRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGFiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBsZWZ0SWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHJpZ2h0SWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRvb2x0aXA6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uU3R5bGU6IHN0cmluZyA9ICdhYnNvbHV0ZSc7XG5cbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICBcbiAgICBjbG9zZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgXG4gICAgX3NlbGVjdGVkOiBib29sZWFuO1xuICAgIFxuICAgIGxvYWRlZDogYm9vbGVhbjtcbiAgICBcbiAgICBpZDogc3RyaW5nID0gYHVpLXRhYnBhbmVsLSR7aWR4Kyt9YDtcbiAgICBcbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYlZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXRhYnZpZXcgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktdGFidmlldy0nICsgb3JpZW50YXRpb25cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8dWwgcC10YWJWaWV3TmF2IHJvbGU9XCJ0YWJsaXN0XCIgKm5nSWY9XCJvcmllbnRhdGlvbiE9J2JvdHRvbSdcIiBbdGFic109XCJ0YWJzXCIgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgICAgICAob25UYWJDbGljayk9XCJvcGVuKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiIChvblRhYkNsb3NlQ2xpY2spPVwiY2xvc2UoJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCI+PC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJ2aWV3LXBhbmVsc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsIHAtdGFiVmlld05hdiByb2xlPVwidGFibGlzdFwiICpuZ0lmPVwib3JpZW50YXRpb249PSdib3R0b20nXCIgW3RhYnNdPVwidGFic1wiIFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgKG9uVGFiQ2xpY2spPVwib3BlbigkZXZlbnQub3JpZ2luYWxFdmVudCwgJGV2ZW50LnRhYilcIiAob25UYWJDbG9zZUNsaWNrKT1cImNsb3NlKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiPjwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXcgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJIHtcblxuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBzdHJpbmcgPSAndG9wJztcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBjb250cm9sQ2xvc2U6IGJvb2xlYW47XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJQYW5lbCkgdGFiUGFuZWxzOiBRdWVyeUxpc3Q8VGFiUGFuZWw+O1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgdGFiczogVGFiUGFuZWxbXTtcbiAgICBcbiAgICBfYWN0aXZlSW5kZXg6IG51bWJlcjtcbiAgICBcbiAgICBwcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cbiAgICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGFicygpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50YWJQYW5lbHMuY2hhbmdlcy5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpbml0VGFicygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJzID0gdGhpcy50YWJQYW5lbHMudG9BcnJheSgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWRUYWI6IFRhYlBhbmVsID0gdGhpcy5maW5kU2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRhYiAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLmFjdGl2ZUluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLmFjdGl2ZUluZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvcGVuKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGFiOiBUYWJQYW5lbCA9IHRoaXMuZmluZFNlbGVjdGVkVGFiKCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhYi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWJJbmRleCA9IHRoaXMuZmluZFRhYkluZGV4KHRhYik7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChzZWxlY3RlZFRhYkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBzZWxlY3RlZFRhYkluZGV4fSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjbG9zZShldmVudDogRXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbENsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYiksXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNsb3NlVGFiKHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0YWJQYW5lbCA9IHRoaXMudGFic1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRhYlBhbmVsLmNsb3NlZCYmIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YWJQYW5lbC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGFiLmNsb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGZpbmRTZWxlY3RlZFRhYigpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFic1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIGZpbmRUYWJJbmRleCh0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJzW2ldID09IHRhYikge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIFxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnTCoHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlSW5kZXgodmFsOm51bWJlcikge1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0ZWRUYWIoKS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50YWJzW3RoaXMuX2FjdGl2ZUluZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVGFiVmlldyxUYWJQYW5lbCxUYWJWaWV3TmF2LFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVGFiVmlldyxUYWJQYW5lbCxUYWJWaWV3TmF2XVxufSlcbmV4cG9ydCBjbGFzcyBUYWJWaWV3TW9kdWxlIHsgfVxuIl19