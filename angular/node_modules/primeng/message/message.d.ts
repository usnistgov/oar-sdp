import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class UIMessage {
    severity: string;
    text: string;
    escape: boolean;
    style: any;
    styleClass: string;
    get icon(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<UIMessage, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<UIMessage, "p-message", never, { "escape": "escape"; "severity": "severity"; "text": "text"; "style": "style"; "styleClass": "styleClass"; }, {}, never, never>;
}
export declare class MessageModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MessageModule, [typeof UIMessage], [typeof ɵngcc1.CommonModule], [typeof UIMessage]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MessageModule>;
}

//# sourceMappingURL=message.d.ts.map