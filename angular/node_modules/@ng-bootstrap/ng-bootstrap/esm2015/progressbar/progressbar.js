import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
let NgbProgressbar = class NgbProgressbar {
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
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    get max() { return this._max; }
    getValue() { return getValueInRange(this.value, this.max); }
    getPercentValue() { return 100 * this.getValue() / this.max; }
};
NgbProgressbar.ctorParameters = () => [
    { type: NgbProgressbarConfig }
];
__decorate([
    Input()
], NgbProgressbar.prototype, "max", null);
__decorate([
    Input()
], NgbProgressbar.prototype, "animated", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "striped", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "showValue", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "textType", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "type", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "value", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "height", void 0);
NgbProgressbar = __decorate([
    Component({
        selector: 'ngb-progressbar',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        template: `
    <div class="progress" [style.height]="height">
      <div class="progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}
      {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}"
      role="progressbar" [style.width.%]="getPercentValue()"
      [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getValue() / max | percent}}</span><ng-content></ng-content>
      </div>
    </div>
  `
    })
], NgbProgressbar);
export { NgbProgressbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDs7R0FFRztBQWdCSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBZ0V6QixZQUFZLE1BQTRCO1FBZHhDOzs7O1dBSUc7UUFDTSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBVWpCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBckVEOzs7O09BSUc7SUFFSCxJQUFJLEdBQUcsQ0FBQyxHQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUVELElBQUksR0FBRyxLQUFhLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUE2RHZDLFFBQVEsS0FBSyxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsZUFBZSxLQUFLLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUMvRCxDQUFBOztZQWJxQixvQkFBb0I7O0FBdkR4QztJQURDLEtBQUssRUFBRTt5Q0FHUDtBQVNRO0lBQVIsS0FBSyxFQUFFO2dEQUFtQjtBQUtsQjtJQUFSLEtBQUssRUFBRTsrQ0FBa0I7QUFLakI7SUFBUixLQUFLLEVBQUU7aURBQW9CO0FBVW5CO0lBQVIsS0FBSyxFQUFFO2dEQUFrQjtBQVFqQjtJQUFSLEtBQUssRUFBRTs0Q0FBYztBQU9iO0lBQVIsS0FBSyxFQUFFOzZDQUFXO0FBT1Y7SUFBUixLQUFLLEVBQUU7OENBQWdCO0FBOURiLGNBQWM7SUFmMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0E2RTFCO1NBN0VZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZSwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBwcm92aWRlcyBmZWVkYmFjayBvbiB0aGUgcHJvZ3Jlc3Mgb2YgYSB3b3JrZmxvdyBvciBhbiBhY3Rpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wcm9ncmVzc2JhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFye3t0eXBlID8gJyBiZy0nICsgdHlwZSA6ICcnfX17e3RleHRUeXBlID8gJyB0ZXh0LScgKyB0ZXh0VHlwZSA6ICcnfX1cbiAgICAgIHt7YW5pbWF0ZWQgPyAnIHByb2dyZXNzLWJhci1hbmltYXRlZCcgOiAnJ319e3tzdHJpcGVkID8gJyBwcm9ncmVzcy1iYXItc3RyaXBlZCcgOiAnJ319XCJcbiAgICAgIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtzdHlsZS53aWR0aC4lXT1cImdldFBlcmNlbnRWYWx1ZSgpXCJcbiAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0VmFsdWUoKVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VmFsdWVcIiBpMThuPVwiQEBuZ2IucHJvZ3Jlc3NiYXIudmFsdWVcIj57e2dldFZhbHVlKCkgLyBtYXggfCBwZXJjZW50fX08L3NwYW4+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiUHJvZ3Jlc3NiYXIge1xuICBwcml2YXRlIF9tYXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltYWwgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIFNob3VsZCBiZSBhIHBvc2l0aXZlIG51bWJlci4gV2lsbCBkZWZhdWx0IHRvIDEwMCBvdGhlcndpc2UuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbWF4KG1heDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gIWlzTnVtYmVyKG1heCkgfHwgbWF4IDw9IDAgPyAxMDAgOiBtYXg7XG4gIH1cblxuICBnZXQgbWF4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXg7IH1cblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgc3RyaXBlcyBvbiB0aGUgcHJvZ3Jlc3MgYmFyIGFyZSBhbmltYXRlZC5cbiAgICpcbiAgICogVGFrZXMgZWZmZWN0IG9ubHkgZm9yIGJyb3dzZXJzIHN1cHBvcnRpbmcgQ1NTMyBhbmltYXRpb25zLCBhbmQgaWYgYHN0cmlwZWRgIGlzIGB0cnVlYC5cbiAgICovXG4gIEBJbnB1dCgpIGFuaW1hdGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBwcm9ncmVzcyBiYXJzIHdpbGwgYmUgZGlzcGxheWVkIGFzIHN0cmlwZWQuXG4gICAqL1xuICBASW5wdXQoKSBzdHJpcGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2Ugd2lsbCBiZSBzaG93biBpbiB0aGUgYHh4JWAgZm9ybWF0LlxuICAgKi9cbiAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCB0ZXh0IHZhcmlhbnQgdHlwZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBTdXBwb3J0cyB0eXBlcyBiYXNlZCBvbiBCb290c3RyYXAgYmFja2dyb3VuZCBjb2xvciB2YXJpYW50cywgbGlrZTpcbiAgICogIGBcInN1Y2Nlc3NcImAsIGBcImluZm9cImAsIGBcIndhcm5pbmdcImAsIGBcImRhbmdlclwiYCwgYFwicHJpbWFyeVwiYCwgYFwic2Vjb25kYXJ5XCJgLCBgXCJkYXJrXCJgIGFuZCBzbyBvbi5cbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqL1xuICBASW5wdXQoKSB0ZXh0VHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBTdXBwb3J0cyB0eXBlcyBiYXNlZCBvbiBCb290c3RyYXAgYmFja2dyb3VuZCBjb2xvciB2YXJpYW50cywgbGlrZTpcbiAgICogIGBcInN1Y2Nlc3NcImAsIGBcImluZm9cImAsIGBcIndhcm5pbmdcImAsIGBcImRhbmdlclwiYCwgYFwicHJpbWFyeVwiYCwgYFwic2Vjb25kYXJ5XCJgLCBgXCJkYXJrXCJgIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmFsdWUgZm9yIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIFNob3VsZCBiZSBpbiB0aGUgYFswLCBtYXhdYCByYW5nZS5cbiAgICovXG4gIEBJbnB1dCgpIHZhbHVlID0gMDtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBBY2NlcHRzIGFueSB2YWxpZCBDU1MgaGVpZ2h0IHZhbHVlcywgZXguIGBcIjJyZW1cImBcbiAgICovXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUHJvZ3Jlc3NiYXJDb25maWcpIHtcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XG4gICAgdGhpcy5hbmltYXRlZCA9IGNvbmZpZy5hbmltYXRlZDtcbiAgICB0aGlzLnN0cmlwZWQgPSBjb25maWcuc3RyaXBlZDtcbiAgICB0aGlzLnRleHRUeXBlID0gY29uZmlnLnRleHRUeXBlO1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuc2hvd1ZhbHVlID0gY29uZmlnLnNob3dWYWx1ZTtcbiAgICB0aGlzLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQ7XG4gIH1cblxuICBnZXRWYWx1ZSgpIHsgcmV0dXJuIGdldFZhbHVlSW5SYW5nZSh0aGlzLnZhbHVlLCB0aGlzLm1heCk7IH1cblxuICBnZXRQZXJjZW50VmFsdWUoKSB7IHJldHVybiAxMDAgKiB0aGlzLmdldFZhbHVlKCkgLyB0aGlzLm1heDsgfVxufVxuIl19