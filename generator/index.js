module.exports = (api, opts, rootOptions) => {
    api.extendPackage({
        dependencies: {
            "fs": "0.0.1-security",
            "gulp": "^4.0.0",
            "gulp-bump": "^3.1.1",
            "gulp-git": "^2.8.0",
            "gulp-zip": "^4.2.0",
        }
    });

    api.registerCommand('zip', async args => {
        const gulp = require('gulp');
        gulp.run();
    });

};
