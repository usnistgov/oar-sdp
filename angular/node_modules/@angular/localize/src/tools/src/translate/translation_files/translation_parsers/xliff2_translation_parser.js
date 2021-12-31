(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "path", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    var path_1 = require("path");
    var base_visitor_1 = require("@angular/localize/src/tools/src/translate/translation_files/base_visitor");
    var message_serializer_1 = require("@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer");
    var target_message_renderer_1 = require("@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer");
    var translation_parse_error_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error");
    var translation_utils_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils");
    var XLIFF_2_0_NS_REGEX = /xmlns="urn:oasis:names:tc:xliff:document:2.0"/;
    /**
     * A translation parser that can load translations from XLIFF 2 files.
     *
     * http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
     *
     */
    var Xliff2TranslationParser = /** @class */ (function () {
        function Xliff2TranslationParser() {
        }
        Xliff2TranslationParser.prototype.canParse = function (filePath, contents) {
            return (path_1.extname(filePath) === '.xlf') && XLIFF_2_0_NS_REGEX.test(contents);
        };
        Xliff2TranslationParser.prototype.parse = function (filePath, contents) {
            var xmlParser = new compiler_1.XmlParser();
            var xml = xmlParser.parse(contents, filePath);
            var bundle = Xliff2TranslationBundleVisitor.extractBundle(xml.rootNodes);
            if (bundle === undefined) {
                throw new Error("Unable to parse \"" + filePath + "\" as XLIFF 2.0 format.");
            }
            return bundle;
        };
        return Xliff2TranslationParser;
    }());
    exports.Xliff2TranslationParser = Xliff2TranslationParser;
    var Xliff2TranslationBundleVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(Xliff2TranslationBundleVisitor, _super);
        function Xliff2TranslationBundleVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Xliff2TranslationBundleVisitor.extractBundle = function (xliff) {
            var visitor = new this();
            compiler_1.visitAll(visitor, xliff, {});
            return visitor.bundle;
        };
        Xliff2TranslationBundleVisitor.prototype.visitElement = function (element, _a) {
            var parsedLocale = _a.parsedLocale;
            if (element.name === 'xliff') {
                parsedLocale = translation_utils_1.getAttribute(element, 'trgLang');
                return compiler_1.visitAll(this, element.children, { parsedLocale: parsedLocale });
            }
            else if (element.name === 'file') {
                this.bundle = {
                    locale: parsedLocale,
                    translations: Xliff2TranslationVisitor.extractTranslations(element)
                };
            }
            else {
                return compiler_1.visitAll(this, element.children, { parsedLocale: parsedLocale });
            }
        };
        return Xliff2TranslationBundleVisitor;
    }(base_visitor_1.BaseVisitor));
    var Xliff2TranslationVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(Xliff2TranslationVisitor, _super);
        function Xliff2TranslationVisitor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.translations = {};
            return _this;
        }
        Xliff2TranslationVisitor.extractTranslations = function (file) {
            var visitor = new this();
            compiler_1.visitAll(visitor, file.children);
            return visitor.translations;
        };
        Xliff2TranslationVisitor.prototype.visitElement = function (element, context) {
            if (element.name === 'unit') {
                var externalId = translation_utils_1.getAttrOrThrow(element, 'id');
                if (this.translations[externalId] !== undefined) {
                    throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, "Duplicated translations for message \"" + externalId + "\"");
                }
                compiler_1.visitAll(this, element.children, { unit: externalId });
            }
            else if (element.name === 'segment') {
                assertTranslationUnit(element, context);
                var targetMessage = element.children.find(isTargetElement);
                if (targetMessage === undefined) {
                    throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, 'Missing required <target> element');
                }
                this.translations[context.unit] = serializeTargetMessage(targetMessage);
            }
            else {
                return compiler_1.visitAll(this, element.children);
            }
        };
        return Xliff2TranslationVisitor;
    }(base_visitor_1.BaseVisitor));
    function assertTranslationUnit(segment, context) {
        if (context === undefined || context.unit === undefined) {
            throw new translation_parse_error_1.TranslationParseError(segment.sourceSpan, 'Invalid <segment> element: should be a child of a <unit> element.');
        }
    }
    function serializeTargetMessage(source) {
        var serializer = new message_serializer_1.MessageSerializer(new target_message_renderer_1.TargetMessageRenderer(), {
            inlineElements: ['cp', 'sc', 'ec', 'mrk', 'sm', 'em'],
            placeholder: { elementName: 'ph', nameAttribute: 'equiv', bodyAttribute: 'disp' },
            placeholderContainer: { elementName: 'pc', startAttribute: 'equivStart', endAttribute: 'equivEnd' }
        });
        return serializer.serialize(translation_utils_1.parseInnerRange(source));
    }
    function isTargetElement(node) {
        return node instanceof compiler_1.Element && node.name === 'target';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveGxpZmYyX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBcUU7SUFFckUsNkJBQTZCO0lBRTdCLHlHQUE0QztJQUM1QywySUFBOEU7SUFDOUUscUpBQXVGO0lBRXZGLG1KQUFnRTtJQUVoRSx1SUFBa0Y7SUFFbEYsSUFBTSxrQkFBa0IsR0FBRywrQ0FBK0MsQ0FBQztJQUUzRTs7Ozs7T0FLRztJQUNIO1FBQUE7UUFjQSxDQUFDO1FBYkMsMENBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsUUFBZ0I7WUFDekMsT0FBTyxDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELHVDQUFLLEdBQUwsVUFBTSxRQUFnQixFQUFFLFFBQWdCO1lBQ3RDLElBQU0sU0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO1lBQ2xDLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQU0sTUFBTSxHQUFHLDhCQUE4QixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0UsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUFvQixRQUFRLDRCQUF3QixDQUFDLENBQUM7YUFDdkU7WUFDRCxPQUFPLE1BQU0sQ0FB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QUMsQ0FBQzthQUN6QztRQUNILENBQUM7UUFDSCwrQkFBQztJQUFELENBQUMsQUE1QkQsQ0FBdUMsMEJBQVcsR0E0QmpEO0lBRUQsU0FBUyxxQkFBcUIsQ0FBQyxPQUFnQixFQUFFLE9BQVk7UUFDM0QsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3ZELE1BQU0sSUFBSSwrQ0FBcUIsQ0FDM0IsT0FBTyxDQUFDLFVBQVUsRUFBRSxtRUFBbUUsQ0FBQyxDQUFDO1NBQzlGO0lBQ0gsQ0FBQztJQUVELFNBQVMsc0JBQXNCLENBQUMsTUFBZTtRQUM3QyxJQUFNLFVBQVUsR0FBRyxJQUFJLHNDQUFpQixDQUFDLElBQUksK0NBQXFCLEVBQUUsRUFBRTtZQUNwRSxjQUFjLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUNyRCxXQUFXLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBQztZQUMvRSxvQkFBb0IsRUFDaEIsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBQztTQUNoRixDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUNBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxTQUFTLGVBQWUsQ0FBQyxJQUFVO1FBQ2pDLE9BQU8sSUFBSSxZQUFZLGtCQUFPLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7SUFDM0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RWxlbWVudCwgTm9kZSwgWG1sUGFyc2VyLCB2aXNpdEFsbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHvJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHtleHRuYW1lfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHtCYXNlVmlzaXRvcn0gZnJvbSAnLi4vYmFzZV92aXNpdG9yJztcbmltcG9ydCB7TWVzc2FnZVNlcmlhbGl6ZXJ9IGZyb20gJy4uL21lc3NhZ2Vfc2VyaWFsaXphdGlvbi9tZXNzYWdlX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtUYXJnZXRNZXNzYWdlUmVuZGVyZXJ9IGZyb20gJy4uL21lc3NhZ2Vfc2VyaWFsaXphdGlvbi90YXJnZXRfbWVzc2FnZV9yZW5kZXJlcic7XG5cbmltcG9ydCB7VHJhbnNsYXRpb25QYXJzZUVycm9yfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlX2Vycm9yJztcbmltcG9ydCB7UGFyc2VkVHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5pbXBvcnQge2dldEF0dHJPclRocm93LCBnZXRBdHRyaWJ1dGUsIHBhcnNlSW5uZXJSYW5nZX0gZnJvbSAnLi90cmFuc2xhdGlvbl91dGlscyc7XG5cbmNvbnN0IFhMSUZGXzJfMF9OU19SRUdFWCA9IC94bWxucz1cInVybjpvYXNpczpuYW1lczp0Yzp4bGlmZjpkb2N1bWVudDoyLjBcIi87XG5cbi8qKlxuICogQSB0cmFuc2xhdGlvbiBwYXJzZXIgdGhhdCBjYW4gbG9hZCB0cmFuc2xhdGlvbnMgZnJvbSBYTElGRiAyIGZpbGVzLlxuICpcbiAqIGh0dHA6Ly9kb2NzLm9hc2lzLW9wZW4ub3JnL3hsaWZmL3hsaWZmLWNvcmUvdjIuMC9vcy94bGlmZi1jb3JlLXYyLjAtb3MuaHRtbFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFhsaWZmMlRyYW5zbGF0aW9uUGFyc2VyIGltcGxlbWVudHMgVHJhbnNsYXRpb25QYXJzZXIge1xuICBjYW5QYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChleHRuYW1lKGZpbGVQYXRoKSA9PT0gJy54bGYnKSAmJiBYTElGRl8yXzBfTlNfUkVHRVgudGVzdChjb250ZW50cyk7XG4gIH1cblxuICBwYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUge1xuICAgIGNvbnN0IHhtbFBhcnNlciA9IG5ldyBYbWxQYXJzZXIoKTtcbiAgICBjb25zdCB4bWwgPSB4bWxQYXJzZXIucGFyc2UoY29udGVudHMsIGZpbGVQYXRoKTtcbiAgICBjb25zdCBidW5kbGUgPSBYbGlmZjJUcmFuc2xhdGlvbkJ1bmRsZVZpc2l0b3IuZXh0cmFjdEJ1bmRsZSh4bWwucm9vdE5vZGVzKTtcbiAgICBpZiAoYnVuZGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIFwiJHtmaWxlUGF0aH1cIiBhcyBYTElGRiAyLjAgZm9ybWF0LmApO1xuICAgIH1cbiAgICByZXR1cm4gYnVuZGxlO1xuICB9XG59XG5cbmludGVyZmFjZSBCdW5kbGVWaXNpdG9yQ29udGV4dCB7XG4gIHBhcnNlZExvY2FsZT86IHN0cmluZztcbn1cblxuY2xhc3MgWGxpZmYyVHJhbnNsYXRpb25CdW5kbGVWaXNpdG9yIGV4dGVuZHMgQmFzZVZpc2l0b3Ige1xuICBwcml2YXRlIGJ1bmRsZTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGV8dW5kZWZpbmVkO1xuXG4gIHN0YXRpYyBleHRyYWN0QnVuZGxlKHhsaWZmOiBOb2RlW10pOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZXx1bmRlZmluZWQge1xuICAgIGNvbnN0IHZpc2l0b3IgPSBuZXcgdGhpcygpO1xuICAgIHZpc2l0QWxsKHZpc2l0b3IsIHhsaWZmLCB7fSk7XG4gICAgcmV0dXJuIHZpc2l0b3IuYnVuZGxlO1xuICB9XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIHtwYXJzZWRMb2NhbGV9OiBCdW5kbGVWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKGVsZW1lbnQubmFtZSA9PT0gJ3hsaWZmJykge1xuICAgICAgcGFyc2VkTG9jYWxlID0gZ2V0QXR0cmlidXRlKGVsZW1lbnQsICd0cmdMYW5nJyk7XG4gICAgICByZXR1cm4gdmlzaXRBbGwodGhpcywgZWxlbWVudC5jaGlsZHJlbiwge3BhcnNlZExvY2FsZX0pO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5uYW1lID09PSAnZmlsZScpIHtcbiAgICAgIHRoaXMuYnVuZGxlID0ge1xuICAgICAgICBsb2NhbGU6IHBhcnNlZExvY2FsZSxcbiAgICAgICAgdHJhbnNsYXRpb25zOiBYbGlmZjJUcmFuc2xhdGlvblZpc2l0b3IuZXh0cmFjdFRyYW5zbGF0aW9ucyhlbGVtZW50KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4sIHtwYXJzZWRMb2NhbGV9KTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgWGxpZmYyVHJhbnNsYXRpb25WaXNpdG9yIGV4dGVuZHMgQmFzZVZpc2l0b3Ige1xuICBwcml2YXRlIHRyYW5zbGF0aW9uczogUmVjb3JkPMm1TWVzc2FnZUlkLCDJtVBhcnNlZFRyYW5zbGF0aW9uPiA9IHt9O1xuXG4gIHN0YXRpYyBleHRyYWN0VHJhbnNsYXRpb25zKGZpbGU6IEVsZW1lbnQpOiBSZWNvcmQ8c3RyaW5nLCDJtVBhcnNlZFRyYW5zbGF0aW9uPiB7XG4gICAgY29uc3QgdmlzaXRvciA9IG5ldyB0aGlzKCk7XG4gICAgdmlzaXRBbGwodmlzaXRvciwgZmlsZS5jaGlsZHJlbik7XG4gICAgcmV0dXJuIHZpc2l0b3IudHJhbnNsYXRpb25zO1xuICB9XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgaWYgKGVsZW1lbnQubmFtZSA9PT0gJ3VuaXQnKSB7XG4gICAgICBjb25zdCBleHRlcm5hbElkID0gZ2V0QXR0ck9yVGhyb3coZWxlbWVudCwgJ2lkJyk7XG4gICAgICBpZiAodGhpcy50cmFuc2xhdGlvbnNbZXh0ZXJuYWxJZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHJhbnNsYXRpb25QYXJzZUVycm9yKFxuICAgICAgICAgICAgZWxlbWVudC5zb3VyY2VTcGFuLCBgRHVwbGljYXRlZCB0cmFuc2xhdGlvbnMgZm9yIG1lc3NhZ2UgXCIke2V4dGVybmFsSWR9XCJgKTtcbiAgICAgIH1cbiAgICAgIHZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4sIHt1bml0OiBleHRlcm5hbElkfSk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm5hbWUgPT09ICdzZWdtZW50Jykge1xuICAgICAgYXNzZXJ0VHJhbnNsYXRpb25Vbml0KGVsZW1lbnQsIGNvbnRleHQpO1xuICAgICAgY29uc3QgdGFyZ2V0TWVzc2FnZSA9IGVsZW1lbnQuY2hpbGRyZW4uZmluZChpc1RhcmdldEVsZW1lbnQpO1xuICAgICAgaWYgKHRhcmdldE1lc3NhZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHJhbnNsYXRpb25QYXJzZUVycm9yKGVsZW1lbnQuc291cmNlU3BhbiwgJ01pc3NpbmcgcmVxdWlyZWQgPHRhcmdldD4gZWxlbWVudCcpO1xuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2xhdGlvbnNbY29udGV4dC51bml0XSA9IHNlcmlhbGl6ZVRhcmdldE1lc3NhZ2UodGFyZ2V0TWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2aXNpdEFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0VHJhbnNsYXRpb25Vbml0KHNlZ21lbnQ6IEVsZW1lbnQsIGNvbnRleHQ6IGFueSkge1xuICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkIHx8IGNvbnRleHQudW5pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFRyYW5zbGF0aW9uUGFyc2VFcnJvcihcbiAgICAgICAgc2VnbWVudC5zb3VyY2VTcGFuLCAnSW52YWxpZCA8c2VnbWVudD4gZWxlbWVudDogc2hvdWxkIGJlIGEgY2hpbGQgb2YgYSA8dW5pdD4gZWxlbWVudC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVUYXJnZXRNZXNzYWdlKHNvdXJjZTogRWxlbWVudCk6IMm1UGFyc2VkVHJhbnNsYXRpb24ge1xuICBjb25zdCBzZXJpYWxpemVyID0gbmV3IE1lc3NhZ2VTZXJpYWxpemVyKG5ldyBUYXJnZXRNZXNzYWdlUmVuZGVyZXIoKSwge1xuICAgIGlubGluZUVsZW1lbnRzOiBbJ2NwJywgJ3NjJywgJ2VjJywgJ21yaycsICdzbScsICdlbSddLFxuICAgIHBsYWNlaG9sZGVyOiB7ZWxlbWVudE5hbWU6ICdwaCcsIG5hbWVBdHRyaWJ1dGU6ICdlcXVpdicsIGJvZHlBdHRyaWJ1dGU6ICdkaXNwJ30sXG4gICAgcGxhY2Vob2xkZXJDb250YWluZXI6XG4gICAgICAgIHtlbGVtZW50TmFtZTogJ3BjJywgc3RhcnRBdHRyaWJ1dGU6ICdlcXVpdlN0YXJ0JywgZW5kQXR0cmlidXRlOiAnZXF1aXZFbmQnfVxuICB9KTtcbiAgcmV0dXJuIHNlcmlhbGl6ZXIuc2VyaWFsaXplKHBhcnNlSW5uZXJSYW5nZShzb3VyY2UpKTtcbn1cblxuZnVuY3Rpb24gaXNUYXJnZXRFbGVtZW50KG5vZGU6IE5vZGUpOiBub2RlIGlzIEVsZW1lbnQge1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgbm9kZS5uYW1lID09PSAndGFyZ2V0Jztcbn1cbiJdfQ==