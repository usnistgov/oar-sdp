import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class UIMessage {
    severity: string;
    text: string;
    escape: boolean;
    style: any;
    styleClass: string;
    get icon(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UIMessage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UIMessage, "p-message", never, { "severity": "severity"; "text": "text"; "escape": "escape"; "style": "style"; "styleClass": "styleClass"; }, {}, never, never>;
}
export declare class MessageModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MessageModule, [typeof UIMessage], [typeof i1.CommonModule], [typeof UIMessage]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MessageModule>;
}
