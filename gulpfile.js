var gulp    = require("gulp");
var jade    = require("gulp-jade");
var less    = require("gulp-less");
var uglify  = require("gulp-uglify");

// Set up a build task that will compile the
// jade template and run asset minification.
gulp.task("build", function () {
    gulp.src("./views/*.jade")
        .pipe(jade({ data: {} }))
        .pipe(gulp.dest("public/"));

    gulp.src("./asset/*.less")
        .pipe(less())
        .pipe(gulp.dest("public/"));

    gulp.src("./asset/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("public/"));
});

// Set up a default build task that will also watch for any
// asset changes.
gulp.task("default", function () {
    gulp.start("build");
    gulp.watch("./asset/*", ["build"]);
});