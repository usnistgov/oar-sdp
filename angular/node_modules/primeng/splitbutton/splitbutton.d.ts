import { ElementRef, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/button';
import * as ɵngcc3 from 'primeng/menu';
export declare class SplitButton {
    model: MenuItem[];
    icon: string;
    iconPos: string;
    label: string;
    onClick: EventEmitter<any>;
    onDropdownClick: EventEmitter<any>;
    style: any;
    styleClass: string;
    menuStyle: any;
    menuStyleClass: string;
    disabled: boolean;
    tabindex: number;
    appendTo: any;
    dir: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    containerViewChild: ElementRef;
    buttonViewChild: ElementRef;
    menu: Menu;
    onDefaultButtonClick(event: Event): void;
    onDropdownButtonClick(event: Event): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SplitButton, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SplitButton, "p-splitButton", never, { "iconPos": "iconPos"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "model": "model"; "icon": "icon"; "label": "label"; "style": "style"; "styleClass": "styleClass"; "menuStyle": "menuStyle"; "menuStyleClass": "menuStyleClass"; "disabled": "disabled"; "tabindex": "tabindex"; "appendTo": "appendTo"; "dir": "dir"; }, { "onClick": "onClick"; "onDropdownClick": "onDropdownClick"; }, never, never>;
}
export declare class SplitButtonModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<SplitButtonModule, [typeof SplitButton], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.ButtonModule, typeof ɵngcc3.MenuModule], [typeof SplitButton, typeof ɵngcc2.ButtonModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<SplitButtonModule>;
}

//# sourceMappingURL=splitbutton.d.ts.map