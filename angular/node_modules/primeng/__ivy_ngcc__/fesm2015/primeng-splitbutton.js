import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/button';
import * as ɵngcc3 from 'primeng/menu';

const _c0 = ["container"];
const _c1 = ["defaultbtn"];
const _c2 = ["menu"];
class SplitButton {
    constructor() {
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
    }
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
    }
    onDropdownButtonClick(event) {
        this.onDropdownClick.emit(event);
        this.menu.toggle({ currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null });
    }
}
SplitButton.ɵfac = function SplitButton_Factory(t) { return new (t || SplitButton)(); };
SplitButton.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: SplitButton, selectors: [["p-splitButton"]], viewQuery: function SplitButton_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
        ɵngcc0.ɵɵviewQuery(_c1, true);
        ɵngcc0.ɵɵviewQuery(_c2, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.buttonViewChild = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.menu = _t.first);
    } }, inputs: { iconPos: "iconPos", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", model: "model", icon: "icon", label: "label", style: "style", styleClass: "styleClass", menuStyle: "menuStyle", menuStyleClass: "menuStyleClass", disabled: "disabled", tabindex: "tabindex", appendTo: "appendTo", dir: "dir" }, outputs: { onClick: "onClick", onDropdownClick: "onDropdownClick" }, decls: 7, vars: 18, consts: [[3, "ngClass", "ngStyle"], ["container", ""], ["type", "button", "pButton", "", 1, "p-splitbutton-defaultbutton", 3, "icon", "iconPos", "label", "disabled", "click"], ["defaultbtn", ""], ["type", "button", "pButton", "", "icon", "pi pi-chevron-down", 1, "p-splitbutton-menubutton", 3, "disabled", "click"], [3, "popup", "model", "styleClass", "appendTo", "showTransitionOptions", "hideTransitionOptions"], ["menu", ""]], template: function SplitButton_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵelementStart(2, "button", 2, 3);
        ɵngcc0.ɵɵlistener("click", function SplitButton_Template_button_click_2_listener($event) { return ctx.onDefaultButtonClick($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "button", 4);
        ɵngcc0.ɵɵlistener("click", function SplitButton_Template_button_click_4_listener($event) { return ctx.onDropdownButtonClick($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(5, "p-menu", 5, 6);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-splitbutton p-component")("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("icon", ctx.icon)("iconPos", ctx.iconPos)("label", ctx.label)("disabled", ctx.disabled);
        ɵngcc0.ɵɵattribute("tabindex", ctx.tabindex);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleMap(ctx.menuStyle);
        ɵngcc0.ɵɵproperty("popup", true)("model", ctx.model)("styleClass", ctx.menuStyleClass)("appendTo", ctx.appendTo)("showTransitionOptions", ctx.showTransitionOptions)("hideTransitionOptions", ctx.hideTransitionOptions);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc2.ButtonDirective, ɵngcc3.Menu], styles: [".p-splitbutton{display:-ms-inline-flexbox;display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton{-ms-flex:1 1 auto;border-bottom-right-radius:0;border-right:0;border-top-right-radius:0;flex:1 1 auto}.p-splitbutton-menubutton{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;border-bottom-left-radius:0;border-top-left-radius:0;display:-ms-flexbox;display:flex;justify-content:center}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:-ms-flexbox;display:flex}"], encapsulation: 2, changeDetection: 0 });
SplitButton.propDecorators = {
    model: [{ type: Input }],
    icon: [{ type: Input }],
    iconPos: [{ type: Input }],
    label: [{ type: Input }],
    onClick: [{ type: Output }],
    onDropdownClick: [{ type: Output }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    menuStyle: [{ type: Input }],
    menuStyleClass: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    appendTo: [{ type: Input }],
    dir: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    buttonViewChild: [{ type: ViewChild, args: ['defaultbtn',] }],
    menu: [{ type: ViewChild, args: ['menu',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SplitButton, [{
        type: Component,
        args: [{
                selector: 'p-splitButton',
                template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            <button type="button" pButton class="p-splitbutton-menubutton" icon="pi pi-chevron-down" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <p-menu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-menu>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-splitbutton{display:-ms-inline-flexbox;display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton{-ms-flex:1 1 auto;border-bottom-right-radius:0;border-right:0;border-top-right-radius:0;flex:1 1 auto}.p-splitbutton-menubutton{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;border-bottom-left-radius:0;border-top-left-radius:0;display:-ms-flexbox;display:flex;justify-content:center}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:-ms-flexbox;display:flex}"]
            }]
    }], function () { return []; }, { iconPos: [{
            type: Input
        }], onClick: [{
            type: Output
        }], onDropdownClick: [{
            type: Output
        }], showTransitionOptions: [{
            type: Input
        }], hideTransitionOptions: [{
            type: Input
        }], model: [{
            type: Input
        }], icon: [{
            type: Input
        }], label: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], menuStyle: [{
            type: Input
        }], menuStyleClass: [{
            type: Input
        }], disabled: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], appendTo: [{
            type: Input
        }], dir: [{
            type: Input
        }], containerViewChild: [{
            type: ViewChild,
            args: ['container']
        }], buttonViewChild: [{
            type: ViewChild,
            args: ['defaultbtn']
        }], menu: [{
            type: ViewChild,
            args: ['menu']
        }] }); })();
class SplitButtonModule {
}
SplitButtonModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SplitButtonModule });
SplitButtonModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SplitButtonModule_Factory(t) { return new (t || SplitButtonModule)(); }, imports: [[CommonModule, ButtonModule, MenuModule], ButtonModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SplitButtonModule, { declarations: function () { return [SplitButton]; }, imports: function () { return [CommonModule, ButtonModule, MenuModule]; }, exports: function () { return [SplitButton, ButtonModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SplitButtonModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, ButtonModule, MenuModule],
                exports: [SplitButton, ButtonModule],
                declarations: [SplitButton]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { SplitButton, SplitButtonModule };

//# sourceMappingURL=primeng-splitbutton.js.map