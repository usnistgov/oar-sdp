import { Translation } from './translation';
import * as ɵngcc0 from '@angular/core';
export declare class PrimeNGConfig {
    ripple: boolean;
    filterMatchModeOptions: {
        text: string[];
        numeric: string[];
        date: string[];
    };
    private translation;
    private translationSource;
    translationObserver: import("rxjs").Observable<any>;
    getTranslation(key: string): any;
    setTranslation(value: Translation): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PrimeNGConfig, never>;
}

//# sourceMappingURL=primengconfig.d.ts.map