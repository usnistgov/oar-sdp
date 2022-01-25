import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbDatepicker } from './datepicker';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { NgbDatepickerKeyboardService } from './datepicker-keyboard-service';
import { NgbDatepickerService } from './datepicker-service';
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
export class NgbDatepickerMonth {
    constructor(i18n, datepicker, _keyboardService, _service) {
        this.i18n = i18n;
        this.datepicker = datepicker;
        this._keyboardService = _keyboardService;
        this._service = _service;
    }
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month) {
        this.viewModel = this._service.getMonth(month);
    }
    onKeyDown(event) { this._keyboardService.processKey(event, this.datepicker); }
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.datepicker.onDateSelect(day.date);
        }
    }
}
NgbDatepickerMonth.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month',
                host: { 'role': 'grid', '(keydown)': 'onKeyDown($event)' },
                encapsulation: ViewEncapsulation.None,
                template: `
    <div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
      <div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{ i18n.getWeekLabel() }}</div>
      <div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{ weekday }}</div>
    </div>
    <ng-template ngFor let-week [ngForOf]="viewModel.weeks">
      <div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
        <div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day); $event.preventDefault()" class="ngb-dp-day" role="gridcell"
             [class.disabled]="day.context.disabled"
             [tabindex]="day.tabindex"
             [class.hidden]="day.hidden"
             [class.ngb-dp-today]="day.context.today"
             [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `,
                styles: ["ngb-datepicker-month{display:block}.ngb-dp-week-number,.ngb-dp-weekday{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:#5bc0de;color:var(--info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid rgba(0,0,0,.125);border-radius:0;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-day,.ngb-dp-week-number,.ngb-dp-weekday{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}"]
            },] }
];
NgbDatepickerMonth.ctorParameters = () => [
    { type: NgbDatepickerI18n },
    { type: NgbDatepicker },
    { type: NgbDatepickerKeyboardService },
    { type: NgbDatepickerService }
];
NgbDatepickerMonth.propDecorators = {
    month: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb250aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUkxRDs7Ozs7OztHQU9HO0FBNEJILE1BQU0sT0FBTyxrQkFBa0I7SUFjN0IsWUFDVyxJQUF1QixFQUFTLFVBQXlCLEVBQ3hELGdCQUE4QyxFQUFVLFFBQThCO1FBRHZGLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUN4RCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQThCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7SUFBRyxDQUFDO0lBZnRHOzs7OztPQUtHO0lBQ0gsSUFDSSxLQUFLLENBQUMsS0FBb0I7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBUUQsU0FBUyxDQUFDLEtBQW9CLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RixRQUFRLENBQUMsR0FBaUI7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFDO2dCQUN4RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDs7YUFDRjs7O1lBeENPLGlCQUFpQjtZQURqQixhQUFhO1lBRWIsNEJBQTRCO1lBQzVCLG9CQUFvQjs7O29CQThDekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyS2V5Ym9hcmRTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXIta2V5Ym9hcmQtc2VydmljZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge01vbnRoVmlld01vZGVsLCBEYXlWaWV3TW9kZWx9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgcmVuZGVycyBvbmUgbW9udGggaW5jbHVkaW5nIGFsbCB0aGUgZGF5cywgd2Vla2RheXMgYW5kIHdlZWsgbnVtYmVycy4gQ2FuIGJlIHVzZWQgaW5zaWRlXG4gKiB0aGUgYDxuZy10ZW1wbGF0ZSBuZ2JEYXRlcGlja2VyTW9udGhzPjwvbmctdGVtcGxhdGU+YCB3aGVuIHlvdSB3YW50IHRvIGN1c3RvbWl6ZSBtb250aHMgbGF5b3V0LlxuICpcbiAqIEZvciBhIHVzYWdlIGV4YW1wbGUsIHNlZSBbY3VzdG9tIG1vbnRoIGxheW91dCBkZW1vXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9leGFtcGxlcyNjdXN0b21tb250aClcbiAqXG4gKiBAc2luY2UgNS4zLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbW9udGgnLFxuICBob3N0OiB7J3JvbGUnOiAnZ3JpZCcsICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1tb250aC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cInZpZXdNb2RlbC53ZWVrZGF5cy5sZW5ndGggPiAwXCIgY2xhc3M9XCJuZ2ItZHAtd2VlayBuZ2ItZHAtd2Vla2RheXNcIiByb2xlPVwicm93XCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZGF0ZXBpY2tlci5zaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrZGF5IG5nYi1kcC1zaG93d2VlayBzbWFsbFwiPnt7IGkxOG4uZ2V0V2Vla0xhYmVsKCkgfX08L2Rpdj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHdlZWtkYXkgb2Ygdmlld01vZGVsLndlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBzbWFsbFwiIHJvbGU9XCJjb2x1bW5oZWFkZXJcIj57eyB3ZWVrZGF5IH19PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC13ZWVrIFtuZ0Zvck9mXT1cInZpZXdNb2RlbC53ZWVrc1wiPlxuICAgICAgPGRpdiAqbmdJZj1cIiF3ZWVrLmNvbGxhcHNlZFwiIGNsYXNzPVwibmdiLWRwLXdlZWtcIiByb2xlPVwicm93XCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJkYXRlcGlja2VyLnNob3dXZWVrTnVtYmVyc1wiIGNsYXNzPVwibmdiLWRwLXdlZWstbnVtYmVyIHNtYWxsIHRleHQtbXV0ZWRcIj57eyBpMThuLmdldFdlZWtOdW1lcmFscyh3ZWVrLm51bWJlcikgfX08L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIChjbGljayk9XCJkb1NlbGVjdChkYXkpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIGNsYXNzPVwibmdiLWRwLWRheVwiIHJvbGU9XCJncmlkY2VsbFwiXG4gICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRheS5jb250ZXh0LmRpc2FibGVkXCJcbiAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiZGF5LnRhYmluZGV4XCJcbiAgICAgICAgICAgICBbY2xhc3MuaGlkZGVuXT1cImRheS5oaWRkZW5cIlxuICAgICAgICAgICAgIFtjbGFzcy5uZ2ItZHAtdG9kYXldPVwiZGF5LmNvbnRleHQudG9kYXlcIlxuICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5LmFyaWFMYWJlbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZGF5LmhpZGRlblwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRhdGVwaWNrZXIuZGF5VGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF5LmNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTW9udGgge1xuICAvKipcbiAgICogVGhlIGZpcnN0IGRhdGUgb2YgbW9udGggdG8gYmUgcmVuZGVyZWQuXG4gICAqXG4gICAqIFRoaXMgbW9udGggbXVzdCBvbmUgb2YgdGhlIG1vbnRocyBwcmVzZW50IGluIHRoZVxuICAgKiBbZGF0ZXBpY2tlciBzdGF0ZV0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXJTdGF0ZSkuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbW9udGgobW9udGg6IE5nYkRhdGVTdHJ1Y3QpIHtcbiAgICB0aGlzLnZpZXdNb2RlbCA9IHRoaXMuX3NlcnZpY2UuZ2V0TW9udGgobW9udGgpO1xuICB9XG5cbiAgdmlld01vZGVsOiBNb250aFZpZXdNb2RlbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4biwgcHVibGljIGRhdGVwaWNrZXI6IE5nYkRhdGVwaWNrZXIsXG4gICAgICBwcml2YXRlIF9rZXlib2FyZFNlcnZpY2U6IE5nYkRhdGVwaWNrZXJLZXlib2FyZFNlcnZpY2UsIHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlKSB7fVxuXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkgeyB0aGlzLl9rZXlib2FyZFNlcnZpY2UucHJvY2Vzc0tleShldmVudCwgdGhpcy5kYXRlcGlja2VyKTsgfVxuXG4gIGRvU2VsZWN0KGRheTogRGF5Vmlld01vZGVsKSB7XG4gICAgaWYgKCFkYXkuY29udGV4dC5kaXNhYmxlZCAmJiAhZGF5LmhpZGRlbikge1xuICAgICAgdGhpcy5kYXRlcGlja2VyLm9uRGF0ZVNlbGVjdChkYXkuZGF0ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=