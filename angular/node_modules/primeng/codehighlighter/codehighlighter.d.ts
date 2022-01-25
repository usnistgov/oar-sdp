import { ElementRef, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class CodeHighlighter implements AfterViewInit {
    el: ElementRef;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeHighlighter, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CodeHighlighter, "[pCode]", never, {}, {}, never>;
}
export declare class CodeHighlighterModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeHighlighterModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CodeHighlighterModule, [typeof CodeHighlighter], [typeof i1.CommonModule], [typeof CodeHighlighter]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CodeHighlighterModule>;
}
