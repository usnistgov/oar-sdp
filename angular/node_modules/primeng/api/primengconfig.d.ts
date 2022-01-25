import { Translation } from './translation';
import * as i0 from "@angular/core";
export declare class PrimeNGConfig {
    ripple: boolean;
    filterMatchModeOptions: {
        text: string[];
        numeric: string[];
        date: string[];
    };
    private translation;
    zIndex: {
        modal: number;
        overlay: number;
        menu: number;
        tooltip: number;
    };
    private translationSource;
    translationObserver: import("rxjs").Observable<any>;
    getTranslation(key: string): any;
    setTranslation(value: Translation): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeNGConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PrimeNGConfig>;
}
