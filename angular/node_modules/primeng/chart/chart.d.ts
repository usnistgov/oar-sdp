import { ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<UIChart, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UIChart, "p-chart", never, { "type": "type"; "plugins": "plugins"; "width": "width"; "height": "height"; "responsive": "responsive"; "data": "data"; "options": "options"; }, { "onDataSelect": "onDataSelect"; }, never, never>;
}
export declare class ChartModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ChartModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ChartModule, [typeof UIChart], [typeof i1.CommonModule], [typeof UIChart]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ChartModule>;
}
