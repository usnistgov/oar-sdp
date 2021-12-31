"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const ts = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const project_2 = require("../../utils/project");
const NG_BOOTSTRAP_MODULE_NAME = 'NgbModule';
const NG_BOOTSTRAP_PACKAGE_NAME = '@ng-bootstrap/ng-bootstrap';
/**
 * Patches main application module by adding 'NgbModule' import
 */
function addNgbModuleToAppModule(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = project_1.getProject(workspace, options.project || workspace.defaultProject);
        const buildOptions = project_2.getProjectTargetOptions(project, 'build');
        const modulePath = ng_ast_utils_1.getAppModulePath(host, buildOptions.main);
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File '${modulePath}' does not exist.`);
        }
        const source = ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);
        const changes = ast_utils_1.addImportToModule(source, modulePath, NG_BOOTSTRAP_MODULE_NAME, NG_BOOTSTRAP_PACKAGE_NAME);
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
exports.addNgbModuleToAppModule = addNgbModuleToAppModule;
//# sourceMappingURL=add-ngb-module.js.map