import { __decorate, __extends } from "tslib";
import { padNumber, toInteger, isNumber } from '../util/util';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
var NgbDateParserFormatter = /** @class */ (function () {
    function NgbDateParserFormatter() {
    }
    NgbDateParserFormatter.ɵprov = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
    NgbDateParserFormatter = __decorate([
        Injectable({ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY })
    ], NgbDateParserFormatter);
    return NgbDateParserFormatter;
}());
export { NgbDateParserFormatter };
var NgbDateISOParserFormatter = /** @class */ (function (_super) {
    __extends(NgbDateISOParserFormatter, _super);
    function NgbDateISOParserFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgbDateISOParserFormatter.prototype.parse = function (value) {
        if (value != null) {
            var dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    };
    NgbDateISOParserFormatter.prototype.format = function (date) {
        return date ?
            date.year + "-" + (isNumber(date.month) ? padNumber(date.month) : '') + "-" + (isNumber(date.day) ? padNumber(date.day) : '') :
            '';
    };
    NgbDateISOParserFormatter = __decorate([
        Injectable()
    ], NgbDateISOParserFormatter);
    return NgbDateISOParserFormatter;
}(NgbDateParserFormatter));
export { NgbDateISOParserFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFNUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekMsTUFBTSxVQUFVLHVDQUF1QztJQUNyRCxPQUFPLElBQUkseUJBQXlCLEVBQUUsQ0FBQztBQUN6QyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSDtJQUFBO0tBZ0JDOztJQWhCcUIsc0JBQXNCO1FBRDNDLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLHVDQUF1QyxFQUFDLENBQUM7T0FDaEUsc0JBQXNCLENBZ0IzQztpQ0F4Q0Q7Q0F3Q0MsQUFoQkQsSUFnQkM7U0FoQnFCLHNCQUFzQjtBQW1CNUM7SUFBK0MsNkNBQXNCO0lBQXJFOztJQW9CQSxDQUFDO0lBbkJDLHlDQUFLLEdBQUwsVUFBTSxLQUFhO1FBQ2pCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLEVBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQU8sSUFBSSxFQUFFLEdBQUcsRUFBTyxJQUFJLEVBQUMsQ0FBQzthQUMxRTtpQkFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JGLE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFPLElBQUksRUFBQyxDQUFDO2FBQ3hGO2lCQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9HLE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2FBQ3RHO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwwQ0FBTSxHQUFOLFVBQU8sSUFBMEI7UUFDL0IsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLFVBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUM7WUFDdEgsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQW5CVSx5QkFBeUI7UUFEckMsVUFBVSxFQUFFO09BQ0EseUJBQXlCLENBb0JyQztJQUFELGdDQUFDO0NBQUEsQUFwQkQsQ0FBK0Msc0JBQXNCLEdBb0JwRTtTQXBCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhZE51bWJlciwgdG9JbnRlZ2VyLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWSgpIHtcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyKCk7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Qgc2VydmljZSBmb3IgcGFyc2luZyBhbmQgZm9ybWF0dGluZyBkYXRlcyBmb3IgdGhlXG4gKiBbYE5nYklucHV0RGF0ZXBpY2tlcmBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JJbnB1dERhdGVwaWNrZXIpIGRpcmVjdGl2ZS5cbiAqIENvbnZlcnRzIGJldHdlZW4gdGhlIGludGVybmFsIGBOZ2JEYXRlU3RydWN0YCBtb2RlbCBwcmVzZW50YXRpb24gYW5kIGEgYHN0cmluZ2AgdGhhdCBpcyBkaXNwbGF5ZWQgaW4gdGhlXG4gKiBpbnB1dCBlbGVtZW50LlxuICpcbiAqIFdoZW4gdXNlciB0eXBlcyBzb21ldGhpbmcgaW4gdGhlIGlucHV0IHRoaXMgc2VydmljZSBhdHRlbXB0cyB0byBwYXJzZSBpdCBpbnRvIGEgYE5nYkRhdGVTdHJ1Y3RgIG9iamVjdC5cbiAqIEFuZCB2aWNlIHZlcnNhLCB3aGVuIHVzZXJzIHNlbGVjdHMgYSBkYXRlIGluIHRoZSBjYWxlbmRhciB3aXRoIHRoZSBtb3VzZSwgaXQgbXVzdCBiZSBkaXNwbGF5ZWQgYXMgYSBgc3RyaW5nYFxuICogaW4gdGhlIGlucHV0LlxuICpcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyB0aGUgSVNPIDg2MDEgZm9ybWF0LCBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb24gdmlhIERJXG4gKiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgc3RyaW5nIGZvcm1hdCBvciBhIGN1c3RvbSBwYXJzaW5nIGxvZ2ljLlxuICpcbiAqIFNlZSB0aGUgW2RhdGUgZm9ybWF0IG92ZXJ2aWV3XSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9vdmVydmlldyNkYXRlLW1vZGVsKSBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9QQVJTRVJfRk9STUFUVEVSX0ZBQ1RPUll9KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIge1xuICAvKipcbiAgICogUGFyc2VzIHRoZSBnaXZlbiBgc3RyaW5nYCB0byBhbiBgTmdiRGF0ZVN0cnVjdGAuXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxuICAgKiBwYXJ0aWFsLiBUaGV5IG11c3QgcmV0dXJuIGBudWxsYCBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgcGFyc2VkLlxuICAgKi9cbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBGb3JtYXRzIHRoZSBnaXZlbiBgTmdiRGF0ZVN0cnVjdGAgdG8gYSBgc3RyaW5nYC5cbiAgICpcbiAgICogSW1wbGVtZW50YXRpb25zIHNob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBnaXZlbiBkYXRlIGlzIGBudWxsYCxcbiAgICogYW5kIHRyeSB0aGVpciBiZXN0IHRvIHByb3ZpZGUgYSBwYXJ0aWFsIHJlc3VsdCBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBpbmNvbXBsZXRlIG9yIGludmFsaWQuXG4gICAqL1xuICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyIGV4dGVuZHMgTmdiRGF0ZVBhcnNlckZvcm1hdHRlciB7XG4gIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IHZhbHVlLnRyaW0oKS5zcGxpdCgnLScpO1xuICAgICAgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDEgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSkge1xuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogPGFueT5udWxsLCBkYXk6IDxhbnk+bnVsbH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDIgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pKSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiA8YW55Pm51bGx9O1xuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAzICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMl0pKSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiB0b0ludGVnZXIoZGF0ZVBhcnRzWzJdKX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZm9ybWF0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/XG4gICAgICAgIGAke2RhdGUueWVhcn0tJHtpc051bWJlcihkYXRlLm1vbnRoKSA/IHBhZE51bWJlcihkYXRlLm1vbnRoKSA6ICcnfS0ke2lzTnVtYmVyKGRhdGUuZGF5KSA/IHBhZE51bWJlcihkYXRlLmRheSkgOiAnJ31gIDpcbiAgICAgICAgJyc7XG4gIH1cbn1cbiJdfQ==