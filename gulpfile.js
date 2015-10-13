// Requirements
var gulp = require('gulp');

// Requirements SASS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

// Requirements HTML
var htmlmin = require('gulp-htmlmin');


// SASS Task
var sassInput = './resources/assets/scss/**/*.scss';
var sassOutput = './public/assets/css';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: ['resources/assets/bower_components/foundation/scss']
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
    return gulp
        .src(sassInput)
        //.pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(sassOutput))
        .resume();
});

// SASS Documentation Task
gulp.task('sassdoc', function () {
    var sassDocOptions = {
        dest: 'public/sassdoc',
        verbose: true
    };

    return gulp.src('./resources/**/*.scss')
        .pipe(sassdoc(sassDocOptions));
});


// HTML Task
var htmlInput = './resources/*.html';
var htmlOutput = './public';
var htmlOptions = {
    collapseWhitespace: true,
    removeComments: true,
    quoteCharacter: '"'
};

gulp.task('html', function () {
    return gulp.src(htmlInput)
        .pipe(htmlmin(htmlOptions))
        .pipe(gulp.dest(htmlOutput))
});


//Watch task
gulp.task('watch', function () {
    return gulp
        .watch(sassInput, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

// Default Task
gulp.task('default', ['sass', 'html', 'watch' /*, possible other tasks... */]);
