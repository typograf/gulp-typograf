[gulp](http://gulpjs.com)-typograf
==================================

Prepare texts with typograf for Gulp.

[![Build Status](https://travis-ci.org/typograf/gulp-typograf.png?branch=master)](https://travis-ci.org/typograf/gulp-typograf)

## Install

```
npm install gulp-typograf --save-dev
```

## Usage
```js
var typograf = require('gulp-typograf');

gulp.task('typograf', function () {
  gulp.src('./html/**/*.html')
    .pipe(typograf({lang: 'ru'}))
    .pipe(gulp.dest('./public/html'));
});

gulp.task('default', ['typograf']);
```

## Options
```js
.pipe(typograf({
    lang: 'ru',
    mode: 'digit', // entities as digits
    disable: ['ru/optalign/*'], // disable rules
    enable: ['ru/money/ruble'] // enable rules
}))
```
