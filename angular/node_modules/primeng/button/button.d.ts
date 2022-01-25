import { ElementRef, EventEmitter, AfterViewInit, OnDestroy, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
export declare class ButtonDirective implements AfterViewInit, OnDestroy {
    el: ElementRef;
    iconPos: 'left' | 'right' | 'top' | 'bottom';
    loadingIcon: string;
    _label: string;
    _icon: string;
    _loading: boolean;
    initialized: boolean;
    _initialStyleClass: string;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    getStyleClass(): string;
    setStyleClass(): void;
    createIconEl(): void;
    getIconClass(): string;
    setIconClass(): void;
    removeIconElement(): void;
    get label(): string;
    set label(val: string);
    get icon(): string;
    set icon(val: string);
    get loading(): boolean;
    set loading(val: boolean);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonDirective, "[pButton]", never, { "iconPos": "iconPos"; "loadingIcon": "loadingIcon"; "label": "label"; "icon": "icon"; "loading": "loading"; }, {}, never>;
}
export declare class Button implements AfterContentInit {
    type: string;
    iconPos: string;
    icon: string;
    badge: string;
    label: string;
    disabled: boolean;
    loading: boolean;
    loadingIcon: string;
    style: any;
    styleClass: string;
    badgeClass: string;
    contentTemplate: TemplateRef<any>;
    templates: QueryList<any>;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    ngAfterContentInit(): void;
    badgeStyleClass(): {
        'p-badge p-component': boolean;
        'p-badge-no-gutter': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<Button, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Button, "p-button", never, { "type": "type"; "iconPos": "iconPos"; "icon": "icon"; "badge": "badge"; "label": "label"; "disabled": "disabled"; "loading": "loading"; "loadingIcon": "loadingIcon"; "style": "style"; "styleClass": "styleClass"; "badgeClass": "badgeClass"; }, { "onClick": "onClick"; "onFocus": "onFocus"; "onBlur": "onBlur"; }, ["templates"], ["*"]>;
}
export declare class ButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ButtonModule, [typeof ButtonDirective, typeof Button], [typeof i1.CommonModule, typeof i2.RippleModule], [typeof ButtonDirective, typeof Button]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ButtonModule>;
}
