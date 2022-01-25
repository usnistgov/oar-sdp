import { AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TerminalService } from './terminalservice';
import { Subscription } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/forms';
export declare class Terminal implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    terminalService: TerminalService;
    cd: ChangeDetectorRef;
    welcomeMessage: string;
    prompt: string;
    style: any;
    styleClass: string;
    commands: any[];
    command: string;
    container: Element;
    commandProcessed: boolean;
    subscription: Subscription;
    constructor(el: ElementRef, terminalService: TerminalService, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    set response(value: string);
    handleCommand(event: KeyboardEvent): void;
    focus(element: HTMLElement): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Terminal, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Terminal, "p-terminal", never, { "response": "response"; "welcomeMessage": "welcomeMessage"; "prompt": "prompt"; "style": "style"; "styleClass": "styleClass"; }, {}, never, never>;
}
export declare class TerminalModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<TerminalModule, [typeof Terminal], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.FormsModule], [typeof Terminal]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<TerminalModule>;
}

//# sourceMappingURL=terminal.d.ts.map