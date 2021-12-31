var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var BlockUI = /** @class */ (function () {
    function BlockUI(el) {
        this.el = el;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    Object.defineProperty(BlockUI.prototype, "blocked", {
        get: function () {
            return this._blocked;
        },
        set: function (val) {
            this._blocked = val;
            if (this.mask && this.mask.nativeElement) {
                if (this._blocked)
                    this.block();
                else
                    this.unblock();
            }
        },
        enumerable: true,
        configurable: true
    });
    BlockUI.prototype.ngAfterViewInit = function () {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    };
    BlockUI.prototype.block = function () {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            var style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    };
    BlockUI.prototype.unblock = function () {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    };
    BlockUI.prototype.ngOnDestroy = function () {
        this.unblock();
    };
    BlockUI.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], BlockUI.prototype, "target", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "styleClass", void 0);
    __decorate([
        ViewChild('mask')
    ], BlockUI.prototype, "mask", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "blocked", null);
    BlockUI = __decorate([
        Component({
            selector: 'p-blockUI',
            template: "\n        <div #mask [class]=\"styleClass\" [ngClass]=\"{'ui-blockui-document':!target, 'ui-blockui ui-widget-overlay': true}\" [ngStyle]=\"{display: blocked ? 'block' : 'none'}\">\n            <ng-content></ng-content>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], BlockUI);
    return BlockUI;
}());
export { BlockUI };
var BlockUIModule = /** @class */ (function () {
    function BlockUIModule() {
    }
    BlockUIModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [BlockUI],
            declarations: [BlockUI]
        })
    ], BlockUIModule);
    return BlockUIModule;
}());
export { BlockUIModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2t1aS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYmxvY2t1aS8iLCJzb3VyY2VzIjpbImJsb2NrdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVd2QztJQWNJLGlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQVZ4QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFRSSxDQUFDO0lBRTVCLHNCQUFJLDRCQUFPO2FBQVg7WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksR0FBWTtZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUVwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVE7b0JBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztvQkFFYixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDOzs7T0FYQTtJQWFELGlDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO1lBQ2pELE1BQU0sd0RBQXdELENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQsdUJBQUssR0FBTDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUM7WUFDbEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQ0k7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzFGO0lBQ0wsQ0FBQztJQUVELHlCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOztnQkE3Q3NCLFVBQVU7O0lBWnhCO1FBQVIsS0FBSyxFQUFFOzJDQUFhO0lBRVo7UUFBUixLQUFLLEVBQUU7K0NBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOytDQUF3QjtJQUV2QjtRQUFSLEtBQUssRUFBRTsrQ0FBb0I7SUFFVDtRQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDO3lDQUFrQjtJQU0zQjtRQUFSLEtBQUssRUFBRTswQ0FFUDtJQWxCUSxPQUFPO1FBVG5CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxtUEFJVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxPQUFPLENBNERuQjtJQUFELGNBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVEWSxPQUFPO0FBbUVwQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUMxQixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksRWxlbWVudFJlZixWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJsb2NrVUknLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI21hc2sgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCJ7J3VpLWJsb2NrdWktZG9jdW1lbnQnOiF0YXJnZXQsICd1aS1ibG9ja3VpIHVpLXdpZGdldC1vdmVybGF5JzogdHJ1ZX1cIiBbbmdTdHlsZV09XCJ7ZGlzcGxheTogYmxvY2tlZCA/ICdibG9jaycgOiAnbm9uZSd9XCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIEJsb2NrVUkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBAVmlld0NoaWxkKCdtYXNrJykgbWFzazogRWxlbWVudFJlZjtcbiAgICBcbiAgICBfYmxvY2tlZDogYm9vbGVhbjtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBibG9ja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tlZDtcbiAgICB9XG4gICAgXG4gICAgc2V0IGJsb2NrZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrZWQgPSB2YWw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tYXNrICYmIHRoaXMubWFzay5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tlZClcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgIXRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRocm93ICdUYXJnZXQgb2YgQmxvY2tVSSBtdXN0IGltcGxlbWVudCBCbG9ja2FibGVVSSBpbnRlcmZhY2UnO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBibG9jaygpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5nZXRCbG9ja2FibGVFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy50YXJnZXQuc3R5bGV8fHt9O1xuICAgICAgICAgICAgc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLm1hc2submF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJsb2NrKCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtCbG9ja1VJXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtCbG9ja1VJXVxufSlcbmV4cG9ydCBjbGFzcyBCbG9ja1VJTW9kdWxlIHsgfSJdfQ==