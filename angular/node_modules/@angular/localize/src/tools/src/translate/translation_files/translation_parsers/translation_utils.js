(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils", ["require", "exports", "tslib", "@angular/compiler", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addErrorsToBundle = exports.addParseError = exports.addParseDiagnostic = exports.isNamedElement = exports.canParseXml = exports.parseInnerRange = exports.getAttribute = exports.getAttrOrThrow = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    var translation_parse_error_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error");
    function getAttrOrThrow(element, attrName) {
        var attrValue = getAttribute(element, attrName);
        if (attrValue === undefined) {
            throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, "Missing required \"" + attrName + "\" attribute:");
        }
        return attrValue;
    }
    exports.getAttrOrThrow = getAttrOrThrow;
    function getAttribute(element, attrName) {
        var attr = element.attrs.find(function (a) { return a.name === attrName; });
        return attr !== undefined ? attr.value : undefined;
    }
    exports.getAttribute = getAttribute;
    /**
     * Parse the "contents" of an XML element.
     *
     * This would be equivalent to parsing the `innerHTML` string of an HTML document.
     *
     * @param element The element whose inner range we want to parse.
     * @returns a collection of XML `Node` objects and any errors that were parsed from the element's
     *     contents.
     */
    function parseInnerRange(element) {
        var xmlParser = new compiler_1.XmlParser();
        var xml = xmlParser.parse(element.sourceSpan.start.file.content, element.sourceSpan.start.file.url, { tokenizeExpansionForms: true, range: getInnerRange(element) });
        return xml;
    }
    exports.parseInnerRange = parseInnerRange;
    /**
     * Compute a `LexerRange` that contains all the children of the given `element`.
     * @param element The element whose inner range we want to compute.
     */
    function getInnerRange(element) {
        var start = element.startSourceSpan.end;
        var end = element.endSourceSpan.start;
        return {
            startPos: start.offset,
            startLine: start.line,
            startCol: start.col,
            endPos: end.offset,
        };
    }
    /**
     * Can this XML be parsed for translations, given the expected `rootNodeName` and expected root node
     * `attributes` that should appear in the file.
     *
     * @param filePath The path to the file being checked.
     * @param contents The contents of the file being checked.
     * @param rootNodeName The expected name of an XML root node that should exist.
     * @param attributes The attributes (and their values) that should appear on the root node.
     * @returns The `XmlTranslationParserHint` object for use by `TranslationParser.parse()` if the XML
     * document has the expected format.
     */
    function canParseXml(filePath, contents, rootNodeName, attributes) {
        var e_1, _a;
        var diagnostics = new diagnostics_1.Diagnostics();
        var xmlParser = new compiler_1.XmlParser();
        var xml = xmlParser.parse(contents, filePath);
        if (xml.rootNodes.length === 0 ||
            xml.errors.some(function (error) { return error.level === compiler_1.ParseErrorLevel.ERROR; })) {
            xml.errors.forEach(function (e) { return addParseError(diagnostics, e); });
            return { canParse: false, diagnostics: diagnostics };
        }
        var rootElements = xml.rootNodes.filter(isNamedElement(rootNodeName));
        var rootElement = rootElements[0];
        if (rootElement === undefined) {
            diagnostics.warn("The XML file does not contain a <" + rootNodeName + "> root node.");
            return { canParse: false, diagnostics: diagnostics };
        }
        var _loop_1 = function (attrKey) {
            var attr = rootElement.attrs.find(function (attr) { return attr.name === attrKey; });
            if (attr === undefined || attr.value !== attributes[attrKey]) {
                addParseDiagnostic(diagnostics, rootElement.sourceSpan, "The <" + rootNodeName + "> node does not have the required attribute: " + attrKey + "=\"" + attributes[attrKey] + "\".", compiler_1.ParseErrorLevel.WARNING);
                return { value: { canParse: false, diagnostics: diagnostics } };
            }
        };
        try {
            for (var _b = tslib_1.__values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attrKey = _c.value;
                var state_1 = _loop_1(attrKey);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (rootElements.length > 1) {
            xml.errors.push(new compiler_1.ParseError(xml.rootNodes[1].sourceSpan, 'Unexpected root node. XLIFF 1.2 files should only have a single <xliff> root node.', compiler_1.ParseErrorLevel.WARNING));
        }
        return { canParse: true, diagnostics: diagnostics, hint: { element: rootElement, errors: xml.errors } };
    }
    exports.canParseXml = canParseXml;
    /**
     * Create a predicate, which can be used by things like `Array.filter()`, that will match a named
     * XML Element from a collection of XML Nodes.
     *
     * @param name The expected name of the element to match.
     */
    function isNamedElement(name) {
        function predicate(node) {
            return node instanceof compiler_1.Element && node.name === name;
        }
        return predicate;
    }
    exports.isNamedElement = isNamedElement;
    /**
     * Add an XML parser related message to the given `diagnostics` object.
     */
    function addParseDiagnostic(diagnostics, sourceSpan, message, level) {
        addParseError(diagnostics, new compiler_1.ParseError(sourceSpan, message, level));
    }
    exports.addParseDiagnostic = addParseDiagnostic;
    /**
     * Copy the formatted error message from the given `parseError` object into the given `diagnostics`
     * object.
     */
    function addParseError(diagnostics, parseError) {
        if (parseError.level === compiler_1.ParseErrorLevel.ERROR) {
            diagnostics.error(parseError.toString());
        }
        else {
            diagnostics.warn(parseError.toString());
        }
    }
    exports.addParseError = addParseError;
    /**
     * Add the provided `errors` to the `bundle` diagnostics.
     */
    function addErrorsToBundle(bundle, errors) {
        var e_2, _a;
        try {
            for (var errors_1 = tslib_1.__values(errors), errors_1_1 = errors_1.next(); !errors_1_1.done; errors_1_1 = errors_1.next()) {
                var error = errors_1_1.value;
                addParseError(bundle.diagnostics, error);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (errors_1_1 && !errors_1_1.done && (_a = errors_1.return)) _a.call(errors_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    exports.addErrorsToBundle = addErrorsToBundle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9wYXJzZXJzL3RyYW5zbGF0aW9uX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBc0k7SUFFdEksMkVBQWlEO0lBRWpELG1KQUFnRTtJQUdoRSxTQUFnQixjQUFjLENBQUMsT0FBZ0IsRUFBRSxRQUFnQjtRQUMvRCxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMzQixNQUFNLElBQUksK0NBQXFCLENBQzNCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsd0JBQXFCLFFBQVEsa0JBQWMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQVBELHdDQU9DO0lBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQWdCLEVBQUUsUUFBZ0I7UUFDN0QsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3JELENBQUM7SUFIRCxvQ0FHQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsU0FBZ0IsZUFBZSxDQUFDLE9BQWdCO1FBQzlDLElBQU0sU0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO1FBQ2xDLElB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VyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFORCxzQ0FNQztJQUVEOztPQUVHO0lBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsTUFBK0IsRUFBRSxNQUFvQjs7O1lBQ3JGLEtBQW9CLElBQUEsV0FBQSxpQkFBQSxNQUFNLENBQUEsOEJBQUEsa0RBQUU7Z0JBQXZCLElBQU0sS0FBSyxtQkFBQTtnQkFDZCxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMxQzs7Ozs7Ozs7O0lBQ0gsQ0FBQztJQUpELDhDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0VsZW1lbnQsIExleGVyUmFuZ2UsIE5vZGUsIFBhcnNlRXJyb3IsIFBhcnNlRXJyb3JMZXZlbCwgUGFyc2VTb3VyY2VTcGFuLCBQYXJzZVRyZWVSZXN1bHQsIFhtbFBhcnNlcn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi8uLi9kaWFnbm9zdGljcyc7XG5cbmltcG9ydCB7VHJhbnNsYXRpb25QYXJzZUVycm9yfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlX2Vycm9yJztcbmltcG9ydCB7UGFyc2VBbmFseXNpcywgUGFyc2VkVHJhbnNsYXRpb25CdW5kbGV9IGZyb20gJy4vdHJhbnNsYXRpb25fcGFyc2VyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHJPclRocm93KGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBhdHRyVmFsdWUgPSBnZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0ck5hbWUpO1xuICBpZiAoYXR0clZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgVHJhbnNsYXRpb25QYXJzZUVycm9yKFxuICAgICAgICBlbGVtZW50LnNvdXJjZVNwYW4sIGBNaXNzaW5nIHJlcXVpcmVkIFwiJHthdHRyTmFtZX1cIiBhdHRyaWJ1dGU6YCk7XG4gIH1cbiAgcmV0dXJuIGF0dHJWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBhdHRyTmFtZTogc3RyaW5nKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gIGNvbnN0IGF0dHIgPSBlbGVtZW50LmF0dHJzLmZpbmQoYSA9PiBhLm5hbWUgPT09IGF0dHJOYW1lKTtcbiAgcmV0dXJuIGF0dHIgIT09IHVuZGVmaW5lZCA/IGF0dHIudmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIFwiY29udGVudHNcIiBvZiBhbiBYTUwgZWxlbWVudC5cbiAqXG4gKiBUaGlzIHdvdWxkIGJlIGVxdWl2YWxlbnQgdG8gcGFyc2luZyB0aGUgYGlubmVySFRNTGAgc3RyaW5nIG9mIGFuIEhUTUwgZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgd2hvc2UgaW5uZXIgcmFuZ2Ugd2Ugd2FudCB0byBwYXJzZS5cbiAqIEByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiBYTUwgYE5vZGVgIG9iamVjdHMgYW5kIGFueSBlcnJvcnMgdGhhdCB3ZXJlIHBhcnNlZCBmcm9tIHRoZSBlbGVtZW50J3NcbiAqICAgICBjb250ZW50cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW5uZXJSYW5nZShlbGVtZW50OiBFbGVtZW50KTogUGFyc2VUcmVlUmVzdWx0IHtcbiAgY29uc3QgeG1sUGFyc2VyID0gbmV3IFhtbFBhcnNlcigpO1xuICBjb25zdCB4bWwgPSB4bWxQYXJzZXIucGFyc2UoXG4gICAgICBlbGVtZW50LnNvdXJjZVNwYW4uc3RhcnQuZmlsZS5jb250ZW50LCBlbGVtZW50LnNvdXJjZVNwYW4uc3RhcnQuZmlsZS51cmwsXG4gICAgICB7dG9rZW5pemVFeHBhbnNpb25Gb3JtczogdHJ1ZSwgcmFuZ2U6IGdldElubmVyUmFuZ2UoZWxlbWVudCl9KTtcbiAgcmV0dXJuIHhtbDtcbn1cblxuLyoqXG4gKiBDb21wdXRlIGEgYExleGVyUmFuZ2VgIHRoYXQgY29udGFpbnMgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgZ2l2ZW4gYGVsZW1lbnRgLlxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgd2hvc2UgaW5uZXIgcmFuZ2Ugd2Ugd2FudCB0byBjb21wdXRlLlxuICovXG5mdW5jdGlvbiBnZXRJbm5lclJhbmdlKGVsZW1lbnQ6IEVsZW1lbnQpOiBMZXhlclJhbmdlIHtcbiAgY29uc3Qgc3RhcnQgPSBlbGVtZW50LnN0YXJ0U291cmNlU3BhbiEuZW5kO1xuICBjb25zdCBlbmQgPSBlbGVtZW50LmVuZFNvdXJjZVNwYW4hLnN0YXJ0O1xuICByZXR1cm4ge1xuICAgIHN0YXJ0UG9zOiBzdGFydC5vZmZzZXQsXG4gICAgc3RhcnRMaW5lOiBzdGFydC5saW5lLFxuICAgIHN0YXJ0Q29sOiBzdGFydC5jb2wsXG4gICAgZW5kUG9zOiBlbmQub2Zmc2V0LFxuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgXCJoaW50XCIgb2JqZWN0IGlzIHVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiBmcm9tIGBjYW5QYXJzZSgpYCB0byBgcGFyc2UoKWAgZm9yXG4gKiBgVHJhbnNsYXRpb25QYXJzZXJgcyB0aGF0IGV4cGVjdCBYTUwgY29udGVudHMuXG4gKlxuICogVGhpcyBzYXZlcyB0aGUgYHBhcnNlKClgIG1ldGhvZCBmcm9tIGhhdmluZyB0byByZS1wYXJzZSB0aGUgWE1MLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFhtbFRyYW5zbGF0aW9uUGFyc2VySGludCB7XG4gIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gIGVycm9yczogUGFyc2VFcnJvcltdO1xufVxuXG4vKipcbiAqIENhbiB0aGlzIFhNTCBiZSBwYXJzZWQgZm9yIHRyYW5zbGF0aW9ucywgZ2l2ZW4gdGhlIGV4cGVjdGVkIGByb290Tm9kZU5hbWVgIGFuZCBleHBlY3RlZCByb290IG5vZGVcbiAqIGBhdHRyaWJ1dGVzYCB0aGF0IHNob3VsZCBhcHBlYXIgaW4gdGhlIGZpbGUuXG4gKlxuICogQHBhcmFtIGZpbGVQYXRoIFRoZSBwYXRoIHRvIHRoZSBmaWxlIGJlaW5nIGNoZWNrZWQuXG4gKiBAcGFyYW0gY29udGVudHMgVGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIGJlaW5nIGNoZWNrZWQuXG4gKiBAcGFyYW0gcm9vdE5vZGVOYW1lIFRoZSBleHBlY3RlZCBuYW1lIG9mIGFuIFhNTCByb290IG5vZGUgdGhhdCBzaG91bGQgZXhpc3QuXG4gKiBAcGFyYW0gYXR0cmlidXRlcyBUaGUgYXR0cmlidXRlcyAoYW5kIHRoZWlyIHZhbHVlcykgdGhhdCBzaG91bGQgYXBwZWFyIG9uIHRoZSByb290IG5vZGUuXG4gKiBAcmV0dXJucyBUaGUgYFhtbFRyYW5zbGF0aW9uUGFyc2VySGludGAgb2JqZWN0IGZvciB1c2UgYnkgYFRyYW5zbGF0aW9uUGFyc2VyLnBhcnNlKClgIGlmIHRoZSBYTUxcbiAqIGRvY3VtZW50IGhhcyB0aGUgZXhwZWN0ZWQgZm9ybWF0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuUGFyc2VYbWwoXG4gICAgZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZywgcm9vdE5vZGVOYW1lOiBzdHJpbmcsXG4gICAgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IFBhcnNlQW5hbHlzaXM8WG1sVHJhbnNsYXRpb25QYXJzZXJIaW50PiB7XG4gIGNvbnN0IGRpYWdub3N0aWNzID0gbmV3IERpYWdub3N0aWNzKCk7XG4gIGNvbnN0IHhtbFBhcnNlciA9IG5ldyBYbWxQYXJzZXIoKTtcbiAgY29uc3QgeG1sID0geG1sUGFyc2VyLnBhcnNlKGNvbnRlbnRzLCBmaWxlUGF0aCk7XG5cbiAgaWYgKHhtbC5yb290Tm9kZXMubGVuZ3RoID09PSAwIHx8XG4gICAgICB4bWwuZXJyb3JzLnNvbWUoZXJyb3IgPT4gZXJyb3IubGV2ZWwgPT09IFBhcnNlRXJyb3JMZXZlbC5FUlJPUikpIHtcbiAgICB4bWwuZXJyb3JzLmZvckVhY2goZSA9PiBhZGRQYXJzZUVycm9yKGRpYWdub3N0aWNzLCBlKSk7XG4gICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgfVxuXG4gIGNvbnN0IHJvb3RFbGVtZW50cyA9IHhtbC5yb290Tm9kZXMuZmlsdGVyKGlzTmFtZWRFbGVtZW50KHJvb3ROb2RlTmFtZSkpO1xuICBjb25zdCByb290RWxlbWVudCA9IHJvb3RFbGVtZW50c1swXTtcbiAgaWYgKHJvb3RFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICBkaWFnbm9zdGljcy53YXJuKGBUaGUgWE1MIGZpbGUgZG9lcyBub3QgY29udGFpbiBhIDwke3Jvb3ROb2RlTmFtZX0+IHJvb3Qgbm9kZS5gKTtcbiAgICByZXR1cm4ge2NhblBhcnNlOiBmYWxzZSwgZGlhZ25vc3RpY3N9O1xuICB9XG5cbiAgZm9yIChjb25zdCBhdHRyS2V5IG9mIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpKSB7XG4gICAgY29uc3QgYXR0ciA9IHJvb3RFbGVtZW50LmF0dHJzLmZpbmQoYXR0ciA9PiBhdHRyLm5hbWUgPT09IGF0dHJLZXkpO1xuICAgIGlmIChhdHRyID09PSB1bmRlZmluZWQgfHwgYXR0ci52YWx1ZSAhPT0gYXR0cmlidXRlc1thdHRyS2V5XSkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGRpYWdub3N0aWNzLCByb290RWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICAgIGBUaGUgPCR7cm9vdE5vZGVOYW1lfT4gbm9kZSBkb2VzIG5vdCBoYXZlIHRoZSByZXF1aXJlZCBhdHRyaWJ1dGU6ICR7YXR0cktleX09XCIke1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJLZXldfVwiLmAsXG4gICAgICAgICAgUGFyc2VFcnJvckxldmVsLldBUk5JTkcpO1xuICAgICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgICB9XG4gIH1cblxuICBpZiAocm9vdEVsZW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICB4bWwuZXJyb3JzLnB1c2gobmV3IFBhcnNlRXJyb3IoXG4gICAgICAgIHhtbC5yb290Tm9kZXNbMV0uc291cmNlU3BhbixcbiAgICAgICAgJ1VuZXhwZWN0ZWQgcm9vdCBub2RlLiBYTElGRiAxLjIgZmlsZXMgc2hvdWxkIG9ubHkgaGF2ZSBhIHNpbmdsZSA8eGxpZmY+IHJvb3Qgbm9kZS4nLFxuICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORykpO1xuICB9XG5cbiAgcmV0dXJuIHtjYW5QYXJzZTogdHJ1ZSwgZGlhZ25vc3RpY3MsIGhpbnQ6IHtlbGVtZW50OiByb290RWxlbWVudCwgZXJyb3JzOiB4bWwuZXJyb3JzfX07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcHJlZGljYXRlLCB3aGljaCBjYW4gYmUgdXNlZCBieSB0aGluZ3MgbGlrZSBgQXJyYXkuZmlsdGVyKClgLCB0aGF0IHdpbGwgbWF0Y2ggYSBuYW1lZFxuICogWE1MIEVsZW1lbnQgZnJvbSBhIGNvbGxlY3Rpb24gb2YgWE1MIE5vZGVzLlxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBleHBlY3RlZCBuYW1lIG9mIHRoZSBlbGVtZW50IHRvIG1hdGNoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOYW1lZEVsZW1lbnQobmFtZTogc3RyaW5nKTogKG5vZGU6IE5vZGUpID0+IG5vZGUgaXMgRWxlbWVudCB7XG4gIGZ1bmN0aW9uIHByZWRpY2F0ZShub2RlOiBOb2RlKTogbm9kZSBpcyBFbGVtZW50IHtcbiAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgbm9kZS5uYW1lID09PSBuYW1lO1xuICB9XG4gIHJldHVybiBwcmVkaWNhdGU7XG59XG5cbi8qKlxuICogQWRkIGFuIFhNTCBwYXJzZXIgcmVsYXRlZCBtZXNzYWdlIHRvIHRoZSBnaXZlbiBgZGlhZ25vc3RpY3NgIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICBkaWFnbm9zdGljczogRGlhZ25vc3RpY3MsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgbWVzc2FnZTogc3RyaW5nLFxuICAgIGxldmVsOiBQYXJzZUVycm9yTGV2ZWwpOiB2b2lkIHtcbiAgYWRkUGFyc2VFcnJvcihkaWFnbm9zdGljcywgbmV3IFBhcnNlRXJyb3Ioc291cmNlU3BhbiwgbWVzc2FnZSwgbGV2ZWwpKTtcbn1cblxuLyoqXG4gKiBDb3B5IHRoZSBmb3JtYXR0ZWQgZXJyb3IgbWVzc2FnZSBmcm9tIHRoZSBnaXZlbiBgcGFyc2VFcnJvcmAgb2JqZWN0IGludG8gdGhlIGdpdmVuIGBkaWFnbm9zdGljc2BcbiAqIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFBhcnNlRXJyb3IoZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCBwYXJzZUVycm9yOiBQYXJzZUVycm9yKTogdm9pZCB7XG4gIGlmIChwYXJzZUVycm9yLmxldmVsID09PSBQYXJzZUVycm9yTGV2ZWwuRVJST1IpIHtcbiAgICBkaWFnbm9zdGljcy5lcnJvcihwYXJzZUVycm9yLnRvU3RyaW5nKCkpO1xuICB9IGVsc2Uge1xuICAgIGRpYWdub3N0aWNzLndhcm4ocGFyc2VFcnJvci50b1N0cmluZygpKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCB0aGUgcHJvdmlkZWQgYGVycm9yc2AgdG8gdGhlIGBidW5kbGVgIGRpYWdub3N0aWNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRXJyb3JzVG9CdW5kbGUoYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSwgZXJyb3JzOiBQYXJzZUVycm9yW10pOiB2b2lkIHtcbiAgZm9yIChjb25zdCBlcnJvciBvZiBlcnJvcnMpIHtcbiAgICBhZGRQYXJzZUVycm9yKGJ1bmRsZS5kaWFnbm9zdGljcywgZXJyb3IpO1xuICB9XG59XG4iXX0=