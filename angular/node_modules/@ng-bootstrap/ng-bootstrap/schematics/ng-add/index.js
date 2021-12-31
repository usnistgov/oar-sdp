"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
const messages = require("./messages");
const package_config_1 = require("../utils/package-config");
const NG_BOOTSTRAP_VERSION = '6.0.0';
const BOOTSTRAP_VERSION = '4.4.0';
/**
 * This is executed when `ng add @ng-bootstrap/ng-bootstrap` is run.
 * It installs all dependencies in the 'package.json' and runs 'ng-add-setup-project' schematic.
 */
function ngAdd(options) {
    return (tree, context) => {
        // Checking that project exists
        const { project } = options;
        if (project) {
            const workspace = config_1.getWorkspace(tree);
            const projectWorkspace = project_1.getProject(workspace, project);
            if (!projectWorkspace) {
                throw new schematics_1.SchematicsException(messages.noProject(project));
            }
        }
        // Installing dependencies
        const angularCoreVersion = package_config_1.getPackageVersionFromPackageJson(tree, '@angular/core');
        const angularLocalizeVersion = package_config_1.getPackageVersionFromPackageJson(tree, '@angular/localize');
        package_config_1.addPackageToPackageJson(tree, '@ng-bootstrap/ng-bootstrap', `^${NG_BOOTSTRAP_VERSION}`);
        package_config_1.addPackageToPackageJson(tree, 'bootstrap', `^${BOOTSTRAP_VERSION}`);
        if (angularLocalizeVersion === null) {
            package_config_1.addPackageToPackageJson(tree, '@angular/localize', angularCoreVersion);
        }
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [
            context.addTask(new tasks_1.NodePackageInstallTask()),
        ]);
        return tree;
    };
}
exports.default = ngAdd;
//# sourceMappingURL=index.js.map