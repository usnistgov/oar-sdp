import { Injectable, ɵɵdefineInjectable, Directive, TemplateRef, Input, ContentChildren, EventEmitter, Component, ViewEncapsulation, Output, Optional, Host, NgModule, ChangeDetectionStrategy, Renderer2, ElementRef, forwardRef, ChangeDetectorRef, Inject, PLATFORM_ID, NgZone, HostListener, LOCALE_ID, ɵɵinject, ViewChild, ContentChild, ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef, RendererFactory2, INJECTOR, Attribute, InjectionToken } from '@angular/core';
import { CommonModule, isPlatformBrowser, getLocaleDayNames, FormStyle, TranslationWidth, getLocaleMonthNames, formatDate, DOCUMENT, getLocaleDayPeriods } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { Subject, BehaviorSubject, combineLatest, timer, NEVER, fromEvent, merge, race, Observable } from 'rxjs';
import { map, startWith, distinctUntilChanged, switchMap, takeUntil, filter, take, tap, withLatestFrom, delay, share } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function toInteger(value) {
    return parseInt(`${value}`, 10);
}
/**
 * @param {?} value
 * @return {?}
 */
function toString(value) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}
/**
 * @param {?} value
 * @param {?} max
 * @param {?=} min
 * @return {?}
 */
function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
/**
 * @param {?} value
 * @return {?}
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
function isNumber(value) {
    return !isNaN(toInteger(value));
}
/**
 * @param {?} value
 * @return {?}
 */
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * @param {?} value
 * @return {?}
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
/**
 * @param {?} text
 * @return {?}
 */
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function hasClassName(element, className) {
    return element && element.className && element.className.split &&
        element.className.split(/\s+/).indexOf(className) >= 0;
}
if (typeof Element !== 'undefined' && !Element.prototype.closest) {
    // Polyfill for ie10+
    if (!Element.prototype.matches) {
        // IE uses the non-standard name: msMatchesSelector
        Element.prototype.matches = ((/** @type {?} */ (Element.prototype))).msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = (/**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        /** @type {?} */
        let el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    });
}
/**
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
function closest(element, selector) {
    if (!selector) {
        return null;
    }
    return element.closest(selector);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [NgbAccordion](#/components/accordion/api#NgbAccordion) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
class NgbAccordionConfig {
    constructor() {
        this.closeOthers = false;
    }
}
NgbAccordionConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbAccordionConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbAccordionConfig_Factory() { return new NgbAccordionConfig(); }, token: NgbAccordionConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId = 0;
/**
 * A directive that wraps an accordion panel header with any HTML markup and a toggling button
 * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
 * See the [header customization demo](#/components/accordion/examples#header) for more details.
 *
 * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
 *
 * \@since 4.1.0
 */
class NgbPanelHeader {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelHeader.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelHeader]' },] }
];
/** @nocollapse */
NgbPanelHeader.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive that wraps only the panel title with HTML markup inside.
 *
 * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
 */
class NgbPanelTitle {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelTitle.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelTitle]' },] }
];
/** @nocollapse */
NgbPanelTitle.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive that wraps the accordion panel content.
 */
class NgbPanelContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelContent]' },] }
];
/** @nocollapse */
NgbPanelContent.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 */
class NgbPanel {
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
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.headerTpl = this.headerTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
}
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
/**
 * Accordion is a collection of collapsible panels (bootstrap cards).
 *
 * It can ensure only one panel is opened at a time and allows to customize panel
 * headers.
 */
class NgbAccordion {
    /**
     * @param {?} config
     */
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
     * @param {?} panelId
     * @return {?}
     */
    isExpanded(panelId) { return this.activeIds.indexOf(panelId) > -1; }
    /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     * @param {?} panelId
     * @return {?}
     */
    expand(panelId) { this._changeOpenState(this._findPanelById(panelId), true); }
    /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     * @return {?}
     */
    expandAll() {
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
            panel => this._changeOpenState(panel, true)));
        }
    }
    /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     * @param {?} panelId
     * @return {?}
     */
    collapse(panelId) { this._changeOpenState(this._findPanelById(panelId), false); }
    /**
     * Collapses all opened panels.
     * @return {?}
     */
    collapseAll() {
        this.panels.forEach((/**
         * @param {?} panel
         * @return {?}
         */
        (panel) => { this._changeOpenState(panel, false); }));
    }
    /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     * @param {?} panelId
     * @return {?}
     */
    toggle(panelId) {
        /** @type {?} */
        const panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach((/**
         * @param {?} panel
         * @return {?}
         */
        panel => panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1));
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    }
    /**
     * @private
     * @param {?} panel
     * @param {?} nextState
     * @return {?}
     */
    _changeOpenState(panel, nextState) {
        if (panel && !panel.disabled && panel.isOpen !== nextState) {
            /** @type {?} */
            let defaultPrevented = false;
            this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: (/**
                 * @return {?}
                 */
                () => { defaultPrevented = true; }) });
            if (!defaultPrevented) {
                panel.isOpen = nextState;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
            }
        }
    }
    /**
     * @private
     * @param {?} panelId
     * @return {?}
     */
    _closeOthers(panelId) {
        this.panels.forEach((/**
         * @param {?} panel
         * @return {?}
         */
        panel => {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        }));
    }
    /**
     * @private
     * @param {?} panelId
     * @return {?}
     */
    _findPanelById(panelId) { return this.panels.find((/**
     * @param {?} p
     * @return {?}
     */
    p => p.id === panelId)); }
    /**
     * @private
     * @return {?}
     */
    _updateActiveIds() {
        this.activeIds = this.panels.filter((/**
         * @param {?} panel
         * @return {?}
         */
        panel => panel.isOpen && !panel.disabled)).map((/**
         * @param {?} panel
         * @return {?}
         */
        panel => panel.id));
    }
}
NgbAccordion.decorators = [
    { type: Component, args: [{
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
               <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef"></ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
NgbAccordion.ctorParameters = () => [
    { type: NgbAccordionConfig }
];
NgbAccordion.propDecorators = {
    panels: [{ type: ContentChildren, args: [NgbPanel,] }],
    activeIds: [{ type: Input }],
    closeOtherPanels: [{ type: Input, args: ['closeOthers',] }],
    destroyOnHide: [{ type: Input }],
    type: [{ type: Input }],
    panelChange: [{ type: Output }]
};
/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * \@since 4.1.0
 */
class NgbPanelToggle {
    /**
     * @param {?} accordion
     * @param {?} panel
     */
    constructor(accordion, panel) {
        this.accordion = accordion;
        this.panel = panel;
    }
    /**
     * @param {?} panel
     * @return {?}
     */
    set ngbPanelToggle(panel) {
        if (panel) {
            this.panel = panel;
        }
    }
}
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
NgbPanelToggle.ctorParameters = () => [
    { type: NgbAccordion },
    { type: NgbPanel, decorators: [{ type: Optional }, { type: Host }] }
];
NgbPanelToggle.propDecorators = {
    ngbPanelToggle: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbPanelHeader, NgbPanelToggle];
class NgbAccordionModule {
}
NgbAccordionModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all alerts used in the application.
 */
class NgbAlertConfig {
    constructor() {
        this.dismissible = true;
        this.type = 'warning';
    }
}
NgbAlertConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbAlertConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbAlertConfig_Factory() { return new NgbAlertConfig(); }, token: NgbAlertConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
class NgbAlert {
    /**
     * @param {?} config
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(config, _renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         */
        this.close = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
    }
    /**
     * @return {?}
     */
    closeHandler() { this.close.emit(null); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, `alert-${typeChange.previousValue}`);
            this._renderer.addClass(this._element.nativeElement, `alert-${typeChange.currentValue}`);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { this._renderer.addClass(this._element.nativeElement, `alert-${this.type}`); }
}
NgbAlert.decorators = [
    { type: Component, args: [{
                selector: 'ngb-alert',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { 'role': 'alert', 'class': 'alert', '[class.alert-dismissible]': 'dismissible' },
                template: `
    <ng-content></ng-content>
    <button *ngIf="dismissible" type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="closeHandler()">
      <span aria-hidden="true">&times;</span>
    </button>
    `,
                styles: ["ngb-alert{display:block}"]
            }] }
];
/** @nocollapse */
NgbAlert.ctorParameters = () => [
    { type: NgbAlertConfig },
    { type: Renderer2 },
    { type: ElementRef }
];
NgbAlert.propDecorators = {
    dismissible: [{ type: Input }],
    type: [{ type: Input }],
    close: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbAlertModule {
}
NgbAlertModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbAlert], exports: [NgbAlert], imports: [CommonModule], entryComponents: [NgbAlert] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbButtonLabel {
}
NgbButtonLabel.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButtonLabel]',
                host: { '[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused' }
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbCheckBox)),
    multi: true
};
/**
 * Allows to easily create Bootstrap-style checkbox buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
class NgbCheckBox {
    /**
     * @param {?} _label
     * @param {?} _cd
     */
    constructor(_label, _cd) {
        this._label = _label;
        this._cd = _cd;
        /**
         * If `true`, the checkbox button will be disabled
         */
        this.disabled = false;
        /**
         * The form control value when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * The form control value when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        this._label.focused = isFocused;
        if (!isFocused) {
            this.onTouched();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        /** @type {?} */
        const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        this._cd.markForCheck();
    }
}
NgbCheckBox.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=checkbox]',
                host: {
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '(change)': 'onInputChange($event)',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                },
                providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
NgbCheckBox.ctorParameters = () => [
    { type: NgbButtonLabel },
    { type: ChangeDetectorRef }
];
NgbCheckBox.propDecorators = {
    disabled: [{ type: Input }],
    valueChecked: [{ type: Input }],
    valueUnChecked: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbRadioGroup)),
    multi: true
};
/** @type {?} */
let nextId$1 = 0;
/**
 * Allows to easily create Bootstrap-style radio buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
class NgbRadioGroup {
    constructor() {
        this._radios = new Set();
        this._value = null;
        /**
         * Name of the radio group applied to radio input elements.
         *
         * Will be applied to all radio input elements inside the group,
         * unless [`NgbRadio`](#/components/buttons/api#NgbRadio)'s specify names themselves.
         *
         * If not provided, will be generated in the `ngb-radio-xx` format.
         */
        this.name = `ngb-radio-${nextId$1++}`;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) { this.setDisabledState(isDisabled); }
    /**
     * @param {?} radio
     * @return {?}
     */
    onRadioChange(radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    }
    /**
     * @return {?}
     */
    onRadioValueUpdate() { this._updateRadiosValue(); }
    /**
     * @param {?} radio
     * @return {?}
     */
    register(radio) { this._radios.add(radio); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    }
    /**
     * @param {?} radio
     * @return {?}
     */
    unregister(radio) { this._radios.delete(radio); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value = value;
        this._updateRadiosValue();
    }
    /**
     * @private
     * @return {?}
     */
    _updateRadiosValue() { this._radios.forEach((/**
     * @param {?} radio
     * @return {?}
     */
    (radio) => radio.updateValue(this._value))); }
    /**
     * @private
     * @return {?}
     */
    _updateRadiosDisabled() { this._radios.forEach((/**
     * @param {?} radio
     * @return {?}
     */
    (radio) => radio.updateDisabled())); }
}
NgbRadioGroup.decorators = [
    { type: Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'radiogroup' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] }
];
NgbRadioGroup.propDecorators = {
    name: [{ type: Input }]
};
/**
 * A directive that marks an input of type "radio" as a part of the
 * [`NgbRadioGroup`](#/components/buttons/api#NgbRadioGroup).
 */
class NgbRadio {
    /**
     * @param {?} _group
     * @param {?} _label
     * @param {?} _renderer
     * @param {?} _element
     * @param {?} _cd
     */
    constructor(_group, _label, _renderer, _element, _cd) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._cd = _cd;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    /**
     * The form control value when current radio button is checked.
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        /** @type {?} */
        const stringValue = value ? value.toString() : '';
        this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
        this._group.onRadioValueUpdate();
    }
    /**
     * If `true`, current radio button will be disabled.
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) {
        this._disabled = isDisabled !== false;
        this.updateDisabled();
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        if (this._label) {
            this._label.focused = isFocused;
        }
        if (!isFocused) {
            this._group.onTouched();
        }
    }
    /**
     * @return {?}
     */
    get checked() { return this._checked; }
    /**
     * @return {?}
     */
    get disabled() { return this._group.disabled || this._disabled; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get nameAttr() { return this.name || this._group.name; }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._group.unregister(this); }
    /**
     * @return {?}
     */
    onChange() { this._group.onRadioChange(this); }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        if (this.value !== value) {
            this._cd.markForCheck();
        }
        this._checked = this.value === value;
        this._label.active = this._checked;
    }
    /**
     * @return {?}
     */
    updateDisabled() { this._label.disabled = this.disabled; }
}
NgbRadio.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=radio]',
                host: {
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '[name]': 'nameAttr',
                    '(change)': 'onChange()',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                }
            },] }
];
/** @nocollapse */
NgbRadio.ctorParameters = () => [
    { type: NgbRadioGroup },
    { type: NgbButtonLabel },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NgbRadio.propDecorators = {
    name: [{ type: Input }],
    value: [{ type: Input, args: ['value',] }],
    disabled: [{ type: Input, args: ['disabled',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_BUTTON_DIRECTIVES = [NgbButtonLabel, NgbCheckBox, NgbRadioGroup, NgbRadio];
class NgbButtonsModule {
}
NgbButtonsModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [NgbCarousel](#/components/carousel/api#NgbCarousel) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all carousels used in the application.
 */
class NgbCarouselConfig {
    constructor() {
        this.interval = 5000;
        this.wrap = true;
        this.keyboard = true;
        this.pauseOnHover = true;
        this.showNavigationArrows = true;
        this.showNavigationIndicators = true;
    }
}
NgbCarouselConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbCarouselConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbCarouselConfig_Factory() { return new NgbCarouselConfig(); }, token: NgbCarouselConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$2 = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
class NgbSlide {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = `ngb-slide-${nextId$2++}`;
    }
}
NgbSlide.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
];
/** @nocollapse */
NgbSlide.ctorParameters = () => [
    { type: TemplateRef }
];
NgbSlide.propDecorators = {
    id: [{ type: Input }]
};
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
class NgbCarousel {
    /**
     * @param {?} config
     * @param {?} _platformId
     * @param {?} _ngZone
     * @param {?} _cd
     */
    constructor(config, _platformId, _ngZone, _cd) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._destroy$ = new Subject();
        this._interval$ = new BehaviorSubject(0);
        this._mouseHover$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(false);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(false);
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    /**
     * Time in milliseconds before the next slide is shown.
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this._interval$.next(value);
    }
    /**
     * @return {?}
     */
    get interval() { return this._interval$.value; }
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     * @param {?} value
     * @return {?}
     */
    set wrap(value) {
        this._wrap$.next(value);
    }
    /**
     * @return {?}
     */
    get wrap() { return this._wrap$.value; }
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * \@since 2.2.0
     * @param {?} value
     * @return {?}
     */
    set pauseOnHover(value) {
        this._pauseOnHover$.next(value);
    }
    /**
     * @return {?}
     */
    get pauseOnHover() { return this._pauseOnHover$.value; }
    /**
     * @return {?}
     */
    mouseEnter() {
        this._mouseHover$.next(true);
    }
    /**
     * @return {?}
     */
    mouseLeave() {
        this._mouseHover$.next(false);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const hasNextSlide$ = combineLatest(this.slide.pipe(map((/**
                 * @param {?} slideEvent
                 * @return {?}
                 */
                slideEvent => slideEvent.current)), startWith(this.activeId)), this._wrap$, this.slides.changes.pipe(startWith(null)))
                    .pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ([currentSlideId, wrap]) => {
                    /** @type {?} */
                    const slideArr = this.slides.toArray();
                    /** @type {?} */
                    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                })), distinctUntilChanged());
                combineLatest(this._pause$, this._pauseOnHover$, this._mouseHover$, this._interval$, hasNextSlide$)
                    .pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ([pause, pauseOnHover, mouseHover, interval, hasNextSlide]) => ((pause || (pauseOnHover && mouseHover) || !hasNextSlide) ? 0 : interval))), distinctUntilChanged(), switchMap((/**
                 * @param {?} interval
                 * @return {?}
                 */
                interval => interval > 0 ? timer(interval, interval) : NEVER)), takeUntil(this._destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                () => this._ngZone.run((/**
                 * @return {?}
                 */
                () => this.next(NgbSlideEventSource.TIMER)))));
            }));
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe((/**
         * @return {?}
         */
        () => this._cd.markForCheck()));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        /** @type {?} */
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._destroy$.next(); }
    /**
     * Navigates to a slide with the specified identifier.
     * @param {?} slideId
     * @param {?=} source
     * @return {?}
     */
    select(slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    }
    /**
     * Navigates to the previous slide.
     * @param {?=} source
     * @return {?}
     */
    prev(source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT, source);
    }
    /**
     * Navigates to the next slide.
     * @param {?=} source
     * @return {?}
     */
    next(source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT, source);
    }
    /**
     * Pauses cycling through the slides.
     * @return {?}
     */
    pause() { this._pause$.next(true); }
    /**
     * Restarts cycling through the slides from left to right.
     * @return {?}
     */
    cycle() { this._pause$.next(false); }
    /**
     * @private
     * @param {?} slideIdx
     * @param {?} direction
     * @param {?=} source
     * @return {?}
     */
    _cycleToSelected(slideIdx, direction, source) {
        /** @type {?} */
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source });
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    }
    /**
     * @private
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        /** @type {?} */
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        /** @type {?} */
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    }
    /**
     * @private
     * @param {?} slideId
     * @return {?}
     */
    _getSlideById(slideId) { return this.slides.find((/**
     * @param {?} slide
     * @return {?}
     */
    slide => slide.id === slideId)); }
    /**
     * @private
     * @param {?} slideId
     * @return {?}
     */
    _getSlideIdxById(slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    }
    /**
     * @private
     * @param {?} currentSlideId
     * @return {?}
     */
    _getNextSlide(currentSlideId) {
        /** @type {?} */
        const slideArr = this.slides.toArray();
        /** @type {?} */
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    }
    /**
     * @private
     * @param {?} currentSlideId
     * @return {?}
     */
    _getPrevSlide(currentSlideId) {
        /** @type {?} */
        const slideArr = this.slides.toArray();
        /** @type {?} */
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    }
}
NgbCarousel.decorators = [
    { type: Component, args: [{
                selector: 'ngb-carousel',
                exportAs: 'ngbCarousel',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'carousel slide',
                    '[style.display]': '"block"',
                    'tabIndex': '0',
                    '(keydown.arrowLeft)': 'keyboard && prev(NgbSlideEventSource.ARROW_LEFT)',
                    '(keydown.arrowRight)': 'keyboard && next(NgbSlideEventSource.ARROW_RIGHT)'
                },
                template: `
    <ol class="carousel-indicators" *ngIf="showNavigationIndicators">
      <li *ngFor="let slide of slides" [id]="slide.id" [class.active]="slide.id === activeId"
          (click)="select(slide.id, NgbSlideEventSource.INDICATOR)"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides" class="carousel-item" [class.active]="slide.id === activeId">
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="prev(NgbSlideEventSource.ARROW_LEFT)" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="next(NgbSlideEventSource.ARROW_RIGHT)" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
            }] }
];
/** @nocollapse */
NgbCarousel.ctorParameters = () => [
    { type: NgbCarouselConfig },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
NgbCarousel.propDecorators = {
    slides: [{ type: ContentChildren, args: [NgbSlide,] }],
    activeId: [{ type: Input }],
    interval: [{ type: Input }],
    wrap: [{ type: Input }],
    keyboard: [{ type: Input }],
    pauseOnHover: [{ type: Input }],
    showNavigationArrows: [{ type: Input }],
    showNavigationIndicators: [{ type: Input }],
    slide: [{ type: Output }],
    mouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    mouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
/** @enum {string} */
const NgbSlideEventDirection = {
    LEFT: (/** @type {?} */ ('left')),
    RIGHT: (/** @type {?} */ ('right')),
};
/** @enum {string} */
const NgbSlideEventSource = {
    TIMER: 'timer',
    ARROW_LEFT: 'arrowLeft',
    ARROW_RIGHT: 'arrowRight',
    INDICATOR: 'indicator',
};
/** @type {?} */
const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbCarouselModule {
}
NgbCarouselModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive to provide a simple way of hiding and showing elements on the page.
 */
class NgbCollapse {
    constructor() {
        /**
         * If `true`, will collapse the element or show it otherwise.
         */
        this.collapsed = false;
    }
}
NgbCollapse.decorators = [
    { type: Directive, args: [{
                selector: '[ngbCollapse]',
                exportAs: 'ngbCollapse',
                host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
            },] }
];
NgbCollapse.propDecorators = {
    collapsed: [{ type: Input, args: ['ngbCollapse',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbCollapseModule {
}
NgbCollapseModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbCollapse], exports: [NgbCollapse] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A simple class that represents a date that datepicker also uses internally.
 *
 * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
 * like `.equals()`, `.before()`, etc.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * In many cases it is simpler to manipulate these objects together with
 * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 *
 * \@since 3.0.0
 */
class NgbDate {
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     * @param {?} date
     * @return {?}
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     */
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if the current date is equal to another date.
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if the current date is before another date.
     * @param {?} other
     * @return {?}
     */
    before(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    }
    /**
     * Checks if the current date is after another date.
     * @param {?} other
     * @return {?}
     */
    after(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} jsDate
 * @return {?}
 */
function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
/**
 * @param {?} date
 * @return {?}
 */
function toJSDate(date) {
    /** @type {?} */
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
/**
 * @return {?}
 */
function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 * @abstract
 */
class NgbCalendar {
}
NgbCalendar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] }
];
/** @nocollapse */ NgbCalendar.ngInjectableDef = ɵɵdefineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
class NgbCalendarGregorian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        /** @type {?} */
        let checkMonth = true;
        /** @type {?} */
        let expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromJSDate(jsDate);
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        /** @type {?} */
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        let date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromJSDate(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        /** @type {?} */
        const jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    }
}
NgbCalendarGregorian.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function isChangedMonth(prev, next) {
    return !prev && !next ? false : !prev || !next ? true : prev.year !== next.year || prev.month !== next.month;
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
/**
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
    }
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} state
 * @return {?}
 */
function isDateSelectable(date, state) {
    const { minDate, maxDate, disabled, markDisabled } = state;
    // clang-format off
    return !(!isDefined(date) ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
    // clang-format on
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    let months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        /** @type {?} */
        const index = months.findIndex((/**
         * @param {?} month
         * @return {?}
         */
        month => month === minDate.month));
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        /** @type {?} */
        const index = months.findIndex((/**
         * @param {?} month
         * @return {?}
         */
        month => month === maxDate.month));
        months = months.slice(0, index + 1);
    }
    return months;
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    const start = minDate ? Math.max(minDate.year, date.year - 500) : date.year - 10;
    /** @type {?} */
    const end = maxDate ? Math.min(maxDate.year, date.year + 500) : date.year + 10;
    /** @type {?} */
    const length = end - start + 1;
    /** @type {?} */
    const numbers = Array(length);
    for (let i = 0; i < length; i++) {
        numbers[i] = start + i;
    }
    return numbers;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} maxDate
 * @return {?}
 */
function nextMonthDisabled(calendar, date, maxDate) {
    /** @type {?} */
    const nextDate = Object.assign(calendar.getNext(date, 'm'), { day: 1 });
    return maxDate && nextDate.after(maxDate);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @return {?}
 */
function prevMonthDisabled(calendar, date, minDate) {
    /** @type {?} */
    const prevDate = Object.assign(calendar.getPrev(date, 'm'), { day: 1 });
    return minDate && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
        prevDate.year < minDate.year && minDate.month === 1);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?} force
 * @return {?}
 */
function buildMonths(calendar, date, state, i18n, force) {
    const { displayMonths, months } = state;
    // move old months to a temporary array
    /** @type {?} */
    const monthsToReuse = months.splice(0, months.length);
    // generate new first dates, nullify or reuse months
    /** @type {?} */
    const firstDates = Array.from({ length: displayMonths }, (/**
     * @param {?} _
     * @param {?} i
     * @return {?}
     */
    (_, i) => {
        /** @type {?} */
        const firstDate = Object.assign(calendar.getNext(date, 'm', i), { day: 1 });
        months[i] = null;
        if (!force) {
            /** @type {?} */
            const reusedIndex = monthsToReuse.findIndex((/**
             * @param {?} month
             * @return {?}
             */
            month => month.firstDate.equals(firstDate)));
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    }));
    // rebuild nullified months
    firstDates.forEach((/**
     * @param {?} firstDate
     * @param {?} i
     * @return {?}
     */
    (firstDate, i) => {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || (/** @type {?} */ ({})));
        }
    }));
    return months;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?=} month
 * @return {?}
 */
function buildMonth(calendar, date, state, i18n, month = (/** @type {?} */ ({}))) {
    const { dayTemplateData, minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays } = state;
    /** @type {?} */
    const calendarToday = calendar.getToday();
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // month has weeks
    for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
        /** @type {?} */
        let weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        /** @type {?} */
        const days = weekObject.days;
        // week has days
        for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0) {
                month.weekdays[day] = calendar.getWeekday(date);
            }
            /** @type {?} */
            const newDate = new NgbDate(date.year, date.month, date.day);
            /** @type {?} */
            const nextDate = calendar.getNext(newDate);
            /** @type {?} */
            const ariaLabel = i18n.getDayAriaLabel(newDate);
            // marking date as disabled
            /** @type {?} */
            let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // today
            /** @type {?} */
            let today = newDate.equals(calendarToday);
            // adding user-provided data to the context
            /** @type {?} */
            let contextUserData = dayTemplateData ? dayTemplateData(newDate, { month: month.number, year: month.year }) : undefined;
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            /** @type {?} */
            let dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = (/** @type {?} */ ({}));
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, {
                $implicit: newDate,
                date: newDate,
                data: contextUserData,
                currentMonth: month.number,
                currentYear: month.year, disabled,
                focused: false,
                selected: false, today
            });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map((/**
         * @param {?} day
         * @return {?}
         */
        day => day.date)), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
            days[days.length - 1].date.month !== month.number;
    }
    return month;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} firstDayOfWeek
 * @return {?}
 */
function getFirstViewDate(calendar, date, firstDayOfWeek) {
    /** @type {?} */
    const daysPerWeek = calendar.getDaysPerWeek();
    /** @type {?} */
    const firstMonthDate = new NgbDate(date.year, date.month, 1);
    /** @type {?} */
    const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} locale
 * @return {?}
 */
function NGB_DATEPICKER_18N_FACTORY(locale) {
    return new NgbDatepickerI18nDefault(locale);
}
/**
 * A service supplying i18n data to the datepicker component.
 *
 * The default implementation of this service uses the Angular locale and registered locale data for
 * weekdays and month names (as explained in the Angular i18n guide).
 *
 * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
 * numerals. For other static labels the datepicker uses the default Angular i18n.
 *
 * See the [i18n demo](#/components/datepicker/examples#i18n) and
 * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
 * a custom provider for i18n.
 * @abstract
 */
class NgbDatepickerI18n {
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * \@since 3.0.0
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return `${date.day}`; }
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * \@since 3.0.0
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return `${weekNumber}`; }
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * \@since 3.0.0
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return `${year}`; }
}
NgbDatepickerI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID] },] }
];
/** @nocollapse */ NgbDatepickerI18n.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbDatepickerI18n_Factory() { return NGB_DATEPICKER_18N_FACTORY(ɵɵinject(LOCALE_ID)); }, token: NgbDatepickerI18n, providedIn: "root" });
class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    /**
     * @param {?} _locale
     */
    constructor(_locale) {
        super();
        this._locale = _locale;
        /** @type {?} */
        const weekdaysStartingOnSunday = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
        this._weekdaysShort = weekdaysStartingOnSunday.map((/**
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        (day, index) => weekdaysStartingOnSunday[(index + 1) % 7]));
        this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return this._weekdaysShort[weekday - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthShortName(month) { return this._monthsShort[month - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthFullName(month) { return this._monthsFull[month - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
}
NgbDatepickerI18nDefault.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbDatepickerService {
    /**
     * @param {?} _calendar
     * @param {?} _i18n
     */
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._VALIDATORS = {
            dayTemplateData: (/**
             * @param {?} dayTemplateData
             * @return {?}
             */
            (dayTemplateData) => {
                if (this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData };
                }
            }),
            displayMonths: (/**
             * @param {?} displayMonths
             * @return {?}
             */
            (displayMonths) => {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    return { displayMonths };
                }
            }),
            disabled: (/**
             * @param {?} disabled
             * @return {?}
             */
            (disabled) => {
                if (this._state.disabled !== disabled) {
                    return { disabled };
                }
            }),
            firstDayOfWeek: (/**
             * @param {?} firstDayOfWeek
             * @return {?}
             */
            (firstDayOfWeek) => {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek };
                }
            }),
            focusVisible: (/**
             * @param {?} focusVisible
             * @return {?}
             */
            (focusVisible) => {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    return { focusVisible };
                }
            }),
            markDisabled: (/**
             * @param {?} markDisabled
             * @return {?}
             */
            (markDisabled) => {
                if (this._state.markDisabled !== markDisabled) {
                    return { markDisabled };
                }
            }),
            maxDate: (/**
             * @param {?} date
             * @return {?}
             */
            (date) => {
                /** @type {?} */
                const maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    return { maxDate };
                }
            }),
            minDate: (/**
             * @param {?} date
             * @return {?}
             */
            (date) => {
                /** @type {?} */
                const minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    return { minDate };
                }
            }),
            navigation: (/**
             * @param {?} navigation
             * @return {?}
             */
            (navigation) => {
                if (this._state.navigation !== navigation) {
                    return { navigation };
                }
            }),
            outsideDays: (/**
             * @param {?} outsideDays
             * @return {?}
             */
            (outsideDays) => {
                if (this._state.outsideDays !== outsideDays) {
                    return { outsideDays };
                }
            })
        };
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    /**
     * @return {?}
     */
    get model$() { return this._model$.pipe(filter((/**
     * @param {?} model
     * @return {?}
     */
    model => model.months.length > 0))); }
    /**
     * @return {?}
     */
    get dateSelect$() { return this._dateSelect$.pipe(filter((/**
     * @param {?} date
     * @return {?}
     */
    date => date !== null))); }
    /**
     * @param {?} options
     * @return {?}
     */
    set(options) {
        /** @type {?} */
        let patch = Object.keys(options)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        key => this._VALIDATORS[key](options[key])))
            .reduce((/**
         * @param {?} obj
         * @param {?} part
         * @return {?}
         */
        (obj, part) => (Object.assign({}, obj, part))), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    focus(date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    }
    /**
     * @return {?}
     */
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    open(date) {
        /** @type {?} */
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled && (!this._state.firstDate || isChangedMonth(this._state.firstDate, date))) {
            this._nextState({ firstDate });
        }
    }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    select(date, options = {}) {
        /** @type {?} */
        const selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    }
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    toValidDate(date, defaultValue) {
        /** @type {?} */
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    /**
     * @param {?} struct
     * @return {?}
     */
    getMonth(struct) {
        for (let month of this._state.months) {
            if (struct.month === month.number && struct.year === month.year) {
                return month;
            }
        }
        throw new Error(`month ${struct.month} of year ${struct.year} not found`);
    }
    /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    _nextState(patch) {
        /** @type {?} */
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach((/**
         * @param {?} month
         * @return {?}
         */
        month => {
            month.weeks.forEach((/**
             * @param {?} week
             * @return {?}
             */
            week => {
                week.days.forEach((/**
                 * @param {?} day
                 * @return {?}
                 */
                day => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                }));
            }));
        }));
    }
    /**
     * @private
     * @param {?} patch
     * @return {?}
     */
    _updateState(patch) {
        // patching fields
        /** @type {?} */
        const state = Object.assign({}, this._state, patch);
        /** @type {?} */
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            const forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            /** @type {?} */
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
}
NgbDatepickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerService.ctorParameters = () => [
    { type: NgbCalendar },
    { type: NgbDatepickerI18n }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const NavigationEvent = {
    PREV: 0,
    NEXT: 1,
};
NavigationEvent[NavigationEvent.PREV] = 'PREV';
NavigationEvent[NavigationEvent.NEXT] = 'NEXT';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
}
NgbDatepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbDatepickerConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 * @abstract
 * @template D
 */
class NgbDateAdapter {
}
NgbDateAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] }
];
/** @nocollapse */ NgbDateAdapter.ngInjectableDef = ɵɵdefineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
}
NgbDateStructAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbDatepicker)),
    multi: true
};
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * \@since 5.3.0
 */
class NgbDatepickerContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbDatepickerContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbDatepickerContent]' },] }
];
/** @nocollapse */
NgbDatepickerContent.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
class NgbDatepicker {
    /**
     * @param {?} _service
     * @param {?} _calendar
     * @param {?} i18n
     * @param {?} config
     * @param {?} cd
     * @param {?} _elementRef
     * @param {?} _ngbDateAdapter
     * @param {?} _ngZone
     */
    constructor(_service, _calendar, i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this._destroyed$ = new Subject();
        this._publicState = (/** @type {?} */ ({}));
        /**
         * An event emitted right before the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * \@since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * Please use 'dateSelect' output instead, this will be deprecated in version 6.0 due to collision with native
         * 'select' event.
         */
        this.select = this.dateSelect;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach((/**
         * @param {?} input
         * @return {?}
         */
        input => this[input] = config[input]));
        _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe((/**
         * @param {?} date
         * @return {?}
         */
        date => { this.dateSelect.emit(date); }));
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe((/**
         * @param {?} model
         * @return {?}
         */
        model => {
            /** @type {?} */
            const newDate = model.firstDate;
            /** @type {?} */
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map((/**
                 * @param {?} viewModel
                 * @return {?}
                 */
                viewModel => viewModel.firstDate))
            };
            /** @type {?} */
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: (/**
                     * @return {?}
                     */
                    () => navigationPrevented = true)
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            /** @type {?} */
            const newSelectedDate = model.selectedDate;
            /** @type {?} */
            const newFocusedDate = model.focusDate;
            /** @type {?} */
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            cd.markForCheck();
        }));
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * \@since 5.2.0
     * @return {?}
     */
    get state() { return this._publicState; }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     * \@since 5.3.0
     * @return {?}
     */
    get calendar() { return this._calendar; }
    /**
     *  Focuses on given date.
     * @param {?} date
     * @return {?}
     */
    focusDate(date) { this._service.focus(NgbDate.from(date)); }
    /**
     *  Selects focused date.
     * @return {?}
     */
    focusSelect() { this._service.focusSelect(); }
    /**
     * @return {?}
     */
    focus() {
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        }));
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? date.day ? (/** @type {?} */ (date)) : Object.assign({}, date, { day: 1 }) : null));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            /** @type {?} */
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            const { nativeElement } = this._elementRef;
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ target, relatedTarget }) => !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day') &&
                nativeElement.contains((/** @type {?} */ (target))) && nativeElement.contains((/** @type {?} */ (relatedTarget)))))), takeUntil(this._destroyed$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ type }) => this._ngZone.run((/**
             * @return {?}
             */
            () => this._service.set({ focusVisible: type === 'focusin' })))));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._destroyed$.next(); }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.model === undefined) {
            /** @type {?} */
            const inputs = {};
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => inputs[name] = this[name]));
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const inputs = {};
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter((/**
         * @param {?} name
         * @return {?}
         */
        name => name in changes))
            .forEach((/**
         * @param {?} name
         * @return {?}
         */
        name => inputs[name] = this[name]));
        this._service.set(inputs);
        if ('startDate' in changes) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onNavigateDateSelect(date) { this._service.open(date); }
    /**
     * @param {?} event
     * @return {?}
     */
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabledState(disabled) { this._service.set({ disabled }); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
}
NgbDatepicker.decorators = [
    { type: Component, args: [{
                exportAs: 'ngbDatepicker',
                selector: 'ngb-datepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template #defaultDayTemplate let-date="date" let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <div ngbDatepickerDayView
        [date]="date"
        [currentMonth]="currentMonth"
        [selected]="selected"
        [disabled]="disabled"
        [focused]="focused">
      </div>
    </ng-template>

    <ng-template #defaultContentTemplate>
      <div *ngFor="let month of model.months; let i = index;" class="ngb-dp-month">
        <div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
          {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
        </div>
        <ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
      </div>
    </ng-template>

    <div class="ngb-dp-header">
      <ngb-datepicker-navigation *ngIf="navigation !== 'none'"
        [date]="model.firstDate"
        [months]="model.months"
        [disabled]="model.disabled"
        [showSelect]="model.navigation === 'select'"
        [prevDisabled]="model.prevDisabled"
        [nextDisabled]="model.nextDisabled"
        [selectBoxes]="model.selectBoxes"
        (navigate)="onNavigateEvent($event)"
        (select)="onNavigateDateSelect($event)">
      </ngb-datepicker-navigation>
    </div>

    <div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
      <ng-template [ngTemplateOutlet]="contentTemplate?.templateRef || defaultContentTemplate"></ng-template>
    </div>

    <ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
  `,
                providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService],
                styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}.ngb-dp-body{z-index:1050}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-months{display:-ms-flexbox;display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}"]
            }] }
];
/** @nocollapse */
NgbDatepicker.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar },
    { type: NgbDatepickerI18n },
    { type: NgbDatepickerConfig },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgbDateAdapter },
    { type: NgZone }
];
NgbDatepicker.propDecorators = {
    _defaultDayTemplate: [{ type: ViewChild, args: ['defaultDayTemplate', { static: true },] }],
    _contentEl: [{ type: ViewChild, args: ['content', { static: true },] }],
    contentTemplate: [{ type: ContentChild, args: [NgbDatepickerContent, { static: true },] }],
    dayTemplate: [{ type: Input }],
    dayTemplateData: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    footerTemplate: [{ type: Input }],
    markDisabled: [{ type: Input }],
    maxDate: [{ type: Input }],
    minDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    navigate: [{ type: Output }],
    dateSelect: [{ type: Output }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const Key = {
    Tab: 9,
    Enter: 13,
    Escape: 27,
    Space: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
};
Key[Key.Tab] = 'Tab';
Key[Key.Enter] = 'Enter';
Key[Key.Escape] = 'Escape';
Key[Key.Space] = 'Space';
Key[Key.PageUp] = 'PageUp';
Key[Key.PageDown] = 'PageDown';
Key[Key.End] = 'End';
Key[Key.Home] = 'Home';
Key[Key.ArrowLeft] = 'ArrowLeft';
Key[Key.ArrowUp] = 'ArrowUp';
Key[Key.ArrowRight] = 'ArrowRight';
Key[Key.ArrowDown] = 'ArrowDown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * \@since 5.2.0
 */
class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     * @param {?} event
     * @param {?} datepicker
     * @return {?}
     */
    processKey(event, datepicker) {
        const { state, calendar } = datepicker;
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.PageUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.PageDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.End:
                datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                break;
            case Key.Home:
                datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                break;
            case Key.ArrowLeft:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.ArrowRight:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.Enter:
            case Key.Space:
                datepicker.focusSelect();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
}
NgbDatepickerKeyboardService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbDatepickerKeyboardService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbDatepickerKeyboardService_Factory() { return new NgbDatepickerKeyboardService(); }, token: NgbDatepickerKeyboardService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * \@since 5.3.0
 */
class NgbDatepickerMonth {
    /**
     * @param {?} i18n
     * @param {?} datepicker
     * @param {?} _keyboardService
     * @param {?} _service
     */
    constructor(i18n, datepicker, _keyboardService, _service) {
        this.i18n = i18n;
        this.datepicker = datepicker;
        this._keyboardService = _keyboardService;
        this._service = _service;
    }
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     * @param {?} month
     * @return {?}
     */
    set month(month) {
        this.viewModel = this._service.getMonth(month);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) { this._keyboardService.processKey(event, this.datepicker); }
    /**
     * @param {?} day
     * @return {?}
     */
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.datepicker.onDateSelect(day.date);
        }
    }
}
NgbDatepickerMonth.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month',
                host: { 'role': 'grid', '(keydown)': 'onKeyDown($event)' },
                encapsulation: ViewEncapsulation.None,
                template: `
    <div *ngIf="datepicker.showWeekdays" class="ngb-dp-week ngb-dp-weekdays" role="row">
      <div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek"></div>
      <div *ngFor="let w of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="viewModel.weeks">
      <div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
        <div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day); $event.preventDefault()" class="ngb-dp-day" role="gridcell"
          [class.disabled]="day.context.disabled"
          [tabindex]="day.tabindex"
          [class.hidden]="day.hidden"
          [class.ngb-dp-today]="day.context.today"
          [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `,
                styles: ["ngb-datepicker-month{display:block}.ngb-dp-week-number,.ngb-dp-weekday{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:#5bc0de;color:var(--info)}.ngb-dp-week{border-radius:.25rem;display:-ms-flexbox;display:flex}.ngb-dp-weekdays{border-bottom:1px solid rgba(0,0,0,.125);border-radius:0;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-day,.ngb-dp-week-number,.ngb-dp-weekday{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default}.ngb-dp-day[tabindex=\"0\"]{z-index:1}"]
            }] }
];
/** @nocollapse */
NgbDatepickerMonth.ctorParameters = () => [
    { type: NgbDatepickerI18n },
    { type: NgbDatepicker },
    { type: NgbDatepickerKeyboardService },
    { type: NgbDatepickerService }
];
NgbDatepickerMonth.propDecorators = {
    month: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbDatepickerNavigation {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickPrev(event) {
        ((/** @type {?} */ (event.currentTarget))).focus();
        this.navigate.emit(this.navigation.PREV);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickNext(event) {
        ((/** @type {?} */ (event.currentTarget))).focus();
        this.navigate.emit(this.navigation.NEXT);
    }
}
NgbDatepickerNavigation.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickPrev($event)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickNext($event)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `,
                styles: ["ngb-datepicker-navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.right .ngb-dp-navigation-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{-ms-flex-pack:end;justify-content:flex-end}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:-ms-flexbox;display:flex;-ms-flex:1 1 9rem;flex:1 1 9rem}"]
            }] }
];
/** @nocollapse */
NgbDatepickerNavigation.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigation.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    showSelect: [{ type: Input }],
    prevDisabled: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    selectBoxes: [{ type: Input }],
    navigate: [{ type: Output }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isContainedIn = (/**
 * @param {?} element
 * @param {?=} array
 * @return {?}
 */
(element, array) => array ? array.some((/**
 * @param {?} item
 * @return {?}
 */
item => item.contains(element))) : false);
/** @type {?} */
const matchesSelectorIfAny = (/**
 * @param {?} element
 * @param {?=} selector
 * @return {?}
 */
(element, selector) => !selector || closest(element, selector) != null);
// we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
const ɵ2 = /**
 * @return {?}
 */
() => {
    /** @type {?} */
    const isIOS = (/**
     * @return {?}
     */
    () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2));
    /** @type {?} */
    const isAndroid = (/**
     * @return {?}
     */
    () => /Android/.test(navigator.userAgent));
    return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
};
/** @type {?} */
const isMobile = ((ɵ2))();
// setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
// when tapping on the triggering element
/** @type {?} */
const wrapAsyncForMobile = (/**
 * @param {?} fn
 * @return {?}
 */
fn => isMobile ? (/**
 * @return {?}
 */
() => setTimeout((/**
 * @return {?}
 */
() => fn()), 100)) : fn);
/**
 * @param {?} zone
 * @param {?} document
 * @param {?} type
 * @param {?} close
 * @param {?} closed$
 * @param {?} insideElements
 * @param {?=} ignoreElements
 * @param {?=} insideSelector
 * @return {?}
 */
function ngbAutoClose(zone, document, type, close, closed$, insideElements, ignoreElements, insideSelector) {
    // closing on ESC and outside clicks
    if (type) {
        zone.runOutsideAngular(wrapAsyncForMobile((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const shouldCloseOnClick = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const element = (/** @type {?} */ (event.target));
                if (event.button === 2 || isContainedIn(element, ignoreElements)) {
                    return false;
                }
                if (type === 'inside') {
                    return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
                }
                else if (type === 'outside') {
                    return !isContainedIn(element, insideElements);
                }
                else /* if (type === true) */ {
                    return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
                }
            });
            /** @type {?} */
            const escapes$ = fromEvent(document, 'keydown')
                .pipe(takeUntil(closed$), 
            // tslint:disable-next-line:deprecation
            filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e.which === Key.Escape)), tap((/**
             * @param {?} e
             * @return {?}
             */
            e => e.preventDefault())));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
            // because on 'mouseup' DOM nodes might be detached
            /** @type {?} */
            const mouseDowns$ = fromEvent(document, 'mousedown').pipe(map(shouldCloseOnClick), takeUntil(closed$));
            /** @type {?} */
            const closeableClicks$ = (/** @type {?} */ (fromEvent(document, 'mouseup')
                .pipe(withLatestFrom(mouseDowns$), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ([_, shouldClose]) => shouldClose)), delay(0), takeUntil(closed$))));
            race([escapes$, closeableClicks$]).subscribe((/**
             * @return {?}
             */
            () => zone.run(close)));
        })));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
function getFocusableBoundaryElements(element) {
    /** @type {?} */
    const list = Array.from((/** @type {?} */ (element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))))
        .filter((/**
     * @param {?} el
     * @return {?}
     */
    el => el.tabIndex !== -1));
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param zone Angular zone
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * \@param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 * @type {?}
 */
const ngbFocusTrap = (/**
 * @param {?} zone
 * @param {?} element
 * @param {?} stopFocusTrap$
 * @param {?=} refocusOnClick
 * @return {?}
 */
(zone, element, stopFocusTrap$, refocusOnClick = false) => {
    zone.runOutsideAngular((/**
     * @return {?}
     */
    () => {
        // last focused element
        /** @type {?} */
        const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map((/**
         * @param {?} e
         * @return {?}
         */
        e => e.target)));
        // 'tab' / 'shift+tab' stream
        fromEvent(element, 'keydown')
            .pipe(takeUntil(stopFocusTrap$), 
        // tslint:disable:deprecation
        filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.which === Key.Tab)), 
        // tslint:enable:deprecation
        withLatestFrom(lastFocusedElement$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([tabEvent, focusedElement]) => {
            const [first, last] = getFocusableBoundaryElements(element);
            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        }));
        // inside click
        if (refocusOnClick) {
            fromEvent(element, 'click')
                .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map((/**
             * @param {?} arr
             * @return {?}
             */
            arr => (/** @type {?} */ (arr[1])))))
                .subscribe((/**
             * @param {?} lastFocusedElement
             * @return {?}
             */
            lastFocusedElement => lastFocusedElement.focus()));
        }
    }));
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
class Positioning {
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    getAllStyles(element) { return window.getComputedStyle(element); }
    /**
     * @private
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    getStyle(element, prop) { return this.getAllStyles(element)[prop]; }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    isStaticPositioned(element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    offsetParent(element) {
        /** @type {?} */
        let offsetParentEl = (/** @type {?} */ (element.offsetParent)) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = (/** @type {?} */ (offsetParentEl.offsetParent));
        }
        return offsetParentEl || document.documentElement;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    position(element, round = true) {
        /** @type {?} */
        let elPosition;
        /** @type {?} */
        let parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
            elPosition = {
                top: elPosition.top,
                bottom: elPosition.bottom,
                left: elPosition.left,
                right: elPosition.right,
                height: elPosition.height,
                width: elPosition.width
            };
        }
        else {
            /** @type {?} */
            const offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    offset(element, round = true) {
        /** @type {?} */
        const elBcr = element.getBoundingClientRect();
        /** @type {?} */
        const viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        /** @type {?} */
        let elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    }
    /*
        Return false if the element to position is outside the viewport
      */
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostElement, targetElement, placement, appendToBody) {
        const [placementPrimary = 'top', placementSecondary = 'center'] = placement.split('-');
        /** @type {?} */
        const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        /** @type {?} */
        const targetElStyles = this.getAllStyles(targetElement);
        /** @type {?} */
        const marginTop = parseFloat(targetElStyles.marginTop);
        /** @type {?} */
        const marginBottom = parseFloat(targetElStyles.marginBottom);
        /** @type {?} */
        const marginLeft = parseFloat(targetElStyles.marginLeft);
        /** @type {?} */
        const marginRight = parseFloat(targetElStyles.marginRight);
        /** @type {?} */
        let topPosition = 0;
        /** @type {?} */
        let leftPosition = 0;
        switch (placementPrimary) {
            case 'top':
                topPosition = (hostElPosition.top - (targetElement.offsetHeight + marginTop + marginBottom));
                break;
            case 'bottom':
                topPosition = (hostElPosition.top + hostElPosition.height);
                break;
            case 'left':
                leftPosition = (hostElPosition.left - (targetElement.offsetWidth + marginLeft + marginRight));
                break;
            case 'right':
                leftPosition = (hostElPosition.left + hostElPosition.width);
                break;
        }
        switch (placementSecondary) {
            case 'top':
                topPosition = hostElPosition.top;
                break;
            case 'bottom':
                topPosition = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                break;
            case 'left':
                leftPosition = hostElPosition.left;
                break;
            case 'right':
                leftPosition = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                break;
            case 'center':
                if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                    leftPosition = (hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2);
                }
                else {
                    topPosition = (hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2);
                }
                break;
        }
        /// The translate3d/gpu acceleration render a blurry text on chrome, the next line is commented until a browser fix
        // targetElement.style.transform = `translate3d(${Math.round(leftPosition)}px, ${Math.floor(topPosition)}px, 0px)`;
        targetElement.style.transform = `translate(${Math.round(leftPosition)}px, ${Math.round(topPosition)}px)`;
        // Check if the targetElement is inside the viewport
        /** @type {?} */
        const targetElBCR = targetElement.getBoundingClientRect();
        /** @type {?} */
        const html = document.documentElement;
        /** @type {?} */
        const windowHeight = window.innerHeight || html.clientHeight;
        /** @type {?} */
        const windowWidth = window.innerWidth || html.clientWidth;
        return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth &&
            targetElBCR.bottom <= windowHeight;
    }
}
/** @type {?} */
const placementSeparator = /\s+/;
/** @type {?} */
const positionService = new Positioning();
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'left', 'right',
 *   'top-left', 'top-right',
 *   'bottom-left', 'bottom-right',
 *   'left-top', 'left-bottom',
 *   'right-top', 'right-bottom'.
 * */
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @param {?=} baseClass
 * @return {?}
 */
function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
    /** @type {?} */
    let placementVals = Array.isArray(placement) ? placement : (/** @type {?} */ (placement.split(placementSeparator)));
    /** @type {?} */
    const allowedPlacements = [
        'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
        'right-top', 'right-bottom'
    ];
    /** @type {?} */
    const classList = targetElement.classList;
    /** @type {?} */
    const addClassesToTarget = (/**
     * @param {?} targetPlacement
     * @return {?}
     */
    (targetPlacement) => {
        const [primary, secondary] = targetPlacement.split('-');
        /** @type {?} */
        const classes = [];
        if (baseClass) {
            classes.push(`${baseClass}-${primary}`);
            if (secondary) {
                classes.push(`${baseClass}-${primary}-${secondary}`);
            }
            classes.forEach((/**
             * @param {?} classname
             * @return {?}
             */
            (classname) => { classList.add(classname); }));
        }
        return classes;
    });
    // Remove old placement classes to avoid issues
    if (baseClass) {
        allowedPlacements.forEach((/**
         * @param {?} placementToRemove
         * @return {?}
         */
        (placementToRemove) => { classList.remove(`${baseClass}-${placementToRemove}`); }));
    }
    // replace auto placement with other placements
    /** @type {?} */
    let hasAuto = placementVals.findIndex((/**
     * @param {?} val
     * @return {?}
     */
    val => val === 'auto'));
    if (hasAuto >= 0) {
        allowedPlacements.forEach((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            if (placementVals.find((/**
             * @param {?} val
             * @return {?}
             */
            val => val.search('^' + obj) !== -1)) == null) {
                placementVals.splice(hasAuto++, 1, (/** @type {?} */ (obj)));
            }
        }));
    }
    // coordinates where to position
    // Required for transform:
    /** @type {?} */
    const style = targetElement.style;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style['will-change'] = 'transform';
    /** @type {?} */
    let testPlacement;
    /** @type {?} */
    let isInViewport = false;
    for (testPlacement of placementVals) {
        /** @type {?} */
        let addedClasses = addClassesToTarget(testPlacement);
        if (positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
            isInViewport = true;
            break;
        }
        // Remove the baseClasses for further calculation
        if (baseClass) {
            addedClasses.forEach((/**
             * @param {?} classname
             * @return {?}
             */
            (classname) => { classList.remove(classname); }));
        }
    }
    if (!isInViewport) {
        // If nothing match, the first placement is the default one
        testPlacement = placementVals[0];
        addClassesToTarget(testPlacement);
        positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody);
    }
    return testPlacement;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 * @abstract
 */
class NgbDateParserFormatter {
}
NgbDateParserFormatter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] }
];
/** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = ɵɵdefineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        if (value) {
            /** @type {?} */
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    format(date) {
        return date ?
            `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}` :
            '';
    }
}
NgbDateISOParserFormatter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * \@since 5.2.0
 */
class NgbInputDatepickerConfig extends NgbDatepickerConfig {
    constructor() {
        super(...arguments);
        this.autoClose = true;
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        this.restoreFocus = true;
    }
}
NgbInputDatepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbInputDatepickerConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbInputDatepickerConfig_Factory() { return new NgbInputDatepickerConfig(); }, token: NgbInputDatepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DATEPICKER_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbInputDatepicker)),
    multi: true
};
/** @type {?} */
const NGB_DATEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbInputDatepicker)),
    multi: true
};
/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
class NgbInputDatepicker {
    /**
     * @param {?} _parserFormatter
     * @param {?} _elRef
     * @param {?} _vcRef
     * @param {?} _renderer
     * @param {?} _cfr
     * @param {?} _ngZone
     * @param {?} _calendar
     * @param {?} _dateAdapter
     * @param {?} _document
     * @param {?} _changeDetector
     * @param {?} config
     */
    constructor(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, _ngZone, _calendar, _dateAdapter, _document, _changeDetector, config) {
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._cfr = _cfr;
        this._ngZone = _ngZone;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._changeDetector = _changeDetector;
        this._cRef = null;
        this._disabled = false;
        this._elWithFocus = null;
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * \@since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * Event emitted right after the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired after closing datepicker window.
         *
         * \@since 4.2.0
         */
        this.closed = new EventEmitter();
        this._onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this._validatorChange = (/**
         * @return {?}
         */
        () => { });
        ['autoClose', 'container', 'positionTarget', 'placement'].forEach((/**
         * @param {?} input
         * @return {?}
         */
        input => this[input] = config[input]));
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => this._updatePopupPosition()));
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this._validatorChange = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const value = c.value;
        if (value === null || value === undefined) {
            return null;
        }
        /** @type {?} */
        const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
        if (!this._calendar.isValid(ngbDate)) {
            return { 'ngbDate': { invalid: c.value } };
        }
        if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
            return { 'ngbDate': { requiredBefore: this.minDate } };
        }
        if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
            return { 'ngbDate': { requiredAfter: this.maxDate } };
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    /**
     * @param {?} value
     * @param {?=} updateView
     * @return {?}
     */
    manualDateChange(value, updateView = false) {
        /** @type {?} */
        const inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    /**
     * @return {?}
     */
    isOpen() { return !!this._cRef; }
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     * @return {?}
     */
    open() {
        if (!this.isOpen()) {
            /** @type {?} */
            const cf = this._cfr.resolveComponentFactory(NgbDatepicker);
            this._cRef = this._vcRef.createComponent(cf);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((/**
             * @param {?} selectedDate
             * @return {?}
             */
            (selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
                this._onTouched();
            }));
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            this._elWithFocus = this._document.activeElement;
            ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
            this._cRef.instance.focus();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, (/**
             * @return {?}
             */
            () => this.close()), this.closed, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
        }
    }
    /**
     * Closes the datepicker popup.
     * @return {?}
     */
    close() {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this.closed.emit();
            this._changeDetector.markForCheck();
            // restore focus
            /** @type {?} */
            let elementToFocus = this._elWithFocus;
            if (isString(this.restoreFocus)) {
                elementToFocus = this._document.querySelector(this.restoreFocus);
            }
            else if (this.restoreFocus !== undefined) {
                elementToFocus = this.restoreFocus;
            }
            // in IE document.activeElement can contain an object without 'focus()' sometimes
            if (elementToFocus && elementToFocus['focus']) {
                elementToFocus.focus();
            }
            else {
                this._document.body.focus();
            }
        }
    }
    /**
     * Toggles the datepicker popup.
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    /**
     * @return {?}
     */
    onBlur() { this._onTouched(); }
    /**
     * @return {?}
     */
    onFocus() { this._elWithFocus = this._elRef.nativeElement; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
            if (this.isOpen()) {
                if (changes['minDate']) {
                    this._cRef.instance.minDate = this.minDate;
                }
                if (changes['maxDate']) {
                    this._cRef.instance.maxDate = this.maxDate;
                }
                this._cRef.instance.ngOnChanges(changes);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} datepickerInstance
     * @return {?}
     */
    _applyDatepickerInputs(datepickerInstance) {
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
            .forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (this[optionName] !== undefined) {
                datepickerInstance[optionName] = this[optionName];
            }
        }));
        datepickerInstance.startDate = this.startDate || this._model;
    }
    /**
     * @private
     * @param {?} nativeElement
     * @return {?}
     */
    _applyPopupStyling(nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.addClass(nativeElement, 'show');
        if (this.container === 'body') {
            this._renderer.addClass(nativeElement, 'ngb-dp-body');
        }
    }
    /**
     * @private
     * @param {?} datepickerInstance
     * @return {?}
     */
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe((/**
         * @param {?} navigateEvent
         * @return {?}
         */
        navigateEvent => this.navigate.emit(navigateEvent)));
        datepickerInstance.dateSelect.subscribe((/**
         * @param {?} date
         * @return {?}
         */
        date => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        }));
    }
    /**
     * @private
     * @param {?} model
     * @return {?}
     */
    _writeModelValue(model) {
        /** @type {?} */
        const value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    _fromDateStruct(date) {
        /** @type {?} */
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
    /**
     * @private
     * @return {?}
     */
    _updatePopupPosition() {
        if (!this._cRef) {
            return;
        }
        /** @type {?} */
        let hostElement;
        if (isString(this.positionTarget)) {
            hostElement = this._document.querySelector(this.positionTarget);
        }
        else if (this.positionTarget instanceof HTMLElement) {
            hostElement = this.positionTarget;
        }
        else {
            hostElement = this._elRef.nativeElement;
        }
        if (this.positionTarget && !hostElement) {
            throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
        }
        positionElements(hostElement, this._cRef.location.nativeElement, this.placement, this.container === 'body');
    }
}
NgbInputDatepicker.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngbDatepicker]',
                exportAs: 'ngbDatepicker',
                host: {
                    '(input)': 'manualDateChange($event.target.value)',
                    '(change)': 'manualDateChange($event.target.value, true)',
                    '(focus)': 'onFocus()',
                    '(blur)': 'onBlur()',
                    '[disabled]': 'disabled'
                },
                providers: [
                    NGB_DATEPICKER_VALUE_ACCESSOR$1, NGB_DATEPICKER_VALIDATOR,
                    { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig }
                ],
            },] }
];
/** @nocollapse */
NgbInputDatepicker.ctorParameters = () => [
    { type: NgbDateParserFormatter },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: NgZone },
    { type: NgbCalendar },
    { type: NgbDateAdapter },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: NgbInputDatepickerConfig }
];
NgbInputDatepicker.propDecorators = {
    autoClose: [{ type: Input }],
    dayTemplate: [{ type: Input }],
    dayTemplateData: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    footerTemplate: [{ type: Input }],
    markDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    placement: [{ type: Input }],
    restoreFocus: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    container: [{ type: Input }],
    positionTarget: [{ type: Input }],
    dateSelect: [{ type: Output }],
    navigate: [{ type: Output }],
    closed: [{ type: Output }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbDatepickerDayView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
NgbDatepickerDayView.decorators = [
    { type: Component, args: [{
                selector: '[ngbDatepickerDayView]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'btn-light',
                    '[class.bg-primary]': 'selected',
                    '[class.text-white]': 'selected',
                    '[class.text-muted]': 'isMuted()',
                    '[class.outside]': 'isMuted()',
                    '[class.active]': 'focused'
                },
                template: `{{ i18n.getDayNumerals(date) }}`,
                styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"]
            }] }
];
/** @nocollapse */
NgbDatepickerDayView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerDayView.propDecorators = {
    currentMonth: [{ type: Input }],
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbDatepickerNavigationSelect {
    /**
     * @param {?} i18n
     * @param {?} _renderer
     */
    constructor(i18n, _renderer) {
        this.i18n = i18n;
        this._renderer = _renderer;
        this.select = new EventEmitter();
        this._month = -1;
        this._year = -1;
    }
    /**
     * @param {?} month
     * @return {?}
     */
    changeMonth(month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); }
    /**
     * @param {?} year
     * @return {?}
     */
    changeYear(year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.date) {
            if (this.date.month !== this._month) {
                this._month = this.date.month;
                this._renderer.setProperty(this.monthSelect.nativeElement, 'value', this._month);
            }
            if (this.date.year !== this._year) {
                this._year = this.date.year;
                this._renderer.setProperty(this.yearSelect.nativeElement, 'value', this._year);
            }
        }
    }
}
NgbDatepickerNavigationSelect.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation-select',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <select #month
      [disabled]="disabled"
      class="custom-select"
      i18n-aria-label="@@ngb.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngb.datepicker.select-month" title="Select month"
      (change)="changeMonth($event.target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select #year
      [disabled]="disabled"
      class="custom-select"
      i18n-aria-label="@@ngb.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngb.datepicker.select-year" title="Select year"
      (change)="changeYear($event.target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `,
                styles: ["ngb-datepicker-navigation-select>.custom-select{-ms-flex:1 1 auto;flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.custom-select:focus{z-index:1}ngb-datepicker-navigation-select>.custom-select::-ms-value{background-color:transparent!important}"]
            }] }
];
/** @nocollapse */
NgbDatepickerNavigationSelect.ctorParameters = () => [
    { type: NgbDatepickerI18n },
    { type: Renderer2 }
];
NgbDatepickerNavigationSelect.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    years: [{ type: Input }],
    select: [{ type: Output }],
    monthSelect: [{ type: ViewChild, args: ['month', { static: true, read: ElementRef },] }],
    yearSelect: [{ type: ViewChild, args: ['year', { static: true, read: ElementRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class NgbCalendarHijri extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return this.fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    }
    /**
     * @private
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    _setDay(date, day) {
        day = +day;
        /** @type {?} */
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    /**
     * @private
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    }
    /**
     * @private
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
}
NgbCalendarHijri.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Checks if islamic year is a leap year
 * @param {?} hYear
 * @return {?}
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 * @param {?} gDate
 * @return {?}
 */
function isGregorianLeapYear(gDate) {
    /** @type {?} */
    const year = gDate.getFullYear();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 * @param {?} hYear
 * @param {?} hMonth
 * @return {?}
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 * @param {?} year
 * @return {?}
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 * @type {?}
 */
const GREGORIAN_EPOCH = 1721425.5;
/** @type {?} */
const ISLAMIC_EPOCH = 1948439.5;
class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        const gYear = gDate.getFullYear();
        /** @type {?} */
        const gMonth = gDate.getMonth();
        /** @type {?} */
        const gDay = gDate.getDate();
        /** @type {?} */
        let julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        /** @type {?} */
        const days = julianDay - ISLAMIC_EPOCH;
        /** @type {?} */
        const hYear = Math.floor((30 * days + 10646) / 10631.0);
        /** @type {?} */
        let hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        /** @type {?} */
        const hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    }
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        const julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        /** @type {?} */
        const wjd = Math.floor(julianDay - 0.5) + 0.5;
        /** @type {?} */
        const depoch = wjd - GREGORIAN_EPOCH;
        /** @type {?} */
        const quadricent = Math.floor(depoch / 146097);
        /** @type {?} */
        const dqc = mod(depoch, 146097);
        /** @type {?} */
        const cent = Math.floor(dqc / 36524);
        /** @type {?} */
        const dcent = mod(dqc, 36524);
        /** @type {?} */
        const quad = Math.floor(dcent / 1461);
        /** @type {?} */
        const dquad = mod(dcent, 1461);
        /** @type {?} */
        const yindex = Math.floor(dquad / 365);
        /** @type {?} */
        let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        /** @type {?} */
        const gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        /** @type {?} */
        const yearday = wjd - gYearStart;
        /** @type {?} */
        const tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
        /** @type {?} */
        const leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
        /** @type {?} */
        const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        /** @type {?} */
        const tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                1);
        /** @type {?} */
        const day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    }
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    getDaysPerMonth(month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        /** @type {?} */
        let length = 29 + month % 2;
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    }
}
NgbCalendarIslamicCivil.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * @type {?}
 */
const GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
/** @type {?} */
const GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
/** @type {?} */
const HIJRI_BEGIN = 1300;
/** @type {?} */
const HIJRI_END = 1600;
/** @type {?} */
const ONE_DAY = 1000 * 60 * 60 * 24;
/** @type {?} */
const MONTH_LENGTH = [
    // 1300-1304
    '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
    // 1305-1309
    '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
    // 1310-1314
    '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
    // 1315-1319
    '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
    // 1320-1324
    '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
    // 1325-1329
    '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
    // 1330-1334
    '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
    // 1335-1339
    '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
    // 1340-1344
    '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
    // 1345-1349
    '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
    // 1350-1354
    '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
    // 1355-1359
    '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
    // 1360-1364
    '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
    // 1365-1369
    '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
    // 1370-1374
    '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
    // 1375-1379
    '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
    // 1380-1384
    '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
    // 1385-1389
    '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
    // 1390-1394
    '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
    // 1395-1399
    '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
    // 1400-1404
    '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
    // 1405-1409
    '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
    // 1410-1414
    '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
    // 1415-1419
    '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
    // 1420-1424
    '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
    // 1425-1429
    '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
    // 1430-1434
    '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
    // 1435-1439
    '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
    // 1440-1444
    '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
    // 1445-1449
    '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
    // 1450-1454
    '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
    // 1455-1459
    '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
    // 1460-1464
    '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
    // 1465-1469
    '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
    // 1470-1474
    '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
    // 1475-1479
    '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
    // 1480-1484
    '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
    // 1485-1489
    '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
    // 1490-1494
    '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
    // 1495-1499
    '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
    // 1500-1504
    '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
    // 1505-1509
    '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
    // 1510-1514
    '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
    // 1515-1519
    '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
    // 1520-1524
    '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
    // 1525-1529
    '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
    // 1530-1534
    '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
    // 1535-1539
    '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
    // 1540-1544
    '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
    // 1545-1549
    '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
    // 1550-1554
    '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
    // 1555-1559
    '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
    // 1560-1564
    '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
    // 1565-1569
    '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
    // 1570-1574
    '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
    // 1575-1579
    '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
    // 1580-1584
    '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
    // 1585-1589
    '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
    // 1590-1594
    '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
    // 1595-1599
    '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
    // 1600
    '001010011101'
];
/**
 * @param {?} date1
 * @param {?} date2
 * @return {?}
 */
function getDaysDiff(date1, date2) {
    // Ignores the time part in date1 and date2:
    /** @type {?} */
    const time1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    /** @type {?} */
    const time2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    /** @type {?} */
    const diff = Math.abs(time1 - time2);
    return Math.round(diff / ONE_DAY);
}
class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        let hDay = 1;
        /** @type {?} */
        let hMonth = 0;
        /** @type {?} */
        let hYear = 1300;
        /** @type {?} */
        let daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            /** @type {?} */
            let year = 1300;
            for (let i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (let j = 0; j < 12; j++) {
                    /** @type {?} */
                    let numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
        }
        else {
            return super.fromGregorian(gDate);
        }
    }
    /**
     * Converts the current Hijri date to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        let gDate = new Date(GREGORIAN_FIRST_DATE);
        /** @type {?} */
        let dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (let y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (let m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (let m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = super.toGregorian(hDate);
        }
        return gDate;
    }
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     * @param {?} hMonth
     * @param {?} hYear
     * @return {?}
     */
    getDaysPerMonth(hMonth, hYear) {
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            /** @type {?} */
            const pos = hYear - HIJRI_BEGIN;
            return +MONTH_LENGTH[pos][hMonth - 1] + 29;
        }
        return super.getDaysPerMonth(hMonth, hYear);
    }
}
NgbCalendarIslamicUmalqura.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns the equivalent JS date value for a give input Jalali date.
 * `jalaliDate` is an Jalali date to be converted to Gregorian.
 * @param {?} jalaliDate
 * @return {?}
 */
function toGregorian(jalaliDate) {
    /** @type {?} */
    let jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
    /** @type {?} */
    let date = julianToGregorian(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
/**
 * Returns the equivalent jalali date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to jalali.
 * utc to local
 * @param {?} gdate
 * @return {?}
 */
function fromGregorian(gdate) {
    /** @type {?} */
    let g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return julianToJalali(g2d);
}
/**
 * @param {?} date
 * @param {?} yearValue
 * @return {?}
 */
function setJalaliYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
/**
 * @param {?} date
 * @param {?} month
 * @return {?}
 */
function setJalaliMonth(date, month) {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
    return date;
}
/**
 * @param {?} date
 * @param {?} day
 * @return {?}
 */
function setJalaliDay(date, day) {
    /** @type {?} */
    let mDays = getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setJalaliMonth(date, date.month - 1);
            mDays = getDaysPerMonth(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setJalaliMonth(date, date.month + 1);
            mDays = getDaysPerMonth(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod$1(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function div(a, b) {
    return Math.trunc(a / b);
}
/*
 This function determines if the Jalali (Persian) year is
 leap (366-day long) or is the common year (365 days), and
 finds the day in March (Gregorian calendar) of the first
 day of the Jalali year (jalaliYear).
 @param jalaliYear Jalali calendar year (-61 to 3177)
 @return
 leap: number of years since the last leap year (0 to 4)
 gYear: Gregorian year of the beginning of Jalali year
 march: the March day of Farvardin the 1st (1st day of jalaliYear)
 @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
 @see: http://www.fourmilab.ch/documents/calendar/
 */
/**
 * @param {?} jalaliYear
 * @return {?}
 */
function jalCal(jalaliYear) {
    // Jalali years starting the 33-year rule.
    /** @type {?} */
    let breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    /** @type {?} */
    const breaksLength = breaks.length;
    /** @type {?} */
    const gYear = jalaliYear + 621;
    /** @type {?} */
    let leapJ = -14;
    /** @type {?} */
    let jp = breaks[0];
    if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
        throw new Error('Invalid Jalali year ' + jalaliYear);
    }
    // Find the limiting years for the Jalali year jalaliYear.
    /** @type {?} */
    let jump;
    for (let i = 1; i < breaksLength; i += 1) {
        /** @type {?} */
        const jm = breaks[i];
        jump = jm - jp;
        if (jalaliYear < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod$1(jump, 33), 4);
        jp = jm;
    }
    /** @type {?} */
    let n = jalaliYear - jp;
    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod$1(n, 33) + 3, 4);
    if (mod$1(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    // And the same in the Gregorian calendar (until the year gYear).
    /** @type {?} */
    const leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
    // Determine the Gregorian date of Farvardin the 1st.
    /** @type {?} */
    const march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year.
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    /** @type {?} */
    let leap = mod$1(mod$1(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap: leap, gy: gYear, march: march };
}
/*
 Calculates Gregorian and Julian calendar dates from the Julian Day number
 (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
 calendars) to some millions years ahead of the present.
 @param jdn Julian Day number
 @return
 gYear: Calendar year (years BC numbered 0, -1, -2, ...)
 gMonth: Calendar month (1 to 12)
 gDay: Calendar day of the month M (1 to 28/29/30/31)
 */
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToGregorian(julianDayNumber) {
    /** @type {?} */
    let j = 4 * julianDayNumber + 139361631;
    j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
    /** @type {?} */
    const i = div(mod$1(j, 1461), 4) * 5 + 308;
    /** @type {?} */
    const gDay = div(mod$1(i, 153), 5) + 1;
    /** @type {?} */
    const gMonth = mod$1(div(i, 153), 12) + 1;
    /** @type {?} */
    const gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
    return new Date(gYear, gMonth - 1, gDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jy Jalali year (1 to 3100)
 @param jm Jalali month (1 to 12)
 @param jd Jalali day (1 to 29/31)
 @return Julian Day number
 */
/**
 * @param {?} gy
 * @param {?} gm
 * @param {?} gd
 * @return {?}
 */
function gregorianToJulian(gy, gm, gd) {
    /** @type {?} */
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod$1(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
/*
 Converts the Julian Day number to a date in the Jalali calendar.
 @param julianDayNumber Julian Day number
 @return
 jalaliYear: Jalali year (1 to 3100)
 jalaliMonth: Jalali month (1 to 12)
 jalaliDay: Jalali day (1 to 29/31)
 */
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToJalali(julianDayNumber) {
    /** @type {?} */
    let gy = julianToGregorian(julianDayNumber).getFullYear() // Calculate Gregorian year (gy).
    ;
    /** @type {?} */
    let jalaliYear = gy - 621;
    /** @type {?} */
    let r = jalCal(jalaliYear);
    /** @type {?} */
    let gregorianDay = gregorianToJulian(gy, 3, r.march);
    /** @type {?} */
    let jalaliDay;
    /** @type {?} */
    let jalaliMonth;
    /** @type {?} */
    let numberOfDays;
    // Find number of days that passed since 1 Farvardin.
    numberOfDays = julianDayNumber - gregorianDay;
    if (numberOfDays >= 0) {
        if (numberOfDays <= 185) {
            // The first 6 months.
            jalaliMonth = 1 + div(numberOfDays, 31);
            jalaliDay = mod$1(numberOfDays, 31) + 1;
            return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
        }
        else {
            // The remaining months.
            numberOfDays -= 186;
        }
    }
    else {
        // Previous Jalali year.
        jalaliYear -= 1;
        numberOfDays += 179;
        if (r.leap === 1) {
            numberOfDays += 1;
        }
    }
    jalaliMonth = 7 + div(numberOfDays, 30);
    jalaliDay = mod$1(numberOfDays, 30) + 1;
    return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jYear Jalali year (1 to 3100)
 @param jMonth Jalali month (1 to 12)
 @param jDay Jalali day (1 to 29/31)
 @return Julian Day number
 */
/**
 * @param {?} jYear
 * @param {?} jMonth
 * @param {?} jDay
 * @return {?}
 */
function jalaliToJulian(jYear, jMonth, jDay) {
    /** @type {?} */
    let r = jalCal(jYear);
    return gregorianToJulian(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
}
/**
 * Returns the number of days in a specific jalali month.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysPerMonth(month, year) {
    if (month <= 6) {
        return 31;
    }
    if (month <= 11) {
        return 30;
    }
    if (jalCal(year).leap === 0) {
        return 30;
    }
    return 29;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbCalendarPersian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setJalaliYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setJalaliMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setJalaliDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const startDate = toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) &&
            !isNaN(toGregorian(date).getTime());
    }
}
NgbCalendarPersian.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PARTS_PER_HOUR = 1080;
/** @type {?} */
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
/** @type {?} */
const PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
/** @type {?} */
const PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
/** @type {?} */
const BAHARAD = 11 * PARTS_PER_HOUR + 204;
/** @type {?} */
const HEBREW_DAY_ON_JAN_1_1970 = 2092591;
/** @type {?} */
const GREGORIAN_EPOCH$1 = 1721425.5;
/**
 * @param {?} year
 * @return {?}
 */
function isGregorianLeapYear$1(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * @param {?} year
 * @return {?}
 */
function numberOfFirstDayInYear(year) {
    /** @type {?} */
    let monthsBeforeYear = Math.floor((235 * year - 234) / 19);
    /** @type {?} */
    let fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
    /** @type {?} */
    let dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
    /** @type {?} */
    let timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
    /** @type {?} */
    let dayOfWeek = dayNumber % 7;
    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        dayNumber++;
        dayOfWeek = dayNumber % 7;
    }
    if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
        dayNumber += 2;
    }
    else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
        dayNumber++;
    }
    return dayNumber;
}
/**
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInGregorianMonth(month, year) {
    /** @type {?} */
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isGregorianLeapYear$1(year)) {
        days[1]++;
    }
    return days[month - 1];
}
/**
 * @param {?} year
 * @return {?}
 */
function getHebrewMonths(year) {
    return isHebrewLeapYear(year) ? 13 : 12;
}
/**
 * Returns the number of days in a specific Hebrew year.
 * `year` is any Hebrew year.
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewYear(year) {
    return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
}
/**
 * @param {?} year
 * @return {?}
 */
function isHebrewLeapYear(year) {
    /** @type {?} */
    let b = (year * 12 + 17) % 19;
    return b >= ((b < 0) ? -7 : 12);
}
/**
 * Returns the number of days in a specific Hebrew month.
 * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
 * `year` is any Hebrew year.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewMonth(month, year) {
    /** @type {?} */
    let yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    /** @type {?} */
    let yearType = (yearLength <= 380 ? yearLength : (yearLength - 30)) - 353;
    /** @type {?} */
    let leapYear = isHebrewLeapYear(year);
    /** @type {?} */
    let daysInMonth = leapYear ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29] :
        [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    if (yearType > 0) {
        daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
    }
    if (yearType > 1) {
        daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
    }
    return daysInMonth[month - 1];
}
/**
 * @param {?} date
 * @return {?}
 */
function getDayNumberInHebrewYear(date) {
    /** @type {?} */
    let numberOfDay = 0;
    for (let i = 1; i < date.month; i++) {
        numberOfDay += getDaysInHebrewMonth(i, date.year);
    }
    return numberOfDay + date.day;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
function setHebrewMonth(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getHebrewMonths(date.year) - date.month) {
                val -= getHebrewMonths(date.year) - date.month + 1;
                date.year++;
                date.month = 1;
            }
            else {
                date.month += val;
                val = 0;
            }
        }
        else {
            if (val >= date.month) {
                date.year--;
                val -= date.month;
                date.month = getHebrewMonths(date.year);
            }
            else {
                date.month -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
function setHebrewDay(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                date.year++;
                date.month = 1;
                date.day = 1;
            }
            else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                date.month++;
                date.day = 1;
            }
            else {
                date.day += val;
                val = 0;
            }
        }
        else {
            if (val >= date.day) {
                val -= date.day;
                date.month--;
                if (date.month === 0) {
                    date.year--;
                    date.month = getHebrewMonths(date.year);
                }
                date.day = getDaysInHebrewMonth(date.month, date.year);
            }
            else {
                date.day -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * Returns the equivalent Hebrew date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Hebrew date.
 * @param {?} gdate
 * @return {?}
 */
function fromGregorian$1(gdate) {
    /** @type {?} */
    const date = new Date(gdate);
    /** @type {?} */
    const gYear = date.getFullYear();
    /** @type {?} */
    const gMonth = date.getMonth();
    /** @type {?} */
    const gDay = date.getDate();
    /** @type {?} */
    let julianDay = GREGORIAN_EPOCH$1 - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) -
        Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
        Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear$1(gYear) ? -1 : -2) + gDay);
    julianDay = Math.floor(julianDay + 0.5);
    /** @type {?} */
    let daysSinceHebEpoch = julianDay - 347997;
    /** @type {?} */
    let monthsSinceHebEpoch = Math.floor(daysSinceHebEpoch * PARTS_PER_DAY / PARTS_PER_MONTH);
    /** @type {?} */
    let hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
    /** @type {?} */
    let firstDayOfThisYear = numberOfFirstDayInYear(hYear);
    /** @type {?} */
    let dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    while (dayOfYear < 1) {
        hYear--;
        firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    }
    /** @type {?} */
    let hMonth = 1;
    /** @type {?} */
    let hDay = dayOfYear;
    while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
        hDay -= getDaysInHebrewMonth(hMonth, hYear);
        hMonth++;
    }
    return new NgbDate(hYear, hMonth, hDay);
}
/**
 * Returns the equivalent JS date value for a given Hebrew date.
 * `hebrewDate` is an Hebrew date to be converted to Gregorian.
 * @param {?} hebrewDate
 * @return {?}
 */
function toGregorian$1(hebrewDate) {
    /** @type {?} */
    const hYear = hebrewDate.year;
    /** @type {?} */
    const hMonth = hebrewDate.month;
    /** @type {?} */
    const hDay = hebrewDate.day;
    /** @type {?} */
    let days = numberOfFirstDayInYear(hYear);
    for (let i = 1; i < hMonth; i++) {
        days += getDaysInHebrewMonth(i, hYear);
    }
    days += hDay;
    /** @type {?} */
    let diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
    /** @type {?} */
    let after = diffDays >= 0;
    if (!after) {
        diffDays = -diffDays;
    }
    /** @type {?} */
    let gYear = 1970;
    /** @type {?} */
    let gMonth = 1;
    /** @type {?} */
    let gDay = 1;
    while (diffDays > 0) {
        if (after) {
            if (diffDays >= (isGregorianLeapYear$1(gYear) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear$1(gYear) ? 366 : 365;
                gYear++;
            }
            else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                gMonth++;
            }
            else {
                gDay += diffDays;
                diffDays = 0;
            }
        }
        else {
            if (diffDays >= (isGregorianLeapYear$1(gYear - 1) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear$1(gYear - 1) ? 366 : 365;
                gYear--;
            }
            else {
                if (gMonth > 1) {
                    gMonth--;
                }
                else {
                    gMonth = 12;
                    gYear--;
                }
                if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                }
                else {
                    gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                    diffDays = 0;
                }
            }
        }
    }
    return new Date(gYear, gMonth - 1, gDay);
}
/**
 * @param {?} numerals
 * @return {?}
 */
function hebrewNumerals(numerals) {
    if (!numerals) {
        return '';
    }
    /** @type {?} */
    const hArray0_9 = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d5', '\u05d6', '\u05d7', '\u05d8'];
    /** @type {?} */
    const hArray10_19 = [
        '\u05d9', '\u05d9\u05d0', '\u05d9\u05d1', '\u05d9\u05d2', '\u05d9\u05d3', '\u05d8\u05d5', '\u05d8\u05d6',
        '\u05d9\u05d6', '\u05d9\u05d7', '\u05d9\u05d8'
    ];
    /** @type {?} */
    const hArray20_90 = ['', '', '\u05db', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e4', '\u05e6'];
    /** @type {?} */
    const hArray100_900 = [
        '', '\u05e7', '\u05e8', '\u05e9', '\u05ea', '\u05ea\u05e7', '\u05ea\u05e8', '\u05ea\u05e9', '\u05ea\u05ea',
        '\u05ea\u05ea\u05e7'
    ];
    /** @type {?} */
    const hArray1000_9000 = [
        '', '\u05d0', '\u05d1', '\u05d1\u05d0', '\u05d1\u05d1', '\u05d4', '\u05d4\u05d0', '\u05d4\u05d1',
        '\u05d4\u05d1\u05d0', '\u05d4\u05d1\u05d1'
    ];
    /** @type {?} */
    const geresh = '\u05f3';
    /** @type {?} */
    const gershaim = '\u05f4';
    /** @type {?} */
    let mem = 0;
    /** @type {?} */
    let result = [];
    /** @type {?} */
    let step = 0;
    while (numerals > 0) {
        /** @type {?} */
        let m = numerals % 10;
        if (step === 0) {
            mem = m;
        }
        else if (step === 1) {
            if (m !== 1) {
                result.unshift(hArray20_90[m], hArray0_9[mem]);
            }
            else {
                result.unshift(hArray10_19[mem]);
            }
        }
        else if (step === 2) {
            result.unshift(hArray100_900[m]);
        }
        else {
            if (m !== 5) {
                result.unshift(hArray1000_9000[m], geresh, ' ');
            }
            break;
        }
        numerals = Math.floor(numerals / 10);
        if (step === 0 && numerals === 0) {
            result.unshift(hArray0_9[m]);
        }
        step++;
    }
    result = result.join('').split('');
    if (result.length === 1) {
        result.push(geresh);
    }
    else if (result.length > 1) {
        result.splice(result.length - 1, 0, gershaim);
    }
    return result.join('');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@since 3.2.0
 */
class NgbCalendarHebrew extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @param {?=} year
     * @return {?}
     */
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        /** @type {?} */
        let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian$1(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = toGregorian$1(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        /** @type {?} */
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian$1(new Date()); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    toGregorian(date) { return fromJSDate(toGregorian$1(date)); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    fromGregorian(date) { return fromGregorian$1(toJSDate(date)); }
}
NgbCalendarHebrew.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const WEEKDAYS = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
/** @type {?} */
const MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
const MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthShortName(month, year) { return this.getMonthFullName(month, year); }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return WEEKDAYS[weekday - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return hebrewNumerals(date.day); }
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return hebrewNumerals(weekNumber); }
    /**
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return hebrewNumerals(year); }
}
NgbDatepickerI18nHebrew.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
            null;
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * \@since 3.2.0
 */
class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeUTCAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbDatepickerModule {
}
NgbDatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgbDatepicker, NgbDatepickerContent, NgbDatepickerMonth, NgbDatepickerNavigation, NgbDatepickerNavigationSelect,
                    NgbDatepickerDayView, NgbInputDatepicker
                ],
                exports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth],
                imports: [CommonModule, FormsModule],
                entryComponents: [NgbDatepicker]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbDropdown`](#/components/dropdown/api#NgbDropdown) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
class NgbDropdownConfig {
    constructor() {
        this.autoClose = true;
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
    }
}
NgbDropdownConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbDropdownConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbDropdownConfig_Factory() { return new NgbDropdownConfig(); }, token: NgbDropdownConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbNavbar {
}
NgbNavbar.decorators = [
    { type: Directive, args: [{ selector: '.navbar' },] }
];
/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * \@since 4.1.0
 */
class NgbDropdownItem {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = (/** @type {?} */ (value)) === '' || value === true; // accept an empty attribute as true
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
}
NgbDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } },] }
];
/** @nocollapse */
NgbDropdownItem.ctorParameters = () => [
    { type: ElementRef }
];
NgbDropdownItem.propDecorators = {
    disabled: [{ type: Input }]
};
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
class NgbDropdownMenu {
    /**
     * @param {?} dropdown
     */
    constructor(dropdown) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
    }
}
NgbDropdownMenu.decorators = [
    { type: Directive, args: [{
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
                    '(keydown.Space)': 'dropdown.onKeyDown($event)'
                }
            },] }
];
/** @nocollapse */
NgbDropdownMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbDropdown)),] }] }
];
NgbDropdownMenu.propDecorators = {
    menuItems: [{ type: ContentChildren, args: [NgbDropdownItem,] }]
};
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * \@since 1.1.0
 */
class NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     */
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    getNativeElement() { return this._elementRef.nativeElement; }
}
NgbDropdownAnchor.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownAnchor]',
                host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
            },] }
];
/** @nocollapse */
NgbDropdownAnchor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbDropdown)),] }] },
    { type: ElementRef }
];
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
class NgbDropdownToggle extends NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} elementRef
     */
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
}
NgbDropdownToggle.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownToggle]',
                host: {
                    'class': 'dropdown-toggle',
                    'aria-haspopup': 'true',
                    '[attr.aria-expanded]': 'dropdown.isOpen()',
                    '(click)': 'dropdown.toggle()',
                    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                    '(keydown.Home)': 'dropdown.onKeyDown($event)',
                    '(keydown.End)': 'dropdown.onKeyDown($event)'
                },
                providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgbDropdownToggle)) }]
            },] }
];
/** @nocollapse */
NgbDropdownToggle.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbDropdown)),] }] },
    { type: ElementRef }
];
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
class NgbDropdown {
    /**
     * @param {?} _changeDetector
     * @param {?} config
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} ngbNavbar
     */
    constructor(_changeDetector, config, _document, _ngZone, _elementRef, _renderer, ngbNavbar) {
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._closed$ = new Subject();
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
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => { this._positionMenu(); }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._ngZone.onStable.pipe(take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            this._applyPlacementClasses();
            if (this._open) {
                this._setCloseHandlers();
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.isFirstChange) {
            this._applyPlacementClasses();
        }
    }
    /**
     * Checks if the dropdown menu is open.
     * @return {?}
     */
    isOpen() { return this._open; }
    /**
     * Opens the dropdown menu.
     * @return {?}
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _setCloseHandlers() {
        /** @type {?} */
        const anchor = this._anchor;
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (/**
         * @return {?}
         */
        () => this.close()), this._closed$, this._menu ? [this._menuElement.nativeElement] : [], anchor ? [anchor.getNativeElement()] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     * @return {?}
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._resetContainer();
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        const key = event.which;
        /** @type {?} */
        const itemElements = this._getMenuElements();
        /** @type {?} */
        let position = -1;
        /** @type {?} */
        let isEventFromItems = false;
        /** @type {?} */
        let itemElement = null;
        /** @type {?} */
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                if (item.contains((/** @type {?} */ (event.target)))) {
                    isEventFromItems = true;
                    itemElement = item;
                }
                if (item === this._document.activeElement) {
                    position = index;
                }
            }));
        }
        // closing on Enter / Space
        if (key === Key.Space || key === Key.Enter) {
            if (isEventFromItems && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click').pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                () => this.close()));
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || isEventFromItems) {
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
    }
    /**
     * @private
     * @return {?}
     */
    _isDropup() { return this._elementRef.nativeElement.classList.contains('dropup'); }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _isEventFromToggle(event) {
        return this._anchor.getNativeElement().contains((/** @type {?} */ (event.target)));
    }
    /**
     * @private
     * @return {?}
     */
    _getMenuElements() {
        /** @type {?} */
        const menu = this._menu;
        if (menu == null) {
            return [];
        }
        return menu.menuItems.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !item.disabled)).map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.elementRef.nativeElement));
    }
    /**
     * @private
     * @return {?}
     */
    _positionMenu() {
        /** @type {?} */
        const menu = this._menu;
        if (this.isOpen() && menu) {
            this._applyPlacementClasses(this.display === 'dynamic' ?
                positionElements(this._anchor.anchorEl, this._bodyContainer || this._menuElement.nativeElement, this.placement, this.container === 'body') :
                this._getFirstPlacement(this.placement));
        }
    }
    /**
     * @private
     * @param {?} placement
     * @return {?}
     */
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : (/** @type {?} */ (placement.split(' ')[0]));
    }
    /**
     * @private
     * @return {?}
     */
    _resetContainer() {
        /** @type {?} */
        const renderer = this._renderer;
        /** @type {?} */
        const menuElement = this._menuElement;
        if (menuElement) {
            /** @type {?} */
            const dropdownElement = this._elementRef.nativeElement;
            /** @type {?} */
            const dropdownMenuElement = menuElement.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
            renderer.removeStyle(dropdownMenuElement, 'position');
            renderer.removeStyle(dropdownMenuElement, 'transform');
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    /**
     * @private
     * @param {?=} container
     * @return {?}
     */
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            /** @type {?} */
            const renderer = this._renderer;
            /** @type {?} */
            const dropdownMenuElement = this._menuElement.nativeElement;
            /** @type {?} */
            const bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
            // Override some styles to have the positionning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.setStyle(bodyContainer, 'z-index', '1050');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
    }
    /**
     * @private
     * @param {?=} placement
     * @return {?}
     */
    _applyPlacementClasses(placement) {
        /** @type {?} */
        const menu = this._menu;
        if (menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            /** @type {?} */
            const renderer = this._renderer;
            /** @type {?} */
            const dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            menu.placement = this.display === 'static' ? null : placement;
            /*
                  * apply the new placement
                  * in case of top use up-arrow or down-arrow otherwise
                  */
            /** @type {?} */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            /** @type {?} */
            const bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] }
];
/** @nocollapse */
NgbDropdown.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgbDropdownConfig },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgbNavbar, decorators: [{ type: Optional }] }
];
NgbDropdown.propDecorators = {
    _menu: [{ type: ContentChild, args: [NgbDropdownMenu, { static: false },] }],
    _menuElement: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef, static: false },] }],
    _anchor: [{ type: ContentChild, args: [NgbDropdownAnchor, { static: false },] }],
    autoClose: [{ type: Input }],
    _open: [{ type: Input, args: ['open',] }],
    placement: [{ type: Input }],
    container: [{ type: Input }],
    display: [{ type: Input }],
    openChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbNavbar];
class NgbDropdownModule {
}
NgbDropdownModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
 *
 * \@since 3.1.0
 */
class NgbModalConfig {
    constructor() {
        this.backdrop = true;
        this.keyboard = true;
    }
}
NgbModalConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbModalConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContentRef {
    /**
     * @param {?} nodes
     * @param {?=} viewRef
     * @param {?=} componentRef
     */
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
/**
 * @template T
 */
class PopupService {
    /**
     * @param {?} _type
     * @param {?} _injector
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _componentFactoryResolver
     * @param {?} _applicationRef
     */
    constructor(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver, _applicationRef) {
        this._type = _type;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._applicationRef = _applicationRef;
    }
    /**
     * @param {?=} content
     * @param {?=} context
     * @return {?}
     */
    open(content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    }
    /**
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._applicationRef.detachView(this._contentRef.viewRef);
                this._contentRef.viewRef.destroy();
                this._contentRef = null;
            }
        }
    }
    /**
     * @private
     * @param {?} content
     * @param {?=} context
     * @return {?}
     */
    _getContentRef(content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            /** @type {?} */
            const viewRef = content.createEmbeddedView(context);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => { });
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
class ScrollBar {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * To be called right before a potential vertical scrollbar would be removed:
     *
     * - if there was a scrollbar, adds some compensation padding to the body
     * to keep the same layout as when the scrollbar is there
     * - if there was none, there is nothing to do
     *
     * @return {?} a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    compensate() {
        /** @type {?} */
        const width = this._getWidth();
        return !this._isPresent(width) ? noop : this._adjustBody(width);
    }
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @private
     * @param {?} scrollbarWidth
     * @return {?} a callback used to revert the padding to its previous value
     */
    _adjustBody(scrollbarWidth) {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const userSetPaddingStyle = body.style.paddingRight;
        /** @type {?} */
        const actualPadding = parseFloat(window.getComputedStyle(body)['padding-right']);
        body.style['padding-right'] = `${actualPadding + scrollbarWidth}px`;
        return (/**
         * @return {?}
         */
        () => body.style['padding-right'] = userSetPaddingStyle);
    }
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @private
     * @param {?} scrollbarWidth
     * @return {?} true if scrollbar is present, false otherwise
     */
    _isPresent(scrollbarWidth) {
        /** @type {?} */
        const rect = this._document.body.getBoundingClientRect();
        /** @type {?} */
        const bodyToViewportGap = window.innerWidth - (rect.left + rect.right);
        /** @type {?} */
        const uncertainty = 0.1 * scrollbarWidth;
        return bodyToViewportGap >= scrollbarWidth - uncertainty;
    }
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @private
     * @return {?} the width of a scrollbar on this page
     */
    _getWidth() {
        /** @type {?} */
        const measurer = this._document.createElement('div');
        measurer.className = 'modal-scrollbar-measure';
        /** @type {?} */
        const body = this._document.body;
        body.appendChild(measurer);
        /** @type {?} */
        const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
        body.removeChild(measurer);
        return width;
    }
}
ScrollBar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ScrollBar.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ ScrollBar.ngInjectableDef = ɵɵdefineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(ɵɵinject(DOCUMENT)); }, token: ScrollBar, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbModalBackdrop {
}
NgbModalBackdrop.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-backdrop',
                encapsulation: ViewEncapsulation.None,
                template: '',
                host: { '[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050' }
            }] }
];
NgbModalBackdrop.propDecorators = {
    backdropClass: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
class NgbActiveModal {
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     * @param {?=} result
     * @return {?}
     */
    close(result) { }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) { }
}
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
class NgbModalRef {
    /**
     * @param {?} _windowCmptRef
     * @param {?} _contentRef
     * @param {?=} _backdropCmptRef
     * @param {?=} _beforeDismiss
     */
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe((/**
         * @param {?} reason
         * @return {?}
         */
        (reason) => { this.dismiss(reason); }));
        this.result = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        }));
        this.result.then(null, (/**
         * @return {?}
         */
        () => { }));
    }
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
     * @return {?}
     */
    get componentInstance() {
        if (this._contentRef && this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     * @param {?=} result
     * @return {?}
     */
    close(result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    }
    /**
     * @private
     * @param {?=} reason
     * @return {?}
     */
    _dismiss(reason) {
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                const dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then((/**
                     * @param {?} result
                     * @return {?}
                     */
                    result => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }), (/**
                     * @return {?}
                     */
                    () => { }));
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    _removeModalElements() {
        /** @type {?} */
        const windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const ModalDismissReasons = {
    BACKDROP_CLICK: 0,
    ESC: 1,
};
ModalDismissReasons[ModalDismissReasons.BACKDROP_CLICK] = 'BACKDROP_CLICK';
ModalDismissReasons[ModalDismissReasons.ESC] = 'ESC';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbModalWindow {
    /**
     * @param {?} _document
     * @param {?} _elRef
     * @param {?} _zone
     */
    constructor(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    /**
     * @param {?} reason
     * @return {?}
     */
    dismiss(reason) { this.dismissEvent.emit(reason); }
    /**
     * @return {?}
     */
    ngOnInit() { this._elWithFocus = this._document.activeElement; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), 
            // tslint:disable-next-line:deprecation
            filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e.which === Key.Escape && this.keyboard)))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => requestAnimationFrame((/**
             * @return {?}
             */
            () => {
                if (!event.defaultPrevented) {
                    this._zone.run((/**
                     * @return {?}
                     */
                    () => this.dismiss(ModalDismissReasons.ESC)));
                }
            }))));
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            /** @type {?} */
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap((/**
             * @return {?}
             */
            () => preventClose = false)), switchMap((/**
             * @return {?}
             */
            () => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1)))), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ target }) => nativeElement === target)))
                .subscribe((/**
             * @return {?}
             */
            () => { preventClose = true; }));
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(this._closed$)).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ target }) => {
                if (this.backdrop === true && nativeElement === target && !preventClose) {
                    this._zone.run((/**
                     * @return {?}
                     */
                    () => this.dismiss(ModalDismissReasons.BACKDROP_CLICK)));
                }
                preventClose = false;
            }));
        }));
        if (!nativeElement.contains(document.activeElement)) {
            /** @type {?} */
            const autoFocusable = (/** @type {?} */ (nativeElement.querySelector(`[ngbAutofocus]`)));
            /** @type {?} */
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            /** @type {?} */
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const elWithFocus = this._elWithFocus;
        /** @type {?} */
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => elementToFocus.focus()));
            this._elWithFocus = null;
        }));
        this._closed$.next();
    }
}
NgbModalWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-window',
                host: {
                    '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                    'role': 'dialog',
                    'tabindex': '-1',
                    '[attr.aria-modal]': 'true',
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                },
                template: `
    <div #dialog [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +
     (scrollable ? ' modal-dialog-scrollable' : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `,
                encapsulation: ViewEncapsulation.None,
                styles: ["ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}"]
            }] }
];
/** @nocollapse */
NgbModalWindow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: NgZone }
];
NgbModalWindow.propDecorators = {
    _dialogEl: [{ type: ViewChild, args: ['dialog', { static: true },] }],
    ariaLabelledBy: [{ type: Input }],
    backdrop: [{ type: Input }],
    centered: [{ type: Input }],
    keyboard: [{ type: Input }],
    scrollable: [{ type: Input }],
    size: [{ type: Input }],
    windowClass: [{ type: Input }],
    dismissEvent: [{ type: Output, args: ['dismiss',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbModalStack {
    /**
     * @param {?} _applicationRef
     * @param {?} _injector
     * @param {?} _document
     * @param {?} _scrollBar
     * @param {?} _rendererFactory
     * @param {?} _ngZone
     */
    constructor(_applicationRef, _injector, _document, _scrollBar, _rendererFactory, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._ngZone = _ngZone;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass'];
        this._windowCmpts = [];
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._windowCmpts.length) {
                /** @type {?} */
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(this._ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        }));
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    open(moduleCFR, contentInjector, content, options) {
        /** @type {?} */
        const containerEl = options.container instanceof HTMLElement ? options.container : isDefined(options.container) ?
            this._document.querySelector(options.container) :
            this._document.body;
        /** @type {?} */
        const renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        const revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        const removeBodyClass = (/**
         * @return {?}
         */
        () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._revertAriaHidden();
            }
        });
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        /** @type {?} */
        const activeModal = new NgbActiveModal();
        /** @type {?} */
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
        /** @type {?} */
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        let windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (/**
         * @param {?} result
         * @return {?}
         */
        (result) => { ngbModalRef.close(result); });
        activeModal.dismiss = (/**
         * @param {?} reason
         * @return {?}
         */
        (reason) => { ngbModalRef.dismiss(reason); });
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalRefs.forEach((/**
     * @param {?} ngbModalRef
     * @return {?}
     */
    ngbModalRef => ngbModalRef.dismiss(reason))); }
    /**
     * @return {?}
     */
    hasOpenModals() { return this._modalRefs.length > 0; }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    _attachBackdrop(moduleCFR, containerEl) {
        /** @type {?} */
        let backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        let backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    _attachWindowComponent(moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    _applyWindowOptions(windowInstance, options) {
        this._windowAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        }));
    }
    /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        (optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        }));
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @param {?} options
     * @return {?}
     */
    _getContentRef(moduleCFR, contentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
        }
    }
    /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _createFromTemplateRef(content, activeModal) {
        /** @type {?} */
        const context = {
            $implicit: activeModal,
            /**
             * @param {?} result
             * @return {?}
             */
            close(result) { activeModal.close(result); },
            /**
             * @param {?} reason
             * @return {?}
             */
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        const viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    _createFromString(content) {
        /** @type {?} */
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @param {?} options
     * @return {?}
     */
    _createFromComponent(moduleCFR, contentInjector, content, context, options) {
        /** @type {?} */
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        const modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        const componentRef = contentCmptFactory.create(modalContentInjector);
        /** @type {?} */
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            ((/** @type {?} */ (componentNativeEl))).classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    _setAriaHidden(element) {
        /** @type {?} */
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((/**
             * @param {?} sibling
             * @return {?}
             */
            sibling => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }));
            this._setAriaHidden(parent);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((/**
         * @param {?} value
         * @param {?} element
         * @return {?}
         */
        (value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        }));
        this._ariaHiddenValues.clear();
    }
    /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    _registerModalRef(ngbModalRef) {
        /** @type {?} */
        const unregisterModalRef = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        });
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        }));
    }
}
NgbModalStack.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NgbModalStack.ctorParameters = () => [
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ScrollBar },
    { type: RendererFactory2 },
    { type: NgZone }
];
/** @nocollapse */ NgbModalStack.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(ɵɵinject(ApplicationRef), ɵɵinject(INJECTOR), ɵɵinject(DOCUMENT), ɵɵinject(ScrollBar), ɵɵinject(RendererFactory2), ɵɵinject(NgZone)); }, token: NgbModalStack, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
class NgbModal {
    /**
     * @param {?} _moduleCFR
     * @param {?} _injector
     * @param {?} _modalStack
     * @param {?} _config
     */
    constructor(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    open(content, options = {}) {
        /** @type {?} */
        const combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    }
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalStack.dismissAll(reason); }
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * \@since 3.3.0
     * @return {?}
     */
    hasOpenModals() { return this._modalStack.hasOpenModals(); }
}
NgbModal.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NgbModal.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: NgbModalStack },
    { type: NgbModalConfig }
];
/** @nocollapse */ NgbModal.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(ɵɵinject(ComponentFactoryResolver), ɵɵinject(INJECTOR), ɵɵinject(NgbModalStack), ɵɵinject(NgbModalConfig)); }, token: NgbModal, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbModalModule {
}
NgbModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbModalBackdrop, NgbModalWindow],
                entryComponents: [NgbModalBackdrop, NgbModalWindow],
                providers: [NgbModal]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * \@since 5.2.0
 */
class NgbNavConfig {
    constructor() {
        this.destroyOnHide = true;
        this.orientation = 'horizontal';
        this.roles = 'tablist';
    }
}
NgbNavConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbNavConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbNavConfig_Factory() { return new NgbNavConfig(); }, token: NgbNavConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isValidNavId = (/**
 * @param {?} id
 * @return {?}
 */
(id) => isDefined(id) && id !== '');
/** @type {?} */
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * \@since 5.2.0
 */
class NgbNavContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbNavContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbNavContent]' },] }
];
/** @nocollapse */
NgbNavContent.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * \@since 5.2.0
 */
class NgbNavItem {
    /**
     * @param {?} nav
     * @param {?} elementRef
     */
    constructor(nav, elementRef) {
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
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    /**
     * @return {?}
     */
    get active() { return this._nav.activeId === this.id; }
    /**
     * @return {?}
     */
    get id() { return isValidNavId(this._id) ? this._id : this.domId; }
    /**
     * @return {?}
     */
    get panelDomId() { return `${this.domId}-panel`; }
    /**
     * @return {?}
     */
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
}
NgbNavItem.decorators = [
    { type: Directive, args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', host: { '[class.nav-item]': 'true' } },] }
];
/** @nocollapse */
NgbNavItem.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => NgbNav)),] }] },
    { type: ElementRef }
];
NgbNavItem.propDecorators = {
    destroyOnHide: [{ type: Input }],
    disabled: [{ type: Input }],
    domId: [{ type: Input }],
    _id: [{ type: Input, args: ['ngbNavItem',] }],
    contentTpls: [{ type: ContentChildren, args: [NgbNavContent, { descendants: false },] }]
};
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * \@since 5.2.0
 */
class NgbNav {
    /**
     * @param {?} role
     * @param {?} config
     * @param {?} _cd
     */
    constructor(role, config, _cd) {
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
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     * @param {?} id
     * @return {?}
     */
    select(id) { this._updateActiveId(id, false); }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            /** @type {?} */
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
    }
    /**
     * @private
     * @param {?} nextId
     * @param {?=} emitNavChange
     * @return {?}
     */
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            /** @type {?} */
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({ activeId: this.activeId, nextId, preventDefault: (/**
                     * @return {?}
                     */
                    () => { defaultPrevented = true; }) });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
            }
        }
    }
}
NgbNav.decorators = [
    { type: Directive, args: [{
                selector: '[ngbNav]',
                exportAs: 'ngbNav',
                host: {
                    '[class.nav]': 'true',
                    '[class.flex-column]': `orientation === 'vertical'`,
                    '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                    '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                }
            },] }
];
/** @nocollapse */
NgbNav.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: NgbNavConfig },
    { type: ChangeDetectorRef }
];
NgbNav.propDecorators = {
    activeId: [{ type: Input }],
    activeIdChange: [{ type: Output }],
    destroyOnHide: [{ type: Input }],
    orientation: [{ type: Input }],
    roles: [{ type: Input }],
    items: [{ type: ContentChildren, args: [NgbNavItem,] }],
    navChange: [{ type: Output }]
};
/**
 * A directive to put on the nav link.
 *
 * \@since 5.2.0
 */
class NgbNavLink {
    /**
     * @param {?} role
     * @param {?} navItem
     * @param {?} nav
     */
    constructor(role, navItem, nav) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
    }
    /**
     * @return {?}
     */
    hasNavItemClass() {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    }
}
NgbNavLink.decorators = [
    { type: Directive, args: [{
                selector: 'a[ngbNavLink]',
                host: {
                    '[id]': 'navItem.domId',
                    '[class.nav-link]': 'true',
                    '[class.nav-item]': 'hasNavItemClass()',
                    '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
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
NgbNavLink.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: NgbNavItem },
    { type: NgbNav }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The outlet where currently active nav content will be displayed.
 *
 * \@since 5.2.0
 */
class NgbNavOutlet {
}
NgbNavOutlet.decorators = [
    { type: Component, args: [{
                selector: '[ngbNavOutlet]',
                host: { '[class.tab-content]': 'true' },
                encapsulation: ViewEncapsulation.None,
                template: `
      <ng-template ngFor let-item [ngForOf]="nav.items">
          <div class="tab-pane"
               *ngIf="item.isPanelInDom()"
               [id]="item.panelDomId"
               [class.active]="item.active"
               [attr.role]="paneRole ? paneRole : nav.roles ? 'tabpanel' : undefined"
               [attr.aria-labelledby]="item.domId">
              <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef" [ngTemplateOutletContext]="{$implicit: item.active}"></ng-template>
          </div>
      </ng-template>
  `
            }] }
];
NgbNavOutlet.propDecorators = {
    paneRole: [{ type: Input }],
    nav: [{ type: Input, args: ['ngbNavOutlet',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_NAV_DIRECTIVES = [NgbNavContent, NgbNav, NgbNavItem, NgbNavLink, NgbNavOutlet];
class NgbNavModule {
}
NgbNavModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_NAV_DIRECTIVES, exports: NGB_NAV_DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
class NgbPaginationConfig {
    constructor() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
}
NgbPaginationConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbPaginationConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbPaginationConfig_Factory() { return new NgbPaginationConfig(); }, token: NgbPaginationConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive to match the 'ellipsis' link template
 *
 * \@since 4.1.0
 */
class NgbPaginationEllipsis {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationEllipsis.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationEllipsis]' },] }
];
/** @nocollapse */
NgbPaginationEllipsis.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'first' link template
 *
 * \@since 4.1.0
 */
class NgbPaginationFirst {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationFirst.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationFirst]' },] }
];
/** @nocollapse */
NgbPaginationFirst.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'last' link template
 *
 * \@since 4.1.0
 */
class NgbPaginationLast {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationLast.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationLast]' },] }
];
/** @nocollapse */
NgbPaginationLast.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'next' link template
 *
 * \@since 4.1.0
 */
class NgbPaginationNext {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNext.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNext]' },] }
];
/** @nocollapse */
NgbPaginationNext.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the page 'number' link template
 *
 * \@since 4.1.0
 */
class NgbPaginationNumber {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNumber.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNumber]' },] }
];
/** @nocollapse */
NgbPaginationNumber.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'previous' link template
 *
 * \@since 4.1.0
 */
class NgbPaginationPrevious {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPrevious.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationPrevious]' },] }
];
/** @nocollapse */
NgbPaginationPrevious.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
class NgbPagination {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  The current page.
         *
         *  Page numbers start with `1`.
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
         *
         *  Event payload is the number of the newly selected page.
         *
         *  Page numbers start with `1`.
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    /**
     * @return {?}
     */
    hasPrevious() { return this.page > 1; }
    /**
     * @return {?}
     */
    hasNext() { return this.page < this.pageCount; }
    /**
     * @return {?}
     */
    nextDisabled() { return !this.hasNext() || this.disabled; }
    /**
     * @return {?}
     */
    previousDisabled() { return !this.hasPrevious() || this.disabled; }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    selectPage(pageNumber) { this._updatePages(pageNumber); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { this._updatePages(this.page); }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    isEllipsis(pageNumber) { return pageNumber === -1; }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                // The first page will always be included. If the displayed range
                // starts after the third page, then add ellipsis. But if the range
                // starts on the third page, then add the second page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (start > 2) {
                    this.pages.unshift(-1);
                }
                else if (start === 2) {
                    this.pages.unshift(2);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                // The last page will always be included. If the displayed range
                // ends before the third-last page, then add ellipsis. But if the range
                // ends on third-last page, then add the second-last page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (end < (this.pageCount - 2)) {
                    this.pages.push(-1);
                }
                else if (end === (this.pageCount - 2)) {
                    this.pages.push(this.pageCount - 1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @private
     * @return {?}
     */
    _applyRotation() {
        /** @type {?} */
        let start = 0;
        /** @type {?} */
        let end = this.pageCount;
        /** @type {?} */
        let leftOffset = Math.floor(this.maxSize / 2);
        /** @type {?} */
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page.
     * @private
     * @return {?}
     */
    _applyPagination() {
        /** @type {?} */
        let page = Math.ceil(this.page / this.maxSize) - 1;
        /** @type {?} */
        let start = page * this.maxSize;
        /** @type {?} */
        let end = start + this.maxSize;
        return [start, end];
    }
    /**
     * @private
     * @param {?} newPageNo
     * @return {?}
     */
    _setPageInRange(newPageNo) {
        /** @type {?} */
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    /**
     * @private
     * @param {?} newPage
     * @return {?}
     */
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            /** @type {?} */
            let start = 0;
            /** @type {?} */
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.decorators = [
    { type: Component, args: [{
                selector: 'ngb-pagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'role': 'navigation' },
                template: `
    <ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
    <ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
    <ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
    <ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
    <ng-template #ellipsis>...</ng-template>
    <ng-template #defaultNumber let-page let-currentPage="currentPage">
      {{ page }}
      <span *ngIf="page === currentPage" class="sr-only">(current)</span>
    </ng-template>
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="selectPage(1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplFirst?.templateRef || first"
                       [ngTemplateOutletContext]="{disabled: previousDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="selectPage(page-1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplPrevious?.templateRef || previous"
                       [ngTemplateOutletContext]="{disabled: previousDisabled()}"></ng-template>
        </a>
      </li>
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled" [attr.aria-current]="(pageNumber === page ? 'page' : null)">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
          <ng-template [ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
                       [ngTemplateOutletContext]="{disabled: true, currentPage: page}"></ng-template>
        </a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="selectPage(pageNumber); $event.preventDefault()" [attr.tabindex]="disabled ? '-1' : null"
          [attr.aria-disabled]="disabled ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
                       [ngTemplateOutletContext]="{disabled: disabled, $implicit: pageNumber, currentPage: page}"></ng-template>
        </a>
      </li>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="selectPage(page+1); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNext?.templateRef || next"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="selectPage(pageCount); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplLast?.templateRef || last"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>
    </ul>
  `
            }] }
];
/** @nocollapse */
NgbPagination.ctorParameters = () => [
    { type: NgbPaginationConfig }
];
NgbPagination.propDecorators = {
    tplEllipsis: [{ type: ContentChild, args: [NgbPaginationEllipsis, { static: false },] }],
    tplFirst: [{ type: ContentChild, args: [NgbPaginationFirst, { static: false },] }],
    tplLast: [{ type: ContentChild, args: [NgbPaginationLast, { static: false },] }],
    tplNext: [{ type: ContentChild, args: [NgbPaginationNext, { static: false },] }],
    tplNumber: [{ type: ContentChild, args: [NgbPaginationNumber, { static: false },] }],
    tplPrevious: [{ type: ContentChild, args: [NgbPaginationPrevious, { static: false },] }],
    disabled: [{ type: Input }],
    boundaryLinks: [{ type: Input }],
    directionLinks: [{ type: Input }],
    ellipses: [{ type: Input }],
    rotate: [{ type: Input }],
    collectionSize: [{ type: Input }],
    maxSize: [{ type: Input }],
    page: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageChange: [{ type: Output }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DIRECTIVES = [
    NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber,
    NgbPaginationPrevious
];
class NgbPaginationModule {
}
NgbPaginationModule.decorators = [
    { type: NgModule, args: [{ declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Trigger {
    /**
     * @param {?} open
     * @param {?=} close
     */
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    /**
     * @return {?}
     */
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
/** @type {?} */
const DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave'],
    'focus': ['focusin', 'focusout'],
};
/**
 * @param {?} triggers
 * @param {?=} aliases
 * @return {?}
 */
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    /** @type {?} */
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    /** @type {?} */
    const parsedTriggers = trimmedTriggers.split(/\s+/).map((/**
     * @param {?} trigger
     * @return {?}
     */
    trigger => trigger.split(':'))).map((/**
     * @param {?} triggerPair
     * @return {?}
     */
    (triggerPair) => {
        /** @type {?} */
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    }));
    /** @type {?} */
    const manualTriggers = parsedTriggers.filter((/**
     * @param {?} triggerPair
     * @return {?}
     */
    triggerPair => triggerPair.isManual()));
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} isOpenedFn
 * @return {?}
 */
function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    subscriber => {
        /** @type {?} */
        const listeners = [];
        /** @type {?} */
        const openFn = (/**
         * @return {?}
         */
        () => subscriber.next(true));
        /** @type {?} */
        const closeFn = (/**
         * @return {?}
         */
        () => subscriber.next(false));
        /** @type {?} */
        const toggleFn = (/**
         * @return {?}
         */
        () => subscriber.next(!isOpenedFn()));
        triggers.forEach((/**
         * @param {?} trigger
         * @return {?}
         */
        (trigger) => {
            if (trigger.open === trigger.close) {
                listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
            }
            else {
                listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
            }
        }));
        return (/**
         * @return {?}
         */
        () => { listeners.forEach((/**
         * @param {?} unsubscribeFn
         * @return {?}
         */
        unsubscribeFn => unsubscribeFn())); });
    }));
}
/** @type {?} */
const delayOrNoop = (/**
 * @template T
 * @param {?} time
 * @return {?}
 */
(time) => time > 0 ? delay(time) : (/**
 * @param {?} a
 * @return {?}
 */
(a) => a));
/**
 * @param {?} openDelay
 * @param {?} closeDelay
 * @param {?} isOpenedFn
 * @return {?}
 */
function triggerDelay(openDelay, closeDelay, isOpenedFn) {
    return (/**
     * @param {?} input$
     * @return {?}
     */
    (input$) => {
        /** @type {?} */
        let pending = null;
        /** @type {?} */
        const filteredInput$ = input$.pipe(map((/**
         * @param {?} open
         * @return {?}
         */
        open => ({ open }))), filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const currentlyOpen = isOpenedFn();
            if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
                pending = event;
                return true;
            }
            if (pending && pending.open !== event.open) {
                pending = null;
            }
            return false;
        })), share());
        /** @type {?} */
        const delayedOpen$ = filteredInput$.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.open)), delayOrNoop(openDelay));
        /** @type {?} */
        const delayedClose$ = filteredInput$.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => !event.open)), delayOrNoop(closeDelay));
        return merge(delayedOpen$, delayedClose$)
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
            }
            return false;
        })), map((/**
         * @param {?} event
         * @return {?}
         */
        event => event.open)));
    });
}
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} isOpenedFn
 * @param {?} openFn
 * @param {?} closeFn
 * @param {?=} openDelay
 * @param {?=} closeDelay
 * @return {?}
 */
function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay = 0, closeDelay = 0) {
    /** @type {?} */
    const parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return (/**
         * @return {?}
         */
        () => { });
    }
    /** @type {?} */
    const subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
        .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
        .subscribe((/**
     * @param {?} open
     * @return {?}
     */
    open => (open ? openFn() : closeFn())));
    return (/**
     * @return {?}
     */
    () => subscription.unsubscribe());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
class NgbPopoverConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'auto';
        this.triggers = 'click';
        this.disablePopover = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
}
NgbPopoverConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbPopoverConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbPopoverConfig_Factory() { return new NgbPopoverConfig(); }, token: NgbPopoverConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$3 = 0;
class NgbPopoverWindow {
    /**
     * @return {?}
     */
    isTitleTemplate() { return this.title instanceof TemplateRef; }
}
NgbPopoverWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-popover-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id' },
                template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
                styles: ["ngb-popover-window.bs-popover-bottom>.arrow,ngb-popover-window.bs-popover-top>.arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left>.arrow,ngb-popover-window.bs-popover-top-left>.arrow{left:2em}ngb-popover-window.bs-popover-bottom-right>.arrow,ngb-popover-window.bs-popover-top-right>.arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left>.arrow,ngb-popover-window.bs-popover-right>.arrow{top:50%;margin-top:-.5rem}ngb-popover-window.bs-popover-left-top>.arrow,ngb-popover-window.bs-popover-right-top>.arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom>.arrow,ngb-popover-window.bs-popover-right-bottom>.arrow{top:auto;bottom:.7em}"]
            }] }
];
NgbPopoverWindow.propDecorators = {
    title: [{ type: Input }],
    id: [{ type: Input }],
    popoverClass: [{ type: Input }],
    context: [{ type: Input }]
};
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
class NgbPopover {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     * @param {?} _changeDetector
     * @param {?} applicationRef
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the popover is shown. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover is hidden. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId$3++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._windowRef) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body', 'bs-popover');
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, (/**
             * @return {?}
             */
            () => this.close()), this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.instance.popoverClass = popoverClass.currentValue;
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    }
}
NgbPopover.decorators = [
    { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] }
];
/** @nocollapse */
NgbPopover.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbPopoverConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: ApplicationRef }
];
NgbPopover.propDecorators = {
    autoClose: [{ type: Input }],
    ngbPopover: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disablePopover: [{ type: Input }],
    popoverClass: [{ type: Input }],
    openDelay: [{ type: Input }],
    closeDelay: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbPopoverModule {
}
NgbPopoverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbPopover, NgbPopoverWindow],
                exports: [NgbPopover],
                imports: [CommonModule],
                entryComponents: [NgbPopoverWindow]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.striped = false;
        this.showValue = false;
    }
}
NgbProgressbarConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbProgressbarConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbProgressbarConfig_Factory() { return new NgbProgressbarConfig(); }, token: NgbProgressbarConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
class NgbProgressbar {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.textType = config.textType;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     * @param {?} max
     * @return {?}
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    /**
     * @return {?}
     */
    get max() { return this._max; }
    /**
     * @return {?}
     */
    getValue() { return getValueInRange(this.value, this.max); }
    /**
     * @return {?}
     */
    getPercentValue() { return 100 * this.getValue() / this.max; }
}
NgbProgressbar.decorators = [
    { type: Component, args: [{
                selector: 'ngb-progressbar',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="progress" [style.height]="height">
      <div class="progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}
      {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}" role="progressbar" [style.width.%]="getPercentValue()"
      [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getPercentValue()}}%</span><ng-content></ng-content>
      </div>
    </div>
  `
            }] }
];
/** @nocollapse */
NgbProgressbar.ctorParameters = () => [
    { type: NgbProgressbarConfig }
];
NgbProgressbar.propDecorators = {
    max: [{ type: Input }],
    animated: [{ type: Input }],
    striped: [{ type: Input }],
    showValue: [{ type: Input }],
    textType: [{ type: Input }],
    type: [{ type: Input }],
    value: [{ type: Input }],
    height: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbProgressbarModule {
}
NgbProgressbarModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbProgressbar], exports: [NgbProgressbar], imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbRating`](#/components/rating/api#NgbRating) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
class NgbRatingConfig {
    constructor() {
        this.max = 10;
        this.readonly = false;
        this.resettable = false;
    }
}
NgbRatingConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbRatingConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbRatingConfig_Factory() { return new NgbRatingConfig(); }, token: NgbRatingConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbRating)),
    multi: true
};
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
class NgbRating {
    /**
     * @param {?} config
     * @param {?} _changeDetectorRef
     */
    constructor(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event emitted when the user is hovering over a given rating.
         *
         * Event payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event emitted when the user stops hovering over a given rating.
         *
         * Event payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event emitted when the user selects a new rating.
         *
         * Event payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    ariaValueText() { return `${this.nextRate} out of ${this.max}`; }
    /**
     * @param {?} value
     * @return {?}
     */
    enter(value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    /**
     * @return {?}
     */
    handleBlur() { this.onTouched(); }
    /**
     * @param {?} value
     * @return {?}
     */
    handleClick(value) {
        if (!this.readonly && !this.disabled) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
            case Key.ArrowLeft:
                this.update(this.rate - 1);
                break;
            case Key.ArrowUp:
            case Key.ArrowRight:
                this.update(this.rate + 1);
                break;
            case Key.Home:
                this.update(0);
                break;
            case Key.End:
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contexts = Array.from({ length: this.max }, (/**
         * @param {?} v
         * @param {?} k
         * @return {?}
         */
        (v, k) => ({ fill: 0, index: k })));
        this._updateState(this.rate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @return {?}
     */
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    update(value, internalChange = true) {
        /** @type {?} */
        const newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _getFillValue(index) {
        /** @type {?} */
        const diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return parseInt((diff * 100).toFixed(2), 10);
        }
        return 0;
    }
    /**
     * @private
     * @param {?} nextValue
     * @return {?}
     */
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((/**
         * @param {?} context
         * @param {?} index
         * @return {?}
         */
        (context, index) => context.fill = this._getFillValue(index)));
    }
}
NgbRating.decorators = [
    { type: Component, args: [{
                selector: 'ngb-rating',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'd-inline-flex',
                    '[tabindex]': 'disabled ? -1 : 0',
                    'role': 'slider',
                    'aria-valuemin': '0',
                    '[attr.aria-valuemax]': 'max',
                    '[attr.aria-valuenow]': 'nextRate',
                    '[attr.aria-valuetext]': 'ariaValueText()',
                    '[attr.aria-disabled]': 'readonly ? true : null',
                    '(blur)': 'handleBlur()',
                    '(keydown)': 'handleKeyDown($event)',
                    '(mouseleave)': 'reset()'
                },
                template: `
    <ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
    <ng-template ngFor [ngForOf]="contexts" let-index="index">
      <span class="sr-only">({{ index < nextRate ? '*' : ' ' }})</span>
      <span (mouseenter)="enter(index + 1)" (click)="handleClick(index + 1)" [style.cursor]="readonly || disabled ? 'default' : 'pointer'">
        <ng-template [ngTemplateOutlet]="starTemplate || starTemplateFromContent || t" [ngTemplateOutletContext]="contexts[index]">
        </ng-template>
      </span>
    </ng-template>
  `,
                providers: [NGB_RATING_VALUE_ACCESSOR]
            }] }
];
/** @nocollapse */
NgbRating.ctorParameters = () => [
    { type: NgbRatingConfig },
    { type: ChangeDetectorRef }
];
NgbRating.propDecorators = {
    max: [{ type: Input }],
    rate: [{ type: Input }],
    readonly: [{ type: Input }],
    resettable: [{ type: Input }],
    starTemplate: [{ type: Input }],
    starTemplateFromContent: [{ type: ContentChild, args: [TemplateRef, { static: false },] }],
    hover: [{ type: Output }],
    leave: [{ type: Output }],
    rateChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbRatingModule {
}
NgbRatingModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbRating], exports: [NgbRating], imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbTabset`](#/components/tabset/api#NgbTabset) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
class NgbTabsetConfig {
    constructor() {
        this.justify = 'start';
        this.orientation = 'horizontal';
        this.type = 'tabs';
    }
}
NgbTabsetConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTabsetConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbTabsetConfig_Factory() { return new NgbTabsetConfig(); }, token: NgbTabsetConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$4 = 0;
/**
 * A directive to wrap tab titles that need to contain HTML markup or other directives.
 *
 * Alternatively you could use the `NgbTab.title` input for string titles.
 */
class NgbTabTitle {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbTabTitle.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbTabTitle]' },] }
];
/** @nocollapse */
NgbTabTitle.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to wrap content to be displayed in a tab.
 */
class NgbTabContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbTabContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbTabContent]' },] }
];
/** @nocollapse */
NgbTabContent.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive representing an individual tab.
 */
class NgbTab {
    constructor() {
        /**
         * The tab identifier.
         *
         * Must be unique for the entire document for proper accessibility support.
         */
        this.id = `ngb-tab-${nextId$4++}`;
        /**
         * If `true`, the current tab is disabled and can't be toggled.
         */
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
}
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
/**
 * A component that makes it easy to create tabbed interface.
 */
class NgbTabset {
    /**
     * @param {?} config
     */
    constructor(config) {
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
    /**
     * The horizontal alignment of the tabs with flexbox utilities.
     * @param {?} className
     * @return {?}
     */
    set justify(className) {
        if (className === 'fill' || className === 'justified') {
            this.justifyClass = `nav-${className}`;
        }
        else {
            this.justifyClass = `justify-content-${className}`;
        }
    }
    /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     * @param {?} tabId
     * @return {?}
     */
    select(tabId) {
        /** @type {?} */
        let selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            /** @type {?} */
            let defaultPrevented = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: (/**
                 * @return {?}
                 */
                () => { defaultPrevented = true; }) });
            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // auto-correct activeId that might have been set incorrectly as input
        /** @type {?} */
        let activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    _getTabById(id) {
        /** @type {?} */
        let tabsWithId = this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.id === id));
        return tabsWithId.length ? tabsWithId[0] : null;
    }
}
NgbTabset.decorators = [
    { type: Component, args: [{
                selector: 'ngb-tabset',
                exportAs: 'ngbTabset',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ul [class]="'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')" role="tablist">
      <li class="nav-item" *ngFor="let tab of tabs">
        <a [id]="tab.id" class="nav-link" [class.active]="tab.id === activeId" [class.disabled]="tab.disabled"
          href (click)="select(tab.id); $event.preventDefault()" role="tab" [attr.tabindex]="(tab.disabled ? '-1': undefined)"
          [attr.aria-controls]="(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)"
          [attr.aria-selected]="tab.id === activeId" [attr.aria-disabled]="tab.disabled">
          {{tab.title}}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <ng-template ngFor let-tab [ngForOf]="tabs">
        <div
          class="tab-pane {{tab.id === activeId ? 'active' : null}}"
          *ngIf="!destroyOnHide || tab.id === activeId"
          role="tabpanel"
          [attr.aria-labelledby]="tab.id" id="{{tab.id}}-panel">
          <ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef"></ng-template>
        </div>
      </ng-template>
    </div>
  `
            }] }
];
/** @nocollapse */
NgbTabset.ctorParameters = () => [
    { type: NgbTabsetConfig }
];
NgbTabset.propDecorators = {
    tabs: [{ type: ContentChildren, args: [NgbTab,] }],
    activeId: [{ type: Input }],
    destroyOnHide: [{ type: Input }],
    justify: [{ type: Input }],
    orientation: [{ type: Input }],
    type: [{ type: Input }],
    tabChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];
class NgbTabsetModule {
}
NgbTabsetModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule, NgbNavModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbTime {
    /**
     * @param {?=} hour
     * @param {?=} minute
     * @param {?=} second
     */
    constructor(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeHour(step = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step); }
    /**
     * @param {?} hour
     * @return {?}
     */
    updateHour(hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeMinute(step = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step); }
    /**
     * @param {?} minute
     * @return {?}
     */
    updateMinute(minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeSecond(step = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + step); }
    /**
     * @param {?} second
     * @return {?}
     */
    updateSecond(second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    }
    /**
     * @param {?=} checkSecs
     * @return {?}
     */
    isValid(checkSecs = true) {
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    }
    /**
     * @return {?}
     */
    toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
class NgbTimepickerConfig {
    constructor() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
}
NgbTimepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTimepickerConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbTimepickerConfig_Factory() { return new NgbTimepickerConfig(); }, token: NgbTimepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * \@since 2.2.0
 * @abstract
 * @template T
 */
class NgbTimeAdapter {
}
NgbTimeAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY },] }
];
/** @nocollapse */ NgbTimeAdapter.ngInjectableDef = ɵɵdefineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    fromModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    toModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
}
NgbTimeStructAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} locale
 * @return {?}
 */
function NGB_TIMEPICKER_I18N_FACTORY(locale) {
    return new NgbTimepickerI18nDefault(locale);
}
/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 * @abstract
 */
class NgbTimepickerI18n {
}
NgbTimepickerI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [LOCALE_ID] },] }
];
/** @nocollapse */ NgbTimepickerI18n.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbTimepickerI18n_Factory() { return NGB_TIMEPICKER_I18N_FACTORY(ɵɵinject(LOCALE_ID)); }, token: NgbTimepickerI18n, providedIn: "root" });
class NgbTimepickerI18nDefault extends NgbTimepickerI18n {
    /**
     * @param {?} locale
     */
    constructor(locale) {
        super();
        this._periods = getLocaleDayPeriods(locale, FormStyle.Standalone, TranslationWidth.Narrow);
    }
    /**
     * @return {?}
     */
    getMorningPeriod() { return this._periods[0]; }
    /**
     * @return {?}
     */
    getAfternoonPeriod() { return this._periods[1]; }
}
NgbTimepickerI18nDefault.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbTimepickerI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FILTER_REGEX = /[^0-9]/g;
/** @type {?} */
const NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbTimepicker)),
    multi: true
};
/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
class NgbTimepicker {
    /**
     * @param {?} _config
     * @param {?} _ngbTimeAdapter
     * @param {?} _cd
     * @param {?} i18n
     */
    constructor(_config, _ngbTimeAdapter, _cd, i18n) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.i18n = i18n;
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    /**
     * The number of hours to add/subtract when clicking hour spinners.
     * @param {?} step
     * @return {?}
     */
    set hourStep(step) {
        this._hourStep = isInteger(step) ? step : this._config.hourStep;
    }
    /**
     * @return {?}
     */
    get hourStep() { return this._hourStep; }
    /**
     * The number of minutes to add/subtract when clicking minute spinners.
     * @param {?} step
     * @return {?}
     */
    set minuteStep(step) {
        this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
    }
    /**
     * @return {?}
     */
    get minuteStep() { return this._minuteStep; }
    /**
     * The number of seconds to add/subtract when clicking second spinners.
     * @param {?} step
     * @return {?}
     */
    set secondStep(step) {
        this._secondStep = isInteger(step) ? step : this._config.secondStep;
    }
    /**
     * @return {?}
     */
    get secondStep() { return this._secondStep; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        /** @type {?} */
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} step
     * @return {?}
     */
    changeHour(step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeMinute(step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeSecond(step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateHour(newVal) {
        /** @type {?} */
        const isPM = this.model.hour >= 12;
        /** @type {?} */
        const enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateMinute(newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateSecond(newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @return {?}
     */
    toggleMeridian() {
        if (this.meridian) {
            this.changeHour(12);
        }
    }
    /**
     * @param {?} input
     * @return {?}
     */
    formatInput(input) { input.value = input.value.replace(FILTER_REGEX, ''); }
    /**
     * @param {?} value
     * @return {?}
     */
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatMinSec(value) { return padNumber(value); }
    /**
     * @return {?}
     */
    get isSmallSize() { return this.size === 'small'; }
    /**
     * @return {?}
     */
    get isLargeSize() { return this.size === 'large'; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    /**
     * @private
     * @param {?=} touched
     * @return {?}
     */
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
}
NgbTimepicker.decorators = [
    { type: Component, args: [{
                selector: 'ngb-timepicker',
                encapsulation: ViewEncapsulation.None,
                template: `
    <fieldset [disabled]="disabled" [class.disabled]="disabled">
      <div class="ngb-tp">
        <div class="ngb-tp-input-container ngb-tp-hour">
          <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeHour(hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
          </button>
          <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize"
            [class.form-control-lg]="isLargeSize"
            maxlength="2" inputmode="numeric" placeholder="HH" i18n-placeholder="@@ngb.timepicker.HH"
            [value]="formatHour(model?.hour)" (change)="updateHour($event.target.value)"
            [readOnly]="readonlyInputs" [disabled]="disabled" aria-label="Hours" i18n-aria-label="@@ngb.timepicker.hours"
            (input)="formatInput($event.target)"
            (keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
            (keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()">
          <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeHour(-hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
          </button>
        </div>
        <div class="ngb-tp-spacer">:</div>
        <div class="ngb-tp-input-container ngb-tp-minute">
          <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeMinute(minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
          </button>
          <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
            maxlength="2" inputmode="numeric" placeholder="MM" i18n-placeholder="@@ngb.timepicker.MM"
            [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target.value)"
            [readOnly]="readonlyInputs" [disabled]="disabled" aria-label="Minutes" i18n-aria-label="@@ngb.timepicker.minutes"
            (input)="formatInput($event.target)"
            (keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
            (keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()">
          <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeMinute(-minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron bottom"></span>
            <span class="sr-only"  i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
          </button>
        </div>
        <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
        <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
          <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeSecond(secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
          </button>
          <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
            maxlength="2" inputmode="numeric" placeholder="SS" i18n-placeholder="@@ngb.timepicker.SS"
            [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target.value)"
            [readOnly]="readonlyInputs" [disabled]="disabled" aria-label="Seconds" i18n-aria-label="@@ngb.timepicker.seconds"
            (input)="formatInput($event.target)"
            (keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
            (keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()">
          <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeSecond(-secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
          </button>
        </div>
        <div *ngIf="meridian" class="ngb-tp-spacer"></div>
        <div *ngIf="meridian" class="ngb-tp-meridian">
          <button type="button" class="btn btn-outline-primary" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"
            [disabled]="disabled" [class.disabled]="disabled"
                  (click)="toggleMeridian()">
            <ng-container *ngIf="model?.hour >= 12; else am" i18n="@@ngb.timepicker.PM">{{ i18n.getAfternoonPeriod() }}</ng-container>
            <ng-template #am i18n="@@ngb.timepicker.AM">{{ i18n.getMorningPeriod() }}</ng-template>
          </button>
        </div>
      </div>
    </fieldset>
  `,
                providers: [NGB_TIMEPICKER_VALUE_ACCESSOR],
                styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron::before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-meridian,.ngb-tp-minute,.ngb-tp-second{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}"]
            }] }
];
/** @nocollapse */
NgbTimepicker.ctorParameters = () => [
    { type: NgbTimepickerConfig },
    { type: NgbTimeAdapter },
    { type: ChangeDetectorRef },
    { type: NgbTimepickerI18n }
];
NgbTimepicker.propDecorators = {
    meridian: [{ type: Input }],
    spinners: [{ type: Input }],
    seconds: [{ type: Input }],
    hourStep: [{ type: Input }],
    minuteStep: [{ type: Input }],
    secondStep: [{ type: Input }],
    readonlyInputs: [{ type: Input }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbTimepickerModule {
}
NgbTimepickerModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbTimepicker], exports: [NgbTimepicker], imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * \@since 5.0.0
 */
class NgbToastConfig {
    constructor() {
        this.autohide = true;
        this.delay = 500;
        this.ariaLive = 'polite';
    }
}
NgbToastConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbToastConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbToastConfig_Factory() { return new NgbToastConfig(); }, token: NgbToastConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * \@since 5.0.0
 */
class NgbToastHeader {
}
NgbToastHeader.decorators = [
    { type: Directive, args: [{ selector: '[ngbToastHeader]' },] }
];
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * \@since 5.0.0
 */
class NgbToast {
    /**
     * @param {?} ariaLive
     * @param {?} config
     */
    constructor(ariaLive, config) {
        this.ariaLive = ariaLive;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired immediately when toast's `hide()` method has been called.
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross (&times)
         *
         * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
         * that.
         */
        this.hideOutput = new EventEmitter();
        if (this.ariaLive == null) {
            this.ariaLive = config.ariaLive;
        }
        this.delay = config.delay;
        this.autohide = config.autohide;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() { this._init(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this._clearTimeout();
        this.hideOutput.emit();
    }
    /**
     * @private
     * @return {?}
     */
    _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout((/**
             * @return {?}
             */
            () => this.hide()), this.delay);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
}
NgbToast.decorators = [
    { type: Component, args: [{
                selector: 'ngb-toast',
                exportAs: 'ngbToast',
                encapsulation: ViewEncapsulation.None,
                host: {
                    'role': 'alert',
                    '[attr.aria-live]': 'ariaLive',
                    'aria-atomic': 'true',
                    '[class.toast]': 'true',
                    '[class.show]': 'true',
                },
                template: `
    <ng-template #headerTpl>
      <strong class="mr-auto">{{header}}</strong>
    </ng-template>
    <ng-template [ngIf]="contentHeaderTpl || header">
      <div class="toast-header">
        <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
        <button type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.toast.close-aria" (click)="hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </ng-template>
    <div class="toast-body">
      <ng-content></ng-content>
    </div>
  `,
                styles: [".ngb-toasts{position:fixed;top:0;right:0;margin:.5em;z-index:1200}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}"]
            }] }
];
/** @nocollapse */
NgbToast.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['aria-live',] }] },
    { type: NgbToastConfig }
];
NgbToast.propDecorators = {
    delay: [{ type: Input }],
    autohide: [{ type: Input }],
    header: [{ type: Input }],
    contentHeaderTpl: [{ type: ContentChild, args: [NgbToastHeader, { read: TemplateRef, static: true },] }],
    hideOutput: [{ type: Output, args: ['hide',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbToastModule {
}
NgbToastModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbToast, NgbToastHeader], imports: [CommonModule], exports: [NgbToast, NgbToastHeader] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
class NgbTooltipConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'auto';
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
}
NgbTooltipConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTooltipConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(); }, token: NgbTooltipConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$5 = 0;
class NgbTooltipWindow {
}
NgbTooltipWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-tooltip-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { '[class]': '"tooltip show" + (tooltipClass ? " " + tooltipClass : "")', 'role': 'tooltip', '[id]': 'id' },
                template: `<div class="arrow"></div><div class="tooltip-inner"><ng-content></ng-content></div>`,
                styles: ["ngb-tooltip-window.bs-tooltip-bottom .arrow,ngb-tooltip-window.bs-tooltip-top .arrow{left:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-bottom-left .arrow,ngb-tooltip-window.bs-tooltip-top-left .arrow{left:1em}ngb-tooltip-window.bs-tooltip-bottom-right .arrow,ngb-tooltip-window.bs-tooltip-top-right .arrow{left:auto;right:.8rem}ngb-tooltip-window.bs-tooltip-left .arrow,ngb-tooltip-window.bs-tooltip-right .arrow{top:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-left-top .arrow,ngb-tooltip-window.bs-tooltip-right-top .arrow{top:.4rem}ngb-tooltip-window.bs-tooltip-left-bottom .arrow,ngb-tooltip-window.bs-tooltip-right-bottom .arrow{top:auto;bottom:.4rem}"]
            }] }
];
NgbTooltipWindow.propDecorators = {
    id: [{ type: Input }],
    tooltipClass: [{ type: Input }]
};
/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
class NgbTooltip {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     * @param {?} _changeDetector
     * @param {?} applicationRef
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the tooltip is shown. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover is hidden. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId$5++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);
        this._zoneSubscription = _ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._windowRef) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body', 'bs-tooltip');
            }
        }));
    }
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     * @param {?} value
     * @return {?}
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    get ngbTooltip() { return this._ngbTooltip; }
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            this._windowRef = this._popupService.open(this._ngbTooltip, context);
            this._windowRef.instance.tooltipClass = this.tooltipClass;
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening tooltip from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because tooltip won't work inside the OnPush component.
            // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the tooltip from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, (/**
             * @return {?}
             */
            () => this.close()), this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
        }
    }
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     * @return {?}
     */
    close() {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    ngOnChanges({ tooltipClass }) {
        if (tooltipClass && this.isOpen()) {
            this._windowRef.instance.tooltipClass = tooltipClass.currentValue;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    }
}
NgbTooltip.decorators = [
    { type: Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] }
];
/** @nocollapse */
NgbTooltip.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbTooltipConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: ApplicationRef }
];
NgbTooltip.propDecorators = {
    autoClose: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disableTooltip: [{ type: Input }],
    tooltipClass: [{ type: Input }],
    openDelay: [{ type: Input }],
    closeDelay: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }],
    ngbTooltip: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbTooltipModule {
}
NgbTooltipModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
class NgbHighlight {
    constructor() {
        /**
         * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const result = toString(this.result);
        /** @type {?} */
        const terms = Array.isArray(this.term) ? this.term : [this.term];
        /** @type {?} */
        const escapedTerms = terms.map((/**
         * @param {?} term
         * @return {?}
         */
        term => regExpEscape(toString(term)))).filter((/**
         * @param {?} term
         * @return {?}
         */
        term => term));
        this.parts = escapedTerms.length ? result.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];
    }
}
NgbHighlight.decorators = [
    { type: Component, args: [{
                selector: 'ngb-highlight',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
                    `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
                    `</ng-template>`,
                styles: [".ngb-highlight{font-weight:700}"]
            }] }
];
NgbHighlight.propDecorators = {
    highlightClass: [{ type: Input }],
    result: [{ type: Input }],
    term: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbTypeaheadWindow {
    constructor() {
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new EventEmitter();
        this.activeChangeEvent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    hasActive() { return this.activeIdx > -1 && this.activeIdx < this.results.length; }
    /**
     * @return {?}
     */
    getActive() { return this.results[this.activeIdx]; }
    /**
     * @param {?} activeIdx
     * @return {?}
     */
    markActive(activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    next() {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    prev() {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    resetActive() {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) { this.selectEvent.emit(item); }
    /**
     * @return {?}
     */
    ngOnInit() { this.resetActive(); }
    /**
     * @private
     * @return {?}
     */
    _activeChanged() {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    }
}
NgbTypeaheadWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-typeahead-window',
                exportAs: 'ngbTypeaheadWindow',
                encapsulation: ViewEncapsulation.None,
                host: { '(mousedown)': '$event.preventDefault()', 'class': 'dropdown-menu show', 'role': 'listbox', '[id]': 'id' },
                template: `
    <ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
      <ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
    </ng-template>
    <ng-template ngFor [ngForOf]="results" let-result let-idx="index">
      <button type="button" class="dropdown-item" role="option"
        [id]="id + '-' + idx"
        [class.active]="idx === activeIdx"
        (mouseenter)="markActive(idx)"
        (click)="select(result)">
          <ng-template [ngTemplateOutlet]="resultTemplate || rt"
          [ngTemplateOutletContext]="{result: result, term: term, formatter: formatter}"></ng-template>
      </button>
    </ng-template>
  `
            }] }
];
NgbTypeaheadWindow.propDecorators = {
    id: [{ type: Input }],
    focusFirst: [{ type: Input }],
    results: [{ type: Input }],
    term: [{ type: Input }],
    formatter: [{ type: Input }],
    resultTemplate: [{ type: Input }],
    selectEvent: [{ type: Output, args: ['select',] }],
    activeChangeEvent: [{ type: Output, args: ['activeChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
/**
 * @return {?}
 */
function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
/**
 * @param {?} document
 * @param {?=} lazyCreate
 * @return {?}
 */
function getLiveElement(document, lazyCreate = false) {
    /** @type {?} */
    let element = (/** @type {?} */ (document.body.querySelector('#ngb-live')));
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
class Live {
    /**
     * @param {?} _document
     * @param {?} _delay
     */
    constructor(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    say(message) {
        /** @type {?} */
        const element = getLiveElement(this._document, true);
        /** @type {?} */
        const delay = this._delay;
        element.textContent = '';
        /** @type {?} */
        const setText = (/**
         * @return {?}
         */
        () => element.textContent = message);
        if (delay === null) {
            setText();
        }
        else {
            setTimeout(setText, delay);
        }
    }
}
Live.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
Live.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
];
/** @nocollapse */ Live.ngInjectableDef = ɵɵdefineInjectable({ factory: function Live_Factory() { return new Live(ɵɵinject(DOCUMENT), ɵɵinject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
class NgbTypeaheadConfig {
    constructor() {
        this.editable = true;
        this.focusFirst = true;
        this.showHint = false;
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
    }
}
NgbTypeaheadConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTypeaheadConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgbTypeaheadConfig_Factory() { return new NgbTypeaheadConfig(); }, token: NgbTypeaheadConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgbTypeahead)),
    multi: true
};
/** @type {?} */
let nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
class NgbTypeahead {
    /**
     * @param {?} _elementRef
     * @param {?} viewContainerRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} config
     * @param {?} ngZone
     * @param {?} _live
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _changeDetector
     * @param {?} applicationRef
     */
    constructor(_elementRef, viewContainerRef, _renderer, injector, componentFactoryResolver, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._closed$ = new Subject();
        /**
         * The value for the `autocomplete` attribute for the `<input>` element.
         *
         * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
         *
         * \@since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * The preferred placement of the typeahead.
         *
         * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
         * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
         * `"right-bottom"`
         *
         * Accepts an array of strings or a string with space separated possible values.
         *
         * The default order of preference is `"bottom-left bottom-right top-left top-right"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted right before an item is selected from the result list.
         *
         * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
         */
        this.selectItem = new EventEmitter();
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this._onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map((/**
         * @param {?} $event
         * @return {?}
         */
        $event => ((/** @type {?} */ ($event.target))).value)));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);
        this._zoneSubscription = ngZone.onStable.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.isPopupOpen()) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const inputValues$ = this._valueChanges.pipe(tap((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this._inputValueBackup = this.showHint ? value : null;
            this._onChange(this.editable ? value : undefined);
        })));
        /** @type {?} */
        const results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        const userInput$ = this._resubscribeTypeahead.pipe(switchMap((/**
         * @return {?}
         */
        () => results$)));
        this._subscription = this._subscribeToUserInput(userInput$);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    isPopupOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab:
                /** @type {?} */
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe((/**
             * @param {?} result
             * @return {?}
             */
            (result) => this._selectResultClosePopup(result)));
            this._windowRef.instance.activeChangeEvent.subscribe((/**
             * @param {?} activeId
             * @return {?}
             */
            (activeId) => this.activeDescendant = activeId));
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            ngbAutoClose(this._ngZone, this._document, 'outside', (/**
             * @return {?}
             */
            () => this.dismissPopup()), this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _closePopup() {
        this._closed$.next();
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    _selectResult(result) {
        /** @type {?} */
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: (/**
             * @return {?}
             */
            () => { defaultPrevented = true; }) });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    /**
     * @private
     * @param {?} result
     * @return {?}
     */
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    /**
     * @private
     * @return {?}
     */
    _showHint() {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    /**
     * @private
     * @param {?} userInput$
     * @return {?}
     */
    _subscribeToUserInput(userInput$) {
        return userInput$.subscribe((/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();
                this._showHint();
            }
            // live announcer
            /** @type {?} */
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
NgbTypeahead.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngbTypeahead]',
                exportAs: 'ngbTypeahead',
                host: {
                    '(blur)': 'handleBlur()',
                    '[class.open]': 'isPopupOpen()',
                    '(keydown)': 'handleKeyDown($event)',
                    '[autocomplete]': 'autocomplete',
                    'autocapitalize': 'off',
                    'autocorrect': 'off',
                    'role': 'combobox',
                    'aria-multiline': 'false',
                    '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                    '[attr.aria-activedescendant]': 'activeDescendant',
                    '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                    '[attr.aria-expanded]': 'isPopupOpen()'
                },
                providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
NgbTypeahead.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: NgbTypeaheadConfig },
    { type: NgZone },
    { type: Live },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ApplicationRef }
];
NgbTypeahead.propDecorators = {
    autocomplete: [{ type: Input }],
    container: [{ type: Input }],
    editable: [{ type: Input }],
    focusFirst: [{ type: Input }],
    inputFormatter: [{ type: Input }],
    ngbTypeahead: [{ type: Input }],
    resultFormatter: [{ type: Input }],
    resultTemplate: [{ type: Input }],
    showHint: [{ type: Input }],
    placement: [{ type: Input }],
    selectItem: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgbTypeaheadModule {
}
NgbTypeaheadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                exports: [NgbTypeahead, NgbHighlight],
                imports: [CommonModule],
                entryComponents: [NgbTypeaheadWindow]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_MODULES = [
    NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
    NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule,
    NgbRatingModule, NgbTabsetModule, NgbTimepickerModule, NgbToastModule, NgbTooltipModule, NgbTypeaheadModule
];
class NgbModule {
}
NgbModule.decorators = [
    { type: NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] }
];

export { ModalDismissReasons, NgbAccordion, NgbAccordionConfig, NgbAccordionModule, NgbActiveModal, NgbAlert, NgbAlertConfig, NgbAlertModule, NgbButtonLabel, NgbButtonsModule, NgbCalendar, NgbCalendarGregorian, NgbCalendarHebrew, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarPersian, NgbCarousel, NgbCarouselConfig, NgbCarouselModule, NgbCheckBox, NgbCollapse, NgbCollapseModule, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerContent, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDatepickerKeyboardService, NgbDatepickerModule, NgbDatepickerMonth, NgbDropdown, NgbDropdownAnchor, NgbDropdownConfig, NgbDropdownItem, NgbDropdownMenu, NgbDropdownModule, NgbDropdownToggle, NgbHighlight, NgbInputDatepicker, NgbInputDatepickerConfig, NgbModal, NgbModalConfig, NgbModalModule, NgbModalRef, NgbModule, NgbNav, NgbNavConfig, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavModule, NgbNavOutlet, NgbNavbar, NgbPagination, NgbPaginationConfig, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationModule, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious, NgbPanel, NgbPanelContent, NgbPanelHeader, NgbPanelTitle, NgbPanelToggle, NgbPopover, NgbPopoverConfig, NgbPopoverModule, NgbProgressbar, NgbProgressbarConfig, NgbProgressbarModule, NgbRadio, NgbRadioGroup, NgbRating, NgbRatingConfig, NgbRatingModule, NgbSlide, NgbSlideEventDirection, NgbSlideEventSource, NgbTab, NgbTabContent, NgbTabTitle, NgbTabset, NgbTabsetConfig, NgbTabsetModule, NgbTimeAdapter, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerI18n, NgbTimepickerModule, NgbToast, NgbToastConfig, NgbToastHeader, NgbToastModule, NgbTooltip, NgbTooltipConfig, NgbTooltipModule, NgbTypeahead, NgbTypeaheadConfig, NgbTypeaheadModule, NGB_CAROUSEL_DIRECTIVES as ɵa, NGB_DATEPICKER_VALUE_ACCESSOR as ɵb, Live as ɵba, NgbCalendarHijri as ɵbb, ContentRef as ɵbc, NGB_DATEPICKER_CALENDAR_FACTORY as ɵc, NgbDatepickerDayView as ɵd, NgbDatepickerNavigation as ɵe, NgbDatepickerNavigationSelect as ɵf, NGB_DATEPICKER_18N_FACTORY as ɵg, NgbDatepickerI18nDefault as ɵh, NGB_DATEPICKER_DATE_ADAPTER_FACTORY as ɵi, NgbDateStructAdapter as ɵj, NGB_DATEPICKER_PARSER_FORMATTER_FACTORY as ɵk, NgbDateISOParserFormatter as ɵl, NgbPopoverWindow as ɵm, NGB_DATEPICKER_TIME_ADAPTER_FACTORY as ɵn, NgbTimeStructAdapter as ɵo, NGB_TIMEPICKER_I18N_FACTORY as ɵp, NgbTimepickerI18nDefault as ɵq, NgbTooltipWindow as ɵr, NgbTypeaheadWindow as ɵs, NgbDatepickerService as ɵt, NgbModalBackdrop as ɵu, NgbModalWindow as ɵv, NgbModalStack as ɵw, ScrollBar as ɵx, ARIA_LIVE_DELAY as ɵy, ARIA_LIVE_DELAY_FACTORY as ɵz };
//# sourceMappingURL=ng-bootstrap.js.map
