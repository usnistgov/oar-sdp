(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "path", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
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
    /**
     * A translation parser that can load XB files.
     */
    var XtbTranslationParser = /** @class */ (function () {
        function XtbTranslationParser(diagnostics) {
            this.diagnostics = diagnostics;
        }
        XtbTranslationParser.prototype.canParse = function (filePath, contents) {
            var extension = path_1.extname(filePath);
            return (extension === '.xtb' || extension === '.xmb') &&
                contents.includes('<translationbundle');
        };
        XtbTranslationParser.prototype.parse = function (filePath, contents) {
            var xmlParser = new compiler_1.XmlParser();
            var xml = xmlParser.parse(contents, filePath);
            var bundle = XtbVisitor.extractBundle(this.diagnostics, xml.rootNodes);
            if (bundle === undefined) {
                throw new Error("Unable to parse \"" + filePath + "\" as XTB/XMB format.");
            }
            return bundle;
        };
        return XtbTranslationParser;
    }());
    exports.XtbTranslationParser = XtbTranslationParser;
    var XtbVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XtbVisitor, _super);
        function XtbVisitor(diagnostics) {
            var _this = _super.call(this) || this;
            _this.diagnostics = diagnostics;
            return _this;
        }
        XtbVisitor.extractBundle = function (diagnostics, messageBundles) {
            var visitor = new this(diagnostics);
            var bundles = compiler_1.visitAll(visitor, messageBundles, undefined);
            return bundles[0];
        };
        XtbVisitor.prototype.visitElement = function (element, bundle) {
            switch (element.name) {
                case 'translationbundle':
                    if (bundle) {
                        throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, '<translationbundle> elements can not be nested');
                    }
                    var langAttr = element.attrs.find(function (attr) { return attr.name === 'lang'; });
                    bundle = { locale: langAttr && langAttr.value, translations: {} };
                    compiler_1.visitAll(this, element.children, bundle);
                    return bundle;
                case 'translation':
                    if (!bundle) {
                        throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, '<translation> must be inside a <translationbundle>');
                    }
                    var id = translation_utils_1.getAttrOrThrow(element, 'id');
                    if (bundle.translations.hasOwnProperty(id)) {
                        throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, "Duplicated translations for message \"" + id + "\"");
                    }
                    else {
                        try {
                            bundle.translations[id] = serializeTargetMessage(element);
                        }
                        catch (error) {
                            if (typeof error === 'string') {
                                this.diagnostics.warn("Could not parse message with id \"" + id + "\" - perhaps it has an unrecognised ICU format?\n" +
                                    error);
                            }
                            else {
                                throw error;
                            }
                        }
                    }
                    break;
                default:
                    throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, 'Unexpected tag');
            }
        };
        return XtbVisitor;
    }(base_visitor_1.BaseVisitor));
    function serializeTargetMessage(source) {
        var serializer = new message_serializer_1.MessageSerializer(new target_message_renderer_1.TargetMessageRenderer(), { inlineElements: [], placeholder: { elementName: 'ph', nameAttribute: 'name' } });
        return serializer.serialize(translation_utils_1.parseInnerRange(source));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRiX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveHRiX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBcUU7SUFFckUsNkJBQTZCO0lBRzdCLHlHQUE0QztJQUM1QywySUFBOEU7SUFDOUUscUpBQXVGO0lBRXZGLG1KQUFnRTtJQUVoRSx1SUFBb0U7SUFJcEU7O09BRUc7SUFDSDtRQUNFLDhCQUFvQixXQUF3QjtZQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFHLENBQUM7UUFFaEQsdUNBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsUUFBZ0I7WUFDekMsSUFBTSxTQUFTLEdBQUcsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUM7Z0JBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQsb0NBQUssR0FBTCxVQUFNLFFBQWdCLEVBQUUsUUFBZ0I7WUFDdEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7WUFDbEMsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLE1BQU0s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QUUsTUFBTSxFQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ25GLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxtQ0FBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RWxlbWVudCwgTm9kZSwgWG1sUGFyc2VyLCB2aXNpdEFsbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHvJtVBhcnNlZFRyYW5zbGF0aW9ufSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5pbXBvcnQge2V4dG5hbWV9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi8uLi9kaWFnbm9zdGljcyc7XG5pbXBvcnQge0Jhc2VWaXNpdG9yfSBmcm9tICcuLi9iYXNlX3Zpc2l0b3InO1xuaW1wb3J0IHtNZXNzYWdlU2VyaWFsaXplcn0gZnJvbSAnLi4vbWVzc2FnZV9zZXJpYWxpemF0aW9uL21lc3NhZ2Vfc2VyaWFsaXplcic7XG5pbXBvcnQge1RhcmdldE1lc3NhZ2VSZW5kZXJlcn0gZnJvbSAnLi4vbWVzc2FnZV9zZXJpYWxpemF0aW9uL3RhcmdldF9tZXNzYWdlX3JlbmRlcmVyJztcblxuaW1wb3J0IHtUcmFuc2xhdGlvblBhcnNlRXJyb3J9IGZyb20gJy4vdHJhbnNsYXRpb25fcGFyc2VfZXJyb3InO1xuaW1wb3J0IHtQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSwgVHJhbnNsYXRpb25QYXJzZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fcGFyc2VyJztcbmltcG9ydCB7Z2V0QXR0ck9yVGhyb3csIHBhcnNlSW5uZXJSYW5nZX0gZnJvbSAnLi90cmFuc2xhdGlvbl91dGlscyc7XG5cblxuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gcGFyc2VyIHRoYXQgY2FuIGxvYWQgWEIgZmlsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBYdGJUcmFuc2xhdGlvblBhcnNlciBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uUGFyc2VyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFnbm9zdGljczogRGlhZ25vc3RpY3MpIHt9XG5cbiAgY2FuUGFyc2UoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGV4dG5hbWUoZmlsZVBhdGgpO1xuICAgIHJldHVybiAoZXh0ZW5zaW9uID09PSAnLnh0YicgfHwgZXh0ZW5zaW9uID09PSAnLnhtYicpICYmXG4gICAgICAgIGNvbnRlbnRzLmluY2x1ZGVzKCc8dHJhbnNsYXRpb25idW5kbGUnKTtcbiAgfVxuXG4gIHBhcnNlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgY29uc3QgeG1sUGFyc2VyID0gbmV3IFhtbFBhcnNlcigpO1xuICAgIGNvbnN0IHhtbCA9IHhtbFBhcnNlci5wYXJzZShjb250ZW50cywgZmlsZVBhdGgpO1xuICAgIGNvbnN0IGJ1bmRsZSA9IFh0YlZpc2l0b3IuZXh0cmFjdEJ1bmRsZSh0aGlzLmRpYWdub3N0aWNzLCB4bWwucm9vdE5vZGVzKTtcbiAgICBpZiAoYnVuZGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIFwiJHtmaWxlUGF0aH1cIiBhcyBYVEIvWE1CIGZvcm1hdC5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1bmRsZTtcbiAgfVxufVxuXG5jbGFzcyBYdGJWaXNpdG9yIGV4dGVuZHMgQmFzZVZpc2l0b3Ige1xuICBzdGF0aWMgZXh0cmFjdEJ1bmRsZShkaWFnbm9zdGljczogRGlhZ25vc3RpY3MsIG1lc3NhZ2VCdW5kbGVzOiBOb2RlW10pOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZVxuICAgICAgfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdmlzaXRvciA9IG5ldyB0aGlzKGRpYWdub3N0aWNzKTtcbiAgICBjb25zdCBidW5kbGVzOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZVtdID0gdmlzaXRBbGwodmlzaXRvciwgbWVzc2FnZUJ1bmRsZXMsIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIGJ1bmRsZXNbMF07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWdub3N0aWNzOiBEaWFnbm9zdGljcykgeyBzdXBlcigpOyB9XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGJ1bmRsZTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGV8dW5kZWZpbmVkKTogYW55IHtcbiAgICBzd2l0Y2ggKGVsZW1lbnQubmFtZSkge1xuICAgICAgY2FzZSAndHJhbnNsYXRpb25idW5kbGUnOlxuICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFRyYW5zbGF0aW9uUGFyc2VFcnJvcihcbiAgICAgICAgICAgICAgZWxlbWVudC5zb3VyY2VTcGFuLCAnPHRyYW5zbGF0aW9uYnVuZGxlPiBlbGVtZW50cyBjYW4gbm90IGJlIG5lc3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhbmdBdHRyID0gZWxlbWVudC5hdHRycy5maW5kKChhdHRyKSA9PiBhdHRyLm5hbWUgPT09ICdsYW5nJyk7XG4gICAgICAgIGJ1bmRsZSA9IHtsb2NhbGU6IGxhbmdBdHRyICYmIGxhbmdBdHRyLnZhbHVlLCB0cmFuc2xhdGlvbnM6IHt9fTtcbiAgICAgICAgdmlzaXRBbGwodGhpcywgZWxlbWVudC5jaGlsZHJlbiwgYnVuZGxlKTtcbiAgICAgICAgcmV0dXJuIGJ1bmRsZTtcblxuICAgICAgY2FzZSAndHJhbnNsYXRpb24nOlxuICAgICAgICBpZiAoIWJ1bmRsZSkge1xuICAgICAgICAgIHRocm93IG5ldyBUcmFuc2xhdGlvblBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgIGVsZW1lbnQuc291cmNlU3BhbiwgJzx0cmFuc2xhdGlvbj4gbXVzdCBiZSBpbnNpZGUgYSA8dHJhbnNsYXRpb25idW5kbGU+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWQgPSBnZXRBdHRyT3JUaHJvdyhlbGVtZW50LCAnaWQnKTtcbiAgICAgICAgaWYgKGJ1bmRsZS50cmFuc2xhdGlvbnMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFRyYW5zbGF0aW9uUGFyc2VFcnJvcihcbiAgICAgICAgICAgICAgZWxlbWVudC5zb3VyY2VTcGFuLCBgRHVwbGljYXRlZCB0cmFuc2xhdGlvbnMgZm9yIG1lc3NhZ2UgXCIke2lkfVwiYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGJ1bmRsZS50cmFuc2xhdGlvbnNbaWRdID0gc2VyaWFsaXplVGFyZ2V0TWVzc2FnZShlbGVtZW50KTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy53YXJuKFxuICAgICAgICAgICAgICAgICAgYENvdWxkIG5vdCBwYXJzZSBtZXNzYWdlIHdpdGggaWQgXCIke2lkfVwiIC0gcGVyaGFwcyBpdCBoYXMgYW4gdW5yZWNvZ25pc2VkIElDVSBmb3JtYXQ/XFxuYCArXG4gICAgICAgICAgICAgICAgICBlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUcmFuc2xhdGlvblBhcnNlRXJyb3IoZWxlbWVudC5zb3VyY2VTcGFuLCAnVW5leHBlY3RlZCB0YWcnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplVGFyZ2V0TWVzc2FnZShzb3VyY2U6IEVsZW1lbnQpOiDJtVBhcnNlZFRyYW5zbGF0aW9uIHtcbiAgY29uc3Qgc2VyaWFsaXplciA9IG5ldyBNZXNzYWdlU2VyaWFsaXplcihcbiAgICAgIG5ldyBUYXJnZXRNZXNzYWdlUmVuZGVyZXIoKSxcbiAgICAgIHtpbmxpbmVFbGVtZW50czogW10sIHBsYWNlaG9sZGVyOiB7ZWxlbWVudE5hbWU6ICdwaCcsIG5hbWVBdHRyaWJ1dGU6ICduYW1lJ319KTtcbiAgcmV0dXJuIHNlcmlhbGl6ZXIuc2VyaWFsaXplKHBhcnNlSW5uZXJSYW5nZShzb3VyY2UpKTtcbn1cbiJdfQ==