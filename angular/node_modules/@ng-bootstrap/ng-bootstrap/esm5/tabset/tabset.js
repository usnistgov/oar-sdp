/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Directive, EventEmitter, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
/** @type {?} */
var nextId = 0;
/**
 * A directive to wrap tab titles that need to contain HTML markup or other directives.
 *
 * Alternatively you could use the `NgbTab.title` input for string titles.
 */
var NgbTabTitle = /** @class */ (function () {
    function NgbTabTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabTitle.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbTabTitle]' },] }
    ];
    /** @nocollapse */
    NgbTabTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbTabTitle;
}());
export { NgbTabTitle };
if (false) {
    /** @type {?} */
    NgbTabTitle.prototype.templateRef;
}
/**
 * A directive to wrap content to be displayed in a tab.
 */
var NgbTabContent = /** @class */ (function () {
    function NgbTabContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabContent.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbTabContent]' },] }
    ];
    /** @nocollapse */
    NgbTabContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbTabContent;
}());
export { NgbTabContent };
if (false) {
    /** @type {?} */
    NgbTabContent.prototype.templateRef;
}
/**
 * A directive representing an individual tab.
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
    /**
     * @return {?}
     */
    NgbTab.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    };
    NgbTab.decorators = [
        { type: Directive, args: [{ selector: 'ngb-tab' },] }
    ];
    NgbTab.propDecorators = {
        id: [{ type: Input }],
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        titleTpls: [{ type: ContentChildren, args: [NgbTabTitle, { descendants: false },] }],
        contentTpls: [{ type: ContentChildren, args: [NgbTabContent, { descendants: false },] }]
    };
    return NgbTab;
}());
export { NgbTab };
if (false) {
    /**
     * The tab identifier.
     *
     * Must be unique for the entire document for proper accessibility support.
     * @type {?}
     */
    NgbTab.prototype.id;
    /**
     * The tab title.
     *
     * Use the [`NgbTabTitle`](#/components/tabset/api#NgbTabTitle) directive for non-string titles.
     * @type {?}
     */
    NgbTab.prototype.title;
    /**
     * If `true`, the current tab is disabled and can't be toggled.
     * @type {?}
     */
    NgbTab.prototype.disabled;
    /** @type {?} */
    NgbTab.prototype.titleTpl;
    /** @type {?} */
    NgbTab.prototype.contentTpl;
    /** @type {?} */
    NgbTab.prototype.titleTpls;
    /** @type {?} */
    NgbTab.prototype.contentTpls;
}
/**
 * The payload of the change event fired right before the tab change.
 * @record
 */
export function NgbTabChangeEvent() { }
if (false) {
    /**
     * The id of the currently active tab.
     * @type {?}
     */
    NgbTabChangeEvent.prototype.activeId;
    /**
     * The id of the newly selected tab.
     * @type {?}
     */
    NgbTabChangeEvent.prototype.nextId;
    /**
     * Calling this function will prevent tab switching.
     * @type {?}
     */
    NgbTabChangeEvent.prototype.preventDefault;
}
/**
 * A component that makes it easy to create tabbed interface.
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
        set: /**
         * The horizontal alignment of the tabs with flexbox utilities.
         * @param {?} className
         * @return {?}
         */
        function (className) {
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
    /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     * @param {?} tabId
     * @return {?}
     */
    NgbTabset.prototype.select = /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     * @param {?} tabId
     * @return {?}
     */
    function (tabId) {
        /** @type {?} */
        var selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            /** @type {?} */
            var defaultPrevented_1 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: (/**
                 * @return {?}
                 */
                function () { defaultPrevented_1 = true; }) });
            if (!defaultPrevented_1) {
                this.activeId = selectedTab.id;
            }
        }
    };
    /**
     * @return {?}
     */
    NgbTabset.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // auto-correct activeId that might have been set incorrectly as input
        /** @type {?} */
        var activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    NgbTabset.prototype._getTabById = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var tabsWithId = this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.id === id; }));
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    NgbTabset.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-tabset',
                    exportAs: 'ngbTabset',
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ul [class]=\"'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          href (click)=\"select(tab.id); $event.preventDefault()\" role=\"tab\" [attr.tabindex]=\"(tab.disabled ? '-1': undefined)\"\n          [attr.aria-controls]=\"(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)\"\n          [attr.aria-selected]=\"tab.id === activeId\" [attr.aria-disabled]=\"tab.disabled\">\n          {{tab.title}}<ng-template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></ng-template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n        <div\n          class=\"tab-pane {{tab.id === activeId ? 'active' : null}}\"\n          *ngIf=\"!destroyOnHide || tab.id === activeId\"\n          role=\"tabpanel\"\n          [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\">\n          <ng-template [ngTemplateOutlet]=\"tab.contentTpl?.templateRef\"></ng-template>\n        </div>\n      </ng-template>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbTabset.ctorParameters = function () { return [
        { type: NgbTabsetConfig }
    ]; };
    NgbTabset.propDecorators = {
        tabs: [{ type: ContentChildren, args: [NgbTab,] }],
        activeId: [{ type: Input }],
        destroyOnHide: [{ type: Input }],
        justify: [{ type: Input }],
        orientation: [{ type: Input }],
        type: [{ type: Input }],
        tabChange: [{ type: Output }]
    };
    return NgbTabset;
}());
export { NgbTabset };
if (false) {
    /** @type {?} */
    NgbTabset.prototype.justifyClass;
    /** @type {?} */
    NgbTabset.prototype.tabs;
    /**
     * The identifier of the tab that should be opened **initially**.
     *
     * For subsequent tab switches use the `.select()` method and the `(tabChange)` event.
     * @type {?}
     */
    NgbTabset.prototype.activeId;
    /**
     * If `true`, non-visible tabs content will be removed from DOM. Otherwise it will just be hidden.
     * @type {?}
     */
    NgbTabset.prototype.destroyOnHide;
    /**
     * The orientation of the tabset.
     * @type {?}
     */
    NgbTabset.prototype.orientation;
    /**
     * Type of navigation to be used for tabs.
     *
     * Currently Bootstrap supports only `"tabs"` and `"pills"`.
     *
     * Since `3.0.0` can also be an arbitrary string (ex. for custom themes).
     * @type {?}
     */
    NgbTabset.prototype.type;
    /**
     * A tab change event emitted right before the tab change happens.
     *
     * See [`NgbTabChangeEvent`](#/components/tabset/api#NgbTabChangeEvent) for payload details.
     * @type {?}
     */
    NgbTabset.prototype.tabChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0YWJzZXQvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztJQUU1QyxNQUFNLEdBQUcsQ0FBQzs7Ozs7O0FBT2Q7SUFFRSxxQkFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7Z0JBRnJELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSwwQkFBMEIsRUFBQzs7OztnQkFaL0MsV0FBVzs7SUFlYixrQkFBQztDQUFBLEFBSEQsSUFHQztTQUZZLFdBQVc7OztJQUNWLGtDQUFvQzs7Ozs7QUFNbEQ7SUFFRSx1QkFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7Z0JBRnJELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQzs7OztnQkFwQmpELFdBQVc7O0lBdUJiLG9CQUFDO0NBQUEsQUFIRCxJQUdDO1NBRlksYUFBYTs7O0lBQ1osb0NBQW9DOzs7OztBQU1sRDtJQUFBOzs7Ozs7UUFPVyxPQUFFLEdBQUcsYUFBVyxNQUFNLEVBQUksQ0FBQzs7OztRQVkzQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBZ0I1QixDQUFDOzs7O0lBUkMsc0NBQXFCOzs7SUFBckI7UUFDRSw4RkFBOEY7UUFDOUYsOEVBQThFO1FBQzlFLGlFQUFpRTtRQUNqRSwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtB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LElBQUksT0FBQSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBYixDQUFhLEVBQUM7UUFDakUsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsRCxDQUFDOztnQkFqSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsV0FBVztvQkFDckIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxxdUNBc0JUO2lCQUNGOzs7O2dCQWhITyxlQUFlOzs7dUJBb0hwQixlQUFlLFNBQUMsTUFBTTsyQkFPdEIsS0FBSztnQ0FLTCxLQUFLOzBCQUtMLEtBQUs7OEJBWUwsS0FBSzt1QkFTTCxLQUFLOzRCQU9MLE1BQU07O0lBc0NULGdCQUFDO0NBQUEsQUFsSEQsSUFrSEM7U0F0RlksU0FBUzs7O0lBQ3BCLGlDQUFxQjs7SUFFckIseUJBQWlEOzs7Ozs7O0lBT2pELDZCQUEwQjs7Ozs7SUFLMUIsa0NBQThCOzs7OztJQWlCOUIsZ0NBQWdEOzs7Ozs7Ozs7SUFTaEQseUJBQXlDOzs7Ozs7O0lBT3pDLDhCQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYlRhYnNldENvbmZpZ30gZnJvbSAnLi90YWJzZXQtY29uZmlnJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gd3JhcCB0YWIgdGl0bGVzIHRoYXQgbmVlZCB0byBjb250YWluIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXMuXG4gKlxuICogQWx0ZXJuYXRpdmVseSB5b3UgY291bGQgdXNlIHRoZSBgTmdiVGFiLnRpdGxlYCBpbnB1dCBmb3Igc3RyaW5nIHRpdGxlcy5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byB3cmFwIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIGEgdGFiLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlRhYkNvbnRlbnRdJ30pXG5leHBvcnQgY2xhc3MgTmdiVGFiQ29udGVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSByZXByZXNlbnRpbmcgYW4gaW5kaXZpZHVhbCB0YWIuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXRhYid9KVxuZXhwb3J0IGNsYXNzIE5nYlRhYiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICAvKipcbiAgICogVGhlIHRhYiBpZGVudGlmaWVyLlxuICAgKlxuICAgKiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi10YWItJHtuZXh0SWQrK31gO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFiIHRpdGxlLlxuICAgKlxuICAgKiBVc2UgdGhlIFtgTmdiVGFiVGl0bGVgXSgjL2NvbXBvbmVudHMvdGFic2V0L2FwaSNOZ2JUYWJUaXRsZSkgZGlyZWN0aXZlIGZvciBub24tc3RyaW5nIHRpdGxlcy5cbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgdGFiIGlzIGRpc2FibGVkIGFuZCBjYW4ndCBiZSB0b2dnbGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICB0aXRsZVRwbDogTmdiVGFiVGl0bGUgfCBudWxsO1xuICBjb250ZW50VHBsOiBOZ2JUYWJDb250ZW50IHwgbnVsbDtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYlRpdGxlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiVGFiVGl0bGU+O1xuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYkNvbnRlbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYlRhYkNvbnRlbnQ+O1xuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBXZSBhcmUgdXNpbmcgQENvbnRlbnRDaGlsZHJlbiBpbnN0ZWFkIG9mIEBDb250ZW50Q2hpbGQgYXMgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvbiBiZWluZyB1c2VkXG4gICAgLy8gb25seSBAQ29udGVudENoaWxkcmVuIGFsbG93cyB1cyB0byBzcGVjaWZ5IHRoZSB7ZGVzY2VuZGFudHM6IGZhbHNlfSBvcHRpb24uXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjI0MFxuICAgIHRoaXMudGl0bGVUcGwgPSB0aGlzLnRpdGxlVHBscy5maXJzdDtcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xuICB9XG59XG5cbi8qKlxuICogVGhlIHBheWxvYWQgb2YgdGhlIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIHRhYiBjaGFuZ2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVGFiQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYi5cbiAgICovXG4gIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgdGFiLlxuICAgKi9cbiAgbmV4dElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgdGFiIHN3aXRjaGluZy5cbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgdGFiYmVkIGludGVyZmFjZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRhYnNldCcsXG4gIGV4cG9ydEFzOiAnbmdiVGFic2V0JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWwgW2NsYXNzXT1cIiduYXYgbmF2LScgKyB0eXBlICsgKG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJz8gICcgJyArIGp1c3RpZnlDbGFzcyA6ICcgZmxleC1jb2x1bW4nKVwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFic1wiPlxuICAgICAgICA8YSBbaWRdPVwidGFiLmlkXCIgY2xhc3M9XCJuYXYtbGlua1wiIFtjbGFzcy5hY3RpdmVdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgIGhyZWYgKGNsaWNrKT1cInNlbGVjdCh0YWIuaWQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIHJvbGU9XCJ0YWJcIiBbYXR0ci50YWJpbmRleF09XCIodGFiLmRpc2FibGVkID8gJy0xJzogdW5kZWZpbmVkKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCIoIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZCA/IHRhYi5pZCArICctcGFuZWwnIDogbnVsbClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG4gICAgICAgICAge3t0YWIudGl0bGV9fTxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWIudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJ0YWItcGFuZSB7e3RhYi5pZCA9PT0gYWN0aXZlSWQgPyAnYWN0aXZlJyA6IG51bGx9fVwiXG4gICAgICAgICAgKm5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCB0YWIuaWQgPT09IGFjdGl2ZUlkXCJcbiAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0YWIuaWRcIiBpZD1cInt7dGFiLmlkfX0tcGFuZWxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBqdXN0aWZ5Q2xhc3M6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYikgdGFiczogUXVlcnlMaXN0PE5nYlRhYj47XG5cbiAgLyoqXG4gICAqIFRoZSBpZGVudGlmaWVyIG9mIHRoZSB0YWIgdGhhdCBzaG91bGQgYmUgb3BlbmVkICoqaW5pdGlhbGx5KiouXG4gICAqXG4gICAqIEZvciBzdWJzZXF1ZW50IHRhYiBzd2l0Y2hlcyB1c2UgdGhlIGAuc2VsZWN0KClgIG1ldGhvZCBhbmQgdGhlIGAodGFiQ2hhbmdlKWAgZXZlbnQuXG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5vbi12aXNpYmxlIHRhYnMgY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET00uIE90aGVyd2lzZSBpdCB3aWxsIGp1c3QgYmUgaGlkZGVuLlxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGFicyB3aXRoIGZsZXhib3ggdXRpbGl0aWVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGp1c3RpZnkoY2xhc3NOYW1lOiAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJyB8ICdmaWxsJyB8ICdqdXN0aWZpZWQnKSB7XG4gICAgaWYgKGNsYXNzTmFtZSA9PT0gJ2ZpbGwnIHx8IGNsYXNzTmFtZSA9PT0gJ2p1c3RpZmllZCcpIHtcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYG5hdi0ke2NsYXNzTmFtZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmp1c3RpZnlDbGFzcyA9IGBqdXN0aWZ5LWNvbnRlbnQtJHtjbGFzc05hbWV9YDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSB0YWJzZXQuXG4gICAqL1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuICAvKipcbiAgICogVHlwZSBvZiBuYXZpZ2F0aW9uIHRvIGJlIHVzZWQgZm9yIHRhYnMuXG4gICAqXG4gICAqIEN1cnJlbnRseSBCb290c3RyYXAgc3VwcG9ydHMgb25seSBgXCJ0YWJzXCJgIGFuZCBgXCJwaWxsc1wiYC5cbiAgICpcbiAgICogU2luY2UgYDMuMC4wYCBjYW4gYWxzbyBiZSBhbiBhcmJpdHJhcnkgc3RyaW5nIChleC4gZm9yIGN1c3RvbSB0aGVtZXMpLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogJ3RhYnMnIHwgJ3BpbGxzJyB8IHN0cmluZztcblxuICAvKipcbiAgICogQSB0YWIgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlIGhhcHBlbnMuXG4gICAqXG4gICAqIFNlZSBbYE5nYlRhYkNoYW5nZUV2ZW50YF0oIy9jb21wb25lbnRzL3RhYnNldC9hcGkjTmdiVGFiQ2hhbmdlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgdGFiQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUYWJDaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlRhYnNldENvbmZpZykge1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuanVzdGlmeSA9IGNvbmZpZy5qdXN0aWZ5O1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgdGFiIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBjb250ZW50IHBhbmVsLlxuICAgKlxuICAgKiBBbnkgb3RoZXIgdGFiIHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIHJlbW92ZWQgZnJvbSBET00gb3JcbiAgICogaGlkZGVuIGRlcGVuZGluZyBvbiB0aGUgYGRlc3Ryb3lPbkhpZGVgIHZhbHVlLlxuICAgKi9cbiAgc2VsZWN0KHRhYklkOiBzdHJpbmcpIHtcbiAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRhYklkKTtcbiAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgIXNlbGVjdGVkVGFiLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWQgIT09IHNlbGVjdGVkVGFiLmlkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KFxuICAgICAgICAgIHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkOiBzZWxlY3RlZFRhYi5pZCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFRhYi5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYXV0by1jb3JyZWN0IGFjdGl2ZUlkIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIHNldCBpbmNvcnJlY3RseSBhcyBpbnB1dFxuICAgIGxldCBhY3RpdmVUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVUYWIgPyBhY3RpdmVUYWIuaWQgOiAodGhpcy50YWJzLmxlbmd0aCA/IHRoaXMudGFicy5maXJzdC5pZCA6IG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGFiQnlJZChpZDogc3RyaW5nKTogTmdiVGFiIHtcbiAgICBsZXQgdGFic1dpdGhJZDogTmdiVGFiW10gPSB0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuaWQgPT09IGlkKTtcbiAgICByZXR1cm4gdGFic1dpdGhJZC5sZW5ndGggPyB0YWJzV2l0aElkWzBdIDogbnVsbDtcbiAgfVxufVxuIl19