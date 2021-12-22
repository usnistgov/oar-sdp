/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from '../util/util';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerNavigationSelect = /** @class */ (function () {
    function NgbDatepickerNavigationSelect(i18n, _renderer) {
        this.i18n = i18n;
        this._renderer = _renderer;
        this.select = new EventEmitter();
        this._month = -1;
        this._year = -1;
    }
    /**
     * @param {?} month
     * @return {?}
     */
    NgbDatepickerNavigationSelect.prototype.changeMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); };
    /**
     * @param {?} year
     * @return {?}
     */
    NgbDatepickerNavigationSelect.prototype.changeYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); };
    /**
     * @return {?}
     */
    NgbDatepickerNavigationSelect.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.date) {
            if (this.date.month !== this._month) {
                this._month = this.date.month;
                this._renderer.setProperty(this.monthSelect.nativeElement, 'value', this._month);
            }
            if (this.date.year !== this._year) {
                this._year = this.date.year;
                this._renderer.setProperty(this.yearSelect.nativeElement, 'value', this._year);
            }
        }
    };
    NgbDatepickerNavigationSelect.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-datepicker-navigation-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <select #month\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      i18n-aria-label=\"@@ngb.datepicker.select-month\" aria-label=\"Select month\"\n      i18n-title=\"@@ngb.datepicker.select-month\" title=\"Select month\"\n      (change)=\"changeMonth($event.target.value)\">\n        <option *ngFor=\"let m of months\" [attr.aria-label]=\"i18n.getMonthFullName(m, date?.year)\"\n                [value]=\"m\">{{ i18n.getMonthShortName(m, date?.year) }}</option>\n    </select><select #year\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      i18n-aria-label=\"@@ngb.datepicker.select-year\" aria-label=\"Select year\"\n      i18n-title=\"@@ngb.datepicker.select-year\" title=\"Select year\"\n      (change)=\"changeYear($event.target.value)\">\n        <option *ngFor=\"let y of years\" [value]=\"y\">{{ i18n.getYearNumerals(y) }}</option>\n    </select>\n  ",
                    styles: ["ngb-datepicker-navigation-select>.custom-select{-ms-flex:1 1 auto;flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.custom-select:focus{z-index:1}ngb-datepicker-navigation-select>.custom-select::-ms-value{background-color:transparent!important}"]
                }] }
    ];
    /** @nocollapse */
    NgbDatepickerNavigationSelect.ctorParameters = function () { return [
        { type: NgbDatepickerI18n },
        { type: Renderer2 }
    ]; };
    NgbDatepickerNavigationSelect.propDecorators = {
        date: [{ type: Input }],
        disabled: [{ type: Input }],
        months: [{ type: Input }],
        years: [{ type: Input }],
        select: [{ type: Output }],
        monthSelect: [{ type: ViewChild, args: ['month', { static: true, read: ElementRef },] }],
        yearSelect: [{ type: ViewChild, args: ['year', { static: true, read: ElementRef },] }]
    };
    return NgbDatepickerNavigationSelect;
}());
export { NgbDatepickerNavigationSelect };
if (false) {
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.date;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.disabled;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.months;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.years;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.select;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.monthSelect;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.yearSelect;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerNavigationSelect.prototype._month;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerNavigationSelect.prototype._year;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.i18n;
    /**
     * @type {?}
     * @private
     */
    NgbDatepickerNavigationSelect.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBEO0lBc0NFLHVDQUFtQixJQUF1QixFQUFVLFNBQW9CO1FBQXJELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVI5RCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUt2QyxXQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDWixVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFd0QsQ0FBQzs7Ozs7SUFFNUUsbURBQVc7Ozs7SUFBWCxVQUFZLEtBQWEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWxHLGtEQUFVOzs7O0lBQVYsVUFBVyxJQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRWhHLDBEQUFrQjs7O0lBQWxCO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2xGO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hGO1NBQ0Y7SUFDSCxDQUFDOztnQkF2REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFFckMsUUFBUSxFQUFFLG00QkFpQlQ7O2lCQUNGOzs7O2dCQXpCTyxpQkFBaUI7Z0JBSnZCLFNBQVM7Ozt1QkErQlIsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFFTCxNQUFNOzhCQUVOLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7NkJBQ25ELFNBQVMsU0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7O0lBdUJyRCxvQ0FBQztDQUFBLEFBeERELElBd0RDO1NBaENZLDZCQUE2Qjs7O0lBQ3hDLDZDQUF1Qjs7SUFDdkIsaURBQTJCOztJQUMzQiwrQ0FBMEI7O0lBQzFCLDhDQUF5Qjs7SUFFekIsK0NBQStDOztJQUUvQyxvREFBOEU7O0lBQzlFLG1EQUE0RTs7Ozs7SUFFNUUsK0NBQW9COzs7OztJQUNwQiw4Q0FBbUI7O0lBRVAsNkNBQThCOzs7OztJQUFFLGtEQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7dG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VsZWN0ICNtb250aFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXG4gICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC1tb250aFwiIGFyaWEtbGFiZWw9XCJTZWxlY3QgbW9udGhcIlxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCIgdGl0bGU9XCJTZWxlY3QgbW9udGhcIlxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VNb250aCgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiaTE4bi5nZXRNb250aEZ1bGxOYW1lKG0sIGRhdGU/LnllYXIpXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwibVwiPnt7IGkxOG4uZ2V0TW9udGhTaG9ydE5hbWUobSwgZGF0ZT8ueWVhcikgfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD48c2VsZWN0ICN5ZWFyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCJcbiAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IHllYXJcIlxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIiB0aXRsZT1cIlNlbGVjdCB5ZWFyXCJcbiAgICAgIChjaGFuZ2UpPVwiY2hhbmdlWWVhcigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB5IG9mIHllYXJzXCIgW3ZhbHVlXT1cInlcIj57eyBpMThuLmdldFllYXJOdW1lcmFscyh5KSB9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtb250aHM6IG51bWJlcltdO1xuICBASW5wdXQoKSB5ZWFyczogbnVtYmVyW107XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuICBAVmlld0NoaWxkKCdtb250aCcsIHtzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWZ9KSBtb250aFNlbGVjdDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgneWVhcicsIHtzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWZ9KSB5ZWFyU2VsZWN0OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX21vbnRoID0gLTE7XG4gIHByaXZhdGUgX3llYXIgPSAtMTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgY2hhbmdlTW9udGgobW9udGg6IHN0cmluZykgeyB0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRoaXMuZGF0ZS55ZWFyLCB0b0ludGVnZXIobW9udGgpLCAxKSk7IH1cblxuICBjaGFuZ2VZZWFyKHllYXI6IHN0cmluZykgeyB0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRvSW50ZWdlcih5ZWFyKSwgdGhpcy5kYXRlLm1vbnRoLCAxKSk7IH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZSkge1xuICAgICAgaWYgKHRoaXMuZGF0ZS5tb250aCAhPT0gdGhpcy5fbW9udGgpIHtcbiAgICAgICAgdGhpcy5fbW9udGggPSB0aGlzLmRhdGUubW9udGg7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMubW9udGhTZWxlY3QubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGhpcy5fbW9udGgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF0ZS55ZWFyICE9PSB0aGlzLl95ZWFyKSB7XG4gICAgICAgIHRoaXMuX3llYXIgPSB0aGlzLmRhdGUueWVhcjtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy55ZWFyU2VsZWN0Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRoaXMuX3llYXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19