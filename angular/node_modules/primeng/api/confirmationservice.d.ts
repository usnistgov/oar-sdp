import { Confirmation } from './confirmation';
import * as i0 from "@angular/core";
export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: import("rxjs").Observable<Confirmation>;
    accept: import("rxjs").Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    close(): this;
    onAccept(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmationService>;
}
