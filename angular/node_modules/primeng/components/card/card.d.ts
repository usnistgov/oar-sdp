import { ElementRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class Card implements BlockableUI {
    private el;
    title: string;
    subtitle: string;
    style: any;
    styleClass: string;
    headerFacet: any;
    footerFacet: any;
    constructor(el: ElementRef);
    getBlockableElement(): HTMLElement;
}
export declare class CardModule {
}
