(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "path", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
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
    var XLIFF_1_2_NS_REGEX = /xmlns="urn:oasis:names:tc:xliff:document:1.2"/;
    /**
     * A translation parser that can load XLIFF 1.2 files.
     *
     * http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
     * http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
     *
     */
    var Xliff1TranslationParser = /** @class */ (function () {
        function Xliff1TranslationParser() {
        }
        Xliff1TranslationParser.prototype.canParse = function (filePath, contents) {
            return (path_1.extname(filePath) === '.xlf') && XLIFF_1_2_NS_REGEX.test(contents);
        };
        Xliff1TranslationParser.prototype.parse = function (filePath, contents) {
            var xmlParser = new compiler_1.XmlParser();
            var xml = xmlParser.parse(contents, filePath);
            var bundle = XliffFileElementVisitor.extractBundle(xml.rootNodes);
            if (bundle === undefined) {
                throw new Error("Unable to parse \"" + filePath + "\" as XLIFF 1.2 format.");
            }
            return bundle;
        };
        return Xliff1TranslationParser;
    }());
    exports.Xliff1TranslationParser = Xliff1TranslationParser;
    var XliffFileElementVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XliffFileElementVisitor, _super);
        function XliffFileElementVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XliffFileElementVisitor.extractBundle = function (xliff) {
            var visitor = new this();
            compiler_1.visitAll(visitor, xliff);
            return visitor.bundle;
        };
        XliffFileElementVisitor.prototype.visitElement = function (element) {
            if (element.name === 'file') {
                this.bundle = {
                    locale: translation_utils_1.getAttribute(element, 'target-language'),
                    translations: XliffTranslationVisitor.extractTranslations(element)
                };
            }
            else {
                return compiler_1.visitAll(this, element.children);
            }
        };
        return XliffFileElementVisitor;
    }(base_visitor_1.BaseVisitor));
    var XliffTranslationVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XliffTranslationVisitor, _super);
        function XliffTranslationVisitor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.translations = {};
            return _this;
        }
        XliffTranslationVisitor.extractTranslations = function (file) {
            var visitor = new this();
            compiler_1.visitAll(visitor, file.children);
            return visitor.translations;
        };
        XliffTranslationVisitor.prototype.visitElement = function (element) {
            if (element.name === 'trans-unit') {
                var id = translation_utils_1.getAttrOrThrow(element, 'id');
                if (this.translations[id] !== undefined) {
                    throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, "Duplicated translations for message \"" + id + "\"");
                }
                var targetMessage = element.children.find(isTargetElement);
                if (targetMessage === undefined) {
                    throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, 'Missing required <target> element');
                }
                this.translations[id] = serializeTargetMessage(targetMessage);
            }
            else {
                return compiler_1.visitAll(this, element.children);
            }
        };
        return XliffTranslationVisitor;
    }(base_visitor_1.BaseVisitor));
    function serializeTargetMessage(source) {
        var serializer = new message_serializer_1.MessageSerializer(new target_message_renderer_1.TargetMessageRenderer(), {
            inlineElements: ['g', 'bx', 'ex', 'bpt', 'ept', 'ph', 'it', 'mrk'],
            placeholder: { elementName: 'x', nameAttribute: 'id' }
        });
        return serializer.serialize(translation_utils_1.parseInnerRange(source));
    }
    function isTargetElement(node) {
        return node instanceof compiler_1.Element && node.name === 'target';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYxX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveGxpZmYxX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBcUU7SUFFckUsNkJBQTZCO0lBRTdCLHlHQUE0QztJQUM1QywySUFBOEU7SUFDOUUscUpBQXVGO0lBRXZGLG1KQUFnRTtJQUVoRSx1SUFBa0Y7SUFFbEYsSUFBTSxrQkFBa0IsR0FBRywrQ0FBK0MsQ0FBQztJQUUzRTs7Ozs7O09BTUc7SUFDSDtRQUFBO1FBY0EsQ0FBQztRQWJDLDBDQUFRLEdBQVIsVUFBUyxRQUFnQixFQUFFLFFBQWdCO1lBQ3pDLE9BQU8sQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFFRCx1Q0FBSyxHQUFMLFVBQU0sUUFBZ0IsRUFBRSxRQUFnQjtZQUN0QyxJQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztZQUNsQyxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFNLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBb0IsUUFBUSw0QkFBd0IsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsT0FBTyxNQUFNLENB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SUFFRCxTQUFTLGVBQWUsQ0FBQyxJQUFVO1FBQ2pDLE9BQU8sSUFBSSxZQUFZLGtCQUFPLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7SUFDM0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RWxlbWVudCwgTm9kZSwgWG1sUGFyc2VyLCB2aXNpdEFsbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHvJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHtleHRuYW1lfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHtCYXNlVmlzaXRvcn0gZnJvbSAnLi4vYmFzZV92aXNpdG9yJztcbmltcG9ydCB7TWVzc2FnZVNlcmlhbGl6ZXJ9IGZyb20gJy4uL21lc3NhZ2Vfc2VyaWFsaXphdGlvbi9tZXNzYWdlX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtUYXJnZXRNZXNzYWdlUmVuZGVyZXJ9IGZyb20gJy4uL21lc3NhZ2Vfc2VyaWFsaXphdGlvbi90YXJnZXRfbWVzc2FnZV9yZW5kZXJlcic7XG5cbmltcG9ydCB7VHJhbnNsYXRpb25QYXJzZUVycm9yfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlX2Vycm9yJztcbmltcG9ydCB7UGFyc2VkVHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5pbXBvcnQge2dldEF0dHJPclRocm93LCBnZXRBdHRyaWJ1dGUsIHBhcnNlSW5uZXJSYW5nZX0gZnJvbSAnLi90cmFuc2xhdGlvbl91dGlscyc7XG5cbmNvbnN0IFhMSUZGXzFfMl9OU19SRUdFWCA9IC94bWxucz1cInVybjpvYXNpczpuYW1lczp0Yzp4bGlmZjpkb2N1bWVudDoxLjJcIi87XG5cbi8qKlxuICogQSB0cmFuc2xhdGlvbiBwYXJzZXIgdGhhdCBjYW4gbG9hZCBYTElGRiAxLjIgZmlsZXMuXG4gKlxuICogaHR0cDovL2RvY3Mub2FzaXMtb3Blbi5vcmcveGxpZmYvdjEuMi9vcy94bGlmZi1jb3JlLmh0bWxcbiAqIGh0dHA6Ly9kb2NzLm9hc2lzLW9wZW4ub3JnL3hsaWZmL3YxLjIveGxpZmYtcHJvZmlsZS1odG1sL3hsaWZmLXByb2ZpbGUtaHRtbC0xLjIuaHRtbFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFhsaWZmMVRyYW5zbGF0aW9uUGFyc2VyIGltcGxlbWVudHMgVHJhbnNsYXRpb25QYXJzZXIge1xuICBjYW5QYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChleHRuYW1lKGZpbGVQYXRoKSA9PT0gJy54bGYnKSAmJiBYTElGRl8xXzJfTlNfUkVHRVgudGVzdChjb250ZW50cyk7XG4gIH1cblxuICBwYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUge1xuICAgIGNvbnN0IHhtbFBhcnNlciA9IG5ldyBYbWxQYXJzZXIoKTtcbiAgICBjb25zdCB4bWwgPSB4bWxQYXJzZXIucGFyc2UoY29udGVudHMsIGZpbGVQYXRoKTtcbiAgICBjb25zdCBidW5kbGUgPSBYbGlmZkZpbGVFbGVtZW50VmlzaXRvci5leHRyYWN0QnVuZGxlKHhtbC5yb290Tm9kZXMpO1xuICAgIGlmIChidW5kbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgXCIke2ZpbGVQYXRofVwiIGFzIFhMSUZGIDEuMiBmb3JtYXQuYCk7XG4gICAgfVxuICAgIHJldHVybiBidW5kbGU7XG4gIH1cbn1cblxuY2xhc3MgWGxpZmZGaWxlRWxlbWVudFZpc2l0b3IgZXh0ZW5kcyBCYXNlVmlzaXRvciB7XG4gIHByaXZhdGUgYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZXx1bmRlZmluZWQ7XG5cbiAgc3RhdGljIGV4dHJhY3RCdW5kbGUoeGxpZmY6IE5vZGVbXSk6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdmlzaXRvciA9IG5ldyB0aGlzKCk7XG4gICAgdmlzaXRBbGwodmlzaXRvciwgeGxpZmYpO1xuICAgIHJldHVybiB2aXNpdG9yLmJ1bmRsZTtcbiAgfVxuXG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogYW55IHtcbiAgICBpZiAoZWxlbWVudC5uYW1lID09PSAnZmlsZScpIHtcbiAgICAgIHRoaXMuYnVuZGxlID0ge1xuICAgICAgICBsb2NhbGU6IGdldEF0dHJpYnV0ZShlbGVtZW50LCAndGFyZ2V0LWxhbmd1YWdlJyksXG4gICAgICAgIHRyYW5zbGF0aW9uczogWGxpZmZUcmFuc2xhdGlvblZpc2l0b3IuZXh0cmFjdFRyYW5zbGF0aW9ucyhlbGVtZW50KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4pO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBYbGlmZlRyYW5zbGF0aW9uVmlzaXRvciBleHRlbmRzIEJhc2VWaXNpdG9yIHtcbiAgcHJpdmF0ZSB0cmFuc2xhdGlvbnM6IFJlY29yZDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbj4gPSB7fTtcblxuICBzdGF0aWMgZXh0cmFjdFRyYW5zbGF0aW9ucyhmaWxlOiBFbGVtZW50KTogUmVjb3JkPHN0cmluZywgybVQYXJzZWRUcmFuc2xhdGlvbj4ge1xuICAgIGNvbnN0IHZpc2l0b3IgPSBuZXcgdGhpcygpO1xuICAgIHZpc2l0QWxsKHZpc2l0b3IsIGZpbGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiB2aXNpdG9yLnRyYW5zbGF0aW9ucztcbiAgfVxuXG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogYW55IHtcbiAgICBpZiAoZWxlbWVudC5uYW1lID09PSAndHJhbnMtdW5pdCcpIHtcbiAgICAgIGNvbnN0IGlkID0gZ2V0QXR0ck9yVGhyb3coZWxlbWVudCwgJ2lkJyk7XG4gICAgICBpZiAodGhpcy50cmFuc2xhdGlvbnNbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFRyYW5zbGF0aW9uUGFyc2VFcnJvcihcbiAgICAgICAgICAgIGVsZW1lbnQuc291cmNlU3BhbiwgYER1cGxpY2F0ZWQgdHJhbnNsYXRpb25zIGZvciBtZXNzYWdlIFwiJHtpZH1cImApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXJnZXRNZXNzYWdlID0gZWxlbWVudC5jaGlsZHJlbi5maW5kKGlzVGFyZ2V0RWxlbWVudCk7XG4gICAgICBpZiAodGFyZ2V0TWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBUcmFuc2xhdGlvblBhcnNlRXJyb3IoZWxlbWVudC5zb3VyY2VTcGFuLCAnTWlzc2luZyByZXF1aXJlZCA8dGFyZ2V0PiBlbGVtZW50Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1tpZF0gPSBzZXJpYWxpemVUYXJnZXRNZXNzYWdlKHRhcmdldE1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmlzaXRBbGwodGhpcywgZWxlbWVudC5jaGlsZHJlbik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVRhcmdldE1lc3NhZ2Uoc291cmNlOiBFbGVtZW50KTogybVQYXJzZWRUcmFuc2xhdGlvbiB7XG4gIGNvbnN0IHNlcmlhbGl6ZXIgPSBuZXcgTWVzc2FnZVNlcmlhbGl6ZXIobmV3IFRhcmdldE1lc3NhZ2VSZW5kZXJlcigpLCB7XG4gICAgaW5saW5lRWxlbWVudHM6IFsnZycsICdieCcsICdleCcsICdicHQnLCAnZXB0JywgJ3BoJywgJ2l0JywgJ21yayddLFxuICAgIHBsYWNlaG9sZGVyOiB7ZWxlbWVudE5hbWU6ICd4JywgbmFtZUF0dHJpYnV0ZTogJ2lkJ31cbiAgfSk7XG4gIHJldHVybiBzZXJpYWxpemVyLnNlcmlhbGl6ZShwYXJzZUlubmVyUmFuZ2Uoc291cmNlKSk7XG59XG5cbmZ1bmN0aW9uIGlzVGFyZ2V0RWxlbWVudChub2RlOiBOb2RlKTogbm9kZSBpcyBFbGVtZW50IHtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmIG5vZGUubmFtZSA9PT0gJ3RhcmdldCc7XG59XG4iXX0=