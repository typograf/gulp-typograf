'use strict';

var assert = require('assert'),
    gutil = require('gulp-util'),
    typograf = require('./');

it('should prepare text', function (cb) {
    var input = '   Hello world!!   ',
        output = 'Hello world!';

    var stream = typograf({lang: 'ru'});
    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new gutil.File({
        contents: new Buffer(input)
    }));
});

it('should prepare text with disabled rule "common/punctuation/exclamation"', function (cb) {
    var input = '   Hello world!!   ',
        output = 'Hello world!!';

    var stream = typograf({lang: 'ru', disable: ['ru/punctuation/exclamation']});
    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new gutil.File({
        contents: new Buffer(input)
    }));
});

it('should prepare text with enabled rule "ru/money/ruble"', function (cb) {
    var input = '   1 руб.   ',
        output = '1\u00A0₽';

    var stream = typograf({lang: 'ru', enable: ['ru/money/ruble']});
    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new gutil.File({
        contents: new Buffer(input)
    }));
});
