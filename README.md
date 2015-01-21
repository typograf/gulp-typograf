[gulp](http://gulpjs.com)-typograf
==================================
[![NPM version](https://img.shields.io/npm/v/gulp-typograf.svg)](https://www.npmjs.com/package/gulp-typograf)
[![NPM downloads](https://img.shields.io/npm/dm/gulp-typograf.svg)](https://www.npmjs.com/package/gulp-typograf)
[![Build Status](https://img.shields.io/travis/typograf/gulp-typograf.svg)](https://travis-ci.org/typograf/gulp-typograf)
[![Dependency Status](https://img.shields.io/david/typograf/gulp-typograf.svg)](https://david-dm.org/typograf/gulp-typograf) [![devDependency Status](https://img.shields.io/david/dev/typograf/gulp-typograf.svg)](https://david-dm.org/typograf/gulp-typograf#info=devDependencies)


Prepare texts with Typograf using Gulp.

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
