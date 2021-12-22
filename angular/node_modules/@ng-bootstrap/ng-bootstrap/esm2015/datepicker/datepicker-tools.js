/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgbDate } from './ngb-date';
import { isDefined } from '../util/util';
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
export function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
export function isChangedMonth(prev, next) {
    return !prev && !next ? false : !prev || !next ? true : prev.year !== next.year || prev.month !== next.month;
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
export function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
/**
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
    }
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} state
 * @return {?}
 */
export function isDateSelectable(date, state) {
    const { minDate, maxDate, disabled, markDisabled } = state;
    // clang-format off
    return !(!isDefined(date) ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
    // clang-format on
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    let months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        /** @type {?} */
        const index = months.findIndex((/**
         * @param {?} month
         * @return {?}
         */
        month => month === minDate.month));
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        /** @type {?} */
        const index = months.findIndex((/**
         * @param {?} month
         * @return {?}
         */
        month => month === maxDate.month));
        months = months.slice(0, index + 1);
    }
    return months;
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    const start = minDate ? Math.max(minDate.year, date.year - 500) : date.year - 10;
    /** @type {?} */
    const end = maxDate ? Math.min(maxDate.year, date.year + 500) : date.year + 10;
    /** @type {?} */
    const length = end - start + 1;
    /** @type {?} */
    const numbers = Array(length);
    for (let i = 0; i < length; i++) {
        numbers[i] = start + i;
    }
    return numbers;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} maxDate
 * @return {?}
 */
export function nextMonthDisabled(calendar, date, maxDate) {
    /** @type {?} */
    const nextDate = Object.assign(calendar.getNext(date, 'm'), { day: 1 });
    return maxDate && nextDate.after(maxDate);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @return {?}
 */
export function prevMonthDisabled(calendar, date, minDate) {
    /** @type {?} */
    const prevDate = Object.assign(calendar.getPrev(date, 'm'), { day: 1 });
    return minDate && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
        prevDate.year < minDate.year && minDate.month === 1);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?} force
 * @return {?}
 */
export function buildMonths(calendar, date, state, i18n, force) {
    const { displayMonths, months } = state;
    // move old months to a temporary array
    /** @type {?} */
    const monthsToReuse = months.splice(0, months.length);
    // generate new first dates, nullify or reuse months
    /** @type {?} */
    const firstDates = Array.from({ length: displayMonths }, (/**
     * @param {?} _
     * @param {?} i
     * @return {?}
     */
    (_, i) => {
        /** @type {?} */
        const firstDate = Object.assign(calendar.getNext(date, 'm', i), { day: 1 });
        months[i] = null;
        if (!force) {
            /** @type {?} */
            const reusedIndex = monthsToReuse.findIndex((/**
             * @param {?} month
             * @return {?}
             */
            month => month.firstDate.equals(firstDate)));
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    }));
    // rebuild nullified months
    firstDates.forEach((/**
     * @param {?} firstDate
     * @param {?} i
     * @return {?}
     */
    (firstDate, i) => {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || (/** @type {?} */ ({})));
        }
    }));
    return months;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?=} month
 * @return {?}
 */
export function buildMonth(calendar, date, state, i18n, month = (/** @type {?} */ ({}))) {
    const { dayTemplateData, minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays } = state;
    /** @type {?} */
    const calendarToday = calendar.getToday();
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // month has weeks
    for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
        /** @type {?} */
        let weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        /** @type {?} */
        const days = weekObject.days;
        // week has days
        for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0) {
                month.weekdays[day] = calendar.getWeekday(date);
            }
            /** @type {?} */
            const newDate = new NgbDate(date.year, date.month, date.day);
            /** @type {?} */
            const nextDate = calendar.getNext(newDate);
            /** @type {?} */
            const ariaLabel = i18n.getDayAriaLabel(newDate);
            // marking date as disabled
            /** @type {?} */
            let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // today
            /** @type {?} */
            let today = newDate.equals(calendarToday);
            // adding user-provided data to the context
            /** @type {?} */
            let contextUserData = dayTemplateData ? dayTemplateData(newDate, { month: month.number, year: month.year }) : undefined;
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            /** @type {?} */
            let dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = (/** @type {?} */ ({}));
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, {
                $implicit: newDate,
                date: newDate,
                data: contextUserData,
                currentMonth: month.number,
                currentYear: month.year, disabled,
                focused: false,
                selected: false, today
            });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map((/**
         * @param {?} day
         * @return {?}
         */
        day => day.date)), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
            days[days.length - 1].date.month !== month.number;
    }
    return month;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} firstDayOfWeek
 * @return {?}
 */
export function getFirstViewDate(calendar, date, firstDayOfWeek) {
    /** @type {?} */
    const daysPerWeek = calendar.getDaysPerWeek();
    /** @type {?} */
    const firstMonthDate = new NgbDate(date.year, date.month, 1);
    /** @type {?} */
    const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b29scy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLXRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBR25DLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQUd2QyxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQWEsRUFBRSxJQUFhO0lBQ3hELE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBYSxFQUFFLElBQWE7SUFDekQsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQy9HLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBYSxFQUFFLElBQWE7SUFDekQsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFnQixFQUFFLE9BQWdCO0lBQ2xFLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxPQUFPLHFDQUFxQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3JGO0FBQ0gsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFhLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQjtJQUNoRixJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQyxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUNELElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFDLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBYSxFQUFFLEtBQTBCO1VBQ2xFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLEdBQUcsS0FBSztJQUN4RCxtQkFBbUI7SUFDbkIsT0FBTyxDQUFDLENBQ04sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2hCLFFBQVE7UUFDUixDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUNqQyxDQUFDO0lBQ0Ysa0JBQWtCO0FBQ3BCLENBQUM7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFFBQXFCLEVBQUUsSUFBYSxFQUFFLE9BQWdCLEVBQUUsT0FBZ0I7SUFDOUcsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1FBRUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUUxQyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7O2NBQ25DLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUM7UUFDaEUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7SUFFRCxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7O2NBQ25DLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUM7UUFDaEUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsSUFBYSxFQUFFLE9BQWdCLEVBQUUsT0FBZ0I7SUFDdEYsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1VBRUssS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTs7VUFDMUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTs7VUFFeEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQzs7VUFDeEIsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztLQUN4QjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsUUFBcUIsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7O1VBQ2hGLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQ3JFLE9BQU8sT0FBTyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUMsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFxQixFQUFFLElBQWEsRUFBRSxPQUFnQjs7VUFDaEYsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUM7SUFDckUsT0FBTyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSztRQUNoRSxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDOzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUN2QixRQUFxQixFQUFFLElBQWEsRUFBRSxLQUEwQixFQUFFLElBQXVCLEVBQ3pGLEtBQWM7VUFDVixFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsR0FBRyxLQUFLOzs7VUFFL0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7OztVQUcvQyxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUM7Ozs7O0lBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2NBQ3hELFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUN6RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQyxLQUFLLEVBQUU7O2tCQUNKLFdBQVcsR0FBRyxhQUFhLENBQUMsU0FBUzs7OztZQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUM7WUFDdkYsbUNBQW1DO1lBQ25DLElBQUksV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckQ7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsRUFBQztJQUVGLDJCQUEyQjtJQUMzQixVQUFVLENBQUMsT0FBTzs7Ozs7SUFBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLG1CQUFBLEVBQUUsRUFBa0IsQ0FBQyxDQUFDO1NBQ3pHO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUN0QixRQUFxQixFQUFFLElBQWEsRUFBRSxLQUEwQixFQUFFLElBQXVCLEVBQ3pGLFFBQXdCLG1CQUFBLEVBQUUsRUFBa0I7VUFDeEMsRUFBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBQyxHQUFHLEtBQUs7O1VBQ3RGLGFBQWEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFO0lBRXpDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMxQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBRXRDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRXhELGtCQUFrQjtJQUNsQixLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7O1lBQ3pELFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDO1NBQ3pFOztjQUNLLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSTtRQUU1QixnQkFBZ0I7UUFDaEIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN4RCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pEOztrQkFFSyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7O2tCQUN0RCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7O2tCQUVwQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7OztnQkFHM0MsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxZQUFZLEVBQUU7Z0JBQzdCLFFBQVEsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQzNFOzs7Z0JBR0csS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDOzs7Z0JBR3JDLGVBQWUsR0FDZixlQUFlLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFFbkcsaUNBQWlDO1lBQ2pDLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUM5RCxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzthQUMzQjtZQUVELGdDQUFnQztZQUNoQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JFLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQzFCOztnQkFFRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQUEsRUFBRSxFQUFnQixDQUFDO2FBQzVDO1lBQ0QsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDekIsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFO2dCQUN6RCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDMUIsV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUTtnQkFDakMsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLO2FBQ3ZCLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDaEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFekIsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUNqQjtRQUVELFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXRGLDRCQUE0QjtRQUM1QixVQUFVLENBQUMsU0FBUyxHQUFHLFdBQVcsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU07WUFDckYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDO0tBQ3ZEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFFBQXFCLEVBQUUsSUFBYSxFQUFFLGNBQXNCOztVQUNyRixXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRTs7VUFDdkMsY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7O1VBQ3RELFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVc7SUFDbkUsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0FBQ3pHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBEYXlWaWV3TW9kZWwsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhbmdlZERhdGUocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xuICByZXR1cm4gIWRhdGVDb21wYXJhdG9yKHByZXYsIG5leHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDaGFuZ2VkTW9udGgocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xuICByZXR1cm4gIXByZXYgJiYgIW5leHQgPyBmYWxzZSA6ICFwcmV2IHx8ICFuZXh0ID8gdHJ1ZSA6IHByZXYueWVhciAhPT0gbmV4dC55ZWFyIHx8IHByZXYubW9udGggIT09IG5leHQubW9udGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRlQ29tcGFyYXRvcihwcmV2OiBOZ2JEYXRlLCBuZXh0OiBOZ2JEYXRlKSB7XG4gIHJldHVybiAoIXByZXYgJiYgIW5leHQpIHx8ICghIXByZXYgJiYgISFuZXh0ICYmIHByZXYuZXF1YWxzKG5leHQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTWluQmVmb3JlTWF4KG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcbiAgaWYgKG1heERhdGUgJiYgbWluRGF0ZSAmJiBtYXhEYXRlLmJlZm9yZShtaW5EYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJ21heERhdGUnICR7bWF4RGF0ZX0gc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAnbWluRGF0ZScgJHttaW5EYXRlfWApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RhdGVJblJhbmdlKGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHtcbiAgaWYgKGRhdGUgJiYgbWluRGF0ZSAmJiBkYXRlLmJlZm9yZShtaW5EYXRlKSkge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG4gIGlmIChkYXRlICYmIG1heERhdGUgJiYgZGF0ZS5hZnRlcihtYXhEYXRlKSkge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG5cbiAgcmV0dXJuIGRhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVTZWxlY3RhYmxlKGRhdGU6IE5nYkRhdGUsIHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XG4gIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBkaXNhYmxlZCwgbWFya0Rpc2FibGVkfSA9IHN0YXRlO1xuICAvLyBjbGFuZy1mb3JtYXQgb2ZmXG4gIHJldHVybiAhKFxuICAgICFpc0RlZmluZWQoZGF0ZSkgfHxcbiAgICBkaXNhYmxlZCB8fFxuICAgIChtYXJrRGlzYWJsZWQgJiYgbWFya0Rpc2FibGVkKGRhdGUsIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRofSkpIHx8XG4gICAgKG1pbkRhdGUgJiYgZGF0ZS5iZWZvcmUobWluRGF0ZSkpIHx8XG4gICAgKG1heERhdGUgJiYgZGF0ZS5hZnRlcihtYXhEYXRlKSlcbiAgKTtcbiAgLy8gY2xhbmctZm9ybWF0IG9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyhjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcbiAgaWYgKCFkYXRlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgbGV0IG1vbnRocyA9IGNhbGVuZGFyLmdldE1vbnRocyhkYXRlLnllYXIpO1xuXG4gIGlmIChtaW5EYXRlICYmIGRhdGUueWVhciA9PT0gbWluRGF0ZS55ZWFyKSB7XG4gICAgY29uc3QgaW5kZXggPSBtb250aHMuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoID09PSBtaW5EYXRlLm1vbnRoKTtcbiAgICBtb250aHMgPSBtb250aHMuc2xpY2UoaW5kZXgpO1xuICB9XG5cbiAgaWYgKG1heERhdGUgJiYgZGF0ZS55ZWFyID09PSBtYXhEYXRlLnllYXIpIHtcbiAgICBjb25zdCBpbmRleCA9IG1vbnRocy5maW5kSW5kZXgobW9udGggPT4gbW9udGggPT09IG1heERhdGUubW9udGgpO1xuICAgIG1vbnRocyA9IG1vbnRocy5zbGljZSgwLCBpbmRleCArIDEpO1xuICB9XG5cbiAgcmV0dXJuIG1vbnRocztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMoZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xuICBpZiAoIWRhdGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBzdGFydCA9IG1pbkRhdGUgPyBNYXRoLm1heChtaW5EYXRlLnllYXIsIGRhdGUueWVhciAtIDUwMCkgOiBkYXRlLnllYXIgLSAxMDtcbiAgY29uc3QgZW5kID0gbWF4RGF0ZSA/IE1hdGgubWluKG1heERhdGUueWVhciwgZGF0ZS55ZWFyICsgNTAwKSA6IGRhdGUueWVhciArIDEwO1xuXG4gIGNvbnN0IGxlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMTtcbiAgY29uc3QgbnVtYmVycyA9IEFycmF5KGxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBudW1iZXJzW2ldID0gc3RhcnQgKyBpO1xuICB9XG5cbiAgcmV0dXJuIG51bWJlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0TW9udGhEaXNhYmxlZChjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcbiAgY29uc3QgbmV4dERhdGUgPSBPYmplY3QuYXNzaWduKGNhbGVuZGFyLmdldE5leHQoZGF0ZSwgJ20nKSwge2RheTogMX0pO1xuICByZXR1cm4gbWF4RGF0ZSAmJiBuZXh0RGF0ZS5hZnRlcihtYXhEYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZNb250aERpc2FibGVkKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSkge1xuICBjb25zdCBwcmV2RGF0ZSA9IE9iamVjdC5hc3NpZ24oY2FsZW5kYXIuZ2V0UHJldihkYXRlLCAnbScpLCB7ZGF5OiAxfSk7XG4gIHJldHVybiBtaW5EYXRlICYmIChwcmV2RGF0ZS55ZWFyID09PSBtaW5EYXRlLnllYXIgJiYgcHJldkRhdGUubW9udGggPCBtaW5EYXRlLm1vbnRoIHx8XG4gICAgICAgICAgICAgICAgICAgICBwcmV2RGF0ZS55ZWFyIDwgbWluRGF0ZS55ZWFyICYmIG1pbkRhdGUubW9udGggPT09IDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb250aHMoXG4gICAgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCwgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXG4gICAgZm9yY2U6IGJvb2xlYW4pOiBNb250aFZpZXdNb2RlbFtdIHtcbiAgY29uc3Qge2Rpc3BsYXlNb250aHMsIG1vbnRoc30gPSBzdGF0ZTtcbiAgLy8gbW92ZSBvbGQgbW9udGhzIHRvIGEgdGVtcG9yYXJ5IGFycmF5XG4gIGNvbnN0IG1vbnRoc1RvUmV1c2UgPSBtb250aHMuc3BsaWNlKDAsIG1vbnRocy5sZW5ndGgpO1xuXG4gIC8vIGdlbmVyYXRlIG5ldyBmaXJzdCBkYXRlcywgbnVsbGlmeSBvciByZXVzZSBtb250aHNcbiAgY29uc3QgZmlyc3REYXRlcyA9IEFycmF5LmZyb20oe2xlbmd0aDogZGlzcGxheU1vbnRoc30sIChfLCBpKSA9PiB7XG4gICAgY29uc3QgZmlyc3REYXRlID0gT2JqZWN0LmFzc2lnbihjYWxlbmRhci5nZXROZXh0KGRhdGUsICdtJywgaSksIHtkYXk6IDF9KTtcbiAgICBtb250aHNbaV0gPSBudWxsO1xuXG4gICAgaWYgKCFmb3JjZSkge1xuICAgICAgY29uc3QgcmV1c2VkSW5kZXggPSBtb250aHNUb1JldXNlLmZpbmRJbmRleChtb250aCA9PiBtb250aC5maXJzdERhdGUuZXF1YWxzKGZpcnN0RGF0ZSkpO1xuICAgICAgLy8gbW92ZSByZXVzZWQgbW9udGggYmFjayB0byBtb250aHNcbiAgICAgIGlmIChyZXVzZWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgbW9udGhzW2ldID0gbW9udGhzVG9SZXVzZS5zcGxpY2UocmV1c2VkSW5kZXgsIDEpWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaXJzdERhdGU7XG4gIH0pO1xuXG4gIC8vIHJlYnVpbGQgbnVsbGlmaWVkIG1vbnRoc1xuICBmaXJzdERhdGVzLmZvckVhY2goKGZpcnN0RGF0ZSwgaSkgPT4ge1xuICAgIGlmIChtb250aHNbaV0gPT09IG51bGwpIHtcbiAgICAgIG1vbnRoc1tpXSA9IGJ1aWxkTW9udGgoY2FsZW5kYXIsIGZpcnN0RGF0ZSwgc3RhdGUsIGkxOG4sIG1vbnRoc1RvUmV1c2Uuc2hpZnQoKSB8fCB7fSBhcyBNb250aFZpZXdNb2RlbCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbW9udGhzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb250aChcbiAgICBjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsLCBpMThuOiBOZ2JEYXRlcGlja2VySTE4bixcbiAgICBtb250aDogTW9udGhWaWV3TW9kZWwgPSB7fSBhcyBNb250aFZpZXdNb2RlbCk6IE1vbnRoVmlld01vZGVsIHtcbiAgY29uc3Qge2RheVRlbXBsYXRlRGF0YSwgbWluRGF0ZSwgbWF4RGF0ZSwgZmlyc3REYXlPZldlZWssIG1hcmtEaXNhYmxlZCwgb3V0c2lkZURheXN9ID0gc3RhdGU7XG4gIGNvbnN0IGNhbGVuZGFyVG9kYXkgPSBjYWxlbmRhci5nZXRUb2RheSgpO1xuXG4gIG1vbnRoLmZpcnN0RGF0ZSA9IG51bGw7XG4gIG1vbnRoLmxhc3REYXRlID0gbnVsbDtcbiAgbW9udGgubnVtYmVyID0gZGF0ZS5tb250aDtcbiAgbW9udGgueWVhciA9IGRhdGUueWVhcjtcbiAgbW9udGgud2Vla3MgPSBtb250aC53ZWVrcyB8fCBbXTtcbiAgbW9udGgud2Vla2RheXMgPSBtb250aC53ZWVrZGF5cyB8fCBbXTtcblxuICBkYXRlID0gZ2V0Rmlyc3RWaWV3RGF0ZShjYWxlbmRhciwgZGF0ZSwgZmlyc3REYXlPZldlZWspO1xuXG4gIC8vIG1vbnRoIGhhcyB3ZWVrc1xuICBmb3IgKGxldCB3ZWVrID0gMDsgd2VlayA8IGNhbGVuZGFyLmdldFdlZWtzUGVyTW9udGgoKTsgd2VlaysrKSB7XG4gICAgbGV0IHdlZWtPYmplY3QgPSBtb250aC53ZWVrc1t3ZWVrXTtcbiAgICBpZiAoIXdlZWtPYmplY3QpIHtcbiAgICAgIHdlZWtPYmplY3QgPSBtb250aC53ZWVrc1t3ZWVrXSA9IHtudW1iZXI6IDAsIGRheXM6IFtdLCBjb2xsYXBzZWQ6IHRydWV9O1xuICAgIH1cbiAgICBjb25zdCBkYXlzID0gd2Vla09iamVjdC5kYXlzO1xuXG4gICAgLy8gd2VlayBoYXMgZGF5c1xuICAgIGZvciAobGV0IGRheSA9IDA7IGRheSA8IGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCk7IGRheSsrKSB7XG4gICAgICBpZiAod2VlayA9PT0gMCkge1xuICAgICAgICBtb250aC53ZWVrZGF5c1tkYXldID0gY2FsZW5kYXIuZ2V0V2Vla2RheShkYXRlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3RGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpO1xuICAgICAgY29uc3QgbmV4dERhdGUgPSBjYWxlbmRhci5nZXROZXh0KG5ld0RhdGUpO1xuXG4gICAgICBjb25zdCBhcmlhTGFiZWwgPSBpMThuLmdldERheUFyaWFMYWJlbChuZXdEYXRlKTtcblxuICAgICAgLy8gbWFya2luZyBkYXRlIGFzIGRpc2FibGVkXG4gICAgICBsZXQgZGlzYWJsZWQgPSAhISgobWluRGF0ZSAmJiBuZXdEYXRlLmJlZm9yZShtaW5EYXRlKSkgfHwgKG1heERhdGUgJiYgbmV3RGF0ZS5hZnRlcihtYXhEYXRlKSkpO1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBtYXJrRGlzYWJsZWQpIHtcbiAgICAgICAgZGlzYWJsZWQgPSBtYXJrRGlzYWJsZWQobmV3RGF0ZSwge21vbnRoOiBtb250aC5udW1iZXIsIHllYXI6IG1vbnRoLnllYXJ9KTtcbiAgICAgIH1cblxuICAgICAgLy8gdG9kYXlcbiAgICAgIGxldCB0b2RheSA9IG5ld0RhdGUuZXF1YWxzKGNhbGVuZGFyVG9kYXkpO1xuXG4gICAgICAvLyBhZGRpbmcgdXNlci1wcm92aWRlZCBkYXRhIHRvIHRoZSBjb250ZXh0XG4gICAgICBsZXQgY29udGV4dFVzZXJEYXRhID1cbiAgICAgICAgICBkYXlUZW1wbGF0ZURhdGEgPyBkYXlUZW1wbGF0ZURhdGEobmV3RGF0ZSwge21vbnRoOiBtb250aC5udW1iZXIsIHllYXI6IG1vbnRoLnllYXJ9KSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gc2F2aW5nIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXG4gICAgICBpZiAobW9udGguZmlyc3REYXRlID09PSBudWxsICYmIG5ld0RhdGUubW9udGggPT09IG1vbnRoLm51bWJlcikge1xuICAgICAgICBtb250aC5maXJzdERhdGUgPSBuZXdEYXRlO1xuICAgICAgfVxuXG4gICAgICAvLyBzYXZpbmcgbGFzdCBkYXRlIG9mIHRoZSBtb250aFxuICAgICAgaWYgKG5ld0RhdGUubW9udGggPT09IG1vbnRoLm51bWJlciAmJiBuZXh0RGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyKSB7XG4gICAgICAgIG1vbnRoLmxhc3REYXRlID0gbmV3RGF0ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IGRheU9iamVjdCA9IGRheXNbZGF5XTtcbiAgICAgIGlmICghZGF5T2JqZWN0KSB7XG4gICAgICAgIGRheU9iamVjdCA9IGRheXNbZGF5XSA9IHt9IGFzIERheVZpZXdNb2RlbDtcbiAgICAgIH1cbiAgICAgIGRheU9iamVjdC5kYXRlID0gbmV3RGF0ZTtcbiAgICAgIGRheU9iamVjdC5jb250ZXh0ID0gT2JqZWN0LmFzc2lnbihkYXlPYmplY3QuY29udGV4dCB8fCB7fSwge1xuICAgICAgICAkaW1wbGljaXQ6IG5ld0RhdGUsXG4gICAgICAgIGRhdGU6IG5ld0RhdGUsXG4gICAgICAgIGRhdGE6IGNvbnRleHRVc2VyRGF0YSxcbiAgICAgICAgY3VycmVudE1vbnRoOiBtb250aC5udW1iZXIsXG4gICAgICAgIGN1cnJlbnRZZWFyOiBtb250aC55ZWFyLCBkaXNhYmxlZCxcbiAgICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSwgdG9kYXlcbiAgICAgIH0pO1xuICAgICAgZGF5T2JqZWN0LnRhYmluZGV4ID0gLTE7XG4gICAgICBkYXlPYmplY3QuYXJpYUxhYmVsID0gYXJpYUxhYmVsO1xuICAgICAgZGF5T2JqZWN0LmhpZGRlbiA9IGZhbHNlO1xuXG4gICAgICBkYXRlID0gbmV4dERhdGU7XG4gICAgfVxuXG4gICAgd2Vla09iamVjdC5udW1iZXIgPSBjYWxlbmRhci5nZXRXZWVrTnVtYmVyKGRheXMubWFwKGRheSA9PiBkYXkuZGF0ZSksIGZpcnN0RGF5T2ZXZWVrKTtcblxuICAgIC8vIG1hcmtpbmcgd2VlayBhcyBjb2xsYXBzZWRcbiAgICB3ZWVrT2JqZWN0LmNvbGxhcHNlZCA9IG91dHNpZGVEYXlzID09PSAnY29sbGFwc2VkJyAmJiBkYXlzWzBdLmRhdGUubW9udGggIT09IG1vbnRoLm51bWJlciAmJlxuICAgICAgICBkYXlzW2RheXMubGVuZ3RoIC0gMV0uZGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyO1xuICB9XG5cbiAgcmV0dXJuIG1vbnRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RWaWV3RGF0ZShjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgY29uc3QgZGF5c1BlcldlZWsgPSBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpO1xuICBjb25zdCBmaXJzdE1vbnRoRGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMSk7XG4gIGNvbnN0IGRheU9mV2VlayA9IGNhbGVuZGFyLmdldFdlZWtkYXkoZmlyc3RNb250aERhdGUpICUgZGF5c1BlcldlZWs7XG4gIHJldHVybiBjYWxlbmRhci5nZXRQcmV2KGZpcnN0TW9udGhEYXRlLCAnZCcsIChkYXlzUGVyV2VlayArIGRheU9mV2VlayAtIGZpcnN0RGF5T2ZXZWVrKSAlIGRheXNQZXJXZWVrKTtcbn1cbiJdfQ==