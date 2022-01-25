import { ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class UIChart implements AfterViewInit, OnDestroy {
    el: ElementRef;
    type: string;
    plugins: any[];
    width: string;
    height: string;
    responsive: boolean;
    onDataSelect: EventEmitter<any>;
    initialized: boolean;
    _data: any;
    _options: any;
    chart: any;
    constructor(el: ElementRef);
    get data(): any;
    set data(val: any);
    get options(): any;
    set options(val: any);
    ngAfterViewInit(): void;
    onCanvasClick(event: any): void;
    initChart(): void;
    getCanvas(): any;
    getBase64Image(): any;
    generateLegend(): any;
    refresh(): void;
    reinit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<UIChart, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<UIChart, "p-chart", never, { "plugins": "plugins"; "responsive": "responsive"; "data": "data"; "options": "options"; "type": "type"; "width": "width"; "height": "height"; }, { "onDataSelect": "onDataSelect"; }, never, never>;
}
export declare class ChartModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ChartModule, [typeof UIChart], [typeof ɵngcc1.CommonModule], [typeof UIChart]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ChartModule>;
}

//# sourceMappingURL=chart.d.ts.map