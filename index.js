'use strict';

const Typograf = require('typograf');
const through = require('through2');
const gutil = require('gulp-util');

module.exports = function(opts) {
    opts = opts || {};

    Array.isArray(opts.rules) && opts.rules.forEach(function(rule) {
        typeof rule === 'object' && Typograf.rule(rule);
    });

    const typograf = new Typograf(opts);
    opts.disable && typograf.disable(opts.disable);
    opts.enable && typograf.enable(opts.enable);

    return through.obj(function(file, enc, cb) {
        if(file.isNull()) {
            this.push(file);
            return cb();
        }

        if(file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-typograf', 'Streaming not supported'));
            return cb();
        }

        file.contents = new Buffer(typograf.execute(file.contents.toString()));

        this.push(file);
        cb();
    });
};
