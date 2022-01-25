import { ElementRef, AfterViewInit, EventEmitter, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/api';
export declare const EDITOR_VALUE_ACCESSOR: any;
export declare class Editor implements AfterViewInit, AfterContentInit, ControlValueAccessor {
    el: ElementRef;
    onTextChange: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    toolbar: any;
    style: any;
    styleClass: string;
    placeholder: string;
    formats: string[];
    modules: any;
    bounds: any;
    scrollingContainer: any;
    debug: string;
    onInit: EventEmitter<any>;
    templates: QueryList<any>;
    value: string;
    _readonly: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    quill: any;
    toolbarTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    getQuill(): any;
    get readonly(): boolean;
    set readonly(val: boolean);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Editor, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Editor, "p-editor", never, { "readonly": "readonly"; "style": "style"; "styleClass": "styleClass"; "placeholder": "placeholder"; "formats": "formats"; "modules": "modules"; "bounds": "bounds"; "scrollingContainer": "scrollingContainer"; "debug": "debug"; }, { "onTextChange": "onTextChange"; "onSelectionChange": "onSelectionChange"; "onInit": "onInit"; }, ["toolbar", "templates"], ["p-header"]>;
}
export declare class EditorModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<EditorModule, [typeof Editor], [typeof ɵngcc1.CommonModule], [typeof Editor, typeof ɵngcc2.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<EditorModule>;
}

//# sourceMappingURL=editor.d.ts.map