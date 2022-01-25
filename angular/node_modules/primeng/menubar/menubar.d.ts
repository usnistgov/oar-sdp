import { ElementRef, Renderer2, OnDestroy, ChangeDetectorRef, AfterContentInit, QueryList, TemplateRef, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from 'primeng/ripple';
export declare class MenubarSub implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    item: MenuItem;
    root: boolean;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    mobileActive: boolean;
    get parentActive(): boolean;
    set parentActive(value: boolean);
    leafClick: EventEmitter<any>;
    _parentActive: boolean;
    documentClickListener: any;
    menuHoverActive: boolean;
    activeItem: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    onItemMouseEnter(event: any, item: any): void;
    onItemClick(event: any, item: any): void;
    onLeafClick(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MenubarSub, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MenubarSub, "p-menubarSub", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "parentActive": "parentActive"; "item": "item"; "root": "root"; "autoDisplay": "autoDisplay"; "mobileActive": "mobileActive"; }, { "leafClick": "leafClick"; }, never, never>;
}
export declare class Menubar implements AfterContentInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    model: MenuItem[];
    style: any;
    styleClass: string;
    autoZIndex: boolean;
    baseZIndex: number;
    templates: QueryList<any>;
    private _autoDisplay;
    get autoDisplay(): boolean;
    set autoDisplay(_autoDisplay: boolean);
    menubutton: ElementRef;
    rootmenu: MenubarSub;
    startTemplate: TemplateRef<any>;
    endTemplate: TemplateRef<any>;
    mobileActive: boolean;
    outsideClickListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    toggle(event: any): void;
    bindOutsideClickListener(): void;
    onLeafClick(): void;
    unbindOutsideClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Menubar, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Menubar, "p-menubar", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "autoDisplay": "autoDisplay"; "model": "model"; "style": "style"; "styleClass": "styleClass"; }, {}, ["templates"], ["*"]>;
}
export declare class MenubarModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MenubarModule, [typeof Menubar, typeof MenubarSub], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule, typeof ɵngcc3.RippleModule], [typeof Menubar, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MenubarModule>;
}

//# sourceMappingURL=menubar.d.ts.map