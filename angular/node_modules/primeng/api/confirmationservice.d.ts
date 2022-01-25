import { Confirmation } from './confirmation';
import * as ɵngcc0 from '@angular/core';
export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: import("rxjs").Observable<Confirmation>;
    accept: import("rxjs").Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    close(): this;
    onAccept(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ConfirmationService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ConfirmationService>;
}

//# sourceMappingURL=confirmationservice.d.ts.map