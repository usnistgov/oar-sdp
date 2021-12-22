/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Directive, EventEmitter, Host, Input, Optional, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isString } from '../util/util';
import { NgbAccordionConfig } from './accordion-config';
/** @type {?} */
var nextId = 0;
/**
 * The context for the [NgbPanelHeader](#/components/accordion/api#NgbPanelHeader) template
 *
 * \@since 4.1.0
 * @record
 */
export function NgbPanelHeaderContext() { }
if (false) {
    /**
     * `True` if current panel is opened
     * @type {?}
     */
    NgbPanelHeaderContext.prototype.opened;
}
/**
 * A directive that wraps an accordion panel header with any HTML markup and a toggling button
 * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
 * See the [header customization demo](#/components/accordion/examples#header) for more details.
 *
 * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
 *
 * \@since 4.1.0
 */
var NgbPanelHeader = /** @class */ (function () {
    function NgbPanelHeader(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelHeader.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPanelHeader]' },] }
    ];
    /** @nocollapse */
    NgbPanelHeader.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPanelHeader;
}());
export { NgbPanelHeader };
if (false) {
    /** @type {?} */
    NgbPanelHeader.prototype.templateRef;
}
/**
 * A directive that wraps only the panel title with HTML markup inside.
 *
 * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
 */
var NgbPanelTitle = /** @class */ (function () {
    function NgbPanelTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelTitle.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPanelTitle]' },] }
    ];
    /** @nocollapse */
    NgbPanelTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPanelTitle;
}());
export { NgbPanelTitle };
if (false) {
    /** @type {?} */
    NgbPanelTitle.prototype.templateRef;
}
/**
 * A directive that wraps the accordion panel content.
 */
var NgbPanelContent = /** @class */ (function () {
    function NgbPanelContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPanelContent.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPanelContent]' },] }
    ];
    /** @nocollapse */
    NgbPanelContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPanelContent;
}());
export { NgbPanelContent };
if (false) {
    /** @type {?} */
    NgbPanelContent.prototype.templateRef;
}
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
    /**
     * @return {?}
     */
    NgbPanel.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.headerTpl = this.headerTpls.first;
        this.contentTpl = this.contentTpls.first;
    };
    NgbPanel.decorators = [
        { type: Directive, args: [{ selector: 'ngb-panel' },] }
    ];
    NgbPanel.propDecorators = {
        disabled: [{ type: Input }],
        id: [{ type: Input }],
        title: [{ type: Input }],
        type: [{ type: Input }],
        cardClass: [{ type: Input }],
        titleTpls: [{ type: ContentChildren, args: [NgbPanelTitle, { descendants: false },] }],
        headerTpls: [{ type: ContentChildren, args: [NgbPanelHeader, { descendants: false },] }],
        contentTpls: [{ type: ContentChildren, args: [NgbPanelContent, { descendants: false },] }]
    };
    return NgbPanel;
}());
export { NgbPanel };
if (false) {
    /**
     *  If `true`, the panel is disabled an can't be toggled.
     * @type {?}
     */
    NgbPanel.prototype.disabled;
    /**
     *  An optional id for the panel that must be unique on the page.
     *
     *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
     * @type {?}
     */
    NgbPanel.prototype.id;
    /** @type {?} */
    NgbPanel.prototype.isOpen;
    /**
     *  The panel title.
     *
     *  You can alternatively use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to set panel title.
     * @type {?}
     */
    NgbPanel.prototype.title;
    /**
     * Type of the current panel.
     *
     * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
     * `'secondary'`, `'light'` and `'dark'`.
     * @type {?}
     */
    NgbPanel.prototype.type;
    /**
     * An optional class applied to the accordion card element that wraps both panel title and content.
     *
     * \@since 5.3.0
     * @type {?}
     */
    NgbPanel.prototype.cardClass;
    /** @type {?} */
    NgbPanel.prototype.titleTpl;
    /** @type {?} */
    NgbPanel.prototype.headerTpl;
    /** @type {?} */
    NgbPanel.prototype.contentTpl;
    /** @type {?} */
    NgbPanel.prototype.titleTpls;
    /** @type {?} */
    NgbPanel.prototype.headerTpls;
    /** @type {?} */
    NgbPanel.prototype.contentTpls;
}
/**
 * An event emitted right before toggling an accordion panel.
 * @record
 */
export function NgbPanelChangeEvent() { }
if (false) {
    /**
     * The id of the accordion panel that is being toggled.
     * @type {?}
     */
    NgbPanelChangeEvent.prototype.panelId;
    /**
     * The next state of the panel.
     *
     * `true` if it will be opened, `false` if closed.
     * @type {?}
     */
    NgbPanelChangeEvent.prototype.nextState;
    /**
     * Calling this function will prevent panel toggling.
     * @type {?}
     */
    NgbPanelChangeEvent.prototype.preventDefault;
}
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
    /**
     * Checks if a panel with a given id is expanded.
     * @param {?} panelId
     * @return {?}
     */
    NgbAccordion.prototype.isExpanded = /**
     * Checks if a panel with a given id is expanded.
     * @param {?} panelId
     * @return {?}
     */
    function (panelId) { return this.activeIds.indexOf(panelId) > -1; };
    /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     */
    /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     * @param {?} panelId
     * @return {?}
     */
    NgbAccordion.prototype.expand = /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     * @param {?} panelId
     * @return {?}
     */
    function (panelId) { this._changeOpenState(this._findPanelById(panelId), true); };
    /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     */
    /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     * @return {?}
     */
    NgbAccordion.prototype.expandAll = /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.closeOtherPanels) {
            if (this.activeIds.length === 0 && this.panels.length) {
                this._changeOpenState(this.panels.first, true);
            }
        }
        else {
            this.panels.forEach((/**
             * @param {?} panel
             * @return {?}
             */
            function (panel) { return _this._changeOpenState(panel, true); }));
        }
    };
    /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     */
    /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     * @param {?} panelId
     * @return {?}
     */
    NgbAccordion.prototype.collapse = /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     * @param {?} panelId
     * @return {?}
     */
    function (panelId) { this._changeOpenState(this._findPanelById(panelId), false); };
    /**
     * Collapses all opened panels.
     */
    /**
     * Collapses all opened panels.
     * @return {?}
     */
    NgbAccordion.prototype.collapseAll = /**
     * Collapses all opened panels.
     * @return {?}
     */
    function () {
        var _this = this;
        this.panels.forEach((/**
         * @param {?} panel
         * @return {?}
         */
        function (panel) { _this._changeOpenState(panel, false); }));
    };
    /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     */
    /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     * @param {?} panelId
     * @return {?}
     */
    NgbAccordion.prototype.toggle = /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     * @param {?} panelId
     * @return {?}
     */
    function (panelId) {
        /** @type {?} */
        var panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    };
    /**
     * @return {?}
     */
    NgbAccordion.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach((/**
         * @param {?} panel
         * @return {?}
         */
        function (panel) { return panel.isOpen = !panel.disabled && _this.activeIds.indexOf(panel.id) > -1; }));
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    };
    /**
     * @private
     * @param {?} panel
     * @param {?} nextState
     * @return {?}
     */
    NgbAccordion.prototype._changeOpenState = /**
     * @private
     * @param {?} panel
     * @param {?} nextState
     * @return {?}
     */
    function (panel, nextState) {
        if (panel && !panel.disabled && panel.isOpen !== nextState) {
            /** @type {?} */
            var defaultPrevented_1 = false;
            this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: (/**
                 * @return {?}
                 */
                function () { defaultPrevented_1 = true; }) });
            if (!defaultPrevented_1) {
                panel.isOpen = nextState;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
            }
        }
    };
    /**
     * @private
     * @param {?} panelId
     * @return {?}
     */
    NgbAccordion.prototype._closeOthers = /**
     * @private
     * @param {?} panelId
     * @return {?}
     */
    function (panelId) {
        this.panels.forEach((/**
         * @param {?} panel
         * @return {?}
         */
        function (panel) {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        }));
    };
    /**
     * @private
     * @param {?} panelId
     * @return {?}
     */
    NgbAccordion.prototype._findPanelById = /**
     * @private
     * @param {?} panelId
     * @return {?}
     */
    function (panelId) { return this.panels.find((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p.id === panelId; })); };
    /**
     * @private
     * @return {?}
     */
    NgbAccordion.prototype._updateActiveIds = /**
     * @private
     * @return {?}
     */
    function () {
        this.activeIds = this.panels.filter((/**
         * @param {?} panel
         * @return {?}
         */
        function (panel) { return panel.isOpen && !panel.disabled; })).map((/**
         * @param {?} panel
         * @return {?}
         */
        function (panel) { return panel.id; }));
    };
    NgbAccordion.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-accordion',
                    exportAs: 'ngbAccordion',
                    encapsulation: ViewEncapsulation.None,
                    host: { 'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
                    template: "\n    <ng-template #t ngbPanelHeader let-panel>\n      <button class=\"btn btn-link\" [ngbPanelToggle]=\"panel\">\n        {{panel.title}}<ng-template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></ng-template>\n      </button>\n    </ng-template>\n    <ng-template ngFor let-panel [ngForOf]=\"panels\">\n      <div [class]=\"'card ' + (panel.cardClass || '')\">\n        <div role=\"tab\" id=\"{{panel.id}}-header\" [class]=\"'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')\">\n          <ng-template [ngTemplateOutlet]=\"panel.headerTpl?.templateRef || t\"\n                       [ngTemplateOutletContext]=\"{$implicit: panel, opened: panel.isOpen}\"></ng-template>\n        </div>\n        <div id=\"{{panel.id}}\" role=\"tabpanel\" [attr.aria-labelledby]=\"panel.id + '-header'\"\n             class=\"collapse\" [class.show]=\"panel.isOpen\" *ngIf=\"!destroyOnHide || panel.isOpen\">\n          <div class=\"card-body\">\n               <ng-template [ngTemplateOutlet]=\"panel.contentTpl?.templateRef\"></ng-template>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbAccordion.ctorParameters = function () { return [
        { type: NgbAccordionConfig }
    ]; };
    NgbAccordion.propDecorators = {
        panels: [{ type: ContentChildren, args: [NgbPanel,] }],
        activeIds: [{ type: Input }],
        closeOtherPanels: [{ type: Input, args: ['closeOthers',] }],
        destroyOnHide: [{ type: Input }],
        type: [{ type: Input }],
        panelChange: [{ type: Output }]
    };
    return NgbAccordion;
}());
export { NgbAccordion };
if (false) {
    /** @type {?} */
    NgbAccordion.prototype.panels;
    /**
     * An array or comma separated strings of panel ids that should be opened **initially**.
     *
     * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
     * the `(panelChange)` event.
     * @type {?}
     */
    NgbAccordion.prototype.activeIds;
    /**
     *  If `true`, only one panel could be opened at a time.
     *
     *  Opening a new panel will close others.
     * @type {?}
     */
    NgbAccordion.prototype.closeOtherPanels;
    /**
     * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
     * @type {?}
     */
    NgbAccordion.prototype.destroyOnHide;
    /**
     * Type of panels.
     *
     * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
     * `'secondary'`, `'light'` and `'dark'`.
     * @type {?}
     */
    NgbAccordion.prototype.type;
    /**
     * Event emitted right before the panel toggle happens.
     *
     * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
     * @type {?}
     */
    NgbAccordion.prototype.panelChange;
}
/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * \@since 4.1.0
 */
var NgbPanelToggle = /** @class */ (function () {
    function NgbPanelToggle(accordion, panel) {
        this.accordion = accordion;
        this.panel = panel;
    }
    Object.defineProperty(NgbPanelToggle.prototype, "ngbPanelToggle", {
        set: /**
         * @param {?} panel
         * @return {?}
         */
        function (panel) {
            if (panel) {
                this.panel = panel;
            }
        },
        enumerable: true,
        configurable: true
    });
    NgbPanelToggle.decorators = [
        { type: Directive, args: [{
                    selector: 'button[ngbPanelToggle]',
                    host: {
                        'type': 'button',
                        '[disabled]': 'panel.disabled',
                        '[class.collapsed]': '!panel.isOpen',
                        '[attr.aria-expanded]': 'panel.isOpen',
                        '[attr.aria-controls]': 'panel.id',
                        '(click)': 'accordion.toggle(panel.id)'
                    }
                },] }
    ];
    /** @nocollapse */
    NgbPanelToggle.ctorParameters = function () { return [
        { type: NgbAccordion },
        { type: NgbPanel, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    NgbPanelToggle.propDecorators = {
        ngbPanelToggle: [{ type: Input }]
    };
    return NgbPanelToggle;
}());
export { NgbPanelToggle };
if (false) {
    /** @type {?} */
    NgbPanelToggle.prototype.accordion;
    /** @type {?} */
    NgbPanelToggle.prototype.panel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJhY2NvcmRpb24vYWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztJQUVsRCxNQUFNLEdBQUcsQ0FBQzs7Ozs7OztBQU9kLDJDQUtDOzs7Ozs7SUFEQyx1Q0FBZ0I7Ozs7Ozs7Ozs7O0FBWWxCO0lBRUUsd0JBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUFHLENBQUM7O2dCQUZyRCxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsNkJBQTZCLEVBQUM7Ozs7Z0JBL0JsRCxXQUFXOztJQWtDYixxQkFBQztDQUFBLEFBSEQsSUFHQztTQUZZLGNBQWM7OztJQUNiLHFDQUFvQzs7Ozs7OztBQVFsRDtJQUVFLHVCQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOztnQkFGckQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLDRCQUE0QixFQUFDOzs7O2dCQXpDakQsV0FBVzs7SUE0Q2Isb0JBQUM7Q0FBQSxBQUhELElBR0M7U0FGWSxhQUFhOzs7SUFDWixvQ0FBb0M7Ozs7O0FBTWxEO0lBRUUseUJBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUFHLENBQUM7O2dCQUZyRCxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsOEJB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WUFBWTs7O0lBQ3ZCLDhCQUF1RDs7Ozs7Ozs7SUFRdkQsaUNBQW9EOzs7Ozs7O0lBT3BELHdDQUFnRDs7Ozs7SUFLaEQscUNBQThCOzs7Ozs7OztJQVE5Qiw0QkFBc0I7Ozs7Ozs7SUFPdEIsbUNBQWdFOzs7Ozs7Ozs7QUFvSGxFO0lBbUJFLHdCQUFtQixTQUF1QixFQUE2QixLQUFlO1FBQW5FLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFBNkIsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFHLENBQUM7SUFQMUYsc0JBQ0ksMENBQWM7Ozs7O1FBRGxCLFVBQ21CLEtBQWU7WUFDaEMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDcEI7UUFDSCxDQUFDOzs7T0FBQTs7Z0JBakJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLFlBQVksRUFBRSxnQkFBZ0I7d0JBQzlCLG1CQUFtQixFQUFFLGVBQWU7d0JBQ3BDLHNCQUFzQixFQUFFLGNBQWM7d0JBQ3RDLHNCQUFzQixFQUFFLFVBQVU7d0JBQ2xDLFNBQVMsRUFBRSw0QkFBNEI7cUJBQ3hDO2lCQUNGOzs7O2dCQVMrQixZQUFZO2dCQUFvQyxRQUFRLHVCQUF6QyxRQUFRLFlBQUksSUFBSTs7O2lDQVA1RCxLQUFLOztJQVFSLHFCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FUWSxjQUFjOzs7SUFRYixtQ0FBOEI7O0lBQUUsK0JBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7TmdiQWNjb3JkaW9uQ29uZmlnfSBmcm9tICcuL2FjY29yZGlvbi1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBUaGUgY29udGV4dCBmb3IgdGhlIFtOZ2JQYW5lbEhlYWRlcl0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiUGFuZWxIZWFkZXIpIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFuZWxIZWFkZXJDb250ZXh0IHtcbiAgLyoqXG4gICAqIGBUcnVlYCBpZiBjdXJyZW50IHBhbmVsIGlzIG9wZW5lZFxuICAgKi9cbiAgb3BlbmVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgYW4gYWNjb3JkaW9uIHBhbmVsIGhlYWRlciB3aXRoIGFueSBIVE1MIG1hcmt1cCBhbmQgYSB0b2dnbGluZyBidXR0b25cbiAqIG1hcmtlZCB3aXRoIFtgTmdiUGFuZWxUb2dnbGVgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbFRvZ2dsZSkuXG4gKiBTZWUgdGhlIFtoZWFkZXIgY3VzdG9taXphdGlvbiBkZW1vXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2V4YW1wbGVzI2hlYWRlcikgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIFtgTmdiUGFuZWxUaXRsZWBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsVGl0bGUpIHRvIGN1c3RvbWl6ZSBvbmx5IHRoZSBwYW5lbCB0aXRsZS5cbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbEhlYWRlcl0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbEhlYWRlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIG9ubHkgdGhlIHBhbmVsIHRpdGxlIHdpdGggSFRNTCBtYXJrdXAgaW5zaWRlLlxuICpcbiAqIFlvdSBjYW4gYWxzbyB1c2UgW2BOZ2JQYW5lbEhlYWRlcmBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsSGVhZGVyKSB0byBjdXN0b21pemUgdGhlIGZ1bGwgcGFuZWwgaGVhZGVyLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsVGl0bGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBhY2NvcmRpb24gcGFuZWwgY29udGVudC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbENvbnRlbnRdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgYW4gaW5kaXZpZHVhbCBhY2NvcmRpb24gcGFuZWwgd2l0aCB0aXRsZSBhbmQgY29sbGFwc2libGUgY29udGVudC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ItcGFuZWwnfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICAvKipcbiAgICogIElmIGB0cnVlYCwgdGhlIHBhbmVsIGlzIGRpc2FibGVkIGFuIGNhbid0IGJlIHRvZ2dsZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiAgQW4gb3B0aW9uYWwgaWQgZm9yIHRoZSBwYW5lbCB0aGF0IG11c3QgYmUgdW5pcXVlIG9uIHRoZSBwYWdlLlxuICAgKlxuICAgKiAgSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGluIHRoZSBgbmdiLXBhbmVsLXh4eGAgZm9ybWF0LlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXBhbmVsLSR7bmV4dElkKyt9YDtcblxuICBpc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogIFRoZSBwYW5lbCB0aXRsZS5cbiAgICpcbiAgICogIFlvdSBjYW4gYWx0ZXJuYXRpdmVseSB1c2UgW2BOZ2JQYW5lbFRpdGxlYF0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiUGFuZWxUaXRsZSkgdG8gc2V0IHBhbmVsIHRpdGxlLlxuICAgKi9cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAvKipcbiAgICogVHlwZSBvZiB0aGUgY3VycmVudCBwYW5lbC5cbiAgICpcbiAgICogQm9vdHN0cmFwIHByb3ZpZGVzIHN0eWxlcyBmb3IgdGhlIGZvbGxvd2luZyB0eXBlczogYCdzdWNjZXNzJ2AsIGAnaW5mbydgLCBgJ3dhcm5pbmcnYCwgYCdkYW5nZXInYCwgYCdwcmltYXJ5J2AsXG4gICAqIGAnc2Vjb25kYXJ5J2AsIGAnbGlnaHQnYCBhbmQgYCdkYXJrJ2AuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGFjY29yZGlvbiBjYXJkIGVsZW1lbnQgdGhhdCB3cmFwcyBib3RoIHBhbmVsIHRpdGxlIGFuZCBjb250ZW50LlxuICAgKlxuICAgKiBAc2luY2UgNS4zLjBcbiAgICovXG4gIEBJbnB1dCgpIGNhcmRDbGFzczogc3RyaW5nO1xuXG4gIHRpdGxlVHBsOiBOZ2JQYW5lbFRpdGxlIHwgbnVsbDtcbiAgaGVhZGVyVHBsOiBOZ2JQYW5lbEhlYWRlciB8IG51bGw7XG4gIGNvbnRlbnRUcGw6IE5nYlBhbmVsQ29udGVudCB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbFRpdGxlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxUaXRsZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxIZWFkZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBoZWFkZXJUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxIZWFkZXI+O1xuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxDb250ZW50PjtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XG4gICAgdGhpcy5oZWFkZXJUcGwgPSB0aGlzLmhlYWRlclRwbHMuZmlyc3Q7XG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxufVxuXG4vKipcbiAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRvZ2dsaW5nIGFuIGFjY29yZGlvbiBwYW5lbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYW5lbENoYW5nZUV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgYWNjb3JkaW9uIHBhbmVsIHRoYXQgaXMgYmVpbmcgdG9nZ2xlZC5cbiAgICovXG4gIHBhbmVsSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG5leHQgc3RhdGUgb2YgdGhlIHBhbmVsLlxuICAgKlxuICAgKiBgdHJ1ZWAgaWYgaXQgd2lsbCBiZSBvcGVuZWQsIGBmYWxzZWAgaWYgY2xvc2VkLlxuICAgKi9cbiAgbmV4dFN0YXRlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBwcmV2ZW50IHBhbmVsIHRvZ2dsaW5nLlxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQWNjb3JkaW9uIGlzIGEgY29sbGVjdGlvbiBvZiBjb2xsYXBzaWJsZSBwYW5lbHMgKGJvb3RzdHJhcCBjYXJkcykuXG4gKlxuICogSXQgY2FuIGVuc3VyZSBvbmx5IG9uZSBwYW5lbCBpcyBvcGVuZWQgYXQgYSB0aW1lIGFuZCBhbGxvd3MgdG8gY3VzdG9taXplIHBhbmVsXG4gKiBoZWFkZXJzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItYWNjb3JkaW9uJyxcbiAgZXhwb3J0QXM6ICduZ2JBY2NvcmRpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7J2NsYXNzJzogJ2FjY29yZGlvbicsICdyb2xlJzogJ3RhYmxpc3QnLCAnW2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGVdJzogJyFjbG9zZU90aGVyUGFuZWxzJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0IG5nYlBhbmVsSGVhZGVyIGxldC1wYW5lbD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbbmdiUGFuZWxUb2dnbGVdPVwicGFuZWxcIj5cbiAgICAgICAge3twYW5lbC50aXRsZX19PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcGFuZWwgW25nRm9yT2ZdPVwicGFuZWxzXCI+XG4gICAgICA8ZGl2IFtjbGFzc109XCInY2FyZCAnICsgKHBhbmVsLmNhcmRDbGFzcyB8fCAnJylcIj5cbiAgICAgICAgPGRpdiByb2xlPVwidGFiXCIgaWQ9XCJ7e3BhbmVsLmlkfX0taGVhZGVyXCIgW2NsYXNzXT1cIidjYXJkLWhlYWRlciAnICsgKHBhbmVsLnR5cGUgPyAnYmctJytwYW5lbC50eXBlOiB0eXBlID8gJ2JnLScrdHlwZSA6ICcnKVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC5oZWFkZXJUcGw/LnRlbXBsYXRlUmVmIHx8IHRcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogcGFuZWwsIG9wZW5lZDogcGFuZWwuaXNPcGVufVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwie3twYW5lbC5pZH19XCIgcm9sZT1cInRhYnBhbmVsXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cInBhbmVsLmlkICsgJy1oZWFkZXInXCJcbiAgICAgICAgICAgICBjbGFzcz1cImNvbGxhcHNlXCIgW2NsYXNzLnNob3ddPVwicGFuZWwuaXNPcGVuXCIgKm5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCBwYW5lbC5pc09wZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwuY29udGVudFRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWwpIHBhbmVsczogUXVlcnlMaXN0PE5nYlBhbmVsPjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb3IgY29tbWEgc2VwYXJhdGVkIHN0cmluZ3Mgb2YgcGFuZWwgaWRzIHRoYXQgc2hvdWxkIGJlIG9wZW5lZCAqKmluaXRpYWxseSoqLlxuICAgKlxuICAgKiBGb3Igc3Vic2VxdWVudCBjaGFuZ2VzIHVzZSBtZXRob2RzIGxpa2UgYGV4cGFuZCgpYCwgYGNvbGxhcHNlKClgLCBldGMuIGFuZFxuICAgKiB0aGUgYChwYW5lbENoYW5nZSlgIGV2ZW50LlxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWRzOiBzdHJpbmcgfCByZWFkb25seSBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiAgSWYgYHRydWVgLCBvbmx5IG9uZSBwYW5lbCBjb3VsZCBiZSBvcGVuZWQgYXQgYSB0aW1lLlxuICAgKlxuICAgKiAgT3BlbmluZyBhIG5ldyBwYW5lbCB3aWxsIGNsb3NlIG90aGVycy5cbiAgICovXG4gIEBJbnB1dCgnY2xvc2VPdGhlcnMnKSBjbG9zZU90aGVyUGFuZWxzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHBhbmVsIGNvbnRlbnQgd2lsbCBiZSBkZXRhY2hlZCBmcm9tIERPTSBhbmQgbm90IHNpbXBseSBoaWRkZW4gd2hlbiB0aGUgcGFuZWwgaXMgY29sbGFwc2VkLlxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgcGFuZWxzLlxuICAgKlxuICAgKiBCb290c3RyYXAgcHJvdmlkZXMgc3R5bGVzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOiBgJ3N1Y2Nlc3MnYCwgYCdpbmZvJ2AsIGAnd2FybmluZydgLCBgJ2RhbmdlcidgLCBgJ3ByaW1hcnknYCxcbiAgICogYCdzZWNvbmRhcnknYCwgYCdsaWdodCdgIGFuZCBgJ2RhcmsnYC5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIHBhbmVsIHRvZ2dsZSBoYXBwZW5zLlxuICAgKlxuICAgKiBTZWUgW05nYlBhbmVsQ2hhbmdlRXZlbnRdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsQ2hhbmdlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgcGFuZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlBhbmVsQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBY2NvcmRpb25Db25maWcpIHtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgICB0aGlzLmNsb3NlT3RoZXJQYW5lbHMgPSBjb25maWcuY2xvc2VPdGhlcnM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkIGlzIGV4cGFuZGVkLlxuICAgKi9cbiAgaXNFeHBhbmRlZChwYW5lbElkOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuYWN0aXZlSWRzLmluZGV4T2YocGFuZWxJZCkgPiAtMTsgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLlxuICAgKlxuICAgKiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBhbHJlYWR5IGV4cGFuZGVkIG9yIGRpc2FibGVkLlxuICAgKi9cbiAgZXhwYW5kKHBhbmVsSWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKSwgdHJ1ZSk7IH1cblxuICAvKipcbiAgICogRXhwYW5kcyBhbGwgcGFuZWxzLCBpZiBgW2Nsb3NlT3RoZXJzXWAgaXMgYGZhbHNlYC5cbiAgICpcbiAgICogSWYgYFtjbG9zZU90aGVyc11gIGlzIGB0cnVlYCwgaXQgd2lsbCBleHBhbmQgdGhlIGZpcnN0IHBhbmVsLCB1bmxlc3MgdGhlcmUgaXMgYWxyZWFkeSBhIHBhbmVsIG9wZW5lZC5cbiAgICovXG4gIGV4cGFuZEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID09PSAwICYmIHRoaXMucGFuZWxzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5wYW5lbHMuZmlyc3QsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZShwYW5lbCwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYSBwYW5lbCB3aXRoIHRoZSBnaXZlbiBpZC5cbiAgICpcbiAgICogSGFzIG5vIGVmZmVjdCBpZiB0aGUgcGFuZWwgaXMgYWxyZWFkeSBjb2xsYXBzZWQgb3IgZGlzYWJsZWQuXG4gICAqL1xuICBjb2xsYXBzZShwYW5lbElkOiBzdHJpbmcpIHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIGZhbHNlKTsgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYWxsIG9wZW5lZCBwYW5lbHMuXG4gICAqL1xuICBjb2xsYXBzZUFsbCgpIHtcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4geyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsIGZhbHNlKTsgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhIHBhbmVsIHdpdGggdGhlIGdpdmVuIGlkLlxuICAgKlxuICAgKiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIHRvZ2dsZShwYW5lbElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCk7XG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsICFwYW5lbC5pc09wZW4pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBhY3RpdmUgaWQgdXBkYXRlc1xuICAgIGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5hY3RpdmVJZHMuc3BsaXQoL1xccyosXFxzKi8pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBwYW5lbHMgb3BlbiBzdGF0ZXNcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmlzT3BlbiA9ICFwYW5lbC5kaXNhYmxlZCAmJiB0aGlzLmFjdGl2ZUlkcy5pbmRleE9mKHBhbmVsLmlkKSA+IC0xKTtcblxuICAgIC8vIGNsb3NlT3RoZXJzIHVwZGF0ZXNcbiAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID4gMSAmJiB0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcbiAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHRoaXMuYWN0aXZlSWRzWzBdKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZU9wZW5TdGF0ZShwYW5lbDogTmdiUGFuZWwsIG5leHRTdGF0ZTogYm9vbGVhbikge1xuICAgIGlmIChwYW5lbCAmJiAhcGFuZWwuZGlzYWJsZWQgJiYgcGFuZWwuaXNPcGVuICE9PSBuZXh0U3RhdGUpIHtcbiAgICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucGFuZWxDaGFuZ2UuZW1pdChcbiAgICAgICAgICB7cGFuZWxJZDogcGFuZWwuaWQsIG5leHRTdGF0ZTogbmV4dFN0YXRlLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcGFuZWwuaXNPcGVuID0gbmV4dFN0YXRlO1xuXG4gICAgICAgIGlmIChuZXh0U3RhdGUgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2VPdGhlcnMocGFuZWwuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlT3RoZXJzKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgaWYgKHBhbmVsLmlkICE9PSBwYW5lbElkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZFBhbmVsQnlJZChwYW5lbElkOiBzdHJpbmcpOiBOZ2JQYW5lbCB8IG51bGwgeyByZXR1cm4gdGhpcy5wYW5lbHMuZmluZChwID0+IHAuaWQgPT09IHBhbmVsSWQpOyB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xuICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5wYW5lbHMuZmlsdGVyKHBhbmVsID0+IHBhbmVsLmlzT3BlbiAmJiAhcGFuZWwuZGlzYWJsZWQpLm1hcChwYW5lbCA9PiBwYW5lbC5pZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gYSBidXR0b24gdGhhdCB0b2dnbGVzIHBhbmVsIG9wZW5pbmcgYW5kIGNsb3NpbmcuXG4gKlxuICogVG8gYmUgdXNlZCBpbnNpZGUgdGhlIFtgTmdiUGFuZWxIZWFkZXJgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbEhlYWRlcilcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW25nYlBhbmVsVG9nZ2xlXScsXG4gIGhvc3Q6IHtcbiAgICAndHlwZSc6ICdidXR0b24nLFxuICAgICdbZGlzYWJsZWRdJzogJ3BhbmVsLmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNvbGxhcHNlZF0nOiAnIXBhbmVsLmlzT3BlbicsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ3BhbmVsLmlzT3BlbicsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ3BhbmVsLmlkJyxcbiAgICAnKGNsaWNrKSc6ICdhY2NvcmRpb24udG9nZ2xlKHBhbmVsLmlkKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbFRvZ2dsZSB7XG4gIEBJbnB1dCgpXG4gIHNldCBuZ2JQYW5lbFRvZ2dsZShwYW5lbDogTmdiUGFuZWwpIHtcbiAgICBpZiAocGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBwYW5lbDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWNjb3JkaW9uOiBOZ2JBY2NvcmRpb24sIEBPcHRpb25hbCgpIEBIb3N0KCkgcHVibGljIHBhbmVsOiBOZ2JQYW5lbCkge31cbn1cbiJdfQ==