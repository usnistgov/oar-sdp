import { __decorate, __param } from "tslib";
import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, forwardRef, Inject, Injector, Input, NgZone, OnDestroy, OnInit, Output, Renderer2, TemplateRef, ViewContainerRef, ApplicationRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Live } from '../util/accessibility/live';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { PopupService } from '../util/popup';
import { positionElements } from '../util/positioning';
import { isDefined, toString } from '../util/util';
import { NgbTypeaheadConfig } from './typeahead-config';
import { NgbTypeaheadWindow } from './typeahead-window';
var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTypeahead; }),
    multi: true
};
var nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
var NgbTypeahead = /** @class */ (function () {
    function NgbTypeahead(_elementRef, viewContainerRef, _renderer, injector, componentFactoryResolver, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._subscription = null;
        this._closed$ = new Subject();
        this._inputValueBackup = null;
        this._windowRef = null;
        /**
         * The value for the `autocomplete` attribute for the `<input>` element.
         *
         * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
         *
         * @since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * The preferred placement of the typeahead.
         *
         * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
         * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
         * `"right-bottom"`
         *
         * Accepts an array of strings or a string with space separated possible values.
         *
         * The default order of preference is `"bottom-left bottom-right top-left top-right"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted right before an item is selected from the result list.
         *
         * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
         */
        this.selectItem = new EventEmitter();
        this.activeDescendant = null;
        this.popupId = "ngb-typeahead-" + nextWindowId++;
        this._onTouched = function () { };
        this._onChange = function (_) { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map(function ($event) { return $event.target.value; }));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this.isPopupOpen()) {
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    NgbTypeahead.prototype.ngOnInit = function () {
        var _this = this;
        var inputValues$ = this._valueChanges.pipe(tap(function (value) {
            _this._inputValueBackup = _this.showHint ? value : null;
            _this._onChange(_this.editable ? value : undefined);
        }));
        var results$ = inputValues$.pipe(this.ngbTypeahead);
        var userInput$ = this._resubscribeTypeahead.pipe(switchMap(function () { return results$; }));
        this._subscription = this._subscribeToUserInput(userInput$);
    };
    NgbTypeahead.prototype.ngOnDestroy = function () {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    };
    NgbTypeahead.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    NgbTypeahead.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    NgbTypeahead.prototype.writeValue = function (value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    };
    NgbTypeahead.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /**
     * Dismisses typeahead popup window
     */
    NgbTypeahead.prototype.dismissPopup = function () {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Returns true if the typeahead popup window is displayed
     */
    NgbTypeahead.prototype.isPopupOpen = function () { return this._windowRef != null; };
    NgbTypeahead.prototype.handleBlur = function () {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    };
    NgbTypeahead.prototype.handleKeyDown = function (event) {
        if (!this.isPopupOpen()) {
            return;
        }
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab:
                var result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
        }
    };
    NgbTypeahead.prototype._openPopup = function () {
        var _this = this;
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
            this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            ngbAutoClose(this._ngZone, this._document, 'outside', function () { return _this.dismissPopup(); }, this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
        }
    };
    NgbTypeahead.prototype._closePopup = function () {
        this._closed$.next();
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = null;
    };
    NgbTypeahead.prototype._selectResult = function (result) {
        var defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    };
    NgbTypeahead.prototype._selectResultClosePopup = function (result) {
        this._selectResult(result);
        this._closePopup();
    };
    NgbTypeahead.prototype._showHint = function () {
        var _a;
        if (this.showHint && ((_a = this._windowRef) === null || _a === void 0 ? void 0 : _a.instance.hasActive()) && this._inputValueBackup != null) {
            var userInputLowerCase = this._inputValueBackup.toLowerCase();
            var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    };
    NgbTypeahead.prototype._formatItemForInput = function (item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    };
    NgbTypeahead.prototype._writeInputValue = function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    };
    NgbTypeahead.prototype._subscribeToUserInput = function (userInput$) {
        var _this = this;
        return userInput$.subscribe(function (results) {
            if (!results || results.length === 0) {
                _this._closePopup();
            }
            else {
                _this._openPopup();
                _this._windowRef.instance.focusFirst = _this.focusFirst;
                _this._windowRef.instance.results = results;
                _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                if (_this.resultFormatter) {
                    _this._windowRef.instance.formatter = _this.resultFormatter;
                }
                if (_this.resultTemplate) {
                    _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                }
                _this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                _this._windowRef.changeDetectorRef.detectChanges();
                _this._showHint();
            }
            // live announcer
            var count = results ? results.length : 0;
            _this._live.say(count === 0 ? 'No results available' : count + " result" + (count === 1 ? '' : 's') + " available");
        });
    };
    NgbTypeahead.prototype._unsubscribeFromUserInput = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    };
    NgbTypeahead.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: NgbTypeaheadConfig },
        { type: NgZone },
        { type: Live },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ApplicationRef }
    ]; };
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "autocomplete", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "container", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "editable", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "focusFirst", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "inputFormatter", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "ngbTypeahead", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "resultFormatter", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "resultTemplate", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "showHint", void 0);
    __decorate([
        Input()
    ], NgbTypeahead.prototype, "placement", void 0);
    __decorate([
        Output()
    ], NgbTypeahead.prototype, "selectItem", void 0);
    NgbTypeahead = __decorate([
        Directive({
            selector: 'input[ngbTypeahead]',
            exportAs: 'ngbTypeahead',
            host: {
                '(blur)': 'handleBlur()',
                '[class.open]': 'isPopupOpen()',
                '(keydown)': 'handleKeyDown($event)',
                '[autocomplete]': 'autocomplete',
                'autocapitalize': 'off',
                'autocorrect': 'off',
                'role': 'combobox',
                'aria-multiline': 'false',
                '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                '[attr.aria-activedescendant]': 'activeDescendant',
                '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                '[attr.aria-expanded]': 'isPopupOpen()'
            },
            providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
        }),
        __param(8, Inject(DOCUMENT))
    ], NgbTypeahead);
    return NgbTypeahead;
}());
export { NgbTypeahead };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvdHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixjQUFjLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFpQixnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFB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QzFDLENBQUM7UUFpSHNFLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BaEgzRSxZQUFZLENBcVV4QjtJQUFELG1CQUFDO0NBQUEsQUFyVUQsSUFxVUM7U0FyVVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEFwcGxpY2F0aW9uUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXAsIHN3aXRjaE1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7TGl2ZX0gZnJvbSAnLi4vdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5LCBwb3NpdGlvbkVsZW1lbnRzfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7aXNEZWZpbmVkLCB0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XG5pbXBvcnQge05nYlR5cGVhaGVhZFdpbmRvdywgUmVzdWx0VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuXG5cbmNvbnN0IE5HQl9UWVBFQUhFQURfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUeXBlYWhlYWQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSBhbiBpdGVtIGlzIHNlbGVjdGVkIGZyb20gdGhlIHJlc3VsdCBsaXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudDxUID0gYW55PiB7XG4gIC8qKlxuICAgKiBUaGUgaXRlbSBmcm9tIHRoZSByZXN1bHQgbGlzdCBhYm91dCB0byBiZSBzZWxlY3RlZC5cbiAgICovXG4gIGl0ZW06IFQ7XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgaXRlbSBzZWxlY3Rpb24gZnJvbSBoYXBwZW5pbmcuXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxubGV0IG5leHRXaW5kb3dJZCA9IDA7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgcHJvdmlkaW5nIGEgc2ltcGxlIHdheSBvZiBjcmVhdGluZyBwb3dlcmZ1bCB0eXBlYWhlYWRzIGZyb20gYW55IHRleHQgaW5wdXQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25nYlR5cGVhaGVhZF0nLFxuICBleHBvcnRBczogJ25nYlR5cGVhaGVhZCcsXG4gIGhvc3Q6IHtcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG4gICAgJ1tjbGFzcy5vcGVuXSc6ICdpc1BvcHVwT3BlbigpJyxcbiAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleURvd24oJGV2ZW50KScsXG4gICAgJ1thdXRvY29tcGxldGVdJzogJ2F1dG9jb21wbGV0ZScsXG4gICAgJ2F1dG9jYXBpdGFsaXplJzogJ29mZicsXG4gICAgJ2F1dG9jb3JyZWN0JzogJ29mZicsXG4gICAgJ3JvbGUnOiAnY29tYm9ib3gnLFxuICAgICdhcmlhLW11bHRpbGluZSc6ICdmYWxzZScsXG4gICAgJ1thdHRyLmFyaWEtYXV0b2NvbXBsZXRlXSc6ICdzaG93SGludCA/IFwiYm90aFwiIDogXCJsaXN0XCInLFxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ2FjdGl2ZURlc2NlbmRhbnQnLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ2lzUG9wdXBPcGVuKCkgPyBwb3B1cElkIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzUG9wdXBPcGVuKCknXG4gIH0sXG4gIHByb3ZpZGVyczogW05HQl9UWVBFQUhFQURfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiVHlwZWFoZWFkV2luZG93PjtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2lucHV0VmFsdWVCYWNrdXA6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXM6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfcmVzdWJzY3JpYmVUeXBlYWhlYWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUeXBlYWhlYWRXaW5kb3c+fCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgZm9yIHRoZSBgYXV0b2NvbXBsZXRlYCBhdHRyaWJ1dGUgZm9yIHRoZSBgPGlucHV0PmAgZWxlbWVudC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gYFwib2ZmXCJgIHRvIGRpc2FibGUgdGhlIG5hdGl2ZSBicm93c2VyIGF1dG9jb21wbGV0ZSwgYnV0IHlvdSBjYW4gb3ZlcnJpZGUgaXQgaWYgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBAc2luY2UgMi4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGF1dG9jb21wbGV0ZSA9ICdvZmYnO1xuXG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aWxsIGJlIGFwcGVuZGVkIHRvLlxuICAgKlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBgXCJib2R5XCJgLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgbW9kZWwgdmFsdWVzIHdpbGwgbm90IGJlIHJlc3RyaWN0ZWQgb25seSB0byBpdGVtcyBzZWxlY3RlZCBmcm9tIHRoZSBwb3B1cC5cbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBmaXJzdCBpdGVtIGluIHRoZSByZXN1bHQgbGlzdCB3aWxsIGFsd2F5cyBzdGF5IGZvY3VzZWQgd2hpbGUgdHlwaW5nLlxuICAgKi9cbiAgQElucHV0KCkgZm9jdXNGaXJzdDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYW4gaXRlbSBmcm9tIHRoZSByZXN1bHQgbGlzdCB0byBhIGBzdHJpbmdgIHRvIGRpc3BsYXkgaW4gdGhlIGA8aW5wdXQ+YCBmaWVsZC5cbiAgICpcbiAgICogSXQgaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBzb21ldGhpbmcgaW4gdGhlIHBvcHVwIG9yIHRoZSBtb2RlbCB2YWx1ZSBjaGFuZ2VzLCBzbyB0aGUgaW5wdXQgbmVlZHMgdG9cbiAgICogYmUgdXBkYXRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGlucHV0Rm9ybWF0dGVyOiAoaXRlbTogYW55KSA9PiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGEgc3RyZWFtIG9mIHRleHQgdmFsdWVzIGZyb20gdGhlIGA8aW5wdXQ+YCBlbGVtZW50IHRvIHRoZSBzdHJlYW0gb2YgdGhlIGFycmF5IG9mIGl0ZW1zXG4gICAqIHRvIGRpc3BsYXkgaW4gdGhlIHR5cGVhaGVhZCBwb3B1cC5cbiAgICpcbiAgICogSWYgdGhlIHJlc3VsdGluZyBvYnNlcnZhYmxlIGVtaXRzIGEgbm9uLWVtcHR5IGFycmF5IC0gdGhlIHBvcHVwIHdpbGwgYmUgc2hvd24uIElmIGl0IGVtaXRzIGFuIGVtcHR5IGFycmF5IC0gdGhlXG4gICAqIHBvcHVwIHdpbGwgYmUgY2xvc2VkLlxuICAgKlxuICAgKiBTZWUgdGhlIFtiYXNpYyBleGFtcGxlXSgjL2NvbXBvbmVudHMvdHlwZWFoZWFkL2V4YW1wbGVzI2Jhc2ljKSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGB0aGlzYCBhcmd1bWVudCBpcyBgdW5kZWZpbmVkYCBzbyB5b3UgbmVlZCB0byBleHBsaWNpdGx5IGJpbmQgaXQgdG8gYSBkZXNpcmVkIFwidGhpc1wiIHRhcmdldC5cbiAgICovXG4gIEBJbnB1dCgpIG5nYlR5cGVhaGVhZDogKHRleHQ6IE9ic2VydmFibGU8c3RyaW5nPikgPT4gT2JzZXJ2YWJsZTxyZWFkb25seSBhbnlbXT47XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGFuIGl0ZW0gZnJvbSB0aGUgcmVzdWx0IGxpc3QgdG8gYSBgc3RyaW5nYCB0byBkaXNwbGF5IGluIHRoZSBwb3B1cC5cbiAgICpcbiAgICogTXVzdCBiZSBwcm92aWRlZCwgaWYgeW91ciBgbmdiVHlwZWFoZWFkYCByZXR1cm5zIHNvbWV0aGluZyBvdGhlciB0aGFuIGBPYnNlcnZhYmxlPHN0cmluZ1tdPmAuXG4gICAqXG4gICAqIEFsdGVybmF0aXZlbHkgZm9yIG1vcmUgY29tcGxleCBtYXJrdXAgaW4gdGhlIHBvcHVwIHlvdSBzaG91bGQgdXNlIGByZXN1bHRUZW1wbGF0ZWAuXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHRGb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHRoZSB3YXkgcmVzdWx0aW5nIGl0ZW1zIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHBvcHVwLlxuICAgKlxuICAgKiBTZWUgdGhlIFtSZXN1bHRUZW1wbGF0ZUNvbnRleHRdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvYXBpI1Jlc3VsdFRlbXBsYXRlQ29udGV4dCkgZm9yIHRoZSB0ZW1wbGF0ZSBjb250ZXh0LlxuICAgKlxuICAgKiBBbHNvIHNlZSB0aGUgW3RlbXBsYXRlIGZvciByZXN1bHRzIGRlbW9dKCMvY29tcG9uZW50cy90eXBlYWhlYWQvZXhhbXBsZXMjdGVtcGxhdGUpIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIHNob3cgdGhlIGhpbnQgaW4gdGhlIGA8aW5wdXQ+YCB3aGVuIGFuIGl0ZW0gaW4gdGhlIHJlc3VsdCBsaXN0IG1hdGNoZXMuXG4gICAqL1xuICBASW5wdXQoKSBzaG93SGludDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIHR5cGVhaGVhZC5cbiAgICpcbiAgICogUG9zc2libGUgdmFsdWVzIGFyZSBgXCJ0b3BcImAsIGBcInRvcC1sZWZ0XCJgLCBgXCJ0b3AtcmlnaHRcImAsIGBcImJvdHRvbVwiYCwgYFwiYm90dG9tLWxlZnRcImAsXG4gICAqIGBcImJvdHRvbS1yaWdodFwiYCwgYFwibGVmdFwiYCwgYFwibGVmdC10b3BcImAsIGBcImxlZnQtYm90dG9tXCJgLCBgXCJyaWdodFwiYCwgYFwicmlnaHQtdG9wXCJgLFxuICAgKiBgXCJyaWdodC1ib3R0b21cImBcbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nIHdpdGggc3BhY2Ugc2VwYXJhdGVkIHBvc3NpYmxlIHZhbHVlcy5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgb3JkZXIgb2YgcHJlZmVyZW5jZSBpcyBgXCJib3R0b20tbGVmdCBib3R0b20tcmlnaHQgdG9wLWxlZnQgdG9wLXJpZ2h0XCJgXG4gICAqXG4gICAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSBhbiBpdGVtIGlzIHNlbGVjdGVkIGZyb20gdGhlIHJlc3VsdCBsaXN0LlxuICAgKlxuICAgKiBFdmVudCBwYXlsb2FkIGlzIG9mIHR5cGUgW2BOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnRgXSgjL2NvbXBvbmVudHMvdHlwZWFoZWFkL2FwaSNOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQpLlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcblxuICBhY3RpdmVEZXNjZW5kYW50OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcblxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgY29uZmlnOiBOZ2JUeXBlYWhlYWRDb25maWcsIG5nWm9uZTogTmdab25lLCBwcml2YXRlIF9saXZlOiBMaXZlLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiwgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xuICAgIHRoaXMuZWRpdGFibGUgPSBjb25maWcuZWRpdGFibGU7XG4gICAgdGhpcy5mb2N1c0ZpcnN0ID0gY29uZmlnLmZvY3VzRmlyc3Q7XG4gICAgdGhpcy5zaG93SGludCA9IGNvbmZpZy5zaG93SGludDtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG5cbiAgICB0aGlzLl92YWx1ZUNoYW5nZXMgPSBmcm9tRXZlbnQ8RXZlbnQ+KF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgkZXZlbnQgPT4gKCRldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKTtcblxuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcblxuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiVHlwZWFoZWFkV2luZG93PihcbiAgICAgICAgTmdiVHlwZWFoZWFkV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGFwcGxpY2F0aW9uUmVmKTtcblxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBuZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmICEubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzJCA9IHRoaXMuX3ZhbHVlQ2hhbmdlcy5waXBlKHRhcCh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5zaG93SGludCA/IHZhbHVlIDogbnVsbDtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuZWRpdGFibGUgPyB2YWx1ZSA6IHVuZGVmaW5lZCk7XG4gICAgfSkpO1xuICAgIGNvbnN0IHJlc3VsdHMkID0gaW5wdXRWYWx1ZXMkLnBpcGUodGhpcy5uZ2JUeXBlYWhlYWQpO1xuICAgIGNvbnN0IHVzZXJJbnB1dCQgPSB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5waXBlKHN3aXRjaE1hcCgoKSA9PiByZXN1bHRzJCkpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh2YWx1ZSkpO1xuICAgIGlmICh0aGlzLnNob3dIaW50KSB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xuICAgKi9cbiAgZGlzbWlzc1BvcHVwKCkge1xuICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICBpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3cgaXMgZGlzcGxheWVkXG4gICAqL1xuICBpc1BvcHVwT3BlbigpIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UucHJldigpO1xuICAgICAgICB0aGlzLl9zaG93SGludCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVudGVyOlxuICAgICAgY2FzZSBLZXkuVGFiOlxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5nZXRBY3RpdmUoKTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wZW5Qb3B1cCgpIHtcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLnBvcHVwSWQ7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hY3RpdmVDaGFuZ2VFdmVudC5zdWJzY3JpYmUoKGFjdGl2ZUlkOiBzdHJpbmcpID0+IHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IGFjdGl2ZUlkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgbmdiQXV0b0Nsb3NlKFxuICAgICAgICAgIHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsICdvdXRzaWRlJywgKCkgPT4gdGhpcy5kaXNtaXNzUG9wdXAoKSwgdGhpcy5fY2xvc2VkJCxcbiAgICAgICAgICBbdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlUG9wdXAoKSB7XG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0UmVzdWx0KHJlc3VsdDogYW55KSB7XG4gICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShyZXN1bHQpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XG4gICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0hpbnQoKSB7XG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmPy5pbnN0YW5jZS5oYXNBY3RpdmUoKSAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHVzZXJJbnB1dExvd2VyQ2FzZSA9IHRoaXMuX2lucHV0VmFsdWVCYWNrdXAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbCA9IHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCkpO1xuXG4gICAgICBpZiAodXNlcklucHV0TG93ZXJDYXNlID09PSBmb3JtYXR0ZWRWYWwuc3Vic3RyKDAsIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwICsgZm9ybWF0dGVkVmFsLnN1YnN0cih0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkpO1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbJ3NldFNlbGVjdGlvblJhbmdlJ10uYXBwbHkoXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFt0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCwgZm9ybWF0dGVkVmFsLmxlbmd0aF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKGZvcm1hdHRlZFZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybWF0SXRlbUZvcklucHV0KGl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0gIT0gbnVsbCAmJiB0aGlzLmlucHV0Rm9ybWF0dGVyID8gdGhpcy5pbnB1dEZvcm1hdHRlcihpdGVtKSA6IHRvU3RyaW5nKGl0ZW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfd3JpdGVJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRvU3RyaW5nKHZhbHVlKSk7XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpYmVUb1VzZXJJbnB1dCh1c2VySW5wdXQkOiBPYnNlcnZhYmxlPHJlYWRvbmx5IGFueVtdPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHVzZXJJbnB1dCQuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XG4gICAgICBpZiAoIXJlc3VsdHMgfHwgcmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fb3BlblBvcHVwKCk7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLmZvY3VzRmlyc3QgPSB0aGlzLmZvY3VzRmlyc3Q7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS50ZXJtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRGb3JtYXR0ZXIpIHtcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5mb3JtYXR0ZXIgPSB0aGlzLnJlc3VsdEZvcm1hdHRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXN1bHRUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLnJlc3VsdFRlbXBsYXRlID0gdGhpcy5yZXN1bHRUZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5yZXNldEFjdGl2ZSgpO1xuXG4gICAgICAgIC8vIFRoZSBvYnNlcnZhYmxlIHN0cmVhbSB3ZSBhcmUgc3Vic2NyaWJpbmcgdG8gbWlnaHQgaGF2ZSBhc3luYyBzdGVwc1xuICAgICAgICAvLyBhbmQgaWYgYSBjb21wb25lbnQgY29udGFpbmluZyB0eXBlYWhlYWQgaXMgdXNpbmcgdGhlIE9uUHVzaCBzdHJhdGVneVxuICAgICAgICAvLyB0aGUgY2hhbmdlIGRldGVjdGlvbiB0dXJuIHdvdWxkbid0IGJlIGludm9rZWQgYXV0b21hdGljYWxseS5cbiAgICAgICAgdGhpcy5fd2luZG93UmVmICEuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxpdmUgYW5ub3VuY2VyXG4gICAgICBjb25zdCBjb3VudCA9IHJlc3VsdHMgPyByZXN1bHRzLmxlbmd0aCA6IDA7XG4gICAgICB0aGlzLl9saXZlLnNheShjb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGF2YWlsYWJsZScgOiBgJHtjb3VudH0gcmVzdWx0JHtjb3VudCA9PT0gMSA/ICcnIDogJ3MnfSBhdmFpbGFibGVgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpIHtcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgfVxufVxuIl19