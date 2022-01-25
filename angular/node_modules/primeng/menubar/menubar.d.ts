import { ElementRef, Renderer2, OnDestroy, ChangeDetectorRef, AfterContentInit, QueryList, TemplateRef, EventEmitter } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
export declare class MenubarSub implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    item: MenuItem;
    root: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    mobileActive: boolean;
    autoDisplay: boolean;
    get parentActive(): boolean;
    set parentActive(value: boolean);
    leafClick: EventEmitter<any>;
    _parentActive: boolean;
    documentClickListener: any;
    menuHoverActive: boolean;
    activeItem: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    onItemClick(event: any, item: any): void;
    onItemMouseEnter(event: any, item: any): void;
    onLeafClick(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenubarSub, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenubarSub, "p-menubarSub", never, { "item": "item"; "root": "root"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "mobileActive": "mobileActive"; "autoDisplay": "autoDisplay"; "parentActive": "parentActive"; }, { "leafClick": "leafClick"; }, never, never>;
}
export declare class Menubar implements AfterContentInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    config: PrimeNGConfig;
    model: MenuItem[];
    style: any;
    styleClass: string;
    autoZIndex: boolean;
    baseZIndex: number;
    autoDisplay: boolean;
    templates: QueryList<any>;
    menubutton: ElementRef;
    rootmenu: MenubarSub;
    startTemplate: TemplateRef<any>;
    endTemplate: TemplateRef<any>;
    mobileActive: boolean;
    outsideClickListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, config: PrimeNGConfig);
    ngAfterContentInit(): void;
    toggle(event: any): void;
    bindOutsideClickListener(): void;
    hide(): void;
    onLeafClick(): void;
    unbindOutsideClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Menubar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Menubar, "p-menubar", never, { "model": "model"; "style": "style"; "styleClass": "styleClass"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "autoDisplay": "autoDisplay"; }, {}, ["templates"], ["*"]>;
}
export declare class MenubarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MenubarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MenubarModule, [typeof Menubar, typeof MenubarSub], [typeof i1.CommonModule, typeof i2.RouterModule, typeof i3.RippleModule, typeof i4.TooltipModule], [typeof Menubar, typeof i2.RouterModule, typeof i4.TooltipModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MenubarModule>;
}
