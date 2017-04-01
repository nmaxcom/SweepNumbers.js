/*eslint-env node*/

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', function() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch('*.html', ['reload']);
    gulp.watch('*.js', ['reload']);
});