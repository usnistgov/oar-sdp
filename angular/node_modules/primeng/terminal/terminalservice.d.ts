import * as i0 from "@angular/core";
export declare class TerminalService {
    private commandSource;
    private responseSource;
    commandHandler: import("rxjs").Observable<string>;
    responseHandler: import("rxjs").Observable<string>;
    sendCommand(command: string): void;
    sendResponse(response: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TerminalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TerminalService>;
}
