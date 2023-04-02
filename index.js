'use strict';

const Typograf = require('typograf');
const through = require('through2');
const PluginError = require('plugin-error');
const names = [];

function addRules(rules) {
    Array.isArray(rules) && rules.forEach(function(rule) {
        if (typeof rule === 'object' && typeof rule.name === 'string' && names.indexOf(rule.name) === -1) {
            Typograf.addRule(rule);

            names.push(rule.name);
        }
    });
}

module.exports = function(opts) {
    opts = opts || {};

    addRules(opts.rules);

    const typograf = new Typograf(opts);
    if (Array.isArray(opts.safeTags)) {
        opts.safeTags.forEach(function(tag) {
            typograf.addSafeTag.apply(typograf, tag);
        });
    }

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-typograf', 'Streaming not supported'));
            return cb();
        }

        file.contents = Buffer.from(typograf.execute(file.contents.toString()));

        this.push(file);
        cb();
    });
};
