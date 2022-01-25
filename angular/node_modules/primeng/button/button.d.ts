import { ElementRef, EventEmitter, AfterViewInit, OnDestroy, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
export declare class ButtonDirective implements AfterViewInit, OnDestroy {
    el: ElementRef;
    iconPos: 'left' | 'right' | 'top' | 'bottom';
    _label: string;
    _icon: string;
    initialized: boolean;
    _initialStyleClass: string;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    getStyleClass(): string;
    setStyleClass(): void;
    get label(): string;
    set label(val: string);
    get icon(): string;
    set icon(val: string);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ButtonDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<ButtonDirective, "[pButton]", never, { "iconPos": "iconPos"; "label": "label"; "icon": "icon"; }, {}, never>;
}
export declare class Button implements AfterContentInit {
    type: string;
    iconPos: string;
    icon: string;
    badge: string;
    label: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    badgeClass: string;
    contentTemplate: TemplateRef<any>;
    templates: QueryList<any>;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Button, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Button, "p-button", never, { "type": "type"; "iconPos": "iconPos"; "icon": "icon"; "badge": "badge"; "label": "label"; "disabled": "disabled"; "style": "style"; "styleClass": "styleClass"; "badgeClass": "badgeClass"; }, { "onClick": "onClick"; "onFocus": "onFocus"; "onBlur": "onBlur"; }, ["templates"], ["*"]>;
}
export declare class ButtonModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ButtonModule, [typeof ButtonDirective, typeof Button], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RippleModule], [typeof ButtonDirective, typeof Button]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ButtonModule>;
}

//# sourceMappingURL=button.d.ts.map