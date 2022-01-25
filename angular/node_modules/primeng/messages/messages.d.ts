import { OnDestroy, EventEmitter, AfterContentInit, ElementRef, QueryList, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
export declare class Messages implements AfterContentInit, OnDestroy {
    messageService: MessageService;
    el: ElementRef;
    cd: ChangeDetectorRef;
    value: Message[];
    closable: boolean;
    style: any;
    styleClass: string;
    enableService: boolean;
    key: string;
    escape: boolean;
    severity: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    templates: QueryList<any>;
    valueChange: EventEmitter<Message[]>;
    messageSubscription: Subscription;
    clearSubscription: Subscription;
    contentTemplate: TemplateRef<any>;
    constructor(messageService: MessageService, el: ElementRef, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    hasMessages(): boolean;
    clear(): void;
    removeMessage(i: number): void;
    get icon(): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Messages, [{ optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Messages, "p-messages", never, { "value": "value"; "closable": "closable"; "style": "style"; "styleClass": "styleClass"; "enableService": "enableService"; "key": "key"; "escape": "escape"; "severity": "severity"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; }, { "valueChange": "valueChange"; }, ["templates"], never>;
}
export declare class MessagesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MessagesModule, [typeof Messages], [typeof i1.CommonModule, typeof i2.RippleModule], [typeof Messages]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MessagesModule>;
}
