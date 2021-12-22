/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Key } from '../util/key';
import * as i0 from "@angular/core";
/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * \@since 5.2.0
 */
var NgbDatepickerKeyboardService = /** @class */ (function () {
    function NgbDatepickerKeyboardService() {
    }
    /**
     * Processes a keyboard event.
     */
    /**
     * Processes a keyboard event.
     * @param {?} event
     * @param {?} datepicker
     * @return {?}
     */
    NgbDatepickerKeyboardService.prototype.processKey = /**
     * Processes a keyboard event.
     * @param {?} event
     * @param {?} datepicker
     * @return {?}
     */
    function (event, datepicker) {
        var state = datepicker.state, calendar = datepicker.calendar;
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.PageUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.PageDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.End:
                datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                break;
            case Key.Home:
                datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                break;
            case Key.ArrowLeft:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.ArrowRight:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.Enter:
            case Key.Space:
                datepicker.focusSelect();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    };
    NgbDatepickerKeyboardService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbDatepickerKeyboardService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerKeyboardService_Factory() { return new NgbDatepickerKeyboardService(); }, token: NgbDatepickerKeyboardService, providedIn: "root" });
    return NgbDatepickerKeyboardService;
}());
export { NgbDatepickerKeyboardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXIta2V5Ym9hcmQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7QUFTaEM7SUFBQTtLQTJDQztJQXpDQzs7T0FFRzs7Ozs7OztJQUNILGlEQUFVOzs7Ozs7SUFBVixVQUFXLEtBQW9CLEVBQUUsVUFBeUI7UUFDakQsSUFBQSx3QkFBSyxFQUFFLDhCQUFRO1FBQ3RCLHVDQUF1QztRQUN2QyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbkIsS0FBSyxHQUFHLENBQUMsTUFBTTtnQkFDYixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsUUFBUTtnQkFDZixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsR0FBRztnQkFDVixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLElBQUk7Z0JBQ1gsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxTQUFTO2dCQUNoQixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLE9BQU87Z0JBQ2QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxVQUFVO2dCQUNqQixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLFNBQVM7Z0JBQ2hCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2YsS0FBSyxHQUFHLENBQUMsS0FBSztnQkFDWixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU07WUFDUjtnQkFDRSxPQUFPO1NBQ1Y7UUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dCQTFDRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7dUNBWGhDO0NBc0RDLEFBM0NELElBMkNDO1NBMUNZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJ9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuXG4vKipcbiAqIEEgc2VydmljZSB0aGF0IHJlcHJlc2VudHMgdGhlIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gKlxuICogRGVmYXVsdCBrZXlib2FyZCBzaG9ydGN1dHMgW2FyZSBkb2N1bWVudGVkIGluIHRoZSBvdmVydmlld10oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvb3ZlcnZpZXcja2V5Ym9hcmQtc2hvcnRjdXRzKVxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5Ym9hcmRTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBhIGtleWJvYXJkIGV2ZW50LlxuICAgKi9cbiAgcHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0ZXBpY2tlcjogTmdiRGF0ZXBpY2tlcikge1xuICAgIGNvbnN0IHtzdGF0ZSwgY2FsZW5kYXJ9ID0gZGF0ZXBpY2tlcjtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICBjYXNlIEtleS5QYWdlVXA6XG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNEYXRlKGNhbGVuZGFyLmdldFByZXYoc3RhdGUuZm9jdXNlZERhdGUsIGV2ZW50LnNoaWZ0S2V5ID8gJ3knIDogJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuUGFnZURvd246XG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNEYXRlKGNhbGVuZGFyLmdldE5leHQoc3RhdGUuZm9jdXNlZERhdGUsIGV2ZW50LnNoaWZ0S2V5ID8gJ3knIDogJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICBkYXRlcGlja2VyLmZvY3VzRGF0ZShldmVudC5zaGlmdEtleSA/IHN0YXRlLm1heERhdGUgOiBzdGF0ZS5sYXN0RGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoZXZlbnQuc2hpZnRLZXkgPyBzdGF0ZS5taW5EYXRlIDogc3RhdGUuZmlyc3REYXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNEYXRlKGNhbGVuZGFyLmdldFByZXYoc3RhdGUuZm9jdXNlZERhdGUsICdkJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNEYXRlKGNhbGVuZGFyLmdldFByZXYoc3RhdGUuZm9jdXNlZERhdGUsICdkJywgY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNEYXRlKGNhbGVuZGFyLmdldE5leHQoc3RhdGUuZm9jdXNlZERhdGUsICdkJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0TmV4dChzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICBjYXNlIEtleS5TcGFjZTpcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c1NlbGVjdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19