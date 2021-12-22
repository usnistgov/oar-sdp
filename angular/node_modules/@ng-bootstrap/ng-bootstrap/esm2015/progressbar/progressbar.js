/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
export class NgbProgressbar {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.textType = config.textType;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     * @param {?} max
     * @return {?}
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    /**
     * @return {?}
     */
    get max() { return this._max; }
    /**
     * @return {?}
     */
    getValue() { return getValueInRange(this.value, this.max); }
    /**
     * @return {?}
     */
    getPercentValue() { return 100 * this.getValue() / this.max; }
}
NgbProgressbar.decorators = [
    { type: Component, args: [{
                selector: 'ngb-progressbar',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="progress" [style.height]="height">
      <div class="progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}
      {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}" role="progressbar" [style.width.%]="getPercentValue()"
      [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getPercentValue()}}%</span><ng-content></ng-content>
      </div>
    </div>
  `
            }] }
];
/** @nocollapse */
NgbProgressbar.ctorParameters = () => [
    { type: NgbProgressbarConfig }
];
NgbProgressbar.propDecorators = {
    max: [{ type: Input }],
    animated: [{ type: Input }],
    striped: [{ type: Input }],
    showValue: [{ type: Input }],
    textType: [{ type: Input }],
    type: [{ type: Input }],
    value: [{ type: Input }],
    height: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbProgressbar.prototype._max;
    /**
     * If `true`, the stripes on the progress bar are animated.
     *
     * Takes effect only for browsers supporting CSS3 animations, and if `striped` is `true`.
     * @type {?}
     */
    NgbProgressbar.prototype.animated;
    /**
     * If `true`, the progress bars will be displayed as striped.
     * @type {?}
     */
    NgbProgressbar.prototype.striped;
    /**
     * If `true`, the current percentage will be shown in the `xx%` format.
     * @type {?}
     */
    NgbProgressbar.prototype.showValue;
    /**
     * Optional text variant type of the progress bar.
     *
     * Supports types based on Bootstrap background color variants, like:
     *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
     *
     * \@since 5.2.0
     * @type {?}
     */
    NgbProgressbar.prototype.textType;
    /**
     * The type of the progress bar.
     *
     * Supports types based on Bootstrap background color variants, like:
     *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
     * @type {?}
     */
    NgbProgressbar.prototype.type;
    /**
     * The current value for the progress bar.
     *
     * Should be in the `[0, max]` range.
     * @type {?}
     */
    NgbProgressbar.prototype.value;
    /**
     * The height of the progress bar.
     *
     * Accepts any valid CSS height values, ex. `"2rem"`
     * @type {?}
     */
    NgbProgressbar.prototype.height;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQW1CMUQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFnRXpCLFlBQVksTUFBNEI7Ozs7OztRQVQvQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBVWpCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDOzs7Ozs7OztJQWhFRCxJQUNJLEdBQUcsQ0FBQyxHQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELElBQUksR0FBRyxLQUFhLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7SUE2RHZDLFFBQVEsS0FBSyxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFNUQsZUFBZSxLQUFLLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O1lBMUYvRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7YUFDRjs7OztZQWxCTyxvQkFBb0I7OztrQkEyQnpCLEtBQUs7dUJBWUwsS0FBSztzQkFLTCxLQUFLO3dCQUtMLEtBQUs7dUJBVUwsS0FBSzttQkFRTCxLQUFLO29CQU9MLEtBQUs7cUJBT0wsS0FBSzs7Ozs7OztJQTdETiw4QkFBcUI7Ozs7Ozs7SUFtQnJCLGtDQUEyQjs7Ozs7SUFLM0IsaUNBQTBCOzs7OztJQUsxQixtQ0FBNEI7Ozs7Ozs7Ozs7SUFVNUIsa0NBQTBCOzs7Ozs7OztJQVExQiw4QkFBc0I7Ozs7Ozs7SUFPdEIsK0JBQW1COzs7Ozs7O0lBT25CLGdDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIGZlZWRiYWNrIG9uIHRoZSBwcm9ncmVzcyBvZiBhIHdvcmtmbG93IG9yIGFuIGFjdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXByb2dyZXNzYmFyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJ7e3R5cGUgPyAnIGJnLScgKyB0eXBlIDogJyd9fXt7dGV4dFR5cGUgPyAnIHRleHQtJyArIHRleHRUeXBlIDogJyd9fVxuICAgICAge3thbmltYXRlZCA/ICcgcHJvZ3Jlc3MtYmFyLWFuaW1hdGVkJyA6ICcnfX17e3N0cmlwZWQgPyAnIHByb2dyZXNzLWJhci1zdHJpcGVkJyA6ICcnfX1cIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbc3R5bGUud2lkdGguJV09XCJnZXRQZXJjZW50VmFsdWUoKVwiXG4gICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImdldFZhbHVlKClcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1ZhbHVlXCIgaTE4bj1cIkBAbmdiLnByb2dyZXNzYmFyLnZhbHVlXCI+e3tnZXRQZXJjZW50VmFsdWUoKX19JTwvc3Bhbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2JhciB7XG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW1hbCB2YWx1ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogU2hvdWxkIGJlIGEgcG9zaXRpdmUgbnVtYmVyLiBXaWxsIGRlZmF1bHQgdG8gMTAwIG90aGVyd2lzZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBtYXgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSAhaXNOdW1iZXIobWF4KSB8fCBtYXggPD0gMCA/IDEwMCA6IG1heDtcbiAgfVxuXG4gIGdldCBtYXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heDsgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBzdHJpcGVzIG9uIHRoZSBwcm9ncmVzcyBiYXIgYXJlIGFuaW1hdGVkLlxuICAgKlxuICAgKiBUYWtlcyBlZmZlY3Qgb25seSBmb3IgYnJvd3NlcnMgc3VwcG9ydGluZyBDU1MzIGFuaW1hdGlvbnMsIGFuZCBpZiBgc3RyaXBlZGAgaXMgYHRydWVgLlxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIHByb2dyZXNzIGJhcnMgd2lsbCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cbiAgICovXG4gIEBJbnB1dCgpIHN0cmlwZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB3aWxsIGJlIHNob3duIGluIHRoZSBgeHglYCBmb3JtYXQuXG4gICAqL1xuICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIHRleHQgdmFyaWFudCB0eXBlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxuICAgKiAgYFwic3VjY2Vzc1wiYCwgYFwiaW5mb1wiYCwgYFwid2FybmluZ1wiYCwgYFwiZGFuZ2VyXCJgLCBgXCJwcmltYXJ5XCJgLCBgXCJzZWNvbmRhcnlcImAsIGBcImRhcmtcImAgYW5kIHNvIG9uLlxuICAgKlxuICAgKiBAc2luY2UgNS4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHRleHRUeXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxuICAgKiAgYFwic3VjY2Vzc1wiYCwgYFwiaW5mb1wiYCwgYFwid2FybmluZ1wiYCwgYFwiZGFuZ2VyXCJgLCBgXCJwcmltYXJ5XCJgLCBgXCJzZWNvbmRhcnlcImAsIGBcImRhcmtcImAgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2YWx1ZSBmb3IgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogU2hvdWxkIGJlIGluIHRoZSBgWzAsIG1heF1gIHJhbmdlLlxuICAgKi9cbiAgQElucHV0KCkgdmFsdWUgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIEFjY2VwdHMgYW55IHZhbGlkIENTUyBoZWlnaHQgdmFsdWVzLCBleC4gYFwiMnJlbVwiYFxuICAgKi9cbiAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQcm9ncmVzc2JhckNvbmZpZykge1xuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heDtcbiAgICB0aGlzLmFuaW1hdGVkID0gY29uZmlnLmFuaW1hdGVkO1xuICAgIHRoaXMuc3RyaXBlZCA9IGNvbmZpZy5zdHJpcGVkO1xuICAgIHRoaXMudGV4dFR5cGUgPSBjb25maWcudGV4dFR5cGU7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gZ2V0VmFsdWVJblJhbmdlKHRoaXMudmFsdWUsIHRoaXMubWF4KTsgfVxuXG4gIGdldFBlcmNlbnRWYWx1ZSgpIHsgcmV0dXJuIDEwMCAqIHRoaXMuZ2V0VmFsdWUoKSAvIHRoaXMubWF4OyB9XG59XG4iXX0=