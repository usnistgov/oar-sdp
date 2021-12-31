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
const NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTypeahead),
    multi: true
};
let nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
let NgbTypeahead = class NgbTypeahead {
    constructor(_elementRef, viewContainerRef, _renderer, injector, componentFactoryResolver, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
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
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map($event => $event.target.value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, applicationRef);
        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this.isPopupOpen()) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    ngOnInit() {
        const inputValues$ = this._valueChanges.pipe(tap(value => {
            this._inputValueBackup = this.showHint ? value : null;
            this._onChange(this.editable ? value : undefined);
        }));
        const results$ = inputValues$.pipe(this.ngbTypeahead);
        const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => results$));
        this._subscription = this._subscribeToUserInput(userInput$);
    }
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }
    registerOnChange(fn) { this._onChange = fn; }
    registerOnTouched(fn) { this._onTouched = fn; }
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen() { return this._windowRef != null; }
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    handleKeyDown(event) {
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
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
        }
    }
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => this.activeDescendant = activeId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            ngbAutoClose(this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
        }
    }
    _closePopup() {
        this._closed$.next();
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = null;
    }
    _selectResult(result) {
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    _showHint() {
        var _a;
        if (this.showHint && ((_a = this._windowRef) === null || _a === void 0 ? void 0 : _a.instance.hasActive()) && this._inputValueBackup != null) {
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    _subscribeToUserInput(userInput$) {
        return userInput$.subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();
                this._showHint();
            }
            // live announcer
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
};
NgbTypeahead.ctorParameters = () => [
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
];
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
export { NgbTypeahead };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvdHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixjQUFjLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFpQixnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFB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Y3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQXBwbGljYXRpb25SZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcCwgc3dpdGNoTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtMaXZlfSBmcm9tICcuLi91dGlsL2FjY2Vzc2liaWxpdHkvbGl2ZSc7XG5pbXBvcnQge25nYkF1dG9DbG9zZX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcbmltcG9ydCB7UGxhY2VtZW50QXJyYXksIHBvc2l0aW9uRWxlbWVudHN9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtpc0RlZmluZWQsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5pbXBvcnQge05nYlR5cGVhaGVhZENvbmZpZ30gZnJvbSAnLi90eXBlYWhlYWQtY29uZmlnJztcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93LCBSZXN1bHRUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XG5cblxuY29uc3QgTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlR5cGVhaGVhZCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIGFuIGl0ZW0gaXMgc2VsZWN0ZWQgZnJvbSB0aGUgcmVzdWx0IGxpc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PFQgPSBhbnk+IHtcbiAgLyoqXG4gICAqIFRoZSBpdGVtIGZyb20gdGhlIHJlc3VsdCBsaXN0IGFib3V0IHRvIGJlIHNlbGVjdGVkLlxuICAgKi9cbiAgaXRlbTogVDtcblxuICAvKipcbiAgICogQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIHdpbGwgcHJldmVudCBpdGVtIHNlbGVjdGlvbiBmcm9tIGhhcHBlbmluZy5cbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG5sZXQgbmV4dFdpbmRvd0lkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBwcm92aWRpbmcgYSBzaW1wbGUgd2F5IG9mIGNyZWF0aW5nIHBvd2VyZnVsIHR5cGVhaGVhZHMgZnJvbSBhbnkgdGV4dCBpbnB1dC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbmdiVHlwZWFoZWFkXScsXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkJyxcbiAgaG9zdDoge1xuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcbiAgICAnW2NsYXNzLm9wZW5dJzogJ2lzUG9wdXBPcGVuKCknLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcbiAgICAnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAnYXV0b2NhcGl0YWxpemUnOiAnb2ZmJyxcbiAgICAnYXV0b2NvcnJlY3QnOiAnb2ZmJyxcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtbXVsdGlsaW5lJzogJ2ZhbHNlJyxcbiAgICAnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ3Nob3dIaW50ID8gXCJib3RoXCIgOiBcImxpc3RcIicsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNQb3B1cE9wZW4oKSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZUJhY2t1cDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBwcml2YXRlIF9yZXN1YnNjcmliZVR5cGVhaGVhZDogQmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlR5cGVhaGVhZFdpbmRvdz58IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSBmb3IgdGhlIGBhdXRvY29tcGxldGVgIGF0dHJpYnV0ZSBmb3IgdGhlIGA8aW5wdXQ+YCBlbGVtZW50LlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBgXCJvZmZcImAgdG8gZGlzYWJsZSB0aGUgbmF0aXZlIGJyb3dzZXIgYXV0b2NvbXBsZXRlLCBidXQgeW91IGNhbiBvdmVycmlkZSBpdCBpZiBuZWNlc3NhcnkuXG4gICAqXG4gICAqIEBzaW5jZSAyLjEuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlID0gJ29mZic7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbGwgYmUgYXBwZW5kZWQgdG8uXG4gICAqXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIGBcImJvZHlcImAuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBtb2RlbCB2YWx1ZXMgd2lsbCBub3QgYmUgcmVzdHJpY3RlZCBvbmx5IHRvIGl0ZW1zIHNlbGVjdGVkIGZyb20gdGhlIHBvcHVwLlxuICAgKi9cbiAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIHJlc3VsdCBsaXN0IHdpbGwgYWx3YXlzIHN0YXkgZm9jdXNlZCB3aGlsZSB0eXBpbmcuXG4gICAqL1xuICBASW5wdXQoKSBmb2N1c0ZpcnN0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBhbiBpdGVtIGZyb20gdGhlIHJlc3VsdCBsaXN0IHRvIGEgYHN0cmluZ2AgdG8gZGlzcGxheSBpbiB0aGUgYDxpbnB1dD5gIGZpZWxkLlxuICAgKlxuICAgKiBJdCBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIHNvbWV0aGluZyBpbiB0aGUgcG9wdXAgb3IgdGhlIG1vZGVsIHZhbHVlIGNoYW5nZXMsIHNvIHRoZSBpbnB1dCBuZWVkcyB0b1xuICAgKiBiZSB1cGRhdGVkLlxuICAgKi9cbiAgQElucHV0KCkgaW5wdXRGb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYSBzdHJlYW0gb2YgdGV4dCB2YWx1ZXMgZnJvbSB0aGUgYDxpbnB1dD5gIGVsZW1lbnQgdG8gdGhlIHN0cmVhbSBvZiB0aGUgYXJyYXkgb2YgaXRlbXNcbiAgICogdG8gZGlzcGxheSBpbiB0aGUgdHlwZWFoZWFkIHBvcHVwLlxuICAgKlxuICAgKiBJZiB0aGUgcmVzdWx0aW5nIG9ic2VydmFibGUgZW1pdHMgYSBub24tZW1wdHkgYXJyYXkgLSB0aGUgcG9wdXAgd2lsbCBiZSBzaG93bi4gSWYgaXQgZW1pdHMgYW4gZW1wdHkgYXJyYXkgLSB0aGVcbiAgICogcG9wdXAgd2lsbCBiZSBjbG9zZWQuXG4gICAqXG4gICAqIFNlZSB0aGUgW2Jhc2ljIGV4YW1wbGVdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvZXhhbXBsZXMjYmFzaWMpIGZvciBtb3JlIGRldGFpbHMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgYHRoaXNgIGFyZ3VtZW50IGlzIGB1bmRlZmluZWRgIHNvIHlvdSBuZWVkIHRvIGV4cGxpY2l0bHkgYmluZCBpdCB0byBhIGRlc2lyZWQgXCJ0aGlzXCIgdGFyZ2V0LlxuICAgKi9cbiAgQElucHV0KCkgbmdiVHlwZWFoZWFkOiAodGV4dDogT2JzZXJ2YWJsZTxzdHJpbmc+KSA9PiBPYnNlcnZhYmxlPHJlYWRvbmx5IGFueVtdPjtcblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYW4gaXRlbSBmcm9tIHRoZSByZXN1bHQgbGlzdCB0byBhIGBzdHJpbmdgIHRvIGRpc3BsYXkgaW4gdGhlIHBvcHVwLlxuICAgKlxuICAgKiBNdXN0IGJlIHByb3ZpZGVkLCBpZiB5b3VyIGBuZ2JUeXBlYWhlYWRgIHJldHVybnMgc29tZXRoaW5nIG90aGVyIHRoYW4gYE9ic2VydmFibGU8c3RyaW5nW10+YC5cbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSBmb3IgbW9yZSBjb21wbGV4IG1hcmt1cCBpbiB0aGUgcG9wdXAgeW91IHNob3VsZCB1c2UgYHJlc3VsdFRlbXBsYXRlYC5cbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdEZvcm1hdHRlcjogKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgdGhlIHdheSByZXN1bHRpbmcgaXRlbXMgYXJlIGRpc3BsYXllZCBpbiB0aGUgcG9wdXAuXG4gICAqXG4gICAqIFNlZSB0aGUgW1Jlc3VsdFRlbXBsYXRlQ29udGV4dF0oIy9jb21wb25lbnRzL3R5cGVhaGVhZC9hcGkjUmVzdWx0VGVtcGxhdGVDb250ZXh0KSBmb3IgdGhlIHRlbXBsYXRlIGNvbnRleHQuXG4gICAqXG4gICAqIEFsc28gc2VlIHRoZSBbdGVtcGxhdGUgZm9yIHJlc3VsdHMgZGVtb10oIy9jb21wb25lbnRzL3R5cGVhaGVhZC9leGFtcGxlcyN0ZW1wbGF0ZSkgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHdpbGwgc2hvdyB0aGUgaGludCBpbiB0aGUgYDxpbnB1dD5gIHdoZW4gYW4gaXRlbSBpbiB0aGUgcmVzdWx0IGxpc3QgbWF0Y2hlcy5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dIaW50OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlZmVycmVkIHBsYWNlbWVudCBvZiB0aGUgdHlwZWFoZWFkLlxuICAgKlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGBcInRvcFwiYCwgYFwidG9wLWxlZnRcImAsIGBcInRvcC1yaWdodFwiYCwgYFwiYm90dG9tXCJgLCBgXCJib3R0b20tbGVmdFwiYCxcbiAgICogYFwiYm90dG9tLXJpZ2h0XCJgLCBgXCJsZWZ0XCJgLCBgXCJsZWZ0LXRvcFwiYCwgYFwibGVmdC1ib3R0b21cImAsIGBcInJpZ2h0XCJgLCBgXCJyaWdodC10b3BcImAsXG4gICAqIGBcInJpZ2h0LWJvdHRvbVwiYFxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHN0cmluZ3Mgb3IgYSBzdHJpbmcgd2l0aCBzcGFjZSBzZXBhcmF0ZWQgcG9zc2libGUgdmFsdWVzLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImJvdHRvbS1sZWZ0IGJvdHRvbS1yaWdodCB0b3AtbGVmdCB0b3AtcmlnaHRcImBcbiAgICpcbiAgICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdib3R0b20tbGVmdCc7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIGFuIGl0ZW0gaXMgc2VsZWN0ZWQgZnJvbSB0aGUgcmVzdWx0IGxpc3QuXG4gICAqXG4gICAqIEV2ZW50IHBheWxvYWQgaXMgb2YgdHlwZSBbYE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudGBdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvYXBpI05nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCkuXG4gICAqL1xuICBAT3V0cHV0KCkgc2VsZWN0SXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PigpO1xuXG4gIGFjdGl2ZURlc2NlbmRhbnQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwb3B1cElkID0gYG5nYi10eXBlYWhlYWQtJHtuZXh0V2luZG93SWQrK31gO1xuXG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50Piwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBjb25maWc6IE5nYlR5cGVhaGVhZENvbmZpZywgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2xpdmU6IExpdmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5lZGl0YWJsZSA9IGNvbmZpZy5lZGl0YWJsZTtcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcbiAgICB0aGlzLnNob3dIaW50ID0gY29uZmlnLnNob3dIaW50O1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblxuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlcyA9IGZyb21FdmVudDxFdmVudD4oX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKCRldmVudCA9PiAoJGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxuICAgICAgICBOZ2JUeXBlYWhlYWRXaW5kb3csIGluamVjdG9yLCB2aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgYXBwbGljYXRpb25SZWYpO1xuXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYgIS5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMkID0gdGhpcy5fdmFsdWVDaGFuZ2VzLnBpcGUodGFwKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB0aGlzLnNob3dIaW50ID8gdmFsdWUgOiBudWxsO1xuICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5lZGl0YWJsZSA/IHZhbHVlIDogdW5kZWZpbmVkKTtcbiAgICB9KSk7XG4gICAgY29uc3QgcmVzdWx0cyQgPSBpbnB1dFZhbHVlcyQucGlwZSh0aGlzLm5nYlR5cGVhaGVhZCk7XG4gICAgY29uc3QgdXNlcklucHV0JCA9IHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLnBpcGUoc3dpdGNoTWFwKCgpID0+IHJlc3VsdHMkKSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCk7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHZhbHVlKSk7XG4gICAgaWYgKHRoaXMuc2hvd0hpbnQpIHtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0eXBlYWhlYWQgcG9wdXAgd2luZG93XG4gICAqL1xuICBkaXNtaXNzUG9wdXAoKSB7XG4gICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcbiAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcbiAgICAgIGlmICh0aGlzLnNob3dIaW50ICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXApO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbmRvdyBpcyBkaXNwbGF5ZWRcbiAgICovXG4gIGlzUG9wdXBPcGVuKCkgeyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLm5leHQoKTtcbiAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5pbnN0YW5jZS5wcmV2KCk7XG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICBjYXNlIEtleS5UYWI6XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLmdldEFjdGl2ZSgpO1xuICAgICAgICBpZiAoaXNEZWZpbmVkKHJlc3VsdCkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHRoaXMuX3NlbGVjdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3BlblBvcHVwKCkge1xuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4oKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMucG9wdXBJZDtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5zZWxlY3RFdmVudC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB0aGlzLl9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdCkpO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4gdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gYWN0aXZlSWQpO1xuXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICBuZ2JBdXRvQ2xvc2UoXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgJ291dHNpZGUnLCAoKSA9PiB0aGlzLmRpc21pc3NQb3B1cCgpLCB0aGlzLl9jbG9zZWQkLFxuICAgICAgICAgIFt0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2VQb3B1cCgpIHtcbiAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHQocmVzdWx0OiBhbnkpIHtcbiAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0SXRlbS5lbWl0KHtpdGVtOiByZXN1bHQsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcblxuICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy53cml0ZVZhbHVlKHJlc3VsdCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZShyZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdFJlc3VsdENsb3NlUG9wdXAocmVzdWx0OiBhbnkpIHtcbiAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93SGludCgpIHtcbiAgICBpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl93aW5kb3dSZWY/Lmluc3RhbmNlLmhhc0FjdGl2ZSgpICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT0gbnVsbCkge1xuICAgICAgY29uc3QgdXNlcklucHV0TG93ZXJDYXNlID0gdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gdGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKSk7XG5cbiAgICAgIGlmICh1c2VySW5wdXRMb3dlckNhc2UgPT09IGZvcm1hdHRlZFZhbC5zdWJzdHIoMCwgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgKyBmb3JtYXR0ZWRWYWwuc3Vic3RyKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2V0U2VsZWN0aW9uUmFuZ2UnXS5hcHBseShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW3RoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLCBmb3JtYXR0ZWRWYWwubGVuZ3RoXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUoZm9ybWF0dGVkVmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRJdGVtRm9ySW5wdXQoaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XG4gIH1cblxuICBwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQ6IE9ic2VydmFibGU8cmVhZG9ubHkgYW55W10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdXNlcklucHV0JC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGVuUG9wdXAoKTtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UuZm9jdXNGaXJzdCA9IHRoaXMuZm9jdXNGaXJzdDtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLnRlcm0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEZvcm1hdHRlcikge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLmZvcm1hdHRlciA9IHRoaXMucmVzdWx0Rm9ybWF0dGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdFRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmICEuaW5zdGFuY2UucmVzdWx0VGVtcGxhdGUgPSB0aGlzLnJlc3VsdFRlbXBsYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZiAhLmluc3RhbmNlLnJlc2V0QWN0aXZlKCk7XG5cbiAgICAgICAgLy8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXG4gICAgICAgIC8vIGFuZCBpZiBhIGNvbXBvbmVudCBjb250YWluaW5nIHR5cGVhaGVhZCBpcyB1c2luZyB0aGUgT25QdXNoIHN0cmF0ZWd5XG4gICAgICAgIC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICB0aGlzLl93aW5kb3dSZWYgIS5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gbGl2ZSBhbm5vdW5jZXJcbiAgICAgIGNvbnN0IGNvdW50ID0gcmVzdWx0cyA/IHJlc3VsdHMubGVuZ3RoIDogMDtcbiAgICAgIHRoaXMuX2xpdmUuc2F5KGNvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgYXZhaWxhYmxlJyA6IGAke2NvdW50fSByZXN1bHQke2NvdW50ID09PSAxID8gJycgOiAncyd9IGF2YWlsYWJsZWApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCkge1xuICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xuICB9XG59XG4iXX0=