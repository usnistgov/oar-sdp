"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
const messages = require("../messages");
const project_2 = require("../../utils/project");
const BOOTSTRAP_CSS_FILEPATH = 'node_modules/bootstrap/dist/css/bootstrap.min.css';
const SUPPORTED_BOOTSTRAP_STYLE_IMPORTS = {
    '.sass': `
/* Importing Bootstrap SCSS file. */
@import '~bootstrap/scss/bootstrap'
`,
    '.scss': `
/* Importing Bootstrap SCSS file. */
@import '~bootstrap/scss/bootstrap';
`
};
/**
 * Adding bootstrap either to 'styles.scss' or 'styles.sass'
 * If not possible, we're simply adding 'bootstrap.css' to the 'angular.json'
 */
function addBootstrapStyles(options) {
    return (host, context) => {
        const workspace = config_1.getWorkspace(host);
        const project = project_1.getProject(workspace, options.project || workspace.defaultProject);
        const styleFilePath = project_2.getProjectStyleFile(project) || '';
        const styleFileExtension = path.extname(styleFilePath);
        const styleFilePatch = SUPPORTED_BOOTSTRAP_STYLE_IMPORTS[styleFileExtension];
        // found supported styles
        if (styleFilePatch) {
            addBootstrapToStylesFile(host, styleFilePath, styleFilePatch);
        }
        else {
            // found some styles, but unsupported
            if (styleFileExtension !== '.css' && styleFileExtension !== '') {
                context.logger.warn(messages.unsupportedStyles(styleFilePath));
            }
            // just patching 'angular.json'
            addBootstrapToAngularJson(workspace, project, host);
        }
        return host;
    };
}
exports.addBootstrapStyles = addBootstrapStyles;
/**
 * Patches 'styles.scss' or 'styles.sass' to add Bootstrap snippet
 */
function addBootstrapToStylesFile(host, styleFilePath, styleFilePatch) {
    const styleContent = host.read(styleFilePath).toString('utf-8');
    const recorder = host.beginUpdate(styleFilePath);
    recorder.insertRight(styleContent.length, styleFilePatch);
    host.commitUpdate(recorder);
}
/**
 * Patches 'angular.json' to add 'bootstrap.css' styles
 */
function addBootstrapToAngularJson(workspace, project, host) {
    const targetOptions = project_2.getProjectTargetOptions(project, 'build');
    if (!targetOptions.styles) {
        targetOptions.styles = [BOOTSTRAP_CSS_FILEPATH];
    }
    else {
        const existingStyles = targetOptions.styles.map((s) => typeof s === 'string' ? s : s.input);
        for (const [, stylePath] of existingStyles.entries()) {
            // If the given asset is already specified in the styles, we don't need to do anything.
            if (stylePath === BOOTSTRAP_CSS_FILEPATH) {
                return;
            }
        }
        targetOptions.styles.unshift(BOOTSTRAP_CSS_FILEPATH);
    }
    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}
//# sourceMappingURL=add-bootstrap.js.map