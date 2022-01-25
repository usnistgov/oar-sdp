(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "path", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XtbTranslationParser = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    var path_1 = require("path");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    var base_visitor_1 = require("@angular/localize/src/tools/src/translate/translation_files/base_visitor");
    var serialize_translation_message_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message");
    var translation_utils_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils");
    /**
     * A translation parser that can load XTB files.
     *
     * http://cldr.unicode.org/development/development-process/design-proposals/xmb
     *
     * @see XmbTranslationSerializer
     * @publicApi used by CLI
     */
    var XtbTranslationParser = /** @class */ (function () {
        function XtbTranslationParser() {
        }
        /**
         * @deprecated
         */
        XtbTranslationParser.prototype.canParse = function (filePath, contents) {
            var result = this.analyze(filePath, contents);
            return result.canParse && result.hint;
        };
        XtbTranslationParser.prototype.analyze = function (filePath, contents) {
            var extension = path_1.extname(filePath);
            if (extension !== '.xtb' && extension !== '.xmb') {
                var diagnostics = new diagnostics_1.Diagnostics();
                diagnostics.warn('Must have xtb or xmb extension.');
                return { canParse: false, diagnostics: diagnostics };
            }
            return translation_utils_1.canParseXml(filePath, contents, 'translationbundle', {});
        };
        XtbTranslationParser.prototype.parse = function (filePath, contents, hint) {
            if (hint) {
                return this.extractBundle(hint);
            }
            else {
                return this.extractBundleDeprecated(filePath, contents);
            }
        };
        XtbTranslationParser.prototype.extractBundle = function (_a) {
            var element = _a.element, errors = _a.errors;
            var langAttr = element.attrs.find(function (attr) { return attr.name === 'lang'; });
            var bundle = {
                locale: langAttr && langAttr.value,
                translations: {},
                diagnostics: new diagnostics_1.Diagnostics()
            };
            errors.forEach(function (e) { return translation_utils_1.addParseError(bundle.diagnostics, e); });
            var bundleVisitor = new XtbVisitor();
            compiler_1.visitAll(bundleVisitor, element.children, bundle);
            return bundle;
        };
        XtbTranslationParser.prototype.extractBundleDeprecated = function (filePath, contents) {
            var hint = this.canParse(filePath, contents);
            if (!hint) {
                throw new Error("Unable to parse \"" + filePath + "\" as XMB/XTB format.");
            }
            var bundle = this.extractBundle(hint);
            if (bundle.diagnostics.hasErrors) {
                var message = bundle.diagnostics.formatDiagnostics("Failed to parse \"" + filePath + "\" as XMB/XTB format");
                throw new Error(message);
            }
            return bundle;
        };
        return XtbTranslationParser;
    }());
    exports.XtbTranslationParser = XtbTranslationParser;
    var XtbVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XtbVisitor, _super);
        function XtbVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XtbVisitor.prototype.visitElement = function (element, bundle) {
            switch (element.name) {
                case 'translation':
                    // Error if no `id` attribute
                    var id = translation_utils_1.getAttribute(element, 'id');
                    if (id === undefined) {
                        translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing required \"id\" attribute on <translation> element.", compiler_1.ParseErrorLevel.ERROR);
                        return;
                    }
                    // Error if there is already a translation with the same id
                    if (bundle.translations[id] !== undefined) {
                        translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Duplicated translations for message \"" + id + "\"", compiler_1.ParseErrorLevel.ERROR);
                        return;
                    }
                    var _a = serialize_translation_message_1.serializeTranslationMessage(element, { inlineElements: [], placeholder: { elementName: 'ph', nameAttribute: 'name' } }), translation = _a.translation, parseErrors = _a.parseErrors, serializeErrors = _a.serializeErrors;
                    if (parseErrors.length) {
                        // We only want to warn (not error) if there were problems parsing the translation for
                        // XTB formatted files. See https://github.com/angular/angular/issues/14046.
                        bundle.diagnostics.warn(computeParseWarning(id, parseErrors));
                    }
                    else if (translation !== null) {
                        // Only store the translation if there were no parse errors
                        bundle.translations[id] = translation;
                    }
                    translation_utils_1.addErrorsToBundle(bundle, serializeErrors);
                    break;
                default:
                    translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Unexpected <" + element.name + "> tag.", compiler_1.ParseErrorLevel.ERROR);
            }
        };
        return XtbVisitor;
    }(base_visitor_1.BaseVisitor));
    function computeParseWarning(id, errors) {
        var msg = errors.map(function (e) { return e.toString(); }).join('\n');
        return "Could not parse message with id \"" + id + "\" - perhaps it has an unrecognised ICU format?\n" +
            msg;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRiX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveHRiX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOENBQWlGO0lBQ2pGLDZCQUE2QjtJQUU3QiwyRUFBaUQ7SUFDakQseUdBQTRDO0lBRTVDLCtKQUE0RTtJQUU1RSx1SUFBOEk7SUFHOUk7Ozs7Ozs7T0FPRztJQUNIO1FBQUE7UUF1REEsQ0FBQztRQXREQzs7V0FFRztRQUNILHVDQUFRLEdBQVIsVUFBUyxRQUFnQixFQUFFLFFBQWdCO1lBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxzQ0FBTyxHQUFQLFVBQVEsUUFBZ0IsRUFBRSxRQUFnQjtZQUN4QyxJQUFNLFNBQVMsR0FBRyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsSUFBSSxTQUFTLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7Z0JBQ2hELElBQU0sV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsYUFBQSxFQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLCtCQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxF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QUM7SUFDVixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0VsZW1lbnQsIFBhcnNlRXJyb3IsIFBhcnNlRXJyb3JMZXZlbCwgdmlzaXRBbGx9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7ZXh0bmFtZX0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7QmFzZVZpc2l0b3J9IGZyb20gJy4uL2Jhc2VfdmlzaXRvcic7XG5cbmltcG9ydCB7c2VyaWFsaXplVHJhbnNsYXRpb25NZXNzYWdlfSBmcm9tICcuL3NlcmlhbGl6ZV90cmFuc2xhdGlvbl9tZXNzYWdlJztcbmltcG9ydCB7UGFyc2VBbmFseXNpcywgUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5pbXBvcnQge2FkZEVycm9yc1RvQnVuZGxlLCBhZGRQYXJzZURpYWdub3N0aWMsIGFkZFBhcnNlRXJyb3IsIGNhblBhcnNlWG1sLCBnZXRBdHRyaWJ1dGUsIFhtbFRyYW5zbGF0aW9uUGFyc2VySGludH0gZnJvbSAnLi90cmFuc2xhdGlvbl91dGlscyc7XG5cblxuLyoqXG4gKiBBIHRyYW5zbGF0aW9uIHBhcnNlciB0aGF0IGNhbiBsb2FkIFhUQiBmaWxlcy5cbiAqXG4gKiBodHRwOi8vY2xkci51bmljb2RlLm9yZy9kZXZlbG9wbWVudC9kZXZlbG9wbWVudC1wcm9jZXNzL2Rlc2lnbi1wcm9wb3NhbHMveG1iXG4gKlxuICogQHNlZSBYbWJUcmFuc2xhdGlvblNlcmlhbGl6ZXJcbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGNsYXNzIFh0YlRyYW5zbGF0aW9uUGFyc2VyIGltcGxlbWVudHMgVHJhbnNsYXRpb25QYXJzZXI8WG1sVHJhbnNsYXRpb25QYXJzZXJIaW50PiB7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgY2FuUGFyc2UoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IFhtbFRyYW5zbGF0aW9uUGFyc2VySGludHxmYWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hbmFseXplKGZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdC5jYW5QYXJzZSAmJiByZXN1bHQuaGludDtcbiAgfVxuXG4gIGFuYWx5emUoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IFBhcnNlQW5hbHlzaXM8WG1sVHJhbnNsYXRpb25QYXJzZXJIaW50PiB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZXh0bmFtZShmaWxlUGF0aCk7XG4gICAgaWYgKGV4dGVuc2lvbiAhPT0gJy54dGInICYmIGV4dGVuc2lvbiAhPT0gJy54bWInKSB7XG4gICAgICBjb25zdCBkaWFnbm9zdGljcyA9IG5ldyBEaWFnbm9zdGljcygpO1xuICAgICAgZGlhZ25vc3RpY3Mud2FybignTXVzdCBoYXZlIHh0YiBvciB4bWIgZXh0ZW5zaW9uLicpO1xuICAgICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgICB9XG4gICAgcmV0dXJuIGNhblBhcnNlWG1sKGZpbGVQYXRoLCBjb250ZW50cywgJ3RyYW5zbGF0aW9uYnVuZGxlJywge30pO1xuICB9XG5cbiAgcGFyc2UoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZywgaGludD86IFhtbFRyYW5zbGF0aW9uUGFyc2VySGludCk6XG4gICAgICBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgaWYgKGhpbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RCdW5kbGUoaGludCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RCdW5kbGVEZXByZWNhdGVkKGZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0QnVuZGxlKHtlbGVtZW50LCBlcnJvcnN9OiBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnQpOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgY29uc3QgbGFuZ0F0dHIgPSBlbGVtZW50LmF0dHJzLmZpbmQoKGF0dHIpID0+IGF0dHIubmFtZSA9PT0gJ2xhbmcnKTtcbiAgICBjb25zdCBidW5kbGU6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlID0ge1xuICAgICAgbG9jYWxlOiBsYW5nQXR0ciAmJiBsYW5nQXR0ci52YWx1ZSxcbiAgICAgIHRyYW5zbGF0aW9uczoge30sXG4gICAgICBkaWFnbm9zdGljczogbmV3IERpYWdub3N0aWNzKClcbiAgICB9O1xuICAgIGVycm9ycy5mb3JFYWNoKGUgPT4gYWRkUGFyc2VFcnJvcihidW5kbGUuZGlhZ25vc3RpY3MsIGUpKTtcblxuICAgIGNvbnN0IGJ1bmRsZVZpc2l0b3IgPSBuZXcgWHRiVmlzaXRvcigpO1xuICAgIHZpc2l0QWxsKGJ1bmRsZVZpc2l0b3IsIGVsZW1lbnQuY2hpbGRyZW4sIGJ1bmRsZSk7XG4gICAgcmV0dXJuIGJ1bmRsZTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEJ1bmRsZURlcHJlY2F0ZWQoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xuICAgIGNvbnN0IGhpbnQgPSB0aGlzLmNhblBhcnNlKGZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgaWYgKCFoaW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBwYXJzZSBcIiR7ZmlsZVBhdGh9XCIgYXMgWE1CL1hUQiBmb3JtYXQuYCk7XG4gICAgfVxuICAgIGNvbnN0IGJ1bmRsZSA9IHRoaXMuZXh0cmFjdEJ1bmRsZShoaW50KTtcbiAgICBpZiAoYnVuZGxlLmRpYWdub3N0aWNzLmhhc0Vycm9ycykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLmZvcm1hdERpYWdub3N0aWNzKGBGYWlsZWQgdG8gcGFyc2UgXCIke2ZpbGVQYXRofVwiIGFzIFhNQi9YVEIgZm9ybWF0YCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBidW5kbGU7XG4gIH1cbn1cblxuY2xhc3MgWHRiVmlzaXRvciBleHRlbmRzIEJhc2VWaXNpdG9yIHtcbiAgb3ZlcnJpZGUgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGJ1bmRsZTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUpOiBhbnkge1xuICAgIHN3aXRjaCAoZWxlbWVudC5uYW1lKSB7XG4gICAgICBjYXNlICd0cmFuc2xhdGlvbic6XG4gICAgICAgIC8vIEVycm9yIGlmIG5vIGBpZGAgYXR0cmlidXRlXG4gICAgICAgIGNvbnN0IGlkID0gZ2V0QXR0cmlidXRlKGVsZW1lbnQsICdpZCcpO1xuICAgICAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICAgICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgIGBNaXNzaW5nIHJlcXVpcmVkIFwiaWRcIiBhdHRyaWJ1dGUgb24gPHRyYW5zbGF0aW9uPiBlbGVtZW50LmAsIFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXJyb3IgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIHRyYW5zbGF0aW9uIHdpdGggdGhlIHNhbWUgaWRcbiAgICAgICAgaWYgKGJ1bmRsZS50cmFuc2xhdGlvbnNbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgICAgIGJ1bmRsZS5kaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLCBgRHVwbGljYXRlZCB0cmFuc2xhdGlvbnMgZm9yIG1lc3NhZ2UgXCIke2lkfVwiYCxcbiAgICAgICAgICAgICAgUGFyc2VFcnJvckxldmVsLkVSUk9SKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7dHJhbnNsYXRpb24sIHBhcnNlRXJyb3JzLCBzZXJpYWxpemVFcnJvcnN9ID0gc2VyaWFsaXplVHJhbnNsYXRpb25NZXNzYWdlKFxuICAgICAgICAgICAgZWxlbWVudCwge2lubGluZUVsZW1lbnRzOiBbXSwgcGxhY2Vob2xkZXI6IHtlbGVtZW50TmFtZTogJ3BoJywgbmFtZUF0dHJpYnV0ZTogJ25hbWUnfX0pO1xuICAgICAgICBpZiAocGFyc2VFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gV2Ugb25seSB3YW50IHRvIHdhcm4gKG5vdCBlcnJvcikgaWYgdGhlcmUgd2VyZSBwcm9ibGVtcyBwYXJzaW5nIHRoZSB0cmFuc2xhdGlvbiBmb3JcbiAgICAgICAgICAvLyBYVEIgZm9ybWF0dGVkIGZpbGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQwNDYuXG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLndhcm4oY29tcHV0ZVBhcnNlV2FybmluZyhpZCwgcGFyc2VFcnJvcnMpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIC8vIE9ubHkgc3RvcmUgdGhlIHRyYW5zbGF0aW9uIGlmIHRoZXJlIHdlcmUgbm8gcGFyc2UgZXJyb3JzXG4gICAgICAgICAgYnVuZGxlLnRyYW5zbGF0aW9uc1tpZF0gPSB0cmFuc2xhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBhZGRFcnJvcnNUb0J1bmRsZShidW5kbGUsIHNlcmlhbGl6ZUVycm9ycyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgICBidW5kbGUuZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbiwgYFVuZXhwZWN0ZWQgPCR7ZWxlbWVudC5uYW1lfT4gdGFnLmAsXG4gICAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuRVJST1IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlUGFyc2VXYXJuaW5nKGlkOiBzdHJpbmcsIGVycm9yczogUGFyc2VFcnJvcltdKTogc3RyaW5nIHtcbiAgY29uc3QgbXNnID0gZXJyb3JzLm1hcChlID0+IGUudG9TdHJpbmcoKSkuam9pbignXFxuJyk7XG4gIHJldHVybiBgQ291bGQgbm90IHBhcnNlIG1lc3NhZ2Ugd2l0aCBpZCBcIiR7aWR9XCIgLSBwZXJoYXBzIGl0IGhhcyBhbiB1bnJlY29nbmlzZWQgSUNVIGZvcm1hdD9cXG5gICtcbiAgICAgIG1zZztcbn1cbiJdfQ==