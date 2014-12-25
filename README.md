[gulp](http://gulpjs.com)-typograf [![Build Status](https://travis-ci.org/typograf/gulp-typograf.png?branch=master)](https://travis-ci.org/typograf/gulp-typograf)
==================================
Prepare texts with typograf for Gulp.

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
