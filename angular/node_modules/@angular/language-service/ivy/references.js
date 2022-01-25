(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/language-service/ivy/references", ["require", "exports", "tslib", "@angular/compiler", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/src/ngtsc/perf", "@angular/compiler-cli/src/ngtsc/typecheck/api", "@angular/compiler-cli/src/ngtsc/typecheck/src/comments", "typescript", "@angular/language-service/ivy/template_target", "@angular/language-service/ivy/ts_utils", "@angular/language-service/ivy/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReferencesAndRenameBuilder = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var perf_1 = require("@angular/compiler-cli/src/ngtsc/perf");
    var api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
    var comments_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/src/comments");
    var ts = require("typescript");
    var template_target_1 = require("@angular/language-service/ivy/template_target");
    var ts_utils_1 = require("@angular/language-service/ivy/ts_utils");
    var utils_1 = require("@angular/language-service/ivy/utils");
    function toFilePosition(shimLocation) {
        return { fileName: shimLocation.shimPath, position: shimLocation.positionInShimFile };
    }
    var RequestKind;
    (function (RequestKind) {
        RequestKind[RequestKind["Template"] = 0] = "Template";
        RequestKind[RequestKind["TypeScript"] = 1] = "TypeScript";
    })(RequestKind || (RequestKind = {}));
    var ReferencesAndRenameBuilder = /** @class */ (function () {
        function ReferencesAndRenameBuilder(strategy, tsLS, compiler) {
            this.strategy = strategy;
            this.tsLS = tsLS;
            this.compiler = compiler;
            this.ttc = this.compiler.getTemplateTypeChecker();
        }
        ReferencesAndRenameBuilder.prototype.getRenameInfo = function (filePath, position) {
            var _this = this;
            return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, function () {
                var templateInfo = utils_1.getTemplateInfoAtPosition(filePath, position, _this.compiler);
                // We could not get a template at position so we assume the request came from outside the
                // template.
                if (templateInfo === undefined) {
                    return _this.tsLS.getRenameInfo(filePath, position);
                }
                var allTargetDetails = _this.getTargetDetailsAtTemplatePosition(templateInfo, position);
                if (allTargetDetails === null) {
                    return {
                        canRename: false,
                        localizedErrorMessage: 'Could not find template node at position.',
                    };
                }
                var templateTarget = allTargetDetails[0].templateTarget;
                var templateTextAndSpan = getRenameTextAndSpanAtPosition(templateTarget, position);
                if (templateTextAndSpan === null) {
                    return { canRename: false, localizedErrorMessage: 'Could not determine template node text.' };
                }
                var text = templateTextAndSpan.text, span = templateTextAndSpan.span;
                return {
                    canRename: true,
                    displayName: text,
                    fullDisplayName: text,
                    triggerSpan: span,
                };
            });
        };
        ReferencesAndRenameBuilder.prototype.findRenameLocations = function (filePath, position) {
            var _this = this;
            this.ttc.generateAllTypeCheckBlocks();
            return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, function () {
                var templateInfo = utils_1.getTemplateInfoAtPosition(filePath, position, _this.compiler);
                // We could not get a template at position so we assume the request came from outside the
                // template.
                if (templateInfo === undefined) {
                    var requestNode = _this.getTsNodeAtPosition(filePath, position);
                    if (requestNode === null) {
                        return undefined;
                    }
                    var requestOrigin = { kind: RequestKind.TypeScript, requestNode: requestNode };
                    return _this.findRenameLocationsAtTypescriptPosition(filePath, position, requestOrigin);
                }
                return _this.findRenameLocationsAtTemplatePosition(templateInfo, position);
            });
        };
        ReferencesAndRenameBuilder.prototype.findRenameLocationsAtTemplatePosition = function (templateInfo, position) {
            var e_1, _a, e_2, _b;
            var allTargetDetails = this.getTargetDetailsAtTemplatePosition(templateInfo, position);
            if (allTargetDetails === null) {
                return undefined;
            }
            var allRenameLocations = [];
            try {
                for (var allTargetDetails_1 = tslib_1.__values(allTargetDetails), allTargetDetails_1_1 = allTargetDetails_1.next(); !allTargetDetails_1_1.done; allTargetDetails_1_1 = allTargetDetails_1.next()) {
                    var targetDetails = allTargetDetails_1_1.value;
                    var requestOrigin = {
                        kind: RequestKind.Template,
                        requestNode: targetDetails.templateTarget,
                        position: position,
                    };
                    try {
                        for (var _c = (e_2 = void 0, tslib_1.__values(targetDetails.typescriptLocations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var location_1 = _d.value;
                            var locations = this.findRenameLocationsAtTypescriptPosition(location_1.fileName, location_1.position, requestOrigin);
                            // If we couldn't find rename locations for _any_ result, we should not allow renaming to
                            // proceed instead of having a partially complete rename.
                            if (locations === undefined) {
                                return undefined;
                            }
                            allRenameLocations.push.apply(allRenameLocations, tslib_1.__spread(locations));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allTargetDetails_1_1 && !allTargetDetails_1_1.done && (_a = allTargetDetails_1.return)) _a.call(allTargetDetails_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return allRenameLocations.length > 0 ? allRenameLocations : undefined;
        };
        ReferencesAndRenameBuilder.prototype.getTsNodeAtPosition = function (filePath, position) {
            var _a;
            var sf = this.strategy.getProgram().getSourceFile(filePath);
            if (!sf) {
                return null;
            }
            return (_a = ts_utils_1.findTightestNode(sf, position)) !== null && _a !== void 0 ? _a : null;
        };
        ReferencesAndRenameBuilder.prototype.findRenameLocationsAtTypescriptPosition = function (filePath, position, requestOrigin) {
            var _this = this;
            return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, function () {
                var e_3, _a;
                var originalNodeText;
                if (requestOrigin.kind === RequestKind.TypeScript) {
                    originalNodeText = requestOrigin.requestNode.getText();
                }
                else {
                    var templateNodeText = getRenameTextAndSpanAtPosition(requestOrigin.requestNode, requestOrigin.position);
                    if (templateNodeText === null) {
                        return undefined;
                    }
                    originalNodeText = templateNodeText.text;
                }
                var locations = _this.tsLS.findRenameLocations(filePath, position, /*findInStrings*/ false, /*findInComments*/ false);
                if (locations === undefined) {
                    return undefined;
                }
                var entries = new Map();
                try {
                    for (var locations_1 = tslib_1.__values(locations), locations_1_1 = locations_1.next(); !locations_1_1.done; locations_1_1 = locations_1.next()) {
                        var location_2 = locations_1_1.value;
                        // TODO(atscott): Determine if a file is a shim file in a more robust way and make the API
                        // available in an appropriate location.
                        if (_this.ttc.isTrackedTypeCheckFile(file_system_1.absoluteFrom(location_2.fileName))) {
                            var entry = _this.convertToTemplateDocumentSpan(location_2, _this.ttc, originalNodeText);
                            // There is no template node whose text matches the original rename request. Bail on
                            // renaming completely rather than providing incomplete results.
                            if (entry === null) {
                                return undefined;
                            }
                            entries.set(createLocationKey(entry), entry);
                        }
                        else {
                            // Ensure we only allow renaming a TS result with matching text
                            var refNode = _this.getTsNodeAtPosition(location_2.fileName, location_2.textSpan.start);
                            if (refNode === null || refNode.getText() !== originalNodeText) {
                                return undefined;
                            }
                            entries.set(createLocationKey(location_2), location_2);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (locations_1_1 && !locations_1_1.done && (_a = locations_1.return)) _a.call(locations_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return Array.from(entries.values());
            });
        };
        ReferencesAndRenameBuilder.prototype.getReferencesAtPosition = function (filePath, position) {
            var _this = this;
            this.ttc.generateAllTypeCheckBlocks();
            return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.LsReferencesAndRenames, function () {
                var templateInfo = utils_1.getTemplateInfoAtPosition(filePath, position, _this.compiler);
                if (templateInfo === undefined) {
                    return _this.getReferencesAtTypescriptPosition(filePath, position);
                }
                return _this.getReferencesAtTemplatePosition(templateInfo, position);
            });
        };
        ReferencesAndRenameBuilder.prototype.getReferencesAtTemplatePosition = function (templateInfo, position) {
            var e_4, _a, e_5, _b;
            var allTargetDetails = this.getTargetDetailsAtTemplatePosition(templateInfo, position);
            if (allTargetDetails === null) {
                return undefined;
            }
            var allReferences = [];
            try {
                for (var allTargetDetails_2 = tslib_1.__values(allTargetDetails), allTargetDetails_2_1 = allTargetDetails_2.next(); !allTargetDetails_2_1.done; allTargetDetails_2_1 = allTargetDetails_2.next()) {
                    var targetDetails = allTargetDetails_2_1.value;
                    try {
                        for (var _c = (e_5 = void 0, tslib_1.__values(targetDetails.typescriptLocations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var location_3 = _d.value;
                            var refs = this.getReferencesAtTypescriptPosition(location_3.fileName, location_3.position);
                            if (refs !== undefined) {
                                allReferences.push.apply(allReferences, tslib_1.__spread(refs));
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (allTargetDetails_2_1 && !allTargetDetails_2_1.done && (_a = allTargetDetails_2.return)) _a.call(allTargetDetails_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return allReferences.length > 0 ? allReferences : undefined;
        };
        ReferencesAndRenameBuilder.prototype.getTargetDetailsAtTemplatePosition = function (_a, position) {
            var e_6, _b;
            var template = _a.template, component = _a.component;
            // Find the AST node in the template at the position.
            var positionDetails = template_target_1.getTargetAtPosition(template, position);
            if (positionDetails === null) {
                return null;
            }
            var nodes = positionDetails.context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext ?
                positionDetails.context.nodes :
                [positionDetails.context.node];
            var details = [];
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    // Get the information about the TCB at the template position.
                    var symbol = this.ttc.getSymbolOfNode(node, component);
                    if (symbol === null) {
                        continue;
                    }
                    var templateTarget = node;
                    switch (symbol.kind) {
                        case api_1.SymbolKind.Directive:
                        case api_1.SymbolKind.Template:
                            // References to elements, templates, and directives will be through template references
                            // (#ref). They shouldn't be used directly for a Language Service reference request.
                            break;
                        case api_1.SymbolKind.Element: {
                            var matches = utils_1.getDirectiveMatchesForElementTag(symbol.templateNode, symbol.directives);
                            details.push({ typescriptLocations: this.getPositionsForDirectives(matches), templateTarget: templateTarget });
                            break;
                        }
                        case api_1.SymbolKind.DomBinding: {
                            // Dom bindings aren't currently type-checked (see `checkTypeOfDomBindings`) so they don't
                            // have a shim location. This means we can't match dom bindings to their lib.dom
                            // reference, but we can still see if they match to a directive.
                            if (!(node instanceof compiler_1.TmplAstTextAttribute) && !(node instanceof compiler_1.TmplAstBoundAttribute)) {
                                return null;
                            }
                            var directives = utils_1.getDirectiveMatchesForAttribute(node.name, symbol.host.templateNode, symbol.host.directives);
                            details.push({
                                typescriptLocations: this.getPositionsForDirectives(directives),
                                templateTarget: templateTarget,
                            });
                            break;
                        }
                        case api_1.SymbolKind.Reference: {
                            details.push({
                                typescriptLocations: [toFilePosition(symbol.referenceVarLocation)],
                                templateTarget: templateTarget,
                            });
                            break;
                        }
                        case api_1.SymbolKind.Variable: {
                            if ((templateTarget instanceof compiler_1.TmplAstVariable)) {
                                if (templateTarget.valueSpan !== undefined &&
                                    utils_1.isWithin(position, templateTarget.valueSpan)) {
                                    // In the valueSpan of the variable, we want to get the reference of the initializer.
                                    details.push({
                                        typescriptLocations: [toFilePosition(symbol.initializerLocation)],
                                        templateTarget: templateTarget,
                                    });
                                }
                                else if (utils_1.isWithin(position, templateTarget.keySpan)) {
                                    // In the keySpan of the variable, we want to get the reference of the local variable.
                                    details.push({
                                        typescriptLocations: [toFilePosition(symbol.localVarLocation)],
                                        templateTarget: templateTarget,
                                    });
                                }
                            }
                            else {
                                // If the templateNode is not the `TmplAstVariable`, it must be a usage of the
                                // variable somewhere in the template.
                                details.push({
                                    typescriptLocations: [toFilePosition(symbol.localVarLocation)],
                                    templateTarget: templateTarget,
                                });
                            }
                            break;
                        }
                        case api_1.SymbolKind.Input:
                        case api_1.SymbolKind.Output: {
                            details.push({
                                typescriptLocations: symbol.bindings.map(function (binding) { return toFilePosition(binding.shimLocation); }),
                                templateTarget: templateTarget,
                            });
                            break;
                        }
                        case api_1.SymbolKind.Pipe:
                        case api_1.SymbolKind.Expression: {
                            details.push({ typescriptLocations: [toFilePosition(symbol.shimLocation)], templateTarget: templateTarget });
                            break;
                        }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_b = nodes_1.return)) _b.call(nodes_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return details.length > 0 ? details : null;
        };
        ReferencesAndRenameBuilder.prototype.getPositionsForDirectives = function (directives) {
            var e_7, _a;
            var allDirectives = [];
            try {
                for (var _b = tslib_1.__values(directives.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var dir = _c.value;
                    var dirClass = dir.tsSymbol.valueDeclaration;
                    if (dirClass === undefined || !ts.isClassDeclaration(dirClass) ||
                        dirClass.name === undefined) {
                        continue;
                    }
                    var fileName = dirClass.getSourceFile().fileName;
                    var position = dirClass.name.getStart();
                    allDirectives.push({ fileName: fileName, position: position });
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return allDirectives;
        };
        ReferencesAndRenameBuilder.prototype.getReferencesAtTypescriptPosition = function (fileName, position) {
            var e_8, _a;
            var refs = this.tsLS.getReferencesAtPosition(fileName, position);
            if (refs === undefined) {
                return undefined;
            }
            var entries = new Map();
            try {
                for (var refs_1 = tslib_1.__values(refs), refs_1_1 = refs_1.next(); !refs_1_1.done; refs_1_1 = refs_1.next()) {
                    var ref = refs_1_1.value;
                    if (this.ttc.isTrackedTypeCheckFile(file_system_1.absoluteFrom(ref.fileName))) {
                        var entry = this.convertToTemplateDocumentSpan(ref, this.ttc);
                        if (entry !== null) {
                            entries.set(createLocationKey(entry), entry);
                        }
                    }
                    else {
                        entries.set(createLocationKey(ref), ref);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (refs_1_1 && !refs_1_1.done && (_a = refs_1.return)) _a.call(refs_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return Array.from(entries.values());
        };
        ReferencesAndRenameBuilder.prototype.convertToTemplateDocumentSpan = function (shimDocumentSpan, templateTypeChecker, requiredNodeText) {
            var sf = this.strategy.getProgram().getSourceFile(shimDocumentSpan.fileName);
            if (sf === undefined) {
                return null;
            }
            var tcbNode = ts_utils_1.findTightestNode(sf, shimDocumentSpan.textSpan.start);
            if (tcbNode === undefined ||
                comments_1.hasExpressionIdentifier(sf, tcbNode, comments_1.ExpressionIdentifier.EVENT_PARAMETER)) {
                // If the reference result is the $event parameter in the subscribe/addEventListener
                // function in the TCB, we want to filter this result out of the references. We really only
                // want to return references to the parameter in the template itself.
                return null;
            }
            // TODO(atscott): Determine how to consistently resolve paths. i.e. with the project
            // serverHost or LSParseConfigHost in the adapter. We should have a better defined way to
            // normalize paths.
            var mapping = utils_1.getTemplateLocationFromShimLocation(templateTypeChecker, file_system_1.absoluteFrom(shimDocumentSpan.fileName), shimDocumentSpan.textSpan.start);
            if (mapping === null) {
                return null;
            }
            var span = mapping.span, templateUrl = mapping.templateUrl;
            if (requiredNodeText !== undefined && span.toString() !== requiredNodeText) {
                return null;
            }
            return tslib_1.__assign(tslib_1.__assign({}, shimDocumentSpan), { fileName: templateUrl, textSpan: utils_1.toTextSpan(span), 
                // Specifically clear other text span values because we do not have enough knowledge to
                // convert these to spans in the template.
                contextSpan: undefined, originalContextSpan: undefined, originalTextSpan: undefined });
        };
        return ReferencesAndRenameBuilder;
    }());
    exports.ReferencesAndRenameBuilder = ReferencesAndRenameBuilder;
    function getRenameTextAndSpanAtPosition(node, position) {
        if (node instanceof compiler_1.TmplAstBoundAttribute || node instanceof compiler_1.TmplAstTextAttribute ||
            node instanceof compiler_1.TmplAstBoundEvent) {
            if (node.keySpan === undefined) {
                return null;
            }
            return { text: node.name, span: utils_1.toTextSpan(node.keySpan) };
        }
        else if (node instanceof compiler_1.TmplAstVariable || node instanceof compiler_1.TmplAstReference) {
            if (utils_1.isWithin(position, node.keySpan)) {
                return { text: node.keySpan.toString(), span: utils_1.toTextSpan(node.keySpan) };
            }
            else if (node.valueSpan && utils_1.isWithin(position, node.valueSpan)) {
                return { text: node.valueSpan.toString(), span: utils_1.toTextSpan(node.valueSpan) };
            }
        }
        if (node instanceof compiler_1.BindingPipe) {
            // TODO(atscott): Add support for renaming pipes
            return null;
        }
        if (node instanceof compiler_1.PropertyRead || node instanceof compiler_1.MethodCall || node instanceof compiler_1.PropertyWrite ||
            node instanceof compiler_1.SafePropertyRead || node instanceof compiler_1.SafeMethodCall) {
            return { text: node.name, span: utils_1.toTextSpan(node.nameSpan) };
        }
        else if (node instanceof compiler_1.LiteralPrimitive) {
            var span = utils_1.toTextSpan(node.sourceSpan);
            var text = node.value;
            if (typeof text === 'string') {
                // The span of a string literal includes the quotes but they should be removed for renaming.
                span.start += 1;
                span.length -= 2;
            }
            return { text: text, span: span };
        }
        return null;
    }
    /**
     * Creates a "key" for a rename/reference location by concatenating file name, span start, and span
     * length. This allows us to de-duplicate template results when an item may appear several times
     * in the TCB but map back to the same template location.
     */
    function createLocationKey(ds) {
        return ds.fileName + ds.textSpan.start + ds.textSpan.length;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXJlbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xhbmd1YWdlLXNlcnZpY2UvaXZ5L3JlZmVyZW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDhDQUFxUztJQUVyUywyRUFBaUg7SUFDakgsNkRBQStEO0lBQy9ELHFFQUEwSjtJQUMxSixtRkFBcUg7SUFDckgsK0JBQWlDO0lBRWpDLGlGQUFzRTtJQUN0RSxtRUFBNEM7SUFDNUMsNkRBQThMO0lBTzlMLFNBQVMsY0FBYyxDQUFDLFlBQTBCO1FBQ2hELE9BQU8sRUFBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixFQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELElBQUssV0FHSjtJQUhELFdBQUssV0FBVztRQUNkLHFEQUFRLENBQUE7UUFDUix5REFBVSxDQUFBO0lBQ1osQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7SUE2QkQ7UUFHRSxvQ0FDcUIsUUFBcUMsRUFDckMsSUFBd0IsRUFBbUIsUUFBb0I7WUFEL0QsYUFBUSxHQUFSLFFBQVEsQ0FBNkI7WUFDckMsU0FBSSxHQUFKLElBQUksQ0FBb0I7WUFBbUIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtZQUpuRSxRQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBSXlCLENBQUM7UUFFeEYsa0RBQWEsR0FBYixVQUFjLFFBQWdCLEVBQUUsUUFBZ0I7WUFBaEQsaUJBOEJDO1lBNUJDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFTLENBQUMsc0JBQXNCLEVBQUU7Z0JBQzFFLElBQU0sWUFBWSxHQUFHLGlDQUF5QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEs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bEI7WUFDRCxPQUFPLEVBQUMsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUdEOzs7O09BSUc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLEVBQW1CO1FBQzVDLE9BQU8sRUFBRSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM5RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0Fic29sdXRlU291cmNlU3BhbiwgQVNULCBCaW5kaW5nUGlwZSwgTGl0ZXJhbFByaW1pdGl2ZSwgTWV0aG9kQ2FsbCwgUGFyc2VTb3VyY2VTcGFuLCBQcm9wZXJ0eVJlYWQsIFByb3BlcnR5V3JpdGUsIFNhZmVNZXRob2RDYWxsLCBTYWZlUHJvcGVydHlSZWFkLCBUbXBsQXN0Qm91bmRBdHRyaWJ1dGUsIFRtcGxBc3RCb3VuZEV2ZW50LCBUbXBsQXN0Tm9kZSwgVG1wbEFzdFJlZmVyZW5jZSwgVG1wbEFzdFRleHRBdHRyaWJ1dGUsIFRtcGxBc3RWYXJpYWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtOZ0NvbXBpbGVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2NvcmUnO1xuaW1wb3J0IHthYnNvbHV0ZUZyb20sIGFic29sdXRlRnJvbVNvdXJjZUZpbGUsIEFic29sdXRlRnNQYXRofSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcbmltcG9ydCB7UGVyZlBoYXNlfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL3BlcmYnO1xuaW1wb3J0IHtEaXJlY3RpdmVTeW1ib2wsIFNoaW1Mb2NhdGlvbiwgU3ltYm9sS2luZCwgVGVtcGxhdGVUeXBlQ2hlY2tlciwgVHlwZUNoZWNraW5nUHJvZ3JhbVN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL3R5cGVjaGVjay9hcGknO1xuaW1wb3J0IHtFeHByZXNzaW9uSWRlbnRpZmllciwgaGFzRXhwcmVzc2lvbklkZW50aWZpZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvdHlwZWNoZWNrL3NyYy9jb21tZW50cyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtnZXRUYXJnZXRBdFBvc2l0aW9uLCBUYXJnZXROb2RlS2luZH0gZnJvbSAnLi90ZW1wbGF0ZV90YXJnZXQnO1xuaW1wb3J0IHtmaW5kVGlnaHRlc3ROb2RlfSBmcm9tICcuL3RzX3V0aWxzJztcbmltcG9ydCB7Z2V0RGlyZWN0aXZlTWF0Y2hlc0ZvckF0dHJpYnV0ZSwgZ2V0RGlyZWN0aXZlTWF0Y2hlc0ZvckVsZW1lbnRUYWcsIGdldFRlbXBsYXRlSW5mb0F0UG9zaXRpb24sIGdldFRlbXBsYXRlTG9jYXRpb25Gcm9tU2hpbUxvY2F0aW9uLCBpc1dpdGhpbiwgVGVtcGxhdGVJbmZvLCB0b1RleHRTcGFufSBmcm9tICcuL3V0aWxzJztcblxuaW50ZXJmYWNlIEZpbGVQb3NpdGlvbiB7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIHRvRmlsZVBvc2l0aW9uKHNoaW1Mb2NhdGlvbjogU2hpbUxvY2F0aW9uKTogRmlsZVBvc2l0aW9uIHtcbiAgcmV0dXJuIHtmaWxlTmFtZTogc2hpbUxvY2F0aW9uLnNoaW1QYXRoLCBwb3NpdGlvbjogc2hpbUxvY2F0aW9uLnBvc2l0aW9uSW5TaGltRmlsZX07XG59XG5cbmVudW0gUmVxdWVzdEtpbmQge1xuICBUZW1wbGF0ZSxcbiAgVHlwZVNjcmlwdCxcbn1cblxuaW50ZXJmYWNlIFRlbXBsYXRlUmVxdWVzdCB7XG4gIGtpbmQ6IFJlcXVlc3RLaW5kLlRlbXBsYXRlO1xuICByZXF1ZXN0Tm9kZTogVG1wbEFzdE5vZGV8QVNUO1xuICBwb3NpdGlvbjogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgVHlwZVNjcmlwdFJlcXVlc3Qge1xuICBraW5kOiBSZXF1ZXN0S2luZC5UeXBlU2NyaXB0O1xuICByZXF1ZXN0Tm9kZTogdHMuTm9kZTtcbn1cblxudHlwZSBSZXF1ZXN0T3JpZ2luID0gVGVtcGxhdGVSZXF1ZXN0fFR5cGVTY3JpcHRSZXF1ZXN0O1xuXG5pbnRlcmZhY2UgVGVtcGxhdGVMb2NhdGlvbkRldGFpbHMge1xuICAvKipcbiAgICogQSB0YXJnZXQgbm9kZSBpbiBhIHRlbXBsYXRlLlxuICAgKi9cbiAgdGVtcGxhdGVUYXJnZXQ6IFRtcGxBc3ROb2RlfEFTVDtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBsb2NhdGlvbnMgd2hpY2ggdGhlIHRlbXBsYXRlIG5vZGUgbWFwcyB0by4gQSBnaXZlbiB0ZW1wbGF0ZSBub2RlIG1pZ2h0IG1hcCB0b1xuICAgKiBzZXZlcmFsIFRTIG5vZGVzLiBGb3IgZXhhbXBsZSwgYSB0ZW1wbGF0ZSBub2RlIGZvciBhbiBhdHRyaWJ1dGUgbWlnaHQgcmVzb2x2ZSB0byBzZXZlcmFsXG4gICAqIGRpcmVjdGl2ZXMgb3IgYSBkaXJlY3RpdmUgYW5kIG9uZSBvZiBpdHMgaW5wdXRzLlxuICAgKi9cbiAgdHlwZXNjcmlwdExvY2F0aW9uczogRmlsZVBvc2l0aW9uW107XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VzQW5kUmVuYW1lQnVpbGRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHRjID0gdGhpcy5jb21waWxlci5nZXRUZW1wbGF0ZVR5cGVDaGVja2VyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHN0cmF0ZWd5OiBUeXBlQ2hlY2tpbmdQcm9ncmFtU3RyYXRlZ3ksXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHRzTFM6IHRzLkxhbmd1YWdlU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSBjb21waWxlcjogTmdDb21waWxlcikge31cblxuICBnZXRSZW5hbWVJbmZvKGZpbGVQYXRoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpOlxuICAgICAgT21pdDx0cy5SZW5hbWVJbmZvU3VjY2VzcywgJ2tpbmQnfCdraW5kTW9kaWZpZXJzJz58dHMuUmVuYW1lSW5mb0ZhaWx1cmUge1xuICAgIHJldHVybiB0aGlzLmNvbXBpbGVyLnBlcmZSZWNvcmRlci5pblBoYXNlKFBlcmZQaGFzZS5Mc1JlZmVyZW5jZXNBbmRSZW5hbWVzLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZUluZm8gPSBnZXRUZW1wbGF0ZUluZm9BdFBvc2l0aW9uKGZpbGVQYXRoLCBwb3NpdGlvbiwgdGhpcy5jb21waWxlcik7XG4gICAgICAvLyBXZSBjb3VsZCBub3QgZ2V0IGEgdGVtcGxhdGUgYXQgcG9zaXRpb24gc28gd2UgYXNzdW1lIHRoZSByZXF1ZXN0IGNhbWUgZnJvbSBvdXRzaWRlIHRoZVxuICAgICAgLy8gdGVtcGxhdGUuXG4gICAgICBpZiAodGVtcGxhdGVJbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHNMUy5nZXRSZW5hbWVJbmZvKGZpbGVQYXRoLCBwb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFsbFRhcmdldERldGFpbHMgPSB0aGlzLmdldFRhcmdldERldGFpbHNBdFRlbXBsYXRlUG9zaXRpb24odGVtcGxhdGVJbmZvLCBwb3NpdGlvbik7XG4gICAgICBpZiAoYWxsVGFyZ2V0RGV0YWlscyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNhblJlbmFtZTogZmFsc2UsXG4gICAgICAgICAgbG9jYWxpemVkRXJyb3JNZXNzYWdlOiAnQ291bGQgbm90IGZpbmQgdGVtcGxhdGUgbm9kZSBhdCBwb3NpdGlvbi4nLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY29uc3Qge3RlbXBsYXRlVGFyZ2V0fSA9IGFsbFRhcmdldERldGFpbHNbMF07XG4gICAgICBjb25zdCB0ZW1wbGF0ZVRleHRBbmRTcGFuID0gZ2V0UmVuYW1lVGV4dEFuZFNwYW5BdFBvc2l0aW9uKHRlbXBsYXRlVGFyZ2V0LCBwb3NpdGlvbik7XG4gICAgICBpZiAodGVtcGxhdGVUZXh0QW5kU3BhbiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4ge2NhblJlbmFtZTogZmFsc2UsIGxvY2FsaXplZEVycm9yTWVzc2FnZTogJ0NvdWxkIG5vdCBkZXRlcm1pbmUgdGVtcGxhdGUgbm9kZSB0ZXh0Lid9O1xuICAgICAgfVxuICAgICAgY29uc3Qge3RleHQsIHNwYW59ID0gdGVtcGxhdGVUZXh0QW5kU3BhbjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNhblJlbmFtZTogdHJ1ZSxcbiAgICAgICAgZGlzcGxheU5hbWU6IHRleHQsXG4gICAgICAgIGZ1bGxEaXNwbGF5TmFtZTogdGV4dCxcbiAgICAgICAgdHJpZ2dlclNwYW46IHNwYW4sXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZmluZFJlbmFtZUxvY2F0aW9ucyhmaWxlUGF0aDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKTogcmVhZG9ubHkgdHMuUmVuYW1lTG9jYXRpb25bXXx1bmRlZmluZWQge1xuICAgIHRoaXMudHRjLmdlbmVyYXRlQWxsVHlwZUNoZWNrQmxvY2tzKCk7XG4gICAgcmV0dXJuIHRoaXMuY29tcGlsZXIucGVyZlJlY29yZGVyLmluUGhhc2UoUGVyZlBoYXNlLkxzUmVmZXJlbmNlc0FuZFJlbmFtZXMsICgpID0+IHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlSW5mbyA9IGdldFRlbXBsYXRlSW5mb0F0UG9zaXRpb24oZmlsZVBhdGgsIHBvc2l0aW9uLCB0aGlzLmNvbXBpbGVyKTtcbiAgICAgIC8vIFdlIGNvdWxkIG5vdCBnZXQgYSB0ZW1wbGF0ZSBhdCBwb3NpdGlvbiBzbyB3ZSBhc3N1bWUgdGhlIHJlcXVlc3QgY2FtZSBmcm9tIG91dHNpZGUgdGhlXG4gICAgICAvLyB0ZW1wbGF0ZS5cbiAgICAgIGlmICh0ZW1wbGF0ZUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Tm9kZSA9IHRoaXMuZ2V0VHNOb2RlQXRQb3NpdGlvbihmaWxlUGF0aCwgcG9zaXRpb24pO1xuICAgICAgICBpZiAocmVxdWVzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcmlnaW46IFR5cGVTY3JpcHRSZXF1ZXN0ID0ge2tpbmQ6IFJlcXVlc3RLaW5kLlR5cGVTY3JpcHQsIHJlcXVlc3ROb2RlfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFJlbmFtZUxvY2F0aW9uc0F0VHlwZXNjcmlwdFBvc2l0aW9uKGZpbGVQYXRoLCBwb3NpdGlvbiwgcmVxdWVzdE9yaWdpbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmZpbmRSZW5hbWVMb2NhdGlvbnNBdFRlbXBsYXRlUG9zaXRpb24odGVtcGxhdGVJbmZvLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRSZW5hbWVMb2NhdGlvbnNBdFRlbXBsYXRlUG9zaXRpb24odGVtcGxhdGVJbmZvOiBUZW1wbGF0ZUluZm8sIHBvc2l0aW9uOiBudW1iZXIpOlxuICAgICAgcmVhZG9ubHkgdHMuUmVuYW1lTG9jYXRpb25bXXx1bmRlZmluZWQge1xuICAgIGNvbnN0IGFsbFRhcmdldERldGFpbHMgPSB0aGlzLmdldFRhcmdldERldGFpbHNBdFRlbXBsYXRlUG9zaXRpb24odGVtcGxhdGVJbmZvLCBwb3NpdGlvbik7XG4gICAgaWYgKGFsbFRhcmdldERldGFpbHMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsUmVuYW1lTG9jYXRpb25zOiB0cy5SZW5hbWVMb2NhdGlvbltdID0gW107XG4gICAgZm9yIChjb25zdCB0YXJnZXREZXRhaWxzIG9mIGFsbFRhcmdldERldGFpbHMpIHtcbiAgICAgIGNvbnN0IHJlcXVlc3RPcmlnaW46IFRlbXBsYXRlUmVxdWVzdCA9IHtcbiAgICAgICAga2luZDogUmVxdWVzdEtpbmQuVGVtcGxhdGUsXG4gICAgICAgIHJlcXVlc3ROb2RlOiB0YXJnZXREZXRhaWxzLnRlbXBsYXRlVGFyZ2V0LFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgIH07XG5cbiAgICAgIGZvciAoY29uc3QgbG9jYXRpb24gb2YgdGFyZ2V0RGV0YWlscy50eXBlc2NyaXB0TG9jYXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IHRoaXMuZmluZFJlbmFtZUxvY2F0aW9uc0F0VHlwZXNjcmlwdFBvc2l0aW9uKFxuICAgICAgICAgICAgbG9jYXRpb24uZmlsZU5hbWUsIGxvY2F0aW9uLnBvc2l0aW9uLCByZXF1ZXN0T3JpZ2luKTtcbiAgICAgICAgLy8gSWYgd2UgY291bGRuJ3QgZmluZCByZW5hbWUgbG9jYXRpb25zIGZvciBfYW55XyByZXN1bHQsIHdlIHNob3VsZCBub3QgYWxsb3cgcmVuYW1pbmcgdG9cbiAgICAgICAgLy8gcHJvY2VlZCBpbnN0ZWFkIG9mIGhhdmluZyBhIHBhcnRpYWxseSBjb21wbGV0ZSByZW5hbWUuXG4gICAgICAgIGlmIChsb2NhdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgYWxsUmVuYW1lTG9jYXRpb25zLnB1c2goLi4ubG9jYXRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFsbFJlbmFtZUxvY2F0aW9ucy5sZW5ndGggPiAwID8gYWxsUmVuYW1lTG9jYXRpb25zIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUc05vZGVBdFBvc2l0aW9uKGZpbGVQYXRoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpOiB0cy5Ob2RlfG51bGwge1xuICAgIGNvbnN0IHNmID0gdGhpcy5zdHJhdGVneS5nZXRQcm9ncmFtKCkuZ2V0U291cmNlRmlsZShmaWxlUGF0aCk7XG4gICAgaWYgKCFzZikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmaW5kVGlnaHRlc3ROb2RlKHNmLCBwb3NpdGlvbikgPz8gbnVsbDtcbiAgfVxuXG4gIGZpbmRSZW5hbWVMb2NhdGlvbnNBdFR5cGVzY3JpcHRQb3NpdGlvbihcbiAgICAgIGZpbGVQYXRoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIsXG4gICAgICByZXF1ZXN0T3JpZ2luOiBSZXF1ZXN0T3JpZ2luKTogcmVhZG9ubHkgdHMuUmVuYW1lTG9jYXRpb25bXXx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmNvbXBpbGVyLnBlcmZSZWNvcmRlci5pblBoYXNlKFBlcmZQaGFzZS5Mc1JlZmVyZW5jZXNBbmRSZW5hbWVzLCAoKSA9PiB7XG4gICAgICBsZXQgb3JpZ2luYWxOb2RlVGV4dDogc3RyaW5nO1xuICAgICAgaWYgKHJlcXVlc3RPcmlnaW4ua2luZCA9PT0gUmVxdWVzdEtpbmQuVHlwZVNjcmlwdCkge1xuICAgICAgICBvcmlnaW5hbE5vZGVUZXh0ID0gcmVxdWVzdE9yaWdpbi5yZXF1ZXN0Tm9kZS5nZXRUZXh0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZU5vZGVUZXh0ID1cbiAgICAgICAgICAgIGdldFJlbmFtZVRleHRBbmRTcGFuQXRQb3NpdGlvbihyZXF1ZXN0T3JpZ2luLnJlcXVlc3ROb2RlLCByZXF1ZXN0T3JpZ2luLnBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHRlbXBsYXRlTm9kZVRleHQgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIG9yaWdpbmFsTm9kZVRleHQgPSB0ZW1wbGF0ZU5vZGVUZXh0LnRleHQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IHRoaXMudHNMUy5maW5kUmVuYW1lTG9jYXRpb25zKFxuICAgICAgICAgIGZpbGVQYXRoLCBwb3NpdGlvbiwgLypmaW5kSW5TdHJpbmdzKi8gZmFsc2UsIC8qZmluZEluQ29tbWVudHMqLyBmYWxzZSk7XG4gICAgICBpZiAobG9jYXRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZW50cmllczogTWFwPHN0cmluZywgdHMuUmVuYW1lTG9jYXRpb24+ID0gbmV3IE1hcCgpO1xuICAgICAgZm9yIChjb25zdCBsb2NhdGlvbiBvZiBsb2NhdGlvbnMpIHtcbiAgICAgICAgLy8gVE9ETyhhdHNjb3R0KTogRGV0ZXJtaW5lIGlmIGEgZmlsZSBpcyBhIHNoaW0gZmlsZSBpbiBhIG1vcmUgcm9idXN0IHdheSBhbmQgbWFrZSB0aGUgQVBJXG4gICAgICAgIC8vIGF2YWlsYWJsZSBpbiBhbiBhcHByb3ByaWF0ZSBsb2NhdGlvbi5cbiAgICAgICAgaWYgKHRoaXMudHRjLmlzVHJhY2tlZFR5cGVDaGVja0ZpbGUoYWJzb2x1dGVGcm9tKGxvY2F0aW9uLmZpbGVOYW1lKSkpIHtcbiAgICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuY29udmVydFRvVGVtcGxhdGVEb2N1bWVudFNwYW4obG9jYXRpb24sIHRoaXMudHRjLCBvcmlnaW5hbE5vZGVUZXh0KTtcbiAgICAgICAgICAvLyBUaGVyZSBpcyBubyB0ZW1wbGF0ZSBub2RlIHdob3NlIHRleHQgbWF0Y2hlcyB0aGUgb3JpZ2luYWwgcmVuYW1lIHJlcXVlc3QuIEJhaWwgb25cbiAgICAgICAgICAvLyByZW5hbWluZyBjb21wbGV0ZWx5IHJhdGhlciB0aGFuIHByb3ZpZGluZyBpbmNvbXBsZXRlIHJlc3VsdHMuXG4gICAgICAgICAgaWYgKGVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbnRyaWVzLnNldChjcmVhdGVMb2NhdGlvbktleShlbnRyeSksIGVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBFbnN1cmUgd2Ugb25seSBhbGxvdyByZW5hbWluZyBhIFRTIHJlc3VsdCB3aXRoIG1hdGNoaW5nIHRleHRcbiAgICAgICAgICBjb25zdCByZWZOb2RlID0gdGhpcy5nZXRUc05vZGVBdFBvc2l0aW9uKGxvY2F0aW9uLmZpbGVOYW1lLCBsb2NhdGlvbi50ZXh0U3Bhbi5zdGFydCk7XG4gICAgICAgICAgaWYgKHJlZk5vZGUgPT09IG51bGwgfHwgcmVmTm9kZS5nZXRUZXh0KCkgIT09IG9yaWdpbmFsTm9kZVRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVudHJpZXMuc2V0KGNyZWF0ZUxvY2F0aW9uS2V5KGxvY2F0aW9uKSwgbG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShlbnRyaWVzLnZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFJlZmVyZW5jZXNBdFBvc2l0aW9uKGZpbGVQYXRoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpOiB0cy5SZWZlcmVuY2VFbnRyeVtdfHVuZGVmaW5lZCB7XG4gICAgdGhpcy50dGMuZ2VuZXJhdGVBbGxUeXBlQ2hlY2tCbG9ja3MoKTtcblxuICAgIHJldHVybiB0aGlzLmNvbXBpbGVyLnBlcmZSZWNvcmRlci5pblBoYXNlKFBlcmZQaGFzZS5Mc1JlZmVyZW5jZXNBbmRSZW5hbWVzLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZUluZm8gPSBnZXRUZW1wbGF0ZUluZm9BdFBvc2l0aW9uKGZpbGVQYXRoLCBwb3NpdGlvbiwgdGhpcy5jb21waWxlcik7XG4gICAgICBpZiAodGVtcGxhdGVJbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVmZXJlbmNlc0F0VHlwZXNjcmlwdFBvc2l0aW9uKGZpbGVQYXRoLCBwb3NpdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWZlcmVuY2VzQXRUZW1wbGF0ZVBvc2l0aW9uKHRlbXBsYXRlSW5mbywgcG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWZlcmVuY2VzQXRUZW1wbGF0ZVBvc2l0aW9uKHRlbXBsYXRlSW5mbzogVGVtcGxhdGVJbmZvLCBwb3NpdGlvbjogbnVtYmVyKTpcbiAgICAgIHRzLlJlZmVyZW5jZUVudHJ5W118dW5kZWZpbmVkIHtcbiAgICBjb25zdCBhbGxUYXJnZXREZXRhaWxzID0gdGhpcy5nZXRUYXJnZXREZXRhaWxzQXRUZW1wbGF0ZVBvc2l0aW9uKHRlbXBsYXRlSW5mbywgcG9zaXRpb24pO1xuICAgIGlmIChhbGxUYXJnZXREZXRhaWxzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBhbGxSZWZlcmVuY2VzOiB0cy5SZWZlcmVuY2VFbnRyeVtdID0gW107XG4gICAgZm9yIChjb25zdCB0YXJnZXREZXRhaWxzIG9mIGFsbFRhcmdldERldGFpbHMpIHtcbiAgICAgIGZvciAoY29uc3QgbG9jYXRpb24gb2YgdGFyZ2V0RGV0YWlscy50eXBlc2NyaXB0TG9jYXRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlZnMgPSB0aGlzLmdldFJlZmVyZW5jZXNBdFR5cGVzY3JpcHRQb3NpdGlvbihsb2NhdGlvbi5maWxlTmFtZSwgbG9jYXRpb24ucG9zaXRpb24pO1xuICAgICAgICBpZiAocmVmcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWxsUmVmZXJlbmNlcy5wdXNoKC4uLnJlZnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhbGxSZWZlcmVuY2VzLmxlbmd0aCA+IDAgPyBhbGxSZWZlcmVuY2VzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUYXJnZXREZXRhaWxzQXRUZW1wbGF0ZVBvc2l0aW9uKHt0ZW1wbGF0ZSwgY29tcG9uZW50fTogVGVtcGxhdGVJbmZvLCBwb3NpdGlvbjogbnVtYmVyKTpcbiAgICAgIFRlbXBsYXRlTG9jYXRpb25EZXRhaWxzW118bnVsbCB7XG4gICAgLy8gRmluZCB0aGUgQVNUIG5vZGUgaW4gdGhlIHRlbXBsYXRlIGF0IHRoZSBwb3NpdGlvbi5cbiAgICBjb25zdCBwb3NpdGlvbkRldGFpbHMgPSBnZXRUYXJnZXRBdFBvc2l0aW9uKHRlbXBsYXRlLCBwb3NpdGlvbik7XG4gICAgaWYgKHBvc2l0aW9uRGV0YWlscyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBwb3NpdGlvbkRldGFpbHMuY29udGV4dC5raW5kID09PSBUYXJnZXROb2RlS2luZC5Ud29XYXlCaW5kaW5nQ29udGV4dCA/XG4gICAgICAgIHBvc2l0aW9uRGV0YWlscy5jb250ZXh0Lm5vZGVzIDpcbiAgICAgICAgW3Bvc2l0aW9uRGV0YWlscy5jb250ZXh0Lm5vZGVdO1xuXG4gICAgY29uc3QgZGV0YWlsczogVGVtcGxhdGVMb2NhdGlvbkRldGFpbHNbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAvLyBHZXQgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBUQ0IgYXQgdGhlIHRlbXBsYXRlIHBvc2l0aW9uLlxuICAgICAgY29uc3Qgc3ltYm9sID0gdGhpcy50dGMuZ2V0U3ltYm9sT2ZOb2RlKG5vZGUsIGNvbXBvbmVudCk7XG4gICAgICBpZiAoc3ltYm9sID09PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZW1wbGF0ZVRhcmdldCA9IG5vZGU7XG4gICAgICBzd2l0Y2ggKHN5bWJvbC5raW5kKSB7XG4gICAgICAgIGNhc2UgU3ltYm9sS2luZC5EaXJlY3RpdmU6XG4gICAgICAgIGNhc2UgU3ltYm9sS2luZC5UZW1wbGF0ZTpcbiAgICAgICAgICAvLyBSZWZlcmVuY2VzIHRvIGVsZW1lbnRzLCB0ZW1wbGF0ZXMsIGFuZCBkaXJlY3RpdmVzIHdpbGwgYmUgdGhyb3VnaCB0ZW1wbGF0ZSByZWZlcmVuY2VzXG4gICAgICAgICAgLy8gKCNyZWYpLiBUaGV5IHNob3VsZG4ndCBiZSB1c2VkIGRpcmVjdGx5IGZvciBhIExhbmd1YWdlIFNlcnZpY2UgcmVmZXJlbmNlIHJlcXVlc3QuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgU3ltYm9sS2luZC5FbGVtZW50OiB7XG4gICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGdldERpcmVjdGl2ZU1hdGNoZXNGb3JFbGVtZW50VGFnKHN5bWJvbC50ZW1wbGF0ZU5vZGUsIHN5bWJvbC5kaXJlY3RpdmVzKTtcbiAgICAgICAgICBkZXRhaWxzLnB1c2goXG4gICAgICAgICAgICAgIHt0eXBlc2NyaXB0TG9jYXRpb25zOiB0aGlzLmdldFBvc2l0aW9uc0ZvckRpcmVjdGl2ZXMobWF0Y2hlcyksIHRlbXBsYXRlVGFyZ2V0fSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBTeW1ib2xLaW5kLkRvbUJpbmRpbmc6IHtcbiAgICAgICAgICAvLyBEb20gYmluZGluZ3MgYXJlbid0IGN1cnJlbnRseSB0eXBlLWNoZWNrZWQgKHNlZSBgY2hlY2tUeXBlT2ZEb21CaW5kaW5nc2ApIHNvIHRoZXkgZG9uJ3RcbiAgICAgICAgICAvLyBoYXZlIGEgc2hpbSBsb2NhdGlvbi4gVGhpcyBtZWFucyB3ZSBjYW4ndCBtYXRjaCBkb20gYmluZGluZ3MgdG8gdGhlaXIgbGliLmRvbVxuICAgICAgICAgIC8vIHJlZmVyZW5jZSwgYnV0IHdlIGNhbiBzdGlsbCBzZWUgaWYgdGhleSBtYXRjaCB0byBhIGRpcmVjdGl2ZS5cbiAgICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgVG1wbEFzdFRleHRBdHRyaWJ1dGUpICYmICEobm9kZSBpbnN0YW5jZW9mIFRtcGxBc3RCb3VuZEF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkaXJlY3RpdmVzID0gZ2V0RGlyZWN0aXZlTWF0Y2hlc0ZvckF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgbm9kZS5uYW1lLCBzeW1ib2wuaG9zdC50ZW1wbGF0ZU5vZGUsIHN5bWJvbC5ob3N0LmRpcmVjdGl2ZXMpO1xuICAgICAgICAgIGRldGFpbHMucHVzaCh7XG4gICAgICAgICAgICB0eXBlc2NyaXB0TG9jYXRpb25zOiB0aGlzLmdldFBvc2l0aW9uc0ZvckRpcmVjdGl2ZXMoZGlyZWN0aXZlcyksXG4gICAgICAgICAgICB0ZW1wbGF0ZVRhcmdldCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFN5bWJvbEtpbmQuUmVmZXJlbmNlOiB7XG4gICAgICAgICAgZGV0YWlscy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGVzY3JpcHRMb2NhdGlvbnM6IFt0b0ZpbGVQb3NpdGlvbihzeW1ib2wucmVmZXJlbmNlVmFyTG9jYXRpb24pXSxcbiAgICAgICAgICAgIHRlbXBsYXRlVGFyZ2V0LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgU3ltYm9sS2luZC5WYXJpYWJsZToge1xuICAgICAgICAgIGlmICgodGVtcGxhdGVUYXJnZXQgaW5zdGFuY2VvZiBUbXBsQXN0VmFyaWFibGUpKSB7XG4gICAgICAgICAgICBpZiAodGVtcGxhdGVUYXJnZXQudmFsdWVTcGFuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBpc1dpdGhpbihwb3NpdGlvbiwgdGVtcGxhdGVUYXJnZXQudmFsdWVTcGFuKSkge1xuICAgICAgICAgICAgICAvLyBJbiB0aGUgdmFsdWVTcGFuIG9mIHRoZSB2YXJpYWJsZSwgd2Ugd2FudCB0byBnZXQgdGhlIHJlZmVyZW5jZSBvZiB0aGUgaW5pdGlhbGl6ZXIuXG4gICAgICAgICAgICAgIGRldGFpbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZXNjcmlwdExvY2F0aW9uczogW3RvRmlsZVBvc2l0aW9uKHN5bWJvbC5pbml0aWFsaXplckxvY2F0aW9uKV0sXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVUYXJnZXQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1dpdGhpbihwb3NpdGlvbiwgdGVtcGxhdGVUYXJnZXQua2V5U3BhbikpIHtcbiAgICAgICAgICAgICAgLy8gSW4gdGhlIGtleVNwYW4gb2YgdGhlIHZhcmlhYmxlLCB3ZSB3YW50IHRvIGdldCB0aGUgcmVmZXJlbmNlIG9mIHRoZSBsb2NhbCB2YXJpYWJsZS5cbiAgICAgICAgICAgICAgZGV0YWlscy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlc2NyaXB0TG9jYXRpb25zOiBbdG9GaWxlUG9zaXRpb24oc3ltYm9sLmxvY2FsVmFyTG9jYXRpb24pXSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVRhcmdldCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB0ZW1wbGF0ZU5vZGUgaXMgbm90IHRoZSBgVG1wbEFzdFZhcmlhYmxlYCwgaXQgbXVzdCBiZSBhIHVzYWdlIG9mIHRoZVxuICAgICAgICAgICAgLy8gdmFyaWFibGUgc29tZXdoZXJlIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgICAgIGRldGFpbHMucHVzaCh7XG4gICAgICAgICAgICAgIHR5cGVzY3JpcHRMb2NhdGlvbnM6IFt0b0ZpbGVQb3NpdGlvbihzeW1ib2wubG9jYWxWYXJMb2NhdGlvbildLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVRhcmdldCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFN5bWJvbEtpbmQuSW5wdXQ6XG4gICAgICAgIGNhc2UgU3ltYm9sS2luZC5PdXRwdXQ6IHtcbiAgICAgICAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgICAgICAgdHlwZXNjcmlwdExvY2F0aW9uczpcbiAgICAgICAgICAgICAgICBzeW1ib2wuYmluZGluZ3MubWFwKGJpbmRpbmcgPT4gdG9GaWxlUG9zaXRpb24oYmluZGluZy5zaGltTG9jYXRpb24pKSxcbiAgICAgICAgICAgIHRlbXBsYXRlVGFyZ2V0LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgU3ltYm9sS2luZC5QaXBlOlxuICAgICAgICBjYXNlIFN5bWJvbEtpbmQuRXhwcmVzc2lvbjoge1xuICAgICAgICAgIGRldGFpbHMucHVzaChcbiAgICAgICAgICAgICAge3R5cGVzY3JpcHRMb2NhdGlvbnM6IFt0b0ZpbGVQb3NpdGlvbihzeW1ib2wuc2hpbUxvY2F0aW9uKV0sIHRlbXBsYXRlVGFyZ2V0fSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGV0YWlscy5sZW5ndGggPiAwID8gZGV0YWlscyA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldFBvc2l0aW9uc0ZvckRpcmVjdGl2ZXMoZGlyZWN0aXZlczogU2V0PERpcmVjdGl2ZVN5bWJvbD4pOiBGaWxlUG9zaXRpb25bXSB7XG4gICAgY29uc3QgYWxsRGlyZWN0aXZlczogRmlsZVBvc2l0aW9uW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGRpciBvZiBkaXJlY3RpdmVzLnZhbHVlcygpKSB7XG4gICAgICBjb25zdCBkaXJDbGFzcyA9IGRpci50c1N5bWJvbC52YWx1ZURlY2xhcmF0aW9uO1xuICAgICAgaWYgKGRpckNsYXNzID09PSB1bmRlZmluZWQgfHwgIXRzLmlzQ2xhc3NEZWNsYXJhdGlvbihkaXJDbGFzcykgfHxcbiAgICAgICAgICBkaXJDbGFzcy5uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtmaWxlTmFtZX0gPSBkaXJDbGFzcy5nZXRTb3VyY2VGaWxlKCk7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGRpckNsYXNzLm5hbWUuZ2V0U3RhcnQoKTtcbiAgICAgIGFsbERpcmVjdGl2ZXMucHVzaCh7ZmlsZU5hbWUsIHBvc2l0aW9ufSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsbERpcmVjdGl2ZXM7XG4gIH1cblxuICBwcml2YXRlIGdldFJlZmVyZW5jZXNBdFR5cGVzY3JpcHRQb3NpdGlvbihmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKTpcbiAgICAgIHRzLlJlZmVyZW5jZUVudHJ5W118dW5kZWZpbmVkIHtcbiAgICBjb25zdCByZWZzID0gdGhpcy50c0xTLmdldFJlZmVyZW5jZXNBdFBvc2l0aW9uKGZpbGVOYW1lLCBwb3NpdGlvbik7XG4gICAgaWYgKHJlZnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyaWVzOiBNYXA8c3RyaW5nLCB0cy5SZWZlcmVuY2VFbnRyeT4gPSBuZXcgTWFwKCk7XG4gICAgZm9yIChjb25zdCByZWYgb2YgcmVmcykge1xuICAgICAgaWYgKHRoaXMudHRjLmlzVHJhY2tlZFR5cGVDaGVja0ZpbGUoYWJzb2x1dGVGcm9tKHJlZi5maWxlTmFtZSkpKSB7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jb252ZXJ0VG9UZW1wbGF0ZURvY3VtZW50U3BhbihyZWYsIHRoaXMudHRjKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgZW50cmllcy5zZXQoY3JlYXRlTG9jYXRpb25LZXkoZW50cnkpLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVudHJpZXMuc2V0KGNyZWF0ZUxvY2F0aW9uS2V5KHJlZiksIHJlZik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKGVudHJpZXMudmFsdWVzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VG9UZW1wbGF0ZURvY3VtZW50U3BhbjxUIGV4dGVuZHMgdHMuRG9jdW1lbnRTcGFuPihcbiAgICAgIHNoaW1Eb2N1bWVudFNwYW46IFQsIHRlbXBsYXRlVHlwZUNoZWNrZXI6IFRlbXBsYXRlVHlwZUNoZWNrZXIsIHJlcXVpcmVkTm9kZVRleHQ/OiBzdHJpbmcpOiBUXG4gICAgICB8bnVsbCB7XG4gICAgY29uc3Qgc2YgPSB0aGlzLnN0cmF0ZWd5LmdldFByb2dyYW0oKS5nZXRTb3VyY2VGaWxlKHNoaW1Eb2N1bWVudFNwYW4uZmlsZU5hbWUpO1xuICAgIGlmIChzZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdGNiTm9kZSA9IGZpbmRUaWdodGVzdE5vZGUoc2YsIHNoaW1Eb2N1bWVudFNwYW4udGV4dFNwYW4uc3RhcnQpO1xuICAgIGlmICh0Y2JOb2RlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgaGFzRXhwcmVzc2lvbklkZW50aWZpZXIoc2YsIHRjYk5vZGUsIEV4cHJlc3Npb25JZGVudGlmaWVyLkVWRU5UX1BBUkFNRVRFUikpIHtcbiAgICAgIC8vIElmIHRoZSByZWZlcmVuY2UgcmVzdWx0IGlzIHRoZSAkZXZlbnQgcGFyYW1ldGVyIGluIHRoZSBzdWJzY3JpYmUvYWRkRXZlbnRMaXN0ZW5lclxuICAgICAgLy8gZnVuY3Rpb24gaW4gdGhlIFRDQiwgd2Ugd2FudCB0byBmaWx0ZXIgdGhpcyByZXN1bHQgb3V0IG9mIHRoZSByZWZlcmVuY2VzLiBXZSByZWFsbHkgb25seVxuICAgICAgLy8gd2FudCB0byByZXR1cm4gcmVmZXJlbmNlcyB0byB0aGUgcGFyYW1ldGVyIGluIHRoZSB0ZW1wbGF0ZSBpdHNlbGYuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gVE9ETyhhdHNjb3R0KTogRGV0ZXJtaW5lIGhvdyB0byBjb25zaXN0ZW50bHkgcmVzb2x2ZSBwYXRocy4gaS5lLiB3aXRoIHRoZSBwcm9qZWN0XG4gICAgLy8gc2VydmVySG9zdCBvciBMU1BhcnNlQ29uZmlnSG9zdCBpbiB0aGUgYWRhcHRlci4gV2Ugc2hvdWxkIGhhdmUgYSBiZXR0ZXIgZGVmaW5lZCB3YXkgdG9cbiAgICAvLyBub3JtYWxpemUgcGF0aHMuXG4gICAgY29uc3QgbWFwcGluZyA9IGdldFRlbXBsYXRlTG9jYXRpb25Gcm9tU2hpbUxvY2F0aW9uKFxuICAgICAgICB0ZW1wbGF0ZVR5cGVDaGVja2VyLCBhYnNvbHV0ZUZyb20oc2hpbURvY3VtZW50U3Bhbi5maWxlTmFtZSksXG4gICAgICAgIHNoaW1Eb2N1bWVudFNwYW4udGV4dFNwYW4uc3RhcnQpO1xuICAgIGlmIChtYXBwaW5nID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB7c3BhbiwgdGVtcGxhdGVVcmx9ID0gbWFwcGluZztcbiAgICBpZiAocmVxdWlyZWROb2RlVGV4dCAhPT0gdW5kZWZpbmVkICYmIHNwYW4udG9TdHJpbmcoKSAhPT0gcmVxdWlyZWROb2RlVGV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNoaW1Eb2N1bWVudFNwYW4sXG4gICAgICBmaWxlTmFtZTogdGVtcGxhdGVVcmwsXG4gICAgICB0ZXh0U3BhbjogdG9UZXh0U3BhbihzcGFuKSxcbiAgICAgIC8vIFNwZWNpZmljYWxseSBjbGVhciBvdGhlciB0ZXh0IHNwYW4gdmFsdWVzIGJlY2F1c2Ugd2UgZG8gbm90IGhhdmUgZW5vdWdoIGtub3dsZWRnZSB0b1xuICAgICAgLy8gY29udmVydCB0aGVzZSB0byBzcGFucyBpbiB0aGUgdGVtcGxhdGUuXG4gICAgICBjb250ZXh0U3BhbjogdW5kZWZpbmVkLFxuICAgICAgb3JpZ2luYWxDb250ZXh0U3BhbjogdW5kZWZpbmVkLFxuICAgICAgb3JpZ2luYWxUZXh0U3BhbjogdW5kZWZpbmVkLFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmVuYW1lVGV4dEFuZFNwYW5BdFBvc2l0aW9uKFxuICAgIG5vZGU6IFRtcGxBc3ROb2RlfEFTVCwgcG9zaXRpb246IG51bWJlcik6IHt0ZXh0OiBzdHJpbmcsIHNwYW46IHRzLlRleHRTcGFufXxudWxsIHtcbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBUbXBsQXN0Qm91bmRBdHRyaWJ1dGUgfHwgbm9kZSBpbnN0YW5jZW9mIFRtcGxBc3RUZXh0QXR0cmlidXRlIHx8XG4gICAgICBub2RlIGluc3RhbmNlb2YgVG1wbEFzdEJvdW5kRXZlbnQpIHtcbiAgICBpZiAobm9kZS5rZXlTcGFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge3RleHQ6IG5vZGUubmFtZSwgc3BhbjogdG9UZXh0U3Bhbihub2RlLmtleVNwYW4pfTtcbiAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgVG1wbEFzdFZhcmlhYmxlIHx8IG5vZGUgaW5zdGFuY2VvZiBUbXBsQXN0UmVmZXJlbmNlKSB7XG4gICAgaWYgKGlzV2l0aGluKHBvc2l0aW9uLCBub2RlLmtleVNwYW4pKSB7XG4gICAgICByZXR1cm4ge3RleHQ6IG5vZGUua2V5U3Bhbi50b1N0cmluZygpLCBzcGFuOiB0b1RleHRTcGFuKG5vZGUua2V5U3Bhbil9O1xuICAgIH0gZWxzZSBpZiAobm9kZS52YWx1ZVNwYW4gJiYgaXNXaXRoaW4ocG9zaXRpb24sIG5vZGUudmFsdWVTcGFuKSkge1xuICAgICAgcmV0dXJuIHt0ZXh0OiBub2RlLnZhbHVlU3Bhbi50b1N0cmluZygpLCBzcGFuOiB0b1RleHRTcGFuKG5vZGUudmFsdWVTcGFuKX07XG4gICAgfVxuICB9XG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBCaW5kaW5nUGlwZSkge1xuICAgIC8vIFRPRE8oYXRzY290dCk6IEFkZCBzdXBwb3J0IGZvciByZW5hbWluZyBwaXBlc1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChub2RlIGluc3RhbmNlb2YgUHJvcGVydHlSZWFkIHx8IG5vZGUgaW5zdGFuY2VvZiBNZXRob2RDYWxsIHx8IG5vZGUgaW5zdGFuY2VvZiBQcm9wZXJ0eVdyaXRlIHx8XG4gICAgICBub2RlIGluc3RhbmNlb2YgU2FmZVByb3BlcnR5UmVhZCB8fCBub2RlIGluc3RhbmNlb2YgU2FmZU1ldGhvZENhbGwpIHtcbiAgICByZXR1cm4ge3RleHQ6IG5vZGUubmFtZSwgc3BhbjogdG9UZXh0U3Bhbihub2RlLm5hbWVTcGFuKX07XG4gIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIExpdGVyYWxQcmltaXRpdmUpIHtcbiAgICBjb25zdCBzcGFuID0gdG9UZXh0U3Bhbihub2RlLnNvdXJjZVNwYW4pO1xuICAgIGNvbnN0IHRleHQgPSBub2RlLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoZSBzcGFuIG9mIGEgc3RyaW5nIGxpdGVyYWwgaW5jbHVkZXMgdGhlIHF1b3RlcyBidXQgdGhleSBzaG91bGQgYmUgcmVtb3ZlZCBmb3IgcmVuYW1pbmcuXG4gICAgICBzcGFuLnN0YXJ0ICs9IDE7XG4gICAgICBzcGFuLmxlbmd0aCAtPSAyO1xuICAgIH1cbiAgICByZXR1cm4ge3RleHQsIHNwYW59O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgXCJrZXlcIiBmb3IgYSByZW5hbWUvcmVmZXJlbmNlIGxvY2F0aW9uIGJ5IGNvbmNhdGVuYXRpbmcgZmlsZSBuYW1lLCBzcGFuIHN0YXJ0LCBhbmQgc3BhblxuICogbGVuZ3RoLiBUaGlzIGFsbG93cyB1cyB0byBkZS1kdXBsaWNhdGUgdGVtcGxhdGUgcmVzdWx0cyB3aGVuIGFuIGl0ZW0gbWF5IGFwcGVhciBzZXZlcmFsIHRpbWVzXG4gKiBpbiB0aGUgVENCIGJ1dCBtYXAgYmFjayB0byB0aGUgc2FtZSB0ZW1wbGF0ZSBsb2NhdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb25LZXkoZHM6IHRzLkRvY3VtZW50U3Bhbikge1xuICByZXR1cm4gZHMuZmlsZU5hbWUgKyBkcy50ZXh0U3Bhbi5zdGFydCArIGRzLnRleHRTcGFuLmxlbmd0aDtcbn0iXX0=