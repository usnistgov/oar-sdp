import { isInteger } from '../util/util';
/**
 * A simple class that represents a date that datepicker also uses internally.
 *
 * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
 * like `.equals()`, `.before()`, etc.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * In many cases it is simpler to manipulate these objects together with
 * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 *
 * @since 3.0.0
 */
var NgbDate = /** @class */ (function () {
    function NgbDate(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     */
    NgbDate.from = function (date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    };
    /**
     * Checks if the current date is equal to another date.
     */
    NgbDate.prototype.equals = function (other) {
        return other != null && this.year === other.year && this.month === other.month && this.day === other.day;
    };
    /**
     * Checks if the current date is before another date.
     */
    NgbDate.prototype.before = function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    };
    /**
     * Checks if the current date is after another date.
     */
    NgbDate.prototype.after = function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    };
    return NgbDate;
}());
export { NgbDate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvbmdiLWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNIO0lBOEJFLGlCQUFZLElBQVksRUFBRSxLQUFhLEVBQUUsR0FBVztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQU0sSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBbEJEOzs7Ozs7T0FNRztJQUNJLFlBQUksR0FBWCxVQUFZLElBQTJCO1FBQ3JDLElBQUksSUFBSSxZQUFZLE9BQU8sRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNwRSxDQUFDO0lBUUQ7O09BRUc7SUFDSCx3QkFBTSxHQUFOLFVBQU8sS0FBNEI7UUFDakMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNHLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUFNLEdBQU4sVUFBTyxLQUE0QjtRQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDakM7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBSyxHQUFMLFVBQU0sS0FBNEI7UUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBL0VELElBK0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBBIHNpbXBsZSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBkYXRlIHRoYXQgZGF0ZXBpY2tlciBhbHNvIHVzZXMgaW50ZXJuYWxseS5cbiAqXG4gKiBJdCBpcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGBOZ2JEYXRlU3RydWN0YCBpbnRlcmZhY2UgdGhhdCBhZGRzIHNvbWUgY29udmVuaWVuY2UgbWV0aG9kcyxcbiAqIGxpa2UgYC5lcXVhbHMoKWAsIGAuYmVmb3JlKClgLCBldGMuXG4gKlxuICogQWxsIGRhdGVwaWNrZXIgQVBJcyBjb25zdW1lIGBOZ2JEYXRlU3RydWN0YCwgYnV0IHJldHVybiBgTmdiRGF0ZWAuXG4gKlxuICogSW4gbWFueSBjYXNlcyBpdCBpcyBzaW1wbGVyIHRvIG1hbmlwdWxhdGUgdGhlc2Ugb2JqZWN0cyB0b2dldGhlciB3aXRoXG4gKiBbYE5nYkNhbGVuZGFyYF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkNhbGVuZGFyKSB0aGFuIG5hdGl2ZSBKUyBEYXRlcy5cbiAqXG4gKiBTZWUgdGhlIFtkYXRlIGZvcm1hdCBvdmVydmlld10oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvb3ZlcnZpZXcjZGF0ZS1tb2RlbCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc2luY2UgMy4wLjBcbiAqL1xuZXhwb3J0IGNsYXNzIE5nYkRhdGUgaW1wbGVtZW50cyBOZ2JEYXRlU3RydWN0IHtcbiAgLyoqXG4gICAqIFRoZSB5ZWFyLCBmb3IgZXhhbXBsZSAyMDE2XG4gICAqL1xuICB5ZWFyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCwgZm9yIGV4YW1wbGUgMT1KYW4gLi4uIDEyPURlYyBhcyBpbiBJU08gODYwMVxuICAgKi9cbiAgbW9udGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGRheSBvZiBtb250aCwgc3RhcnRpbmcgd2l0aCAxXG4gICAqL1xuICBkYXk6IG51bWJlcjtcblxuICAvKipcbiAgICogQSAqKnN0YXRpYyBtZXRob2QqKiB0aGF0IGNyZWF0ZXMgYSBuZXcgZGF0ZSBvYmplY3QgZnJvbSB0aGUgYE5nYkRhdGVTdHJ1Y3RgLFxuICAgKlxuICAgKiBleC4gYE5nYkRhdGUuZnJvbSh7eWVhcjogMjAwMCwgbW9udGg6IDUsIGRheTogMX0pYC5cbiAgICpcbiAgICogSWYgdGhlIGBkYXRlYCBpcyBhbHJlYWR5IG9mIGBOZ2JEYXRlYCB0eXBlLCB0aGUgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBzYW1lIG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyBmcm9tKGRhdGU/OiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IE5nYkRhdGUgfCBudWxsIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIE5nYkRhdGUpIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZSA/IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpIHtcbiAgICB0aGlzLnllYXIgPSBpc0ludGVnZXIoeWVhcikgPyB5ZWFyIDogPGFueT5udWxsO1xuICAgIHRoaXMubW9udGggPSBpc0ludGVnZXIobW9udGgpID8gbW9udGggOiA8YW55Pm51bGw7XG4gICAgdGhpcy5kYXkgPSBpc0ludGVnZXIoZGF5KSA/IGRheSA6IDxhbnk+bnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgZGF0ZSBpcyBlcXVhbCB0byBhbm90aGVyIGRhdGUuXG4gICAqL1xuICBlcXVhbHMob3RoZXI/OiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvdGhlciAhPSBudWxsICYmIHRoaXMueWVhciA9PT0gb3RoZXIueWVhciAmJiB0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCAmJiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBkYXRlIGlzIGJlZm9yZSBhbm90aGVyIGRhdGUuXG4gICAqL1xuICBiZWZvcmUob3RoZXI/OiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIGlmICghb3RoZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5ID09PSBvdGhlci5kYXkgPyBmYWxzZSA6IHRoaXMuZGF5IDwgb3RoZXIuZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPCBvdGhlci5tb250aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMueWVhciA8IG90aGVyLnllYXI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBkYXRlIGlzIGFmdGVyIGFub3RoZXIgZGF0ZS5cbiAgICovXG4gIGFmdGVyKG90aGVyPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBib29sZWFuIHtcbiAgICBpZiAoIW90aGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLnllYXIgPT09IG90aGVyLnllYXIpIHtcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXkgPT09IG90aGVyLmRheSA/IGZhbHNlIDogdGhpcy5kYXkgPiBvdGhlci5kYXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA+IG90aGVyLm1vbnRoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy55ZWFyID4gb3RoZXIueWVhcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==