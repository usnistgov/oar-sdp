import { Directive, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
class CodeHighlighter {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.el.nativeElement);
        }
    }
}
CodeHighlighter.ɵfac = function CodeHighlighter_Factory(t) { return new (t || CodeHighlighter)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
CodeHighlighter.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: CodeHighlighter, selectors: [["", "pCode", ""]] });
CodeHighlighter.ctorParameters = () => [
    { type: ElementRef }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CodeHighlighter, [{
        type: Directive,
        args: [{
                selector: '[pCode]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, null); })();
class CodeHighlighterModule {
}
CodeHighlighterModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: CodeHighlighterModule });
CodeHighlighterModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function CodeHighlighterModule_Factory(t) { return new (t || CodeHighlighterModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(CodeHighlighterModule, { declarations: function () { return [CodeHighlighter]; }, imports: function () { return [CommonModule]; }, exports: function () { return [CodeHighlighter]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CodeHighlighterModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [CodeHighlighter],
                declarations: [CodeHighlighter]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { CodeHighlighter, CodeHighlighterModule };

//# sourceMappingURL=primeng-codehighlighter.js.map