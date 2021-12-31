import { __decorate, __param } from "tslib";
import { AfterContentChecked, Component, ContentChildren, Directive, EventEmitter, Host, Input, Optional, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isString } from '../util/util';
import { NgbAccordionConfig } from './accordion-config';
let nextId = 0;
/**
 * A directive that wraps an accordion panel header with any HTML markup and a toggling button
 * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
 * See the [header customization demo](#/components/accordion/examples#header) for more details.
 *
 * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
 *
 * @since 4.1.0
 */
let NgbPanelHeader = class NgbPanelHeader {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
NgbPanelHeader.ctorParameters = () => [
    { type: TemplateRef }
];
NgbPanelHeader = __decorate([
    Directive({ selector: 'ng-template[ngbPanelHeader]' })
], NgbPanelHeader);
export { NgbPanelHeader };
/**
 * A directive that wraps only the panel title with HTML markup inside.
 *
 * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
 */
let NgbPanelTitle = class NgbPanelTitle {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
NgbPanelTitle.ctorParameters = () => [
    { type: TemplateRef }
];
NgbPanelTitle = __decorate([
    Directive({ selector: 'ng-template[ngbPanelTitle]' })
], NgbPanelTitle);
export { NgbPanelTitle };
/**
 * A directive that wraps the accordion panel content.
 */
let NgbPanelContent = class NgbPanelContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
NgbPanelContent.ctorParameters = () => [
    { type: TemplateRef }
];
NgbPanelContent = __decorate([
    Directive({ selector: 'ng-template[ngbPanelContent]' })
], NgbPanelContent);
export { NgbPanelContent };
/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 */
let NgbPanel = class NgbPanel {
    constructor() {
        /**
         *  If `true`, the panel is disabled an can't be toggled.
         */
        this.disabled = false;
        /**
         *  An optional id for the panel that must be unique on the page.
         *
         *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
         */
        this.id = `ngb-panel-${nextId++}`;
        this.isOpen = false;
    }
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.headerTpl = this.headerTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
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
export { NgbPanel };
/**
 * Accordion is a collection of collapsible panels (bootstrap cards).
 *
 * It can ensure only one panel is opened at a time and allows to customize panel
 * headers.
 */
let NgbAccordion = class NgbAccordion {
    constructor(config) {
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
    isExpanded(panelId) { return this.activeIds.indexOf(panelId) > -1; }
    /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     */
    expand(panelId) { this._changeOpenState(this._findPanelById(panelId), true); }
    /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     */
    expandAll() {
        if (this.closeOtherPanels) {
            if (this.activeIds.length === 0 && this.panels.length) {
                this._changeOpenState(this.panels.first, true);
            }
        }
        else {
            this.panels.forEach(panel => this._changeOpenState(panel, true));
        }
    }
    /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     */
    collapse(panelId) { this._changeOpenState(this._findPanelById(panelId), false); }
    /**
     * Collapses all opened panels.
     */
    collapseAll() {
        this.panels.forEach((panel) => { this._changeOpenState(panel, false); });
    }
    /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     */
    toggle(panelId) {
        const panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    }
    ngAfterContentChecked() {
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach(panel => panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1);
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    }
    _changeOpenState(panel, nextState) {
        if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
            let defaultPrevented = false;
            this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; } });
            if (!defaultPrevented) {
                panel.isOpen = nextState;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
            }
        }
    }
    _closeOthers(panelId) {
        this.panels.forEach(panel => {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        });
    }
    _findPanelById(panelId) { return this.panels.find(p => p.id === panelId) || null; }
    _updateActiveIds() {
        this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
    }
};
NgbAccordion.ctorParameters = () => [
    { type: NgbAccordionConfig }
];
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
        template: `
    <ng-template #t ngbPanelHeader let-panel>
      <button class="btn btn-link" [ngbPanelToggle]="panel">
        {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
      </button>
    </ng-template>
    <ng-template ngFor let-panel [ngForOf]="panels">
      <div [class]="'card ' + (panel.cardClass || '')">
        <div role="tab" id="{{panel.id}}-header" [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')">
          <ng-template [ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
                       [ngTemplateOutletContext]="{$implicit: panel, opened: panel.isOpen}"></ng-template>
        </div>
        <div id="{{panel.id}}" role="tabpanel" [attr.aria-labelledby]="panel.id + '-header'"
             class="collapse" [class.show]="panel.isOpen" *ngIf="!destroyOnHide || panel.isOpen">
          <div class="card-body">
               <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef || null"></ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `
    })
], NgbAccordion);
export { NgbAccordion };
/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * @since 4.1.0
 */
let NgbPanelToggle = class NgbPanelToggle {
    constructor(accordion, panel) {
        this.accordion = accordion;
        this.panel = panel;
    }
    set ngbPanelToggle(panel) {
        if (panel) {
            this.panel = panel;
        }
    }
};
NgbPanelToggle.ctorParameters = () => [
    { type: NgbAccordion },
    { type: NgbPanel, decorators: [{ type: Optional }, { type: Host }] }
];
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
export { NgbPanelToggle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJhY2NvcmRpb24vYWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFjZjs7Ozs7Ozs7R0FRRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQztDQUNyRCxDQUFBOztZQURpQyxXQUFXOztBQURoQyxjQUFjO0lBRDFCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw2QkFBNkIsRUFBQyxDQUFDO0dBQ3hDLGNBQWMsQ0FFMUI7U0FGWSxjQUFjO0FBSTNCOzs7O0dBSUc7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBQ3hCLFlBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUFHLENBQUM7Q0FDckQsQ0FBQTs7WUFEaUMsV0FBVzs7QUFEaEMsYUFBYTtJQUR6QixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsNEJBQTRCLEVBQUMsQ0FBQztHQUN2QyxhQUFhLENBRXpCO1NBRlksYUFBYTtBQUkxQjs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFBbUIsV0FB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QVV6QixZQUFtQixTQUF1QixFQUE2QixLQUFlO1FBQW5FLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFBNkIsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFHLENBQUM7SUFOMUYsSUFBSSxjQUFjLENBQUMsS0FBZTtRQUNoQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztDQUdGLENBQUE7O1lBRCtCLFlBQVk7WUFBb0MsUUFBUSx1QkFBekMsUUFBUSxZQUFJLElBQUk7O0FBTjdEO0lBREMsS0FBSyxFQUFFO29EQUtQO0FBUlUsY0FBYztJQVgxQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFlBQVksRUFBRSxnQkFBZ0I7WUFDOUIsbUJBQW1CLEVBQUUsZUFBZTtZQUNwQyxzQkFBc0IsRUFBRSxjQUFjO1lBQ3RDLHNCQUFzQixFQUFFLFVBQVU7WUFDbEMsU0FBUyxFQUFFLDRCQUE0QjtTQUN4QztLQUNGLENBQUM7SUFXNkMsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsSUFBSSxFQUFFLENBQUE7R0FWcEQsY0FBYyxDQVcxQjtTQVhZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHtOZ2JBY2NvcmRpb25Db25maWd9IGZyb20gJy4vYWNjb3JkaW9uLWNvbmZpZyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG4vKipcbiAqIFRoZSBjb250ZXh0IGZvciB0aGUgW05nYlBhbmVsSGVhZGVyXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbEhlYWRlcikgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYW5lbEhlYWRlckNvbnRleHQge1xuICAvKipcbiAgICogYFRydWVgIGlmIGN1cnJlbnQgcGFuZWwgaXMgb3BlbmVkXG4gICAqL1xuICBvcGVuZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBhbiBhY2NvcmRpb24gcGFuZWwgaGVhZGVyIHdpdGggYW55IEhUTUwgbWFya3VwIGFuZCBhIHRvZ2dsaW5nIGJ1dHRvblxuICogbWFya2VkIHdpdGggW2BOZ2JQYW5lbFRvZ2dsZWBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsVG9nZ2xlKS5cbiAqIFNlZSB0aGUgW2hlYWRlciBjdXN0b21pemF0aW9uIGRlbW9dKCMvY29tcG9uZW50cy9hY2NvcmRpb24vZXhhbXBsZXMjaGVhZGVyKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBjYW4gYWxzbyB1c2UgW2BOZ2JQYW5lbFRpdGxlYF0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiUGFuZWxUaXRsZSkgdG8gY3VzdG9taXplIG9ubHkgdGhlIHBhbmVsIHRpdGxlLlxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsSGVhZGVyXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsSGVhZGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgb25seSB0aGUgcGFuZWwgdGl0bGUgd2l0aCBIVE1MIG1hcmt1cCBpbnNpZGUuXG4gKlxuICogWW91IGNhbiBhbHNvIHVzZSBbYE5nYlBhbmVsSGVhZGVyYF0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiUGFuZWxIZWFkZXIpIHRvIGN1c3RvbWl6ZSB0aGUgZnVsbCBwYW5lbCBoZWFkZXIuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbFRpdGxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgdGhlIGFjY29yZGlvbiBwYW5lbCBjb250ZW50LlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsQ29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbENvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBhbiBpbmRpdmlkdWFsIGFjY29yZGlvbiBwYW5lbCB3aXRoIHRpdGxlIGFuZCBjb2xsYXBzaWJsZSBjb250ZW50LlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nYi1wYW5lbCd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiAgSWYgYHRydWVgLCB0aGUgcGFuZWwgaXMgZGlzYWJsZWQgYW4gY2FuJ3QgYmUgdG9nZ2xlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBBbiBvcHRpb25hbCBpZCBmb3IgdGhlIHBhbmVsIHRoYXQgbXVzdCBiZSB1bmlxdWUgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqICBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaW4gdGhlIGBuZ2ItcGFuZWwteHh4YCBmb3JtYXQuXG4gICAqL1xuICBASW5wdXQoKSBpZCA9IGBuZ2ItcGFuZWwtJHtuZXh0SWQrK31gO1xuXG4gIGlzT3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiAgVGhlIHBhbmVsIHRpdGxlLlxuICAgKlxuICAgKiAgWW91IGNhbiBhbHRlcm5hdGl2ZWx5IHVzZSBbYE5nYlBhbmVsVGl0bGVgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbFRpdGxlKSB0byBzZXQgcGFuZWwgdGl0bGUuXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSBjdXJyZW50IHBhbmVsLlxuICAgKlxuICAgKiBCb290c3RyYXAgcHJvdmlkZXMgc3R5bGVzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOiBgJ3N1Y2Nlc3MnYCwgYCdpbmZvJ2AsIGAnd2FybmluZydgLCBgJ2RhbmdlcidgLCBgJ3ByaW1hcnknYCxcbiAgICogYCdzZWNvbmRhcnknYCwgYCdsaWdodCdgIGFuZCBgJ2RhcmsnYC5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgYXBwbGllZCB0byB0aGUgYWNjb3JkaW9uIGNhcmQgZWxlbWVudCB0aGF0IHdyYXBzIGJvdGggcGFuZWwgdGl0bGUgYW5kIGNvbnRlbnQuXG4gICAqXG4gICAqIEBzaW5jZSA1LjMuMFxuICAgKi9cbiAgQElucHV0KCkgY2FyZENsYXNzOiBzdHJpbmc7XG5cbiAgdGl0bGVUcGw6IE5nYlBhbmVsVGl0bGU7XG4gIGhlYWRlclRwbDogTmdiUGFuZWxIZWFkZXI7XG4gIGNvbnRlbnRUcGw6IE5nYlBhbmVsQ29udGVudDtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsVGl0bGUsIHtkZXNjZW5kYW50czogZmFsc2V9KSB0aXRsZVRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbFRpdGxlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbEhlYWRlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGhlYWRlclRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbEhlYWRlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbENvbnRlbnQ+O1xuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBXZSBhcmUgdXNpbmcgQENvbnRlbnRDaGlsZHJlbiBpbnN0ZWFkIG9mIEBDb250ZW50Q2hpbGQgYXMgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvbiBiZWluZyB1c2VkXG4gICAgLy8gb25seSBAQ29udGVudENoaWxkcmVuIGFsbG93cyB1cyB0byBzcGVjaWZ5IHRoZSB7ZGVzY2VuZGFudHM6IGZhbHNlfSBvcHRpb24uXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjI0MFxuICAgIHRoaXMudGl0bGVUcGwgPSB0aGlzLnRpdGxlVHBscy5maXJzdDtcbiAgICB0aGlzLmhlYWRlclRwbCA9IHRoaXMuaGVhZGVyVHBscy5maXJzdDtcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xuICB9XG59XG5cbi8qKlxuICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdG9nZ2xpbmcgYW4gYWNjb3JkaW9uIHBhbmVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhbmVsQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBhY2NvcmRpb24gcGFuZWwgdGhhdCBpcyBiZWluZyB0b2dnbGVkLlxuICAgKi9cbiAgcGFuZWxJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmV4dCBzdGF0ZSBvZiB0aGUgcGFuZWwuXG4gICAqXG4gICAqIGB0cnVlYCBpZiBpdCB3aWxsIGJlIG9wZW5lZCwgYGZhbHNlYCBpZiBjbG9zZWQuXG4gICAqL1xuICBuZXh0U3RhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgcGFuZWwgdG9nZ2xpbmcuXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBBY2NvcmRpb24gaXMgYSBjb2xsZWN0aW9uIG9mIGNvbGxhcHNpYmxlIHBhbmVscyAoYm9vdHN0cmFwIGNhcmRzKS5cbiAqXG4gKiBJdCBjYW4gZW5zdXJlIG9ubHkgb25lIHBhbmVsIGlzIG9wZW5lZCBhdCBhIHRpbWUgYW5kIGFsbG93cyB0byBjdXN0b21pemUgcGFuZWxcbiAqIGhlYWRlcnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1hY2NvcmRpb24nLFxuICBleHBvcnRBczogJ25nYkFjY29yZGlvbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnYWNjb3JkaW9uJywgJ3JvbGUnOiAndGFibGlzdCcsICdbYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZV0nOiAnIWNsb3NlT3RoZXJQYW5lbHMnfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3QgbmdiUGFuZWxIZWFkZXIgbGV0LXBhbmVsPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtuZ2JQYW5lbFRvZ2dsZV09XCJwYW5lbFwiPlxuICAgICAgICB7e3BhbmVsLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wYW5lbCBbbmdGb3JPZl09XCJwYW5lbHNcIj5cbiAgICAgIDxkaXYgW2NsYXNzXT1cIidjYXJkICcgKyAocGFuZWwuY2FyZENsYXNzIHx8ICcnKVwiPlxuICAgICAgICA8ZGl2IHJvbGU9XCJ0YWJcIiBpZD1cInt7cGFuZWwuaWR9fS1oZWFkZXJcIiBbY2xhc3NdPVwiJ2NhcmQtaGVhZGVyICcgKyAocGFuZWwudHlwZSA/ICdiZy0nK3BhbmVsLnR5cGU6IHR5cGUgPyAnYmctJyt0eXBlIDogJycpXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLmhlYWRlclRwbD8udGVtcGxhdGVSZWYgfHwgdFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBwYW5lbCwgb3BlbmVkOiBwYW5lbC5pc09wZW59XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJ7e3BhbmVsLmlkfX1cIiByb2xlPVwidGFicGFuZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwicGFuZWwuaWQgKyAnLWhlYWRlcidcIlxuICAgICAgICAgICAgIGNsYXNzPVwiY29sbGFwc2VcIiBbY2xhc3Muc2hvd109XCJwYW5lbC5pc09wZW5cIiAqbmdJZj1cIiFkZXN0cm95T25IaWRlIHx8IHBhbmVsLmlzT3BlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZiB8fCBudWxsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsKSBwYW5lbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbD47XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9yIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmdzIG9mIHBhbmVsIGlkcyB0aGF0IHNob3VsZCBiZSBvcGVuZWQgKippbml0aWFsbHkqKi5cbiAgICpcbiAgICogRm9yIHN1YnNlcXVlbnQgY2hhbmdlcyB1c2UgbWV0aG9kcyBsaWtlIGBleHBhbmQoKWAsIGBjb2xsYXBzZSgpYCwgZXRjLiBhbmRcbiAgICogdGhlIGAocGFuZWxDaGFuZ2UpYCBldmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkczogc3RyaW5nIHwgcmVhZG9ubHkgc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgICogIElmIGB0cnVlYCwgb25seSBvbmUgcGFuZWwgY291bGQgYmUgb3BlbmVkIGF0IGEgdGltZS5cbiAgICpcbiAgICogIE9wZW5pbmcgYSBuZXcgcGFuZWwgd2lsbCBjbG9zZSBvdGhlcnMuXG4gICAqL1xuICBASW5wdXQoJ2Nsb3NlT3RoZXJzJykgY2xvc2VPdGhlclBhbmVsczogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBwYW5lbCBjb250ZW50IHdpbGwgYmUgZGV0YWNoZWQgZnJvbSBET00gYW5kIG5vdCBzaW1wbHkgaGlkZGVuIHdoZW4gdGhlIHBhbmVsIGlzIGNvbGxhcHNlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHBhbmVscy5cbiAgICpcbiAgICogQm9vdHN0cmFwIHByb3ZpZGVzIHN0eWxlcyBmb3IgdGhlIGZvbGxvd2luZyB0eXBlczogYCdzdWNjZXNzJ2AsIGAnaW5mbydgLCBgJ3dhcm5pbmcnYCwgYCdkYW5nZXInYCwgYCdwcmltYXJ5J2AsXG4gICAqIGAnc2Vjb25kYXJ5J2AsIGAnbGlnaHQnYCBhbmQgYCdkYXJrJ2AuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBwYW5lbCB0b2dnbGUgaGFwcGVucy5cbiAgICpcbiAgICogU2VlIFtOZ2JQYW5lbENoYW5nZUV2ZW50XSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbENoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuICAgKi9cbiAgQE91dHB1dCgpIHBhbmVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JQYW5lbENoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiQWNjb3JkaW9uQ29uZmlnKSB7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5jbG9zZU90aGVyUGFuZWxzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHBhbmVsIHdpdGggYSBnaXZlbiBpZCBpcyBleHBhbmRlZC5cbiAgICovXG4gIGlzRXhwYW5kZWQocGFuZWxJZDogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmFjdGl2ZUlkcy5pbmRleE9mKHBhbmVsSWQpID4gLTE7IH1cblxuICAvKipcbiAgICogRXhwYW5kcyBhIHBhbmVsIHdpdGggYSBnaXZlbiBpZC5cbiAgICpcbiAgICogSGFzIG5vIGVmZmVjdCBpZiB0aGUgcGFuZWwgaXMgYWxyZWFkeSBleHBhbmRlZCBvciBkaXNhYmxlZC5cbiAgICovXG4gIGV4cGFuZChwYW5lbElkOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIHRydWUpOyB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYWxsIHBhbmVscywgaWYgYFtjbG9zZU90aGVyc11gIGlzIGBmYWxzZWAuXG4gICAqXG4gICAqIElmIGBbY2xvc2VPdGhlcnNdYCBpcyBgdHJ1ZWAsIGl0IHdpbGwgZXhwYW5kIHRoZSBmaXJzdCBwYW5lbCwgdW5sZXNzIHRoZXJlIGlzIGFscmVhZHkgYSBwYW5lbCBvcGVuZWQuXG4gICAqL1xuICBleHBhbmRBbGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xvc2VPdGhlclBhbmVscykge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMucGFuZWxzLmZpcnN0LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsIHRydWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGFwc2VzIGEgcGFuZWwgd2l0aCB0aGUgZ2l2ZW4gaWQuXG4gICAqXG4gICAqIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGFscmVhZHkgY29sbGFwc2VkIG9yIGRpc2FibGVkLlxuICAgKi9cbiAgY29sbGFwc2UocGFuZWxJZDogc3RyaW5nKSB7IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZSh0aGlzLl9maW5kUGFuZWxCeUlkKHBhbmVsSWQpLCBmYWxzZSk7IH1cblxuICAvKipcbiAgICogQ29sbGFwc2VzIGFsbCBvcGVuZWQgcGFuZWxzLlxuICAgKi9cbiAgY29sbGFwc2VBbGwoKSB7XG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaCgocGFuZWwpID0+IHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCBmYWxzZSk7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYSBwYW5lbCB3aXRoIHRoZSBnaXZlbiBpZC5cbiAgICpcbiAgICogSGFzIG5vIGVmZmVjdCBpZiB0aGUgcGFuZWwgaXMgZGlzYWJsZWQuXG4gICAqL1xuICB0b2dnbGUocGFuZWxJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLl9maW5kUGFuZWxCeUlkKHBhbmVsSWQpO1xuICAgIGlmIChwYW5lbCkge1xuICAgICAgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCAhcGFuZWwuaXNPcGVuKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYWN0aXZlIGlkIHVwZGF0ZXNcbiAgICBpZiAoaXNTdHJpbmcodGhpcy5hY3RpdmVJZHMpKSB7XG4gICAgICB0aGlzLmFjdGl2ZUlkcyA9IHRoaXMuYWN0aXZlSWRzLnNwbGl0KC9cXHMqLFxccyovKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgcGFuZWxzIG9wZW4gc3RhdGVzXG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5pc09wZW4gPSAhcGFuZWwuZGlzYWJsZWQgJiYgdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbC5pZCkgPiAtMSk7XG5cbiAgICAvLyBjbG9zZU90aGVycyB1cGRhdGVzXG4gICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICB0aGlzLl9jbG9zZU90aGVycyh0aGlzLmFjdGl2ZUlkc1swXSk7XG4gICAgICB0aGlzLl91cGRhdGVBY3RpdmVJZHMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2VPcGVuU3RhdGUocGFuZWw6IE5nYlBhbmVsIHwgbnVsbCwgbmV4dFN0YXRlOiBib29sZWFuKSB7XG4gICAgaWYgKHBhbmVsICE9IG51bGwgJiYgIXBhbmVsLmRpc2FibGVkICYmIHBhbmVsLmlzT3BlbiAhPT0gbmV4dFN0YXRlKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnBhbmVsQ2hhbmdlLmVtaXQoXG4gICAgICAgICAge3BhbmVsSWQ6IHBhbmVsLmlkLCBuZXh0U3RhdGU6IG5leHRTdGF0ZSwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9IG5leHRTdGF0ZTtcblxuICAgICAgICBpZiAobmV4dFN0YXRlICYmIHRoaXMuY2xvc2VPdGhlclBhbmVscykge1xuICAgICAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHBhbmVsLmlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVBY3RpdmVJZHMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZU90aGVycyhwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcbiAgICAgIGlmIChwYW5lbC5pZCAhPT0gcGFuZWxJZCkge1xuICAgICAgICBwYW5lbC5pc09wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZDogc3RyaW5nKTogTmdiUGFuZWwgfCBudWxsIHsgcmV0dXJuIHRoaXMucGFuZWxzLmZpbmQocCA9PiBwLmlkID09PSBwYW5lbElkKSB8fCBudWxsOyB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xuICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5wYW5lbHMuZmlsdGVyKHBhbmVsID0+IHBhbmVsLmlzT3BlbiAmJiAhcGFuZWwuZGlzYWJsZWQpLm1hcChwYW5lbCA9PiBwYW5lbC5pZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gYSBidXR0b24gdGhhdCB0b2dnbGVzIHBhbmVsIG9wZW5pbmcgYW5kIGNsb3NpbmcuXG4gKlxuICogVG8gYmUgdXNlZCBpbnNpZGUgdGhlIFtgTmdiUGFuZWxIZWFkZXJgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbEhlYWRlcilcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW25nYlBhbmVsVG9nZ2xlXScsXG4gIGhvc3Q6IHtcbiAgICAndHlwZSc6ICdidXR0b24nLFxuICAgICdbZGlzYWJsZWRdJzogJ3BhbmVsLmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNvbGxhcHNlZF0nOiAnIXBhbmVsLmlzT3BlbicsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ3BhbmVsLmlzT3BlbicsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ3BhbmVsLmlkJyxcbiAgICAnKGNsaWNrKSc6ICdhY2NvcmRpb24udG9nZ2xlKHBhbmVsLmlkKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbFRvZ2dsZSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uZ2JQYW5lbFRvZ2dsZTogTmdiUGFuZWwgfCAnJztcblxuICBASW5wdXQoKVxuICBzZXQgbmdiUGFuZWxUb2dnbGUocGFuZWw6IE5nYlBhbmVsKSB7XG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICB0aGlzLnBhbmVsID0gcGFuZWw7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFjY29yZGlvbjogTmdiQWNjb3JkaW9uLCBAT3B0aW9uYWwoKSBASG9zdCgpIHB1YmxpYyBwYW5lbDogTmdiUGFuZWwpIHt9XG59XG4iXX0=