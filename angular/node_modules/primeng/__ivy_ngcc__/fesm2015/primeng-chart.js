import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js';

import * as ɵngcc0 from '@angular/core';
class UIChart {
    constructor(el) {
        this.el = el;
        this.plugins = [];
        this.responsive = true;
        this.onDataSelect = new EventEmitter();
        this._options = {};
    }
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
        this.reinit();
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.reinit();
    }
    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }
    onCanvasClick(event) {
        if (this.chart) {
            let element = this.chart.getElementAtEvent(event);
            let dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }
    initChart() {
        let opts = this.options || {};
        opts.responsive = this.responsive;
        // allows chart to resize in responsive mode
        if (opts.responsive && (this.height || this.width)) {
            opts.maintainAspectRatio = false;
        }
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options,
            plugins: this.plugins
        });
    }
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
    getBase64Image() {
        return this.chart.toBase64Image();
    }
    generateLegend() {
        if (this.chart) {
            return this.chart.generateLegend();
        }
    }
    refresh() {
        if (this.chart) {
            this.chart.update();
        }
    }
    reinit() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}
UIChart.ɵfac = function UIChart_Factory(t) { return new (t || UIChart)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
UIChart.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: UIChart, selectors: [["p-chart"]], inputs: { plugins: "plugins", responsive: "responsive", data: "data", options: "options", type: "type", width: "width", height: "height" }, outputs: { onDataSelect: "onDataSelect" }, decls: 2, vars: 6, consts: [[2, "position", "relative"], [3, "click"]], template: function UIChart_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "canvas", 1);
        ɵngcc0.ɵɵlistener("click", function UIChart_Template_canvas_click_1_listener($event) { return ctx.onCanvasClick($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("width", ctx.responsive && !ctx.width ? null : ctx.width)("height", ctx.responsive && !ctx.height ? null : ctx.height);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵattribute("width", ctx.responsive && !ctx.width ? null : ctx.width)("height", ctx.responsive && !ctx.height ? null : ctx.height);
    } }, encapsulation: 2, changeDetection: 0 });
UIChart.ctorParameters = () => [
    { type: ElementRef }
];
UIChart.propDecorators = {
    type: [{ type: Input }],
    plugins: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    responsive: [{ type: Input }],
    onDataSelect: [{ type: Output }],
    data: [{ type: Input }],
    options: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(UIChart, [{
        type: Component,
        args: [{
                selector: 'p-chart',
                template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <canvas [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { plugins: [{
            type: Input
        }], responsive: [{
            type: Input
        }], onDataSelect: [{
            type: Output
        }], data: [{
            type: Input
        }], options: [{
            type: Input
        }], type: [{
            type: Input
        }], width: [{
            type: Input
        }], height: [{
            type: Input
        }] }); })();
class ChartModule {
}
ChartModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ChartModule });
ChartModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ChartModule_Factory(t) { return new (t || ChartModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ChartModule, { declarations: function () { return [UIChart]; }, imports: function () { return [CommonModule]; }, exports: function () { return [UIChart]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ChartModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [UIChart],
                declarations: [UIChart]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { ChartModule, UIChart };

//# sourceMappingURL=primeng-chart.js.map