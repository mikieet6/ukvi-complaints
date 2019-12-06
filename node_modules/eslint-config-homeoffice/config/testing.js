'use strict';

module.exports = {
    root: true,
    extends: [
// Configs
        'homeoffice/config/default',
// Rules
        'homeoffice/rules/testing'
    ],
    env: {
        mocha: true
    },
    globals: {
        'chai': true,
        'expect': true,
        'should': true,
        'sinon': true
    },
    plugins: [
        'mocha'
    ]
};

