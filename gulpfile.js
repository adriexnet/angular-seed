var gulp = require('gulp');

gulp.task('default', ['serve']);
gulp.task('serve', ['build'], serve);
gulp.task('build', [
    'scripts', 
    'styles', 
    'fonts', 
    'images', 
    'i18n',
    'views',
    'assets',
    'watch'
]);
gulp.task('scripts', ['clean'], scripts);
gulp.task('styles', ['clean'], styles);
gulp.task('fonts', ['clean'], fonts);
gulp.task('images', ['clean'], images);
gulp.task('i18n', ['clean'], i18n);
gulp.task('views', ['clean'], views);
gulp.task('assets', ['clean'], assets);
gulp.task('watch', ['clean'], watch);
gulp.task('clean', clean);

function serve() {
    var server = require('gulp-server-livereload');
    gulp.src('./').pipe(server({
        livereload: true,
        directoryListing: {
            enable: true,
            path: 'web'
        },
        open: true,
        port: 3600,
        proxies: [{source: '/api', target: 'http://localhost:8000/api'}]
    }));
}

function scripts() {
    var build = require('./build.json');
    var sourcemaps = require('gulp-sourcemaps');
    var concat = require('gulp-concat');
    
    var filter = require('gulp-filter');
    var skipMinFiles = filter(['**', '!**/*.min.js'], {restore: true});
    
    var jshint = require('gulp-jshint');
    var ngAnnotate = require('gulp-ng-annotate');
    var embedTemplates = require('gulp-angular-embed-templates');
    var uglify = require('gulp-uglify');
    
    return gulp.src(build.scripts)
        .pipe(sourcemaps.init())
        .pipe(skipMinFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(ngAnnotate())
            .pipe(embedTemplates())
            .pipe(uglify())
        .pipe(skipMinFiles.restore)        
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(build.output)); 
}

function styles() {
    var build = require('./build.json');
    var sourcemaps = require('gulp-sourcemaps');
    var concat = require('gulp-concat');
    var sass  = require('gulp-sass');
    var cleanCSS = require('gulp-clean-css');
    
    var filter = require('gulp-filter');
    var filterScssFiles = filter(['**/*.scss'], {restore: true});
    
    return gulp.src(build.styles)
        .pipe(sourcemaps.init())
        .pipe(filterScssFiles)
            .pipe(sass()).on('error', sass.logError)
            .pipe(cleanCSS({keepSpecialComments: 0}))
        .pipe(filterScssFiles.restore)
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(build.output));
}

function images() {    
    var build = require('./build.json');
    var image = require('gulp-image');
    return gulp.src(build.images)
            .pipe(image())
            .pipe(gulp.dest(build.output + '/img'));
}

function i18n() {
    var build = require('./build.json');
    
    return getFolders(build.i18n)
            .map(processFolder);
    
    function getFolders (dir) {
        var fs = require('fs');
        var path = require('path');
        
        return fs.readdirSync(dir)
            .filter(function (file) {
                return fs.statSync(path.join(dir, file)).isDirectory();
            });
    }
    
    function processFolder(folder) {
        var extend = require('gulp-extend');
        
        return gulp.src(build.i18n + folder +'/*.json')
            .pipe(extend(folder + '.json'))
            .pipe(gulp.dest(build.output + '/i18n'));
    }
}

function views() {
    var build = require('./build.json');
    var filter = require('gulp-filter');
    var skipTplFiles = filter(['**', '!**/*.tpl.html']);
    var htmlhint = require('gulp-htmlhint');
    
    return gulp.src(build.views)
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter())
        .pipe(skipTplFiles)
        .pipe(gulp.dest(build.output));
}

function assets() {
    var build = require('./build.json');
    return gulp.src(build.assets)
        .pipe(gulp.dest(build.output));
}

function fonts() {
    var build = require('./build.json');
    return gulp.src(build.fonts)
        .pipe(gulp.dest(build.output + '/fonts'));
}

function clean() {
    var build = require('./build.json');
    var del = require('del');
    return del(build.output, {force: true});
}

function watch() {
    var build = require('./build.json');
    gulp.watch(build.scripts, scripts);
    gulp.watch(build.styles, styles);
    gulp.watch(build.fonts, fonts);
    gulp.watch(build.images, images);
    gulp.watch(build.i18n+'**/*.json', i18n);
    gulp.watch(build.views, scripts);
    gulp.watch(build.assets, assets);
}