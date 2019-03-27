"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const webpackDevMiddleware = require('webpack-dev-middleware');
const karma_webpack_failure_cb_1 = require("./karma-webpack-failure-cb");
/**
 * Enumerate needed (but not require/imported) dependencies from this file
 *  to let the dependency validator know they are used.
 *
 * require('source-map-support')
 * require('karma-source-map-support')
 */
let blocked = [];
let isBlocked = false;
let webpackMiddleware;
let successCb;
let failureCb;
// Add files to the Karma files array.
function addKarmaFiles(files, newFiles, prepend = false) {
    const defaults = {
        included: true,
        served: true,
        watched: true
    };
    const processedFiles = newFiles
        // Remove globs that do not match any files, otherwise Karma will show a warning for these.
        .filter(file => glob.sync(file.pattern, { nodir: true }).length != 0)
        // Fill in pattern properties with defaults.
        .map(file => (Object.assign({}, defaults, file)));
    // It's important to not replace the array, because
    // karma already has a reference to the existing array.
    if (prepend) {
        files.unshift(...processedFiles);
    }
    else {
        files.push(...processedFiles);
    }
}
const init = (config, emitter, customFileHandlers) => {
    if (!config.buildWebpack) {
        throw new Error(`The '@angular-devkit/build-angular/plugins/karma' karma plugin is meant to` +
            ` be used from within Angular CLI and will not work correctly outside of it.`);
    }
    const options = config.buildWebpack.options;
    const projectRoot = config.buildWebpack.projectRoot;
    successCb = config.buildWebpack.successCb;
    failureCb = config.buildWebpack.failureCb;
    config.reporters.unshift('@angular-devkit/build-angular--event-reporter');
    // When using code-coverage, auto-add coverage-istanbul.
    config.reporters = config.reporters || [];
    if (options.codeCoverage && config.reporters.indexOf('coverage-istanbul') === -1) {
        config.reporters.unshift('coverage-istanbul');
    }
    // Add a reporter that fixes sourcemap urls.
    if (options.sourceMap) {
        config.reporters.unshift('@angular-devkit/build-angular--sourcemap-reporter');
        // Code taken from https://github.com/tschaub/karma-source-map-support.
        // We can't use it directly because we need to add it conditionally in this file, and karma
        // frameworks cannot be added dynamically.
        const smsPath = path.dirname(require.resolve('source-map-support'));
        const ksmsPath = path.dirname(require.resolve('karma-source-map-support'));
        addKarmaFiles(config.files, [
            { pattern: path.join(smsPath, 'browser-source-map-support.js'), watched: false },
            { pattern: path.join(ksmsPath, 'client.js'), watched: false }
        ], true);
    }
    // Add webpack config.
    const webpackConfig = config.buildWebpack.webpackConfig;
    const webpackMiddlewareConfig = {
        logLevel: 'error',
        watchOptions: { poll: options.poll },
        publicPath: '/_karma_webpack_/',
    };
    const compilationErrorCb = (error, errors) => {
        // Notify potential listeners of the compile error
        emitter.emit('compile_error', errors);
        // Finish Karma run early in case of compilation error.
        emitter.emit('run_complete', [], { exitCode: 1 });
        // Unblock any karma requests (potentially started using `karma run`)
        unblock();
    };
    webpackConfig.plugins.push(new karma_webpack_failure_cb_1.KarmaWebpackFailureCb(compilationErrorCb));
    // Use existing config if any.
    config.webpack = Object.assign(webpackConfig, config.webpack);
    config.webpackMiddleware = Object.assign(webpackMiddlewareConfig, config.webpackMiddleware);
    // Our custom context and debug files list the webpack bundles directly instead of using
    // the karma files array.
    config.customContextFile = `${__dirname}/karma-context.html`;
    config.customDebugFile = `${__dirname}/karma-debug.html`;
    // Add the request blocker and the webpack server fallback.
    config.beforeMiddleware = config.beforeMiddleware || [];
    config.beforeMiddleware.push('@angular-devkit/build-angular--blocker');
    config.middleware = config.middleware || [];
    config.middleware.push('@angular-devkit/build-angular--fallback');
    // The webpack tier owns the watch behavior so we want to force it in the config.
    webpackConfig.watch = !config.singleRun;
    if (config.singleRun) {
        // There's no option to turn off file watching in webpack-dev-server, but
        // we can override the file watcher instead.
        webpackConfig.plugins.unshift({
            apply: (compiler) => {
                compiler.hooks.afterEnvironment.tap('karma', () => {
                    compiler.watchFileSystem = { watch: () => { } };
                });
            },
        });
    }
    // Files need to be served from a custom path for Karma.
    webpackConfig.output.path = '/_karma_webpack_/';
    webpackConfig.output.publicPath = '/_karma_webpack_/';
    webpackConfig.output.devtoolModuleFilenameTemplate = '[namespace]/[resource-path]?[loaders]';
    let compiler;
    try {
        compiler = webpack(webpackConfig);
    }
    catch (e) {
        console.error(e.stack || e);
        if (e.details) {
            console.error(e.details);
        }
        throw e;
    }
    function handler(callback) {
        isBlocked = true;
        if (typeof callback === 'function') {
            callback();
        }
    }
    compiler.hooks.invalid.tap('karma', () => handler());
    compiler.hooks.watchRun.tapAsync('karma', (_, callback) => handler(callback));
    compiler.hooks.run.tapAsync('karma', (_, callback) => handler(callback));
    function unblock() {
        isBlocked = false;
        blocked.forEach((cb) => cb());
        blocked = [];
    }
    compiler.hooks.done.tap('karma', (stats) => {
        // Don't refresh karma when there are webpack errors.
        if (stats.compilation.errors.length === 0) {
            emitter.refreshFiles();
        }
        unblock();
    });
    webpackMiddleware = new webpackDevMiddleware(compiler, webpackMiddlewareConfig);
    // Forward requests to webpack server.
    customFileHandlers.push({
        urlRegex: /^\/_karma_webpack_\/.*/,
        handler: function handler(req, res) {
            webpackMiddleware(req, res, function () {
                // Ensure script and style bundles are served.
                // They are mentioned in the custom karma context page and we don't want them to 404.
                const alwaysServe = [
                    '/_karma_webpack_/runtime.js',
                    '/_karma_webpack_/polyfills.js',
                    '/_karma_webpack_/scripts.js',
                    '/_karma_webpack_/styles.js',
                    '/_karma_webpack_/vendor.js',
                ];
                if (alwaysServe.indexOf(req.url) != -1) {
                    res.statusCode = 200;
                    res.end();
                }
                else {
                    res.statusCode = 404;
                    res.end('Not found');
                }
            });
        }
    });
    emitter.on('exit', (done) => {
        webpackMiddleware.close();
        done();
    });
};
init.$inject = ['config', 'emitter', 'customFileHandlers'];
// Block requests until the Webpack compilation is done.
function requestBlocker() {
    return function (_request, _response, next) {
        if (isBlocked) {
            blocked.push(next);
        }
        else {
            next();
        }
    };
}
// Copied from "karma-jasmine-diff-reporter" source code:
// In case, when multiple reporters are used in conjunction
// with initSourcemapReporter, they both will show repetitive log
// messages when displaying everything that supposed to write to terminal.
// So just suppress any logs from initSourcemapReporter by doing nothing on
// browser log, because it is an utility reporter,
// unless it's alone in the "reporters" option and base reporter is used.
function muteDuplicateReporterLogging(context, config) {
    context.writeCommonMsg = function () { };
    const reporterName = '@angular/cli';
    const hasTrailingReporters = config.reporters.slice(-1).pop() !== reporterName;
    if (hasTrailingReporters) {
        context.writeCommonMsg = function () { };
    }
}
// Emits builder events.
const eventReporter = function (baseReporterDecorator, config) {
    baseReporterDecorator(this);
    muteDuplicateReporterLogging(this, config);
    this.onRunComplete = function (_browsers, results) {
        if (results.exitCode === 0) {
            successCb && successCb();
        }
        else {
            failureCb && failureCb();
        }
    };
    // avoid duplicate failure message
    this.specFailure = () => { };
};
eventReporter.$inject = ['baseReporterDecorator', 'config'];
// Strip the server address and webpack scheme (webpack://) from error log.
const sourceMapReporter = function (baseReporterDecorator, config) {
    baseReporterDecorator(this);
    muteDuplicateReporterLogging(this, config);
    const urlRegexp = /\(http:\/\/localhost:\d+\/_karma_webpack_\/webpack:\//gi;
    this.onSpecComplete = function (_browser, result) {
        if (!result.success && result.log.length > 0) {
            result.log.forEach((log, idx) => {
                result.log[idx] = log.replace(urlRegexp, '');
            });
        }
    };
    // avoid duplicate complete message
    this.onRunComplete = () => { };
    // avoid duplicate failure message
    this.specFailure = () => { };
};
sourceMapReporter.$inject = ['baseReporterDecorator', 'config'];
// When a request is not found in the karma server, try looking for it from the webpack server root.
function fallbackMiddleware() {
    return function (req, res, next) {
        if (webpackMiddleware) {
            const webpackUrl = '/_karma_webpack_' + req.url;
            const webpackReq = Object.assign({}, req, { url: webpackUrl });
            webpackMiddleware(webpackReq, res, next);
        }
        else {
            next();
        }
    };
}
module.exports = {
    'framework:@angular-devkit/build-angular': ['factory', init],
    'reporter:@angular-devkit/build-angular--sourcemap-reporter': ['type', sourceMapReporter],
    'reporter:@angular-devkit/build-angular--event-reporter': ['type', eventReporter],
    'middleware:@angular-devkit/build-angular--blocker': ['factory', requestBlocker],
    'middleware:@angular-devkit/build-angular--fallback': ['factory', fallbackMiddleware]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FybWEuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL2FuZ3VsYXItY2xpLWZpbGVzL3BsdWdpbnMva2FybWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNILGlCQUFpQjtBQUNqQiwrREFBK0Q7O0FBRS9ELDZCQUE2QjtBQUU3Qiw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFHL0QseUVBQW1FO0FBRW5FOzs7Ozs7R0FNRztBQUdILElBQUksT0FBTyxHQUFVLEVBQUUsQ0FBQztBQUN4QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxpQkFBc0IsQ0FBQztBQUMzQixJQUFJLFNBQXFCLENBQUM7QUFDMUIsSUFBSSxTQUFxQixDQUFDO0FBRTFCLHNDQUFzQztBQUN0Qyx1QkFBdUIsS0FBWSxFQUFFLFFBQWUsRUFBRSxPQUFPLEdBQUcsS0FBSztJQUNuRSxNQUFNLFFBQVEsR0FBRztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFFRixNQUFNLGNBQWMsR0FBRyxRQUFRO1FBQzdCLDJGQUEyRjtTQUMxRixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ3JFLDRDQUE0QztTQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBTSxRQUFRLEVBQUssSUFBSSxFQUFHLENBQUMsQ0FBQztJQUUzQyxtREFBbUQ7SUFDbkQsdURBQXVEO0lBQ3ZELElBQUksT0FBTyxF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LG1DQUFtQztJQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUU5QixrQ0FBa0M7SUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsaUJBQWlCLENBQUMsT0FBTyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFaEUsb0dBQW9HO0FBQ3BHO0lBQ0UsT0FBTyxVQUFVLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBZ0I7UUFDbkQsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ2hELE1BQU0sVUFBVSxxQkFBUSxHQUFHLElBQUUsR0FBRyxFQUFFLFVBQVUsR0FBRSxDQUFBO1lBQzlDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLElBQUksRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLHlDQUF5QyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztJQUM1RCw0REFBNEQsRUFBRSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQztJQUN6Rix3REFBd0QsRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7SUFDakYsbURBQW1ELEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO0lBQ2hGLG9EQUFvRCxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDO0NBQ3RGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0ICogYXMgd2VicGFjayBmcm9tICd3ZWJwYWNrJztcbmNvbnN0IHdlYnBhY2tEZXZNaWRkbGV3YXJlID0gcmVxdWlyZSgnd2VicGFjay1kZXYtbWlkZGxld2FyZScpO1xuXG5pbXBvcnQgeyBBc3NldFBhdHRlcm4gfSBmcm9tICcuLi8uLi9icm93c2VyL3NjaGVtYSc7XG5pbXBvcnQgeyBLYXJtYVdlYnBhY2tGYWlsdXJlQ2IgfSBmcm9tICcuL2thcm1hLXdlYnBhY2stZmFpbHVyZS1jYic7XG5cbi8qKlxuICogRW51bWVyYXRlIG5lZWRlZCAoYnV0IG5vdCByZXF1aXJlL2ltcG9ydGVkKSBkZXBlbmRlbmNpZXMgZnJvbSB0aGlzIGZpbGVcbiAqICB0byBsZXQgdGhlIGRlcGVuZGVuY3kgdmFsaWRhdG9yIGtub3cgdGhleSBhcmUgdXNlZC5cbiAqXG4gKiByZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKVxuICogcmVxdWlyZSgna2FybWEtc291cmNlLW1hcC1zdXBwb3J0JylcbiAqL1xuXG5cbmxldCBibG9ja2VkOiBhbnlbXSA9IFtdO1xubGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xubGV0IHdlYnBhY2tNaWRkbGV3YXJlOiBhbnk7XG5sZXQgc3VjY2Vzc0NiOiAoKSA9PiB2b2lkO1xubGV0IGZhaWx1cmVDYjogKCkgPT4gdm9pZDtcblxuLy8gQWRkIGZpbGVzIHRvIHRoZSBLYXJtYSBmaWxlcyBhcnJheS5cbmZ1bmN0aW9uIGFkZEthcm1hRmlsZXMoZmlsZXM6IGFueVtdLCBuZXdGaWxlczogYW55W10sIHByZXBlbmQgPSBmYWxzZSkge1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBpbmNsdWRlZDogdHJ1ZSxcbiAgICBzZXJ2ZWQ6IHRydWUsXG4gICAgd2F0Y2hlZDogdHJ1ZVxuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NlZEZpbGVzID0gbmV3RmlsZXNcbiAgICAvLyBSZW1vdmUgZ2xvYnMgdGhhdCBkbyBub3QgbWF0Y2ggYW55IGZpbGVzLCBvdGhlcndpc2UgS2FybWEgd2lsbCBzaG93IGEgd2FybmluZyBmb3IgdGhlc2UuXG4gICAgLmZpbHRlcihmaWxlID0+IGdsb2Iuc3luYyhmaWxlLnBhdHRlcm4sIHsgbm9kaXI6IHRydWUgfSkubGVuZ3RoICE9IDApXG4gICAgLy8gRmlsbCBpbiBwYXR0ZXJuIHByb3BlcnRpZXMgd2l0aCBkZWZhdWx0cy5cbiAgICAubWFwKGZpbGUgPT4gKHsgLi4uZGVmYXVsdHMsIC4uLmZpbGUgfSkpO1xuXG4gIC8vIEl0J3MgaW1wb3J0YW50IHRvIG5vdCByZXBsYWNlIHRoZSBhcnJheSwgYmVjYXVzZVxuICAvLyBrYXJtYSBhbHJlYWR5IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZXhpc3RpbmcgYXJyYXkuXG4gIGlmIChwcmVwZW5kKSB7XG4gICAgZmlsZXMudW5zaGlmdCguLi5wcm9jZXNzZWRGaWxlcyk7XG4gIH0gZWxzZSB7XG4gICAgZmlsZXMucHVzaCguLi5wcm9jZXNzZWRGaWxlcyk7XG4gIH1cbn1cblxuY29uc3QgaW5pdDogYW55ID0gKGNvbmZpZzogYW55LCBlbWl0dGVyOiBhbnksIGN1c3RvbUZpbGVIYW5kbGVyczogYW55KSA9PiB7XG4gIGlmICghY29uZmlnLmJ1aWxkV2VicGFjaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICdAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhci9wbHVnaW5zL2thcm1hJyBrYXJtYSBwbHVnaW4gaXMgbWVhbnQgdG9gICtcbiAgICBgIGJlIHVzZWQgZnJvbSB3aXRoaW4gQW5ndWxhciBDTEkgYW5kIHdpbGwgbm90IHdvcmsgY29ycmVjdGx5IG91dHNpZGUgb2YgaXQuYFxuICAgIClcbiAgfVxuICBjb25zdCBvcHRpb25zID0gY29uZmlnLmJ1aWxkV2VicGFjay5vcHRpb25zO1xuICBjb25zdCBwcm9qZWN0Um9vdCA9IGNvbmZpZy5idWlsZFdlYnBhY2sucHJvamVjdFJvb3QgYXMgc3RyaW5nO1xuICBzdWNjZXNzQ2IgPSBjb25maWcuYnVpbGRXZWJwYWNrLnN1Y2Nlc3NDYjtcbiAgZmFpbHVyZUNiID0gY29uZmlnLmJ1aWxkV2VicGFjay5mYWlsdXJlQ2I7XG5cbiAgY29uZmlnLnJlcG9ydGVycy51bnNoaWZ0KCdAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhci0tZXZlbnQtcmVwb3J0ZXInKTtcblxuICAvLyBXaGVuIHVzaW5nIGNvZGUtY292ZXJhZ2UsIGF1dG8tYWRkIGNvdmVyYWdlLWlzdGFuYnVsLlxuICBjb25maWcucmVwb3J0ZXJzID0gY29uZmlnLnJlcG9ydGVycyB8fCBbXTtcbiAgaWYgKG9wdGlvbnMuY29kZUNvdmVyYWdlICYmIGNvbmZpZy5yZXBvcnRlcnMuaW5kZXhPZignY292ZXJhZ2UtaXN0YW5idWwnKSA9PT0gLTEpIHtcbiAgICBjb25maWcucmVwb3J0ZXJzLnVuc2hpZnQoJ2NvdmVyYWdlLWlzdGFuYnVsJyk7XG4gIH1cblxuICAvLyBBZGQgYSByZXBvcnRlciB0aGF0IGZpeGVzIHNvdXJjZW1hcCB1cmxzLlxuICBpZiAob3B0aW9ucy5zb3VyY2VNYXApIHtcbiAgICBjb25maWcucmVwb3J0ZXJzLnVuc2hpZnQoJ0Bhbmd1bGFyLWRldmtpdC9idWlsZC1hbmd1bGFyLS1zb3VyY2VtYXAtcmVwb3J0ZXInKTtcblxuICAgIC8vIENvZGUgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdHNjaGF1Yi9rYXJtYS1zb3VyY2UtbWFwLXN1cHBvcnQuXG4gICAgLy8gV2UgY2FuJ3QgdXNlIGl0IGRpcmVjdGx5IGJlY2F1c2Ugd2UgbmVlZCB0byBhZGQgaXQgY29uZGl0aW9uYWxseSBpbiB0aGlzIGZpbGUsIGFuZCBrYXJtYVxuICAgIC8vIGZyYW1ld29ya3MgY2Fubm90IGJlIGFkZGVkIGR5bmFtaWNhbGx5LlxuICAgIGNvbnN0IHNtc1BhdGggPSBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKSk7XG4gICAgY29uc3Qga3Ntc1BhdGggPSBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdrYXJtYS1zb3VyY2UtbWFwLXN1cHBvcnQnKSk7XG5cbiAgICBhZGRLYXJtYUZpbGVzKGNvbmZpZy5maWxlcywgW1xuICAgICAgeyBwYXR0ZXJuOiBwYXRoLmpvaW4oc21zUGF0aCwgJ2Jyb3dzZXItc291cmNlLW1hcC1zdXBwb3J0LmpzJyksIHdhdGNoZWQ6IGZhbHNlIH0sXG4gICAgICB7IHBhdHRlcm46IHBhdGguam9pbihrc21zUGF0aCwgJ2NsaWVudC5qcycpLCB3YXRjaGVkOiBmYWxzZSB9XG4gICAgXSwgdHJ1ZSk7XG4gIH1cblxuICAvLyBBZGQgd2VicGFjayBjb25maWcuXG4gIGNvbnN0IHdlYnBhY2tDb25maWcgPSBjb25maWcuYnVpbGRXZWJwYWNrLndlYnBhY2tDb25maWc7XG4gIGNvbnN0IHdlYnBhY2tNaWRkbGV3YXJlQ29uZmlnID0ge1xuICAgIGxvZ0xldmVsOiAnZXJyb3InLCAvLyBIaWRlIHdlYnBhY2sgb3V0cHV0IGJlY2F1c2UgaXRzIG5vaXN5LlxuICAgIHdhdGNoT3B0aW9uczogeyBwb2xsOiBvcHRpb25zLnBvbGwgfSxcbiAgICBwdWJsaWNQYXRoOiAnL19rYXJtYV93ZWJwYWNrXy8nLFxuICB9O1xuXG4gIGNvbnN0IGNvbXBpbGF0aW9uRXJyb3JDYiA9IChlcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkLCBlcnJvcnM6IHN0cmluZ1tdKSA9PiB7XG4gICAgLy8gTm90aWZ5IHBvdGVudGlhbCBsaXN0ZW5lcnMgb2YgdGhlIGNvbXBpbGUgZXJyb3JcbiAgICBlbWl0dGVyLmVtaXQoJ2NvbXBpbGVfZXJyb3InLCBlcnJvcnMpO1xuXG4gICAgLy8gRmluaXNoIEthcm1hIHJ1biBlYXJseSBpbiBjYXNlIG9mIGNvbXBpbGF0aW9uIGVycm9yLlxuICAgIGVtaXR0ZXIuZW1pdCgncnVuX2NvbXBsZXRlJywgW10sIHsgZXhpdENvZGU6IDEgfSk7XG5cbiAgICAvLyBVbmJsb2NrIGFueSBrYXJtYSByZXF1ZXN0cyAocG90ZW50aWFsbHkgc3RhcnRlZCB1c2luZyBga2FybWEgcnVuYClcbiAgICB1bmJsb2NrKCk7XG4gIH1cbiAgd2VicGFja0NvbmZpZy5wbHVnaW5zLnB1c2gobmV3IEthcm1hV2VicGFja0ZhaWx1cmVDYihjb21waWxhdGlvbkVycm9yQ2IpKTtcblxuICAvLyBVc2UgZXhpc3RpbmcgY29uZmlnIGlmIGFueS5cbiAgY29uZmlnLndlYnBhY2sgPSBPYmplY3QuYXNzaWduKHdlYnBhY2tDb25maWcsIGNvbmZpZy53ZWJwYWNrKTtcbiAgY29uZmlnLndlYnBhY2tNaWRkbGV3YXJlID0gT2JqZWN0LmFzc2lnbih3ZWJwYWNrTWlkZGxld2FyZUNvbmZpZywgY29uZmlnLndlYnBhY2tNaWRkbGV3YXJlKTtcblxuICAvLyBPdXIgY3VzdG9tIGNvbnRleHQgYW5kIGRlYnVnIGZpbGVzIGxpc3QgdGhlIHdlYnBhY2sgYnVuZGxlcyBkaXJlY3RseSBpbnN0ZWFkIG9mIHVzaW5nXG4gIC8vIHRoZSBrYXJtYSBmaWxlcyBhcnJheS5cbiAgY29uZmlnLmN1c3RvbUNvbnRleHRGaWxlID0gYCR7X19kaXJuYW1lfS9rYXJtYS1jb250ZXh0Lmh0bWxgO1xuICBjb25maWcuY3VzdG9tRGVidWdGaWxlID0gYCR7X19kaXJuYW1lfS9rYXJtYS1kZWJ1Zy5odG1sYDtcblxuICAvLyBBZGQgdGhlIHJlcXVlc3QgYmxvY2tlciBhbmQgdGhlIHdlYnBhY2sgc2VydmVyIGZhbGxiYWNrLlxuICBjb25maWcuYmVmb3JlTWlkZGxld2FyZSA9IGNvbmZpZy5iZWZvcmVNaWRkbGV3YXJlIHx8IFtdO1xuICBjb25maWcuYmVmb3JlTWlkZGxld2FyZS5wdXNoKCdAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhci0tYmxvY2tlcicpO1xuICBjb25maWcubWlkZGxld2FyZSA9IGNvbmZpZy5taWRkbGV3YXJlIHx8IFtdO1xuICBjb25maWcubWlkZGxld2FyZS5wdXNoKCdAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhci0tZmFsbGJhY2snKTtcblxuICAvLyBUaGUgd2VicGFjayB0aWVyIG93bnMgdGhlIHdhdGNoIGJlaGF2aW9yIHNvIHdlIHdhbnQgdG8gZm9yY2UgaXQgaW4gdGhlIGNvbmZpZy5cbiAgd2VicGFja0NvbmZpZy53YXRjaCA9ICFjb25maWcuc2luZ2xlUnVuO1xuICBpZiAoY29uZmlnLnNpbmdsZVJ1bikge1xuICAgIC8vIFRoZXJlJ3Mgbm8gb3B0aW9uIHRvIHR1cm4gb2ZmIGZpbGUgd2F0Y2hpbmcgaW4gd2VicGFjay1kZXYtc2VydmVyLCBidXRcbiAgICAvLyB3ZSBjYW4gb3ZlcnJpZGUgdGhlIGZpbGUgd2F0Y2hlciBpbnN0ZWFkLlxuICAgIHdlYnBhY2tDb25maWcucGx1Z2lucy51bnNoaWZ0KHtcbiAgICAgIGFwcGx5OiAoY29tcGlsZXI6IGFueSkgPT4geyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgICAgICBjb21waWxlci5ob29rcy5hZnRlckVudmlyb25tZW50LnRhcCgna2FybWEnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcGlsZXIud2F0Y2hGaWxlU3lzdGVtID0geyB3YXRjaDogKCkgPT4geyB9IH07XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuICAvLyBGaWxlcyBuZWVkIHRvIGJlIHNlcnZlZCBmcm9tIGEgY3VzdG9tIHBhdGggZm9yIEthcm1hLlxuICB3ZWJwYWNrQ29uZmlnLm91dHB1dC5wYXRoID0gJy9fa2FybWFfd2VicGFja18vJztcbiAgd2VicGFja0NvbmZpZy5vdXRwdXQucHVibGljUGF0aCA9ICcvX2thcm1hX3dlYnBhY2tfLyc7XG4gIHdlYnBhY2tDb25maWcub3V0cHV0LmRldnRvb2xNb2R1bGVGaWxlbmFtZVRlbXBsYXRlID0gJ1tuYW1lc3BhY2VdL1tyZXNvdXJjZS1wYXRoXT9bbG9hZGVyc10nO1xuXG4gIGxldCBjb21waWxlcjogYW55O1xuICB0cnkge1xuICAgIGNvbXBpbGVyID0gd2VicGFjayh3ZWJwYWNrQ29uZmlnKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayB8fCBlKTtcbiAgICBpZiAoZS5kZXRhaWxzKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUuZGV0YWlscyk7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVyKGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xuICAgIGlzQmxvY2tlZCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBpbGVyLmhvb2tzLmludmFsaWQudGFwKCdrYXJtYScsICgpID0+IGhhbmRsZXIoKSk7XG5cbiAgY29tcGlsZXIuaG9va3Mud2F0Y2hSdW4udGFwQXN5bmMoJ2thcm1hJywgKF86IGFueSwgY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IGhhbmRsZXIoY2FsbGJhY2spKTtcblxuICBjb21waWxlci5ob29rcy5ydW4udGFwQXN5bmMoJ2thcm1hJywgKF86IGFueSwgY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IGhhbmRsZXIoY2FsbGJhY2spKTtcblxuICBmdW5jdGlvbiB1bmJsb2NrKCl7XG4gICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgYmxvY2tlZC5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gICAgYmxvY2tlZCA9IFtdO1xuICB9XG5cbiAgY29tcGlsZXIuaG9va3MuZG9uZS50YXAoJ2thcm1hJywgKHN0YXRzOiBhbnkpID0+IHtcbiAgICAvLyBEb24ndCByZWZyZXNoIGthcm1hIHdoZW4gdGhlcmUgYXJlIHdlYnBhY2sgZXJyb3JzLlxuICAgIGlmIChzdGF0cy5jb21waWxhdGlvbi5lcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBlbWl0dGVyLnJlZnJlc2hGaWxlcygpO1xuICAgIH1cbiAgICB1bmJsb2NrKCk7XG4gIH0pO1xuXG4gIHdlYnBhY2tNaWRkbGV3YXJlID0gbmV3IHdlYnBhY2tEZXZNaWRkbGV3YXJlKGNvbXBpbGVyLCB3ZWJwYWNrTWlkZGxld2FyZUNvbmZpZyk7XG5cbiAgLy8gRm9yd2FyZCByZXF1ZXN0cyB0byB3ZWJwYWNrIHNlcnZlci5cbiAgY3VzdG9tRmlsZUhhbmRsZXJzLnB1c2goe1xuICAgIHVybFJlZ2V4OiAvXlxcL19rYXJtYV93ZWJwYWNrX1xcLy4qLyxcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgICAgd2VicGFja01pZGRsZXdhcmUocmVxLCByZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRW5zdXJlIHNjcmlwdCBhbmQgc3R5bGUgYnVuZGxlcyBhcmUgc2VydmVkLlxuICAgICAgICAvLyBUaGV5IGFyZSBtZW50aW9uZWQgaW4gdGhlIGN1c3RvbSBrYXJtYSBjb250ZXh0IHBhZ2UgYW5kIHdlIGRvbid0IHdhbnQgdGhlbSB0byA0MDQuXG4gICAgICAgIGNvbnN0IGFsd2F5c1NlcnZlID0gW1xuICAgICAgICAgICcvX2thcm1hX3dlYnBhY2tfL3J1bnRpbWUuanMnLFxuICAgICAgICAgICcvX2thcm1hX3dlYnBhY2tfL3BvbHlmaWxscy5qcycsXG4gICAgICAgICAgJy9fa2FybWFfd2VicGFja18vc2NyaXB0cy5qcycsXG4gICAgICAgICAgJy9fa2FybWFfd2VicGFja18vc3R5bGVzLmpzJyxcbiAgICAgICAgICAnL19rYXJtYV93ZWJwYWNrXy92ZW5kb3IuanMnLFxuICAgICAgICBdO1xuICAgICAgICBpZiAoYWx3YXlzU2VydmUuaW5kZXhPZihyZXEudXJsKSAhPSAtMSkge1xuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAwO1xuICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwNDtcbiAgICAgICAgICByZXMuZW5kKCdOb3QgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBlbWl0dGVyLm9uKCdleGl0JywgKGRvbmU6IGFueSkgPT4ge1xuICAgIHdlYnBhY2tNaWRkbGV3YXJlLmNsb3NlKCk7XG4gICAgZG9uZSgpO1xuICB9KTtcbn07XG5cbmluaXQuJGluamVjdCA9IFsnY29uZmlnJywgJ2VtaXR0ZXInLCAnY3VzdG9tRmlsZUhhbmRsZXJzJ107XG5cbi8vIEJsb2NrIHJlcXVlc3RzIHVudGlsIHRoZSBXZWJwYWNrIGNvbXBpbGF0aW9uIGlzIGRvbmUuXG5mdW5jdGlvbiByZXF1ZXN0QmxvY2tlcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVxdWVzdDogYW55LCBfcmVzcG9uc2U6IGFueSwgbmV4dDogKCkgPT4gdm9pZCkge1xuICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgIGJsb2NrZWQucHVzaChuZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gQ29waWVkIGZyb20gXCJrYXJtYS1qYXNtaW5lLWRpZmYtcmVwb3J0ZXJcIiBzb3VyY2UgY29kZTpcbi8vIEluIGNhc2UsIHdoZW4gbXVsdGlwbGUgcmVwb3J0ZXJzIGFyZSB1c2VkIGluIGNvbmp1bmN0aW9uXG4vLyB3aXRoIGluaXRTb3VyY2VtYXBSZXBvcnRlciwgdGhleSBib3RoIHdpbGwgc2hvdyByZXBldGl0aXZlIGxvZ1xuLy8gbWVzc2FnZXMgd2hlbiBkaXNwbGF5aW5nIGV2ZXJ5dGhpbmcgdGhhdCBzdXBwb3NlZCB0byB3cml0ZSB0byB0ZXJtaW5hbC5cbi8vIFNvIGp1c3Qgc3VwcHJlc3MgYW55IGxvZ3MgZnJvbSBpbml0U291cmNlbWFwUmVwb3J0ZXIgYnkgZG9pbmcgbm90aGluZyBvblxuLy8gYnJvd3NlciBsb2csIGJlY2F1c2UgaXQgaXMgYW4gdXRpbGl0eSByZXBvcnRlcixcbi8vIHVubGVzcyBpdCdzIGFsb25lIGluIHRoZSBcInJlcG9ydGVyc1wiIG9wdGlvbiBhbmQgYmFzZSByZXBvcnRlciBpcyB1c2VkLlxuZnVuY3Rpb24gbXV0ZUR1cGxpY2F0ZVJlcG9ydGVyTG9nZ2luZyhjb250ZXh0OiBhbnksIGNvbmZpZzogYW55KSB7XG4gIGNvbnRleHQud3JpdGVDb21tb25Nc2cgPSBmdW5jdGlvbiAoKSB7IH07XG4gIGNvbnN0IHJlcG9ydGVyTmFtZSA9ICdAYW5ndWxhci9jbGknO1xuICBjb25zdCBoYXNUcmFpbGluZ1JlcG9ydGVycyA9IGNvbmZpZy5yZXBvcnRlcnMuc2xpY2UoLTEpLnBvcCgpICE9PSByZXBvcnRlck5hbWU7XG5cbiAgaWYgKGhhc1RyYWlsaW5nUmVwb3J0ZXJzKSB7XG4gICAgY29udGV4dC53cml0ZUNvbW1vbk1zZyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgfVxufVxuXG4vLyBFbWl0cyBidWlsZGVyIGV2ZW50cy5cbmNvbnN0IGV2ZW50UmVwb3J0ZXI6IGFueSA9IGZ1bmN0aW9uICh0aGlzOiBhbnksIGJhc2VSZXBvcnRlckRlY29yYXRvcjogYW55LCBjb25maWc6IGFueSkge1xuICBiYXNlUmVwb3J0ZXJEZWNvcmF0b3IodGhpcyk7XG5cbiAgbXV0ZUR1cGxpY2F0ZVJlcG9ydGVyTG9nZ2luZyh0aGlzLCBjb25maWcpO1xuXG4gIHRoaXMub25SdW5Db21wbGV0ZSA9IGZ1bmN0aW9uIChfYnJvd3NlcnM6IGFueSwgcmVzdWx0czogYW55KSB7XG4gICAgaWYgKHJlc3VsdHMuZXhpdENvZGUgPT09IDApIHtcbiAgICAgIHN1Y2Nlc3NDYiAmJiBzdWNjZXNzQ2IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbHVyZUNiICYmIGZhaWx1cmVDYigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGF2b2lkIGR1cGxpY2F0ZSBmYWlsdXJlIG1lc3NhZ2VcbiAgdGhpcy5zcGVjRmFpbHVyZSA9ICgpID0+IHt9O1xufTtcblxuZXZlbnRSZXBvcnRlci4kaW5qZWN0ID0gWydiYXNlUmVwb3J0ZXJEZWNvcmF0b3InLCAnY29uZmlnJ107XG5cbi8vIFN0cmlwIHRoZSBzZXJ2ZXIgYWRkcmVzcyBhbmQgd2VicGFjayBzY2hlbWUgKHdlYnBhY2s6Ly8pIGZyb20gZXJyb3IgbG9nLlxuY29uc3Qgc291cmNlTWFwUmVwb3J0ZXI6IGFueSA9IGZ1bmN0aW9uICh0aGlzOiBhbnksIGJhc2VSZXBvcnRlckRlY29yYXRvcjogYW55LCBjb25maWc6IGFueSkge1xuICBiYXNlUmVwb3J0ZXJEZWNvcmF0b3IodGhpcyk7XG5cbiAgbXV0ZUR1cGxpY2F0ZVJlcG9ydGVyTG9nZ2luZyh0aGlzLCBjb25maWcpO1xuXG4gIGNvbnN0IHVybFJlZ2V4cCA9IC9cXChodHRwOlxcL1xcL2xvY2FsaG9zdDpcXGQrXFwvX2thcm1hX3dlYnBhY2tfXFwvd2VicGFjazpcXC8vZ2k7XG5cbiAgdGhpcy5vblNwZWNDb21wbGV0ZSA9IGZ1bmN0aW9uIChfYnJvd3NlcjogYW55LCByZXN1bHQ6IGFueSkge1xuICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0LmxvZy5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQubG9nLmZvckVhY2goKGxvZzogc3RyaW5nLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICByZXN1bHQubG9nW2lkeF0gPSBsb2cucmVwbGFjZSh1cmxSZWdleHAsICcnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBhdm9pZCBkdXBsaWNhdGUgY29tcGxldGUgbWVzc2FnZVxuICB0aGlzLm9uUnVuQ29tcGxldGUgPSAoKSA9PiB7fTtcblxuICAvLyBhdm9pZCBkdXBsaWNhdGUgZmFpbHVyZSBtZXNzYWdlXG4gIHRoaXMuc3BlY0ZhaWx1cmUgPSAoKSA9PiB7fTtcbn07XG5cbnNvdXJjZU1hcFJlcG9ydGVyLiRpbmplY3QgPSBbJ2Jhc2VSZXBvcnRlckRlY29yYXRvcicsICdjb25maWcnXTtcblxuLy8gV2hlbiBhIHJlcXVlc3QgaXMgbm90IGZvdW5kIGluIHRoZSBrYXJtYSBzZXJ2ZXIsIHRyeSBsb29raW5nIGZvciBpdCBmcm9tIHRoZSB3ZWJwYWNrIHNlcnZlciByb290LlxuZnVuY3Rpb24gZmFsbGJhY2tNaWRkbGV3YXJlKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogKCkgPT4gdm9pZCkge1xuICAgIGlmICh3ZWJwYWNrTWlkZGxld2FyZSkge1xuICAgICAgY29uc3Qgd2VicGFja1VybCA9ICcvX2thcm1hX3dlYnBhY2tfJyArIHJlcS51cmw7XG4gICAgICBjb25zdCB3ZWJwYWNrUmVxID0geyAuLi5yZXEsIHVybDogd2VicGFja1VybCB9XG4gICAgICB3ZWJwYWNrTWlkZGxld2FyZSh3ZWJwYWNrUmVxLCByZXMsIG5leHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ2ZyYW1ld29yazpAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhcic6IFsnZmFjdG9yeScsIGluaXRdLFxuICAncmVwb3J0ZXI6QGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXItLXNvdXJjZW1hcC1yZXBvcnRlcic6IFsndHlwZScsIHNvdXJjZU1hcFJlcG9ydGVyXSxcbiAgJ3JlcG9ydGVyOkBhbmd1bGFyLWRldmtpdC9idWlsZC1hbmd1bGFyLS1ldmVudC1yZXBvcnRlcic6IFsndHlwZScsIGV2ZW50UmVwb3J0ZXJdLFxuICAnbWlkZGxld2FyZTpAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhci0tYmxvY2tlcic6IFsnZmFjdG9yeScsIHJlcXVlc3RCbG9ja2VyXSxcbiAgJ21pZGRsZXdhcmU6QGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXItLWZhbGxiYWNrJzogWydmYWN0b3J5JywgZmFsbGJhY2tNaWRkbGV3YXJlXVxufTtcbiJdfQ==