import { __decorate, __param } from "tslib";
import { AfterContentChecked, AfterContentInit, Attribute, ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isDefined } from '../util/util';
import { NgbNavConfig } from './nav-config';
import { Key } from '../util/key';
var isValidNavId = function (id) { return isDefined(id) && id !== ''; };
var ɵ0 = isValidNavId;
var navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
var NgbNavContent = /** @class */ (function () {
    function NgbNavContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbNavContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbNavContent = __decorate([
        Directive({ selector: 'ng-template[ngbNavContent]' })
    ], NgbNavContent);
    return NgbNavContent;
}());
export { NgbNavContent };
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
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
    NgbNavItem.prototype.ngAfterContentChecked = function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    };
    NgbNavItem.prototype.ngOnInit = function () {
        if (!isDefined(this.domId)) {
            this.domId = "ngb-nav-" + navCounter++;
        }
    };
    Object.defineProperty(NgbNavItem.prototype, "active", {
        get: function () { return this._nav.activeId === this.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbNavItem.prototype, "id", {
        get: function () { return isValidNavId(this._id) ? this._id : this.domId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbNavItem.prototype, "panelDomId", {
        get: function () { return this.domId + "-panel"; },
        enumerable: true,
        configurable: true
    });
    NgbNavItem.prototype.isPanelInDom = function () {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    };
    NgbNavItem.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbNav; }),] }] },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], NgbNavItem.prototype, "destroyOnHide", void 0);
    __decorate([
        Input()
    ], NgbNavItem.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgbNavItem.prototype, "domId", void 0);
    __decorate([
        Input('ngbNavItem')
    ], NgbNavItem.prototype, "_id", void 0);
    __decorate([
        ContentChildren(NgbNavContent, { descendants: false })
    ], NgbNavItem.prototype, "contentTpls", void 0);
    NgbNavItem = __decorate([
        Directive({ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', host: { '[class.nav-item]': 'true' } }),
        __param(0, Inject(forwardRef(function () { return NgbNav; })))
    ], NgbNavItem);
    return NgbNavItem;
}());
export { NgbNavItem };
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
var NgbNav = /** @class */ (function () {
    function NgbNav(role, config, _cd, _document) {
        this.role = role;
        this._cd = _cd;
        this._document = _document;
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
        this.keyboard = config.keyboard;
    }
    NgbNav.prototype.click = function (item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    };
    NgbNav.prototype.onKeyDown = function (event) {
        var _this = this;
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        // tslint:disable-next-line: deprecation
        var key = event.which;
        var enabledLinks = this.links.filter(function (link) { return !link.navItem.disabled; });
        var length = enabledLinks.length;
        var position = -1;
        enabledLinks.forEach(function (link, index) {
            if (link.elRef.nativeElement === _this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (key) {
                case Key.ArrowLeft:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.ArrowRight:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowDown:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowUp:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.Home:
                    position = 0;
                    break;
                case Key.End:
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].elRef.nativeElement.focus();
            event.preventDefault();
        }
    };
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    NgbNav.prototype.select = function (id) { this._updateActiveId(id, false); };
    NgbNav.prototype.ngAfterContentInit = function () {
        if (!isDefined(this.activeId)) {
            var nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
    };
    NgbNav.prototype._updateActiveId = function (nextId, emitNavChange) {
        if (emitNavChange === void 0) { emitNavChange = true; }
        if (this.activeId !== nextId) {
            var defaultPrevented_1 = false;
            if (emitNavChange) {
                this.navChange.emit({ activeId: this.activeId, nextId: nextId, preventDefault: function () { defaultPrevented_1 = true; } });
            }
            if (!defaultPrevented_1) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
            }
        }
    };
    NgbNav.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
        { type: NgbNavConfig },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    __decorate([
        Input()
    ], NgbNav.prototype, "activeId", void 0);
    __decorate([
        Output()
    ], NgbNav.prototype, "activeIdChange", void 0);
    __decorate([
        Input()
    ], NgbNav.prototype, "destroyOnHide", void 0);
    __decorate([
        Input()
    ], NgbNav.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], NgbNav.prototype, "roles", void 0);
    __decorate([
        Input()
    ], NgbNav.prototype, "keyboard", void 0);
    __decorate([
        ContentChildren(NgbNavItem)
    ], NgbNav.prototype, "items", void 0);
    __decorate([
        ContentChildren(forwardRef(function () { return NgbNavLink; }), { descendants: true })
    ], NgbNav.prototype, "links", void 0);
    __decorate([
        Output()
    ], NgbNav.prototype, "navChange", void 0);
    NgbNav = __decorate([
        Directive({
            selector: '[ngbNav]',
            exportAs: 'ngbNav',
            host: {
                '[class.nav]': 'true',
                '[class.flex-column]': "orientation === 'vertical'",
                '[attr.aria-orientation]': "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined",
                '[attr.role]': "role ? role : roles ? 'tablist' : undefined",
                '(keydown.arrowLeft)': 'onKeyDown($event)',
                '(keydown.arrowRight)': 'onKeyDown($event)',
                '(keydown.arrowDown)': 'onKeyDown($event)',
                '(keydown.arrowUp)': 'onKeyDown($event)',
                '(keydown.Home)': 'onKeyDown($event)',
                '(keydown.End)': 'onKeyDown($event)'
            }
        }),
        __param(0, Attribute('role')),
        __param(3, Inject(DOCUMENT))
    ], NgbNav);
    return NgbNav;
}());
export { NgbNav };
/**
 * A directive to put on the nav link.
 *
 * @since 5.2.0
 */
var NgbNavLink = /** @class */ (function () {
    function NgbNavLink(role, navItem, nav, elRef) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
        this.elRef = elRef;
    }
    NgbNavLink.prototype.hasNavItemClass = function () {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    };
    NgbNavLink.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
        { type: NgbNavItem },
        { type: NgbNav },
        { type: ElementRef }
    ]; };
    NgbNavLink = __decorate([
        Directive({
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
        }),
        __param(0, Attribute('role'))
    ], NgbNavLink);
    return NgbNavLink;
}());
export { NgbNavLink };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJuYXYvbmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRWhDLElBQU0sWUFBWSxHQUFHLFVBQUMsRUFBTyxJQUFLLE9BQUEsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQTFCLENBQTBCLENBQUM7O0FBRTdELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQWlCbkI7Ozs7R0FJRztBQUVIO0lBQ0UsdUJBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUFHLENBQUM7O2dCQUFwQixXQUFXOztJQURoQyxhQUFhO1FBRHpCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQyxDQUFDO09BQ3ZDLGFBQWEsQ0FFekI7SUFBRCxvQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLGFBQWE7QUFLMUI7Ozs7R0FJRztBQUVIO0lBcUNFLG9CQUE4QyxHQUFHLEVBQVMsVUFBMkI7UUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUE1QnJGOzs7O1dB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QVMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDL0UsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUFHLENBQUM7SUFFaEMsb0NBQWUsR0FBZjtRQUNFLHdHQUF3RztRQUN4RyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM5RSxDQUFDOzs2Q0FOSSxTQUFTLFNBQUMsTUFBTTtnQkFBdUMsVUFBVTtnQkFBYyxNQUFNO2dCQUN4RSxVQUFVOztJQUhqQixVQUFVO1FBakJ0QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLGVBQWU7Z0JBQ3ZCLGtCQUFrQixFQUFFLE1BQU07Z0JBQzFCLGtCQUFrQixFQUFFLG1CQUFtQjtnQkFDdkMsYUFBYSxFQUFFLDZDQUE2QztnQkFDNUQsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsZ0JBQWdCLEVBQUUsZ0JBQWdCO2dCQUNsQyxrQkFBa0IsRUFBRSxrQkFBa0I7Z0JBQ3RDLGlCQUFpQixFQUFFLG1DQUFtQztnQkFDdEQsc0JBQXNCLEVBQUUsb0RBQW9EO2dCQUM1RSxzQkFBc0IsRUFBRSxnQkFBZ0I7Z0JBQ3hDLHNCQUFzQixFQUFFLGtCQUFrQjtnQkFDMUMsU0FBUyxFQUFFLDZDQUE2QzthQUN6RDtTQUNGLENBQUM7UUFHSyxXQUFBLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtPQUZYLFVBQVUsQ0FTdEI7SUFBRCxpQkFBQztDQUFBLEFBVEQsSUFTQztTQVRZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiTmF2Q29uZmlnfSBmcm9tICcuL25hdi1jb25maWcnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuY29uc3QgaXNWYWxpZE5hdklkID0gKGlkOiBhbnkpID0+IGlzRGVmaW5lZChpZCkgJiYgaWQgIT09ICcnO1xuXG5sZXQgbmF2Q291bnRlciA9IDA7XG5cbi8qKlxuICogQ29udGV4dCBwYXNzZWQgdG8gdGhlIG5hdiBjb250ZW50IHRlbXBsYXRlLlxuICpcbiAqIFNlZSBbdGhpcyBkZW1vXSgjL2NvbXBvbmVudHMvbmF2L2V4YW1wbGVzI2tlZXAtY29udGVudCkgYXMgdGhlIGV4YW1wbGUuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiTmF2Q29udGVudENvbnRleHQge1xuICAvKipcbiAgICogSWYgYHRydWVgLCBjdXJyZW50IG5hdiBjb250ZW50IGlzIHZpc2libGUgYW5kIGFjdGl2ZVxuICAgKi9cbiAgJGltcGxpY2l0OiBib29sZWFuO1xufVxuXG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHRvIHdyYXAgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIG5hdi5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JOYXZDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYk5hdkNvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cblxuLyoqXG4gKiBUaGUgZGlyZWN0aXZlIHVzZWQgdG8gZ3JvdXAgbmF2IGxpbmsgYW5kIHJlbGF0ZWQgbmF2IGNvbnRlbnQuIEFzIHdlbGwgYXMgc2V0IG5hdiBpZGVudGlmaWVyIGFuZCBzb21lIG9wdGlvbnMuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYk5hdkl0ZW1dJywgZXhwb3J0QXM6ICduZ2JOYXZJdGVtJywgaG9zdDogeydbY2xhc3MubmF2LWl0ZW1dJzogJ3RydWUnfX0pXG5leHBvcnQgY2xhc3MgTmdiTmF2SXRlbSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIE9uSW5pdCB7XG4gIHByaXZhdGUgX25hdjogTmdiTmF2O1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5vbi1hY3RpdmUgY3VycmVudCBuYXYgaXRlbSBjb250ZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIERPTVxuICAgKiBPdGhlcndpc2UgaXQgd2lsbCBqdXN0IGJlIGhpZGRlblxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZTtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY3VycmVudCBuYXYgaXRlbSBpcyBkaXNhYmxlZCBhbmQgY2FuJ3QgYmUgdG9nZ2xlZCBieSB1c2VyLlxuICAgKlxuICAgKiBOZXZlcnRoZWxlc3MgZGlzYWJsZWQgbmF2IGNhbiBiZSBzZWxlY3RlZCBwcm9ncmFtbWF0aWNhbGx5IHZpYSB0aGUgYC5zZWxlY3QoKWAgbWV0aG9kIGFuZCB0aGUgYFthY3RpdmVJZF1gIGJpbmRpbmcuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgdXNlZCBmb3IgdGhlIERPTSBlbGVtZW50cy5cbiAgICogTXVzdCBiZSB1bmlxdWUgaW5zaWRlIHRoZSBkb2N1bWVudCBpbiBjYXNlIHlvdSBoYXZlIG11bHRpcGxlIGBuZ2JOYXZgcyBvbiB0aGUgcGFnZS5cbiAgICpcbiAgICogQXV0b2dlbmVyYXRlZCBhcyBgbmdiLW5hdi1YWFhgIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRvbUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCB1c2VkIGFzIGEgbW9kZWwgZm9yIGFjdGl2ZSBuYXYuXG4gICAqIEl0IGNhbiBiZSBhbnl0aGluZywgYnV0IG11c3QgYmUgdW5pcXVlIGluc2lkZSBvbmUgYG5nYk5hdmAuXG4gICAqXG4gICAqIFRoZSBvbmx5IGxpbWl0YXRpb24gaXMgdGhhdCBpdCBpcyBub3QgcG9zc2libGUgdG8gaGF2ZSB0aGUgYCcnYCAoZW1wdHkgc3RyaW5nKSBhcyBpZCxcbiAgICogYmVjYXVzZSBgIG5nYk5hdkl0ZW0gYCwgYG5nYk5hdkl0ZW09JydgIGFuZCBgW25nYk5hdkl0ZW1dPVwiJydcImAgYXJlIGluZGlzdGluZ3Vpc2hhYmxlXG4gICAqL1xuICBASW5wdXQoJ25nYk5hdkl0ZW0nKSBfaWQ6IGFueTtcblxuICBjb250ZW50VHBsOiBOZ2JOYXZDb250ZW50IHwgbnVsbDtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYk5hdkNvbnRlbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYk5hdkNvbnRlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JOYXYpKSBuYXYsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPGFueT4pIHtcbiAgICAvLyBUT0RPOiBjZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMDEwNlxuICAgIHRoaXMuX25hdiA9IG5hdjtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBXZSBhcmUgdXNpbmcgQENvbnRlbnRDaGlsZHJlbiBpbnN0ZWFkIG9mIEBDb250ZW50Q2hpbGQgYXMgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvbiBiZWluZyB1c2VkXG4gICAgLy8gb25seSBAQ29udGVudENoaWxkcmVuIGFsbG93cyB1cyB0byBzcGVjaWZ5IHRoZSB7ZGVzY2VuZGFudHM6IGZhbHNlfSBvcHRpb24uXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjI0MFxuICAgIHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIWlzRGVmaW5lZCh0aGlzLmRvbUlkKSkge1xuICAgICAgdGhpcy5kb21JZCA9IGBuZ2ItbmF2LSR7bmF2Q291bnRlcisrfWA7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX25hdi5hY3RpdmVJZCA9PT0gdGhpcy5pZDsgfVxuXG4gIGdldCBpZCgpIHsgcmV0dXJuIGlzVmFsaWROYXZJZCh0aGlzLl9pZCkgPyB0aGlzLl9pZCA6IHRoaXMuZG9tSWQ7IH1cblxuICBnZXQgcGFuZWxEb21JZCgpIHsgcmV0dXJuIGAke3RoaXMuZG9tSWR9LXBhbmVsYDsgfVxuXG4gIGlzUGFuZWxJbkRvbSgpIHtcbiAgICByZXR1cm4gKGlzRGVmaW5lZCh0aGlzLmRlc3Ryb3lPbkhpZGUpID8gIXRoaXMuZGVzdHJveU9uSGlkZSA6ICF0aGlzLl9uYXYuZGVzdHJveU9uSGlkZSkgfHwgdGhpcy5hY3RpdmU7XG4gIH1cbn1cblxuXG4vKipcbiAqIEEgbmF2IGRpcmVjdGl2ZSB0aGF0IGhlbHBzIHdpdGggaW1wbGVtZW50aW5nIHRhYmJlZCBuYXZpZ2F0aW9uIGNvbXBvbmVudHMuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JOYXZdJyxcbiAgZXhwb3J0QXM6ICduZ2JOYXYnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uYXZdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZmxleC1jb2x1bW5dJzogYG9yaWVudGF0aW9uID09PSAndmVydGljYWwnYCxcbiAgICAnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiBgb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgcm9sZXMgPT09ICd0YWJsaXN0JyA/ICd2ZXJ0aWNhbCcgOiB1bmRlZmluZWRgLFxuICAgICdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IHJvbGVzID8gJ3RhYmxpc3QnIDogdW5kZWZpbmVkYCxcbiAgICAnKGtleWRvd24uYXJyb3dMZWZ0KSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLmFycm93UmlnaHQpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uYXJyb3dEb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLmFycm93VXApJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uSG9tZSknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5FbmQpJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nYk5hdiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3JpZW50YXRpb246IHN0cmluZztcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JvbGVzOiBib29sZWFuIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIG5hdiB0aGF0IHNob3VsZCBiZSBhY3RpdmVcbiAgICpcbiAgICogWW91IGNvdWxkIGFsc28gdXNlIHRoZSBgLnNlbGVjdCgpYCBtZXRob2QgYW5kIHRoZSBgKG5hdkNoYW5nZSlgIGV2ZW50XG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVJZDogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgZXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgYWN0aXZlIG5hdiBjaGFuZ2VzXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyB0aGUgbmV3bHkgYWN0aXZlIG5hdiBpZFxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byBwcmV2ZW50IG5hdiBjaGFuZ2UsIHlvdSBzaG91bGQgdXNlIGAobmF2Q2hhbmdlKWAgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBhY3RpdmVJZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5vbi1hY3RpdmUgbmF2IGNvbnRlbnQgd2lsbCBiZSByZW1vdmVkIGZyb20gRE9NXG4gICAqIE90aGVyd2lzZSBpdCB3aWxsIGp1c3QgYmUgaGlkZGVuXG4gICAqL1xuICBASW5wdXQoKSBkZXN0cm95T25IaWRlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgbmF2cy5cbiAgICpcbiAgICogVXNpbmcgYHZlcnRpY2FsYCB3aWxsIGFsc28gYWRkIHRoZSBgYXJpYS1vcmllbnRhdGlvbmAgYXR0cmlidXRlXG4gICAqL1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuICAvKipcbiAgICogUm9sZSBhdHRyaWJ1dGUgZ2VuZXJhdGluZyBzdHJhdGVneTpcbiAgICogLSBgZmFsc2VgIC0gbm8gcm9sZSBhdHRyaWJ1dGVzIHdpbGwgYmUgZ2VuZXJhdGVkXG4gICAqIC0gYCd0YWJsaXN0J2AgLSAndGFibGlzdCcsICd0YWInIGFuZCAndGFicGFuZWwnIHdpbGwgYmUgZ2VuZXJhdGVkIChkZWZhdWx0KVxuICAgKi9cbiAgQElucHV0KCkgcm9sZXM6ICd0YWJsaXN0JyB8IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBLZXlib2FyZCBzdXBwb3J0IGZvciBuYXYgZm9jdXMvc2VsZWN0aW9uIHVzaW5nIGFycm93IGtleXMuXG4gICAqXG4gICAqICogYGZhbHNlYCAtIG5vIGtleWJvYXJkIHN1cHBvcnQuXG4gICAqICogYHRydWVgIC0gbmF2cyB3aWxsIGJlIGZvY3VzZWQgdXNpbmcga2V5Ym9hcmQgYXJyb3cga2V5c1xuICAgKiAqIGAnY2hhbmdlV2l0aEFycm93cydgIC0gIG5hdiB3aWxsIGJlIHNlbGVjdGVkIHVzaW5nIGtleWJvYXJkIGFycm93IGtleXNcbiAgICpcbiAgICogU2VlIHRoZSBbbGlzdCBvZiBhdmFpbGFibGUga2V5Ym9hcmQgc2hvcnRjdXRzXSgjL2NvbXBvbmVudHMvbmF2L292ZXJ2aWV3I2tleWJvYXJkLXNob3J0Y3V0cykuXG4gICAqXG4gICAqIEBzaW5jZSA2LjEuMFxuICovXG4gIEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuIHwgJ2NoYW5nZVdpdGhBcnJvd3MnO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiTmF2SXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxOZ2JOYXZJdGVtPjtcbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE5nYk5hdkxpbmspLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBsaW5rczogUXVlcnlMaXN0PE5nYk5hdkxpbms+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEF0dHJpYnV0ZSgncm9sZScpIHB1YmxpYyByb2xlOiBzdHJpbmcsIGNvbmZpZzogTmdiTmF2Q29uZmlnLCBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5kZXN0cm95T25IaWRlID0gY29uZmlnLmRlc3Ryb3lPbkhpZGU7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcbiAgICB0aGlzLnJvbGVzID0gY29uZmlnLnJvbGVzO1xuICAgIHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hdiBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxuICAgKlxuICAgKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxuICAgKlxuICAgKiBTZWUgW2BOZ2JOYXZDaGFuZ2VFdmVudGBdKCMvY29tcG9uZW50cy9uYXYvYXBpI05nYk5hdkNoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuICAgKi9cbiAgQE91dHB1dCgpIG5hdkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiTmF2Q2hhbmdlRXZlbnQ+KCk7XG5cbiAgY2xpY2soaXRlbTogTmdiTmF2SXRlbSkge1xuICAgIGlmICghaXRlbS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWQoaXRlbS5pZCk7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMucm9sZXMgIT09ICd0YWJsaXN0JyB8fCAhdGhpcy5rZXlib2FyZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG4gICAgY29uc3QgZW5hYmxlZExpbmtzID0gdGhpcy5saW5rcy5maWx0ZXIobGluayA9PiAhbGluay5uYXZJdGVtLmRpc2FibGVkKTtcbiAgICBjb25zdCB7bGVuZ3RofSA9IGVuYWJsZWRMaW5rcztcblxuICAgIGxldCBwb3NpdGlvbiA9IC0xO1xuXG4gICAgZW5hYmxlZExpbmtzLmZvckVhY2goKGxpbmssIGluZGV4KSA9PiB7XG4gICAgICBpZiAobGluay5lbFJlZi5uYXRpdmVFbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIHBvc2l0aW9uID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobGVuZ3RoKSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zaXRpb24gPSAocG9zaXRpb24gLSAxICsgbGVuZ3RoKSAlIGxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IChwb3NpdGlvbiArIDEpICUgbGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IChwb3NpdGlvbiArIDEpICUgbGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zaXRpb24gPSAocG9zaXRpb24gLSAxICsgbGVuZ3RoKSAlIGxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgICBwb3NpdGlvbiA9IGxlbmd0aCAtIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5rZXlib2FyZCA9PT0gJ2NoYW5nZVdpdGhBcnJvd3MnKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KGVuYWJsZWRMaW5rc1twb3NpdGlvbl0ubmF2SXRlbS5pZCk7XG4gICAgICB9XG4gICAgICBlbmFibGVkTGlua3NbcG9zaXRpb25dLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgbmF2IHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBwYW5lLlxuICAgKiBBbnkgb3RoZXIgbmF2IHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIGhpZGRlbi5cbiAgICovXG4gIHNlbGVjdChpZDogYW55KSB7IHRoaXMuX3VwZGF0ZUFjdGl2ZUlkKGlkLCBmYWxzZSk7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKCFpc0RlZmluZWQodGhpcy5hY3RpdmVJZCkpIHtcbiAgICAgIGNvbnN0IG5leHRJZCA9IHRoaXMuaXRlbXMuZmlyc3QgPyB0aGlzLml0ZW1zLmZpcnN0LmlkIDogbnVsbDtcbiAgICAgIGlmIChpc1ZhbGlkTmF2SWQobmV4dElkKSkge1xuICAgICAgICB0aGlzLl91cGRhdGVBY3RpdmVJZChuZXh0SWQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUFjdGl2ZUlkKG5leHRJZDogYW55LCBlbWl0TmF2Q2hhbmdlID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUlkICE9PSBuZXh0SWQpIHtcbiAgICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cbiAgICAgIGlmIChlbWl0TmF2Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMubmF2Q2hhbmdlLmVtaXQoe2FjdGl2ZUlkOiB0aGlzLmFjdGl2ZUlkLCBuZXh0SWQsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUlkID0gbmV4dElkO1xuICAgICAgICB0aGlzLmFjdGl2ZUlkQ2hhbmdlLmVtaXQobmV4dElkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHB1dCBvbiB0aGUgbmF2IGxpbmsuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FbbmdiTmF2TGlua10nLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAnbmF2SXRlbS5kb21JZCcsXG4gICAgJ1tjbGFzcy5uYXYtbGlua10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5uYXYtaXRlbV0nOiAnaGFzTmF2SXRlbUNsYXNzKCknLFxuICAgICdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IG5hdi5yb2xlcyA/ICd0YWInIDogdW5kZWZpbmVkYCxcbiAgICAnaHJlZic6ICcnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICduYXZJdGVtLmFjdGl2ZScsXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnbmF2SXRlbS5kaXNhYmxlZCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICduYXZJdGVtLmRpc2FibGVkID8gLTEgOiB1bmRlZmluZWQnLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICduYXZJdGVtLmlzUGFuZWxJbkRvbSgpID8gbmF2SXRlbS5wYW5lbERvbUlkIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ25hdkl0ZW0uYWN0aXZlJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnbmF2SXRlbS5kaXNhYmxlZCcsXG4gICAgJyhjbGljayknOiAnbmF2LmNsaWNrKG5hdkl0ZW0pOyAkZXZlbnQucHJldmVudERlZmF1bHQoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZMaW5rIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBAQXR0cmlidXRlKCdyb2xlJykgcHVibGljIHJvbGU6IHN0cmluZywgcHVibGljIG5hdkl0ZW06IE5nYk5hdkl0ZW0sIHB1YmxpYyBuYXY6IE5nYk5hdixcbiAgICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikge31cblxuICBoYXNOYXZJdGVtQ2xhc3MoKSB7XG4gICAgLy8gd2l0aCBhbHRlcm5hdGl2ZSBtYXJrdXAgd2UgaGF2ZSB0byBhZGQgYC5uYXYtaXRlbWAgY2xhc3MsIGJlY2F1c2UgYG5nYk5hdkl0ZW1gIGlzIG9uIHRoZSBuZy1jb250YWluZXJcbiAgICByZXR1cm4gdGhpcy5uYXZJdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxuICpcbiAqIFRoaXMgZXZlbnQgd29uJ3QgYmUgZW1pdHRlZCBpZiBuYXYgaXMgY2hhbmdlZCBwcm9ncmFtbWF0aWNhbGx5IHZpYSBgW2FjdGl2ZUlkXWAgb3IgYC5zZWxlY3QoKWAuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiTmF2Q2hhbmdlRXZlbnQ8VCA9IGFueT4ge1xuICAvKipcbiAgICogSWQgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgbmF2LlxuICAgKi9cbiAgYWN0aXZlSWQ6IFQ7XG5cbiAgLyoqXG4gICAqIElkIG9mIHRoZSBuZXdseSBzZWxlY3RlZCBuYXYuXG4gICAqL1xuICBuZXh0SWQ6IFQ7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IG5hdiBjaGFuZ2UgaWYgY2FsbGVkLlxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG4iXX0=