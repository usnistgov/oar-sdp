import * as ɵngcc0 from '@angular/core';
export declare class TerminalService {
    private commandSource;
    private responseSource;
    commandHandler: import("rxjs").Observable<string>;
    responseHandler: import("rxjs").Observable<string>;
    sendCommand(command: string): void;
    sendResponse(response: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TerminalService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<TerminalService>;
}

//# sourceMappingURL=terminalservice.d.ts.map