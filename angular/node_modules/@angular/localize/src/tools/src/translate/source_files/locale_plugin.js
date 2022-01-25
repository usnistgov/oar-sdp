(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/source_files/locale_plugin", ["require", "exports", "@babel/types", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeLocalePlugin = void 0;
    var types_1 = require("@babel/types");
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    /**
     * This Babel plugin will replace the following code forms with a string literal containing the
     * given `locale`.
     *
     * * `$localize.locale`                                            -> `"locale"`
     * * `typeof $localize !== "undefined" && $localize.locale`        -> `"locale"`
     * * `xxx && typeof $localize !== "undefined" && $localize.locale` -> `"xxx && locale"`
     * * `$localize.locale || default`                                 -> `"locale" || default`
     *
     * @param locale The name of the locale to inline into the code.
     * @param options Additional options including the name of the `$localize` function.
     * @publicApi used by CLI
     */
    function makeLocalePlugin(locale, _a) {
        var _b = (_a === void 0 ? {} : _a).localizeName, localizeName = _b === void 0 ? '$localize' : _b;
        return {
            visitor: {
                MemberExpression: function (expression) {
                    var obj = expression.get('object');
                    if (!source_file_utils_1.isLocalize(obj, localizeName)) {
                        return;
                    }
                    var property = expression.get('property');
                    if (!property.isIdentifier({ name: 'locale' })) {
                        return;
                    }
                    if (expression.parentPath.isAssignmentExpression() &&
                        expression.parentPath.get('left') === expression) {
                        return;
                    }
                    // Check for the `$localize.locale` being guarded by a check on the existence of
                    // `$localize`.
                    var parent = expression.parentPath;
                    if (parent.isLogicalExpression({ operator: '&&' }) && parent.get('right') === expression) {
                        var left = parent.get('left');
                        if (isLocalizeGuard(left, localizeName)) {
                            // Replace `typeof $localize !== "undefined" && $localize.locale` with
                            // `$localize.locale`
                            parent.replaceWith(expression);
                        }
                        else if (left.isLogicalExpression({ operator: '&&' }) &&
                            isLocalizeGuard(left.get('right'), localizeName)) {
                            // The `$localize` is part of a preceding logical AND.
                            // Replace XXX && typeof $localize !== "undefined" && $localize.locale` with `XXX &&
                            // $localize.locale`
                            left.replaceWith(left.get('left'));
                        }
                    }
                    // Replace the `$localize.locale` with the string literal
                    expression.replaceWith(types_1.stringLiteral(locale));
                }
            }
        };
    }
    exports.makeLocalePlugin = makeLocalePlugin;
    /**
     * Returns true if the expression one of:
     * * `typeof $localize !== "undefined"`
     * * `"undefined" !== typeof $localize`
     * * `typeof $localize != "undefined"`
     * * `"undefined" != typeof $localize`
     *
     * @param expression the expression to check
     * @param localizeName the name of the `$localize` symbol
     */
    function isLocalizeGuard(expression, localizeName) {
        if (!expression.isBinaryExpression() ||
            !(expression.node.operator === '!==' || expression.node.operator === '!=')) {
            return false;
        }
        var left = expression.get('left');
        var right = expression.get('right');
        return (left.isUnaryExpression({ operator: 'typeof' }) &&
            source_file_utils_1.isLocalize(left.get('argument'), localizeName) &&
            right.isStringLiteral({ value: 'undefined' })) ||
            (right.isUnaryExpression({ operator: 'typeof' }) &&
                source_file_utils_1.isLocalize(right.get('argument'), localizeName) &&
                left.isStringLiteral({ value: 'undefined' }));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlX3BsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3NvdXJjZV9maWxlcy9sb2NhbGVfcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFBLHNDQUE2RDtJQUU3RCx1RkFBMkU7SUFFM0U7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsU0FBZ0IsZ0JBQWdCLENBQzVCLE1BQWMsRUFBRSxFQUF5RDtZQUF4RCxzQkFBc0QsRUFBRSxtQkFBOUIsRUFBMUIsWUFBWSxtQkFBRyxXQUFXLEtBQUE7UUFDN0MsT0FBTztZQUNMLE9BQU8sRUFBRTtnQkFDUCxnQkFBZ0IsRUFBaEIsVUFBaUIsVUFBc0M7b0JBQ3JELElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyw4QkFBVSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBRTt3QkFDbEMsT0FBTztxQkFDUjtvQkFDRCxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBYSxDQUFDO29CQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUFFO3dCQUM1QyxPQUFPO3FCQUNSO29CQUNELElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRTt3QkFDOUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUNwRCxPQUFPO3FCQUNSO29CQUNELGdGQUFnRjtvQkFDaEYsZUFBZTtvQkFDZixJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO29CQUNyQyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUN0RixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEVBQUU7NEJBQ3ZDLHNFQUFzRTs0QkFDdEUscUJBQXFCOzRCQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUNoQzs2QkFBTSxJQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs0QkFDMUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQUU7NEJBQ3BELHNEQUFzRDs0QkFDdEQsb0ZBQW9GOzRCQUNwRixvQkFBb0I7NEJBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUNwQztxQkFDRjtvQkFDRCx5REFBeUQ7b0JBQ3pELFVBQVUsQ0FBQyxXQUFXLENBQUMscUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQXhDRCw0Q0F3Q0M7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxTQUFTLGVBQWUsQ0FBQyxVQUFvQixFQUFFLFlBQW9CO1FBQ2pFLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUU7WUFDaEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUM5RSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDNUMsOEJBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQVksQ0FBQztZQUM5QyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7Z0JBQzdDLDhCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxZQUFZLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Tm9kZVBhdGgsIFBsdWdpbk9ian0gZnJvbSAnQGJhYmVsL2NvcmUnO1xuaW1wb3J0IHtNZW1iZXJFeHByZXNzaW9uLCBzdHJpbmdMaXRlcmFsfSBmcm9tICdAYmFiZWwvdHlwZXMnO1xuXG5pbXBvcnQge2lzTG9jYWxpemUsIFRyYW5zbGF0ZVBsdWdpbk9wdGlvbnN9IGZyb20gJy4uLy4uL3NvdXJjZV9maWxlX3V0aWxzJztcblxuLyoqXG4gKiBUaGlzIEJhYmVsIHBsdWdpbiB3aWxsIHJlcGxhY2UgdGhlIGZvbGxvd2luZyBjb2RlIGZvcm1zIHdpdGggYSBzdHJpbmcgbGl0ZXJhbCBjb250YWluaW5nIHRoZVxuICogZ2l2ZW4gYGxvY2FsZWAuXG4gKlxuICogKiBgJGxvY2FsaXplLmxvY2FsZWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0+IGBcImxvY2FsZVwiYFxuICogKiBgdHlwZW9mICRsb2NhbGl6ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAkbG9jYWxpemUubG9jYWxlYCAgICAgICAgLT4gYFwibG9jYWxlXCJgXG4gKiAqIGB4eHggJiYgdHlwZW9mICRsb2NhbGl6ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAkbG9jYWxpemUubG9jYWxlYCAtPiBgXCJ4eHggJiYgbG9jYWxlXCJgXG4gKiAqIGAkbG9jYWxpemUubG9jYWxlIHx8IGRlZmF1bHRgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLT4gYFwibG9jYWxlXCIgfHwgZGVmYXVsdGBcbiAqXG4gKiBAcGFyYW0gbG9jYWxlIFRoZSBuYW1lIG9mIHRoZSBsb2NhbGUgdG8gaW5saW5lIGludG8gdGhlIGNvZGUuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgaW5jbHVkaW5nIHRoZSBuYW1lIG9mIHRoZSBgJGxvY2FsaXplYCBmdW5jdGlvbi5cbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMb2NhbGVQbHVnaW4oXG4gICAgbG9jYWxlOiBzdHJpbmcsIHtsb2NhbGl6ZU5hbWUgPSAnJGxvY2FsaXplJ306IFRyYW5zbGF0ZVBsdWdpbk9wdGlvbnMgPSB7fSk6IFBsdWdpbk9iaiB7XG4gIHJldHVybiB7XG4gICAgdmlzaXRvcjoge1xuICAgICAgTWVtYmVyRXhwcmVzc2lvbihleHByZXNzaW9uOiBOb2RlUGF0aDxNZW1iZXJFeHByZXNzaW9uPikge1xuICAgICAgICBjb25zdCBvYmogPSBleHByZXNzaW9uLmdldCgnb2JqZWN0Jyk7XG4gICAgICAgIGlmICghaXNMb2NhbGl6ZShvYmosIGxvY2FsaXplTmFtZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBleHByZXNzaW9uLmdldCgncHJvcGVydHknKSBhcyBOb2RlUGF0aDtcbiAgICAgICAgaWYgKCFwcm9wZXJ0eS5pc0lkZW50aWZpZXIoe25hbWU6ICdsb2NhbGUnfSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4cHJlc3Npb24ucGFyZW50UGF0aC5pc0Fzc2lnbm1lbnRFeHByZXNzaW9uKCkgJiZcbiAgICAgICAgICAgIGV4cHJlc3Npb24ucGFyZW50UGF0aC5nZXQoJ2xlZnQnKSA9PT0gZXhwcmVzc2lvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIGAkbG9jYWxpemUubG9jYWxlYCBiZWluZyBndWFyZGVkIGJ5IGEgY2hlY2sgb24gdGhlIGV4aXN0ZW5jZSBvZlxuICAgICAgICAvLyBgJGxvY2FsaXplYC5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gZXhwcmVzc2lvbi5wYXJlbnRQYXRoO1xuICAgICAgICBpZiAocGFyZW50LmlzTG9naWNhbEV4cHJlc3Npb24oe29wZXJhdG9yOiAnJiYnfSkgJiYgcGFyZW50LmdldCgncmlnaHQnKSA9PT0gZXhwcmVzc2lvbikge1xuICAgICAgICAgIGNvbnN0IGxlZnQgPSBwYXJlbnQuZ2V0KCdsZWZ0Jyk7XG4gICAgICAgICAgaWYgKGlzTG9jYWxpemVHdWFyZChsZWZ0LCBsb2NhbGl6ZU5hbWUpKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGB0eXBlb2YgJGxvY2FsaXplICE9PSBcInVuZGVmaW5lZFwiICYmICRsb2NhbGl6ZS5sb2NhbGVgIHdpdGhcbiAgICAgICAgICAgIC8vIGAkbG9jYWxpemUubG9jYWxlYFxuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VXaXRoKGV4cHJlc3Npb24pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGxlZnQuaXNMb2dpY2FsRXhwcmVzc2lvbih7b3BlcmF0b3I6ICcmJid9KSAmJlxuICAgICAgICAgICAgICBpc0xvY2FsaXplR3VhcmQobGVmdC5nZXQoJ3JpZ2h0JyksIGxvY2FsaXplTmFtZSkpIHtcbiAgICAgICAgICAgIC8vIFRoZSBgJGxvY2FsaXplYCBpcyBwYXJ0IG9mIGEgcHJlY2VkaW5nIGxvZ2ljYWwgQU5ELlxuICAgICAgICAgICAgLy8gUmVwbGFjZSBYWFggJiYgdHlwZW9mICRsb2NhbGl6ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAkbG9jYWxpemUubG9jYWxlYCB3aXRoIGBYWFggJiZcbiAgICAgICAgICAgIC8vICRsb2NhbGl6ZS5sb2NhbGVgXG4gICAgICAgICAgICBsZWZ0LnJlcGxhY2VXaXRoKGxlZnQuZ2V0KCdsZWZ0JykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBgJGxvY2FsaXplLmxvY2FsZWAgd2l0aCB0aGUgc3RyaW5nIGxpdGVyYWxcbiAgICAgICAgZXhwcmVzc2lvbi5yZXBsYWNlV2l0aChzdHJpbmdMaXRlcmFsKGxvY2FsZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGV4cHJlc3Npb24gb25lIG9mOlxuICogKiBgdHlwZW9mICRsb2NhbGl6ZSAhPT0gXCJ1bmRlZmluZWRcImBcbiAqICogYFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiAkbG9jYWxpemVgXG4gKiAqIGB0eXBlb2YgJGxvY2FsaXplICE9IFwidW5kZWZpbmVkXCJgXG4gKiAqIGBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiAkbG9jYWxpemVgXG4gKlxuICogQHBhcmFtIGV4cHJlc3Npb24gdGhlIGV4cHJlc3Npb24gdG8gY2hlY2tcbiAqIEBwYXJhbSBsb2NhbGl6ZU5hbWUgdGhlIG5hbWUgb2YgdGhlIGAkbG9jYWxpemVgIHN5bWJvbFxuICovXG5mdW5jdGlvbiBpc0xvY2FsaXplR3VhcmQoZXhwcmVzc2lvbjogTm9kZVBhdGgsIGxvY2FsaXplTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmICghZXhwcmVzc2lvbi5pc0JpbmFyeUV4cHJlc3Npb24oKSB8fFxuICAgICAgIShleHByZXNzaW9uLm5vZGUub3BlcmF0b3IgPT09ICchPT0nIHx8IGV4cHJlc3Npb24ubm9kZS5vcGVyYXRvciA9PT0gJyE9JykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbGVmdCA9IGV4cHJlc3Npb24uZ2V0KCdsZWZ0Jyk7XG4gIGNvbnN0IHJpZ2h0ID0gZXhwcmVzc2lvbi5nZXQoJ3JpZ2h0Jyk7XG5cbiAgcmV0dXJuIChsZWZ0LmlzVW5hcnlFeHByZXNzaW9uKHtvcGVyYXRvcjogJ3R5cGVvZid9KSAmJlxuICAgICAgICAgIGlzTG9jYWxpemUobGVmdC5nZXQoJ2FyZ3VtZW50JyksIGxvY2FsaXplTmFtZSkgJiZcbiAgICAgICAgICByaWdodC5pc1N0cmluZ0xpdGVyYWwoe3ZhbHVlOiAndW5kZWZpbmVkJ30pKSB8fFxuICAgICAgKHJpZ2h0LmlzVW5hcnlFeHByZXNzaW9uKHtvcGVyYXRvcjogJ3R5cGVvZid9KSAmJlxuICAgICAgIGlzTG9jYWxpemUocmlnaHQuZ2V0KCdhcmd1bWVudCcpLCBsb2NhbGl6ZU5hbWUpICYmXG4gICAgICAgbGVmdC5pc1N0cmluZ0xpdGVyYWwoe3ZhbHVlOiAndW5kZWZpbmVkJ30pKTtcbn1cbiJdfQ==