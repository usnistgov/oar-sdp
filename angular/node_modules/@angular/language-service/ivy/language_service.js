/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/language-service/ivy/language_service", ["require", "exports", "tslib", "@angular/compiler-cli", "@angular/compiler-cli/src/ngtsc/diagnostics", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/src/ngtsc/perf", "@angular/compiler-cli/src/ngtsc/typecheck", "@angular/compiler-cli/src/ngtsc/typecheck/api", "@angular/compiler-cli/src/ngtsc/typecheck/src/comments", "typescript/lib/tsserverlibrary", "@angular/language-service/ivy/adapters", "@angular/language-service/ivy/compiler_factory", "@angular/language-service/ivy/completions", "@angular/language-service/ivy/definitions", "@angular/language-service/ivy/quick_info", "@angular/language-service/ivy/references", "@angular/language-service/ivy/template_target", "@angular/language-service/ivy/ts_utils", "@angular/language-service/ivy/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LanguageService = void 0;
    var tslib_1 = require("tslib");
    var compiler_cli_1 = require("@angular/compiler-cli");
    var diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var perf_1 = require("@angular/compiler-cli/src/ngtsc/perf");
    var typecheck_1 = require("@angular/compiler-cli/src/ngtsc/typecheck");
    var api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
    var comments_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/src/comments");
    var ts = require("typescript/lib/tsserverlibrary");
    var adapters_1 = require("@angular/language-service/ivy/adapters");
    var compiler_factory_1 = require("@angular/language-service/ivy/compiler_factory");
    var completions_1 = require("@angular/language-service/ivy/completions");
    var definitions_1 = require("@angular/language-service/ivy/definitions");
    var quick_info_1 = require("@angular/language-service/ivy/quick_info");
    var references_1 = require("@angular/language-service/ivy/references");
    var template_target_1 = require("@angular/language-service/ivy/template_target");
    var ts_utils_1 = require("@angular/language-service/ivy/ts_utils");
    var utils_1 = require("@angular/language-service/ivy/utils");
    var LanguageService = /** @class */ (function () {
        function LanguageService(project, tsLS, config) {
            this.project = project;
            this.tsLS = tsLS;
            this.config = config;
            this.parseConfigHost = new adapters_1.LSParseConfigHost(project.projectService.host);
            this.options = parseNgCompilerOptions(project, this.parseConfigHost, config);
            logCompilerOptions(project, this.options);
            this.strategy = createTypeCheckingProgramStrategy(project);
            this.adapter = new adapters_1.LanguageServiceAdapter(project);
            this.compilerFactory = new compiler_factory_1.CompilerFactory(this.adapter, this.strategy, this.options);
            this.watchConfigFile(project);
        }
        LanguageService.prototype.getCompilerOptions = function () {
            return this.options;
        };
        LanguageService.prototype.getSemanticDiagnostics = function (fileName) {
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDiagnostics, function (compiler) {
                var e_1, _a;
                var ttc = compiler.getTemplateTypeChecker();
                var diagnostics = [];
                if (utils_1.isTypeScriptFile(fileName)) {
                    var program = compiler.getNextProgram();
                    var sourceFile_1 = program.getSourceFile(fileName);
                    if (sourceFile_1) {
                        var ngDiagnostics = compiler.getDiagnosticsForFile(sourceFile_1, api_1.OptimizeFor.SingleFile);
                        // There are several kinds of diagnostics returned by `NgCompiler` for a source file:
                        //
                        // 1. Angular-related non-template diagnostics from decorated classes within that
                        // file.
                        // 2. Template diagnostics for components with direct inline templates (a string
                        // literal).
                        // 3. Template diagnostics for components with indirect inline templates (templates
                        // computed
                        //    by expression).
                        // 4. Template diagnostics for components with external templates.
                        //
                        // When showing diagnostics for a TS source file, we want to only include kinds 1 and
                        // 2 - those diagnostics which are reported at a location within the TS file itself.
                        // Diagnostics for external templates will be shown when editing that template file
                        // (the `else` block) below.
                        //
                        // Currently, indirect inline template diagnostics (kind 3) are not shown at all by
                        // the Language Service, because there is no sensible location in the user's code for
                        // them. Such templates are an edge case, though, and should not be common.
                        //
                        // TODO(alxhub): figure out a good user experience for indirect template diagnostics
                        // and show them from within the Language Service.
                        diagnostics.push.apply(diagnostics, tslib_1.__spread(ngDiagnostics.filter(function (diag) { return diag.file !== undefined && diag.file.fileName === sourceFile_1.fileName; })));
                    }
                }
                else {
                    var components = compiler.getComponentsWithTemplateFile(fileName);
                    try {
                        for (var components_1 = tslib_1.__values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                            var component = components_1_1.value;
                            if (ts.isClassDeclaration(component)) {
                                diagnostics.push.apply(diagnostics, tslib_1.__spread(ttc.getDiagnosticsForComponent(component)));
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                return diagnostics;
            });
        };
        LanguageService.prototype.getDefinitionAndBoundSpan = function (fileName, position) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDefinition, function (compiler) {
                if (!isInAngularContext(compiler.getNextProgram(), fileName, position)) {
                    return undefined;
                }
                return new definitions_1.DefinitionBuilder(_this.tsLS, compiler)
                    .getDefinitionAndBoundSpan(fileName, position);
            });
        };
        LanguageService.prototype.getTypeDefinitionAtPosition = function (fileName, position) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDefinition, function (compiler) {
                if (!isTemplateContext(compiler.getNextProgram(), fileName, position)) {
                    return undefined;
                }
                return new definitions_1.DefinitionBuilder(_this.tsLS, compiler)
                    .getTypeDefinitionsAtPosition(fileName, position);
            });
        };
        LanguageService.prototype.getQuickInfoAtPosition = function (fileName, position) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsQuickInfo, function (compiler) {
                return _this.getQuickInfoAtPositionImpl(fileName, position, compiler);
            });
        };
        LanguageService.prototype.getQuickInfoAtPositionImpl = function (fileName, position, compiler) {
            if (!isTemplateContext(compiler.getNextProgram(), fileName, position)) {
                return undefined;
            }
            var templateInfo = utils_1.getTemplateInfoAtPosition(fileName, position, compiler);
            if (templateInfo === undefined) {
                return undefined;
            }
            var positionDetails = template_target_1.getTargetAtPosition(templateInfo.template, position);
            if (positionDetails === null) {
                return undefined;
            }
            // Because we can only show 1 quick info, just use the bound attribute if the target is a two
            // way binding. We may consider concatenating additional display parts from the other target
            // nodes or representing the two way binding in some other manner in the future.
            var node = positionDetails.context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext ?
                positionDetails.context.nodes[0] :
                positionDetails.context.node;
            return new quick_info_1.QuickInfoBuilder(this.tsLS, compiler, templateInfo.component, node).get();
        };
        LanguageService.prototype.getReferencesAtPosition = function (fileName, position) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsReferencesAndRenames, function (compiler) {
                return new references_1.ReferencesAndRenameBuilder(_this.strategy, _this.tsLS, compiler)
                    .getReferencesAtPosition(fileName, position);
            });
        };
        LanguageService.prototype.getRenameInfo = function (fileName, position) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsReferencesAndRenames, function (compiler) {
                var _a, _b, _c;
                var renameInfo = new references_1.ReferencesAndRenameBuilder(_this.strategy, _this.tsLS, compiler)
                    .getRenameInfo(file_system_1.absoluteFrom(fileName), position);
                if (!renameInfo.canRename) {
                    return renameInfo;
                }
                var quickInfo = (_a = _this.getQuickInfoAtPositionImpl(fileName, position, compiler)) !== null && _a !== void 0 ? _a : _this.tsLS.getQuickInfoAtPosition(fileName, position);
                var kind = (_b = quickInfo === null || quickInfo === void 0 ? void 0 : quickInfo.kind) !== null && _b !== void 0 ? _b : ts.ScriptElementKind.unknown;
                var kindModifiers = (_c = quickInfo === null || quickInfo === void 0 ? void 0 : quickInfo.kindModifiers) !== null && _c !== void 0 ? _c : ts.ScriptElementKind.unknown;
                return tslib_1.__assign(tslib_1.__assign({}, renameInfo), { kind: kind, kindModifiers: kindModifiers });
            });
        };
        LanguageService.prototype.findRenameLocations = function (fileName, position) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsReferencesAndRenames, function (compiler) {
                return new references_1.ReferencesAndRenameBuilder(_this.strategy, _this.tsLS, compiler)
                    .findRenameLocations(fileName, position);
            });
        };
        LanguageService.prototype.getCompletionBuilder = function (fileName, position, compiler) {
            var templateInfo = utils_1.getTemplateInfoAtPosition(fileName, position, compiler);
            if (templateInfo === undefined) {
                return null;
            }
            var positionDetails = template_target_1.getTargetAtPosition(templateInfo.template, position);
            if (positionDetails === null) {
                return null;
            }
            // For two-way bindings, we actually only need to be concerned with the bound attribute because
            // the bindings in the template are written with the attribute name, not the event name.
            var node = positionDetails.context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext ?
                positionDetails.context.nodes[0] :
                positionDetails.context.node;
            return new completions_1.CompletionBuilder(this.tsLS, compiler, templateInfo.component, node, positionDetails, utils_1.isTypeScriptFile(fileName));
        };
        LanguageService.prototype.getCompletionsAtPosition = function (fileName, position, options) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCompletions, function (compiler) {
                return _this.getCompletionsAtPositionImpl(fileName, position, options, compiler);
            });
        };
        LanguageService.prototype.getCompletionsAtPositionImpl = function (fileName, position, options, compiler) {
            if (!isTemplateContext(compiler.getNextProgram(), fileName, position)) {
                return undefined;
            }
            var builder = this.getCompletionBuilder(fileName, position, compiler);
            if (builder === null) {
                return undefined;
            }
            return builder.getCompletionsAtPosition(options);
        };
        LanguageService.prototype.getCompletionEntryDetails = function (fileName, position, entryName, formatOptions, preferences) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCompletions, function (compiler) {
                if (!isTemplateContext(compiler.getNextProgram(), fileName, position)) {
                    return undefined;
                }
                var builder = _this.getCompletionBuilder(fileName, position, compiler);
                if (builder === null) {
                    return undefined;
                }
                return builder.getCompletionEntryDetails(entryName, formatOptions, preferences);
            });
        };
        LanguageService.prototype.getCompletionEntrySymbol = function (fileName, position, entryName) {
            var _this = this;
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCompletions, function (compiler) {
                if (!isTemplateContext(compiler.getNextProgram(), fileName, position)) {
                    return undefined;
                }
                var builder = _this.getCompletionBuilder(fileName, position, compiler);
                if (builder === null) {
                    return undefined;
                }
                var result = builder.getCompletionEntrySymbol(entryName);
                _this.compilerFactory.registerLastKnownProgram();
                return result;
            });
        };
        LanguageService.prototype.getTcb = function (fileName, position) {
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsTcb, function (compiler) {
                var templateInfo = utils_1.getTemplateInfoAtPosition(fileName, position, compiler);
                if (templateInfo === undefined) {
                    return undefined;
                }
                var tcb = compiler.getTemplateTypeChecker().getTypeCheckBlock(templateInfo.component);
                if (tcb === null) {
                    return undefined;
                }
                var sf = tcb.getSourceFile();
                var selections = [];
                var target = template_target_1.getTargetAtPosition(templateInfo.template, position);
                if (target !== null) {
                    var selectionSpans = void 0;
                    if ('nodes' in target.context) {
                        selectionSpans = target.context.nodes.map(function (n) { return n.sourceSpan; });
                    }
                    else {
                        selectionSpans = [target.context.node.sourceSpan];
                    }
                    var selectionNodes = selectionSpans
                        .map(function (s) { return comments_1.findFirstMatchingNode(tcb, {
                        withSpan: s,
                        filter: function (node) { return true; },
                    }); })
                        .filter(function (n) { return n !== null; });
                    selections = selectionNodes.map(function (n) {
                        return {
                            start: n.getStart(sf),
                            length: n.getEnd() - n.getStart(sf),
                        };
                    });
                }
                return {
                    fileName: sf.fileName,
                    content: sf.getFullText(),
                    selections: selections,
                };
            });
        };
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
        LanguageService.prototype.withCompilerAndPerfTracing = function (phase, p) {
            var compiler = this.compilerFactory.getOrCreate();
            var result = compiler.perfRecorder.inPhase(phase, function () { return p(compiler); });
            this.compilerFactory.registerLastKnownProgram();
            var logger = this.project.projectService.logger;
            if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                logger.perftrc("LanguageService#" + perf_1.PerfPhase[phase] + ": " + JSON.stringify(compiler.perfRecorder.finalize()));
            }
            return result;
        };
        LanguageService.prototype.getCompilerOptionsDiagnostics = function () {
            var _this = this;
            var project = this.project;
            if (!(project instanceof ts.server.ConfiguredProject)) {
                return [];
            }
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDiagnostics, function (compiler) {
                var diagnostics = [];
                var configSourceFile = ts.readJsonConfigFile(project.getConfigFilePath(), function (path) { return project.readFile(path); });
                if (!_this.options.strictTemplates && !_this.options.fullTemplateTypeCheck) {
                    diagnostics.push({
                        messageText: 'Some language features are not available. ' +
                            'To access all features, enable `strictTemplates` in `angularCompilerOptions`.',
                        category: ts.DiagnosticCategory.Suggestion,
                        code: diagnostics_1.ngErrorCode(diagnostics_1.ErrorCode.SUGGEST_STRICT_TEMPLATES),
                        file: configSourceFile,
                        start: undefined,
                        length: undefined,
                    });
                }
                diagnostics.push.apply(diagnostics, tslib_1.__spread(compiler.getOptionDiagnostics()));
                return diagnostics;
            });
        };
        LanguageService.prototype.watchConfigFile = function (project) {
            var _this = this;
            // TODO: Check the case when the project is disposed. An InferredProject
            // could be disposed when a tsconfig.json is added to the workspace,
            // in which case it becomes a ConfiguredProject (or vice-versa).
            // We need to make sure that the FileWatcher is closed.
            if (!(project instanceof ts.server.ConfiguredProject)) {
                return;
            }
            var host = project.projectService.host;
            host.watchFile(project.getConfigFilePath(), function (fileName, eventKind) {
                project.log("Config file changed: " + fileName);
                if (eventKind === ts.FileWatcherEventKind.Changed) {
                    _this.options = parseNgCompilerOptions(project, _this.parseConfigHost, _this.config);
                    logCompilerOptions(project, _this.options);
                }
            });
        };
        return LanguageService;
    }());
    exports.LanguageService = LanguageService;
    function logCompilerOptions(project, options) {
        var logger = project.projectService.logger;
        var projectName = project.getProjectName();
        logger.info("Angular compiler options for " + projectName + ": " + JSON.stringify(options, null, 2));
    }
    function parseNgCompilerOptions(project, host, config) {
        if (!(project instanceof ts.server.ConfiguredProject)) {
            return {};
        }
        var _a = compiler_cli_1.readConfiguration(project.getConfigFilePath(), /* existingOptions */ undefined, host), options = _a.options, errors = _a.errors;
        if (errors.length > 0) {
            project.setProjectErrors(errors);
        }
        // Projects loaded into the Language Service often include test files which are not part of the
        // app's main compilation unit, and these test files often include inline NgModules that declare
        // components from the app. These declarations conflict with the main declarations of such
        // components in the app's NgModules. This conflict is not normally present during regular
        // compilation because the app and the tests are part of separate compilation units.
        //
        // As a temporary mitigation of this problem, we instruct the compiler to ignore classes which
        // are not exported. In many cases, this ensures the test NgModules are ignored by the compiler
        // and only the real component declaration is used.
        options.compileNonExportedClasses = false;
        // If `forceStrictTemplates` is true, always enable `strictTemplates`
        // regardless of its value in tsconfig.json.
        if (config.forceStrictTemplates === true) {
            options.strictTemplates = true;
        }
        return options;
    }
    function createTypeCheckingProgramStrategy(project) {
        return {
            supportsInlineOperations: false,
            shimPathForComponent: function (component) {
                return typecheck_1.TypeCheckShimGenerator.shimFor(file_system_1.absoluteFromSourceFile(component.getSourceFile()));
            },
            getProgram: function () {
                var program = project.getLanguageService().getProgram();
                if (!program) {
                    throw new Error('Language service does not have a program!');
                }
                return program;
            },
            updateFiles: function (contents) {
                var e_2, _a;
                try {
                    for (var contents_1 = tslib_1.__values(contents), contents_1_1 = contents_1.next(); !contents_1_1.done; contents_1_1 = contents_1.next()) {
                        var _b = tslib_1.__read(contents_1_1.value, 2), fileName = _b[0], newText = _b[1];
                        var scriptInfo = getOrCreateTypeCheckScriptInfo(project, fileName);
                        var snapshot = scriptInfo.getSnapshot();
                        var length_1 = snapshot.getLength();
                        scriptInfo.editContent(0, length_1, newText);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (contents_1_1 && !contents_1_1.done && (_a = contents_1.return)) _a.call(contents_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            },
        };
    }
    function getOrCreateTypeCheckScriptInfo(project, tcf) {
        // First check if there is already a ScriptInfo for the tcf
        var projectService = project.projectService;
        var scriptInfo = projectService.getScriptInfo(tcf);
        if (!scriptInfo) {
            // ScriptInfo needs to be opened by client to be able to set its user-defined
            // content. We must also provide file content, otherwise the service will
            // attempt to fetch the content from disk and fail.
            scriptInfo = projectService.getOrCreateScriptInfoForNormalizedPath(ts.server.toNormalizedPath(tcf), true, // openedByClient
            '', // fileContent
            // script info added by plugins should be marked as external, see
            // https://github.com/microsoft/TypeScript/blob/b217f22e798c781f55d17da72ed099a9dee5c650/src/compiler/program.ts#L1897-L1899
            ts.ScriptKind.External);
            if (!scriptInfo) {
                throw new Error("Failed to create script info for " + tcf);
            }
        }
        // Add ScriptInfo to project if it's missing. A ScriptInfo needs to be part of
        // the project so that it becomes part of the program.
        if (!project.containsScriptInfo(scriptInfo)) {
            project.addRoot(scriptInfo);
        }
        return scriptInfo;
    }
    function isTemplateContext(program, fileName, position) {
        if (!utils_1.isTypeScriptFile(fileName)) {
            // If we aren't in a TS file, we must be in an HTML file, which we treat as template context
            return true;
        }
        var node = findTightestNodeAtPosition(program, fileName, position);
        if (node === undefined) {
            return false;
        }
        var asgn = ts_utils_1.getPropertyAssignmentFromValue(node, 'template');
        if (asgn === null) {
            return false;
        }
        return ts_utils_1.getClassDeclFromDecoratorProp(asgn) !== null;
    }
    function isInAngularContext(program, fileName, position) {
        var _a, _b;
        if (!utils_1.isTypeScriptFile(fileName)) {
            return true;
        }
        var node = findTightestNodeAtPosition(program, fileName, position);
        if (node === undefined) {
            return false;
        }
        var asgn = (_b = (_a = ts_utils_1.getPropertyAssignmentFromValue(node, 'template')) !== null && _a !== void 0 ? _a : ts_utils_1.getPropertyAssignmentFromValue(node, 'templateUrl')) !== null && _b !== void 0 ? _b : ts_utils_1.getPropertyAssignmentFromValue(node.parent, 'styleUrls');
        return asgn !== null && ts_utils_1.getClassDeclFromDecoratorProp(asgn) !== null;
    }
    function findTightestNodeAtPosition(program, fileName, position) {
        var sourceFile = program.getSourceFile(fileName);
        if (sourceFile === undefined) {
            return undefined;
        }
        return ts_utils_1.findTightestNode(sourceFile, position);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Vfc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xhbmd1YWdlLXNlcnZpY2UvaXZ5L2xhbmd1YWdlX3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7OztJQUdILHNEQUE0RjtJQUU1RiwyRUFBbUY7SUFDbkYsMkVBQWlIO0lBQ2pILDZEQUErRDtJQUMvRCx1RUFBaUY7SUFDakYscUVBQXVHO0lBQ3ZHLG1GQUE2RjtJQUM3RixtREFBcUQ7SUFHckQsbUVBQXFFO0lBQ3JFLG1GQUFtRDtJQUNuRCx5RUFBdUU7SUFDdkUseUVBQWdEO0lBQ2hELHVFQUE4QztJQUM5Qyx1RUFBd0Q7SUFDeEQsaUZBQXFGO0lBQ3JGLG1FQUEyRztJQUMzRyw2REFBb0U7SUFVcEU7UUFPRSx5QkFDcUIsT0FBMEIsRUFDMUIsSUFBd0IsRUFDeEIsTUFBNkI7WUFGN0IsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7WUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBb0I7WUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7WUFFaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLDRCQUFpQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3RSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsaUNBQWlDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlDQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxrQ0FB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QUU7WUFDNUIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxPQUFPLDJCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QWJzb2x1dGVTb3VyY2VTcGFuLCBBU1QsIFBhcnNlU291cmNlU3BhbiwgVG1wbEFzdEJvdW5kRXZlbnQsIFRtcGxBc3ROb2RlfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0NvbXBpbGVyT3B0aW9ucywgQ29uZmlndXJhdGlvbkhvc3QsIHJlYWRDb25maWd1cmF0aW9ufSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGknO1xuaW1wb3J0IHtOZ0NvbXBpbGVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2NvcmUnO1xuaW1wb3J0IHtFcnJvckNvZGUsIG5nRXJyb3JDb2RlfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2RpYWdub3N0aWNzJztcbmltcG9ydCB7YWJzb2x1dGVGcm9tLCBhYnNvbHV0ZUZyb21Tb3VyY2VGaWxlLCBBYnNvbHV0ZUZzUGF0aH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge1BlcmZQaGFzZX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9wZXJmJztcbmltcG9ydCB7VHlwZUNoZWNrU2hpbUdlbmVyYXRvcn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy90eXBlY2hlY2snO1xuaW1wb3J0IHtPcHRpbWl6ZUZvciwgVHlwZUNoZWNraW5nUHJvZ3JhbVN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL3R5cGVjaGVjay9hcGknO1xuaW1wb3J0IHtmaW5kRmlyc3RNYXRjaGluZ05vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvdHlwZWNoZWNrL3NyYy9jb21tZW50cyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0L2xpYi90c3NlcnZlcmxpYnJhcnknO1xuaW1wb3J0IHtHZXRUY2JSZXNwb25zZX0gZnJvbSAnLi4vYXBpJztcblxuaW1wb3J0IHtMYW5ndWFnZVNlcnZpY2VBZGFwdGVyLCBMU1BhcnNlQ29uZmlnSG9zdH0gZnJvbSAnLi9hZGFwdGVycyc7XG5pbXBvcnQge0NvbXBpbGVyRmFjdG9yeX0gZnJvbSAnLi9jb21waWxlcl9mYWN0b3J5JztcbmltcG9ydCB7Q29tcGxldGlvbkJ1aWxkZXIsIENvbXBsZXRpb25Ob2RlQ29udGV4dH0gZnJvbSAnLi9jb21wbGV0aW9ucyc7XG5pbXBvcnQge0RlZmluaXRpb25CdWlsZGVyfSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7UXVpY2tJbmZvQnVpbGRlcn0gZnJvbSAnLi9xdWlja19pbmZvJztcbmltcG9ydCB7UmVmZXJlbmNlc0FuZFJlbmFtZUJ1aWxkZXJ9IGZyb20gJy4vcmVmZXJlbmNlcyc7XG5pbXBvcnQge2dldFRhcmdldEF0UG9zaXRpb24sIFRhcmdldENvbnRleHQsIFRhcmdldE5vZGVLaW5kfSBmcm9tICcuL3RlbXBsYXRlX3RhcmdldCc7XG5pbXBvcnQge2ZpbmRUaWdodGVzdE5vZGUsIGdldENsYXNzRGVjbEZyb21EZWNvcmF0b3JQcm9wLCBnZXRQcm9wZXJ0eUFzc2lnbm1lbnRGcm9tVmFsdWV9IGZyb20gJy4vdHNfdXRpbHMnO1xuaW1wb3J0IHtnZXRUZW1wbGF0ZUluZm9BdFBvc2l0aW9uLCBpc1R5cGVTY3JpcHRGaWxlfSBmcm9tICcuL3V0aWxzJztcblxuaW50ZXJmYWNlIExhbmd1YWdlU2VydmljZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCBlbmFibGUgYHN0cmljdFRlbXBsYXRlc2AgaW4gQW5ndWxhciBjb21waWxlciBvcHRpb25zIHJlZ2FyZGxlc3NcbiAgICogb2YgaXRzIHZhbHVlIGluIHRzY29uZmlnLmpzb24uXG4gICAqL1xuICBmb3JjZVN0cmljdFRlbXBsYXRlcz86IHRydWU7XG59XG5cbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlcnZpY2Uge1xuICBwcml2YXRlIG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucztcbiAgcmVhZG9ubHkgY29tcGlsZXJGYWN0b3J5OiBDb21waWxlckZhY3Rvcnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RyYXRlZ3k6IFR5cGVDaGVja2luZ1Byb2dyYW1TdHJhdGVneTtcbiAgcHJpdmF0ZSByZWFkb25seSBhZGFwdGVyOiBMYW5ndWFnZVNlcnZpY2VBZGFwdGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHBhcnNlQ29uZmlnSG9zdDogTFNQYXJzZUNvbmZpZ0hvc3Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHByb2plY3Q6IHRzLnNlcnZlci5Qcm9qZWN0LFxuICAgICAgcHJpdmF0ZSByZWFkb25seSB0c0xTOiB0cy5MYW5ndWFnZVNlcnZpY2UsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogTGFuZ3VhZ2VTZXJ2aWNlQ29uZmlnLFxuICApIHtcbiAgICB0aGlzLnBhcnNlQ29uZmlnSG9zdCA9IG5ldyBMU1BhcnNlQ29uZmlnSG9zdChwcm9qZWN0LnByb2plY3RTZXJ2aWNlLmhvc3QpO1xuICAgIHRoaXMub3B0aW9ucyA9IHBhcnNlTmdDb21waWxlck9wdGlvbnMocHJvamVjdCwgdGhpcy5wYXJzZUNvbmZpZ0hvc3QsIGNvbmZpZyk7XG4gICAgbG9nQ29tcGlsZXJPcHRpb25zKHByb2plY3QsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5zdHJhdGVneSA9IGNyZWF0ZVR5cGVDaGVja2luZ1Byb2dyYW1TdHJhdGVneShwcm9qZWN0KTtcbiAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgTGFuZ3VhZ2VTZXJ2aWNlQWRhcHRlcihwcm9qZWN0KTtcbiAgICB0aGlzLmNvbXBpbGVyRmFjdG9yeSA9IG5ldyBDb21waWxlckZhY3RvcnkodGhpcy5hZGFwdGVyLCB0aGlzLnN0cmF0ZWd5LCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMud2F0Y2hDb25maWdGaWxlKHByb2plY3QpO1xuICB9XG5cbiAgZ2V0Q29tcGlsZXJPcHRpb25zKCk6IENvbXBpbGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgfVxuXG4gIGdldFNlbWFudGljRGlhZ25vc3RpY3MoZmlsZU5hbWU6IHN0cmluZyk6IHRzLkRpYWdub3N0aWNbXSB7XG4gICAgcmV0dXJuIHRoaXMud2l0aENvbXBpbGVyQW5kUGVyZlRyYWNpbmcoUGVyZlBoYXNlLkxzRGlhZ25vc3RpY3MsIChjb21waWxlcikgPT4ge1xuICAgICAgY29uc3QgdHRjID0gY29tcGlsZXIuZ2V0VGVtcGxhdGVUeXBlQ2hlY2tlcigpO1xuICAgICAgY29uc3QgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSA9IFtdO1xuICAgICAgaWYgKGlzVHlwZVNjcmlwdEZpbGUoZmlsZU5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBjb21waWxlci5nZXROZXh0UHJvZ3JhbSgpO1xuICAgICAgICBjb25zdCBzb3VyY2VGaWxlID0gcHJvZ3JhbS5nZXRTb3VyY2VGaWxlKGZpbGVOYW1lKTtcbiAgICAgICAgaWYgKHNvdXJjZUZpbGUpIHtcbiAgICAgICAgICBjb25zdCBuZ0RpYWdub3N0aWNzID0gY29tcGlsZXIuZ2V0RGlhZ25vc3RpY3NGb3JGaWxlKHNvdXJjZUZpbGUsIE9wdGltaXplRm9yLlNpbmdsZUZpbGUpO1xuICAgICAgICAgIC8vIFRoZXJlIGFyZSBzZXZlcmFsIGtpbmRzIG9mIGRpYWdub3N0aWNzIHJldHVybmVkIGJ5IGBOZ0NvbXBpbGVyYCBmb3IgYSBzb3VyY2UgZmlsZTpcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIDEuIEFuZ3VsYXItcmVsYXRlZCBub24tdGVtcGxhdGUgZGlhZ25vc3RpY3MgZnJvbSBkZWNvcmF0ZWQgY2xhc3NlcyB3aXRoaW4gdGhhdFxuICAgICAgICAgIC8vIGZpbGUuXG4gICAgICAgICAgLy8gMi4gVGVtcGxhdGUgZGlhZ25vc3RpY3MgZm9yIGNvbXBvbmVudHMgd2l0aCBkaXJlY3QgaW5saW5lIHRlbXBsYXRlcyAoYSBzdHJpbmdcbiAgICAgICAgICAvLyBsaXRlcmFsKS5cbiAgICAgICAgICAvLyAzLiBUZW1wbGF0ZSBkaWFnbm9zdGljcyBmb3IgY29tcG9uZW50cyB3aXRoIGluZGlyZWN0IGlubGluZSB0ZW1wbGF0ZXMgKHRlbXBsYXRlc1xuICAgICAgICAgIC8vIGNvbXB1dGVkXG4gICAgICAgICAgLy8gICAgYnkgZXhwcmVzc2lvbikuXG4gICAgICAgICAgLy8gNC4gVGVtcGxhdGUgZGlhZ25vc3RpY3MgZm9yIGNvbXBvbmVudHMgd2l0aCBleHRlcm5hbCB0ZW1wbGF0ZXMuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBXaGVuIHNob3dpbmcgZGlhZ25vc3RpY3MgZm9yIGEgVFMgc291cmNlIGZpbGUsIHdlIHdhbnQgdG8gb25seSBpbmNsdWRlIGtpbmRzIDEgYW5kXG4gICAgICAgICAgLy8gMiAtIHRob3NlIGRpYWdub3N0aWNzIHdoaWNoIGFyZSByZXBvcnRlZCBhdCBhIGxvY2F0aW9uIHdpdGhpbiB0aGUgVFMgZmlsZSBpdHNlbGYuXG4gICAgICAgICAgLy8gRGlhZ25vc3RpY3MgZm9yIGV4dGVybmFsIHRlbXBsYXRlcyB3aWxsIGJlIHNob3duIHdoZW4gZWRpdGluZyB0aGF0IHRlbXBsYXRlIGZpbGVcbiAgICAgICAgICAvLyAodGhlIGBlbHNlYCBibG9jaykgYmVsb3cuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBDdXJyZW50bHksIGluZGlyZWN0IGlubGluZSB0ZW1wbGF0ZSBkaWFnbm9zdGljcyAoa2luZCAzKSBhcmUgbm90IHNob3duIGF0IGFsbCBieVxuICAgICAgICAgIC8vIHRoZSBMYW5ndWFnZSBTZXJ2aWNlLCBiZWNhdXNlIHRoZXJlIGlzIG5vIHNlbnNpYmxlIGxvY2F0aW9uIGluIHRoZSB1c2VyJ3MgY29kZSBmb3JcbiAgICAgICAgICAvLyB0aGVtLiBTdWNoIHRlbXBsYXRlcyBhcmUgYW4gZWRnZSBjYXNlLCB0aG91Z2gsIGFuZCBzaG91bGQgbm90IGJlIGNvbW1vbi5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIFRPRE8oYWx4aHViKTogZmlndXJlIG91dCBhIGdvb2QgdXNlciBleHBlcmllbmNlIGZvciBpbmRpcmVjdCB0ZW1wbGF0ZSBkaWFnbm9zdGljc1xuICAgICAgICAgIC8vIGFuZCBzaG93IHRoZW0gZnJvbSB3aXRoaW4gdGhlIExhbmd1YWdlIFNlcnZpY2UuXG4gICAgICAgICAgZGlhZ25vc3RpY3MucHVzaCguLi5uZ0RpYWdub3N0aWNzLmZpbHRlcihcbiAgICAgICAgICAgICAgZGlhZyA9PiBkaWFnLmZpbGUgIT09IHVuZGVmaW5lZCAmJiBkaWFnLmZpbGUuZmlsZU5hbWUgPT09IHNvdXJjZUZpbGUuZmlsZU5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IGNvbXBpbGVyLmdldENvbXBvbmVudHNXaXRoVGVtcGxhdGVGaWxlKGZpbGVOYW1lKTtcbiAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgY29tcG9uZW50cykge1xuICAgICAgICAgIGlmICh0cy5pc0NsYXNzRGVjbGFyYXRpb24oY29tcG9uZW50KSkge1xuICAgICAgICAgICAgZGlhZ25vc3RpY3MucHVzaCguLi50dGMuZ2V0RGlhZ25vc3RpY3NGb3JDb21wb25lbnQoY29tcG9uZW50KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGlhZ25vc3RpY3M7XG4gICAgfSk7XG4gIH1cblxuICBnZXREZWZpbml0aW9uQW5kQm91bmRTcGFuKGZpbGVOYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpOiB0cy5EZWZpbml0aW9uSW5mb0FuZEJvdW5kU3BhblxuICAgICAgfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMud2l0aENvbXBpbGVyQW5kUGVyZlRyYWNpbmcoUGVyZlBoYXNlLkxzRGVmaW5pdGlvbiwgKGNvbXBpbGVyKSA9PiB7XG4gICAgICBpZiAoIWlzSW5Bbmd1bGFyQ29udGV4dChjb21waWxlci5nZXROZXh0UHJvZ3JhbSgpLCBmaWxlTmFtZSwgcG9zaXRpb24pKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERlZmluaXRpb25CdWlsZGVyKHRoaXMudHNMUywgY29tcGlsZXIpXG4gICAgICAgICAgLmdldERlZmluaXRpb25BbmRCb3VuZFNwYW4oZmlsZU5hbWUsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFR5cGVEZWZpbml0aW9uQXRQb3NpdGlvbihmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKTpcbiAgICAgIHJlYWRvbmx5IHRzLkRlZmluaXRpb25JbmZvW118dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZyhQZXJmUGhhc2UuTHNEZWZpbml0aW9uLCAoY29tcGlsZXIpID0+IHtcbiAgICAgIGlmICghaXNUZW1wbGF0ZUNvbnRleHQoY29tcGlsZXIuZ2V0TmV4dFByb2dyYW0oKSwgZmlsZU5hbWUsIHBvc2l0aW9uKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBEZWZpbml0aW9uQnVpbGRlcih0aGlzLnRzTFMsIGNvbXBpbGVyKVxuICAgICAgICAgIC5nZXRUeXBlRGVmaW5pdGlvbnNBdFBvc2l0aW9uKGZpbGVOYW1lLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRRdWlja0luZm9BdFBvc2l0aW9uKGZpbGVOYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpOiB0cy5RdWlja0luZm98dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZyhQZXJmUGhhc2UuTHNRdWlja0luZm8sIChjb21waWxlcikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UXVpY2tJbmZvQXRQb3NpdGlvbkltcGwoZmlsZU5hbWUsIHBvc2l0aW9uLCBjb21waWxlcik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFF1aWNrSW5mb0F0UG9zaXRpb25JbXBsKFxuICAgICAgZmlsZU5hbWU6IHN0cmluZyxcbiAgICAgIHBvc2l0aW9uOiBudW1iZXIsXG4gICAgICBjb21waWxlcjogTmdDb21waWxlcixcbiAgICAgICk6IHRzLlF1aWNrSW5mb3x1bmRlZmluZWQge1xuICAgIGlmICghaXNUZW1wbGF0ZUNvbnRleHQoY29tcGlsZXIuZ2V0TmV4dFByb2dyYW0oKSwgZmlsZU5hbWUsIHBvc2l0aW9uKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUluZm8gPSBnZXRUZW1wbGF0ZUluZm9BdFBvc2l0aW9uKGZpbGVOYW1lLCBwb3NpdGlvbiwgY29tcGlsZXIpO1xuICAgIGlmICh0ZW1wbGF0ZUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb25EZXRhaWxzID0gZ2V0VGFyZ2V0QXRQb3NpdGlvbih0ZW1wbGF0ZUluZm8udGVtcGxhdGUsIHBvc2l0aW9uKTtcbiAgICBpZiAocG9zaXRpb25EZXRhaWxzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIEJlY2F1c2Ugd2UgY2FuIG9ubHkgc2hvdyAxIHF1aWNrIGluZm8sIGp1c3QgdXNlIHRoZSBib3VuZCBhdHRyaWJ1dGUgaWYgdGhlIHRhcmdldCBpcyBhIHR3b1xuICAgIC8vIHdheSBiaW5kaW5nLiBXZSBtYXkgY29uc2lkZXIgY29uY2F0ZW5hdGluZyBhZGRpdGlvbmFsIGRpc3BsYXkgcGFydHMgZnJvbSB0aGUgb3RoZXIgdGFyZ2V0XG4gICAgLy8gbm9kZXMgb3IgcmVwcmVzZW50aW5nIHRoZSB0d28gd2F5IGJpbmRpbmcgaW4gc29tZSBvdGhlciBtYW5uZXIgaW4gdGhlIGZ1dHVyZS5cbiAgICBjb25zdCBub2RlID0gcG9zaXRpb25EZXRhaWxzLmNvbnRleHQua2luZCA9PT0gVGFyZ2V0Tm9kZUtpbmQuVHdvV2F5QmluZGluZ0NvbnRleHQgP1xuICAgICAgICBwb3NpdGlvbkRldGFpbHMuY29udGV4dC5ub2Rlc1swXSA6XG4gICAgICAgIHBvc2l0aW9uRGV0YWlscy5jb250ZXh0Lm5vZGU7XG4gICAgcmV0dXJuIG5ldyBRdWlja0luZm9CdWlsZGVyKHRoaXMudHNMUywgY29tcGlsZXIsIHRlbXBsYXRlSW5mby5jb21wb25lbnQsIG5vZGUpLmdldCgpO1xuICB9XG5cbiAgZ2V0UmVmZXJlbmNlc0F0UG9zaXRpb24oZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlcik6IHRzLlJlZmVyZW5jZUVudHJ5W118dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZyhQZXJmUGhhc2UuTHNSZWZlcmVuY2VzQW5kUmVuYW1lcywgKGNvbXBpbGVyKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZXNBbmRSZW5hbWVCdWlsZGVyKHRoaXMuc3RyYXRlZ3ksIHRoaXMudHNMUywgY29tcGlsZXIpXG4gICAgICAgICAgLmdldFJlZmVyZW5jZXNBdFBvc2l0aW9uKGZpbGVOYW1lLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRSZW5hbWVJbmZvKGZpbGVOYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpOiB0cy5SZW5hbWVJbmZvIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZyhQZXJmUGhhc2UuTHNSZWZlcmVuY2VzQW5kUmVuYW1lcywgKGNvbXBpbGVyKSA9PiB7XG4gICAgICBjb25zdCByZW5hbWVJbmZvID0gbmV3IFJlZmVyZW5jZXNBbmRSZW5hbWVCdWlsZGVyKHRoaXMuc3RyYXRlZ3ksIHRoaXMudHNMUywgY29tcGlsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRSZW5hbWVJbmZvKGFic29sdXRlRnJvbShmaWxlTmFtZSksIHBvc2l0aW9uKTtcbiAgICAgIGlmICghcmVuYW1lSW5mby5jYW5SZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHJlbmFtZUluZm87XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1aWNrSW5mbyA9IHRoaXMuZ2V0UXVpY2tJbmZvQXRQb3NpdGlvbkltcGwoZmlsZU5hbWUsIHBvc2l0aW9uLCBjb21waWxlcikgPz9cbiAgICAgICAgICB0aGlzLnRzTFMuZ2V0UXVpY2tJbmZvQXRQb3NpdGlvbihmaWxlTmFtZSwgcG9zaXRpb24pO1xuICAgICAgY29uc3Qga2luZCA9IHF1aWNrSW5mbz8ua2luZCA/PyB0cy5TY3JpcHRFbGVtZW50S2luZC51bmtub3duO1xuICAgICAgY29uc3Qga2luZE1vZGlmaWVycyA9IHF1aWNrSW5mbz8ua2luZE1vZGlmaWVycyA/PyB0cy5TY3JpcHRFbGVtZW50S2luZC51bmtub3duO1xuICAgICAgcmV0dXJuIHsuLi5yZW5hbWVJbmZvLCBraW5kLCBraW5kTW9kaWZpZXJzfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRSZW5hbWVMb2NhdGlvbnMoZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlcik6IHJlYWRvbmx5IHRzLlJlbmFtZUxvY2F0aW9uW118dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZyhQZXJmUGhhc2UuTHNSZWZlcmVuY2VzQW5kUmVuYW1lcywgKGNvbXBpbGVyKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZXNBbmRSZW5hbWVCdWlsZGVyKHRoaXMuc3RyYXRlZ3ksIHRoaXMudHNMUywgY29tcGlsZXIpXG4gICAgICAgICAgLmZpbmRSZW5hbWVMb2NhdGlvbnMoZmlsZU5hbWUsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29tcGxldGlvbkJ1aWxkZXIoZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlciwgY29tcGlsZXI6IE5nQ29tcGlsZXIpOlxuICAgICAgQ29tcGxldGlvbkJ1aWxkZXI8VG1wbEFzdE5vZGV8QVNUPnxudWxsIHtcbiAgICBjb25zdCB0ZW1wbGF0ZUluZm8gPSBnZXRUZW1wbGF0ZUluZm9BdFBvc2l0aW9uKGZpbGVOYW1lLCBwb3NpdGlvbiwgY29tcGlsZXIpO1xuICAgIGlmICh0ZW1wbGF0ZUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHBvc2l0aW9uRGV0YWlscyA9IGdldFRhcmdldEF0UG9zaXRpb24odGVtcGxhdGVJbmZvLnRlbXBsYXRlLCBwb3NpdGlvbik7XG4gICAgaWYgKHBvc2l0aW9uRGV0YWlscyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gRm9yIHR3by13YXkgYmluZGluZ3MsIHdlIGFjdHVhbGx5IG9ubHkgbmVlZCB0byBiZSBjb25jZXJuZWQgd2l0aCB0aGUgYm91bmQgYXR0cmlidXRlIGJlY2F1c2VcbiAgICAvLyB0aGUgYmluZGluZ3MgaW4gdGhlIHRlbXBsYXRlIGFyZSB3cml0dGVuIHdpdGggdGhlIGF0dHJpYnV0ZSBuYW1lLCBub3QgdGhlIGV2ZW50IG5hbWUuXG4gICAgY29uc3Qgbm9kZSA9IHBvc2l0aW9uRGV0YWlscy5jb250ZXh0LmtpbmQgPT09IFRhcmdldE5vZGVLaW5kLlR3b1dheUJpbmRpbmdDb250ZXh0ID9cbiAgICAgICAgcG9zaXRpb25EZXRhaWxzLmNvbnRleHQubm9kZXNbMF0gOlxuICAgICAgICBwb3NpdGlvbkRldGFpbHMuY29udGV4dC5ub2RlO1xuICAgIHJldHVybiBuZXcgQ29tcGxldGlvbkJ1aWxkZXIoXG4gICAgICAgIHRoaXMudHNMUywgY29tcGlsZXIsIHRlbXBsYXRlSW5mby5jb21wb25lbnQsIG5vZGUsIHBvc2l0aW9uRGV0YWlscyxcbiAgICAgICAgaXNUeXBlU2NyaXB0RmlsZShmaWxlTmFtZSkpO1xuICB9XG5cbiAgZ2V0Q29tcGxldGlvbnNBdFBvc2l0aW9uKFxuICAgICAgZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlciwgb3B0aW9uczogdHMuR2V0Q29tcGxldGlvbnNBdFBvc2l0aW9uT3B0aW9uc3x1bmRlZmluZWQpOlxuICAgICAgdHMuV2l0aE1ldGFkYXRhPHRzLkNvbXBsZXRpb25JbmZvPnx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLndpdGhDb21waWxlckFuZFBlcmZUcmFjaW5nKFBlcmZQaGFzZS5Mc0NvbXBsZXRpb25zLCAoY29tcGlsZXIpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmdldENvbXBsZXRpb25zQXRQb3NpdGlvbkltcGwoZmlsZU5hbWUsIHBvc2l0aW9uLCBvcHRpb25zLCBjb21waWxlcik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbXBsZXRpb25zQXRQb3NpdGlvbkltcGwoXG4gICAgICBmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyLCBvcHRpb25zOiB0cy5HZXRDb21wbGV0aW9uc0F0UG9zaXRpb25PcHRpb25zfHVuZGVmaW5lZCxcbiAgICAgIGNvbXBpbGVyOiBOZ0NvbXBpbGVyKTogdHMuV2l0aE1ldGFkYXRhPHRzLkNvbXBsZXRpb25JbmZvPnx1bmRlZmluZWQge1xuICAgIGlmICghaXNUZW1wbGF0ZUNvbnRleHQoY29tcGlsZXIuZ2V0TmV4dFByb2dyYW0oKSwgZmlsZU5hbWUsIHBvc2l0aW9uKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZGVyID0gdGhpcy5nZXRDb21wbGV0aW9uQnVpbGRlcihmaWxlTmFtZSwgcG9zaXRpb24sIGNvbXBpbGVyKTtcbiAgICBpZiAoYnVpbGRlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGJ1aWxkZXIuZ2V0Q29tcGxldGlvbnNBdFBvc2l0aW9uKG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0Q29tcGxldGlvbkVudHJ5RGV0YWlscyhcbiAgICAgIGZpbGVOYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIsIGVudHJ5TmFtZTogc3RyaW5nLFxuICAgICAgZm9ybWF0T3B0aW9uczogdHMuRm9ybWF0Q29kZU9wdGlvbnN8dHMuRm9ybWF0Q29kZVNldHRpbmdzfHVuZGVmaW5lZCxcbiAgICAgIHByZWZlcmVuY2VzOiB0cy5Vc2VyUHJlZmVyZW5jZXN8dW5kZWZpbmVkKTogdHMuQ29tcGxldGlvbkVudHJ5RGV0YWlsc3x1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLndpdGhDb21waWxlckFuZFBlcmZUcmFjaW5nKFBlcmZQaGFzZS5Mc0NvbXBsZXRpb25zLCAoY29tcGlsZXIpID0+IHtcbiAgICAgIGlmICghaXNUZW1wbGF0ZUNvbnRleHQoY29tcGlsZXIuZ2V0TmV4dFByb2dyYW0oKSwgZmlsZU5hbWUsIHBvc2l0aW9uKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidWlsZGVyID0gdGhpcy5nZXRDb21wbGV0aW9uQnVpbGRlcihmaWxlTmFtZSwgcG9zaXRpb24sIGNvbXBpbGVyKTtcbiAgICAgIGlmIChidWlsZGVyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVpbGRlci5nZXRDb21wbGV0aW9uRW50cnlEZXRhaWxzKGVudHJ5TmFtZSwgZm9ybWF0T3B0aW9ucywgcHJlZmVyZW5jZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29tcGxldGlvbkVudHJ5U3ltYm9sKGZpbGVOYW1lOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIsIGVudHJ5TmFtZTogc3RyaW5nKTogdHMuU3ltYm9sXG4gICAgICB8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZyhQZXJmUGhhc2UuTHNDb21wbGV0aW9ucywgKGNvbXBpbGVyKSA9PiB7XG4gICAgICBpZiAoIWlzVGVtcGxhdGVDb250ZXh0KGNvbXBpbGVyLmdldE5leHRQcm9ncmFtKCksIGZpbGVOYW1lLCBwb3NpdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnVpbGRlciA9IHRoaXMuZ2V0Q29tcGxldGlvbkJ1aWxkZXIoZmlsZU5hbWUsIHBvc2l0aW9uLCBjb21waWxlcik7XG4gICAgICBpZiAoYnVpbGRlciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0ID0gYnVpbGRlci5nZXRDb21wbGV0aW9uRW50cnlTeW1ib2woZW50cnlOYW1lKTtcbiAgICAgIHRoaXMuY29tcGlsZXJGYWN0b3J5LnJlZ2lzdGVyTGFzdEtub3duUHJvZ3JhbSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRjYihmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKTogR2V0VGNiUmVzcG9uc2V8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53aXRoQ29tcGlsZXJBbmRQZXJmVHJhY2luZzxHZXRUY2JSZXNwb25zZXx1bmRlZmluZWQ+KFBlcmZQaGFzZS5Mc1RjYiwgY29tcGlsZXIgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGVJbmZvID0gZ2V0VGVtcGxhdGVJbmZvQXRQb3NpdGlvbihmaWxlTmFtZSwgcG9zaXRpb24sIGNvbXBpbGVyKTtcbiAgICAgIGlmICh0ZW1wbGF0ZUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgY29uc3QgdGNiID0gY29tcGlsZXIuZ2V0VGVtcGxhdGVUeXBlQ2hlY2tlcigpLmdldFR5cGVDaGVja0Jsb2NrKHRlbXBsYXRlSW5mby5jb21wb25lbnQpO1xuICAgICAgaWYgKHRjYiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2YgPSB0Y2IuZ2V0U291cmNlRmlsZSgpO1xuXG4gICAgICBsZXQgc2VsZWN0aW9uczogdHMuVGV4dFNwYW5bXSA9IFtdO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZ2V0VGFyZ2V0QXRQb3NpdGlvbih0ZW1wbGF0ZUluZm8udGVtcGxhdGUsIHBvc2l0aW9uKTtcbiAgICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvblNwYW5zOiBBcnJheTxQYXJzZVNvdXJjZVNwYW58QWJzb2x1dGVTb3VyY2VTcGFuPjtcbiAgICAgICAgaWYgKCdub2RlcycgaW4gdGFyZ2V0LmNvbnRleHQpIHtcbiAgICAgICAgICBzZWxlY3Rpb25TcGFucyA9IHRhcmdldC5jb250ZXh0Lm5vZGVzLm1hcChuID0+IG4uc291cmNlU3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0aW9uU3BhbnMgPSBbdGFyZ2V0LmNvbnRleHQubm9kZS5zb3VyY2VTcGFuXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25Ob2RlczogdHMuTm9kZVtdID1cbiAgICAgICAgICAgIHNlbGVjdGlvblNwYW5zXG4gICAgICAgICAgICAgICAgLm1hcChzID0+IGZpbmRGaXJzdE1hdGNoaW5nTm9kZSh0Y2IsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgd2l0aFNwYW46IHMsXG4gICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogKG5vZGU6IHRzLk5vZGUpOiBub2RlIGlzIHRzLk5vZGUgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKG4pOiBuIGlzIHRzLk5vZGUgPT4gbiAhPT0gbnVsbCk7XG5cbiAgICAgICAgc2VsZWN0aW9ucyA9IHNlbGVjdGlvbk5vZGVzLm1hcChuID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IG4uZ2V0U3RhcnQoc2YpLFxuICAgICAgICAgICAgbGVuZ3RoOiBuLmdldEVuZCgpIC0gbi5nZXRTdGFydChzZiksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVOYW1lOiBzZi5maWxlTmFtZSxcbiAgICAgICAgY29udGVudDogc2YuZ2V0RnVsbFRleHQoKSxcbiAgICAgICAgc2VsZWN0aW9ucyxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvdmlkZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGBOZ0NvbXBpbGVyYCBhbmQgdHJhY2VzIHBlcmYgcmVzdWx0cy4gUGVyZiByZXN1bHRzIGFyZSBsb2dnZWQgb25seVxuICAgKiBpZiB0aGUgbG9nIGxldmVsIGlzIHZlcmJvc2Ugb3IgaGlnaGVyLiBUaGlzIG1ldGhvZCBpcyBpbnRlbmRlZCB0byBiZSBjYWxsZWQgb25jZSBwZXIgcHVibGljXG4gICAqIG1ldGhvZCBjYWxsLlxuICAgKlxuICAgKiBIZXJlIGlzIGFuIGV4YW1wbGUgb2YgdGhlIGxvZyBvdXRwdXQuXG4gICAqXG4gICAqIFBlcmYgMjQ1ICBbMTY6MTY6MzkuMzUzXSBMYW5ndWFnZVNlcnZpY2UjZ2V0UXVpY2tJbmZvQXRQb3NpdGlvbigpOiB7XCJldmVudHNcIjp7fSxcInBoYXNlc1wiOntcbiAgICogXCJVbmFjY291bnRlZFwiOjM3OSxcIlR0Y1N5bWJvbFwiOjR9LFwibWVtb3J5XCI6e319XG4gICAqXG4gICAqIFBhc3NpbmcgbmFtZSBvZiBjYWxsZXIgaW5zdGVhZCBvZiB1c2luZyBgYXJndW1lbnRzLmNhbGxlcmAgYmVjYXVzZSAnY2FsbGVyJywgJ2NhbGxlZScsIGFuZFxuICAgKiAnYXJndW1lbnRzJyBwcm9wZXJ0aWVzIG1heSBub3QgYmUgYWNjZXNzZWQgaW4gc3RyaWN0IG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSBwaGFzZSB0aGUgYFBlcmZQaGFzZWAgdG8gZXhlY3V0ZSB0aGUgYHBgIGNhbGxiYWNrIGluXG4gICAqIEBwYXJhbSBwIGNhbGxiYWNrIHRvIGJlIHJ1biBzeW5jaHJvbm91c2x5IHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlIGBOZ0NvbXBpbGVyYCBhcyBhcmd1bWVudFxuICAgKiBAcmV0dXJuIHRoZSByZXN1bHQgb2YgcnVubmluZyB0aGUgYHBgIGNhbGxiYWNrXG4gICAqL1xuICBwcml2YXRlIHdpdGhDb21waWxlckFuZFBlcmZUcmFjaW5nPFQ+KHBoYXNlOiBQZXJmUGhhc2UsIHA6IChjb21waWxlcjogTmdDb21waWxlcikgPT4gVCk6IFQge1xuICAgIGNvbnN0IGNvbXBpbGVyID0gdGhpcy5jb21waWxlckZhY3RvcnkuZ2V0T3JDcmVhdGUoKTtcbiAgICBjb25zdCByZXN1bHQgPSBjb21waWxlci5wZXJmUmVjb3JkZXIuaW5QaGFzZShwaGFzZSwgKCkgPT4gcChjb21waWxlcikpO1xuICAgIHRoaXMuY29tcGlsZXJGYWN0b3J5LnJlZ2lzdGVyTGFzdEtub3duUHJvZ3JhbSgpO1xuXG4gICAgY29uc3QgbG9nZ2VyID0gdGhpcy5wcm9qZWN0LnByb2plY3RTZXJ2aWNlLmxvZ2dlcjtcbiAgICBpZiAobG9nZ2VyLmhhc0xldmVsKHRzLnNlcnZlci5Mb2dMZXZlbC52ZXJib3NlKSkge1xuICAgICAgbG9nZ2VyLnBlcmZ0cmMoYExhbmd1YWdlU2VydmljZSMke1BlcmZQaGFzZVtwaGFzZV19OiAke1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGNvbXBpbGVyLnBlcmZSZWNvcmRlci5maW5hbGl6ZSgpKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q29tcGlsZXJPcHRpb25zRGlhZ25vc3RpY3MoKTogdHMuRGlhZ25vc3RpY1tdIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0O1xuICAgIGlmICghKHByb2plY3QgaW5zdGFuY2VvZiB0cy5zZXJ2ZXIuQ29uZmlndXJlZFByb2plY3QpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud2l0aENvbXBpbGVyQW5kUGVyZlRyYWNpbmcoUGVyZlBoYXNlLkxzRGlhZ25vc3RpY3MsIChjb21waWxlcikgPT4ge1xuICAgICAgY29uc3QgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSA9IFtdO1xuICAgICAgY29uc3QgY29uZmlnU291cmNlRmlsZSA9IHRzLnJlYWRKc29uQ29uZmlnRmlsZShcbiAgICAgICAgICBwcm9qZWN0LmdldENvbmZpZ0ZpbGVQYXRoKCksIChwYXRoOiBzdHJpbmcpID0+IHByb2plY3QucmVhZEZpbGUocGF0aCkpO1xuXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5zdHJpY3RUZW1wbGF0ZXMgJiYgIXRoaXMub3B0aW9ucy5mdWxsVGVtcGxhdGVUeXBlQ2hlY2spIHtcbiAgICAgICAgZGlhZ25vc3RpY3MucHVzaCh7XG4gICAgICAgICAgbWVzc2FnZVRleHQ6ICdTb21lIGxhbmd1YWdlIGZlYXR1cmVzIGFyZSBub3QgYXZhaWxhYmxlLiAnICtcbiAgICAgICAgICAgICAgJ1RvIGFjY2VzcyBhbGwgZmVhdHVyZXMsIGVuYWJsZSBgc3RyaWN0VGVtcGxhdGVzYCBpbiBgYW5ndWxhckNvbXBpbGVyT3B0aW9uc2AuJyxcbiAgICAgICAgICBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5LlN1Z2dlc3Rpb24sXG4gICAgICAgICAgY29kZTogbmdFcnJvckNvZGUoRXJyb3JDb2RlLlNVR0dFU1RfU1RSSUNUX1RFTVBMQVRFUyksXG4gICAgICAgICAgZmlsZTogY29uZmlnU291cmNlRmlsZSxcbiAgICAgICAgICBzdGFydDogdW5kZWZpbmVkLFxuICAgICAgICAgIGxlbmd0aDogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZGlhZ25vc3RpY3MucHVzaCguLi5jb21waWxlci5nZXRPcHRpb25EaWFnbm9zdGljcygpKTtcblxuICAgICAgcmV0dXJuIGRpYWdub3N0aWNzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaENvbmZpZ0ZpbGUocHJvamVjdDogdHMuc2VydmVyLlByb2plY3QpIHtcbiAgICAvLyBUT0RPOiBDaGVjayB0aGUgY2FzZSB3aGVuIHRoZSBwcm9qZWN0IGlzIGRpc3Bvc2VkLiBBbiBJbmZlcnJlZFByb2plY3RcbiAgICAvLyBjb3VsZCBiZSBkaXNwb3NlZCB3aGVuIGEgdHNjb25maWcuanNvbiBpcyBhZGRlZCB0byB0aGUgd29ya3NwYWNlLFxuICAgIC8vIGluIHdoaWNoIGNhc2UgaXQgYmVjb21lcyBhIENvbmZpZ3VyZWRQcm9qZWN0IChvciB2aWNlLXZlcnNhKS5cbiAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBGaWxlV2F0Y2hlciBpcyBjbG9zZWQuXG4gICAgaWYgKCEocHJvamVjdCBpbnN0YW5jZW9mIHRzLnNlcnZlci5Db25maWd1cmVkUHJvamVjdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge2hvc3R9ID0gcHJvamVjdC5wcm9qZWN0U2VydmljZTtcbiAgICBob3N0LndhdGNoRmlsZShcbiAgICAgICAgcHJvamVjdC5nZXRDb25maWdGaWxlUGF0aCgpLCAoZmlsZU5hbWU6IHN0cmluZywgZXZlbnRLaW5kOiB0cy5GaWxlV2F0Y2hlckV2ZW50S2luZCkgPT4ge1xuICAgICAgICAgIHByb2plY3QubG9nKGBDb25maWcgZmlsZSBjaGFuZ2VkOiAke2ZpbGVOYW1lfWApO1xuICAgICAgICAgIGlmIChldmVudEtpbmQgPT09IHRzLkZpbGVXYXRjaGVyRXZlbnRLaW5kLkNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHBhcnNlTmdDb21waWxlck9wdGlvbnMocHJvamVjdCwgdGhpcy5wYXJzZUNvbmZpZ0hvc3QsIHRoaXMuY29uZmlnKTtcbiAgICAgICAgICAgIGxvZ0NvbXBpbGVyT3B0aW9ucyhwcm9qZWN0LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbG9nQ29tcGlsZXJPcHRpb25zKHByb2plY3Q6IHRzLnNlcnZlci5Qcm9qZWN0LCBvcHRpb25zOiBDb21waWxlck9wdGlvbnMpIHtcbiAgY29uc3Qge2xvZ2dlcn0gPSBwcm9qZWN0LnByb2plY3RTZXJ2aWNlO1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QuZ2V0UHJvamVjdE5hbWUoKTtcbiAgbG9nZ2VyLmluZm8oYEFuZ3VsYXIgY29tcGlsZXIgb3B0aW9ucyBmb3IgJHtwcm9qZWN0TmFtZX06IGAgKyBKU09OLnN0cmluZ2lmeShvcHRpb25zLCBudWxsLCAyKSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTmdDb21waWxlck9wdGlvbnMoXG4gICAgcHJvamVjdDogdHMuc2VydmVyLlByb2plY3QsIGhvc3Q6IENvbmZpZ3VyYXRpb25Ib3N0LFxuICAgIGNvbmZpZzogTGFuZ3VhZ2VTZXJ2aWNlQ29uZmlnKTogQ29tcGlsZXJPcHRpb25zIHtcbiAgaWYgKCEocHJvamVjdCBpbnN0YW5jZW9mIHRzLnNlcnZlci5Db25maWd1cmVkUHJvamVjdCkpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgY29uc3Qge29wdGlvbnMsIGVycm9yc30gPVxuICAgICAgcmVhZENvbmZpZ3VyYXRpb24ocHJvamVjdC5nZXRDb25maWdGaWxlUGF0aCgpLCAvKiBleGlzdGluZ09wdGlvbnMgKi8gdW5kZWZpbmVkLCBob3N0KTtcbiAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgcHJvamVjdC5zZXRQcm9qZWN0RXJyb3JzKGVycm9ycyk7XG4gIH1cblxuICAvLyBQcm9qZWN0cyBsb2FkZWQgaW50byB0aGUgTGFuZ3VhZ2UgU2VydmljZSBvZnRlbiBpbmNsdWRlIHRlc3QgZmlsZXMgd2hpY2ggYXJlIG5vdCBwYXJ0IG9mIHRoZVxuICAvLyBhcHAncyBtYWluIGNvbXBpbGF0aW9uIHVuaXQsIGFuZCB0aGVzZSB0ZXN0IGZpbGVzIG9mdGVuIGluY2x1ZGUgaW5saW5lIE5nTW9kdWxlcyB0aGF0IGRlY2xhcmVcbiAgLy8gY29tcG9uZW50cyBmcm9tIHRoZSBhcHAuIFRoZXNlIGRlY2xhcmF0aW9ucyBjb25mbGljdCB3aXRoIHRoZSBtYWluIGRlY2xhcmF0aW9ucyBvZiBzdWNoXG4gIC8vIGNvbXBvbmVudHMgaW4gdGhlIGFwcCdzIE5nTW9kdWxlcy4gVGhpcyBjb25mbGljdCBpcyBub3Qgbm9ybWFsbHkgcHJlc2VudCBkdXJpbmcgcmVndWxhclxuICAvLyBjb21waWxhdGlvbiBiZWNhdXNlIHRoZSBhcHAgYW5kIHRoZSB0ZXN0cyBhcmUgcGFydCBvZiBzZXBhcmF0ZSBjb21waWxhdGlvbiB1bml0cy5cbiAgLy9cbiAgLy8gQXMgYSB0ZW1wb3JhcnkgbWl0aWdhdGlvbiBvZiB0aGlzIHByb2JsZW0sIHdlIGluc3RydWN0IHRoZSBjb21waWxlciB0byBpZ25vcmUgY2xhc3NlcyB3aGljaFxuICAvLyBhcmUgbm90IGV4cG9ydGVkLiBJbiBtYW55IGNhc2VzLCB0aGlzIGVuc3VyZXMgdGhlIHRlc3QgTmdNb2R1bGVzIGFyZSBpZ25vcmVkIGJ5IHRoZSBjb21waWxlclxuICAvLyBhbmQgb25seSB0aGUgcmVhbCBjb21wb25lbnQgZGVjbGFyYXRpb24gaXMgdXNlZC5cbiAgb3B0aW9ucy5jb21waWxlTm9uRXhwb3J0ZWRDbGFzc2VzID0gZmFsc2U7XG5cbiAgLy8gSWYgYGZvcmNlU3RyaWN0VGVtcGxhdGVzYCBpcyB0cnVlLCBhbHdheXMgZW5hYmxlIGBzdHJpY3RUZW1wbGF0ZXNgXG4gIC8vIHJlZ2FyZGxlc3Mgb2YgaXRzIHZhbHVlIGluIHRzY29uZmlnLmpzb24uXG4gIGlmIChjb25maWcuZm9yY2VTdHJpY3RUZW1wbGF0ZXMgPT09IHRydWUpIHtcbiAgICBvcHRpb25zLnN0cmljdFRlbXBsYXRlcyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHlwZUNoZWNraW5nUHJvZ3JhbVN0cmF0ZWd5KHByb2plY3Q6IHRzLnNlcnZlci5Qcm9qZWN0KTpcbiAgICBUeXBlQ2hlY2tpbmdQcm9ncmFtU3RyYXRlZ3kge1xuICByZXR1cm4ge1xuICAgIHN1cHBvcnRzSW5saW5lT3BlcmF0aW9uczogZmFsc2UsXG4gICAgc2hpbVBhdGhGb3JDb21wb25lbnQoY29tcG9uZW50OiB0cy5DbGFzc0RlY2xhcmF0aW9uKTogQWJzb2x1dGVGc1BhdGgge1xuICAgICAgcmV0dXJuIFR5cGVDaGVja1NoaW1HZW5lcmF0b3Iuc2hpbUZvcihhYnNvbHV0ZUZyb21Tb3VyY2VGaWxlKGNvbXBvbmVudC5nZXRTb3VyY2VGaWxlKCkpKTtcbiAgICB9LFxuICAgIGdldFByb2dyYW0oKTogdHMuUHJvZ3JhbSB7XG4gICAgICBjb25zdCBwcm9ncmFtID0gcHJvamVjdC5nZXRMYW5ndWFnZVNlcnZpY2UoKS5nZXRQcm9ncmFtKCk7XG4gICAgICBpZiAoIXByb2dyYW0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYW5ndWFnZSBzZXJ2aWNlIGRvZXMgbm90IGhhdmUgYSBwcm9ncmFtIScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfSxcbiAgICB1cGRhdGVGaWxlcyhjb250ZW50czogTWFwPEFic29sdXRlRnNQYXRoLCBzdHJpbmc+KSB7XG4gICAgICBmb3IgKGNvbnN0IFtmaWxlTmFtZSwgbmV3VGV4dF0gb2YgY29udGVudHMpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0SW5mbyA9IGdldE9yQ3JlYXRlVHlwZUNoZWNrU2NyaXB0SW5mbyhwcm9qZWN0LCBmaWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IHNuYXBzaG90ID0gc2NyaXB0SW5mby5nZXRTbmFwc2hvdCgpO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBzbmFwc2hvdC5nZXRMZW5ndGgoKTtcbiAgICAgICAgc2NyaXB0SW5mby5lZGl0Q29udGVudCgwLCBsZW5ndGgsIG5ld1RleHQpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldE9yQ3JlYXRlVHlwZUNoZWNrU2NyaXB0SW5mbyhcbiAgICBwcm9qZWN0OiB0cy5zZXJ2ZXIuUHJvamVjdCwgdGNmOiBzdHJpbmcpOiB0cy5zZXJ2ZXIuU2NyaXB0SW5mbyB7XG4gIC8vIEZpcnN0IGNoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBTY3JpcHRJbmZvIGZvciB0aGUgdGNmXG4gIGNvbnN0IHtwcm9qZWN0U2VydmljZX0gPSBwcm9qZWN0O1xuICBsZXQgc2NyaXB0SW5mbyA9IHByb2plY3RTZXJ2aWNlLmdldFNjcmlwdEluZm8odGNmKTtcbiAgaWYgKCFzY3JpcHRJbmZvKSB7XG4gICAgLy8gU2NyaXB0SW5mbyBuZWVkcyB0byBiZSBvcGVuZWQgYnkgY2xpZW50IHRvIGJlIGFibGUgdG8gc2V0IGl0cyB1c2VyLWRlZmluZWRcbiAgICAvLyBjb250ZW50LiBXZSBtdXN0IGFsc28gcHJvdmlkZSBmaWxlIGNvbnRlbnQsIG90aGVyd2lzZSB0aGUgc2VydmljZSB3aWxsXG4gICAgLy8gYXR0ZW1wdCB0byBmZXRjaCB0aGUgY29udGVudCBmcm9tIGRpc2sgYW5kIGZhaWwuXG4gICAgc2NyaXB0SW5mbyA9IHByb2plY3RTZXJ2aWNlLmdldE9yQ3JlYXRlU2NyaXB0SW5mb0Zvck5vcm1hbGl6ZWRQYXRoKFxuICAgICAgICB0cy5zZXJ2ZXIudG9Ob3JtYWxpemVkUGF0aCh0Y2YpLFxuICAgICAgICB0cnVlLCAgLy8gb3BlbmVkQnlDbGllbnRcbiAgICAgICAgJycsICAgIC8vIGZpbGVDb250ZW50XG4gICAgICAgIC8vIHNjcmlwdCBpbmZvIGFkZGVkIGJ5IHBsdWdpbnMgc2hvdWxkIGJlIG1hcmtlZCBhcyBleHRlcm5hbCwgc2VlXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL2IyMTdmMjJlNzk4Yzc4MWY1NWQxN2RhNzJlZDA5OWE5ZGVlNWM2NTAvc3JjL2NvbXBpbGVyL3Byb2dyYW0udHMjTDE4OTctTDE4OTlcbiAgICAgICAgdHMuU2NyaXB0S2luZC5FeHRlcm5hbCwgIC8vIHNjcmlwdEtpbmRcbiAgICApO1xuICAgIGlmICghc2NyaXB0SW5mbykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIHNjcmlwdCBpbmZvIGZvciAke3RjZn1gKTtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIFNjcmlwdEluZm8gdG8gcHJvamVjdCBpZiBpdCdzIG1pc3NpbmcuIEEgU2NyaXB0SW5mbyBuZWVkcyB0byBiZSBwYXJ0IG9mXG4gIC8vIHRoZSBwcm9qZWN0IHNvIHRoYXQgaXQgYmVjb21lcyBwYXJ0IG9mIHRoZSBwcm9ncmFtLlxuICBpZiAoIXByb2plY3QuY29udGFpbnNTY3JpcHRJbmZvKHNjcmlwdEluZm8pKSB7XG4gICAgcHJvamVjdC5hZGRSb290KHNjcmlwdEluZm8pO1xuICB9XG4gIHJldHVybiBzY3JpcHRJbmZvO1xufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlQ29udGV4dChwcm9ncmFtOiB0cy5Qcm9ncmFtLCBmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmICghaXNUeXBlU2NyaXB0RmlsZShmaWxlTmFtZSkpIHtcbiAgICAvLyBJZiB3ZSBhcmVuJ3QgaW4gYSBUUyBmaWxlLCB3ZSBtdXN0IGJlIGluIGFuIEhUTUwgZmlsZSwgd2hpY2ggd2UgdHJlYXQgYXMgdGVtcGxhdGUgY29udGV4dFxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3Qgbm9kZSA9IGZpbmRUaWdodGVzdE5vZGVBdFBvc2l0aW9uKHByb2dyYW0sIGZpbGVOYW1lLCBwb3NpdGlvbik7XG4gIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgYXNnbiA9IGdldFByb3BlcnR5QXNzaWdubWVudEZyb21WYWx1ZShub2RlLCAndGVtcGxhdGUnKTtcbiAgaWYgKGFzZ24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGdldENsYXNzRGVjbEZyb21EZWNvcmF0b3JQcm9wKGFzZ24pICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0luQW5ndWxhckNvbnRleHQocHJvZ3JhbTogdHMuUHJvZ3JhbSwgZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICBpZiAoIWlzVHlwZVNjcmlwdEZpbGUoZmlsZU5hbWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBub2RlID0gZmluZFRpZ2h0ZXN0Tm9kZUF0UG9zaXRpb24ocHJvZ3JhbSwgZmlsZU5hbWUsIHBvc2l0aW9uKTtcbiAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGFzZ24gPSBnZXRQcm9wZXJ0eUFzc2lnbm1lbnRGcm9tVmFsdWUobm9kZSwgJ3RlbXBsYXRlJykgPz9cbiAgICAgIGdldFByb3BlcnR5QXNzaWdubWVudEZyb21WYWx1ZShub2RlLCAndGVtcGxhdGVVcmwnKSA/P1xuICAgICAgZ2V0UHJvcGVydHlBc3NpZ25tZW50RnJvbVZhbHVlKG5vZGUucGFyZW50LCAnc3R5bGVVcmxzJyk7XG4gIHJldHVybiBhc2duICE9PSBudWxsICYmIGdldENsYXNzRGVjbEZyb21EZWNvcmF0b3JQcm9wKGFzZ24pICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBmaW5kVGlnaHRlc3ROb2RlQXRQb3NpdGlvbihwcm9ncmFtOiB0cy5Qcm9ncmFtLCBmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gIGNvbnN0IHNvdXJjZUZpbGUgPSBwcm9ncmFtLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpO1xuICBpZiAoc291cmNlRmlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBmaW5kVGlnaHRlc3ROb2RlKHNvdXJjZUZpbGUsIHBvc2l0aW9uKTtcbn1cbiJdfQ==