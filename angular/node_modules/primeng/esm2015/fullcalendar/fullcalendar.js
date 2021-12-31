var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, OnInit, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
let FullCalendar = class FullCalendar {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        this.config = {
            theme: true
        };
        if (this.options) {
            for (let prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    }
    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
        if (this._events && this.calendar) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this._events);
        }
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        if (this._options && this.calendar) {
            for (let prop in this._options) {
                let optionValue = this._options[prop];
                this.config[prop] = optionValue;
                this.calendar.setOption(prop, optionValue);
            }
        }
    }
    initialize() {
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this.events);
        }
    }
    getCalendar() {
        return this.calendar;
    }
    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
            this.initialized = false;
            this.calendar = null;
        }
    }
};
FullCalendar.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], FullCalendar.prototype, "style", void 0);
__decorate([
    Input()
], FullCalendar.prototype, "styleClass", void 0);
__decorate([
    Input()
], FullCalendar.prototype, "events", null);
__decorate([
    Input()
], FullCalendar.prototype, "options", null);
FullCalendar = __decorate([
    Component({
        selector: 'p-fullCalendar',
        template: '<div [ngStyle]="style" [class]="styleClass"></div>',
        changeDetection: ChangeDetectionStrategy.Default
    })
], FullCalendar);
export { FullCalendar };
let FullCalendarModule = class FullCalendarModule {
};
FullCalendarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [FullCalendar],
        declarations: [FullCalendar]
    })
], FullCalendarModule);
export { FullCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbGNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9mdWxsY2FsZW5kYXIvIiwic291cmNlcyI6WyJmdWxsY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFPNUMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQWdCckIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBRXJDLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7U0FDSjtJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7WUFDekQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVRLElBQUksTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVRLElBQUksT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM1QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUF2RTBCLFVBQVU7O0FBZHhCO0lBQVIsS0FBSyxFQUFFOzJDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7Z0RBQW9CO0FBZ0NuQjtJQUFSLEtBQUssRUFBRTswQ0FFUDtBQVdRO0lBQVIsS0FBSyxFQUFFOzJDQUVQO0FBbkRRLFlBQVk7SUFMeEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsb0RBQW9EO1FBQzlELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxZQUFZLENBdUZ4QjtTQXZGWSxZQUFZO0FBOEZ6QixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBTDlCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQy9CLENBQUM7R0FDVyxrQkFBa0IsQ0FBSTtTQUF0QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPbkluaXQsQWZ0ZXJWaWV3Q2hlY2tlZCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2FsZW5kYXJ9IGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1mdWxsQ2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+PC9kaXY+JyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgRnVsbENhbGVuZGFyIGltcGxlbWVudHMgT25EZXN0cm95LE9uSW5pdCxBZnRlclZpZXdDaGVja2VkIHtcbiAgICAgICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICAgICAgICAgICBcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgICAgICAgICAgIFxuICAgIGNhbGVuZGFyOiBhbnk7XG4gICAgXG4gICAgY29uZmlnOiBhbnk7XG5cbiAgICBfb3B0aW9uczogYW55O1xuXG4gICAgX2V2ZW50czogYW55W107XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgICAgdGhlbWU6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW3Byb3BdID0gdGhpcy5vcHRpb25zW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBldmVudHMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICBzZXQgZXZlbnRzKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50cyAmJiB0aGlzLmNhbGVuZGFyKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLnJlbW92ZUFsbEV2ZW50U291cmNlcygpO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hZGRFdmVudFNvdXJjZSh0aGlzLl9ldmVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0IG9wdGlvbnModmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgJiYgdGhpcy5jYWxlbmRhcikge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvblZhbHVlID0gdGhpcy5fb3B0aW9uc1twcm9wXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1twcm9wXSA9IG9wdGlvblZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuc2V0T3B0aW9uKHByb3AsIG9wdGlvblZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCB0aGlzLmNvbmZpZyk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLnJlbW92ZUFsbEV2ZW50U291cmNlcygpO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hZGRFdmVudFNvdXJjZSh0aGlzLmV2ZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDYWxlbmRhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXI7XG4gICAgfVxuICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRnVsbENhbGVuZGFyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGdWxsQ2FsZW5kYXJdXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxDYWxlbmRhck1vZHVsZSB7IH1cbiJdfQ==