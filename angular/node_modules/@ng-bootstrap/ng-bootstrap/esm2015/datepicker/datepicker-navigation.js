/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerNavigation {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
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
    onClickPrev(event) {
        ((/** @type {?} */ (event.currentTarget))).focus();
        this.navigate.emit(this.navigation.PREV);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickNext(event) {
        ((/** @type {?} */ (event.currentTarget))).focus();
        this.navigate.emit(this.navigation.NEXT);
    }
}
NgbDatepickerNavigation.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickPrev($event)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickNext($event)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `,
                styles: ["ngb-datepicker-navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.right .ngb-dp-navigation-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{-ms-flex-pack:end;justify-content:flex-end}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:-ms-flexbox;display:flex;-ms-flex:1 1 9rem;flex:1 1 9rem}"]
            }] }
];
/** @nocollapse */
NgbDatepickerNavigation.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItbmF2aWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsZUFBZSxFQUFpQixNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUF1Q3BELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFjbEMsWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFiMUMsZUFBVSxHQUFHLGVBQWUsQ0FBQztRQUlwQixXQUFNLEdBQXFCLEVBQUUsQ0FBQztRQU03QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFRixDQUFDOzs7OztJQUU5QyxXQUFXLENBQUMsS0FBaUI7UUFDM0IsQ0FBQyxtQkFBQSxLQUFLLENBQUMsYUFBYSxFQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWlCO1FBQzNCLENBQUMsbUJBQUEsS0FBSyxDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E4QlA7O2FBQ0o7Ozs7WUF0Q08saUJBQWlCOzs7bUJBMEN0QixLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUVMLE1BQU07cUJBQ04sTUFBTTs7OztJQVhQLDZDQUE2Qjs7SUFFN0IsdUNBQXVCOztJQUN2QiwyQ0FBMkI7O0lBQzNCLHlDQUF1Qzs7SUFDdkMsNkNBQTZCOztJQUM3QiwrQ0FBK0I7O0lBQy9CLCtDQUErQjs7SUFDL0IsOENBQTBEOztJQUUxRCwyQ0FBeUQ7O0lBQ3pELHlDQUErQzs7SUFFbkMsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvbkV2ZW50LCBNb250aFZpZXdNb2RlbH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24uc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5nYi1kcC1hcnJvdy1idG5cIiAoY2xpY2spPVwib25DbGlja1ByZXYoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJwcmV2RGlzYWJsZWRcIlxuICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIucHJldmlvdXMtbW9udGhcIiB0aXRsZT1cIlByZXZpb3VzIG1vbnRoXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCAqbmdJZj1cInNob3dTZWxlY3RcIiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLXNlbGVjdFwiXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgIFtkaXNhYmxlZF0gPSBcImRpc2FibGVkXCJcbiAgICAgIFttb250aHNdPVwic2VsZWN0Qm94ZXMubW9udGhzXCJcbiAgICAgIFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIj5cbiAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0PlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiIXNob3dTZWxlY3RcIiBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSA+IDBcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpICE9PSBtb250aHMubGVuZ3RoIC0gMVwiPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvdyByaWdodFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCJvbkNsaWNrTmV4dCgkZXZlbnQpXCIgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIHRpdGxlPVwiTmV4dCBtb250aFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uIHtcbiAgbmF2aWdhdGlvbiA9IE5hdmlnYXRpb25FdmVudDtcblxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XG4gIEBJbnB1dCgpIHNob3dTZWxlY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHByZXZEaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RCb3hlczoge3llYXJzOiBudW1iZXJbXSwgbW9udGhzOiBudW1iZXJbXX07XG5cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIG9uQ2xpY2tQcmV2KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5QUkVWKTtcbiAgfVxuXG4gIG9uQ2xpY2tOZXh0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5ORVhUKTtcbiAgfVxufVxuIl19