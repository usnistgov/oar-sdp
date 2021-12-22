/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerNavigation = /** @class */ (function () {
    function NgbDatepickerNavigation(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepickerNavigation.prototype.onClickPrev = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        ((/** @type {?} */ (event.currentTarget))).focus();
        this.navigate.emit(this.navigation.PREV);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepickerNavigation.prototype.onClickNext = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        ((/** @type {?} */ (event.currentTarget))).focus();
        this.navigate.emit(this.navigation.NEXT);
    };
    NgbDatepickerNavigation.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-datepicker-navigation',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <div class=\"ngb-dp-arrow\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"onClickPrev($event)\" [disabled]=\"prevDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.previous-month\" aria-label=\"Previous month\"\n              i18n-title=\"@@ngb.datepicker.previous-month\" title=\"Previous month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    <ngb-datepicker-navigation-select *ngIf=\"showSelect\" class=\"ngb-dp-navigation-select\"\n      [date]=\"date\"\n      [disabled] = \"disabled\"\n      [months]=\"selectBoxes.months\"\n      [years]=\"selectBoxes.years\"\n      (select)=\"select.emit($event)\">\n    </ngb-datepicker-navigation-select>\n\n    <ng-template *ngIf=\"!showSelect\" ngFor let-month [ngForOf]=\"months\" let-i=\"index\">\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i > 0\"></div>\n      <div class=\"ngb-dp-month-name\">\n        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n      </div>\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i !== months.length - 1\"></div>\n    </ng-template>\n    <div class=\"ngb-dp-arrow right\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"onClickNext($event)\" [disabled]=\"nextDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.next-month\" aria-label=\"Next month\"\n              i18n-title=\"@@ngb.datepicker.next-month\" title=\"Next month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    ",
                    styles: ["ngb-datepicker-navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.right .ngb-dp-navigation-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{-ms-flex-pack:end;justify-content:flex-end}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:-ms-flexbox;display:flex;-ms-flex:1 1 9rem;flex:1 1 9rem}"]
                }] }
    ];
    /** @nocollapse */
    NgbDatepickerNavigation.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerNavigation.propDecorators = {
        date: [{ type: Input }],
        disabled: [{ type: Input }],
        months: [{ type: Input }],
        showSelect: [{ type: Input }],
        prevDisabled: [{ type: Input }],
        nextDisabled: [{ type: Input }],
        selectBoxes: [{ type: Input }],
        navigate: [{ type: Output }],
        select: [{ type: Output }]
    };
    return NgbDatepickerNavigation;
}());
export { NgbDatepickerNavigation };
if (false) {
    /** @type {?} */
    NgbDatepickerNavigation.prototype.navigation;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.date;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.disabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.months;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.showSelect;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.prevDisabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.nextDisabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.selectBoxes;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.navigate;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.select;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItbmF2aWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsZUFBZSxFQUFpQixNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQ7SUFtREUsaUNBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBYjFDLGVBQVUsR0FBRyxlQUFlLENBQUM7UUFJcEIsV0FBTSxHQUFxQixFQUFFLENBQUM7UUFNN0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQy9DLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRUYsQ0FBQzs7Ozs7SUFFOUMsNkNBQVc7Ozs7SUFBWCxVQUFZLEtBQWlCO1FBQzNCLENBQUMsbUJBQUEsS0FBSyxDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELDZDQUFXOzs7O0lBQVgsVUFBWSxLQUFpQjtRQUMzQixDQUFDLG1CQUFBLEtBQUssQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBRXJDLFFBQVEsRUFBRSxzakRBOEJQOztpQkFDSjs7OztnQkF0Q08saUJBQWlCOzs7dUJBMEN0QixLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUVMLE1BQU07eUJBQ04sTUFBTTs7SUFhVCw4QkFBQztDQUFBLEFBOURELElBOERDO1NBekJZLHVCQUF1Qjs7O0lBQ2xDLDZDQUE2Qjs7SUFFN0IsdUNBQXVCOztJQUN2QiwyQ0FBMkI7O0lBQzNCLHlDQUF1Qzs7SUFDdkMsNkNBQTZCOztJQUM3QiwrQ0FBK0I7O0lBQy9CLCtDQUErQjs7SUFDL0IsOENBQTBEOztJQUUxRCwyQ0FBeUQ7O0lBQ3pELHlDQUErQzs7SUFFbkMsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvbkV2ZW50LCBNb250aFZpZXdNb2RlbH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24uc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5nYi1kcC1hcnJvdy1idG5cIiAoY2xpY2spPVwib25DbGlja1ByZXYoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJwcmV2RGlzYWJsZWRcIlxuICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIucHJldmlvdXMtbW9udGhcIiB0aXRsZT1cIlByZXZpb3VzIG1vbnRoXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCAqbmdJZj1cInNob3dTZWxlY3RcIiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLXNlbGVjdFwiXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgIFtkaXNhYmxlZF0gPSBcImRpc2FibGVkXCJcbiAgICAgIFttb250aHNdPVwic2VsZWN0Qm94ZXMubW9udGhzXCJcbiAgICAgIFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIj5cbiAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0PlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiIXNob3dTZWxlY3RcIiBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSA+IDBcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpICE9PSBtb250aHMubGVuZ3RoIC0gMVwiPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvdyByaWdodFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCJvbkNsaWNrTmV4dCgkZXZlbnQpXCIgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIHRpdGxlPVwiTmV4dCBtb250aFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uIHtcbiAgbmF2aWdhdGlvbiA9IE5hdmlnYXRpb25FdmVudDtcblxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XG4gIEBJbnB1dCgpIHNob3dTZWxlY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHByZXZEaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RCb3hlczoge3llYXJzOiBudW1iZXJbXSwgbW9udGhzOiBudW1iZXJbXX07XG5cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIG9uQ2xpY2tQcmV2KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5QUkVWKTtcbiAgfVxuXG4gIG9uQ2xpY2tOZXh0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5ORVhUKTtcbiAgfVxufVxuIl19