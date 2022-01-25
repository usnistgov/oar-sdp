/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/language-service/ivy/language_service" />
import { CompilerOptions } from '@angular/compiler-cli';
import * as ts from 'typescript/lib/tsserverlibrary';
import { GetTcbResponse } from '../api';
import { CompilerFactory } from './compiler_factory';
interface LanguageServiceConfig {
    /**
     * If true, enable `strictTemplates` in Angular compiler options regardless
     * of its value in tsconfig.json.
     */
    forceStrictTemplates?: true;
}
export declare class LanguageService {
    private readonly project;
    private readonly tsLS;
    private readonly config;
    private options;
    readonly compilerFactory: CompilerFactory;
    private readonly strategy;
    private readonly adapter;
    private readonly parseConfigHost;
    constructor(project: ts.server.Project, tsLS: ts.LanguageService, config: LanguageServiceConfig);
    getCompilerOptions(): CompilerOptions;
    getSemanticDiagnostics(fileName: string): ts.Diagnostic[];
    getDefinitionAndBoundSpan(fileName: string, position: number): ts.DefinitionInfoAndBoundSpan | undefined;
    getTypeDefinitionAtPosition(fileName: string, position: number): readonly ts.DefinitionInfo[] | undefined;
    getQuickInfoAtPosition(fileName: string, position: number): ts.QuickInfo | undefined;
    private getQuickInfoAtPositionImpl;
    getReferencesAtPosition(fileName: string, position: number): ts.ReferenceEntry[] | undefined;
    getRenameInfo(fileName: string, position: number): ts.RenameInfo;
    findRenameLocations(fileName: string, position: number): readonly ts.RenameLocation[] | undefined;
    private getCompletionBuilder;
    getCompletionsAtPosition(fileName: string, position: number, options: ts.GetCompletionsAtPositionOptions | undefined): ts.WithMetadata<ts.CompletionInfo> | undefined;
    private getCompletionsAtPositionImpl;
    getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: ts.FormatCodeOptions | ts.FormatCodeSettings | undefined, preferences: ts.UserPreferences | undefined): ts.CompletionEntryDetails | undefined;
    getCompletionEntrySymbol(fileName: string, position: number, entryName: string): ts.Symbol | undefined;
    getTcb(fileName: string, position: number): GetTcbResponse | undefined;
    /**
     * Provides an instance of the `NgCompiler` and traces perf results. Perf results are logged only
     * if the log level is verbose or higher. This method is intended to be called once per public
     * method call.
     *
     * Here is an example of the log output.
     *
     * Perf 245  [16:16:39.353] LanguageService#getQuickInfoAtPosition(): {"events":{},"phases":{
     * "Unaccounted":379,"TtcSymbol":4},"memory":{}}
     *
     * Passing name of caller instead of using `arguments.caller` because 'caller', 'callee', and
     * 'arguments' properties may not be accessed in strict mode.
     *
     * @param phase the `PerfPhase` to execute the `p` callback in
     * @param p callback to be run synchronously with an instance of the `NgCompiler` as argument
     * @return the result of running the `p` callback
     */
    private withCompilerAndPerfTracing;
    getCompilerOptionsDiagnostics(): ts.Diagnostic[];
    private watchConfigFile;
}
export {};
