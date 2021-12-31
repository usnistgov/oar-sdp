import { __decorate } from "tslib";
// tslint:disable:deprecation
import { AfterContentChecked, Component, ContentChildren, Directive, EventEmitter, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
var nextId = 0;
/**
 * A directive to wrap tab titles that need to contain HTML markup or other directives.
 *
 * Alternatively you could use the `NgbTab.title` input for string titles.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
var NgbTabTitle = /** @class */ (function () {
    function NgbTabTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbTabTitle = __decorate([
        Directive({ selector: 'ng-template[ngbTabTitle]' })
    ], NgbTabTitle);
    return NgbTabTitle;
}());
export { NgbTabTitle };
/**
 * A directive to wrap content to be displayed in a tab.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
var NgbTabContent = /** @class */ (function () {
    function NgbTabContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbTabContent = __decorate([
        Directive({ selector: 'ng-template[ngbTabContent]' })
    ], NgbTabContent);
    return NgbTabContent;
}());
export { NgbTabContent };
/**
 * A directive representing an individual tab.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
var NgbTab = /** @class */ (function () {
    function NgbTab() {
        /**
         * The tab identifier.
         *
         * Must be unique for the entire document for proper accessibility support.
         */
        this.id = "ngb-tab-" + nextId++;
        /**
         * If `true`, the current tab is disabled and can't be toggled.
         */
        this.disabled = false;
    }
    NgbTab.prototype.ngAfterContentChecked = function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    };
    __decorate([
        Input()
    ], NgbTab.prototype, "id", void 0);
    __decorate([
        Input()
    ], NgbTab.prototype, "title", void 0);
    __decorate([
        Input()
    ], NgbTab.prototype, "disabled", void 0);
    __decorate([
        ContentChildren(NgbTabTitle, { descendants: false })
    ], NgbTab.prototype, "titleTpls", void 0);
    __decorate([
        ContentChildren(NgbTabContent, { descendants: false })
    ], NgbTab.prototype, "contentTpls", void 0);
    NgbTab = __decorate([
        Directive({ selector: 'ngb-tab' })
    ], NgbTab);
    return NgbTab;
}());
export { NgbTab };
/**
 * A component that makes it easy to create tabbed interface.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
var NgbTabset = /** @class */ (function () {
    function NgbTabset(config) {
        /**
         * If `true`, non-visible tabs content will be removed from DOM. Otherwise it will just be hidden.
         */
        this.destroyOnHide = true;
        /**
         * A tab change event emitted right before the tab change happens.
         *
         * See [`NgbTabChangeEvent`](#/components/tabset/api#NgbTabChangeEvent) for payload details.
         */
        this.tabChange = new EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
        this.orientation = config.orientation;
    }
    Object.defineProperty(NgbTabset.prototype, "justify", {
        /**
         * The horizontal alignment of the tabs with flexbox utilities.
         */
        set: function (className) {
            if (className === 'fill' || className === 'justified') {
                this.justifyClass = "nav-" + className;
            }
            else {
                this.justifyClass = "justify-content-" + className;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     */
    NgbTabset.prototype.select = function (tabId) {
        var selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            var defaultPrevented_1 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: function () { defaultPrevented_1 = true; } });
            if (!defaultPrevented_1) {
                this.activeId = selectedTab.id;
            }
        }
    };
    NgbTabset.prototype.ngAfterContentChecked = function () {
        // auto-correct activeId that might have been set incorrectly as input
        var activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    };
    NgbTabset.prototype._getTabById = function (id) {
        var tabsWithId = this.tabs.filter(function (tab) { return tab.id === id; });
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    NgbTabset.ctorParameters = function () { return [
        { type: NgbTabsetConfig }
    ]; };
    __decorate([
        ContentChildren(NgbTab)
    ], NgbTabset.prototype, "tabs", void 0);
    __decorate([
        Input()
    ], NgbTabset.prototype, "activeId", void 0);
    __decorate([
        Input()
    ], NgbTabset.prototype, "destroyOnHide", void 0);
    __decorate([
        Input()
    ], NgbTabset.prototype, "justify", null);
    __decorate([
        Input()
    ], NgbTabset.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], NgbTabset.prototype, "type", void 0);
    __decorate([
        Output()
    ], NgbTabset.prototype, "tabChange", void 0);
    NgbTabset = __decorate([
        Component({
            selector: 'ngb-tabset',
            exportAs: 'ngbTabset',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <ul [class]=\"'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          href (click)=\"select(tab.id); $event.preventDefault()\" role=\"tab\" [attr.tabindex]=\"(tab.disabled ? '-1': undefined)\"\n          [attr.aria-controls]=\"(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)\"\n          [attr.aria-selected]=\"tab.id === activeId\" [attr.aria-disabled]=\"tab.disabled\">\n          {{tab.title}}<ng-template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef || null\"></ng-template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n        <div\n          class=\"tab-pane {{tab.id === activeId ? 'active' : null}}\"\n          *ngIf=\"!destroyOnHide || tab.id === activeId\"\n          role=\"tabpanel\"\n          [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\">\n          <ng-template [ngTemplateOutlet]=\"tab.contentTpl?.templateRef || null\"></ng-template>\n        </div>\n      </ng-template>\n    </div>\n  "
        })
    ], NgbTabset);
    return NgbTabset;
}());
export { NgbTabset };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0YWJzZXQvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7Ozs7OztHQU1HO0FBRUg7SUFDRSxxQkFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7Z0JBQXBCLFdBQVc7O0lBRGhDLFdBQVc7UUFEdkIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLDBCQUEwQixFQUFDLENBQUM7T0FDckMsV0FBVyxDQUV2QjtJQUFELGtCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksV0FBVztBQUl4Qjs7OztHQUlHO0FBRUg7SUFDRSx1QkFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7Z0JBQXBCLFdBQVc7O0lBRGhDLGFBQWE7UUFEekIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLDRCQUE0QixFQUFDLENBQUM7T0FDdkMsYUFBYSxDQUV6QjtJQUFELG9CQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksYUFBYTtBQUkxQjs7OztHQUlHO0FBRUg7SUFBQTtRQUNFOzs7O1dBSUc7UUFDTSxPQUFFLEdBQUcsYUFBVyxNQUFNLEVBQUksQ0FBQztRQVNwQzs7V0FFRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFnQjVCLENBQUM7SUFSQyxzQ0FBcUIsR0FBckI7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QzVCLElBQUksVUFBVSxHQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDbEUsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFNLElBQUksQ0FBQztJQUN2RCxDQUFDOztnQkFuQ21CLGVBQWU7O0lBL0NWO1FBQXhCLGVBQWUsQ0FBQyxNQUFNLENBQUM7MkNBQXlCO0lBT3hDO1FBQVIsS0FBSyxFQUFFOytDQUFrQjtJQUtqQjtRQUFSLEtBQUssRUFBRTtvREFBc0I7SUFNOUI7UUFEQyxLQUFLLEVBQUU7NENBT1A7SUFLUTtRQUFSLEtBQUssRUFBRTtrREFBd0M7SUFTdkM7UUFBUixLQUFLLEVBQUU7MkNBQWlDO0lBTy9CO1FBQVQsTUFBTSxFQUFFO2dEQUFtRDtJQW5EakQsU0FBUztRQTVCckIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLFdBQVc7WUFDckIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsUUFBUSxFQUFFLHF2Q0FzQlQ7U0FDRixDQUFDO09BQ1csU0FBUyxDQXlGckI7SUFBRCxnQkFBQztDQUFBLEFBekZELElBeUZDO1NBekZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpkZXByZWNhdGlvblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiVGFic2V0Q29uZmlnfSBmcm9tICcuL3RhYnNldC1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byB3cmFwIHRhYiB0aXRsZXMgdGhhdCBuZWVkIHRvIGNvbnRhaW4gSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlcy5cbiAqXG4gKiBBbHRlcm5hdGl2ZWx5IHlvdSBjb3VsZCB1c2UgdGhlIGBOZ2JUYWIudGl0bGVgIGlucHV0IGZvciBzdHJpbmcgdGl0bGVzLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byB3cmFwIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIGEgdGFiLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlRhYkNvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgdGFiLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ItdGFiJ30pXG5leHBvcnQgY2xhc3MgTmdiVGFiIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiBUaGUgdGFiIGlkZW50aWZpZXIuXG4gICAqXG4gICAqIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXRhYi0ke25leHRJZCsrfWA7XG5cbiAgLyoqXG4gICAqIFRoZSB0YWIgdGl0bGUuXG4gICAqXG4gICAqIFVzZSB0aGUgW2BOZ2JUYWJUaXRsZWBdKCMvY29tcG9uZW50cy90YWJzZXQvYXBpI05nYlRhYlRpdGxlKSBkaXJlY3RpdmUgZm9yIG5vbi1zdHJpbmcgdGl0bGVzLlxuICAgKi9cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY3VycmVudCB0YWIgaXMgZGlzYWJsZWQgYW5kIGNhbid0IGJlIHRvZ2dsZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHRpdGxlVHBsOiBOZ2JUYWJUaXRsZSB8IG51bGw7XG4gIGNvbnRlbnRUcGw6IE5nYlRhYkNvbnRlbnQgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiVGl0bGUsIHtkZXNjZW5kYW50czogZmFsc2V9KSB0aXRsZVRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJUaXRsZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiVGFiQ29udGVudD47XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cbiAgICAvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG4gICAgdGhpcy50aXRsZVRwbCA9IHRoaXMudGl0bGVUcGxzLmZpcnN0O1xuICAgIHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgY2hhbmdlIGV2ZW50IGZpcmVkIHJpZ2h0IGJlZm9yZSB0aGUgdGFiIGNoYW5nZS5cbiAqXG4gKiBAZGVwcmVjYXRlZCA2LjAuMCBQbGVhc2UgdXNlIE5nYk5hdiBpbnN0ZWFkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVGFiQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYi5cbiAgICovXG4gIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgdGFiLlxuICAgKi9cbiAgbmV4dElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgdGFiIHN3aXRjaGluZy5cbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgdGFiYmVkIGludGVyZmFjZS5cbiAqXG4gKiBAZGVwcmVjYXRlZCA2LjAuMCBQbGVhc2UgdXNlIE5nYk5hdiBpbnN0ZWFkXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10YWJzZXQnLFxuICBleHBvcnRBczogJ25nYlRhYnNldCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFtjbGFzc109XCInbmF2IG5hdi0nICsgdHlwZSArIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCc/ICAnICcgKyBqdXN0aWZ5Q2xhc3MgOiAnIGZsZXgtY29sdW1uJylcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNcIj5cbiAgICAgICAgPGEgW2lkXT1cInRhYi5pZFwiIGNsYXNzPVwibmF2LWxpbmtcIiBbY2xhc3MuYWN0aXZlXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgICAgICBocmVmIChjbGljayk9XCJzZWxlY3QodGFiLmlkKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiByb2xlPVwidGFiXCIgW2F0dHIudGFiaW5kZXhdPVwiKHRhYi5kaXNhYmxlZCA/ICctMSc6IHVuZGVmaW5lZClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiKCFkZXN0cm95T25IaWRlIHx8IHRhYi5pZCA9PT0gYWN0aXZlSWQgPyB0YWIuaWQgKyAnLXBhbmVsJyA6IG51bGwpXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiPlxuICAgICAgICAgIHt7dGFiLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZiB8fCBudWxsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJ0YWItcGFuZSB7e3RhYi5pZCA9PT0gYWN0aXZlSWQgPyAnYWN0aXZlJyA6IG51bGx9fVwiXG4gICAgICAgICAgKm5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCB0YWIuaWQgPT09IGFjdGl2ZUlkXCJcbiAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0YWIuaWRcIiBpZD1cInt7dGFiLmlkfX0tcGFuZWxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmIHx8IG51bGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9qdXN0aWZ5OiBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcmllbnRhdGlvbjogc3RyaW5nO1xuXG4gIGp1c3RpZnlDbGFzczogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiKSB0YWJzOiBRdWVyeUxpc3Q8TmdiVGFiPjtcblxuICAvKipcbiAgICogVGhlIGlkZW50aWZpZXIgb2YgdGhlIHRhYiB0aGF0IHNob3VsZCBiZSBvcGVuZWQgKippbml0aWFsbHkqKi5cbiAgICpcbiAgICogRm9yIHN1YnNlcXVlbnQgdGFiIHN3aXRjaGVzIHVzZSB0aGUgYC5zZWxlY3QoKWAgbWV0aG9kIGFuZCB0aGUgYCh0YWJDaGFuZ2UpYCBldmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgbm9uLXZpc2libGUgdGFicyBjb250ZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIERPTS4gT3RoZXJ3aXNlIGl0IHdpbGwganVzdCBiZSBoaWRkZW4uXG4gICAqL1xuICBASW5wdXQoKSBkZXN0cm95T25IaWRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGhvcml6b250YWwgYWxpZ25tZW50IG9mIHRoZSB0YWJzIHdpdGggZmxleGJveCB1dGlsaXRpZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQganVzdGlmeShjbGFzc05hbWU6ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnIHwgJ2ZpbGwnIHwgJ2p1c3RpZmllZCcpIHtcbiAgICBpZiAoY2xhc3NOYW1lID09PSAnZmlsbCcgfHwgY2xhc3NOYW1lID09PSAnanVzdGlmaWVkJykge1xuICAgICAgdGhpcy5qdXN0aWZ5Q2xhc3MgPSBgbmF2LSR7Y2xhc3NOYW1lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYGp1c3RpZnktY29udGVudC0ke2NsYXNzTmFtZX1gO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIHRhYnNldC5cbiAgICovXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIG5hdmlnYXRpb24gdG8gYmUgdXNlZCBmb3IgdGFicy5cbiAgICpcbiAgICogQ3VycmVudGx5IEJvb3RzdHJhcCBzdXBwb3J0cyBvbmx5IGBcInRhYnNcImAgYW5kIGBcInBpbGxzXCJgLlxuICAgKlxuICAgKiBTaW5jZSBgMy4wLjBgIGNhbiBhbHNvIGJlIGFuIGFyYml0cmFyeSBzdHJpbmcgKGV4LiBmb3IgY3VzdG9tIHRoZW1lcykuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiAndGFicycgfCAncGlsbHMnIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHRhYiBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIHRhYiBjaGFuZ2UgaGFwcGVucy5cbiAgICpcbiAgICogU2VlIFtgTmdiVGFiQ2hhbmdlRXZlbnRgXSgjL2NvbXBvbmVudHMvdGFic2V0L2FwaSNOZ2JUYWJDaGFuZ2VFdmVudCkgZm9yIHBheWxvYWQgZGV0YWlscy5cbiAgICovXG4gIEBPdXRwdXQoKSB0YWJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlRhYkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiVGFic2V0Q29uZmlnKSB7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5qdXN0aWZ5ID0gY29uZmlnLmp1c3RpZnk7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSB0YWIgd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIHNob3dzIGl0cyBhc3NvY2lhdGVkIGNvbnRlbnQgcGFuZWwuXG4gICAqXG4gICAqIEFueSBvdGhlciB0YWIgdGhhdCB3YXMgcHJldmlvdXNseSBzZWxlY3RlZCBiZWNvbWVzIHVuc2VsZWN0ZWQgYW5kIGl0cyBhc3NvY2lhdGVkIHBhbmUgaXMgcmVtb3ZlZCBmcm9tIERPTSBvclxuICAgKiBoaWRkZW4gZGVwZW5kaW5nIG9uIHRoZSBgZGVzdHJveU9uSGlkZWAgdmFsdWUuXG4gICAqL1xuICBzZWxlY3QodGFiSWQ6IHN0cmluZykge1xuICAgIGxldCBzZWxlY3RlZFRhYiA9IHRoaXMuX2dldFRhYkJ5SWQodGFiSWQpO1xuICAgIGlmIChzZWxlY3RlZFRhYiAmJiAhc2VsZWN0ZWRUYWIuZGlzYWJsZWQgJiYgdGhpcy5hY3RpdmVJZCAhPT0gc2VsZWN0ZWRUYWIuaWQpIHtcbiAgICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQoXG4gICAgICAgICAge2FjdGl2ZUlkOiB0aGlzLmFjdGl2ZUlkLCBuZXh0SWQ6IHNlbGVjdGVkVGFiLmlkLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IHNlbGVjdGVkVGFiLmlkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBhdXRvLWNvcnJlY3QgYWN0aXZlSWQgdGhhdCBtaWdodCBoYXZlIGJlZW4gc2V0IGluY29ycmVjdGx5IGFzIGlucHV0XG4gICAgbGV0IGFjdGl2ZVRhYiA9IHRoaXMuX2dldFRhYkJ5SWQodGhpcy5hY3RpdmVJZCk7XG4gICAgdGhpcy5hY3RpdmVJZCA9IGFjdGl2ZVRhYiA/IGFjdGl2ZVRhYi5pZCA6ICh0aGlzLnRhYnMubGVuZ3RoID8gdGhpcy50YWJzLmZpcnN0LmlkIDogPGFueT5udWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRhYkJ5SWQoaWQ6IHN0cmluZyk6IE5nYlRhYiB7XG4gICAgbGV0IHRhYnNXaXRoSWQ6IE5nYlRhYltdID0gdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmlkID09PSBpZCk7XG4gICAgcmV0dXJuIHRhYnNXaXRoSWQubGVuZ3RoID8gdGFic1dpdGhJZFswXSA6IDxhbnk+bnVsbDtcbiAgfVxufVxuIl19