[gulp](http://gulpjs.com)-typograf
==================================
[![NPM version](https://img.shields.io/npm/v/gulp-typograf.svg)](https://www.npmjs.com/package/gulp-typograf)
[![NPM downloads](https://img.shields.io/npm/dm/gulp-typograf.svg)](https://www.npmjs.com/package/gulp-typograf)

Prepare texts with [Typograf](https://github.com/typograf/typograf) using Gulp.

## Install

```
npm install gulp-typograf --save-dev
```

## Usage
```js
const typograf = require('gulp-typograf');

gulp.task('typograf', function() {
    gulp.src('./src/*.html')
        .pipe(typograf({ locale: ['ru', 'en-US'] }))
        .pipe(gulp.dest('./public/'));
});

```

## With additional options
```js
.pipe(typograf({
    locale: ['ru', 'en-US'],
    // Type of HTML entities: 'digit' - &#160;, 'name' - &nbsp;, 'default' - UTF-8
    htmlEntity: { type: 'digit' },
    disableRule: ['ru/optalign/*'],
    enableRule: ['ru/money/ruble'],
    safeTags: [
        ['<\\?php', '\\?>'],
        ['<no-typography>', '</no-typography>']
    ],
    // Own rules
    rules: [
        {
            name: 'common/other/typographicalEmoticon',
            handler: function(text, settings) {
                return text.replace(/:-\)/, ':—)');
        },
        {
            name: 'common/other/trimLeft'
            handler: function(text, settings) {
                return text.trimLeft();
            }
        }
    ]
}))
```

## Links
- [Typograf](https://github.com/typograf/typograf)
- [grunt-typograf](https://github.com/typograf/grunt-typograf)
