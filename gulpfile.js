/*eslint-env node*/

let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let basedir = 'examples';

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', function() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: '.',
        },
        startPath: '/examples/examples.html'
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(basedir + '**/*.html', ['reload']);
    gulp.watch(basedir + '**/*.js', ['reload']);
    gulp.watch(basedir + '**/*.css', ['reload']);
});