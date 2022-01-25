(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/output_path", ["require", "exports", "tslib", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getOutputPathFn = void 0;
    var tslib_1 = require("tslib");
    var path_1 = require("path");
    /**
     * Create a function that will compute the absolute path to where a translated file should be
     * written.
     *
     * The special `{{LOCALE}}` marker will be replaced with the locale code of the current translation.
     * @param outputFolder An absolute path to the folder containing this set of translations.
     */
    function getOutputPathFn(outputFolder) {
        var _a = tslib_1.__read(outputFolder.split('{{LOCALE}}'), 2), pre = _a[0], post = _a[1];
        return post === undefined ? function (_locale, relativePath) { return path_1.join(pre, relativePath); } :
            function (locale, relativePath) { return path_1.join(pre + locale + post, relativePath); };
    }
    exports.getOutputPathFn = getOutputPathFn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X3BhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS9vdXRwdXRfcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBUUEsNkJBQTBCO0lBVTFCOzs7Ozs7T0FNRztJQUNILFNBQWdCLGVBQWUsQ0FBQyxZQUE0QjtRQUNwRCxJQUFBLEtBQUEsZUFBYyxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFBLEVBQTdDLEdBQUcsUUFBQSxFQUFFLElBQUksUUFBb0MsQ0FBQztRQUNyRCxPQUFPLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQUMsT0FBTyxFQUFFLFlBQVksSUFBSyxPQUFBLFdBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztZQUNwRCxVQUFDLE1BQU0sRUFBRSxZQUFZLElBQUssT0FBQSxXQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxJQUFJLEVBQUUsWUFBWSxDQUFDLEVBQXZDLENBQXVDLENBQUM7SUFDaEcsQ0FBQztJQUpELDBDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0Fic29sdXRlRnNQYXRofSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcbmltcG9ydCB7am9pbn0gZnJvbSAncGF0aCc7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgcmV0dXJuIGFuIGFic29sdXRlIHBhdGggdG8gd2hlcmUgYSBmaWxlIGlzIHRvIGJlIHdyaXR0ZW4sIGdpdmVuIGEgbG9jYWxlIGFuZFxuICogYSByZWxhdGl2ZSBwYXRoLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dFBhdGhGbiB7XG4gIChsb2NhbGU6IHN0cmluZywgcmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNvbXB1dGUgdGhlIGFic29sdXRlIHBhdGggdG8gd2hlcmUgYSB0cmFuc2xhdGVkIGZpbGUgc2hvdWxkIGJlXG4gKiB3cml0dGVuLlxuICpcbiAqIFRoZSBzcGVjaWFsIGB7e0xPQ0FMRX19YCBtYXJrZXIgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBsb2NhbGUgY29kZSBvZiB0aGUgY3VycmVudCB0cmFuc2xhdGlvbi5cbiAqIEBwYXJhbSBvdXRwdXRGb2xkZXIgQW4gYWJzb2x1dGUgcGF0aCB0byB0aGUgZm9sZGVyIGNvbnRhaW5pbmcgdGhpcyBzZXQgb2YgdHJhbnNsYXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3V0cHV0UGF0aEZuKG91dHB1dEZvbGRlcjogQWJzb2x1dGVGc1BhdGgpOiBPdXRwdXRQYXRoRm4ge1xuICBjb25zdCBbcHJlLCBwb3N0XSA9IG91dHB1dEZvbGRlci5zcGxpdCgne3tMT0NBTEV9fScpO1xuICByZXR1cm4gcG9zdCA9PT0gdW5kZWZpbmVkID8gKF9sb2NhbGUsIHJlbGF0aXZlUGF0aCkgPT4gam9pbihwcmUsIHJlbGF0aXZlUGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxvY2FsZSwgcmVsYXRpdmVQYXRoKSA9PiBqb2luKHByZSArIGxvY2FsZSArIHBvc3QsIHJlbGF0aXZlUGF0aCk7XG59XG4iXX0=