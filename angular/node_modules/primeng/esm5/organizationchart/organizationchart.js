var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, ElementRef, Input, Output, AfterContentInit, EventEmitter, TemplateRef, Inject, forwardRef, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
var OrganizationChartNode = /** @class */ (function () {
    function OrganizationChartNode(chart) {
        this.chart = chart;
    }
    Object.defineProperty(OrganizationChartNode.prototype, "leaf", {
        get: function () {
            return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrganizationChartNode.prototype, "colspan", {
        get: function () {
            return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationChartNode.prototype.onNodeClick = function (event, node) {
        this.chart.onNodeClick(event, node);
    };
    OrganizationChartNode.prototype.toggleNode = function (event, node) {
        node.expanded = !node.expanded;
        if (node.expanded)
            this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node });
        else
            this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        event.preventDefault();
    };
    OrganizationChartNode.prototype.isSelected = function () {
        return this.chart.isSelected(this.node);
    };
    OrganizationChartNode.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return OrganizationChart; }),] }] }
    ]; };
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "node", void 0);
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "root", void 0);
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "first", void 0);
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "last", void 0);
    OrganizationChartNode = __decorate([
        Component({
            selector: '[pOrganizationChartNode]',
            template: "\n        <tr *ngIf=\"node\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-node-content ui-widget-content ui-corner-all {{node.styleClass}}\" \n                    [ngClass]=\"{'ui-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'ui-state-highlight':isSelected()}\"\n                    (click)=\"onNodeClick($event,node)\">\n                    <div *ngIf=\"!chart.getTemplateForNode(node)\">{{node.label}}</div>\n                    <div *ngIf=\"chart.getTemplateForNode(node)\">\n                        <ng-container *ngTemplateOutlet=\"chart.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                    </div>\n                    <a *ngIf=\"!leaf\" tabindex=\"0\" class=\"ui-node-toggler\" (click)=\"toggleNode($event, node)\" (keydown.enter)=\"toggleNode($event, node)\">\n                        <i class=\"ui-node-toggler-icon pi\" [ngClass]=\"{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}\"></i>\n                    </a>\n                </div>\n            </td>\n        </tr>\n        <tr [ngClass]=\"!leaf&&node.expanded ? 'ui-organizationchart-node-visible' : 'ui-organizationchart-node-hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-line-down\"></div>\n            </td>\n        </tr>\n        <tr [ngClass]=\"!leaf&&node.expanded ? 'ui-organizationchart-node-visible' : 'ui-organizationchart-node-hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <ng-container *ngIf=\"node.children && node.children.length === 1\">\n                <td [attr.colspan]=\"colspan\">\n                    <div class=\"ui-organizationchart-line-down\"></div>\n                </td>\n            </ng-container>\n            <ng-container *ngIf=\"node.children && node.children.length > 1\">\n                <ng-template ngFor let-child [ngForOf]=\"node.children\" let-first=\"first\" let-last=\"last\">\n                    <td class=\"ui-organizationchart-line-left\" [ngClass]=\"{'ui-organizationchart-line-top':!first}\">&nbsp;</td>\n                    <td class=\"ui-organizationchart-line-right\" [ngClass]=\"{'ui-organizationchart-line-top':!last}\">&nbsp;</td>\n                </ng-template>\n            </ng-container>\n        </tr>\n        <tr [ngClass]=\"!leaf&&node.expanded ? 'ui-organizationchart-node-visible' : 'ui-organizationchart-node-hidden'\" class=\"ui-organizationchart-nodes\" [@childState]=\"'in'\">\n            <td *ngFor=\"let child of node.children\" colspan=\"2\">\n                <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"child\"></table>\n            </td>\n        </tr>\n    ",
            animations: [
                trigger('childState', [
                    state('in', style({ opacity: 1 })),
                    transition('void => *', [
                        style({ opacity: 0 }),
                        animate(150)
                    ]),
                    transition('* => void', [
                        animate(150, style({ opacity: 0 }))
                    ])
                ])
            ]
        }),
        __param(0, Inject(forwardRef(function () { return OrganizationChart; })))
    ], OrganizationChartNode);
    return OrganizationChartNode;
}());
export { OrganizationChartNode };
var OrganizationChart = /** @class */ (function () {
    function OrganizationChart(el) {
        this.el = el;
        this.preserveSpace = true;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
    }
    Object.defineProperty(OrganizationChart.prototype, "root", {
        get: function () {
            return this.value && this.value.length ? this.value[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationChart.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach(function (item) {
            _this.templateMap[item.getType()] = item.template;
        });
    };
    OrganizationChart.prototype.getTemplateForNode = function (node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    };
    OrganizationChart.prototype.onNodeClick = function (event, node) {
        var eventTarget = event.target;
        if (eventTarget.className && (eventTarget.className.indexOf('ui-node-toggler') !== -1 || eventTarget.className.indexOf('ui-node-toggler-icon') !== -1)) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            var index_1 = this.findIndexInSelection(node);
            var selected = (index_1 >= 0);
            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = node;
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = __spread(this.selection || [], [node]);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            this.selectionChange.emit(this.selection);
        }
    };
    OrganizationChart.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = (this.selection == node) ? 0 : -1;
            }
            else if (this.selectionMode === 'multiple') {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    OrganizationChart.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    OrganizationChart.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], OrganizationChart.prototype, "value", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "style", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "selectionMode", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "selection", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "preserveSpace", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "selectionChange", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeSelect", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeUnselect", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeExpand", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeCollapse", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], OrganizationChart.prototype, "templates", void 0);
    OrganizationChart = __decorate([
        Component({
            selector: 'p-organizationChart',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'ui-organizationchart ui-widget': true, 'ui-organizationchart-preservespace': preserveSpace}\">\n            <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"root\" *ngIf=\"root\"></table>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], OrganizationChart);
    return OrganizationChart;
}());
export { OrganizationChart };
var OrganizationChartModule = /** @class */ (function () {
    function OrganizationChartModule() {
    }
    OrganizationChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [OrganizationChart, SharedModule],
            declarations: [OrganizationChart, OrganizationChartNode]
        })
    ], OrganizationChartModule);
    return OrganizationChartModule;
}());
export { OrganizationChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uY2hhcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL29yZ2FuaXphdGlvbmNoYXJ0LyIsInNvdXJjZXMiOlsib3JnYW5pemF0aW9uY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUNwRixNQUFNLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBeUQxQztJQVlJLCtCQUF5RCxLQUFLO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBMEIsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0JBQUksdUNBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFPO2FBQVg7WUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxD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QVIsS0FBSyxFQUFFO3dEQUFnQjtJQUVmO1FBQVIsS0FBSyxFQUFFOzREQUErQjtJQUU3QjtRQUFULE1BQU0sRUFBRTs4REFBeUQ7SUFFeEQ7UUFBVCxNQUFNLEVBQUU7MkRBQXNEO0lBRXJEO1FBQVQsTUFBTSxFQUFFOzZEQUF3RDtJQUV2RDtRQUFULE1BQU0sRUFBRTsyREFBc0Q7SUFFckQ7UUFBVCxNQUFNLEVBQUU7NkRBQXdEO0lBRWpDO1FBQS9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7d0RBQTJCO0lBeEJqRCxpQkFBaUI7UUFUN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsc1RBSVQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csaUJBQWlCLENBaUg3QjtJQUFELHdCQUFDO0NBQUEsQUFqSEQsSUFpSEM7U0FqSFksaUJBQWlCO0FBd0g5QjtJQUFBO0lBQXVDLENBQUM7SUFBM0IsdUJBQXVCO1FBTG5DLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQyxZQUFZLENBQUM7WUFDekMsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUMscUJBQXFCLENBQUM7U0FDMUQsQ0FBQztPQUNXLHVCQUF1QixDQUFJO0lBQUQsOEJBQUM7Q0FBQSxBQUF4QyxJQUF3QztTQUEzQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLElucHV0LE91dHB1dCxBZnRlckNvbnRlbnRJbml0LEV2ZW50RW1pdHRlcixUZW1wbGF0ZVJlZixcbiAgICAgICAgSW5qZWN0LGZvcndhcmRSZWYsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1twT3JnYW5pemF0aW9uQ2hhcnROb2RlXScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHRyICpuZ0lmPVwibm9kZVwiPlxuICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29sc3BhblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1vcmdhbml6YXRpb25jaGFydC1ub2RlLWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB7e25vZGUuc3R5bGVDbGFzc319XCIgXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktb3JnYW5pemF0aW9uY2hhcnQtc2VsZWN0YWJsZS1ub2RlJzogY2hhcnQuc2VsZWN0aW9uTW9kZSAmJiBub2RlLnNlbGVjdGFibGUgIT09IGZhbHNlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoKX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Ob2RlQ2xpY2soJGV2ZW50LG5vZGUpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhY2hhcnQuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+e3tub2RlLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImNoYXJ0LmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNoYXJ0LmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyRpbXBsaWNpdDogbm9kZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWxlYWZcIiB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInVpLW5vZGUtdG9nZ2xlclwiIChjbGljayk9XCJ0b2dnbGVOb2RlKCRldmVudCwgbm9kZSlcIiAoa2V5ZG93bi5lbnRlcik9XCJ0b2dnbGVOb2RlKCRldmVudCwgbm9kZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwidWktbm9kZS10b2dnbGVyLWljb24gcGlcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tZG93bic6IG5vZGUuZXhwYW5kZWQsICdwaS1jaGV2cm9uLXVwJzogIW5vZGUuZXhwYW5kZWR9XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgW25nQ2xhc3NdPVwiIWxlYWYmJm5vZGUuZXhwYW5kZWQgPyAndWktb3JnYW5pemF0aW9uY2hhcnQtbm9kZS12aXNpYmxlJyA6ICd1aS1vcmdhbml6YXRpb25jaGFydC1ub2RlLWhpZGRlbidcIiBjbGFzcz1cInVpLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmVzXCIgW0BjaGlsZFN0YXRlXT1cIidpbidcIj5cbiAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbHNwYW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbGluZS1kb3duXCI+PC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgW25nQ2xhc3NdPVwiIWxlYWYmJm5vZGUuZXhwYW5kZWQgPyAndWktb3JnYW5pemF0aW9uY2hhcnQtbm9kZS12aXNpYmxlJyA6ICd1aS1vcmdhbml6YXRpb25jaGFydC1ub2RlLWhpZGRlbidcIiBjbGFzcz1cInVpLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmVzXCIgW0BjaGlsZFN0YXRlXT1cIidpbidcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxXCI+XG4gICAgICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29sc3BhblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbGluZS1kb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAxXCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCJub2RlLmNoaWxkcmVuXCIgbGV0LWZpcnN0PVwiZmlyc3RcIiBsZXQtbGFzdD1cImxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbGluZS1sZWZ0XCIgW25nQ2xhc3NdPVwieyd1aS1vcmdhbml6YXRpb25jaGFydC1saW5lLXRvcCc6IWZpcnN0fVwiPiZuYnNwOzwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmUtcmlnaHRcIiBbbmdDbGFzc109XCJ7J3VpLW9yZ2FuaXphdGlvbmNoYXJ0LWxpbmUtdG9wJzohbGFzdH1cIj4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIFtuZ0NsYXNzXT1cIiFsZWFmJiZub2RlLmV4cGFuZGVkID8gJ3VpLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtdmlzaWJsZScgOiAndWktb3JnYW5pemF0aW9uY2hhcnQtbm9kZS1oaWRkZW4nXCIgY2xhc3M9XCJ1aS1vcmdhbml6YXRpb25jaGFydC1ub2Rlc1wiIFtAY2hpbGRTdGF0ZV09XCInaW4nXCI+XG4gICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW5cIiBjb2xzcGFuPVwiMlwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInVpLW9yZ2FuaXphdGlvbmNoYXJ0LXRhYmxlXCIgcE9yZ2FuaXphdGlvbkNoYXJ0Tm9kZSBbbm9kZV09XCJjaGlsZFwiPjwvdGFibGU+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdjaGlsZFN0YXRlJywgW1xuICAgICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgICAgICAgICAgIGFuaW1hdGUoMTUwKVxuICAgICAgICAgICBdKSxcbiAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgICAgICAgIGFuaW1hdGUoMTUwLCBzdHlsZSh7b3BhY2l0eTowfSkpXG4gICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydE5vZGUge1xuXG4gICAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHJvb3Q6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgZmlyc3Q6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgbGFzdDogYm9vbGVhbjtcblxuICAgIGNoYXJ0OiBPcmdhbml6YXRpb25DaGFydDtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE9yZ2FuaXphdGlvbkNoYXJ0KSkgY2hhcnQpIHtcbiAgICAgICAgdGhpcy5jaGFydCA9IGNoYXJ0IGFzIE9yZ2FuaXphdGlvbkNoYXJ0O1xuICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICBnZXQgbGVhZigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5sZWFmID09IGZhbHNlID8gZmFsc2UgOiAhKHRoaXMubm9kZS5jaGlsZHJlbiYmdGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBjb2xzcGFuKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubm9kZS5jaGlsZHJlbiAmJiB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoKSA/IHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggKiAyOiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBvbk5vZGVDbGljayhldmVudDogRXZlbnQsIG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHRoaXMuY2hhcnQub25Ob2RlQ2xpY2soZXZlbnQsIG5vZGUpXG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZU5vZGUoZXZlbnQ6IEV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBub2RlLmV4cGFuZGVkID0gIW5vZGUuZXhwYW5kZWQ7XG4gICAgICAgIGlmIChub2RlLmV4cGFuZGVkKVxuICAgICAgICAgICAgdGhpcy5jaGFydC5vbk5vZGVFeHBhbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Lm9uTm9kZUNvbGxhcHNlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiB0aGlzLm5vZGV9KTtcbiAgICAgICAgICAgIFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFydC5pc1NlbGVjdGVkKHRoaXMubm9kZSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atb3JnYW5pemF0aW9uQ2hhcnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsndWktb3JnYW5pemF0aW9uY2hhcnQgdWktd2lkZ2V0JzogdHJ1ZSwgJ3VpLW9yZ2FuaXphdGlvbmNoYXJ0LXByZXNlcnZlc3BhY2UnOiBwcmVzZXJ2ZVNwYWNlfVwiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtdGFibGVcIiBwT3JnYW5pemF0aW9uQ2hhcnROb2RlIFtub2RlXT1cInJvb3RcIiAqbmdJZj1cInJvb3RcIj48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgICAgICAgICAgXG4gICAgQElucHV0KCkgdmFsdWU6IFRyZWVOb2RlW107ICAgICAgICAgICAgXG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBzZWxlY3Rpb246IGFueTtcblxuICAgIEBJbnB1dCgpIHByZXNlcnZlU3BhY2U6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbk5vZGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbk5vZGVVbnNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVDb2xsYXBzZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIHB1YmxpYyB0ZW1wbGF0ZU1hcDogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cbiAgICBcbiAgICBnZXQgcm9vdCgpOiBUcmVlTm9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID8gdGhpcy52YWx1ZVswXSA6IG51bGw7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZU1hcCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlTWFwW2l0ZW0uZ2V0VHlwZSgpXSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBnZXRUZW1wbGF0ZUZvck5vZGUobm9kZTogVHJlZU5vZGUpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVNYXApXG4gICAgICAgICAgICByZXR1cm4gbm9kZS50eXBlID8gdGhpcy50ZW1wbGF0ZU1hcFtub2RlLnR5cGVdIDogdGhpcy50ZW1wbGF0ZU1hcFsnZGVmYXVsdCddO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgb25Ob2RlQ2xpY2soZXZlbnQ6IEV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSAoPEVsZW1lbnQ+IGV2ZW50LnRhcmdldCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZXZlbnRUYXJnZXQuY2xhc3NOYW1lICYmIChldmVudFRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigndWktbm9kZS10b2dnbGVyJykgIT09IC0xIHx8wqBldmVudFRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigndWktbm9kZS10b2dnbGVyLWljb24nKSAhPT0gLTEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IChpbmRleCA+PSAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbnx8W10sbm9kZV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAodGhpcy5zZWxlY3Rpb24gPT0gbm9kZSkgPyAwIDogLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSAgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25baV0gPT0gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIFxuICAgIGlzU2VsZWN0ZWQobm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSkgIT0gLTE7ICAgICAgICAgXG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtPcmdhbml6YXRpb25DaGFydCxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW09yZ2FuaXphdGlvbkNoYXJ0LE9yZ2FuaXphdGlvbkNoYXJ0Tm9kZV1cbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uQ2hhcnRNb2R1bGUgeyB9Il19