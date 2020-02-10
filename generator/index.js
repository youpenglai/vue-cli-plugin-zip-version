module.exports = (api, opts, rootOptions) => {
  api.extendPackage({
    devDependencies: {
      "fs": "0.0.1-security",
      "gulp": "^4.0.0",
      "gulp-bump": "^3.1.1",
      "gulp-git": "^2.8.0",
      "gulp-zip": "^4.2.0",
      "semver": "^5.4.1"
    }
  });

  api.render({
    './gulpfile.js': './templates/gulpfile.js'
  });

  api.extendPackage({
    scripts: {
      'zip-version-major':  'gulp packageMajorVersion',
      'zip-version-minor':  'gulp packageMinorVersion',
      'zip-version-patch':  'gulp packagePatchVersion',
      'zip-version-prerelease':  'gulp packagePrereleaseVersion',
      "prev": "npm install && npm run build && pm2 startOrRestart start.config.js --env prev",
      "production": "npm install && npm run build && pm2 startOrRestart start.config.js --env production"
    }
  });

};
