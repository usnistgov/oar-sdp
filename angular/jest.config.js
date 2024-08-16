module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['./setup-jest.ts'],
    moduleNameMapper: {
        "^lodash-es$": "lodash"
    },
    globalSetup: 'jest-preset-angular/global-setup'
};
