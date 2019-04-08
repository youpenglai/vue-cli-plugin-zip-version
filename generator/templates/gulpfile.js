const gulp = require('gulp');
const fs = require('fs');
const zip = require('gulp-zip');
const bump = require('gulp-bump');
const semver = require('semver');
const git = require('gulp-git');

const prefix = 'photo-up-front';

const getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

function _package(type) {
  const pkg = getPackageJson();
  const newVer = semver.inc(pkg.version, type);
  gulp.src('./package.json')
    .pipe(bump({version: newVer}))
    .pipe(gulp.dest('./'));

  // 根据新的版本号打包文件
  return gulp.src(['./**/**', '!./node_modules/**/**', '!./idea/**/**', '!./release/**/**'])
    .pipe(zip(prefix + '.' + newVer + '.zip'))
    .pipe(gulp.dest('release/' + new Date().getTime()));
}

// 主版本号更新
// 当做了不兼容的API修改
gulp.task('packageMajorVersion', () => {
  return _package('major');
});

// 次版本号更新
// 当做了向下兼容的功能性新增
gulp.task('packageMinorVersion', () => {
  return _package('minor');
});

// 修订号更新
// 当你做了向下兼容的问题修正
gulp.task('packagePatchVersion', () => {
  return _package('patch');
});

// 先行版本号更新
gulp.task('packagePrereleaseVersion', () => {
  return _package('prerelease');
});

// 可以自定义tag的描述，
// tag的版本好直接从package.json文件中读取
const versionInfo = '';
gulp.task('tag', () => {
  const pkg = getPackageJson();
  git.tag('v' + pkg.version, versionInfo, function(err) {
    console.log(err);
  });
});

gulp.task('default', () => {
  gulp.run('packagePatchVersion');
});

