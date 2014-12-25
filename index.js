var Typograf = require('typograf'),
    through = require('through2'),
    gutil = require('gulp-util');

module.exports = function(opts) {
    opts = opts || {};

    return through.obj(function(file, enc, cb) {
        if(file.isNull()) {
            this.push(file);
            return cb();
        }

        if(file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-typograf', 'Streaming not supported'));
            return cb();
        }

        var typograf = new Typograf(opts);
        opts.disable && typograf.disable(opts.disable);
        opts.enable && typograf.enable(opts.enable);

        file.contents = new Buffer(typograf.execute(file.contents.toString()));

        this.push(file);
        cb();
    });
};
