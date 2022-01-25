import { ElementRef, AfterViewInit, EventEmitter, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
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
    headerTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    getQuill(): any;
    get readonly(): boolean;
    set readonly(val: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<Editor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Editor, "p-editor", never, { "style": "style"; "styleClass": "styleClass"; "placeholder": "placeholder"; "formats": "formats"; "modules": "modules"; "bounds": "bounds"; "scrollingContainer": "scrollingContainer"; "debug": "debug"; "readonly": "readonly"; }, { "onTextChange": "onTextChange"; "onSelectionChange": "onSelectionChange"; "onInit": "onInit"; }, ["toolbar", "templates"], ["p-header"]>;
}
export declare class EditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<EditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<EditorModule, [typeof Editor], [typeof i1.CommonModule], [typeof Editor, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<EditorModule>;
}
