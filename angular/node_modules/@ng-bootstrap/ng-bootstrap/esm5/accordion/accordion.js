import { __decorate, __param } from "tslib";
import { AfterContentChecked, Component, ContentChildren, Directive, EventEmitter, Host, Input, Optional, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isString } from '../util/util';
import { NgbAccordionConfig } from './accordion-config';
var nextId = 0;
/**
 * A directive that wraps an accordion panel header with any HTML markup and a toggling button
 * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
 * See the [header customization demo](#/components/accordion/examples#header) for more details.
 *
 * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
 *
 * @since 4.1.0
 */
var NgbPanelHeader = /** @class */ (function () {
    function NgbPanelHeader(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelHeader.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbPanelHeader = __decorate([
        Directive({ selector: 'ng-template[ngbPanelHeader]' })
    ], NgbPanelHeader);
    return NgbPanelHeader;
}());
export { NgbPanelHeader };
/**
 * A directive that wraps only the panel title with HTML markup inside.
 *
 * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
 */
var NgbPanelTitle = /** @class */ (function () {
    function NgbPanelTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbPanelTitle = __decorate([
        Directive({ selector: 'ng-template[ngbPanelTitle]' })
    ], NgbPanelTitle);
    return NgbPanelTitle;
}());
export { NgbPanelTitle };
/**
 * A directive that wraps the accordion panel content.
 */
var NgbPanelContent = /** @class */ (function () {
    function NgbPanelContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbPanelContent = __decorate([
        Directive({ selector: 'ng-template[ngbPanelContent]' })
    ], NgbPanelContent);
    return NgbPanelContent;
}());
export { NgbPanelContent };
/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 */
var NgbPanel = /** @class */ (function () {
    function NgbPanel() {
        /**
         *  If `true`, the panel is disabled an can't be toggled.
         */
        this.disabled = false;
        /**
         *  An optional id for the panel that must be unique on the page.
         *
         *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
         */
        this.id = "ngb-panel-" + nextId++;
        this.isOpen = false;
    }
    NgbPanel.prototype.ngAfterContentChecked = function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.headerTpl = this.headerTpls.first;
        this.contentTpl = this.contentTpls.first;
    };
    __decorate([
        Input()
    ], NgbPanel.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgbPanel.prototype, "id", void 0);
    __decorate([
        Input()
    ], NgbPanel.prototype, "title", void 0);
    __decorate([
        Input()
    ], NgbPanel.prototype, "type", void 0);
    __decorate([
        Input()
    ], NgbPanel.prototype, "cardClass", void 0);
    __decorate([
        ContentChildren(NgbPanelTitle, { descendants: false })
    ], NgbPanel.prototype, "titleTpls", void 0);
    __decorate([
        ContentChildren(NgbPanelHeader, { descendants: false })
    ], NgbPanel.prototype, "headerTpls", void 0);
    __decorate([
        ContentChildren(NgbPanelContent, { descendants: false })
    ], NgbPanel.prototype, "contentTpls", void 0);
    NgbPanel = __decorate([
        Directive({ selector: 'ngb-panel' })
    ], NgbPanel);
    return NgbPanel;
}());
export { NgbPanel };
/**
 * Accordion is a collection of collapsible panels (bootstrap cards).
 *
 * It can ensure only one panel is opened at a time and allows to customize panel
 * headers.
 */
var NgbAccordion = /** @class */ (function () {
    function NgbAccordion(config) {
        /**
         * An array or comma separated strings of panel ids that should be opened **initially**.
         *
         * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
         * the `(panelChange)` event.
         */
        this.activeIds = [];
        /**
         * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
         */
        this.destroyOnHide = true;
        /**
         * Event emitted right before the panel toggle happens.
         *
         * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
         */
        this.panelChange = new EventEmitter();
        this.type = config.type;
        this.closeOtherPanels = config.closeOthers;
    }
    /**
     * Checks if a panel with a given id is expanded.
     */
    NgbAccordion.prototype.isExpanded = function (panelId) { return this.activeIds.indexOf(panelId) > -1; };
    /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     */
    NgbAccordion.prototype.expand = function (panelId) { this._changeOpenState(this._findPanelById(panelId), true); };
    /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     */
    NgbAccordion.prototype.expandAll = function () {
        var _this = this;
        if (this.closeOtherPanels) {
            if (this.activeIds.length === 0 && this.panels.length) {
                this._changeOpenState(this.panels.first, true);
            }
        }
        else {
            this.panels.forEach(function (panel) { return _this._changeOpenState(panel, true); });
        }
    };
    /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     */
    NgbAccordion.prototype.collapse = function (panelId) { this._changeOpenState(this._findPanelById(panelId), false); };
    /**
     * Collapses all opened panels.
     */
    NgbAccordion.prototype.collapseAll = function () {
        var _this = this;
        this.panels.forEach(function (panel) { _this._changeOpenState(panel, false); });
    };
    /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     */
    NgbAccordion.prototype.toggle = function (panelId) {
        var panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    };
    NgbAccordion.prototype.ngAfterContentChecked = function () {
        var _this = this;
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach(function (panel) { return panel.isOpen = !panel.disabled && _this.activeIds.indexOf(panel.id) > -1; });
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    };
    NgbAccordion.prototype._changeOpenState = function (panel, nextState) {
        if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
            var defaultPrevented_1 = false;
            this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: function () { defaultPrevented_1 = true; } });
            if (!defaultPrevented_1) {
                panel.isOpen = nextState;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
            }
        }
    };
    NgbAccordion.prototype._closeOthers = function (panelId) {
        this.panels.forEach(function (panel) {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        });
    };
    NgbAccordion.prototype._findPanelById = function (panelId) { return this.panels.find(function (p) { return p.id === panelId; }) || null; };
    NgbAccordion.prototype._updateActiveIds = function () {
        this.activeIds = this.panels.filter(function (panel) { return panel.isOpen && !panel.disabled; }).map(function (panel) { return panel.id; });
    };
    NgbAccordion.ctorParameters = function () { return [
        { type: NgbAccordionConfig }
    ]; };
    __decorate([
        ContentChildren(NgbPanel)
    ], NgbAccordion.prototype, "panels", void 0);
    __decorate([
        Input()
    ], NgbAccordion.prototype, "activeIds", void 0);
    __decorate([
        Input('closeOthers')
    ], NgbAccordion.prototype, "closeOtherPanels", void 0);
    __decorate([
        Input()
    ], NgbAccordion.prototype, "destroyOnHide", void 0);
    __decorate([
        Input()
    ], NgbAccordion.prototype, "type", void 0);
    __decorate([
        Output()
    ], NgbAccordion.prototype, "panelChange", void 0);
    NgbAccordion = __decorate([
        Component({
            selector: 'ngb-accordion',
            exportAs: 'ngbAccordion',
            encapsulation: ViewEncapsulation.None,
            host: { 'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
            template: "\n    <ng-template #t ngbPanelHeader let-panel>\n      <button class=\"btn btn-link\" [ngbPanelToggle]=\"panel\">\n        {{panel.title}}<ng-template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></ng-template>\n      </button>\n    </ng-template>\n    <ng-template ngFor let-panel [ngForOf]=\"panels\">\n      <div [class]=\"'card ' + (panel.cardClass || '')\">\n        <div role=\"tab\" id=\"{{panel.id}}-header\" [class]=\"'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')\">\n          <ng-template [ngTemplateOutlet]=\"panel.headerTpl?.templateRef || t\"\n                       [ngTemplateOutletContext]=\"{$implicit: panel, opened: panel.isOpen}\"></ng-template>\n        </div>\n        <div id=\"{{panel.id}}\" role=\"tabpanel\" [attr.aria-labelledby]=\"panel.id + '-header'\"\n             class=\"collapse\" [class.show]=\"panel.isOpen\" *ngIf=\"!destroyOnHide || panel.isOpen\">\n          <div class=\"card-body\">\n               <ng-template [ngTemplateOutlet]=\"panel.contentTpl?.templateRef || null\"></ng-template>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
        })
    ], NgbAccordion);
    return NgbAccordion;
}());
export { NgbAccordion };
/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * @since 4.1.0
 */
var NgbPanelToggle = /** @class */ (function () {
    function NgbPanelToggle(accordion, panel) {
        this.accordion = accordion;
        this.panel = panel;
    }
    Object.defineProperty(NgbPanelToggle.prototype, "ngbPanelToggle", {
        set: function (panel) {
            if (panel) {
                this.panel = panel;
            }
        },
        enumerable: true,
        configurable: true
    });
    NgbPanelToggle.ctorParameters = function () { return [
        { type: NgbAccordion },
        { type: NgbPanel, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    __decorate([
        Input()
    ], NgbPanelToggle.prototype, "ngbPanelToggle", null);
    NgbPanelToggle = __decorate([
        Directive({
            selector: 'button[ngbPanelToggle]',
            host: {
                'type': 'button',
                '[disabled]': 'panel.disabled',
                '[class.collapsed]': '!panel.isOpen',
                '[attr.aria-expanded]': 'panel.isOpen',
                '[attr.aria-controls]': 'panel.id',
                '(click)': 'accordion.toggle(panel.id)'
            }
        }),
        __param(1, Optional()), __param(1, Host())
    ], NgbPanelToggle);
    return NgbPanelToggle;
}());
export { NgbPanelToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJhY2NvcmRpb24vYWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFjZjs7Ozs7Ozs7R0FRRztBQUVIO0lBQ0Usd0JBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUFHLENBQUM7O2dCQUFwQixXQUFXOztJQURoQyxjQUFjO1FBRDFCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw2QkFBNkIsRUFBQyxDQUFDO09BQ3hDLGNBQWMsQ0FFMUI7SUFBRCxxQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLGNBQWM7QUFJM0I7Ozs7R0FJRztBQUVIO0lBQ0UsdUJBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUFHLENBQUM7O2dCQUFwQixXQUFXOztJQURoQyxhQUFhO1FBRHpCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQyxDQUFDO09BQ3ZDLGFBQWEsQ0FFekI7SUFBRCxvQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLGFBQWE7QUFJMUI7O0dBRUc7QUFFSDtJQUNFLHlCQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOztnQkFBcEIsV0FBVzs7SUFEaEMsZUFBZTtRQUQzQixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsOEJBQThCLEVBQUMsQ0FBQztPQUN6QyxlQUFlLENBRTNCO0lBQUQsc0JBQUM7Q0FBQSxBQUZELElBRUM7U0FGWSxlQUFlO0FBSTVCOztHQUVHO0FBRUg7SUFBQTtRQUNFOztXQUVHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQjs7OztXQUlHO1FBQ00sT0FBRSxHQUFHLGVBQWEsTUFBTSxFQUFJLENBQUM7UUFFdEMsV0FBTSxHQUFHLEtBQUssQ0FBQztJQXlDakIsQ0FBQztJQVRDLHdDQUFxQixHQUFyQjtRQUNFLDhGQUE4RjtRQUM5Riw4RUFBOEU7UUFDOUUsaUVBQWlFO1FBQ2pFLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBakRRO1FBQVIsS0FBSyxFQUFFOzhDQUFrQjtJQU9qQjtRQUFSLEtBQUssRUFBRTt3Q0FBOEI7SUFTN0I7UUFBUixLQUFLLEVBQUU7MkNBQWU7SUFRZDtRQUFSLEtBQUssRUFBRTswQ0FBYztJQU9iO1FBQVIsS0FBSyxFQUFFOytDQUFtQjtJQU0yQjtRQUFyRCxlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQyxDQUFDOytDQUFxQztJQUNuQztRQUF0RCxlQUFlLENBQUMsY0FBYyxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQyxDQUFDO2dEQUF1QztJQUNyQztRQUF2RCxlQUFlLENBQUMsZUFBZSxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQyxDQUFDO2lEQUF5QztJQTNDckYsUUFBUTtRQURwQixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFDLENBQUM7T0FDdEIsUUFBUSxDQXNEcEI7SUFBRCxlQUFDO0NBQUEsQUF0REQsSUFzREM7U0F0RFksUUFBUTtBQThFckI7Ozs7O0dBS0c7QUE0Qkg7SUFzQ0Usc0JBQVksTUFBMEI7UUFuQ3RDOzs7OztXQUtHO1FBQ00sY0FBUyxHQUErQixFQUFFLENBQUM7UUFTcEQ7O1dBRUc7UUFDTSxrQkFBYSxHQUFHLElBQUksQ0FBQztRQVU5Qjs7OztXQUlHO1FBQ08sZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztRQUc5RCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUNBQVUsR0FBVixVQUFXLE9BQWUsSUFBYSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRjs7OztPQUlHO0lBQ0gsNkJBQU0sR0FBTixVQUFPLE9BQWUsSUFBVSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUY7Ozs7T0FJRztJQUNILGdDQUFTLEdBQVQ7UUFBQSxpQkFRQztRQVBDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDaEQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtCQUFRLEdBQVIsVUFBUyxPQUFlLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpGOztPQUVHO0lBQ0gsa0NBQVcsR0FBWDtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLElBQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsNkJBQU0sR0FBTixVQUFPLE9BQWU7UUFDcEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQsNENBQXFCLEdBQXJCO1FBQUEsaUJBY0M7UUFiQyxvQkFBb0I7UUFDcEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEQ7UUFFRCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXZFLENBQXVFLENBQUMsQ0FBQztRQUV0RyxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVPLHVDQUFnQixHQUF4QixVQUF5QixLQUFzQixFQUFFLFNBQWtCO1FBQ2pFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDbEUsSUFBSSxrQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2pCLEVBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsY0FBUSxrQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBRW5HLElBQUksQ0FBQyxrQkFBZ0IsRUFBRTtnQkFDckIsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBRXpCLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzdCO2dCQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sbUNBQVksR0FBcEIsVUFBcUIsT0FBZTtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDdkIsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8sRUFBRTtnQkFDeEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxxQ0FBYyxHQUF0QixVQUF1QixPQUFlLElBQXFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sRUFBaEIsQ0FBZ0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUcsdUNBQWdCLEdBQXhCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUEvQixDQUErQixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsRUFBUixDQUFRLENBQUMsQ0FBQztJQUN2RyxDQUFDOztnQkF4R21CLGtCQUFrQjs7SUFyQ1g7UUFBMUIsZUFBZSxDQUFDLFFBQVEsQ0FBQztnREFBNkI7SUFROUM7UUFBUixLQUFLLEVBQUU7bURBQTRDO0lBTzlCO1FBQXJCLEtBQUssQ0FBQyxhQUFhLENBQUM7MERBQTJCO0lBS3ZDO1FBQVIsS0FBSyxFQUFFO3VEQUFzQjtJQVFyQjtRQUFSLEtBQUssRUFBRTs4Q0FBYztJQU9aO1FBQVQsTUFBTSxFQUFFO3FEQUF1RDtJQXBDckQsWUFBWTtRQTNCeEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDZCQUE2QixFQUFFLG1CQUFtQixFQUFDO1lBQ25HLFFBQVEsRUFBRSxnbkNBb0JUO1NBQ0YsQ0FBQztPQUNXLFlBQVksQ0ErSXhCO0lBQUQsbUJBQUM7Q0FBQSxBQS9JRCxJQStJQztTQS9JWSxZQUFZO0FBaUp6Qjs7Ozs7O0dBTUc7QUFZSDtJQVVFLHdCQUFtQixTQUF1QixFQUE2QixLQUFlO1FBQW5FLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFBNkIsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFHLENBQUM7SUFOMUYsc0JBQUksMENBQWM7YUFBbEIsVUFBbUIsS0FBZTtZQUNoQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNwQjtRQUNILENBQUM7OztPQUFBOztnQkFFNkIsWUFBWTtnQkFBb0MsUUFBUSx1QkFBekMsUUFBUSxZQUFJLElBQUk7O0lBTjdEO1FBREMsS0FBSyxFQUFFO3dEQUtQO0lBUlUsY0FBYztRQVgxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsWUFBWSxFQUFFLGdCQUFnQjtnQkFDOUIsbUJBQW1CLEVBQUUsZUFBZTtnQkFDcEMsc0JBQXNCLEVBQUUsY0FBYztnQkFDdEMsc0JBQXNCLEVBQUUsVUFBVTtnQkFDbEMsU0FBUyxFQUFFLDRCQUE0QjthQUN4QztTQUNGLENBQUM7UUFXNkMsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsSUFBSSxFQUFFLENBQUE7T0FWcEQsY0FBYyxDQVcxQjtJQUFELHFCQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5pbXBvcnQge05nYkFjY29yZGlvbkNvbmZpZ30gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogVGhlIGNvbnRleHQgZm9yIHRoZSBbTmdiUGFuZWxIZWFkZXJdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsSGVhZGVyKSB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhbmVsSGVhZGVyQ29udGV4dCB7XG4gIC8qKlxuICAgKiBgVHJ1ZWAgaWYgY3VycmVudCBwYW5lbCBpcyBvcGVuZWRcbiAgICovXG4gIG9wZW5lZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGFuIGFjY29yZGlvbiBwYW5lbCBoZWFkZXIgd2l0aCBhbnkgSFRNTCBtYXJrdXAgYW5kIGEgdG9nZ2xpbmcgYnV0dG9uXG4gKiBtYXJrZWQgd2l0aCBbYE5nYlBhbmVsVG9nZ2xlYF0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiUGFuZWxUb2dnbGUpLlxuICogU2VlIHRoZSBbaGVhZGVyIGN1c3RvbWl6YXRpb24gZGVtb10oIy9jb21wb25lbnRzL2FjY29yZGlvbi9leGFtcGxlcyNoZWFkZXIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IGNhbiBhbHNvIHVzZSBbYE5nYlBhbmVsVGl0bGVgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbFRpdGxlKSB0byBjdXN0b21pemUgb25seSB0aGUgcGFuZWwgdGl0bGUuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxIZWFkZXJdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxIZWFkZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBvbmx5IHRoZSBwYW5lbCB0aXRsZSB3aXRoIEhUTUwgbWFya3VwIGluc2lkZS5cbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIFtgTmdiUGFuZWxIZWFkZXJgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbEhlYWRlcikgdG8gY3VzdG9taXplIHRoZSBmdWxsIHBhbmVsIGhlYWRlci5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbFRpdGxlXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsVGl0bGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyB0aGUgYWNjb3JkaW9uIHBhbmVsIGNvbnRlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsQ29udGVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGFuIGluZGl2aWR1YWwgYWNjb3JkaW9uIHBhbmVsIHdpdGggdGl0bGUgYW5kIGNvbGxhcHNpYmxlIGNvbnRlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXBhbmVsJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgLyoqXG4gICAqICBJZiBgdHJ1ZWAsIHRoZSBwYW5lbCBpcyBkaXNhYmxlZCBhbiBjYW4ndCBiZSB0b2dnbGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIEFuIG9wdGlvbmFsIGlkIGZvciB0aGUgcGFuZWwgdGhhdCBtdXN0IGJlIHVuaXF1ZSBvbiB0aGUgcGFnZS5cbiAgICpcbiAgICogIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpbiB0aGUgYG5nYi1wYW5lbC14eHhgIGZvcm1hdC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi1wYW5lbC0ke25leHRJZCsrfWA7XG5cbiAgaXNPcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBUaGUgcGFuZWwgdGl0bGUuXG4gICAqXG4gICAqICBZb3UgY2FuIGFsdGVybmF0aXZlbHkgdXNlIFtgTmdiUGFuZWxUaXRsZWBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsVGl0bGUpIHRvIHNldCBwYW5lbCB0aXRsZS5cbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIGN1cnJlbnQgcGFuZWwuXG4gICAqXG4gICAqIEJvb3RzdHJhcCBwcm92aWRlcyBzdHlsZXMgZm9yIHRoZSBmb2xsb3dpbmcgdHlwZXM6IGAnc3VjY2VzcydgLCBgJ2luZm8nYCwgYCd3YXJuaW5nJ2AsIGAnZGFuZ2VyJ2AsIGAncHJpbWFyeSdgLFxuICAgKiBgJ3NlY29uZGFyeSdgLCBgJ2xpZ2h0J2AgYW5kIGAnZGFyaydgLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIHRoZSBhY2NvcmRpb24gY2FyZCBlbGVtZW50IHRoYXQgd3JhcHMgYm90aCBwYW5lbCB0aXRsZSBhbmQgY29udGVudC5cbiAgICpcbiAgICogQHNpbmNlIDUuMy4wXG4gICAqL1xuICBASW5wdXQoKSBjYXJkQ2xhc3M6IHN0cmluZztcblxuICB0aXRsZVRwbDogTmdiUGFuZWxUaXRsZTtcbiAgaGVhZGVyVHBsOiBOZ2JQYW5lbEhlYWRlcjtcbiAgY29udGVudFRwbDogTmdiUGFuZWxDb250ZW50O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxUaXRsZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIHRpdGxlVHBsczogUXVlcnlMaXN0PE5nYlBhbmVsVGl0bGU+O1xuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsSGVhZGVyLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaGVhZGVyVHBsczogUXVlcnlMaXN0PE5nYlBhbmVsSGVhZGVyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbENvbnRlbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYlBhbmVsQ29udGVudD47XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cbiAgICAvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG4gICAgdGhpcy50aXRsZVRwbCA9IHRoaXMudGl0bGVUcGxzLmZpcnN0O1xuICAgIHRoaXMuaGVhZGVyVHBsID0gdGhpcy5oZWFkZXJUcGxzLmZpcnN0O1xuICAgIHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0b2dnbGluZyBhbiBhY2NvcmRpb24gcGFuZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFuZWxDaGFuZ2VFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhlIGFjY29yZGlvbiBwYW5lbCB0aGF0IGlzIGJlaW5nIHRvZ2dsZWQuXG4gICAqL1xuICBwYW5lbElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuZXh0IHN0YXRlIG9mIHRoZSBwYW5lbC5cbiAgICpcbiAgICogYHRydWVgIGlmIGl0IHdpbGwgYmUgb3BlbmVkLCBgZmFsc2VgIGlmIGNsb3NlZC5cbiAgICovXG4gIG5leHRTdGF0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIHdpbGwgcHJldmVudCBwYW5lbCB0b2dnbGluZy5cbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEFjY29yZGlvbiBpcyBhIGNvbGxlY3Rpb24gb2YgY29sbGFwc2libGUgcGFuZWxzIChib290c3RyYXAgY2FyZHMpLlxuICpcbiAqIEl0IGNhbiBlbnN1cmUgb25seSBvbmUgcGFuZWwgaXMgb3BlbmVkIGF0IGEgdGltZSBhbmQgYWxsb3dzIHRvIGN1c3RvbWl6ZSBwYW5lbFxuICogaGVhZGVycy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWFjY29yZGlvbicsXG4gIGV4cG9ydEFzOiAnbmdiQWNjb3JkaW9uJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDogeydjbGFzcyc6ICdhY2NvcmRpb24nLCAncm9sZSc6ICd0YWJsaXN0JywgJ1thdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlXSc6ICchY2xvc2VPdGhlclBhbmVscyd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdCBuZ2JQYW5lbEhlYWRlciBsZXQtcGFuZWw+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW25nYlBhbmVsVG9nZ2xlXT1cInBhbmVsXCI+XG4gICAgICAgIHt7cGFuZWwudGl0bGV9fTxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC50aXRsZVRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXBhbmVsIFtuZ0Zvck9mXT1cInBhbmVsc1wiPlxuICAgICAgPGRpdiBbY2xhc3NdPVwiJ2NhcmQgJyArIChwYW5lbC5jYXJkQ2xhc3MgfHwgJycpXCI+XG4gICAgICAgIDxkaXYgcm9sZT1cInRhYlwiIGlkPVwie3twYW5lbC5pZH19LWhlYWRlclwiIFtjbGFzc109XCInY2FyZC1oZWFkZXIgJyArIChwYW5lbC50eXBlID8gJ2JnLScrcGFuZWwudHlwZTogdHlwZSA/ICdiZy0nK3R5cGUgOiAnJylcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwuaGVhZGVyVHBsPy50ZW1wbGF0ZVJlZiB8fCB0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IHBhbmVsLCBvcGVuZWQ6IHBhbmVsLmlzT3Blbn1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cInt7cGFuZWwuaWR9fVwiIHJvbGU9XCJ0YWJwYW5lbFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJwYW5lbC5pZCArICctaGVhZGVyJ1wiXG4gICAgICAgICAgICAgY2xhc3M9XCJjb2xsYXBzZVwiIFtjbGFzcy5zaG93XT1cInBhbmVsLmlzT3BlblwiICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgcGFuZWwuaXNPcGVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmIHx8IG51bGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWwpIHBhbmVsczogUXVlcnlMaXN0PE5nYlBhbmVsPjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb3IgY29tbWEgc2VwYXJhdGVkIHN0cmluZ3Mgb2YgcGFuZWwgaWRzIHRoYXQgc2hvdWxkIGJlIG9wZW5lZCAqKmluaXRpYWxseSoqLlxuICAgKlxuICAgKiBGb3Igc3Vic2VxdWVudCBjaGFuZ2VzIHVzZSBtZXRob2RzIGxpa2UgYGV4cGFuZCgpYCwgYGNvbGxhcHNlKClgLCBldGMuIGFuZFxuICAgKiB0aGUgYChwYW5lbENoYW5nZSlgIGV2ZW50LlxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWRzOiBzdHJpbmcgfCByZWFkb25seSBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiAgSWYgYHRydWVgLCBvbmx5IG9uZSBwYW5lbCBjb3VsZCBiZSBvcGVuZWQgYXQgYSB0aW1lLlxuICAgKlxuICAgKiAgT3BlbmluZyBhIG5ldyBwYW5lbCB3aWxsIGNsb3NlIG90aGVycy5cbiAgICovXG4gIEBJbnB1dCgnY2xvc2VPdGhlcnMnKSBjbG9zZU90aGVyUGFuZWxzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHBhbmVsIGNvbnRlbnQgd2lsbCBiZSBkZXRhY2hlZCBmcm9tIERPTSBhbmQgbm90IHNpbXBseSBoaWRkZW4gd2hlbiB0aGUgcGFuZWwgaXMgY29sbGFwc2VkLlxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgcGFuZWxzLlxuICAgKlxuICAgKiBCb290c3RyYXAgcHJvdmlkZXMgc3R5bGVzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOiBgJ3N1Y2Nlc3MnYCwgYCdpbmZvJ2AsIGAnd2FybmluZydgLCBgJ2RhbmdlcidgLCBgJ3ByaW1hcnknYCxcbiAgICogYCdzZWNvbmRhcnknYCwgYCdsaWdodCdgIGFuZCBgJ2RhcmsnYC5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIHBhbmVsIHRvZ2dsZSBoYXBwZW5zLlxuICAgKlxuICAgKiBTZWUgW05nYlBhbmVsQ2hhbmdlRXZlbnRdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsQ2hhbmdlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgcGFuZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlBhbmVsQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBY2NvcmRpb25Db25maWcpIHtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgICB0aGlzLmNsb3NlT3RoZXJQYW5lbHMgPSBjb25maWcuY2xvc2VPdGhlcnM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkIGlzIGV4cGFuZGVkLlxuICAgKi9cbiAgaXNFeHBhbmRlZChwYW5lbElkOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuYWN0aXZlSWRzLmluZGV4T2YocGFuZWxJZCkgPiAtMTsgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLlxuICAgKlxuICAgKiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBhbHJlYWR5IGV4cGFuZGVkIG9yIGRpc2FibGVkLlxuICAgKi9cbiAgZXhwYW5kKHBhbmVsSWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKSwgdHJ1ZSk7IH1cblxuICAvKipcbiAgICogRXhwYW5kcyBhbGwgcGFuZWxzLCBpZiBgW2Nsb3NlT3RoZXJzXWAgaXMgYGZhbHNlYC5cbiAgICpcbiAgICogSWYgYFtjbG9zZU90aGVyc11gIGlzIGB0cnVlYCwgaXQgd2lsbCBleHBhbmQgdGhlIGZpcnN0IHBhbmVsLCB1bmxlc3MgdGhlcmUgaXMgYWxyZWFkeSBhIHBhbmVsIG9wZW5lZC5cbiAgICovXG4gIGV4cGFuZEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID09PSAwICYmIHRoaXMucGFuZWxzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5wYW5lbHMuZmlyc3QsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZShwYW5lbCwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYSBwYW5lbCB3aXRoIHRoZSBnaXZlbiBpZC5cbiAgICpcbiAgICogSGFzIG5vIGVmZmVjdCBpZiB0aGUgcGFuZWwgaXMgYWxyZWFkeSBjb2xsYXBzZWQgb3IgZGlzYWJsZWQuXG4gICAqL1xuICBjb2xsYXBzZShwYW5lbElkOiBzdHJpbmcpIHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIGZhbHNlKTsgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYWxsIG9wZW5lZCBwYW5lbHMuXG4gICAqL1xuICBjb2xsYXBzZUFsbCgpIHtcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4geyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsIGZhbHNlKTsgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhIHBhbmVsIHdpdGggdGhlIGdpdmVuIGlkLlxuICAgKlxuICAgKiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIHRvZ2dsZShwYW5lbElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCk7XG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsICFwYW5lbC5pc09wZW4pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBhY3RpdmUgaWQgdXBkYXRlc1xuICAgIGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5hY3RpdmVJZHMuc3BsaXQoL1xccyosXFxzKi8pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBwYW5lbHMgb3BlbiBzdGF0ZXNcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmlzT3BlbiA9ICFwYW5lbC5kaXNhYmxlZCAmJiB0aGlzLmFjdGl2ZUlkcy5pbmRleE9mKHBhbmVsLmlkKSA+IC0xKTtcblxuICAgIC8vIGNsb3NlT3RoZXJzIHVwZGF0ZXNcbiAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID4gMSAmJiB0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcbiAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHRoaXMuYWN0aXZlSWRzWzBdKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZU9wZW5TdGF0ZShwYW5lbDogTmdiUGFuZWwgfCBudWxsLCBuZXh0U3RhdGU6IGJvb2xlYW4pIHtcbiAgICBpZiAocGFuZWwgIT0gbnVsbCAmJiAhcGFuZWwuZGlzYWJsZWQgJiYgcGFuZWwuaXNPcGVuICE9PSBuZXh0U3RhdGUpIHtcbiAgICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucGFuZWxDaGFuZ2UuZW1pdChcbiAgICAgICAgICB7cGFuZWxJZDogcGFuZWwuaWQsIG5leHRTdGF0ZTogbmV4dFN0YXRlLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcGFuZWwuaXNPcGVuID0gbmV4dFN0YXRlO1xuXG4gICAgICAgIGlmIChuZXh0U3RhdGUgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2VPdGhlcnMocGFuZWwuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlT3RoZXJzKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgaWYgKHBhbmVsLmlkICE9PSBwYW5lbElkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZFBhbmVsQnlJZChwYW5lbElkOiBzdHJpbmcpOiBOZ2JQYW5lbCB8IG51bGwgeyByZXR1cm4gdGhpcy5wYW5lbHMuZmluZChwID0+IHAuaWQgPT09IHBhbmVsSWQpIHx8IG51bGw7IH1cblxuICBwcml2YXRlIF91cGRhdGVBY3RpdmVJZHMoKSB7XG4gICAgdGhpcy5hY3RpdmVJZHMgPSB0aGlzLnBhbmVscy5maWx0ZXIocGFuZWwgPT4gcGFuZWwuaXNPcGVuICYmICFwYW5lbC5kaXNhYmxlZCkubWFwKHBhbmVsID0+IHBhbmVsLmlkKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHB1dCBvbiBhIGJ1dHRvbiB0aGF0IHRvZ2dsZXMgcGFuZWwgb3BlbmluZyBhbmQgY2xvc2luZy5cbiAqXG4gKiBUbyBiZSB1c2VkIGluc2lkZSB0aGUgW2BOZ2JQYW5lbEhlYWRlcmBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsSGVhZGVyKVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbmdiUGFuZWxUb2dnbGVdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsXG4gICAgJ1tkaXNhYmxlZF0nOiAncGFuZWwuZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY29sbGFwc2VkXSc6ICchcGFuZWwuaXNPcGVuJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAncGFuZWwuaXNPcGVuJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAncGFuZWwuaWQnLFxuICAgICcoY2xpY2spJzogJ2FjY29yZGlvbi50b2dnbGUocGFuZWwuaWQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsVG9nZ2xlIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX25nYlBhbmVsVG9nZ2xlOiBOZ2JQYW5lbCB8ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ2JQYW5lbFRvZ2dsZShwYW5lbDogTmdiUGFuZWwpIHtcbiAgICBpZiAocGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBwYW5lbDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWNjb3JkaW9uOiBOZ2JBY2NvcmRpb24sIEBPcHRpb25hbCgpIEBIb3N0KCkgcHVibGljIHBhbmVsOiBOZ2JQYW5lbCkge31cbn1cbiJdfQ==