'use strict';

const assert = require('assert');
const Vinyl = require('vinyl');
const typograf = require('./');

it('should prepare text', function (cb) {
    const input = '   Hello world!!   ';
    const output = 'Hello world!';

    const stream = typograf({locale: ['ru', 'en-US']});
    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new Vinyl({
        contents: Buffer.from(input)
    }));
});

it('should prepare text with disabled rule "ru/punctuation/exclamation"', function (cb) {
    const input = '   Hello world!!   ';
    const output = 'Hello world!!';

    const stream = typograf({
        locale: ['ru', 'en-US'],
        disableRule: ['ru/punctuation/exclamation']
    });
    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new Vinyl({
        contents: Buffer.from(input)
    }));
});

it('should prepare text with enabled rule "ru/money/ruble"', function (cb) {
    const input = '   1 руб.   ';
    const output = '1\u00A0₽';

    const stream = typograf({
        locale: 'ru',
        enableRule: ['ru/money/ruble']
    });

    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new Vinyl({
        contents: Buffer.from(input)
    }));
});

it('should execute own rules', function (cb) {
    const input = ' :-) ';
    const output = ':—)';

    const stream = typograf({
        locale: 'ru',
        rules: [
            {
                name: 'common/other/typographicalEmoticon',
                handler: function(text, settings) {
                    return text.replace(/:-\)/, ':—)');
                }
            }
        ]
    });

    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new Vinyl({
        contents: Buffer.from(input)
    }));
});

it('should add safe tags', function (cb) {
    const input = '<notypography>   "Hello"   </notypography>';
    const output = input;

    const stream = typograf({
        locale: 'ru',
        safeTags: [
            ['<notypography>', '</notypography>']
        ]
    });

    stream.on('data', function(data) {
        assert.equal(data.contents.toString(), output);
        cb();
    });

    stream.write(new Vinyl({
        contents: Buffer.from(input)
    }));
});
