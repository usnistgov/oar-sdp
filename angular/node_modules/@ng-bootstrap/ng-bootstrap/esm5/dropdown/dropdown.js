import { __decorate, __extends, __param } from "tslib";
import { ChangeDetectorRef, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, AfterContentInit, OnDestroy, Output, QueryList, Renderer2, SimpleChanges, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { positionElements } from '../util/positioning';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { NgbDropdownConfig } from './dropdown-config';
import { FOCUSABLE_ELEMENTS_SELECTOR } from '../util/focus-trap';
var NgbNavbar = /** @class */ (function () {
    function NgbNavbar() {
    }
    NgbNavbar = __decorate([
        Directive({ selector: '.navbar' })
    ], NgbNavbar);
    return NgbNavbar;
}());
export { NgbNavbar };
/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
var NgbDropdownItem = /** @class */ (function () {
    function NgbDropdownItem(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    Object.defineProperty(NgbDropdownItem.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = value === '' || value === true; // accept an empty attribute as true
        },
        enumerable: true,
        configurable: true
    });
    NgbDropdownItem.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], NgbDropdownItem.prototype, "disabled", null);
    NgbDropdownItem = __decorate([
        Directive({ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } })
    ], NgbDropdownItem);
    return NgbDropdownItem;
}());
export { NgbDropdownItem };
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
var NgbDropdownMenu = /** @class */ (function () {
    function NgbDropdownMenu(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
        this.nativeElement = _elementRef.nativeElement;
    }
    NgbDropdownMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    __decorate([
        ContentChildren(NgbDropdownItem)
    ], NgbDropdownMenu.prototype, "menuItems", void 0);
    NgbDropdownMenu = __decorate([
        Directive({
            selector: '[ngbDropdownMenu]',
            host: {
                '[class.dropdown-menu]': 'true',
                '[class.show]': 'dropdown.isOpen()',
                '[attr.x-placement]': 'placement',
                '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                '(keydown.Home)': 'dropdown.onKeyDown($event)',
                '(keydown.End)': 'dropdown.onKeyDown($event)',
                '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                '(keydown.Space)': 'dropdown.onKeyDown($event)',
                '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
            }
        }),
        __param(0, Inject(forwardRef(function () { return NgbDropdown; })))
    ], NgbDropdownMenu);
    return NgbDropdownMenu;
}());
export { NgbDropdownMenu };
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
var NgbDropdownAnchor = /** @class */ (function () {
    function NgbDropdownAnchor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.nativeElement = _elementRef.nativeElement;
    }
    NgbDropdownAnchor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    NgbDropdownAnchor = __decorate([
        Directive({ selector: '[ngbDropdownAnchor]', host: { 'class': 'dropdown-toggle', '[attr.aria-expanded]': 'dropdown.isOpen()' } }),
        __param(0, Inject(forwardRef(function () { return NgbDropdown; })))
    ], NgbDropdownAnchor);
    return NgbDropdownAnchor;
}());
export { NgbDropdownAnchor };
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
var NgbDropdownToggle = /** @class */ (function (_super) {
    __extends(NgbDropdownToggle, _super);
    function NgbDropdownToggle(dropdown, elementRef) {
        return _super.call(this, dropdown, elementRef) || this;
    }
    NgbDropdownToggle_1 = NgbDropdownToggle;
    var NgbDropdownToggle_1;
    NgbDropdownToggle.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    NgbDropdownToggle = NgbDropdownToggle_1 = __decorate([
        Directive({
            selector: '[ngbDropdownToggle]',
            host: {
                'class': 'dropdown-toggle',
                '[attr.aria-expanded]': 'dropdown.isOpen()',
                '(click)': 'dropdown.toggle()',
                '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                '(keydown.Home)': 'dropdown.onKeyDown($event)',
                '(keydown.End)': 'dropdown.onKeyDown($event)',
                '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
            },
            providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(function () { return NgbDropdownToggle_1; }) }]
        }),
        __param(0, Inject(forwardRef(function () { return NgbDropdown; })))
    ], NgbDropdownToggle);
    return NgbDropdownToggle;
}(NgbDropdownAnchor));
export { NgbDropdownToggle };
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
var NgbDropdown = /** @class */ (function () {
    function NgbDropdown(_changeDetector, config, _document, _ngZone, _elementRef, _renderer, ngbNavbar) {
        var _this = this;
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._closed$ = new Subject();
        this._bodyContainer = null;
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.container = config.container;
        this.autoClose = config.autoClose;
        this.display = ngbNavbar ? 'static' : 'dynamic';
        this._zoneSubscription = _ngZone.onStable.subscribe(function () { _this._positionMenu(); });
    }
    NgbDropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._ngZone.onStable.pipe(take(1)).subscribe(function () {
            _this._applyPlacementClasses();
            if (_this._open) {
                _this._setCloseHandlers();
            }
        });
    };
    NgbDropdown.prototype.ngOnChanges = function (changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.isFirstChange) {
            this._applyPlacementClasses();
        }
    };
    /**
     * Checks if the dropdown menu is open.
     */
    NgbDropdown.prototype.isOpen = function () { return this._open; };
    /**
     * Opens the dropdown menu.
     */
    NgbDropdown.prototype.open = function () {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
            if (this._anchor) {
                this._anchor.nativeElement.focus();
            }
        }
    };
    NgbDropdown.prototype._setCloseHandlers = function () {
        var _this = this;
        ngbAutoClose(this._ngZone, this._document, this.autoClose, function (source) {
            _this.close();
            if (source === 0 /* ESCAPE */) {
                _this._anchor.nativeElement.focus();
            }
        }, this._closed$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
    };
    /**
     * Closes the dropdown menu.
     */
    NgbDropdown.prototype.close = function () {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Toggles the dropdown menu.
     */
    NgbDropdown.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    NgbDropdown.prototype.ngOnDestroy = function () {
        this._resetContainer();
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    };
    NgbDropdown.prototype.onKeyDown = function (event) {
        var _this = this;
        // tslint:disable-next-line:deprecation
        var key = event.which;
        var itemElements = this._getMenuElements();
        var position = -1;
        var itemElement = null;
        var isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach(function (item, index) {
                if (item.contains(event.target)) {
                    itemElement = item;
                }
                if (item === _this._document.activeElement) {
                    position = index;
                }
            });
        }
        // closing on Enter / Space
        if (key === Key.Space || key === Key.Enter) {
            if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click').pipe(take(1)).subscribe(function () { return _this.close(); });
            }
            return;
        }
        if (key === Key.Tab) {
            if (event.target && this.isOpen() && this.autoClose) {
                if (this._anchor.nativeElement === event.target) {
                    if (this.container === 'body' && !event.shiftKey) {
                        /* This case is special: user is using [Tab] from the anchor/toggle.
                           User expects the next focusable element in the dropdown menu to get focus.
                           But the menu is not a sibling to anchor/toggle, it is at the end of the body.
                           Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
                           so that browser will focus the proper element (first one focusable in the menu) */
                        this._renderer.setAttribute(this._menu.nativeElement, 'tabindex', '0');
                        this._menu.nativeElement.focus();
                        this._renderer.removeAttribute(this._menu.nativeElement, 'tabindex');
                    }
                    else if (event.shiftKey) {
                        this.close();
                    }
                    return;
                }
                else if (this.container === 'body') {
                    var focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                    if (event.shiftKey && event.target === focusableElements[0]) {
                        this._anchor.nativeElement.focus();
                        event.preventDefault();
                    }
                    else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                        this._anchor.nativeElement.focus();
                        this.close();
                    }
                }
                else {
                    fromEvent(event.target, 'focusout').pipe(take(1)).subscribe(function (_a) {
                        var relatedTarget = _a.relatedTarget;
                        if (!_this._elementRef.nativeElement.contains(relatedTarget)) {
                            _this.close();
                        }
                    });
                }
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || itemElement) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case Key.ArrowDown:
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case Key.ArrowUp:
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case Key.Home:
                        position = 0;
                        break;
                    case Key.End:
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    };
    NgbDropdown.prototype._isDropup = function () { return this._elementRef.nativeElement.classList.contains('dropup'); };
    NgbDropdown.prototype._isEventFromToggle = function (event) {
        return this._anchor.nativeElement.contains(event.target);
    };
    NgbDropdown.prototype._getMenuElements = function () {
        var menu = this._menu;
        if (menu == null) {
            return [];
        }
        return menu.menuItems.filter(function (item) { return !item.disabled; }).map(function (item) { return item.elementRef.nativeElement; });
    };
    NgbDropdown.prototype._positionMenu = function () {
        var menu = this._menu;
        if (this.isOpen() && menu) {
            this._applyPlacementClasses(this.display === 'dynamic' ? positionElements(this._anchor.nativeElement, this._bodyContainer || this._menu.nativeElement, this.placement, this.container === 'body') :
                this._getFirstPlacement(this.placement));
        }
    };
    NgbDropdown.prototype._getFirstPlacement = function (placement) {
        return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
    };
    NgbDropdown.prototype._resetContainer = function () {
        var renderer = this._renderer;
        if (this._menu) {
            var dropdownElement = this._elementRef.nativeElement;
            var dropdownMenuElement = this._menu.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
            renderer.removeStyle(dropdownMenuElement, 'position');
            renderer.removeStyle(dropdownMenuElement, 'transform');
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    };
    NgbDropdown.prototype._applyContainer = function (container) {
        if (container === void 0) { container = null; }
        this._resetContainer();
        if (container === 'body') {
            var renderer = this._renderer;
            var dropdownMenuElement = this._menu.nativeElement;
            var bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
            // Override some styles to have the positionning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.setStyle(bodyContainer, 'z-index', '1050');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
    };
    NgbDropdown.prototype._applyPlacementClasses = function (placement) {
        var menu = this._menu;
        if (menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            var renderer = this._renderer;
            var dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            menu.placement = this.display === 'static' ? null : placement;
            /*
            * apply the new placement
            * in case of top use up-arrow or down-arrow otherwise
            */
            var dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            var bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    };
    NgbDropdown.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgbDropdownConfig },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgbNavbar, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        ContentChild(NgbDropdownMenu, { static: false })
    ], NgbDropdown.prototype, "_menu", void 0);
    __decorate([
        ContentChild(NgbDropdownAnchor, { static: false })
    ], NgbDropdown.prototype, "_anchor", void 0);
    __decorate([
        Input()
    ], NgbDropdown.prototype, "autoClose", void 0);
    __decorate([
        Input('open')
    ], NgbDropdown.prototype, "_open", void 0);
    __decorate([
        Input()
    ], NgbDropdown.prototype, "placement", void 0);
    __decorate([
        Input()
    ], NgbDropdown.prototype, "container", void 0);
    __decorate([
        Input()
    ], NgbDropdown.prototype, "display", void 0);
    __decorate([
        Output()
    ], NgbDropdown.prototype, "openChange", void 0);
    NgbDropdown = __decorate([
        Directive({ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } }),
        __param(2, Inject(DOCUMENT)),
        __param(6, Optional())
    ], NgbDropdown);
    return NgbDropdown;
}());
export { NgbDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxFQUNiLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXBDLE9BQU8sRUFBNEIsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsWUFBWSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVoQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRDtJQUFBO0lBQ0EsQ0FBQztJQURZLFNBQVM7UUFEckIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDO09BQ3BCLFNBQVMsQ0FDckI7SUFBRCxnQkFBQztDQUFBLEFBREQsSUFDQztTQURZLFNBQVM7QUFHdEI7Ozs7O0dBS0c7QUFFSDtJQVlFLHlCQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtR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N0I7UUFBVCxNQUFNLEVBQUU7bURBQTBDO0lBakV4QyxXQUFXO1FBRHZCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBQyxjQUFjLEVBQUUsVUFBVSxFQUFDLEVBQUMsQ0FBQztRQXFFdEIsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFdkYsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQXRFSixXQUFXLENBK1Z2QjtJQUFELGtCQUFDO0NBQUEsQUEvVkQsSUErVkM7U0EvVlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2Zyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1BsYWNlbWVudCwgUGxhY2VtZW50QXJyYXksIHBvc2l0aW9uRWxlbWVudHN9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2UsIFNPVVJDRX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuaW1wb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuaW1wb3J0IHtGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1J9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnLm5hdmJhcid9KVxuZXhwb3J0IGNsYXNzIE5nYk5hdmJhciB7XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgeW91IHNob3VsZCBwdXQgb24gYSBkcm9wZG93biBpdGVtIHRvIGVuYWJsZSBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICogQXJyb3cga2V5cyB3aWxsIG1vdmUgZm9jdXMgYmV0d2VlbiBpdGVtcyBtYXJrZWQgd2l0aCB0aGlzIGRpcmVjdGl2ZS5cbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiRHJvcGRvd25JdGVtXScsIGhvc3Q6IHsnY2xhc3MnOiAnZHJvcGRvd24taXRlbScsICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ319KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duSXRlbSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogYm9vbGVhbiB8ICcnO1xuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSA8YW55PnZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gdHJ1ZTsgIC8vIGFjY2VwdCBhbiBlbXB0eSBhdHRyaWJ1dGUgYXMgdHJ1ZVxuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBkcm9wZG93biBtZW51IGNvbnRlbnQgYW5kIGRyb3Bkb3duIGl0ZW1zLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25NZW51XScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duLW1lbnVdJzogJ3RydWUnLFxuICAgICdbY2xhc3Muc2hvd10nOiAnZHJvcGRvd24uaXNPcGVuKCknLFxuICAgICdbYXR0ci54LXBsYWNlbWVudF0nOiAncGxhY2VtZW50JyxcbiAgICAnKGtleWRvd24uQXJyb3dVcCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5BcnJvd0Rvd24pJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uSG9tZSknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5FbmQpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uRW50ZXIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uU3BhY2UpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uVGFiKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLlNoaWZ0LlRhYiknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25NZW51IHtcbiAgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50IHwgbnVsbCA9ICdib3R0b20nO1xuICBpc09wZW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYkRyb3Bkb3duSXRlbSkgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TmdiRHJvcGRvd25JdGVtPjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIGFuIGVsZW1lbnQgdG8gd2hpY2ggZHJvcGRvd24gbWVudSB3aWxsIGJlIGFuY2hvcmVkLlxuICpcbiAqIFRoaXMgaXMgYSBzaW1wbGUgdmVyc2lvbiBvZiB0aGUgYE5nYkRyb3Bkb3duVG9nZ2xlYCBkaXJlY3RpdmUuXG4gKiBJdCBwbGF5cyB0aGUgc2FtZSByb2xlLCBidXQgZG9lc24ndCBsaXN0ZW4gdG8gY2xpY2sgZXZlbnRzIHRvIHRvZ2dsZSBkcm9wZG93biBtZW51IHRodXMgZW5hYmxpbmcgc3VwcG9ydFxuICogZm9yIGV2ZW50cyBvdGhlciB0aGFuIGNsaWNrLlxuICpcbiAqIEBzaW5jZSAxLjEuMFxuICovXG5ARGlyZWN0aXZlKFxuICAgIHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLCBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKSd9fSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkFuY2hvciB7XG4gIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIGFuIGVsZW1lbnQgdGhhdCB3aWxsIHRvZ2dsZSBkcm9wZG93biB2aWEgdGhlIGBjbGlja2AgZXZlbnQuXG4gKlxuICogWW91IGNhbiBhbHNvIHVzZSBgTmdiRHJvcGRvd25BbmNob3JgIGFzIGFuIGFsdGVybmF0aXZlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25Ub2dnbGVdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG4gICAgJyhjbGljayknOiAnZHJvcGRvd24udG9nZ2xlKCknLFxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uU2hpZnQuVGFiKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5nYkRyb3Bkb3duQW5jaG9yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93blRvZ2dsZSl9XVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93blRvZ2dsZSBleHRlbmRzIE5nYkRyb3Bkb3duQW5jaG9yIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgZHJvcGRvd24sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoZHJvcGRvd24sIGVsZW1lbnRSZWYpO1xuICB9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBwcm92aWRlcyBjb250ZXh0dWFsIG92ZXJsYXlzIGZvciBkaXNwbGF5aW5nIGxpc3RzIG9mIGxpbmtzIGFuZCBtb3JlLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLCBleHBvcnRBczogJ25nYkRyb3Bkb3duJywgaG9zdDogeydbY2xhc3Muc2hvd10nOiAnaXNPcGVuKCknfX0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzcGxheTogc3RyaW5nO1xuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9ib2R5Q29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7c3RhdGljOiBmYWxzZX0pIHByaXZhdGUgX21lbnU6IE5nYkRyb3Bkb3duTWVudTtcbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bkFuY2hvciwge3N0YXRpYzogZmFsc2V9KSBwcml2YXRlIF9hbmNob3I6IE5nYkRyb3Bkb3duQW5jaG9yO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIGNsb3NlZCB3aGVuIGNsaWNraW5nIG9uZSBvZiBkcm9wZG93biBpdGVtcyBvciBwcmVzc2luZyBFU0MuXG4gICAqXG4gICAqICogYHRydWVgIC0gdGhlIGRyb3Bkb3duIHdpbGwgY2xvc2Ugb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgKG1lbnUpIGNsaWNrcy5cbiAgICogKiBgZmFsc2VgIC0gdGhlIGRyb3Bkb3duIGNhbiBvbmx5IGJlIGNsb3NlZCBtYW51YWxseSB2aWEgYGNsb3NlKClgIG9yIGB0b2dnbGUoKWAgbWV0aG9kcy5cbiAgICogKiBgXCJpbnNpZGVcImAgLSB0aGUgZHJvcGRvd24gd2lsbCBjbG9zZSBvbiBpbnNpZGUgbWVudSBjbGlja3MsIGJ1dCBub3Qgb3V0c2lkZSBjbGlja3MuXG4gICAqICogYFwib3V0c2lkZVwiYCAtIHRoZSBkcm9wZG93biB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2tzIGFuZCBub3Qgb24gbWVudSBjbGlja3MuXG4gICAqL1xuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnb3V0c2lkZScgfCAnaW5zaWRlJztcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZHJvcGRvd24gbWVudSBpcyBvcGVuZWQgaW5pdGlhbGx5LlxuICAgKi9cbiAgQElucHV0KCdvcGVuJykgX29wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIGRyb3Bkb3duLlxuICAgKlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGBcInRvcFwiYCwgYFwidG9wLWxlZnRcImAsIGBcInRvcC1yaWdodFwiYCwgYFwiYm90dG9tXCJgLCBgXCJib3R0b20tbGVmdFwiYCxcbiAgICogYFwiYm90dG9tLXJpZ2h0XCJgLCBgXCJsZWZ0XCJgLCBgXCJsZWZ0LXRvcFwiYCwgYFwibGVmdC1ib3R0b21cImAsIGBcInJpZ2h0XCJgLCBgXCJyaWdodC10b3BcImAsXG4gICAqIGBcInJpZ2h0LWJvdHRvbVwiYFxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHN0cmluZ3Mgb3IgYSBzdHJpbmcgd2l0aCBzcGFjZSBzZXBhcmF0ZWQgcG9zc2libGUgdmFsdWVzLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImJvdHRvbS1sZWZ0IGJvdHRvbS1yaWdodCB0b3AtbGVmdCB0b3AtcmlnaHRcImBcbiAgICpcbiAgICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuICAvKipcbiAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRyb3Bkb3duIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgKlxuICAqIEBzaW5jZSA0LjEuMFxuICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IG51bGwgfCAnYm9keSc7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBvciBkaXNhYmxlIHRoZSBkeW5hbWljIHBvc2l0aW9uaW5nLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBkeW5hbWljIHVubGVzcyB0aGUgZHJvcGRvd24gaXMgdXNlZFxuICAgKiBpbnNpZGUgYSBCb290c3RyYXAgbmF2YmFyLiBJZiB5b3UgbmVlZCBjdXN0b20gcGxhY2VtZW50IGZvciBhIGRyb3Bkb3duIGluIGEgbmF2YmFyLCBzZXQgaXQgdG9cbiAgICogZHluYW1pYyBleHBsaWNpdGx5LiBTZWUgdGhlIFtwb3NpdGlvbmluZyBvZiBkcm9wZG93bl0oIy9wb3NpdGlvbmluZyNkcm9wZG93bilcbiAgICogYW5kIHRoZSBbbmF2YmFyIGRlbW9dKC8jL2NvbXBvbmVudHMvZHJvcGRvd24vZXhhbXBsZXMjbmF2YmFyKSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKlxuICAgKiBAc2luY2UgNC4yLjBcbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXk6ICdkeW5hbWljJyB8ICdzdGF0aWMnO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgb3IgY2xvc2VkLlxuICAgKlxuICAgKiBUaGUgZXZlbnQgcGF5bG9hZCBpcyBhIGBib29sZWFuYDpcbiAgICogKiBgdHJ1ZWAgLSB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZFxuICAgKiAqIGBmYWxzZWAgLSB0aGUgZHJvcGRvd24gd2FzIGNsb3NlZFxuICAgKi9cbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogTmdiRHJvcGRvd25Db25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICBAT3B0aW9uYWwoKSBuZ2JOYXZiYXI6IE5nYk5hdmJhcikge1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuXG4gICAgdGhpcy5kaXNwbGF5ID0gbmdiTmF2YmFyID8gJ3N0YXRpYycgOiAnZHluYW1pYyc7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLl9wb3NpdGlvbk1lbnUoKTsgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2FwcGx5UGxhY2VtZW50Q2xhc3NlcygpO1xuICAgICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbnRhaW5lciAmJiB0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9hcHBseUNvbnRhaW5lcih0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMucGxhY2VtZW50ICYmICFjaGFuZ2VzLnBsYWNlbWVudC5pc0ZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBkcm9wZG93biBtZW51IGlzIG9wZW4uXG4gICAqL1xuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuOyB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBtZW51LlxuICAgKi9cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5fYXBwbHlDb250YWluZXIodGhpcy5jb250YWluZXIpO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICB0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XG4gICAgICBpZiAodGhpcy5fYW5jaG9yKSB7XG4gICAgICAgIHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2xvc2VIYW5kbGVycygpIHtcbiAgICBuZ2JBdXRvQ2xvc2UoXG4gICAgICAgIHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsIHRoaXMuYXV0b0Nsb3NlLFxuICAgICAgICAoc291cmNlOiBTT1VSQ0UpID0+IHtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgaWYgKHNvdXJjZSA9PT0gU09VUkNFLkVTQ0FQRSkge1xuICAgICAgICAgICAgdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMuX2Nsb3NlZCQsIHRoaXMuX21lbnUgPyBbdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50XSA6IFtdLCB0aGlzLl9hbmNob3IgPyBbdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnRdIDogW10sXG4gICAgICAgICcuZHJvcGRvd24taXRlbSwuZHJvcGRvd24tZGl2aWRlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgZHJvcGRvd24gbWVudS5cbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZXNldENvbnRhaW5lcigpO1xuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gbWVudS5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9yZXNldENvbnRhaW5lcigpO1xuXG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG4gICAgY29uc3QgaXRlbUVsZW1lbnRzID0gdGhpcy5fZ2V0TWVudUVsZW1lbnRzKCk7XG5cbiAgICBsZXQgcG9zaXRpb24gPSAtMTtcbiAgICBsZXQgaXRlbUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgaXNFdmVudEZyb21Ub2dnbGUgPSB0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZShldmVudCk7XG5cbiAgICBpZiAoIWlzRXZlbnRGcm9tVG9nZ2xlICYmIGl0ZW1FbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGl0ZW1FbGVtZW50cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgaXRlbUVsZW1lbnQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2luZyBvbiBFbnRlciAvIFNwYWNlXG4gICAgaWYgKGtleSA9PT0gS2V5LlNwYWNlIHx8IGtleSA9PT0gS2V5LkVudGVyKSB7XG4gICAgICBpZiAoaXRlbUVsZW1lbnQgJiYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlIHx8IHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJykpIHtcbiAgICAgICAgLy8gSXRlbSBpcyBlaXRoZXIgYSBidXR0b24gb3IgYSBsaW5rLCBzbyBjbGljayB3aWxsIGJlIHRyaWdnZXJlZCBieSB0aGUgYnJvd3NlciBvbiBFbnRlciBvciBTcGFjZS5cbiAgICAgICAgLy8gU28gd2UgaGF2ZSB0byByZWdpc3RlciBhIG9uZS10aW1lIGNsaWNrIGhhbmRsZXIgdGhhdCB3aWxsIGZpcmUgYWZ0ZXIgYW55IHVzZXIgZGVmaW5lZCBjbGljayBoYW5kbGVyc1xuICAgICAgICAvLyB0byBjbG9zZSB0aGUgZHJvcGRvd25cbiAgICAgICAgZnJvbUV2ZW50KGl0ZW1FbGVtZW50LCAnY2xpY2snKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09IEtleS5UYWIpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgdGhpcy5pc09wZW4oKSAmJiB0aGlzLmF1dG9DbG9zZSkge1xuICAgICAgICBpZiAodGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgLyogVGhpcyBjYXNlIGlzIHNwZWNpYWw6IHVzZXIgaXMgdXNpbmcgW1RhYl0gZnJvbSB0aGUgYW5jaG9yL3RvZ2dsZS5cbiAgICAgICAgICAgICAgIFVzZXIgZXhwZWN0cyB0aGUgbmV4dCBmb2N1c2FibGUgZWxlbWVudCBpbiB0aGUgZHJvcGRvd24gbWVudSB0byBnZXQgZm9jdXMuXG4gICAgICAgICAgICAgICBCdXQgdGhlIG1lbnUgaXMgbm90IGEgc2libGluZyB0byBhbmNob3IvdG9nZ2xlLCBpdCBpcyBhdCB0aGUgZW5kIG9mIHRoZSBib2R5LlxuICAgICAgICAgICAgICAgVHJpY2sgaXMgdG8gc3luY2hyb25vdXNseSBmb2N1cyB0aGUgbWVudSBlbGVtZW50LCBhbmQgbGV0IHRoZSBba2V5ZG93bi5UYWJdIGdvXG4gICAgICAgICAgICAgICBzbyB0aGF0IGJyb3dzZXIgd2lsbCBmb2N1cyB0aGUgcHJvcGVyIGVsZW1lbnQgKGZpcnN0IG9uZSBmb2N1c2FibGUgaW4gdGhlIG1lbnUpICovXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICAgICAgdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSB0aGlzLl9tZW51Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpO1xuICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBldmVudC50YXJnZXQgPT09IGZvY3VzYWJsZUVsZW1lbnRzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFldmVudC5zaGlmdEtleSAmJiBldmVudC50YXJnZXQgPT09IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCAnZm9jdXNvdXQnKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoe3JlbGF0ZWRUYXJnZXR9KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhyZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvcGVuaW5nIC8gbmF2aWdhdGluZ1xuICAgIGlmIChpc0V2ZW50RnJvbVRvZ2dsZSB8fCBpdGVtRWxlbWVudCkge1xuICAgICAgdGhpcy5vcGVuKCk7XG5cbiAgICAgIGlmIChpdGVtRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiArIDEsIGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgICAgICBpZiAodGhpcy5faXNEcm9wdXAoKSAmJiBwb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgcG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KHBvc2l0aW9uIC0gMSwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICAgICAgcG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1FbGVtZW50c1twb3NpdGlvbl0uZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNEcm9wdXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wdXAnKTsgfVxuXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgY29uc3QgbWVudSA9IHRoaXMuX21lbnU7XG4gICAgaWYgKG1lbnUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gbWVudS5tZW51SXRlbXMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uZGlzYWJsZWQpLm1hcChpdGVtID0+IGl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcbiAgICBjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcbiAgICBpZiAodGhpcy5pc09wZW4oKSAmJiBtZW51KSB7XG4gICAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoXG4gICAgICAgICAgdGhpcy5kaXNwbGF5ID09PSAnZHluYW1pYycgPyBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LCB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlbWVudCwgdGhpcy5jb250YWluZXIgPT09ICdib2R5JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Rmlyc3RQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRGaXJzdFBsYWNlbWVudChwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5KTogUGxhY2VtZW50IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwbGFjZW1lbnQpID8gcGxhY2VtZW50WzBdIDogcGxhY2VtZW50LnNwbGl0KCcgJylbMF0gYXMgUGxhY2VtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICBpZiAodGhpcy5fbWVudSkge1xuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudDtcblxuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bk1lbnVFbGVtZW50KTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZVN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICdwb3NpdGlvbicpO1xuICAgICAgcmVuZGVyZXIucmVtb3ZlU3R5bGUoZHJvcGRvd25NZW51RWxlbWVudCwgJ3RyYW5zZm9ybScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYm9keUNvbnRhaW5lcikge1xuICAgICAgcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZG9jdW1lbnQuYm9keSwgdGhpcy5fYm9keUNvbnRhaW5lcik7XG4gICAgICB0aGlzLl9ib2R5Q29udGFpbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUNvbnRhaW5lcihjb250YWluZXI6IG51bGwgfCAnYm9keScgPSBudWxsKSB7XG4gICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcbiAgICBpZiAoY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgICBjb25zdCBkcm9wZG93bk1lbnVFbGVtZW50ID0gdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXIgPSB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAvLyBPdmVycmlkZSBzb21lIHN0eWxlcyB0byBoYXZlIHRoZSBwb3NpdGlvbm5pbmcgd29ya2luZ1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoYm9keUNvbnRhaW5lciwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShkcm9wZG93bk1lbnVFbGVtZW50LCAncG9zaXRpb24nLCAnc3RhdGljJyk7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShib2R5Q29udGFpbmVyLCAnei1pbmRleCcsICcxMDUwJyk7XG5cbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGJvZHlDb250YWluZXIsIGRyb3Bkb3duTWVudUVsZW1lbnQpO1xuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZG9jdW1lbnQuYm9keSwgYm9keUNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlQbGFjZW1lbnRDbGFzc2VzKHBsYWNlbWVudD86IFBsYWNlbWVudCB8IG51bGwpIHtcbiAgICBjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcbiAgICBpZiAobWVudSkge1xuICAgICAgaWYgKCFwbGFjZW1lbnQpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gdGhpcy5fZ2V0Rmlyc3RQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duRWxlbWVudCwgJ2Ryb3B1cCcpO1xuICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZHJvcGRvd25FbGVtZW50LCAnZHJvcGRvd24nKTtcbiAgICAgIG1lbnUucGxhY2VtZW50ID0gdGhpcy5kaXNwbGF5ID09PSAnc3RhdGljJyA/IG51bGwgOiBwbGFjZW1lbnQ7XG5cbiAgICAgIC8qXG4gICAgICAqIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XG4gICAgICAqIGluIGNhc2Ugb2YgdG9wIHVzZSB1cC1hcnJvdyBvciBkb3duLWFycm93IG90aGVyd2lzZVxuICAgICAgKi9cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ2xhc3MgPSBwbGFjZW1lbnQuc2VhcmNoKCdedG9wJykgIT09IC0xID8gJ2Ryb3B1cCcgOiAnZHJvcGRvd24nO1xuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bkNsYXNzKTtcblxuICAgICAgY29uc3QgYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXI7XG4gICAgICBpZiAoYm9keUNvbnRhaW5lcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5Q29udGFpbmVyLCAnZHJvcHVwJyk7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wZG93bicpO1xuICAgICAgICByZW5kZXJlci5hZGRDbGFzcyhib2R5Q29udGFpbmVyLCBkcm9wZG93bkNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==