import { OnInit, AfterViewInit, AfterContentInit, OnDestroy, ElementRef, EventEmitter, QueryList, TemplateRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
import * as ɵngcc3 from 'primeng/api';
export declare class ToastItem implements AfterViewInit, OnDestroy {
    private zone;
    message: Message;
    index: number;
    template: TemplateRef<any>;
    showTransformOptions: string;
    hideTransformOptions: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    timeout: any;
    constructor(zone: NgZone);
    ngAfterViewInit(): void;
    initTimeout(): void;
    clearTimeout(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onCloseIconClick(event: any): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ToastItem, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ToastItem, "p-toastItem", never, { "message": "message"; "index": "index"; "template": "template"; "showTransformOptions": "showTransformOptions"; "hideTransformOptions": "hideTransformOptions"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; }, { "onClose": "onClose"; }, never, never>;
}
export declare class Toast implements OnInit, AfterContentInit, OnDestroy {
    messageService: MessageService;
    private cd;
    key: string;
    autoZIndex: boolean;
    baseZIndex: number;
    style: any;
    styleClass: string;
    position: string;
    preventOpenDuplicates: boolean;
    preventDuplicates: boolean;
    showTransformOptions: string;
    hideTransformOptions: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    templates: QueryList<any>;
    messageSubscription: Subscription;
    clearSubscription: Subscription;
    messages: Message[];
    messagesArchieve: Message[];
    template: TemplateRef<any>;
    constructor(messageService: MessageService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    add(messages: Message[]): void;
    canAdd(message: Message): boolean;
    containsMessage(collection: Message[], message: Message): boolean;
    ngAfterContentInit(): void;
    onMessageClose(event: any): void;
    onAnimationStart(event: AnimationEvent): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Toast, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Toast, "p-toast", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "position": "position"; "preventOpenDuplicates": "preventOpenDuplicates"; "preventDuplicates": "preventDuplicates"; "showTransformOptions": "showTransformOptions"; "hideTransformOptions": "hideTransformOptions"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "key": "key"; "style": "style"; "styleClass": "styleClass"; }, { "onClose": "onClose"; }, ["templates"], never>;
}
export declare class ToastModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ToastModule, [typeof Toast, typeof ToastItem], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RippleModule], [typeof Toast, typeof ɵngcc3.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ToastModule>;
}

//# sourceMappingURL=toast.d.ts.map