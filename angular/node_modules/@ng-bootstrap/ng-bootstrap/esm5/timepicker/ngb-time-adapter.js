import { __decorate, __extends } from "tslib";
import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
var NgbTimeAdapter = /** @class */ (function () {
    function NgbTimeAdapter() {
    }
    NgbTimeAdapter.ɵprov = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
    NgbTimeAdapter = __decorate([
        Injectable({ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY })
    ], NgbTimeAdapter);
    return NgbTimeAdapter;
}());
export { NgbTimeAdapter };
var NgbTimeStructAdapter = /** @class */ (function (_super) {
    __extends(NgbTimeStructAdapter, _super);
    function NgbTimeStructAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    NgbTimeStructAdapter.prototype.fromModel = function (time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    };
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    NgbTimeStructAdapter.prototype.toModel = function (time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    };
    NgbTimeStructAdapter = __decorate([
        Injectable()
    ], NgbTimeStructAdapter);
    return NgbTimeStructAdapter;
}(NgbTimeAdapter));
export { NgbTimeStructAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci9uZ2ItdGltZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBRXZDLE1BQU0sVUFBVSxtQ0FBbUM7SUFDakQsT0FBTyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUVIO0lBQUE7S0FVQzs7SUFWcUIsY0FBYztRQURuQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsRUFBQyxDQUFDO09BQzVELGNBQWMsQ0FVbkM7eUJBaENEO0NBZ0NDLEFBVkQsSUFVQztTQVZxQixjQUFjO0FBYXBDO0lBQTBDLHdDQUE2QjtJQUF2RTs7SUFrQkEsQ0FBQztJQWpCQzs7T0FFRztJQUNILHdDQUFTLEdBQVQsVUFBVSxJQUEwQjtRQUNsQyxPQUFPLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBTyxHQUFQLFVBQVEsSUFBMEI7UUFDaEMsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLElBQUksRUFBQyxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDO0lBQ1gsQ0FBQztJQWpCVSxvQkFBb0I7UUFEaEMsVUFBVSxFQUFFO09BQ0Esb0JBQW9CLENBa0JoQztJQUFELDJCQUFDO0NBQUEsQUFsQkQsQ0FBMEMsY0FBYyxHQWtCdkQ7U0FsQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiVGltZVN0cnVjdH0gZnJvbSAnLi9uZ2ItdGltZS1zdHJ1Y3QnO1xuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9USU1FX0FEQVBURVJfRkFDVE9SWSgpIHtcbiAgcmV0dXJuIG5ldyBOZ2JUaW1lU3RydWN0QWRhcHRlcigpO1xufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IHNlcnZpY2UgdGhhdCBkb2VzIHRoZSBjb252ZXJzaW9uIGJldHdlZW4gdGhlIGludGVybmFsIHRpbWVwaWNrZXIgYE5nYlRpbWVTdHJ1Y3RgIG1vZGVsIGFuZFxuICogYW55IHByb3ZpZGVkIHVzZXIgdGltZSBtb2RlbCBgVGAsIGV4LiBhIHN0cmluZywgYSBuYXRpdmUgZGF0ZSwgZXRjLlxuICpcbiAqIFRoZSBhZGFwdGVyIGlzIHVzZWQgKipvbmx5KiogZm9yIGNvbnZlcnNpb24gd2hlbiBiaW5kaW5nIHRpbWVwaWNrZXIgdG8gYSBmb3JtIGNvbnRyb2wsXG4gKiBleC4gYFsobmdNb2RlbCldPVwidXNlclRpbWVNb2RlbFwiYC4gSGVyZSBgdXNlclRpbWVNb2RlbGAgY2FuIGJlIG9mIGFueSB0eXBlLlxuICpcbiAqIFRoZSBkZWZhdWx0IHRpbWVwaWNrZXIgaW1wbGVtZW50YXRpb24gYXNzdW1lcyB3ZSB1c2UgYE5nYlRpbWVTdHJ1Y3RgIGFzIGEgdXNlciBtb2RlbC5cbiAqXG4gKiBTZWUgdGhlIFtjdXN0b20gdGltZSBhZGFwdGVyIGRlbW9dKCMvY29tcG9uZW50cy90aW1lcGlja2VyL2V4YW1wbGVzI2FkYXB0ZXIpIGZvciBhbiBleGFtcGxlLlxuICpcbiAqIEBzaW5jZSAyLjIuMFxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9USU1FX0FEQVBURVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiVGltZUFkYXB0ZXI8VD4ge1xuICAvKipcbiAgICogQ29udmVydHMgYSB1c2VyLW1vZGVsIHRpbWUgb2YgdHlwZSBgVGAgdG8gYW4gYE5nYlRpbWVTdHJ1Y3RgIGZvciBpbnRlcm5hbCB1c2UuXG4gICAqL1xuICBhYnN0cmFjdCBmcm9tTW9kZWwodmFsdWU6IFQgfCBudWxsKTogTmdiVGltZVN0cnVjdCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIGludGVybmFsIGBOZ2JUaW1lU3RydWN0YCB0aW1lIHRvIGEgdXNlci1tb2RlbCB0aW1lIG9mIHR5cGUgYFRgLlxuICAgKi9cbiAgYWJzdHJhY3QgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0IHwgbnVsbCk6IFQgfCBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiVGltZVN0cnVjdEFkYXB0ZXIgZXh0ZW5kcyBOZ2JUaW1lQWRhcHRlcjxOZ2JUaW1lU3RydWN0PiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXG4gICAqL1xuICBmcm9tTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCB8IG51bGwpOiBOZ2JUaW1lU3RydWN0IHwgbnVsbCB7XG4gICAgcmV0dXJuICh0aW1lICYmIGlzSW50ZWdlcih0aW1lLmhvdXIpICYmIGlzSW50ZWdlcih0aW1lLm1pbnV0ZSkpID9cbiAgICAgICAge2hvdXI6IHRpbWUuaG91ciwgbWludXRlOiB0aW1lLm1pbnV0ZSwgc2Vjb25kOiBpc0ludGVnZXIodGltZS5zZWNvbmQpID8gdGltZS5zZWNvbmQgOiA8YW55Pm51bGx9IDpcbiAgICAgICAgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXG4gICAqL1xuICB0b01vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QgfCBudWxsKTogTmdiVGltZVN0cnVjdCB8IG51bGwge1xuICAgIHJldHVybiAodGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpKSA/XG4gICAgICAgIHtob3VyOiB0aW1lLmhvdXIsIG1pbnV0ZTogdGltZS5taW51dGUsIHNlY29uZDogaXNJbnRlZ2VyKHRpbWUuc2Vjb25kKSA/IHRpbWUuc2Vjb25kIDogPGFueT5udWxsfSA6XG4gICAgICAgIG51bGw7XG4gIH1cbn1cbiJdfQ==