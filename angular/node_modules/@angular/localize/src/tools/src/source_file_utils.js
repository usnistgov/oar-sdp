(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/source_file_utils", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/localize", "@babel/types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeLocationPosition = exports.getLocation = exports.buildCodeFrameError = exports.isBabelParseError = exports.BabelParseError = exports.translate = exports.isArrayOfExpressions = exports.isStringLiteralArray = exports.unwrapLazyLoadHelperCall = exports.unwrapStringLiteralArray = exports.wrapInParensIfNecessary = exports.unwrapExpressionsFromTemplateLiteral = exports.unwrapMessagePartsFromTemplateLiteral = exports.unwrapSubstitutionsFromLocalizeCall = exports.unwrapMessagePartsFromLocalizeCall = exports.buildLocalizeReplacement = exports.isGlobalIdentifier = exports.isNamedIdentifier = exports.isLocalize = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var localize_1 = require("@angular/localize");
    var t = require("@babel/types");
    /**
     * Is the given `expression` the global `$localize` identifier?
     *
     * @param expression The expression to check.
     * @param localizeName The configured name of `$localize`.
     */
    function isLocalize(expression, localizeName) {
        return isNamedIdentifier(expression, localizeName) && isGlobalIdentifier(expression);
    }
    exports.isLocalize = isLocalize;
    /**
     * Is the given `expression` an identifier with the correct `name`?
     *
     * @param expression The expression to check.
     * @param name The name of the identifier we are looking for.
     */
    function isNamedIdentifier(expression, name) {
        return expression.isIdentifier() && expression.node.name === name;
    }
    exports.isNamedIdentifier = isNamedIdentifier;
    /**
     * Is the given `identifier` declared globally.
     *
     * @param identifier The identifier to check.
     * @publicApi used by CLI
     */
    function isGlobalIdentifier(identifier) {
        return !identifier.scope || !identifier.scope.hasBinding(identifier.node.name);
    }
    exports.isGlobalIdentifier = isGlobalIdentifier;
    /**
     * Build a translated expression to replace the call to `$localize`.
     * @param messageParts The static parts of the message.
     * @param substitutions The expressions to substitute into the message.
     * @publicApi used by CLI
     */
    function buildLocalizeReplacement(messageParts, substitutions) {
        var mappedString = t.stringLiteral(messageParts[0]);
        for (var i = 1; i < messageParts.length; i++) {
            mappedString =
                t.binaryExpression('+', mappedString, wrapInParensIfNecessary(substitutions[i - 1]));
            mappedString = t.binaryExpression('+', mappedString, t.stringLiteral(messageParts[i]));
        }
        return mappedString;
    }
    exports.buildLocalizeReplacement = buildLocalizeReplacement;
    /**
     * Extract the message parts from the given `call` (to `$localize`).
     *
     * The message parts will either by the first argument to the `call` or it will be wrapped in call
     * to a helper function like `__makeTemplateObject`.
     *
     * @param call The AST node of the call to process.
     * @param fs The file system to use when computing source-map paths. If not provided then it uses
     *     the "current" FileSystem.
     * @publicApi used by CLI
     */
    function unwrapMessagePartsFromLocalizeCall(call, fs) {
        if (fs === void 0) { fs = file_system_1.getFileSystem(); }
        var cooked = call.get('arguments')[0];
        if (cooked === undefined) {
            throw new BabelParseError(call.node, '`$localize` called without any arguments.');
        }
        if (!cooked.isExpression()) {
            throw new BabelParseError(cooked.node, 'Unexpected argument to `$localize` (expected an array).');
        }
        // If there is no call to `__makeTemplateObject(...)`, then `raw` must be the same as `cooked`.
        var raw = cooked;
        // Check for cached call of the form `x || x = __makeTemplateObject(...)`
        if (cooked.isLogicalExpression() && cooked.node.operator === '||' &&
            cooked.get('left').isIdentifier()) {
            var right = cooked.get('right');
            if (right.isAssignmentExpression()) {
                cooked = right.get('right');
                if (!cooked.isExpression()) {
                    throw new BabelParseError(cooked.node, 'Unexpected "makeTemplateObject()" function (expected an expression).');
                }
            }
            else if (right.isSequenceExpression()) {
                var expressions = right.get('expressions');
                if (expressions.length > 2) {
                    // This is a minified sequence expression, where the first two expressions in the sequence
                    // are assignments of the cooked and raw arrays respectively.
                    var _a = tslib_1.__read(expressions, 2), first = _a[0], second = _a[1];
                    if (first.isAssignmentExpression() && second.isAssignmentExpression()) {
                        cooked = first.get('right');
                        if (!cooked.isExpression()) {
                            throw new BabelParseError(first.node, 'Unexpected cooked value, expected an expression.');
                        }
                        raw = second.get('right');
                        if (!raw.isExpression()) {
                            throw new BabelParseError(second.node, 'Unexpected raw value, expected an expression.');
                        }
                    }
                }
            }
        }
        // Check for `__makeTemplateObject(cooked, raw)` or `__templateObject()` calls.
        if (cooked.isCallExpression()) {
            var call_1 = cooked;
            if (call_1.get('arguments').length === 0) {
                // No arguments so perhaps it is a `__templateObject()` call.
                // Unwrap this to get the `_taggedTemplateLiteral(cooked, raw)` call.
                call_1 = unwrapLazyLoadHelperCall(call_1);
            }
            cooked = call_1.get('arguments')[0];
            if (!cooked.isExpression()) {
                throw new BabelParseError(cooked.node, 'Unexpected `cooked` argument to the "makeTemplateObject()" function (expected an expression).');
            }
            var arg2 = call_1.get('arguments')[1];
            if (arg2 && !arg2.isExpression()) {
                throw new BabelParseError(arg2.node, 'Unexpected `raw` argument to the "makeTemplateObject()" function (expected an expression).');
            }
            // If there is no second argument then assume that raw and cooked are the same
            raw = arg2 !== undefined ? arg2 : cooked;
        }
        var _b = tslib_1.__read(unwrapStringLiteralArray(cooked, fs), 1), cookedStrings = _b[0];
        var _c = tslib_1.__read(unwrapStringLiteralArray(raw, fs), 2), rawStrings = _c[0], rawLocations = _c[1];
        return [localize_1.ɵmakeTemplateObject(cookedStrings, rawStrings), rawLocations];
    }
    exports.unwrapMessagePartsFromLocalizeCall = unwrapMessagePartsFromLocalizeCall;
    /**
     * Parse the localize call expression to extract the arguments that hold the substition expressions.
     *
     * @param call The AST node of the call to process.
     * @param fs The file system to use when computing source-map paths. If not provided then it uses
     *     the "current" FileSystem.
     * @publicApi used by CLI
     */
    function unwrapSubstitutionsFromLocalizeCall(call, fs) {
        if (fs === void 0) { fs = file_system_1.getFileSystem(); }
        var expressions = call.get('arguments').splice(1);
        if (!isArrayOfExpressions(expressions)) {
            var badExpression = expressions.find(function (expression) { return !expression.isExpression(); });
            throw new BabelParseError(badExpression.node, 'Invalid substitutions for `$localize` (expected all substitution arguments to be expressions).');
        }
        return [
            expressions.map(function (path) { return path.node; }), expressions.map(function (expression) { return getLocation(fs, expression); })
        ];
    }
    exports.unwrapSubstitutionsFromLocalizeCall = unwrapSubstitutionsFromLocalizeCall;
    /**
     * Parse the tagged template literal to extract the message parts.
     *
     * @param elements The elements of the template literal to process.
     * @param fs The file system to use when computing source-map paths. If not provided then it uses
     *     the "current" FileSystem.
     * @publicApi used by CLI
     */
    function unwrapMessagePartsFromTemplateLiteral(elements, fs) {
        if (fs === void 0) { fs = file_system_1.getFileSystem(); }
        var cooked = elements.map(function (q) {
            if (q.node.value.cooked === undefined) {
                throw new BabelParseError(q.node, "Unexpected undefined message part in \"" + elements.map(function (q) { return q.node.value.cooked; }) + "\"");
            }
            return q.node.value.cooked;
        });
        var raw = elements.map(function (q) { return q.node.value.raw; });
        var locations = elements.map(function (q) { return getLocation(fs, q); });
        return [localize_1.ɵmakeTemplateObject(cooked, raw), locations];
    }
    exports.unwrapMessagePartsFromTemplateLiteral = unwrapMessagePartsFromTemplateLiteral;
    /**
     * Parse the tagged template literal to extract the interpolation expressions.
     *
     * @param quasi The AST node of the template literal to process.
     * @param fs The file system to use when computing source-map paths. If not provided then it uses
     *     the "current" FileSystem.
     * @publicApi used by CLI
     */
    function unwrapExpressionsFromTemplateLiteral(quasi, fs) {
        if (fs === void 0) { fs = file_system_1.getFileSystem(); }
        return [quasi.node.expressions, quasi.get('expressions').map(function (e) { return getLocation(fs, e); })];
    }
    exports.unwrapExpressionsFromTemplateLiteral = unwrapExpressionsFromTemplateLiteral;
    /**
     * Wrap the given `expression` in parentheses if it is a binary expression.
     *
     * This ensures that this expression is evaluated correctly if it is embedded in another expression.
     *
     * @param expression The expression to potentially wrap.
     */
    function wrapInParensIfNecessary(expression) {
        if (t.isBinaryExpression(expression)) {
            return t.parenthesizedExpression(expression);
        }
        else {
            return expression;
        }
    }
    exports.wrapInParensIfNecessary = wrapInParensIfNecessary;
    /**
     * Extract the string values from an `array` of string literals.
     *
     * @param array The array to unwrap.
     * @param fs The file system to use when computing source-map paths. If not provided then it uses
     *     the "current" FileSystem.
     */
    function unwrapStringLiteralArray(array, fs) {
        if (fs === void 0) { fs = file_system_1.getFileSystem(); }
        if (!isStringLiteralArray(array.node)) {
            throw new BabelParseError(array.node, 'Unexpected messageParts for `$localize` (expected an array of strings).');
        }
        var elements = array.get('elements');
        return [elements.map(function (str) { return str.node.value; }), elements.map(function (str) { return getLocation(fs, str); })];
    }
    exports.unwrapStringLiteralArray = unwrapStringLiteralArray;
    /**
     * This expression is believed to be a call to a "lazy-load" template object helper function.
     * This is expected to be of the form:
     *
     * ```ts
     *  function _templateObject() {
     *    var e = _taggedTemplateLiteral(['cooked string', 'raw string']);
     *    return _templateObject = function() { return e }, e
     *  }
     * ```
     *
     * We unwrap this to return the call to `_taggedTemplateLiteral()`.
     *
     * @param call the call expression to unwrap
     * @returns the  call expression
     */
    function unwrapLazyLoadHelperCall(call) {
        var callee = call.get('callee');
        if (!callee.isIdentifier()) {
            throw new BabelParseError(callee.node, 'Unexpected lazy-load helper call (expected a call of the form `_templateObject()`).');
        }
        var lazyLoadBinding = call.scope.getBinding(callee.node.name);
        if (!lazyLoadBinding) {
            throw new BabelParseError(callee.node, 'Missing declaration for lazy-load helper function');
        }
        var lazyLoadFn = lazyLoadBinding.path;
        if (!lazyLoadFn.isFunctionDeclaration()) {
            throw new BabelParseError(lazyLoadFn.node, 'Unexpected expression (expected a function declaration');
        }
        var returnedNode = getReturnedExpression(lazyLoadFn);
        if (returnedNode.isCallExpression()) {
            return returnedNode;
        }
        if (returnedNode.isIdentifier()) {
            var identifierName = returnedNode.node.name;
            var declaration = returnedNode.scope.getBinding(identifierName);
            if (declaration === undefined) {
                throw new BabelParseError(returnedNode.node, 'Missing declaration for return value from helper.');
            }
            if (!declaration.path.isVariableDeclarator()) {
                throw new BabelParseError(declaration.path.node, 'Unexpected helper return value declaration (expected a variable declaration).');
            }
            var initializer = declaration.path.get('init');
            if (!initializer.isCallExpression()) {
                throw new BabelParseError(declaration.path.node, 'Unexpected return value from helper (expected a call expression).');
            }
            // Remove the lazy load helper if this is the only reference to it.
            if (lazyLoadBinding.references === 1) {
                lazyLoadFn.remove();
            }
            return initializer;
        }
        return call;
    }
    exports.unwrapLazyLoadHelperCall = unwrapLazyLoadHelperCall;
    function getReturnedExpression(fn) {
        var e_1, _a;
        var bodyStatements = fn.get('body').get('body');
        try {
            for (var bodyStatements_1 = tslib_1.__values(bodyStatements), bodyStatements_1_1 = bodyStatements_1.next(); !bodyStatements_1_1.done; bodyStatements_1_1 = bodyStatements_1.next()) {
                var statement = bodyStatements_1_1.value;
                if (statement.isReturnStatement()) {
                    var argument = statement.get('argument');
                    if (argument.isSequenceExpression()) {
                        var expressions = argument.get('expressions');
                        return Array.isArray(expressions) ? expressions[expressions.length - 1] : expressions;
                    }
                    else if (argument.isExpression()) {
                        return argument;
                    }
                    else {
                        throw new BabelParseError(statement.node, 'Invalid return argument in helper function (expected an expression).');
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bodyStatements_1_1 && !bodyStatements_1_1.done && (_a = bodyStatements_1.return)) _a.call(bodyStatements_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new BabelParseError(fn.node, 'Missing return statement in helper function.');
    }
    /**
     * Is the given `node` an array of literal strings?
     *
     * @param node The node to test.
     */
    function isStringLiteralArray(node) {
        return t.isArrayExpression(node) && node.elements.every(function (element) { return t.isStringLiteral(element); });
    }
    exports.isStringLiteralArray = isStringLiteralArray;
    /**
     * Are all the given `nodes` expressions?
     * @param nodes The nodes to test.
     */
    function isArrayOfExpressions(paths) {
        return paths.every(function (element) { return element.isExpression(); });
    }
    exports.isArrayOfExpressions = isArrayOfExpressions;
    /**
     * Translate the text of the given message, using the given translations.
     *
     * Logs as warning if the translation is not available
     * @publicApi used by CLI
     */
    function translate(diagnostics, translations, messageParts, substitutions, missingTranslation) {
        try {
            return localize_1.ɵtranslate(translations, messageParts, substitutions);
        }
        catch (e) {
            if (localize_1.ɵisMissingTranslationError(e)) {
                diagnostics.add(missingTranslation, e.message);
                // Return the parsed message because this will have the meta blocks stripped
                return [
                    localize_1.ɵmakeTemplateObject(e.parsedMessage.messageParts, e.parsedMessage.messageParts),
                    substitutions
                ];
            }
            else {
                diagnostics.error(e.message);
                return [messageParts, substitutions];
            }
        }
    }
    exports.translate = translate;
    var BabelParseError = /** @class */ (function (_super) {
        tslib_1.__extends(BabelParseError, _super);
        function BabelParseError(node, message) {
            var _this = _super.call(this, message) || this;
            _this.node = node;
            _this.type = 'BabelParseError';
            return _this;
        }
        return BabelParseError;
    }(Error));
    exports.BabelParseError = BabelParseError;
    function isBabelParseError(e) {
        return e.type === 'BabelParseError';
    }
    exports.isBabelParseError = isBabelParseError;
    function buildCodeFrameError(path, e) {
        var filename = path.hub.file.opts.filename || '(unknown file)';
        var message = path.hub.file.buildCodeFrameError(e.node, e.message).message;
        return filename + ": " + message;
    }
    exports.buildCodeFrameError = buildCodeFrameError;
    function getLocation(fs, startPath, endPath) {
        var startLocation = startPath.node.loc;
        var file = getFileFromPath(fs, startPath);
        if (!startLocation || !file) {
            return undefined;
        }
        var endLocation = endPath && getFileFromPath(fs, endPath) === file && endPath.node.loc || startLocation;
        return {
            start: getLineAndColumn(startLocation.start),
            end: getLineAndColumn(endLocation.end),
            file: file,
            text: getText(startPath),
        };
    }
    exports.getLocation = getLocation;
    function serializeLocationPosition(location) {
        var endLineString = location.end !== undefined && location.end.line !== location.start.line ?
            "," + (location.end.line + 1) :
            '';
        return "" + (location.start.line + 1) + endLineString;
    }
    exports.serializeLocationPosition = serializeLocationPosition;
    function getFileFromPath(fs, path) {
        var _a;
        var opts = path === null || path === void 0 ? void 0 : path.hub.file.opts;
        return (opts === null || opts === void 0 ? void 0 : opts.filename) ?
            fs.resolve((_a = opts.generatorOpts.sourceRoot) !== null && _a !== void 0 ? _a : opts.cwd, fs.relative(opts.cwd, opts.filename)) :
            null;
    }
    function getLineAndColumn(loc) {
        // Note we want 0-based line numbers but Babel returns 1-based.
        return { line: loc.line - 1, column: loc.column };
    }
    function getText(path) {
        if (path.node.start === null || path.node.end === null) {
            return undefined;
        }
        return path.hub.file.code.substring(path.node.start, path.node.end);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX2ZpbGVfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3NvdXJjZV9maWxlX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCwyRUFBc0c7SUFDdEcsOENBQW1JO0lBRW5JLGdDQUFrQztJQUlsQzs7Ozs7T0FLRztJQUNILFNBQWdCLFVBQVUsQ0FDdEIsVUFBb0IsRUFBRSxZQUFvQjtRQUM1QyxPQUFPLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBSEQsZ0NBR0M7SUFFRDs7Ozs7T0FLRztJQUNILFNBQWdCLGlCQUFpQixDQUM3QixVQUFvQixFQUFFLElBQVk7UUFDcEMsT0FBTyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO0lBQ3BFLENBQUM7SUFIRCw4Q0FHQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBa0M7UUFDbkUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFGRCxnREFFQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBZ0Isd0JBQXdCLENBQ3BDLFlBQWtDLEVBQUUsYUFBc0M7UUFDNUUsSUFBSSxZQUFZLEdBQWlCLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFN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SUFDWCxDQUFDO0lBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFtQztRQUMzRCwrREFBK0Q7UUFDL0QsT0FBTyxFQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFjO1FBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRTtZQUN0RCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIGdldEZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtWlzTWlzc2luZ1RyYW5zbGF0aW9uRXJyb3IsIMm1bWFrZVRlbXBsYXRlT2JqZWN0LCDJtVBhcnNlZFRyYW5zbGF0aW9uLCDJtVNvdXJjZUxvY2F0aW9uLCDJtXRyYW5zbGF0ZX0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHtOb2RlUGF0aH0gZnJvbSAnQGJhYmVsL3RyYXZlcnNlJztcbmltcG9ydCAqIGFzIHQgZnJvbSAnQGJhYmVsL3R5cGVzJztcblxuaW1wb3J0IHtEaWFnbm9zdGljSGFuZGxpbmdTdHJhdGVneSwgRGlhZ25vc3RpY3N9IGZyb20gJy4vZGlhZ25vc3RpY3MnO1xuXG4vKipcbiAqIElzIHRoZSBnaXZlbiBgZXhwcmVzc2lvbmAgdGhlIGdsb2JhbCBgJGxvY2FsaXplYCBpZGVudGlmaWVyP1xuICpcbiAqIEBwYXJhbSBleHByZXNzaW9uIFRoZSBleHByZXNzaW9uIHRvIGNoZWNrLlxuICogQHBhcmFtIGxvY2FsaXplTmFtZSBUaGUgY29uZmlndXJlZCBuYW1lIG9mIGAkbG9jYWxpemVgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbGl6ZShcbiAgICBleHByZXNzaW9uOiBOb2RlUGF0aCwgbG9jYWxpemVOYW1lOiBzdHJpbmcpOiBleHByZXNzaW9uIGlzIE5vZGVQYXRoPHQuSWRlbnRpZmllcj4ge1xuICByZXR1cm4gaXNOYW1lZElkZW50aWZpZXIoZXhwcmVzc2lvbiwgbG9jYWxpemVOYW1lKSAmJiBpc0dsb2JhbElkZW50aWZpZXIoZXhwcmVzc2lvbik7XG59XG5cbi8qKlxuICogSXMgdGhlIGdpdmVuIGBleHByZXNzaW9uYCBhbiBpZGVudGlmaWVyIHdpdGggdGhlIGNvcnJlY3QgYG5hbWVgP1xuICpcbiAqIEBwYXJhbSBleHByZXNzaW9uIFRoZSBleHByZXNzaW9uIHRvIGNoZWNrLlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGlkZW50aWZpZXIgd2UgYXJlIGxvb2tpbmcgZm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOYW1lZElkZW50aWZpZXIoXG4gICAgZXhwcmVzc2lvbjogTm9kZVBhdGgsIG5hbWU6IHN0cmluZyk6IGV4cHJlc3Npb24gaXMgTm9kZVBhdGg8dC5JZGVudGlmaWVyPiB7XG4gIHJldHVybiBleHByZXNzaW9uLmlzSWRlbnRpZmllcigpICYmIGV4cHJlc3Npb24ubm9kZS5uYW1lID09PSBuYW1lO1xufVxuXG4vKipcbiAqIElzIHRoZSBnaXZlbiBgaWRlbnRpZmllcmAgZGVjbGFyZWQgZ2xvYmFsbHkuXG4gKlxuICogQHBhcmFtIGlkZW50aWZpZXIgVGhlIGlkZW50aWZpZXIgdG8gY2hlY2suXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0dsb2JhbElkZW50aWZpZXIoaWRlbnRpZmllcjogTm9kZVBhdGg8dC5JZGVudGlmaWVyPikge1xuICByZXR1cm4gIWlkZW50aWZpZXIuc2NvcGUgfHwgIWlkZW50aWZpZXIuc2NvcGUuaGFzQmluZGluZyhpZGVudGlmaWVyLm5vZGUubmFtZSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSB0cmFuc2xhdGVkIGV4cHJlc3Npb24gdG8gcmVwbGFjZSB0aGUgY2FsbCB0byBgJGxvY2FsaXplYC5cbiAqIEBwYXJhbSBtZXNzYWdlUGFydHMgVGhlIHN0YXRpYyBwYXJ0cyBvZiB0aGUgbWVzc2FnZS5cbiAqIEBwYXJhbSBzdWJzdGl0dXRpb25zIFRoZSBleHByZXNzaW9ucyB0byBzdWJzdGl0dXRlIGludG8gdGhlIG1lc3NhZ2UuXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExvY2FsaXplUmVwbGFjZW1lbnQoXG4gICAgbWVzc2FnZVBhcnRzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgc3Vic3RpdHV0aW9uczogcmVhZG9ubHkgdC5FeHByZXNzaW9uW10pOiB0LkV4cHJlc3Npb24ge1xuICBsZXQgbWFwcGVkU3RyaW5nOiB0LkV4cHJlc3Npb24gPSB0LnN0cmluZ0xpdGVyYWwobWVzc2FnZVBhcnRzWzBdKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBtZXNzYWdlUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBtYXBwZWRTdHJpbmcgPVxuICAgICAgICB0LmJpbmFyeUV4cHJlc3Npb24oJysnLCBtYXBwZWRTdHJpbmcsIHdyYXBJblBhcmVuc0lmTmVjZXNzYXJ5KHN1YnN0aXR1dGlvbnNbaSAtIDFdKSk7XG4gICAgbWFwcGVkU3RyaW5nID0gdC5iaW5hcnlFeHByZXNzaW9uKCcrJywgbWFwcGVkU3RyaW5nLCB0LnN0cmluZ0xpdGVyYWwobWVzc2FnZVBhcnRzW2ldKSk7XG4gIH1cbiAgcmV0dXJuIG1hcHBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRoZSBtZXNzYWdlIHBhcnRzIGZyb20gdGhlIGdpdmVuIGBjYWxsYCAodG8gYCRsb2NhbGl6ZWApLlxuICpcbiAqIFRoZSBtZXNzYWdlIHBhcnRzIHdpbGwgZWl0aGVyIGJ5IHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgYGNhbGxgIG9yIGl0IHdpbGwgYmUgd3JhcHBlZCBpbiBjYWxsXG4gKiB0byBhIGhlbHBlciBmdW5jdGlvbiBsaWtlIGBfX21ha2VUZW1wbGF0ZU9iamVjdGAuXG4gKlxuICogQHBhcmFtIGNhbGwgVGhlIEFTVCBub2RlIG9mIHRoZSBjYWxsIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0gZnMgVGhlIGZpbGUgc3lzdGVtIHRvIHVzZSB3aGVuIGNvbXB1dGluZyBzb3VyY2UtbWFwIHBhdGhzLiBJZiBub3QgcHJvdmlkZWQgdGhlbiBpdCB1c2VzXG4gKiAgICAgdGhlIFwiY3VycmVudFwiIEZpbGVTeXN0ZW0uXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBNZXNzYWdlUGFydHNGcm9tTG9jYWxpemVDYWxsKFxuICAgIGNhbGw6IE5vZGVQYXRoPHQuQ2FsbEV4cHJlc3Npb24+LFxuICAgIGZzOiBGaWxlU3lzdGVtID0gZ2V0RmlsZVN5c3RlbSgpLFxuICAgICk6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgKMm1U291cmNlTG9jYXRpb24gfCB1bmRlZmluZWQpW11dIHtcbiAgbGV0IGNvb2tlZCA9IGNhbGwuZ2V0KCdhcmd1bWVudHMnKVswXTtcblxuICBpZiAoY29va2VkID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKGNhbGwubm9kZSwgJ2AkbG9jYWxpemVgIGNhbGxlZCB3aXRob3V0IGFueSBhcmd1bWVudHMuJyk7XG4gIH1cbiAgaWYgKCFjb29rZWQuaXNFeHByZXNzaW9uKCkpIHtcbiAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKFxuICAgICAgICBjb29rZWQubm9kZSwgJ1VuZXhwZWN0ZWQgYXJndW1lbnQgdG8gYCRsb2NhbGl6ZWAgKGV4cGVjdGVkIGFuIGFycmF5KS4nKTtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGlzIG5vIGNhbGwgdG8gYF9fbWFrZVRlbXBsYXRlT2JqZWN0KC4uLilgLCB0aGVuIGByYXdgIG11c3QgYmUgdGhlIHNhbWUgYXMgYGNvb2tlZGAuXG4gIGxldCByYXcgPSBjb29rZWQ7XG5cbiAgLy8gQ2hlY2sgZm9yIGNhY2hlZCBjYWxsIG9mIHRoZSBmb3JtIGB4IHx8IHggPSBfX21ha2VUZW1wbGF0ZU9iamVjdCguLi4pYFxuICBpZiAoY29va2VkLmlzTG9naWNhbEV4cHJlc3Npb24oKSAmJiBjb29rZWQubm9kZS5vcGVyYXRvciA9PT0gJ3x8JyAmJlxuICAgICAgY29va2VkLmdldCgnbGVmdCcpLmlzSWRlbnRpZmllcigpKSB7XG4gICAgY29uc3QgcmlnaHQgPSBjb29rZWQuZ2V0KCdyaWdodCcpO1xuICAgIGlmIChyaWdodC5pc0Fzc2lnbm1lbnRFeHByZXNzaW9uKCkpIHtcbiAgICAgIGNvb2tlZCA9IHJpZ2h0LmdldCgncmlnaHQnKTtcbiAgICAgIGlmICghY29va2VkLmlzRXhwcmVzc2lvbigpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoXG4gICAgICAgICAgICBjb29rZWQubm9kZSwgJ1VuZXhwZWN0ZWQgXCJtYWtlVGVtcGxhdGVPYmplY3QoKVwiIGZ1bmN0aW9uIChleHBlY3RlZCBhbiBleHByZXNzaW9uKS4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJpZ2h0LmlzU2VxdWVuY2VFeHByZXNzaW9uKCkpIHtcbiAgICAgIGNvbnN0IGV4cHJlc3Npb25zID0gcmlnaHQuZ2V0KCdleHByZXNzaW9ucycpO1xuICAgICAgaWYgKGV4cHJlc3Npb25zLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIG1pbmlmaWVkIHNlcXVlbmNlIGV4cHJlc3Npb24sIHdoZXJlIHRoZSBmaXJzdCB0d28gZXhwcmVzc2lvbnMgaW4gdGhlIHNlcXVlbmNlXG4gICAgICAgIC8vIGFyZSBhc3NpZ25tZW50cyBvZiB0aGUgY29va2VkIGFuZCByYXcgYXJyYXlzIHJlc3BlY3RpdmVseS5cbiAgICAgICAgY29uc3QgW2ZpcnN0LCBzZWNvbmRdID0gZXhwcmVzc2lvbnM7XG4gICAgICAgIGlmIChmaXJzdC5pc0Fzc2lnbm1lbnRFeHByZXNzaW9uKCkgJiYgc2Vjb25kLmlzQXNzaWdubWVudEV4cHJlc3Npb24oKSkge1xuICAgICAgICAgIGNvb2tlZCA9IGZpcnN0LmdldCgncmlnaHQnKTtcbiAgICAgICAgICBpZiAoIWNvb2tlZC5pc0V4cHJlc3Npb24oKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhYmVsUGFyc2VFcnJvcihcbiAgICAgICAgICAgICAgICBmaXJzdC5ub2RlLCAnVW5leHBlY3RlZCBjb29rZWQgdmFsdWUsIGV4cGVjdGVkIGFuIGV4cHJlc3Npb24uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJhdyA9IHNlY29uZC5nZXQoJ3JpZ2h0Jyk7XG4gICAgICAgICAgaWYgKCFyYXcuaXNFeHByZXNzaW9uKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3Ioc2Vjb25kLm5vZGUsICdVbmV4cGVjdGVkIHJhdyB2YWx1ZSwgZXhwZWN0ZWQgYW4gZXhwcmVzc2lvbi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBmb3IgYF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KWAgb3IgYF9fdGVtcGxhdGVPYmplY3QoKWAgY2FsbHMuXG4gIGlmIChjb29rZWQuaXNDYWxsRXhwcmVzc2lvbigpKSB7XG4gICAgbGV0IGNhbGwgPSBjb29rZWQ7XG4gICAgaWYgKGNhbGwuZ2V0KCdhcmd1bWVudHMnKS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIE5vIGFyZ3VtZW50cyBzbyBwZXJoYXBzIGl0IGlzIGEgYF9fdGVtcGxhdGVPYmplY3QoKWAgY2FsbC5cbiAgICAgIC8vIFVud3JhcCB0aGlzIHRvIGdldCB0aGUgYF90YWdnZWRUZW1wbGF0ZUxpdGVyYWwoY29va2VkLCByYXcpYCBjYWxsLlxuICAgICAgY2FsbCA9IHVud3JhcExhenlMb2FkSGVscGVyQ2FsbChjYWxsKTtcbiAgICB9XG5cbiAgICBjb29rZWQgPSBjYWxsLmdldCgnYXJndW1lbnRzJylbMF07XG4gICAgaWYgKCFjb29rZWQuaXNFeHByZXNzaW9uKCkpIHtcbiAgICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoXG4gICAgICAgICAgY29va2VkLm5vZGUsXG4gICAgICAgICAgJ1VuZXhwZWN0ZWQgYGNvb2tlZGAgYXJndW1lbnQgdG8gdGhlIFwibWFrZVRlbXBsYXRlT2JqZWN0KClcIiBmdW5jdGlvbiAoZXhwZWN0ZWQgYW4gZXhwcmVzc2lvbikuJyk7XG4gICAgfVxuICAgIGNvbnN0IGFyZzIgPSBjYWxsLmdldCgnYXJndW1lbnRzJylbMV07XG4gICAgaWYgKGFyZzIgJiYgIWFyZzIuaXNFeHByZXNzaW9uKCkpIHtcbiAgICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoXG4gICAgICAgICAgYXJnMi5ub2RlLFxuICAgICAgICAgICdVbmV4cGVjdGVkIGByYXdgIGFyZ3VtZW50IHRvIHRoZSBcIm1ha2VUZW1wbGF0ZU9iamVjdCgpXCIgZnVuY3Rpb24gKGV4cGVjdGVkIGFuIGV4cHJlc3Npb24pLicpO1xuICAgIH1cbiAgICAvLyBJZiB0aGVyZSBpcyBubyBzZWNvbmQgYXJndW1lbnQgdGhlbiBhc3N1bWUgdGhhdCByYXcgYW5kIGNvb2tlZCBhcmUgdGhlIHNhbWVcbiAgICByYXcgPSBhcmcyICE9PSB1bmRlZmluZWQgPyBhcmcyIDogY29va2VkO1xuICB9XG5cbiAgY29uc3QgW2Nvb2tlZFN0cmluZ3NdID0gdW53cmFwU3RyaW5nTGl0ZXJhbEFycmF5KGNvb2tlZCwgZnMpO1xuICBjb25zdCBbcmF3U3RyaW5ncywgcmF3TG9jYXRpb25zXSA9IHVud3JhcFN0cmluZ0xpdGVyYWxBcnJheShyYXcsIGZzKTtcbiAgcmV0dXJuIFvJtW1ha2VUZW1wbGF0ZU9iamVjdChjb29rZWRTdHJpbmdzLCByYXdTdHJpbmdzKSwgcmF3TG9jYXRpb25zXTtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgbG9jYWxpemUgY2FsbCBleHByZXNzaW9uIHRvIGV4dHJhY3QgdGhlIGFyZ3VtZW50cyB0aGF0IGhvbGQgdGhlIHN1YnN0aXRpb24gZXhwcmVzc2lvbnMuXG4gKlxuICogQHBhcmFtIGNhbGwgVGhlIEFTVCBub2RlIG9mIHRoZSBjYWxsIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0gZnMgVGhlIGZpbGUgc3lzdGVtIHRvIHVzZSB3aGVuIGNvbXB1dGluZyBzb3VyY2UtbWFwIHBhdGhzLiBJZiBub3QgcHJvdmlkZWQgdGhlbiBpdCB1c2VzXG4gKiAgICAgdGhlIFwiY3VycmVudFwiIEZpbGVTeXN0ZW0uXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBTdWJzdGl0dXRpb25zRnJvbUxvY2FsaXplQ2FsbChcbiAgICBjYWxsOiBOb2RlUGF0aDx0LkNhbGxFeHByZXNzaW9uPixcbiAgICBmczogRmlsZVN5c3RlbSA9IGdldEZpbGVTeXN0ZW0oKSk6IFt0LkV4cHJlc3Npb25bXSwgKMm1U291cmNlTG9jYXRpb24gfCB1bmRlZmluZWQpW11dIHtcbiAgY29uc3QgZXhwcmVzc2lvbnMgPSBjYWxsLmdldCgnYXJndW1lbnRzJykuc3BsaWNlKDEpO1xuICBpZiAoIWlzQXJyYXlPZkV4cHJlc3Npb25zKGV4cHJlc3Npb25zKSkge1xuICAgIGNvbnN0IGJhZEV4cHJlc3Npb24gPSBleHByZXNzaW9ucy5maW5kKGV4cHJlc3Npb24gPT4gIWV4cHJlc3Npb24uaXNFeHByZXNzaW9uKCkpITtcbiAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKFxuICAgICAgICBiYWRFeHByZXNzaW9uLm5vZGUsXG4gICAgICAgICdJbnZhbGlkIHN1YnN0aXR1dGlvbnMgZm9yIGAkbG9jYWxpemVgIChleHBlY3RlZCBhbGwgc3Vic3RpdHV0aW9uIGFyZ3VtZW50cyB0byBiZSBleHByZXNzaW9ucykuJyk7XG4gIH1cbiAgcmV0dXJuIFtcbiAgICBleHByZXNzaW9ucy5tYXAocGF0aCA9PiBwYXRoLm5vZGUpLCBleHByZXNzaW9ucy5tYXAoZXhwcmVzc2lvbiA9PiBnZXRMb2NhdGlvbihmcywgZXhwcmVzc2lvbikpXG4gIF07XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIHRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFsIHRvIGV4dHJhY3QgdGhlIG1lc3NhZ2UgcGFydHMuXG4gKlxuICogQHBhcmFtIGVsZW1lbnRzIFRoZSBlbGVtZW50cyBvZiB0aGUgdGVtcGxhdGUgbGl0ZXJhbCB0byBwcm9jZXNzLlxuICogQHBhcmFtIGZzIFRoZSBmaWxlIHN5c3RlbSB0byB1c2Ugd2hlbiBjb21wdXRpbmcgc291cmNlLW1hcCBwYXRocy4gSWYgbm90IHByb3ZpZGVkIHRoZW4gaXQgdXNlc1xuICogICAgIHRoZSBcImN1cnJlbnRcIiBGaWxlU3lzdGVtLlxuICogQHB1YmxpY0FwaSB1c2VkIGJ5IENMSVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwTWVzc2FnZVBhcnRzRnJvbVRlbXBsYXRlTGl0ZXJhbChcbiAgICBlbGVtZW50czogTm9kZVBhdGg8dC5UZW1wbGF0ZUVsZW1lbnQ+W10sXG4gICAgZnM6IEZpbGVTeXN0ZW0gPSBnZXRGaWxlU3lzdGVtKCkpOiBbVGVtcGxhdGVTdHJpbmdzQXJyYXksICjJtVNvdXJjZUxvY2F0aW9uIHwgdW5kZWZpbmVkKVtdXSB7XG4gIGNvbnN0IGNvb2tlZCA9IGVsZW1lbnRzLm1hcChxID0+IHtcbiAgICBpZiAocS5ub2RlLnZhbHVlLmNvb2tlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKFxuICAgICAgICAgIHEubm9kZSxcbiAgICAgICAgICBgVW5leHBlY3RlZCB1bmRlZmluZWQgbWVzc2FnZSBwYXJ0IGluIFwiJHtlbGVtZW50cy5tYXAocSA9PiBxLm5vZGUudmFsdWUuY29va2VkKX1cImApO1xuICAgIH1cbiAgICByZXR1cm4gcS5ub2RlLnZhbHVlLmNvb2tlZDtcbiAgfSk7XG4gIGNvbnN0IHJhdyA9IGVsZW1lbnRzLm1hcChxID0+IHEubm9kZS52YWx1ZS5yYXcpO1xuICBjb25zdCBsb2NhdGlvbnMgPSBlbGVtZW50cy5tYXAocSA9PiBnZXRMb2NhdGlvbihmcywgcSkpO1xuICByZXR1cm4gW8m1bWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSwgbG9jYXRpb25zXTtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgdGFnZ2VkIHRlbXBsYXRlIGxpdGVyYWwgdG8gZXh0cmFjdCB0aGUgaW50ZXJwb2xhdGlvbiBleHByZXNzaW9ucy5cbiAqXG4gKiBAcGFyYW0gcXVhc2kgVGhlIEFTVCBub2RlIG9mIHRoZSB0ZW1wbGF0ZSBsaXRlcmFsIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0gZnMgVGhlIGZpbGUgc3lzdGVtIHRvIHVzZSB3aGVuIGNvbXB1dGluZyBzb3VyY2UtbWFwIHBhdGhzLiBJZiBub3QgcHJvdmlkZWQgdGhlbiBpdCB1c2VzXG4gKiAgICAgdGhlIFwiY3VycmVudFwiIEZpbGVTeXN0ZW0uXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBFeHByZXNzaW9uc0Zyb21UZW1wbGF0ZUxpdGVyYWwoXG4gICAgcXVhc2k6IE5vZGVQYXRoPHQuVGVtcGxhdGVMaXRlcmFsPixcbiAgICBmczogRmlsZVN5c3RlbSA9IGdldEZpbGVTeXN0ZW0oKSk6IFt0LkV4cHJlc3Npb25bXSwgKMm1U291cmNlTG9jYXRpb24gfCB1bmRlZmluZWQpW11dIHtcbiAgcmV0dXJuIFtxdWFzaS5ub2RlLmV4cHJlc3Npb25zLCBxdWFzaS5nZXQoJ2V4cHJlc3Npb25zJykubWFwKGUgPT4gZ2V0TG9jYXRpb24oZnMsIGUpKV07XG59XG5cbi8qKlxuICogV3JhcCB0aGUgZ2l2ZW4gYGV4cHJlc3Npb25gIGluIHBhcmVudGhlc2VzIGlmIGl0IGlzIGEgYmluYXJ5IGV4cHJlc3Npb24uXG4gKlxuICogVGhpcyBlbnN1cmVzIHRoYXQgdGhpcyBleHByZXNzaW9uIGlzIGV2YWx1YXRlZCBjb3JyZWN0bHkgaWYgaXQgaXMgZW1iZWRkZWQgaW4gYW5vdGhlciBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSBleHByZXNzaW9uIFRoZSBleHByZXNzaW9uIHRvIHBvdGVudGlhbGx5IHdyYXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwSW5QYXJlbnNJZk5lY2Vzc2FyeShleHByZXNzaW9uOiB0LkV4cHJlc3Npb24pOiB0LkV4cHJlc3Npb24ge1xuICBpZiAodC5pc0JpbmFyeUV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICByZXR1cm4gdC5wYXJlbnRoZXNpemVkRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgfVxufVxuXG4vKipcbiAqIEV4dHJhY3QgdGhlIHN0cmluZyB2YWx1ZXMgZnJvbSBhbiBgYXJyYXlgIG9mIHN0cmluZyBsaXRlcmFscy5cbiAqXG4gKiBAcGFyYW0gYXJyYXkgVGhlIGFycmF5IHRvIHVud3JhcC5cbiAqIEBwYXJhbSBmcyBUaGUgZmlsZSBzeXN0ZW0gdG8gdXNlIHdoZW4gY29tcHV0aW5nIHNvdXJjZS1tYXAgcGF0aHMuIElmIG5vdCBwcm92aWRlZCB0aGVuIGl0IHVzZXNcbiAqICAgICB0aGUgXCJjdXJyZW50XCIgRmlsZVN5c3RlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcFN0cmluZ0xpdGVyYWxBcnJheShcbiAgICBhcnJheTogTm9kZVBhdGg8dC5FeHByZXNzaW9uPixcbiAgICBmczogRmlsZVN5c3RlbSA9IGdldEZpbGVTeXN0ZW0oKSk6IFtzdHJpbmdbXSwgKMm1U291cmNlTG9jYXRpb24gfCB1bmRlZmluZWQpW11dIHtcbiAgaWYgKCFpc1N0cmluZ0xpdGVyYWxBcnJheShhcnJheS5ub2RlKSkge1xuICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoXG4gICAgICAgIGFycmF5Lm5vZGUsICdVbmV4cGVjdGVkIG1lc3NhZ2VQYXJ0cyBmb3IgYCRsb2NhbGl6ZWAgKGV4cGVjdGVkIGFuIGFycmF5IG9mIHN0cmluZ3MpLicpO1xuICB9XG4gIGNvbnN0IGVsZW1lbnRzID0gYXJyYXkuZ2V0KCdlbGVtZW50cycpIGFzIE5vZGVQYXRoPHQuU3RyaW5nTGl0ZXJhbD5bXTtcbiAgcmV0dXJuIFtlbGVtZW50cy5tYXAoc3RyID0+IHN0ci5ub2RlLnZhbHVlKSwgZWxlbWVudHMubWFwKHN0ciA9PiBnZXRMb2NhdGlvbihmcywgc3RyKSldO1xufVxuXG4vKipcbiAqIFRoaXMgZXhwcmVzc2lvbiBpcyBiZWxpZXZlZCB0byBiZSBhIGNhbGwgdG8gYSBcImxhenktbG9hZFwiIHRlbXBsYXRlIG9iamVjdCBoZWxwZXIgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOlxuICpcbiAqIGBgYHRzXG4gKiAgZnVuY3Rpb24gX3RlbXBsYXRlT2JqZWN0KCkge1xuICogICAgdmFyIGUgPSBfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsKFsnY29va2VkIHN0cmluZycsICdyYXcgc3RyaW5nJ10pO1xuICogICAgcmV0dXJuIF90ZW1wbGF0ZU9iamVjdCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZSB9LCBlXG4gKiAgfVxuICogYGBgXG4gKlxuICogV2UgdW53cmFwIHRoaXMgdG8gcmV0dXJuIHRoZSBjYWxsIHRvIGBfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsKClgLlxuICpcbiAqIEBwYXJhbSBjYWxsIHRoZSBjYWxsIGV4cHJlc3Npb24gdG8gdW53cmFwXG4gKiBAcmV0dXJucyB0aGUgIGNhbGwgZXhwcmVzc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwTGF6eUxvYWRIZWxwZXJDYWxsKGNhbGw6IE5vZGVQYXRoPHQuQ2FsbEV4cHJlc3Npb24+KTpcbiAgICBOb2RlUGF0aDx0LkNhbGxFeHByZXNzaW9uPiB7XG4gIGNvbnN0IGNhbGxlZSA9IGNhbGwuZ2V0KCdjYWxsZWUnKTtcbiAgaWYgKCFjYWxsZWUuaXNJZGVudGlmaWVyKCkpIHtcbiAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKFxuICAgICAgICBjYWxsZWUubm9kZSxcbiAgICAgICAgJ1VuZXhwZWN0ZWQgbGF6eS1sb2FkIGhlbHBlciBjYWxsIChleHBlY3RlZCBhIGNhbGwgb2YgdGhlIGZvcm0gYF90ZW1wbGF0ZU9iamVjdCgpYCkuJyk7XG4gIH1cbiAgY29uc3QgbGF6eUxvYWRCaW5kaW5nID0gY2FsbC5zY29wZS5nZXRCaW5kaW5nKGNhbGxlZS5ub2RlLm5hbWUpO1xuICBpZiAoIWxhenlMb2FkQmluZGluZykge1xuICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoY2FsbGVlLm5vZGUsICdNaXNzaW5nIGRlY2xhcmF0aW9uIGZvciBsYXp5LWxvYWQgaGVscGVyIGZ1bmN0aW9uJyk7XG4gIH1cbiAgY29uc3QgbGF6eUxvYWRGbiA9IGxhenlMb2FkQmluZGluZy5wYXRoO1xuICBpZiAoIWxhenlMb2FkRm4uaXNGdW5jdGlvbkRlY2xhcmF0aW9uKCkpIHtcbiAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKFxuICAgICAgICBsYXp5TG9hZEZuLm5vZGUsICdVbmV4cGVjdGVkIGV4cHJlc3Npb24gKGV4cGVjdGVkIGEgZnVuY3Rpb24gZGVjbGFyYXRpb24nKTtcbiAgfVxuICBjb25zdCByZXR1cm5lZE5vZGUgPSBnZXRSZXR1cm5lZEV4cHJlc3Npb24obGF6eUxvYWRGbik7XG5cbiAgaWYgKHJldHVybmVkTm9kZS5pc0NhbGxFeHByZXNzaW9uKCkpIHtcbiAgICByZXR1cm4gcmV0dXJuZWROb2RlO1xuICB9XG5cbiAgaWYgKHJldHVybmVkTm9kZS5pc0lkZW50aWZpZXIoKSkge1xuICAgIGNvbnN0IGlkZW50aWZpZXJOYW1lID0gcmV0dXJuZWROb2RlLm5vZGUubmFtZTtcbiAgICBjb25zdCBkZWNsYXJhdGlvbiA9IHJldHVybmVkTm9kZS5zY29wZS5nZXRCaW5kaW5nKGlkZW50aWZpZXJOYW1lKTtcbiAgICBpZiAoZGVjbGFyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEJhYmVsUGFyc2VFcnJvcihcbiAgICAgICAgICByZXR1cm5lZE5vZGUubm9kZSwgJ01pc3NpbmcgZGVjbGFyYXRpb24gZm9yIHJldHVybiB2YWx1ZSBmcm9tIGhlbHBlci4nKTtcbiAgICB9XG4gICAgaWYgKCFkZWNsYXJhdGlvbi5wYXRoLmlzVmFyaWFibGVEZWNsYXJhdG9yKCkpIHtcbiAgICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoXG4gICAgICAgICAgZGVjbGFyYXRpb24ucGF0aC5ub2RlLFxuICAgICAgICAgICdVbmV4cGVjdGVkIGhlbHBlciByZXR1cm4gdmFsdWUgZGVjbGFyYXRpb24gKGV4cGVjdGVkIGEgdmFyaWFibGUgZGVjbGFyYXRpb24pLicpO1xuICAgIH1cbiAgICBjb25zdCBpbml0aWFsaXplciA9IGRlY2xhcmF0aW9uLnBhdGguZ2V0KCdpbml0Jyk7XG4gICAgaWYgKCFpbml0aWFsaXplci5pc0NhbGxFeHByZXNzaW9uKCkpIHtcbiAgICAgIHRocm93IG5ldyBCYWJlbFBhcnNlRXJyb3IoXG4gICAgICAgICAgZGVjbGFyYXRpb24ucGF0aC5ub2RlLFxuICAgICAgICAgICdVbmV4cGVjdGVkIHJldHVybiB2YWx1ZSBmcm9tIGhlbHBlciAoZXhwZWN0ZWQgYSBjYWxsIGV4cHJlc3Npb24pLicpO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgbGF6eSBsb2FkIGhlbHBlciBpZiB0aGlzIGlzIHRoZSBvbmx5IHJlZmVyZW5jZSB0byBpdC5cbiAgICBpZiAobGF6eUxvYWRCaW5kaW5nLnJlZmVyZW5jZXMgPT09IDEpIHtcbiAgICAgIGxhenlMb2FkRm4ucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluaXRpYWxpemVyO1xuICB9XG4gIHJldHVybiBjYWxsO1xufVxuXG5mdW5jdGlvbiBnZXRSZXR1cm5lZEV4cHJlc3Npb24oZm46IE5vZGVQYXRoPHQuRnVuY3Rpb25EZWNsYXJhdGlvbj4pOiBOb2RlUGF0aDx0LkV4cHJlc3Npb24+IHtcbiAgY29uc3QgYm9keVN0YXRlbWVudHMgPSBmbi5nZXQoJ2JvZHknKS5nZXQoJ2JvZHknKTtcbiAgZm9yIChjb25zdCBzdGF0ZW1lbnQgb2YgYm9keVN0YXRlbWVudHMpIHtcbiAgICBpZiAoc3RhdGVtZW50LmlzUmV0dXJuU3RhdGVtZW50KCkpIHtcbiAgICAgIGNvbnN0IGFyZ3VtZW50ID0gc3RhdGVtZW50LmdldCgnYXJndW1lbnQnKTtcbiAgICAgIGlmIChhcmd1bWVudC5pc1NlcXVlbmNlRXhwcmVzc2lvbigpKSB7XG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb25zID0gYXJndW1lbnQuZ2V0KCdleHByZXNzaW9ucycpO1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShleHByZXNzaW9ucykgPyBleHByZXNzaW9uc1tleHByZXNzaW9ucy5sZW5ndGggLSAxXSA6IGV4cHJlc3Npb25zO1xuICAgICAgfSBlbHNlIGlmIChhcmd1bWVudC5pc0V4cHJlc3Npb24oKSkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKFxuICAgICAgICAgICAgc3RhdGVtZW50Lm5vZGUsICdJbnZhbGlkIHJldHVybiBhcmd1bWVudCBpbiBoZWxwZXIgZnVuY3Rpb24gKGV4cGVjdGVkIGFuIGV4cHJlc3Npb24pLicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgQmFiZWxQYXJzZUVycm9yKGZuLm5vZGUsICdNaXNzaW5nIHJldHVybiBzdGF0ZW1lbnQgaW4gaGVscGVyIGZ1bmN0aW9uLicpO1xufVxuXG4vKipcbiAqIElzIHRoZSBnaXZlbiBgbm9kZWAgYW4gYXJyYXkgb2YgbGl0ZXJhbCBzdHJpbmdzP1xuICpcbiAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIHRlc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0xpdGVyYWxBcnJheShub2RlOiB0Lk5vZGUpOiBub2RlIGlzIHQuRXhwcmVzc2lvbiZcbiAgICB7ZWxlbWVudHM6IHQuU3RyaW5nTGl0ZXJhbFtdfSB7XG4gIHJldHVybiB0LmlzQXJyYXlFeHByZXNzaW9uKG5vZGUpICYmIG5vZGUuZWxlbWVudHMuZXZlcnkoZWxlbWVudCA9PiB0LmlzU3RyaW5nTGl0ZXJhbChlbGVtZW50KSk7XG59XG5cbi8qKlxuICogQXJlIGFsbCB0aGUgZ2l2ZW4gYG5vZGVzYCBleHByZXNzaW9ucz9cbiAqIEBwYXJhbSBub2RlcyBUaGUgbm9kZXMgdG8gdGVzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXlPZkV4cHJlc3Npb25zKHBhdGhzOiBOb2RlUGF0aDx0Lk5vZGU+W10pOiBwYXRocyBpcyBOb2RlUGF0aDx0LkV4cHJlc3Npb24+W10ge1xuICByZXR1cm4gcGF0aHMuZXZlcnkoZWxlbWVudCA9PiBlbGVtZW50LmlzRXhwcmVzc2lvbigpKTtcbn1cblxuLyoqIE9wdGlvbnMgdGhhdCBhZmZlY3QgaG93IHRoZSBgbWFrZUVzWFhYVHJhbnNsYXRlUGx1Z2luKClgIGZ1bmN0aW9ucyB3b3JrLiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGVQbHVnaW5PcHRpb25zIHtcbiAgbWlzc2luZ1RyYW5zbGF0aW9uPzogRGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3k7XG4gIGxvY2FsaXplTmFtZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGUgdGhlIHRleHQgb2YgdGhlIGdpdmVuIG1lc3NhZ2UsIHVzaW5nIHRoZSBnaXZlbiB0cmFuc2xhdGlvbnMuXG4gKlxuICogTG9ncyBhcyB3YXJuaW5nIGlmIHRoZSB0cmFuc2xhdGlvbiBpcyBub3QgYXZhaWxhYmxlXG4gKiBAcHVibGljQXBpIHVzZWQgYnkgQ0xJXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoXG4gICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCB0cmFuc2xhdGlvbnM6IFJlY29yZDxzdHJpbmcsIMm1UGFyc2VkVHJhbnNsYXRpb24+LFxuICAgIG1lc3NhZ2VQYXJ0czogVGVtcGxhdGVTdHJpbmdzQXJyYXksIHN1YnN0aXR1dGlvbnM6IHJlYWRvbmx5IGFueVtdLFxuICAgIG1pc3NpbmdUcmFuc2xhdGlvbjogRGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3kpOiBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIHJlYWRvbmx5IGFueVtdXSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIMm1dHJhbnNsYXRlKHRyYW5zbGF0aW9ucywgbWVzc2FnZVBhcnRzLCBzdWJzdGl0dXRpb25zKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmICjJtWlzTWlzc2luZ1RyYW5zbGF0aW9uRXJyb3IoZSkpIHtcbiAgICAgIGRpYWdub3N0aWNzLmFkZChtaXNzaW5nVHJhbnNsYXRpb24sIGUubWVzc2FnZSk7XG4gICAgICAvLyBSZXR1cm4gdGhlIHBhcnNlZCBtZXNzYWdlIGJlY2F1c2UgdGhpcyB3aWxsIGhhdmUgdGhlIG1ldGEgYmxvY2tzIHN0cmlwcGVkXG4gICAgICByZXR1cm4gW1xuICAgICAgICDJtW1ha2VUZW1wbGF0ZU9iamVjdChlLnBhcnNlZE1lc3NhZ2UubWVzc2FnZVBhcnRzLCBlLnBhcnNlZE1lc3NhZ2UubWVzc2FnZVBhcnRzKSxcbiAgICAgICAgc3Vic3RpdHV0aW9uc1xuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlhZ25vc3RpY3MuZXJyb3IoZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBbbWVzc2FnZVBhcnRzLCBzdWJzdGl0dXRpb25zXTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhYmVsUGFyc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSB0eXBlID0gJ0JhYmVsUGFyc2VFcnJvcic7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlOiB0Lk5vZGUsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhYmVsUGFyc2VFcnJvcihlOiBhbnkpOiBlIGlzIEJhYmVsUGFyc2VFcnJvciB7XG4gIHJldHVybiBlLnR5cGUgPT09ICdCYWJlbFBhcnNlRXJyb3InO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDb2RlRnJhbWVFcnJvcihwYXRoOiBOb2RlUGF0aCwgZTogQmFiZWxQYXJzZUVycm9yKTogc3RyaW5nIHtcbiAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmh1Yi5maWxlLm9wdHMuZmlsZW5hbWUgfHwgJyh1bmtub3duIGZpbGUpJztcbiAgY29uc3QgbWVzc2FnZSA9IHBhdGguaHViLmZpbGUuYnVpbGRDb2RlRnJhbWVFcnJvcihlLm5vZGUsIGUubWVzc2FnZSkubWVzc2FnZTtcbiAgcmV0dXJuIGAke2ZpbGVuYW1lfTogJHttZXNzYWdlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbihcbiAgICBmczogRmlsZVN5c3RlbSwgc3RhcnRQYXRoOiBOb2RlUGF0aCwgZW5kUGF0aD86IE5vZGVQYXRoKTogybVTb3VyY2VMb2NhdGlvbnx1bmRlZmluZWQge1xuICBjb25zdCBzdGFydExvY2F0aW9uID0gc3RhcnRQYXRoLm5vZGUubG9jO1xuICBjb25zdCBmaWxlID0gZ2V0RmlsZUZyb21QYXRoKGZzLCBzdGFydFBhdGgpO1xuICBpZiAoIXN0YXJ0TG9jYXRpb24gfHwgIWZpbGUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgZW5kTG9jYXRpb24gPVxuICAgICAgZW5kUGF0aCAmJiBnZXRGaWxlRnJvbVBhdGgoZnMsIGVuZFBhdGgpID09PSBmaWxlICYmIGVuZFBhdGgubm9kZS5sb2MgfHwgc3RhcnRMb2NhdGlvbjtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBnZXRMaW5lQW5kQ29sdW1uKHN0YXJ0TG9jYXRpb24uc3RhcnQpLFxuICAgIGVuZDogZ2V0TGluZUFuZENvbHVtbihlbmRMb2NhdGlvbi5lbmQpLFxuICAgIGZpbGUsXG4gICAgdGV4dDogZ2V0VGV4dChzdGFydFBhdGgpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplTG9jYXRpb25Qb3NpdGlvbihsb2NhdGlvbjogybVTb3VyY2VMb2NhdGlvbik6IHN0cmluZyB7XG4gIGNvbnN0IGVuZExpbmVTdHJpbmcgPSBsb2NhdGlvbi5lbmQgIT09IHVuZGVmaW5lZCAmJiBsb2NhdGlvbi5lbmQubGluZSAhPT0gbG9jYXRpb24uc3RhcnQubGluZSA/XG4gICAgICBgLCR7bG9jYXRpb24uZW5kLmxpbmUgKyAxfWAgOlxuICAgICAgJyc7XG4gIHJldHVybiBgJHtsb2NhdGlvbi5zdGFydC5saW5lICsgMX0ke2VuZExpbmVTdHJpbmd9YDtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZUZyb21QYXRoKGZzOiBGaWxlU3lzdGVtLCBwYXRoOiBOb2RlUGF0aHx1bmRlZmluZWQpOiBBYnNvbHV0ZUZzUGF0aHxudWxsIHtcbiAgY29uc3Qgb3B0cyA9IHBhdGg/Lmh1Yi5maWxlLm9wdHM7XG4gIHJldHVybiBvcHRzPy5maWxlbmFtZSA/XG4gICAgICBmcy5yZXNvbHZlKG9wdHMuZ2VuZXJhdG9yT3B0cy5zb3VyY2VSb290ID8/IG9wdHMuY3dkLCBmcy5yZWxhdGl2ZShvcHRzLmN3ZCwgb3B0cy5maWxlbmFtZSkpIDpcbiAgICAgIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldExpbmVBbmRDb2x1bW4obG9jOiB7bGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcn0pOiB7bGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcn0ge1xuICAvLyBOb3RlIHdlIHdhbnQgMC1iYXNlZCBsaW5lIG51bWJlcnMgYnV0IEJhYmVsIHJldHVybnMgMS1iYXNlZC5cbiAgcmV0dXJuIHtsaW5lOiBsb2MubGluZSAtIDEsIGNvbHVtbjogbG9jLmNvbHVtbn07XG59XG5cbmZ1bmN0aW9uIGdldFRleHQocGF0aDogTm9kZVBhdGgpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgaWYgKHBhdGgubm9kZS5zdGFydCA9PT0gbnVsbCB8fCBwYXRoLm5vZGUuZW5kID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gcGF0aC5odWIuZmlsZS5jb2RlLnN1YnN0cmluZyhwYXRoLm5vZGUuc3RhcnQsIHBhdGgubm9kZS5lbmQpO1xufVxuIl19