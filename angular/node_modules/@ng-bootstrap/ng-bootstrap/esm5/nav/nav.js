/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Attribute, ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { isDefined } from '../util/util';
import { NgbNavConfig } from './nav-config';
/** @type {?} */
var isValidNavId = (/**
 * @param {?} id
 * @return {?}
 */
function (id) { return isDefined(id) && id !== ''; });
var ɵ0 = isValidNavId;
/** @type {?} */
var navCounter = 0;
/**
 * Context passed to the nav content template.
 *
 * See [this demo](#/components/nav/examples#keep-content) as the example.
 *
 * \@since 5.2.0
 * @record
 */
export function NgbNavContentContext() { }
if (false) {
    /**
     * If `true`, current nav content is visible and active
     * @type {?}
     */
    NgbNavContentContext.prototype.$implicit;
}
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * \@since 5.2.0
 */
var NgbNavContent = /** @class */ (function () {
    function NgbNavContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbNavContent.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbNavContent]' },] }
    ];
    /** @nocollapse */
    NgbNavContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbNavContent;
}());
export { NgbNavContent };
if (false) {
    /** @type {?} */
    NgbNavContent.prototype.templateRef;
}
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * \@since 5.2.0
 */
var NgbNavItem = /** @class */ (function () {
    function NgbNavItem(nav, elementRef) {
        this.elementRef = elementRef;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        // TODO: cf https://github.com/angular/angular/issues/30106
        this._nav = nav;
    }
    /**
     * @return {?}
     */
    NgbNavItem.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    };
    /**
     * @return {?}
     */
    NgbNavItem.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!isDefined(this.domId)) {
            this.domId = "ngb-nav-" + navCounter++;
        }
    };
    Object.defineProperty(NgbNavItem.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () { return this._nav.activeId === this.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbNavItem.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () { return isValidNavId(this._id) ? this._id : this.domId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbNavItem.prototype, "panelDomId", {
        get: /**
         * @return {?}
         */
        function () { return this.domId + "-panel"; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgbNavItem.prototype.isPanelInDom = /**
     * @return {?}
     */
    function () {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    };
    NgbNavItem.decorators = [
        { type: Directive, args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', host: { '[class.nav-item]': 'true' } },] }
    ];
    /** @nocollapse */
    NgbNavItem.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return NgbNav; })),] }] },
        { type: ElementRef }
    ]; };
    NgbNavItem.propDecorators = {
        destroyOnHide: [{ type: Input }],
        disabled: [{ type: Input }],
        domId: [{ type: Input }],
        _id: [{ type: Input, args: ['ngbNavItem',] }],
        contentTpls: [{ type: ContentChildren, args: [NgbNavContent, { descendants: false },] }]
    };
    return NgbNavItem;
}());
export { NgbNavItem };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbNavItem.prototype._nav;
    /**
     * If `true`, non-active current nav item content will be removed from DOM
     * Otherwise it will just be hidden
     * @type {?}
     */
    NgbNavItem.prototype.destroyOnHide;
    /**
     * If `true`, the current nav item is disabled and can't be toggled by user.
     *
     * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
     * @type {?}
     */
    NgbNavItem.prototype.disabled;
    /**
     * The id used for the DOM elements.
     * Must be unique inside the document in case you have multiple `ngbNav`s on the page.
     *
     * Autogenerated as `ngb-nav-XXX` if not provided.
     * @type {?}
     */
    NgbNavItem.prototype.domId;
    /**
     * The id used as a model for active nav.
     * It can be anything, but must be unique inside one `ngbNav`.
     *
     * The only limitation is that it is not possible to have the `''` (empty string) as id,
     * because ` ngbNavItem `, `ngbNavItem=''` and `[ngbNavItem]="''"` are indistinguishable
     * @type {?}
     */
    NgbNavItem.prototype._id;
    /** @type {?} */
    NgbNavItem.prototype.contentTpl;
    /** @type {?} */
    NgbNavItem.prototype.contentTpls;
    /** @type {?} */
    NgbNavItem.prototype.elementRef;
}
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * \@since 5.2.0
 */
var NgbNav = /** @class */ (function () {
    function NgbNav(role, config, _cd) {
        this.role = role;
        this._cd = _cd;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
        this.destroyOnHide = config.destroyOnHide;
        this.orientation = config.orientation;
        this.roles = config.roles;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    NgbNav.prototype.click = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    };
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     * @param {?} id
     * @return {?}
     */
    NgbNav.prototype.select = /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     * @param {?} id
     * @return {?}
     */
    function (id) { this._updateActiveId(id, false); };
    /**
     * @return {?}
     */
    NgbNav.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (!isDefined(this.activeId)) {
            /** @type {?} */
            var nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
    };
    /**
     * @private
     * @param {?} nextId
     * @param {?=} emitNavChange
     * @return {?}
     */
    NgbNav.prototype._updateActiveId = /**
     * @private
     * @param {?} nextId
     * @param {?=} emitNavChange
     * @return {?}
     */
    function (nextId, emitNavChange) {
        if (emitNavChange === void 0) { emitNavChange = true; }
        if (this.activeId !== nextId) {
            /** @type {?} */
            var defaultPrevented_1 = false;
            if (emitNavChange) {
                this.navChange.emit({ activeId: this.activeId, nextId: nextId, preventDefault: (/**
                     * @return {?}
                     */
                    function () { defaultPrevented_1 = true; }) });
            }
            if (!defaultPrevented_1) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
            }
        }
    };
    NgbNav.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    host: {
                        '[class.nav]': 'true',
                        '[class.flex-column]': "orientation === 'vertical'",
                        '[attr.aria-orientation]': "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined",
                        '[attr.role]': "role ? role : roles ? 'tablist' : undefined",
                    }
                },] }
    ];
    /** @nocollapse */
    NgbNav.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
        { type: NgbNavConfig },
        { type: ChangeDetectorRef }
    ]; };
    NgbNav.propDecorators = {
        activeId: [{ type: Input }],
        activeIdChange: [{ type: Output }],
        destroyOnHide: [{ type: Input }],
        orientation: [{ type: Input }],
        roles: [{ type: Input }],
        items: [{ type: ContentChildren, args: [NgbNavItem,] }],
        navChange: [{ type: Output }]
    };
    return NgbNav;
}());
export { NgbNav };
if (false) {
    /**
     * The id of the nav that should be active
     *
     * You could also use the `.select()` method and the `(navChange)` event
     * @type {?}
     */
    NgbNav.prototype.activeId;
    /**
     * The event emitted after the active nav changes
     * The payload of the event is the newly active nav id
     *
     * If you want to prevent nav change, you should use `(navChange)` event
     * @type {?}
     */
    NgbNav.prototype.activeIdChange;
    /**
     * If `true`, non-active nav content will be removed from DOM
     * Otherwise it will just be hidden
     * @type {?}
     */
    NgbNav.prototype.destroyOnHide;
    /**
     * The orientation of navs.
     *
     * Using `vertical` will also add the `aria-orientation` attribute
     * @type {?}
     */
    NgbNav.prototype.orientation;
    /**
     * Role attribute generating strategy:
     * - `false` - no role attributes will be generated
     * - `'tablist'` - 'tablist', 'tab' and 'tabpanel' will be generated (default)
     * @type {?}
     */
    NgbNav.prototype.roles;
    /** @type {?} */
    NgbNav.prototype.items;
    /**
     * The nav change event emitted right before the nav change happens on user click.
     *
     * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
     *
     * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
     * @type {?}
     */
    NgbNav.prototype.navChange;
    /** @type {?} */
    NgbNav.prototype.role;
    /**
     * @type {?}
     * @private
     */
    NgbNav.prototype._cd;
}
/**
 * A directive to put on the nav link.
 *
 * \@since 5.2.0
 */
var NgbNavLink = /** @class */ (function () {
    function NgbNavLink(role, navItem, nav) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
    }
    /**
     * @return {?}
     */
    NgbNavLink.prototype.hasNavItemClass = /**
     * @return {?}
     */
    function () {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    };
    NgbNavLink.decorators = [
        { type: Directive, args: [{
                    selector: 'a[ngbNavLink]',
                    host: {
                        '[id]': 'navItem.domId',
                        '[class.nav-link]': 'true',
                        '[class.nav-item]': 'hasNavItemClass()',
                        '[attr.role]': "role ? role : nav.roles ? 'tab' : undefined",
                        'href': '',
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'navItem.disabled ? -1 : undefined',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem); $event.preventDefault()'
                    }
                },] }
    ];
    /** @nocollapse */
    NgbNavLink.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
        { type: NgbNavItem },
        { type: NgbNav }
    ]; };
    return NgbNavLink;
}());
export { NgbNavLink };
if (false) {
    /** @type {?} */
    NgbNavLink.prototype.role;
    /** @type {?} */
    NgbNavLink.prototype.navItem;
    /** @type {?} */
    NgbNavLink.prototype.nav;
}
/**
 * The payload of the change event emitted right before the nav change happens on user click.
 *
 * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
 *
 * \@since 5.2.0
 * @record
 */
export function NgbNavChangeEvent() { }
if (false) {
    /**
     * Id of the currently active nav.
     * @type {?}
     */
    NgbNavChangeEvent.prototype.activeId;
    /**
     * Id of the newly selected nav.
     * @type {?}
     */
    NgbNavChangeEvent.prototype.nextId;
    /**
     * Function that will prevent nav change if called.
     * @type {?}
     */
    NgbNavChangeEvent.prototype.preventDefault;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJuYXYvbmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOztJQUVwQyxZQUFZOzs7O0FBQUcsVUFBQyxFQUFPLElBQUssT0FBQSxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQTs7O0lBRXhELFVBQVUsR0FBRyxDQUFDOzs7Ozs7Ozs7QUFTbEIsMENBS0M7Ozs7OztJQURDLHlDQUFtQjs7Ozs7OztBQVNyQjtJQUVFLHVCQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOztnQkFGckQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLDRCQUE0QixFQUFDOzs7O2dCQTdCakQsV0FBVzs7SUFnQ2Isb0JBQUM7Q0FBQSxBQUhELElBR0M7U0FGWSxhQUFhOzs7SUFDWixvQ0FBb0M7Ozs7Ozs7QUFTbEQ7SUFzQ0Usb0JBQThDLEdBQUcsRUFBUyxVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjs7Ozs7O1FBdkI1RSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBd0J4QiwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELDBDQUFxQjs7O0lBQXJCO1FBQ0UsOEZBQThGO1FB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QUUsZ0JBQWdCO3dCQUNsQyxrQkFBa0IsRUFBRSxrQkFBa0I7d0JBQ3RDLGlCQUFpQixFQUFFLG1DQUFtQzt3QkFDdEQsc0JBQXNCLEVBQUUsb0RBQW9EO3dCQUM1RSxzQkFBc0IsRUFBRSxnQkFBZ0I7d0JBQ3hDLHNCQUFzQixFQUFFLGtCQUFrQjt3QkFDMUMsU0FBUyxFQUFFLDZDQUE2QztxQkFDekQ7aUJBQ0Y7Ozs7NkNBRWMsU0FBUyxTQUFDLE1BQU07Z0JBQXVDLFVBQVU7Z0JBQWMsTUFBTTs7SUFNcEcsaUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQVBZLFVBQVU7OztJQUNULDBCQUFzQzs7SUFBRSw2QkFBMEI7O0lBQUUseUJBQWtCOzs7Ozs7Ozs7O0FBZ0JwRyx1Q0FlQzs7Ozs7O0lBWEMscUNBQWM7Ozs7O0lBS2QsbUNBQVk7Ozs7O0lBS1osMkNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiTmF2Q29uZmlnfSBmcm9tICcuL25hdi1jb25maWcnO1xuXG5jb25zdCBpc1ZhbGlkTmF2SWQgPSAoaWQ6IGFueSkgPT4gaXNEZWZpbmVkKGlkKSAmJiBpZCAhPT0gJyc7XG5cbmxldCBuYXZDb3VudGVyID0gMDtcblxuLyoqXG4gKiBDb250ZXh0IHBhc3NlZCB0byB0aGUgbmF2IGNvbnRlbnQgdGVtcGxhdGUuXG4gKlxuICogU2VlIFt0aGlzIGRlbW9dKCMvY29tcG9uZW50cy9uYXYvZXhhbXBsZXMja2VlcC1jb250ZW50KSBhcyB0aGUgZXhhbXBsZS5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JOYXZDb250ZW50Q29udGV4dCB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGN1cnJlbnQgbmF2IGNvbnRlbnQgaXMgdmlzaWJsZSBhbmQgYWN0aXZlXG4gICAqL1xuICAkaW1wbGljaXQ6IGJvb2xlYW47XG59XG5cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgbmF2LlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYk5hdkNvbnRlbnRdJ30pXG5leHBvcnQgY2xhc3MgTmdiTmF2Q29udGVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuXG4vKipcbiAqIFRoZSBkaXJlY3RpdmUgdXNlZCB0byBncm91cCBuYXYgbGluayBhbmQgcmVsYXRlZCBuYXYgY29udGVudC4gQXMgd2VsbCBhcyBzZXQgbmF2IGlkZW50aWZpZXIgYW5kIHNvbWUgb3B0aW9ucy5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiTmF2SXRlbV0nLCBleHBvcnRBczogJ25nYk5hdkl0ZW0nLCBob3N0OiB7J1tjbGFzcy5uYXYtaXRlbV0nOiAndHJ1ZSd9fSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZJdGVtIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfbmF2OiBOZ2JOYXY7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgbm9uLWFjdGl2ZSBjdXJyZW50IG5hdiBpdGVtIGNvbnRlbnQgd2lsbCBiZSByZW1vdmVkIGZyb20gRE9NXG4gICAqIE90aGVyd2lzZSBpdCB3aWxsIGp1c3QgYmUgaGlkZGVuXG4gICAqL1xuICBASW5wdXQoKSBkZXN0cm95T25IaWRlO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjdXJyZW50IG5hdiBpdGVtIGlzIGRpc2FibGVkIGFuZCBjYW4ndCBiZSB0b2dnbGVkIGJ5IHVzZXIuXG4gICAqXG4gICAqIE5ldmVydGhlbGVzcyBkaXNhYmxlZCBuYXYgY2FuIGJlIHNlbGVjdGVkIHByb2dyYW1tYXRpY2FsbHkgdmlhIHRoZSBgLnNlbGVjdCgpYCBtZXRob2QgYW5kIHRoZSBgW2FjdGl2ZUlkXWAgYmluZGluZy5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCB1c2VkIGZvciB0aGUgRE9NIGVsZW1lbnRzLlxuICAgKiBNdXN0IGJlIHVuaXF1ZSBpbnNpZGUgdGhlIGRvY3VtZW50IGluIGNhc2UgeW91IGhhdmUgbXVsdGlwbGUgYG5nYk5hdmBzIG9uIHRoZSBwYWdlLlxuICAgKlxuICAgKiBBdXRvZ2VuZXJhdGVkIGFzIGBuZ2ItbmF2LVhYWGAgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgQElucHV0KCkgZG9tSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGlkIHVzZWQgYXMgYSBtb2RlbCBmb3IgYWN0aXZlIG5hdi5cbiAgICogSXQgY2FuIGJlIGFueXRoaW5nLCBidXQgbXVzdCBiZSB1bmlxdWUgaW5zaWRlIG9uZSBgbmdiTmF2YC5cbiAgICpcbiAgICogVGhlIG9ubHkgbGltaXRhdGlvbiBpcyB0aGF0IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBoYXZlIHRoZSBgJydgIChlbXB0eSBzdHJpbmcpIGFzIGlkLFxuICAgKiBiZWNhdXNlIGAgbmdiTmF2SXRlbSBgLCBgbmdiTmF2SXRlbT0nJ2AgYW5kIGBbbmdiTmF2SXRlbV09XCInJ1wiYCBhcmUgaW5kaXN0aW5ndWlzaGFibGVcbiAgICovXG4gIEBJbnB1dCgnbmdiTmF2SXRlbScpIF9pZDogYW55O1xuXG4gIGNvbnRlbnRUcGw6IE5nYk5hdkNvbnRlbnQgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiTmF2Q29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiTmF2Q29udGVudD47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYk5hdikpIG5hdiwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8YW55Pikge1xuICAgIC8vIFRPRE86IGNmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMwMTA2XG4gICAgdGhpcy5fbmF2ID0gbmF2O1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cbiAgICAvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghaXNEZWZpbmVkKHRoaXMuZG9tSWQpKSB7XG4gICAgICB0aGlzLmRvbUlkID0gYG5nYi1uYXYtJHtuYXZDb3VudGVyKyt9YDtcbiAgICB9XG4gIH1cblxuICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fbmF2LmFjdGl2ZUlkID09PSB0aGlzLmlkOyB9XG5cbiAgZ2V0IGlkKCkgeyByZXR1cm4gaXNWYWxpZE5hdklkKHRoaXMuX2lkKSA/IHRoaXMuX2lkIDogdGhpcy5kb21JZDsgfVxuXG4gIGdldCBwYW5lbERvbUlkKCkgeyByZXR1cm4gYCR7dGhpcy5kb21JZH0tcGFuZWxgOyB9XG5cbiAgaXNQYW5lbEluRG9tKCkge1xuICAgIHJldHVybiAoaXNEZWZpbmVkKHRoaXMuZGVzdHJveU9uSGlkZSkgPyAhdGhpcy5kZXN0cm95T25IaWRlIDogIXRoaXMuX25hdi5kZXN0cm95T25IaWRlKSB8fCB0aGlzLmFjdGl2ZTtcbiAgfVxufVxuXG5cbi8qKlxuICogQSBuYXYgZGlyZWN0aXZlIHRoYXQgaGVscHMgd2l0aCBpbXBsZW1lbnRpbmcgdGFiYmVkIG5hdmlnYXRpb24gY29tcG9uZW50cy5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYk5hdl0nLFxuICBleHBvcnRBczogJ25nYk5hdicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm5hdl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5mbGV4LWNvbHVtbl0nOiBgb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdgLFxuICAgICdbYXR0ci5hcmlhLW9yaWVudGF0aW9uXSc6IGBvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiByb2xlcyA9PT0gJ3RhYmxpc3QnID8gJ3ZlcnRpY2FsJyA6IHVuZGVmaW5lZGAsXG4gICAgJ1thdHRyLnJvbGVdJzogYHJvbGUgPyByb2xlIDogcm9sZXMgPyAndGFibGlzdCcgOiB1bmRlZmluZWRgLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nYk5hdiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBuYXYgdGhhdCBzaG91bGQgYmUgYWN0aXZlXG4gICAqXG4gICAqIFlvdSBjb3VsZCBhbHNvIHVzZSB0aGUgYC5zZWxlY3QoKWAgbWV0aG9kIGFuZCB0aGUgYChuYXZDaGFuZ2UpYCBldmVudFxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWQ6IGFueTtcblxuICAvKipcbiAgICogVGhlIGV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGFjdGl2ZSBuYXYgY2hhbmdlc1xuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgdGhlIG5ld2x5IGFjdGl2ZSBuYXYgaWRcbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gcHJldmVudCBuYXYgY2hhbmdlLCB5b3Ugc2hvdWxkIHVzZSBgKG5hdkNoYW5nZSlgIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgYWN0aXZlSWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBub24tYWN0aXZlIG5hdiBjb250ZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIERPTVxuICAgKiBPdGhlcndpc2UgaXQgd2lsbCBqdXN0IGJlIGhpZGRlblxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZTtcblxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIG5hdnMuXG4gICAqXG4gICAqIFVzaW5nIGB2ZXJ0aWNhbGAgd2lsbCBhbHNvIGFkZCB0aGUgYGFyaWEtb3JpZW50YXRpb25gIGF0dHJpYnV0ZVxuICAgKi9cbiAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbiAgLyoqXG4gICAqIFJvbGUgYXR0cmlidXRlIGdlbmVyYXRpbmcgc3RyYXRlZ3k6XG4gICAqIC0gYGZhbHNlYCAtIG5vIHJvbGUgYXR0cmlidXRlcyB3aWxsIGJlIGdlbmVyYXRlZFxuICAgKiAtIGAndGFibGlzdCdgIC0gJ3RhYmxpc3QnLCAndGFiJyBhbmQgJ3RhYnBhbmVsJyB3aWxsIGJlIGdlbmVyYXRlZCAoZGVmYXVsdClcbiAgICovXG4gIEBJbnB1dCgpIHJvbGVzOiAndGFibGlzdCcgfCBmYWxzZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYk5hdkl0ZW0pIGl0ZW1zOiBRdWVyeUxpc3Q8TmdiTmF2SXRlbT47XG5cbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgncm9sZScpIHB1YmxpYyByb2xlOiBzdHJpbmcsIGNvbmZpZzogTmdiTmF2Q29uZmlnLCBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmRlc3Ryb3lPbkhpZGUgPSBjb25maWcuZGVzdHJveU9uSGlkZTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gY29uZmlnLm9yaWVudGF0aW9uO1xuICAgIHRoaXMucm9sZXMgPSBjb25maWcucm9sZXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hdiBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxuICAgKlxuICAgKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxuICAgKlxuICAgKiBTZWUgW2BOZ2JOYXZDaGFuZ2VFdmVudGBdKCMvY29tcG9uZW50cy9uYXYvYXBpI05nYk5hdkNoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuICAgKi9cbiAgQE91dHB1dCgpIG5hdkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiTmF2Q2hhbmdlRXZlbnQ+KCk7XG5cbiAgY2xpY2soaXRlbTogTmdiTmF2SXRlbSkge1xuICAgIGlmICghaXRlbS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWQoaXRlbS5pZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIG5hdiB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgc2hvd3MgaXRzIGFzc29jaWF0ZWQgcGFuZS5cbiAgICogQW55IG90aGVyIG5hdiB0aGF0IHdhcyBwcmV2aW91c2x5IHNlbGVjdGVkIGJlY29tZXMgdW5zZWxlY3RlZCBhbmQgaXRzIGFzc29jaWF0ZWQgcGFuZSBpcyBoaWRkZW4uXG4gICAqL1xuICBzZWxlY3QoaWQ6IGFueSkgeyB0aGlzLl91cGRhdGVBY3RpdmVJZChpZCwgZmFsc2UpOyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghaXNEZWZpbmVkKHRoaXMuYWN0aXZlSWQpKSB7XG4gICAgICBjb25zdCBuZXh0SWQgPSB0aGlzLml0ZW1zLmZpcnN0ID8gdGhpcy5pdGVtcy5maXJzdC5pZCA6IG51bGw7XG4gICAgICBpZiAoaXNWYWxpZE5hdklkKG5leHRJZCkpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWQobmV4dElkLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVBY3RpdmVJZChuZXh0SWQ6IGFueSwgZW1pdE5hdkNoYW5nZSA9IHRydWUpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVJZCAhPT0gbmV4dElkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoZW1pdE5hdkNoYW5nZSkge1xuICAgICAgICB0aGlzLm5hdkNoYW5nZS5lbWl0KHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IG5leHRJZDtcbiAgICAgICAgdGhpcy5hY3RpdmVJZENoYW5nZS5lbWl0KG5leHRJZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gdGhlIG5hdiBsaW5rLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhW25nYk5hdkxpbmtdJyxcbiAgaG9zdDoge1xuICAgICdbaWRdJzogJ25hdkl0ZW0uZG9tSWQnLFxuICAgICdbY2xhc3MubmF2LWxpbmtdJzogJ3RydWUnLFxuICAgICdbY2xhc3MubmF2LWl0ZW1dJzogJ2hhc05hdkl0ZW1DbGFzcygpJyxcbiAgICAnW2F0dHIucm9sZV0nOiBgcm9sZSA/IHJvbGUgOiBuYXYucm9sZXMgPyAndGFiJyA6IHVuZGVmaW5lZGAsXG4gICAgJ2hyZWYnOiAnJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnbmF2SXRlbS5hY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnbmF2SXRlbS5kaXNhYmxlZCA/IC0xIDogdW5kZWZpbmVkJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnbmF2SXRlbS5pc1BhbmVsSW5Eb20oKSA/IG5hdkl0ZW0ucGFuZWxEb21JZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICduYXZJdGVtLmFjdGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuICAgICcoY2xpY2spJzogJ25hdi5jbGljayhuYXZJdGVtKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2TGluayB7XG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLCBwdWJsaWMgbmF2SXRlbTogTmdiTmF2SXRlbSwgcHVibGljIG5hdjogTmdiTmF2KSB7fVxuXG4gIGhhc05hdkl0ZW1DbGFzcygpIHtcbiAgICAvLyB3aXRoIGFsdGVybmF0aXZlIG1hcmt1cCB3ZSBoYXZlIHRvIGFkZCBgLm5hdi1pdGVtYCBjbGFzcywgYmVjYXVzZSBgbmdiTmF2SXRlbWAgaXMgb24gdGhlIG5nLWNvbnRhaW5lclxuICAgIHJldHVybiB0aGlzLm5hdkl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERTtcbiAgfVxufVxuXG5cbi8qKlxuICogVGhlIHBheWxvYWQgb2YgdGhlIGNoYW5nZSBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0aGUgbmF2IGNoYW5nZSBoYXBwZW5zIG9uIHVzZXIgY2xpY2suXG4gKlxuICogVGhpcyBldmVudCB3b24ndCBiZSBlbWl0dGVkIGlmIG5hdiBpcyBjaGFuZ2VkIHByb2dyYW1tYXRpY2FsbHkgdmlhIGBbYWN0aXZlSWRdYCBvciBgLnNlbGVjdCgpYC5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JOYXZDaGFuZ2VFdmVudCB7XG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBuYXYuXG4gICAqL1xuICBhY3RpdmVJZDogYW55O1xuXG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgbmF2LlxuICAgKi9cbiAgbmV4dElkOiBhbnk7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IG5hdiBjaGFuZ2UgaWYgY2FsbGVkLlxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG4iXX0=