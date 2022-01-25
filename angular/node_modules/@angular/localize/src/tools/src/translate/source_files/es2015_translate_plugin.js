(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/source_files/es2015_translate_plugin", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeEs2015TranslatePlugin = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    /**
     * Create a Babel plugin that can be used to do compile-time translation of `$localize` tagged
     * messages.
     *
     * @publicApi used by CLI
     */
    function makeEs2015TranslatePlugin(diagnostics, translations, _a, fs) {
        var _b = _a === void 0 ? {} : _a, _c = _b.missingTranslation, missingTranslation = _c === void 0 ? 'error' : _c, _d = _b.localizeName, localizeName = _d === void 0 ? '$localize' : _d;
        if (fs === void 0) { fs = file_system_1.getFileSystem(); }
        return {
            visitor: {
                TaggedTemplateExpression: function (path) {
                    try {
                        var tag = path.get('tag');
                        if (source_file_utils_1.isLocalize(tag, localizeName)) {
                            var _a = tslib_1.__read(source_file_utils_1.unwrapMessagePartsFromTemplateLiteral(path.get('quasi').get('quasis'), fs), 1), messageParts = _a[0];
                            var translated = source_file_utils_1.translate(diagnostics, translations, messageParts, path.node.quasi.expressions, missingTranslation);
                            path.replaceWith(source_file_utils_1.buildLocalizeReplacement(translated[0], translated[1]));
                        }
                    }
                    catch (e) {
                        if (source_file_utils_1.isBabelParseError(e)) {
                            // If we get a BabelParseError here then something went wrong with Babel itself
                            // since there must be something wrong with the structure of the AST generated
                            // by Babel parsing a TaggedTemplateExpression.
                            throw source_file_utils_1.buildCodeFrameError(path, e);
                        }
                        else {
                            throw e;
                        }
                    }
                }
            }
        };
    }
    exports.makeEs2015TranslatePlugin = makeEs2015TranslatePlugin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXMyMDE1X3RyYW5zbGF0ZV9wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS9zb3VyY2VfZmlsZXMvZXMyMDE1X3RyYW5zbGF0ZV9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDJFQUFzRjtJQU90Rix1RkFBK0w7SUFFL0w7Ozs7O09BS0c7SUFDSCxTQUFnQix5QkFBeUIsQ0FDckMsV0FBd0IsRUFBRSxZQUFnRCxFQUMxRSxFQUF1RixFQUN2RixFQUFnQztZQURoQyxxQkFBcUYsRUFBRSxLQUFBLEVBQXRGLDBCQUE0QixFQUE1QixrQkFBa0IsbUJBQUcsT0FBTyxLQUFBLEVBQUUsb0JBQTBCLEVBQTFCLFlBQVksbUJBQUcsV0FBVyxLQUFBO1FBQ3pELG1CQUFBLEVBQUEsS0FBaUIsMkJBQWEsRUFBRTtRQUNsQyxPQUFPO1lBQ0wsT0FBTyxFQUFFO2dCQUNQLHdCQUF3QixFQUF4QixVQUF5QixJQUF3QztvQkFDL0QsSUFBSTt3QkFDRixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM1QixJQUFJLDhCQUFVLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxFQUFFOzRCQUMzQixJQUFBLEtBQUEsZUFDRix5REFBcUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBQSxFQUR2RSxZQUFZLFFBQzJELENBQUM7NEJBQy9FLElBQU0sVUFBVSxHQUFHLDZCQUFTLENBQ3hCLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDcEUsa0JBQWtCLENBQUMsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0Q0FBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUU7cUJBQ0Y7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsSUFBSSxxQ0FBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDeEIsK0VBQStFOzRCQUMvRSw4RUFBOEU7NEJBQzlFLCtDQUErQzs0QkFDL0MsTUFBTSx1Q0FBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3BDOzZCQUFNOzRCQUNMLE1BQU0sQ0FBQyxDQUFDO3lCQUNUO3FCQUNGO2dCQUNILENBQUM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBOUJELDhEQThCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtGaWxlU3lzdGVtLCBnZXRGaWxlU3lzdGVtfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcbmltcG9ydCB7ybVQYXJzZWRUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHtOb2RlUGF0aCwgUGx1Z2luT2JqfSBmcm9tICdAYmFiZWwvY29yZSc7XG5pbXBvcnQge1RhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbn0gZnJvbSAnQGJhYmVsL3R5cGVzJztcblxuaW1wb3J0IHtEaWFnbm9zdGljc30gZnJvbSAnLi4vLi4vZGlhZ25vc3RpY3MnO1xuXG5pbXBvcnQge2J1aWxkQ29kZUZyYW1lRXJyb3IsIGJ1aWxkTG9jYWxpemVSZXBsYWNlbWVudCwgaXNCYWJlbFBhcnNlRXJyb3IsIGlzTG9jYWxpemUsIHRyYW5zbGF0ZSwgVHJhbnNsYXRlUGx1Z2luT3B0aW9ucywgdW53cmFwTWVzc2FnZVBhcnRzRnJvbVRlbXBsYXRlTGl0ZXJhbH0gZnJvbSAnLi4vLi4vc291cmNlX2ZpbGVfdXRpbHMnO1xuXG4vKipcbiAqIENyZWF0ZSBhIEJhYmVsIHBsdWdpbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGRvIGNvbXBpbGUtdGltZSB0cmFuc2xhdGlvbiBvZiBgJGxvY2FsaXplYCB0YWdnZWRcbiAqIG1lc3NhZ2VzLlxuICpcbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFczIwMTVUcmFuc2xhdGVQbHVnaW4oXG4gICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCB0cmFuc2xhdGlvbnM6IFJlY29yZDxzdHJpbmcsIMm1UGFyc2VkVHJhbnNsYXRpb24+LFxuICAgIHttaXNzaW5nVHJhbnNsYXRpb24gPSAnZXJyb3InLCBsb2NhbGl6ZU5hbWUgPSAnJGxvY2FsaXplJ306IFRyYW5zbGF0ZVBsdWdpbk9wdGlvbnMgPSB7fSxcbiAgICBmczogRmlsZVN5c3RlbSA9IGdldEZpbGVTeXN0ZW0oKSk6IFBsdWdpbk9iaiB7XG4gIHJldHVybiB7XG4gICAgdmlzaXRvcjoge1xuICAgICAgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uKHBhdGg6IE5vZGVQYXRoPFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbj4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB0YWcgPSBwYXRoLmdldCgndGFnJyk7XG4gICAgICAgICAgaWYgKGlzTG9jYWxpemUodGFnLCBsb2NhbGl6ZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBbbWVzc2FnZVBhcnRzXSA9XG4gICAgICAgICAgICAgICAgdW53cmFwTWVzc2FnZVBhcnRzRnJvbVRlbXBsYXRlTGl0ZXJhbChwYXRoLmdldCgncXVhc2knKS5nZXQoJ3F1YXNpcycpLCBmcyk7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVkID0gdHJhbnNsYXRlKFxuICAgICAgICAgICAgICAgIGRpYWdub3N0aWNzLCB0cmFuc2xhdGlvbnMsIG1lc3NhZ2VQYXJ0cywgcGF0aC5ub2RlLnF1YXNpLmV4cHJlc3Npb25zLFxuICAgICAgICAgICAgICAgIG1pc3NpbmdUcmFuc2xhdGlvbik7XG4gICAgICAgICAgICBwYXRoLnJlcGxhY2VXaXRoKGJ1aWxkTG9jYWxpemVSZXBsYWNlbWVudCh0cmFuc2xhdGVkWzBdLCB0cmFuc2xhdGVkWzFdKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGlzQmFiZWxQYXJzZUVycm9yKGUpKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBnZXQgYSBCYWJlbFBhcnNlRXJyb3IgaGVyZSB0aGVuIHNvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggQmFiZWwgaXRzZWxmXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGVyZSBtdXN0IGJlIHNvbWV0aGluZyB3cm9uZyB3aXRoIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIEFTVCBnZW5lcmF0ZWRcbiAgICAgICAgICAgIC8vIGJ5IEJhYmVsIHBhcnNpbmcgYSBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24uXG4gICAgICAgICAgICB0aHJvdyBidWlsZENvZGVGcmFtZUVycm9yKHBhdGgsIGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==