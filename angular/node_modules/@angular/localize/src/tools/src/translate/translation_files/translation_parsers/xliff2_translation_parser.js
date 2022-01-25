(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Xliff2TranslationParser = void 0;
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
    var base_visitor_1 = require("@angular/localize/src/tools/src/translate/translation_files/base_visitor");
    var serialize_translation_message_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message");
    var translation_utils_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils");
    /**
     * A translation parser that can load translations from XLIFF 2 files.
     *
     * https://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
     *
     * @see Xliff2TranslationSerializer
     * @publicApi used by CLI
     */
    var Xliff2TranslationParser = /** @class */ (function () {
        function Xliff2TranslationParser() {
        }
        /**
         * @deprecated
         */
        Xliff2TranslationParser.prototype.canParse = function (filePath, contents) {
            var result = this.analyze(filePath, contents);
            return result.canParse && result.hint;
        };
        Xliff2TranslationParser.prototype.analyze = function (filePath, contents) {
            return translation_utils_1.canParseXml(filePath, contents, 'xliff', { version: '2.0' });
        };
        Xliff2TranslationParser.prototype.parse = function (filePath, contents, hint) {
            if (hint) {
                return this.extractBundle(hint);
            }
            else {
                return this.extractBundleDeprecated(filePath, contents);
            }
        };
        Xliff2TranslationParser.prototype.extractBundle = function (_a) {
            var e_1, _b;
            var element = _a.element, errors = _a.errors;
            var diagnostics = new diagnostics_1.Diagnostics();
            errors.forEach(function (e) { return translation_utils_1.addParseError(diagnostics, e); });
            var locale = translation_utils_1.getAttribute(element, 'trgLang');
            var files = element.children.filter(isFileElement);
            if (files.length === 0) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, 'No <file> elements found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
            }
            else if (files.length > 1) {
                translation_utils_1.addParseDiagnostic(diagnostics, files[1].sourceSpan, 'More than one <file> element found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
            }
            var bundle = { locale: locale, translations: {}, diagnostics: diagnostics };
            var translationVisitor = new Xliff2TranslationVisitor();
            try {
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    compiler_1.visitAll(translationVisitor, file.children, { bundle: bundle });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_b = files_1.return)) _b.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return bundle;
        };
        Xliff2TranslationParser.prototype.extractBundleDeprecated = function (filePath, contents) {
            var hint = this.canParse(filePath, contents);
            if (!hint) {
                throw new Error("Unable to parse \"" + filePath + "\" as XLIFF 2.0 format.");
            }
            var bundle = this.extractBundle(hint);
            if (bundle.diagnostics.hasErrors) {
                var message = bundle.diagnostics.formatDiagnostics("Failed to parse \"" + filePath + "\" as XLIFF 2.0 format");
                throw new Error(message);
            }
            return bundle;
        };
        return Xliff2TranslationParser;
    }());
    exports.Xliff2TranslationParser = Xliff2TranslationParser;
    var Xliff2TranslationVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(Xliff2TranslationVisitor, _super);
        function Xliff2TranslationVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Xliff2TranslationVisitor.prototype.visitElement = function (element, _a) {
            var bundle = _a.bundle, unit = _a.unit;
            if (element.name === 'unit') {
                this.visitUnitElement(element, bundle);
            }
            else if (element.name === 'segment') {
                this.visitSegmentElement(element, bundle, unit);
            }
            else {
                compiler_1.visitAll(this, element.children, { bundle: bundle, unit: unit });
            }
        };
        Xliff2TranslationVisitor.prototype.visitUnitElement = function (element, bundle) {
            // Error if no `id` attribute
            var externalId = translation_utils_1.getAttribute(element, 'id');
            if (externalId === undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing required \"id\" attribute on <trans-unit> element.", compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            // Error if there is already a translation with the same id
            if (bundle.translations[externalId] !== undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Duplicated translations for message \"" + externalId + "\"", compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            compiler_1.visitAll(this, element.children, { bundle: bundle, unit: externalId });
        };
        Xliff2TranslationVisitor.prototype.visitSegmentElement = function (element, bundle, unit) {
            // A `<segment>` element must be below a `<unit>` element
            if (unit === undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, 'Invalid <segment> element: should be a child of a <unit> element.', compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            var targetMessage = element.children.find(translation_utils_1.isNamedElement('target'));
            if (targetMessage === undefined) {
                // Warn if there is no `<target>` child element
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, 'Missing <target> element', compiler_1.ParseErrorLevel.WARNING);
                // Fallback to the `<source>` element if available.
                targetMessage = element.children.find(translation_utils_1.isNamedElement('source'));
                if (targetMessage === undefined) {
                    // Error if there is neither `<target>` nor `<source>`.
                    translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, 'Missing required element: one of <target> or <source> is required', compiler_1.ParseErrorLevel.ERROR);
                    return;
                }
            }
            var _a = serialize_translation_message_1.serializeTranslationMessage(targetMessage, {
                inlineElements: ['cp', 'sc', 'ec', 'mrk', 'sm', 'em'],
                placeholder: { elementName: 'ph', nameAttribute: 'equiv', bodyAttribute: 'disp' },
                placeholderContainer: { elementName: 'pc', startAttribute: 'equivStart', endAttribute: 'equivEnd' }
            }), translation = _a.translation, parseErrors = _a.parseErrors, serializeErrors = _a.serializeErrors;
            if (translation !== null) {
                bundle.translations[unit] = translation;
            }
            translation_utils_1.addErrorsToBundle(bundle, parseErrors);
            translation_utils_1.addErrorsToBundle(bundle, serializeErrors);
        };
        return Xliff2TranslationVisitor;
    }(base_visitor_1.BaseVisitor));
    function isFileElement(node) {
        return node instanceof compiler_1.Element && node.name === 'file';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveGxpZmYyX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOENBQTJFO0lBRTNFLDJFQUFpRDtJQUNqRCx5R0FBNEM7SUFFNUMsK0pBQTRFO0lBRTVFLHVJQUE4SjtJQUU5Sjs7Ozs7OztPQU9HO0lBQ0g7UUFBQTtRQTJEQSxDQUFDO1FBMURDOztXQUVHO1FBQ0gsMENBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsUUFBZ0I7WUFDekMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsT0FBTyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEMsQ0FBQztRQUVELHlDQUFPLEdBQVAsVUFBUSxRQUFnQixFQUFFLFFBQWdCO1lBQ3hDLE9BQU8sK0JBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFRCx1Q0FBSyxHQUFMLFVBQU0sUUFBZ0IsRUFBRSxRQUFnQixFQUFFLElBQStCO1lBRXZFLElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDO1FBRU8sK0NB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QyxxQ0FBaUIsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNILCtCQUFDO0lBQUQsQ0FBQyxBQTFFRCxDQUF1QywwQkFBVyxHQTBFakQ7SUFFRCxTQUFTLGFBQWEsQ0FBQyxJQUFVO1FBQy9CLE9BQU8sSUFBSSxZQUFZLGtCQUFPLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7SUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtFbGVtZW50LCBOb2RlLCBQYXJzZUVycm9yTGV2ZWwsIHZpc2l0QWxsfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5cbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7QmFzZVZpc2l0b3J9IGZyb20gJy4uL2Jhc2VfdmlzaXRvcic7XG5cbmltcG9ydCB7c2VyaWFsaXplVHJhbnNsYXRpb25NZXNzYWdlfSBmcm9tICcuL3NlcmlhbGl6ZV90cmFuc2xhdGlvbl9tZXNzYWdlJztcbmltcG9ydCB7UGFyc2VBbmFseXNpcywgUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5pbXBvcnQge2FkZEVycm9yc1RvQnVuZGxlLCBhZGRQYXJzZURpYWdub3N0aWMsIGFkZFBhcnNlRXJyb3IsIGNhblBhcnNlWG1sLCBnZXRBdHRyaWJ1dGUsIGlzTmFtZWRFbGVtZW50LCBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnR9IGZyb20gJy4vdHJhbnNsYXRpb25fdXRpbHMnO1xuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gcGFyc2VyIHRoYXQgY2FuIGxvYWQgdHJhbnNsYXRpb25zIGZyb20gWExJRkYgMiBmaWxlcy5cbiAqXG4gKiBodHRwczovL2RvY3Mub2FzaXMtb3Blbi5vcmcveGxpZmYveGxpZmYtY29yZS92Mi4wL29zL3hsaWZmLWNvcmUtdjIuMC1vcy5odG1sXG4gKlxuICogQHNlZSBYbGlmZjJUcmFuc2xhdGlvblNlcmlhbGl6ZXJcbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGNsYXNzIFhsaWZmMlRyYW5zbGF0aW9uUGFyc2VyIGltcGxlbWVudHMgVHJhbnNsYXRpb25QYXJzZXI8WG1sVHJhbnNsYXRpb25QYXJzZXJIaW50PiB7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgY2FuUGFyc2UoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IFhtbFRyYW5zbGF0aW9uUGFyc2VySGludHxmYWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hbmFseXplKGZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdC5jYW5QYXJzZSAmJiByZXN1bHQuaGludDtcbiAgfVxuXG4gIGFuYWx5emUoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IFBhcnNlQW5hbHlzaXM8WG1sVHJhbnNsYXRpb25QYXJzZXJIaW50PiB7XG4gICAgcmV0dXJuIGNhblBhcnNlWG1sKGZpbGVQYXRoLCBjb250ZW50cywgJ3hsaWZmJywge3ZlcnNpb246ICcyLjAnfSk7XG4gIH1cblxuICBwYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nLCBoaW50PzogWG1sVHJhbnNsYXRpb25QYXJzZXJIaW50KTpcbiAgICAgIFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlIHtcbiAgICBpZiAoaGludCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEJ1bmRsZShoaW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEJ1bmRsZURlcHJlY2F0ZWQoZmlsZVBhdGgsIGNvbnRlbnRzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RCdW5kbGUoe2VsZW1lbnQsIGVycm9yc306IFhtbFRyYW5zbGF0aW9uUGFyc2VySGludCk6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlIHtcbiAgICBjb25zdCBkaWFnbm9zdGljcyA9IG5ldyBEaWFnbm9zdGljcygpO1xuICAgIGVycm9ycy5mb3JFYWNoKGUgPT4gYWRkUGFyc2VFcnJvcihkaWFnbm9zdGljcywgZSkpO1xuXG4gICAgY29uc3QgbG9jYWxlID0gZ2V0QXR0cmlidXRlKGVsZW1lbnQsICd0cmdMYW5nJyk7XG4gICAgY29uc3QgZmlsZXMgPSBlbGVtZW50LmNoaWxkcmVuLmZpbHRlcihpc0ZpbGVFbGVtZW50KTtcbiAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbiwgJ05vIDxmaWxlPiBlbGVtZW50cyBmb3VuZCBpbiA8eGxpZmY+JyxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgfSBlbHNlIGlmIChmaWxlcy5sZW5ndGggPiAxKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgZGlhZ25vc3RpY3MsIGZpbGVzWzFdLnNvdXJjZVNwYW4sICdNb3JlIHRoYW4gb25lIDxmaWxlPiBlbGVtZW50IGZvdW5kIGluIDx4bGlmZj4nLFxuICAgICAgICAgIFBhcnNlRXJyb3JMZXZlbC5XQVJOSU5HKTtcbiAgICB9XG5cbiAgICBjb25zdCBidW5kbGUgPSB7bG9jYWxlLCB0cmFuc2xhdGlvbnM6IHt9LCBkaWFnbm9zdGljc307XG4gICAgY29uc3QgdHJhbnNsYXRpb25WaXNpdG9yID0gbmV3IFhsaWZmMlRyYW5zbGF0aW9uVmlzaXRvcigpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgdmlzaXRBbGwodHJhbnNsYXRpb25WaXNpdG9yLCBmaWxlLmNoaWxkcmVuLCB7YnVuZGxlfSk7XG4gICAgfVxuICAgIHJldHVybiBidW5kbGU7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RCdW5kbGVEZXByZWNhdGVkKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBoaW50ID0gdGhpcy5jYW5QYXJzZShmaWxlUGF0aCwgY29udGVudHMpO1xuICAgIGlmICghaGludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgXCIke2ZpbGVQYXRofVwiIGFzIFhMSUZGIDIuMCBmb3JtYXQuYCk7XG4gICAgfVxuICAgIGNvbnN0IGJ1bmRsZSA9IHRoaXMuZXh0cmFjdEJ1bmRsZShoaW50KTtcbiAgICBpZiAoYnVuZGxlLmRpYWdub3N0aWNzLmhhc0Vycm9ycykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLmZvcm1hdERpYWdub3N0aWNzKGBGYWlsZWQgdG8gcGFyc2UgXCIke2ZpbGVQYXRofVwiIGFzIFhMSUZGIDIuMCBmb3JtYXRgKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1bmRsZTtcbiAgfVxufVxuXG5cbmludGVyZmFjZSBUcmFuc2xhdGlvblZpc2l0b3JDb250ZXh0IHtcbiAgdW5pdD86IHN0cmluZztcbiAgYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZTtcbn1cblxuY2xhc3MgWGxpZmYyVHJhbnNsYXRpb25WaXNpdG9yIGV4dGVuZHMgQmFzZVZpc2l0b3Ige1xuICBvdmVycmlkZSB2aXNpdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwge2J1bmRsZSwgdW5pdH06IFRyYW5zbGF0aW9uVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChlbGVtZW50Lm5hbWUgPT09ICd1bml0Jykge1xuICAgICAgdGhpcy52aXNpdFVuaXRFbGVtZW50KGVsZW1lbnQsIGJ1bmRsZSk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm5hbWUgPT09ICdzZWdtZW50Jykge1xuICAgICAgdGhpcy52aXNpdFNlZ21lbnRFbGVtZW50KGVsZW1lbnQsIGJ1bmRsZSwgdW5pdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4sIHtidW5kbGUsIHVuaXR9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpc2l0VW5pdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSk6IHZvaWQge1xuICAgIC8vIEVycm9yIGlmIG5vIGBpZGAgYXR0cmlidXRlXG4gICAgY29uc3QgZXh0ZXJuYWxJZCA9IGdldEF0dHJpYnV0ZShlbGVtZW50LCAnaWQnKTtcbiAgICBpZiAoZXh0ZXJuYWxJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sXG4gICAgICAgICAgYE1pc3NpbmcgcmVxdWlyZWQgXCJpZFwiIGF0dHJpYnV0ZSBvbiA8dHJhbnMtdW5pdD4gZWxlbWVudC5gLCBQYXJzZUVycm9yTGV2ZWwuRVJST1IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEVycm9yIGlmIHRoZXJlIGlzIGFscmVhZHkgYSB0cmFuc2xhdGlvbiB3aXRoIHRoZSBzYW1lIGlkXG4gICAgaWYgKGJ1bmRsZS50cmFuc2xhdGlvbnNbZXh0ZXJuYWxJZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGJ1bmRsZS5kaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICAgIGBEdXBsaWNhdGVkIHRyYW5zbGF0aW9ucyBmb3IgbWVzc2FnZSBcIiR7ZXh0ZXJuYWxJZH1cImAsIFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmlzaXRBbGwodGhpcywgZWxlbWVudC5jaGlsZHJlbiwge2J1bmRsZSwgdW5pdDogZXh0ZXJuYWxJZH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB2aXNpdFNlZ21lbnRFbGVtZW50KFxuICAgICAgZWxlbWVudDogRWxlbWVudCwgYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSwgdW5pdDogc3RyaW5nfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIC8vIEEgYDxzZWdtZW50PmAgZWxlbWVudCBtdXN0IGJlIGJlbG93IGEgYDx1bml0PmAgZWxlbWVudFxuICAgIGlmICh1bml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICAgICAgICBidW5kbGUuZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbixcbiAgICAgICAgICAnSW52YWxpZCA8c2VnbWVudD4gZWxlbWVudDogc2hvdWxkIGJlIGEgY2hpbGQgb2YgYSA8dW5pdD4gZWxlbWVudC4nLFxuICAgICAgICAgIFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHRhcmdldE1lc3NhZ2UgPSBlbGVtZW50LmNoaWxkcmVuLmZpbmQoaXNOYW1lZEVsZW1lbnQoJ3RhcmdldCcpKTtcbiAgICBpZiAodGFyZ2V0TWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBXYXJuIGlmIHRoZXJlIGlzIG5vIGA8dGFyZ2V0PmAgY2hpbGQgZWxlbWVudFxuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGJ1bmRsZS5kaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLCAnTWlzc2luZyA8dGFyZ2V0PiBlbGVtZW50JyxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG5cbiAgICAgIC8vIEZhbGxiYWNrIHRvIHRoZSBgPHNvdXJjZT5gIGVsZW1lbnQgaWYgYXZhaWxhYmxlLlxuICAgICAgdGFyZ2V0TWVzc2FnZSA9IGVsZW1lbnQuY2hpbGRyZW4uZmluZChpc05hbWVkRWxlbWVudCgnc291cmNlJykpO1xuICAgICAgaWYgKHRhcmdldE1lc3NhZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBFcnJvciBpZiB0aGVyZSBpcyBuZWl0aGVyIGA8dGFyZ2V0PmAgbm9yIGA8c291cmNlPmAuXG4gICAgICAgIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICAgICAgICAgIGJ1bmRsZS5kaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgJ01pc3NpbmcgcmVxdWlyZWQgZWxlbWVudDogb25lIG9mIDx0YXJnZXQ+IG9yIDxzb3VyY2U+IGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgIFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7dHJhbnNsYXRpb24sIHBhcnNlRXJyb3JzLCBzZXJpYWxpemVFcnJvcnN9ID0gc2VyaWFsaXplVHJhbnNsYXRpb25NZXNzYWdlKHRhcmdldE1lc3NhZ2UsIHtcbiAgICAgIGlubGluZUVsZW1lbnRzOiBbJ2NwJywgJ3NjJywgJ2VjJywgJ21yaycsICdzbScsICdlbSddLFxuICAgICAgcGxhY2Vob2xkZXI6IHtlbGVtZW50TmFtZTogJ3BoJywgbmFtZUF0dHJpYnV0ZTogJ2VxdWl2JywgYm9keUF0dHJpYnV0ZTogJ2Rpc3AnfSxcbiAgICAgIHBsYWNlaG9sZGVyQ29udGFpbmVyOlxuICAgICAgICAgIHtlbGVtZW50TmFtZTogJ3BjJywgc3RhcnRBdHRyaWJ1dGU6ICdlcXVpdlN0YXJ0JywgZW5kQXR0cmlidXRlOiAnZXF1aXZFbmQnfVxuICAgIH0pO1xuICAgIGlmICh0cmFuc2xhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgYnVuZGxlLnRyYW5zbGF0aW9uc1t1bml0XSA9IHRyYW5zbGF0aW9uO1xuICAgIH1cbiAgICBhZGRFcnJvcnNUb0J1bmRsZShidW5kbGUsIHBhcnNlRXJyb3JzKTtcbiAgICBhZGRFcnJvcnNUb0J1bmRsZShidW5kbGUsIHNlcmlhbGl6ZUVycm9ycyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNGaWxlRWxlbWVudChub2RlOiBOb2RlKTogbm9kZSBpcyBFbGVtZW50IHtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmIG5vZGUubmFtZSA9PT0gJ2ZpbGUnO1xufVxuIl19