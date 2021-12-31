(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils", ["require", "exports", "@angular/compiler", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
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
    function parseInnerRange(element) {
        var xmlParser = new compiler_1.XmlParser();
        var xml = xmlParser.parse(element.sourceSpan.start.file.content, element.sourceSpan.start.file.url, { tokenizeExpansionForms: true, range: getInnerRange(element) });
        if (xml.errors.length) {
            throw xml.errors.map(function (e) { return new translation_parse_error_1.TranslationParseError(e.span, e.msg).toString(); }).join('\n');
        }
        return xml.rootNodes;
    }
    exports.parseInnerRange = parseInnerRange;
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9wYXJzZXJzL3RyYW5zbGF0aW9uX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOENBQXVFO0lBQ3ZFLG1KQUFnRTtJQUVoRSxTQUFnQixjQUFjLENBQUMsT0FBZ0IsRUFBRSxRQUFnQjtRQUMvRCxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMzQixNQUFNLElBQUksK0NBQXFCLENBQzNCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsd0JBQXFCLFFBQVEsa0JBQWMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQVBELHdDQU9DO0lBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQWdCLEVBQUUsUUFBZ0I7UUFDN0QsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3JELENBQUM7SUFIRCxvQ0FHQztJQUVELFNBQWdCLGVBQWUsQ0FBQyxPQUFnQjtRQUM5QyxJQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUN2QixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ3hFLEVBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksK0NBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQW5ELENBQW1ELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztJQVRELDBDQVNDO0lBRUQsU0FBUyxhQUFhLENBQUMsT0FBZ0I7UUFDckMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWlCLENBQUMsR0FBRyxDQUFDO1FBQzVDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxhQUFlLENBQUMsS0FBSyxDQUFDO1FBQzFDLE9BQU87WUFDTCxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDdEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ3JCLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDbkIsQ0FBQztJQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0VsZW1lbnQsIExleGVyUmFuZ2UsIE5vZGUsIFhtbFBhcnNlcn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtUcmFuc2xhdGlvblBhcnNlRXJyb3J9IGZyb20gJy4vdHJhbnNsYXRpb25fcGFyc2VfZXJyb3InO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXR0ck9yVGhyb3coZWxlbWVudDogRWxlbWVudCwgYXR0ck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGF0dHJWYWx1ZSA9IGdldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyTmFtZSk7XG4gIGlmIChhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBUcmFuc2xhdGlvblBhcnNlRXJyb3IoXG4gICAgICAgIGVsZW1lbnQuc291cmNlU3BhbiwgYE1pc3NpbmcgcmVxdWlyZWQgXCIke2F0dHJOYW1lfVwiIGF0dHJpYnV0ZTpgKTtcbiAgfVxuICByZXR1cm4gYXR0clZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJOYW1lOiBzdHJpbmcpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgY29uc3QgYXR0ciA9IGVsZW1lbnQuYXR0cnMuZmluZChhID0+IGEubmFtZSA9PT0gYXR0ck5hbWUpO1xuICByZXR1cm4gYXR0ciAhPT0gdW5kZWZpbmVkID8gYXR0ci52YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW5uZXJSYW5nZShlbGVtZW50OiBFbGVtZW50KTogTm9kZVtdIHtcbiAgY29uc3QgeG1sUGFyc2VyID0gbmV3IFhtbFBhcnNlcigpO1xuICBjb25zdCB4bWwgPSB4bWxQYXJzZXIucGFyc2UoXG4gICAgICBlbGVtZW50LnNvdXJjZVNwYW4uc3RhcnQuZmlsZS5jb250ZW50LCBlbGVtZW50LnNvdXJjZVNwYW4uc3RhcnQuZmlsZS51cmwsXG4gICAgICB7dG9rZW5pemVFeHBhbnNpb25Gb3JtczogdHJ1ZSwgcmFuZ2U6IGdldElubmVyUmFuZ2UoZWxlbWVudCl9KTtcbiAgaWYgKHhtbC5lcnJvcnMubGVuZ3RoKSB7XG4gICAgdGhyb3cgeG1sLmVycm9ycy5tYXAoZSA9PiBuZXcgVHJhbnNsYXRpb25QYXJzZUVycm9yKGUuc3BhbiwgZS5tc2cpLnRvU3RyaW5nKCkpLmpvaW4oJ1xcbicpO1xuICB9XG4gIHJldHVybiB4bWwucm9vdE5vZGVzO1xufVxuXG5mdW5jdGlvbiBnZXRJbm5lclJhbmdlKGVsZW1lbnQ6IEVsZW1lbnQpOiBMZXhlclJhbmdlIHtcbiAgY29uc3Qgc3RhcnQgPSBlbGVtZW50LnN0YXJ0U291cmNlU3BhbiAhLmVuZDtcbiAgY29uc3QgZW5kID0gZWxlbWVudC5lbmRTb3VyY2VTcGFuICEuc3RhcnQ7XG4gIHJldHVybiB7XG4gICAgc3RhcnRQb3M6IHN0YXJ0Lm9mZnNldCxcbiAgICBzdGFydExpbmU6IHN0YXJ0LmxpbmUsXG4gICAgc3RhcnRDb2w6IHN0YXJ0LmNvbCxcbiAgICBlbmRQb3M6IGVuZC5vZmZzZXQsXG4gIH07XG59Il19